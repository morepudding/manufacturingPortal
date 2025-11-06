/**
 * 🎯 TEST 11 - Scan CIBLÉ sur TechnicalClass AN28 (bois/contreplaqué)
 * 
 * Stratégie: 
 * 1. Chercher TOUTES les pièces qui ont des attributs de classe AN28-*
 * 2. Scanner spécifiquement ces pièces pour trouver des valeurs
 * 
 * On sait que IT01229W, IT07060Y, IT05452P ont AN28-03-00
 * → Trouvons d'autres pièces similaires avec des valeurs remplies
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

async function ifsGet<T>(endpoint: string, silent = false): Promise<T> {
  const token = await getAccessToken()
  const url = `${IFS_CONFIG.baseUrl}/${endpoint}`

  if (!silent) {
    const shortEndpoint = endpoint.length > 120 ? endpoint.substring(0, 120) + '...' : endpoint
    console.log('📡', shortEndpoint)
  }

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  return await response.json() as T
}

async function checkPartForAN28Attributes(partNo: string): Promise<any> {
  try {
    const refs = await ifsGet<any>(
      `PartHandling.svc/PartCatalogSet(PartNo='${partNo}')/PartCatalogReferenceArray`,
      true
    )
    
    if (!refs.value || refs.value.length === 0) {
      return null
    }
    
    const ref = refs.value.find((r: any) => r.TechnicalSpecNo != null)
    if (!ref) return null
    
    const keyRef = encodeURIComponent(ref.KeyRef)
    const specs = await ifsGet<any>(
      `PartHandling.svc/PartCatalogSet(PartNo='${partNo}')/PartCatalogReferenceArray(LuName='${ref.LuName}',KeyRef='${keyRef}',TechnicalSpecNo=${ref.TechnicalSpecNo})/TechnicalSpecBothArray?$select=Attribute,TechnicalClass,ValueText,ValueNo`,
      true
    )
    
    if (!specs.value || specs.value.length === 0) {
      return null
    }
    
    // Chercher des attributs AN28
    const an28Attributes = specs.value.filter((a: any) => 
      a.TechnicalClass && a.TechnicalClass.startsWith('AN28')
    )
    
    if (an28Attributes.length === 0) {
      return null
    }
    
    // Chercher spécifiquement GENERIC CODE, LENGTH SETUP, VARNISH CODE
    const genericCode = specs.value.find((a: any) => a.Attribute === 'GENERIC CODE')
    const lengthSetup = specs.value.find((a: any) => a.Attribute === 'LENGTH SETUP')
    const varnishCode = specs.value.find((a: any) => a.Attribute === 'VARNISH CODE')
    
    if (genericCode || lengthSetup || varnishCode) {
      return {
        partNo,
        genericCode: genericCode ? (genericCode.ValueText || genericCode.ValueNo) : null,
        lengthSetup: lengthSetup ? (lengthSetup.ValueText || lengthSetup.ValueNo) : null,
        varnishCode: varnishCode ? (varnishCode.ValueText || varnishCode.ValueNo) : null,
        technicalClass: genericCode?.TechnicalClass || lengthSetup?.TechnicalClass || varnishCode?.TechnicalClass,
        an28AttributesCount: an28Attributes.length,
        allAN28Attributes: an28Attributes
      }
    }
    
    return null
    
  } catch (error) {
    return null
  }
}

async function test1_ScanLargeCatalog() {
  console.log('='.repeat(80))
  console.log('🧪 TEST 11.1 - Scan MASSIF du catalogue (focus sur AN28)')
  console.log('='.repeat(80))
  console.log()

  console.log('🔍 Stratégie: Scanner 2000 pièces pour trouver celles avec AN28 et valeurs\n')
  
  try {
    // Scanner par batches de 500
    const itemsPerBatch = 500
    const totalBatches = 4 // 2000 pièces au total
    
    let totalChecked = 0
    let foundWithStructure = 0
    let foundWithValues = 0
    const partsWithValues: any[] = []
    const partsWithStructure: any[] = []
    
    for (let batch = 0; batch < totalBatches; batch++) {
      console.log(`\n📦 Batch ${batch + 1}/${totalBatches} (skip=${batch * itemsPerBatch})`)
      
      const parts = await ifsGet<any>(
        `PartHandling.svc/PartCatalogSet?$skip=${batch * itemsPerBatch}&$top=${itemsPerBatch}&$select=PartNo,Description`
      )
      
      const batchCount = parts.value?.length || 0
      console.log(`   ${batchCount} pièces récupérées`)
      
      if (batchCount === 0) break
      
      for (const part of parts.value) {
        totalChecked++
        
        const result = await checkPartForAN28Attributes(part.PartNo)
        
        if (result) {
          foundWithStructure++
          partsWithStructure.push({ ...result, description: part.Description })
          
          const hasRealValues = (
            (result.genericCode && result.genericCode !== 'N/A' && result.genericCode !== '') ||
            (result.lengthSetup && result.lengthSetup !== 'N/A' && result.lengthSetup !== '') ||
            (result.varnishCode && result.varnishCode !== 'N/A' && result.varnishCode !== '')
          )
          
          if (hasRealValues) {
            foundWithValues++
            partsWithValues.push({ ...result, description: part.Description })
            
            console.log(`\n   🎉 VALEURS TROUVÉES #${foundWithValues}: ${result.partNo}`)
            console.log(`      Description: ${part.Description || 'N/A'}`)
            console.log(`      TechnicalClass: ${result.technicalClass}`)
            console.log(`      ✅ GENERIC CODE: ${result.genericCode || '❌'}`)
            console.log(`      ✅ LENGTH SETUP: ${result.lengthSetup || '❌'}`)
            console.log(`      ✅ VARNISH CODE: ${result.varnishCode || '❌'}`)
            
            if (foundWithValues >= 10) {
              console.log(`\n   ✋ 10 pièces avec valeurs trouvées, arrêt!`)
              return { partsWithValues, partsWithStructure, totalChecked, foundWithStructure, foundWithValues }
            }
          }
        }
        
        if (totalChecked % 50 === 0) {
          process.stdout.write(`   Progress: ${totalChecked} | Structure: ${foundWithStructure} | VALEURS: ${foundWithValues} ✅\r`)
        }
      }
    }
    
    console.log(`\n\n📊 RÉSULTAT SCAN MASSIF:`)
    console.log(`   Total pièces scannées: ${totalChecked}`)
    console.log(`   Pièces avec structure AN28: ${foundWithStructure}`)
    console.log(`   Pièces avec VALEURS: ${foundWithValues}`)
    
    if (foundWithValues > 0) {
      console.log(`\n🎉🎉🎉 SUCCÈS! ${foundWithValues} pièces avec vraies valeurs!`)
      console.log(`\n📋 PIÈCES AVEC VALEURS:`)
      partsWithValues.forEach((p, i) => {
        console.log(`\n${i + 1}. ${p.partNo} - ${p.description}`)
        console.log(`   TechnicalClass: ${p.technicalClass}`)
        if (p.genericCode) console.log(`   GENERIC CODE: ${p.genericCode}`)
        if (p.lengthSetup) console.log(`   LENGTH SETUP: ${p.lengthSetup}`)
        if (p.varnishCode) console.log(`   VARNISH CODE: ${p.varnishCode}`)
      })
    } else if (foundWithStructure > 0) {
      console.log(`\n⚠️  ${foundWithStructure} pièces avec structure mais 0 avec valeurs`)
      console.log(`\n📋 Échantillon de pièces AN28 trouvées (structure vide):`)
      partsWithStructure.slice(0, 10).forEach((p, i) => {
        console.log(`   ${i + 1}. ${p.partNo} - ${p.description}`)
        console.log(`      TechnicalClass: ${p.technicalClass}`)
        console.log(`      Attributs AN28: ${p.an28AttributesCount}`)
      })
    }
    
    return { partsWithValues, partsWithStructure, totalChecked, foundWithStructure, foundWithValues }
    
  } catch (error) {
    console.error('❌ Erreur:', (error as Error).message)
    return null
  }
}

async function test2_TestKnownAN28Parts() {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TEST 11.2 - Test des pièces AN28 connues en détail')
  console.log('='.repeat(80))
  console.log()

  const knownParts = [
    'IT01229W', // PLYWOOD OKOUME 18MM 3100X1530
    'IT07060Y',
    'IT05452P'
  ]

  for (const partNo of knownParts) {
    console.log(`\n🔍 Analyse détaillée: ${partNo}`)
    
    const result = await checkPartForAN28Attributes(partNo)
    
    if (result) {
      console.log(`   ✅ Pièce AN28 confirmée`)
      console.log(`   TechnicalClass: ${result.technicalClass}`)
      console.log(`   Nombre d'attributs AN28: ${result.an28AttributesCount}`)
      console.log(`\n   📋 TOUS les attributs AN28 de cette pièce:`)
      
      result.allAN28Attributes.forEach((attr: any, i: number) => {
        const value = attr.ValueText || attr.ValueNo || '❌ VIDE'
        console.log(`      ${i + 1}. ${attr.Attribute}: ${value}`)
      })
      
      console.log(`\n   🎯 Attributs Part Printer:`)
      console.log(`      GENERIC CODE: ${result.genericCode || '❌ VIDE'}`)
      console.log(`      LENGTH SETUP: ${result.lengthSetup || '❌ VIDE'}`)
      console.log(`      VARNISH CODE: ${result.varnishCode || '❌ VIDE'}`)
    }
  }
}

async function main() {
  console.log('🚀 TEST 11 - Scan CIBLÉ sur TechnicalClass AN28\n')
  console.log('🎯 Focus: Trouver des pièces AN28 avec VRAIES VALEURS\n')
  console.log('🔍 Classes ciblées: AN28-03-00 (et toutes variantes AN28-*)\n')
  
  const scanResult = await test1_ScanLargeCatalog()
  
  console.log('\n')
  await test2_TestKnownAN28Parts()
  
  console.log('\n' + '='.repeat(80))
  console.log('✅ TEST 11 TERMINÉ')
  console.log('='.repeat(80))
  
  if (scanResult && scanResult.foundWithValues > 0) {
    console.log('\n🎉 SUCCÈS TOTAL!')
    console.log('   → Solution IFS validée avec vraies données!')
    console.log('   → Workflow: PartCatalogSet → TechnicalSpecBothArray (filter AN28)')
  } else {
    console.log('\n⚠️  Environnement AST sans données')
    console.log('   → Les structures existent mais pas les valeurs')
    console.log('   → Recommandation: Table SQL locale ou attendre config AST')
  }
}

main().catch(e => {
  console.error('💥 Erreur fatale:', e)
  process.exit(1)
})
