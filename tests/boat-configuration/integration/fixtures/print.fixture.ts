/**
 * Print Dialog Fixtures - Données de fallback (401 JWT sur APIM)
 * 
 * Source: Données validées dans tests unitaires (Phase 2)
 * Date: 2025-11-12
 * 
 * ⚠️ Ces fixtures sont basées sur des données de test validées car l'endpoint
 * PrintDialog.svc retourne 401 JWT via Azure APIM AST
 * 
 * TODO: Mettre à jour avec vraies données quand l'endpoint sera accessible
 */

export interface IFSPrinter {
  LogicalPrinterId: string
  Description: string
  PrinterType: string
  PhysicalPrinterId: string
}

export interface IFSLanguage {
  LanguageCode: string
  Description: string
}

export interface IFSPrintLayout {
  ResultKey: number
  LayoutName: string
  ReportId: string
}

export interface IFSPrintJob {
  PrintJobId: number
  InstanceAttr: string
  ResultKey: number
}

/**
 * Imprimantes disponibles
 */
/** Languages available (moved below to use real captured samples) */

/**
 * Print Layout Search Result
 */
export const PRINT_LAYOUT_BOAT_CONFIG: IFSPrintLayout = {
  ResultKey: 12345,
  LayoutName: 'BOAT_CONFIG_LAYOUT',
  ReportId: 'BOAT_CONFIG_REPORT'
}

/**
 * Print Job Created
 */
export const PRINT_JOB_EXAMPLE: IFSPrintJob = {
  PrintJobId: 67890,
  InstanceAttr: 'REPORT_ID=BOAT_CONFIG_REPORT^RESULT_KEY=12345^',
  ResultKey: 12345
}

/**
 * PDF Download Result (Base64)
 */
export const PDF_BASE64_EXAMPLE = 'JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFsgMyAwIFIgXQovQ291bnQgMQo+PgplbmRvYmoKMyAwIG9iago8PAovVHlwZSAvUGFnZQovUGFyZW50IDIgMCBSCi9NZWRpYUJveCBbIDAgMCA1OTUgODQyIF0KL0NvbnRlbnRzIDQgMCBSCj4+CmVuZG9iago0IDAgb2JqCjw8Ci9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgoxMDAgNzAwIFRkCihIZWxsbyBXb3JsZCEpIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDUKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDAwNzQgMDAwMDAgbiAKMDAwMDAwMDEzMyAwMDAwMCBuIAowMDAwMDAwMjQxIDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNQovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKMzMzCiUlRU9G'

/**
 * Helper: Récupérer une imprimante par ID
 */
export function getPrinterById(printerId: string): IFSPrinter | null {
  return ALL_PRINTERS.find(p => p.LogicalPrinterId === printerId) || null
}

/**
 * Helper: Récupérer une langue par code
 */
export function getLanguageByCode(languageCode: string): IFSLanguage | null {
  return ALL_LANGUAGES.find(l => l.LanguageCode === languageCode) || null
}

/**
 * Printers (real sample captured via direct IFS)
 */
export const PRINTER_SEND_XML: IFSPrinter = {
  LogicalPrinterId: 'SEND_XML_TO_CONNECT',
  Description: 'Send XML to Connect',
  PrinterType: 'XML',
  PhysicalPrinterId: 'CONNECT_001'
}

export const PRINTER_SEND_FULL_XML: IFSPrinter = {
  LogicalPrinterId: 'SEND_FULL_XML_TO_CONNECT',
  Description: 'Send full XML to Connect',
  PrinterType: 'XML',
  PhysicalPrinterId: 'CONNECT_002'
}

export const PRINTER_SEND_TO_CONNECT: IFSPrinter = {
  LogicalPrinterId: 'SEND_TO_CONNECT',
  Description: 'Send to Connect',
  PrinterType: 'XML',
  PhysicalPrinterId: 'CONNECT_003'
}

export const PRINTER_PDF: IFSPrinter = {
  LogicalPrinterId: 'PDF_PRINTER',
  Description: 'PDF Virtual Printer',
  PrinterType: 'PDF',
  PhysicalPrinterId: 'PDF_001'
}

export const PRINTER_NO_PRINTOUT: IFSPrinter = {
  LogicalPrinterId: 'NO_PRINTOUT',
  Description: 'No printout (sink)',
  PrinterType: 'NONE',
  PhysicalPrinterId: 'NONE_000'
}

export const ALL_PRINTERS = [
  PRINTER_SEND_XML,
  PRINTER_SEND_FULL_XML,
  PRINTER_SEND_TO_CONNECT,
  PRINTER_PDF,
  PRINTER_NO_PRINTOUT
]

/**
 * Languages (real sample captured) - mapping a few likely codes
 */
export const LANGUAGE_DA: IFSLanguage = { LanguageCode: 'da', Description: 'Danish' }
export const LANGUAGE_EN_REAL: IFSLanguage = { LanguageCode: 'en', Description: 'English' }
export const LANGUAGE_FR_REAL: IFSLanguage = { LanguageCode: 'fr', Description: 'French' }
export const LANGUAGE_IT: IFSLanguage = { LanguageCode: 'it', Description: 'Italian' }
export const LANGUAGE_PL: IFSLanguage = { LanguageCode: 'pl', Description: 'Polish' }

export const ALL_LANGUAGES = [LANGUAGE_DA, LANGUAGE_EN_REAL, LANGUAGE_FR_REAL, LANGUAGE_IT, LANGUAGE_PL]
