/**
 * 🧪 TEST 2C - Inventory Part Handling - Test avec keyref
 * 
 * Objectif: Tester l'accès direct par clé composite
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
let tokenExpiry: number = 0

async function getAccessToken(): Promise<string> {
  const now = Date.now()
  
  if (cachedToken && now < tokenExpiry) {
    return cachedToken
  }

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

  if (!response.ok) throw new Error(`HTTP ${response.status}`)

  const data = await response.json()
  cachedToken = data.access_token
  tokenExpiry = now + (data.expires_in - 300) * 1000
  return cachedToken!
}

async function ifsGet<T>(endpoint: string): Promise<T> {
  const token = await getAccessToken()
  const url = `${IFS_CONFIG.baseUrl}/${endpoint}`

  console.log('📡 GET', endpoint)

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('❌ Erreur:', errorText)
    throw new Error(`HTTP ${response.status}`)
  }

  return await response.json() as T
}

async function test1_DirectKey() {
  console.log('🧪 TEST 1 - Accès direct par clé composite\n')
  
  // Format OData : EntitySet(Key1='value1',Key2='value2')
  const contracts = ['IT001', 'BDR']
  const partNos = ['IT00922F', 'LG5MA0XD02']
  
  for (const contract of contracts) {
    for (const partNo of partNos) {
      console.log(`\n📦 Contract=${contract}, PartNo=${partNo}`)
      try {
        const part = await ifsGet<any>(
          `InventoryPartHandling.svc/InventoryPartSet(Contract='${contract}',PartNo='${partNo}')`
        )
        console.log('✅ Trouvé!')
        console.log('  Description:', part.Description || 'N/A')
        console.log('  Type:', part.TypeCode || 'N/A')
        console.log('  Status:', part.PartStatus || 'N/A')
        
        // Essayer de récupérer les attributs
        console.log('\n  🔍 Tentative récupération attributs...')
        try {
          const partWithAttrs = await ifsGet<any>(
            `InventoryPartHandling.svc/InventoryPartSet(Contract='${contract}',PartNo='${partNo}')?$expand=ManufPartAttributeRef`
          )
          
          if (partWithAttrs.ManufPartAttributeRef && partWithAttrs.ManufPartAttributeRef.length > 0) {
            console.log('  ✅ Attributs trouvés:')
            partWithAttrs.ManufPartAttributeRef.forEach((attr: any) => {
              console.log(`    - ${attr.AttributeCode}: ${attr.AttributeValue}`)
            })
          } else {
            console.log('  ⚠️  Aucun attribut')
          }
        } catch (e) {
          console.log('  ❌ Erreur expand:', (e as Error).message)
        }
        
      } catch (error) {
        console.log('❌ Non trouvé ou erreur')
      }
    }
  }
}

async function test2_SearchWithContains() {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TEST 2 - Recherche avec query parameter')
  console.log('='.repeat(80))
  
  try {
    // IFS permet parfois des query strings simples
    const parts = await ifsGet<any>(
      'InventoryPartHandling.svc/InventoryPartSet?$top=20'
    )
    
    console.log(`✅ ${parts.value.length} pièces récupérées`)
    
    // Filtrer côté client les pièces BDR
    const bdrParts = parts.value.filter((p: any) => p.Contract === 'BDR')
    console.log(`📦 ${bdrParts.length} pièces sur le site BDR:`)
    
    bdrParts.slice(0, 5).forEach((part: any, i: number) => {
      console.log(`  ${i + 1}. ${part.PartNo} - ${part.Description || 'N/A'}`)
    })
    
    if (bdrParts.length > 0) {
      // Tester avec la première pièce BDR
      const testPart = bdrParts[0]
      console.log(`\n🔍 Test avec ${testPart.PartNo} (${testPart.Contract})`)
      
      try {
        const partDetail = await ifsGet<any>(
          `InventoryPartHandling.svc/InventoryPartSet(Contract='${testPart.Contract}',PartNo='${testPart.PartNo}')?$expand=ManufPartAttributeRef`
        )
        
        console.log('✅ Détails récupérés')
        if (partDetail.ManufPartAttributeRef) {
          console.log(`📋 ${partDetail.ManufPartAttributeRef.length} attributs:`)
          partDetail.ManufPartAttributeRef.forEach((attr: any) => {
            console.log(`  - ${attr.AttributeCode}: ${attr.AttributeValue}`)
          })
          
          // Chercher les attributs Part Printer
          const genericCode = partDetail.ManufPartAttributeRef.find(
            (a: any) => a.AttributeCode?.includes('GENERIC')
          )
          const lengthSetup = partDetail.ManufPartAttributeRef.find(
            (a: any) => a.AttributeCode?.includes('LENGTH')
          )
          const varnishCode = partDetail.ManufPartAttributeRef.find(
            (a: any) => a.AttributeCode?.includes('VARNISH')
          )
          
          console.log('\n🎯 Attributs Part Printer:')
          console.log('  GENERIC CODE:', genericCode?.AttributeValue || '❌ NON TROUVÉ')
          console.log('  LENGTH SETUP:', lengthSetup?.AttributeValue || '❌ NON TROUVÉ')
          console.log('  VARNISH CODE:', varnishCode?.AttributeValue || '❌ NON TROUVÉ')
        } else {
          console.log('⚠️  Pas d\'attributs')
        }
      } catch (e) {
        console.log('❌ Erreur:', (e as Error).message)
      }
    }
    
  } catch (error) {
    console.error('❌ Test échoué:', (error as Error).message)
  }
}

async function main() {
  console.log('🚀 TEST 2C - InventoryPartHandling - Accès par clé\n')
  
  await test1_DirectKey()
  await test2_SearchWithContains()
  
  console.log('\n' + '='.repeat(80))
  console.log('✅ TESTS TERMINÉS')
  console.log('='.repeat(80))
}

main().catch(e => {
  console.error('💥 Erreur fatale:', e)
  process.exit(1)
})
