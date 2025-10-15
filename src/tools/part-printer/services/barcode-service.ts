/**
 * Service de génération de code-barres pour Part Printer
 * 
 * Phase 4.1 - Génération code-barres CODE128
 * 
 * Génère des codes-barres au format CODE128 pour les étiquettes de pièces.
 * Format des données : GENERIC_CODE_REVISION (ex: "1000014690_Rev_02")
 * 
 * Utilise la librairie bwip-js pour la génération.
 * 
 * @see https://github.com/metafloor/bwip-js
 */

import bwipjs from 'bwip-js'

/**
 * Options de génération de code-barres
 */
export interface BarcodeOptions {
  /** Texte à encoder (ex: "1000014690_Rev_02") */
  text: string
  
  /** Type de code-barres (par défaut: "code128") */
  bcid?: string
  
  /** Largeur en pixels (par défaut: 300) */
  width?: number
  
  /** Hauteur en pixels (par défaut: 100) */
  height?: number
  
  /** Afficher le texte sous le code-barres (par défaut: true) */
  includetext?: boolean
  
  /** Taille de la police du texte (par défaut: 12) */
  textsize?: number
  
  /** Padding horizontal en pixels (par défaut: 10) */
  paddingwidth?: number
  
  /** Padding vertical en pixels (par défaut: 5) */
  paddingheight?: number
  
  /** Couleur du code-barres (par défaut: "000000" = noir) */
  color?: string
  
  /** Couleur de fond (par défaut: "FFFFFF" = blanc) */
  backgroundcolor?: string
}

/**
 * Résultat de génération de code-barres
 */
export interface BarcodeResult {
  /** Données du code-barres en base64 */
  dataUrl: string
  
  /** Buffer PNG du code-barres */
  buffer: Buffer
  
  /** Type MIME */
  mimeType: string
  
  /** Texte encodé */
  text: string
}

/**
 * Générer un code-barres CODE128
 * 
 * @param text - Texte à encoder dans le code-barres
 * @param options - Options de personnalisation (optionnel)
 * @returns Promise<BarcodeResult> - Code-barres généré
 * 
 * @throws Error si la génération échoue
 * 
 * @example
 * ```typescript
 * // Génération simple
 * const barcode = await generateBarcode("1000014690_Rev_02")
 * console.log("Data URL:", barcode.dataUrl)
 * 
 * // Avec options personnalisées
 * const barcode = await generateBarcode("1000014690_Rev_02", {
 *   width: 400,
 *   height: 150,
 *   textsize: 14
 * })
 * ```
 */
export async function generateBarcode(
  text: string,
  options?: Partial<BarcodeOptions>
): Promise<BarcodeResult> {
  console.log(`📊 [Barcode Service] Génération code-barres pour: "${text}"`)

  // Validation du texte
  if (!text || text.trim().length === 0) {
    throw new Error('Barcode text cannot be empty')
  }

  // Options par défaut
  const defaultOptions: BarcodeOptions = {
    text: text.trim(),
    bcid: 'code128',
    width: 300,
    height: 100,
    includetext: true,
    textsize: 12,
    paddingwidth: 10,
    paddingheight: 5,
    color: '000000',
    backgroundcolor: 'FFFFFF',
  }

  // Fusionner avec les options fournies
  const finalOptions: BarcodeOptions = {
    ...defaultOptions,
    ...options,
    text: text.trim(), // Toujours utiliser le texte fourni
  }

  try {
    // Générer le code-barres avec bwip-js
    const png = await bwipjs.toBuffer({
      bcid: finalOptions.bcid!,
      text: finalOptions.text,
      scale: 3, // Échelle 3x pour meilleure qualité
      height: Math.floor(finalOptions.height! / 10), // bwip-js utilise des millimètres
      width: Math.floor(finalOptions.width! / 10),
      includetext: finalOptions.includetext,
      textxalign: 'center',
      textyalign: 'below',
      textsize: finalOptions.textsize,
      paddingwidth: finalOptions.paddingwidth,
      paddingheight: finalOptions.paddingheight,
      barcolor: finalOptions.color,
      backgroundcolor: finalOptions.backgroundcolor,
    })

    // Convertir en Data URL pour utilisation directe en HTML/PDF
    const base64 = png.toString('base64')
    const dataUrl = `data:image/png;base64,${base64}`

    console.log(`✅ [Barcode Service] Code-barres généré (${png.length} bytes)`)

    return {
      dataUrl,
      buffer: png,
      mimeType: 'image/png',
      text: finalOptions.text,
    }
  } catch (error) {
    console.error(`❌ [Barcode Service] Erreur génération:`, error)
    throw new Error(
      `Failed to generate barcode: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

/**
 * Générer plusieurs codes-barres en batch
 * 
 * @param texts - Liste de textes à encoder
 * @param options - Options communes (optionnel)
 * @returns Promise<BarcodeResult[]> - Liste de codes-barres générés
 * 
 * @example
 * ```typescript
 * const texts = ["1000014690_Rev_02", "1000009132_Rev_01"]
 * const barcodes = await generateBarcodesBatch(texts)
 * console.log(`${barcodes.length} codes-barres générés`)
 * ```
 */
export async function generateBarcodesBatch(
  texts: string[],
  options?: Partial<BarcodeOptions>
): Promise<BarcodeResult[]> {
  console.log(`📊 [Barcode Service] Génération batch de ${texts.length} codes-barres...`)

  const barcodes: BarcodeResult[] = []
  const errors: Array<{ text: string; error: string }> = []

  // Générer séquentiellement pour éviter surcharge mémoire
  for (const text of texts) {
    try {
      const barcode = await generateBarcode(text, options)
      barcodes.push(barcode)
      
      console.log(`  ✅ ${barcodes.length}/${texts.length} codes-barres générés`)
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      console.error(`  ❌ Erreur pour "${text}":`, errorMsg)
      errors.push({ text, error: errorMsg })
    }
  }

  console.log(`✅ [Barcode Service] Batch terminé: ${barcodes.length} succès, ${errors.length} erreurs`)

  if (errors.length > 0) {
    console.warn('⚠️ [Barcode Service] Erreurs rencontrées:', errors)
  }

  return barcodes
}

/**
 * Valider un texte pour code-barres CODE128
 * 
 * CODE128 supporte tous les caractères ASCII (0-127)
 * 
 * @param text - Texte à valider
 * @returns true si le texte est valide
 */
export function validateBarcodeText(text: string): boolean {
  if (!text || text.trim().length === 0) {
    return false
  }

  // CODE128 supporte tous les caractères ASCII (0-127)
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i)
    if (charCode > 127) {
      console.warn(`⚠️ [Barcode Service] Caractère invalide à position ${i}: ${text[i]} (code ${charCode})`)
      return false
    }
  }

  return true
}

/**
 * Formater un texte de code-barres Part Printer
 * 
 * Format standard : GENERIC_CODE_REVISION
 * Exemple : "1000014690_Rev_02"
 * 
 * @param genericCode - Code générique de la pièce
 * @param revision - Révision de la pièce
 * @returns Texte formaté pour code-barres
 */
export function formatPartPrinterBarcodeText(
  genericCode: string,
  revision: string
): string {
  // Nettoyer les entrées
  const cleanGenericCode = genericCode.trim()
  const cleanRevision = revision.trim()

  // Format standard
  const text = `${cleanGenericCode}_${cleanRevision}`

  // Validation
  if (!validateBarcodeText(text)) {
    throw new Error(`Invalid barcode text: "${text}" contains non-ASCII characters`)
  }

  return text
}
