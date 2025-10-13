/**
 * API Route: POST /api/print
 * 
 * Endpoint pour imprimer un document Customer Order
 * 
 * Body:
 * - orderNo: string (requis)
 * - reportId: string (par défaut: CUSTOMER_ORDER_CONF_REP)
 * - printerId: string (par défaut: PDF_PRINTER)
 * - languageCode: string (par défaut: fr)
 * - copies: number (par défaut: 1)
 * - downloadPdf: boolean (par défaut: false)
 * 
 * Response:
 * - Si downloadPdf=false: JSON avec resultKey, reportTitle, layoutName
 * - Si downloadPdf=true: Fichier PDF en téléchargement direct
 */

import { NextRequest, NextResponse } from 'next/server'
import { printCustomerOrder } from '@/tools/boat-configuration/services/print-service'
import type { PrintRequest } from '@/core/types/print'

export async function POST(request: NextRequest) {
  try {
    // Parser le body
    const body = await request.json()
    
    // Validation: orderNo requis
    if (!body.orderNo || typeof body.orderNo !== 'string') {
      return NextResponse.json(
        { 
          success: false,
          error: 'Order No is required and must be a string' 
        },
        { status: 400 }
      )
    }
    
    // Construire la requête d'impression avec valeurs par défaut
    const printRequest: PrintRequest = {
      orderNo: body.orderNo.trim(),
      reportId: body.reportId || 'CUSTOMER_ORDER_CONF_REP',
      printerId: body.printerId || 'PDF_PRINTER',
      languageCode: body.languageCode || 'fr',
      copies: body.copies || 1,
      downloadPdf: body.downloadPdf || false,
    }
    
    // Validation additionnelle
    const copies = printRequest.copies ?? 1
    if (copies < 1 || copies > 10) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Copies must be between 1 and 10' 
        },
        { status: 400 }
      )
    }
    
    console.log('\n📨 API /print request:', {
      orderNo: printRequest.orderNo,
      reportId: printRequest.reportId,
      printerId: printRequest.printerId,
      languageCode: printRequest.languageCode,
      downloadPdf: printRequest.downloadPdf,
    })
    
    // Exécuter le workflow d'impression
    const result = await printCustomerOrder(printRequest)
    
    // Si téléchargement PDF demandé, retourner le fichier binaire
    if (printRequest.downloadPdf && result.pdfInfo) {
      console.log(`\n📤 Returning PDF file: ${result.pdfInfo.fileName}`)
      
      // Récupérer le PDF depuis IFS (le service a déjà validé sa disponibilité)
      const { getIFSClient } = await import('@/shared/services/ifs-client')
      const client = getIFSClient()
      
      const pdfBuffer = await client.getRaw(
        `PrintDialog.svc/PdfArchiveSet(ResultKey=${result.resultKey},Id='${result.pdfInfo.id}')/Pdf`,
        undefined,
        { 'Accept': 'application/octet-stream' }
      )
      
      // Retourner le PDF avec les bons headers
      return new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${result.pdfInfo.fileName}"`,
          'Content-Length': result.pdfInfo.size.toString(),
        },
      })
    }
    
    // Sinon, retourner le résultat en JSON
    console.log(`\n✅ Print request successful (ResultKey: ${result.resultKey})`)
    
    return NextResponse.json({
      success: true,
      resultKey: result.resultKey,
      reportTitle: result.reportTitle,
      layoutName: result.layoutName,
    })
    
  } catch (error) {
    console.error('\n❌ API /print error:', error)
    
    // Extraire le message d'erreur
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    return NextResponse.json(
      { 
        success: false,
        error: errorMessage 
      },
      { status: 500 }
    )
  }
}
