/**
 * 🧪 E2E Tests - Niveau 1 : Health Checks
 * 
 * Tests de santé pour vérifier que l'infrastructure est accessible :
 * 1. Next.js app démarre et répond
 * 2. API Routes accessibles
 * 3. IFS connectivity (OAuth2 token)
 * 4. IFS services accessibles
 * 
 * Durée estimée : ~30s (4 tests)
 * Criticité : ⭐⭐⭐⭐⭐
 */

import { test, expect } from '@playwright/test'
import { E2E_CONFIG } from './config/e2e.config'
import { testLog, verifyApiCall } from './helpers/test-helpers'

test.describe('Niveau 1 : Health Checks', () => {
  test.beforeEach(() => {
    testLog('Starting health check test')
  })

  test('1.1 - App accessibility : Next.js app démarre et répond', async ({ page }) => {
    testLog('Testing app accessibility on:', E2E_CONFIG.app.baseUrl)

    // Naviguer vers la page d'accueil
    const response = await page.goto(E2E_CONFIG.app.baseUrl, {
      waitUntil: 'domcontentloaded',
      timeout: E2E_CONFIG.timeouts.pageLoad
    })

    // Vérifier que la page répond avec succès (200)
    expect(response?.status()).toBe(200)

    // Vérifier que le contenu HTML est chargé
    const htmlContent = await page.content()
    expect(htmlContent).toContain('<!DOCTYPE html>')

    testLog('✅ App is accessible and responding')
  })

  test('1.2 - API Routes health : Endpoints /api/* accessibles', async ({ request }) => {
    testLog('Testing API Routes health')

    const apiEndpoints = [
      `${E2E_CONFIG.app.baseUrl}${E2E_CONFIG.api.printers}`,
      `${E2E_CONFIG.app.baseUrl}${E2E_CONFIG.api.languages}`,
      `${E2E_CONFIG.app.baseUrl}${E2E_CONFIG.api.shopOrders}/search`,
    ]

    // Tester chaque endpoint (GET simple ou OPTIONS)
    for (const endpoint of apiEndpoints) {
      testLog(`Testing endpoint: ${endpoint}`)

      try {
        // Pour les endpoints POST, on teste avec OPTIONS
        if (endpoint.includes('/search')) {
          const response = await request.fetch(endpoint, { method: 'OPTIONS' })
          expect(response.status()).toBeLessThan(500)
        } else {
          // Pour les endpoints GET
          const response = await request.get(endpoint)
          expect(response.status()).toBeLessThan(500)
        }

        testLog(`✅ ${endpoint} is accessible`)
      } catch (error) {
        testLog(`❌ ${endpoint} failed:`, error)
        throw error
      }
    }

    testLog('✅ All API Routes are accessible')
  })

  test('1.3 - IFS connectivity : Token OAuth2 obtenu avec succès', async ({ request }) => {
    testLog('Testing IFS OAuth2 connectivity')

    // Tester un endpoint qui nécessite l'authentification IFS
    const endpoint = `${E2E_CONFIG.app.baseUrl}${E2E_CONFIG.api.printers}`
    
    testLog(`Calling ${endpoint} (requires IFS token)`)
    
    const response = await request.get(endpoint, {
      timeout: E2E_CONFIG.timeouts.ifsApi
    })

    // Si le token OAuth2 fonctionne, on doit avoir un statut 200
    // Si erreur d'auth, on aurait 401/403
    expect(response.status()).toBe(200)

    // Vérifier que la réponse contient des données
    const data = await response.json()
    expect(data).toBeDefined()

    testLog('✅ IFS OAuth2 token obtained successfully')
    testLog('Response data:', data)
  })

  test('1.4 - IFS services health : ShopOrderHandling et PrintDialog accessibles', async ({ request }) => {
    testLog('Testing IFS services health')

    // Test 1 : ShopOrderHandling (via notre API qui l'utilise)
    testLog('Testing ShopOrderHandling via Shop Orders search')
    
    const shopOrderResponse = await request.post(
      `${E2E_CONFIG.app.baseUrl}${E2E_CONFIG.api.shopOrders}/search`,
      {
        data: {
          orderNo: '100563',
          releaseNo: '*',
          sequenceNo: '*'
        },
        timeout: E2E_CONFIG.timeouts.ifsApi
      }
    )

    expect(shopOrderResponse.status()).toBe(200)
    const shopOrderData = await shopOrderResponse.json()
    expect(shopOrderData.found).toBe(true)

    testLog('✅ ShopOrderHandling is accessible')

    // Test 2 : PrintDialog (via notre API printers)
    testLog('Testing PrintDialog via printers list')
    
    const printersResponse = await request.get(
      `${E2E_CONFIG.app.baseUrl}${E2E_CONFIG.api.printers}`,
      {
        timeout: E2E_CONFIG.timeouts.ifsApi
      }
    )

    expect(printersResponse.status()).toBe(200)
    const printersData = await printersResponse.json()
    expect(printersData.success).toBe(true)
    expect(Array.isArray(printersData.printers)).toBe(true)

    testLog('✅ PrintDialog is accessible')
    testLog(`Found ${printersData.printers.length} printers in IFS`)

    testLog('✅ All IFS services are healthy')
  })
})
