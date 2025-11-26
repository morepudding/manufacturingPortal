/**
 * Tests unitaires - shop-order-service.ts
 * 
 * Tests de la fonction searchShopOrder() qui :
 * 1. Recherche un Shop Order dans IFS via OData API
 * 2. Extrait le DOP ID et le parse si nécessaire
 * 3. Récupère le Serial Number via le DOP
 * 
 * ⚠️ Tests UNITAIRES avec mocks (pas d'appels IFS réels)
 * 
 * Stratégie:
 * - Mock de getIFSClient() pour isoler la logique métier
 * - Utilisation de fixtures avec données IFS réelles
 * - Tests des cas nominaux + edge cases + erreurs
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { searchShopOrder } from '@/tools/boat-configuration/services/shop-order-service'
import type { ShopOrderSearchParams } from '@/shared/types/ifs'
import {
  MOCK_SHOP_ORDER_563,
  MOCK_SHOP_ORDER_1043,
  MOCK_SHOP_ORDER_WITHOUT_DOP,
  MOCK_SHOP_ORDERS_LIST,
  MOCK_SERIAL_NUMBERS_BY_DOP,
} from '../fixtures/shop-order.fixture'
import * as ifsClientModule from '@/shared/services/ifs-client'
import * as serialNumberServiceModule from '@/tools/boat-configuration/services/serial-number-service'

// Mock du client IFS
vi.mock('@/shared/services/ifs-client')

// Mock du service Serial Number
vi.mock('@/tools/boat-configuration/services/serial-number-service')

describe('shop-order-service.ts', () => {
  describe('searchShopOrder()', () => {
    let mockIFSClient: any
    let mockGetFirstSerialNumberFromDop: any

    beforeEach(() => {
      // Reset tous les mocks avant chaque test
      vi.clearAllMocks()

      // Créer le mock client IFS
      mockIFSClient = {
        get: vi.fn(),
      }

      // Configurer les mocks
      vi.mocked(ifsClientModule.getIFSClient).mockReturnValue(mockIFSClient)
      mockGetFirstSerialNumberFromDop = vi.mocked(serialNumberServiceModule.getFirstSerialNumberFromDop)
    })

    // ===== TEST 1: CAS NOMINAL =====

    it('devrait retourner un Shop Order avec DOP et Serial Number (cas nominal)', async () => {
      // Arrange - Données réelles Shop Order 563
      const params: ShopOrderSearchParams = {
        orderNo: '563',
        releaseNo: '1',
        sequenceNo: '10',
      }

      // Mock IFS retourne Shop Order 563 avec DOP "34 - 1014"
      mockIFSClient.get.mockResolvedValueOnce({
        value: [MOCK_SHOP_ORDER_563],
      })

      // Mock Serial Number service retourne "JY6MB0019"
      mockGetFirstSerialNumberFromDop.mockResolvedValueOnce('JY6MB0019')

      // Act
      const result = await searchShopOrder(params)

      // Assert
      expect(result).toEqual({
        shopOrder: MOCK_SHOP_ORDER_563,
        found: true,
        serialNumber: 'JY6MB0019',
        dopHeaderId: '34 - 1014',
      })

      // Vérifier que le client IFS a été appelé avec les bons filtres
      expect(mockIFSClient.get).toHaveBeenCalledWith(
        'ShopOrderHandling.svc/ShopOrds',
        expect.objectContaining({
          $filter: expect.stringContaining("contains(OrderNo,'563')"),
        })
      )

      // Vérifier que le service Serial Number a été appelé avec le DOP ID PARSÉ
      // (le parsing "34 - 1014" → "34" est fait par shop-order-service)
      expect(mockGetFirstSerialNumberFromDop).toHaveBeenCalledWith('34')
    })

    // ===== TEST 2: SHOP ORDER SANS DOP =====

    it('devrait retourner serialNumber=null si le Shop Order n\'a pas de DOP', async () => {
      // Arrange
      const params: ShopOrderSearchParams = {
        orderNo: '99999',
        releaseNo: '1',
        sequenceNo: '10',
      }

      // Mock IFS retourne Shop Order sans DOP
      mockIFSClient.get.mockResolvedValueOnce({
        value: [MOCK_SHOP_ORDER_WITHOUT_DOP],
      })

      // Act
      const result = await searchShopOrder(params)

      // Assert
      expect(result).toEqual({
        shopOrder: MOCK_SHOP_ORDER_WITHOUT_DOP,
        found: true,
        serialNumber: null,
        dopHeaderId: null,
      })

      // Le service Serial Number ne doit PAS être appelé
      expect(mockGetFirstSerialNumberFromDop).not.toHaveBeenCalled()
    })

    // ===== TEST 3: DOP ID COMPOSÉ (PARSING) =====

    it('devrait parser correctement un DOP ID composé ("54 - 1035" → "54")', async () => {
      // Arrange - Shop Order 1043 avec DOP composé "54 - 1035"
      const params: ShopOrderSearchParams = {
        orderNo: '1043',
        releaseNo: '1',
        sequenceNo: '10',
      }

      mockIFSClient.get.mockResolvedValueOnce({
        value: [MOCK_SHOP_ORDER_1043],
      })

      // Mock Serial Number service avec DOP ID composé
      mockGetFirstSerialNumberFromDop.mockResolvedValueOnce('LX6MA0115')

      // Act
      const result = await searchShopOrder(params)

      // Assert
      expect(result).toEqual({
        shopOrder: MOCK_SHOP_ORDER_1043,
        found: true,
        serialNumber: 'LX6MA0115',
        dopHeaderId: '54 - 1035',
      })

      // Vérifier que le service Serial Number reçoit le DOP ID PARSÉ ("54")
      // (le parsing est fait dans shop-order-service avant l'appel)
      expect(mockGetFirstSerialNumberFromDop).toHaveBeenCalledWith('54')
    })

    // ===== TEST 4: SHOP ORDER NON TROUVÉ =====

    it('devrait retourner found=false si le Shop Order n\'existe pas dans IFS', async () => {
      // Arrange
      const params: ShopOrderSearchParams = {
        orderNo: '00000',
        releaseNo: '1',
        sequenceNo: '10',
      }

      // Mock IFS retourne liste vide
      mockIFSClient.get.mockResolvedValueOnce({
        value: [],
      })

      // Act
      const result = await searchShopOrder(params)

      // Assert
      expect(result.found).toBe(false)
      expect(result.error).toContain('Shop Order not found')

      // Le service Serial Number ne doit PAS être appelé
      expect(mockGetFirstSerialNumberFromDop).not.toHaveBeenCalled()
    })

    // ===== TEST 5: VALIDATION DES PARAMÈTRES =====

    it('devrait rejeter les paramètres invalides (orderNo vide)', async () => {
      // Arrange
      const params: ShopOrderSearchParams = {
        orderNo: '',
        releaseNo: '1',
        sequenceNo: '10',
      }

      // Act
      const result = await searchShopOrder(params)

      // Assert
      expect(result.found).toBe(false)
      expect(result.error).toContain('Missing required parameters')

      // Le client IFS ne doit PAS être appelé
      expect(mockIFSClient.get).not.toHaveBeenCalled()
    })

    it('devrait rejeter les paramètres invalides (releaseNo vide)', async () => {
      // Arrange
      const params: ShopOrderSearchParams = {
        orderNo: '563',
        releaseNo: '',
        sequenceNo: '10',
      }

      // Act
      const result = await searchShopOrder(params)

      // Assert
      expect(result.found).toBe(false)
      expect(result.error).toContain('Missing required parameters')

      // Le client IFS ne doit PAS être appelé
      expect(mockIFSClient.get).not.toHaveBeenCalled()
    })

    // ===== TEST 6: FILTRAGE EXACT (éviter "1043" → "101043") =====

    it('devrait retourner uniquement le Shop Order correspondant exactement (pas de faux positif)', async () => {
      // Arrange
      const params: ShopOrderSearchParams = {
        orderNo: '1043',
        releaseNo: '1',
        sequenceNo: '10',
      }

      // Mock IFS retourne 2 résultats: "1043" ET "101043" (faux positif)
      mockIFSClient.get.mockResolvedValueOnce({
        value: MOCK_SHOP_ORDERS_LIST, // Contient 1043 et 101043
      })

      mockGetFirstSerialNumberFromDop.mockResolvedValueOnce('LX6MA0115')

      // Act
      const result = await searchShopOrder(params)

      // Assert
      // Doit retourner uniquement "1043", pas "101043"
      expect(result.shopOrder?.OrderNo).toBe('1043')
      expect(result.found).toBe(true)
      expect(result.serialNumber).toBe('LX6MA0115')
    })

    // ===== TEST 7: ERREUR IFS =====

    it('devrait gérer les erreurs IFS (timeout, 500, etc.)', async () => {
      // Arrange
      const params: ShopOrderSearchParams = {
        orderNo: '563',
        releaseNo: '1',
        sequenceNo: '10',
      }

      // Mock IFS rejette avec erreur réseau
      mockIFSClient.get.mockRejectedValueOnce(new Error('IFS connection timeout'))

      // Act
      const result = await searchShopOrder(params)

      // Assert
      expect(result.found).toBe(false)
      expect(result.error).toContain('IFS connection timeout')

      // Le service Serial Number ne doit PAS être appelé
      expect(mockGetFirstSerialNumberFromDop).not.toHaveBeenCalled()
    })

    // ===== TEST 8: ERREUR LORS DE LA RÉCUPÉRATION DU SERIAL NUMBER =====

    it('devrait gérer les erreurs du service Serial Number', async () => {
      // Arrange
      const params: ShopOrderSearchParams = {
        orderNo: '563',
        releaseNo: '1',
        sequenceNo: '10',
      }

      mockIFSClient.get.mockResolvedValueOnce({
        value: [MOCK_SHOP_ORDER_563],
      })

      // Mock Serial Number service échoue
      mockGetFirstSerialNumberFromDop.mockRejectedValueOnce(
        new Error('DOP Header not found')
      )

      // Act
      const result = await searchShopOrder(params)

      // Assert
      // Le Shop Order doit être retourné, mais serialNumber=null
      expect(result.shopOrder).toEqual(MOCK_SHOP_ORDER_563)
      expect(result.found).toBe(true)
      expect(result.serialNumber).toBe(null)
      expect(result.dopHeaderId).toBe('34 - 1014')
      expect(result.error).toContain('Failed to')
    })
  })
})
