/**
 * Service Production Lines - Récupération des lignes de production par site
 * 
 * Phase 1.2 - Services IFS de base
 * 
 * Endpoint IFS: À DÉFINIR (ProductionLineHandling.svc ou similaire)
 * 
 * TODO: Mettre à jour avec le bon endpoint IFS une fois trouvé
 */

import { getIFSClient } from '@/shared/services/ifs-client'
import { logger } from '../utils/logger'
import type { IFSODataResponse } from '@/shared/types/ifs'
import type { IFSProductionLine, IFSProductionLineRaw, ProductionLinesResponse } from '../types'

/**
 * Récupérer les lignes de production pour un site donné
 * 
 * NOTE: IFS utilise "Contract" au lieu de "Site" dans ProductionLines
 * Clé composite: (ProductionLine, Contract)
 * 
 * @param site - Le code du site/contract (ex: "BDR")
 * @returns Liste des lignes de production du site
 * 
 * @example
 * ```typescript
 * const lines = await getProductionLinesBySite("BDR")
 * logger.debug("Lignes de production BDR:", lines.productionLines)
 * // [{ LineId: "L1", Name: "Line 1", Contract: "BDR" }, ...]
 * ```
 */
export async function getProductionLinesBySite(site: string): Promise<ProductionLinesResponse> {
  logger.debug(`🔍 [Production Line Service] Récupération lignes pour site: ${site}`)

  try {
    const client = getIFSClient()

    // Récupérer toutes les production lines et filtrer localement
    // Car le champ s'appelle "Contract" et non "Site"
    const response = await client.get<IFSODataResponse<IFSProductionLineRaw>>(
      'ProductionLineHandling.svc/ProductionLines',
      {
        $select: 'ProductionLine,Description,Contract',
        $orderby: 'ProductionLine asc',
        $top: '1000' // Limite raisonnable
      }
    )

    // Filtrer localement par Contract (= site)
    const allLines = response.value || []
    const productionLines: IFSProductionLine[] = allLines
      .filter(line => line.Contract === site)
      .map(line => ({
        LineId: line.ProductionLine,
        Name: line.ProductionLine, // Description peut être null
        Site: line.Contract,
        Description: line.Description || ''
      }))

    logger.debug(`✅ [Production Line Service] ${productionLines.length} lignes trouvées pour ${site}`)

    return {
      productionLines,
      count: productionLines.length,
    }
  } catch (error) {
    logger.error(`❌ [Production Line Service] Erreur pour site ${site}:`, error)
    throw new Error(`Failed to fetch production lines for site ${site}`)
  }
}

/**
 * Récupérer toutes les lignes de production (tous sites confondus)
 * 
 * @returns Liste de toutes les lignes de production
 */
export async function getAllProductionLines(): Promise<ProductionLinesResponse> {
  logger.debug('🔍 [Production Line Service] Récupération de toutes les lignes')

  try {
    const client = getIFSClient()

    const response = await client.get<IFSODataResponse<IFSProductionLineRaw>>(
      'ProductionLineHandling.svc/ProductionLines',
      {
        $select: 'ProductionLine,Description,Contract',
        $orderby: 'Contract asc, ProductionLine asc',
        $top: '1000'
      }
    )

    const allLines = response.value || []
    const productionLines: IFSProductionLine[] = allLines.map(line => ({
      LineId: line.ProductionLine,
      Name: line.ProductionLine,
      Site: line.Contract,
      Description: line.Description || ''
    }))

    logger.debug(`✅ [Production Line Service] ${productionLines.length} lignes au total`)

    return {
      productionLines,
      count: productionLines.length,
    }
  } catch (error) {
    logger.error('❌ [Production Line Service] Erreur récupération lignes:', error)
    throw new Error('Failed to fetch all production lines')
  }
}
