/**
 * Tests unitaires - serial-number-service.ts
 * 
 * Tests des 3 fonctions principales :
 * 1. getFirstSerialNumberFromDop() - Récupère le premier Serial Number
 * 2. getAllSerialNumbersFromDop() - Récupère tous les Serial Numbers
 * 3. hasSerialNumbers() - Vérifie l'existence de Serial Numbers
 * 
 * ⚠️ Tests UNITAIRES avec mocks (pas d'appels IFS réels)
 * 
 * Stratégie:
 * - Mock de getIFSClient() pour isoler la logique métier
 * - Utilisation de fixtures avec données IFS réelles
 * - Tests des cas nominaux + edge cases + erreurs
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  getFirstSerialNumberFromDop,
  getAllSerialNumbersFromDop,
  hasSerialNumbers,
} from '@/tools/boat-configuration/services/serial-number-service'
import type { IFSODataResponse, DopHeadSerialReservation } from '@/shared/types/ifs'
import { MOCK_DOP_SERIAL_RESERVATIONS } from '../fixtures/shop-order.fixture'
import * as ifsClientModule from '@/shared/services/ifs-client'

// Mock du client IFS
vi.mock('@/shared/services/ifs-client')

describe('serial-number-service.ts', () => {
  let mockIFSClient: any

  beforeEach(() => {
    // Reset tous les mocks avant chaque test
    vi.clearAllMocks()

    // Créer le mock client IFS
    mockIFSClient = {
      get: vi.fn(),
    }

    // Configurer le mock
    vi.mocked(ifsClientModule.getIFSClient).mockReturnValue(mockIFSClient)
  })

  // ===================================================================
  // getFirstSerialNumberFromDop()
  // ===================================================================

  describe('getFirstSerialNumberFromDop()', () => {
    // ===== TEST 1: CAS NOMINAL =====

    it('devrait retourner le premier Serial Number quand il existe (DOP "34" → "JY6MB0019")', async () => {
      // Arrange - DOP 34 avec Serial Number JY6MB0019
      const dopId = '34'
      const expectedSerialNo = 'JY6MB0019'

      // Mock IFS retourne le DOP Serial Reservation
      mockIFSClient.get.mockResolvedValueOnce({
        value: [MOCK_DOP_SERIAL_RESERVATIONS['34']],
      } as IFSODataResponse<DopHeadSerialReservation>)

      // Act
      const result = await getFirstSerialNumberFromDop(dopId)

      // Assert
      expect(result).toBe(expectedSerialNo)

      // Vérifier l'appel IFS avec le bon endpoint et filtre
      expect(mockIFSClient.get).toHaveBeenCalledWith(
        'DopHeaderHandling.svc/Reference_DopHeadSerialReserv',
        expect.objectContaining({
          $filter: "contains(DopId,'34')",
          $select: 'DopId,SerialNo,PartNo',
          $top: '50',
        })
      )
    })

    it('devrait retourner le premier Serial Number même avec plusieurs résultats', async () => {
      // Arrange - DOP avec plusieurs Serial Numbers
      const dopId = '95'

      const multipleReservations: DopHeadSerialReservation[] = [
        MOCK_DOP_SERIAL_RESERVATIONS['95'],
        {
          DopId: '95',
          SerialNo: 'LG5MA0115', // Second Serial Number
          PartNo: 'LG5MA',
          ConditionCode: null,
          SerialSourceDb: 'SHOP_ORDER',
          SerialSource: 'Shop Order',
        },
      ]

      mockIFSClient.get.mockResolvedValueOnce({
        value: multipleReservations,
      } as IFSODataResponse<DopHeadSerialReservation>)

      // Act
      const result = await getFirstSerialNumberFromDop(dopId)

      // Assert - Doit retourner uniquement le PREMIER
      expect(result).toBe('LG5MA0114')
    })

    // ===== TEST 2: AUCUN SERIAL NUMBER =====

    it('devrait retourner null quand aucun Serial Number n\'existe pour ce DOP', async () => {
      // Arrange - DOP sans Serial Number
      const dopId = '99'

      // Mock IFS retourne liste vide
      mockIFSClient.get.mockResolvedValueOnce({
        '@odata.context': 'test',
        value: [],
      } as IFSODataResponse<DopHeadSerialReservation>)

      // Act
      const result = await getFirstSerialNumberFromDop(dopId)

      // Assert
      expect(result).toBeNull()

      // Vérifier que l'appel IFS a bien été fait
      expect(mockIFSClient.get).toHaveBeenCalledTimes(1)
    })

    // ===== TEST 3: DOP ID VIDE =====

    it('devrait retourner null et logger un warning si le DOP ID est vide', async () => {
      // Arrange
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      // Act
      const result = await getFirstSerialNumberFromDop('')

      // Assert
      expect(result).toBeNull()
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Empty DOP ID provided')
      )

      // Le client IFS ne doit PAS être appelé
      expect(mockIFSClient.get).not.toHaveBeenCalled()

      // Cleanup
      consoleWarnSpy.mockRestore()
    })

    it('devrait gérer le DOP ID avec des espaces (trim)', async () => {
      // Arrange - DOP ID avec espaces
      const dopId = '  54  '

      mockIFSClient.get.mockResolvedValueOnce({
        value: [MOCK_DOP_SERIAL_RESERVATIONS['54']],
      } as IFSODataResponse<DopHeadSerialReservation>)

      // Act
      const result = await getFirstSerialNumberFromDop(dopId)

      // Assert
      expect(result).toBe('LX6MA0115')

      // Vérifier que le filtre utilise le DOP ID trimmé
      expect(mockIFSClient.get).toHaveBeenCalledWith(
        'DopHeaderHandling.svc/Reference_DopHeadSerialReserv',
        expect.objectContaining({
          $filter: "contains(DopId,'54')", // Pas d'espaces
        })
      )
    })

    // ===== TEST 4: ERREURS IFS =====

    it('devrait throw une erreur si IFS échoue (timeout, 500, etc.)', async () => {
      // Arrange
      const dopId = '34'

      // Mock IFS rejette avec erreur réseau
      mockIFSClient.get.mockRejectedValueOnce(new Error('IFS connection timeout'))

      // Act & Assert
      await expect(getFirstSerialNumberFromDop(dopId)).rejects.toThrow(
        'Failed to fetch Serial Number'
      )
    })

    it('devrait throw une erreur si IFS retourne un format invalide', async () => {
      // Arrange
      const dopId = '34'

      // Mock IFS retourne null (pas de "value")
      mockIFSClient.get.mockResolvedValueOnce(null)

      // Act & Assert
      await expect(getFirstSerialNumberFromDop(dopId)).rejects.toThrow()
    })
  })

  // ===================================================================
  // getAllSerialNumbersFromDop()
  // ===================================================================

  describe('getAllSerialNumbersFromDop()', () => {
    // ===== TEST 1: CAS NOMINAL =====

    it('devrait retourner tous les Serial Numbers pour un DOP', async () => {
      // Arrange - DOP avec 2 Serial Numbers
      const dopId = '95'

      const multipleReservations: DopHeadSerialReservation[] = [
        MOCK_DOP_SERIAL_RESERVATIONS['95'],
        {
          DopId: '95',
          SerialNo: 'LG5MA0115',
          PartNo: 'LG5MA',
          ConditionCode: null,
          SerialSourceDb: 'SHOP_ORDER',
          SerialSource: 'Shop Order',
        },
      ]

      mockIFSClient.get.mockResolvedValueOnce({
        value: multipleReservations,
      } as IFSODataResponse<DopHeadSerialReservation>)

      // Act
      const result = await getAllSerialNumbersFromDop(dopId)

      // Assert
      expect(result).toHaveLength(2)
      expect(result[0].SerialNo).toBe('LG5MA0114')
      expect(result[1].SerialNo).toBe('LG5MA0115')

      // Vérifier l'appel IFS avec $top plus élevé
      expect(mockIFSClient.get).toHaveBeenCalledWith(
        'DopHeaderHandling.svc/Reference_DopHeadSerialReserv',
        expect.objectContaining({
          $filter: "contains(DopId,'95')",
          $select: 'DopId,SerialNo,PartNo,SerialSource',
          $top: '100', // Plus élevé que getFirstSerialNumberFromDop()
        })
      )
    })

    it('devrait retourner un seul Serial Number si un seul existe', async () => {
      // Arrange - DOP avec 1 seul Serial Number
      const dopId = '34'

      mockIFSClient.get.mockResolvedValueOnce({
        value: [MOCK_DOP_SERIAL_RESERVATIONS['34']],
      } as IFSODataResponse<DopHeadSerialReservation>)

      // Act
      const result = await getAllSerialNumbersFromDop(dopId)

      // Assert
      expect(result).toHaveLength(1)
      expect(result[0].SerialNo).toBe('JY6MB0019')
    })

    // ===== TEST 2: AUCUN SERIAL NUMBER =====

    it('devrait retourner un tableau vide si aucun Serial Number n\'existe', async () => {
      // Arrange
      const dopId = '99'

      mockIFSClient.get.mockResolvedValueOnce({
        '@odata.context': 'test',
        value: [],
      } as IFSODataResponse<DopHeadSerialReservation>)

      // Act
      const result = await getAllSerialNumbersFromDop(dopId)

      // Assert
      expect(result).toEqual([])
      expect(result).toHaveLength(0)
    })

    // ===== TEST 3: DOP ID VIDE =====

    it('devrait retourner un tableau vide et logger un warning si le DOP ID est vide', async () => {
      // Arrange
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      // Act
      const result = await getAllSerialNumbersFromDop('')

      // Assert
      expect(result).toEqual([])
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Empty DOP ID provided')
      )

      // Le client IFS ne doit PAS être appelé
      expect(mockIFSClient.get).not.toHaveBeenCalled()

      // Cleanup
      consoleWarnSpy.mockRestore()
    })

    // ===== TEST 4: ERREURS IFS =====

    it('devrait throw une erreur si IFS échoue', async () => {
      // Arrange
      const dopId = '34'

      mockIFSClient.get.mockRejectedValueOnce(new Error('Network error'))

      // Act & Assert
      await expect(getAllSerialNumbersFromDop(dopId)).rejects.toThrow(
        'Failed to fetch Serial Numbers'
      )
    })
  })

  // ===================================================================
  // hasSerialNumbers()
  // ===================================================================

  describe('hasSerialNumbers()', () => {
    // ===== TEST 1: CAS NOMINAL =====

    it('devrait retourner true si au moins un Serial Number existe', async () => {
      // Arrange
      const dopId = '34'

      mockIFSClient.get.mockResolvedValueOnce({
        value: [MOCK_DOP_SERIAL_RESERVATIONS['34']],
      } as IFSODataResponse<DopHeadSerialReservation>)

      // Act
      const result = await hasSerialNumbers(dopId)

      // Assert
      expect(result).toBe(true)
    })

    // ===== TEST 2: AUCUN SERIAL NUMBER =====

    it('devrait retourner false si aucun Serial Number n\'existe', async () => {
      // Arrange
      const dopId = '99'

      mockIFSClient.get.mockResolvedValueOnce({
        '@odata.context': 'test',
        value: [],
      } as IFSODataResponse<DopHeadSerialReservation>)

      // Act
      const result = await hasSerialNumbers(dopId)

      // Assert
      expect(result).toBe(false)
    })

    // ===== TEST 3: DOP ID VIDE =====

    it('devrait retourner false si le DOP ID est vide', async () => {
      // Act
      const result = await hasSerialNumbers('')

      // Assert
      expect(result).toBe(false)

      // Le client IFS ne doit PAS être appelé
      expect(mockIFSClient.get).not.toHaveBeenCalled()
    })

    // ===== TEST 4: ERREURS IFS =====

    it('devrait retourner false (pas throw) si IFS échoue', async () => {
      // Arrange
      const dopId = '34'
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      mockIFSClient.get.mockRejectedValueOnce(new Error('IFS error'))

      // Act
      const result = await hasSerialNumbers(dopId)

      // Assert
      expect(result).toBe(false)
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Error checking Serial Numbers'),
        expect.any(Error)
      )

      // Cleanup
      consoleErrorSpy.mockRestore()
    })

    it('devrait gérer les erreurs silencieusement (pas de throw)', async () => {
      // Arrange
      const dopId = '34'
      vi.spyOn(console, 'error').mockImplementation(() => {})

      mockIFSClient.get.mockRejectedValueOnce(new Error('Network timeout'))

      // Act & Assert - Ne doit PAS throw
      await expect(hasSerialNumbers(dopId)).resolves.toBe(false)
    })
  })

  // ===================================================================
  // Tests de cohérence entre les fonctions
  // ===================================================================

  describe('Cohérence entre les fonctions', () => {
    it('hasSerialNumbers() doit retourner true si getFirstSerialNumberFromDop() retourne un Serial Number', async () => {
      // Arrange
      const dopId = '34'

      mockIFSClient.get.mockResolvedValue({
        value: [MOCK_DOP_SERIAL_RESERVATIONS['34']],
      } as IFSODataResponse<DopHeadSerialReservation>)

      // Act
      const hasResults = await hasSerialNumbers(dopId)
      const firstSerial = await getFirstSerialNumberFromDop(dopId)

      // Assert
      expect(hasResults).toBe(true)
      expect(firstSerial).not.toBeNull()
    })

    it('getAllSerialNumbersFromDop() doit retourner un tableau contenant le résultat de getFirstSerialNumberFromDop()', async () => {
      // Arrange
      const dopId = '54'

      mockIFSClient.get.mockResolvedValue({
        value: [MOCK_DOP_SERIAL_RESERVATIONS['54']],
      } as IFSODataResponse<DopHeadSerialReservation>)

      // Act
      const firstSerial = await getFirstSerialNumberFromDop(dopId)
      const allSerials = await getAllSerialNumbersFromDop(dopId)

      // Assert
      expect(allSerials).toHaveLength(1)
      expect(allSerials[0].SerialNo).toBe(firstSerial)
    })
  })
})
