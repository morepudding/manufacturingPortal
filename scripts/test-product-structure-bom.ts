/**
 * Script de test - ProductStructure et Manufacturing BOM
 * 
 * Objectif: Trouver les Material Lines (composants) d'un Shop Order via la structure de produit
 * 
 * Hypothèse: UsedStrucBomType = "Manufacturing" → Les composants sont dans la structure BOM
 * 
 * Utilisation:
 * npx tsx scripts/test-product-structure-bom.ts
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
 * Tester un endpoint ProductStructure
 */
async function testEndpoint(
  token: string,
  serviceName: string,
  entitySet: string,
  description: string,
  partNo: string = '1000014690G136'
) {
  console.log(`\n🔍 Test: ${serviceName}/${entitySet}`)
  console.log(`   Description: ${description}`)
  console.log(`   PartNo: ${partNo}`)

  // Variations de filtres
  const filters = [
    `PartNo eq '${partNo}'`,
    `ParentPart eq '${partNo}'`,
    `Contract eq 'FR017' and PartNo eq '${partNo}'`,
    `contains(PartNo,'${partNo}')`,
  ]

  for (const filter of filters) {
    const url = `${IFS_BASE_URL}/${serviceName}.svc/${entitySet}?$filter=${encodeURIComponent(filter)}&$top=5`
    
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
          console.log(`      ✅ SUCCÈS! ${data.value.length} résultat(s)`)
          
          const firstItem = data.value[0]
          const fields = Object.keys(firstItem)
          
          // Chercher les champs Material/Component
          const materialFields = fields.filter(f => 
            f.toLowerCase().includes('component') ||
            f.toLowerCase().includes('material') ||
            f.toLowerCase().includes('part')
          )
          
          if (materialFields.length > 0) {
            console.log(`      🎯 Champs matériel trouvés:`)
            materialFields.forEach(field => {
              console.log(`         ${field}: ${firstItem[field]}`)
            })
          }
          
          console.log(`      📋 Premier résultat (10 premiers champs):`)
          Object.keys(firstItem).slice(0, 10).forEach(key => {
            const value = firstItem[key]
            const valueStr = value === null ? 'null' : String(value).substring(0, 50)
            console.log(`         ${key}: ${valueStr}`)
          })
          
          return true
        } else {
          console.log(`      ⚠️ Filtre OK mais aucun résultat`)
        }
      } else if (response.status === 404) {
        console.log(`      ❌ 404 - Endpoint n'existe pas`)
        return false
      } else if (response.status === 400) {
        // Filtre invalide, passer au suivant
        continue
      } else {
        const errorText = await response.text()
        console.log(`      ⚠️ ${response.status} - ${errorText.substring(0, 100)}`)
      }
    } catch (error) {
      console.log(`      ❌ Erreur: ${error}`)
    }
  }
  
  return false
}

/**
 * Tester les endpoints ProductStructure et ManufacturingStructure
 */
async function testStructureEndpoints(token: string) {
  console.log('═══════════════════════════════════════════════════════')
  console.log('🔬 TEST: ProductStructure & Manufacturing BOM')
  console.log('═══════════════════════════════════════════════════════')
  console.log('PartNo: 1000014690G136 (du Shop Order 454853)\n')

  const endpoints = [
    // ProductStructure endpoints
    { service: 'ProductStructureHandling', entity: 'ProductStructures', desc: 'Structures de produit' },
    { service: 'ProductStructureHandling', entity: 'StructureComponents', desc: 'Composants de structure' },
    { service: 'ProductStructureHandling', entity: 'ManufStructures', desc: 'Structures manufacturing' },
    { service: 'ProductStructureHandling', entity: 'ManufComponents', desc: 'Composants manufacturing' },
    
    // ManufacturingStructure endpoints
    { service: 'ManufacturingStructureHandling', entity: 'ManufacturingStructures', desc: 'Structures de fabrication' },
    { service: 'ManufacturingStructureHandling', entity: 'StructureComponents', desc: 'Composants structure manuf' },
    
    // PartHandling endpoints (BOM)
    { service: 'PartHandling', entity: 'ManufacturingBOM', desc: 'BOM Manufacturing' },
    { service: 'PartHandling', entity: 'BOMComponents', desc: 'Composants BOM' },
    { service: 'PartHandling', entity: 'PartStructure', desc: 'Structure de pièce' },
    
    // InventoryPartHandling (structure)
    { service: 'InventoryPartHandling', entity: 'ManufacturingStructure', desc: 'Structure manufacturing inventory' },
    { service: 'InventoryPartHandling', entity: 'PartComponents', desc: 'Composants de pièce' },
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
    console.log('   1. ✅ Récupérer tous les composants de la pièce 1000014690G136')
    console.log('   2. ✅ Identifier le Raw Material (premier composant)')
    console.log('   3. ✅ Documenter l\'endpoint dans /docs/api/')
    console.log('   4. ✅ Implémenter dans operation-service.ts')
  } else {
    console.log('❌ Aucun endpoint ProductStructure/BOM trouvé\n')
    
    console.log('💡 Options alternatives:')
    console.log('   1. 🔍 Explorer $metadata pour trouver tous les services disponibles')
    console.log('   2. 🔍 Chercher "Structure", "Component", "BOM" dans la metadata')
    console.log('   3. ⚠️ Vérifier si le Raw Material = PartNo du Shop Order (pour certains cas)')
    console.log('   4. ⚠️ Consulter un expert IFS Bénéteau pour comprendre le lien')
  }

  console.log('\n🔍 Metadata IFS à explorer:')
  console.log(`   GET ${IFS_BASE_URL}/$metadata`)
  console.log('   Chercher: Structure, Component, BOM, Material, ManufPart')
  console.log()
}

/**
 * Main
 */
async function main() {
  try {
    const token = await getToken()
    const successfulEndpoints = await testStructureEndpoints(token)
    printSummary(successfulEndpoints)

    console.log('✅ Tests terminés!')
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

main()
