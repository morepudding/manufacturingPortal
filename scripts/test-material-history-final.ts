/**
 * Script de test FINAL - MaterialHistorys
 * 
 * Objectif: Valider que MaterialHistorys contient les Material Lines du Shop Order 454853
 * 
 * Endpoint: ManufacturingMaterialHistoryHandling.svc/MaterialHistorys
 * 
 * Champs clés:
 * - OrderRef1 = Shop Order No
 * - PartNo = Raw Material
 * - OperationNo = 10 (OP10)
 * - OrderType = ShopOrder
 * 
 * Utilisation:
 * npx tsx scripts/test-material-history-final.ts
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
 * Test 1: Filtrer par OrderRef1 (Shop Order)
 */
async function testFilterByShopOrder(token: string, orderNo: string = '454853') {
  console.log('═══════════════════════════════════════════════════════')
  console.log('🔍 TEST 1: Filtrer par Shop Order')
  console.log('═══════════════════════════════════════════════════════\n')

  const filter = `OrderRef1 eq '${orderNo}'`
  const url = `${IFS_BASE_URL}/ManufacturingMaterialHistoryHandling.svc/MaterialHistorys?$filter=${encodeURIComponent(filter)}&$top=10&$orderby=OperationNo asc`

  console.log(`📡 Filtre: ${filter}`)
  console.log(`📡 URL: ${url}\n`)

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
      console.log(error.substring(0, 300))
      return null
    }

    const data = await response.json()

    if (!data.value || data.value.length === 0) {
      console.log('⚠️ Aucun résultat trouvé\n')
      return null
    }

    console.log(`✅ ${data.value.length} Material History trouvé(s)!\n`)

    // Afficher tous les résultats
    data.value.forEach((item: any, index: number) => {
      console.log(`📦 Material History ${index + 1}:`)
      console.log(`   OrderRef1 (Shop Order): ${item.OrderRef1}`)
      console.log(`   PartNo (Material): ${item.PartNo}`)
      console.log(`   PartDescription: ${item.PartDescription}`)
      console.log(`   OperationNo: ${item.OperationNo}`)
      console.log(`   OrderType: ${item.OrderType}`)
      console.log(`   MaterialHistoryAction: ${item.MaterialHistoryAction}`)
      console.log(`   InventoryQty: ${item.InventoryQty} ${item.InventoryUom}`)
      console.log(`   Contract: ${item.Contract}`)
      console.log(`   TimeStamp: ${item.TimeStamp}`)
      console.log()
    })

    return data.value
  } catch (error) {
    console.log(`❌ Erreur: ${error}`)
    return null
  }
}

/**
 * Test 2: Filtrer par Shop Order + OperationNo = 10
 */
async function testFilterByShopOrderAndOP10(token: string, orderNo: string = '454853') {
  console.log('═══════════════════════════════════════════════════════')
  console.log('🔍 TEST 2: Filtrer par Shop Order + OperationNo = 10')
  console.log('═══════════════════════════════════════════════════════\n')

  const filter = `OrderRef1 eq '${orderNo}' and OperationNo eq 10`
  const url = `${IFS_BASE_URL}/ManufacturingMaterialHistoryHandling.svc/MaterialHistorys?$filter=${encodeURIComponent(filter)}&$top=10`

  console.log(`📡 Filtre: ${filter}`)
  console.log(`📡 URL: ${url}\n`)

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
      console.log(error.substring(0, 300))
      return null
    }

    const data = await response.json()

    if (!data.value || data.value.length === 0) {
      console.log('⚠️ Aucun Material pour OP10 trouvé\n')
      return null
    }

    console.log(`✅ ${data.value.length} Material(s) pour OP10 trouvé(s)!\n`)

    // Afficher les détails
    data.value.forEach((item: any, index: number) => {
      console.log(`🎯 RAW MATERIAL ${index + 1}:`)
      console.log(`   PartNo: ${item.PartNo}`)
      console.log(`   Description: ${item.PartDescription}`)
      console.log(`   Quantity: ${item.InventoryQty} ${item.InventoryUom}`)
      console.log(`   Action: ${item.MaterialHistoryAction}`)
      console.log()
    })

    return data.value
  } catch (error) {
    console.log(`❌ Erreur: ${error}`)
    return null
  }
}

/**
 * Test 3: Filtrer avec OrderType = ShopOrder (pour exclure autres types)
 */
async function testFilterComplete(token: string, orderNo: string = '454853') {
  console.log('═══════════════════════════════════════════════════════')
  console.log('🔍 TEST 3: Filtre complet (OrderType + Action)')
  console.log('═══════════════════════════════════════════════════════\n')

  // Note: MaterialHistoryAction peut être "IssueMaterial", "ReceiveMaterial", etc.
  const filter = `OrderRef1 eq '${orderNo}' and OperationNo eq 10 and OrderTypeDb eq 'SO'`
  const url = `${IFS_BASE_URL}/ManufacturingMaterialHistoryHandling.svc/MaterialHistorys?$filter=${encodeURIComponent(filter)}&$top=10`

  console.log(`📡 Filtre: ${filter}`)
  console.log(`   (OrderTypeDb = 'SO' pour Shop Order)`)
  console.log(`📡 URL: ${url}\n`)

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      const error = await response.text()
      console.log(`⚠️ Erreur ${response.status}:`)
      console.log(error.substring(0, 300))
      console.log('\n💡 Essai sans OrderTypeDb...\n')
      
      // Retry sans OrderTypeDb
      return await testFilterByShopOrderAndOP10(token, orderNo)
    }

    const data = await response.json()

    if (!data.value || data.value.length === 0) {
      console.log('⚠️ Aucun résultat avec ce filtre complet\n')
      return null
    }

    console.log(`✅ ${data.value.length} résultat(s) avec filtre complet!\n`)

    data.value.forEach((item: any, index: number) => {
      console.log(`🎯 Material ${index + 1}:`)
      console.log(`   PartNo: ${item.PartNo}`)
      console.log(`   Description: ${item.PartDescription}`)
      console.log(`   Quantity: ${item.InventoryQty} ${item.InventoryUom}`)
      console.log(`   OrderType: ${item.OrderType} (DB: ${item.OrderTypeDb})`)
      console.log(`   Action: ${item.MaterialHistoryAction}`)
      console.log()
    })

    return data.value
  } catch (error) {
    console.log(`❌ Erreur: ${error}`)
    return null
  }
}

/**
 * Résumé et recommandations
 */
function printSummary(
  allMaterials: any[] | null,
  op10Materials: any[] | null
) {
  console.log('\n═══════════════════════════════════════════════════════')
  console.log('📊 RÉSUMÉ:')
  console.log('═══════════════════════════════════════════════════════\n')

  if (!allMaterials && !op10Materials) {
    console.log('❌ MaterialHistorys ne contient aucune donnée pour Shop Order 454853\n')
    console.log('💡 Possibilités:')
    console.log('   1. ⚠️ Le Shop Order 454853 n\'a pas encore eu de matériel émis')
    console.log('   2. ⚠️ MaterialHistorys enregistre uniquement les actions passées (historique)')
    console.log('   3. ⚠️ Besoin de chercher dans un autre endpoint (structure BOM planifiée)')
    return
  }

  if (allMaterials && allMaterials.length > 0) {
    console.log(`✅ MaterialHistorys trouvé: ${allMaterials.length} enregistrement(s)\n`)
    
    const op10Count = allMaterials.filter((m: any) => m.OperationNo === 10).length
    console.log(`   📊 OP10: ${op10Count} matériel(s)`)
    
    const uniqueParts = [...new Set(allMaterials.map((m: any) => m.PartNo))]
    console.log(`   📦 Pièces uniques: ${uniqueParts.length}`)
    console.log()
    
    if (op10Materials && op10Materials.length > 0) {
      console.log(`🎯 RAW MATERIAL (OP10):`)
      op10Materials.forEach((m: any) => {
        console.log(`   → ${m.PartNo} - ${m.PartDescription}`)
      })
    }
    
    console.log('\n💡 Prochaines étapes:')
    console.log('   1. ✅ Documenter l\'endpoint MaterialHistorys')
    console.log('   2. ✅ Implémenter dans operation-service.ts')
    console.log('   3. ✅ Récupérer le premier PartNo avec OperationNo = 10')
    console.log('   4. ⚠️ Vérifier si c\'est un historique ou une donnée en temps réel')
  } else {
    console.log('⚠️ Résultats incomplets\n')
  }

  console.log()
}

/**
 * Main
 */
async function main() {
  try {
    const token = await getToken()
    
    // Test 1: Tous les materials du Shop Order
    const allMaterials = await testFilterByShopOrder(token, '454853')
    
    // Test 2: Uniquement OP10
    const op10Materials = await testFilterByShopOrderAndOP10(token, '454853')
    
    // Test 3: Filtre complet (avec OrderType)
    await testFilterComplete(token, '454853')
    
    // Résumé
    printSummary(allMaterials, op10Materials)

    console.log('✅ Tests terminés!')
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

main()
