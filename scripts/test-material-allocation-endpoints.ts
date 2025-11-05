/**
 * Script de test - Recherche endpoints Material/Allocation pour Shop Order
 * 
 * Objectif: Trouver l'endpoint qui retourne les Material Lines (Raw Material) d'un Shop Order
 * 
 * Basé sur la découverte: AllocationsExist = 1 pour Shop Order 454853
 * 
 * Utilisation:
 * npx tsx scripts/test-material-allocation-endpoints.ts
 */

import 'dotenv/config'

const IFS_BASE_URL = process.env.IFS_BASE_URL || 'https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1'
const IFS_CLIENT_ID = process.env.IFS_CLIENT_ID || 'AIS_IFS_MA_AST'
const IFS_CLIENT_SECRET = process.env.IFS_CLIENT_SECRET || 'ifiW7xzKNmj3a1fpEukFIImPFztb51R9'
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
 * Tester un endpoint avec différentes variations de filtres
 */
async function testEndpoint(
  token: string, 
  serviceName: string, 
  entitySet: string, 
  description: string
) {
  console.log(`\n🔍 Test: ${serviceName}/${entitySet}`)
  console.log(`   Description: ${description}`)

  const orderNo = '454853'
  
  // Variations de filtres à tester
  const filters = [
    `OrderNo eq '${orderNo}'`,
    `ShopOrderNo eq '${orderNo}'`,
    `contains(OrderNo,'${orderNo}')`,
    `Contract eq 'FR017' and OrderNo eq '${orderNo}'`,
  ]

  for (const filter of filters) {
    const url = `${IFS_BASE_URL}/${serviceName}.svc/${entitySet}?$filter=${encodeURIComponent(filter)}&$top=5`
    
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
          console.log(`   ✅ SUCCÈS avec filtre: ${filter}`)
          console.log(`   📊 ${data.value.length} résultats trouvés`)
          console.log(`   📋 Premier résultat:`)
          
          const firstItem = data.value[0]
          Object.keys(firstItem).slice(0, 10).forEach(key => {
            const value = firstItem[key]
            const valueStr = value === null ? 'null' : 
                            typeof value === 'object' ? JSON.stringify(value).substring(0, 50) : 
                            String(value).substring(0, 50)
            console.log(`      ${key}: ${valueStr}`)
          })
          
          // Si on trouve PartNo ou Material, c'est très prometteur !
          const partNoField = Object.keys(firstItem).find(k => 
            k.toLowerCase().includes('partno') || k.toLowerCase().includes('material')
          )
          if (partNoField) {
            console.log(`   🎯 CHAMP MATÉRIEL TROUVÉ: ${partNoField} = ${firstItem[partNoField]}`)
          }
          
          return true // Succès, pas besoin de tester les autres filtres
        } else {
          console.log(`   ⚠️ Endpoint OK mais aucun résultat pour: ${filter}`)
        }
      } else if (response.status === 404) {
        console.log(`   ❌ 404 - Endpoint n'existe pas`)
        return false // Pas besoin de tester les autres filtres
      } else if (response.status === 400) {
        // Filtre invalide, tester le suivant
        continue
      } else {
        const errorText = await response.text()
        console.log(`   ⚠️ ${response.status} - ${errorText.substring(0, 100)}`)
      }
    } catch (error) {
      console.log(`   ❌ Erreur: ${error}`)
    }
  }
  
  return false
}

/**
 * Tester une liste d'endpoints potentiels
 */
async function testMaterialEndpoints(token: string) {
  console.log('═══════════════════════════════════════════════════════')
  console.log('🔬 TEST: Endpoints Material/Allocation')
  console.log('═══════════════════════════════════════════════════════')
  console.log(`Shop Order: 454853 (AllocationsExist = 1)\n`)

  const endpoints = [
    // Priority 1: Allocation (basé sur AllocationsExist = 1)
    { service: 'MaterialAllocationHandling', entity: 'MaterialAllocations', desc: 'Allocations de matériel' },
    { service: 'MaterialAllocationHandling', entity: 'ShopOrderAllocations', desc: 'Allocations par Shop Order' },
    { service: 'InventoryPartAllocationHandling', entity: 'Allocations', desc: 'Allocations inventory parts' },
    { service: 'ShopOrderAllocationHandling', entity: 'ShopMaterialAllocs', desc: 'Material allocations Shop Order' },
    { service: 'ShopMaterialAllocHandling', entity: 'ShopMaterialAllocs', desc: 'Shop material allocations' },
    
    // Priority 2: Structure/BOM (basé sur UsedStrucBomType = Manufacturing)
    { service: 'ManufacturingStructureHandling', entity: 'StructureComponents', desc: 'Composants structure manufacturing' },
    { service: 'ProductStructureHandling', entity: 'StructureComponents', desc: 'Composants structure produit' },
    { service: 'ProductStructureHandling', entity: 'ManufStructures', desc: 'Structures de fabrication' },
    { service: 'ManufBOMHandling', entity: 'BOMComponents', desc: 'Composants BOM' },
    { service: 'BOMComponentHandling', entity: 'Components', desc: 'Composants BOM' },
    
    // Priority 3: Shop Order Material (direct)
    { service: 'ShopOrderMaterialHandling', entity: 'ShopOrderMaterials', desc: 'Matériaux Shop Order' },
    { service: 'ShopOrderMaterialHandling', entity: 'MaterialLines', desc: 'Lignes matériaux Shop Order' },
    { service: 'ShopMaterialHandling', entity: 'ShopMaterials', desc: 'Matériaux Shop' },
    
    // Priority 4: Material Requisition (déjà exploré, mais avec nouveau filtre)
    { service: 'MaterialRequisitionLinesHandling', entity: 'MaterialRequisLines', desc: 'Lignes réquisition (avec OperationNo)' },
  ]

  const successfulEndpoints: string[] = []

  for (const endpoint of endpoints) {
    const success = await testEndpoint(
      token,
      endpoint.service,
      endpoint.entity,
      endpoint.desc
    )
    
    if (success) {
      successfulEndpoints.push(`${endpoint.service}.svc/${endpoint.entity}`)
    }
  }

  return successfulEndpoints
}

/**
 * Résumé et recommandations
 */
function printSummary(successfulEndpoints: string[]) {
  console.log('\n═══════════════════════════════════════════════════════')
  console.log('📊 RÉSUMÉ:')
  console.log('═══════════════════════════════════════════════════════\n')

  if (successfulEndpoints.length > 0) {
    console.log(`✅ ${successfulEndpoints.length} endpoint(s) trouvé(s):\n`)
    successfulEndpoints.forEach((endpoint, index) => {
      console.log(`   ${index + 1}. ${endpoint}`)
    })
    
    console.log('\n💡 Prochaines étapes:')
    console.log('   1. Tester avec OperationNo = 10 (filtrer sur OP10)')
    console.log('   2. Identifier le champ "Raw Material" (premier composant)')
    console.log('   3. Documenter l\'endpoint dans /docs/api/')
    console.log('   4. Implémenter dans operation-service.ts')
  } else {
    console.log('❌ Aucun endpoint Material/Allocation trouvé\n')
    
    console.log('💡 Options alternatives:')
    console.log('   1. Explorer la metadata IFS: $metadata pour trouver tous les services')
    console.log('   2. Tester avec OperationBlockHandling + expansion')
    console.log('   3. Créer un service custom (base de données locale)')
    console.log('   4. Vérifier si Raw Material = PartNo du Shop Order (pour certaines pièces)')
  }

  console.log('\n🔍 Pour explorer la metadata IFS:')
  console.log('   GET /$metadata')
  console.log('   Chercher: Material, Allocation, Component, Structure, BOM')
  console.log()
}

/**
 * Main
 */
async function main() {
  try {
    const token = await getToken()
    const successfulEndpoints = await testMaterialEndpoints(token)
    printSummary(successfulEndpoints)

    console.log('✅ Tests terminés!')
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

main()
