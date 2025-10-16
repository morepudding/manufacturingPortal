/**
 * Service Operation - Extraction des données d'opérations
 * 
 * Phase 3.1 - Extraction Operation No 10
 * 
 * Endpoint IFS: OperationBlockHandling.svc/Reference_ShopOrderOperation
 * 
 * Données extraites :
 * - OperationBlockId de l'opération 10 (peut être null)
 * - Raw Material (à récupérer via MaterialHandling - TODO Phase 3.2)
 * 
 * Documentation complète : /docs/api/operation-block/README.md
 */

import { getIFSClient } from '@/shared/services/ifs-client'
import type { IFSODataResponse } from '@/shared/types/ifs'

/**
 * Interface pour une opération IFS
 * Source: OperationBlockHandling.svc/Reference_ShopOrderOperation
 */
export interface IFSOperation {
  OrderNo: string
  ReleaseNo: string
  SequenceNo: string
  OperationNo: number
  OpId: string // Operation ID (unique identifier)
  OperationBlockId: string | null // ⚠️ IMPORTANT: Peut être null (valeur valide)
  OperationDescription?: string
  WorkCenterNo?: string
}

/**
 * Interface pour une ligne de composant (Material Line)
 */
export interface IFSMaterialLine {
  OrderNo: string
  ReleaseNo: string
  SequenceNo: string
  OperationNo: number
  LineItemNo: number
  PartNo: string // Raw Material Part Code
  Qty?: number
  QtyPerAssembly?: number
  QtyRequired?: number
}

/**
 * Données de l'opération 10 enrichies
 */
export interface Operation10Data {
  orderNo: string
  releaseNo: string
  sequenceNo: string
  operationNo: number
  
  // ⚠️ TEMPORAIRE (AST/Dev) : opId utilisé comme fallback pour Block ID
  // TODO PRODUCTION : Utiliser uniquement blockId quand disponible en PROD
  opId: string // Operation ID (unique identifier) - Utilisé temporairement en AST
  
  // ⚠️ TEMPORAIRE (AST/Dev) : blockId peut être null ou OpId
  // TODO PRODUCTION : Remplacer par le vrai OP 10 Block ID quand disponible en PROD
  // En AST (Dev), le Block ID n'est pas disponible, on utilise OpId temporairement
  blockId: string | null // ⚠️ IMPORTANT: Peut être null (valeur valide)
  
  rawMaterial: string // Part code de la première ligne de composant
}

/**
 * Récupérer le Raw Material d'un Shop Order (Material Line OP10)
 * 
 * Utilise la navigation OData MaterialArray sur ShopOrds
 * 
 * @param orderNo - Numéro d'ordre
 * @param releaseNo - Numéro de release
 * @param sequenceNo - Numéro de séquence
 * @returns Part code du Raw Material (première ligne de composant OP10)
 */
async function getRawMaterial(
  orderNo: string,
  releaseNo: string,
  sequenceNo: string
): Promise<string> {
  console.log(`🏭 [Operation Service] Récupération Raw Material (OP10) pour ${orderNo}`)

  try {
    const client = getIFSClient()

    // Récupérer les Material Lines de l'opération 10
    const materialResponse = await client.get<IFSODataResponse<IFSMaterialLine>>(
      `ShopOrderHandling.svc/ShopOrds(OrderNo='${orderNo}',ReleaseNo='${releaseNo}',SequenceNo='${sequenceNo}')/MaterialArray`,
      {
        $filter: 'OperationNo eq 10',
        $select: 'LineItemNo,PartNo,OperationNo',
        $orderby: 'LineItemNo',
        $top: '1', // On ne prend que la première ligne
      }
    )

    const firstMaterial = materialResponse.value?.[0]

    if (!firstMaterial) {
      console.warn(`⚠️  [Operation Service] Aucun matériau OP10 trouvé pour ${orderNo}`)
      throw new Error(`No material found for Operation 10`)
    }

    console.log(`✅ [Operation Service] Raw Material trouvé: ${firstMaterial.PartNo}`)
    return firstMaterial.PartNo

  } catch (error) {
    console.error(`❌ [Operation Service] Erreur Raw Material pour ${orderNo}:`, error)
    throw new Error(`Failed to fetch Raw Material: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Récupérer les données de l'opération 10 pour un Shop Order
 * 
 * Utilise l'endpoint IFS validé : OperationBlockHandling.svc/Reference_ShopOrderOperation
 * Documentation : /docs/api/operation-block/README.md
 * 
 * @param orderNo - Numéro d'ordre
 * @param releaseNo - Numéro de release
 * @param sequenceNo - Numéro de séquence
 * @returns Données de l'opération 10 (OperationBlockId + Raw Material)
 * 
 * @example
 * ```typescript
 * const op10 = await getOperation10Data("454853", "*", "*")
 * console.log("Block ID:", op10.blockId) // peut être null
 * console.log("Raw Material:", op10.rawMaterial)
 * ```
 */
export async function getOperation10Data(
  orderNo: string,
  releaseNo: string,
  sequenceNo: string
): Promise<Operation10Data> {
  console.log(`🔍 [Operation Service] Récupération OP10 pour ${orderNo}-${releaseNo}-${sequenceNo}`)

  try {
    const client = getIFSClient()

    // 1. Récupérer l'opération 10 via OperationBlockHandling
    const operationResponse = await client.get<IFSODataResponse<IFSOperation>>(
      'OperationBlockHandling.svc/Reference_ShopOrderOperation',
      {
        $filter: `OrderNo eq '${orderNo}' and OperationNo eq 10`,
        $select: 'OrderNo,ReleaseNo,SequenceNo,OperationNo,OpId,OperationBlockId,OperationDescription,WorkCenterNo',
      }
    )

    const operation = operationResponse.value?.[0]

    if (!operation) {
      console.warn(`⚠️  [Operation Service] OP10 non trouvée pour ${orderNo}`)
      throw new Error(`Operation 10 not found for ${orderNo}-${releaseNo}-${sequenceNo}`)
    }

    // Récupérer OpId (toujours présent)
    const opId = operation.OpId
    
    // ⚠️ IMPORTANT: OperationBlockId peut être null (c'est normal)
    // ⚠️ TEMPORAIRE (AST/Dev) : On récupère l'OperationBlockId (souvent vide en AST)
    // TODO PRODUCTION : En PROD, utiliser le vrai OP 10 Block ID
    // En attendant, on utilise OpId comme fallback temporaire (voir types/index.ts)
    const blockId = operation.OperationBlockId || null
    console.log(`✅ [Operation Service] OP10 trouvée - OpId: ${opId}, Block ID: ${blockId || '(vide)'}`)

    // 2. Récupérer le Raw Material via MaterialArray
    const rawMaterial = await getRawMaterial(orderNo, releaseNo, sequenceNo)

    return {
      orderNo,
      releaseNo,
      sequenceNo,
      operationNo: 10,
      opId, // ✅ Operation ID (utilisé temporairement en AST)
      blockId,
      rawMaterial,
    }
  } catch (error) {
    console.error(`❌ [Operation Service] Erreur OP10 pour ${orderNo}-${releaseNo}-${sequenceNo}:`, error)
    throw new Error(`Failed to fetch Operation 10 data: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Récupérer une opération spécifique (générique)
 * 
 * @param orderNo - Numéro d'ordre
 * @param releaseNo - Numéro de release
 * @param sequenceNo - Numéro de séquence
 * @param operationNo - Numéro d'opération
 * @returns Opération trouvée ou null
 */
export async function getOperation(
  orderNo: string,
  releaseNo: string,
  sequenceNo: string,
  operationNo: number
): Promise<IFSOperation | null> {
  console.log(`🔍 [Operation Service] Récupération opération ${operationNo} pour ${orderNo}-${releaseNo}-${sequenceNo}`)

  try {
    const client = getIFSClient()

    const response = await client.get<IFSODataResponse<IFSOperation>>(
      'OperationBlockHandling.svc/Reference_ShopOrderOperation',
      {
        $filter: `OrderNo eq '${orderNo}' and OperationNo eq ${operationNo}`,
        $select: 'OrderNo,ReleaseNo,SequenceNo,OperationNo,OperationBlockId,OperationDescription,WorkCenterNo',
      }
    )

    const operation = response.value?.[0] || null

    if (operation) {
      console.log(`✅ [Operation Service] Opération ${operationNo} trouvée - Block ID: ${operation.OperationBlockId || '(vide)'}`)
    } else {
      console.log(`⚠️ [Operation Service] Opération ${operationNo} non trouvée`)
    }

    return operation
  } catch (error) {
    console.error(`❌ [Operation Service] Erreur opération ${operationNo}:`, error)
    throw new Error(`Failed to fetch operation ${operationNo}`)
  }
}

/**
 * Vérifier si une opération a un OperationBlockId vide/null
 * 
 * ⚠️ IMPORTANT: OperationBlockId peut être null (c'est une valeur valide)
 * 
 * @param orderNo - Numéro d'ordre
 * @param releaseNo - Numéro de release
 * @param sequenceNo - Numéro de séquence
 * @param operationNo - Numéro d'opération
 * @returns true si OperationBlockId est vide/null, false sinon
 */
export async function hasEmptyBlockId(
  orderNo: string,
  releaseNo: string,
  sequenceNo: string,
  operationNo: number
): Promise<boolean> {
  try {
    const operation = await getOperation(orderNo, releaseNo, sequenceNo, operationNo)
    
    if (!operation) {
      return false
    }

    const isEmpty = !operation.OperationBlockId || operation.OperationBlockId.trim() === ''
    console.log(`📊 [Operation Service] OP${operationNo} Block ID ${isEmpty ? 'vide' : 'présent'}: "${operation.OperationBlockId || ''}"`)
    
    return isEmpty
  } catch (error) {
    console.error(`❌ [Operation Service] Erreur vérification Block ID:`, error)
    return false
  }
}
