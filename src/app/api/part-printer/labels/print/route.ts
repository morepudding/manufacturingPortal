/**
 * API Route - POST /api/part-printer/labels/print
 * 
 * Phase 4.3 - Impression étiquettes
 * 
 * Imprime un PDF d'étiquettes Part Printer.
 * MODE DEV : Télécharge le PDF (pas d'impression réelle)
 * MODE PROD : Envoie à l'imprimante IFS réelle
 */

import { NextRequest, NextResponse } from 'next/server'
import { printLabels } from '@/tools/part-printer/services/label-print-service'

/**
 * Request body type
 */
interface PrintLabelsRequest {
  /** PDF en base64 */
  pdfBase64: string
  
  /** ID de l'imprimante IFS */
  printerId: string
  
  /** Site */
  site: string
  
  /** Nombre de copies (optionnel, par défaut: 1) */
  copies?: number
  
  /** Mode forcé (optionnel, auto-détecté) */
  mode?: 'dev' | 'prod'
}

/**
 * POST /api/part-printer/labels/print
 * 
 * Body:
 * {
 *   pdfBase64: "JVBERi0xLjMKJcTl8uXrp...",
 *   printerId: "PRTBX101",
 *   site: "BDR",
 *   copies: 1,
 *   mode: "dev" // optionnel
 * }
 * 
 * Response (MODE DEV):
 * {
 *   success: true,
 *   data: {
 *     mode: "dev",
 *     message: "PDF prêt pour téléchargement...",
 *     printerId: "PRTBX101",
 *     copies: 1,
 *     pdfSize: 45678,
 *     downloadUrl: "data:application/pdf;base64,..."
 *   }
 * }
 * 
 * Response (MODE PROD - future):
 * {
 *   success: true,
 *   data: {
 *     mode: "prod",
 *     message: "PDF envoyé à l'imprimante PRTBX101 avec succès",
 *     printerId: "PRTBX101",
 *     copies: 1,
 *     pdfSize: 45678,
 *     resultKey: 12345
 *   }
 * }
 */
export async function POST(request: NextRequest) {
  console.log('📥 [API] POST /api/part-printer/labels/print')

  try {
    // 1. Parser le body
    const body = await request.json() as PrintLabelsRequest

    // 2. Validation
    if (!body.pdfBase64 || typeof body.pdfBase64 !== 'string') {
      console.log('❌ [API] pdfBase64 manquant ou invalide')
      return NextResponse.json(
        {
          success: false,
          error: 'Missing or invalid pdfBase64'
        },
        { status: 400 }
      )
    }

    if (!body.printerId || typeof body.printerId !== 'string') {
      console.log('❌ [API] printerId manquant ou invalide')
      return NextResponse.json(
        {
          success: false,
          error: 'Missing or invalid printerId'
        },
        { status: 400 }
      )
    }

    if (!body.site || typeof body.site !== 'string') {
      console.log('❌ [API] site manquant ou invalide')
      return NextResponse.json(
        {
          success: false,
          error: 'Missing or invalid site'
        },
        { status: 400 }
      )
    }

    console.log(`🔍 [API] Impression PDF pour imprimante: ${body.printerId}`)

    // 3. Décoder le PDF base64 en Buffer
    let pdfBuffer: Buffer
    try {
      pdfBuffer = Buffer.from(body.pdfBase64, 'base64')
    } catch (error) {
      console.log('❌ [API] Erreur décodage PDF base64:', error)
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid base64 PDF data'
        },
        { status: 400 }
      )
    }

    console.log(`   PDF décodé: ${(pdfBuffer.length / 1024).toFixed(2)} KB`)

    // 4. Imprimer le PDF (ou télécharger en mode DEV)
    const result = await printLabels(pdfBuffer, {
      printerId: body.printerId,
      site: body.site,
      copies: body.copies || 1,
      mode: body.mode,
    })

    console.log(`✅ [API] Impression réussie (mode: ${result.mode})`)

    // 5. Construire la réponse
    return NextResponse.json({
      success: true,
      data: {
        mode: result.mode,
        message: result.message,
        printerId: result.printerId,
        copies: result.copies,
        pdfSize: result.pdfSize,
        ...(result.downloadUrl && { downloadUrl: result.downloadUrl }),
        ...(result.resultKey && { resultKey: result.resultKey }),
      }
    })
  } catch (error) {
    console.error('❌ [API] Error:', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
