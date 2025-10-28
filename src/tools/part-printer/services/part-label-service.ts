/**
 * Service Part Label - Consolidation des données pour étiquettes
 * 
 * Phase 3.4 - Consolidation des données
 * 
 * Ce service orchestre la récupération de toutes les données nécessaires
 * pour générer les étiquettes Part Printer :
 * 
 * 1. Shop Order (base)
 * 2. Operation 10 (Block ID + Raw Material)
 * 3. Master Part (GENERIC CODE, LENGTH SETUP, VARNISH CODE)
 * 4. Range (Range ID par site/date)
 * 5. Barcode (généré à partir du Generic Code + Revision)
 */

import { getOperation10Data } from './operation-service'
import { getMasterPartAttributes } from './master-part-service'
import { getRangeId } from './range-service'
import type { IFSShopOrderExtended, PartLabel } from '../types'
import { logger } from '../utils/logger'

/**
 * Générer les données d'étiquette pour un Shop Order
 * 
 * @param shopOrder - Shop Order IFS
 * @param site - Site (pour récupération du Range)
 * @returns Données complètes pour une étiquette (PartLabel)
 * 
 * @example
 * ```typescript
 * const label = await generatePartLabel(shopOrder, "BDR")
 * logger.debug("Étiquette complète:", label)
 * ```
 */
export async function generatePartLabel(
  shopOrder: IFSShopOrderExtended,
  site: string
): Promise<PartLabel> {
  logger.debug(`🏷️ [Part Label Service] Génération étiquette pour ${shopOrder.OrderNo}-${shopOrder.ReleaseNo}-${shopOrder.SequenceNo}`)

  try {
    // 1. Récupérer données Operation 10
    logger.debug('📊 [Part Label Service] Étape 1/4 - Operation 10...')
    const op10 = await getOperation10Data(
      shopOrder.OrderNo,
      shopOrder.ReleaseNo,
      shopOrder.SequenceNo
    )

    // 2. Récupérer attributs Master Part
    logger.debug('📊 [Part Label Service] Étape 2/4 - Master Part...')
    const masterPart = await getMasterPartAttributes(shopOrder.PartNo)

    // 3. Récupérer Range ID (basé sur plages horaires du site)
    logger.debug('📊 [Part Label Service] Étape 3/4 - Range ID...')
    const rangeId = await getRangeId(site, shopOrder.RevisedStartDate) || 'N/A'

    // 4. Générer barcode
    logger.debug('📊 [Part Label Service] Étape 4/4 - Barcode...')
    const barcode = generateBarcodeData(
      masterPart.genericCode,
      masterPart.engineeringPartRev
    )

    const label: PartLabel = {
      // Shop Order
      orderNo: shopOrder.OrderNo,
      releaseNo: shopOrder.ReleaseNo,
      sequenceNo: shopOrder.SequenceNo,
      partNo: shopOrder.PartNo,
      startDate: shopOrder.RevisedStartDate,

      // Operation 10
      rawMaterial: op10.rawMaterial,
      // ✅ CORRIGÉ (17 oct 2025) : Utilise OperationBlockId (conforme SFD)
      operationBlockId: op10.operationBlockId,

      // Master Part
      genericCode: masterPart.genericCode,
      lengthSetup: masterPart.lengthSetup,
      varnishCode: masterPart.varnishCode,
      engineeringPartRev: masterPart.engineeringPartRev,

      // Range
      rangeId,

      // Barcode
      barcode,
    }

    logger.debug(`✅ [Part Label Service] Étiquette générée avec succès`)
    logger.debug(`   📦 Shop Order: ${label.orderNo}-${label.releaseNo}-${label.sequenceNo}`)
    logger.debug(`   🏭 Raw Material: ${label.rawMaterial}`)
    logger.debug(`   🔧 OperationBlockId: ${label.operationBlockId || 'NULL'}`)

    return label
  } catch (error) {
    logger.error(`[Part Label Service] Erreur génération étiquette:`, error)
    throw new Error(`Failed to generate part label: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Générer les données d'étiquette pour plusieurs Shop Orders
 * 
 * @param shopOrders - Liste de Shop Orders IFS
 * @param site - Site (pour récupération des Ranges)
 * @returns Liste de données d'étiquettes (PartLabel[])
 * 
 * @example
 * ```typescript
 * const labels = await generatePartLabels(shopOrders, "BDR")
 * logger.debug(`${labels.length} étiquettes générées`)
 * ```
 */
export async function generatePartLabels(
  shopOrders: IFSShopOrderExtended[],
  site: string
): Promise<PartLabel[]> {
  logger.info(`🏷️ [Part Label Service] Génération de ${shopOrders.length} étiquettes...`)

  const labels: PartLabel[] = []
  const errors: Array<{ order: string; error: string }> = []

  // Traitement séquentiel pour éviter de surcharger IFS
  // TODO: Optimiser avec Promise.all() par batches si nécessaire
  for (const shopOrder of shopOrders) {
    try {
      const label = await generatePartLabel(shopOrder, site)
      labels.push(label)
      
      logger.debug(`✅ [Part Label Service] ${labels.length}/${shopOrders.length} étiquettes générées`)
    } catch (error) {
      const orderKey = `${shopOrder.OrderNo}-${shopOrder.ReleaseNo}-${shopOrder.SequenceNo}`
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      
      logger.error(`[Part Label Service] Erreur pour ${orderKey}:`, errorMsg)
      errors.push({ order: orderKey, error: errorMsg })
    }
  }

  logger.success(`[Part Label Service] Génération terminée: ${labels.length} succès, ${errors.length} erreurs`)

  if (errors.length > 0) {
    logger.warn('[Part Label Service] Erreurs rencontrées:', errors)
  }

  return labels
}

/**
 * Générer la donnée pour le barcode
 * 
 * Format: GENERIC_CODE_REVISION
 * Exemple: "1000014690_Rev_02"
 * 
 * @param genericCode - Code générique de la pièce
 * @param revision - Révision de la pièce
 * @returns Donnée du barcode (string)
 */
export function generateBarcodeData(
  genericCode: string,
  revision: string
): string {
  // Format simple pour l'instant
  // TODO: Vérifier le format exact requis pour les codes-barres
  const barcodeData = `${genericCode}_${revision}`
  
  logger.debug(`🔢 [Part Label Service] Barcode data: ${barcodeData}`)
  
  return barcodeData
}

/**
 * Grouper les étiquettes par (Raw Material, Varnish Code)
 * 
 * Nécessaire pour la génération PDF : 1 page par couple (Raw Material, Varnish Code)
 * 
 * @param labels - Liste d'étiquettes
 * @returns Map groupée par clé "rawMaterial_varnishCode"
 */
export function groupLabelsByMaterialAndVarnish(
  labels: PartLabel[]
): Map<string, PartLabel[]> {
  logger.debug(`📊 [Part Label Service] Groupement de ${labels.length} étiquettes...`)

  const grouped = new Map<string, PartLabel[]>()

  for (const label of labels) {
    const key = `${label.rawMaterial}_${label.varnishCode}`
    
    if (!grouped.has(key)) {
      grouped.set(key, [])
    }
    
    grouped.get(key)!.push(label)
  }

  logger.debug(`✅ [Part Label Service] ${grouped.size} groupes créés`)

  // Log des groupes pour debug
  for (const [key, group] of grouped.entries()) {
    logger.debug(`  📦 ${key}: ${group.length} étiquettes`)
  }

  return grouped
}

/**
 * Trier les étiquettes par Length Setup (décroissant)
 * 
 * Requis pour l'affichage sur les étiquettes
 * 
 * @param labels - Liste d'étiquettes
 * @returns Liste triée par Length Setup décroissant
 */
export function sortLabelsByLengthSetup(labels: PartLabel[]): PartLabel[] {
  return labels.sort((a, b) => {
    const lengthA = parseFloat(a.lengthSetup) || 0
    const lengthB = parseFloat(b.lengthSetup) || 0
    return lengthB - lengthA // Décroissant
  })
}

/**
 * Préparer les étiquettes pour l'impression
 * 
 * Groupe et trie les étiquettes selon les règles Part Printer :
 * - Groupement par (Raw Material, Varnish Code)
 * - Tri par Length Setup décroissant dans chaque groupe
 * 
 * @param labels - Liste d'étiquettes
 * @returns Map de groupes triés
 */
export function prepareLabelsForPrinting(
  labels: PartLabel[]
): Map<string, PartLabel[]> {
  logger.debug(`🖨️ [Part Label Service] Préparation ${labels.length} étiquettes pour impression...`)

  const grouped = groupLabelsByMaterialAndVarnish(labels)

  // Trier chaque groupe par Length Setup
  for (const [key, group] of grouped.entries()) {
    const sorted = sortLabelsByLengthSetup(group)
    grouped.set(key, sorted)
    logger.debug(`  ✅ Groupe ${key}: ${sorted.length} étiquettes triées`)
  }

  logger.debug(`✅ [Part Label Service] Préparation terminée`)

  return grouped
}
