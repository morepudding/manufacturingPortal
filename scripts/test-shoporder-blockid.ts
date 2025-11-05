/**
 * Test pour vérifier si BlockId est disponible dans ShopOrderHandling
 */

import { getIFSClient } from '../src/shared/services/ifs-client'

async function testBlockId() {
  console.log('🔍 Test: BlockId dans ShopOrderHandling...')
  
  const client = getIFSClient()
  
  try {
    // Essayer de récupérer BlockId directement depuis ShopOrds
    console.log('\n📡 Tentative 1: BlockId dans $select')
    const response1 = await client.get('ShopOrderHandling.svc/ShopOrds', {
      $filter: "OrderNo eq '454853'",
      $select: 'OrderNo,ReleaseNo,SequenceNo,BlockId',
      $top: '1'
    })
    
    console.log('✅ SUCCÈS - BlockId existe dans ShopOrds !')
    console.log('📊 Données:', JSON.stringify(response1, null, 2))
  } catch (error) {
    console.log('❌ BlockId non disponible dans ShopOrds')
    console.log('   Erreur:', error instanceof Error ? error.message.substring(0, 200) : 'Unknown')
  }
  
  // Si BlockId n'existe pas, peut-être qu'il faut passer par une relation ?
  console.log('\n📡 Tentative 2: Expansion ShopOrderOperation')
  try {
    const response2 = await client.get('ShopOrderHandling.svc/ShopOrds', {
      $filter: "OrderNo eq '454853'",
      $select: 'OrderNo,ReleaseNo,SequenceNo',
      $expand: 'ShopOrderOperation',
      $top: '1'
    })
    
    console.log('✅ SUCCÈS - ShopOrderOperation expansion disponible !')
    console.log('📊 Données:', JSON.stringify(response2, null, 2))
  } catch (error) {
    console.log('❌ ShopOrderOperation expansion non disponible')
    console.log('   Erreur:', error instanceof Error ? error.message.substring(0, 200) : 'Unknown')
  }
}

testBlockId()
  .then(() => {
    console.log('\n✅ Test terminé')
    process.exit(0)
  })
  .catch(error => {
    console.error('\n❌ Erreur fatale:', error)
    process.exit(1)
  })
