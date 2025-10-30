/**
 * API Route : Customer Orders
 * 
 * ⭐ STRATÉGIE OPTIMALE : Recherche directe par HullNumber
 * 
 * Workflow :
 * 1. INPUT: HullNumber (CHullNumber)
 * 2. Recherche directe dans CustomerOrderLineSet
 * 3. Récupération complète du Customer Order
 * 
 * Modes supportés (legacy pour compatibilité) :
 * - Mode 1: Par HullNumber/SerialNumber (OPTIMAL, recommandé)
 * - Mode 2: Par OrderNo + LineNo (legacy, pour compatibilité)
 * 
 * @deprecated Mode 2 (orderNo + lineNo) - Utilisez directement le HullNumber
 */

import { NextRequest, NextResponse } from 'next/server'
import { 
  getCustomerOrderByHullNumber,
  getCustomerOrderInfoFromShopOrder 
} from '@/tools/boat-configuration/services/customer-order-service'

/**
 * GET /api/boat-configuration/customer-orders
 * 
 * Query params :
 * 
 * Mode 1: Recherche par HullNumber (OPTIMAL, recommandé)
 * - hullNumber: Hull Number / Serial Number (ex: "LG5MA0114")
 * - site: (RECOMMANDÉ) Site/CustomerNo pour filtrer (ex: "FR05A") - Évite les timeouts ⚡
 * 
 * Mode 2: Recherche par OrderNo + LineNo (legacy, compatibilité)
 * - orderNo: Customer Order Number (ex: "C1000038587")
 * - lineNo: Customer Order Line Number (ex: "1")
 * - serialNumber: (optionnel) Serial Number pour validation
 * 
 * @example
 * // Mode 1: Par HullNumber (OPTIMAL)
 * GET /api/boat-configuration/customer-orders?hullNumber=LG5MA0114
 * 
 * // Mode 1: Par HullNumber + Site (⚡ PLUS RAPIDE, évite timeouts)
 * GET /api/boat-configuration/customer-orders?hullNumber=LG5MA0114&site=FR05A
 * 
 * // Mode 2: Par OrderNo + LineNo (legacy)
 * GET /api/boat-configuration/customer-orders?orderNo=C1000038587&lineNo=1
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    
    // Paramètres Mode 1 (OPTIMAL)
    const hullNumber = searchParams.get('hullNumber') || searchParams.get('serialNumber')
    const siteFilter = searchParams.get('site') || searchParams.get('customerNo')
    
    // Paramètres Mode 2 (Legacy)
    const orderNo = searchParams.get('orderNo')
    const lineNo = searchParams.get('lineNo')

    let customerOrderInfo = null
    let searchMode = ''

    // ⭐ MODE 1 : Recherche directe par HullNumber (OPTIMAL)
    if (hullNumber && !orderNo && !lineNo) {
      console.log(`🔍 API: Fetching Customer Order by Hull Number: ${hullNumber} (OPTIMAL mode)`)
      if (siteFilter) {
        console.log(`   ⚡ Site filter: ${siteFilter} (performance boost)`)
      } else {
        console.log(`   ⚠️  No site filter - query may be slow. Recommend adding ?site=FR05A`)
      }

      customerOrderInfo = await getCustomerOrderByHullNumber(hullNumber, siteFilter || undefined)
      searchMode = 'hull-number-direct'
    }
    // 🔄 MODE 2 : Recherche par OrderNo + LineNo (Legacy, pour compatibilité)
    else if (orderNo && lineNo) {
      console.log(`🔍 API: Fetching Customer Order ${orderNo} - Line ${lineNo} (Legacy mode)`)
      console.log('   ⚠️  Using legacy OrderNo+LineNo mode (consider migrating to HullNumber)')

      customerOrderInfo = await getCustomerOrderInfoFromShopOrder(
        orderNo,
        lineNo,
        hullNumber || undefined
      )
      searchMode = 'order-line-legacy'
    }
    // ❌ Paramètres invalides
    else {
      console.log('❌ Missing or invalid parameters')
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required parameters. Use either: hullNumber (optimal) OR orderNo+lineNo (legacy)',
          hint: 'Recommended: ?hullNumber=LG5MA0114'
        },
        { status: 400 }
      )
    }

    if (!customerOrderInfo) {
      console.log('❌ Customer Order not found')
      return NextResponse.json(
        {
          success: false,
          error: 'Customer Order not found',
        },
        { status: 404 }
      )
    }

    // Validation du Hull Number si fourni en mode legacy
    const hullNumberMatch = hullNumber
      ? customerOrderInfo.chullNumber === hullNumber
      : null

    console.log('✅ Customer Order retrieved successfully')
    console.log(`   Mode: ${searchMode}`)
    if (hullNumberMatch !== null) {
      console.log(`   Hull Number: ${hullNumberMatch ? '✅ Match' : '⚠️ Mismatch'}`)
    }

    return NextResponse.json({
      success: true,
      data: {
        customerOrder: customerOrderInfo,
        validation: {
          hullNumberMatch,
          expectedHull: hullNumber || null,
          foundHull: customerOrderInfo.chullNumber,
        },
        meta: {
          searchMode,
          performance: searchMode === 'hull-number-direct' ? 'optimal' : 'legacy'
        }
      },
    })
  } catch (error) {
    console.error('❌ Error in Customer Order API:', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
