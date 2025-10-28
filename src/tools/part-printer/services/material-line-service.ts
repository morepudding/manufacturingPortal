/**
 * 🏷️ Part Printer - Material Line Service
 * 
 * Service pour récupérer les Material Lines (composants/matériaux) d'un Shop Order
 * via la navigation OData MaterialArray.
 * 
 * DÉCOUVERTE : Les Material Lines sont dans une navigation OData depuis ShopOrds,
 * pas dans un endpoint séparé !
 * 
 * Endpoint : ShopOrderHandling.svc/ShopOrds(...)/MaterialArray
 * 
 * Documentation : /docs/api/shop-order-materials/README.md
 */

import { getIFSClient } from '@/shared/services/ifs-client'
import { logger } from '../utils/logger'

/**
 * Material Line d'un Shop Order (depuis MaterialArray)
 */
export interface MaterialLine {
  LineItemNo: number
  PartNo: string
  OperationNo: number
  QtyPerAssembly: number
  QtyRequired: number
  StructureLineNo: number
  DateRequired: string
  PartNoRef?: {
    Description: string
    UnitMeas: string
    Contract: string
  }
}

/**
 * Raw Material (matériau brut) utilisé dans l'opération 10
 */
export interface RawMaterial {
  partNo: string
  description: string
  quantity: number
  unitMeas: string
  structureLineNo: number
  dateRequired: Date
}

/**
 * Réponse OData de MaterialArray
 */
interface MaterialArrayResponse {
  '@odata.context': string
  value: MaterialLine[]
}

/**
 * Récupère toutes les Material Lines d'un Shop Order
 * 
 * @param orderNo - Numéro du Shop Order
 * @param releaseNo - Release Number (défaut: "*")
 * @param sequenceNo - Sequence Number (défaut: "*")
 * @returns Liste des Material Lines
 * 
 * @example
 * const materials = await getMaterialLines('454853')
 * logger.debug(`${materials.length} matériaux trouvés`)
 */
export async function getMaterialLines(
  orderNo: string,
  releaseNo: string = '*',
  sequenceNo: string = '*'
): Promise<MaterialLine[]> {
  logger.debug(`🔍 Récupération des Material Lines pour Shop Order ${orderNo}...`)
  
  const ifsClient = getIFSClient()
  
  try {
    // Navigation OData vers MaterialArray
    const endpoint = `ShopOrderHandling.svc/ShopOrds(OrderNo='${orderNo}',ReleaseNo='${releaseNo}',SequenceNo='${sequenceNo}')/MaterialArray`
    
    const response = await ifsClient.get<MaterialArrayResponse>(endpoint, {
      $select: 'LineItemNo,PartNo,OperationNo,QtyPerAssembly,QtyRequired,StructureLineNo,DateRequired',
      $expand: 'PartNoRef($select=Description,UnitMeas,Contract)',
      $orderby: 'OperationNo,StructureLineNo'
    })
    
    logger.debug(`✅ ${response.value.length} Material Lines trouvées`)
    
    return response.value
    
  } catch (error) {
    logger.error(`❌ Erreur lors de la récupération des Material Lines:`, error)
    throw new Error(`Failed to fetch material lines for Shop Order ${orderNo}: ${error}`)
  }
}

/**
 * Récupère le Raw Material (matériau brut) de l'opération 10 (OP10)
 * 
 * Le Raw Material est le PREMIER matériau de l'OP10, trié par StructureLineNo.
 * 
 * @param orderNo - Numéro du Shop Order
 * @param releaseNo - Release Number (défaut: "*")
 * @param sequenceNo - Sequence Number (défaut: "*")
 * @returns Raw Material de l'OP10
 * @throws Error si aucun matériau OP10 trouvé
 * 
 * @example
 * const rawMaterial = await getRawMaterial('454853')
 * logger.debug(`Raw Material: ${rawMaterial.partNo}`)
 * logger.debug(`Description: ${rawMaterial.description}`)
 */
export async function getRawMaterial(
  orderNo: string,
  releaseNo: string = '*',
  sequenceNo: string = '*'
): Promise<RawMaterial> {
  logger.debug(`🎯 Recherche du Raw Material (OP10) pour Shop Order ${orderNo}...`)
  
  // Récupérer toutes les Material Lines
  const materials = await getMaterialLines(orderNo, releaseNo, sequenceNo)
  
  // Filtrer les matériaux de l'opération 10
  const op10Materials = materials.filter(mat => mat.OperationNo === 10)
  
  if (op10Materials.length === 0) {
    logger.error(`❌ Aucun matériau trouvé pour l'OP10 du Shop Order ${orderNo}`)
    throw new Error(`No materials found for OP10 in Shop Order ${orderNo}`)
  }
  
  // Prendre le premier matériau (déjà trié par StructureLineNo)
  const rawMaterialLine = op10Materials[0]
  
  logger.debug(`✅ Raw Material trouvé: ${rawMaterialLine.PartNo}`)
  logger.debug(`   Description: ${rawMaterialLine.PartNoRef?.Description || 'N/A'}`)
  logger.debug(`   Quantité: ${rawMaterialLine.QtyPerAssembly} ${rawMaterialLine.PartNoRef?.UnitMeas || ''}`)
  
  // Convertir en format RawMaterial
  const rawMaterial: RawMaterial = {
    partNo: rawMaterialLine.PartNo,
    description: rawMaterialLine.PartNoRef?.Description || `Part ${rawMaterialLine.PartNo}`,
    quantity: rawMaterialLine.QtyPerAssembly,
    unitMeas: rawMaterialLine.PartNoRef?.UnitMeas || '',
    structureLineNo: rawMaterialLine.StructureLineNo,
    dateRequired: new Date(rawMaterialLine.DateRequired)
  }
  
  return rawMaterial
}

/**
 * Récupère les Material Lines pour une opération spécifique
 * 
 * @param orderNo - Numéro du Shop Order
 * @param operationNo - Numéro de l'opération (ex: 10, 20, 30, 40)
 * @param releaseNo - Release Number (défaut: "*")
 * @param sequenceNo - Sequence Number (défaut: "*")
 * @returns Liste des Material Lines de l'opération
 * 
 * @example
 * const op40Materials = await getMaterialLinesByOperation('454853', 40)
 * logger.debug(`OP40 a ${op40Materials.length} matériaux`)
 */
export async function getMaterialLinesByOperation(
  orderNo: string,
  operationNo: number,
  releaseNo: string = '*',
  sequenceNo: string = '*'
): Promise<MaterialLine[]> {
  logger.debug(`🔍 Récupération des Material Lines pour OP${operationNo} du Shop Order ${orderNo}...`)
  
  // Récupérer toutes les Material Lines
  const materials = await getMaterialLines(orderNo, releaseNo, sequenceNo)
  
  // Filtrer par numéro d'opération
  const opMaterials = materials.filter(mat => mat.OperationNo === operationNo)
  
  logger.debug(`✅ ${opMaterials.length} Material Lines trouvées pour OP${operationNo}`)
  
  return opMaterials
}

/**
 * Vérifie si un Shop Order a des matériaux pour l'OP10
 * 
 * @param orderNo - Numéro du Shop Order
 * @param releaseNo - Release Number (défaut: "*")
 * @param sequenceNo - Sequence Number (défaut: "*")
 * @returns true si au moins un matériau OP10 existe
 * 
 * @example
 * const hasOP10Materials = await hasOP10Materials('454853')
 * if (hasOP10Materials) {
 *   logger.debug('Shop Order a des matériaux OP10')
 * }
 */
export async function hasOP10Materials(
  orderNo: string,
  releaseNo: string = '*',
  sequenceNo: string = '*'
): Promise<boolean> {
  try {
    const materials = await getMaterialLines(orderNo, releaseNo, sequenceNo)
    const op10Materials = materials.filter(mat => mat.OperationNo === 10)
    return op10Materials.length > 0
  } catch (error) {
    logger.error(`❌ Erreur lors de la vérification des matériaux OP10:`, error)
    return false
  }
}
