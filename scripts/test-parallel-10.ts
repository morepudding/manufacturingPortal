/**
 * Script de test - Parallélisme × 10 (1 SO par appel)
 * 
 * Test final avec 119 Shop Orders
 * 
 * Usage: npx tsx scripts/test-parallel-10.ts
 */

import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

// 119 Shop Orders (la liste complète)
const shopOrders119 = [
  { orderNo: '440809' }, { orderNo: '440869' }, { orderNo: '440908' }, { orderNo: '440909' },
  { orderNo: '440941' }, { orderNo: '441632' }, { orderNo: '442026' }, { orderNo: '442139' },
  { orderNo: '442141' }, { orderNo: '442150' }, { orderNo: '442230' }, { orderNo: '442231' },
  { orderNo: '442240' }, { orderNo: '442547' }, { orderNo: '442548' }, { orderNo: '442549' },
  { orderNo: '442638' }, { orderNo: '442671' }, { orderNo: '442672' }, { orderNo: '442709' },
  { orderNo: '442826' }, { orderNo: '443015' }, { orderNo: '443016' }, { orderNo: '443093' },
  { orderNo: '443094' }, { orderNo: '443095' }, { orderNo: '443096' }, { orderNo: '443097' },
  { orderNo: '443098' }, { orderNo: '443113' }, { orderNo: '443114' }, { orderNo: '443126' },
  { orderNo: '443137' }, { orderNo: '443138' }, { orderNo: '443139' }, { orderNo: '443153' },
  { orderNo: '443154' }, { orderNo: '443155' }, { orderNo: '443156' }, { orderNo: '443157' },
  { orderNo: '443158' }, { orderNo: '443159' }, { orderNo: '443160' }, { orderNo: '443171' },
  { orderNo: '443172' }, { orderNo: '443175' }, { orderNo: '443176' }, { orderNo: '443185' },
  { orderNo: '443199' }, { orderNo: '443202' }, { orderNo: '443215' }, { orderNo: '443216' },
  { orderNo: '443217' }, { orderNo: '443218' }, { orderNo: '443243' }, { orderNo: '443244' },
  { orderNo: '443245' }, { orderNo: '443270' }, { orderNo: '443277' }, { orderNo: '443278' },
  { orderNo: '443288' }, { orderNo: '443289' }, { orderNo: '443296' }, { orderNo: '443297' },
  { orderNo: '443298' }, { orderNo: '443299' }, { orderNo: '443304' }, { orderNo: '443305' },
  { orderNo: '443347' }, { orderNo: '443512' }, { orderNo: '443520' }, { orderNo: '443541' },
  { orderNo: '444515' }, { orderNo: '444516' }, { orderNo: '445268' }, { orderNo: '445408' },
  { orderNo: '445811' }, { orderNo: '445812' }, { orderNo: '446107' }, { orderNo: '446108' },
  { orderNo: '446109' }, { orderNo: '446588' }, { orderNo: '446589' }, { orderNo: '446606' },
  { orderNo: '446621' }, { orderNo: '446622' }, { orderNo: '446634' }, { orderNo: '448236' },
  { orderNo: '448237' }, { orderNo: '449297' }, { orderNo: '450788' }, { orderNo: '451524' },
  { orderNo: '452010' }, { orderNo: '452012' }, { orderNo: '452013' }, { orderNo: '452327' },
  { orderNo: '452352' }, { orderNo: '453060' }, { orderNo: '453061' }, { orderNo: '453069' },
  { orderNo: '453070' }, { orderNo: '453842' }, { orderNo: '457819' }, { orderNo: '457820' },
  { orderNo: '457983' }, { orderNo: '457984' }, { orderNo: '458004' }, { orderNo: '458005' },
  { orderNo: '458053' }, { orderNo: '458392' }, { orderNo: '458498' }, { orderNo: '458764' },
  { orderNo: '458809' }, { orderNo: '459573' }, { orderNo: '459603' }, { orderNo: '460030' },
  { orderNo: '460044' }, { orderNo: '460067' }, { orderNo: '460297' }
]

async function testParallelPrinting() {
  console.log('🧪 Test FINAL - Parallélisme × 10 (1 SO par appel)\n')

  console.log('📋 Configuration:')
  console.log('  - Shop Orders: 119')
  console.log('  - Parallélisme: 10 appels simultanés')
  console.log('  - Stratégie: 1 Shop Order par appel')
  console.log('  - Groupes attendus: 12 (10×11 + 9×1)')
  console.log('  - Temps estimé: ~2 minutes')
  console.log('')

  const startTime = Date.now()

  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/part-printer/labels/print-batch`,
      {
        shopOrders: shopOrders119,
        printer: 'PDF_PRINTER',
        printModel: 'BEN_MA_FO_CR_184.rdl',
        parallelism: 10
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 300000, // 5 minutes max
        validateStatus: () => true
      }
    )

    const duration = ((Date.now() - startTime) / 1000).toFixed(1)

    console.log('\n' + '='.repeat(80))
    console.log('📊 RÉSULTATS FINAUX')
    console.log('='.repeat(80))
    console.log(`⏱️  Durée totale: ${duration}s (${(parseFloat(duration) / 60).toFixed(2)} minutes)`)
    console.log(`📦 Status: ${response.status}`)
    console.log('')

    if (response.data.success) {
      console.log('🎉 SUCCÈS TOTAL !')
      console.log(`   - Total Shop Orders: ${response.data.data.totalShopOrders}`)
      console.log(`   - Total groupes: ${response.data.data.totalBatches}`)
      console.log(`   - Groupes réussis: ${response.data.data.successfulBatches}`)
      console.log(`   - Groupes échoués: ${response.data.data.failedBatches}`)
      console.log(`   - Durée serveur: ${(response.data.data.durationMs / 1000).toFixed(1)}s`)
      console.log('')

      // Comparaison avec l'ancienne méthode
      const oldMethod = 6.75 * 60 // 6m45s en secondes
      const newMethod = response.data.data.durationMs / 1000
      const gain = ((oldMethod - newMethod) / oldMethod * 100).toFixed(0)

      console.log('🚀 GAIN DE PERFORMANCE:')
      console.log(`   - Ancienne méthode (batch 7 + // 2): ${(oldMethod / 60).toFixed(1)} minutes`)
      console.log(`   - Nouvelle méthode (// 10 × 1 SO): ${(newMethod / 60).toFixed(2)} minutes`)
      console.log(`   - Gain: ${gain}% plus rapide ! 🔥`)

    } else {
      console.log('⚠️ SUCCÈS PARTIEL')
      console.log(`   - Erreur: ${response.data.error}`)
      if (response.data.data) {
        console.log(`   - Groupes réussis: ${response.data.data.successfulBatches}/${response.data.data.totalBatches}`)
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
console.log('║  TEST FINAL - 119 SHOP ORDERS (PARALLÉLISME × 10)           ║')
console.log('╚════════════════════════════════════════════════════════════════╝')
console.log('')

testParallelPrinting()
  .then(() => {
    console.log('\n✅ Test terminé')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Erreur fatale:', error)
    process.exit(1)
  })
