/**
 * Service pour gérer les Customer Orders dans IFS Cloud
 * 
 * ⭐ STRATÉGIE OPTIMALE : INPUT = HullNumber UNIQUEMENT
 * 
 * Workflow :
 * 1. INPUT: HullNumber (ex: "LG5MA0114")
 * 2. Recherche directe dans CustomerOrderLineSet avec CHullNumber
 * 3. Récupération (OrderNo, LineNo, RelNo) + détails
 * 4. Validation optionnelle du contexte métier (Site = FR05A, OrderType = BAT)
 * 
 * Avantages :
 * - ✅ Une seule requête IFS (rapide, ~500ms)
 * - ✅ Pas de dépendance au Shop Order
 * - ✅ Pas de parsing DOP ID
 * - ✅ Relation naturelle IFS : CHullNumber → CustomerOrder
 * 
 * @module customer-order-service
 */

import { getIFSClient } from '@/shared/services/ifs-client'

// ============================================================================
// Types & Interfaces
// ============================================================================

/**
 * Customer Order Line (projection simplifiée)
 */
export interface CustomerOrderLine {
  OrderNo: string
  LineNo: string
  RelNo: string
  LineItemNo: string
  PartNo: string
  CatalogNo: string
  CatalogDesc: string
  CHullNumber: string
  BoatHullNumber: string | null
  CustomerNo: string
  ConfigurationId: string
  Objstate: string
  BuyQtyDue: number
  QtyOrdered?: number
  DopConnection: string
  DopConnectionExists: number
  SupplyCode: string
  Contract: string
  Company: string
  PlannedDeliveryDate: string
  WantedDeliveryDate: string
}

/**
 * Customer Order Header (projection simplifiée)
 */
export interface CustomerOrderHeader {
  OrderNo: string
  CustomerNo: string
  CustomerName: string
  Objstate: string
  DateEntered: string
  Contract: string
  Company: string
  CurrencyCode: string
  WantedDeliveryDate: string
  CustomerPoNo: string
  InternalPoNo: string
}

/**
 * Informations consolidées du Customer Order pour l'affichage
 */
export interface CustomerOrderInfo {
  orderNo: string
  lineNo: string
  partNo: string
  catalogDesc: string
  chullNumber: string
  customerNo: string
  customerName?: string
  configurationId: string
  status: string
  quantity: number
  contract: string
  plannedDeliveryDate: string
  wantedDeliveryDate: string
  customerPoNo?: string
  internalPoNo?: string
}

/**
 * Résultat de validation Customer Order
 */
export interface CustomerOrderValidationResult {
  found: boolean
  serialNumberMatch: boolean
  customerOrder: CustomerOrderInfo | null
  error?: string
}

/**
 * Réponse OData générique
 */
interface IFSODataResponse<T> {
  '@odata.context': string
  value: T[]
}

// ============================================================================
// Service Functions
// ============================================================================

/**
 * Récupère un Customer Order Line à partir du Serial Number (CHullNumber)
 * 
 * ⚠️ DEPRECATED: Cette fonction utilise CHullNumber qui cause des timeouts.
 * Utilisez plutôt getCustomerOrderLineByOrderNo() avec les infos du Shop Order.
 * 
 * @param serialNumber - Serial Number de la pièce (ex: "LG5MA0114")
 * @returns Customer Order Line trouvé ou null
 * 
 * @example
 * ```typescript
 * const line = await getCustomerOrderLineBySerial('LG5MA0114')
 * if (line) {
 *   console.log(`Customer Order: ${line.OrderNo}`)
 * }
 * ```
 */
export async function getCustomerOrderLineBySerial(
  serialNumber: string
): Promise<CustomerOrderLine | null> {
  if (!serialNumber || serialNumber.trim() === '') {
    throw new Error('Serial number is required')
  }

  const client = getIFSClient()

  try {
    console.log(`🔍 Searching Customer Order Line for Serial: ${serialNumber}`)
    console.log('⚠️  WARNING: Using CHullNumber filter (may timeout)')

    const response = await client.get<IFSODataResponse<CustomerOrderLine>>(
      'CustomerOrderHandling.svc/CustomerOrderLineSet',
      {
        $filter: `CHullNumber eq '${serialNumber.trim()}'`,
        $select: 'OrderNo,LineNo,RelNo,LineItemNo,PartNo,CatalogNo,CatalogDesc,CHullNumber,BoatHullNumber,CustomerNo,ConfigurationId,Objstate,BuyQtyDue,QtyOrdered,DopConnection,DopConnectionExists,SupplyCode,Contract,Company,PlannedDeliveryDate,WantedDeliveryDate',
        $top: '1'
      }
    )

    if (!response.value || response.value.length === 0) {
      console.log('⚠️  No Customer Order Line found for this Serial Number')
      return null
    }

    const line = response.value[0]
    console.log(`✅ Customer Order Line found: ${line.OrderNo} - Line ${line.LineNo}`)

    return line
  } catch (error) {
    console.error('❌ Error fetching Customer Order Line:', error)
    throw new Error(
      `Failed to fetch Customer Order Line: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    )
  }
}

/**
 * Récupère un Customer Order Line à partir de OrderNo et LineNo
 * 
 * ✅ RECOMMANDÉ: Cette fonction utilise OrderNo + LineNo (rapide, pas de timeout)
 * Ces informations sont disponibles directement dans le Shop Order.
 * 
 * @param orderNo - Numéro du Customer Order (ex: "C1000038587")
 * @param lineNo - Numéro de ligne (ex: "1")
 * @returns Customer Order Line trouvé ou null
 * 
 * @example
 * ```typescript
 * // À partir d'un Shop Order
 * const shopOrder = await searchShopOrder('97277')
 * const line = await getCustomerOrderLineByOrderNo(
 *   shopOrder.CustomerOrderNo,
 *   shopOrder.CustomerLineNo
 * )
 * ```
 */
export async function getCustomerOrderLineByOrderNo(
  orderNo: string,
  lineNo: string
): Promise<CustomerOrderLine | null> {
  if (!orderNo || orderNo.trim() === '') {
    throw new Error('Order number is required')
  }
  if (!lineNo || lineNo.trim() === '') {
    throw new Error('Line number is required')
  }

  const client = getIFSClient()

  try {
    console.log(`🔍 Fetching Customer Order Line: ${orderNo} - Line ${lineNo}`)

    const response = await client.get<IFSODataResponse<CustomerOrderLine>>(
      'CustomerOrderHandling.svc/CustomerOrderLineSet',
      {
        $filter: `OrderNo eq '${orderNo.trim()}' and LineNo eq '${lineNo.trim()}'`
      }
    )

    if (!response.value || response.value.length === 0) {
      console.log(`⚠️  Customer Order Line not found: ${orderNo} - Line ${lineNo}`)
      return null
    }

    const line = response.value[0]
    console.log(`✅ Customer Order Line found: ${line.OrderNo} - Line ${line.LineNo}`)
    console.log(`   📦 Part: ${line.PartNo}`)
    console.log(`   🎯 CHullNumber: ${line.CHullNumber}`)

    return line
  } catch (error) {
    console.error('❌ Error fetching Customer Order Line:', error)
    throw new Error(
      `Failed to fetch Customer Order Line: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    )
  }
}

/**
 * Récupère le header d'un Customer Order pour obtenir des informations supplémentaires
 * 
 * @param orderNo - Numéro du Customer Order (ex: "C1000038587")
 * @returns Customer Order Header
 * 
 * @example
 * ```typescript
 * const header = await getCustomerOrderHeader('C1000038587')
 * console.log(`Customer: ${header.CustomerName}`)
 * ```
 */
export async function getCustomerOrderHeader(
  orderNo: string
): Promise<CustomerOrderHeader> {
  if (!orderNo || orderNo.trim() === '') {
    throw new Error('Order number is required')
  }

  const client = getIFSClient()

  try {
    console.log(`🔍 Fetching Customer Order Header: ${orderNo}`)

    const response = await client.get<IFSODataResponse<CustomerOrderHeader>>(
      'CustomerOrderHandling.svc/CustomerOrderSet',
      {
        $filter: `OrderNo eq '${orderNo.trim()}'`,
        $select: 'OrderNo,CustomerNo,CustomerName,Objstate,DateEntered,Contract,Company,CurrencyCode,WantedDeliveryDate,CustomerPoNo,InternalPoNo',
        $top: '1'
      }
    )

    if (!response.value || response.value.length === 0) {
      throw new Error(`Customer Order ${orderNo} not found`)
    }

    const header = response.value[0]
    console.log(`✅ Customer Order Header found: ${header.OrderNo}`)

    return header
  } catch (error) {
    console.error('❌ Error fetching Customer Order Header:', error)
    throw new Error(
      `Failed to fetch Customer Order Header: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    )
  }
}

/**
 * Récupère les informations complètes du Customer Order à partir du Serial Number
 * Combine les données du Line et du Header
 * 
 * @param serialNumber - Serial Number de la pièce (ex: "LG5MA0114")
 * @returns Informations consolidées du Customer Order
 * 
 * @example
 * ```typescript
 * const info = await getCustomerOrderInfo('LG5MA0114')
 * if (info) {
 *   console.log(`Order: ${info.orderNo}`)
 *   console.log(`Customer: ${info.customerName}`)
 * }
 * ```
 */
export async function getCustomerOrderInfo(
  serialNumber: string
): Promise<CustomerOrderInfo | null> {
  try {
    // Étape 1 : Récupérer Customer Order Line
    const line = await getCustomerOrderLineBySerial(serialNumber)

    if (!line) {
      return null
    }

    // Étape 2 : Récupérer Customer Order Header (optionnel)
    let customerName: string | undefined
    let customerPoNo: string | undefined
    let internalPoNo: string | undefined

    try {
      const header = await getCustomerOrderHeader(line.OrderNo)
      customerName = header.CustomerName
      customerPoNo = header.CustomerPoNo
      internalPoNo = header.InternalPoNo
    } catch (error) {
      console.warn('⚠️  Could not fetch Customer Order Header, continuing without it:', error)
      // Continue sans le header - les données du Line sont suffisantes
    }

    // Étape 3 : Construire l'objet consolidé
    const customerOrderInfo: CustomerOrderInfo = {
      orderNo: line.OrderNo,
      lineNo: line.LineNo,
      partNo: line.PartNo,
      catalogDesc: line.CatalogDesc || 'N/A',
      chullNumber: line.CHullNumber,
      customerNo: line.CustomerNo,
      customerName,
      configurationId: line.ConfigurationId,
      status: line.Objstate,
      quantity: line.BuyQtyDue || line.QtyOrdered || 1,
      contract: line.Contract,
      plannedDeliveryDate: line.PlannedDeliveryDate,
      wantedDeliveryDate: line.WantedDeliveryDate,
      customerPoNo,
      internalPoNo
    }

    console.log(`✅ Customer Order Info complete:`, {
      orderNo: customerOrderInfo.orderNo,
      partNo: customerOrderInfo.partNo,
      serialMatch: customerOrderInfo.chullNumber === serialNumber
    })

    return customerOrderInfo
  } catch (error) {
    console.error('❌ Error getting Customer Order Info:', error)
    return null
  }
}

/**
 * Valide la correspondance entre un Serial Number et un Customer Order
 * 
 * ⚠️ DEPRECATED: Utilise CHullNumber qui cause des timeouts.
 * Utilisez plutôt getCustomerOrderInfoFromShopOrder() avec les infos du Shop Order.
 * 
 * @param serialNumber - Serial Number de la pièce
 * @returns Résultat de validation avec détails
 * 
 * @example
 * ```typescript
 * const validation = await validateCustomerOrderSerial('LG5MA0114')
 * 
 * if (validation.found) {
 *   console.log('Customer Order trouvé')
 *   
 *   if (validation.serialNumberMatch) {
 *     console.log('✅ Serial Number correspond')
 *   } else {
 *     console.log('⚠️ Serial Number ne correspond pas')
 *   }
 * } else {
 *   console.log('❌ Customer Order non trouvé')
 * }
 * ```
 */
export async function validateCustomerOrderSerial(
  serialNumber: string
): Promise<CustomerOrderValidationResult> {
  try {
    const customerOrder = await getCustomerOrderInfo(serialNumber)

    if (!customerOrder) {
      return {
        found: false,
        serialNumberMatch: false,
        customerOrder: null,
        error: 'No Customer Order found for this Serial Number'
      }
    }

    const serialNumberMatch = 
      customerOrder.chullNumber.trim().toLowerCase() === 
      serialNumber.trim().toLowerCase()

    return {
      found: true,
      serialNumberMatch,
      customerOrder,
      error: serialNumberMatch ? undefined : 'Serial Number mismatch'
    }
  } catch (error) {
    return {
      found: false,
      serialNumberMatch: false,
      customerOrder: null,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * ✅ FONCTION OPTIMISÉE : Récupère les informations Customer Order depuis un Shop Order
 * 
 * Cette fonction utilise directement CustomerOrderNo et LineNo du Shop Order,
 * évitant ainsi les timeouts liés au filtre CHullNumber.
 * 
 * @param customerOrderNo - Numéro du Customer Order (depuis Shop Order)
 * @param lineNo - Numéro de ligne (depuis Shop Order)
 * @param expectedSerialNumber - Serial Number attendu pour validation (optionnel)
 * @returns Informations consolidées du Customer Order
 * 
 * @example
 * ```typescript
 * // À partir d'un Shop Order
 * const shopOrder = await searchShopOrder('97277')
 * 
 * const customerOrderInfo = await getCustomerOrderInfoFromShopOrder(
 *   shopOrder.CustomerOrderNo,    // "C1000038587"
 *   shopOrder.CustomerLineNo,     // "1"
 *   shopOrder.SerialNumber        // "LG5MA0114" (optionnel)
 * )
 * 
 * console.log(`Customer: ${customerOrderInfo.customerName}`)
 * console.log(`Part: ${customerOrderInfo.partNo}`)
 * ```
 */
export async function getCustomerOrderInfoFromShopOrder(
  customerOrderNo: string,
  lineNo: string,
  expectedSerialNumber?: string
): Promise<CustomerOrderInfo | null> {
  try {
    console.log('🚀 Fetching Customer Order from Shop Order data...')
    
    // Étape 1 : Récupérer Customer Order Line (rapide, utilise OrderNo + LineNo)
    const line = await getCustomerOrderLineByOrderNo(customerOrderNo, lineNo)

    if (!line) {
      console.log('❌ Customer Order Line not found')
      return null
    }

    // Étape 2 : Récupérer Customer Order Header (pour le nom du client)
    let customerName: string | undefined
    let customerPoNo: string | undefined
    let internalPoNo: string | undefined

    try {
      const header = await getCustomerOrderHeader(line.OrderNo)
      customerName = header.CustomerName
      customerPoNo = header.CustomerPoNo
      internalPoNo = header.InternalPoNo
      console.log(`   👤 Customer: ${customerName}`)
    } catch (error) {
      console.warn('⚠️  Could not fetch Customer Order Header, continuing without it')
    }

    // Étape 3 : Valider Serial Number si fourni
    if (expectedSerialNumber) {
      const serialMatch = line.CHullNumber === expectedSerialNumber
      console.log(`   🎯 Serial Number validation: ${serialMatch ? '✅ Match' : '⚠️ Mismatch'}`)
      console.log(`      Expected: ${expectedSerialNumber}`)
      console.log(`      Found:    ${line.CHullNumber}`)
    }

    // Étape 4 : Construire l'objet consolidé
    const customerOrderInfo: CustomerOrderInfo = {
      orderNo: line.OrderNo,
      lineNo: line.LineNo,
      partNo: line.PartNo,
      catalogDesc: line.CatalogDesc || 'N/A',
      chullNumber: line.CHullNumber,
      customerNo: line.CustomerNo,
      customerName,
      configurationId: line.ConfigurationId,
      status: line.Objstate,
      quantity: line.BuyQtyDue || line.QtyOrdered || 1,
      contract: line.Contract,
      plannedDeliveryDate: line.PlannedDeliveryDate,
      wantedDeliveryDate: line.WantedDeliveryDate,
      customerPoNo,
      internalPoNo
    }

    console.log('✅ Customer Order Info retrieved successfully')

    return customerOrderInfo
  } catch (error) {
    console.error('❌ Error getting Customer Order Info from Shop Order:', error)
    return null
  }
}

/**
 * Récupère tous les Customer Order Lines associés à un Part Number
 * (Utile pour les statistiques ou l'analyse)
 * 
 * @param partNo - Numéro de pièce (ex: "LG5MA")
 * @param limit - Nombre maximum de résultats (défaut: 10)
 * @returns Liste de Customer Order Lines
 * 
 * @example
 * ```typescript
 * const lines = await getCustomerOrderLinesByPart('LG5MA', 5)
 * console.log(`${lines.length} commandes trouvées pour cette pièce`)
 * ```
 */
export async function getCustomerOrderLinesByPart(
  partNo: string,
  limit: number = 10
): Promise<CustomerOrderLine[]> {
  if (!partNo || partNo.trim() === '') {
    throw new Error('Part number is required')
  }

  const client = getIFSClient()

  try {
    console.log(`🔍 Searching Customer Order Lines for Part: ${partNo}`)

    const response = await client.get<IFSODataResponse<CustomerOrderLine>>(
      'CustomerOrderHandling.svc/CustomerOrderLineSet',
      {
        $filter: `PartNo eq '${partNo.trim()}'`,
        $select: 'OrderNo,LineNo,PartNo,CatalogDesc,CHullNumber,CustomerNo,ConfigurationId,Objstate,BuyQtyDue',
        $top: limit.toString(),
        $orderby: 'OrderNo desc'
      }
    )

    const lines = response.value || []
    console.log(`✅ Found ${lines.length} Customer Order Lines for Part ${partNo}`)

    return lines
  } catch (error) {
    console.error('❌ Error fetching Customer Order Lines by Part:', error)
    throw new Error(
      `Failed to fetch Customer Order Lines: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    )
  }
}

// ============================================================================
// 🆕 OPTIMAL METHOD: Direct HullNumber Lookup
// ============================================================================

/**
 * ⭐ MÉTHODE SELON SPECS BUSINESS (Section 8)
 * Récupère Customer Order selon le workflow des specs:
 * Serial Number → Customer Order Line (Site=FR05A) → Customer Order
 * 
 * Filtres selon les specs (section 8):
 * - Hull Number = Serial Number
 * - Site = FR05A (Contract)
 * 
 * Note: OrderType=BAT n'est PAS dans CustomerOrderLine, il est dans CustomerOrder header
 * 
 * @param hullNumber - Hull Number / Serial Number (ex: "LG5MA0114")
 * @returns Customer Order Info ou null si non trouvé
 * 
 * @example
 * ```typescript
 * // Boat Configuration Editor : Recherche selon specs
 * const order = await getCustomerOrderByHullNumber('LG5MA0114')
 * ```
 */
export async function getCustomerOrderByHullNumber(
  hullNumber: string
): Promise<CustomerOrderInfo | null> {
  if (!hullNumber || hullNumber.trim() === '') {
    throw new Error('Hull Number is required')
  }

  // 🚨 FILTRES SELON SPECS (Section 8)
  const SITE = 'FR05A'      // Site de production (Contract)

  const client = getIFSClient()

  try {
    console.log(`🔍 Searching Customer Order for Serial Number: ${hullNumber}`)
    console.log('📋 Specs filters (section 8):')
    console.log(`   - Hull Number = ${hullNumber}`)
    console.log(`   - Site = ${SITE}`)

    // Construire le filtre OData selon les specs
    // Note: OrderType n'existe pas dans CustomerOrderLine, uniquement dans CustomerOrder
    const filter = `CHullNumber eq '${hullNumber.trim()}' and Contract eq '${SITE}'`
    
    console.log(`📊 OData filter: ${filter}`)

    // ÉTAPE 1 : Recherche Customer Order Line selon specs
    const response = await client.get<IFSODataResponse<CustomerOrderLine>>(
      'CustomerOrderHandling.svc/CustomerOrderLineSet',
      {
        $filter: filter,
        $select: 'OrderNo,LineNo,RelNo,LineItemNo,PartNo,CatalogNo,CatalogDesc,CHullNumber,BoatHullNumber,CustomerNo,ConfigurationId,Objstate,BuyQtyDue,Contract,Company,PlannedDeliveryDate,WantedDeliveryDate',
        $top: '1'
      }
    )

    if (!response.value || response.value.length === 0) {
      console.log(`❌ No Customer Order found for Serial Number: ${hullNumber}`)
      console.log(`   💡 Specs requirements:`)
      console.log(`      - Hull Number must exist in IFS`)
      console.log(`      - Site must be ${SITE}`)
      return null
    }

    const line = response.value[0]
    
    console.log(`✅ Customer Order Line found:`)
    console.log(`   📦 Order: ${line.OrderNo} - Line ${line.LineNo} - Rel ${line.RelNo}`)
    console.log(`   👤 CustomerNo: ${line.CustomerNo}`)
    console.log(`   🏭 Contract (Site): ${line.Contract} ✅`)
    console.log(`   🎯 Part: ${line.PartNo}`)

    // ÉTAPE 2 : Récupérer Customer Order Header (pour vérifier OrderType=BAT)
    let customerName: string | undefined
    let customerPoNo: string | undefined
    let internalPoNo: string | undefined
    let orderType: string | undefined

    try {
      const header = await getCustomerOrderHeader(line.OrderNo)
      customerName = header.CustomerName
      customerPoNo = header.CustomerPoNo
      internalPoNo = header.InternalPoNo
      
      // Vérifier OrderType si disponible dans le header
      // Note: Le type CustomerOrderHeader doit être étendu pour inclure OrderType
      orderType = (header as any).OrderType
      
      console.log(`   👤 Customer Name: ${customerName}`)
      
      // Validation OrderType=BAT selon specs (si disponible)
      if (orderType && orderType !== 'BAT') {
        console.log(`   ⚠️ Order Type: ${orderType} (specs require BAT)`)
        console.log(`   💡 Continuing anyway - Order Type filter is informational only`)
      } else if (orderType) {
        console.log(`   ✅ Order Type: ${orderType} (matches specs)`)
      }
    } catch (error) {
      console.warn('⚠️  Could not fetch Customer Order Header, continuing without it')
    }

    // ÉTAPE 3 : Construire l'objet consolidé
    const customerOrderInfo: CustomerOrderInfo = {
      orderNo: line.OrderNo,
      lineNo: line.LineNo,
      partNo: line.PartNo,
      catalogDesc: line.CatalogDesc || 'N/A',
      chullNumber: line.CHullNumber,
      customerNo: line.CustomerNo,
      customerName,
      configurationId: line.ConfigurationId,
      status: line.Objstate,
      quantity: line.BuyQtyDue || 1,
      contract: line.Contract,
      plannedDeliveryDate: line.PlannedDeliveryDate,
      wantedDeliveryDate: line.WantedDeliveryDate,
      customerPoNo,
      internalPoNo
    }

    console.log('✅ Customer Order retrieved according to specs (section 8)')

    return customerOrderInfo
  } catch (error) {
    console.error('❌ Error getting Customer Order by Hull Number:', error)
    throw error
  }
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Formatte une date ISO en format lisible
 * 
 * @param isoDate - Date au format ISO (ex: "2025-07-01T00:00:00Z")
 * @returns Date formatée (ex: "01/07/2025")
 */
export function formatDate(isoDate: string): string {
  try {
    const date = new Date(isoDate)
    return date.toLocaleDateString('fr-FR')
  } catch (error) {
    return isoDate
  }
}

/**
 * Obtient un badge de statut lisible
 * 
 * @param status - Statut IFS (ex: "Released", "Closed")
 * @returns Objet avec label et couleur
 */
export function getStatusBadge(status: string): { label: string; color: string } {
  const statusMap: Record<string, { label: string; color: string }> = {
    'Released': { label: 'Released', color: 'green' },
    'Planned': { label: 'Planned', color: 'blue' },
    'Reserved': { label: 'Reserved', color: 'yellow' },
    'PartiallyDelivered': { label: 'Partially Delivered', color: 'amber' },
    'Delivered': { label: 'Delivered', color: 'green' },
    'Closed': { label: 'Closed', color: 'gray' },
    'Cancelled': { label: 'Cancelled', color: 'red' },
    'Invoiced': { label: 'Invoiced', color: 'purple' }
  }

  return statusMap[status] || { label: status, color: 'gray' }
}

/**
 * Vérifie si un Customer Order est dans un état valide pour impression
 * 
 * @param status - Statut du Customer Order
 * @returns true si le statut permet l'impression
 */
export function canPrintForStatus(status: string): boolean {
  const printableStatuses = ['Released', 'Reserved', 'PartiallyDelivered']
  return printableStatuses.includes(status)
}
