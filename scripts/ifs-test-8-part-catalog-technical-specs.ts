/**
 * 🎉 TEST 8 - PartCatalog Technical Specifications - SOLUTION TROUVÉE!
 * 
 * Endpoint découvert via DevTools Network:
 * PartHandling.svc/PartCatalogSet(PartNo='...')/PartCatalogReferenceArray(...)/TechnicalSpecBothArray
 * 
 * C'est l'endpoint utilisé par IFS pour afficher les "Technical Attributes" !
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

  console.log('📡', endpoint.substring(0, 150))

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

async function test1_GetPartCatalog() {
  console.log('='.repeat(80))
  console.log('🧪 TEST 8.1 - Accès PartCatalogSet')
  console.log('='.repeat(80))
  console.log()

  const partNo = 'IT00922F'

  try {
    console.log(`🔍 Récupération Part Catalog pour: ${partNo}\n`)
    
    const partCatalog = await ifsGet<any>(
      `PartHandling.svc/PartCatalogSet(PartNo='${partNo}')`
    )
    
    console.log('✅ Part Catalog trouvé!\n')
    console.log('📋 Informations de base:')
    console.log(`   PartNo: ${partCatalog.PartNo}`)
    console.log(`   Description: ${partCatalog.Description || 'N/A'}`)
    console.log(`   UnitCode: ${partCatalog.UnitCode || 'N/A'}`)
    console.log(`   Configurable: ${partCatalog.Configurable || 'N/A'}`)
    console.log()
    
    return partCatalog
    
  } catch (error) {
    console.error('❌ Erreur:', (error as Error).message)
    return null
  }
}

async function test2_GetPartCatalogReference() {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TEST 8.2 - Exploration PartCatalogReferenceArray')
  console.log('='.repeat(80))
  console.log()

  const partNo = 'IT00922F'

  try {
    console.log(`🔍 Recherche références techniques pour: ${partNo}\n`)
    
    // Méthode 1: Liste toutes les références
    const references = await ifsGet<any>(
      `PartHandling.svc/PartCatalogSet(PartNo='${partNo}')/PartCatalogReferenceArray`
    )
    
    const count = references.value?.length || 0
    console.log(`✅ ${count} références trouvées\n`)
    
    if (count > 0) {
      console.log('📋 Liste des références:\n')
      references.value.forEach((ref: any, i: number) => {
        console.log(`${i + 1}. LuName: ${ref.LuName}`)
        console.log(`   KeyRef: ${ref.KeyRef}`)
        console.log(`   TechnicalSpecNo: ${ref.TechnicalSpecNo}`)
        console.log()
      })
      
      return references.value
    }
    
  } catch (error) {
    console.error('❌ Erreur:', (error as Error).message)
    return []
  }
}

async function test3_GetTechnicalSpecs() {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TEST 8.3 - Récupération TechnicalSpecBothArray (ATTRIBUTS!)')
  console.log('='.repeat(80))
  console.log()

  const partNo = 'IT00922F'

  try {
    // D'abord, récupérer les références pour obtenir TechnicalSpecNo
    console.log('🔍 Étape 1: Récupération références...\n')
    const references = await ifsGet<any>(
      `PartHandling.svc/PartCatalogSet(PartNo='${partNo}')/PartCatalogReferenceArray`
    )
    
    if (!references.value || references.value.length === 0) {
      console.log('⚠️  Aucune référence trouvée pour cette pièce\n')
      return
    }
    
    // Prendre la première référence avec TechnicalSpecNo
    const ref = references.value.find((r: any) => r.TechnicalSpecNo != null)
    
    if (!ref) {
      console.log('⚠️  Aucune référence avec TechnicalSpecNo trouvée\n')
      return
    }
    
    console.log(`✅ Référence trouvée:`)
    console.log(`   LuName: ${ref.LuName}`)
    console.log(`   KeyRef: ${ref.KeyRef}`)
    console.log(`   TechnicalSpecNo: ${ref.TechnicalSpecNo}\n`)
    
    // Construire l'URL complète
    const keyRef = encodeURIComponent(ref.KeyRef)
    const luName = ref.LuName
    const techSpecNo = ref.TechnicalSpecNo
    
    console.log('🔍 Étape 2: Récupération attributs techniques...\n')
    
    const technicalSpecs = await ifsGet<any>(
      `PartHandling.svc/PartCatalogSet(PartNo='${partNo}')/PartCatalogReferenceArray(LuName='${luName}',KeyRef='${keyRef}',TechnicalSpecNo=${techSpecNo})/TechnicalSpecBothArray?$orderby=AttribNumber&$expand=TechnicalAttribStdRef($select=AttribDesc)`
    )
    
    const count = technicalSpecs.value?.length || 0
    console.log(`✅ ${count} attributs techniques trouvés!\n`)
    
    if (count > 0) {
      console.log('📊 LISTE DES ATTRIBUTS TECHNIQUES:\n')
      console.log('='.repeat(80))
      
      technicalSpecs.value.forEach((attr: any, i: number) => {
        console.log(`\n${i + 1}. Attribute: ${attr.Attribute}`)
        console.log(`   AttribNumber: ${attr.AttribNumber}`)
        console.log(`   ValueText: ${attr.ValueText || 'N/A'}`)
        console.log(`   ValueNo: ${attr.ValueNo || 'N/A'}`)
        console.log(`   TechnicalClass: ${attr.TechnicalClass || 'N/A'}`)
        console.log(`   TechnicalUom: ${attr.TechnicalUom || 'N/A'}`)
        
        if (attr.TechnicalAttribStdRef) {
          console.log(`   Description: ${attr.TechnicalAttribStdRef.AttribDesc || 'N/A'}`)
        }
      })
      
      console.log('\n' + '='.repeat(80))
      
      // 🎯 RECHERCHE DES ATTRIBUTS PART PRINTER
      console.log('\n🎯 RECHERCHE ATTRIBUTS PART PRINTER:\n')
      
      const attrs = technicalSpecs.value
      
      const genericCodeVariants = ['GENERIC CODE', 'GENERIC_CODE', 'GENERIC', 'GEN']
      const lengthSetupVariants = ['LENGTH SETUP', 'LENGTH_SETUP', 'LENGTH', 'LEN']
      const varnishCodeVariants = ['VARNISH CODE', 'VARNISH_CODE', 'VARNISH', 'VARN']
      
      const genericCode = attrs.find((a: any) => 
        genericCodeVariants.some(v => a.Attribute?.toUpperCase().includes(v))
      )
      const lengthSetup = attrs.find((a: any) => 
        lengthSetupVariants.some(v => a.Attribute?.toUpperCase().includes(v))
      )
      const varnishCode = attrs.find((a: any) => 
        varnishCodeVariants.some(v => a.Attribute?.toUpperCase().includes(v))
      )
      
      console.log('Résultats:')
      console.log(`  GENERIC CODE: ${genericCode ? `✅ TROUVÉ (${genericCode.Attribute} = ${genericCode.ValueText || genericCode.ValueNo})` : '❌ NON TROUVÉ'}`)
      console.log(`  LENGTH SETUP: ${lengthSetup ? `✅ TROUVÉ (${lengthSetup.Attribute} = ${lengthSetup.ValueText || lengthSetup.ValueNo})` : '❌ NON TROUVÉ'}`)
      console.log(`  VARNISH CODE: ${varnishCode ? `✅ TROUVÉ (${varnishCode.Attribute} = ${varnishCode.ValueText || varnishCode.ValueNo})` : '❌ NON TROUVÉ'}`)
      
      if (genericCode || lengthSetup || varnishCode) {
        console.log('\n🎉🎉🎉 SUCCÈS MAJEUR! ATTRIBUTS PART PRINTER TROUVÉS! 🎉🎉🎉')
        
        return {
          partNo,
          genericCode: genericCode ? (genericCode.ValueText || genericCode.ValueNo) : null,
          lengthSetup: lengthSetup ? (lengthSetup.ValueText || lengthSetup.ValueNo) : null,
          varnishCode: varnishCode ? (varnishCode.ValueText || varnishCode.ValueNo) : null,
          allAttributes: attrs
        }
      }
      
      return { partNo, allAttributes: attrs }
    }
    
  } catch (error) {
    console.error('❌ Erreur:', (error as Error).message)
    return null
  }
}

async function test4_TestMultipleParts() {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TEST 8.4 - Test avec plusieurs pièces')
  console.log('='.repeat(80))
  console.log()

  const testParts = [
    'IT00922F',
    'LG5MA0XD02',
    '022879' // La pièce du cURL original (FR017)
  ]

  for (const partNo of testParts) {
    console.log(`\n${'▶'.repeat(40)}`)
    console.log(`🔍 Test: ${partNo}`)
    console.log('▶'.repeat(40))
    
    try {
      const references = await ifsGet<any>(
        `PartHandling.svc/PartCatalogSet(PartNo='${partNo}')/PartCatalogReferenceArray`
      )
      
      if (references.value && references.value.length > 0) {
        const ref = references.value.find((r: any) => r.TechnicalSpecNo != null)
        
        if (ref) {
          const keyRef = encodeURIComponent(ref.KeyRef)
          const technicalSpecs = await ifsGet<any>(
            `PartHandling.svc/PartCatalogSet(PartNo='${partNo}')/PartCatalogReferenceArray(LuName='${ref.LuName}',KeyRef='${keyRef}',TechnicalSpecNo=${ref.TechnicalSpecNo})/TechnicalSpecBothArray`
          )
          
          const count = technicalSpecs.value?.length || 0
          console.log(`✅ ${count} attributs trouvés pour ${partNo}`)
          
          if (count > 0) {
            const attrs = technicalSpecs.value.map((a: any) => a.Attribute).join(', ')
            console.log(`   Attributs: ${attrs}`)
          }
        } else {
          console.log(`⚠️  Pas de TechnicalSpecNo pour ${partNo}`)
        }
      } else {
        console.log(`⚠️  Aucune référence pour ${partNo}`)
      }
      
    } catch (error) {
      const msg = (error as Error).message
      if (msg.includes('404')) {
        console.log(`⚠️  Pièce ${partNo} non trouvée dans PartCatalog`)
      } else {
        console.log(`❌ ${msg.substring(0, 100)}`)
      }
    }
  }
}

async function main() {
  console.log('🚀 TEST 8 - PartCatalog Technical Specifications\n')
  console.log('🎯 Endpoint découvert: PartCatalogSet(...)/TechnicalSpecBothArray\n')
  console.log('📍 Source: DevTools Network Analysis\n')
  
  await test1_GetPartCatalog()
  await test2_GetPartCatalogReference()
  const result = await test3_GetTechnicalSpecs()
  await test4_TestMultipleParts()
  
  console.log('\n' + '='.repeat(80))
  console.log('✅ TEST 8 TERMINÉ')
  console.log('='.repeat(80))
  
  if (result && (result.genericCode || result.lengthSetup || result.varnishCode)) {
    console.log('\n🎉 SOLUTION VALIDÉE!')
    console.log('📝 Workflow complet:')
    console.log('   1. PartCatalogSet(PartNo) → Get part catalog')
    console.log('   2. /PartCatalogReferenceArray → Get technical spec reference')
    console.log('   3. /TechnicalSpecBothArray → Get all technical attributes')
    console.log('   4. Filter by Attribute name → Extract GENERIC CODE, LENGTH SETUP, VARNISH CODE')
  }
}

main().catch(e => {
  console.error('💥 Erreur fatale:', e)
  process.exit(1)
})
