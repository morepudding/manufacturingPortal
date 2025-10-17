/**
 * API Route: POST /api/boat-configuration/print
 * 
 * Endpoint pour imprimer un document Customer Order - Boat Configuration
 * 
 * Body:
 * - orderNo: string (requis)
 * - reportId: string (par défaut: PROFORMA_INVOICE_REP) ✅ PRODUCTION
 * - printerId: string (par défaut: PDF_PRINTER)
 * - languageCode: string (par défaut: fr)
 * - layoutName: string (par défaut: BEN_Boat_configuration_for_production.rdl) ✅ PRODUCTION
 * - copies: number (par défaut: 1)
 * - downloadPdf: boolean (par défaut: false)
 * 
 * Response:
 * - Si downloadPdf=false: JSON avec resultKey, reportTitle, layoutName
 * - Si downloadPdf=true: Fichier PDF en téléchargement direct
 * 
 * 🔥 CONFIGURATION PRODUCTION:
 * - Report ID: PROFORMA_INVOICE_REP (validé dans IFS AST)
 * - Layout: BEN_Boat_configuration_for_production.rdl (validé dans IFS AST)
 */

import { NextRequest, NextResponse } from 'next/server'
import { printCustomerOrder } from '@/tools/boat-configuration/services/print-service'
import type { PrintRequest } from '@/shared/types/print'

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
    
    // 🔥 CONFIGURATION PRODUCTION - Valeurs par défaut
    const DEFAULT_REPORT_ID = 'PROFORMA_INVOICE_REP'
    const DEFAULT_LAYOUT_NAME = 'BEN_Boat_configuration_for_production.rdl'
    
    // Construire la requête d'impression avec valeurs par défaut
    const printRequest: PrintRequest = {
      orderNo: body.orderNo.trim(),
      reportId: body.reportId || DEFAULT_REPORT_ID,
      printerId: body.printerId || 'PDF_PRINTER',
      languageCode: body.languageCode || 'fr',
      layoutName: body.layoutName || DEFAULT_LAYOUT_NAME,
      copies: body.copies || 1,
      downloadPdf: body.downloadPdf || false,
    }
    
    console.log('\n🔍 VERIFICATION CONFIGURATION IMPRESSION API:')
    console.log(`   ✅ Report ID: ${printRequest.reportId} ${printRequest.reportId === DEFAULT_REPORT_ID ? '(DEFAULT ✓)' : '(CUSTOM)'}`)
    console.log(`   ✅ Layout Name: ${printRequest.layoutName} ${printRequest.layoutName === DEFAULT_LAYOUT_NAME ? '(DEFAULT ✓)' : '(CUSTOM)'}`)
    console.log(`   📋 Order No: ${printRequest.orderNo}`)
    console.log(`   🖨️ Printer: ${printRequest.printerId}`)
    console.log(`   🌍 Language: ${printRequest.languageCode}`)
    console.log(`   📥 Download PDF: ${printRequest.downloadPdf}`)
    
    // 🔒 Sécurité : Vérifier que le printerId reçu est bien celui du body (pas de substitution)
    if (body.printerId && body.printerId !== printRequest.printerId) {
      console.warn(`⚠️  ATTENTION: PrinterId modifié! Body: ${body.printerId} → Request: ${printRequest.printerId}`)
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
