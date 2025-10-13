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
    return {
      shopOrder: {
        OrderNo: orderNo || '',
        ReleaseNo: releaseNo || '',
        SequenceNo: sequenceNo || '',
        DopId: null,
        PartNo: '',
        PartDescription: '',
        Contract: '',
      },
      found: false,
      error: 'Missing required parameters: orderNo, releaseNo, sequenceNo',
    }
  }

  console.log('🔍 Searching Shop Order...')

  const client = getIFSClient()

  try {
    // Construire le filtre OData
    // Note: Utiliser contains() car eq avec strings pose problème de type
    // Filtrage exact sera fait côté code après récupération
    const filter = `contains(OrderNo,'${orderNo.trim()}')`

    console.log(`📊 OData filter: ${filter}`)

    // Requête IFS
    const response = await client.get<IFSODataResponse<IFSShopOrder>>(
      'ShopOrderHandling.svc/ShopOrds',
      {
        $filter: filter,
        $select: 'OrderNo,ReleaseNo,SequenceNo,DopId,PartNo,PartDescription,Contract,CustomerOrderNo,CustomerLineNo',
        $top: '10', // Limiter le nombre de résultats
      }
    )

    // Vérifier si des résultats ont été trouvés
    if (!response.value || response.value.length === 0) {
      console.log(`ℹ️ No Shop Order found for Order No: ${orderNo}`)
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
        error: 'Shop Order not found',
      }
    }

    console.log(`📊 Found ${response.value.length} Shop Order(s), filtering for exact match...`)

    // Filtrer pour correspondance exacte (éviter 101043 quand on cherche 1043)
    const exactMatch = response.value.find(order => {
      const orderNoMatch = order.OrderNo === orderNo.trim()
      const releaseNoMatch = !releaseNo || releaseNo === '*' || order.ReleaseNo === releaseNo.trim()
      const sequenceNoMatch = !sequenceNo || sequenceNo === '*' || order.SequenceNo === sequenceNo.trim()

      return orderNoMatch && releaseNoMatch && sequenceNoMatch
    })

    if (!exactMatch) {
      console.log(`ℹ️ No exact match found for Order No: ${orderNo}`)
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
        error: 'No exact match found',
      }
    }

    console.log(`✅ Shop Order found: ${exactMatch.OrderNo}`)

    // Logger les infos Customer Order si disponibles
    if (exactMatch.CustomerOrderNo) {
      console.log(`📦 Customer Order found: ${exactMatch.CustomerOrderNo} - Line ${exactMatch.CustomerLineNo || 'N/A'}`)
    } else {
      console.log(`ℹ️ No Customer Order linked to this Shop Order`)
    }

    // Si le Shop Order a un DOP ID, récupérer le Serial Number
    if (exactMatch.DopId) {
      console.log(`📋 DOP ID found: ${exactMatch.DopId}`)

      // Parser le DOP ID (gestion des formats composés "54 - 1035" → "54")
      const mainDopId = extractMainDopId(exactMatch.DopId)
      console.log(`📋 Main DOP ID: ${mainDopId}`)

      // Récupérer le Serial Number
      try {
        const serialNumber = await getFirstSerialNumberFromDop(mainDopId)

        if (serialNumber) {
          console.log(`✅ Serial Number found: ${serialNumber}`)

          return {
            shopOrder: exactMatch,
            found: true,
            serialNumber: serialNumber,
            dopHeaderId: exactMatch.DopId,
          }
        } else {
          console.log(`ℹ️ No Serial Number found for DOP ID: ${mainDopId}`)

          return {
            shopOrder: exactMatch,
            found: true,
            serialNumber: null,
            dopHeaderId: exactMatch.DopId,
          }
        }
      } catch (error) {
        console.error(`❌ Error fetching Serial Number:`, error)

        // Retourner le Shop Order même si la récupération du Serial Number échoue
        return {
          shopOrder: exactMatch,
          found: true,
          serialNumber: null,
          dopHeaderId: exactMatch.DopId,
          error: `Failed to fetch Serial Number: ${error instanceof Error ? error.message : 'Unknown error'}`,
        }
      }
    } else {
      console.log(`ℹ️ Shop Order has no DOP ID`)

      return {
        shopOrder: exactMatch,
        found: true,
        serialNumber: null,
        dopHeaderId: null,
      }
    }
  } catch (error) {
    console.error(`❌ Failed to search Shop Order:`, error)

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
      error: `Search failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }
  }
}
