/**
 * 🧪 Shop Orders Fixtures - Données IFS AST validées
 * 
 * Ces Shop Orders ont été testés et validés en Phase 1-3
 * Ils existent dans l'environnement IFS AST et retournent des données cohérentes
 */

export interface ShopOrderFixture {
  orderNo: string
  releaseNo: string
  sequenceNo: string
  expectedSerialNumber: string
  expectedDopId: string
  description: string
}

/**
 * Shop Orders validés pour tests E2E
 * ⚠️ Ces données sont réelles et proviennent d'IFS AST
 */
export const VALID_SHOP_ORDERS: ShopOrderFixture[] = [
  {
    orderNo: '100563',
    releaseNo: '*',
    sequenceNo: '*',
    expectedSerialNumber: 'JY6MB0019',
    expectedDopId: '38',
    description: 'Shop Order principal pour Happy Path'
  },
  {
    orderNo: '100949',
    releaseNo: '*',
    sequenceNo: '*',
    expectedSerialNumber: 'LX6MA0116',
    expectedDopId: '48',
    description: 'Shop Order secondaire pour tests multiples'
  },
  {
    orderNo: '97277',
    releaseNo: '*',
    sequenceNo: '*',
    expectedSerialNumber: 'LG5MA0114',
    expectedDopId: '95',
    description: 'Shop Order tertiaire pour validation'
  },
  {
    orderNo: '101043',
    releaseNo: '*',
    sequenceNo: '*',
    expectedSerialNumber: 'LX6MA0115',
    expectedDopId: '54',
    description: 'Shop Order avec DOP ID composite (54 - 1035)'
  }
]

/**
 * Shop Order principal pour la majorité des tests
 */
export const PRIMARY_SHOP_ORDER = VALID_SHOP_ORDERS[0]

/**
 * Shop Order invalide pour tester les erreurs
 */
export const INVALID_SHOP_ORDER: ShopOrderFixture = {
  orderNo: '999999',
  releaseNo: '*',
  sequenceNo: '*',
  expectedSerialNumber: '',
  expectedDopId: '',
  description: 'Shop Order inexistant pour tests d\'erreur'
}

/**
 * Imprimantes validées dans IFS
 */
export const VALID_PRINTERS = [
  {
    printerId: 'LP_BOAT_CONFIGURATION',
    description: 'Boat Config Printer',
    site: 'BDR'
  },
  {
    printerId: 'LP_TEST',
    description: 'Test Printer',
    site: 'BDR'
  }
]

/**
 * Langues validées dans IFS
 */
export const VALID_LANGUAGES = [
  {
    code: 'en',
    description: 'English'
  },
  {
    code: 'fr',
    description: 'Français'
  }
]

/**
 * Configuration par défaut pour les tests d'impression
 */
export const DEFAULT_PRINT_CONFIG = {
  printer: VALID_PRINTERS[1].printerId, // LP_TEST par défaut
  language: VALID_LANGUAGES[0].code // English par défaut
}
