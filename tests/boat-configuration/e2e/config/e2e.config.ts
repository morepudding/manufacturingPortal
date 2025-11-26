/**
 * 🧪 E2E Test Configuration - Boat Configuration Editor
 * 
 * Configuration centralisée pour les tests E2E avec vraies APIs IFS AST
 */

export const E2E_CONFIG = {
  // Base URLs
  app: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    boatConfigPath: '/boat-configuration'
  },

  // API Endpoints
  api: {
    shopOrders: '/api/boat-configuration/shop-orders',
    serialNumbers: '/api/boat-configuration/serial-numbers',
    customerOrders: '/api/boat-configuration/customer-orders',
    printers: '/api/shared/printers',
    languages: '/api/shared/languages',
    print: '/api/boat-configuration/print'
  },

  // Timeouts (en millisecondes)
  timeouts: {
    // Timeouts pour les APIs IFS (peuvent être lentes)
    ifsApi: 15000, // 15s pour les appels IFS
    
    // Timeouts pour les éléments UI
    elementVisible: 10000, // 10s pour l'apparition d'un élément
    pageLoad: 30000, // 30s pour le chargement d'une page
    
    // Timeouts pour les workflows complets
    workflowComplete: 60000, // 60s pour un workflow complet
    
    // Timeouts pour les opérations d'impression
    printOperation: 20000 // 20s pour une opération d'impression
  },

  // Retry configuration
  retry: {
    maxAttempts: 2, // Nombre de tentatives en cas d'échec
    delayBetweenAttempts: 2000 // Délai entre les tentatives (2s)
  },

  // Performance thresholds
  performance: {
    // Temps maximum acceptable pour chaque étape (en secondes)
    maxShopOrderSearch: 10, // Recherche Shop Order
    maxSerialNumberFetch: 5, // Récupération Serial Number
    maxCustomerOrderFetch: 10, // Récupération Customer Order
    maxPrinterListFetch: 5, // Liste des imprimantes
    maxLanguageListFetch: 5, // Liste des langues
    maxPrintOperation: 15, // Opération d'impression
    maxWorkflowComplete: 45 // Workflow complet (toutes étapes)
  },

  // Test selectors (data-testid)
  selectors: {
    // Formulaire Shop Order
    orderNoInput: 'input[name="orderNo"]',
    releaseNoInput: 'input[name="releaseNo"]',
    sequenceNoInput: 'input[name="sequenceNo"]',
    submitSearchButton: 'button[type="submit"]',
    
    // Résultats & Confirmation
    serialNumber: '[data-testid="serial-number"]',
    dopId: '[data-testid="dop-id"]',
    confirmYesButton: 'button[data-testid="confirm-yes"]',
    confirmNoButton: 'button[data-testid="confirm-no"]',
    
    // Customer Order
    customerOrderDetails: '[data-testid="customer-order-details"]',
    
    // Sélection Imprimante & Langue
    printerSelect: 'select[name="printer"]',
    languageSelect: 'select[name="language"]',
    
    // Impression
    submitPrintButton: 'button[data-testid="submit-print"]',
    newPrintButton: 'button[data-testid="new-print"]',
    
    // Messages
    errorMessage: '[data-testid="error-message"]',
    successMessage: '[data-testid="success-message"]',
    
    // Stepper
    stepper: '[data-testid="stepper"]',
    stepperStepActive: '[data-testid="stepper-step-active"]'
  },

  // IFS Environment
  ifs: {
    environment: 'AST',
    baseUrl: process.env.IFS_BASE_URL || 'https://beneteau-group-ast.ifs.cloud',
    requiresAuth: true
  }
} as const

// Type pour l'export
export type E2EConfig = typeof E2E_CONFIG
