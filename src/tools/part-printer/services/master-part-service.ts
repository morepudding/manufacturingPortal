/**
 * 🏭 Master Part Service
 * 
 * Service pour récupérer les informations des pièces (Master Parts) depuis IFS Cloud
 * 
 * ✅ UPDATE TEST 12 + TEST 14 (14 octobre 2025):
 * Les 3 attributs Part Printer existent dans IFS à 100% !
 * 
 * - GENERIC CODE: Calculable localement (enlever G###) ou IFS ValueText
 * - VARNISH CODE: IFS TechnicalSpecBothArray ($filter required)
 * - LENGTH SETUP: IFS ValueNo (Technical Class AN29-13-00, $filter required)
 * 
 * ⚠️ CRITIQUE: Utiliser $filter pour TechnicalSpecBothArray sur parts AN29-13-00
 * (50+ attributs) pour éviter timeouts.
 * 
 * @see /docs/tools/part-printer/TEST12_RESULTS.md - 36 parts testées (94% VARNISH)
 * @see /docs/tools/part-printer/TEST14_RESULTS.md - Part 1000014690G136 (100%)
 * @see /docs/tools/part-printer/ROADMAP.md - Phase 1.2 (100% complète)
 */

import { getIFSClient } from '@/shared/services/ifs-client'
import { logger } from '../utils/logger'

// =============================================================================
// Cache
// =============================================================================

/** Cache pour les attributs des pièces (5 minutes TTL) */
const attributesCache = new Map<string, { attributes: MasterPartAttributes, timestamp: number }>()
const CACHE_DURATION_MS = 5 * 60 * 1000 // 5 minutes

// =============================================================================
// Types
// =============================================================================

/**
 * Pièce d'inventaire IFS (InventoryPart)
 */
export interface IFSInventoryPart {
  /** Clé : Numéro de pièce */
  PartNo: string
  /** Clé : Site/Contract */
  Contract: string
  /** Description de la pièce */
  Description: string
  /** Type de pièce (Purchased, Manufactured, etc.) */
  TypeCode: string
  /** Statut (A=Active, O=Obsolete, etc.) */
  PartStatus: string
  /** Unité de mesure */
  UnitMeas: string
  /** Date de création */
  CreateDate?: string
  /** Dernière date d'activité */
  LastActivityDate?: string
  /** Engineering attribute */
  EngAttribute?: string | null
  /** Type designation */
  TypeDesignation?: string | null
}

/**
 * Attributs de pièce pour Part Printer
 * 
 * ⚠️ IMPORTANT: genericCode, lengthSetup, varnishCode ne sont PAS disponibles
 * via IFS OData. Ces champs seront null jusqu'à résolution du bloquant.
 * 
 * @see TEST3_RESULTS.md pour détails du problème
 */
export interface PartAttributes {
  /** Numéro de pièce */
  partNo: string
  /** Site/Contract */
  contract: string
  /** Description */
  description: string
  /** Type de pièce */
  typeCode: string
  /** Statut */
  partStatus: string
  /** Unité de mesure */
  unitMeas: string
  
  // ⚠️ Attributs Part Printer - NON DISPONIBLES via IFS OData
  /** ❌ Generic Code (ex: "GEN_OAK_001") - NON DISPONIBLE */
  genericCode: string | null
  /** ❌ Length Setup (ex: "2850") - NON DISPONIBLE */
  lengthSetup: string | null
  /** ❌ Varnish Code (ex: "VARN_A") - NON DISPONIBLE */
  varnishCode: string | null
  
  // Métadonnées
  /** Date de création */
  createDate?: string
  /** Dernière date d'activité */
  lastActivityDate?: string
}

// =============================================================================
// Service
// =============================================================================

export class MasterPartService {
  /**
   * Récupère une pièce par clé composite (Contract, PartNo)
   * 
   * ✅ Méthode validée - Test 2.3
   * 
   * @param contract - Site/Contract (ex: "BDR")
   * @param partNo - Numéro de pièce (ex: "LG5MA0XD02")
   * @returns Pièce trouvée ou null
   * 
   * @example
   * ```typescript
   * const part = await service.getPartByKey('BDR', 'LG5MA0XD02')
   * ```
   */
  async getPartByKey(
    contract: string,
    partNo: string
  ): Promise<IFSInventoryPart | null> {
    const client = getIFSClient()
    
    try {
      logger.debug('🔍 Récupération pièce:', { contract, partNo })
      
      const part = await client.get<IFSInventoryPart>(
        `InventoryPartHandling.svc/InventoryPartSet(Contract='${contract}',PartNo='${partNo}')`
      )
      
      logger.debug('✅ Pièce trouvée:', part.Description)
      return part
    } catch (error) {
      logger.error('❌ Pièce non trouvée:', { contract, partNo }, error)
      return null
    }
  }

  /**
   * Récupère les attributs d'une pièce pour Part Printer
   * 
   * ⚠️ ATTENTION: genericCode, lengthSetup, varnishCode sont NULL
   * car non disponibles via IFS OData (voir TEST3_RESULTS.md)
   * 
   * @param contract - Site/Contract
   * @param partNo - Numéro de pièce
   * @returns Attributs de la pièce ou null
   */
  async getPartAttributes(
    contract: string,
    partNo: string
  ): Promise<PartAttributes | null> {
    const part = await this.getPartByKey(contract, partNo)
    
    if (!part) {
      return null
    }

    return {
      partNo: part.PartNo,
      contract: part.Contract,
      description: part.Description,
      typeCode: part.TypeCode,
      partStatus: part.PartStatus,
      unitMeas: part.UnitMeas,
      
      // ⚠️ Attributs Part Printer - NON DISPONIBLES
      genericCode: null,
      lengthSetup: null,
      varnishCode: null,
      
      // Métadonnées
      createDate: part.CreateDate,
      lastActivityDate: part.LastActivityDate
    }
  }

  /**
   * Récupère plusieurs pièces par leurs clés
   * 
   * @param parts - Liste de {contract, partNo}
   * @returns Map PartNo -> PartAttributes
   */
  async getPartAttributesBatch(
    parts: Array<{ contract: string; partNo: string }>
  ): Promise<Map<string, PartAttributes>> {
    const results = new Map<string, PartAttributes>()

    // Récupérer séquentiellement (éviter rate limit)
    for (const { contract, partNo } of parts) {
      const attrs = await this.getPartAttributes(contract, partNo)
      if (attrs) {
        results.set(partNo, attrs)
      }
    }

    logger.debug(`📊 ${results.size}/${parts.length} pièces récupérées`)
    return results
  }

  /**
   * ⚠️ TODO: Méthode à implémenter quand les attributs seront disponibles
   * 
   * Options possibles:
   * 1. Base de données locale (table part_attributes)
   * 2. Service IFS custom Bénéteau
   * 3. Import manuel depuis Excel/CSV
   * 
   * @see TEST3_RESULTS.md - Action 1, 2, 3
   */
  async getCustomAttributes(
    contract: string,
    partNo: string
  ): Promise<{
    genericCode: string
    lengthSetup: string
    varnishCode: string
  } | null> {
    // TODO: Implémenter quand source de données sera identifiée
    logger.warn('⚠️ getCustomAttributes non implémenté - attributs non disponibles via IFS')
    return null
  }
}

// Export singleton
export const masterPartService = new MasterPartService()

// =============================================================================
// API Functions (Phase 3 - Post TEST 12/14)
// =============================================================================

/**
 * Attributs validés Part Printer (TEST 12 + TEST 14)
 */
export interface MasterPartAttributes {
  partNo: string
  genericCode: string           // ✅ 100% (calculable ou IFS)
  lengthSetup: string           // ✅ 100% (IFS ValueNo AN29-13-00)
  varnishCode: string           // ✅ 100% (IFS ValueText)
  engineeringPartRev: string    // ✅ IFS EngineeringPartRevisionHandling
}

/**
 * Récupérer les attributs Part Printer pour une pièce
 * 
 * ✅ Utilise le chemin OData complet découvert (TEST 15):
 * 
 * Navigation en 2 étapes:
 * 1. PartCatalogSet → PartCatalogReferenceArray (récupère TechnicalSpecNo)
 * 2. PartCatalogReferenceArray → TechnicalSpecBothArray (avec clés composites)
 * 
 * Attributs récupérés:
 * - GENERIC CODE: IFS ValueText (TechnicalClass AN29-13-00)
 * - VARNISH CODE: IFS ValueText (TechnicalClass AN29-13-00)
 * - LENGTH SETUP: IFS ValueNo (TechnicalClass AN29-13-00)
 * - Engineering Revision: EngineeringPartRevisionHandling (si disponible)
 * 
 * @param partNo - Numéro de pièce (ex: "1000014690G136")
 * @returns Attributs Part Printer
 * 
 * @example
 * ```typescript
 * const attrs = await getMasterPartAttributes("1000014690G136")
 * logger.debug(attrs.genericCode)      // "1000014690"
 * logger.debug(attrs.lengthSetup)      // "1.904"
 * logger.debug(attrs.varnishCode)      // "RCTV1210"
 * ```
 * 
 * @see TEST 15 - Chemin OData complet validé (15 octobre 2025)
 */
export async function getMasterPartAttributes(
  partNo: string
): Promise<MasterPartAttributes> {
  // 💾 Check cache first
  const cached = attributesCache.get(partNo)
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION_MS) {
    logger.debug(`📦 [Master Part] Using cached attributes for ${partNo}`)
    return cached.attributes
  }

  logger.debug(`🔍 [Master Part] Récupération attributs pour ${partNo}`)

  const client = getIFSClient()

  try {
    // ---------------------------------------------------------------------------
    // ÉTAPE 1: Récupérer TechnicalSpecNo depuis PartCatalogReferenceArray
    // ---------------------------------------------------------------------------
    const refArrayResponse = await client.get<{
      value: Array<{
        LuName: string
        KeyRef: string
        TechnicalSpecNo: string
      }>
    }>(
      `PartHandling.svc/PartCatalogSet(PartNo='${partNo}')/PartCatalogReferenceArray`,
      {
        $select: 'LuName,KeyRef,TechnicalSpecNo'
      }
    )

    if (!refArrayResponse.value || refArrayResponse.value.length === 0) {
      logger.warn(`⚠️ [Master Part] Aucune référence technique trouvée pour ${partNo}`)
      throw new Error(`No technical reference found for part ${partNo}`)
    }

    const firstRef = refArrayResponse.value[0]
    const encodedKeyRef = encodeURIComponent(firstRef.KeyRef)
    const technicalSpecNo = firstRef.TechnicalSpecNo

    logger.debug(`  ✅ TechnicalSpecNo: ${technicalSpecNo}`)

    // ---------------------------------------------------------------------------
    // ÉTAPE 2: Accéder TechnicalSpecBothArray avec chemin complet
    // ---------------------------------------------------------------------------
    const fullPath = `PartHandling.svc/PartCatalogSet(PartNo='${partNo}')/PartCatalogReferenceArray(LuName='${firstRef.LuName}',KeyRef='${encodedKeyRef}',TechnicalSpecNo=${technicalSpecNo})/TechnicalSpecBothArray`

    // Récupérer les 3 attributs en parallèle
    const [genericResponse, varnishResponse, lengthResponse] = await Promise.all([
      // GENERIC CODE
      client.get<{
        value: Array<{ ValueText: string | null }>
      }>(fullPath, {
        $filter: "Attribute eq 'GENERIC CODE'",
        $select: 'ValueText'
      }).catch(() => ({ value: [] })),

      // VARNISH CODE
      client.get<{
        value: Array<{ ValueText: string | null }>
      }>(fullPath, {
        $filter: "Attribute eq 'VARNISH CODE'",
        $select: 'ValueText'
      }).catch(() => ({ value: [] })),

      // LENGTH SETUP
      client.get<{
        value: Array<{ ValueNo: number | null }>
      }>(fullPath, {
        $filter: "Attribute eq 'LENGTH SETUP'",
        $select: 'ValueNo'
      }).catch(() => ({ value: [] }))
    ])

    // Extraire les valeurs
    // ✅ CORRECTION: Generic Code doit être le Part No COMPLET (avec G### si applicable)
    // Si IFS retourne un Generic Code sans G###, on utilise le Part No complet
    // Exemple: IFS retourne "C000001026112" → on veut "C000001026112G110"
    const ifsGenericCode = genericResponse.value[0]?.ValueText
    const genericCode = (ifsGenericCode && partNo.startsWith(ifsGenericCode)) 
      ? partNo  // Utiliser le Part No complet (avec G###)
      : (ifsGenericCode || partNo) // Sinon utiliser la valeur IFS ou le Part No
    
    const varnishCode = varnishResponse.value[0]?.ValueText || 'N/A'
    const lengthSetup = lengthResponse.value[0]?.ValueNo?.toString() || 'N/A'

    logger.debug(`  ✅ GENERIC CODE: ${genericCode}`)
    logger.debug(`  ✅ VARNISH CODE: ${varnishCode}`)
    logger.debug(`  ✅ LENGTH SETUP: ${lengthSetup}`)

    // ---------------------------------------------------------------------------
    // ÉTAPE 3: Engineering Part Revision
    // ---------------------------------------------------------------------------
    // ✅ CORRECTION: Utiliser EngPartRevisionSet avec clé composite (PartNo, PartRev)
    // Pour Shop Order 463215, Generic Part: C000001026112G110, Revision attendue: A
    let engineeringPartRev = 'N/A'
    try {
      // Essayer d'abord avec la révision 'A' (la plus courante)
      const revResponse = await client.get<{
        value: Array<{ PartNo: string; PartRev: string; Description: string }>
      }>(
        `EngineeringPartRevisionsHandling.svc/EngPartRevisionSet`,
        {
          $filter: `PartNo eq '${partNo}'`,
          $select: 'PartNo,PartRev,Description',
          $orderby: 'PartRev desc', // Prendre la révision la plus récente
          $top: '1'
        }
      )

      if (revResponse.value && revResponse.value.length > 0) {
        engineeringPartRev = revResponse.value[0].PartRev || 'N/A'
        logger.debug(`  ✅ ENGINEERING REV: ${engineeringPartRev} (${revResponse.value[0].Description || 'N/A'})`)
      } else {
        logger.warn(`  ⚠️ ENGINEERING REV: Aucune révision trouvée pour ${partNo}`)
      }
    } catch (error) {
      logger.warn(`  ⚠️ ENGINEERING REV: Non disponible (${error instanceof Error ? error.message : 'Unknown'})`)
    }

    const attributes: MasterPartAttributes = {
      partNo,
      genericCode,
      lengthSetup,
      varnishCode,
      engineeringPartRev
    }

    // 💾 Store in cache
    attributesCache.set(partNo, {
      attributes,
      timestamp: Date.now()
    })

    logger.debug(`✅ [Master Part] Attributs récupérés avec succès (cached for 5 min)`)

    return attributes
  } catch (error) {
    logger.error(`❌ [Master Part] Erreur récupération attributs:`, error)
    throw new Error(`Failed to get master part attributes: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
