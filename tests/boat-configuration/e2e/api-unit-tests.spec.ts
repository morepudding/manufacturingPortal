/**
 * 🧪 E2E Tests - Niveau 2 : API Unit Tests
 * 
 * Tests unitaires de chaque endpoint API avec données IFS réelles :
 * 1. Search Shop Order
 * 2. Get Serial Number
 * 3. Get Customer Order
 * 4. List Printers
 * 5. List Languages
 * 6. Print Document
 * 
 * Durée estimée : ~40s (6 tests)
 * Criticité : ⭐⭐⭐⭐
 */

import { test, expect } from '@playwright/test'
import { E2E_CONFIG } from './config/e2e.config'
import { testLog, measureTime } from './helpers/test-helpers'
import { 
  VALID_SHOP_ORDERS, 
  PRIMARY_SHOP_ORDER, 
  INVALID_SHOP_ORDER,
  VALID_PRINTERS,
  VALID_LANGUAGES
} from './fixtures/shop-orders.fixture'

test.describe('Niveau 2 : API Unit Tests', () => {
  test.beforeEach(() => {
    testLog('Starting API unit test')
  })

  test('2.1 - Search Shop Order : POST /api/boat-configuration/shop-orders/search', async ({ request }) => {
    testLog('Testing Shop Order search with:', PRIMARY_SHOP_ORDER.orderNo)

    const { result, duration } = await measureTime(async () => {
      return await request.post(
        `${E2E_CONFIG.app.baseUrl}${E2E_CONFIG.api.shopOrders}/search`,
        {
          data: {
            orderNo: PRIMARY_SHOP_ORDER.orderNo,
            releaseNo: PRIMARY_SHOP_ORDER.releaseNo,
            sequenceNo: PRIMARY_SHOP_ORDER.sequenceNo
          },
          timeout: E2E_CONFIG.timeouts.ifsApi
        }
      )
    })

    testLog(`⏱️ Shop Order search took ${duration}ms`)

    // Vérifier le statut HTTP
    expect(result.status()).toBe(200)

    // Vérifier la structure de la réponse
    const data = await result.json()
    expect(data.found).toBe(true)
    expect(data.shopOrder).toBeDefined()

    // Vérifier que le Shop Order contient les champs attendus
    const shopOrder = data.shopOrder
    expect(shopOrder.OrderNo).toBeDefined()
    expect(shopOrder.DopId).toBeDefined()

    // Vérifier que les valeurs correspondent
    expect(shopOrder.OrderNo).toContain(PRIMARY_SHOP_ORDER.orderNo)

    testLog('✅ Shop Order found:', {
      OrderNo: shopOrder.OrderNo,
      DopId: shopOrder.DopId
    })

    // Vérifier la performance (< 10s)
    expect(duration).toBeLessThan(E2E_CONFIG.performance.maxShopOrderSearch * 1000)
  })

  test('2.2 - Search Shop Order (invalid) : Doit retourner une erreur', async ({ request }) => {
    testLog('Testing Shop Order search with invalid order:', INVALID_SHOP_ORDER.orderNo)

    const response = await request.post(
      `${E2E_CONFIG.app.baseUrl}${E2E_CONFIG.api.shopOrders}/search`,
      {
        data: {
          orderNo: INVALID_SHOP_ORDER.orderNo,
          releaseNo: INVALID_SHOP_ORDER.releaseNo,
          sequenceNo: INVALID_SHOP_ORDER.sequenceNo
        },
        timeout: E2E_CONFIG.timeouts.ifsApi
      }
    )

    // Peut retourner 404 ou 200 avec success=false
    const data = await response.json()
    
    if (response.status() === 200) {
      // Si 200, alors success doit être false
      expect(data.success).toBe(false)
      expect(data.error).toBeDefined()
    } else {
      // Sinon, doit être 404
      expect(response.status()).toBe(404)
    }

    testLog('✅ Invalid Shop Order correctly rejected')
  })

  test.skip('2.3 - Get Serial Number : GET /api/boat-configuration/serial-numbers/:dopId', async ({ request }) => {
    testLog('Testing Serial Number fetch for DOP ID:', PRIMARY_SHOP_ORDER.expectedDopId)

    const { result, duration } = await measureTime(async () => {
      return await request.get(
        `${E2E_CONFIG.app.baseUrl}${E2E_CONFIG.api.serialNumbers}/${PRIMARY_SHOP_ORDER.expectedDopId}`,
        {
          timeout: E2E_CONFIG.timeouts.ifsApi
        }
      )
    })

    testLog(`⏱️ Serial Number fetch took ${duration}ms`)

    // Vérifier le statut HTTP
    expect(result.status()).toBe(200)

    // Vérifier la structure de la réponse
    const data = await result.json()
    expect(data.success).toBe(true)
    expect(data.data).toBeDefined()

    // Vérifier que le Serial Number correspond
    const serialNumber = data.data
    expect(serialNumber.SerialNo).toBe(PRIMARY_SHOP_ORDER.expectedSerialNumber)

    testLog('✅ Serial Number found:', serialNumber.SerialNo)

    // Vérifier la performance (< 5s)
    expect(duration).toBeLessThan(E2E_CONFIG.performance.maxSerialNumberFetch * 1000)
  })

  test.skip('2.4 - Get Customer Order : GET /api/boat-configuration/customer-orders?hullNumber=X', async ({ request }) => {
    testLog('Testing Customer Order fetch for hull:', PRIMARY_SHOP_ORDER.expectedSerialNumber)

    const { result, duration } = await measureTime(async () => {
      return await request.get(
        `${E2E_CONFIG.app.baseUrl}${E2E_CONFIG.api.customerOrders}?hullNumber=${PRIMARY_SHOP_ORDER.expectedSerialNumber}`,
        {
          timeout: E2E_CONFIG.timeouts.ifsApi
        }
      )
    })

    testLog(`⏱️ Customer Order fetch took ${duration}ms`)

    // Vérifier le statut HTTP
    expect(result.status()).toBe(200)

    // Vérifier la structure de la réponse
    const data = await result.json()
    expect(data.success).toBe(true)
    expect(data.data).toBeDefined()

    // Vérifier que le Customer Order contient les champs attendus
    const customerOrder = data.data
    expect(customerOrder.OrderNo).toBeDefined()
    expect(customerOrder.HullNumber).toBe(PRIMARY_SHOP_ORDER.expectedSerialNumber)

    testLog('✅ Customer Order found:', {
      OrderNo: customerOrder.OrderNo,
      HullNumber: customerOrder.HullNumber
    })

    // Vérifier la performance (< 10s)
    expect(duration).toBeLessThan(E2E_CONFIG.performance.maxCustomerOrderFetch * 1000)
  })

  test('2.5 - List Printers : GET /api/shared/printers', async ({ request }) => {
    testLog('Testing printers list fetch')

    const { result, duration } = await measureTime(async () => {
      return await request.get(
        `${E2E_CONFIG.app.baseUrl}${E2E_CONFIG.api.printers}`,
        {
          timeout: E2E_CONFIG.timeouts.ifsApi
        }
      )
    })

    testLog(`⏱️ Printers list fetch took ${duration}ms`)

    // Vérifier le statut HTTP
    expect(result.status()).toBe(200)

    // Vérifier la structure de la réponse
    const data = await result.json()
    expect(data.success).toBe(true)
    expect(Array.isArray(data.printers)).toBe(true)

    // Vérifier qu'on a au moins les imprimantes validées
    const printers = data.printers
    expect(printers.length).toBeGreaterThan(0)

    testLog(`✅ Found ${printers.length} printers in IFS`)

    // Vérifier la performance (< 5s)
    expect(duration).toBeLessThan(E2E_CONFIG.performance.maxPrinterListFetch * 1000)
  })

  test('2.6 - List Languages : GET /api/shared/languages', async ({ request }) => {
    testLog('Testing languages list fetch')

    const { result, duration } = await measureTime(async () => {
      return await request.get(
        `${E2E_CONFIG.app.baseUrl}${E2E_CONFIG.api.languages}`,
        {
          timeout: E2E_CONFIG.timeouts.ifsApi
        }
      )
    })

    testLog(`⏱️ Languages list fetch took ${duration}ms`)

    // Vérifier le statut HTTP
    expect(result.status()).toBe(200)

    // Vérifier la structure de la réponse
    const data = await result.json()
    expect(data.success).toBe(true)
    expect(Array.isArray(data.languages)).toBe(true)

    // Vérifier qu'on a au moins les langues validées
    const languages = data.languages
    expect(languages.length).toBeGreaterThan(0)

    testLog(`✅ Found ${languages.length} languages in IFS`)

    // Vérifier la performance (< 5s)
    expect(duration).toBeLessThan(E2E_CONFIG.performance.maxLanguageListFetch * 1000)
  })

  test.skip('2.7 - Print Document : POST /api/boat-configuration/print', async ({ request }) => {
    testLog('Testing print operation')

    const { result, duration } = await measureTime(async () => {
      return await request.post(
        `${E2E_CONFIG.app.baseUrl}${E2E_CONFIG.api.print}`,
        {
          data: {
            serialNumber: PRIMARY_SHOP_ORDER.expectedSerialNumber,
            dopHeaderId: PRIMARY_SHOP_ORDER.expectedDopId,
            printer: VALID_PRINTERS[1].printerId, // LP_TEST
            language: VALID_LANGUAGES[0].code // English
          },
          timeout: E2E_CONFIG.timeouts.printOperation
        }
      )
    })

    testLog(`⏱️ Print operation took ${duration}ms`)

    // Vérifier le statut HTTP
    expect(result.status()).toBe(200)

    // Vérifier la structure de la réponse
    const data = await result.json()
    expect(data.success).toBe(true)
    expect(data.message).toBeDefined()

    testLog('✅ Print job submitted successfully:', data.message)

    // Vérifier la performance (< 15s)
    expect(duration).toBeLessThan(E2E_CONFIG.performance.maxPrintOperation * 1000)
  })
})
