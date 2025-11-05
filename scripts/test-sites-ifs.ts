/**
 * Script de test: Récupération des sites/contracts depuis IFS
 * 
 * Usage: npx tsx scripts/test-sites-ifs.ts
 */

import 'dotenv/config'
import { getIFSClient } from '../src/shared/services/ifs-client'

async function testSites() {
  console.log('🔍 Test: Récupération des sites/contracts depuis IFS...\n')
  
  try {
    const client = getIFSClient()
    
    // Test 1: Récupérer les 100 premiers Shop Orders avec leurs contracts
    console.log('📊 Test 1: Récupération de 100 Shop Orders')
    const response1 = await client.get<any>(
      'ShopOrderHandling.svc/ShopOrds',
      {
        $select: 'OrderNo,Contract',
        $top: '100',
        $orderby: 'OrderNo desc'
      }
    )
    
    const contracts1 = new Set<string>()
    response1.value?.forEach((order: any) => {
      if (order.Contract) contracts1.add(order.Contract)
    })
    
    console.log(`   ✅ ${response1.value?.length || 0} Shop Orders récupérés`)
    console.log(`   📍 Contracts trouvés: ${Array.from(contracts1).join(', ')}`)
    console.log(`   📊 Nombre de sites uniques: ${contracts1.size}\n`)
    
    // Test 2: Récupérer les 1000 premiers
    console.log('📊 Test 2: Récupération de 1000 Shop Orders')
    const response2 = await client.get<any>(
      'ShopOrderHandling.svc/ShopOrds',
      {
        $select: 'OrderNo,Contract',
        $top: '1000',
        $orderby: 'OrderNo desc'
      }
    )
    
    const contracts2 = new Set<string>()
    response2.value?.forEach((order: any) => {
      if (order.Contract) contracts2.add(order.Contract)
    })
    
    console.log(`   ✅ ${response2.value?.length || 0} Shop Orders récupérés`)
    console.log(`   📍 Contracts trouvés: ${Array.from(contracts2).join(', ')}`)
    console.log(`   📊 Nombre de sites uniques: ${contracts2.size}\n`)
    
    // Test 3: Essayer de récupérer avec un filtre sur les états actifs
    console.log('📊 Test 3: Shop Orders avec états Released ou Started')
    try {
      const response3 = await client.get<any>(
        'ShopOrderHandling.svc/ShopOrds',
        {
          $select: 'OrderNo,Contract,Objstate',
          $filter: "Objstate eq 'Released' or Objstate eq 'Started'",
          $top: '500',
          $orderby: 'OrderNo desc'
        }
      )
      
      const contracts3 = new Set<string>()
      response3.value?.forEach((order: any) => {
        if (order.Contract) contracts3.add(order.Contract)
      })
      
      console.log(`   ✅ ${response3.value?.length || 0} Shop Orders actifs récupérés`)
      console.log(`   📍 Contracts trouvés: ${Array.from(contracts3).join(', ')}`)
      console.log(`   📊 Nombre de sites uniques: ${contracts3.size}\n`)
    } catch (e) {
      console.log('   ⚠️  Filtre Objstate non supporté, continuons...\n')
    }
    
    // Test 4: Afficher un échantillon détaillé
    console.log('📋 Test 4: Échantillon détaillé (10 premiers Shop Orders)')
    const response4 = await client.get<any>(
      'ShopOrderHandling.svc/ShopOrds',
      {
        $select: 'OrderNo,Contract,PartNo',
        $top: '10',
        $orderby: 'OrderNo desc'
      }
    )
    
    console.log('   Détails:')
    response4.value?.forEach((order: any, index: number) => {
      console.log(`   ${index + 1}. Order: ${order.OrderNo}, Contract: ${order.Contract}`)
    })
    
    console.log('\n✅ Tests terminés!')
    
    // Résumé final
    console.log('\n' + '='.repeat(60))
    console.log('📊 RÉSUMÉ')
    console.log('='.repeat(60))
    console.log(`Total sites trouvés (1000 Shop Orders): ${contracts2.size}`)
    console.log(`Sites: ${Array.from(contracts2).join(', ')}`)
    
  } catch (error) {
    console.error('❌ Erreur:', error)
  }
}

testSites()
