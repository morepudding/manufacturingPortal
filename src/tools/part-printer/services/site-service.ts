/**
 * Service Sites - Récupération des sites/contracts IFS
 * 
 * Phase 1.2 - Services IFS de base
 * 
 * NOTE: IFS n'a pas d'endpoint dédié pour les sites/contracts.
 * On récupère les contracts distincts depuis les Shop Orders.
 */

import { getIFSClient } from '@/shared/services/ifs-client'
import type { IFSODataResponse } from '@/shared/types/ifs'
import type { IFSSite, SitesResponse } from '../types'

/**
 * Récupérer la liste des sites/contracts IFS depuis les Shop Orders
 * 
 * NOTE: Utilise ShopOrderHandling.svc/ShopOrds pour extraire les contracts distincts
 * 
 * @returns Liste des sites disponibles
 * 
 * @example
 * ```typescript
 * const sites = await getSites()
 * console.log("Sites disponibles:", sites.sites)
 * // [{ Contract: "BDR", Name: "Site BDR" }, ...]
 * ```
 */
export async function getSites(): Promise<SitesResponse> {
  console.log('🔍 [Site Service] Récupération des sites IFS depuis Shop Orders...')

  try {
    const client = getIFSClient()

    // Récupérer un échantillon de Shop Orders pour extraire les contracts
    const response = await client.get<IFSODataResponse<{ Contract: string }>>(
      'ShopOrderHandling.svc/ShopOrds',
      {
        $select: 'Contract',
        $top: '1000', // Échantillon large pour capturer tous les contracts
      }
    )

    // Extraire les contracts uniques
    const contractsSet = new Set<string>()
    response.value?.forEach(order => {
      if (order.Contract) {
        contractsSet.add(order.Contract)
      }
    })

    // Convertir en format IFSSite
    const sites: IFSSite[] = Array.from(contractsSet)
      .sort()
      .map(contract => ({
        Contract: contract,
        Name: `Site ${contract}`,
        Description: `Site de production ${contract}`,
      }))

    console.log(`✅ [Site Service] ${sites.length} sites uniques récupérés: ${Array.from(contractsSet).join(', ')}`)

    return {
      sites,
      count: sites.length,
    }
  } catch (error) {
    console.error('❌ [Site Service] Erreur lors de la récupération des sites:', error)
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
  console.log(`🔍 [Site Service] Recherche du site: ${contract}`)

  try {
    const { sites } = await getSites()
    const site = sites.find(s => s.Contract === contract) || null

    if (site) {
      console.log(`✅ [Site Service] Site trouvé: ${site.Name}`)
    } else {
      console.log(`⚠️ [Site Service] Site non trouvé: ${contract}`)
    }

    return site
  } catch (error) {
    console.error(`❌ [Site Service] Erreur lors de la recherche du site ${contract}:`, error)
    throw new Error(`Failed to fetch site ${contract} from IFS`)
  }
}
