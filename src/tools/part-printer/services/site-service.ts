/**
 * Service Sites - Récupération des sites/contracts IFS
 * 
 * Phase 1.2 - Services IFS de base
 * 
 * Utilise CompanySiteHandling.svc/CompanySiteSet (configuré dans Azure APIM par Thomas)
 * Cet endpoint retourne tous les sites/contracts disponibles dans IFS.
 */

import { getIFSClient } from '@/shared/services/ifs-client'
import { logger } from '../utils/logger'
import type { IFSODataResponse } from '@/shared/types/ifs'
import type { IFSSite, SitesResponse } from '../types'

/**
 * Récupérer la liste de TOUS les sites/contracts IFS disponibles
 * 
 * Utilise CompanySiteHandling.svc/CompanySiteSet configuré dans Azure APIM.
 * 
 * Sites disponibles (exemple AST environnement):
 * - IT001: MONFALCONE
 * - FR020: BDX PLT LOGISTIQUE
 * - FR001: BELLEVILLE
 * - FR019: BDX TAKT LONG
 * - FR018: BDX TAKT COURT
 * - IT01A: GBI ADMIN
 * - FR013: LE POIRE
 * - FR05A: BDX ADMIN
 * - FR017: BDX AMONT
 * 
 * @returns Liste de tous les sites disponibles
 * 
 * @example
 * ```typescript
 * const sites = await getSites()
 * logger.debug("Sites disponibles:", sites.sites)
 * // [{ Contract: "FR018", Name: "BDX TAKT COURT", Description: "BDX TAKT COURT" }, ...]
 * ```
 */
export async function getSites(): Promise<SitesResponse> {
  logger.debug('🔍 [Site Service] Récupération de TOUS les sites IFS depuis CompanySiteHandling...')

  try {
    const client = getIFSClient()

    // Interface pour la réponse IFS CompanySite
    interface IFSCompanySiteResponse {
      Contract: string
      Description?: string
      Company?: string
      Country?: string
    }

    // Récupérer TOUS les sites depuis CompanySiteHandling.svc/CompanySiteSet
    // Endpoint configuré dans Azure APIM par Thomas
    const response = await client.get<IFSODataResponse<IFSCompanySiteResponse>>(
      'CompanySiteHandling.svc/CompanySiteSet',
      {
        $select: 'Contract,Description,Company,Country',
        $orderby: 'Contract asc',
      }
    )

    // Vérifier que des sites ont été retournés
    if (!response.value || response.value.length === 0) {
      logger.warn('⚠️ [Site Service] Aucun site trouvé dans IFS')
      return {
        sites: [],
        count: 0,
      }
    }

    // Convertir en format IFSSite
    const sites: IFSSite[] = response.value.map(site => ({
      Contract: site.Contract,
      Name: site.Description || `Site ${site.Contract}`,
      Description: site.Description || `Site de production ${site.Contract}`,
    }))

    logger.debug(`✅ [Site Service] ${sites.length} sites récupérés depuis IFS: ${sites.map(s => s.Contract).join(', ')}`)

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
