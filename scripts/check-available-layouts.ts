/**
 * Script pour vérifier les layouts disponibles dans IFS
 * 
 * Usage: npx tsx scripts/check-available-layouts.ts
 */

import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

import { getIFSClient } from '../src/shared/services/ifs-client'

async function checkLayouts() {
  console.log('🔍 Vérification des layouts disponibles dans IFS\n')
  
  const client = getIFSClient()
  const orderNo = 'C1000038587' // Order de test (celui qui fonctionne)
  const reportId = 'CUSTOMER_ORDER_CONF_REP'
  
  try {
    // ===== Étape 1 : GET Customer Order + ETag =====
    console.log('📝 Step 1: Récupération Customer Order...')
    const orderResponse: any = await client.get(
      `CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${orderNo}')`
    )
    const etag = orderResponse['@odata.etag']
    console.log(`✅ Order ${orderNo} trouvé\n`)
    
    // ===== Étape 2 : POST PrintResultKey =====
    console.log('🔑 Step 2: Génération ResultKey...')
    const resultKeyResponse: any = await client.post(
      `CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${orderNo}')/IfsApp.CustomerOrderHandling.CustomerOrder_PrintResultKey`,
      { ReportId: reportId },
      { 'If-Match': etag }
    )
    const resultKey = parseInt(resultKeyResponse.value, 10)
    console.log(`✅ ResultKey: ${resultKey}\n`)
    
    // ===== Étape 3 : POST PrintDialogInit =====
    console.log('🎨 Step 3: PrintDialogInit...')
    const dialogResponse: any = await client.post(
      'PrintDialog.svc/PrintDialogInit',
      { ResultKey: resultKey }
    )
    
    console.log('📊 Layout par défaut IFS:')
    console.log(`   LayoutName: ${dialogResponse.LayoutName}`)
    console.log(`   ReportId: ${dialogResponse.ReportId}`)
    console.log(`   ReportTitle: ${dialogResponse.ReportTitle}\n`)
    
    // ===== Étape 4 : Chercher les layouts disponibles =====
    console.log('🔍 Step 4: Recherche des layouts disponibles...\n')
    
    try {
      // Essayer ReportLayoutDefinitionSet
      const layoutsResponse: any = await client.get(
        'PrintDialog.svc/ReportLayoutDefinitionSet',
        {
          '$filter': `ReportId eq '${reportId}'`,
          '$select': 'ReportId,LayoutName,Description'
        }
      )
      
      if (layoutsResponse.value && layoutsResponse.value.length > 0) {
        console.log(`✅ ${layoutsResponse.value.length} layout(s) trouvé(s):\n`)
        layoutsResponse.value.forEach((layout: any, index: number) => {
          console.log(`${index + 1}. ${layout.LayoutName}`)
          if (layout.Description) {
            console.log(`   Description: ${layout.Description}`)
          }
        })
      } else {
        console.log('⚠️  Aucun layout trouvé pour ce report')
      }
    } catch (error) {
      console.log('❌ Impossible de récupérer la liste des layouts')
      console.log(`   Error: ${error instanceof Error ? error.message : 'Unknown'}`)
    }
    
    console.log('\n')
    console.log('═══════════════════════════════════════════════════════')
    console.log('🧪 TEST: Impression avec layout par défaut IFS')
    console.log('═══════════════════════════════════════════════════════\n')
    
    // ===== TEST 1 : Layout par défaut =====
    console.log(`📋 Layout testé: ${dialogResponse.LayoutName}`)
    
    await client.post(
      'PrintDialog.svc/ReportPrintRequest',
      {
        ResultKey: resultKey,
        LayoutName: dialogResponse.LayoutName,
        LanguageCode: 'fr',
        LogicalPrinter: 'PDF_PRINTER',
        Copies: 1,
      }
    )
    
    console.log('✅ ReportPrintRequest envoyé')
    console.log('⏳ Attente du PDF (15 secondes)...\n')
    
    // Attendre le PDF
    let pdfFound = false
    for (let i = 0; i < 15; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      try {
        const archiveResponse: any = await client.get(
          'PrintDialog.svc/PdfArchiveSet',
          { '$filter': `ResultKey eq ${resultKey}` }
        )
        
        if (archiveResponse.value && archiveResponse.value.length > 0) {
          const pdf = archiveResponse.value[0]
          console.log(`✅ PDF généré après ${i + 1} secondes:`)
          console.log(`   FileName: ${pdf.FileName}`)
          console.log(`   Size: ${(pdf.PdfSize / 1024).toFixed(2)} KB`)
          console.log(`   LayoutName: ${pdf.LayoutName}`)
          pdfFound = true
          break
        }
      } catch (err) {
        // Continuer
      }
    }
    
    if (!pdfFound) {
      console.log('❌ PDF non trouvé après 15 secondes')
    }
    
    console.log('\n')
    console.log('═══════════════════════════════════════════════════════')
    console.log('🧪 TEST: Impression avec layout custom')
    console.log('═══════════════════════════════════════════════════════\n')
    
    // ===== TEST 2 : Layout custom =====
    const customLayout = 'BEN_Boat_configuration_for_production.rdl'
    console.log(`📋 Layout testé: ${customLayout}`)
    
    // Générer nouveau ResultKey pour test 2
    const resultKeyResponse2: any = await client.post(
      `CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${orderNo}')/IfsApp.CustomerOrderHandling.CustomerOrder_PrintResultKey`,
      { ReportId: reportId },
      { 'If-Match': etag }
    )
    const resultKey2 = parseInt(resultKeyResponse2.value, 10)
    
    await client.post(
      'PrintDialog.svc/PrintDialogInit',
      { ResultKey: resultKey2 }
    )
    
    try {
      await client.post(
        'PrintDialog.svc/ReportPrintRequest',
        {
          ResultKey: resultKey2,
          LayoutName: customLayout,
          LanguageCode: 'fr',
          LogicalPrinter: 'PDF_PRINTER',
          Copies: 1,
        }
      )
      
      console.log('✅ ReportPrintRequest envoyé')
      console.log('⏳ Attente du PDF (15 secondes)...\n')
      
      // Attendre le PDF
      let pdfFound2 = false
      for (let i = 0; i < 15; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        try {
          const archiveResponse: any = await client.get(
            'PrintDialog.svc/PdfArchiveSet',
            { '$filter': `ResultKey eq ${resultKey2}` }
          )
          
          if (archiveResponse.value && archiveResponse.value.length > 0) {
            const pdf = archiveResponse.value[0]
            console.log(`✅ PDF généré après ${i + 1} secondes:`)
            console.log(`   FileName: ${pdf.FileName}`)
            console.log(`   Size: ${(pdf.PdfSize / 1024).toFixed(2)} KB`)
            console.log(`   LayoutName: ${pdf.LayoutName}`)
            pdfFound2 = true
            break
          }
        } catch (err) {
          // Continuer
        }
      }
      
      if (!pdfFound2) {
        console.log('❌ PDF non trouvé après 15 secondes')
        console.log('   → Le layout custom ne fonctionne probablement pas dans IFS')
      }
      
    } catch (error) {
      console.log('❌ Erreur lors de l\'envoi du ReportPrintRequest')
      console.log(`   Error: ${error instanceof Error ? error.message : 'Unknown'}`)
    }
    
    console.log('\n')
    console.log('═══════════════════════════════════════════════════════')
    console.log('📝 RÉSUMÉ')
    console.log('═══════════════════════════════════════════════════════\n')
    console.log('Si le layout custom ne génère pas de PDF, c\'est que:')
    console.log('  1. Le layout n\'existe pas dans IFS AST')
    console.log('  2. Le layout existe mais est vide/mal configuré')
    console.log('  3. Le layout n\'est pas lié au report CUSTOMER_ORDER_CONF_REP\n')
    console.log('Solution: Utiliser le layout par défaut IFS qui fonctionne')
    console.log(`         → ${dialogResponse.LayoutName}\n`)
    
  } catch (error) {
    console.error('\n❌ Erreur:', error)
    if (error instanceof Error && error.stack) {
      console.error('Stack:', error.stack)
    }
    process.exit(1)
  }
}

checkLayouts()
