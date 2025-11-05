/**
 * API Route - POST /api/part-printer/labels/consolidate
 * 
 * Phase 3.4 - Consolidation des données
 * 
 * Génère les données complètes d'étiquettes (PartLabel[]) en consolidant :
 * 1. Shop Orders (base)
 * 2. Operation 10 (Block ID + Raw Material)
 * 3. Master Part (GENERIC CODE, LENGTH SETUP, VARNISH CODE)
 * 4. Range (Range ID)
 * 5. Barcode (généré à partir du Generic Code + Revision)
 */

import { NextRequest, NextResponse } from 'next/server'
import { generatePartLabels, prepareLabelsForPrinting } from '@/tools/part-printer/services/part-label-service'
import type { IFSShopOrderExtended } from '@/tools/part-printer/types'

/**
 * Request body type
 */
interface ConsolidateLabelsRequest {
  shopOrders: IFSShopOrderExtended[]
  site: string
  prepareForPrinting?: boolean // Si true, groupe et trie les étiquettes
}

/**
 * POST /api/part-printer/labels/consolidate
 * 
 * Body:
 * {
 *   shopOrders: IFSShopOrderExtended[],
 *   site: string,
 *   prepareForPrinting?: boolean
 * }
 * 
 * Response:
 * {
 *   success: true,
 *   data: {
 *     labels: PartLabel[],
 *     count: number,
 *     grouped?: Map<string, PartLabel[]> // Si prepareForPrinting=true
 *   }
 * }
 */
export async function POST(request: NextRequest) {
  console.log('📥 [API] POST /api/part-printer/labels/consolidate')

  try {
    // 1. Parser le body
    const body = await request.json() as ConsolidateLabelsRequest

    // 2. Validation
    if (!body.shopOrders || !Array.isArray(body.shopOrders)) {
      console.log('❌ [API] shopOrders manquant ou invalide')
      return NextResponse.json(
        {
          success: false,
          error: 'Missing or invalid shopOrders array'
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

    console.log(`🔍 [API] Consolidation de ${body.shopOrders.length} Shop Orders pour site ${body.site}`)

    // 3. Générer les étiquettes
    const labels = await generatePartLabels(body.shopOrders, body.site)

    console.log(`✅ [API] ${labels.length} étiquettes générées`)

    // 4. Préparer pour impression si demandé
    let grouped: Map<string, any[]> | undefined

    if (body.prepareForPrinting) {
      grouped = prepareLabelsForPrinting(labels)
      console.log(`✅ [API] ${grouped.size} groupes créés pour impression`)
    }

    // 5. Construire la réponse
    const responseData: any = {
      labels,
      count: labels.length
    }

    if (grouped) {
      // Convertir Map en objet pour JSON
      responseData.grouped = Object.fromEntries(grouped)
      responseData.groupCount = grouped.size
    }

    return NextResponse.json({
      success: true,
      data: responseData
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
