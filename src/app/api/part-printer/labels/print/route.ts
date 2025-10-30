/**
 * API Route - POST /api/part-printer/labels/print
 * 
 * Phase 4.4 - Impression étiquettes via Azure Print API
 * 
 * Envoie un job d'impression à l'API Azure Print pour imprimer les étiquettes.
 * Utilise le service azure-print-service avec retry logic et OAuth2 token caching.
 */

import { NextRequest, NextResponse } from 'next/server'
import { azurePrintService, ShopOrderToPrint } from '@/shared/services/azure-print-service'
import { ErrorService } from '@/tools/part-printer/services/error-service'
import { ErrorCode } from '@/tools/part-printer/types/error'

/**
 * Request body type
 */
interface PrintLabelsRequest {
  /** Liste des Shop Orders à imprimer */
  shopOrders: Array<{
    orderNo: string
    releaseNo?: string
    sequenceNo?: string
  }>
  
  /** Imprimante IFS (ex: "PRTBX105_P") */
  printer: string
  
  /** Layout IFS optionnel (default: BEN_MA_FO_CR_184.rdl) */
  printModel?: string
  
  /** Options de retry optionnelles */
  retryOptions?: {
    attempts?: number
    delayMs?: number
  }
}

/**
 * Response body type
 */
interface PrintLabelsResponse {
  success: boolean
  data?: {
    message: string
    shopOrderCount: number
    printer: string
  }
  error?: string
}

/**
 * POST /api/part-printer/labels/print
 * 
 * Body:
 * {
 *   shopOrders: [
 *     { orderNo: "495642" },
 *     { orderNo: "495643", releaseNo: "1", sequenceNo: "10" }
 *   ],
 *   printer: "PRTBX105_P",
 *   printModel?: "BEN_MA_FO_CR_184.rdl",
 *   retryOptions?: {
 *     attempts: 3,
 *     delayMs: 1000
 *   }
 * }
 * 
 * Response:
 * {
 *   success: true,
 *   data: {
 *     message: "Success",
 *     shopOrderCount: 2,
 *     printer: "PRTBX105_P"
 *   }
 * }
 */
export async function POST(request: NextRequest): Promise<NextResponse<PrintLabelsResponse>> {
  console.log('📥 [API] POST /api/part-printer/labels/print')

  const errorService = new ErrorService()

  try {
    // 1. Parser le body
    const body = await request.json() as PrintLabelsRequest

    // 2. Validation des paramètres obligatoires
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

    if (body.shopOrders.length === 0) {
      console.log('❌ [API] shopOrders vide')
      return NextResponse.json(
        {
          success: false,
          error: 'shopOrders array is empty'
        },
        { status: 400 }
      )
    }

    if (!body.printer || typeof body.printer !== 'string') {
      console.log('❌ [API] printer manquant ou invalide')
      return NextResponse.json(
        {
          success: false,
          error: 'Missing or invalid printer parameter'
        },
        { status: 400 }
      )
    }

    // 3. Validation du format des Shop Orders
    for (const order of body.shopOrders) {
      if (!order.orderNo || typeof order.orderNo !== 'string') {
        console.log('❌ [API] orderNo manquant ou invalide:', order)
        return NextResponse.json(
          {
            success: false,
            error: 'Each shop order must have a valid orderNo'
          },
          { status: 400 }
        )
      }
    }

    console.log(`🔍 [API] Impression de ${body.shopOrders.length} Shop Order(s) sur ${body.printer}`)

    // 4. Préparer les données pour le service
    const shopOrdersToPrint: ShopOrderToPrint[] = body.shopOrders.map(order => ({
      orderNo: order.orderNo,
      releaseNo: order.releaseNo,
      sequenceNo: order.sequenceNo
    }))

    // 5. Appeler le service Azure Print
    try {
      const result = await azurePrintService.printLabels(
        shopOrdersToPrint,
        {
          printer: body.printer,
          printModel: body.printModel,
          retryAttempts: body.retryOptions?.attempts,
          retryDelayMs: body.retryOptions?.delayMs
        }
      )

      console.log(`✅ [API] Impression réussie: ${result.Message}`)

      // 6. Retourner le succès
      return NextResponse.json({
        success: true,
        data: {
          message: result.Message,
          shopOrderCount: body.shopOrders.length,
          printer: body.printer
        }
      })

    } catch (printError) {
      // 7. Gestion des erreurs d'impression avec ErrorService
      console.error('❌ [API] Erreur impression:', printError)

      const errorMessage = printError instanceof Error ? printError.message : 'Unknown print error'

      // Créer une erreur Part Printer standardisée
      const partPrinterError = errorService.createError(
        ErrorCode.AZURE_PRINT_FAILED,
        {
          error: errorMessage,
          printer: body.printer,
          shopOrderCount: body.shopOrders.length
        }
      )

      // Log l'erreur via le service
      errorService.handleError(partPrinterError)

      // Retourner l'erreur au client
      return NextResponse.json(
        {
          success: false,
          error: errorService.getErrorMessage(ErrorCode.AZURE_PRINT_FAILED, {
            error: errorMessage
          })
        },
        { status: 500 }
      )
    }

  } catch (error) {
    // 8. Erreur générale (parsing JSON, etc.)
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
