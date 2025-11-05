/**
 * Types TypeScript pour l'intégration IFS Cloud OData API
 * 
 * Documentation:
 * - ShopOrderHandling.svc/ShopOrds
 * - DopHeaderHandling.svc/Reference_DopHeadSerialReserv
 * - PrintDialog.svc (Printers & Languages)
 */

// ===== Réponses OAuth2 =====

/**
 * Réponse du serveur OAuth2 IFS lors de l'obtention d'un token
 */
export interface IFSToken {
  access_token: string
  token_type: string
  expires_in: number
  scope?: string
}

// ===== Réponses OData =====

/**
 * Structure générique d'une réponse OData IFS
 */
export interface IFSODataResponse<T> {
  '@odata.context': string
  value: T[]
}

// ===== Shop Order =====

/**
 * Shop Order (Ordre de fabrication) depuis ShopOrderHandling.svc/ShopOrds
 * 
 * Champs disponibles validés:
 * - OrderNo, ReleaseNo, SequenceNo (clés primaires)
 * - DopId (lien vers DOP Header)
 * - PartNo, PartDescription
 * - Contract (site de production)
 * - CustomerOrderNo, CustomerLineNo (lien vers Customer Order)
 */
export interface IFSShopOrder {
  OrderNo: string
  ReleaseNo: string
  SequenceNo: string
  DopId: string | null
  PartNo: string
  PartDescription: string
  Contract: string
  CustomerOrderNo?: string | null
  CustomerLineNo?: string | null
  // Autres champs disponibles mais non utilisés:
  // RowState, Objstate, Objkey, etc.
}

// ===== DOP Header & Serial Number =====

/**
 * Serial Number Reservation depuis DopHeaderHandling.svc/Reference_DopHeadSerialReserv
 * 
 * Champs disponibles validés:
 * - DopId (ID du DOP Header)
 * - SerialNo (numéro de série du bateau)
 * - PartNo (référence article)
 * - SerialSource (origine: "Shop Order", etc.)
 */
export interface DopHeadSerialReservation {
  DopId: string
  SerialNo: string
  PartNo: string
  ConditionCode: string | null
  SerialSourceDb: string
  SerialSource: string
  luname?: string
  keyref?: string
}

// ===== Paramètres de recherche =====

/**
 * Paramètres de recherche d'un Shop Order
 * 
 * Usage:
 * - orderNo: numéro d'ordre (ex: "563", "97277")
 * - releaseNo: numéro de release (ex: "1" ou "*" pour tous)
 * - sequenceNo: numéro de séquence (ex: "10" ou "*" pour tous)
 */
export interface ShopOrderSearchParams {
  orderNo: string
  releaseNo: string
  sequenceNo: string
}

// ===== Résultats enrichis =====

/**
 * Résultat de la recherche d'un Shop Order avec Serial Number
 * 
 * Contient le Shop Order + Serial Number récupéré via le DOP
 */
export interface ShopOrderSearchResult {
  shopOrder: IFSShopOrder
  found: boolean
  serialNumber?: string | null
  dopHeaderId?: string | null
  error?: string
}

// ===== Configuration IFS Client =====

/**
 * Configuration du client IFS OAuth2
 * 
 * Variables d'environnement requises:
 * - IFS_CLIENT_ID
 * - IFS_CLIENT_SECRET
 * - IFS_TOKEN_URL
 * - IFS_BASE_URL
 * - IFS_SCOPE
 */
export interface IFSClientConfig {
  clientId: string
  clientSecret: string
  tokenUrl: string
  baseUrl: string
  scope: string
}
