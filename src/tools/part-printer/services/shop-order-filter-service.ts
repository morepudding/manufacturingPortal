/**
 * Service Shop Order Filter - Filtrage avancé des Shop Orders Part Printer
 * 
 * ✅ MISE À JOUR (30 oct 2025) : Ajout filtres Block Date et Sent to Cutting System
 * ✅ MISE À JOUR (17 oct 2025) : Intégration OperationBlockId
 * 
 * Endpoint IFS: ShopOrderHandling.svc/ShopOrds
 * 
 * Nouveaux filtres (Step 5 & 6):
 * - Block Date: Enabled/Disabled + TRUE/FALSE (filtre CBlockDates)
 * - Sent to Cutting System: Enabled/Disabled + TRUE/FALSE (filtre SentToCutting)
 * 
 * Logique de filtrage:
 * 
 * | Block Date | OperationBlockId Filter | Comportement                                    | Cas d'usage           |
 * |------------|------------------------|-------------------------------------------------|-----------------------|
 * | ✅         | empty                  | CBlockDates=true + OperationBlockId=null        | Débit classique       |
 * | ✅         | not-empty              | CBlockDates=true + OperationBlockId non-null    | Débit (pièces bloquées) |
 * | ✅         | all                    | CBlockDates=true                                | Débit (toutes pièces) |
 * | ❌         | empty                  | OperationBlockId=null                           | Toutes dates (non bloquées) |
 * | ❌         | not-empty              | OperationBlockId non-null                       | Toutes dates (bloquées) |
 * | ❌         | all                    | Aucun filtre                                    | Redébit (tout)        |
 * 
 * ✅ Analyse du 17 oct 2025 : OperationBlockId disponible sur FR017 (Block IDs: B89, B92)
 */

import { getIFSClient } from '@/shared/services/ifs-client'
import { logger } from '../utils/logger'
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
 * // Débit classique (Block Date + Block ID Empty)
 * const result = await filterShopOrders({
 *   site: "BDR",
 *   startDate: "2025-10-13",
 *   blockDate: true,
 *   blockIdEmpty: true
 * })
 * 
 * // Redébit (aucun filtre)
 * const result = await filterShopOrders({
 *   site: "BDR",
 *   startDate: "2025-10-14",
 *   blockDate: false,
 *   blockIdEmpty: false
 * })
 * ```
 */
export async function filterShopOrders(
  params: ShopOrderFilterParams
): Promise<ShopOrdersFilterResponse> {
  logger.debug('🔍 [Shop Order Filter] Démarrage filtrage avec paramètres:', params)

  const { 
    site, 
    productionLine, 
    startDate, 
    blockDateEnabled, 
    blockDateValue,
    sentToCuttingEnabled,
    sentToCuttingValue,
    operationBlockIdFilter 
  } = params

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
      logger.debug(`📊 [Shop Order Filter] Ligne de production: ${productionLine}`)
    }

    // Mode pour log et filtre OData
    const mode = blockDateEnabled && blockDateValue && operationBlockIdFilter === 'empty' ? 'Débit classique' :
                 !blockDateEnabled && operationBlockIdFilter === 'all' ? 'Redébit' :
                 blockDateEnabled ? 'Débit (pièces bloquées OK)' :
                 'Toutes dates (non bloquées)'
    
    logger.debug(`📊 [Shop Order Filter] Mode détecté: ${mode}`)
    logger.debug(`📊 [Shop Order Filter] - Block Date Enabled: ${blockDateEnabled}, Value: ${blockDateValue}`)
    logger.debug(`📊 [Shop Order Filter] - Sent to Cutting Enabled: ${sentToCuttingEnabled}, Value: ${sentToCuttingValue}`)
    logger.debug(`📊 [Shop Order Filter] - OperationBlockId Filter: ${operationBlockIdFilter}`)

    const odataFilter = filters.join(' and ')
    logger.debug('🔍 [Shop Order Filter] Filtre OData:', odataFilter)

    // Requête IFS (on récupère plus large et on filtre côté code)
    // Pour le mode Redébit, on augmente $top car on doit filtrer par date côté code
    const topLimit = blockDateEnabled ? '1000' : '3000' // Plus de résultats en mode Redébit (augmenté à 3000)
    
    // Tri: pour le mode Redébit, on veut les dates les plus récentes <= aujourd'hui
    // Donc on trie par ordre DECROISSANT et on filtre côté code
    // Pour le mode Débit classique, peu importe car on filtre sur une date exacte
    const orderBy = blockDateEnabled ? 'OrderNo desc' : 'RevisedStartDate desc'
    
    const response = await client.get<IFSODataResponse<IFSShopOrderExtended>>(
      'ShopOrderHandling.svc/ShopOrds',
      {
        $filter: odataFilter,
        $select: 'OrderNo,ReleaseNo,SequenceNo,Contract,PartNo,PartDescription,Objstate,RevisedStartDate,CBlockDates,ProductionLine,SentToCuttingSystem',
        $orderby: orderBy,
        $top: topLimit
      }
    )

    let shopOrders = response.value || []

    // Filtrage côté code pour Objstate = "Released" (production)
    shopOrders = shopOrders.filter(order => 
      order.Objstate === 'Released'
    )
    logger.debug(`✅ [Shop Order Filter] ${shopOrders.length} Shop Orders avec Objstate='Released'`)

    // ✅ STEP 1: Filtrage par date (TOUJOURS actif selon SFD, sauf si Block ID spécifique)
    // Selon les specs: Start Date est mandatory et filtre toujours les Shop Orders
    // SAUF si un Block ID spécifique est renseigné
    const isSpecificBlockId = !['all', 'empty', 'not-empty'].includes(operationBlockIdFilter)
    
    if (startDate && startDate.trim() !== '') {
      const targetDate = startDate
      logger.debug(`🔍 [Shop Order Filter] Filtrage par date=${targetDate}`)
      shopOrders = shopOrders.filter(order => {
        const orderDate = order.RevisedStartDate ? new Date(order.RevisedStartDate).toISOString().split('T')[0] : null
        return orderDate === targetDate
      })
      logger.debug(`✅ [Shop Order Filter] ${shopOrders.length} Shop Orders avec date=${targetDate}`)
    } else if (isSpecificBlockId) {
      logger.debug(`🔍 [Shop Order Filter] Pas de filtrage par date (Block ID spécifique renseigné)`)
    } else {
      // Should be caught by validation, but just in case
      logger.warn(`⚠️ [Shop Order Filter] Pas de date et pas de Block ID spécifique !`)
    }

    // ✅ STEP 2: Filtrage Block Date (si enabled)
    // Ce filtre est INDÉPENDANT et filtre uniquement sur CBlockDates
    if (blockDateEnabled) {
      logger.debug(`🔍 [Shop Order Filter] Filtrage CBlockDates=${blockDateValue}`)
      shopOrders = shopOrders.filter(order => order.CBlockDates === blockDateValue)
      logger.debug(`✅ [Shop Order Filter] ${shopOrders.length} Shop Orders avec CBlockDates=${blockDateValue}`)
    } else {
      logger.debug(`📊 [Shop Order Filter] Block Date désactivé: tous les CBlockDates acceptés`)
    }

    // ✅ STEP 3: Filtrage Sent to Cutting System (si enabled)
    // Ce filtre est INDÉPENDANT et filtre uniquement sur SentToCuttingSystem
    if (sentToCuttingEnabled) {
      logger.debug(`🔍 [Shop Order Filter] Filtrage SentToCuttingSystem=${sentToCuttingValue}`)
      logger.debug(`🔍 [DEBUG] Premiers SO avant filtre (5 exemples):`, shopOrders.slice(0, 5).map(o => ({ 
        OrderNo: o.OrderNo, 
        SentToCuttingSystem: (o as any).SentToCuttingSystem 
      })))
      
      shopOrders = shopOrders.filter(order => {
        const sentValue = (order as any).SentToCuttingSystem ?? false
        return sentValue === sentToCuttingValue
      })
      
      logger.debug(`✅ [Shop Order Filter] ${shopOrders.length} Shop Orders avec SentToCuttingSystem=${sentToCuttingValue}`)
    } else {
      logger.debug(`📊 [Shop Order Filter] Sent to Cutting désactivé: tous les SentToCuttingSystem acceptés`)
    }

    // ✅ RÉACTIVÉ (17 oct 2025) : Filtrage côté code pour OperationBlockId
    if (operationBlockIdFilter !== 'all') {
      logger.debug(`� [Shop Order Filter] Filtrage par OperationBlockId: ${operationBlockIdFilter}`)
      shopOrders = await filterByOperationBlockId(shopOrders, operationBlockIdFilter)
      logger.debug(`✅ [Shop Order Filter] ${shopOrders.length} Shop Orders après filtrage OperationBlockId`)
    } else {
      logger.debug('📊 [Shop Order Filter] OperationBlockId: Tous acceptés (pas de filtrage)')
    }

    logger.debug(`✅ [Shop Order Filter] ${shopOrders.length} Shop Orders après filtrage complet`)

    return {
      shopOrders,
      count: shopOrders.length
    }
  } catch (error) {
    logger.error('❌ [Shop Order Filter] Erreur lors du filtrage:', error)
    throw new Error('Failed to filter shop orders')
  }
}

/**
 * ✅ NOUVEAU (17 oct 2025) : Filtrer par OperationBlockId (vide, non-vide, ou spécifique)
 * 
 * Utilise l'endpoint ShopOrderHandling.svc/ShopOrds/.../OperationArray
 * pour récupérer l'OP10 de chaque Shop Order et filtrer par OperationBlockId.
 * 
 * ⚠️ ATTENTION: Cette fonction nécessite un appel API pour CHAQUE Shop Order
 * Peut être lent avec beaucoup de résultats (optimisé avec Promise.all)
 * 
 * @param shopOrders - Shop Orders à filtrer
 * @param filter - 'empty', 'not-empty', ou une valeur spécifique (ex: "B89")
 * @returns Shop Orders filtrés selon OperationBlockId
 */
async function filterByOperationBlockId(
  shopOrders: IFSShopOrderExtended[],
  filter: 'empty' | 'not-empty' | string
): Promise<IFSShopOrderExtended[]> {
  logger.debug(`🔍 [Shop Order Filter] Filtrage ${shopOrders.length} Shop Orders par OperationBlockId (${filter})...`)

  const client = getIFSClient()

  // Utiliser Promise.all pour paralléliser les requêtes (plus rapide)
  const results = await Promise.all(
    shopOrders.map(async (order) => {
      try {
        // Récupération de l'opération 10 via expand
        const response = await client.get<IFSODataResponse<any>>(
          `ShopOrderHandling.svc/ShopOrds(OrderNo='${order.OrderNo}',ReleaseNo='${order.ReleaseNo}',SequenceNo='${order.SequenceNo}')/OperationArray`,
          {
            $filter: 'OperationNo eq 10',
            $select: 'OperationNo,OperationBlockId'
          }
        )

        const op10 = response.value?.[0]

        if (!op10) {
          logger.debug(`⚠️ [Shop Order Filter] ${order.OrderNo}: OP10 introuvable`)
          return null
        }

        const hasBlockId = op10.OperationBlockId && op10.OperationBlockId.trim() !== ''
        const blockIdValue = op10.OperationBlockId ? op10.OperationBlockId.trim() : ''

        // Logique de filtrage
        if (filter === 'empty') {
          if (!hasBlockId) {
            logger.debug(`✅ [Shop Order Filter] ${order.OrderNo}: OperationBlockId vide`)
            return order
          }
        } else if (filter === 'not-empty') {
          if (hasBlockId) {
            logger.debug(`✅ [Shop Order Filter] ${order.OrderNo}: OperationBlockId = ${blockIdValue}`)
            return order
          }
        } else {
          // Specific Block ID filter
          if (blockIdValue === filter) {
            logger.debug(`✅ [Shop Order Filter] ${order.OrderNo}: OperationBlockId = ${blockIdValue} (Match)`)
            return order
          }
        }
        
        // Si on arrive ici, c'est que le filtre ne correspond pas
        // logger.debug(`⏭️ [Shop Order Filter] ${order.OrderNo}: Filtré (OperationBlockId = ${blockIdValue || 'NULL'})`)
        return null
        
      } catch (error) {
        logger.error(`❌ [Shop Order Filter] Erreur OP10 pour ${order.OrderNo}:`, error)
        return null // En cas d'erreur, on exclut ce Shop Order
      }
    })
  )

  const filtered = results.filter((order): order is IFSShopOrderExtended => order !== null)

  logger.debug(`✅ [Shop Order Filter] ${filtered.length}/${shopOrders.length} Shop Orders après filtrage OperationBlockId`)

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

  // Validation blockDateEnabled et blockDateValue sont des booleans
  if (typeof params.blockDateEnabled !== 'boolean') {
    throw new Error('Block date enabled must be a boolean')
  }
  if (typeof params.blockDateValue !== 'boolean') {
    throw new Error('Block date value must be a boolean')
  }

  // Validation sentToCuttingEnabled et sentToCuttingValue sont des booleans
  if (typeof params.sentToCuttingEnabled !== 'boolean') {
    throw new Error('Sent to cutting enabled must be a boolean')
  }
  if (typeof params.sentToCuttingValue !== 'boolean') {
    throw new Error('Sent to cutting value must be a boolean')
  }

  // ✅ CORRIGÉ (17 oct 2025) : Validation operationBlockIdFilter
  // Peut être 'all', 'empty', 'not-empty' OU une chaîne spécifique (Block ID)
  if (['all', 'empty', 'not-empty'].includes(params.operationBlockIdFilter)) {
    // Valid preset
  } else if (typeof params.operationBlockIdFilter === 'string' && params.operationBlockIdFilter.trim() !== '') {
    // Valid specific Block ID
  } else {
    // Invalid
    throw new Error('OperationBlockIdFilter must be "all", "empty", "not-empty" or a specific Block ID')
  }

  // ✅ Spec: Start Date is mandatory UNLESS a specific Block ID is provided
  const isSpecificBlockId = !['all', 'empty', 'not-empty'].includes(params.operationBlockIdFilter)
  
  if (!isSpecificBlockId) {
    if (!params.startDate || params.startDate.trim() === '') {
      throw new Error('Start date is required (unless specific Block ID is provided)')
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
  }

  logger.debug('✅ [Shop Order Filter] Paramètres validés')
}
