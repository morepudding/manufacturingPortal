/**
 * Service Range - Récupération des Range IDs
 * 
 * Phase 3.3 - Extraction Range ID
 * 
 * Endpoint IFS: À DÉFINIR (RangeHandling.svc ou table Range)
 * 
 * Logique de filtrage :
 * - Site = site sélectionné
 * - date BETWEEN StartDate AND EndDate
 */

import { getIFSClient } from '@/shared/services/ifs-client'
import type { IFSODataResponse } from '@/shared/types/ifs'
import type { IFSRange, RangeResponse } from '../types'

/**
 * Récupérer le Range pour un site et une date donnés
 * 
 * @param site - Code du site/contract (ex: "BDR")
 * @param date - Date au format ISO 8601 (YYYY-MM-DD)
 * @returns Range trouvé pour le site et la date
 * 
 * @example
 * ```typescript
 * const range = await getRangeBySiteAndDate("BDR", "2025-10-13")
 * console.log("Range ID:", range.rangeId) // "285 A"
 * ```
 */
export async function getRangeBySiteAndDate(
  site: string,
  date: string
): Promise<RangeResponse> {
  console.log(`🔍 [Range Service] Récupération Range pour ${site} à la date ${date}`)

  try {
    const client = getIFSClient()

    // TODO: Remplacer par le bon endpoint IFS
    // L'endpoint exact pour Range peut varier
    // Options possibles:
    // - RangeHandling.svc/Ranges
    // - ProductionScheduleHandling.svc/Ranges
    // - CustomHandling.svc/RangeTable
    
    const response = await client.get<IFSODataResponse<IFSRange>>(
      'RangeHandling.svc/Ranges', // À VÉRIFIER
      {
        $filter: `Site eq '${site}' and StartDate le datetime'${date}T00:00:00Z' and EndDate ge datetime'${date}T00:00:00Z'`,
        $select: 'RangeId,Site,StartDate,EndDate,Description',
        $orderby: 'StartDate desc',
        $top: '1', // On veut le Range le plus récent qui correspond
      }
    )

    const range = response.value?.[0]

    if (!range) {
      console.warn(`⚠️ [Range Service] Aucun Range trouvé pour ${site} à la date ${date}`)
      throw new Error(`No Range found for site ${site} at date ${date}`)
    }

    console.log(`✅ [Range Service] Range trouvé: ${range.RangeId}`)

    return {
      rangeId: range.RangeId,
      site: range.Site,
      startDate: range.StartDate,
      endDate: range.EndDate,
    }
  } catch (error) {
    console.error(`❌ [Range Service] Erreur pour ${site} à la date ${date}:`, error)
    throw new Error(`Failed to fetch Range: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Récupérer tous les Ranges pour un site (tous les ranges actifs ou futurs)
 * 
 * @param site - Code du site/contract
 * @returns Liste des Ranges du site
 */
export async function getRangesBySite(site: string): Promise<IFSRange[]> {
  console.log(`🔍 [Range Service] Récupération de tous les Ranges pour ${site}`)

  try {
    const client = getIFSClient()

    // TODO: Remplacer par le bon endpoint IFS
    const response = await client.get<IFSODataResponse<IFSRange>>(
      'RangeHandling.svc/Ranges', // À VÉRIFIER
      {
        $filter: `Site eq '${site}'`,
        $select: 'RangeId,Site,StartDate,EndDate,Description',
        $orderby: 'StartDate desc',
      }
    )

    const ranges = response.value || []

    console.log(`✅ [Range Service] ${ranges.length} Ranges trouvés pour ${site}`)

    return ranges
  } catch (error) {
    console.error(`❌ [Range Service] Erreur récupération Ranges pour ${site}:`, error)
    throw new Error(`Failed to fetch Ranges for site ${site}`)
  }
}

/**
 * Vérifier si un Range existe pour un site et une date
 * 
 * @param site - Code du site/contract
 * @param date - Date au format ISO 8601
 * @returns true si un Range existe, false sinon
 */
export async function rangeExists(site: string, date: string): Promise<boolean> {
  try {
    await getRangeBySiteAndDate(site, date)
    return true
  } catch (error) {
    return false
  }
}

/**
 * Calculer le Range ID localement (fallback si API IFS non disponible)
 * 
 * Formule: Quantième (jour de l'année) + Lettre (R pour Redébit, A pour standard)
 * 
 * @param date - Date au format ISO 8601
 * @param isRecutting - Mode Redébit (CBlockDates = false)
 * @returns Range ID calculé (ex: "295 R")
 */
export function calculateRangeIdLocal(
  date: string,
  isRecutting: boolean = false
): string {
  const dateObj = new Date(date)
  const start = new Date(dateObj.getFullYear(), 0, 0)
  const diff = dateObj.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  const dayOfYear = Math.floor(diff / oneDay)
  const letter = isRecutting ? 'R' : 'A'
  return `${dayOfYear} ${letter}`
}

/**
 * Récupérer le Range ID pour un site et une date (avec fallback local)
 * 
 * @param site - Code du site (ex: "FR017")
 * @param date - Date au format ISO 8601
 * @param isRecutting - Mode Redébit (pour calcul local)
 * @returns Range ID (ex: "285 A") ou calculé localement
 */
export async function getRangeId(
  site: string,
  date: string,
  isRecutting: boolean = false
): Promise<string | null> {
  try {
    const range = await getRangeBySiteAndDate(site, date)
    return range.rangeId
  } catch (error) {
    console.warn(`⚠️ [Range Service] API IFS non disponible, calcul local du Range ID`)
    return calculateRangeIdLocal(date, isRecutting)
  }
}
