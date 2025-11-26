/**
 * Customer Orders Fixtures - Données de fallback (401 JWT sur APIM)
 * 
 * Source: Données validées dans tests unitaires (Phase 2)
 * Date: 2025-11-12
 * 
 * ⚠️ Ces fixtures sont basées sur des données de test validées car l'endpoint
 * CustomerOrderHandling.svc retourne 401 JWT via Azure APIM AST
 * 
 * TODO: Mettre à jour avec vraies données quand l'endpoint sera accessible
 */

/*
 * Customer Orders Fixtures - populated from ifs-real-data-direct.json samples
 * Contains a small realistic sample of Customer Order Lines and Headers
 * Source: tests/boat-configuration/integration/fixtures/ifs-real-data-direct.json
 */

export interface IFSCustomerOrderLine {
  OrderNo: string
  LineNo: string
  RelNo: string
  Contract: string
  CatalogNo: string
  PartNo?: string
  CatalogDesc?: string
  CustomerNo?: string
  CHullNumber?: string  // Hull Number / Serial Number
  BuyQtyDue?: number
  SalesUnitMeas?: string
  WantedDeliveryDate?: string
  PlannedDeliveryDate?: string
  PromisedDeliveryDate?: string
}

export interface IFSCustomerOrderHeader {
  OrderNo: string
  Contract?: string
  CustomerNo?: string
  CustomerName?: string
  CurrencyCode?: string
  OrderDate?: string
  Objstate?: string
}

/** Sample Customer Order Lines (from direct IFS capture) */
export const CUSTOMER_ORDER_LINE_C1000000933_L1: IFSCustomerOrderLine = {
  OrderNo: 'C1000000933',
  LineNo: '1',
  RelNo: '1',
  Contract: 'FR05A',  // Changed to FR05A for Boat Configuration testing
  CatalogNo: 'D0579K',
  PartNo: 'D0579K',
  CatalogDesc: 'POUF AVEC POIGNEE - C3519N - CREVIN CREDO 54 + PP TAUPE SJA 3729',
  CustomerNo: 'FR018',
  CHullNumber: 'LG5XA0057',  // Mock hull number for testing
  BuyQtyDue: 1,
  SalesUnitMeas: 'pcs',
  WantedDeliveryDate: '2024-11-25T00:00:00Z',
  PlannedDeliveryDate: '2024-11-25T00:00:00Z',
  PromisedDeliveryDate: '2025-01-15T00:00:00Z'
}

export const CUSTOMER_ORDER_LINE_C1000000933_L2: IFSCustomerOrderLine = {
  OrderNo: 'C1000000933',
  LineNo: '2',
  RelNo: '1',
  Contract: 'FR020',
  CatalogNo: 'D0539Q',
  PartNo: 'D0539Q',
  CatalogDesc: 'PART SAMPLE 2',
  CustomerNo: 'FR018',
  BuyQtyDue: 1,
  SalesUnitMeas: 'pcs'
}

export const CUSTOMER_ORDER_LINE_C1000000933_L3: IFSCustomerOrderLine = {
  OrderNo: 'C1000000933',
  LineNo: '3',
  RelNo: '1',
  Contract: 'FR020',
  CatalogNo: 'D1849K',
  PartNo: 'D1849K',
  CatalogDesc: 'PART SAMPLE 3',
  CustomerNo: 'FR018',
  BuyQtyDue: 1,
  SalesUnitMeas: 'pcs'
}

/** Sample Customer Order Headers (from direct IFS capture) */
export const CUSTOMER_ORDER_HEADER_C1000000933: IFSCustomerOrderHeader = {
  OrderNo: 'C1000000933',
  Contract: 'FR020',
  CustomerNo: 'FR018',
  CustomerName: 'CONSTRUCTION NAVALE BORDEAUX - BDX TAKT COURT',
  CurrencyCode: 'EUR',
  OrderDate: '2025-02-12T00:00:00Z',
  Objstate: 'Invoiced'
}

export const CUSTOMER_ORDER_HEADER_C1000000934: IFSCustomerOrderHeader = {
  OrderNo: 'C1000000934',
  Contract: 'FR020',
  CustomerNo: 'FR018',
  CustomerName: 'CONSTRUCTION NAVALE BORDEAUX - BDX TAKT COURT',
  CurrencyCode: 'EUR',
  OrderDate: '2025-02-12T00:00:00Z',
  Objstate: 'Invoiced'
}

export const ALL_CUSTOMER_ORDER_LINES: IFSCustomerOrderLine[] = [
  CUSTOMER_ORDER_LINE_C1000000933_L1,
  CUSTOMER_ORDER_LINE_C1000000933_L2,
  CUSTOMER_ORDER_LINE_C1000000933_L3
]

export const ALL_CUSTOMER_ORDER_HEADERS: IFSCustomerOrderHeader[] = [
  CUSTOMER_ORDER_HEADER_C1000000933,
  CUSTOMER_ORDER_HEADER_C1000000934
]

export function filterCustomerOrderLinesByOrderNo(orderNo: string) {
  return ALL_CUSTOMER_ORDER_LINES.filter(l => l.OrderNo === orderNo)
}

export function filterCustomerOrderLinesByHullNumber(hullNumber: string, contract?: string) {
  return ALL_CUSTOMER_ORDER_LINES.filter(l => {
    const hullMatch = l.CHullNumber === hullNumber
    const contractMatch = !contract || l.Contract === contract
    return hullMatch && contractMatch
  })
}

export function getCustomerOrderHeaderByOrderNo(orderNo: string) {
  return ALL_CUSTOMER_ORDER_HEADERS.find(h => h.OrderNo === orderNo) || null
}
