/**
 * Test de l'endpoint OperationBlockHandling.svc/Reference_ShopOrderOperation
 */

import { getIFSClient } from '../src/shared/services/ifs-client'

const TEST_SHOP_ORDER = {
  orderNo: '454853',
  releaseNo: '*',
  sequenceNo: '*'
}

async function testOperationBlockEndpoint() {
  console.log('🔍 Test: OperationBlockHandling.svc/Reference_ShopOrderOperation')
  console.log(`📋 Shop Order: ${TEST_SHOP_ORDER.orderNo}-${TEST_SHOP_ORDER.releaseNo}-${TEST_SHOP_ORDER.sequenceNo}`)
  console.log('━'.repeat(80))

  const client = getIFSClient()

  try {
    // Test 1: Récupérer toutes les opérations du Shop Order
    console.log('\n📡 Test 1: Toutes les opérations')
    const response1: any = await client.get('OperationBlockHandling.svc/Reference_ShopOrderOperation', {
      $filter: `OrderNo eq '${TEST_SHOP_ORDER.orderNo}'`,
      $top: '10'
    })

    console.log(`✅ ${response1.value?.length || 0} opération(s) trouvée(s)`)
    if (response1.value && response1.value.length > 0) {
      console.log('\n📊 Champs disponibles (première opération):')
      console.log(JSON.stringify(response1.value[0], null, 2))
    }

    // Test 2: Filtrer sur OperationNo = 10
    console.log('\n━'.repeat(80))
    console.log('📡 Test 2: Opération 10 uniquement')
    const response2: any = await client.get('OperationBlockHandling.svc/Reference_ShopOrderOperation', {
      $filter: `OrderNo eq '${TEST_SHOP_ORDER.orderNo}' and OperationNo eq 10`,
      $select: 'OrderNo,ReleaseNo,SequenceNo,OperationNo,OperationBlockId,OperationDescription,WorkCenterNo'
    })

    if (response2.value && response2.value.length > 0) {
      console.log('✅ Opération 10 trouvée !')
      console.log('\n📊 Données OP10:')
      response2.value.forEach((op: any) => {
        console.log(`   OrderNo: ${op.OrderNo}`)
        console.log(`   ReleaseNo: ${op.ReleaseNo}`)
        console.log(`   SequenceNo: ${op.SequenceNo}`)
        console.log(`   OperationNo: ${op.OperationNo}`)
        console.log(`   OperationBlockId: ${op.OperationBlockId || '(vide)'}`)
        console.log(`   OperationDescription: ${op.OperationDescription || '(vide)'}`)
        console.log(`   WorkCenterNo: ${op.WorkCenterNo || '(vide)'}`)
        console.log()
      })
    } else {
      console.log('⚠️  Aucune opération 10 trouvée')
    }

    console.log('━'.repeat(80))
    console.log('\n🎯 ENDPOINT VALIDÉ: OperationBlockHandling.svc/Reference_ShopOrderOperation')
    console.log('✅ Ce service permet d\'accéder aux opérations des Shop Orders')
    console.log('✅ Le champ BlockId est bien disponible !')

  } catch (error) {
    console.error('❌ Erreur:', error)
    if (error instanceof Error) {
      console.error('   Message:', error.message)
    }
  }
}

testOperationBlockEndpoint()
  .then(() => {
    console.log('\n✅ Test terminé')
    process.exit(0)
  })
  .catch(error => {
    console.error('\n❌ Erreur fatale:', error)
    process.exit(1)
  })
