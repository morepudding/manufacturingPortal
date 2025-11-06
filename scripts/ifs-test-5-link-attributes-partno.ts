/**
 * 🧪 TEST 5 - Recherche Lien Attributs → PartNo
 * 
 * Objectif: Trouver comment récupérer les VALEURS des attributs pour une pièce
 * 
 * On sait maintenant que:
 * - ✅ GENERIC CODE, LENGTH SETUP, VARNISH CODE existent dans TechnicalAttribStdSet
 * - ❌ TechnicalAttribStdSet contient les DÉFINITIONS, pas les VALEURS
 * 
 * Question: Comment obtenir la valeur de "GENERIC CODE" pour "LG5MA0XD02" ?
 * 
 * Date: 14 octobre 2025
 */

const IFS_CONFIG = {
  baseUrl: 'https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1',
  tokenUrl: 'https://beneteau-group-ast.ifs.cloud/auth/realms/beneast1/protocol/openid-connect/token',
  clientId: '***REMOVED***',
  clientSecret: '***REMOVED***',
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

  console.log('📡', endpoint.substring(0, 90))

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

async function test1_ExploreAttributesMetadata() {
  console.log('='.repeat(80))
  console.log('🧪 TEST 5.1 - Explorer Métadonnées AttributesHandling Complètes')
  console.log('='.repeat(80))
  console.log()

  try {
    const metadata = await ifsGet<any>('AttributesHandling.svc')
    console.log('✅ Métadonnées récupérées')
    console.log('\n📋 Services disponibles:')
    
    if (metadata.value) {
      metadata.value.forEach((service: any, i: number) => {
        console.log(`  ${i + 1}. ${service.name} - ${service.url}`)
      })
      
      // Chercher des services liés aux pièces
      const partRelated = metadata.value.filter((s: any) => 
        s.name.toLowerCase().includes('part') ||
        s.name.toLowerCase().includes('value') ||
        s.name.toLowerCase().includes('attribute')
      )
      
      if (partRelated.length > 0) {
        console.log('\n🎯 Services potentiellement liés aux pièces:')
        partRelated.forEach((s: any) => {
          console.log(`  ⭐ ${s.name}`)
        })
      }
    }
    
  } catch (error) {
    console.error('❌ Erreur:', (error as Error).message)
  }
}

async function test2_TryExpandOnTechnicalAttrib() {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TEST 5.2 - Essayer $expand sur TechnicalAttribStd')
  console.log('='.repeat(80))
  console.log()

  const expansions = [
    'PartValuesRef',
    'PartAttributesRef',
    'TechnicalAttributeValuesRef',
    'InventoryPartRef',
    'PartRef'
  ]

  for (const expand of expansions) {
    console.log(`\n🔍 Test expand: ${expand}`)
    try {
      const result = await ifsGet<any>(
        `AttributesHandling.svc/TechnicalAttribStdSet(Attribute='GENERIC CODE')?$expand=${expand}`
      )
      console.log('✅ SUCCÈS! Expansion fonctionnelle')
      console.log(JSON.stringify(result, null, 2).substring(0, 500))
      break // Si succès, pas besoin de continuer
    } catch (error) {
      console.log('❌', (error as Error).message.substring(0, 100))
    }
  }
}

async function test3_SearchOtherServices() {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TEST 5.3 - Chercher Services Connexes')
  console.log('='.repeat(80))
  console.log()

  // Services potentiels à tester
  const potentialServices = [
    'PartAttributesHandling.svc',
    'TechnicalAttributesHandling.svc',
    'InventoryPartAttributesHandling.svc',
    'ManufacturingPartHandling.svc',
    'PartCatalogAttributesHandling.svc'
  ]

  for (const service of potentialServices) {
    console.log(`\n🔍 Test: ${service}`)
    try {
      const result = await ifsGet<any>(service)
      console.log('✅ SERVICE TROUVÉ!')
      console.log('Services disponibles:', JSON.stringify(result, null, 2).substring(0, 300))
    } catch (error) {
      const msg = (error as Error).message
      if (msg.includes('404')) {
        console.log('❌ Service n\'existe pas (404)')
      } else {
        console.log('❌', msg.substring(0, 100))
      }
    }
  }
}

async function test4_SearchInInventoryPart() {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TEST 5.4 - Chercher Attributs dans InventoryPart')
  console.log('='.repeat(80))
  console.log()

  try {
    console.log('📋 Test 1: Récupérer pièce complète et analyser tous les champs')
    
    const part = await ifsGet<any>(
      'InventoryPartHandling.svc/InventoryPartSet(Contract=\'IT001\',PartNo=\'IT00922F\')'
    )
    
    console.log('✅ Pièce récupérée')
    
    // Chercher des champs liés aux attributs techniques
    const allFields = Object.keys(part)
    const attrFields = allFields.filter(k => 
      k.toLowerCase().includes('technical') ||
      k.toLowerCase().includes('attrib') ||
      k.toLowerCase().includes('generic') ||
      k.toLowerCase().includes('varnish') ||
      k.toLowerCase().includes('length')
    )
    
    if (attrFields.length > 0) {
      console.log('\n🎯 Champs potentiellement liés aux attributs:')
      attrFields.forEach(field => {
        console.log(`  - ${field}: ${part[field]}`)
      })
    } else {
      console.log('\n⚠️  Aucun champ lié aux attributs techniques trouvé dans InventoryPart')
    }
    
    // Tester des expansions possibles
    console.log('\n📋 Test 2: Essayer expansions sur InventoryPart')
    const expansions = [
      'TechnicalAttributesRef',
      'TechnicalAttribRef',
      'AttributesRef',
      'CustomAttributesRef'
    ]
    
    for (const expand of expansions) {
      try {
        const result = await ifsGet<any>(
          `InventoryPartHandling.svc/InventoryPartSet(Contract='IT001',PartNo='IT00922F')?$expand=${expand}`
        )
        console.log(`✅ SUCCÈS avec $expand=${expand}`)
        console.log(JSON.stringify(result, null, 2).substring(0, 500))
        break
      } catch (e) {
        console.log(`❌ ${expand}: ${(e as Error).message.substring(0, 80)}`)
      }
    }
    
  } catch (error) {
    console.error('❌ Erreur:', (error as Error).message)
  }
}

async function test5_CheckEngineeringPartRev() {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TEST 5.5 - Chercher Attributs dans EngineeringPartRevision')
  console.log('='.repeat(80))
  console.log()

  try {
    const revisions = await ifsGet<any>(
      'EngineeringPartRevisionsHandling.svc/EngPartRevisionSet?$filter=PartNo eq \'IT00922F\'&$top=1'
    )
    
    if (revisions.value && revisions.value.length > 0) {
      const rev = revisions.value[0]
      console.log('✅ Révision trouvée')
      
      // Analyser les champs
      const allFields = Object.keys(rev)
      const attrFields = allFields.filter(k => 
        k.toLowerCase().includes('technical') ||
        k.toLowerCase().includes('attrib') ||
        k.toLowerCase().includes('generic') ||
        k.toLowerCase().includes('varnish')
      )
      
      if (attrFields.length > 0) {
        console.log('\n🎯 Champs liés aux attributs:')
        attrFields.forEach(field => {
          console.log(`  - ${field}: ${rev[field]}`)
        })
      }
      
      // Tester expansions
      console.log('\n📋 Test expansions sur EngineeringPartRevision')
      const expansions = ['TechnicalAttributesRef', 'AttributesRef', 'TechnicalAttribRef']
      
      for (const expand of expansions) {
        try {
          const result = await ifsGet<any>(
            `EngineeringPartRevisionsHandling.svc/EngPartRevisionSet(PartNo='IT00922F',PartRev='${rev.PartRev}')?$expand=${expand}`
          )
          console.log(`✅ SUCCÈS avec $expand=${expand}`)
          console.log(JSON.stringify(result, null, 2).substring(0, 500))
          break
        } catch (e) {
          console.log(`❌ ${expand}`)
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Erreur:', (error as Error).message)
  }
}

async function main() {
  console.log('🚀 TEST 5 - Recherche Lien Attributs → PartNo\n')
  console.log('Objectif: Trouver comment récupérer les VALEURS des attributs pour une pièce\n')
  
  await test1_ExploreAttributesMetadata()
  await test2_TryExpandOnTechnicalAttrib()
  await test3_SearchOtherServices()
  await test4_SearchInInventoryPart()
  await test5_CheckEngineeringPartRev()
  
  console.log('\n' + '='.repeat(80))
  console.log('✅ TEST 5 TERMINÉ')
  console.log('='.repeat(80))
}

main().catch(e => {
  console.error('💥 Erreur fatale:', e)
  process.exit(1)
})
