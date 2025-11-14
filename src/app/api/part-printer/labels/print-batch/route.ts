/**
 * API Route - POST /api/part-printer/labels/print-batch
 * 
 * Phase 4.4 - Impression étiquettes avec batching automatique
 * 
 * Découpe automatiquement les Shop Orders en lots de 5 pour éviter les timeouts.
 * Retourne la progression en temps réel via Server-Sent Events (SSE).
 */

import { NextRequest, NextResponse } from 'next/server'
import { azurePrintService, ShopOrderToPrint } from '@/shared/services/azure-print-service'
import { ErrorService } from '@/tools/part-printer/services/error-service'
import { ErrorCode } from '@/tools/part-printer/types/error'
import { createBatches } from '@/shared/utils/batch'

/**
 * Request body type
 */
interface PrintLabelsBatchRequest {
  /** Liste des Shop Orders à imprimer */
  shopOrders: Array<{
    orderNo: string
    releaseNo?: string
    sequenceNo?: string
  }>
  
  /** Imprimante IFS (ex: "PRTBX109 - MAFOPR183") */
  printer: string
  
  /** Layout IFS optionnel (default: BEN_MA_FO_CR_184.rdl) */
  printModel?: string
  
  /** Taille des lots (default: 1) */
  batchSize?: number
  
  /** Nombre d'appels parallèles (default: 10) */
  parallelism?: number
}

/**
 * Response body type
 */
interface PrintLabelsBatchResponse {
  success: boolean
  data?: {
    message: string
    totalShopOrders: number
    totalBatches: number
    successfulBatches: number
    failedBatches: number
    printer: string
    durationMs: number
  }
  error?: string
}

/**
 * POST /api/part-printer/labels/print-batch
 * 
 * Impression avec parallélisme (10 appels simultanés par défaut, 1 SO par appel)
 * 
 * Body:
 * {
 *   shopOrders: [{ orderNo: "495642" }, ...],
 *   printer: "PRTBX109 - MAFOPR183",
 *   parallelism: 10
 * }
 * 
 * Response:
 * {
 *   success: true,
 *   data: {
 *     message: "119 Shop Orders printed successfully in 12 groups",
 *     totalShopOrders: 119,
 *     totalBatches: 12,
 *     successfulBatches: 12,
 *     failedBatches: 0,
 *     printer: "PRTBX109 - MAFOPR183",
 *     durationMs: 120000
 *   }
 * }
 */
export async function POST(request: NextRequest): Promise<NextResponse<PrintLabelsBatchResponse>> {
  console.log('📥 [API] POST /api/part-printer/labels/print-batch')

  const errorService = new ErrorService()
  const startTime = Date.now()

  try {
    // 1. Parser le body
    const body = await request.json() as PrintLabelsBatchRequest

    // 2. Validation des paramètres obligatoires
    if (!body.shopOrders || !Array.isArray(body.shopOrders) || body.shopOrders.length === 0) {
      console.log('❌ [API] shopOrders manquant ou invalide')
      return NextResponse.json(
        { success: false, error: 'Missing or invalid shopOrders array' },
        { status: 400 }
      )
    }

    if (!body.printer || typeof body.printer !== 'string') {
      console.log('❌ [API] printer manquant ou invalide')
      return NextResponse.json(
        { success: false, error: 'Missing or invalid printer parameter' },
        { status: 400 }
      )
    }

    const batchSize = 1 // 1 Shop Order par appel (optimal)
    const parallelism = body.parallelism || 10 // Traiter 10 appels en parallèle
    const totalShopOrders = body.shopOrders.length

    console.log(`🔍 [API] Impression de ${totalShopOrders} Shop Order(s) sur ${body.printer}`)
    console.log(`� [API] Parallélisme: ${parallelism} appels simultanés (1 SO par appel)`)

    // 3. Créer les lots
    const batches = createBatches(body.shopOrders, batchSize)
    const totalBatches = batches.length

    console.log(`📊 [API] ${totalBatches} lots à traiter`)

    // 4. Traiter les lots avec parallélisme
    let successfulBatches = 0
    let failedBatches = 0
    const errors: string[] = []

    // Fonction pour traiter un lot
    const processBatch = async (batch: typeof body.shopOrders, batchNumber: number) => {
      const progress = Math.round((batchNumber / totalBatches) * 100)
      console.log(`📦 [API] Lot ${batchNumber}/${totalBatches} (${progress}%) - ${batch.length} Shop Orders`)

      try {
        // Convertir en format ShopOrderToPrint
        const shopOrdersToPrint: ShopOrderToPrint[] = batch.map(order => ({
          orderNo: order.orderNo,
          releaseNo: order.releaseNo,
          sequenceNo: order.sequenceNo
        }))

        // Appeler le service Azure Print
        await azurePrintService.printLabels(
          shopOrdersToPrint,
          {
            printer: body.printer,
            printModel: body.printModel,
            retryAttempts: 3,
            retryDelayMs: 1000
          }
        )

        console.log(`✅ [API] Lot ${batchNumber}/${totalBatches} réussi`)
        return { success: true, batchNumber }

      } catch (printError) {
        const errorMessage = printError instanceof Error ? printError.message : 'Unknown error'
        console.error(`❌ [API] Lot ${batchNumber}/${totalBatches} échoué:`, errorMessage)
        return { success: false, batchNumber, error: errorMessage }
      }
    }

    // Traiter par groupes de N lots en parallèle
    for (let i = 0; i < batches.length; i += parallelism) {
      const parallelBatches = batches.slice(i, i + parallelism)
      const batchNumbers = Array.from({ length: parallelBatches.length }, (_, idx) => i + idx + 1)

      // Lancer les lots en parallèle
      const results = await Promise.all(
        parallelBatches.map((batch, idx) => processBatch(batch, batchNumbers[idx]))
      )

      // Compter les succès et échecs
      results.forEach(result => {
        if (result.success) {
          successfulBatches++
        } else {
          failedBatches++
          errors.push(`Batch ${result.batchNumber}: ${result.error}`)
        }
      })
    }

    const durationMs = Date.now() - startTime
    const durationSec = (durationMs / 1000).toFixed(1)

    // 5. Résumé final
    if (failedBatches === 0) {
      console.log(`✅ [API] Tous les groupes réussis en ${durationSec}s`)
      
      return NextResponse.json({
        success: true,
        data: {
          message: `${totalShopOrders} Shop Orders printed successfully in ${totalBatches} groups`,
          totalShopOrders,
          totalBatches,
          successfulBatches,
          failedBatches: 0,
          printer: body.printer,
          durationMs
        }
      })
    } else {
      console.log(`⚠️ [API] ${successfulBatches}/${totalBatches} groupes réussis en ${durationSec}s`)
      
      return NextResponse.json({
        success: false,
        data: {
          message: `${successfulBatches}/${totalBatches} groups succeeded. ${failedBatches} failed.`,
          totalShopOrders,
          totalBatches,
          successfulBatches,
          failedBatches,
          printer: body.printer,
          durationMs
        },
        error: errors.join('; ')
      }, { status: 207 }) // 207 Multi-Status
    }

  } catch (error) {
    // 6. Erreur générale
    console.error('❌ [API] Erreur générale:', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
