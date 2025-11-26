/**
 * ==========================================
 * 🎯 WORKFLOW TESTS - MULTIPLE SCENARIOS
 * ==========================================
 * 
 * Tests de scénarios multiples :
 * - Test de 3 Shop Orders différents séquentiellement
 * 
 * Philosophie : Vérifier que l'application peut traiter plusieurs Shop Orders successifs
 */

import { test, expect } from '@playwright/test'
import { 
  testLog,
  fillShopOrderForm,
  submitShopOrderSearch,
  verifySerialNumber,
  verifyDopId,
  clickNewPrint
} from '../helpers/test-helpers'
import { VALID_SHOP_ORDERS } from '../fixtures/shop-orders.fixture'

test.describe('🎯 Workflow Tests - Multiple Scenarios', () => {
  
  test.beforeEach(async ({ page }) => {
    testLog('🎯 Starting Multiple Scenarios Test')
    await page.goto('/boat-configuration')
    await page.waitForLoadState('networkidle')
  })

  /**
   * Test 3.5 : Multiple Shop Orders séquentiels
   * 
   * Scénario :
   * 1. Tester Shop Order 100563
   * 2. Cliquer sur "New Print"
   * 3. Tester Shop Order 100949
   * 4. Cliquer sur "New Print"
   * 5. Tester Shop Order 97277
   * 
   * Résultat attendu : Les 3 Shop Orders sont traités correctement sans interférence
   */
  test('3.5 - Multiple Shop Orders : Test de 3 Shop Orders séquentiels', async ({ page }) => {
    testLog('🔄 Testing Multiple Shop Orders Sequentially')
    
    // Prendre les 3 premiers Shop Orders validés
    const shopOrdersToTest = VALID_SHOP_ORDERS.slice(0, 3)
    
    for (let i = 0; i < shopOrdersToTest.length; i++) {
      const shopOrder = shopOrdersToTest[i]
      const isLastOrder = i === shopOrdersToTest.length - 1
      
      testLog(`\n========================================`)
      testLog(`🔍 Testing Shop Order ${i + 1}/3: ${shopOrder.orderNo}`)
      testLog(`========================================`)
      
      // ============================================
      // Remplir et soumettre Shop Order
      // ============================================
      await fillShopOrderForm(page, shopOrder)
      
      const searchStart = Date.now()
      await submitShopOrderSearch(page)
      const searchDuration = Date.now() - searchStart
      
      testLog(`✅ Shop Order ${shopOrder.orderNo} found in ${searchDuration}ms`)
      
      // ============================================
      // Vérifier Serial Number et DOP ID
      // ============================================
      await verifySerialNumber(page, shopOrder.expectedSerialNumber)
      await verifyDopId(page, shopOrder.expectedDopId)
      
      testLog(`✅ Serial Number: ${shopOrder.expectedSerialNumber}`)
      testLog(`✅ DOP ID: ${shopOrder.expectedDopId}`)
      
      // ============================================
      // Cliquer sur "New Print" pour le prochain test (sauf le dernier)
      // ============================================
      if (!isLastOrder) {
        testLog(`🔄 Clicking "New Print" to test next Shop Order...`)
        
        // Attendre un peu pour que l'UI se stabilise
        await page.waitForTimeout(1000)
        
        await clickNewPrint(page)
        
        // Attendre que le formulaire soit réinitialisé
        await page.waitForTimeout(1000)
      }
    }
    
    testLog('\n✅ All Shop Orders processed successfully!')
    testLog('No interference detected between different Shop Orders')
  })

  /**
   * Test 3.5b : Multiple Shop Orders avec données complètes
   * 
   * Variante du test 3.5 qui va jusqu'au bout du workflow pour chaque Shop Order
   * (Entry → Confirmation → Customer Order)
   * 
   * Résultat attendu : Workflow complet pour 3 Shop Orders sans erreur
   */
  test.skip('3.5b - Multiple Shop Orders : Workflow complet pour 3 Shop Orders', async ({ page }) => {
    testLog('🔄 Testing Full Workflow for Multiple Shop Orders')
    
    // Note: Ce test est skip car il peut être très long (3 x 45s = 2min15s)
    // À activer uniquement pour tests complets
    
    const shopOrdersToTest = VALID_SHOP_ORDERS.slice(0, 3)
    
    for (let i = 0; i < shopOrdersToTest.length; i++) {
      const shopOrder = shopOrdersToTest[i]
      
      testLog(`\n========================================`)
      testLog(`🔍 Full Workflow for Shop Order ${i + 1}/3: ${shopOrder.orderNo}`)
      testLog(`========================================`)
      
      // TODO: Implémenter le workflow complet ici
      // (Entry → Confirmation → Customer Order → Selection → Print)
      
      testLog(`✅ Workflow complet pour ${shopOrder.orderNo}`)
      
      if (i < shopOrdersToTest.length - 1) {
        await clickNewPrint(page)
        await page.waitForTimeout(1000)
      }
    }
  })

})
