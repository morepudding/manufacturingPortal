/**
 * 🔍 DEBUG : Recherche Customer Order pour LG5MA0114
 * 
 * Ce script teste différentes stratégies de recherche pour comprendre
 * pourquoi le Hull Number LG5MA0114 ne retourne pas de résultat.
 */

import { getIFSClient } from '../src/shared/services/ifs-client'

async function debugCustomerOrderSearch() {
  const client = getIFSClient()
  const hullNumber = 'LG5MA0114'

  console.log('🔍 DEBUG Customer Order Search')
  console.log('=' .repeat(60))
  console.log(`Hull Number: ${hullNumber}\n`)

  // TEST 1 : Recherche SANS filtre de site
  console.log('📊 TEST 1: Recherche sans filtre de site')
  console.log('-'.repeat(60))
  try {
    const response1 = await client.get<any>(
      'CustomerOrderHandling.svc/CustomerOrderLineSet',
      {
        $filter: `CHullNumber eq '${hullNumber}'`,
        $select: 'OrderNo,LineNo,RelNo,CHullNumber,CustomerNo,Contract,PartNo,CatalogDesc,Objstate',
        $top: '10'
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
        console.log(`      Status: ${line.Objstate}`)
      })
    } else {
      console.log('   ❌ Aucun résultat trouvé')
    }
  } catch (error) {
    console.error('❌ Erreur TEST 1:', error instanceof Error ? error.message : error)
  }

  console.log('\n')

  // TEST 2 : Recherche avec CustomerNo = FR05A SEULEMENT
  console.log('📊 TEST 2: Recherche avec CustomerNo = FR05A')
  console.log('-'.repeat(60))
  try {
    const response2 = await client.get<any>(
      'CustomerOrderHandling.svc/CustomerOrderLineSet',
      {
        $filter: `CHullNumber eq '${hullNumber}' and CustomerNo eq 'FR05A'`,
        $select: 'OrderNo,LineNo,RelNo,CHullNumber,CustomerNo,Contract,PartNo,CatalogDesc,Objstate',
        $top: '10'
      }
    )

    console.log(`✅ Résultats trouvés: ${response2.value?.length || 0}`)
    
    if (response2.value && response2.value.length > 0) {
      response2.value.forEach((line: any, idx: number) => {
        console.log(`\n   📦 Résultat ${idx + 1}:`)
        console.log(`      OrderNo: ${line.OrderNo}`)
        console.log(`      CustomerNo: ${line.CustomerNo}`)
        console.log(`      Contract: ${line.Contract}`)
      })
    } else {
      console.log('   ❌ Aucun résultat trouvé')
    }
  } catch (error) {
    console.error('❌ Erreur TEST 2:', error instanceof Error ? error.message : error)
  }

  console.log('\n')

  // TEST 3 : Recherche avec Contract = FR05A SEULEMENT
  console.log('📊 TEST 3: Recherche avec Contract = FR05A')
  console.log('-'.repeat(60))
  try {
    const response3 = await client.get<any>(
      'CustomerOrderHandling.svc/CustomerOrderLineSet',
      {
        $filter: `CHullNumber eq '${hullNumber}' and Contract eq 'FR05A'`,
        $select: 'OrderNo,LineNo,RelNo,CHullNumber,CustomerNo,Contract,PartNo,CatalogDesc,Objstate',
        $top: '10'
      }
    )

    console.log(`✅ Résultats trouvés: ${response3.value?.length || 0}`)
    
    if (response3.value && response3.value.length > 0) {
      response3.value.forEach((line: any, idx: number) => {
        console.log(`\n   📦 Résultat ${idx + 1}:`)
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

  // TEST 4 : Recherche avec contains()
  console.log('📊 TEST 4: Recherche avec contains()')
  console.log('-'.repeat(60))
  try {
    const response4 = await client.get<any>(
      'CustomerOrderHandling.svc/CustomerOrderLineSet',
      {
        $filter: `contains(CHullNumber,'${hullNumber}')`,
        $select: 'OrderNo,LineNo,RelNo,CHullNumber,CustomerNo,Contract,PartNo,CatalogDesc,Objstate',
        $top: '10'
      }
    )

    console.log(`✅ Résultats trouvés: ${response4.value?.length || 0}`)
    
    if (response4.value && response4.value.length > 0) {
      response4.value.forEach((line: any, idx: number) => {
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
    console.error('❌ Erreur TEST 4:', error instanceof Error ? error.message : error)
  }

  console.log('\n')

  // TEST 5 : Recherche Shop Order 97277 pour voir CustomerOrder lié
  console.log('📊 TEST 5: Vérification Shop Order 97277')
  console.log('-'.repeat(60))
  try {
    const response5 = await client.get<any>(
      'ShopOrderHandling.svc/ShopOrds',
      {
        $filter: `contains(OrderNo,'97277')`,
        $select: 'OrderNo,CustomerOrderNo,CustomerLineNo,CustomerLineRelNo,Contract,SerialNo',
        $top: '5'
      }
    )

    console.log(`✅ Shop Orders trouvés: ${response5.value?.length || 0}`)
    
    if (response5.value && response5.value.length > 0) {
      const exactMatch = response5.value.find((so: any) => so.OrderNo === '97277')
      
      if (exactMatch) {
        console.log(`\n   📦 Shop Order 97277:`)
        console.log(`      CustomerOrderNo: ${exactMatch.CustomerOrderNo}`)
        console.log(`      CustomerLineNo: ${exactMatch.CustomerLineNo}`)
        console.log(`      CustomerLineRelNo: ${exactMatch.CustomerLineRelNo}`)
        console.log(`      Contract: ${exactMatch.Contract}`)
        console.log(`      SerialNo: ${exactMatch.SerialNo}`)

        // Tester avec ces infos
        if (exactMatch.CustomerOrderNo && exactMatch.CustomerLineNo) {
          console.log(`\n   🔍 Recherche Customer Order avec OrderNo + LineNo...`)
          
          const response6 = await client.get<any>(
            'CustomerOrderHandling.svc/CustomerOrderLineSet',
            {
              $filter: `OrderNo eq '${exactMatch.CustomerOrderNo}' and LineNo eq '${exactMatch.CustomerLineNo}'`,
              $select: 'OrderNo,LineNo,RelNo,CHullNumber,CustomerNo,Contract,PartNo,CatalogDesc,Objstate'
            }
          )

          if (response6.value && response6.value.length > 0) {
            const custOrder = response6.value[0]
            console.log(`   ✅ Customer Order trouvé:`)
            console.log(`      OrderNo: ${custOrder.OrderNo}`)
            console.log(`      CHullNumber: ${custOrder.CHullNumber}`)
            console.log(`      CustomerNo: ${custOrder.CustomerNo}`)
            console.log(`      Contract: ${custOrder.Contract}`)
          }
        }
      }
    }
  } catch (error) {
    console.error('❌ Erreur TEST 5:', error instanceof Error ? error.message : error)
  }

  console.log('\n' + '='.repeat(60))
  console.log('✅ Analyse terminée')
}

// Exécuter le script
debugCustomerOrderSearch().catch(console.error)
