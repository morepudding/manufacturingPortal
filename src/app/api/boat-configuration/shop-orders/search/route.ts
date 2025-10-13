/**
 * API Route: POST /api/shop-orders/search
 * 
 * Recherche un Shop Order et récupère son Serial Number
 * 
 * Body JSON:
 * {
 *   "orderNo": "97277",
 *   "releaseNo": "*",
 *   "sequenceNo": "*"
 * }
 * 
 * Réponse succès (200):
 * {
 *   "found": true,
 *   "shopOrder": { ... },
 *   "serialNumber": "LG5MA0114",
 *   "dopHeaderId": "95 - 10088"
 * }
 * 
 * Réponse erreur (404):
 * {
 *   "error": "Shop Order not found"
 * }
 */

import { NextResponse } from 'next/server'
import { searchShopOrder } from '@/tools/boat-configuration/services/shop-order-service'
import type { ShopOrderSearchParams } from '@/core/types/ifs'

/**
 * POST /api/shop-orders/search
 * 
 * Recherche un Shop Order par ses clés et retourne le Serial Number associé
 */
export async function POST(request: Request) {
  console.log('📥 POST /api/shop-orders/search - Request received')

  try {
    // Parser le body JSON
    const body = await request.json()
    const { orderNo, releaseNo, sequenceNo } = body

    console.log('📝 Request body:', { orderNo, releaseNo, sequenceNo })

    // Validation des paramètres
    if (!orderNo || !releaseNo || !sequenceNo) {
      console.warn('⚠️ Missing required parameters')
      return NextResponse.json(
        {
          error: 'Missing required parameters: orderNo, releaseNo, sequenceNo',
          details: {
            orderNo: !orderNo ? 'Required' : 'OK',
            releaseNo: !releaseNo ? 'Required' : 'OK',
            sequenceNo: !sequenceNo ? 'Required' : 'OK',
          },
        },
        { status: 400 }
      )
    }

    // Valider que les paramètres sont des strings
    if (
      typeof orderNo !== 'string' ||
      typeof releaseNo !== 'string' ||
      typeof sequenceNo !== 'string'
    ) {
      console.warn('⚠️ Invalid parameter types')
      return NextResponse.json(
        {
          error: 'Invalid parameter types: all parameters must be strings',
        },
        { status: 400 }
      )
    }

    // Appeler le service de recherche
    const searchParams: ShopOrderSearchParams = {
      orderNo,
      releaseNo,
      sequenceNo,
    }

    const result = await searchShopOrder(searchParams)

    // Vérifier si le Shop Order a été trouvé
    if (!result.found) {
      console.log('❌ Shop Order not found')
      return NextResponse.json(
        {
          error: result.error || 'Shop Order not found',
          searchParams,
        },
        { status: 404 }
      )
    }

    // Succès - retourner les données enrichies
    console.log('✅ Shop Order found with enriched data')

    return NextResponse.json(
      {
        found: true,
        shopOrder: result.shopOrder,
        serialNumber: result.serialNumber || null,
        dopHeaderId: result.dopHeaderId || null,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('❌ Internal server error:', error)

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/shop-orders/search
 * 
 * Méthode non supportée (POST uniquement)
 */
export async function GET() {
  return NextResponse.json(
    {
      error: 'Method not allowed',
      message: 'Use POST method with JSON body containing orderNo, releaseNo, sequenceNo',
    },
    { status: 405 }
  )
}
