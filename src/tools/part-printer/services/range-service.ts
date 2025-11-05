/**
 * Service Range - Calcul du Range ID basé sur les plages horaires du site
 * 
 * Phase 3.3 - Extraction Range ID (version corrigée)
 * 
 * Endpoint IFS: CompanySiteHandling.svc/CompanySiteSet(Contract='XXX')/SiteMfgstdInfoArray(Contract='XXX')/SiteMfgstdRangeArray
 * 
 * Logique:
 * 1. Récupérer les plages horaires (Ranges) du site depuis IFS
 * 2. Selon l'heure actuelle (ou l'heure du Shop Order), déterminer la Range active (A, B, C, etc.)
 * 3. Calculer le quantième (jour de l'année) de la date du Shop Order
 * 4. Retourner Range ID = "Quantième Lettre" (ex: "295 A")
 * 
 * ⚠️ CORRECTION : La logique précédente utilisait CBlockDates (Débit/Redébit) pour déterminer A ou R.
 * La vraie logique utilise les plages horaires du site.
 */

import { getIFSClient } from '@/shared/services/ifs-client'
import { logger } from '../utils/logger'
import type { IFSODataResponse } from '@/shared/types/ifs'
import type { IFSSiteMfgstdRange, CalculatedRangeId } from '../types'

// Cache en mémoire pour les Ranges (évite 144 appels identiques)
const rangesCache = new Map<string, { ranges: IFSSiteMfgstdRange[], timestamp: number }>()
const CACHE_DURATION_MS = 5 * 60 * 1000 // 5 minutes

/**
 * Récupérer les plages horaires (Ranges) d'un site
 * 
 * @param site - Code du site/contract (ex: "FR017", "BDR")
 * @returns Liste des Ranges avec StartTime et FinishTime
 * 
 * @example
 * ```typescript
 * const ranges = await getSiteMfgstdRanges("FR017")
 * // [
 * //   { Contract: "FR017", Range: "A", StartTime: "00:00:00", FinishTime: "11:59:00" },
 * //   { Contract: "FR017", Range: "B", StartTime: "12:00:00", FinishTime: "23:59:00" }
 * // ]
 * ```
 */
export async function getSiteMfgstdRanges(
  site: string
): Promise<IFSSiteMfgstdRange[]> {
  // Vérifier le cache
  const cached = rangesCache.get(site)
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION_MS) {
    logger.debug(`📦 [Range Service] Using cached ranges for ${site}`)
    return cached.ranges
  }

  logger.debug(`🔍 [Range Service] Récupération des Ranges pour le site ${site}`)

  try {
    const client = getIFSClient()

    // Endpoint IFS pour récupérer les Ranges d'un site
    const endpoint = `CompanySiteHandling.svc/CompanySiteSet(Contract='${site}')/SiteMfgstdInfoArray(Contract='${site}')/SiteMfgstdRangeArray`

    const response = await client.get<IFSODataResponse<IFSSiteMfgstdRange>>(
      endpoint,
      {
        $select: 'Contract,Range,StartTime,FinishTime',
        $orderby: 'StartTime asc', // Trier par heure de début croissante
      }
    )

    const ranges = response.value || []

    // 💾 Store in cache
    rangesCache.set(site, {
      ranges,
      timestamp: Date.now()
    })

    if (ranges.length === 0) {
      logger.warn(`⚠️ [Range Service] Aucune Range trouvée pour le site ${site}`)
      return []
    }

    logger.debug(`✅ [Range Service] ${ranges.length} Ranges trouvées pour ${site} (cached for 5 min)`)
    ranges.forEach(range => {
      logger.debug(`   - Range ${range.Range}: ${range.StartTime} → ${range.FinishTime}`)
    })

    return ranges
  } catch (error) {
    logger.error(`❌ [Range Service] Erreur récupération Ranges pour ${site}:`, error)
    throw new Error(`Failed to fetch Ranges for site ${site}: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Déterminer la Range active selon l'heure donnée
 * 
 * @param ranges - Liste des Ranges du site (avec StartTime et FinishTime)
 * @param time - Heure au format "HH:mm:ss" (ex: "14:30:00")
 * @returns Range active ou null si aucune ne correspond
 * 
 * @example
 * ```typescript
 * const ranges = [
 *   { Range: "A", StartTime: "00:00:00", FinishTime: "11:59:00" },
 *   { Range: "B", StartTime: "12:00:00", FinishTime: "23:59:00" }
 * ]
 * const active = getRangeByTime(ranges, "14:30:00")
 * logger.debug(active) // { Range: "B", StartTime: "12:00:00", FinishTime: "23:59:00" }
 * ```
 */
export function getRangeByTime(
  ranges: IFSSiteMfgstdRange[],
  time: string
): IFSSiteMfgstdRange | null {
  logger.debug(`🔍 [Range Service] Recherche Range pour l'heure ${time}`)

  // Convertir l'heure en nombre pour comparaison (HH:mm:ss → HHmmss)
  const timeToNumber = (t: string): number => {
    const [hours, minutes, seconds] = t.split(':').map(Number)
    return hours * 10000 + minutes * 100 + seconds
  }

  const targetTime = timeToNumber(time)

  for (const range of ranges) {
    const startTime = timeToNumber(range.StartTime)
    const finishTime = timeToNumber(range.FinishTime)

    // Vérifier si l'heure cible est dans la plage [startTime, finishTime]
    if (targetTime >= startTime && targetTime <= finishTime) {
      logger.debug(`✅ [Range Service] Range trouvée: ${range.Range} (${range.StartTime} - ${range.FinishTime})`)
      return range
    }
  }

  logger.warn(`⚠️ [Range Service] Aucune Range trouvée pour l'heure ${time}`)
  return null
}

/**
 * Calculer le quantième (jour de l'année) d'une date
 * 
 * @param date - Date au format ISO 8601 (YYYY-MM-DD)
 * @returns Quantième (1-366)
 * 
 * @example
 * ```typescript
 * const dayOfYear = getDayOfYear("2025-10-22")
 * logger.debug(dayOfYear) // 295
 * ```
 */
export function getDayOfYear(date: string): number {
  const dateObj = new Date(date)
  const start = new Date(dateObj.getFullYear(), 0, 0)
  const diff = dateObj.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

/**
 * Obtenir l'heure actuelle au format "HH:mm:ss"
 * 
 * @returns Heure actuelle (ex: "14:30:45")
 */
export function getCurrentTime(): string {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  const seconds = now.getSeconds().toString().padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}

/**
 * Calculer le Range ID complet pour une étiquette
 * 
 * Format: "Quantième Lettre" (ex: "295 A")
 * 
 * Logique:
 * 1. Récupérer les Ranges du site depuis IFS
 * 2. Déterminer la Range active selon l'heure actuelle
 * 3. Calculer le quantième de la date du Shop Order
 * 4. Retourner "Quantième Lettre"
 * 
 * @param site - Code du site (ex: "FR017")
 * @param shopOrderDate - Date du Shop Order au format ISO (YYYY-MM-DD)
 * @param currentTime - Heure actuelle (optionnel, par défaut = maintenant)
 * @returns Range ID calculé avec détails
 * 
 * @example
 * ```typescript
 * const rangeId = await calculateRangeId("FR017", "2025-10-22")
 * logger.debug(rangeId.rangeId) // "295 A" ou "295 B" selon l'heure
 * ```
 */
export async function calculateRangeId(
  site: string,
  shopOrderDate: string,
  currentTime?: string
): Promise<CalculatedRangeId> {
  logger.debug(`🔍 [Range Service] Calcul Range ID pour ${site} le ${shopOrderDate}`)

  // 1. Récupérer les Ranges du site
  const ranges = await getSiteMfgstdRanges(site)

  if (ranges.length === 0) {
    throw new Error(`No Ranges found for site ${site}`)
  }

  // 2. Déterminer l'heure à utiliser (heure actuelle par défaut)
  const time = currentTime || getCurrentTime()
  logger.debug(`🕐 [Range Service] Heure utilisée: ${time}`)

  // 3. Trouver la Range active selon l'heure
  const activeRange = getRangeByTime(ranges, time)

  if (!activeRange) {
    throw new Error(`No active Range found for time ${time} at site ${site}`)
  }

  // 4. Calculer le quantième de la date du Shop Order
  const dayOfYear = getDayOfYear(shopOrderDate)

  // 5. Construire le Range ID
  const rangeId = `${dayOfYear} ${activeRange.Range}`

  logger.debug(`✅ [Range Service] Range ID calculé: ${rangeId}`)

  return {
    rangeId,
    dayOfYear,
    rangeLetter: activeRange.Range,
    time,
  }
}

/**
 * Récupérer le Range ID pour une étiquette (alias simplifié)
 * 
 * @param site - Code du site
 * @param shopOrderDate - Date du Shop Order
 * @param currentTime - Heure actuelle (optionnel)
 * @returns Range ID (ex: "295 A") ou null si erreur
 * 
 * @example
 * ```typescript
 * const rangeId = await getRangeId("FR017", "2025-10-22")
 * logger.debug(rangeId) // "295 A"
 * ```
 */
export async function getRangeId(
  site: string,
  shopOrderDate: string,
  currentTime?: string
): Promise<string | null> {
  try {
    const result = await calculateRangeId(site, shopOrderDate, currentTime)
    return result.rangeId
  } catch (error) {
    logger.error(`❌ [Range Service] Erreur calcul Range ID:`, error)
    return null
  }
}

/**
 * ❌ DEPRECATED - Ancienne méthode basée sur CBlockDates (Débit/Redébit)
 * 
 * Cette méthode utilisait la logique :
 * - CBlockDates = false → Range "R" (Redébit)
 * - CBlockDates = true → Range "A" (Débit classique)
 * 
 * La vraie logique utilise les plages horaires du site.
 * 
 * @deprecated Utiliser calculateRangeId() à la place
 */
export function calculateRangeIdLocal(
  date: string,
  isRecutting: boolean = false
): string {
  logger.warn('⚠️ [Range Service] calculateRangeIdLocal() est DEPRECATED - Utiliser calculateRangeId() avec les vraies plages horaires')
  
  const dayOfYear = getDayOfYear(date)
  const letter = isRecutting ? 'R' : 'A'
  return `${dayOfYear} ${letter}`
}

// ============================================================================
// Fonctions utilitaires supprimées (anciennes méthodes non pertinentes)
// ============================================================================

// ❌ getRangeBySiteAndDate() - Supprimée (logique par plages horaires)
// ❌ getRangesBySite() - Remplacée par getSiteMfgstdRanges()
// ❌ rangeExists() - Non pertinente pour la nouvelle logique

