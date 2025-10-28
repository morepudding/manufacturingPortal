/**
 * Part Printer - IFS Label Printer
 * 
 * Phase 5 - Interface Utilisateur Complète
 * 
 * Ambiance: Bois/Industriel (tons amber/orange/brun)
 * 
 * Workflow complet:
 * 1. Filtres avancés (Site, Production Line, Date, Mode, OP10 Block ID)
 * 2. Recherche Shop Orders
 * 3. Sélection multiple avec checkboxes
 * 4. Aperçu PDF des étiquettes
 * 5. Impression
 */

'use client'

import { useState } from 'react'
import { FilterPanel } from './components'
import { ShopOrderSummary } from './components'
import { LabelPreviewDialog } from './components'
import { PrintDialog } from './components'
import type { ShopOrderFilterParams, IFSShopOrderExtended, PartLabel } from '@/tools/part-printer/types'

export default function PartPrinterPage() {
  const [shopOrders, setShopOrders] = useState<IFSShopOrderExtended[]>([])
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set())
  const [labels, setLabels] = useState<PartLabel[]>([])
  const [loading, setLoading] = useState(false)
  const [generatingLabels, setGeneratingLabels] = useState(false)
  const [printing, setPrinting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [showPrintDialog, setShowPrintDialog] = useState(false)
  const [pdfUrl, setPdfUrl] = useState<string>('')
  const [currentSite, setCurrentSite] = useState<string>('') // Pour stocker le site actuel

  const handleSearch = async (params: ShopOrderFilterParams) => {
    console.log('🔍 [Part Printer] Recherche avec paramètres:', params)

    try {
      setLoading(true)
      setError(null)
      setSelectedOrders(new Set())
      setCurrentSite(params.site) // Stocker le site pour utilisation ultérieure

      const response = await fetch('/api/part-printer/shop-orders/filter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      })

      const json = await response.json()

      if (!response.ok || !json.success) {
        throw new Error(json.message || 'Failed to filter shop orders')
      }

      setShopOrders(json.data.shopOrders || [])
      console.log(`✅ [Part Printer] ${json.data.count} Shop Orders trouvés`)
      
      // ✅ Sélectionner automatiquement tous les Shop Orders
      if (json.data.shopOrders && json.data.shopOrders.length > 0) {
        const allIds = json.data.shopOrders.map((order: IFSShopOrderExtended) => 
          `${order.OrderNo}-${order.ReleaseNo}-${order.SequenceNo}`
        )
        setSelectedOrders(new Set(allIds))
        console.log(`✅ [Part Printer] ${allIds.length} Shop Orders sélectionnés automatiquement`)
      }
    } catch (err) {
      console.error('❌ [Part Printer] Erreur:', err)
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  const handleSelectionChange = (orderId: string, checked: boolean) => {
    const newSelection = new Set(selectedOrders)
    if (checked) {
      newSelection.add(orderId)
    } else {
      newSelection.delete(orderId)
    }
    setSelectedOrders(newSelection)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = shopOrders.map(order => 
        `${order.OrderNo}-${order.ReleaseNo}-${order.SequenceNo}`
      )
      setSelectedOrders(new Set(allIds))
    } else {
      setSelectedOrders(new Set())
    }
  }

  const handlePreview = async () => {
    console.log('👁️ [Part Printer] Aperçu des étiquettes pour', selectedOrders.size, 'Shop Orders')

    try {
      setGeneratingLabels(true)
      setError(null)

      // 1. Sélectionner les Shop Orders cochés
      const selectedShopOrders = shopOrders.filter(order => 
        selectedOrders.has(`${order.OrderNo}-${order.ReleaseNo}-${order.SequenceNo}`)
      )

      console.log('🔄 [Part Printer] Consolidation des données pour', selectedShopOrders.length, 'Shop Orders')

      // 2. Consolider les données (extraire toutes les infos IFS nécessaires)
      const consolidateResponse = await fetch('/api/part-printer/labels/consolidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          shopOrders: selectedShopOrders,
          site: currentSite 
        }),
      })

      if (!consolidateResponse.ok) {
        const error = await consolidateResponse.json()
        throw new Error(error.error || 'Erreur lors de la consolidation des données')
      }

      const consolidateData = await consolidateResponse.json()
      const consolidatedLabels: PartLabel[] = consolidateData.data.labels // Corriger le chemin

      console.log('✅ [Part Printer] Données consolidées:', consolidatedLabels.length, 'étiquettes')

      // 3. Générer le PDF
      console.log('🔄 [Part Printer] Génération du PDF...')
      const pdfResponse = await fetch('/api/part-printer/labels/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ labels: consolidatedLabels }),
      })

      if (!pdfResponse.ok) {
        const error = await pdfResponse.json()
        throw new Error(error.error || 'Erreur lors de la génération du PDF')
      }

      const pdfData = await pdfResponse.json()
      
      setLabels(consolidatedLabels)
      setPdfUrl(pdfData.data.pdfBase64) // PDF en base64
      setShowPreview(true)
      
      console.log('✅ [Part Printer] PDF généré avec succès')
    } catch (err) {
      console.error('❌ [Part Printer] Erreur génération:', err)
      setError(err instanceof Error ? err.message : 'Erreur lors de la génération du PDF')
    } finally {
      setGeneratingLabels(false)
    }
  }

  const handlePrint = () => {
    setShowPreview(false)
    setShowPrintDialog(true)
  }

  const handlePrintConfirm = async (printerId: string) => {
    console.log('🖨️ [Part Printer] Impression vers:', printerId)

    try {
      setPrinting(true)
      setError(null)

      // Envoyer le PDF (en base64) à l'API d'impression
      const response = await fetch('/api/part-printer/labels/print', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          pdfBase64: pdfUrl, // pdfUrl contient le PDF en base64
          printerId: printerId,
          site: currentSite,
          copies: 1
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de l\'impression')
      }

      const result = await response.json()
      
      // Si mode DEV, télécharger le PDF
      if (result.data.downloadUrl) {
        console.log('📥 [Part Printer] Mode DEV - Téléchargement du PDF')
        const link = document.createElement('a')
        link.href = result.data.downloadUrl
        link.download = `part-printer-labels-${new Date().getTime()}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }

      console.log('✅ [Part Printer] Impression réussie')
      setShowPrintDialog(false)
      
      // Reset après succès
      setSelectedOrders(new Set())
      setLabels([])
      setPdfUrl('')
    } catch (err) {
      console.error('❌ [Part Printer] Erreur impression:', err)
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'impression')
    } finally {
      setPrinting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-orange-900 to-amber-950">
      {/* Background Orbs - Style industriel/bois */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-48 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-yellow-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Part Printer
          </h1>
          <p className="text-amber-200 text-lg">🏷️ Impression d'étiquettes pour pièces en bois</p>
        </div>

        {/* Filtres */}
        <div className="mb-8">
          <FilterPanel onSearch={handleSearch} loading={loading} />
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8 bg-red-900/50 backdrop-blur-xl border border-red-700/50 rounded-2xl p-6">
            <p className="text-red-200 font-semibold">❌ Erreur</p>
            <p className="text-red-300 text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Résultats */}
        {shopOrders.length > 0 && (
          <div className="space-y-6">
            {/* Actions en haut (sticky) */}
            {selectedOrders.size > 0 && (
              <div className="sticky top-4 z-10 bg-gray-800/90 backdrop-blur-xl border border-amber-500/50 rounded-2xl p-4 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold text-lg">
                      ✅ {selectedOrders.size} Shop Order{selectedOrders.size > 1 ? 's' : ''} sélectionné{selectedOrders.size > 1 ? 's' : ''}
                    </p>
                    <p className="text-amber-300 text-sm mt-1">
                      Cliquez sur "Aperçu" pour générer les étiquettes
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={handlePreview}
                      disabled={generatingLabels}
                      className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-amber-500/50"
                    >
                      {generatingLabels ? '⏳ Génération...' : '📄 Aperçu'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Résumé et Table */}
            <ShopOrderSummary
              shopOrders={shopOrders}
              selectedOrders={selectedOrders}
              onSelectionChange={handleSelectionChange}
              onSelectAll={handleSelectAll}
              loading={loading}
            />
          </div>
        )}

        {/* État vide */}
        {!loading && shopOrders.length === 0 && !error && (
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-12 text-center">
            <span className="text-6xl mb-4 block">🔍</span>
            <p className="text-white text-lg">
              Aucun Shop Order trouvé
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Utilisez les filtres ci-dessus pour rechercher des Shop Orders
            </p>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-600 border-t-amber-500 mb-4"></div>
            <p className="text-white text-lg">
              Recherche en cours...
            </p>
          </div>
        )}
      </div>

      {/* Dialogs */}
      <LabelPreviewDialog
        open={showPreview}
        onClose={() => setShowPreview(false)}
        onPrint={handlePrint}
        labels={labels}
        pdfUrl={pdfUrl}
      />

      <PrintDialog
        open={showPrintDialog}
        onClose={() => setShowPrintDialog(false)}
        onConfirm={handlePrintConfirm}
        printing={printing}
        labelCount={labels.length}
      />
    </div>
  )
}
