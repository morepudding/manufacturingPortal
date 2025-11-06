/**
 * Script de test - ManufacturingMaterialHistoryHandling
 * 
 * Objectif: Tester l'endpoint qui "View the history logs of the actions taken 
 *           on the material used in shop orders"
 * 
 * C'EST EXACTEMENT CE QU'ON CHERCHE ! 🎯
 * 
 * Utilisation:
 * npx tsx scripts/test-manufacturing-material-history.ts
 */

import 'dotenv/config'

const IFS_BASE_URL = process.env.IFS_BASE_URL || ''
const IFS_CLIENT_ID = process.env.IFS_CLIENT_ID || ''
const IFS_CLIENT_SECRET = process.env.IFS_CLIENT_SECRET || ''
const IFS_TOKEN_URL = process.env.IFS_TOKEN_URL || ''

interface TokenResponse {
  access_token: string
  expires_in: number
  token_type: string
}

/**
 * Obtenir un token OAuth2 depuis IFS
 */
async function getToken(): Promise<string> {
  console.log('🔑 Requesting OAuth2 token...')

  const params = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: IFS_CLIENT_ID,
    client_secret: IFS_CLIENT_SECRET,
    scope: 'openid microprofile-jwt',
  })

  const response = await fetch(IFS_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to get token: ${response.status} - ${error}`)
  }

  const data = (await response.json()) as TokenResponse
  console.log('✅ Token obtained\n')
  
  return data.access_token
}

/**
 * Step 1: Lister les EntitySets disponibles
 */
async function listEntitySets(token: string): Promise<string[]> {
  console.log('═══════════════════════════════════════════════════════')
  console.log('🔍 STEP 1: Lister les EntitySets disponibles')
  console.log('═══════════════════════════════════════════════════════\n')

  const url = `${IFS_BASE_URL}/ManufacturingMaterialHistoryHandling.svc`

  console.log(`📡 GET ${url}\n`)

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      console.log(`❌ Erreur ${response.status}`)
      return []
    }

    const data = await response.json()

    if (data.value && Array.isArray(data.value)) {
      console.log(`✅ ${data.value.length} EntitySets trouvés:\n`)
      
      const entitySets = data.value.map((item: any) => item.name || item.url)
      
      entitySets.forEach((name: string, index: number) => {
        console.log(`   ${index + 1}. ${name}`)
      })
      
      return entitySets
    }

    return []
  } catch (error) {
    console.log(`❌ Erreur: ${error}`)
    return []
  }
}

/**
 * Step 2: Tester un EntitySet avec différents filtres
 */
async function testEntitySet(
  token: string,
  entitySetName: string,
  orderNo: string = '454853'
): Promise<any[]> {
  console.log(`\n🔍 Test EntitySet: ${entitySetName}`)
  console.log(`   Shop Order: ${orderNo}`)

  const filters = [
    `OrderNo eq '${orderNo}'`,
    `ShopOrderNo eq '${orderNo}'`,
    `contains(OrderNo,'${orderNo}')`,
    `Order_No eq '${orderNo}'`,
  ]

  for (const filter of filters) {
    const url = `${IFS_BASE_URL}/ManufacturingMaterialHistoryHandling.svc/${entitySetName}?$filter=${encodeURIComponent(filter)}&$top=5`
    
    console.log(`   📡 Filtre: ${filter}`)
    
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        
        if (data.value && data.value.length > 0) {
          console.log(`      ✅ SUCCÈS! ${data.value.length} résultat(s) trouvé(s)`)
          
          const firstItem = data.value[0]
          const fields = Object.keys(firstItem)
          
          // Chercher les champs Material/Part/Component
          const materialFields = fields.filter(f => 
            f.toLowerCase().includes('material') ||
            f.toLowerCase().includes('part') ||
            f.toLowerCase().includes('component') ||
            f.toLowerCase().includes('operation')
          )
          
          if (materialFields.length > 0) {
            console.log(`      🎯 Champs Material/Part trouvés:`)
            materialFields.forEach(field => {
              const value = firstItem[field]
              const valueStr = value === null ? 'null' : String(value).substring(0, 50)
              console.log(`         ${field}: ${valueStr}`)
            })
          }
          
          console.log(`      📋 Tous les champs (sample):`)
          Object.keys(firstItem).slice(0, 15).forEach(key => {
            const value = firstItem[key]
            const valueStr = value === null ? 'null' : 
                            typeof value === 'object' ? JSON.stringify(value).substring(0, 50) : 
                            String(value).substring(0, 50)
            console.log(`         ${key}: ${valueStr}`)
          })
          
          return data.value
        } else {
          console.log(`      ⚠️ Filtre OK mais aucun résultat`)
        }
      } else if (response.status === 400) {
        // Filtre invalide, tester le suivant
        continue
      } else {
        const errorText = await response.text()
        console.log(`      ⚠️ ${response.status} - ${errorText.substring(0, 100)}`)
      }
    } catch (error) {
      console.log(`      ❌ Erreur: ${error}`)
    }
  }
  
  return []
}

/**
 * Step 3: Tester SANS filtre pour voir la structure
 */
async function testEntitySetNoFilter(
  token: string,
  entitySetName: string
): Promise<any | null> {
  console.log(`\n🔍 Test EntitySet (sans filtre): ${entitySetName}`)

  const url = `${IFS_BASE_URL}/ManufacturingMaterialHistoryHandling.svc/${entitySetName}?$top=1`
  
  console.log(`   📡 GET ${url}`)
  
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })

    if (response.ok) {
      const data = await response.json()
      
      if (data.value && data.value.length > 0) {
        console.log(`      ✅ SUCCÈS! Exemple trouvé`)
        
        const firstItem = data.value[0]
        const fields = Object.keys(firstItem).sort()
        
        console.log(`      📊 ${fields.length} champs disponibles:\n`)
        
        // Afficher tous les champs pour analyse
        fields.forEach(field => {
          const value = firstItem[field]
          const valueStr = value === null ? 'null' : 
                          typeof value === 'object' ? JSON.stringify(value).substring(0, 50) : 
                          String(value).substring(0, 50)
          console.log(`         ${field}: ${valueStr}`)
        })
        
        return firstItem
      } else {
        console.log(`      ⚠️ EntitySet vide`)
      }
    } else {
      console.log(`      ❌ ${response.status}`)
    }
  } catch (error) {
    console.log(`      ❌ Erreur: ${error}`)
  }
  
  return null
}

/**
 * Résumé et recommandations
 */
function printSummary(entitySets: string[], results: Map<string, any[]>) {
  console.log('\n═══════════════════════════════════════════════════════')
  console.log('📊 RÉSUMÉ:')
  console.log('═══════════════════════════════════════════════════════\n')

  if (entitySets.length === 0) {
    console.log('❌ ManufacturingMaterialHistoryHandling inaccessible ou vide\n')
    return
  }

  console.log(`✅ Service trouvé avec ${entitySets.length} EntitySet(s)\n`)

  const successfulTests = Array.from(results.entries()).filter(([, data]) => data.length > 0)

  if (successfulTests.length > 0) {
    console.log(`🎉 ${successfulTests.length} EntitySet(s) avec résultats:\n`)
    successfulTests.forEach(([entitySet, data]) => {
      console.log(`   ✅ ${entitySet} : ${data.length} résultat(s)`)
    })
    
    console.log('\n💡 Prochaines étapes:')
    console.log('   1. ✅ Documenter l\'endpoint dans /docs/api/')
    console.log('   2. ✅ Identifier le champ Raw Material')
    console.log('   3. ✅ Filtrer par OperationNo = 10')
    console.log('   4. ✅ Implémenter dans operation-service.ts')
  } else {
    console.log('⚠️ Aucun résultat avec les filtres testés\n')
    console.log('💡 Options:')
    console.log('   1. 🔍 Tester avec d\'autres Shop Orders')
    console.log('   2. 🔍 Vérifier si les Material History sont enregistrés')
    console.log('   3. ⚠️ Chercher un autre endpoint')
  }

  console.log()
}

/**
 * Main
 */
async function main() {
  try {
    const token = await getToken()
    
    // Step 1: Lister les EntitySets
    const entitySets = await listEntitySets(token)
    
    if (entitySets.length === 0) {
      console.log('\n❌ Aucun EntitySet trouvé. Service peut-être inaccessible.')
      return
    }
    
    // Step 2: Tester chaque EntitySet avec filtres Shop Order
    const results = new Map<string, any[]>()
    
    for (const entitySet of entitySets) {
      const data = await testEntitySet(token, entitySet, '454853')
      results.set(entitySet, data)
      
      // Si pas de résultats avec filtre, essayer sans filtre
      if (data.length === 0) {
        await testEntitySetNoFilter(token, entitySet)
      }
    }
    
    // Step 3: Résumé
    printSummary(entitySets, results)

    console.log('✅ Tests terminés!')
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

main()
