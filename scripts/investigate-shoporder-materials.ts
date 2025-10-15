/**
 * Script d'investigation - Chercher des indices Material/Component dans ShopOrds
 * 
 * Objectif: 
 * 1. Récupérer UN Shop Order complet (tous les champs)
 * 2. Identifier les champs contenant "Material", "Component", "Structure", "BOM", etc.
 * 3. Tester les navigations OData possibles
 * 
 * Utilisation:
 * npx tsx scripts/investigate-shoporder-materials.ts
 */

import 'dotenv/config'

const IFS_BASE_URL = process.env.IFS_BASE_URL || 'https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1'
const IFS_CLIENT_ID = process.env.IFS_CLIENT_ID || '***REMOVED***'
const IFS_CLIENT_SECRET = process.env.IFS_CLIENT_SECRET || '***REMOVED***'
const IFS_TOKEN_URL = process.env.IFS_TOKEN_URL || 'https://beneteau-group-ast.ifs.cloud/auth/realms/beneast1/protocol/openid-connect/token'

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
 * Analyser les champs d'un Shop Order pour trouver des indices Material
 */
async function analyzeShopOrderForMaterials(token: string) {
  console.log('═══════════════════════════════════════════════════════')
  console.log('🔍 INVESTIGATION: Material/Component fields dans ShopOrds')
  console.log('═══════════════════════════════════════════════════════\n')

  // Récupérer un Shop Order réel (454853)
  const url = `${IFS_BASE_URL}/ShopOrderHandling.svc/ShopOrds?$filter=OrderNo eq '454853'&$top=1`

  console.log(`📡 Requête: GET ${url}\n`)

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    const error = await response.text()
    console.error(`❌ Error: ${response.status}`)
    console.error(error)
    return
  }

  const data = await response.json()

  if (!data.value || data.value.length === 0) {
    console.log('⚠️ Shop Order 454853 non trouvé')
    return
  }

  const shopOrder = data.value[0]
  const fields = Object.keys(shopOrder).sort()

  console.log(`✅ Shop Order ${shopOrder.OrderNo} récupéré (${fields.length} champs)\n`)

  // Filtrer les champs contenant des mots-clés Material/Component/etc
  const keywords = [
    'material', 'component', 'structure', 'bom', 
    'requisition', 'allocation', 'inventory',
    'part', 'item', 'line'
  ]

  console.log('═══════════════════════════════════════════════════════')
  console.log('🎯 CHAMPS CONTENANT DES MOTS-CLÉS:')
  console.log('═══════════════════════════════════════════════════════\n')

  const matchingFields: { field: string; value: any; keyword: string }[] = []

  keywords.forEach(keyword => {
    const matches = fields.filter(f => f.toLowerCase().includes(keyword))
    
    if (matches.length > 0) {
      console.log(`📌 Mot-clé: "${keyword.toUpperCase()}"`)
      matches.forEach(field => {
        const value = shopOrder[field]
        const valueStr = value === null ? 'null' : 
                        typeof value === 'object' ? JSON.stringify(value) : 
                        value
        
        console.log(`  ✅ ${field}: ${valueStr}`)
        matchingFields.push({ field, value, keyword })
      })
      console.log()
    }
  })

  if (matchingFields.length === 0) {
    console.log('❌ Aucun champ correspondant aux mots-clés trouvé\n')
  }

  // Afficher tous les champs pour référence
  console.log('═══════════════════════════════════════════════════════')
  console.log('📋 TOUS LES CHAMPS (pour référence):')
  console.log('═══════════════════════════════════════════════════════\n')
  
  fields.forEach(field => {
    const value = shopOrder[field]
    const valueStr = value === null ? 'null' : 
                    typeof value === 'object' ? JSON.stringify(value).substring(0, 50) + '...' : 
                    String(value).substring(0, 50)
    console.log(`  ${field}: ${valueStr}`)
  })

  return { shopOrder, matchingFields }
}

/**
 * Tester les navigations OData possibles
 */
async function testODataNavigations(token: string) {
  console.log('\n═══════════════════════════════════════════════════════')
  console.log('🔬 TEST: Navigations OData depuis ShopOrds')
  console.log('═══════════════════════════════════════════════════════\n')

  const shopOrderKey = "OrderNo='454853',ReleaseNo='*',SequenceNo='*'"
  const baseUrl = `${IFS_BASE_URL}/ShopOrderHandling.svc/ShopOrds(${shopOrderKey})`

  // Navigations possibles à tester
  const navigations = [
    'Materials',
    'MaterialLines',
    'Components',
    'ComponentLines',
    'Operations',
    'OperationMaterials',
    'ShopOrderMaterials',
    'ShopOrderComponents',
    'MaterialRequisitions',
    'PartStructure',
    'BOMLines'
  ]

  console.log(`📡 Shop Order: ${shopOrderKey}\n`)

  for (const nav of navigations) {
    const url = `${baseUrl}/${nav}`
    console.log(`🔍 Test navigation: /${nav}`)
    
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        console.log(`   ✅ SUCCÈS! Navigation disponible`)
        
        if (data.value && Array.isArray(data.value)) {
          console.log(`   📊 ${data.value.length} éléments trouvés`)
          
          if (data.value.length > 0) {
            console.log(`   📋 Exemple (1er élément):`)
            const firstItem = data.value[0]
            Object.keys(firstItem).slice(0, 5).forEach(key => {
              console.log(`      ${key}: ${firstItem[key]}`)
            })
          }
        }
      } else if (response.status === 404) {
        console.log(`   ❌ 404 - Navigation non disponible`)
      } else {
        const error = await response.text()
        console.log(`   ⚠️ ${response.status} - ${error.substring(0, 100)}`)
      }
    } catch (error) {
      console.log(`   ❌ Erreur: ${error}`)
    }
    
    console.log()
  }
}

/**
 * Récapitulatif et recommandations
 */
function printRecommendations(matchingFields: { field: string; value: any; keyword: string }[]) {
  console.log('═══════════════════════════════════════════════════════')
  console.log('💡 RECOMMANDATIONS:')
  console.log('═══════════════════════════════════════════════════════\n')

  if (matchingFields.length > 0) {
    console.log('✅ Champs suspects trouvés dans ShopOrds:')
    matchingFields.forEach(({ field, keyword }) => {
      console.log(`  → ${field} (mot-clé: ${keyword})`)
    })
    console.log()
    console.log('📝 Actions suggérées:')
    console.log('  1. Documenter ces champs dans /docs/api/shop-order/README.md')
    console.log('  2. Tester si ces champs pointent vers des Material Lines')
    console.log('  3. Explorer les relations via metadata IFS')
  } else {
    console.log('⚠️ Aucun champ Material/Component trouvé dans ShopOrds')
    console.log()
    console.log('📝 Actions suggérées:')
    console.log('  1. ✅ Tester les navigations OData (ci-dessus)')
    console.log('  2. ✅ Chercher dans metadata IFS: *Material*, *Component*')
    console.log('  3. ✅ Vérifier OperationBlockHandling pour Material Lines')
    console.log('  4. ⚠️ Créer un service custom si nécessaire (base locale)')
  }

  console.log('\n🔍 Mots-clés IFS à chercher dans la metadata:')
  console.log('  - ShopOrderMaterial')
  console.log('  - ShopOrderComponent')
  console.log('  - OperationMaterial')
  console.log('  - MaterialRequisitionLine (avec filtre OperationNo)')
  console.log('  - ManufacturingStructure')
  console.log('  - ProductStructure')
  console.log()
}

/**
 * Main
 */
async function main() {
  try {
    const token = await getToken()
    
    // 1. Analyser les champs du Shop Order
    const result = await analyzeShopOrderForMaterials(token)
    
    if (result) {
      // 2. Tester les navigations OData
      await testODataNavigations(token)
      
      // 3. Recommandations
      printRecommendations(result.matchingFields)
    }

    console.log('✅ Investigation terminée!')
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

main()
