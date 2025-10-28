/**
 * Service de génération PDF professionnel pour Part Printer
 * 
 * Génère des PDF d'étiquettes bois au format A4 Paysage (297x210mm)
 * Basé sur le modèle exempleparfait.pdf
 */

import { jsPDF } from 'jspdf'
import { logger } from '../utils/logger'
import type { PartLabel } from '../types'

export interface PDFGenerationResult {
  buffer: Buffer
  pageCount: number
  labelCount: number
  groupCount: number
  size: number
}

export interface PDFGenerationOptions {
  orientation?: 'portrait' | 'landscape'
  size?: 'A4' | 'LETTER'
  includeMetadata?: boolean
}

/**
 * Générer un PDF professionnel avec les étiquettes
 * Format: A4 Paysage, une étiquette par page
 */
export async function generateLabelsPDF(
  labels: PartLabel[],
  options?: PDFGenerationOptions
): Promise<PDFGenerationResult> {
  logger.debug(`📄 [PDF Service] Génération PDF pour ${labels.length} étiquettes...`)

  if (!labels || labels.length === 0) {
    throw new Error('Cannot generate PDF: labels array is empty')
  }

  try {
    // Créer le document PDF A4 Paysage
    const doc = new jsPDF({
      orientation: 'landscape', // 297mm x 210mm
      unit: 'mm',
      format: 'a4',
    })

    // Métadonnées
    if (options?.includeMetadata !== false) {
      doc.setProperties({
        title: 'Part Printer Labels',
        subject: `Wood Part Labels - ${labels.length} labels`,
        author: 'Manufacturing Portal - Bénéteau',
        creator: 'Part Printer Service',
      })
    }

    // Générer une étiquette par page
    for (let i = 0; i < labels.length; i++) {
      if (i > 0) {
        doc.addPage('a4', 'landscape')
      }

      generateLabelPage(doc, labels[i], i + 1, labels.length)
    }

    // Générer le PDF en base64
    const pdfBase64 = doc.output('datauristring').split(',')[1]
    const buffer = Buffer.from(pdfBase64, 'base64')

    const result: PDFGenerationResult = {
      buffer,
      pageCount: doc.getNumberOfPages(),
      labelCount: labels.length,
      groupCount: labels.length, // 1 étiquette = 1 groupe
      size: buffer.length,
    }

    logger.debug(`✅ [PDF Service] PDF généré avec succès:`)
    logger.debug(`   - Pages: ${result.pageCount}`)
    logger.debug(`   - Étiquettes: ${result.labelCount}`)
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
 * Générer une page d'étiquette professionnelle
 * 
 * Mise en page:
 * - Cadre principal avec bordures épaisses
 * - En-tête: TRIGGER (Quantième - Range) en TRÈS GROS
 * - Zone principale: Informations de la pièce
 * - Pied: Barcode
 */
function generateLabelPage(
  doc: jsPDF,
  label: PartLabel,
  pageNumber: number,
  totalPages: number
): void {
  // Dimensions A4 Paysage
  const pageWidth = 297
  const pageHeight = 210
  
  // Marges
  const margin = 15
  
  // Zone de contenu
  const contentX = margin
  const contentY = margin
  const contentWidth = pageWidth - 2 * margin // 267mm
  const contentHeight = pageHeight - 2 * margin // 180mm

  // ========================================
  // CADRE PRINCIPAL
  // ========================================
  doc.setLineWidth(1.5)
  doc.rect(contentX, contentY, contentWidth, contentHeight)

  // ========================================
  // EN-TÊTE: TRIGGER (TRÈS GROS)
  // ========================================
  const quantieme = getDayOfYear(label.startDate)
  const trigger = `${quantieme} - ${label.rangeId}`
  
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(72) // ÉNORME
  doc.setTextColor(0, 0, 0)
  
  const triggerY = contentY + 40
  doc.text(trigger, pageWidth / 2, triggerY, { align: 'center' })

  // Ligne de séparation sous le trigger
  doc.setLineWidth(0.8)
  doc.line(contentX + 10, triggerY + 10, contentX + contentWidth - 10, triggerY + 10)

  // ========================================
  // ZONE PRINCIPALE: INFORMATIONS
  // ========================================
  let y = triggerY + 25

  // Colonne gauche: Infos principales
  const col1X = contentX + 15
  const col2X = pageWidth / 2 + 10

  // Shop Order
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text(`OF: ${label.orderNo}-${label.releaseNo}-${label.sequenceNo}`, col1X, y)
  y += 10

  // Part No
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.text(`Part No: ${label.partNo}`, col1X, y)
  y += 10

  // Generic Code (GROS)
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text(`${label.genericCode}`, col1X, y)
  
  // Engineering Rev à côté
  doc.setFontSize(14)
  doc.setFont('helvetica', 'normal')
  doc.text(`(Rev: ${label.engineeringPartRev || 'N/A'})`, col1X + 60, y)
  y += 15

  // Varnish Code
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text(`Vernis: ${label.varnishCode}`, col1X, y)
  y += 10

  // Raw Material
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.text(`Matière: ${label.rawMaterial || 'N/A'}`, col1X, y)
  y += 10

  // Length Setup
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text(`Longueur: ${label.lengthSetup || 'N/A'}`, col1X, y)

  // Colonne droite: Infos secondaires
  y = triggerY + 25

  // Range
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text(`Range: ${label.rangeId}`, col2X, y)
  y += 10

  // Block ID
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.text(`Block ID: ${label.blockId || '(vide)'}`, col2X, y)
  y += 10

  // Date
  doc.text(`Date: ${formatDate(label.startDate)}`, col2X, y)

  // ========================================
  // PIED: BARCODE
  // ========================================
  const barcodeY = contentY + contentHeight - 25

  // Ligne de séparation
  doc.setLineWidth(0.5)
  doc.line(contentX + 10, barcodeY - 10, contentX + contentWidth - 10, barcodeY - 10)

  // Barcode (texte + représentation graphique simple)
  doc.setFontSize(10)
  doc.setFont('courier', 'normal')
  doc.text(label.barcode, pageWidth / 2, barcodeY, { align: 'center' })

  // Représentation graphique simple du barcode (rectangles)
  const barcodeGraphicY = barcodeY + 5
  const barcodeWidth = 100
  const barcodeHeight = 15
  const startX = (pageWidth - barcodeWidth) / 2

  doc.setFillColor(0, 0, 0)
  // Simulation de barres (CODE128)
  for (let i = 0; i < label.barcode.length; i++) {
    const x = startX + (i * barcodeWidth) / label.barcode.length
    const barWidth = barcodeWidth / label.barcode.length * 0.7
    doc.rect(x, barcodeGraphicY, barWidth, barcodeHeight, 'F')
  }

  // ========================================
  // NUMÉRO DE PAGE (coin bas-droite)
  // ========================================
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.text(`${pageNumber}/${totalPages}`, contentX + contentWidth - 5, contentY + contentHeight - 5, {
    align: 'right',
  })
}

/**
 * Calculer le jour de l'année (quantième)
 */
function getDayOfYear(dateString: string): number {
  const date = new Date(dateString)
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

/**
 * Formater une date ISO en DD/MM/YYYY
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

/**
 * Valider les étiquettes avant génération
 */
export function validateLabelsForPDF(labels: PartLabel[]): boolean {
  if (!labels || labels.length === 0) {
    throw new Error('Labels array is empty')
  }

  logger.debug(`✅ [PDF Service] ${labels.length} étiquettes validées`)
  return true
}
