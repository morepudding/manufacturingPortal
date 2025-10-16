/**
 * Script de diagnostic pour vérifier les layouts disponibles
 * et tester l'impression avec différents layouts
 * 
 * Usage: npx tsx scripts/debug-print-layouts.ts
 */

// Charger les variables d'environnement depuis .env.local
import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

import { getIFSClient } from '../src/shared/services/ifs-client'

async function debugPrintLayouts() {
  console.log('🔍 Diagnostic des layouts d\'impression IFS\n')
  
  const client = getIFSClient()
  const orderNo = 'C1000001301' // Order de test
  const reportId = 'CUSTOMER_ORDER_CONF_REP'
  
  try {
    // ===== Étape 1 : GET Customer Order + ETag =====
    console.log('📝 Step 1: Récupération Customer Order...')
    
    const orderResponse: any = await client.get(
      `CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${orderNo}')`
    )
    
    const etag = orderResponse['@odata.etag']
    console.log(`✅ Order ${orderNo} trouvé (ETag: ${etag})\n`)
    
    // ===== Étape 2 : POST PrintResultKey =====
    console.log('🔑 Step 2: Génération ResultKey...')
    
    const resultKeyResponse: any = await client.post(
      `CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${orderNo}')/IfsApp.CustomerOrderHandling.CustomerOrder_PrintResultKey`,
      { ReportId: reportId },
      { 'If-Match': etag }
    )
    
    const resultKey = parseInt(resultKeyResponse.value, 10)
    console.log(`✅ ResultKey généré: ${resultKey}\n`)
    
    // ===== Étape 3 : POST PrintDialogInit =====
    console.log('🎨 Step 3: Initialisation Print Dialog...')
    
    const dialogResponse: any = await client.post(
      'PrintDialog.svc/PrintDialogInit',
      { ResultKey: resultKey }
    )
    
    console.log('\n📊 Informations du Print Dialog:')
    console.log('  - Result Key:', dialogResponse.ResultKey)
    console.log('  - Report ID:', dialogResponse.ReportId)
    console.log('  - Report Title:', dialogResponse.ReportTitle)
    console.log('  - Layout Name (défaut IFS):', dialogResponse.LayoutName)
    console.log('  - Report Attachment:', dialogResponse.ReportAttachment)
    console.log('  - Printer ID:', dialogResponse.PrinterId)
    console.log('  - Language Code:', dialogResponse.LanguageCode)
    console.log('  - Copies:', dialogResponse.Copies)
    
    // ===== Étape 4 : Tester avec layout par défaut =====
    console.log('\n\n🧪 TEST 1: Impression avec layout par défaut IFS')
    console.log(`Layout: ${dialogResponse.LayoutName}`)
    
    await client.post(
      'PrintDialog.svc/ReportPrintRequest',
      {
        ResultKey: resultKey,
        LayoutName: dialogResponse.LayoutName, // Layout par défaut d'IFS
        LanguageCode: 'fr',
        LogicalPrinter: 'PDF_PRINTER',
        Copies: 1,
      }
    )
    
    console.log('✅ Impression avec layout défaut envoyée\n')
    
    // ===== Étape 5 : Tester avec layout custom =====
    console.log('🧪 TEST 2: Tentative avec layout custom')
    console.log('Layout: BEN_Boat_configuration_for_production.rdl')
    
    // Générer un nouveau ResultKey pour le test 2
    const resultKeyResponse2: any = await client.post(
      `CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${orderNo}')/IfsApp.CustomerOrderHandling.CustomerOrder_PrintResultKey`,
      { ReportId: reportId },
      { 'If-Match': etag }
    )
    
    const resultKey2 = parseInt(resultKeyResponse2.value, 10)
    console.log(`ResultKey test 2: ${resultKey2}`)
    
    await client.post(
      'PrintDialog.svc/PrintDialogInit',
      { ResultKey: resultKey2 }
    )
    
    try {
      await client.post(
        'PrintDialog.svc/ReportPrintRequest',
        {
          ResultKey: resultKey2,
          LayoutName: 'BEN_Boat_configuration_for_production.rdl',
          LanguageCode: 'fr',
          LogicalPrinter: 'PDF_PRINTER',
          Copies: 1,
        }
      )
      
      console.log('✅ Impression avec layout custom envoyée')
    } catch (error) {
      console.log('❌ Erreur avec layout custom:', error instanceof Error ? error.message : error)
    }
    
    console.log('\n\n📝 RÉSUMÉ:')
    console.log('─────────────────────────────────────────────')
    console.log('Pour générer un PDF avec du contenu, utilisez:')
    console.log(`  LayoutName: "${dialogResponse.LayoutName}"`)
    console.log('')
    console.log('⚠️  Si le layout custom BEN_Boat_configuration_for_production.rdl')
    console.log('   génère des PDFs vides, c\'est que:')
    console.log('   1. Le layout n\'existe pas dans IFS')
    console.log('   2. Le layout existe mais n\'est pas configuré correctement')
    console.log('   3. Le layout est vide (pas de contenu défini)')
    console.log('─────────────────────────────────────────────')
    
  } catch (error) {
    console.error('\n❌ Erreur:')
    console.error(error instanceof Error ? error.message : error)
    if (error instanceof Error && error.stack) {
      console.error('\nStack trace:')
      console.error(error.stack)
    }
    process.exit(1)
  }
}

// Exécuter le diagnostic
debugPrintLayouts()
