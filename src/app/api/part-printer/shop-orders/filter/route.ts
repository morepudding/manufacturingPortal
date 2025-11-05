/**
 * API Route: POST /api/part-printer/shop-orders/filter
 * 
 * Filtre les Shop Orders selon les critères Part Printer (SFD stricte)
 * 
 * Phase 2.2 - Logique de filtrage avec 2 checkboxes indépendantes
 * 
 * Body:
 * ```json
 * {
 *   "site": "BDR",
 *   "productionLine": "L1",     // Optional
 *   "startDate": "2025-10-13",
 *   "blockDate": true,          // true = filtre CBlockDates=true, false = pas de filtre
 *   "blockIdEmpty": true        // true = filtre BlockId vide, false = pas de filtre
 * }
 * ```
 * 
 * Combinaisons:
 * - blockDate=true, blockIdEmpty=true   → Débit classique (production normale)
 * - blockDate=false, blockIdEmpty=false → Redébit (tout accepter)
 * - blockDate=true, blockIdEmpty=false  → Débit avec pièces bloquées OK
 * - blockDate=false, blockIdEmpty=true  → Toutes dates (non bloquées)
 * 
 * ⚠️ Note AST: Le filtre blockIdEmpty est ignoré sur AST (non disponible)
 * 
 * @returns Liste des Shop Orders filtrés
 */

import { NextRequest, NextResponse } from 'next/server'
import { 
  filterShopOrders, 
  validateFilterParams 
} from '@/tools/part-printer/services/shop-order-filter-service'
import type { ShopOrderFilterParams } from '@/tools/part-printer/types'

export async function POST(request: NextRequest) {
  console.log('📡 [API] POST /api/part-printer/shop-orders/filter')

  try {
    // Parse du body
    const body = await request.json() as ShopOrderFilterParams

    console.log('📊 [API] Paramètres de filtrage:', body)

    // Validation des paramètres
    try {
      validateFilterParams(body)
    } catch (validationError) {
      console.error('❌ [API] Validation échouée:', validationError)
      
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid parameters',
          message: validationError instanceof Error ? validationError.message : 'Validation failed',
        },
        { status: 400 }
      )
    }

    // Filtrage des Shop Orders
    const result = await filterShopOrders(body)

    console.log(`✅ [API] ${result.count} Shop Orders filtrés`)

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error('❌ [API] Erreur lors du filtrage:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to filter shop orders',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
