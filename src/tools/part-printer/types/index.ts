/**
 * Types TypeScript pour Part Printer
 * 
 * Phase 1.3 - Types & Interfaces
 */

// ============================================================================
// IFS Site (Contract)
// ============================================================================

export interface IFSSite {
  Contract: string          // "BDR", "PRTBX", etc.
  Name: string             // Nom du site
  Description?: string     // Description optionnelle
  // Ajouter d'autres champs selon l'API IFS
}

// ============================================================================
// IFS Production Line
// ============================================================================

// Structure réelle IFS (clé composite)
export interface IFSProductionLineRaw {
  ProductionLine: string   // Clé primaire: ID de la ligne
  Contract: string         // Clé primaire: Site/Contract
  Description?: string     // Description optionnelle
  // Autres champs IFS disponibles mais non utilisés pour l'instant
}

// Structure normalisée pour l'application
export interface IFSProductionLine {
  LineId: string           // "L1", "L2", etc.
  Name: string             // Nom de la ligne (= LineId si pas de Description)
  Site: string             // Contract/Site associé
  Description?: string     // Description optionnelle
  // Ajouter d'autres champs selon l'API IFS
}

// ============================================================================
// IFS Shop Order Extended (avec données OP10, Block ID, etc.)
// ============================================================================

export interface IFSShopOrderExtended {
  // Clés Shop Order
  OrderNo: string
  ReleaseNo: string
  SequenceNo: string
  
  // Informations générales
  Contract: string
  PartNo: string
  PartDescription?: string
  Objstate: string               // État (Released, Started, Closed, etc) - IFS utilise "Objstate"
  RevisedStartDate: string       // Date de début planifiée (ISO datetime) - IFS utilise "RevisedStartDate"
  CBlockDates?: boolean          // true = débit classique, false = redébit - IFS utilise "CBlockDates"
  ProductionLine?: string        // Ligne de production (ex: "CP", "M5")
  
  // Données Operation 10 (à enrichir après requête)
  OperationNo?: number
  BlockId?: string
  RawMaterial?: string           // Part code de la première ligne de composant liée à OP10
}

// ============================================================================
// IFS Master Part (avec attributs)
// ============================================================================

export interface IFSMasterPart {
  PartNo: string
  Description?: string
  
  // Attributs spécifiques Part Printer
  GenericCode?: string       // Attribut IFS "GENERIC CODE"
  LengthSetup?: string       // Attribut IFS "LENGTH SETUP" (en mm)
  VarnishCode?: string       // Attribut IFS "VARNISH CODE"
  EngineeringPartRev?: string // Dernière révision active
  
  // Ajouter d'autres attributs selon besoins
}

// ============================================================================
// IFS Range (Plages horaires par site)
// ============================================================================

/**
 * Range IFS avec plages horaires
 * Endpoint: CompanySiteHandling.svc/CompanySiteSet(Contract='XXX')/SiteMfgstdInfoArray(Contract='XXX')/SiteMfgstdRangeArray
 * 
 * Exemple de données IFS:
 * - Contract: "FR017"
 * - Range: "A"
 * - StartTime: "00:00:00"
 * - FinishTime: "11:59:00"
 * 
 * - Contract: "FR017"
 * - Range: "B"
 * - StartTime: "12:00:00"
 * - FinishTime: "23:59:00"
 */
export interface IFSSiteMfgstdRange {
  Contract: string           // Code du site (ex: "FR017", "BDR")
  Range: string              // Lettre de la Range (ex: "A", "B", "C", "R")
  StartTime: string          // Heure de début au format "HH:mm:ss" (ex: "00:00:00")
  FinishTime: string         // Heure de fin au format "HH:mm:ss" (ex: "11:59:00")
  '@odata.etag'?: string
  '@odata.type'?: string
  '@odata.id'?: string
  luname?: string
  keyref?: string
  Objgrants?: string | null
}

/**
 * Range ID calculé pour une étiquette
 * Format: "Quantième Lettre" (ex: "295 A")
 */
export interface CalculatedRangeId {
  rangeId: string            // Range ID complet (ex: "295 A")
  dayOfYear: number          // Quantième (jour de l'année)
  rangeLetter: string        // Lettre de la Range (A, B, C, R, etc.)
  time: string               // Heure utilisée pour le calcul (HH:mm:ss)
}

/**
 * Ancien type IFSRange (deprecated - conservé pour rétrocompatibilité)
 * @deprecated Utiliser IFSSiteMfgstdRange et CalculatedRangeId à la place
 */
export interface IFSRange {
  RangeId: string           // "285 A", etc.
  Site: string              // Contract
  StartDate: string         // ISO date
  EndDate: string           // ISO date
  Description?: string
  // Ajouter d'autres champs selon l'API IFS
}

// ============================================================================
// Part Label (données consolidées pour étiquette)
// ============================================================================

export interface PartLabel {
  // Shop Order
  orderNo: string
  releaseNo: string
  sequenceNo: string
  partNo: string
  startDate: string         // ISO date
  
  // Operation 10
  rawMaterial: string       // Part code de la matière première
  
  // ⚠️ TEMPORAIRE (AST/Dev) : opId utilisé comme fallback pour Block ID
  // TODO PRODUCTION : Utiliser uniquement blockId quand disponible en PROD
  opId: string              // Operation ID (unique identifier) - Utilisé temporairement en AST
  
  // ⚠️ TEMPORAIRE (AST/Dev) : blockId peut être null ou OpId
  // TODO PRODUCTION : Remplacer par le vrai OP 10 Block ID quand disponible en PROD
  // En AST (Dev), le Block ID n'est pas disponible dans OperationBlockId
  blockId: string | null    // Block ID de l'opération 10 (peut être null - valeur valide)
  
  // Master Part
  genericCode: string
  lengthSetup: string       // en mm
  varnishCode: string
  engineeringPartRev: string
  
  // Range
  rangeId: string           // ex: "285 A"
  
  // Barcode
  barcode: string           // Base64 image ou URL
}

// ============================================================================
// Filtres Shop Order Part Printer
// ============================================================================

export interface ShopOrderFilterParams {
  site: string                           // Required: "BDR", "PRTBX", etc.
  productionLine?: string                // Optional: "L1", "L2", etc.
  startDate: string                      // Required: ISO date
  blockDate: boolean                     // true = filtre CBlockDates=true, false = pas de filtre
  blockIdEmpty: boolean                  // true = filtre BlockId vide, false = pas de filtre
  // Note: op10BlockId deprecated, remplacé par blockIdEmpty (SFD stricte)
}

// ============================================================================
// Réponses API
// ============================================================================

export interface SitesResponse {
  sites: IFSSite[]
  count: number
}

export interface ProductionLinesResponse {
  productionLines: IFSProductionLine[]
  count: number
}

export interface ShopOrdersFilterResponse {
  shopOrders: IFSShopOrderExtended[]
  count: number
}

export interface MasterPartAttributesResponse {
  partNo: string
  genericCode: string
  lengthSetup: string
  varnishCode: string
  engineeringPartRev: string
}

export interface RangeResponse {
  rangeId: string
  site: string
  startDate: string
  endDate: string
}
