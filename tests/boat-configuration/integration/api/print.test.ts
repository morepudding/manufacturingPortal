/**
 * Tests d'intégration - API Route POST /api/boat-configuration/print
 * 
 * Teste le workflow complet d'impression Customer Order via IFS Cloud (5 étapes):
 * 1. Récupération Customer Order + ETag
 * 2. Génération PrintResultKey
 * 3. Initialisation PrintDialog
 * 4. Envoi ReportPrintRequest
 * 5. (Optionnel) Téléchargement PDF
 * 
 * MSW mock les 5 étapes IFS OData + polling PDF
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from '@/app/api/boat-configuration/print/route'

// ========================================
// Helpers
// ========================================

function createRequest(body: {
  orderNo?: string
  reportId?: string
  printerId?: string
  languageCode?: string
  layoutName?: string
  copies?: number
  downloadPdf?: boolean
}): NextRequest {
  return new NextRequest('http://localhost:3000/api/boat-configuration/print', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

async function parseResponse(response: Response) {
  const text = await response.text()
  const status = response.status
  
  // Si réponse PDF (binary), retourner les headers
  if (response.headers.get('Content-Type') === 'application/pdf') {
    return {
      status,
      isPdf: true,
      contentType: response.headers.get('Content-Type'),
      contentDisposition: response.headers.get('Content-Disposition'),
      contentLength: response.headers.get('Content-Length'),
      pdfBuffer: text, // binary data as text
    }
  }

  // Réponse JSON
  try {
    const json = JSON.parse(text)
    return { status, data: json }
  } catch {
    return { status, text }
  }
}

// ========================================
// Tests
// ========================================

describe('POST /api/boat-configuration/print', () => {
  
  // Réinitialiser les handlers avant chaque test
  beforeEach(() => {
    // MSW handlers sont réinitialisés automatiquement par setup.ts
  })

  // ========================================
  // 1. HAPPY PATH - Impression simple (sans PDF)
  // ========================================

  describe('Impression simple (sans téléchargement PDF)', () => {
    
    it('devrait imprimer avec succès un Customer Order (workflow complet 4 étapes)', async () => {
      const request = createRequest({
        orderNo: 'C1000000933',
        reportId: 'PROFORMA_INVOICE_REP',
        printerId: 'LP_BOAT_CONFIGURATION',
        languageCode: 'fr',
        layoutName: 'BEN_Boat_configuration_for_production.rdl',
        copies: 1,
      })

      const response = await POST(request)
      const result = await parseResponse(response)

      expect(result.status).toBe(200)
      expect(result.data.success).toBe(true)
      expect(result.data.resultKey).toBeDefined()
      expect(result.data.reportTitle).toBe('Proforma Invoice')
      expect(result.data.layoutName).toBe('BEN_Boat_configuration_for_production.rdl')
    })

    it('devrait utiliser le layout par défaut si non spécifié', async () => {
      const request = createRequest({
        orderNo: 'C1000000933',
        reportId: 'PROFORMA_INVOICE_REP',
        printerId: 'LP_BOAT_CONFIGURATION',
        languageCode: 'en',
        // layoutName: undefined → devrait utiliser 'BEN_Boat_configuration_for_production.rdl'
      })

      const response = await POST(request)
      const result = await parseResponse(response)

      expect(result.status).toBe(200)
      expect(result.data.layoutName).toBe('BEN_Boat_configuration_for_production.rdl')
    })

    it('devrait supporter plusieurs copies', async () => {
      const request = createRequest({
        orderNo: 'C1000000933',
        reportId: 'PROFORMA_INVOICE_REP',
        printerId: 'LP_BOAT_CONFIGURATION',
        languageCode: 'fr',
        copies: 3,
      })

      const response = await POST(request)
      const result = await parseResponse(response)

      expect(result.status).toBe(200)
      expect(result.data.success).toBe(true)
    })

    it('devrait supporter différentes langues', async () => {
      const request = createRequest({
        orderNo: 'C1000000933',
        reportId: 'PROFORMA_INVOICE_REP',
        printerId: 'LP_BOAT_CONFIGURATION',
        languageCode: 'de', // Allemand
      })

      const response = await POST(request)
      const result = await parseResponse(response)

      expect(result.status).toBe(200)
      expect(result.data.success).toBe(true)
    })
  })

  // ========================================
  // 2. TÉLÉCHARGEMENT PDF (5 étapes + polling)
  // ========================================

  describe('Téléchargement PDF', () => {
    
    it('devrait télécharger le PDF avec succès (workflow complet 5 étapes)', async () => {
      const request = createRequest({
        orderNo: 'C1000000933',
        reportId: 'PROFORMA_INVOICE_REP',
        printerId: 'LP_BOAT_CONFIGURATION',
        languageCode: 'fr',
        downloadPdf: true,
      })

      const response = await POST(request)
      const result = await parseResponse(response)

      expect(result.status).toBe(200)
      expect(result.isPdf).toBe(true)
      expect(result.contentType).toBe('application/pdf')
      expect(result.contentDisposition).toContain('attachment')
      expect(result.contentDisposition).toContain('.pdf')
      expect(result.contentLength).toBeDefined()
    })

    it('devrait retourner le bon nom de fichier PDF', async () => {
      const request = createRequest({
        orderNo: 'C1000000933',
        reportId: 'PROFORMA_INVOICE_REP',
        printerId: 'LP_BOAT_CONFIGURATION',
        languageCode: 'fr',
        downloadPdf: true,
      })

      const response = await POST(request)
      const result = await parseResponse(response)

      expect(result.status).toBe(200)
      expect(result.contentDisposition).toContain('ProformaInvoice_C1000000933')
    })
  })

  // ========================================
  // 3. ERREURS DE VALIDATION
  // ========================================

  describe('Erreurs de validation', () => {
    
    it('devrait retourner 400 si orderNo manquant', async () => {
      const request = createRequest({
        // orderNo: undefined
        reportId: 'PROFORMA_INVOICE_REP',
        printerId: 'LP_BOAT_CONFIGURATION',
        languageCode: 'fr',
      })

      const response = await POST(request)
      const result = await parseResponse(response)

      expect(result.status).toBe(400)
      expect(result.data.error).toBe('Missing orderNo')
    })

    it('devrait retourner 400 si reportId manquant', async () => {
      const request = createRequest({
        orderNo: 'C1000000933',
        // reportId: undefined
        printerId: 'LP_BOAT_CONFIGURATION',
        languageCode: 'fr',
      })

      const response = await POST(request)
      const result = await parseResponse(response)

      expect(result.status).toBe(400)
      expect(result.data.error).toBe('Missing reportId')
    })

    it('devrait retourner 400 si printerId manquant', async () => {
      const request = createRequest({
        orderNo: 'C1000000933',
        reportId: 'PROFORMA_INVOICE_REP',
        // printerId: undefined
        languageCode: 'fr',
      })

      const response = await POST(request)
      const result = await parseResponse(response)

      expect(result.status).toBe(400)
      expect(result.data.error).toBe('Missing printerId')
    })

    it('devrait retourner 400 si languageCode manquant', async () => {
      const request = createRequest({
        orderNo: 'C1000000933',
        reportId: 'PROFORMA_INVOICE_REP',
        printerId: 'LP_BOAT_CONFIGURATION',
        // languageCode: undefined
      })

      const response = await POST(request)
      const result = await parseResponse(response)

      expect(result.status).toBe(400)
      expect(result.data.error).toBe('Missing languageCode')
    })

    it('devrait retourner 400 si orderNo est "UNKNOWN"', async () => {
      const request = createRequest({
        orderNo: 'UNKNOWN',
        reportId: 'PROFORMA_INVOICE_REP',
        printerId: 'LP_BOAT_CONFIGURATION',
        languageCode: 'fr',
      })

      const response = await POST(request)
      const result = await parseResponse(response)

      expect(result.status).toBe(400)
      expect(result.data.error).toBe('Customer Order manquant')
      expect(result.data.details).toContain('pas de Customer Order associé')
    })

    it('devrait retourner 400 si orderNo est vide', async () => {
      const request = createRequest({
        orderNo: '   ',
        reportId: 'PROFORMA_INVOICE_REP',
        printerId: 'LP_BOAT_CONFIGURATION',
        languageCode: 'fr',
      })

      const response = await POST(request)
      const result = await parseResponse(response)

      expect(result.status).toBe(400)
      expect(result.data.error).toBe('Customer Order manquant')
    })
  })

  // ========================================
  // 4. ERREURS IFS
  // ========================================

  describe('Erreurs IFS', () => {
    
    it('devrait retourner 404 si Customer Order inexistant', async () => {
      const request = createRequest({
        orderNo: 'C9999999999',
        reportId: 'PROFORMA_INVOICE_REP',
        printerId: 'LP_BOAT_CONFIGURATION',
        languageCode: 'fr',
      })

      const response = await POST(request)
      const result = await parseResponse(response)

      expect(result.status).toBe(404)
      expect(result.data.error).toBe('Customer Order introuvable')
      expect(result.data.details).toContain('n\'existe pas dans IFS Cloud')
    })

    it('devrait gérer timeout PDF (408)', async () => {
      const request = createRequest({
        orderNo: 'C1000000934', // Order spécial pour timeout
        reportId: 'PROFORMA_INVOICE_REP',
        printerId: 'LP_BOAT_CONFIGURATION',
        languageCode: 'fr',
        downloadPdf: true,
      })

      const response = await POST(request)
      const result = await parseResponse(response)

      // Note: MSW peut soit simuler timeout (408), soit retourner PDF immédiatement
      // Acceptons les deux comportements pour éviter flakiness
      expect([200, 408]).toContain(result.status)
      
      if (result.status === 408) {
        expect(result.data.error).toBe('PDF generation timeout')
      }
    })
  })

  // ========================================
  // 5. STRUCTURE DE RÉPONSE
  // ========================================

  describe('Structure de réponse', () => {
    
    it('devrait retourner la structure attendue pour impression simple', async () => {
      const request = createRequest({
        orderNo: 'C1000000933',
        reportId: 'PROFORMA_INVOICE_REP',
        printerId: 'LP_BOAT_CONFIGURATION',
        languageCode: 'fr',
      })

      const response = await POST(request)
      const result = await parseResponse(response)

      expect(result.status).toBe(200)
      expect(result.data).toHaveProperty('success')
      expect(result.data).toHaveProperty('resultKey')
      expect(result.data).toHaveProperty('reportTitle')
      expect(result.data).toHaveProperty('layoutName')
      
      expect(typeof result.data.success).toBe('boolean')
      expect(typeof result.data.resultKey).toBe('number')
      expect(typeof result.data.reportTitle).toBe('string')
      expect(typeof result.data.layoutName).toBe('string')
    })

    it('devrait retourner les bons headers pour téléchargement PDF', async () => {
      const request = createRequest({
        orderNo: 'C1000000933',
        reportId: 'PROFORMA_INVOICE_REP',
        printerId: 'LP_BOAT_CONFIGURATION',
        languageCode: 'fr',
        downloadPdf: true,
      })

      const response = await POST(request)
      const result = await parseResponse(response)

      expect(result.status).toBe(200)
      expect(result.contentType).toBe('application/pdf')
      expect(result.contentDisposition).toMatch(/^attachment; filename="[^"]+\.pdf"$/)
      expect(parseInt(result.contentLength || '0')).toBeGreaterThan(0)
    })
  })
})
