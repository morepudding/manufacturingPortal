/**
 * 🎉 TEST 6 - InventoryPartCharacteristicsHandling - DÉCOUVERTE FINALE!
 * 
 * Objectif: Valider qu'on peut récupérer les VALEURS des attributs pour une pièce
 * 
 * Service: InventoryPartCharacteristicsHandling.svc/InventoryPartChars
 * Clés: (PartNo, Contract, CharacteristicCode)
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

  console.log('📡', endpoint.substring(0, 100))

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 300)}`)
  }

  return await response.json() as T
}

async function test1_ListAllCharacteristics() {
  console.log('='.repeat(80))
  console.log('🧪 TEST 6.1 - Liste TOUS les caractéristiques disponibles')
  console.log('='.repeat(80))
  console.log()

  const testSites = ['IT001', 'BDR', 'BFS', 'BFS2']

  for (const site of testSites) {
    console.log(`\n🔍 Test site: ${site}`)
    try {
      const response = await ifsGet<any>(
        `InventoryPartCharacteristicsHandling.svc/InventoryPartChars?$filter=Contract eq '${site}'&$top=10`
      )
      
      const count = response.value?.length || 0
      console.log(`   ${count > 0 ? '✅' : '⚠️ '} ${count} caractéristiques trouvées`)
      
      if (count > 0) {
        console.log('\n   📋 Exemples:\n')
        response.value.slice(0, 3).forEach((char: any, i: number) => {
          console.log(`   ${i + 1}. PartNo: ${char.PartNo}`)
          console.log(`      CharacteristicCode: ${char.CharacteristicCode}`)
          console.log(`      AttrValue: ${char.AttrValue}`)
          console.log()
        })
        
        return response.value
      }
      
    } catch (error) {
      console.log(`   ❌ Erreur: ${(error as Error).message.substring(0, 80)}`)
    }
  }
  
  return []
}

async function test2_GetCharacteristicsForPart() {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TEST 6.2 - Récupérer caractéristiques pour une pièce spécifique')
  console.log('='.repeat(80))
  console.log()

  const partNo = 'IT00922F'
  const contract = 'IT001'

  try {
    console.log(`🔍 Recherche caractéristiques pour PartNo: ${partNo}, Contract: ${contract}\n`)
    
    const response = await ifsGet<any>(
      `InventoryPartCharacteristicsHandling.svc/InventoryPartChars?$filter=PartNo eq '${partNo}' and Contract eq '${contract}'`
    )
    
    console.log(`✅ ${response.value.length} caractéristiques trouvées pour cette pièce\n`)
    
    if (response.value.length > 0) {
      console.log('📊 Liste des caractéristiques:\n')
      response.value.forEach((char: any, i: number) => {
        console.log(`${i + 1}. CharacteristicCode: ${char.CharacteristicCode}`)
        console.log(`   Valeur: ${char.AttrValue}`)
        console.log(`   Type: ${char.AttrValueAlpha ? 'Alpha' : 'Numeric'}`)
        console.log(`   ${char.AttrValueAlpha ? `Alpha: ${char.AttrValueAlpha}` : `Numeric: ${char.AttrValueNumeric}`}`)
        console.log()
      })
      
      // Chercher les attributs Part Printer
      console.log('\n🎯 Recherche des attributs Part Printer...\n')
      
      const characteristics = response.value
      
      // Les codes peuvent être différents, essayons plusieurs variantes
      const genericCodeVariants = ['GENERIC CODE', 'GENERIC_CODE', 'GEN', 'GENERIC']
      const lengthSetupVariants = ['LENGTH SETUP', 'LENGTH_SETUP', 'LENGTH', 'LEN_SETUP']
      const varnishCodeVariants = ['VARNISH CODE', 'VARNISH_CODE', 'VARNISH', 'VARN']
      
      const genericCode = characteristics.find((c: any) => 
        genericCodeVariants.some(v => c.CharacteristicCode?.includes(v))
      )
      const lengthSetup = characteristics.find((c: any) => 
        lengthSetupVariants.some(v => c.CharacteristicCode?.includes(v))
      )
      const varnishCode = characteristics.find((c: any) => 
        varnishCodeVariants.some(v => c.CharacteristicCode?.includes(v))
      )
      
      console.log('Résultats:')
      console.log('  GENERIC CODE:', genericCode ? `✅ TROUVÉ (${genericCode.CharacteristicCode} = ${genericCode.AttrValue})` : '❌ NON TROUVÉ')
      console.log('  LENGTH SETUP:', lengthSetup ? `✅ TROUVÉ (${lengthSetup.CharacteristicCode} = ${lengthSetup.AttrValue})` : '❌ NON TROUVÉ')
      console.log('  VARNISH CODE:', varnishCode ? `✅ TROUVÉ (${varnishCode.CharacteristicCode} = ${varnishCode.AttrValue})` : '❌ NON TROUVÉ')
      
      if (genericCode || lengthSetup || varnishCode) {
        console.log('\n🎉 DÉCOUVERTE MAJEURE! Attributs Part Printer trouvés!')
      }
      
      return characteristics
    }
    
  } catch (error) {
    console.error('❌ Erreur:', (error as Error).message)
    return []
  }
}

async function test3_DirectAccessByKey() {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TEST 6.3 - Accès direct par clé composite')
  console.log('='.repeat(80))
  console.log()

  const testCases = [
    { partNo: 'IT00922F', contract: 'IT001', characteristicCode: 'GENERIC CODE' },
    { partNo: 'IT00922F', contract: 'IT001', characteristicCode: 'LENGTH SETUP' },
    { partNo: 'IT00922F', contract: 'IT001', characteristicCode: 'VARNISH CODE' },
  ]

  for (const test of testCases) {
    console.log(`\n🔍 Test: ${test.characteristicCode}`)
    try {
      const char = await ifsGet<any>(
        `InventoryPartCharacteristicsHandling.svc/InventoryPartChars(PartNo='${test.partNo}',Contract='${test.contract}',CharacteristicCode='${test.characteristicCode}')`
      )
      
      console.log('✅ TROUVÉ!')
      console.log(`   Valeur: ${char.AttrValue}`)
      console.log(`   Type: ${char.CharType}`)
      console.log(`   Alpha: ${char.AttrValueAlpha || 'N/A'}`)
      console.log(`   Numeric: ${char.AttrValueNumeric || 'N/A'}`)
      
    } catch (error) {
      const msg = (error as Error).message
      if (msg.includes('404')) {
        console.log('⚠️  Caractéristique non configurée pour cette pièce')
      } else {
        console.log('❌', msg.substring(0, 100))
      }
    }
  }
}

async function test4_SearchPartWithAttributes() {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TEST 6.4 - Chercher des pièces ayant des attributs Part Printer')
  console.log('='.repeat(80))
  console.log()

  try {
    // Chercher toutes les pièces ayant "GENERIC CODE"
    console.log('🔍 Recherche pièces avec GENERIC CODE...\n')
    
    const response = await ifsGet<any>(
      'InventoryPartCharacteristicsHandling.svc/InventoryPartChars?$filter=contains(CharacteristicCode,%27GENERIC%27)&$top=20'
    )
    
    console.log(`✅ ${response.value.length} pièces trouvées avec attribut GENERIC\n`)
    
    if (response.value.length > 0) {
      console.log('📋 Exemples de pièces:\n')
      
      // Grouper par PartNo
      const byPartNo = new Map()
      response.value.forEach((char: any) => {
        if (!byPartNo.has(char.PartNo)) {
          byPartNo.set(char.PartNo, [])
        }
        byPartNo.get(char.PartNo).push(char)
      })
      
      let count = 0
      for (const [partNo, chars] of byPartNo) {
        if (count++ >= 5) break
        
        console.log(`${count}. PartNo: ${partNo}`)
        chars.forEach((c: any) => {
          console.log(`   - ${c.CharacteristicCode}: ${c.AttrValue}`)
        })
        console.log()
      }
    }
    
  } catch (error) {
    console.error('❌ Erreur:', (error as Error).message)
  }
}

async function main() {
  console.log('🚀 TEST 6 - InventoryPartCharacteristicsHandling - SOLUTION FINALE!\n')
  console.log('Service: InventoryPartCharacteristicsHandling.svc/InventoryPartChars\n')
  
  const allChars = await test1_ListAllCharacteristics()
  
  if (allChars.length > 0) {
    await test2_GetCharacteristicsForPart()
    await test3_DirectAccessByKey()
    await test4_SearchPartWithAttributes()
  }
  
  console.log('\n' + '='.repeat(80))
  console.log('✅ TEST 6 TERMINÉ')
  console.log('='.repeat(80))
  console.log('\n🎉 Si les attributs sont trouvés, on a LA SOLUTION COMPLÈTE!')
  console.log('📝 Workflow final: AttributesHandling (définitions) + InventoryPartCharacteristicsHandling (valeurs)')
}

main().catch(e => {
  console.error('💥 Erreur fatale:', e)
  process.exit(1)
})
