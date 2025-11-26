/**
 * DOP Headers (Serial Numbers) Fixtures - Données RÉELLES capturées depuis IFS Cloud via Azure APIM
 * 
 * Source: scripts/investigate-ifs-data.ts
 * Date: 2025-11-12
 * Environment: Azure APIM AST (gbenapimgtaiscommondev.azure-api.net)
 * 
 * ⚠️ NE PAS MODIFIER - Ces fixtures reflètent la vraie structure IFS OData
 * 
 * @see tests/boat-configuration/integration/fixtures/ifs-real-data.json
 */

export interface IFSDopHeader {
  luname: string
  keyref: string
  DopId: string
  PartNo: string
  SerialNo: string
  ConditionCode: string | null
  SerialSourceDb: string
  SerialSource: string
}

/**
 * DOP Header 148 - Serial Number LG5XA0019
 * Source: Shop Order
 */
export const DOP_HEADER_148: IFSDopHeader = {
  luname: 'SerialNoReservation',
  keyref: 'DOP_ID=148^PART_NO=LG5XA^SERIAL_NO=LG5XA0019^',
  DopId: '148',
  PartNo: 'LG5XA',
  SerialNo: 'LG5XA0019',
  ConditionCode: null,
  SerialSourceDb: 'SHOP ORDER',
  SerialSource: 'Shop Order'
}

/**
 * DOP Header 95 - Serial Number LG5MA0114
 * Source: DOP Order
 */
export const DOP_HEADER_95: IFSDopHeader = {
  luname: 'SerialNoReservation',
  keyref: 'DOP_ID=95^PART_NO=LG5MA^SERIAL_NO=LG5MA0114^',
  DopId: '95',
  PartNo: 'LG5MA',
  SerialNo: 'LG5MA0114',
  ConditionCode: null,
  SerialSourceDb: 'DOP ORDER',
  SerialSource: 'DOP Order'
}

/**
 * Collection de tous les DOP Headers capturés
 */
export const ALL_DOP_HEADERS = [
  DOP_HEADER_148,
  DOP_HEADER_95
]

/**
 * Helper: Filtrer DOP Headers par DOP ID (simulation OData contains)
 */
export function filterDopHeadersByDopId(dopId: string): IFSDopHeader[] {
  return ALL_DOP_HEADERS.filter(header =>
    header.DopId.includes(dopId)
  )
}

/**
 * Helper: Récupérer le premier Serial Number d'un DOP ID
 */
export function getFirstSerialNumberByDopId(dopId: string): string | null {
  const filtered = filterDopHeadersByDopId(dopId)
  return filtered.length > 0 ? filtered[0].SerialNo : null
}
