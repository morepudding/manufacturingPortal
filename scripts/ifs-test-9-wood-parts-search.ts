/**
 * 🪵 TEST 9 - Recherche pièces BOIS avec attributs Part Printer
 * 
 * Stratégie: Chercher des pièces avec TechnicalClass AN29-00-00 (bois)
 *            et vérifier si elles ont GENERIC CODE, LENGTH SETUP, VARNISH CODE
 * 
 * Approche:
 * 1. Lister toutes les TechnicalClass disponibles
 * 2. Chercher les pièces avec TechnicalClass liée au bois (AN29-*, WOOD, etc.)
 * 3. Analyser leurs attributs techniques
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

  const shortEndpoint = endpoint.length > 150 ? endpoint.substring(0, 150) + '...' : endpoint
  console.log('📡', shortEndpoint)

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

async function test1_ListTechnicalClasses() {
  console.log('='.repeat(80))
  console.log('🧪 TEST 9.1 - Liste des TechnicalClass disponibles')
  console.log('='.repeat(80))
  console.log()

  try {
    console.log('🔍 Recherche dans AttributesHandling/TechnicalAttribStdSet...\n')
    
    const response = await ifsGet<any>(
      'AttributesHandling.svc/TechnicalAttribStdSet?$select=TechnicalClass,Attribute,AttribDesc&$top=200'
    )
    
    const count = response.value?.length || 0
    console.log(`✅ ${count} attributs trouvés\n`)
    
    if (count > 0) {
      // Grouper par TechnicalClass
      const byClass = new Map<string, any[]>()
      response.value.forEach((attr: any) => {
        const tc = attr.TechnicalClass || 'N/A'
        if (!byClass.has(tc)) {
          byClass.set(tc, [])
        }
        byClass.get(tc)!.push(attr)
      })
      
      console.log('📊 TechnicalClass trouvées:\n')
      const sorted = Array.from(byClass.entries()).sort((a, b) => a[0].localeCompare(b[0]))
      
      let woodClassFound = false
      for (const [techClass, attrs] of sorted) {
        const isWood = techClass.includes('29') || techClass.includes('WOOD') || techClass.includes('BOIS')
        const marker = isWood ? '🪵' : '  '
        console.log(`${marker} ${techClass} (${attrs.length} attributs)`)
        
        if (isWood) {
          woodClassFound = true
          console.log(`   🔍 Attributs dans cette classe:`)
          attrs.slice(0, 5).forEach((a: any) => {
            console.log(`      - ${a.Attribute}: ${a.AttribDesc || 'N/A'}`)
          })
          if (attrs.length > 5) {
            console.log(`      ... et ${attrs.length - 5} autres`)
          }
        }
      }
      
      if (woodClassFound) {
        console.log('\n🎯 Classes "bois" trouvées! Cherchons maintenant GENERIC CODE, LENGTH SETUP, VARNISH CODE...\n')
      }
      
      return sorted
    }
    
  } catch (error) {
    console.error('❌ Erreur:', (error as Error).message)
    return []
  }
}

async function test2_FindWoodAttributes() {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TEST 9.2 - Recherche attributs GENERIC CODE, LENGTH SETUP, VARNISH CODE')
  console.log('='.repeat(80))
  console.log()

  const searchTerms = [
    { name: 'GENERIC CODE', variants: ['GENERIC CODE', 'GENERIC_CODE', 'GENERIC', 'CODE GENERIQUE'] },
    { name: 'LENGTH SETUP', variants: ['LENGTH SETUP', 'LENGTH_SETUP', 'LENGTH', 'LONGUEUR'] },
    { name: 'VARNISH CODE', variants: ['VARNISH CODE', 'VARNISH_CODE', 'VARNISH', 'VERNIS'] }
  ]

  const foundAttributes = new Map<string, any>()

  for (const term of searchTerms) {
    console.log(`\n🔍 Recherche: ${term.name}`)
    
    for (const variant of term.variants) {
      try {
        const response = await ifsGet<any>(
          `AttributesHandling.svc/TechnicalAttribStdSet?$filter=contains(Attribute,'${variant}')&$top=10`
        )
        
        if (response.value && response.value.length > 0) {
          console.log(`   ✅ Trouvé avec "${variant}":`)
          response.value.forEach((attr: any) => {
            console.log(`      - Attribute: ${attr.Attribute}`)
            console.log(`        TechnicalClass: ${attr.TechnicalClass}`)
            console.log(`        AttribDesc: ${attr.AttribDesc || 'N/A'}`)
            console.log(`        AttribType: ${attr.AttribType || 'N/A'}`)
            
            foundAttributes.set(attr.Attribute, attr)
          })
          break
        }
      } catch (error) {
        // Continue avec la variante suivante
      }
    }
  }

  console.log(`\n📊 Résumé: ${foundAttributes.size} attributs Part Printer trouvés\n`)
  
  if (foundAttributes.size > 0) {
    console.log('🎉 ATTRIBUTS TROUVÉS:')
    for (const [name, attr] of foundAttributes) {
      console.log(`   ✅ ${name} (${attr.TechnicalClass})`)
    }
    return Array.from(foundAttributes.values())
  }
  
  return []
}

async function test3_FindPartsWithWoodClass() {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TEST 9.3 - Recherche pièces avec classe technique bois')
  console.log('='.repeat(80))
  console.log()

  const woodClasses = [
    'AN29-00-00',
    'AN29',
    'AN-29-00-00',
    'WOOD'
  ]

  for (const woodClass of woodClasses) {
    console.log(`\n🔍 Recherche pièces avec TechnicalClass: ${woodClass}`)
    
    try {
      // Chercher dans TechnicalSpecBothArray avec cette classe
      // Stratégie: Chercher dans les attributs eux-mêmes qui ont cette classe
      const response = await ifsGet<any>(
        `AttributesHandling.svc/TechnicalAttribStdSet?$filter=TechnicalClass eq '${woodClass}'&$top=20`
      )
      
      if (response.value && response.value.length > 0) {
        console.log(`   ✅ ${response.value.length} attributs trouvés dans cette classe`)
        console.log(`   📋 Attributs disponibles:`)
        
        const hasPartPrinterAttrs = {
          genericCode: false,
          lengthSetup: false,
          varnishCode: false
        }
        
        response.value.forEach((attr: any) => {
          console.log(`      - ${attr.Attribute}`)
          
          const attrUpper = attr.Attribute.toUpperCase()
          if (attrUpper.includes('GENERIC')) hasPartPrinterAttrs.genericCode = true
          if (attrUpper.includes('LENGTH')) hasPartPrinterAttrs.lengthSetup = true
          if (attrUpper.includes('VARNISH') || attrUpper.includes('VERNIS')) hasPartPrinterAttrs.varnishCode = true
        })
        
        console.log(`\n   🎯 Attributs Part Printer dans ${woodClass}:`)
        console.log(`      GENERIC CODE: ${hasPartPrinterAttrs.genericCode ? '✅ OUI' : '❌ NON'}`)
        console.log(`      LENGTH SETUP: ${hasPartPrinterAttrs.lengthSetup ? '✅ OUI' : '❌ NON'}`)
        console.log(`      VARNISH CODE: ${hasPartPrinterAttrs.varnishCode ? '✅ OUI' : '❌ NON'}`)
        
        if (hasPartPrinterAttrs.genericCode || hasPartPrinterAttrs.lengthSetup || hasPartPrinterAttrs.varnishCode) {
          console.log(`\n   🎉 CLASSE BOIS TROUVÉE: ${woodClass}`)
          return { woodClass, attributes: response.value }
        }
      } else {
        console.log(`   ⚠️  Aucun attribut avec cette classe`)
      }
      
    } catch (error) {
      console.log(`   ❌ Erreur: ${(error as Error).message.substring(0, 100)}`)
    }
  }
  
  return null
}

async function test4_SearchPartsByTechnicalSpec(woodClassInfo: any) {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TEST 9.4 - Recherche pièces ayant des attributs de cette classe')
  console.log('='.repeat(80))
  console.log()

  if (!woodClassInfo) {
    console.log('⏭️  Aucune classe bois trouvée (skip)\n')
    return
  }

  console.log(`🔍 Recherche pièces avec TechnicalClass: ${woodClassInfo.woodClass}\n`)

  try {
    // Chercher des pièces dans PartCatalog qui ont des TechnicalSpec
    console.log('🔍 Stratégie: Lister des pièces avec TechnicalSpec et analyser leurs attributs\n')
    
    // Lister quelques pièces du catalogue
    const parts = await ifsGet<any>(
      'PartHandling.svc/PartCatalogSet?$top=50'
    )
    
    console.log(`📊 ${parts.value?.length || 0} pièces trouvées dans le catalogue\n`)
    
    if (parts.value && parts.value.length > 0) {
      let woodPartsFound = 0
      
      for (const part of parts.value.slice(0, 20)) {
        try {
          // Vérifier si la pièce a des références techniques
          const refs = await ifsGet<any>(
            `PartHandling.svc/PartCatalogSet(PartNo='${part.PartNo}')/PartCatalogReferenceArray`
          )
          
          if (refs.value && refs.value.length > 0) {
            const ref = refs.value.find((r: any) => r.TechnicalSpecNo != null)
            
            if (ref) {
              const keyRef = encodeURIComponent(ref.KeyRef)
              const specs = await ifsGet<any>(
                `PartHandling.svc/PartCatalogSet(PartNo='${part.PartNo}')/PartCatalogReferenceArray(LuName='${ref.LuName}',KeyRef='${keyRef}',TechnicalSpecNo=${ref.TechnicalSpecNo})/TechnicalSpecBothArray?$select=Attribute,TechnicalClass,ValueText,ValueNo`
              )
              
              if (specs.value && specs.value.length > 0) {
                // Vérifier si cette pièce a des attributs de la classe bois
                const hasWoodClass = specs.value.some((s: any) => s.TechnicalClass === woodClassInfo.woodClass)
                
                if (hasWoodClass) {
                  woodPartsFound++
                  console.log(`\n🪵 PIÈCE BOIS TROUVÉE: ${part.PartNo}`)
                  console.log(`   Description: ${part.Description || 'N/A'}`)
                  console.log(`   Attributs de classe ${woodClassInfo.woodClass}:`)
                  
                  const woodAttrs = specs.value.filter((s: any) => s.TechnicalClass === woodClassInfo.woodClass)
                  woodAttrs.forEach((attr: any) => {
                    const value = attr.ValueText || attr.ValueNo || 'N/A'
                    console.log(`      - ${attr.Attribute}: ${value}`)
                  })
                  
                  // Chercher les attributs Part Printer
                  const genericCode = woodAttrs.find((a: any) => a.Attribute?.toUpperCase().includes('GENERIC'))
                  const lengthSetup = woodAttrs.find((a: any) => a.Attribute?.toUpperCase().includes('LENGTH'))
                  const varnishCode = woodAttrs.find((a: any) => a.Attribute?.toUpperCase().includes('VARNISH'))
                  
                  if (genericCode || lengthSetup || varnishCode) {
                    console.log(`\n   🎉 ATTRIBUTS PART PRINTER TROUVÉS:`)
                    if (genericCode) console.log(`      ✅ GENERIC CODE: ${genericCode.ValueText || genericCode.ValueNo}`)
                    if (lengthSetup) console.log(`      ✅ LENGTH SETUP: ${lengthSetup.ValueText || lengthSetup.ValueNo}`)
                    if (varnishCode) console.log(`      ✅ VARNISH CODE: ${varnishCode.ValueText || varnishCode.ValueNo}`)
                    
                    return { partNo: part.PartNo, genericCode, lengthSetup, varnishCode }
                  }
                  
                  if (woodPartsFound >= 3) break
                }
              }
            }
          }
        } catch (error) {
          // Continue avec la pièce suivante
        }
      }
      
      console.log(`\n📊 Résumé: ${woodPartsFound} pièces bois trouvées`)
    }
    
  } catch (error) {
    console.error('❌ Erreur:', (error as Error).message)
  }
}

async function main() {
  console.log('🚀 TEST 9 - Recherche pièces BOIS avec attributs Part Printer\n')
  console.log('🎯 Objectif: Trouver TechnicalClass AN29-00-00 (bois)\n')
  console.log('🔍 Rechercher: GENERIC CODE, LENGTH SETUP, VARNISH CODE\n')
  
  const classes = await test1_ListTechnicalClasses()
  const attributes = await test2_FindWoodAttributes()
  const woodClassInfo = await test3_FindPartsWithWoodClass()
  
  if (woodClassInfo) {
    await test4_SearchPartsByTechnicalSpec(woodClassInfo)
  }
  
  console.log('\n' + '='.repeat(80))
  console.log('✅ TEST 9 TERMINÉ')
  console.log('='.repeat(80))
  console.log('\n💡 Si les attributs Part Printer sont trouvés:')
  console.log('   → On a la solution complète!')
  console.log('   → Workflow: PartCatalogSet → TechnicalSpecBothArray (filter by TechnicalClass)')
}

main().catch(e => {
  console.error('💥 Erreur fatale:', e)
  process.exit(1)
})
