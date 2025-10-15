/**
 * 🧪 TEST 3 - Recherche Attributs Personnalisés
 * 
 * Objectif: Trouver GENERIC_CODE, LENGTH_SETUP, VARNISH_CODE
 * 
 * Sources à explorer:
 * 1. InventoryPartChar (Caractéristiques)
 * 2. PartCatalog
 * 3. EngineeringPartRevisions
 * 4. DocumentText
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

  console.log('📡', endpoint.substring(0, 90) + '...')

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

async function test1_InventoryPartChar() {
  console.log('='.repeat(80))
  console.log('🧪 TEST 3.1 - InventoryPartChar (Caractéristiques)')
  console.log('='.repeat(80))
  console.log()

  const partNo = 'IT00922F'

  try {
    // Essayer différentes approches
    console.log('📋 Approche 1: Reference_InventoryPartChar\n')
    try {
      const chars = await ifsGet<any>(
        `InventoryPartHandling.svc/Reference_InventoryPartChar?$top=5`
      )
      console.log('✅ Succès! Nombre:', chars.value.length)
      console.log('Première caractéristique:')
      console.log(JSON.stringify(chars.value[0], null, 2))
    } catch (e1) {
      console.log('❌ Erreur:', (e1 as Error).message.substring(0, 150))
    }

    console.log('\n📋 Approche 2: InventoryPartCharRef (expand depuis InventoryPart)\n')
    try {
      const part = await ifsGet<any>(
        `InventoryPartHandling.svc/InventoryPartSet(Contract='IT001',PartNo='${partNo}')?$expand=InventoryPartCharRef`
      )
      console.log('✅ Succès!')
      if (part.InventoryPartCharRef) {
        console.log('Caractéristiques trouvées:', part.InventoryPartCharRef.length)
        part.InventoryPartCharRef.slice(0, 3).forEach((char: any) => {
          console.log(`  - ${char.CharacteristicCode || char.AttributeCode}: ${char.CharacteristicValue || char.AttributeValue}`)
        })
      } else {
        console.log('Pas de InventoryPartCharRef')
      }
    } catch (e2) {
      console.log('❌ Erreur:', (e2 as Error).message.substring(0, 150))
    }

  } catch (error) {
    console.error('❌ Test échoué')
  }
}

async function test2_PartCatalog() {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TEST 3.2 - PartCatalog')
  console.log('='.repeat(80))
  console.log()

  const partNo = 'IT00922F'

  try {
    console.log('📋 Reference_PartCatalog\n')
    const catalog = await ifsGet<any>(
      `InventoryPartHandling.svc/Reference_PartCatalog?$top=5`
    )
    console.log('✅ Succès! Nombre:', catalog.value.length)
    console.log('Premier enregistrement:')
    console.log(JSON.stringify(catalog.value[0], null, 2))
    
    // Chercher des champs avec "attribute", "generic", "length", "varnish"
    const firstItem = catalog.value[0]
    const relevantFields = Object.keys(firstItem).filter(k => 
      k.toLowerCase().includes('attribute') || 
      k.toLowerCase().includes('generic') ||
      k.toLowerCase().includes('length') ||
      k.toLowerCase().includes('varnish')
    )
    
    if (relevantFields.length > 0) {
      console.log('\n🎯 Champs pertinents trouvés:')
      relevantFields.forEach(field => {
        console.log(`  - ${field}: ${firstItem[field]}`)
      })
    } else {
      console.log('\n⚠️  Aucun champ pertinent trouvé')
    }
    
  } catch (error) {
    console.error('❌ Test échoué:', (error as Error).message.substring(0, 150))
  }
}

async function test3_EngineeringPartRevisions() {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TEST 3.3 - EngineeringPartRevisions')
  console.log('='.repeat(80))
  console.log()

  try {
    console.log('📋 EngPartRevisionSet (liste)\n')
    const revisions = await ifsGet<any>(
      `EngineeringPartRevisionsHandling.svc/EngPartRevisionSet?$top=5`
    )
    console.log('✅ Succès! Nombre:', revisions.value.length)
    console.log('Première révision:')
    console.log(JSON.stringify(revisions.value[0], null, 2))
    
    // Analyser la structure
    const firstRev = revisions.value[0]
    const customFields = Object.keys(firstRev).filter(k => 
      k.startsWith('C') || 
      k.toLowerCase().includes('attribute') ||
      k.toLowerCase().includes('generic') ||
      k.toLowerCase().includes('length') ||
      k.toLowerCase().includes('varnish')
    )
    
    if (customFields.length > 0) {
      console.log('\n🎯 Champs personnalisés/pertinents:')
      customFields.forEach(field => {
        console.log(`  - ${field}: ${firstRev[field]}`)
      })
    }
    
  } catch (error) {
    console.error('❌ Test échoué:', (error as Error).message.substring(0, 150))
  }
}

async function test4_DocumentText() {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TEST 3.4 - DocumentText')
  console.log('='.repeat(80))
  console.log()

  try {
    console.log('📋 Reference_DocumentText (liste)\n')
    const docs = await ifsGet<any>(
      `InventoryPartHandling.svc/Reference_DocumentText?$top=3`
    )
    console.log('✅ Succès! Nombre:', docs.value.length)
    if (docs.value.length > 0) {
      console.log('Premier document:')
      console.log(JSON.stringify(docs.value[0], null, 2))
    }
    
  } catch (error) {
    console.error('❌ Test échoué:', (error as Error).message.substring(0, 150))
  }
}

async function test5_ExploreInventoryPartStructure() {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TEST 3.5 - Explorer Structure Complète InventoryPart')
  console.log('='.repeat(80))
  console.log()

  try {
    const part = await ifsGet<any>(
      `InventoryPartHandling.svc/InventoryPartSet(Contract='IT001',PartNo='IT00922F')`
    )
    
    console.log('✅ Pièce récupérée\n')
    
    // Chercher TOUS les champs qui pourraient contenir nos attributs
    const allFields = Object.keys(part)
    
    console.log('🔍 Analyse de TOUS les champs (', allFields.length, 'champs):\n')
    
    // Filtrer par catégories
    const customFields = allFields.filter(k => k.startsWith('C') && part[k])
    const attrFields = allFields.filter(k => k.toLowerCase().includes('attribute') && part[k])
    const engFields = allFields.filter(k => k.toLowerCase().includes('eng') && part[k])
    const codeFields = allFields.filter(k => k.toLowerCase().includes('code') && part[k])
    const lengthFields = allFields.filter(k => k.toLowerCase().includes('length') && part[k])
    
    if (customFields.length > 0) {
      console.log('📦 Champs personnalisés (C*):', customFields.length)
      customFields.forEach(field => {
        console.log(`  - ${field}: ${part[field]}`)
      })
      console.log()
    }
    
    if (attrFields.length > 0) {
      console.log('🏷️  Champs *attribute*:', attrFields.length)
      attrFields.forEach(field => {
        console.log(`  - ${field}: ${part[field]}`)
      })
      console.log()
    }
    
    if (engFields.length > 0) {
      console.log('⚙️  Champs *eng*:', engFields.length)
      engFields.forEach(field => {
        console.log(`  - ${field}: ${part[field]}`)
      })
      console.log()
    }
    
    if (codeFields.length > 0) {
      console.log('🔢 Champs *code*:', codeFields.length)
      codeFields.forEach(field => {
        console.log(`  - ${field}: ${part[field]}`)
      })
      console.log()
    }
    
    if (lengthFields.length > 0) {
      console.log('📏 Champs *length*:', lengthFields.length)
      lengthFields.forEach(field => {
        console.log(`  - ${field}: ${part[field]}`)
      })
      console.log()
    }
    
  } catch (error) {
    console.error('❌ Test échoué:', error)
  }
}

async function main() {
  console.log('🚀 TEST 3 - Recherche Attributs Personnalisés\n')
  console.log('Objectif: Trouver GENERIC_CODE, LENGTH_SETUP, VARNISH_CODE\n')
  
  await test1_InventoryPartChar()
  await test2_PartCatalog()
  await test3_EngineeringPartRevisions()
  await test4_DocumentText()
  await test5_ExploreInventoryPartStructure()
  
  console.log('\n' + '='.repeat(80))
  console.log('✅ TEST 3 TERMINÉ')
  console.log('='.repeat(80))
  console.log('\n📝 Analysez les résultats pour identifier où sont les attributs personnalisés')
}

main().catch(e => {
  console.error('💥 Erreur fatale:', e)
  process.exit(1)
})
