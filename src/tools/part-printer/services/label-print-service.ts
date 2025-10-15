/**
 * Service d'impression pour Part Printer
 * 
 * Phase 4.3 - Impression des étiquettes
 * 
 * Gère l'impression des PDF d'étiquettes Part Printer avec deux modes :
 * - MODE DEV : Téléchargement PDF uniquement (pas d'impression réelle)
 * - MODE PROD : Envoi à l'imprimante IFS réelle
 * 
 * Réutilise les services partagés :
 * - /shared/services/printer-service.ts : Liste des imprimantes IFS
 * - /shared/types/print.ts : Types d'impression
 */

import { getIFSClient } from '@/shared/services/ifs-client'
import { getPrinters, getPrinterById } from '@/shared/services/printer-service'

/**
 * Options d'impression Part Printer
 */
export interface PrintLabelsOptions {
  /** ID de l'imprimante IFS (ex: "PRTBX101") */
  printerId: string
  
  /** Site (ex: "BDR") */
  site: string
  
  /** Nombre de copies (par défaut: 1) */
  copies?: number
  
  /** Mode forcé : 'dev' télécharge, 'prod' imprime (optionnel, auto-détecté) */
  mode?: 'dev' | 'prod'
}

/**
 * Résultat d'impression Part Printer
 */
export interface PrintLabelsResult {
  /** Succès de l'opération */
  success: boolean
  
  /** Mode utilisé ('dev' ou 'prod') */
  mode: 'dev' | 'prod'
  
  /** Message de résultat */
  message: string
  
  /** ID de l'imprimante utilisée */
  printerId: string
  
  /** Nombre de copies */
  copies: number
  
  /** Taille du PDF en octets */
  pdfSize: number
  
  /** ResultKey IFS (si mode PROD) */
  resultKey?: number
  
  /** URL de téléchargement du PDF (si mode DEV) */
  downloadUrl?: string
}

/**
 * Détecter le mode d'impression (dev ou prod)
 * 
 * @param forcedMode - Mode forcé (optionnel)
 * @returns 'dev' ou 'prod'
 */
function detectPrintMode(forcedMode?: 'dev' | 'prod'): 'dev' | 'prod' {
  if (forcedMode) {
    return forcedMode
  }
  
  // Détecter automatiquement selon NODE_ENV
  const isDev = process.env.NODE_ENV === 'development' || 
                process.env.NODE_ENV === 'test'
  
  return isDev ? 'dev' : 'prod'
}

/**
 * Imprimer des étiquettes Part Printer
 * 
 * MODE DEV : Télécharge le PDF uniquement (pas d'impression réelle)
 * MODE PROD : Envoie le PDF à l'imprimante IFS réelle
 * 
 * @param pdfBuffer - Buffer du PDF à imprimer
 * @param options - Options d'impression
 * @returns Promise<PrintLabelsResult> - Résultat de l'impression
 * 
 * @throws Error si l'impression échoue
 * 
 * @example
 * ```typescript
 * // Générer le PDF
 * const pdf = await generateLabelsPDF(labels)
 * 
 * // Imprimer (mode auto-détecté)
 * const result = await printLabels(pdf.buffer, {
 *   printerId: "PRTBX101",
 *   site: "BDR",
 *   copies: 1
 * })
 * 
 * if (result.mode === 'dev') {
 *   console.log(`PDF disponible: ${result.downloadUrl}`)
 * } else {
 *   console.log(`Imprimé avec ResultKey: ${result.resultKey}`)
 * }
 * ```
 */
export async function printLabels(
  pdfBuffer: Buffer,
  options: PrintLabelsOptions
): Promise<PrintLabelsResult> {
  console.log(`🖨️ [Print Service] Démarrage impression Part Printer`)
  console.log(`   Imprimante: ${options.printerId}`)
  console.log(`   Site: ${options.site}`)
  console.log(`   PDF: ${(pdfBuffer.length / 1024).toFixed(2)} KB`)

  const startTime = Date.now()

  try {
    // 1. Détecter le mode (dev ou prod)
    const mode = detectPrintMode(options.mode)
    console.log(`   Mode: ${mode.toUpperCase()}`)

    // 2. Valider l'imprimante
    await validatePrinter(options.printerId)

    // 3. Valider le PDF
    validatePDF(pdfBuffer)

    // 4. Exécuter selon le mode
    let result: PrintLabelsResult

    if (mode === 'dev') {
      result = await printLabels_DevMode(pdfBuffer, options)
    } else {
      result = await printLabels_ProdMode(pdfBuffer, options)
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2)
    console.log(`✅ [Print Service] Impression réussie (${duration}s)`)

    return result
  } catch (error) {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2)
    console.error(`❌ [Print Service] Erreur impression (${duration}s):`, error)
    throw new Error(
      `Failed to print labels: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

/**
 * MODE DEV : Préparer le PDF pour téléchargement (simulation d'impression)
 * 
 * @param pdfBuffer - Buffer du PDF
 * @param options - Options d'impression
 * @returns Résultat avec URL de téléchargement
 */
async function printLabels_DevMode(
  pdfBuffer: Buffer,
  options: PrintLabelsOptions
): Promise<PrintLabelsResult> {
  console.log(`📥 [Print Service DEV] Préparation du PDF pour téléchargement...`)

  // Simuler un délai (comme si on envoyait à l'imprimante)
  await new Promise(resolve => setTimeout(resolve, 500))

  // En mode DEV, on retourne juste le buffer encodé en base64
  // L'API route créera l'URL de téléchargement côté client
  const downloadUrl = 'data:application/pdf;base64,' + pdfBuffer.toString('base64')

  const result: PrintLabelsResult = {
    success: true,
    mode: 'dev',
    message: `PDF prêt pour téléchargement (${(pdfBuffer.length / 1024).toFixed(2)} KB). Mode DEV : pas d'impression réelle.`,
    printerId: options.printerId,
    copies: options.copies || 1,
    pdfSize: pdfBuffer.length,
    downloadUrl,
  }

  console.log(`✅ [Print Service DEV] PDF prêt pour téléchargement`)
  console.log(`   Imprimante (simulée): ${options.printerId}`)
  console.log(`   Copies (simulées): ${options.copies || 1}`)

  return result
}

/**
 * MODE PROD : Envoyer le PDF à l'imprimante IFS réelle
 * 
 * @param pdfBuffer - Buffer du PDF
 * @param options - Options d'impression
 * @returns Résultat avec ResultKey IFS
 */
async function printLabels_ProdMode(
  pdfBuffer: Buffer,
  options: PrintLabelsOptions
): Promise<PrintLabelsResult> {
  console.log(`🖨️ [Print Service PROD] Envoi à l'imprimante IFS réelle...`)

  const client = getIFSClient()

  try {
    // TODO Phase Production : Implémenter le workflow d'impression IFS réel
    // 
    // Workflow à implémenter :
    // 1. Générer un ResultKey (sans Customer Order)
    //    - Option A : Utiliser un Shop Order principal
    //    - Option B : Upload PDF vers PdfArchiveSet puis récupérer ResultKey
    //    - Option C : Créer une entrée temporaire dans PrintDialog
    // 
    // 2. POST PrintDialogInit avec le ResultKey
    //    const dialogResponse = await client.post('PrintDialog.svc/PrintDialogInit', {
    //      ResultKey: resultKey
    //    })
    // 
    // 3. POST ReportPrintRequest pour envoyer à l'imprimante
    //    await client.post('PrintDialog.svc/ReportPrintRequest', {
    //      ResultKey: resultKey,
    //      LayoutName: dialogResponse.LayoutName,
    //      LanguageCode: 'fr',
    //      LogicalPrinter: options.printerId,
    //      Copies: options.copies || 1
    //    })
    // 
    // Pour l'instant, retourner une erreur explicite en mode PROD
    throw new Error(
      'MODE PROD non implémenté. Workflow d\'impression IFS réel à compléter. ' +
      'Voir TODO dans label-print-service.ts'
    )

    // Code à activer quand le workflow IFS sera implémenté :
    // const resultKey = 12345 // À obtenir du workflow IFS
    // 
    // const result: PrintLabelsResult = {
    //   success: true,
    //   mode: 'prod',
    //   message: `PDF envoyé à l'imprimante ${options.printerId} avec succès`,
    //   printerId: options.printerId,
    //   copies: options.copies || 1,
    //   pdfSize: pdfBuffer.length,
    //   resultKey,
    // }
    // 
    // return result
  } catch (error) {
    console.error(`❌ [Print Service PROD] Erreur envoi impression:`, error)
    throw error
  }
}

/**
 * Valider qu'une imprimante existe dans IFS
 * 
 * @param printerId - ID de l'imprimante à valider
 * @throws Error si l'imprimante n'existe pas
 */
async function validatePrinter(printerId: string): Promise<void> {
  console.log(`🔍 [Print Service] Validation imprimante: ${printerId}`)

  try {
    const printer = await getPrinterById(printerId)

    if (!printer) {
      throw new Error(`Printer not found: ${printerId}`)
    }

    console.log(`✅ [Print Service] Imprimante validée: ${printer.PrinterId} - ${printer.Description}`)
  } catch (error) {
    console.error(`❌ [Print Service] Imprimante invalide:`, error)
    throw new Error(`Invalid printer: ${printerId}`)
  }
}

/**
 * Valider le buffer PDF
 * 
 * @param pdfBuffer - Buffer à valider
 * @throws Error si le buffer est invalide
 */
function validatePDF(pdfBuffer: Buffer): void {
  // Vérifier que le buffer n'est pas vide
  if (!pdfBuffer || pdfBuffer.length === 0) {
    throw new Error('PDF buffer is empty')
  }

  // Vérifier l'en-tête PDF (%PDF)
  const header = pdfBuffer.toString('utf8', 0, 4)
  if (!header.startsWith('%PDF')) {
    throw new Error('Invalid PDF: missing PDF header')
  }

  console.log(`✅ [Print Service] PDF valide (${(pdfBuffer.length / 1024).toFixed(2)} KB)`)
}

/**
 * Obtenir la liste des imprimantes disponibles (wrapper)
 * 
 * Réutilise le service partagé getPrinters()
 * 
 * @returns Liste des imprimantes IFS
 */
export async function getAvailablePrinters() {
  return await getPrinters()
}
