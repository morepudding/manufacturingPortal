/**
 * Script de test - Batching avec parallélisme
 * 
 * Usage: npx tsx scripts/test-batch-parallelism.ts
 */

import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

// 21 Shop Orders (3 lots de 7)
const shopOrders21 = [
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
  { orderNo: '442709' },
  { orderNo: '442826' }
]

async function testBatchParallelism() {
  console.log('🧪 Test batching avec parallélisme (2 lots en parallèle)\n')

  console.log('📋 Configuration:')
  console.log('  - Shop Orders: 21')
  console.log('  - Batch size: 7')
  console.log('  - Lots attendus: 3 (7 + 7 + 7)')
  console.log('  - Parallélisme: 2')
  console.log('  - Temps estimé série: ~60s (3 lots × ~20s)')
  console.log('  - Temps estimé parallèle: ~40s (lot1+2 en // ~20s, puis lot3 ~20s)')
  console.log('')

  const startTime = Date.now()

  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/part-printer/labels/print-batch`,
      {
        shopOrders: shopOrders21,
        printer: 'PDF_PRINTER',
        printModel: 'BEN_MA_FO_CR_184.rdl',
        batchSize: 7
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 120000, // 2 minutes
        validateStatus: () => true
      }
    )

    const duration = ((Date.now() - startTime) / 1000).toFixed(1)

    console.log('\n' + '='.repeat(80))
    console.log('📊 RÉSULTATS')
    console.log('='.repeat(80))
    console.log(`⏱️  Durée totale: ${duration}s`)
    console.log(`📦 Status: ${response.status}`)
    console.log('')

    if (response.data.success) {
      console.log('✅ SUCCÈS !')
      console.log(`   - Total Shop Orders: ${response.data.data.totalShopOrders}`)
      console.log(`   - Total batches: ${response.data.data.totalBatches}`)
      console.log(`   - Batches réussis: ${response.data.data.successfulBatches}`)
      console.log(`   - Batches échoués: ${response.data.data.failedBatches}`)
      console.log(`   - Durée serveur: ${(response.data.data.durationMs / 1000).toFixed(1)}s`)
      console.log('')

      // Analyse du gain
      const expectedSerial = response.data.data.totalBatches * 20 // ~20s par lot
      const actualTime = response.data.data.durationMs / 1000
      const gain = ((expectedSerial - actualTime) / expectedSerial * 100).toFixed(0)

      console.log('🚀 Analyse du gain:')
      console.log(`   - Temps série estimé: ~${expectedSerial}s`)
      console.log(`   - Temps parallèle réel: ${actualTime.toFixed(1)}s`)
      console.log(`   - Gain: ~${gain}% plus rapide`)

    } else {
      console.log('❌ ÉCHEC')
      console.log(`   - Erreur: ${response.data.error}`)
      if (response.data.data) {
        console.log(`   - Batches réussis: ${response.data.data.successfulBatches}/${response.data.data.totalBatches}`)
      }
    }

  } catch (error) {
    const duration = ((Date.now() - startTime) / 1000).toFixed(1)
    console.log(`\n❌ Erreur après ${duration}s`)

    if (axios.isAxiosError(error)) {
      console.error('Erreur Axios:', error.message)
      if (error.response) {
        console.error('Response:', error.response.data)
      }
    } else {
      console.error('Erreur:', error)
    }
  }
}

// Exécution
console.log('╔════════════════════════════════════════════════════════════════╗')
console.log('║  TEST BATCHING AVEC PARALLÉLISME (2 lots en //)              ║')
console.log('╚════════════════════════════════════════════════════════════════╝')
console.log('')

testBatchParallelism()
  .then(() => {
    console.log('\n✅ Test terminé')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Erreur fatale:', error)
    process.exit(1)
  })
