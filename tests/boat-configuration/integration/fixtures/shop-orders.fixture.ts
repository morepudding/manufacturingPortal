/**
 * Shop Orders Fixtures - Données RÉELLES capturées depuis IFS Cloud via Azure APIM
 * 
 * Source: scripts/investigate-ifs-data.ts
 * Date: 2025-11-12
 * Environment: Azure APIM AST (gbenapimgtaiscommondev.azure-api.net)
 * 
 * ⚠️ NE PAS MODIFIER - Ces fixtures reflètent la vraie structure IFS OData
 * 
 * @see tests/boat-configuration/integration/fixtures/ifs-real-data.json
 */

export interface IFSShopOrder {
  '@odata.etag': string
  luname: string
  keyref: string
  Objstate: string
  OrderNo: string
  ReleaseNo: string
  SequenceNo: string
  OrderCode: string
  Contract: string
  PartNo: string
  DopId: string | null
  Cf_Dop_Id: string | null
  Cf_Hull_Number: string | null
  PartDescription: string
  ConfigurationId: string
  ProcessType: string
  OrderReleaseSequenceConcat: string
  // ... autres champs disponibles (voir ifs-real-data.json)
}

/**
 * Shop Order 100563 - État Parked avec DOP ID composite "38 - 11342"
 * Hull Number: LX7MB0102
 */
export const SHOP_ORDER_100563: IFSShopOrder = {
  '@odata.etag': 'W/"Vy8iQUFBYkFJQUFZQUFEb0FIQUFIOjIwMjUwNzE2MDY0MzE0Ig=="',
  luname: 'ShopOrd',
  keyref: 'ORDER_NO=100563^RELEASE_NO=*^SEQUENCE_NO=*^',
  Objstate: 'Parked',
  OrderNo: '100563',
  ReleaseNo: '*',
  SequenceNo: '*',
  OrderCode: 'Manufacturing',
  Contract: 'FR019',
  PartNo: 'LX7MB0CDV0',
  DopId: '38 - 11342',
  Cf_Dop_Id: '38',
  Cf_Hull_Number: 'LX7MB0102',
  PartDescription: 'L7MB - CDV',
  ConfigurationId: '11803',
  ProcessType: 'DOP',
  OrderReleaseSequenceConcat: '100563 - * - *'
}

/**
 * Shop Order 100949 - État Closed sans DOP ID
 */
export const SHOP_ORDER_100949: IFSShopOrder = {
  '@odata.etag': 'W/"Vy8iQUFBYkFJQUFZQUFEb0F1QUFOOjIwMjUwMzAzMTUwOTI5Ig=="',
  luname: 'ShopOrd',
  keyref: 'ORDER_NO=100949^RELEASE_NO=*^SEQUENCE_NO=*^',
  Objstate: 'Closed',
  OrderNo: '100949',
  ReleaseNo: '*',
  SequenceNo: '*',
  OrderCode: 'Manufacturing',
  Contract: 'FR017',
  PartNo: 'C000000980994K002',
  DopId: null,
  Cf_Dop_Id: null,
  Cf_Hull_Number: null,
  PartDescription: 'W55 VAIGRAGE CENTRAL',
  ConfigurationId: '*',
  ProcessType: 'MRP',
  OrderReleaseSequenceConcat: '100949 - * - *'
}

/**
 * Shop Order 101043 - État Closed sans DOP ID
 */
export const SHOP_ORDER_101043: IFSShopOrder = {
  '@odata.etag': 'W/"Vy8iQUFBYkFJQUFZQUFEb0FiQUFGOjIwMjUwMzEzMDYxNjMyIg=="',
  luname: 'ShopOrd',
  keyref: 'ORDER_NO=101043^RELEASE_NO=*^SEQUENCE_NO=*^',
  Objstate: 'Closed',
  OrderNo: '101043',
  ReleaseNo: '*',
  SequenceNo: '*',
  OrderCode: 'Manufacturing',
  Contract: 'FR017',
  PartNo: 'C000001073056A018',
  DopId: null,
  Cf_Dop_Id: null,
  Cf_Hull_Number: null,
  PartDescription: 'VAIGRAGE',
  ConfigurationId: '*',
  ProcessType: 'MRP',
  OrderReleaseSequenceConcat: '101043 - * - *'
}

/**
 * Shop Order 297277 - État Cancelled sans DOP ID
 */
export const SHOP_ORDER_297277: IFSShopOrder = {
  '@odata.etag': 'W/"Vy8iQUFBYkFJQUFlQUFFaWJOQUFJOjIwMjUwNjEwMTUwNDIwIg=="',
  luname: 'ShopOrd',
  keyref: 'ORDER_NO=297277^RELEASE_NO=*^SEQUENCE_NO=*^',
  Objstate: 'Cancelled',
  OrderNo: '297277',
  ReleaseNo: '*',
  SequenceNo: '*',
  OrderCode: 'Manufacturing',
  Contract: 'FR017',
  PartNo: 'C000001504319A029',
  DopId: null,
  Cf_Dop_Id: null,
  Cf_Hull_Number: null,
  PartDescription: 'COTE',
  ConfigurationId: '*',
  ProcessType: 'MRP',
  OrderReleaseSequenceConcat: '297277 - * - *'
}

/**
 * Collection de tous les Shop Orders capturés
 */
export const ALL_SHOP_ORDERS = [
  SHOP_ORDER_100563,
  SHOP_ORDER_100949,
  SHOP_ORDER_101043,
  SHOP_ORDER_297277
]

/**
 * Helper: Filtrer Shop Orders par Order Number (simulation OData contains)
 */
export function filterShopOrdersByOrderNo(orderNo: string): IFSShopOrder[] {
  return ALL_SHOP_ORDERS.filter(order =>
    order.OrderNo.includes(orderNo)
  )
}
