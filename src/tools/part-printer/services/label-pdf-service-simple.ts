/**
 * Service de génération PDF simplifié pour Part Printer
 * 
 * Utilise jsPDF pour générer des PDF d'étiquettes sans problèmes de polices
 */

import { jsPDF } from 'jspdf'
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
 * Générer un PDF simple avec les étiquettes
 */
export async function generateLabelsPDF(
  labels: PartLabel[],
  options?: PDFGenerationOptions
): Promise<PDFGenerationResult> {
  console.log(`📄 [PDF Service] Génération PDF pour ${labels.length} étiquettes...`)

  if (!labels || labels.length === 0) {
    throw new Error('Cannot generate PDF: labels array is empty')
  }

  try {
    // Créer le document PDF
    const doc = new jsPDF({
      orientation: options?.orientation === 'landscape' ? 'l' : 'p',
      unit: 'mm',
      format: 'a4',
    })

    // Métadonnées
    if (options?.includeMetadata !== false) {
      doc.setProperties({
        title: 'Part Printer Labels',
        subject: `Wood Part Labels - ${labels.length} labels`,
        author: 'Manufacturing Portal - Bénéteau',
      })
    }

    // Générer les étiquettes (version simple : toutes sur 1 page pour test)
    let y = 20
    doc.setFontSize(16)
    doc.text('ÉTIQUETTES PART PRINTER', 20, y)
    y += 10

    for (let i = 0; i < labels.length; i++) {
      const label = labels[i]

      // Nouvelle page si nécessaire
      if (y > 180) {
        doc.addPage()
        y = 20
      }

      // Cadre de l'étiquette
      doc.setLineWidth(0.5)
      doc.rect(15, y, 267, 50) // A4 landscape = 297mm, marges 15mm

      // Contenu
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.text(`Shop Order: ${label.orderNo}`, 20, y + 8)

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      doc.text(`Part No: ${label.partNo}`, 20, y + 15)
      doc.text(`Generic Code: ${label.genericCode}`, 20, y + 22)
      doc.text(`Varnish Code: ${label.varnishCode}`, 20, y + 29)
      doc.text(`Raw Material: ${label.rawMaterial || 'N/A'}`, 20, y + 36)
      doc.text(`Length: ${label.lengthSetup || 'N/A'}`, 20, y + 43)

      doc.text(`Range: ${label.rangeId}`, 180, y + 8)
      doc.text(`Rev: ${label.engineeringPartRev || 'N/A'}`, 180, y + 15)
      doc.text(`Barcode: ${label.barcode}`, 180, y + 36)

      y += 55
    }

    // Générer le PDF en base64
    const pdfBase64 = doc.output('datauristring').split(',')[1]
    const buffer = Buffer.from(pdfBase64, 'base64')

    const result: PDFGenerationResult = {
      buffer,
      pageCount: doc.getNumberOfPages(),
      labelCount: labels.length,
      groupCount: 1,
      size: buffer.length,
    }

    console.log(`✅ [PDF Service] PDF généré avec succès:`)
    console.log(`   - Pages: ${result.pageCount}`)
    console.log(`   - Étiquettes: ${result.labelCount}`)
    console.log(`   - Taille: ${(result.size / 1024).toFixed(2)} KB`)

    return result
  } catch (error) {
    console.error(`❌ [PDF Service] Erreur génération PDF:`, error)
    throw new Error(
      `Failed to generate labels PDF: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

/**
 * Valider les étiquettes avant génération
 */
export function validateLabelsForPDF(labels: PartLabel[]): boolean {
  if (!labels || labels.length === 0) {
    throw new Error('Labels array is empty')
  }

  console.log(`✅ [PDF Service] ${labels.length} étiquettes validées`)
  return true
}
