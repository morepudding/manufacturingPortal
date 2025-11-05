/**
 * Service Sites - Récupération des sites/contracts IFS
 * 
 * Phase 1.2 - Services IFS de base
 * 
 * NOTE: Utilise CompanySiteHandling.svc/CompanySiteSet pour lister TOUS les sites disponibles.
 */

import { getIFSClient } from '@/shared/services/ifs-client'
import { logger } from '../utils/logger'
import type { IFSODataResponse } from '@/shared/types/ifs'
import type { IFSSite, SitesResponse } from '../types'

interface IFSCompanySite {
  Contract: string
  Company: string
  Description?: string
}

/**
 * Récupérer la liste de TOUS les sites/contracts IFS
 * 
 * NOTE: Utilise CompanySiteHandling.svc/CompanySiteSet pour récupérer tous les sites
 * 
 * @returns Liste de tous les sites disponibles
 * 
 * @example
 * ```typescript
 * const sites = await getSites()
 * logger.debug("Sites disponibles:", sites.sites)
 * // [{ Contract: "FR018", Name: "BDX TAKT COURT" }, ...]
 * ```
 */
export async function getSites(): Promise<SitesResponse> {
  logger.debug('🔍 [Site Service] Récupération de TOUS les sites IFS...')

  try {
    const client = getIFSClient()

    // Utiliser CompanySiteHandling pour avoir TOUS les sites
    const response = await client.get<IFSODataResponse<IFSCompanySite>>(
      'CompanySiteHandling.svc/CompanySiteSet',
      {
        $select: 'Contract,Company,Description',
      }
    )

    // Convertir en format IFSSite
    const sites: IFSSite[] = (response.value || [])
      .map(site => ({
        Contract: site.Contract,
        Name: site.Description || `Site ${site.Contract}`,
        Description: site.Description || `Site de production ${site.Contract}`,
      }))
      .sort((a, b) => a.Contract.localeCompare(b.Contract))

    logger.debug(`✅ [Site Service] ${sites.length} sites récupérés: ${sites.map(s => s.Contract).join(', ')}`)

    return {
      sites,
      count: sites.length,
    }
  } catch (error) {
    logger.error('❌ [Site Service] Erreur lors de la récupération des sites:', error)
    throw new Error('Failed to fetch sites from IFS')
  }
}

/**
 * Récupérer un site spécifique par son Contract
 * 
 * @param contract - Le code du contract/site (ex: "BDR")
 * @returns Le site trouvé ou null
 */
export async function getSiteByContract(contract: string): Promise<IFSSite | null> {
  logger.debug(`🔍 [Site Service] Recherche du site: ${contract}`)

  try {
    const { sites } = await getSites()
    const site = sites.find(s => s.Contract === contract) || null

    if (site) {
      logger.debug(`✅ [Site Service] Site trouvé: ${site.Name}`)
    } else {
      logger.debug(`⚠️ [Site Service] Site non trouvé: ${contract}`)
    }

    return site
  } catch (error) {
    logger.error(`❌ [Site Service] Erreur lors de la recherche du site ${contract}:`, error)
    throw new Error(`Failed to fetch site ${contract} from IFS`)
  }
}
