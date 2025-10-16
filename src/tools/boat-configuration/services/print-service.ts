/**
 * Service d'impression IFS Cloud
 * 
 * Implémente le workflow complet d'impression:
 * 1. GET Customer Order + ETag
 * 2. POST PrintResultKey
 * 3. POST PrintDialogInit
 * 4. POST ReportPrintRequest
 * 5. (Optionnel) Download PDF
 * 
 * Basé sur le script validé: src/testscript/final-print-workflow.js
 */

import { getIFSClient } from '@/shared/services/ifs-client'
import type {
  PrintRequest,
  PrintResult,
  IFSCustomerOrderResponse,
  IFSPrintResultKeyResponse,
  IFSPrintDialogInitResponse,
  IFSPdfArchiveResponse,
  IFSPdfArchiveInfo,
} from '@/shared/types/print'

/**
 * Délai entre deux tentatives de vérification du PDF (ms)
 */
const PDF_POLLING_INTERVAL = 1000

/**
 * Nombre maximum de tentatives pour récupérer le PDF
 */
const PDF_MAX_ATTEMPTS = 15

/**
 * Fonction utilitaire pour attendre (sleep)
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Imprimer un document Customer Order
 * 
 * @param request - Paramètres de l'impression
 * @returns Résultat de l'impression avec PDF optionnel
 * @throws Error si l'impression échoue
 * 
 * @example
 * ```typescript
 * // Impression simple (envoi à l'imprimante)
 * const result = await printCustomerOrder({
 *   orderNo: 'C1000038587',
 *   reportId: 'CUSTOMER_ORDER_CONF_REP',
 *   printerId: 'PDF_PRINTER',
 *   languageCode: 'fr',
 *   copies: 1,
 *   downloadPdf: false
 * })
 * 
 * // Impression avec téléchargement PDF
 * const result = await printCustomerOrder({
 *   ...params,
 *   downloadPdf: true
 * })
 * // result.pdfInfo contient les infos du PDF
 * ```
 */
export async function printCustomerOrder(
  request: PrintRequest
): Promise<PrintResult> {
  const client = getIFSClient()
  
  const startTime = Date.now()
  console.log(`\n🖨️  Starting print workflow for Order ${request.orderNo}`)
  console.log(`📋 Report: ${request.reportId}`)
  console.log(`🖨️  Printer: ${request.printerId}`)
  console.log(`🌍 Language: ${request.languageCode}`)
  
  try {
    // ===== Étape 1 : GET Customer Order + ETag =====
    console.log('\n📝 Step 1: Getting Customer Order...')
    
    const orderResponse = await client.get<IFSCustomerOrderResponse>(
      `CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${request.orderNo}')`
    )
    
    const etag = orderResponse['@odata.etag']
    if (!etag) {
      throw new Error('No ETag received from Customer Order')
    }
    
    console.log(`✅ Step 1 complete: Order ${request.orderNo} retrieved`)
    console.log(`   ETag: ${etag}`)
    
    // ===== Étape 2 : POST PrintResultKey =====
    console.log('\n🔑 Step 2: Generating ResultKey...')
    
    const resultKeyResponse = await client.post<IFSPrintResultKeyResponse>(
      `CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${request.orderNo}')/IfsApp.CustomerOrderHandling.CustomerOrder_PrintResultKey`,
      { ReportId: request.reportId },
      { 'If-Match': etag }
    )
    
    const resultKey = parseInt(resultKeyResponse.value, 10)
    if (isNaN(resultKey)) {
      throw new Error(`Invalid ResultKey received: ${resultKeyResponse.value}`)
    }
    
    console.log(`✅ Step 2 complete: ResultKey ${resultKey} generated`)
    
    // ===== Étape 3 : POST PrintDialogInit =====
    console.log('\n🎨 Step 3: Initializing Print Dialog...')
    
    const dialogResponse = await client.post<IFSPrintDialogInitResponse>(
      'PrintDialog.svc/PrintDialogInit',
      { ResultKey: resultKey }
    )
    
    // Utiliser le layout personnalisé si fourni, sinon celui retourné par IFS
    const layoutName = request.layoutName || dialogResponse.LayoutName
    const reportTitle = dialogResponse.ReportTitle
    
    if (!layoutName) {
      throw new Error('No LayoutName received from PrintDialogInit')
    }
    
    if (request.layoutName) {
      console.log(`✅ Step 3 complete: Dialog initialized`)
      console.log(`   Layout (custom): ${layoutName}`)
      console.log(`   Layout (IFS default): ${dialogResponse.LayoutName}`)
      console.log(`   Title: ${reportTitle}`)
    } else {
      console.log(`✅ Step 3 complete: Dialog initialized`)
      console.log(`   Layout: ${layoutName}`)
      console.log(`   Title: ${reportTitle}`)
    }
    
    // ===== Étape 4 : POST ReportPrintRequest =====
    console.log('\n📤 Step 4: Sending print request...')
    
    await client.post(
      'PrintDialog.svc/ReportPrintRequest',
      {
        ResultKey: resultKey,
        LayoutName: layoutName,
        LanguageCode: request.languageCode,
        LogicalPrinter: request.printerId,
        Copies: request.copies || 1,
      }
    )
    
    console.log(`✅ Step 4 complete: Print request sent (204 No Content)`)
    
    // Préparer le résultat de base
    const result: PrintResult = {
      success: true,
      resultKey,
      reportTitle,
      layoutName,
    }
    
    // ===== Étape 5 (optionnelle) : Download PDF =====
    if (request.downloadPdf) {
      console.log('\n📥 Step 5: Downloading PDF...')
      console.log(`   Polling for PDF availability (max ${PDF_MAX_ATTEMPTS} attempts)...`)
      
      let pdfInfo: IFSPdfArchiveInfo | null = null
      
      // Polling: attendre que le PDF soit généré
      for (let attempt = 1; attempt <= PDF_MAX_ATTEMPTS; attempt++) {
        await sleep(PDF_POLLING_INTERVAL)
        
        const archiveResponse = await client.get<IFSPdfArchiveResponse>(
          'PrintDialog.svc/PdfArchiveSet',
          {
            '$filter': `ResultKey eq ${resultKey}`,
            '$top': '1'
          }
        )
        
        if (archiveResponse.value && archiveResponse.value.length > 0) {
          pdfInfo = archiveResponse.value[0]
          console.log(`   ✅ PDF found after ${attempt} attempt(s)`)
          console.log(`   File: ${pdfInfo.FileName}`)
          console.log(`   Size: ${(pdfInfo.PdfSize / 1024).toFixed(2)} KB`)
          break
        }
        
        if (attempt === PDF_MAX_ATTEMPTS) {
          throw new Error(`PDF not available after ${PDF_MAX_ATTEMPTS} attempts (${PDF_MAX_ATTEMPTS} seconds)`)
        }
      }
      
      if (!pdfInfo) {
        throw new Error('PDF info not found in archive')
      }
      
      // Télécharger le PDF
      console.log(`\n📄 Downloading PDF from archive...`)
      
      const pdfBuffer = await client.getRaw(
        `PrintDialog.svc/PdfArchiveSet(ResultKey=${pdfInfo.ResultKey},Id='${pdfInfo.Id}')/Pdf`,
        undefined,
        { 'Accept': 'application/octet-stream' }
      )
      
      // Vérifier que le PDF est valide (commence par %PDF)
      const header = new Uint8Array(pdfBuffer.slice(0, 4))
      const headerString = String.fromCharCode(...header)
      
      if (!headerString.startsWith('%PDF')) {
        throw new Error('Invalid PDF file (missing PDF header)')
      }
      
      console.log(`✅ Step 5 complete: PDF downloaded`)
      console.log(`   Size: ${(pdfBuffer.byteLength / 1024).toFixed(2)} KB`)
      console.log(`   Header: ${headerString}`)
      
      // Ajouter les infos du PDF au résultat
      result.pdfInfo = {
        fileName: pdfInfo.FileName,
        size: pdfBuffer.byteLength,
        created: pdfInfo.Created,
        id: pdfInfo.Id,
      }
      
      // Créer le Blob (côté serveur Next.js, on retournera le buffer directement)
      // Le Blob est créé côté client si nécessaire
      if (typeof window !== 'undefined') {
        result.pdfBlob = new Blob([pdfBuffer], { type: 'application/pdf' })
      }
    }
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2)
    console.log(`\n✅ Print workflow completed in ${duration}s`)
    
    return result
    
  } catch (error) {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2)
    console.error(`\n❌ Print workflow failed after ${duration}s:`, error)
    throw new Error(
      `Print workflow failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}
