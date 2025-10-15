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
// IFS Range
// ============================================================================

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
  blockDate: boolean                     // true = débit classique, false = redébit
  op10BlockId?: 'EMPTY' | 'NO_CONDITION' // Filtre OP10 Block ID
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
