/**
 * Service de génération PDF pour Part Printer
 * 
 * Phase 4.2 - Génération PDF A4 paysage avec étiquettes
 * 
 * Génère des PDF d'étiquettes pour les pièces en bois avec :
 * - Format : A4 Paysage (297mm x 210mm)
 * - Pagination : 1 page par couple (Raw Material, Varnish Code)
 * - Tri : Length Setup décroissant dans chaque groupe
 * - Template : Varnish, Shop Order, Raw Material, Generic Code, Length, Range, Barcode, Block ID
 * 
 * Utilise jsPDF pour la génération côté serveur/client.
 * 
 * @see https://github.com/parallax/jsPDF
 */

import { jsPDF } from 'jspdf'
import { logger } from '../utils/logger'
import type { PartLabel } from '../types'
import { prepareLabelsForPrinting } from './part-label-service'

/**
 * Options de génération PDF
 */
export interface PDFGenerationOptions {
  /** Orientation (par défaut: 'landscape') */
  orientation?: 'portrait' | 'landscape'
  
  /** Taille de page (par défaut: 'A4') */
  size?: 'A4' | 'LETTER'
  
  /** Marges en points (par défaut: { top: 20, bottom: 20, left: 30, right: 30 }) */
  margins?: {
    top: number
    bottom: number
    left: number
    right: number
  }
  
  /** Tailles de police */
  fontSize?: {
    title: number
    header: number
    body: number
    small: number
  }
  
  /** Inclure métadonnées PDF */
  includeMetadata?: boolean
}

/**
 * Résultat de génération PDF
 */
export interface PDFGenerationResult {
  /** Buffer du PDF généré */
  buffer: Buffer
  
  /** Nombre de pages générées */
  pageCount: number
  
  /** Nombre d'étiquettes */
  labelCount: number
  
  /** Nombre de groupes (Raw Material + Varnish Code) */
  groupCount: number
  
  /** Taille du PDF en octets */
  size: number
}

/**
 * Constantes de mise en page
 */
const LAYOUT = {
  // Page A4 paysage en points (1 point = 1/72 inch)
  PAGE: {
    WIDTH: 841.89,  // 297mm
    HEIGHT: 595.28, // 210mm
  },
  
  // Marges par défaut
  MARGINS: {
    top: 40,
    bottom: 40,
    left: 50,
    right: 50,
  },
  
  // Tailles de police
  FONT_SIZE: {
    title: 16,
    header: 14,
    body: 12,
    small: 10,
  },
  
  // Espacement
  SPACING: {
    LINE: 20,
    SECTION: 30,
    LABEL: 15,
  },
  
  // Dimensions étiquette
  LABEL: {
    WIDTH: 740,  // PAGE_WIDTH - MARGINS.LEFT - MARGINS.RIGHT
    HEIGHT: 150,
    PADDING: 10,
  },
}

/**
 * Générer un PDF d'étiquettes Part Printer
 * 
 * @param labels - Liste d'étiquettes à imprimer
 * @param options - Options de génération (optionnel)
 * @returns Promise<PDFGenerationResult> - PDF généré avec métadonnées
 * 
 * @throws Error si la génération échoue
 * 
 * @example
 * ```typescript
 * const labels = await generatePartLabels(shopOrders, "BDR")
 * const pdf = await generateLabelsPDF(labels)
 * 
 * logger.debug(`PDF généré: ${pdf.pageCount} pages, ${pdf.labelCount} étiquettes`)
 * // Sauvegarder ou envoyer le buffer
 * fs.writeFileSync('labels.pdf', pdf.buffer)
 * ```
 */
export async function generateLabelsPDF(
  labels: PartLabel[],
  options?: PDFGenerationOptions
): Promise<PDFGenerationResult> {
  logger.debug(`📄 [PDF Service] Génération PDF pour ${labels.length} étiquettes...`)

  // Validation
  if (!labels || labels.length === 0) {
    throw new Error('Cannot generate PDF: labels array is empty')
  }

  // Options par défaut
  const opts: Required<PDFGenerationOptions> = {
    orientation: options?.orientation || 'landscape',
    size: options?.size || 'A4',
    margins: options?.margins || LAYOUT.MARGINS,
    fontSize: options?.fontSize || LAYOUT.FONT_SIZE,
    includeMetadata: options?.includeMetadata ?? true,
  }

  try {
    // 1. Préparer les étiquettes (grouper + trier)
    logger.debug('📊 [PDF Service] Préparation des étiquettes...')
    const groupedLabels = prepareLabelsForPrinting(labels)

    logger.debug(`  ✅ ${groupedLabels.size} groupe(s) créé(s)`)

    // 2. Créer le document PDF
    const doc = new PDFDocument({
      size: opts.size,
      layout: opts.orientation,
      margins: opts.margins,
      bufferPages: true, // Pour compter les pages à la fin
    })

    // 3. Collecter les chunks du PDF dans un buffer
    const chunks: Buffer[] = []
    doc.on('data', (chunk) => chunks.push(chunk))

    // 4. Ajouter métadonnées si demandé
    if (opts.includeMetadata) {
      doc.info['Title'] = 'Part Printer Labels'
      doc.info['Author'] = 'Manufacturing Portal - Bénéteau'
      doc.info['Subject'] = `Wood Part Labels - ${labels.length} labels`
      doc.info['CreationDate'] = new Date()
    }

    // 5. Générer le contenu : 1 page par groupe
    let pageIndex = 0
    for (const [groupKey, groupLabels] of groupedLabels.entries()) {
      if (pageIndex > 0) {
        doc.addPage()
      }

      // Extraire Raw Material et Varnish Code depuis la clé
      const [rawMaterial, varnishCode] = groupKey.split('_')

      // Générer la page pour ce groupe
      await generatePageForGroup(
        doc,
        groupLabels,
        rawMaterial,
        varnishCode,
        opts,
        pageIndex + 1
      )

      pageIndex++
      logger.debug(`  ✅ Page ${pageIndex}/${groupedLabels.size} générée (${groupLabels.length} étiquettes)`)
    }

    // 6. Finaliser le PDF
    doc.end()

    // 7. Attendre que tous les chunks soient écrits
    const buffer = await new Promise<Buffer>((resolve, reject) => {
      doc.on('end', () => {
        try {
          const pdfBuffer = Buffer.concat(chunks)
          resolve(pdfBuffer)
        } catch (error) {
          reject(error)
        }
      })
      doc.on('error', reject)
    })

    const result: PDFGenerationResult = {
      buffer,
      pageCount: pageIndex,
      labelCount: labels.length,
      groupCount: groupedLabels.size,
      size: buffer.length,
    }

    logger.debug(`✅ [PDF Service] PDF généré avec succès:`)
    logger.debug(`   - Pages: ${result.pageCount}`)
    logger.debug(`   - Étiquettes: ${result.labelCount}`)
    logger.debug(`   - Groupes: ${result.groupCount}`)
    logger.debug(`   - Taille: ${(result.size / 1024).toFixed(2)} KB`)

    return result
  } catch (error) {
    logger.error(`❌ [PDF Service] Erreur génération PDF:`, error)
    throw new Error(
      `Failed to generate labels PDF: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

/**
 * Générer une page PDF pour un groupe d'étiquettes
 * 
 * @param doc - Document PDFKit
 * @param labels - Étiquettes du groupe (déjà triées)
 * @param rawMaterial - Raw Material du groupe
 * @param varnishCode - Varnish Code du groupe
 * @param options - Options de génération
 * @param pageNumber - Numéro de page
 */
async function generatePageForGroup(
  doc: PDFKit.PDFDocument,
  labels: PartLabel[],
  rawMaterial: string,
  varnishCode: string,
  options: Required<PDFGenerationOptions>,
  pageNumber: number
): Promise<void> {
  const { margins, fontSize } = options

  // En-tête de page
  let y = margins.top

  // Titre de la page : Raw Material + Varnish Code
  doc
    .fontSize(fontSize.title)
    .font('Helvetica-Bold')
    .text(`Raw Material: ${rawMaterial}`, margins.left, y)
  
  doc
    .fontSize(fontSize.header)
    .text(`Varnish Code: ${varnishCode}`, margins.left, y + 20)

  doc
    .fontSize(fontSize.small)
    .font('Helvetica')
    .text(`Page ${pageNumber} - ${labels.length} étiquette(s)`, margins.left, y + 40, {
      align: 'right',
      width: LAYOUT.PAGE.WIDTH - margins.left - margins.right,
    })

  y += 70

  // Ligne de séparation
  doc
    .moveTo(margins.left, y)
    .lineTo(LAYOUT.PAGE.WIDTH - margins.right, y)
    .stroke()

  y += LAYOUT.SPACING.SECTION

  // Générer chaque étiquette
  for (let i = 0; i < labels.length; i++) {
    const label = labels[i]

    // Vérifier si on a assez d'espace, sinon nouvelle page
    if (y + LAYOUT.LABEL.HEIGHT > LAYOUT.PAGE.HEIGHT - margins.bottom) {
      doc.addPage()
      y = margins.top
    }

    // Générer l'étiquette
    await generateLabelBox(doc, label, margins.left, y, options)

    y += LAYOUT.LABEL.HEIGHT + LAYOUT.SPACING.LABEL
  }
}

/**
 * Calculer le quantième (jour de l'année) à partir d'une date
 * 
 * @param dateString - Date au format ISO (YYYY-MM-DD)
 * @returns Numéro du jour dans l'année (1-365/366)
 * 
 * @example
 * ```typescript
 * getDayOfYear('2025-10-15') // → 288 (15 octobre = 288e jour)
 * getDayOfYear('2025-01-01') // → 1
 * getDayOfYear('2025-12-31') // → 365
 * ```
 */
function getDayOfYear(dateString: string): number {
  const date = new Date(dateString)
  const startOfYear = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - startOfYear.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

/**
 * Générer une boîte d'étiquette individuelle
 * 
 * @param doc - Document PDFKit
 * @param label - Données de l'étiquette
 * @param x - Position X
 * @param y - Position Y
 * @param options - Options de génération
 */
async function generateLabelBox(
  doc: PDFKit.PDFDocument,
  label: PartLabel,
  x: number,
  y: number,
  options: Required<PDFGenerationOptions>
): Promise<void> {
  const { fontSize } = options
  const boxWidth = LAYOUT.LABEL.WIDTH
  const boxHeight = LAYOUT.LABEL.HEIGHT
  const padding = LAYOUT.LABEL.PADDING

  // Dessiner le cadre de l'étiquette
  doc
    .rect(x, y, boxWidth, boxHeight)
    .stroke()

  // Positions internes
  const contentX = x + padding
  const contentY = y + padding
  const contentWidth = boxWidth - 2 * padding

  // ✨ NOUVEAU : Trigger d'impression (Quantième - Range)
  const quantieme = getDayOfYear(label.startDate)
  const trigger = `${quantieme} - ${label.rangeId}`
  
  doc
    .fontSize(fontSize.title)
    .font('Helvetica-Bold')
    .text(trigger, contentX, contentY, {
      width: contentWidth,
      align: 'center',
    })

  // Ligne 1 : Shop Order + Range (décalée vers le bas)
  // Ligne 1 : Shop Order + Range (décalée vers le bas)
  const shopOrderText = `Shop Order: ${label.orderNo}-${label.releaseNo}-${label.sequenceNo}`
  logger.debug(`🏷️ [PDF Service] Affichage: ${shopOrderText}`)
  
  doc
    .fontSize(fontSize.body)
    .font('Helvetica-Bold')
    .text(shopOrderText, contentX, contentY + 25, {
      width: contentWidth / 2,
    })

  doc
    .fontSize(fontSize.body)
    .text(`Range: ${label.rangeId}`, contentX + contentWidth / 2, contentY + 25, {
      width: contentWidth / 2,
      align: 'right',
    })

  // Ligne 2 : Block ID
  doc
    .fontSize(fontSize.small)
    .font('Helvetica')
    .text(`Block: ${label.blockId || '(vide)'}`, contentX + contentWidth / 2, contentY + 40, {
      width: contentWidth / 2,
      align: 'right',
    })

  // Ligne 3 : Part No
  doc
    .fontSize(fontSize.body)
    .font('Helvetica')
    .text(`Part: ${label.partNo}`, contentX, contentY + 50, {
      width: contentWidth,
    })

  // Ligne 4 : Generic Code + Revision
  doc
    .fontSize(fontSize.header)
    .font('Helvetica-Bold')
    .text(`${label.genericCode} (${label.engineeringPartRev})`, contentX, contentY + 70, {
      width: contentWidth,
    })

  // Ligne 5 : Length Setup
  doc
    .fontSize(fontSize.body)
    .font('Helvetica')
    .text(`Length: ${label.lengthSetup} mm`, contentX, contentY + 95, {
      width: contentWidth,
    })

  // Barcode (bas de l'étiquette)
  // Note: Pour l'instant, on affiche juste le texte du barcode
  // Le barcode image sera ajouté dans une version ultérieure
  doc
    .fontSize(fontSize.small)
    .font('Courier')
    .text(label.barcode, contentX, contentY + boxHeight - padding - 30, {
      width: contentWidth,
      align: 'center',
    })

  doc
    .fontSize(fontSize.small - 2)
    .font('Helvetica')
    .text('[Code-barres CODE128]', contentX, contentY + boxHeight - padding - 15, {
      width: contentWidth,
      align: 'center',
    })
}

/**
 * Valider les données d'étiquettes avant génération PDF
 * 
 * @param labels - Étiquettes à valider
 * @returns true si toutes les étiquettes sont valides
 * @throws Error si une étiquette est invalide
 */
export function validateLabelsForPDF(labels: PartLabel[]): boolean {
  if (!labels || labels.length === 0) {
    throw new Error('Labels array is empty')
  }

  for (let i = 0; i < labels.length; i++) {
    const label = labels[i]

    // Vérifier les champs requis
    const requiredFields: (keyof PartLabel)[] = [
      'orderNo',
      'releaseNo',
      'sequenceNo',
      'partNo',
      'rawMaterial',
      'genericCode',
      'varnishCode',
      'rangeId',
      'barcode',
    ]

    for (const field of requiredFields) {
      if (!label[field] || label[field].toString().trim() === '') {
        throw new Error(`Label ${i}: Missing required field "${field}"`)
      }
    }
  }

  logger.debug(`✅ [PDF Service] ${labels.length} étiquettes validées`)
  return true
}
