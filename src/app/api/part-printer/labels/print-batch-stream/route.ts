/**
 * API Route - POST /api/part-printer/labels/print-batch-stream
 * 
 * Phase 4.4 - Impression étiquettes avec streaming de progression (SSE)
 * 
 * Retourne la progression en temps réel via Server-Sent Events.
 */

import { NextRequest } from 'next/server'
import { azurePrintService, ShopOrderToPrint } from '@/shared/services/azure-print-service'
import { createBatches } from '@/shared/utils/batch'
import type { PrintBatchProgress, PrintBatchResult } from '@/shared/types/print-progress'

/**
 * Request body type
 */
interface PrintLabelsBatchStreamRequest {
  /** Liste des Shop Orders à imprimer */
  shopOrders: Array<{
    orderNo: string
    releaseNo?: string
    sequenceNo?: string
  }>
  
  /** Imprimante IFS */
  printer: string
  
  /** Layout IFS optionnel */
  printModel?: string
  
  /** Nombre d'appels parallèles (default: 10) */
  parallelism?: number
}

/**
 * POST /api/part-printer/labels/print-batch-stream
 * 
 * Impression avec streaming de progression via Server-Sent Events
 * 
 * Response: text/event-stream
 * Events:
 * - progress: { currentBatch, totalBatches, progressPercent, message, ... }
 * - complete: { totalOrders, successCount, failureCount, totalTime, ... }
 * - error: { error: string }
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    // 1. Parser le body
    const body = await request.json() as PrintLabelsBatchStreamRequest

    // 2. Validation
    if (!body.shopOrders?.length || !body.printer) {
      return new Response(
        JSON.stringify({ error: 'Missing shopOrders or printer' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const batchSize = 1
    const parallelism = body.parallelism || 10
    const totalOrders = body.shopOrders.length
    const batches = createBatches(body.shopOrders, batchSize)
    const totalBatches = batches.length

    // 3. Créer le stream
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        
        // Helper pour envoyer un event SSE
        const sendEvent = (event: string, data: any) => {
          const message = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
          controller.enqueue(encoder.encode(message))
        }

        try {
          // Event initial
          sendEvent('progress', {
            currentBatch: 0,
            totalBatches,
            printedOrders: 0,
            totalOrders,
            progressPercent: 0,
            status: 'starting',
            message: `Démarrage de l'impression de ${totalOrders} Shop Orders...`,
            elapsedTime: 0
          } as PrintBatchProgress)

          let successCount = 0
          let failureCount = 0
          const errors: Array<{ orderNo: string; error: string }> = []

          // Fonction pour traiter un lot
          const processBatch = async (batch: typeof body.shopOrders, batchNumber: number) => {
            try {
              const shopOrdersToPrint: ShopOrderToPrint[] = batch.map(order => ({
                orderNo: order.orderNo,
                releaseNo: order.releaseNo,
                sequenceNo: order.sequenceNo
              }))

              await azurePrintService.printLabels(
                shopOrdersToPrint,
                {
                  printer: body.printer,
                  printModel: body.printModel,
                  retryAttempts: 3,
                  retryDelayMs: 1000
                }
              )

              return { success: true, batchNumber, orders: batch }
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : 'Unknown error'
              return { success: false, batchNumber, orders: batch, error: errorMessage }
            }
          }

          // 4. Traiter par groupes en parallèle
          for (let i = 0; i < batches.length; i += parallelism) {
            const parallelBatches = batches.slice(i, i + parallelism)
            const batchNumbers = Array.from({ length: parallelBatches.length }, (_, idx) => i + idx + 1)

            // Lancer les lots en parallèle
            const results = await Promise.all(
              parallelBatches.map((batch, idx) => processBatch(batch, batchNumbers[idx]))
            )

            // Traiter les résultats
            results.forEach(result => {
              if (result.success) {
                successCount += result.orders.length
              } else {
                failureCount += result.orders.length
                result.orders.forEach(order => {
                  errors.push({
                    orderNo: order.orderNo,
                    error: result.error || 'Unknown error'
                  })
                })
              }

              // Envoyer progression
              const currentBatch = result.batchNumber
              const printedOrders = successCount + failureCount
              const progressPercent = Math.round((currentBatch / totalBatches) * 100)
              const elapsedTime = (Date.now() - startTime) / 1000

              sendEvent('progress', {
                currentBatch,
                totalBatches,
                printedOrders,
                totalOrders,
                progressPercent,
                status: 'processing',
                message: `Impression en cours... ${currentBatch}/${totalBatches} lots traités`,
                elapsedTime
              } as PrintBatchProgress)
            })
          }

          // 5. Event de complétion
          const totalTime = (Date.now() - startTime) / 1000

          sendEvent('complete', {
            totalOrders,
            successCount,
            failureCount,
            totalTime,
            errors: errors.length > 0 ? errors : undefined
          } as PrintBatchResult)

          controller.close()

        } catch (error) {
          sendEvent('error', {
            error: error instanceof Error ? error.message : 'Unknown error'
          })
          controller.close()
        }
      }
    })

    // 6. Retourner le stream
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
