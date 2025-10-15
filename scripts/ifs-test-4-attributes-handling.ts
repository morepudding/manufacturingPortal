/**
 * 🧪 TEST 4 - AttributesHandling.svc - DÉCOUVERTE
 * 
 * Objectif: Valider le service AttributesHandling.svc/TechnicalAttribStdSet
 * Chercher: GENERIC_CODE, LENGTH_SETUP, VARNISH_CODE
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
    throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 200)}`)
  }

  return await response.json() as T
}

async function test1_ServiceMetadata() {
  console.log('='.repeat(80))
  console.log('🧪 TEST 4.1 - Métadonnées AttributesHandling.svc')
  console.log('='.repeat(80))
  console.log()

  try {
    const metadata = await ifsGet<any>('AttributesHandling.svc/$metadata')
    console.log('✅ Service accessible!')
    console.log('Métadonnées:', JSON.stringify(metadata, null, 2).substring(0, 500))
  } catch (error) {
    console.error('❌ Erreur:', (error as Error).message)
  }
}

async function test2_ListTechnicalAttribStd() {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TEST 4.2 - Liste TechnicalAttribStdSet')
  console.log('='.repeat(80))
  console.log()

  try {
    const response = await ifsGet<any>(
      'AttributesHandling.svc/TechnicalAttribStdSet?$top=50'
    )
    
    console.log('✅ Succès! Nombre d\'attributs:', response.value.length)
    console.log('\n📋 Liste des attributs techniques standard:\n')
    
    response.value.forEach((attr: any, i: number) => {
      console.log(`${i + 1}. ${attr.Attribute} - ${attr.AttribDesc} (Type: ${attr.AttribType})`)
    })
    
    // Chercher les attributs Part Printer
    console.log('\n🔍 Recherche des attributs Part Printer...\n')
    
    const genericCode = response.value.find((a: any) => 
      a.Attribute?.includes('GENERIC') || a.AttribDesc?.includes('GENERIC')
    )
    const lengthSetup = response.value.find((a: any) => 
      a.Attribute?.includes('LENGTH') || a.AttribDesc?.includes('LENGTH')
    )
    const varnishCode = response.value.find((a: any) => 
      a.Attribute?.includes('VARNISH') || a.AttribDesc?.includes('VARNISH')
    )
    
    console.log('🎯 Résultats:')
    console.log('  GENERIC_CODE:', genericCode ? `✅ TROUVÉ (${genericCode.Attribute})` : '❌ NON TROUVÉ')
    console.log('  LENGTH_SETUP:', lengthSetup ? `✅ TROUVÉ (${lengthSetup.Attribute})` : '❌ NON TROUVÉ')
    console.log('  VARNISH_CODE:', varnishCode ? `✅ TROUVÉ (${varnishCode.Attribute})` : '❌ NON TROUVÉ')
    
    if (genericCode || lengthSetup || varnishCode) {
      console.log('\n📊 Détails des attributs trouvés:')
      if (genericCode) console.log(JSON.stringify(genericCode, null, 2))
      if (lengthSetup) console.log(JSON.stringify(lengthSetup, null, 2))
      if (varnishCode) console.log(JSON.stringify(varnishCode, null, 2))
    }
    
    return response.value
  } catch (error) {
    console.error('❌ Erreur:', (error as Error).message)
    return []
  }
}

async function test3_SearchSpecificAttributes() {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TEST 4.3 - Recherche par nom exact')
  console.log('='.repeat(80))
  console.log()

  const searchTerms = ['GENERIC_CODE', 'GENERIC CODE', 'LENGTH_SETUP', 'LENGTH SETUP', 'VARNISH_CODE', 'VARNISH CODE']
  
  for (const term of searchTerms) {
    console.log(`\n🔍 Recherche: "${term}"`)
    try {
      const response = await ifsGet<any>(
        `AttributesHandling.svc/TechnicalAttribStdSet?$filter=contains(Attribute,'${term}') or contains(AttribDesc,'${term}')`
      )
      
      if (response.value.length > 0) {
        console.log(`✅ TROUVÉ! ${response.value.length} résultat(s)`)
        response.value.forEach((attr: any) => {
          console.log(`  - ${attr.Attribute}: ${attr.AttribDesc} (${attr.AttribType})`)
        })
      } else {
        console.log('❌ Non trouvé')
      }
    } catch (error) {
      console.log('❌ Erreur:', (error as Error).message.substring(0, 100))
    }
  }
}

async function test4_ExploreAllAttributes() {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TEST 4.4 - Explorer TOUS les attributs disponibles')
  console.log('='.repeat(80))
  console.log()

  try {
    const response = await ifsGet<any>(
      'AttributesHandling.svc/TechnicalAttribStdSet?$top=200'
    )
    
    console.log(`✅ ${response.value.length} attributs récupérés`)
    console.log('\n📊 Recherche de patterns pertinents...\n')
    
    // Chercher des patterns
    const keywords = ['CODE', 'LENGTH', 'SIZE', 'SETUP', 'VARNISH', 'GENERIC', 'PART', 'WOOD', 'MATERIAL']
    
    keywords.forEach(keyword => {
      const matches = response.value.filter((a: any) => 
        a.Attribute?.toUpperCase().includes(keyword) || 
        a.AttribDesc?.toUpperCase().includes(keyword)
      )
      
      if (matches.length > 0) {
        console.log(`\n🔑 Keyword "${keyword}": ${matches.length} attributs`)
        matches.slice(0, 5).forEach((attr: any) => {
          console.log(`  - ${attr.Attribute}: ${attr.AttribDesc}`)
        })
        if (matches.length > 5) {
          console.log(`  ... et ${matches.length - 5} autres`)
        }
      }
    })
    
  } catch (error) {
    console.error('❌ Erreur:', (error as Error).message)
  }
}

async function main() {
  console.log('🚀 TEST 4 - AttributesHandling.svc - DÉCOUVERTE MAJEURE!\n')
  console.log('Source: Documentation IFS Cloud OData API\n')
  
  await test1_ServiceMetadata()
  const attributes = await test2_ListTechnicalAttribStd()
  await test3_SearchSpecificAttributes()
  await test4_ExploreAllAttributes()
  
  console.log('\n' + '='.repeat(80))
  console.log('✅ TEST 4 TERMINÉ')
  console.log('='.repeat(80))
  
  if (attributes.length > 0) {
    console.log('\n🎉 AttributesHandling.svc est ACCESSIBLE!')
    console.log('📋 Nombre d\'attributs techniques:', attributes.length)
    console.log('\n📝 Prochaine étape: Vérifier comment lier ces attributs aux PartNo')
  }
}

main().catch(e => {
  console.error('💥 Erreur fatale:', e)
  process.exit(1)
})
