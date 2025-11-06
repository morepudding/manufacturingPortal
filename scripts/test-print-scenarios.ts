/**
 * Script de test exhaustif pour éliminer les hypothèses
 * 
 * Tests:
 * 1. Layout par défaut (BEN_Inventory-BAT.rdl) + IFS_PDF_ARCHIVE
 * 2. Layout custom (BEN_Boat_configuration_for_production.rdl) + IFS_PDF_ARCHIVE
 * 3. Layout par défaut (BEN_Inventory-BAT.rdl) + NO_PRINTOUT (pas de PDF attendu)
 * 4. Layout custom (BEN_Boat_configuration_for_production.rdl) + autre imprimante
 * 
 * Usage: npx tsx scripts/test-print-scenarios.ts
 */

import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

import { getIFSClient } from '../src/shared/services/ifs-client'

const ORDER_NO = 'C1000038587' // Order qui fonctionne
const REPORT_ID = 'CUSTOMER_ORDER_CONF_REP'

interface TestScenario {
  name: string
  layoutName: string
  printerName: string
  shouldGeneratePdf: boolean
}

const scenarios: TestScenario[] = [
  {
    name: 'TEST 1: Layout IFS par défaut + IFS_PDF_ARCHIVE',
    layoutName: 'BEN_Inventory-BAT.rdl',
    printerName: 'IFS_PDF_ARCHIVE',
    shouldGeneratePdf: true
  },
  {
    name: 'TEST 2: Layout PRODUCTION + IFS_PDF_ARCHIVE',
    layoutName: 'BEN_Boat_configuration_for_production.rdl',
    printerName: 'IFS_PDF_ARCHIVE',
    shouldGeneratePdf: true
  },
  {
    name: 'TEST 3: Layout par défaut + NO_PRINTOUT',
    layoutName: 'BEN_Inventory-BAT.rdl',
    printerName: 'NO_PRINTOUT',
    shouldGeneratePdf: false
  }
]

async function waitForPdf(client: any, resultKey: number, maxSeconds: number = 40): Promise<any> {
  console.log(`   ⏳ Attente du PDF (max ${maxSeconds}s)...`)
  
  for (let i = 0; i < maxSeconds; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    try {
      const archiveResponse: any = await client.get(
        'PrintDialog.svc/PdfArchiveSet',
        { '$filter': `ResultKey eq ${resultKey}` }
      )
      
      if (archiveResponse.value && archiveResponse.value.length > 0) {
        return archiveResponse.value[0]
      }
    } catch (err) {
      // Continue
    }
  }
  
  return null
}

async function runTest(scenario: TestScenario, index: number) {
  console.log('\n' + '═'.repeat(70))
  console.log(`${scenario.name}`)
  console.log('═'.repeat(70))
  console.log(`📋 Layout: ${scenario.layoutName}`)
  console.log(`🖨️  Printer: ${scenario.printerName}`)
  console.log(`📄 PDF attendu: ${scenario.shouldGeneratePdf ? 'OUI' : 'NON'}`)
  console.log('')
  
  const client = getIFSClient()
  
  try {
    // Étape 1: GET Customer Order + ETag
    console.log('1️⃣ Récupération Customer Order...')
    const orderResponse: any = await client.get(
      `CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${ORDER_NO}')`
    )
    const etag = orderResponse['@odata.etag']
    console.log('   ✅ ETag récupéré')
    
    // Étape 2: POST PrintResultKey
    console.log('2️⃣ Génération PrintResultKey...')
    const resultKeyResponse: any = await client.post(
      `CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${ORDER_NO}')/IfsApp.CustomerOrderHandling.CustomerOrder_PrintResultKey`,
      { ReportId: REPORT_ID },
      { 'If-Match': etag }
    )
    const resultKey = parseInt(resultKeyResponse.value, 10)
    console.log(`   ✅ ResultKey: ${resultKey}`)
    
    // Étape 3: POST PrintDialogInit
    console.log('3️⃣ PrintDialogInit...')
    const dialogResponse: any = await client.post(
      'PrintDialog.svc/PrintDialogInit',
      { ResultKey: resultKey }
    )
    console.log(`   ✅ Dialog initialisé`)
    console.log(`   📋 Layout par défaut IFS: ${dialogResponse.LayoutName}`)
    
    // Étape 4: POST ReportPrintRequest
    console.log('4️⃣ ReportPrintRequest...')
    console.log(`   📤 Layout envoyé: ${scenario.layoutName}`)
    console.log(`   📤 Printer envoyé: ${scenario.printerName}`)
    
    const payload = {
      ResultKey: resultKey,
      LayoutName: scenario.layoutName,
      LanguageCode: 'fr',
      LogicalPrinter: scenario.printerName,
      Copies: 1
    }
    
    console.log(`   📤 Payload:`, JSON.stringify(payload, null, 2))
    
    await client.post(
      'PrintDialog.svc/ReportPrintRequest',
      payload
    )
    console.log(`   ✅ ReportPrintRequest accepté par IFS`)
    
    // Étape 5: Attendre le PDF (si attendu)
    if (scenario.shouldGeneratePdf) {
      console.log('5️⃣ Recherche du PDF...')
      const pdf = await waitForPdf(client, resultKey, 40)
      
      if (pdf) {
        console.log(`   ✅ PDF TROUVÉ !`)
        console.log(`      FileName: ${pdf.FileName}`)
        console.log(`      Layout: ${pdf.LayoutName}`)
        console.log(`      Size: ${(pdf.PdfSize / 1024).toFixed(2)} KB`)
        console.log(`      Created: ${pdf.Created}`)
        
        return {
          scenario: scenario.name,
          success: true,
          resultKey,
          pdfFound: true,
          fileName: pdf.FileName,
          layoutUsed: pdf.LayoutName,
          sizeKB: (pdf.PdfSize / 1024).toFixed(2)
        }
      } else {
        console.log(`   ❌ PDF NON TROUVÉ après 40 secondes`)
        console.log(`   🔍 Vérification manuelle: npx tsx scripts/find-resultkey.ts ${resultKey}`)
        
        return {
          scenario: scenario.name,
          success: false,
          resultKey,
          pdfFound: false,
          error: 'PDF not generated'
        }
      }
    } else {
      console.log('5️⃣ Pas de PDF attendu (imprimante NO_PRINTOUT)')
      
      return {
        scenario: scenario.name,
        success: true,
        resultKey,
        pdfFound: false,
        note: 'No PDF expected (NO_PRINTOUT)'
      }
    }
    
  } catch (error) {
    console.log(`   ❌ ERREUR: ${error instanceof Error ? error.message : 'Unknown'}`)
    
    return {
      scenario: scenario.name,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

async function main() {
  console.log('🧪 TEST EXHAUSTIF - Élimination des hypothèses')
  console.log('═'.repeat(70))
  console.log(`📝 Order: ${ORDER_NO}`)
  console.log(`📝 Report: ${REPORT_ID}`)
  console.log(`📝 Nombre de tests: ${scenarios.length}`)
  console.log('')
  
  const results = []
  
  for (let i = 0; i < scenarios.length; i++) {
    const result = await runTest(scenarios[i], i)
    results.push(result)
    
    // Pause entre les tests
    if (i < scenarios.length - 1) {
      console.log('\n⏸️  Pause de 3 secondes avant le prochain test...')
      await new Promise(resolve => setTimeout(resolve, 3000))
    }
  }
  
  // Résumé final
  console.log('\n\n')
  console.log('═'.repeat(70))
  console.log('📊 RÉSUMÉ DES TESTS')
  console.log('═'.repeat(70))
  console.log('')
  
  results.forEach((result, index) => {
    const status = result.success && (result.pdfFound || result.note) ? '✅' : '❌'
    console.log(`${status} ${result.scenario}`)
    console.log(`   ResultKey: ${result.resultKey}`)
    
    if (result.pdfFound) {
      console.log(`   PDF: ${result.fileName}`)
      console.log(`   Layout: ${result.layoutUsed}`)
      console.log(`   Size: ${result.sizeKB} KB`)
    } else if (result.note) {
      console.log(`   Note: ${result.note}`)
    } else if (result.error) {
      console.log(`   Error: ${result.error}`)
    }
    
    console.log('')
  })
  
  // Conclusion
  console.log('═'.repeat(70))
  console.log('🔍 ANALYSE')
  console.log('═'.repeat(70))
  console.log('')
  
  const test1 = results[0] // Layout défaut + IFS_PDF_ARCHIVE
  const test2 = results[1] // Layout custom + IFS_PDF_ARCHIVE
  
  if (test1.pdfFound && !test2.pdfFound) {
    console.log('❌ HYPOTHÈSE ÉLIMINÉE: L\'imprimante IFS_PDF_ARCHIVE fonctionne')
    console.log('❌ HYPOTHÈSE ÉLIMINÉE: Le problème n\'est PAS l\'imprimante')
    console.log('✅ CONCLUSION: Le layout BEN_Boat_configuration_for_production.rdl')
    console.log('   ne génère PAS de PDF avec IFS_PDF_ARCHIVE')
    console.log('')
    console.log('💡 SOLUTION: Le layout custom existe mais n\'est pas compatible')
    console.log('   avec l\'imprimante IFS_PDF_ARCHIVE ou nécessite une config spéciale')
  } else if (!test1.pdfFound && !test2.pdfFound) {
    console.log('❌ PROBLÈME: Aucun layout ne génère de PDF avec IFS_PDF_ARCHIVE')
    console.log('   L\'imprimante IFS_PDF_ARCHIVE ne fonctionne pas correctement')
    console.log('')
    console.log('💡 SOLUTION: Utiliser une autre imprimante ou vérifier la config IFS')
  } else if (test1.pdfFound && test2.pdfFound) {
    console.log('✅ SUCCÈS: Les deux layouts fonctionnent !')
    console.log('   Le problème était peut-être temporaire ou lié à autre chose')
  }
  
  console.log('')
}

main()
