/**
 * Service Shop Order - Orchestration de la recherche complète
 * 
 * Fonctionnalités:
 * - Recherche d'un Shop Order dans IFS
 * - Extraction du DOP ID (gestion des formats composés)
 * - Récupération du Serial Number via le DOP
 * - Retour des données enrichies
 * 
 * Endpoint IFS:
 * ShopOrderHandling.svc/ShopOrds
 * 
 * Workflow:
 * 1. Rechercher le Shop Order (avec contains car eq pose problème)
 * 2. Filtrer pour correspondance exacte côté code
 * 3. Extraire le DOP ID principal ("54 - 1035" → "54")
 * 4. Récupérer le Serial Number via DOP
 * 5. Retourner les données enrichies
 */

import { getIFSClient } from '@/shared/services/ifs-client'
import { extractMainDopId } from '@/tools/boat-configuration/services/dop-service'
import { getFirstSerialNumberFromDop } from '@/tools/boat-configuration/services/serial-number-service'
import type {
  IFSODataResponse,
  IFSShopOrder,
  ShopOrderSearchParams,
  ShopOrderSearchResult,
} from '@/shared/types/ifs'

/**
 * Create an empty shop order result for error/not found cases
 */
function createEmptyResult(
  orderNo: string,
  releaseNo: string,
  sequenceNo: string,
  error: string
): ShopOrderSearchResult {
  return {
    shopOrder: {
      OrderNo: orderNo,
      ReleaseNo: releaseNo,
      SequenceNo: sequenceNo,
      DopId: null,
      PartNo: '',
      PartDescription: '',
      Contract: '',
    },
    found: false,
    error,
  }
}

/**
 * Find exact match from shop orders list
 */
function findExactMatch(
  orders: IFSShopOrder[],
  orderNo: string,
  releaseNo: string,
  sequenceNo: string
): IFSShopOrder | undefined {
  return orders.find(order => {
    const orderNoMatch = order.OrderNo === orderNo.trim()
    const releaseNoMatch = !releaseNo || releaseNo === '*' || order.ReleaseNo === releaseNo.trim()
    const sequenceNoMatch = !sequenceNo || sequenceNo === '*' || order.SequenceNo === sequenceNo.trim()
    return orderNoMatch && releaseNoMatch && sequenceNoMatch
  })
}

/**
 * Fetch serial number for a shop order with DOP ID
 */
async function fetchSerialNumber(
  shopOrder: IFSShopOrder
): Promise<ShopOrderSearchResult> {
  const mainDopId = extractMainDopId(shopOrder.DopId!)
  console.log(`📋 Main DOP ID: ${mainDopId}`)

  try {
    const serialNumber = await getFirstSerialNumberFromDop(mainDopId)
    
    if (serialNumber) {
      console.log(`✅ Serial Number found: ${serialNumber}`)
    } else {
      console.log(`ℹ️ No Serial Number found for DOP ID: ${mainDopId}`)
    }

    return {
      shopOrder,
      found: true,
      serialNumber: serialNumber || null,
      dopHeaderId: shopOrder.DopId,
    }
  } catch (error) {
    console.error(`❌ Error fetching Serial Number:`, error)
    return {
      shopOrder,
      found: true,
      serialNumber: null,
      dopHeaderId: shopOrder.DopId,
      error: `Failed to fetch Serial Number: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }
  }
}

/**
 * Rechercher un Shop Order et récupérer son Serial Number
 * 
 * @param params - Paramètres de recherche (orderNo, releaseNo, sequenceNo)
 * @returns Résultat de la recherche avec Shop Order et Serial Number
 * 
 * @example
 * ```typescript
 * const result = await searchShopOrder({
 *   orderNo: "97277",
 *   releaseNo: "*",
 *   sequenceNo: "*"
 * })
 * 
 * if (result.found) {
 *   console.log("Serial Number:", result.serialNumber)
 *   console.log("DOP Header ID:", result.dopHeaderId)
 * }
 * ```
 */
export async function searchShopOrder(
  params: ShopOrderSearchParams
): Promise<ShopOrderSearchResult> {
  console.log('🔍 Shop Order Search Request:', params)

  const { orderNo, releaseNo, sequenceNo } = params

  // Validation des paramètres
  if (!orderNo || !releaseNo || !sequenceNo) {
    return createEmptyResult(
      orderNo || '',
      releaseNo || '',
      sequenceNo || '',
      'Missing required parameters: orderNo, releaseNo, sequenceNo'
    )
  }

  console.log('🔍 Searching Shop Order...')
  const client = getIFSClient()

  try {
    const filter = `contains(OrderNo,'${orderNo.trim()}')`
    console.log(`📊 OData filter: ${filter}`)

    const response = await client.get<IFSODataResponse<IFSShopOrder>>(
      'ShopOrderHandling.svc/ShopOrds',
      {
        $filter: filter,
        $select: 'OrderNo,ReleaseNo,SequenceNo,DopId,PartNo,PartDescription,Contract,CustomerOrderNo,CustomerLineNo',
        $top: '10',
      }
    )

    if (!response.value || response.value.length === 0) {
      console.log(`ℹ️ No Shop Order found for Order No: ${orderNo}`)
      return createEmptyResult(orderNo, releaseNo, sequenceNo, 'Shop Order not found')
    }

    console.log(`📊 Found ${response.value.length} Shop Order(s), filtering for exact match...`)

    const exactMatch = findExactMatch(response.value, orderNo, releaseNo, sequenceNo)

    if (!exactMatch) {
      console.log(`ℹ️ No exact match found for Order No: ${orderNo}`)
      return createEmptyResult(orderNo, releaseNo, sequenceNo, 'No exact match found')
    }

    console.log(`✅ Shop Order found: ${exactMatch.OrderNo}`)

    // Log Customer Order info if available
    if (exactMatch.CustomerOrderNo) {
      console.log(`📦 Customer Order found: ${exactMatch.CustomerOrderNo} - Line ${exactMatch.CustomerLineNo || 'N/A'}`)
    } else {
      console.log(`ℹ️ No Customer Order linked to this Shop Order`)
    }

    // Return early if no DOP ID
    if (!exactMatch.DopId) {
      console.log(`ℹ️ Shop Order has no DOP ID`)
      return { shopOrder: exactMatch, found: true, serialNumber: null, dopHeaderId: null }
    }

    console.log(`📋 DOP ID found: ${exactMatch.DopId}`)
    return fetchSerialNumber(exactMatch)

  } catch (error) {
    console.error(`❌ Failed to search Shop Order:`, error)
    return createEmptyResult(
      orderNo,
      releaseNo,
      sequenceNo,
      `Search failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}
