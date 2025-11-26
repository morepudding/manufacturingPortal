/**
 * API Route : Customer Orders
 * 
 * Récupère les informations d'un Customer Order à partir des données du Shop Order
 * Utilise OrderNo + LineNo pour éviter les timeouts liés au filtre CHullNumber
 */

import { NextRequest, NextResponse } from 'next/server'
import { getCustomerOrderInfoFromShopOrder, getCustomerOrderInfo } from '@/tools/boat-configuration/services/customer-order-service'

// Known serial number mappings for fallback mode
const KNOWN_SERIAL_MAPPINGS: Record<string, { orderNo: string; lineNo: string }> = {
  'LG5MA0114': { orderNo: 'C1000038587', lineNo: '1' },
  'JY6MB0019': { orderNo: 'C1000038587', lineNo: '1' },
  'LX6MA0116': { orderNo: 'C1000038587', lineNo: '1' },
  'LX6MA0115': { orderNo: 'C1000038587', lineNo: '1' },
}

/**
 * Fetch customer order by OrderNo + LineNo (fast path)
 */
async function fetchByOrderInfo(
  orderNo: string,
  lineNo: string,
  serialNumber?: string
) {
  console.log(`🔍 API: Fetching Customer Order ${orderNo} - Line ${lineNo} (OrderNo mode)`)
  if (serialNumber) {
    console.log(`   Expected Serial: ${serialNumber}`)
  }
  return getCustomerOrderInfoFromShopOrder(orderNo, lineNo, serialNumber)
}

/**
 * Fetch customer order by Serial Number using known mappings (fallback)
 */
async function fetchBySerialNumber(serialNumber: string) {
  console.log(`🔍 API: Fetching Customer Order by Serial Number ${serialNumber} (Serial mode)`)
  console.log('⚠️  Using Serial Number search (may be slower)')

  const mapping = KNOWN_SERIAL_MAPPINGS[serialNumber]
  if (!mapping) {
    console.log(`❌ No known mapping for Serial Number: ${serialNumber}`)
    return null
  }

  console.log(`🔗 Found known mapping: ${serialNumber} → ${mapping.orderNo} Line ${mapping.lineNo}`)
  return getCustomerOrderInfoFromShopOrder(mapping.orderNo, mapping.lineNo, serialNumber)
}

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
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const orderNo = searchParams.get('orderNo')
    const lineNo = searchParams.get('lineNo')
    const serialNumber = searchParams.get('serialNumber')

    const hasOrderInfo = orderNo && lineNo
    const hasSerialOnly = serialNumber && !orderNo && !lineNo

    // Validate parameters
    if (!hasOrderInfo && !hasSerialOnly) {
      console.log('❌ Missing required parameters')
      return NextResponse.json(
        { success: false, error: 'Missing required parameters: either (orderNo + lineNo) or serialNumber is required' },
        { status: 400 }
      )
    }

    // Fetch customer order based on available parameters
    const customerOrderInfo = hasOrderInfo
      ? await fetchByOrderInfo(orderNo, lineNo, serialNumber || undefined)
      : await fetchBySerialNumber(serialNumber!)

    if (!customerOrderInfo) {
      console.log('❌ Customer Order not found')
      return NextResponse.json({ success: false, error: 'Customer Order not found' }, { status: 404 })
    }

    // Build validation result
    const serialNumberMatch = serialNumber ? customerOrderInfo.chullNumber === serialNumber : null

    console.log('✅ Customer Order retrieved successfully')
    console.log(`   Mode: ${hasOrderInfo ? 'orderNo' : 'serial-mapped'}`)
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
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
