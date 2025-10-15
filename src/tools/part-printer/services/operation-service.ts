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
  // Autres champs selon besoin
}

/**
 * Données de l'opération 10 enrichies
 */
export interface Operation10Data {
  orderNo: string
  releaseNo: string
  sequenceNo: string
  operationNo: number
  blockId: string | null // ⚠️ IMPORTANT: Peut être null (valeur valide)
  rawMaterial: string // Part code de la première ligne de composant (TODO Phase 3.2)
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
 * console.log("Raw Material:", op10.rawMaterial) // TODO Phase 3.2
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
        $select: 'OrderNo,ReleaseNo,SequenceNo,OperationNo,OperationBlockId,OperationDescription,WorkCenterNo',
      }
    )

    const operation = operationResponse.value?.[0]

    if (!operation) {
      console.warn(`⚠️  [Operation Service] OP10 non trouvée pour ${orderNo}`)
      throw new Error(`Operation 10 not found for ${orderNo}-${releaseNo}-${sequenceNo}`)
    }

    // ⚠️ IMPORTANT: OperationBlockId peut être null (c'est normal)
    const blockId = operation.OperationBlockId || null
    console.log(`✅ [Operation Service] OP10 trouvée - Block ID: ${blockId || '(vide)'}`)

    // 2. TODO Phase 3.2: Récupérer le Raw Material via MaterialHandling
    // Pour l'instant, on utilise une valeur temporaire
    const rawMaterial = `RAW_MATERIAL_${orderNo}` // TODO: Implémenter MaterialHandling

    return {
      orderNo,
      releaseNo,
      sequenceNo,
      operationNo: 10,
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
