/**
 * Types TypeScript pour le système d'impression IFS
 * 
 * Workflow:
 * 1. Customer Order → PrintResultKey
 * 2. PrintDialogInit
 * 3. ReportPrintRequest
 * 4. PDF Download (optionnel)
 */

// ===== Requête d'impression =====

/**
 * Paramètres pour une requête d'impression
 */
export interface PrintRequest {
  /** Numéro de Customer Order (ex: "C1000038587") */
  orderNo: string
  
  /** ID du rapport IFS (ex: "CUSTOMER_ORDER_CONF_REP" ou "MA_FO_CR_1419") */
  reportId: string
  
  /** ID de l'imprimante (ex: "PDF_PRINTER", "PRTMNF012") */
  printerId: string
  
  /** Code langue (ex: "fr", "en", "da") */
  languageCode: string
  
  /** Nombre de copies (par défaut: 1) */
  copies?: number
  
  /** Layout personnalisé (optionnel, ex: "BEN_COrderConfirmation-BAT.rdl") */
  layoutName?: string
  
  /** Si true, télécharge le PDF généré */
  downloadPdf?: boolean
}

// ===== Résultat d'impression =====

/**
 * Résultat d'une impression
 */
export interface PrintResult {
  /** Succès de l'impression */
  success: boolean
  
  /** ResultKey IFS (pour tracer l'impression) */
  resultKey: number
  
  /** Titre du rapport */
  reportTitle: string
  
  /** Nom du layout utilisé */
  layoutName: string
  
  /** Informations sur le PDF (si downloadPdf=true) */
  pdfInfo?: {
    /** Nom du fichier PDF */
    fileName: string
    
    /** Taille du PDF en octets */
    size: number
    
    /** Date de création */
    created: string
    
    /** ID dans l'archive IFS */
    id: string
  }
  
  /** Blob du PDF (si downloadPdf=true, côté client uniquement) */
  pdfBlob?: Blob
}

// ===== Réponses IFS API =====

/**
 * Réponse de CustomerOrder_PrintResultKey
 */
export interface IFSPrintResultKeyResponse {
  value: string  // ResultKey en string (ex: "558558")
}

/**
 * Réponse de PrintDialogInit
 */
export interface IFSPrintDialogInitResponse {
  ResultKey: number
  LayoutName: string
  ReportTitle: string
  ReportId: string
  LanguageCode: string
  LogicalPrinter: string
  // Autres champs disponibles...
}

/**
 * Entrée dans PdfArchiveSet
 */
export interface IFSPdfArchiveInfo {
  ResultKey: number
  Id: string  // GUID
  FileName: string
  PdfSize: number
  Created: string
  // Autres champs...
}

/**
 * Réponse OData pour PdfArchiveSet
 */
export interface IFSPdfArchiveResponse {
  '@odata.context': string
  value: IFSPdfArchiveInfo[]
}

// ===== Customer Order (pour l'impression) =====

/**
 * Customer Order minimal pour l'impression
 */
export interface IFSCustomerOrder {
  OrderNo: string
  '@odata.etag'?: string
  // Autres champs disponibles mais non nécessaires pour l'impression
}

/**
 * Réponse OData pour un Customer Order unique
 */
export interface IFSCustomerOrderResponse extends IFSCustomerOrder {
  '@odata.context': string
  '@odata.etag': string
}
