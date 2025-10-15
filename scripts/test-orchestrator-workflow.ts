/**
 * 🧪 Test Orchestrateur Part Printer - Workflow Complet
 * 
 * Ce script teste le service orchestrateur qui coordonne tous les services
 * pour générer les étiquettes Part Printer.
 * 
 * Workflow testé :
 * 1. Filtrer les Shop Orders (site FR017)
 * 2. Extraire toutes les données (Raw Material, attributs, etc.)
 * 3. Générer les étiquettes consolidées
 * 4. (Optionnel) Générer le PDF
 * 5. (Optionnel) Imprimer
 * 
 * Usage:
 *   npx tsx scripts/test-orchestrator-workflow.ts
 */

// Charger les variables d'environnement depuis .env.local
import { config } from 'dotenv'
import { resolve } from 'path'
config({ path: resolve(__dirname, '../.env.local') })

import { 
  generatePartLabels, 
  executeCompleteWorkflow,
  type GenerateLabelsOptions,
  type CompleteWorkflowOptions
} from '../src/tools/part-printer/services/orchestrator-service'

console.log('🧪 TEST ORCHESTRATEUR PART PRINTER\n')
console.log('━'.repeat(80))

/**
 * Test 1 : Génération d'étiquettes uniquement (sans PDF ni impression)
 */
async function test1_GenerateLabels() {
  console.log('\n📋 TEST 1 : GÉNÉRATION ÉTIQUETTES (sans PDF)')
  console.log('━'.repeat(80))
  
  const options: GenerateLabelsOptions = {
    filters: {
      site: 'FR017',              // Site BDR
      productionLine: 'MASSIF',   // Ligne de production MASSIF
      startDate: '2024-10-01',    // Date de début (octobre 2024)
      blockDate: true,            // Débit classique
      op10BlockId: 'EMPTY'        // OP10 Block ID vide
    },
    generateBarcodes: true,       // Générer les barcodes
    mockRangeId: undefined        // Laisser le calcul automatique
  }
  
  try {
    console.log('📊 Filtres utilisés:')
    console.log('  - Site:', options.filters.site)
    console.log('  - Production Line:', options.filters.productionLine)
    console.log('  - Start Date:', options.filters.startDate)
    console.log('  - Block Date:', options.filters.blockDate)
    console.log('  - OP10 Block ID:', options.filters.op10BlockId)
    console.log()
    
    console.log('🚀 Démarrage génération étiquettes...\n')
    
    const result = await generatePartLabels(options)
    
    console.log('\n━'.repeat(80))
    console.log('✅ TEST 1 TERMINÉ')
    console.log(`📊 Résultat: ${result.count} étiquettes générées`)
    console.log(`⏱️  Durée: ${(result.duration / 1000).toFixed(2)}s`)
    console.log(`❌ Erreurs: ${result.errors}`)
    
    if (result.errorDetails.length > 0) {
      console.log('\n📋 Détails des erreurs:')
      result.errorDetails.forEach(err => {
        console.log(`  ❌ ${err.orderNo}: ${err.error}`)
      })
    }
    
    if (result.count > 0) {
      console.log('\n📋 Aperçu première étiquette:')
      const firstLabel = result.labels[0]
      console.log('  Shop Order:', `${firstLabel.orderNo}-${firstLabel.releaseNo}-${firstLabel.sequenceNo}`)
      console.log('  Part No:', firstLabel.partNo)
      console.log('  Raw Material:', firstLabel.rawMaterial, '-', firstLabel.rawMaterialDescription.substring(0, 50) + '...')
      console.log('  Block ID:', firstLabel.blockId || 'null')
      console.log('  Generic Code:', firstLabel.genericCode)
      console.log('  Length Setup:', firstLabel.lengthSetup)
      console.log('  Varnish Code:', firstLabel.varnishCode)
      console.log('  Revision:', firstLabel.engineeringPartRev)
      console.log('  Range ID:', firstLabel.rangeId)
      console.log('  Barcode:', firstLabel.barcode)
    }
    
    return result
    
  } catch (error) {
    console.error('\n❌ TEST 1 ÉCHOUÉ')
    console.error('Erreur:', error instanceof Error ? error.message : error)
    throw error
  }
}

/**
 * Test 2 : Workflow complet (étiquettes + PDF + impression mode DEV)
 */
async function test2_CompleteWorkflow() {
  console.log('\n\n📋 TEST 2 : WORKFLOW COMPLET (étiquettes + PDF + impression DEV)')
  console.log('━'.repeat(80))
  
  const options: CompleteWorkflowOptions = {
    filters: {
      site: 'FR017',
      productionLine: 'MASSIF',
      startDate: '2024-10-01',
      blockDate: true,
      op10BlockId: 'EMPTY'
    },
    generateBarcodes: true,
    printOptions: {
      printerId: 'PRTBX101',      // Imprimante de test
      site: 'FR017',
      copies: 1,
      mode: 'dev'                 // Mode DEV = téléchargement uniquement
    },
    generatePDF: true,            // Générer le PDF
    printPDF: true                // "Imprimer" (= télécharger en mode DEV)
  }
  
  try {
    console.log('📊 Options workflow complet:')
    console.log('  - Filtres: Site FR017, Line MASSIF, Date 2024-10-01')
    console.log('  - Générer PDF: OUI')
    console.log('  - Imprimer: OUI (mode DEV)')
    console.log('  - Imprimante:', options.printOptions.printerId)
    console.log()
    
    console.log('🚀 Démarrage workflow complet...\n')
    
    const result = await executeCompleteWorkflow(options)
    
    console.log('\n━'.repeat(80))
    console.log('✅ TEST 2 TERMINÉ')
    console.log(`📊 Étiquettes: ${result.labels.count} générées`)
    console.log(`⏱️  Durée totale: ${(result.totalDuration / 1000).toFixed(2)}s`)
    
    if (result.pdf) {
      console.log(`📄 PDF: ${result.pdf.pageCount} pages, ${(result.pdf.size / 1024).toFixed(2)} KB`)
    }
    
    if (result.print) {
      console.log(`🖨️  Impression: ${result.print.message}`)
      console.log(`   Mode: ${result.print.mode.toUpperCase()}`)
      if (result.print.downloadUrl) {
        console.log(`   URL: ${result.print.downloadUrl}`)
      }
    }
    
    return result
    
  } catch (error) {
    console.error('\n❌ TEST 2 ÉCHOUÉ')
    console.error('Erreur:', error instanceof Error ? error.message : error)
    throw error
  }
}

/**
 * Test 3 : Génération avec filtres REDÉBIT
 */
async function test3_RedebitMode() {
  console.log('\n\n📋 TEST 3 : MODE REDÉBIT')
  console.log('━'.repeat(80))
  
  const options: GenerateLabelsOptions = {
    filters: {
      site: 'FR017',
      startDate: '2024-10-15',    // Date aujourd'hui
      blockDate: false,           // REDÉBIT
      op10BlockId: 'NO_CONDITION' // Pas de condition sur Block ID
    },
    generateBarcodes: false       // Pas de barcodes pour ce test
  }
  
  try {
    console.log('📊 Filtres REDÉBIT:')
    console.log('  - Site:', options.filters.site)
    console.log('  - Start Date:', options.filters.startDate)
    console.log('  - Block Date:', options.filters.blockDate, '(REDÉBIT)')
    console.log('  - OP10 Block ID:', options.filters.op10BlockId)
    console.log()
    
    console.log('🚀 Démarrage génération REDÉBIT...\n')
    
    const result = await generatePartLabels(options)
    
    console.log('\n━'.repeat(80))
    console.log('✅ TEST 3 TERMINÉ')
    console.log(`📊 Résultat: ${result.count} étiquettes REDÉBIT générées`)
    console.log(`⏱️  Durée: ${(result.duration / 1000).toFixed(2)}s`)
    
    return result
    
  } catch (error) {
    console.error('\n❌ TEST 3 ÉCHOUÉ')
    console.error('Erreur:', error instanceof Error ? error.message : error)
    throw error
  }
}

/**
 * Exécution des tests
 */
async function runAllTests() {
  console.log('🎯 EXÉCUTION DE TOUS LES TESTS\n')
  
  const results = {
    test1: null as any,
    test2: null as any,
    test3: null as any
  }
  
  try {
    // Test 1
    results.test1 = await test1_GenerateLabels()
    
    // Test 2 (seulement si Test 1 a trouvé des étiquettes)
    if (results.test1.count > 0) {
      results.test2 = await test2_CompleteWorkflow()
    } else {
      console.log('\n⚠️  TEST 2 SKIPPÉ (aucune étiquette trouvée en Test 1)')
    }
    
    // Test 3
    results.test3 = await test3_RedebitMode()
    
    // Résumé final
    console.log('\n\n' + '━'.repeat(80))
    console.log('📊 RÉSUMÉ FINAL')
    console.log('━'.repeat(80))
    console.log(`✅ Test 1 (Génération): ${results.test1.count} étiquettes`)
    if (results.test2) {
      console.log(`✅ Test 2 (Workflow complet): ${results.test2.labels.count} étiquettes, PDF ${results.test2.pdf?.pageCount} pages`)
    }
    console.log(`✅ Test 3 (REDÉBIT): ${results.test3.count} étiquettes`)
    
    console.log('\n🎉 TOUS LES TESTS TERMINÉS AVEC SUCCÈS !')
    
  } catch (error) {
    console.error('\n❌ UN TEST A ÉCHOUÉ')
    console.error('Erreur:', error)
    process.exit(1)
  }
}

// Exécuter les tests
runAllTests()
