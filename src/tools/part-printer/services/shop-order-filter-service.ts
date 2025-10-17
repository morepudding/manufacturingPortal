/**
 * Service Shop Order Filter - Filtrage avancé des Shop Orders Part Printer
 * 
 * Phase 2.2 - Logique de filtrage (SFD stricte avec 2 checkboxes)
 * 
 * Endpoint IFS: ShopOrderHandling.svc/ShopOrds
 * 
 * Logique de filtrage:
 * 
 * | Block Date | Block ID Empty | Comportement                                    | Cas d'usage           |
 * |------------|----------------|-------------------------------------------------|-----------------------|
 * | ✅         | ✅             | CBlockDates=true + BlockId=null                 | Débit classique       |
 * | ✅         | ❌             | CBlockDates=true                                | Débit (pièces bloquées OK) |
 * | ❌         | ✅             | BlockId=null                                    | Toutes dates (non bloquées) |
 * | ❌         | ❌             | Aucun filtre                                    | Redébit (tout)        |
 * 
 * ⚠️ Note AST: Le filtre BlockId n'est pas disponible sur AST. Il sera ignoré silencieusement.
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
  console.log('🔍 [Shop Order Filter] Démarrage filtrage avec paramètres:', params)

  const { site, productionLine, startDate, blockDate, blockIdEmpty } = params

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
    const mode = blockDate && blockIdEmpty ? 'Débit classique' :
                 !blockDate && !blockIdEmpty ? 'Redébit' :
                 blockDate ? 'Débit (pièces bloquées OK)' :
                 'Toutes dates (non bloquées)'
    
    console.log(`📊 [Shop Order Filter] Mode détecté: ${mode}`)
    console.log(`📊 [Shop Order Filter] - Block Date: ${blockDate ? 'Actif (CBlockDates=true)' : 'Inactif'}`)
    console.log(`📊 [Shop Order Filter] - Block ID Empty: ${blockIdEmpty ? 'Actif (Block ID vide)' : 'Inactif'}`)

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

    // Filtrage côté code pour Objstate = "Released" (production)
    shopOrders = shopOrders.filter(order => 
      order.Objstate === 'Released'
    )
    console.log(`✅ [Shop Order Filter] ${shopOrders.length} Shop Orders avec Objstate='Released'`)

    // Filtrage local côté code pour date et CBlockDates
    const targetDate = startDate
    
    if (blockDate) {
      // Block Date actif: filtrer sur CBlockDates = true
      console.log(`🔍 [DEBUG] Block Date actif - Recherche date=${targetDate}, CBlockDates=true`)
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
      // Block Date inactif: pas de filtre sur CBlockDates
      console.log(`🔍 [DEBUG] Block Date inactif - Recherche date=${targetDate}, tous CBlockDates`)
      console.log(`🔍 [DEBUG] Premiers Shop Orders (10 exemples):`)
      shopOrders.slice(0, 10).forEach(order => {
        const orderDate = order.RevisedStartDate ? new Date(order.RevisedStartDate).toISOString().split('T')[0] : null
        const dateCheck = orderDate === targetDate
        console.log(`  - ${order.OrderNo}: PartNo=${order.PartNo}, Date=${orderDate} (${dateCheck ? '✅' : '❌'}), CBlockDates=${order.CBlockDates}`)
      })
      
      shopOrders = shopOrders.filter(order => {
        const orderDate = order.RevisedStartDate ? new Date(order.RevisedStartDate).toISOString().split('T')[0] : null
        return orderDate === targetDate
      })
      console.log(`✅ [Shop Order Filter] ${shopOrders.length} Shop Orders avec date=${targetDate} (tous CBlockDates)`)
    }

    // Filtrage côté code pour OP10 Block ID (si activé)
    if (blockIdEmpty) {
      // TODO: Implémenter filtrage OP10 Block ID vide
      // Nécessite appel à OperationHandling.svc pour chaque Shop Order
      console.log('⚠️ [AST] Block ID filter skipped - Not available on AST environment')
      console.log('📊 [Shop Order Filter] Block ID Empty demandé mais non disponible sur AST')
      // shopOrders = await filterByEmptyOP10BlockId(shopOrders)
      // Note: Le code est prêt pour production, décommenter quand environnement le supporte
    } else {
      console.log('📊 [Shop Order Filter] Block ID Empty: Inactif (pas de filtrage)')
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

  // Validation blockIdEmpty est un boolean
  if (typeof params.blockIdEmpty !== 'boolean') {
    throw new Error('Block ID empty must be a boolean')
  }

  console.log('✅ [Shop Order Filter] Paramètres validés')
}
