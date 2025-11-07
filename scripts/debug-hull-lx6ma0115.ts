/**
 * 🔍 DEBUG : Recherche Customer Order pour LX6MA0115
 * 
 * Test de différentes stratégies de recherche pour comprendre
 * la structure réelle des données IFS
 */

import { getIFSClient } from '../src/shared/services/ifs-client'

async function debugHullNumber() {
  const client = getIFSClient()
  const hullNumber = 'LX6MA0115'
  const orderNo = 'CNB-68381'

  console.log('🔍 DEBUG Customer Order Search')
  console.log('=' .repeat(60))
  console.log(`Hull Number: ${hullNumber}`)
  console.log(`Expected Order No: ${orderNo}`)
  console.log('')

  // TEST 1 : Recherche SANS filtre CustomerNo/Contract
  console.log('📊 TEST 1: Recherche par CHullNumber UNIQUEMENT')
  console.log('-'.repeat(60))
  try {
    const response1 = await client.get<any>(
      'CustomerOrderHandling.svc/CustomerOrderLineSet',
      {
        $filter: `CHullNumber eq '${hullNumber}'`,
        $select: 'OrderNo,LineNo,RelNo,CHullNumber,CustomerNo,Contract,PartNo,CatalogDesc,Objstate',
        $top: '5'
      }
    )

    console.log(`✅ Résultats trouvés: ${response1.value?.length || 0}`)
    
    if (response1.value && response1.value.length > 0) {
      response1.value.forEach((line: any, idx: number) => {
        console.log(`\n   📦 Résultat ${idx + 1}:`)
        console.log(`      OrderNo: ${line.OrderNo}`)
        console.log(`      LineNo: ${line.LineNo}`)
        console.log(`      CustomerNo: ${line.CustomerNo}`)
        console.log(`      Contract: ${line.Contract}`)
        console.log(`      PartNo: ${line.PartNo}`)
        console.log(`      CatalogDesc: ${line.CatalogDesc}`)
        console.log(`      Status: ${line.Objstate}`)
      })
    } else {
      console.log('   ❌ Aucun résultat trouvé')
    }
  } catch (error) {
    console.error('❌ Erreur TEST 1:', error instanceof Error ? error.message : error)
  }

  console.log('\n')

  // TEST 2 : Recherche par OrderNo directement
  console.log('📊 TEST 2: Recherche par OrderNo directement')
  console.log('-'.repeat(60))
  try {
    const response2 = await client.get<any>(
      'CustomerOrderHandling.svc/CustomerOrderLineSet',
      {
        $filter: `OrderNo eq '${orderNo}'`,
        $select: 'OrderNo,LineNo,RelNo,CHullNumber,CustomerNo,Contract,PartNo,CatalogDesc,Objstate',
        $top: '5'
      }
    )

    console.log(`✅ Résultats trouvés: ${response2.value?.length || 0}`)
    
    if (response2.value && response2.value.length > 0) {
      response2.value.forEach((line: any, idx: number) => {
        console.log(`\n   📦 Résultat ${idx + 1}:`)
        console.log(`      OrderNo: ${line.OrderNo}`)
        console.log(`      CHullNumber: ${line.CHullNumber}`)
        console.log(`      CustomerNo: ${line.CustomerNo}`)
        console.log(`      Contract: ${line.Contract}`)
        console.log(`      PartNo: ${line.PartNo}`)
      })
    } else {
      console.log('   ❌ Aucun résultat trouvé')
    }
  } catch (error) {
    console.error('❌ Erreur TEST 2:', error instanceof Error ? error.message : error)
  }

  console.log('\n')

  // TEST 3 : Recherche avec contains() pour être sûr
  console.log('📊 TEST 3: Recherche avec contains()')
  console.log('-'.repeat(60))
  try {
    const response3 = await client.get<any>(
      'CustomerOrderHandling.svc/CustomerOrderLineSet',
      {
        $filter: `contains(CHullNumber,'${hullNumber}')`,
        $select: 'OrderNo,LineNo,CHullNumber,CustomerNo,Contract,PartNo',
        $top: '5'
      }
    )

    console.log(`✅ Résultats trouvés: ${response3.value?.length || 0}`)
    
    if (response3.value && response3.value.length > 0) {
      response3.value.forEach((line: any, idx: number) => {
        console.log(`\n   📦 Résultat ${idx + 1}:`)
        console.log(`      CHullNumber: ${line.CHullNumber}`)
        console.log(`      OrderNo: ${line.OrderNo}`)
        console.log(`      CustomerNo: ${line.CustomerNo}`)
        console.log(`      Contract: ${line.Contract}`)
      })
    } else {
      console.log('   ❌ Aucun résultat trouvé')
    }
  } catch (error) {
    console.error('❌ Erreur TEST 3:', error instanceof Error ? error.message : error)
  }

  console.log('\n')

  // TEST 4 : Récupérer le Customer Order Header pour voir les vrais champs
  console.log('📊 TEST 4: Recherche Customer Order Header')
  console.log('-'.repeat(60))
  try {
    const response4 = await client.get<any>(
      'CustomerOrderHandling.svc/CustomerOrderSet',
      {
        $filter: `OrderNo eq '${orderNo}'`,
        $select: 'OrderNo,CustomerNo,Contract,CustomerName,Objstate,DateEntered',
        $top: '1'
      }
    )

    console.log(`✅ Résultats trouvés: ${response4.value?.length || 0}`)
    
    if (response4.value && response4.value.length > 0) {
      const order = response4.value[0]
      console.log(`\n   📦 Customer Order:`)
      console.log(`      OrderNo: ${order.OrderNo}`)
      console.log(`      CustomerNo: ${order.CustomerNo}`)
      console.log(`      CustomerName: ${order.CustomerName}`)
      console.log(`      Contract: ${order.Contract}`)
      console.log(`      Status: ${order.Objstate}`)
      console.log(`      DateEntered: ${order.DateEntered}`)
    } else {
      console.log('   ❌ Aucun résultat trouvé')
    }
  } catch (error) {
    console.error('❌ Erreur TEST 4:', error instanceof Error ? error.message : error)
  }

  console.log('\n' + '='.repeat(60))
  console.log('✅ Analyse terminée')
  console.log('')
  console.log('💡 CONCLUSIONS ATTENDUES :')
  console.log('   - CustomerNo = Code du CLIENT (ex: CNB, BEN, etc.)')
  console.log('   - Contract = Site de production (ex: FR05A)')
  console.log('   - Le filtre doit utiliser Contract, PAS CustomerNo !')
}

// Exécuter le script
debugHullNumber().catch(console.error)
