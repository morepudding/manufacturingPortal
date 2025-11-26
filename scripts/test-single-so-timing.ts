/**
 * Script de test - Mesurer le temps pour 1 seul Shop Order
 * 
 * Usage: npx tsx scripts/test-single-so-timing.ts
 */

import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

async function testSingleShopOrder() {
  console.log('🧪 Test timing - 1 seul Shop Order\n')

  const shopOrder = { orderNo: '440809' }

  console.log('📋 Configuration:')
  console.log('  - Shop Orders: 1')
  console.log('  - Imprimante: PDF_PRINTER')
  console.log('')

  const startTime = Date.now()

  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/part-printer/labels/print`,
      {
        shopOrders: [shopOrder],
        printer: 'PDF_PRINTER',
        printModel: 'BEN_MA_FO_CR_184.rdl'
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 60000,
        validateStatus: () => true
      }
    )

    const duration = ((Date.now() - startTime) / 1000).toFixed(2)

    console.log('='.repeat(80))
    console.log('📊 RÉSULTAT')
    console.log('='.repeat(80))
    console.log(`⏱️  Temps pour 1 Shop Order: ${duration}s`)
    console.log(`📦 Status: ${response.status}`)
    console.log('')

    if (response.data.success) {
      console.log('✅ SUCCÈS !')
      console.log(`   - Message: ${response.data.data.message}`)
      console.log('')

      // Projections
      const timePerSO = parseFloat(duration)
      console.log('📈 PROJECTIONS:')
      console.log('')
      console.log('  Stratégie 1: Série (1 par 1)')
      console.log(`    - 119 SO × ${duration}s = ${(119 * timePerSO / 60).toFixed(1)} minutes`)
      console.log('')
      console.log('  Stratégie 2: Parallèle × 5')
      console.log(`    - 24 groupes × ${duration}s = ${(24 * timePerSO / 60).toFixed(1)} minutes`)
      console.log('')
      console.log('  Stratégie 3: Parallèle × 10')
      console.log(`    - 12 groupes × ${duration}s = ${(12 * timePerSO / 60).toFixed(1)} minutes ⭐`)
      console.log('')
      console.log('  Stratégie 4: Parallèle × 20')
      console.log(`    - 6 groupes × ${duration}s = ${(6 * timePerSO / 60).toFixed(1)} minutes`)
      console.log('')

      // Comparaison avec batch actuel
      const currentBatchTime = 6.75 // 6m45s avec batch 7 + parallèle 2
      console.log('📊 COMPARAISON avec batch actuel (7 SO + // 2):')
      console.log(`   - Actuel: ~${currentBatchTime} minutes`)
      console.log(`   - Meilleur parallèle: ~${(12 * timePerSO / 60).toFixed(1)} minutes`)
      const gain = ((currentBatchTime - 12 * timePerSO / 60) / currentBatchTime * 100).toFixed(0)
      console.log(`   - Gain potentiel: ${gain}%`)

    } else {
      console.log('❌ ÉCHEC')
      console.log(`   - Erreur: ${response.data.error}`)
    }

  } catch (error) {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2)
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
console.log('║  MESURE DU TEMPS POUR 1 SHOP ORDER                           ║')
console.log('╚════════════════════════════════════════════════════════════════╝')
console.log('')

testSingleShopOrder()
  .then(() => {
    console.log('\n✅ Test terminé')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Erreur fatale:', error)
    process.exit(1)
  })
