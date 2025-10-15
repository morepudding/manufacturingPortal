/**
 * 🔍 TEST 7 - Recherche INVERSÉE : Trouver des pièces AVEC caractéristiques
 * 
 * Objectif: Chercher dans InventoryPartChars pour trouver quelles pièces ont des caractéristiques
 *           puis utiliser InventoryPartCharacteristicArray pour les récupérer
 * 
 * Endpoint découvert: InventoryPartSet(...)/InventoryPartCharacteristicArray
 * 
 * Date: 14 octobre 2025
 */

const IFS_CONFIG = {
  baseUrl: 'https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1',
  tokenUrl: 'https://beneteau-group-ast.ifs.cloud/auth/realms/beneast1/protocol/openid-connect/token',
  clientId: 'AIS_IFS_MA_AST',
  clientSecret: 'ifiW7xzKNmj3a1fpEukFIImPFztb51R9',
  scope: 'openid microprofile-jwt'
}

let cachedToken: string | null = null

async function getAccessToken(): Promise<string> {
  if (cachedToken) return cachedToken

  const params = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: IFS_CONFIG.clientId,
    client_secret: IFS_CONFIG.clientSecret,
    scope: IFS_CONFIG.scope
  })

  const response = await fetch(IFS_CONFIG.tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  })

  const data = await response.json()
  cachedToken = data.access_token
  return cachedToken!
}

async function ifsGet<T>(endpoint: string): Promise<T> {
  const token = await getAccessToken()
  const url = `${IFS_CONFIG.baseUrl}/${endpoint}`

  console.log('📡', endpoint.substring(0, 120))

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 200)}`)
  }

  return await response.json() as T
}

async function test1_SearchPartsInCharacteristicsTable() {
  console.log('='.repeat(80))
  console.log('🧪 TEST 7.1 - Recherche inversée dans InventoryPartChars')
  console.log('='.repeat(80))
  console.log('\n🎯 Stratégie: Chercher n\'importe quelle caractéristique existante\n')

  try {
    // Chercher TOUTES les caractéristiques (sans filtre)
    console.log('🔍 Recherche de caractéristiques existantes (tous sites)...\n')
    
    const response = await ifsGet<any>(
      'InventoryPartCharacteristicsHandling.svc/InventoryPartChars?$top=100'
    )
    
    const count = response.value?.length || 0
    console.log(`📊 Résultat: ${count} caractéristiques trouvées\n`)
    
    if (count > 0) {
      console.log('✅ SUCCÈS! Des caractéristiques existent!\n')
      console.log('📋 Exemples de pièces avec caractéristiques:\n')
      
      // Grouper par pièce
      const byPart = new Map<string, any[]>()
      response.value.forEach((char: any) => {
        const key = `${char.Contract}/${char.PartNo}`
        if (!byPart.has(key)) {
          byPart.set(key, [])
        }
        byPart.get(key)!.push(char)
      })
      
      let i = 0
      for (const [partKey, chars] of byPart) {
        if (i++ >= 5) break
        
        console.log(`${i}. ${partKey}`)
        console.log(`   Caractéristiques (${chars.length}):`)
        chars.forEach(c => {
          console.log(`   - ${c.CharacteristicCode}: ${c.AttrValue} (${c.CharType || 'N/A'})`)
        })
        console.log()
      }
      
      return Array.from(byPart.entries()).slice(0, 3)
    } else {
      console.log('⚠️  Aucune caractéristique trouvée\n')
      return []
    }
    
  } catch (error) {
    console.error('❌ Erreur:', (error as Error).message)
    return []
  }
}

async function test2_UseNavigationProperty(parts: Array<[string, any[]]>) {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TEST 7.2 - Test de InventoryPartCharacteristicArray (navigation property)')
  console.log('='.repeat(80))
  console.log()

  if (parts.length === 0) {
    console.log('⏭️  Aucune pièce à tester (skip)\n')
    return
  }

  for (const [partKey, chars] of parts) {
    const [contract, partNo] = partKey.split('/')
    
    console.log(`\n🔍 Test: PartNo=${partNo}, Contract=${contract}`)
    console.log(`   (${chars.length} caractéristiques attendues)\n`)
    
    try {
      // Méthode 1 : Navigation property simple
      console.log('   📡 Méthode 1: /InventoryPartCharacteristicArray')
      const response1 = await ifsGet<any>(
        `InventoryPartHandling.svc/InventoryPartSet(PartNo='${partNo}',Contract='${contract}')/InventoryPartCharacteristicArray`
      )
      
      const count1 = response1.value?.length || 0
      console.log(`   ✅ ${count1} caractéristiques récupérées\n`)
      
      if (count1 > 0) {
        console.log('   📊 Détails:\n')
        response1.value.slice(0, 3).forEach((char: any, i: number) => {
          console.log(`   ${i + 1}. CharacteristicCode: ${char.CharacteristicCode}`)
          console.log(`      AttrValue: ${char.AttrValue}`)
          console.log(`      AttrValueAlpha: ${char.AttrValueAlpha || 'N/A'}`)
          console.log(`      AttrValueNumeric: ${char.AttrValueNumeric || 'N/A'}`)
          console.log()
        })
      }
      
      // Méthode 2 : Avec $expand (comme dans le cURL)
      console.log('   📡 Méthode 2: Avec $expand=CharacteristicRef')
      const response2 = await ifsGet<any>(
        `InventoryPartHandling.svc/InventoryPartSet(PartNo='${partNo}',Contract='${contract}')/InventoryPartCharacteristicArray?$expand=CharacteristicRef($select=Description,SearchTypeDb,CharTypeDb)`
      )
      
      const count2 = response2.value?.length || 0
      console.log(`   ✅ ${count2} caractéristiques avec détails\n`)
      
      if (count2 > 0 && response2.value[0].CharacteristicRef) {
        console.log('   📊 Avec références enrichies:\n')
        response2.value.slice(0, 2).forEach((char: any, i: number) => {
          console.log(`   ${i + 1}. ${char.CharacteristicCode}: ${char.AttrValue}`)
          if (char.CharacteristicRef) {
            console.log(`      Description: ${char.CharacteristicRef.Description || 'N/A'}`)
            console.log(`      Type: ${char.CharacteristicRef.CharTypeDb || 'N/A'}`)
          }
          console.log()
        })
      }
      
      // Rechercher nos attributs Part Printer
      console.log('   🎯 Recherche attributs Part Printer...\n')
      const allChars = response1.value || []
      
      const genericCodeVariants = ['GENERIC CODE', 'GENERIC_CODE', 'GENERIC', 'GEN']
      const lengthSetupVariants = ['LENGTH SETUP', 'LENGTH_SETUP', 'LENGTH', 'LEN']
      const varnishCodeVariants = ['VARNISH CODE', 'VARNISH_CODE', 'VARNISH', 'VARN']
      
      const genericCode = allChars.find((c: any) => 
        genericCodeVariants.some(v => c.CharacteristicCode?.toUpperCase().includes(v))
      )
      const lengthSetup = allChars.find((c: any) => 
        lengthSetupVariants.some(v => c.CharacteristicCode?.toUpperCase().includes(v))
      )
      const varnishCode = allChars.find((c: any) => 
        varnishCodeVariants.some(v => c.CharacteristicCode?.toUpperCase().includes(v))
      )
      
      console.log('   Résultats:')
      console.log(`   GENERIC CODE: ${genericCode ? `✅ ${genericCode.CharacteristicCode} = ${genericCode.AttrValue}` : '❌ NON TROUVÉ'}`)
      console.log(`   LENGTH SETUP: ${lengthSetup ? `✅ ${lengthSetup.CharacteristicCode} = ${lengthSetup.AttrValue}` : '❌ NON TROUVÉ'}`)
      console.log(`   VARNISH CODE: ${varnishCode ? `✅ ${varnishCode.CharacteristicCode} = ${varnishCode.AttrValue}` : '❌ NON TROUVÉ'}`)
      
      if (genericCode || lengthSetup || varnishCode) {
        console.log('\n   🎉 DÉCOUVERTE MAJEURE! Attributs Part Printer trouvés!')
        
        return {
          partNo,
          contract,
          genericCode: genericCode?.AttrValue,
          lengthSetup: lengthSetup?.AttrValue,
          varnishCode: varnishCode?.AttrValue
        }
      }
      
    } catch (error) {
      console.log(`   ❌ Erreur: ${(error as Error).message.substring(0, 100)}`)
    }
  }
}

async function test3_SearchSpecificCodes() {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TEST 7.3 - Recherche de codes spécifiques Part Printer')
  console.log('='.repeat(80))
  console.log()

  const searchTerms = [
    'GENERIC',
    'LENGTH',
    'VARNISH',
    'CODE',
    'SETUP'
  ]

  for (const term of searchTerms) {
    console.log(`\n🔍 Recherche caractéristiques contenant: "${term}"`)
    
    try {
      const response = await ifsGet<any>(
        `InventoryPartCharacteristicsHandling.svc/InventoryPartChars?$filter=contains(CharacteristicCode,'${term}')&$top=20`
      )
      
      const count = response.value?.length || 0
      console.log(`   ${count > 0 ? '✅' : '⚠️ '} ${count} résultats`)
      
      if (count > 0) {
        const uniqueCodes = new Set(response.value.map((c: any) => c.CharacteristicCode))
        console.log(`   Codes uniques: ${Array.from(uniqueCodes).join(', ')}`)
      }
      
    } catch (error) {
      console.log(`   ❌ ${(error as Error).message.substring(0, 80)}`)
    }
  }
}

async function main() {
  console.log('🚀 TEST 7 - Recherche INVERSÉE de pièces avec caractéristiques\n')
  console.log('Stratégie: Trouver les pièces qui ONT des caractéristiques configurées\n')
  console.log('Endpoint: InventoryPartSet(...)/InventoryPartCharacteristicArray\n')
  
  const partsWithChars = await test1_SearchPartsInCharacteristicsTable()
  
  if (partsWithChars.length > 0) {
    await test2_UseNavigationProperty(partsWithChars)
  }
  
  await test3_SearchSpecificCodes()
  
  console.log('\n' + '='.repeat(80))
  console.log('✅ TEST 7 TERMINÉ')
  console.log('='.repeat(80))
  console.log('\n💡 Conclusion:')
  console.log('   - InventoryPartChars: Table globale de toutes les caractéristiques')
  console.log('   - InventoryPartCharacteristicArray: Navigation property pour 1 pièce')
  console.log('   - Si aucune caractéristique trouvée → système non utilisé en AST')
}

main().catch(e => {
  console.error('💥 Erreur fatale:', e)
  process.exit(1)
})
