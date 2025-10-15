/**
 * API Route - POST /api/part-printer/barcode/generate
 * 
 * Phase 4.1 - Génération code-barres
 * 
 * Génère un code-barres CODE128 pour une étiquette Part Printer
 */

import { NextRequest, NextResponse } from 'next/server'
import { generateBarcode, validateBarcodeText } from '@/tools/part-printer/services/barcode-service'

/**
 * Request body type
 */
interface GenerateBarcodeRequest {
  /** Texte à encoder (ex: "1000014690_Rev_02") */
  text: string
  
  /** Options de personnalisation (optionnel) */
  options?: {
    width?: number
    height?: number
    includetext?: boolean
    textsize?: number
  }
}

/**
 * POST /api/part-printer/barcode/generate
 * 
 * Body:
 * {
 *   text: "1000014690_Rev_02",
 *   options?: {
 *     width: 300,
 *     height: 100,
 *     includetext: true,
 *     textsize: 12
 *   }
 * }
 * 
 * Response:
 * {
 *   success: true,
 *   data: {
 *     dataUrl: "data:image/png;base64,...",
 *     mimeType: "image/png",
 *     text: "1000014690_Rev_02",
 *     size: 12345
 *   }
 * }
 */
export async function POST(request: NextRequest) {
  console.log('📥 [API] POST /api/part-printer/barcode/generate')

  try {
    // 1. Parser le body
    const body = await request.json() as GenerateBarcodeRequest

    // 2. Validation
    if (!body.text || typeof body.text !== 'string') {
      console.log('❌ [API] text manquant ou invalide')
      return NextResponse.json(
        {
          success: false,
          error: 'Missing or invalid text parameter'
        },
        { status: 400 }
      )
    }

    // Validation du contenu du texte
    if (!validateBarcodeText(body.text)) {
      console.log('❌ [API] Texte contient des caractères invalides')
      return NextResponse.json(
        {
          success: false,
          error: 'Text contains invalid characters (only ASCII 0-127 allowed)'
        },
        { status: 400 }
      )
    }

    console.log(`🔍 [API] Génération code-barres: "${body.text}"`)

    // 3. Générer le code-barres
    const barcode = await generateBarcode(body.text, body.options)

    console.log(`✅ [API] Code-barres généré (${barcode.buffer.length} bytes)`)

    // 4. Construire la réponse (sans le buffer pour réduire la taille)
    return NextResponse.json({
      success: true,
      data: {
        dataUrl: barcode.dataUrl,
        mimeType: barcode.mimeType,
        text: barcode.text,
        size: barcode.buffer.length,
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
