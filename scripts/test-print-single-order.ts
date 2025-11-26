/**
 * Script de test - Impression d'un seul Shop Order
 * 
 * Usage: npx tsx scripts/test-print-single-order.ts
 */

import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

interface PrintRequest {
  shopOrders: Array<{
    orderNo: string
    releaseNo?: string
    sequenceNo?: string
  }>
  printer: string
  printModel?: string
}

async function testPrintSingleOrder() {
  console.log('🧪 Test impression - Trouver la limite de Shop Orders\n')

  // Les 20 premiers Shop Orders de la liste réelle
  const shopOrders20 = [
    { orderNo: '440809' },
    { orderNo: '440869' },
    { orderNo: '440908' },
    { orderNo: '440909' },
    { orderNo: '440941' },
    { orderNo: '441632' },
    { orderNo: '442026' },
    { orderNo: '442139' },
    { orderNo: '442141' },
    { orderNo: '442150' },
    { orderNo: '442230' },
    { orderNo: '442231' },
    { orderNo: '442240' },
    { orderNo: '442547' },
    { orderNo: '442548' },
    { orderNo: '442549' },
    { orderNo: '442638' },
    { orderNo: '442671' },
    { orderNo: '442672' },
    { orderNo: '442709' }
  ]

  // Test 1: 3 Shop Orders
  console.log('📋 Test 1: 3 Shop Orders')
  await testPrint({
    shopOrders: shopOrders20.slice(0, 3),
    printer: 'PRTBX109 - MAFOPR183',
    printModel: 'BEN_MA_FO_CR_184.rdl'
  })

  console.log('\n' + '='.repeat(80) + '\n')

  // Test 2: 10 Shop Orders
  console.log('📋 Test 2: 10 Shop Orders')
  await testPrint({
    shopOrders: shopOrders20.slice(0, 10),
    printer: 'PRTBX109 - MAFOPR183',
    printModel: 'BEN_MA_FO_CR_184.rdl'
  })

  console.log('\n' + '='.repeat(80) + '\n')

  // Test 3: 20 Shop Orders
  console.log('📋 Test 3: 20 Shop Orders')
  await testPrint({
    shopOrders: shopOrders20,
    printer: 'PRTBX109 - MAFOPR183',
    printModel: 'BEN_MA_FO_CR_184.rdl'
  })
}

async function testPrint(request: PrintRequest) {
  console.log('🖨️  Imprimante:', request.printer)
  console.log('📦 Shop Orders:', request.shopOrders.length)
  console.log('📄 Print Model:', request.printModel)
  console.log('')

  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/part-printer/labels/print`,
      request,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000,
        validateStatus: () => true // Accepter tous les status codes
      }
    )

    console.log('✅ Status:', response.status)
    console.log('📨 Response:', JSON.stringify(response.data, null, 2))

    if (response.status === 200) {
      console.log('🎉 SUCCÈS !')
    } else {
      console.log('❌ ÉCHEC')
    }

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('❌ Erreur Axios:', error.message)
      if (error.response) {
        console.error('📊 Response data:', error.response.data)
        console.error('📊 Response status:', error.response.status)
      }
    } else {
      console.error('❌ Erreur:', error)
    }
  }
}

// Exécution
testPrintSingleOrder()
  .then(() => {
    console.log('\n✅ Tests terminés')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Erreur fatale:', error)
    process.exit(1)
  })
