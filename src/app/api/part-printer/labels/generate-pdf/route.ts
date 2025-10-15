/**
 * API Route - POST /api/part-printer/labels/generate-pdf
 * 
 * Phase 4.2 - Génération PDF étiquettes
 * 
 * Génère un PDF A4 paysage avec les étiquettes Part Printer.
 * Format: 1 page par couple (Raw Material, Varnish Code), tri par Length Setup décroissant.
 */

import { NextRequest, NextResponse } from 'next/server'
import { generateLabelsPDF, validateLabelsForPDF } from '@/tools/part-printer/services/label-pdf-service-table'
import type { PartLabel } from '@/tools/part-printer/types'

/**
 * Request body type
 */
interface GeneratePDFRequest {
  /** Liste d'étiquettes à imprimer */
  labels: PartLabel[]
  
  /** Options de génération (optionnel) */
  options?: {
    orientation?: 'portrait' | 'landscape'
    size?: 'A4' | 'LETTER'
    includeMetadata?: boolean
  }
}

/**
 * POST /api/part-printer/labels/generate-pdf
 * 
 * Body:
 * {
 *   labels: PartLabel[],
 *   options?: {
 *     orientation: 'landscape',
 *     size: 'A4',
 *     includeMetadata: true
 *   }
 * }
 * 
 * Response:
 * {
 *   success: true,
 *   data: {
 *     pageCount: 3,
 *     labelCount: 25,
 *     groupCount: 3,
 *     size: 45678,
 *     pdfBase64: "JVBERi0xLjMKJcTl8uXrp..." // PDF en base64
 *   }
 * }
 */
export async function POST(request: NextRequest) {
  console.log('📥 [API] POST /api/part-printer/labels/generate-pdf')

  try {
    // 1. Parser le body
    const body = await request.json() as GeneratePDFRequest

    // 2. Validation
    if (!body.labels || !Array.isArray(body.labels)) {
      console.log('❌ [API] labels manquant ou invalide')
      return NextResponse.json(
        {
          success: false,
          error: 'Missing or invalid labels array'
        },
        { status: 400 }
      )
    }

    if (body.labels.length === 0) {
      console.log('❌ [API] labels vide')
      return NextResponse.json(
        {
          success: false,
          error: 'Labels array is empty'
        },
        { status: 400 }
      )
    }

    console.log(`🔍 [API] Génération PDF pour ${body.labels.length} étiquettes`)

    // 3. Valider les étiquettes
    try {
      validateLabelsForPDF(body.labels)
    } catch (validationError) {
      console.log('❌ [API] Validation étiquettes échouée:', validationError)
      return NextResponse.json(
        {
          success: false,
          error: validationError instanceof Error ? validationError.message : 'Invalid labels data'
        },
        { status: 400 }
      )
    }

    // 4. Générer le PDF
    const result = await generateLabelsPDF(body.labels, body.options)

    console.log(`✅ [API] PDF généré: ${result.pageCount} pages, ${(result.size / 1024).toFixed(2)} KB`)

    // 5. Convertir le buffer en base64 pour transmission JSON
    const pdfBase64 = result.buffer.toString('base64')

    // 6. Construire la réponse
    return NextResponse.json({
      success: true,
      data: {
        pageCount: result.pageCount,
        labelCount: result.labelCount,
        groupCount: result.groupCount,
        size: result.size,
        pdfBase64,
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
