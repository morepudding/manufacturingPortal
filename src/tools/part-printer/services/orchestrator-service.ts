/**
 * 🎯 Part Printer - Orchestrator Service
 * 
 * Service orchestrateur principal qui coordonne tous les services Part Printer
 * pour générer les étiquettes complètes à partir des Shop Orders filtrés.
 * 
 * Ce service est le point d'entrée unique pour le workflow complet :
 * 1. Filtrer les Shop Orders
 * 2. Extraire toutes les données (Raw Material, attributs, etc.)
 * 3. Générer les étiquettes consolidées
 * 4. Générer le PDF
 * 5. Imprimer
 * 
 * Architecture : Service Facade Pattern
 * 
 * @see /docs/tools/part-printer/ROADMAP.md - Plan de développement
 */

import { filterShopOrders } from './shop-order-filter-service'
import { getOperation10Data } from './operation-service'
import { getRawMaterial } from './material-line-service'
import { getMasterPartAttributes } from './master-part-service'
import { generateBarcode, formatPartPrinterBarcodeText } from './barcode-service'
import { generateLabelsPDF } from './label-pdf-service'
import { printLabels } from './label-print-service'
import type { 
  ShopOrderFilterParams, 
  ShopOrdersFilterResponse 
} from '../types'

// Types pour les résultats de services (à aligner avec les services réels)
interface Operation10Data {
  blockId: string | null
  operationNo: number
}

interface RawMaterial {
  partNo: string
  description: string
  quantity: number
  unitMeas: string
}

interface MasterPartAttributes {
  genericCode: string
  lengthSetup: string
  varnishCode: string
  engineeringPartRev: string
}

interface PDFGenerationResult {
  buffer: Buffer
  pageCount: number
  size: number
}

interface PrintLabelsOptions {
  printerId: string
  site: string
  copies?: number
  mode?: 'dev' | 'prod'
}

interface PrintLabelsResult {
  success: boolean
  message: string
  mode: 'dev' | 'prod'
  printerId: string
  copies: number
  pdfSize: number
  resultKey?: number
  downloadUrl?: string
}

/**
 * Étiquette Part Printer consolidée (toutes les données)
 */
export interface PartLabel {
  // Shop Order
  orderNo: string
  releaseNo: string
  sequenceNo: string
  partNo: string
  partDescription: string
  startDate: string
  contract: string
  productionLine: string | null
  
  // Raw Material (OP10 Material Line)
  rawMaterial: string
  rawMaterialDescription: string
  
  // Operation 10
  blockId: string | null
  
  // Master Part Attributes
  genericCode: string
  lengthSetup: string
  varnishCode: string
  engineeringPartRev: string
  
  // Range
  rangeId: string
  
  // Barcode
  barcode: string
  barcodeDataUrl: string
}

/**
 * Résultat de génération d'étiquettes
 */
export interface GenerateLabelsResult {
  /** Étiquettes générées */
  labels: PartLabel[]
  
  /** Nombre d'étiquettes */
  count: number
  
  /** Nombre de Shop Orders traités */
  shopOrdersProcessed: number
  
  /** Nombre d'erreurs */
  errors: number
  
  /** Détails des erreurs */
  errorDetails: Array<{
    orderNo: string
    error: string
  }>
  
  /** Durée de traitement (ms) */
  duration: number
}

/**
 * Options de génération d'étiquettes
 */
export interface GenerateLabelsOptions {
  /** Filtres Shop Orders */
  filters: ShopOrderFilterParams
  
  /** Générer les barcodes (défaut: true) */
  generateBarcodes?: boolean
  
  /** Mock Range ID si non disponible (défaut: "N/A") */
  mockRangeId?: string
}

/**
 * Workflow complet : Filtres → Étiquettes → PDF → Impression
 */
export interface CompleteWorkflowOptions extends GenerateLabelsOptions {
  /** Options d'impression */
  printOptions: PrintLabelsOptions
  
  /** Générer le PDF (défaut: true) */
  generatePDF?: boolean
  
  /** Imprimer le PDF (défaut: true) */
  printPDF?: boolean
}

/**
 * Résultat du workflow complet
 */
export interface CompleteWorkflowResult {
  /** Étiquettes générées */
  labels: GenerateLabelsResult
  
  /** PDF généré (si demandé) */
  pdf?: PDFGenerationResult
  
  /** Résultat d'impression (si demandé) */
  print?: PrintLabelsResult
  
  /** Durée totale (ms) */
  totalDuration: number
}

/**
 * 🎯 FONCTION PRINCIPALE : Générer toutes les étiquettes à partir des filtres
 * 
 * Cette fonction orchestre tous les services pour extraire les données IFS
 * et générer les étiquettes complètes.
 * 
 * @param options - Options de génération
 * @returns Étiquettes consolidées avec toutes les données
 * 
 * @example
 * ```typescript
 * const result = await generatePartLabels({
 *   filters: {
 *     site: "FR017",
 *     startDate: "2025-10-15",
 *     blockDate: true,
 *     op10BlockId: "EMPTY"
 *   }
 * })
 * 
 * console.log(`${result.count} étiquettes générées`)
 * console.log(`${result.errors} erreurs`)
 * ```
 */
export async function generatePartLabels(
  options: GenerateLabelsOptions
): Promise<GenerateLabelsResult> {
  console.log('🎯 [Orchestrator] Démarrage génération étiquettes Part Printer')
  console.log('📊 [Orchestrator] Filtres:', options.filters)
  
  const startTime = Date.now()
  const labels: PartLabel[] = []
  const errorDetails: Array<{ orderNo: string; error: string }> = []
  
  try {
    // =========================================================================
    // ÉTAPE 1 : Filtrer les Shop Orders
    // =========================================================================
    console.log('\n━━━ ÉTAPE 1/5 : FILTRAGE SHOP ORDERS ━━━')
    
    const shopOrdersResult = await filterShopOrders(options.filters)
    
    console.log(`✅ ${shopOrdersResult.count} Shop Orders trouvés`)
    
    if (shopOrdersResult.count === 0) {
      console.log('⚠️ Aucun Shop Order trouvé avec ces filtres')
      return {
        labels: [],
        count: 0,
        shopOrdersProcessed: 0,
        errors: 0,
        errorDetails: [],
        duration: Date.now() - startTime
      }
    }
    
    // =========================================================================
    // ÉTAPE 2-5 : Traiter chaque Shop Order
    // =========================================================================
    console.log('\n━━━ ÉTAPE 2-5 : EXTRACTION DONNÉES POUR CHAQUE SHOP ORDER ━━━')
    
    let processed = 0
    
    for (const shopOrder of shopOrdersResult.shopOrders) {
      processed++
      console.log(`\n[${processed}/${shopOrdersResult.count}] Shop Order: ${shopOrder.OrderNo}`)
      
      try {
        // Étape 2 : Operation 10
        console.log('  📊 Récupération Operation 10...')
        const op10Data = await getOperation10Data(
          shopOrder.OrderNo,
          shopOrder.ReleaseNo,
          shopOrder.SequenceNo
        )
        
        // Étape 3 : Raw Material (Material Line OP10)
        console.log('  🏭 Récupération Raw Material (OP10)...')
        const rawMaterial = await getRawMaterial(
          shopOrder.OrderNo,
          shopOrder.ReleaseNo,
          shopOrder.SequenceNo
        )
        
        // Étape 4 : Master Part Attributes
        console.log('  🔍 Récupération attributs Master Part...')
        const attributes = await getMasterPartAttributes(shopOrder.PartNo)
        
        // Étape 5 : Range ID (basé sur plages horaires du site)
        // ⚠️ NOTE: En mode mock, on utilise options.mockRangeId si fourni
        // En mode réel, getRangeId() récupère les plages horaires depuis IFS
        const rangeId = options.mockRangeId || calculateMockRangeId(shopOrder.RevisedStartDate)
        
        // Étape 6 : Barcode (optionnel)
        let barcodeDataUrl = ''
        let barcodeText = ''
        
        if (options.generateBarcodes !== false) {
          console.log('  📊 Génération code-barres...')
          barcodeText = formatPartPrinterBarcodeText(
            attributes.genericCode,
            attributes.engineeringPartRev
          )
          
          const barcode = await generateBarcode(barcodeText)
          barcodeDataUrl = barcode.dataUrl
        }
        
        // ✅ Créer l'étiquette consolidée
        const label: PartLabel = {
          // Shop Order
          orderNo: shopOrder.OrderNo,
          releaseNo: shopOrder.ReleaseNo,
          sequenceNo: shopOrder.SequenceNo,
          partNo: shopOrder.PartNo,
          partDescription: shopOrder.PartDescription || '',
          startDate: shopOrder.RevisedStartDate,
          contract: shopOrder.Contract,
          productionLine: shopOrder.ProductionLine || null,
          
          // Raw Material
          rawMaterial: rawMaterial.partNo,
          rawMaterialDescription: rawMaterial.description,
          
          // Operation 10
          blockId: op10Data.blockId,
          
          // Master Part Attributes
          genericCode: attributes.genericCode,
          lengthSetup: attributes.lengthSetup,
          varnishCode: attributes.varnishCode,
          engineeringPartRev: attributes.engineeringPartRev,
          
          // Range
          rangeId,
          
          // Barcode
          barcode: barcodeText,
          barcodeDataUrl
        }
        
        labels.push(label)
        console.log(`  ✅ Étiquette créée pour ${shopOrder.OrderNo}`)
        
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error'
        console.error(`  ❌ Erreur pour ${shopOrder.OrderNo}:`, errorMsg)
        
        errorDetails.push({
          orderNo: shopOrder.OrderNo,
          error: errorMsg
        })
      }
    }
    
    // =========================================================================
    // RÉSULTAT FINAL
    // =========================================================================
    const duration = Date.now() - startTime
    
    console.log('\n━━━ RÉSULTAT FINAL ━━━')
    console.log(`✅ ${labels.length} étiquettes générées`)
    console.log(`📊 ${processed} Shop Orders traités`)
    console.log(`❌ ${errorDetails.length} erreurs`)
    console.log(`⏱️ Durée: ${(duration / 1000).toFixed(2)}s`)
    
    return {
      labels,
      count: labels.length,
      shopOrdersProcessed: processed,
      errors: errorDetails.length,
      errorDetails,
      duration
    }
    
  } catch (error) {
    console.error('❌ [Orchestrator] Erreur fatale:', error)
    throw new Error(
      `Failed to generate part labels: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

/**
 * 🚀 WORKFLOW COMPLET : Filtres → Étiquettes → PDF → Impression
 * 
 * Cette fonction exécute le workflow complet du Part Printer :
 * 1. Filtrer les Shop Orders
 * 2. Générer les étiquettes
 * 3. Générer le PDF (optionnel)
 * 4. Imprimer (optionnel)
 * 
 * @param options - Options du workflow complet
 * @returns Résultat complet avec étiquettes, PDF et impression
 * 
 * @example
 * ```typescript
 * const result = await executeCompleteWorkflow({
 *   filters: {
 *     site: "FR017",
 *     startDate: "2025-10-15",
 *     blockDate: true,
 *     op10BlockId: "EMPTY"
 *   },
 *   printOptions: {
 *     printerId: "PRTBX101",
 *     site: "FR017",
 *     copies: 1
 *   },
 *   generatePDF: true,
 *   printPDF: true
 * })
 * 
 * console.log(`${result.labels.count} étiquettes`)
 * console.log(`${result.pdf?.pageCount} pages PDF`)
 * console.log(`Impression: ${result.print?.message}`)
 * ```
 */
export async function executeCompleteWorkflow(
  options: CompleteWorkflowOptions
): Promise<CompleteWorkflowResult> {
  console.log('🚀 [Orchestrator] Démarrage workflow complet Part Printer')
  
  const startTime = Date.now()
  
  try {
    // =========================================================================
    // ÉTAPE 1 : Générer les étiquettes
    // =========================================================================
    console.log('\n━━━ ÉTAPE 1/3 : GÉNÉRATION ÉTIQUETTES ━━━')
    
    const labelsResult = await generatePartLabels(options)
    
    if (labelsResult.count === 0) {
      console.log('⚠️ Aucune étiquette générée, arrêt du workflow')
      return {
        labels: labelsResult,
        totalDuration: Date.now() - startTime
      }
    }
    
    // =========================================================================
    // ÉTAPE 2 : Générer le PDF (optionnel)
    // =========================================================================
    let pdfResult: PDFGenerationResult | undefined
    
    if (options.generatePDF !== false) {
      console.log('\n━━━ ÉTAPE 2/3 : GÉNÉRATION PDF ━━━')
      
      pdfResult = await generateLabelsPDF(labelsResult.labels)
      
      console.log(`✅ PDF généré: ${pdfResult.pageCount} pages, ${(pdfResult.size / 1024).toFixed(2)} KB`)
    }
    
    // =========================================================================
    // ÉTAPE 3 : Imprimer (optionnel)
    // =========================================================================
    let printResult: PrintLabelsResult | undefined
    
    if (options.printPDF !== false && pdfResult) {
      console.log('\n━━━ ÉTAPE 3/3 : IMPRESSION ━━━')
      
      printResult = await printLabels(pdfResult.buffer, options.printOptions)
      
      console.log(`✅ ${printResult.message}`)
    }
    
    // =========================================================================
    // RÉSULTAT FINAL
    // =========================================================================
    const totalDuration = Date.now() - startTime
    
    console.log('\n━━━ WORKFLOW TERMINÉ ━━━')
    console.log(`✅ ${labelsResult.count} étiquettes générées`)
    if (pdfResult) {
      console.log(`✅ PDF: ${pdfResult.pageCount} pages`)
    }
    if (printResult) {
      console.log(`✅ Impression: ${printResult.mode.toUpperCase()} mode`)
    }
    console.log(`⏱️ Durée totale: ${(totalDuration / 1000).toFixed(2)}s`)
    
    return {
      labels: labelsResult,
      pdf: pdfResult,
      print: printResult,
      totalDuration
    }
    
  } catch (error) {
    console.error('❌ [Orchestrator] Erreur workflow complet:', error)
    throw new Error(
      `Complete workflow failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

/**
 * Calculer un Range ID en mode mock (sans appel IFS)
 * 
 * ⚠️ DEPRECATED: Cette logique simplifiée retourne toujours "A"
 * La vraie logique utilise les plages horaires du site (getRangeId())
 * 
 * Logique mock :
 * - Range = Quantième (jour de l'année) + Lettre "A"
 * 
 * @deprecated Utiliser getRangeId() du range-service.ts pour la vraie logique
 * @param dateString - Date au format ISO (RevisedStartDate du Shop Order)
 * @returns Range ID (ex: "274 A")
 */
function calculateMockRangeId(dateString: string): string {
  const date = new Date(dateString)
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000
  )
  
  // Mode mock: toujours "A"
  // La vraie lettre dépend des plages horaires du site (voir range-service.ts)
  const letter = 'A'
  
  // Format: "DDD X" (ex: "274 A")
  return `${dayOfYear} ${letter}`
}

/**
 * Grouper les étiquettes par (Raw Material, Varnish Code)
 * 
 * Utilisé pour la génération PDF : 1 page par groupe
 * 
 * @param labels - Étiquettes à grouper
 * @returns Map avec clé "RawMaterial|VarnishCode" et valeur tableau d'étiquettes
 */
export function groupLabelsByRawMaterialAndVarnish(
  labels: PartLabel[]
): Map<string, PartLabel[]> {
  const groups = new Map<string, PartLabel[]>()
  
  for (const label of labels) {
    const key = `${label.rawMaterial}|${label.varnishCode}`
    
    if (!groups.has(key)) {
      groups.set(key, [])
    }
    
    groups.get(key)!.push(label)
  }
  
  // Trier chaque groupe par Length Setup décroissant
  for (const [key, groupLabels] of groups.entries()) {
    groupLabels.sort((a, b) => {
      const lengthA = parseFloat(a.lengthSetup) || 0
      const lengthB = parseFloat(b.lengthSetup) || 0
      return lengthB - lengthA // Décroissant
    })
  }
  
  console.log(`📊 [Orchestrator] ${groups.size} groupe(s) créé(s)`)
  
  return groups
}

/**
 * Valider les options de génération
 * 
 * @param options - Options à valider
 * @throws Error si les options sont invalides
 */
export function validateGenerateLabelsOptions(options: GenerateLabelsOptions): void {
  if (!options.filters) {
    throw new Error('Filters are required')
  }
  
  if (!options.filters.site || options.filters.site.trim() === '') {
    throw new Error('Site is required in filters')
  }
  
  if (!options.filters.startDate || options.filters.startDate.trim() === '') {
    throw new Error('Start date is required in filters')
  }
  
  if (typeof options.filters.blockDate !== 'boolean') {
    throw new Error('Block date must be a boolean in filters')
  }
  
  console.log('✅ [Orchestrator] Options validées')
}
