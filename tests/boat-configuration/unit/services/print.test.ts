/**
 * Tests unitaires - print-service.ts
 * 
 * Tests du workflow complet d'impression IFS Cloud :
 * 1. GET Customer Order + ETag
 * 2. POST PrintResultKey
 * 3. POST PrintDialogInit
 * 4. POST ReportPrintRequest
 * 5. (Optionnel) Download PDF
 * 
 * ⚠️ Tests UNITAIRES avec mocks (pas d'appels IFS réels)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { printCustomerOrder } from '@/tools/boat-configuration/services/print-service'
import type {
  PrintRequest,
  IFSCustomerOrderResponse,
  IFSPrintResultKeyResponse,
  IFSPrintDialogInitResponse,
  IFSPdfArchiveResponse,
} from '@/shared/types/print'
import * as ifsClientModule from '@/shared/services/ifs-client'

// Mock du client IFS
vi.mock('@/shared/services/ifs-client')

describe('print-service.ts', () => {
  let mockIFSClient: any

  beforeEach(() => {
    // Reset tous les mocks avant chaque test
    vi.clearAllMocks()

    // Créer le mock client IFS
    mockIFSClient = {
      get: vi.fn(),
      post: vi.fn(),
      getRaw: vi.fn(),
    }

    // Configurer le mock
    vi.mocked(ifsClientModule.getIFSClient).mockReturnValue(mockIFSClient)
  })

  // ===================================================================
  // printCustomerOrder() - Workflow complet (sans PDF)
  // ===================================================================

  describe('printCustomerOrder() - Workflow sans PDF', () => {
    const mockRequest: PrintRequest = {
      orderNo: 'C1000038587',
      reportId: 'PROFORMA_INVOICE_REP',
      printerId: 'PDF_PRINTER',
      languageCode: 'fr',
      layoutName: 'BEN_Boat_configuration_for_production.rdl',
      copies: 1,
      downloadPdf: false,
    }

    const mockOrderResponse: IFSCustomerOrderResponse = {
      '@odata.context': 'test',
      '@odata.etag': 'W/"abc123"',
      OrderNo: 'C1000038587',
    }

    const mockResultKeyResponse: IFSPrintResultKeyResponse = {
      value: '12345',
    }

    const mockDialogResponse: IFSPrintDialogInitResponse = {
      ResultKey: 12345,
      LayoutName: 'DEFAULT_LAYOUT.rdl',
      ReportTitle: 'Proforma Invoice',
      ReportId: 'PROFORMA_INVOICE_REP',
      LanguageCode: 'fr',
      LogicalPrinter: 'PDF_PRINTER',
    }

    it('devrait compléter le workflow d\'impression avec succès (4 étapes)', async () => {
      // Arrange - Mock des 4 étapes
      mockIFSClient.get.mockResolvedValueOnce(mockOrderResponse) // Step 1
      mockIFSClient.post
        .mockResolvedValueOnce(mockResultKeyResponse) // Step 2
        .mockResolvedValueOnce(mockDialogResponse) // Step 3
        .mockResolvedValueOnce({}) // Step 4 (204 No Content)

      // Act
      const result = await printCustomerOrder(mockRequest)

      // Assert
      expect(result.success).toBe(true)
      expect(result.resultKey).toBe(12345)
      expect(result.reportTitle).toBe('Proforma Invoice')
      expect(result.layoutName).toBe('BEN_Boat_configuration_for_production.rdl') // Custom layout
      expect(result.pdfInfo).toBeUndefined()
      expect(result.pdfBlob).toBeUndefined()

      // Vérifier les appels IFS
      expect(mockIFSClient.get).toHaveBeenCalledTimes(1)
      expect(mockIFSClient.post).toHaveBeenCalledTimes(3)
    })

    it('devrait utiliser le layout IFS par défaut si layoutName non fourni', async () => {
      // Arrange
      const requestWithoutLayout = { ...mockRequest, layoutName: undefined }
      mockIFSClient.get.mockResolvedValueOnce(mockOrderResponse)
      mockIFSClient.post
        .mockResolvedValueOnce(mockResultKeyResponse)
        .mockResolvedValueOnce(mockDialogResponse)
        .mockResolvedValueOnce({})

      // Act
      const result = await printCustomerOrder(requestWithoutLayout)

      // Assert
      expect(result.layoutName).toBe('DEFAULT_LAYOUT.rdl') // Layout IFS par défaut
    })

    it('devrait appeler GET Customer Order avec le bon OrderNo', async () => {
      // Arrange
      mockIFSClient.get.mockResolvedValueOnce(mockOrderResponse)
      mockIFSClient.post
        .mockResolvedValueOnce(mockResultKeyResponse)
        .mockResolvedValueOnce(mockDialogResponse)
        .mockResolvedValueOnce({})

      // Act
      await printCustomerOrder(mockRequest)

      // Assert
      expect(mockIFSClient.get).toHaveBeenCalledWith(
        "CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='C1000038587')"
      )
    })

    it('devrait throw si ETag manquant dans la réponse Customer Order', async () => {
      // Arrange
      const responseWithoutEtag = { ...mockOrderResponse, '@odata.etag': undefined }
      mockIFSClient.get.mockResolvedValueOnce(responseWithoutEtag)

      // Act & Assert
      await expect(printCustomerOrder(mockRequest)).rejects.toThrow(
        'No ETag received from Customer Order'
      )
      expect(mockIFSClient.post).not.toHaveBeenCalled()
    })

    it('devrait appeler POST PrintResultKey avec ETag dans headers', async () => {
      // Arrange
      mockIFSClient.get.mockResolvedValueOnce(mockOrderResponse)
      mockIFSClient.post
        .mockResolvedValueOnce(mockResultKeyResponse)
        .mockResolvedValueOnce(mockDialogResponse)
        .mockResolvedValueOnce({})

      // Act
      await printCustomerOrder(mockRequest)

      // Assert
      expect(mockIFSClient.post).toHaveBeenCalledWith(
        expect.stringContaining('CustomerOrder_PrintResultKey'),
        { ReportId: 'PROFORMA_INVOICE_REP' },
        { 'If-Match': 'W/"abc123"' }
      )
    })

    it('devrait throw si ResultKey est invalide (non-numérique)', async () => {
      // Arrange
      mockIFSClient.get.mockResolvedValueOnce(mockOrderResponse)
      mockIFSClient.post.mockResolvedValueOnce({ value: 'invalid' })

      // Act & Assert
      await expect(printCustomerOrder(mockRequest)).rejects.toThrow(
        'Invalid ResultKey received'
      )
    })

    it('devrait appeler POST PrintDialogInit avec ResultKey', async () => {
      // Arrange
      mockIFSClient.get.mockResolvedValueOnce(mockOrderResponse)
      mockIFSClient.post
        .mockResolvedValueOnce(mockResultKeyResponse)
        .mockResolvedValueOnce(mockDialogResponse)
        .mockResolvedValueOnce({})

      // Act
      await printCustomerOrder(mockRequest)

      // Assert
      expect(mockIFSClient.post).toHaveBeenCalledWith(
        'PrintDialog.svc/PrintDialogInit',
        { ResultKey: 12345 }
      )
    })

    it('devrait throw si LayoutName manquant dans PrintDialogInit', async () => {
      // Arrange
      const requestWithoutLayout = { ...mockRequest, layoutName: undefined }
      const dialogWithoutLayout = { ...mockDialogResponse, LayoutName: '' }
      mockIFSClient.get.mockResolvedValueOnce(mockOrderResponse)
      mockIFSClient.post
        .mockResolvedValueOnce(mockResultKeyResponse)
        .mockResolvedValueOnce(dialogWithoutLayout)

      // Act & Assert
      await expect(printCustomerOrder(requestWithoutLayout)).rejects.toThrow(
        'No LayoutName received from PrintDialogInit'
      )
    })

    it('devrait appeler POST ReportPrintRequest avec tous les paramètres', async () => {
      // Arrange
      mockIFSClient.get.mockResolvedValueOnce(mockOrderResponse)
      mockIFSClient.post
        .mockResolvedValueOnce(mockResultKeyResponse)
        .mockResolvedValueOnce(mockDialogResponse)
        .mockResolvedValueOnce({})

      // Act
      await printCustomerOrder(mockRequest)

      // Assert
      expect(mockIFSClient.post).toHaveBeenCalledWith(
        'PrintDialog.svc/ReportPrintRequest',
        {
          ResultKey: 12345,
          LayoutName: 'BEN_Boat_configuration_for_production.rdl',
          LanguageCode: 'fr',
          LogicalPrinter: 'PDF_PRINTER',
          Copies: 1,
        }
      )
    })

    it('devrait utiliser 1 copie par défaut si copies non fourni', async () => {
      // Arrange
      const requestWithoutCopies = { ...mockRequest, copies: undefined }
      mockIFSClient.get.mockResolvedValueOnce(mockOrderResponse)
      mockIFSClient.post
        .mockResolvedValueOnce(mockResultKeyResponse)
        .mockResolvedValueOnce(mockDialogResponse)
        .mockResolvedValueOnce({})

      // Act
      await printCustomerOrder(requestWithoutCopies)

      // Assert
      expect(mockIFSClient.post).toHaveBeenCalledWith(
        'PrintDialog.svc/ReportPrintRequest',
        expect.objectContaining({ Copies: 1 })
      )
    })

    it('devrait throw avec un message clair si une étape échoue', async () => {
      // Arrange
      mockIFSClient.get.mockResolvedValueOnce(mockOrderResponse)
      mockIFSClient.post
        .mockResolvedValueOnce(mockResultKeyResponse)
        .mockRejectedValueOnce(new Error('IFS connection timeout'))

      // Act & Assert
      await expect(printCustomerOrder(mockRequest)).rejects.toThrow(
        'Print workflow failed: IFS connection timeout'
      )
    })
  })

  // ===================================================================
  // printCustomerOrder() - Workflow complet (avec PDF)
  // ===================================================================

  describe('printCustomerOrder() - Workflow avec PDF', () => {
    const mockRequest: PrintRequest = {
      orderNo: 'C1000038587',
      reportId: 'PROFORMA_INVOICE_REP',
      printerId: 'PDF_PRINTER',
      languageCode: 'fr',
      layoutName: 'BEN_Boat_configuration_for_production.rdl',
      copies: 1,
      downloadPdf: true, // ✅ Download PDF
    }

    const mockOrderResponse: IFSCustomerOrderResponse = {
      '@odata.context': 'test',
      '@odata.etag': 'W/"abc123"',
      OrderNo: 'C1000038587',
    }

    const mockResultKeyResponse: IFSPrintResultKeyResponse = {
      value: '12345',
    }

    const mockDialogResponse: IFSPrintDialogInitResponse = {
      ResultKey: 12345,
      LayoutName: 'DEFAULT_LAYOUT.rdl',
      ReportTitle: 'Proforma Invoice',
      ReportId: 'PROFORMA_INVOICE_REP',
      LanguageCode: 'fr',
      LogicalPrinter: 'PDF_PRINTER',
    }

    const mockPdfArchiveResponse: IFSPdfArchiveResponse = {
      '@odata.context': 'test',
      value: [
        {
          ResultKey: 12345,
          Id: 'pdf-id-123',
          FileName: 'C1000038587_PROFORMA.pdf',
          PdfSize: 102400, // 100 KB
          Created: '2025-11-12T10:30:00Z',
        },
      ],
    }

    const mockPdfBuffer = Buffer.from('%PDF-1.4\n...content...')

    it('devrait compléter le workflow complet avec download PDF (5 étapes)', async () => {
      // Arrange
      mockIFSClient.get
        .mockResolvedValueOnce(mockOrderResponse) // Step 1
        .mockResolvedValueOnce(mockPdfArchiveResponse) // Step 5a (polling)

      mockIFSClient.post
        .mockResolvedValueOnce(mockResultKeyResponse) // Step 2
        .mockResolvedValueOnce(mockDialogResponse) // Step 3
        .mockResolvedValueOnce({}) // Step 4

      mockIFSClient.getRaw.mockResolvedValueOnce(mockPdfBuffer) // Step 5b (download)

      // Act
      const result = await printCustomerOrder(mockRequest)

      // Assert
      expect(result.success).toBe(true)
      expect(result.resultKey).toBe(12345)
      expect(result.pdfInfo).toBeDefined()
      expect(result.pdfInfo?.fileName).toBe('C1000038587_PROFORMA.pdf')
      expect(result.pdfInfo?.size).toBe(mockPdfBuffer.byteLength)
      expect(result.pdfInfo?.id).toBe('pdf-id-123')
    })

    it('devrait attendre (polling) que le PDF soit disponible', async () => {
      // Arrange - PDF disponible après 2 tentatives
      mockIFSClient.get
        .mockResolvedValueOnce(mockOrderResponse)
        .mockResolvedValueOnce({ value: [] }) // Tentative 1 : pas encore disponible
        .mockResolvedValueOnce(mockPdfArchiveResponse) // Tentative 2 : disponible

      mockIFSClient.post
        .mockResolvedValueOnce(mockResultKeyResponse)
        .mockResolvedValueOnce(mockDialogResponse)
        .mockResolvedValueOnce({})

      mockIFSClient.getRaw.mockResolvedValueOnce(mockPdfBuffer)

      // Act
      const result = await printCustomerOrder(mockRequest)

      // Assert
      expect(result.pdfInfo).toBeDefined()
      expect(mockIFSClient.get).toHaveBeenCalledWith(
        'PrintDialog.svc/PdfArchiveSet',
        {
          '$filter': 'ResultKey eq 12345',
          '$top': '1',
        }
      )
    })

    it('devrait throw si le PDF n\'est pas disponible après max attempts', async () => {
      // Arrange - PDF jamais disponible
      mockIFSClient.get
        .mockResolvedValueOnce(mockOrderResponse)
        .mockResolvedValue({ value: [] }) // Toujours vide

      mockIFSClient.post
        .mockResolvedValueOnce(mockResultKeyResponse)
        .mockResolvedValueOnce(mockDialogResponse)
        .mockResolvedValueOnce({})

      // Act & Assert
      await expect(printCustomerOrder(mockRequest)).rejects.toThrow(
        'PDF not available after 15 attempts'
      )
    }, 20000) // Timeout 20s car polling = 15 tentatives x 1s

    it('devrait télécharger le PDF avec getRaw', async () => {
      // Arrange
      mockIFSClient.get
        .mockResolvedValueOnce(mockOrderResponse)
        .mockResolvedValueOnce(mockPdfArchiveResponse)

      mockIFSClient.post
        .mockResolvedValueOnce(mockResultKeyResponse)
        .mockResolvedValueOnce(mockDialogResponse)
        .mockResolvedValueOnce({})

      mockIFSClient.getRaw.mockResolvedValueOnce(mockPdfBuffer)

      // Act
      await printCustomerOrder(mockRequest)

      // Assert
      expect(mockIFSClient.getRaw).toHaveBeenCalledWith(
        "PrintDialog.svc/PdfArchiveSet(ResultKey=12345,Id='pdf-id-123')/Pdf",
        undefined,
        { 'Accept': 'application/octet-stream' }
      )
    })

    it('devrait throw si le PDF est invalide (pas de header %PDF)', async () => {
      // Arrange - Buffer invalide
      const invalidBuffer = Buffer.from('INVALID DATA')
      mockIFSClient.get
        .mockResolvedValueOnce(mockOrderResponse)
        .mockResolvedValueOnce(mockPdfArchiveResponse)

      mockIFSClient.post
        .mockResolvedValueOnce(mockResultKeyResponse)
        .mockResolvedValueOnce(mockDialogResponse)
        .mockResolvedValueOnce({})

      mockIFSClient.getRaw.mockResolvedValueOnce(invalidBuffer)

      // Act & Assert
      await expect(printCustomerOrder(mockRequest)).rejects.toThrow(
        'Invalid PDF file (missing PDF header)'
      )
    })

    it('devrait inclure les infos du PDF dans le résultat', async () => {
      // Arrange
      mockIFSClient.get
        .mockResolvedValueOnce(mockOrderResponse)
        .mockResolvedValueOnce(mockPdfArchiveResponse)

      mockIFSClient.post
        .mockResolvedValueOnce(mockResultKeyResponse)
        .mockResolvedValueOnce(mockDialogResponse)
        .mockResolvedValueOnce({})

      mockIFSClient.getRaw.mockResolvedValueOnce(mockPdfBuffer)

      // Act
      const result = await printCustomerOrder(mockRequest)

      // Assert
      expect(result.pdfInfo).toEqual({
        fileName: 'C1000038587_PROFORMA.pdf',
        size: mockPdfBuffer.byteLength,
        created: '2025-11-12T10:30:00Z',
        id: 'pdf-id-123',
      })
    })
  })

  // ===================================================================
  // Cas d'erreurs généraux
  // ===================================================================

  describe('Gestion des erreurs', () => {
    const mockRequest: PrintRequest = {
      orderNo: 'C1000038587',
      reportId: 'PROFORMA_INVOICE_REP',
      printerId: 'PDF_PRINTER',
      languageCode: 'fr',
      copies: 1,
      downloadPdf: false,
    }

    it('devrait throw si GET Customer Order échoue', async () => {
      // Arrange
      mockIFSClient.get.mockRejectedValueOnce(new Error('Order not found'))

      // Act & Assert
      await expect(printCustomerOrder(mockRequest)).rejects.toThrow(
        'Print workflow failed: Order not found'
      )
    })

    it('devrait throw si POST PrintResultKey échoue', async () => {
      // Arrange
      mockIFSClient.get.mockResolvedValueOnce({
        '@odata.etag': 'W/"abc123"',
      })
      mockIFSClient.post.mockRejectedValueOnce(new Error('ResultKey generation failed'))

      // Act & Assert
      await expect(printCustomerOrder(mockRequest)).rejects.toThrow(
        'Print workflow failed: ResultKey generation failed'
      )
    })

    it('devrait throw si POST PrintDialogInit échoue', async () => {
      // Arrange
      mockIFSClient.get.mockResolvedValueOnce({
        '@odata.etag': 'W/"abc123"',
      })
      mockIFSClient.post
        .mockResolvedValueOnce({ value: '12345' })
        .mockRejectedValueOnce(new Error('Dialog init failed'))

      // Act & Assert
      await expect(printCustomerOrder(mockRequest)).rejects.toThrow(
        'Print workflow failed: Dialog init failed'
      )
    })

    it('devrait throw si POST ReportPrintRequest échoue', async () => {
      // Arrange
      mockIFSClient.get.mockResolvedValueOnce({
        '@odata.etag': 'W/"abc123"',
      })
      mockIFSClient.post
        .mockResolvedValueOnce({ value: '12345' })
        .mockResolvedValueOnce({
          LayoutName: 'TEST.rdl',
          ReportTitle: 'Test',
        })
        .mockRejectedValueOnce(new Error('Print request failed'))

      // Act & Assert
      await expect(printCustomerOrder(mockRequest)).rejects.toThrow(
        'Print workflow failed: Print request failed'
      )
    })
  })
})
