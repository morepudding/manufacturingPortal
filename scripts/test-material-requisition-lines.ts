/**
 * Script de test - MaterialRequisitionLinesHandling
 * 
 * Objectif: Tester si MaterialRequisitionLineSet contient les Material Lines d'un Shop Order
 * 
 * Endpoint: MaterialRequisitionLinesHandling.svc/MaterialRequisitionLineSet
 * 
 * Utilisation:
 * npx tsx scripts/test-material-requisition-lines.ts
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
 * Test 1: Récupérer UNE ligne pour voir TOUS les champs disponibles
 */
async function testGetAllFields(token: string) {
  console.log('═══════════════════════════════════════════════════════')
  console.log('🔍 TEST 1: Récupérer UNE ligne pour voir tous les champs')
  console.log('═══════════════════════════════════════════════════════\n')

  const url = `${IFS_BASE_URL}/MaterialRequisitionLinesHandling.svc/MaterialRequisitionLineSet?$top=1`

  console.log(`📡 GET ${url}\n`)

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      const error = await response.text()
      console.log(`❌ Erreur ${response.status}:`)
      console.log(error.substring(0, 200))
      return null
    }

    const data = await response.json()

    if (!data.value || data.value.length === 0) {
      console.log('⚠️ Aucune Material Requisition Line trouvée\n')
      return null
    }

    const firstLine = data.value[0]
    const fields = Object.keys(firstLine).sort()

    console.log(`✅ ${data.value.length} ligne(s) trouvée(s)`)
    console.log(`📊 ${fields.length} champs disponibles:\n`)

    // Chercher les champs clés
    const keyFields = fields.filter(f => 
      f.toLowerCase().includes('order') ||
      f.toLowerCase().includes('operation') ||
      f.toLowerCase().includes('part') ||
      f.toLowerCase().includes('material') ||
      f.toLowerCase().includes('line') ||
      f.toLowerCase().includes('item')
    )

    if (keyFields.length > 0) {
      console.log('🎯 Champs clés trouvés:')
      keyFields.forEach(field => {
        console.log(`  ✅ ${field}: ${firstLine[field]}`)
      })
      console.log()
    }

    console.log('📋 Tous les champs:')
    fields.forEach(field => {
      const value = firstLine[field]
      const valueStr = value === null ? 'null' : 
                      typeof value === 'object' ? JSON.stringify(value).substring(0, 50) : 
                      String(value).substring(0, 50)
      console.log(`  ${field}: ${valueStr}`)
    })

    return firstLine
  } catch (error) {
    console.log(`❌ Erreur: ${error}`)
    return null
  }
}

/**
 * Test 2: Filtrer par OrderNo (si le champ existe)
 */
async function testFilterByOrderNo(token: string, orderNo: string) {
  console.log('\n═══════════════════════════════════════════════════════')
  console.log(`🔍 TEST 2: Filtrer par OrderNo = '${orderNo}'`)
  console.log('═══════════════════════════════════════════════════════\n')

  // Variations de filtres possibles
  const filterVariations = [
    `OrderNo eq '${orderNo}'`,
    `ShopOrderNo eq '${orderNo}'`,
    `contains(OrderNo,'${orderNo}')`,
    `Order_No eq '${orderNo}'`,
  ]

  for (const filter of filterVariations) {
    const url = `${IFS_BASE_URL}/MaterialRequisitionLinesHandling.svc/MaterialRequisitionLineSet?$filter=${encodeURIComponent(filter)}&$top=10`

    console.log(`📡 Test filtre: ${filter}`)

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
          console.log(`   ✅ SUCCÈS! ${data.value.length} ligne(s) trouvée(s)`)
          console.log(`   📋 Première ligne:`)
          
          const firstLine = data.value[0]
          Object.keys(firstLine).slice(0, 10).forEach(key => {
            console.log(`      ${key}: ${firstLine[key]}`)
          })
          
          return data.value
        } else {
          console.log(`   ⚠️ Filtre accepté mais aucun résultat`)
        }
      } else if (response.status === 400) {
        const error = await response.text()
        console.log(`   ❌ 400 - Filtre invalide: ${error.substring(0, 100)}`)
      } else {
        console.log(`   ⚠️ ${response.status}`)
      }
    } catch (error) {
      console.log(`   ❌ Erreur: ${error}`)
    }
    
    console.log()
  }

  return null
}

/**
 * Test 3: Filtrer par OperationNo (si le champ existe)
 */
async function testFilterByOperation(token: string, operationNo: number = 10) {
  console.log('\n═══════════════════════════════════════════════════════')
  console.log(`🔍 TEST 3: Filtrer par OperationNo = ${operationNo}`)
  console.log('═══════════════════════════════════════════════════════\n')

  const filterVariations = [
    `OperationNo eq ${operationNo}`,
    `Operation_No eq ${operationNo}`,
    `OpNo eq ${operationNo}`,
  ]

  for (const filter of filterVariations) {
    const url = `${IFS_BASE_URL}/MaterialRequisitionLinesHandling.svc/MaterialRequisitionLineSet?$filter=${encodeURIComponent(filter)}&$top=10`

    console.log(`📡 Test filtre: ${filter}`)

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
          console.log(`   ✅ SUCCÈS! ${data.value.length} ligne(s) trouvée(s)`)
          console.log(`   📋 Première ligne:`)
          
          const firstLine = data.value[0]
          Object.keys(firstLine).slice(0, 10).forEach(key => {
            console.log(`      ${key}: ${firstLine[key]}`)
          })
          
          return data.value
        } else {
          console.log(`   ⚠️ Filtre accepté mais aucun résultat`)
        }
      } else if (response.status === 400) {
        console.log(`   ❌ 400 - Filtre invalide`)
      } else {
        console.log(`   ⚠️ ${response.status}`)
      }
    } catch (error) {
      console.log(`   ❌ Erreur: ${error}`)
    }
    
    console.log()
  }

  return null
}

/**
 * Résumé et recommandations
 */
function printSummary(firstLine: any | null, orderLines: any[] | null, operationLines: any[] | null) {
  console.log('\n═══════════════════════════════════════════════════════')
  console.log('📊 RÉSUMÉ:')
  console.log('═══════════════════════════════════════════════════════\n')

  if (firstLine) {
    console.log('✅ MaterialRequisitionLineSet existe et contient des données')
    
    const hasOrderField = Object.keys(firstLine).some(k => k.toLowerCase().includes('order'))
    const hasOperationField = Object.keys(firstLine).some(k => k.toLowerCase().includes('operation'))
    const hasPartField = Object.keys(firstLine).some(k => k.toLowerCase().includes('part'))
    
    console.log(`   ${hasOrderField ? '✅' : '❌'} Champ Order trouvé`)
    console.log(`   ${hasOperationField ? '✅' : '❌'} Champ Operation trouvé`)
    console.log(`   ${hasPartField ? '✅' : '❌'} Champ Part trouvé`)
    
    if (orderLines && orderLines.length > 0) {
      console.log(`\n✅ Filtrage par OrderNo fonctionne (${orderLines.length} résultats)`)
      console.log('   → Cet endpoint peut être utilisé pour récupérer les Material Lines')
    }
    
    if (operationLines && operationLines.length > 0) {
      console.log(`\n✅ Filtrage par OperationNo fonctionne (${operationLines.length} résultats)`)
      console.log('   → On peut filtrer par OP10 directement')
    }
    
  } else {
    console.log('❌ MaterialRequisitionLineSet ne contient aucune donnée')
    console.log('   ou')
    console.log('❌ L\'endpoint n\'est pas accessible')
  }

  console.log('\n💡 Prochaines étapes:')
  if (orderLines && orderLines.length > 0) {
    console.log('   1. ✅ Documenter MaterialRequisitionLineSet')
    console.log('   2. ✅ Implémenter dans operation-service.ts')
    console.log('   3. ✅ Tester avec Shop Order 454853')
  } else {
    console.log('   1. ⚠️ Vérifier si les Material Requisitions sont créées pour les Shop Orders')
    console.log('   2. ⚠️ Chercher un endpoint alternatif (ProductStructure, ManufacturingStructure)')
    console.log('   3. ⚠️ Considérer une solution custom (base de données locale)')
  }

  console.log()
}

/**
 * Main
 */
async function main() {
  try {
    const token = await getToken()
    
    // Test 1: Voir tous les champs
    const firstLine = await testGetAllFields(token)
    
    // Test 2: Filtrer par OrderNo
    const orderLines = await testFilterByOrderNo(token, '454853')
    
    // Test 3: Filtrer par OperationNo
    const operationLines = await testFilterByOperation(token, 10)
    
    // Résumé
    printSummary(firstLine, orderLines, operationLines)

    console.log('✅ Tests terminés!')
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

main()
