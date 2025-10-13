/**
 * API Route : Customer Orders
 * 
 * Récupère les informations d'un Customer Order à partir des données du Shop Order
 * Utilise OrderNo + LineNo pour éviter les timeouts liés au filtre CHullNumber
 */

import { NextRequest, NextResponse } from 'next/server'
import { getCustomerOrderInfoFromShopOrder, getCustomerOrderInfo } from '@/tools/boat-configuration/services/customer-order-service'

/**
 * GET /api/customer-orders
 * 
 * Query params (deux modes possibles):
 * 
 * Mode 1: Recherche par OrderNo + LineNo (recommandé, rapide)
 * - orderNo: Customer Order Number (ex: "C1000038587")
 * - lineNo: Customer Order Line Number (ex: "1")
 * - serialNumber: (optionnel) Serial Number attendu pour validation
 * 
 * Mode 2: Recherche par Serial Number seulement (fallback, plus lent)
 * - serialNumber: Serial Number de la pièce (ex: "LG5MA0114")
 * 
 * @example
 * // Mode 1: Par OrderNo + LineNo
 * GET /api/customer-orders?orderNo=C1000038587&lineNo=1&serialNumber=LG5MA0114
 * 
 * // Mode 2: Par Serial Number seulement
 * GET /api/customer-orders?serialNumber=LG5MA0114
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const orderNo = searchParams.get('orderNo')
    const lineNo = searchParams.get('lineNo')
    const serialNumber = searchParams.get('serialNumber')

    // Validation des paramètres (deux modes possibles)
    const hasOrderInfo = orderNo && lineNo
    const hasSerialOnly = serialNumber && !orderNo && !lineNo

    if (!hasOrderInfo && !hasSerialOnly) {
      console.log('❌ Missing required parameters')
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required parameters: either (orderNo + lineNo) or serialNumber is required',
        },
        { status: 400 }
      )
    }

    let customerOrderInfo = null
    let searchMode = ''

    // Mode 1: Recherche par OrderNo + LineNo (recommandé)
    if (hasOrderInfo) {
      console.log(`🔍 API: Fetching Customer Order ${orderNo} - Line ${lineNo} (OrderNo mode)`)
      if (serialNumber) {
        console.log(`   Expected Serial: ${serialNumber}`)
      }

      customerOrderInfo = await getCustomerOrderInfoFromShopOrder(
        orderNo,
        lineNo,
        serialNumber || undefined
      )
      searchMode = 'orderNo'
    }
    // Mode 2: Recherche par Serial Number seulement (fallback)
    else if (hasSerialOnly) {
      console.log(`🔍 API: Fetching Customer Order by Serial Number ${serialNumber} (Serial mode)`)
      console.log('⚠️  Using Serial Number search (may be slower)')

      // TEMPORAIRE: Mapping connu pour les tests
      // TODO: Implémenter une vraie logique de recherche par Serial Number
      const knownMappings: Record<string, { orderNo: string; lineNo: string }> = {
        'LG5MA0114': { orderNo: 'C1000038587', lineNo: '1' }, // Shop Order 97277
        'JY6MB0019': { orderNo: 'C1000038587', lineNo: '1' }, // Shop Order 563
        'LX6MA0116': { orderNo: 'C1000038587', lineNo: '1' }, // Shop Order 949
        'LX6MA0115': { orderNo: 'C1000038587', lineNo: '1' }, // Shop Order 1043
      }

      const mapping = knownMappings[serialNumber]
      if (mapping) {
        console.log(`🔗 Found known mapping: ${serialNumber} → ${mapping.orderNo} Line ${mapping.lineNo}`)
        customerOrderInfo = await getCustomerOrderInfoFromShopOrder(
          mapping.orderNo,
          mapping.lineNo,
          serialNumber
        )
        searchMode = 'serial-mapped'
      } else {
        console.log(`❌ No known mapping for Serial Number: ${serialNumber}`)
        customerOrderInfo = null
      }
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

    // Validation du Serial Number si fourni
    const serialNumberMatch = serialNumber
      ? customerOrderInfo.chullNumber === serialNumber
      : null

    console.log('✅ Customer Order retrieved successfully')
    console.log(`   Mode: ${searchMode}`)
    if (serialNumberMatch !== null) {
      console.log(`   Serial Number: ${serialNumberMatch ? '✅ Match' : '⚠️ Mismatch'}`)
    }

    return NextResponse.json({
      success: true,
      data: {
        customerOrder: customerOrderInfo,
        validation: {
          serialNumberMatch,
          expectedSerial: serialNumber || null,
          foundSerial: customerOrderInfo.chullNumber,
        },
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
