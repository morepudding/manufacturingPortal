/**
 * Service de génération PDF Part Printer - Format Tableau
 * 
 * Génère des étiquettes au format tableau multi-lignes
 * Conforme au modèle exempleparfait.pdf
 * 
 * Format: A4 Paysage (297x210mm)
 * - En-tête: Part Printer | Barcode Trigger | Range | Varnish Code
 * - Tableau: 7 colonnes avec Shop Orders groupés par Raw Material + Varnish
 */

import { jsPDF } from 'jspdf'
import { logger } from '../utils/logger'
import autoTable from 'jspdf-autotable'
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
 * Générer le PDF avec format tableau
 */
export async function generateLabelsPDF(
  labels: PartLabel[],
  options?: PDFGenerationOptions
): Promise<PDFGenerationResult> {
  logger.debug(`📄 [PDF Service] Génération PDF tableau pour ${labels.length} étiquettes...`)

  if (!labels || labels.length === 0) {
    throw new Error('Cannot generate PDF: labels array is empty')
  }

  try {
    // Grouper par (Raw Material, Varnish Code)
    const groups = groupLabels(labels)
    logger.debug(`📊 [PDF Service] ${groups.size} groupe(s) créé(s)`)

    // Créer le document PDF A4 Paysage
    const doc = new jsPDF({
      orientation: 'landscape',
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

    // Générer une page par groupe
    let pageIndex = 0
    for (const [groupKey, groupLabels] of groups.entries()) {
      if (pageIndex > 0) {
        doc.addPage('a4', 'landscape')
      }

      generateGroupPage(doc, groupLabels, groupKey)
      pageIndex++
      
      logger.debug(`  ✅ Page ${pageIndex}/${groups.size} : ${groupLabels.length} Shop Orders`)
    }

    // Générer le buffer
    const pdfBase64 = doc.output('datauristring').split(',')[1]
    const buffer = Buffer.from(pdfBase64, 'base64')

    const result: PDFGenerationResult = {
      buffer,
      pageCount: doc.getNumberOfPages(),
      labelCount: labels.length,
      groupCount: groups.size,
      size: buffer.length,
    }

    logger.debug(`✅ [PDF Service] PDF généré:`)
    logger.debug(`   - Pages: ${result.pageCount}`)
    logger.debug(`   - Étiquettes: ${result.labelCount}`)
    logger.debug(`   - Groupes: ${result.groupCount}`)
    logger.debug(`   - Taille: ${(result.size / 1024).toFixed(2)} KB`)

    return result
  } catch (error) {
    logger.error(`❌ [PDF Service] Erreur:`, error)
    throw new Error(`Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Grouper les étiquettes par (Raw Material, Varnish Code)
 */
function groupLabels(labels: PartLabel[]): Map<string, PartLabel[]> {
  const groups = new Map<string, PartLabel[]>()

  for (const label of labels) {
    const rawMat = label.rawMaterial || 'N/A'
    const varnish = label.varnishCode || 'N/A'
    const key = `${rawMat}_${varnish}`

    if (!groups.has(key)) {
      groups.set(key, [])
    }

    groups.get(key)!.push(label)
  }

  // Trier chaque groupe par Length Setup décroissant
  for (const groupLabels of groups.values()) {
    groupLabels.sort((a, b) => {
      const lengthA = parseFloat(a.lengthSetup) || 0
      const lengthB = parseFloat(b.lengthSetup) || 0
      return lengthB - lengthA
    })
  }

  return groups
}

/**
 * Générer une page pour un groupe
 */
function generateGroupPage(
  doc: jsPDF,
  labels: PartLabel[],
  groupKey: string
): void {
  const [rawMaterial, varnishCode] = groupKey.split('_')

  // Premier label pour extraire les infos communes
  const firstLabel = labels[0]
  const quantieme = getDayOfYear(firstLabel.startDate)
  const rangeId = firstLabel.rangeId

  // ========================================
  // EN-TÊTE
  // ========================================
  const headerY = 15

  // "Part Printer" (gauche)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.text('Part Printer', 15, headerY)

  // Barcode trigger (centre) - Avec le rangeId complet (ex: "295 B")
  const triggerX = 120
  drawSimpleBarcode(doc, quantieme.toString(), triggerX, headerY - 10, 40, 12)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(`*${rangeId}*`, triggerX + 20, headerY + 8, { align: 'center' })

  // "Range" (centre-droite) - Afficher le rangeId complet
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('Range', 180, headerY)
  doc.setFontSize(20)
  doc.text(rangeId, 180, headerY + 8)

  // "Varnish Code" (droite)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text('Varnish Code', 235, headerY)
  doc.setFontSize(18)
  doc.text(varnishCode, 235, headerY + 8)

  // ========================================
  // TABLEAU
  // ========================================
  const tableY = headerY + 20

  // Sauvegarder les barcodes pour les dessiner plus tard
  const barcodes = labels.map(label => label.barcode)

  // Préparer les données du tableau
  const tableData = labels.map((label, index) => {
    const genericWithRev = `${label.genericCode}-${label.engineeringPartRev || 'N/A'}`
    const length = label.lengthSetup ? parseFloat(label.lengthSetup).toFixed(1) : 'N/A'
    
    // ⚠️ TEMPORAIRE (AST/Dev) : Afficher OpId si blockId est vide
    // TODO PRODUCTION : Afficher uniquement blockId quand disponible en PROD
    const displayBlockId = label.blockId || label.opId || '(vide)'
    
    const shopOrderFull = `${label.orderNo}-${label.releaseNo}-${label.sequenceNo}` // ✅ Format complet

    return [
      (index + 1).toString(), // Index
      rawMaterial, // Raw Material
      shopOrderFull, // Shop Order (format complet: OrderNo-ReleaseNo-SequenceNo)
      genericWithRev, // Generic Part No + revision
      length, // Length
      '', // ✅ Cellule vide - le code-barres sera dessiné par-dessus
      displayBlockId // OP 10 Block ID (ou OpId en AST si Block ID vide)
    ]
  })

  // Générer le tableau avec autoTable
  autoTable(doc, {
    startY: tableY,
    head: [[
      'Index',
      'Raw\nmaterial',
      'Shop\nOrder',
      'Generic Part No +\nrevision',
      'Length',
      'Barre-code',
      'OP 10\nBlock ID'
    ]],
    body: tableData,
    theme: 'grid',
    styles: {
      fontSize: 10,
      cellPadding: 3,
      lineColor: [0, 0, 0],
      lineWidth: 0.5,
    },
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      fontStyle: 'bold',
      halign: 'center',
      valign: 'middle',
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 15 }, // Index
      1: { halign: 'center', cellWidth: 30 }, // Raw Material
      2: { halign: 'center', cellWidth: 30 }, // Shop Order
      3: { halign: 'left', cellWidth: 50 }, // Generic Part No
      4: { halign: 'right', cellWidth: 25 }, // Length
      5: { halign: 'center', cellWidth: 60 }, // Barre-code
      6: { halign: 'center', cellWidth: 30 }, // OP 10 Block ID
    },
    didDrawCell: (data: any) => {
      // Dessiner les barcodes dans la colonne "Barre-code" (index 5)
      if (data.column.index === 5 && data.section === 'body') {
        const barcode = barcodes[data.row.index] // ✅ Utiliser le barcode sauvegardé
        const cellX = data.cell.x + 5
        const cellY = data.cell.y + 2
        const cellWidth = data.cell.width - 10
        
        // ✅ Dessiner uniquement le code-barres visuel (pas de texte)
        drawSimpleBarcode(doc, barcode, cellX, cellY, cellWidth, 8)
      }
    },
  })
}

/**
 * Dessiner un code-barres simple (rectangles noirs verticaux)
 */
function drawSimpleBarcode(
  doc: jsPDF,
  data: string,
  x: number,
  y: number,
  width: number,
  height: number
): void {
  const barCount = Math.min(data.length, 30)
  const barWidth = width / barCount
  const gap = barWidth * 0.3

  doc.setFillColor(0, 0, 0)

  for (let i = 0; i < barCount; i++) {
    // Alterner largeur pour simuler CODE128
    const isWide = i % 2 === 0
    const w = isWide ? barWidth - gap : barWidth * 0.5
    const xPos = x + (i * barWidth)

    doc.rect(xPos, y, w, height, 'F')
  }
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
 * Valider les étiquettes
 */
export function validateLabelsForPDF(labels: PartLabel[]): boolean {
  if (!labels || labels.length === 0) {
    throw new Error('Labels array is empty')
  }

  logger.debug(`✅ [PDF Service] ${labels.length} étiquettes validées`)
  return true
}
