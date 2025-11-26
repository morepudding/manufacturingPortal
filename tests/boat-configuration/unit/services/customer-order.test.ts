/**
 * Tests unitaires - customer-order-service.ts
 * 
 * Tests des fonctions principales du service Customer Order :
 * 1. getCustomerOrderLineByOrderNo() - Récupération via OrderNo + LineNo (✅ RECOMMANDÉ)
 * 2. getCustomerOrderHeader() - Récupération du header
 * 3. getCustomerOrderInfoFromShopOrder() - Consolidation optimisée
 * 4. getCustomerOrderByHullNumber() - ⭐ Méthode optimale directe
 * 5. Utility functions (formatDate, getStatusBadge, canPrintForStatus)
 * 
 * ⚠️ Tests UNITAIRES avec mocks (pas d'appels IFS réels)
 * 
 * Note: getCustomerOrderLineBySerial() est dépréciée (timeouts CHullNumber)
 * donc nous ne la testons pas exhaustivement.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  getCustomerOrderLineByOrderNo,
  getCustomerOrderHeader,
  getCustomerOrderInfoFromShopOrder,
  getCustomerOrderByHullNumber,
  formatDate,
  getStatusBadge,
  canPrintForStatus,
  type CustomerOrderLine,
  type CustomerOrderHeader,
} from '@/tools/boat-configuration/services/customer-order-service'
import type { IFSODataResponse } from '@/shared/types/ifs'
import * as ifsClientModule from '@/shared/services/ifs-client'

// Mock du client IFS
vi.mock('@/shared/services/ifs-client')

describe('customer-order-service.ts', () => {
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
  // getCustomerOrderLineByOrderNo() - ✅ MÉTHODE RECOMMANDÉE
  // ===================================================================

  describe('getCustomerOrderLineByOrderNo()', () => {
    const mockLine: CustomerOrderLine = {
      OrderNo: 'C1000038587',
      LineNo: '1',
      RelNo: '1',
      LineItemNo: '1',
      PartNo: 'LG5MA',
      CatalogNo: 'LG5MA',
      CatalogDesc: 'LAGOON 51 - MAIN HULL',
      CHullNumber: 'LG5MA0114',
      BoatHullNumber: null,
      CustomerNo: 'CNB',
      ConfigurationId: 'CONFIG123',
      Objstate: 'Released',
      BuyQtyDue: 1,
      DopConnection: 'YES',
      DopConnectionExists: 1,
      SupplyCode: 'IO',
      Contract: 'FR05A',
      Company: 'BENETEAU',
      PlannedDeliveryDate: '2025-07-01T00:00:00Z',
      WantedDeliveryDate: '2025-07-01T00:00:00Z',
    }

    it('devrait récupérer une Customer Order Line via OrderNo + LineNo', async () => {
      // Arrange
      mockIFSClient.get.mockResolvedValueOnce({
        '@odata.context': 'test',
        value: [mockLine],
      } as IFSODataResponse<CustomerOrderLine>)

      // Act
      const result = await getCustomerOrderLineByOrderNo('C1000038587', '1')

      // Assert
      expect(result).toEqual(mockLine)
      expect(mockIFSClient.get).toHaveBeenCalledWith(
        'CustomerOrderHandling.svc/CustomerOrderLineSet',
        expect.objectContaining({
          $filter: "OrderNo eq 'C1000038587' and LineNo eq '1'",
        })
      )
    })

    it('devrait retourner null si la ligne n\'est pas trouvée', async () => {
      // Arrange
      mockIFSClient.get.mockResolvedValueOnce({
        '@odata.context': 'test',
        value: [],
      } as IFSODataResponse<CustomerOrderLine>)

      // Act
      const result = await getCustomerOrderLineByOrderNo('C9999999', '1')

      // Assert
      expect(result).toBeNull()
    })

    it('devrait valider que OrderNo est requis', async () => {
      // Act & Assert
      await expect(getCustomerOrderLineByOrderNo('', '1')).rejects.toThrow(
        'Order number is required'
      )
      expect(mockIFSClient.get).not.toHaveBeenCalled()
    })

    it('devrait valider que LineNo est requis', async () => {
      // Act & Assert
      await expect(getCustomerOrderLineByOrderNo('C1000038587', '')).rejects.toThrow(
        'Line number is required'
      )
      expect(mockIFSClient.get).not.toHaveBeenCalled()
    })

    it('devrait trimmer les espaces dans OrderNo et LineNo', async () => {
      // Arrange
      mockIFSClient.get.mockResolvedValueOnce({
        '@odata.context': 'test',
        value: [mockLine],
      } as IFSODataResponse<CustomerOrderLine>)

      // Act
      await getCustomerOrderLineByOrderNo('  C1000038587  ', '  1  ')

      // Assert
      expect(mockIFSClient.get).toHaveBeenCalledWith(
        'CustomerOrderHandling.svc/CustomerOrderLineSet',
        expect.objectContaining({
          $filter: "OrderNo eq 'C1000038587' and LineNo eq '1'",
        })
      )
    })

    it('devrait throw une erreur si IFS échoue', async () => {
      // Arrange
      mockIFSClient.get.mockRejectedValueOnce(new Error('IFS connection error'))

      // Act & Assert
      await expect(getCustomerOrderLineByOrderNo('C1000038587', '1')).rejects.toThrow(
        'Failed to fetch Customer Order Line'
      )
    })
  })

  // ===================================================================
  // getCustomerOrderHeader()
  // ===================================================================

  describe('getCustomerOrderHeader()', () => {
    const mockHeader: CustomerOrderHeader = {
      OrderNo: 'C1000038587',
      CustomerNo: 'CNB',
      CustomerName: 'CATAMARAN NAVIGUE BLEU',
      Objstate: 'Released',
      DateEntered: '2024-01-15T00:00:00Z',
      Contract: 'FR05A',
      Company: 'BENETEAU',
      CurrencyCode: 'EUR',
      WantedDeliveryDate: '2025-07-01T00:00:00Z',
      CustomerPoNo: 'PO-2024-001',
      InternalPoNo: 'INT-001',
    }

    it('devrait récupérer le header d\'un Customer Order', async () => {
      // Arrange
      mockIFSClient.get.mockResolvedValueOnce({
        '@odata.context': 'test',
        value: [mockHeader],
      } as IFSODataResponse<CustomerOrderHeader>)

      // Act
      const result = await getCustomerOrderHeader('C1000038587')

      // Assert
      expect(result).toEqual(mockHeader)
      expect(mockIFSClient.get).toHaveBeenCalledWith(
        'CustomerOrderHandling.svc/CustomerOrderSet',
        expect.objectContaining({
          $filter: "OrderNo eq 'C1000038587'",
          $top: '1',
        })
      )
    })

    it('devrait throw une erreur si le header n\'est pas trouvé', async () => {
      // Arrange
      mockIFSClient.get.mockResolvedValueOnce({
        '@odata.context': 'test',
        value: [],
      } as IFSODataResponse<CustomerOrderHeader>)

      // Act & Assert
      await expect(getCustomerOrderHeader('C9999999')).rejects.toThrow(
        'Customer Order C9999999 not found'
      )
    })

    it('devrait valider que OrderNo est requis', async () => {
      // Act & Assert
      await expect(getCustomerOrderHeader('')).rejects.toThrow(
        'Order number is required'
      )
      expect(mockIFSClient.get).not.toHaveBeenCalled()
    })

    it('devrait throw une erreur si IFS échoue', async () => {
      // Arrange
      mockIFSClient.get.mockRejectedValueOnce(new Error('Network timeout'))

      // Act & Assert
      await expect(getCustomerOrderHeader('C1000038587')).rejects.toThrow(
        'Failed to fetch Customer Order Header'
      )
    })
  })

  // ===================================================================
  // getCustomerOrderInfoFromShopOrder() - ✅ FONCTION OPTIMISÉE
  // ===================================================================

  describe('getCustomerOrderInfoFromShopOrder()', () => {
    const mockLine: CustomerOrderLine = {
      OrderNo: 'C1000038587',
      LineNo: '1',
      RelNo: '1',
      LineItemNo: '1',
      PartNo: 'LG5MA',
      CatalogNo: 'LG5MA',
      CatalogDesc: 'LAGOON 51 - MAIN HULL',
      CHullNumber: 'LG5MA0114',
      BoatHullNumber: null,
      CustomerNo: 'CNB',
      ConfigurationId: 'CONFIG123',
      Objstate: 'Released',
      BuyQtyDue: 1,
      DopConnection: 'YES',
      DopConnectionExists: 1,
      SupplyCode: 'IO',
      Contract: 'FR05A',
      Company: 'BENETEAU',
      PlannedDeliveryDate: '2025-07-01T00:00:00Z',
      WantedDeliveryDate: '2025-07-01T00:00:00Z',
    }

    const mockHeader: CustomerOrderHeader = {
      OrderNo: 'C1000038587',
      CustomerNo: 'CNB',
      CustomerName: 'CATAMARAN NAVIGUE BLEU',
      Objstate: 'Released',
      DateEntered: '2024-01-15T00:00:00Z',
      Contract: 'FR05A',
      Company: 'BENETEAU',
      CurrencyCode: 'EUR',
      WantedDeliveryDate: '2025-07-01T00:00:00Z',
      CustomerPoNo: 'PO-2024-001',
      InternalPoNo: 'INT-001',
    }

    it('devrait récupérer les infos complètes (Line + Header) avec Serial Number', async () => {
      // Arrange
      mockIFSClient.get
        .mockResolvedValueOnce({
          '@odata.context': 'test',
          value: [mockLine],
        } as IFSODataResponse<CustomerOrderLine>)
        .mockResolvedValueOnce({
          '@odata.context': 'test',
          value: [mockHeader],
        } as IFSODataResponse<CustomerOrderHeader>)

      // Act
      const result = await getCustomerOrderInfoFromShopOrder(
        'C1000038587',
        '1',
        'LG5MA0114'
      )

      // Assert
      expect(result).toEqual({
        orderNo: 'C1000038587',
        lineNo: '1',
        partNo: 'LG5MA',
        catalogDesc: 'LAGOON 51 - MAIN HULL',
        chullNumber: 'LG5MA0114',
        customerNo: 'CNB',
        customerName: 'CATAMARAN NAVIGUE BLEU',
        configurationId: 'CONFIG123',
        status: 'Released',
        quantity: 1,
        contract: 'FR05A',
        plannedDeliveryDate: mockLine.PlannedDeliveryDate,
        wantedDeliveryDate: mockLine.WantedDeliveryDate,
        customerPoNo: 'PO-2024-001',
        internalPoNo: 'INT-001',
      })
    })

    it('devrait fonctionner sans Serial Number (validation optionnelle)', async () => {
      // Arrange
      mockIFSClient.get
        .mockResolvedValueOnce({
          '@odata.context': 'test',
          value: [mockLine],
        } as IFSODataResponse<CustomerOrderLine>)
        .mockResolvedValueOnce({
          '@odata.context': 'test',
          value: [mockHeader],
        } as IFSODataResponse<CustomerOrderHeader>)

      // Act
      const result = await getCustomerOrderInfoFromShopOrder('C1000038587', '1')

      // Assert
      expect(result).toBeDefined()
      expect(result?.chullNumber).toBe('LG5MA0114')
    })

    it('devrait fonctionner même si getCustomerOrderHeader échoue (fallback)', async () => {
      // Arrange
      mockIFSClient.get
        .mockResolvedValueOnce({
          '@odata.context': 'test',
          value: [mockLine],
        } as IFSODataResponse<CustomerOrderLine>)
        .mockRejectedValueOnce(new Error('Header not found'))

      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      // Act
      const result = await getCustomerOrderInfoFromShopOrder('C1000038587', '1')

      // Assert
      expect(result).toBeDefined()
      expect(result?.customerName).toBeUndefined() // Header pas récupéré
      expect(result?.orderNo).toBe('C1000038587') // Line récupéré quand même
      expect(consoleWarnSpy).toHaveBeenCalled()

      consoleWarnSpy.mockRestore()
    })

    it('devrait retourner null si la Line n\'est pas trouvée', async () => {
      // Arrange
      mockIFSClient.get.mockResolvedValueOnce({
        '@odata.context': 'test',
        value: [],
      } as IFSODataResponse<CustomerOrderLine>)

      // Act
      const result = await getCustomerOrderInfoFromShopOrder('C9999999', '1')

      // Assert
      expect(result).toBeNull()
    })

    it('devrait retourner null si une erreur critique survient', async () => {
      // Arrange
      mockIFSClient.get.mockRejectedValueOnce(new Error('Critical error'))

      // Act
      const result = await getCustomerOrderInfoFromShopOrder('C1000038587', '1')

      // Assert
      expect(result).toBeNull()
    })
  })

  // ===================================================================
  // getCustomerOrderByHullNumber() - ⭐ MÉTHODE OPTIMALE
  // ===================================================================

  describe('getCustomerOrderByHullNumber()', () => {
    const mockLine: CustomerOrderLine = {
      OrderNo: 'C1000038587',
      LineNo: '1',
      RelNo: '1',
      LineItemNo: '1',
      PartNo: 'LG5MA',
      CatalogNo: 'LG5MA',
      CatalogDesc: 'LAGOON 51 - MAIN HULL',
      CHullNumber: 'LG5MA0114',
      BoatHullNumber: null,
      CustomerNo: 'CNB',
      ConfigurationId: 'CONFIG123',
      Objstate: 'Released',
      BuyQtyDue: 1,
      DopConnection: 'YES',
      DopConnectionExists: 1,
      SupplyCode: 'IO',
      Contract: 'FR05A',
      Company: 'BENETEAU',
      PlannedDeliveryDate: '2025-07-01T00:00:00Z',
      WantedDeliveryDate: '2025-07-01T00:00:00Z',
    }

    const mockHeader: CustomerOrderHeader = {
      OrderNo: 'C1000038587',
      CustomerNo: 'CNB',
      CustomerName: 'CATAMARAN NAVIGUE BLEU',
      Objstate: 'Released',
      DateEntered: '2024-01-15T00:00:00Z',
      Contract: 'FR05A',
      Company: 'BENETEAU',
      CurrencyCode: 'EUR',
      WantedDeliveryDate: '2025-07-01T00:00:00Z',
      CustomerPoNo: 'PO-2024-001',
      InternalPoNo: 'INT-001',
    }

    it('devrait récupérer un Customer Order via Hull Number (site FR05A par défaut)', async () => {
      // Arrange
      mockIFSClient.get
        .mockResolvedValueOnce({
          '@odata.context': 'test',
          value: [mockLine],
        } as IFSODataResponse<CustomerOrderLine>)
        .mockResolvedValueOnce({
          '@odata.context': 'test',
          value: [mockHeader],
        } as IFSODataResponse<CustomerOrderHeader>)

      // Act
      const result = await getCustomerOrderByHullNumber('LG5MA0114')

      // Assert
      expect(result).toBeDefined()
      expect(result?.chullNumber).toBe('LG5MA0114')
      expect(result?.customerName).toBe('CATAMARAN NAVIGUE BLEU')
      expect(mockIFSClient.get).toHaveBeenCalledWith(
        'CustomerOrderHandling.svc/CustomerOrderLineSet',
        expect.objectContaining({
          $filter: "CHullNumber eq 'LG5MA0114' and Contract eq 'FR05A'",
        })
      )
    })

    it('devrait utiliser FR05A explicitement quand fourni', async () => {
      // Arrange
      mockIFSClient.get
        .mockResolvedValueOnce({
          '@odata.context': 'test',
          value: [mockLine],
        } as IFSODataResponse<CustomerOrderLine>)
        .mockResolvedValueOnce({
          '@odata.context': 'test',
          value: [mockHeader],
        } as IFSODataResponse<CustomerOrderHeader>)

      // Act
      await getCustomerOrderByHullNumber('LG5MA0114', 'FR05A')

      // Assert
      expect(mockIFSClient.get).toHaveBeenCalledWith(
        'CustomerOrderHandling.svc/CustomerOrderLineSet',
        expect.objectContaining({
          $filter: "CHullNumber eq 'LG5MA0114' and Contract eq 'FR05A'",
        })
      )
    })

    it('devrait rejeter un site différent de FR05A (validation Boat Config)', async () => {
      // Act & Assert
      await expect(getCustomerOrderByHullNumber('LG5MA0114', 'FR02A')).rejects.toThrow(
        'Invalid site'
      )
      await expect(getCustomerOrderByHullNumber('LG5MA0114', 'FR01A')).rejects.toThrow(
        'Invalid site'
      )
      expect(mockIFSClient.get).not.toHaveBeenCalled()
    })

    it('devrait valider que Hull Number est requis', async () => {
      // Act & Assert
      await expect(getCustomerOrderByHullNumber('')).rejects.toThrow(
        'Hull Number is required'
      )
      expect(mockIFSClient.get).not.toHaveBeenCalled()
    })

    it('devrait retourner null si aucun Customer Order n\'est trouvé', async () => {
      // Arrange
      mockIFSClient.get.mockResolvedValueOnce({
        '@odata.context': 'test',
        value: [],
      } as IFSODataResponse<CustomerOrderLine>)

      // Act
      const result = await getCustomerOrderByHullNumber('UNKNOWN123')

      // Assert
      expect(result).toBeNull()
    })

    it('devrait throw si le Contract retourné n\'est pas FR05A', async () => {
      // Arrange - Mock retourne FR02A au lieu de FR05A
      const wrongSiteLine = { ...mockLine, Contract: 'FR02A' }
      mockIFSClient.get.mockResolvedValueOnce({
        '@odata.context': 'test',
        value: [wrongSiteLine],
      } as IFSODataResponse<CustomerOrderLine>)

      // Act & Assert
      await expect(getCustomerOrderByHullNumber('LG5MA0114')).rejects.toThrow(
        'Customer Order Contract mismatch'
      )
    })

    it('devrait fonctionner même si getCustomerOrderHeader échoue', async () => {
      // Arrange
      mockIFSClient.get
        .mockResolvedValueOnce({
          '@odata.context': 'test',
          value: [mockLine],
        } as IFSODataResponse<CustomerOrderLine>)
        .mockRejectedValueOnce(new Error('Header error'))

      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      // Act
      const result = await getCustomerOrderByHullNumber('LG5MA0114')

      // Assert
      expect(result).toBeDefined()
      expect(result?.customerName).toBeUndefined()
      expect(result?.orderNo).toBe('C1000038587')

      consoleWarnSpy.mockRestore()
    })
  })

  // ===================================================================
  // Utility Functions
  // ===================================================================

  describe('formatDate()', () => {
    it('devrait formater une date ISO en format français', () => {
      expect(formatDate('2025-07-01T00:00:00Z')).toMatch(/01\/07\/2025/)
    })

    it('devrait retourner "Invalid Date" si le format est invalide', () => {
      const invalidDate = 'invalid-date'
      expect(formatDate(invalidDate)).toBe('Invalid Date')
    })
  })

  describe('getStatusBadge()', () => {
    it('devrait retourner un badge pour Released', () => {
      const badge = getStatusBadge('Released')
      expect(badge).toEqual({ label: 'Released', color: 'green' })
    })

    it('devrait retourner un badge pour Planned', () => {
      const badge = getStatusBadge('Planned')
      expect(badge).toEqual({ label: 'Planned', color: 'blue' })
    })

    it('devrait retourner un badge par défaut pour un statut inconnu', () => {
      const badge = getStatusBadge('UnknownStatus')
      expect(badge).toEqual({ label: 'UnknownStatus', color: 'gray' })
    })

    it('devrait gérer tous les statuts définis', () => {
      const statusesWithLabels = [
        { status: 'Released', expectedLabel: 'Released' },
        { status: 'Planned', expectedLabel: 'Planned' },
        { status: 'Reserved', expectedLabel: 'Reserved' },
        { status: 'PartiallyDelivered', expectedLabel: 'Partially Delivered' }, // ⚠️ Label avec espace
        { status: 'Delivered', expectedLabel: 'Delivered' },
        { status: 'Closed', expectedLabel: 'Closed' },
        { status: 'Cancelled', expectedLabel: 'Cancelled' },
        { status: 'Invoiced', expectedLabel: 'Invoiced' },
      ]

      statusesWithLabels.forEach(({ status, expectedLabel }) => {
        const badge = getStatusBadge(status)
        expect(badge.label).toBe(expectedLabel)
        expect(badge.color).toBeDefined()
      })
    })
  })

  describe('canPrintForStatus()', () => {
    it('devrait autoriser l\'impression pour Released', () => {
      expect(canPrintForStatus('Released')).toBe(true)
    })

    it('devrait autoriser l\'impression pour Reserved', () => {
      expect(canPrintForStatus('Reserved')).toBe(true)
    })

    it('devrait autoriser l\'impression pour PartiallyDelivered', () => {
      expect(canPrintForStatus('PartiallyDelivered')).toBe(true)
    })

    it('devrait interdire l\'impression pour Closed', () => {
      expect(canPrintForStatus('Closed')).toBe(false)
    })

    it('devrait interdire l\'impression pour Cancelled', () => {
      expect(canPrintForStatus('Cancelled')).toBe(false)
    })

    it('devrait interdire l\'impression pour Delivered', () => {
      expect(canPrintForStatus('Delivered')).toBe(false)
    })

    it('devrait interdire l\'impression pour Invoiced', () => {
      expect(canPrintForStatus('Invoiced')).toBe(false)
    })

    it('devrait interdire l\'impression pour un statut inconnu', () => {
      expect(canPrintForStatus('UnknownStatus')).toBe(false)
    })
  })
})
