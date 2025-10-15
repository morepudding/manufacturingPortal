/**
 * Script pour trouver l'endpoint IFS des opérations
 * 
 * Teste plusieurs endpoints possibles pour les opérations Shop Order
 */

import { getIFSClient } from '../src/shared/services/ifs-client'

const TEST_SHOP_ORDER = {
  orderNo: '454853',
  releaseNo: '*',
  sequenceNo: '*'
}

const POSSIBLE_ENDPOINTS = [
  'ShopOrderHandling.svc/ShopOrderOperations',
  'ShopOrderOperationHandling.svc/ShopOrderOperations',
  'OperationHandling.svc/Operations',
  'ShopOrderHandling.svc/Operations',
  'ManufacturingOperationHandling.svc/Operations',
  'ShopOrd/Operations',
  'ShopOrds/Operations',
]

async function findOperationEndpoint() {
  console.log('🔍 Recherche de l\'endpoint des opérations IFS...')
  console.log(`📋 Test avec Shop Order: ${TEST_SHOP_ORDER.orderNo}-${TEST_SHOP_ORDER.releaseNo}-${TEST_SHOP_ORDER.sequenceNo}`)
  console.log('━'.repeat(80))

  const client = getIFSClient()

  for (const endpoint of POSSIBLE_ENDPOINTS) {
    console.log(`\n🧪 Test: ${endpoint}`)

    try {
      const response = await client.get(endpoint, {
        $filter: `OrderNo eq '${TEST_SHOP_ORDER.orderNo}'`,
        $select: 'OrderNo,ReleaseNo,SequenceNo,OperationNo',
        $top: '5'
      })

      console.log(`✅ SUCCÈS !`)
      console.log(`📊 Résultats:`, JSON.stringify(response, null, 2))
      console.log(`\n🎯 ENDPOINT VALIDE: ${endpoint}`)
      return endpoint
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        console.log(`❌ 404 - Endpoint non trouvé`)
      } else if (error instanceof Error && error.message.includes('400')) {
        console.log(`⚠️  400 - Endpoint existe mais filtre invalide`)
        console.log(`   Message:`, error.message.substring(0, 200))
      } else {
        console.log(`❌ Erreur:`, error instanceof Error ? error.message.substring(0, 100) : 'Unknown')
      }
    }
  }

  console.log('\n━'.repeat(80))
  console.log('❌ Aucun endpoint valide trouvé')
  console.log('\n💡 Suggestions:')
  console.log('   1. Vérifier la documentation IFS Cloud')
  console.log('   2. Tester dans l\'interface IFS Cloud directement')
  console.log('   3. Contacter le support IFS')
}

// Exécution
findOperationEndpoint()
  .then(() => {
    console.log('\n✅ Recherche terminée')
    process.exit(0)
  })
  .catch(error => {
    console.error('\n❌ Erreur fatale:', error)
    process.exit(1)
  })
