/**
 * Service Shop Order Filter - Filtrage avancé des Shop Orders Part Printer
 * 
 * Phase 2.2 - Logique de filtrage
 * 
 * Endpoint IFS: ShopOrderHandling.svc/ShopOrds
 * 
 * Logique de filtrage:
 * 
 * | Mode               | Block Date | OP10 Block ID           | Start Date          |
 * |--------------------|------------|-------------------------|---------------------|
 * | Débit classique    | true       | Strictement vide (EMPTY)| = Date sélectionnée |
 * | Redébit            | false      | No condition            | = Date sélectionnée |
 * 
 * Note: La date peut être passée ou future dans les deux modes.
 */

import { getIFSClient } from '@/shared/services/ifs-client'
import type { IFSODataResponse } from '@/shared/types/ifs'
import type { 
  ShopOrderFilterParams, 
  IFSShopOrderExtended, 
  ShopOrdersFilterResponse 
} from '../types'

/**
 * Filtrer les Shop Orders selon les critères Part Printer
 * 
 * @param params - Paramètres de filtrage
 * @returns Shop Orders filtrés avec leurs données enrichies
 * 
 * @example
 * ```typescript
 * // Débit classique
 * const result = await filterShopOrders({
 *   site: "BDR",
 *   startDate: "2025-10-13",
 *   blockDate: true,
 *   op10BlockId: "EMPTY"
 * })
 * 
 * // Redébit
 * const result = await filterShopOrders({
 *   site: "BDR",
 *   startDate: "2025-10-14",
 *   blockDate: false,
 *   op10BlockId: "NO_CONDITION"
 * })
 * ```
 */
export async function filterShopOrders(
  params: ShopOrderFilterParams
): Promise<ShopOrdersFilterResponse> {
  console.log('🔍 [Shop Order Filter] Démarrage filtrage avec paramètres:', params)

  const { site, productionLine, startDate, blockDate, op10BlockId } = params

  try {
    const client = getIFSClient()

    // Construction du filtre OData
    // NOTE: Filtrer Contract et ProductionLine dans OData
    // Pour le mode Redébit, filtrer aussi la date dans OData pour optimiser
    const filters: string[] = [
      `Contract eq '${site}'`
    ]

    // Filtrage par ligne de production (si fourni) - peut être fait dans OData
    if (productionLine) {
      filters.push(`ProductionLine eq '${productionLine}'`)
      console.log(`📊 [Shop Order Filter] Ligne de production: ${productionLine}`)
    }

    // Mode pour log et filtre OData
    if (blockDate) {
      console.log('📊 [Shop Order Filter] Mode: Débit classique')
    } else {
      console.log('📊 [Shop Order Filter] Mode: Redébit')
      // NOTE: On ne filtre PAS la date dans OData car la syntaxe est problématique
      // On va filtrer côté code et augmenter $top pour avoir plus de résultats
    }

    const odataFilter = filters.join(' and ')
    console.log('🔍 [Shop Order Filter] Filtre OData:', odataFilter)

    // Requête IFS (on récupère plus large et on filtre côté code)
    // Pour le mode Redébit, on augmente $top car on doit filtrer par date côté code
    const topLimit = blockDate ? '1000' : '3000' // Plus de résultats en mode Redébit (augmenté à 3000)
    
    // Tri: pour le mode Redébit, on veut les dates les plus récentes <= aujourd'hui
    // Donc on trie par ordre DECROISSANT et on filtre côté code
    // Pour le mode Débit classique, peu importe car on filtre sur une date exacte
    const orderBy = blockDate ? 'OrderNo desc' : 'RevisedStartDate desc'
    
    const response = await client.get<IFSODataResponse<IFSShopOrderExtended>>(
      'ShopOrderHandling.svc/ShopOrds',
      {
        $filter: odataFilter,
        $select: 'OrderNo,ReleaseNo,SequenceNo,Contract,PartNo,PartDescription,Objstate,RevisedStartDate,CBlockDates,ProductionLine',
        $orderby: orderBy,
        $top: topLimit
      }
    )

    let shopOrders = response.value || []

    // Filtrage côté code pour Objstate = "Released" OU "Closed" (mode dev/test)
    // TODO PRODUCTION: Ne garder que 'Released' quand les données seront disponibles
    shopOrders = shopOrders.filter(order => 
      order.Objstate === 'Released' || order.Objstate === 'Closed'
    )
    console.log(`✅ [Shop Order Filter] ${shopOrders.length} Shop Orders avec Objstate='Released' ou 'Closed' (mode dev/test)`)

    // Filtrage local côté code pour date et CBlockDates
    const targetDate = startDate
    
    if (blockDate) {
      // Débit classique: date = startDate + CBlockDates = true
      console.log(`🔍 [DEBUG] Mode Débit classique - Recherche date=${targetDate}, CBlockDates=true`)
      console.log(`🔍 [DEBUG] Premiers Shop Orders (3 exemples):`)
      shopOrders.slice(0, 3).forEach(order => {
        const orderDate = order.RevisedStartDate ? new Date(order.RevisedStartDate).toISOString().split('T')[0] : null
        console.log(`  - ${order.OrderNo}: PartNo=${order.PartNo}, Date=${orderDate}, CBlockDates=${order.CBlockDates}`)
      })
      
      shopOrders = shopOrders.filter(order => {
        const orderDate = order.RevisedStartDate ? new Date(order.RevisedStartDate).toISOString().split('T')[0] : null
        return orderDate === targetDate && order.CBlockDates === true
      })
      console.log(`✅ [Shop Order Filter] ${shopOrders.length} Shop Orders avec date=${targetDate} et CBlockDates=true`)
    } else {
      // Redébit: date = startDate + CBlockDates = false
      console.log(`🔍 [DEBUG] Mode Redébit - Recherche date=${targetDate}, CBlockDates=false`)
      console.log(`🔍 [DEBUG] Premiers Shop Orders (10 exemples):`)
      shopOrders.slice(0, 10).forEach(order => {
        const orderDate = order.RevisedStartDate ? new Date(order.RevisedStartDate).toISOString().split('T')[0] : null
        const dateCheck = orderDate === targetDate
        const blockCheck = order.CBlockDates === false
        console.log(`  - ${order.OrderNo}: PartNo=${order.PartNo}, Date=${orderDate} (${dateCheck ? '✅' : '❌'}), CBlockDates=${order.CBlockDates} (${blockCheck ? '✅' : '❌'})`)
      })
      
      shopOrders = shopOrders.filter(order => {
        const orderDate = order.RevisedStartDate ? new Date(order.RevisedStartDate).toISOString().split('T')[0] : null
        return orderDate === targetDate && order.CBlockDates === false
      })
      console.log(`✅ [Shop Order Filter] ${shopOrders.length} Shop Orders avec date=${targetDate} et CBlockDates=false`)
    }

    // Filtrage côté code pour OP10 Block ID
    if (op10BlockId === 'EMPTY') {
      // TODO: Implémenter filtrage OP10 Block ID vide
      // Nécessite appel à OperationHandling.svc pour chaque Shop Order
      console.log('⚠️ [Shop Order Filter] Filtrage OP10 Block ID EMPTY (TODO: implémenter)')
      // shopOrders = await filterByEmptyOP10BlockId(shopOrders)
    } else if (op10BlockId === 'NO_CONDITION') {
      console.log('📊 [Shop Order Filter] OP10 Block ID: No condition (pas de filtrage)')
      // Pas de filtrage supplémentaire
    }

    console.log(`✅ [Shop Order Filter] ${shopOrders.length} Shop Orders après filtrage complet`)

    return {
      shopOrders,
      count: shopOrders.length
    }
  } catch (error) {
    console.error('❌ [Shop Order Filter] Erreur lors du filtrage:', error)
    throw new Error('Failed to filter shop orders')
  }
}

/**
 * Filtrer les Shop Orders ayant un OP10 Block ID vide
 * 
 * ⚠️ ATTENTION: Cette fonction nécessite un appel API pour CHAQUE Shop Order
 * Peut être lent avec beaucoup de résultats
 * 
 * @param shopOrders - Shop Orders à filtrer
 * @returns Shop Orders avec OP10 Block ID vide uniquement
 */
async function filterByEmptyOP10BlockId(
  shopOrders: IFSShopOrderExtended[]
): Promise<IFSShopOrderExtended[]> {
  console.log(`🔍 [Shop Order Filter] Filtrage ${shopOrders.length} Shop Orders par OP10 Block ID vide...`)

  const client = getIFSClient()
  const filtered: IFSShopOrderExtended[] = []

  // TODO: Optimiser avec Promise.all() ou batch requests
  for (const order of shopOrders) {
    try {
      // Récupération de l'opération 10
      const response = await client.get<IFSODataResponse<any>>(
        'OperationHandling.svc/ShopOrderOperations',
        {
          $filter: `OrderNo eq '${order.OrderNo}' and ReleaseNo eq '${order.ReleaseNo}' and SequenceNo eq '${order.SequenceNo}' and OperationNo eq 10`,
          $select: 'BlockId'
        }
      )

      const op10 = response.value?.[0]

      // Vérifier si Block ID est vide (null, undefined, ou string vide)
      if (op10 && (!op10.BlockId || op10.BlockId.trim() === '')) {
        filtered.push(order)
        console.log(`✅ [Shop Order Filter] ${order.OrderNo}-${order.ReleaseNo}-${order.SequenceNo}: OP10 Block ID vide`)
      } else {
        console.log(`⏭️ [Shop Order Filter] ${order.OrderNo}-${order.ReleaseNo}-${order.SequenceNo}: OP10 Block ID = ${op10?.BlockId || 'N/A'}`)
      }
    } catch (error) {
      console.error(`❌ [Shop Order Filter] Erreur OP10 pour ${order.OrderNo}:`, error)
      // En cas d'erreur, on continue avec les autres
    }
  }

  console.log(`✅ [Shop Order Filter] ${filtered.length}/${shopOrders.length} Shop Orders avec OP10 Block ID vide`)

  return filtered
}

/**
 * Valider les paramètres de filtrage
 * 
 * @param params - Paramètres à valider
 * @throws Error si les paramètres sont invalides
 */
export function validateFilterParams(params: ShopOrderFilterParams): void {
  if (!params.site || params.site.trim() === '') {
    throw new Error('Site is required')
  }

  if (!params.startDate || params.startDate.trim() === '') {
    throw new Error('Start date is required')
  }

  // Validation format date ISO 8601 (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (!dateRegex.test(params.startDate)) {
    throw new Error('Invalid date format. Expected YYYY-MM-DD')
  }

  // Validation date valide
  const date = new Date(params.startDate)
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date')
  }

  // Validation blockDate est un boolean
  if (typeof params.blockDate !== 'boolean') {
    throw new Error('Block date must be a boolean')
  }

  // Validation op10BlockId si fourni
  if (params.op10BlockId && !['EMPTY', 'NO_CONDITION'].includes(params.op10BlockId)) {
    throw new Error('Invalid OP10 Block ID filter. Must be "EMPTY" or "NO_CONDITION"')
  }

  console.log('✅ [Shop Order Filter] Paramètres validés')
}
