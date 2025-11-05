/**
 * Types spécifiques à l'outil Boat Configuration Editor
 */

// Shop Order Types
export interface ShopOrder {
  OrderNo: string
  ReleaseNo: string
  SequenceNo: string
  PartNo: string
  Contract: string
  DopId?: string
  DopStructureId?: string
  State?: string
  DateEntered?: string
  RevisedStartDate?: string
}

export interface ShopOrderSearchParams {
  orderNo: string
  releaseNo?: string
  sequenceNo?: string
}

export interface ShopOrderSearchResult {
  success: boolean
  data?: ShopOrder
  error?: string
}

// Serial Number Types
export interface SerialNumber {
  SerialNo: string
  PartNo: string
  PartRevision: string
  DopHeaderId: string
  ManufacturedDate?: string
  EngSerialNo?: string
}

export interface SerialNumberResult {
  success: boolean
  data?: SerialNumber
  error?: string
}

// Customer Order Types
export interface CustomerOrder {
  OrderNo: string
  LineNo: string
  RelNo: string
  SerialNo: string
  PartNo: string
  CustomerName?: string
  DeliveryAddress?: string
  PlannedShipDate?: string
}

export interface CustomerOrderResult {
  success: boolean
  data?: CustomerOrder
  error?: string
}

// Print Types
export interface PrintRequest {
  serialNumber: string
  dopHeaderId: string
  printer: string
  language: string
}

export interface PrintResult {
  success: boolean
  message?: string
  resultKey?: string | number
  reportTitle?: string
  layoutName?: string
  pdfInfo?: {
    fileName: string
    size: number
    created: string
    id: string
  }
  error?: string
}

// Workflow State
export interface BoatConfigWorkflowState {
  step: 1 | 2 | 3
  shopOrder?: ShopOrder
  serialNumber?: SerialNumber
  customerOrder?: CustomerOrder
  selectedPrinter?: string
  selectedLanguage?: string
  printResult?: PrintResult
}
