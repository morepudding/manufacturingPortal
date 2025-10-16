/**
 * Script de test pour lancer une impression Customer Order
 * AVEC LE LAYOUT BEN_Boat_configuration_for_production.rdl
 * 
 * Usage: npx tsx scripts/test-print-order-boat-config.ts
 */

// Charger les variables d'environnement depuis .env.local
import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

import { printCustomerOrder } from '../src/tools/boat-configuration/services/print-service'
import type { PrintRequest } from '../src/shared/types/print'

async function testPrintOrder() {
  console.log('🖨️  Test d\'impression Customer Order (Layout Boat Configuration)\n')
  
  const printRequest: PrintRequest = {
    orderNo: 'C1000001301',
    reportId: 'CUSTOMER_ORDER_CONF_REP',
    printerId: 'PRTBX040',
    languageCode: 'fr',
    copies: 1,
    layoutName: 'BEN_Boat_configuration_for_production.rdl',  // 🎨 Layout Boat Config
    downloadPdf: false,
  }
  
  console.log('📋 Paramètres d\'impression:')
  console.log('  - Order No:', printRequest.orderNo)
  console.log('  - Report ID:', printRequest.reportId)
  console.log('  - Layout:', printRequest.layoutName, '(Boat Configuration)')
  console.log('  - Printer:', printRequest.printerId)
  console.log('  - Language:', printRequest.languageCode)
  console.log('  - Copies:', printRequest.copies)
  console.log()
  
  try {
    console.log('🚀 Lancement de l\'impression...\n')
    
    const result = await printCustomerOrder(printRequest)
    
    console.log('\n✅ Impression lancée avec succès!')
    console.log('📊 Résultat:')
    console.log('  - Result Key:', result.resultKey)
    console.log('  - Report Title:', result.reportTitle)
    console.log('  - Layout Name:', result.layoutName)
    
    if (result.pdfInfo) {
      console.log('  - PDF ID:', result.pdfInfo.id)
      console.log('  - PDF Filename:', result.pdfInfo.fileName)
      console.log('  - PDF Size:', result.pdfInfo.size, 'bytes')
    }
    
  } catch (error) {
    console.error('\n❌ Erreur lors de l\'impression:')
    console.error(error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

// Exécuter le test
testPrintOrder()
