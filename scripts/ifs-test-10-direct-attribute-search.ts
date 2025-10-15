/**
 * 🎯 TEST 10 - Recherche DIRECTE de pièces avec GENERIC CODE, LENGTH SETUP, VARNISH CODE
 * 
 * Stratégie: Parcourir des pièces du catalogue et chercher celles qui ont ces attributs
 * 
 * On sait maintenant que les attributs existent:
 * - GENERIC CODE (Alphanumeric)
 * - LENGTH SETUP (Numeric)
 * - VARNISH CODE (Alphanumeric)
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

async function checkPartForAttributes(partNo: string): Promise<any> {
  try {
    // Récupérer les références techniques
    const refs = await ifsGet<any>(
      `PartHandling.svc/PartCatalogSet(PartNo='${partNo}')/PartCatalogReferenceArray`,
      true
    )
    
    if (!refs.value || refs.value.length === 0) {
      return null
    }
    
    const ref = refs.value.find((r: any) => r.TechnicalSpecNo != null)
    if (!ref) return null
    
    // Récupérer les attributs techniques
    const keyRef = encodeURIComponent(ref.KeyRef)
    const specs = await ifsGet<any>(
      `PartHandling.svc/PartCatalogSet(PartNo='${partNo}')/PartCatalogReferenceArray(LuName='${ref.LuName}',KeyRef='${keyRef}',TechnicalSpecNo=${ref.TechnicalSpecNo})/TechnicalSpecBothArray?$select=Attribute,TechnicalClass,ValueText,ValueNo`,
      true
    )
    
    if (!specs.value || specs.value.length === 0) {
      return null
    }
    
    // Chercher les attributs Part Printer
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
        allAttributes: specs.value
      }
    }
    
    return null
    
  } catch (error) {
    return null
  }
}

async function test1_ScanCatalog() {
  console.log('='.repeat(80))
  console.log('🧪 TEST 10.1 - Scan du catalogue pour trouver pièces avec attributs Part Printer')
  console.log('='.repeat(80))
  console.log()

  console.log('🔍 Récupération de pièces du catalogue...\n')
  
  try {
    const parts = await ifsGet<any>(
      'PartHandling.svc/PartCatalogSet?$top=500&$select=PartNo,Description'
    )
    
    const total = parts.value?.length || 0
    console.log(`📊 ${total} pièces à analyser\n`)
    console.log('⏳ Scan en cours (recherche GENERIC CODE, LENGTH SETUP, VARNISH CODE avec VALEURS)...\n')
    
    if (total > 0) {
      let checked = 0
      let foundCount = 0
      let foundWithValuesCount = 0
      const foundParts: any[] = []
      const foundPartsWithValues: any[] = []
      
      for (const part of parts.value) {
        checked++
        
        const result = await checkPartForAttributes(part.PartNo)
        
        if (result) {
          foundCount++
          foundParts.push(result)
          
          // Vérifier si les valeurs sont remplies (pas null, pas 'N/A', pas vide)
          const hasRealValues = (
            (result.genericCode && result.genericCode !== 'N/A' && result.genericCode !== '') ||
            (result.lengthSetup && result.lengthSetup !== 'N/A' && result.lengthSetup !== '') ||
            (result.varnishCode && result.varnishCode !== 'N/A' && result.varnishCode !== '')
          )
          
          if (hasRealValues) {
            foundWithValuesCount++
            foundPartsWithValues.push(result)
            
            console.log(`\n🎉 PIÈCE AVEC VALEURS #${foundWithValuesCount}: ${result.partNo}`)
            console.log(`   Description: ${part.Description || 'N/A'}`)
            console.log(`   TechnicalClass: ${result.technicalClass || 'N/A'}`)
            console.log(`   ✅ GENERIC CODE: ${result.genericCode || '❌ VIDE'}`)
            console.log(`   ✅ LENGTH SETUP: ${result.lengthSetup || '❌ VIDE'}`)
            console.log(`   ✅ VARNISH CODE: ${result.varnishCode || '❌ VIDE'}`)
            console.log(`   Autres attributs: ${result.allAttributes.length} au total`)
            
            if (foundWithValuesCount >= 10) {
              console.log(`\n✋ 10 pièces avec valeurs trouvées, arrêt du scan`)
              break
            }
          }
        }
        
        if (checked % 20 === 0) {
          process.stdout.write(`   Progression: ${checked}/${total} vérifiées | ${foundCount} avec attributs | ${foundWithValuesCount} AVEC VALEURS ✅\r`)
        }
      }
      
      console.log(`\n\n📊 RÉSULTAT FINAL:`)
      console.log(`   Pièces analysées: ${checked}/${total}`)
      console.log(`   Pièces avec attributs Part Printer (structure): ${foundCount}`)
      console.log(`   Pièces avec VALEURS remplies: ${foundWithValuesCount}`)
      
      if (foundWithValuesCount > 0) {
        console.log(`\n🎉🎉🎉 SUCCÈS TOTAL! Des valeurs réelles existent!`)
        console.log(`\n📋 Liste des pièces avec VALEURS:`)
        foundPartsWithValues.forEach((p, i) => {
          console.log(`   ${i + 1}. ${p.partNo} (TechnicalClass: ${p.technicalClass || 'N/A'})`)
          if (p.genericCode && p.genericCode !== 'N/A') console.log(`      GENERIC CODE: ${p.genericCode}`)
          if (p.lengthSetup && p.lengthSetup !== 'N/A') console.log(`      LENGTH SETUP: ${p.lengthSetup}`)
          if (p.varnishCode && p.varnishCode !== 'N/A') console.log(`      VARNISH CODE: ${p.varnishCode}`)
        })
        
        // Grouper par TechnicalClass
        const byClass = new Map<string, number>()
        foundPartsWithValues.forEach(p => {
          const tc = p.technicalClass || 'N/A'
          byClass.set(tc, (byClass.get(tc) || 0) + 1)
        })
        
        console.log(`\n📊 TechnicalClass des pièces avec valeurs:`)
        for (const [tc, count] of byClass) {
          console.log(`   🪵 ${tc}: ${count} pièce(s)`)
        }
        
        return foundPartsWithValues
      } else if (foundCount > 0) {
        console.log(`\n⚠️  ${foundCount} pièces ont la structure des attributs mais AUCUNE valeur remplie`)
        console.log(`   → Environnement AST non configuré pour ces attributs`)
        console.log(`\n📋 Liste des pièces avec structure (mais valeurs vides):`)
        foundParts.slice(0, 10).forEach((p, i) => {
          console.log(`   ${i + 1}. ${p.partNo} (TechnicalClass: ${p.technicalClass || 'N/A'})`)
        })
        return []
      } else {
        console.log(`\n⚠️  Aucune pièce trouvée avec ces attributs dans les ${checked} premières pièces`)
        console.log(`   Les attributs existent dans TechnicalAttribStdSet mais ne sont pas utilisés`)
        return []
      }
    }
    
  } catch (error) {
    console.error('❌ Erreur:', (error as Error).message)
  }
  
  return []
}

async function test2_TestSpecificParts() {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TEST 10.2 - Test de pièces spécifiques (pièces bois connues)')
  console.log('='.repeat(80))
  console.log()

  // Essayer des pièces qui pourraient être en bois
  const testParts = [
    '022879',      // De votre cURL original
    'LG5MA0XD02',  // Testé précédemment
    'IT00922F',    // Testé précédemment
    'WOOD',        // Si une pièce s'appelle WOOD
    'OAK',         // Chêne
    'PINE',        // Pin
    'PLYWOOD'      // Contreplaqué
  ]

  for (const partNo of testParts) {
    console.log(`\n🔍 Test: ${partNo}`)
    
    const result = await checkPartForAttributes(partNo)
    
    if (result) {
      console.log(`   🎉 ATTRIBUTS TROUVÉS!`)
      console.log(`   ✅ GENERIC CODE: ${result.genericCode || 'N/A'}`)
      console.log(`   ✅ LENGTH SETUP: ${result.lengthSetup || 'N/A'}`)
      console.log(`   ✅ VARNISH CODE: ${result.varnishCode || 'N/A'}`)
      console.log(`   TechnicalClass: ${result.technicalClass || 'N/A'}`)
      return result
    } else {
      console.log(`   ⚠️  Pas d'attributs Part Printer`)
    }
  }
  
  return null
}

async function main() {
  console.log('🚀 TEST 10 - Recherche DIRECTE de pièces avec attributs Part Printer\n')
  console.log('🎯 Attributs recherchés:')
  console.log('   - GENERIC CODE (Alphanumeric)')
  console.log('   - LENGTH SETUP (Numeric)')
  console.log('   - VARNISH CODE (Alphanumeric)\n')
  
  const foundInCatalog = await test1_ScanCatalog()
  
  if (foundInCatalog.length === 0) {
    console.log('\n🔄 Aucune pièce trouvée dans le scan, test de pièces spécifiques...')
    await test2_TestSpecificParts()
  }
  
  console.log('\n' + '='.repeat(80))
  console.log('✅ TEST 10 TERMINÉ')
  console.log('='.repeat(80))
  console.log('\n💡 Conclusion:')
  console.log('   Si des pièces sont trouvées → Solution complète validée!')
  console.log('   Si aucune pièce → Attributs définis mais pas encore utilisés en AST')
  console.log('   → Recommandation: Table SQL locale ou attendre configuration IFS')
}

main().catch(e => {
  console.error('💥 Erreur fatale:', e)
  process.exit(1)
})
