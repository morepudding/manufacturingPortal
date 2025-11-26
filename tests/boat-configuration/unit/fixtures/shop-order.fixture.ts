/**
 * Fixtures - Données de test pour Shop Orders
 * 
 * ⚠️ DONNÉES RÉELLES EXTRAITES D'IFS (Production validée)
 * 
 * Sources:
 * - Copilot Instructions (.github/copilot-instructions.md - Cas de test validés)
 * - Test scripts (test-customer-order.js, debug-hull-lx6ma0115.ts)
 * - Documentation API (docs/api/IFS_ENDPOINTS.md)
 * 
 * Ces fixtures utilisent des Shop Orders réels qui ont été testés avec succès
 * sur l'environnement IFS AST (beneteau-group-ast.ifs.cloud).
 */

import type { IFSShopOrder, DopHeadSerialReservation } from '@/shared/types/ifs'

// ===== SHOP ORDERS RÉELS VALIDÉS =====

/**
 * ✅ Shop Order 563 (cas nominal - validé en production)
 * 
 * Source: .github/copilot-instructions.md - Tableau des cas validés
 * Status: ✅ Validé
 * Serial Number: JY6MB0019
 * DOP Header ID: 34 - 1014
 */
export const MOCK_SHOP_ORDER_563: IFSShopOrder = {
  OrderNo: '563',
  ReleaseNo: '1',
  SequenceNo: '10',
  DopId: '34 - 1014',
  PartNo: 'LG5XA',
  PartDescription: 'LAGOON 50 - HULL ASSY',
  Contract: 'FR05A',
  CustomerOrderNo: null,
  CustomerLineNo: null,
}

/**
 * ✅ Shop Order 97277 (cas avec Customer Order - validé en production)
 * 
 * Source: test-customer-order.js + copilot-instructions.md
 * Status: ✅ Validé
 * Serial Number: LG5MA0114
 * DOP Header ID: 95 - 10088
 * Customer Order: C1000038587
 */
export const MOCK_SHOP_ORDER_97277: IFSShopOrder = {
  OrderNo: '97277',
  ReleaseNo: '1',
  SequenceNo: '10',
  DopId: '95 - 10088',
  PartNo: 'LG5MA',
  PartDescription: 'LAGOON 51 - MAIN HULL',
  Contract: 'FR05A',
  CustomerOrderNo: 'C1000038587',
  CustomerLineNo: '1',
}

/**
 * ✅ Shop Order 1043 (cas DOP ID composé - validé en production)
 * 
 * Source: copilot-instructions.md + debug-hull-lx6ma0115.ts
 * Status: ✅ Validé
 * Serial Number: LX6MA0115
 * DOP Header ID: 54 - 1035 (composite - doit être parsé en "54")
 * Customer Order: CNB-68381
 */
export const MOCK_SHOP_ORDER_1043: IFSShopOrder = {
  OrderNo: '1043',
  ReleaseNo: '1',
  SequenceNo: '10',
  DopId: '54 - 1035',
  PartNo: 'LX6MA',
  PartDescription: 'EXCESS 11 - HULL ASSEMBLY',
  Contract: 'FR05A',
  CustomerOrderNo: 'CNB-68381',
  CustomerLineNo: '1',
}

/**
 * ✅ Shop Order 949 (autre cas validé)
 * 
 * Source: copilot-instructions.md
 * Status: ✅ Validé
 * Serial Number: LX6MA0116
 * DOP Header ID: 48 - 10102
 */
export const MOCK_SHOP_ORDER_949: IFSShopOrder = {
  OrderNo: '949',
  ReleaseNo: '1',
  SequenceNo: '10',
  DopId: '48 - 10102',
  PartNo: 'LX6MA',
  PartDescription: 'EXCESS 11 - HULL ASSEMBLY',
  Contract: 'FR05A',
  CustomerOrderNo: null,
  CustomerLineNo: null,
}

/**
 * 🔧 Shop Order SANS DOP (cas d'erreur - pour tests négatifs)
 * 
 * Simule un Shop Order qui n'a pas de DOP associé.
 * Utilisé pour tester le cas où serialNumber doit être null.
 */
export const MOCK_SHOP_ORDER_WITHOUT_DOP: IFSShopOrder = {
  OrderNo: '99999',
  ReleaseNo: '1',
  SequenceNo: '10',
  DopId: null,
  PartNo: 'UNKNOWN',
  PartDescription: 'Test Part Without DOP',
  Contract: 'FR05A',
  CustomerOrderNo: null,
  CustomerLineNo: null,
}

// ===== ALIASES POUR COMPATIBILITÉ =====

/**
 * Alias pour les tests existants (cas nominal)
 */
export const MOCK_SHOP_ORDER_WITH_DOP = MOCK_SHOP_ORDER_563

/**
 * Shop Order avec DOP ID composite (pour tests de parsing)
 */
export const MOCK_SHOP_ORDER_COMPOSITE_DOP = MOCK_SHOP_ORDER_1043

// ===== LISTES POUR TESTS DE FILTRAGE =====

/**
 * Liste de Shop Orders pour tests de filtrage exact
 * 
 * Utilisé pour tester que la recherche "1043" ne retourne pas "101043"
 */
export const MOCK_SHOP_ORDERS_LIST: IFSShopOrder[] = [
  MOCK_SHOP_ORDER_1043,
  {
    ...MOCK_SHOP_ORDER_1043,
    OrderNo: '101043', // Similaire mais différent (cas de faux positif)
    DopId: '99 - 1234',
  },
]

/**
 * Tous les Shop Orders validés (pour tests complets)
 */
export const ALL_VALIDATED_SHOP_ORDERS: IFSShopOrder[] = [
  MOCK_SHOP_ORDER_563,
  MOCK_SHOP_ORDER_949,
  MOCK_SHOP_ORDER_1043,
  MOCK_SHOP_ORDER_97277,
]

// ===== SERIAL NUMBERS RÉELS =====

/**
 * ✅ Serial Numbers RÉELS extraits d'IFS
 * 
 * Mapping DOP ID → Serial Number
 * Source: Copilot Instructions - Tableau des cas validés
 */
export const MOCK_SERIAL_NUMBERS_BY_DOP: Record<string, string> = {
  '34': 'JY6MB0019',   // Shop Order 563
  '48': 'LX6MA0116',   // Shop Order 949
  '54': 'LX6MA0115',   // Shop Order 1043
  '95': 'LG5MA0114',   // Shop Order 97277
}

/**
 * ✅ DOP Head Serial Reservations RÉELLES
 * 
 * Structures complètes pour tests d'intégration DOP → Serial Number
 */
export const MOCK_DOP_SERIAL_RESERVATIONS: Record<string, DopHeadSerialReservation> = {
  '34': {
    DopId: '34',
    SerialNo: 'JY6MB0019',
    PartNo: 'LG5XA',
    ConditionCode: null,
    SerialSourceDb: 'SHOP_ORDER',
    SerialSource: 'Shop Order',
  },
  '54': {
    DopId: '54',
    SerialNo: 'LX6MA0115',
    PartNo: 'LX6MA',
    ConditionCode: null,
    SerialSourceDb: 'SHOP_ORDER',
    SerialSource: 'Shop Order',
  },
  '95': {
    DopId: '95',
    SerialNo: 'LG5MA0114',
    PartNo: 'LG5MA',
    ConditionCode: null,
    SerialSourceDb: 'SHOP_ORDER',
    SerialSource: 'Shop Order',
  },
}

// ===== ALIAS LEGACY =====

/**
 * @deprecated Utiliser MOCK_SERIAL_NUMBERS_BY_DOP
 */
export const MOCK_SERIAL_NUMBERS = MOCK_SERIAL_NUMBERS_BY_DOP
