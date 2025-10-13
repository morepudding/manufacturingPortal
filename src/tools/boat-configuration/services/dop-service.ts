/**
 * Service DOP (Document Order Processing) - Gestion des DOP Headers
 * 
 * Fonctionnalités:
 * - Parsing des DOP IDs composés ("54 - 1035" → "54")
 * - Extraction du DOP Header ID principal
 * 
 * Contexte:
 * Les Shop Orders IFS retournent souvent des DOP IDs composés comme:
 * - "37 - 2" → On veut "37"
 * - "54 - 1035" → On veut "54"
 * - "95 - 10088" → On veut "95"
 * 
 * Le service DopHeaderHandling.svc/Reference_DopHeadSerialReserv
 * n'a que le DOP ID principal, donc ce parsing est crucial.
 */

/**
 * Extraire le DOP Header ID principal depuis un DopId potentiellement composé
 * 
 * @param dopId - DOP ID brut (ex: "54 - 1035", "103", "37 - 2")
 * @returns DOP ID principal (ex: "54", "103", "37")
 * 
 * @example
 * ```typescript
 * extractMainDopId("54 - 1035")  // → "54"
 * extractMainDopId("103")         // → "103"
 * extractMainDopId("37 - 2")     // → "37"
 * extractMainDopId("  95 - 10088  ")  // → "95"
 * ```
 */
export function extractMainDopId(dopId: string): string {
  if (!dopId) {
    console.warn('⚠️ extractMainDopId: Empty DOP ID provided')
    return ''
  }

  // Nettoyer les espaces et extraire le premier nombre
  // Exemples:
  // - "54 - 1035" → split(' ') → ["54", "-", "1035"] → premier élément → "54"
  // - "37-2" → split(' ') → ["37-2"] → split('-') → ["37", "2"] → premier élément → "37"
  // - "103" → split(' ') → ["103"] → premier élément → "103"
  const mainId = dopId.trim().split(' ')[0].split('-')[0].trim()

  console.log(`📋 DOP ID parsing: "${dopId}" → "${mainId}"`)

  return mainId
}

/**
 * Vérifier si un DOP ID est composite (contient un séparateur)
 * 
 * @param dopId - DOP ID à vérifier
 * @returns true si le DOP ID est composite, false sinon
 * 
 * @example
 * ```typescript
 * isCompositeDopId("54 - 1035")  // → true
 * isCompositeDopId("103")         // → false
 * isCompositeDopId("37 - 2")     // → true
 * ```
 */
export function isCompositeDopId(dopId: string): boolean {
  if (!dopId) return false
  return dopId.includes('-') || dopId.includes(' - ')
}

/**
 * Parser un DOP ID composite et retourner ses parties
 * 
 * @param dopId - DOP ID composite (ex: "54 - 1035")
 * @returns Objet avec mainId et secondaryId
 * 
 * @example
 * ```typescript
 * parseDopId("54 - 1035")
 * // → { mainId: "54", secondaryId: "1035", isComposite: true }
 * 
 * parseDopId("103")
 * // → { mainId: "103", secondaryId: null, isComposite: false }
 * ```
 */
export function parseDopId(dopId: string): {
  mainId: string
  secondaryId: string | null
  isComposite: boolean
} {
  if (!dopId) {
    return {
      mainId: '',
      secondaryId: null,
      isComposite: false,
    }
  }

  const trimmed = dopId.trim()
  const isComposite = isCompositeDopId(trimmed)

  if (!isComposite) {
    return {
      mainId: trimmed,
      secondaryId: null,
      isComposite: false,
    }
  }

  // Parser le format "XX - YYYY" ou "XX-YYYY"
  const parts = trimmed.split(/\s*-\s*/)
  
  return {
    mainId: parts[0].trim(),
    secondaryId: parts[1]?.trim() || null,
    isComposite: true,
  }
}
