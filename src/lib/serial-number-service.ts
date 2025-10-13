/**
 * Service Serial Number - Récupération des numéros de série depuis IFS
 * 
 * Fonctionnalités:
 * - Récupération des Serial Numbers via DOP Header ID
 * - Utilisation de l'endpoint Reference_DopHeadSerialReserv
 * 
 * Endpoint IFS:
 * DopHeaderHandling.svc/Reference_DopHeadSerialReserv
 * 
 * Champs disponibles:
 * - DopId: ID du DOP Header
 * - SerialNo: Numéro de série du bateau
 * - PartNo: Référence article
 * - SerialSource: Origine ("Shop Order", etc.)
 */

import { getIFSClient } from './ifs-client'
import type { IFSODataResponse, DopHeadSerialReservation } from '@/core/types/ifs'

/**
 * Récupérer le premier Serial Number associé à un DOP ID
 * 
 * @param dopId - DOP Header ID (ex: "54", "95", "103")
 * @returns Serial Number trouvé ou null si aucun
 * 
 * @example
 * ```typescript
 * const serialNo = await getFirstSerialNumberFromDop("95")
 * // → "LG5MA0114"
 * ```
 */
export async function getFirstSerialNumberFromDop(dopId: string): Promise<string | null> {
  if (!dopId) {
    console.warn('⚠️ getFirstSerialNumberFromDop: Empty DOP ID provided')
    return null
  }

  console.log(`🔍 Searching Serial Number for DOP ID: ${dopId}`)

  const client = getIFSClient()

  try {
    // Construire le filtre OData
    // Note: Utiliser contains() car eq avec strings pose problème
    const filter = `contains(DopId,'${dopId.trim()}')`

    console.log(`📊 OData filter: ${filter}`)

    // Requête IFS
    const response = await client.get<IFSODataResponse<DopHeadSerialReservation>>(
      'DopHeaderHandling.svc/Reference_DopHeadSerialReserv',
      {
        $filter: filter,
        $select: 'DopId,SerialNo,PartNo',
        $top: '50', // Limiter le nombre de résultats
      }
    )

    // Vérifier si des résultats ont été trouvés
    if (!response.value || response.value.length === 0) {
      console.log(`ℹ️ No Serial Number found for DOP ID: ${dopId}`)
      return null
    }

    console.log(`✅ Found ${response.value.length} Serial Number(s)`)

    // Retourner le premier Serial Number trouvé
    const firstResult = response.value[0]
    console.log(`✅ Serial Number found: ${firstResult.SerialNo}`)

    return firstResult.SerialNo
  } catch (error) {
    console.error(`❌ Failed to fetch Serial Number for DOP ID ${dopId}:`, error)
    throw new Error(
      `Failed to fetch Serial Number: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

/**
 * Récupérer tous les Serial Numbers associés à un DOP ID
 * 
 * @param dopId - DOP Header ID (ex: "54", "95", "103")
 * @returns Liste des Serial Numbers trouvés
 * 
 * @example
 * ```typescript
 * const serialNumbers = await getAllSerialNumbersFromDop("95")
 * // → ["LG5MA0114", "LG5MA0115"]
 * ```
 */
export async function getAllSerialNumbersFromDop(dopId: string): Promise<DopHeadSerialReservation[]> {
  if (!dopId) {
    console.warn('⚠️ getAllSerialNumbersFromDop: Empty DOP ID provided')
    return []
  }

  console.log(`🔍 Searching all Serial Numbers for DOP ID: ${dopId}`)

  const client = getIFSClient()

  try {
    // Construire le filtre OData
    const filter = `contains(DopId,'${dopId.trim()}')`

    console.log(`📊 OData filter: ${filter}`)

    // Requête IFS
    const response = await client.get<IFSODataResponse<DopHeadSerialReservation>>(
      'DopHeaderHandling.svc/Reference_DopHeadSerialReserv',
      {
        $filter: filter,
        $select: 'DopId,SerialNo,PartNo,SerialSource',
        $top: '100', // Augmenter la limite pour récupérer tous les résultats
      }
    )

    console.log(`✅ Found ${response.value.length} Serial Number(s)`)

    return response.value
  } catch (error) {
    console.error(`❌ Failed to fetch Serial Numbers for DOP ID ${dopId}:`, error)
    throw new Error(
      `Failed to fetch Serial Numbers: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

/**
 * Vérifier si un DOP ID a des Serial Numbers associés
 * 
 * @param dopId - DOP Header ID (ex: "54", "95", "103")
 * @returns true si au moins un Serial Number existe, false sinon
 */
export async function hasSerialNumbers(dopId: string): Promise<boolean> {
  if (!dopId) return false

  try {
    const serialNo = await getFirstSerialNumberFromDop(dopId)
    return serialNo !== null
  } catch (error) {
    console.error(`❌ Error checking Serial Numbers for DOP ID ${dopId}:`, error)
    return false
  }
}
