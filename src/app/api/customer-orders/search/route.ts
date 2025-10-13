/**
 * API Route : Customer Order Search by Serial Number
 * 
 * Recherche un Customer Order à partir du Serial Number (CHullNumber)
 * Cette route est utilisée quand le Shop Order ne retourne pas CustomerOrderNo/LineNo
 */

import { NextRequest, NextResponse } from 'next/server'
import { getCustomerOrderLineBySerial, getCustomerOrderHeader } from '@/lib/customer-order-service'

/**
 * GET /api/customer-orders/search
 * 
 * Query params:
 * - serialNumber: Serial Number (CHullNumber) à rechercher
 * 
 * @example
 * GET /api/customer-orders/search?serialNumber=LG5MA0114
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

    console.log(`🔍 API: Searching Customer Order by Serial Number: ${serialNumber}`)

    // Étape 1 : Rechercher la Customer Order Line par CHullNumber
    const customerOrderLine = await getCustomerOrderLineBySerial(serialNumber)

    if (!customerOrderLine) {
      console.log('❌ Customer Order Line not found')
      return NextResponse.json(
        {
          success: false,
          error: 'No Customer Order found for this Serial Number',
        },
        { status: 404 }
      )
    }

    console.log(`✅ Customer Order Line found: ${customerOrderLine.OrderNo} - Line ${customerOrderLine.LineNo}`)

    // Étape 2 : Récupérer le Customer Order Header (pour le nom du client)
    let customerName: string | undefined
    let customerPoNo: string | undefined
    let internalPoNo: string | undefined

    try {
      const header = await getCustomerOrderHeader(customerOrderLine.OrderNo)
      customerName = header.CustomerName
      customerPoNo = header.CustomerPoNo
      internalPoNo = header.InternalPoNo
      console.log(`   👤 Customer: ${customerName}`)
    } catch (error) {
      console.warn('⚠️  Could not fetch Customer Order Header, continuing without it')
    }

    // Étape 3 : Construire l'objet de réponse
    const customerOrderInfo = {
      orderNo: customerOrderLine.OrderNo,
      lineNo: customerOrderLine.LineNo,
      partNo: customerOrderLine.PartNo,
      catalogDesc: customerOrderLine.CatalogDesc || 'N/A',
      chullNumber: customerOrderLine.CHullNumber,
      customerNo: customerOrderLine.CustomerNo,
      customerName,
      configurationId: customerOrderLine.ConfigurationId,
      status: customerOrderLine.Objstate,
      quantity: customerOrderLine.BuyQtyDue || customerOrderLine.QtyOrdered || 1,
      contract: customerOrderLine.Contract,
      plannedDeliveryDate: customerOrderLine.PlannedDeliveryDate,
      wantedDeliveryDate: customerOrderLine.WantedDeliveryDate,
      customerPoNo,
      internalPoNo,
    }

    // Validation Serial Number
    const serialNumberMatch = customerOrderLine.CHullNumber === serialNumber

    console.log('✅ Customer Order retrieved successfully')
    console.log(`   Serial Number: ${serialNumberMatch ? '✅ Match' : '⚠️ Mismatch'}`)

    return NextResponse.json({
      success: true,
      data: {
        customerOrder: customerOrderInfo,
        validation: {
          serialNumberMatch,
          expectedSerial: serialNumber,
          foundSerial: customerOrderLine.CHullNumber,
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
