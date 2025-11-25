/**
 * API Route : Customer Order Search by Serial Number
 * 
 * Recherche un Customer Order selon les specs business (section 8):
 * Serial Number → Customer Order Line (Site=FR05A) → Customer Order
 * 
 * Note: OrderType=BAT est dans CustomerOrder header, pas dans CustomerOrderLine
 * 
 * Query params:
 * - serialNumber: Serial Number (CHullNumber) à rechercher
 * 
 * @example
 * GET /api/boat-configuration/customer-orders/search?serialNumber=LG5MA0114
 */

import { NextRequest, NextResponse } from 'next/server'
import { getCustomerOrderByHullNumber } from '@/tools/boat-configuration/services/customer-order-service'

/**
 * GET /api/boat-configuration/customer-orders/search
 * 
 * Recherche selon specs (section 8):
 * - Hull Number = Serial Number
 * - Site = FR05A
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const serialNumber = searchParams.get('serialNumber')

    // Validation du paramètre obligatoire
    if (!serialNumber) {
      console.log('❌ Missing required parameter: serialNumber')
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required parameter: serialNumber',
        },
        { status: 400 }
      )
    }

    console.log(`🔍 API: Searching Customer Order by Serial Number (specs section 8)`)
    console.log(`   Serial Number: ${serialNumber}`)
    console.log(`   Filters: Site=FR05A`)

    // Rechercher selon les specs (section 8)
    const customerOrderInfo = await getCustomerOrderByHullNumber(serialNumber)

    if (!customerOrderInfo) {
      console.log('❌ Customer Order not found (specs filters applied)')
      return NextResponse.json(
        {
          success: false,
          error: 'No Customer Order found for this Serial Number',
          hint: 'Vérifiez que le Serial Number est lié à un Customer Order avec Site=FR05A',
        },
        { status: 404 }
      )
    }

    console.log(`✅ Customer Order found: ${customerOrderInfo.orderNo}`)

    // Validation Serial Number
    const serialNumberMatch = customerOrderInfo.chullNumber === serialNumber

    return NextResponse.json({
      success: true,
      data: {
        customerOrder: customerOrderInfo,
        validation: {
          serialNumberMatch,
          expectedSerial: serialNumber,
          foundSerial: customerOrderInfo.chullNumber,
        },
      },
    })
  } catch (error) {
    console.error('❌ Error in Customer Order Search API:', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
