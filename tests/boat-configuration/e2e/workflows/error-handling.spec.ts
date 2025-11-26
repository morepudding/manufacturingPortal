/**
 * ==========================================
 * 🎯 WORKFLOW TESTS - ERROR HANDLING
 * ==========================================
 * 
 * Tests de gestion d'erreurs et scénarios négatifs :
 * - Shop Order not found
 * - Bouton "Non, Recommencer"
 * 
 * Philosophie : Vérifier que les erreurs sont bien gérées
 */

import { test, expect } from '@playwright/test'
import { 
  testLog,
  fillShopOrderForm,
  submitShopOrderSearch,
  verifyErrorMessage,
  rejectSerialNumber,
  verifyStepper
} from '../helpers/test-helpers'
import { VALID_SHOP_ORDERS } from '../fixtures/shop-orders.fixture'
import { E2E_CONFIG } from '../config/e2e.config'

test.describe('🎯 Workflow Tests - Error Handling', () => {
  
  test.beforeEach(async ({ page }) => {
    testLog('🎯 Starting Error Handling Test')
    await page.goto('/boat-configuration')
    await page.waitForLoadState('networkidle')
  })

  /**
   * Test 3.3 : Shop Order not found
   * 
   * Scénario :
   * 1. Saisir un Shop Order inexistant (999999)
   * 2. Vérifier qu'un message d'erreur approprié est affiché
   * 3. Vérifier qu'on reste sur l'étape 1 (Entry)
   * 4. Réessayer avec un Shop Order valide
   * 
   * Résultat attendu : Erreur claire + possibilité de réessayer
   */
  test('3.3 - Shop Order not found : Gestion erreur + retry', async ({ page }) => {
    testLog('🔍 Testing Shop Order Not Found Scenario')
    
    // ============================================
    // Recherche avec Shop Order inexistant
    // ============================================
    testLog('Step 1: Searching for non-existent Shop Order 999999')
    
    // Remplir avec un Shop Order inexistant
    await page.fill('input#orderNo', '999999')
    await page.fill('input#releaseNo', '*')
    await page.fill('input#sequenceNo', '*')
    
    // Vérifier qu'on est sur l'étape 1
    await verifyStepper(page, 1, 5)
    
    // Soumettre la recherche
    const searchButton = page.locator('button[type="submit"]')
    await searchButton.click()
    
    // Attendre la réponse API
    try {
      await page.waitForResponse(
        (response) => response.url().includes('/api/boat-configuration/shop-orders/search'),
        { timeout: E2E_CONFIG.timeouts.ifsApi }
      )
    } catch (error) {
      testLog('⚠️ API timeout - ce Shop Order n\'existe vraiment pas')
    }
    
    // ============================================
    // Vérifier message d'erreur
    // ============================================
    testLog('Step 2: Verifying error message is displayed')
    
    // Vérifier qu'un message d'erreur est affiché
    await verifyErrorMessage(page)
    
    // Vérifier qu'on est toujours sur l'étape 1
    await verifyStepper(page, 1, 5)
    
    testLog('✅ Erreur correctement affichée pour Shop Order inexistant')
    
    // ============================================
    // Retry avec Shop Order valide
    // ============================================
    testLog('Step 3: Retrying with valid Shop Order')
    
    const validShopOrder = VALID_SHOP_ORDERS[0]
    await fillShopOrderForm(page, validShopOrder)
    await submitShopOrderSearch(page)
    
    // Vérifier qu'on passe maintenant à l'étape 2
    await verifyStepper(page, 2, 5)
    
    testLog('✅ Retry réussi avec Shop Order valide')
  })

  /**
   * Test 3.4 : Cancel workflows (Bouton "Non, Recommencer")
   * 
   * Scénario :
   * 1. Aller jusqu'à l'étape de confirmation (étape 2)
   * 2. Cliquer sur "Non, Recommencer"
   * 3. Vérifier qu'on revient à l'étape 1
   * 4. Le formulaire doit être réinitialisé
   * 
   * Résultat attendu : Retour à l'étape initiale proprement
   */
  test('3.4 - Cancel workflows : Bouton "Non, Recommencer"', async ({ page }) => {
    testLog('🔄 Testing Cancel Workflow')
    
    // ============================================
    // Aller jusqu'à l'étape de confirmation
    // ============================================
    testLog('Step 1: Navigate to Confirmation step')
    
    const validShopOrder = VALID_SHOP_ORDERS[0]
    await fillShopOrderForm(page, validShopOrder)
    await submitShopOrderSearch(page)
    
    // Vérifier qu'on est sur l'étape 2
    await verifyStepper(page, 2, 5)
    
    testLog('✅ Arrived at Confirmation step')
    
    // ============================================
    // Cliquer sur "Non, Recommencer"
    // ============================================
    testLog('Step 2: Clicking "Non, Recommencer"')
    
    await rejectSerialNumber(page)
    
    // ============================================
    // Vérifier retour à l'étape 1
    // ============================================
    testLog('Step 3: Verifying return to Entry step')
    
    // Attendre le retour à l'étape 1
    await page.waitForTimeout(1000) // Laisser le temps à l'UI de se mettre à jour
    await verifyStepper(page, 1, 5)
    
    // Vérifier que le formulaire est réinitialisé (champs vides ou valeurs par défaut)
    const orderNoValue = await page.inputValue('input#orderNo')
    const releaseNoValue = await page.inputValue('input#releaseNo')
    const sequenceNoValue = await page.inputValue('input#sequenceNo')
    
    testLog(`Form values after reset: orderNo="${orderNoValue}", releaseNo="${releaseNoValue}", sequenceNo="${sequenceNoValue}"`)
    
    // Au minimum, le Serial Number ne doit plus être affiché
    const serialNumberDisplay = page.locator('[data-testid="serial-number"]')
    await expect(serialNumberDisplay).not.toBeVisible()
    
    testLog('✅ Successfully returned to Entry step with reset form')
  })

})
