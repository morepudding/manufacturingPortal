/**
 * Part Printer - IFS Label Printer
 * 
 * Version 2.0 - Formulaire simplifié en 4 sections
 * 
 * Ambiance: Bois/Industriel (tons amber/orange/brun)
 * 
 * Workflow simplifié:
 * 1. REQUIRED SELECTIONS - Site + Date
 * 2. OPTIONAL FILTERS - Production Line + Block ID
 * 3. ADVANCED OPTIONS - Block Date / Sent To Cutting System
 * 4. PRINT TYPE - List Only / List + Labels
 * Résultats : Optionnels (collapsible preview)
 */

'use client'

import { useState, useEffect } from 'react'
import { SiteSelector, ProductionLineSelector } from './components'
import { PrintModeSelector } from './components/PrintModeSelector'
import { PrinterSelector } from '@/shared/components/molecules/PrinterSelector'
import { Button } from '@/shared/components/atoms/Button'
import { Label } from '@/shared/components/atoms/Label'
import { Input } from '@/shared/components/atoms/Input'
import { ChevronDown, Loader2, FileText, Calculator, CheckCircle, Search } from 'lucide-react'
import type { ShopOrderFilterParams, IFSShopOrderExtended, PartLabel, PrintMode } from '@/tools/part-printer/types'

export default function PartPrinterPage() {
  // États formulaire (4 sections)
  const [site, setSite] = useState('')
  const [productionLine, setProductionLine] = useState('')
  const [startDate, setStartDate] = useState('')
  const [blockId, setBlockId] = useState('')
  
  // ✅ Step 5 & 6: Advanced Options (enabled/disabled + value TRUE/FALSE)
  const [blockDateEnabled, setBlockDateEnabled] = useState(false)      // Disabled by default
  const [blockDateValue, setBlockDateValue] = useState(false)          // FALSE by default
  const [sentToCuttingEnabled, setSentToCuttingEnabled] = useState(false)  // Disabled by default
  const [sentToCuttingValue, setSentToCuttingValue] = useState(false)      // FALSE by default
  
  // ✅ Step 7: Print Mode & Printer Selection
  const [printMode, setPrintMode] = useState<PrintMode>('listing-only')  // Listing only by default
  const [printer, setPrinter] = useState<string>('')                      // Requis si labels-only ou listing-and-labels
  
  // États existants (logique métier conservée)
  const [shopOrders, setShopOrders] = useState<IFSShopOrderExtended[]>([])
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set())
  const [labels, setLabels] = useState<PartLabel[]>([])
  const [loading, setLoading] = useState(false)
  const [generatingLabels, setGeneratingLabels] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pdfUrl, setPdfUrl] = useState<string>('')
  const [currentSite, setCurrentSite] = useState<string>('')
  
  // Nouveaux états UI
  const [showPreview, setShowPreview] = useState(false)
  const [calculationStatus, setCalculationStatus] = useState<'idle' | 'calculating' | 'success' | 'error'>('idle')
  const [isPrinting, setIsPrinting] = useState(false) // État pour l'impression Azure

  // ===== HANDLERS =====

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



  // Nouvelle fonction: Generate Preview
  const handleGeneratePreview = async () => {
    console.log('🚀 [DEBUG] handleGeneratePreview called')
    
    if (!site || !startDate) {
      setError('Site and Date are required')
      setCalculationStatus('error')
      console.log('❌ [DEBUG] Validation failed:', { site, startDate })
      return
    }

    // Validation du printer si mode avec labels
    if (printMode !== 'listing-only' && !printer) {
      setError('Printer is required for label printing')
      setCalculationStatus('error')
      console.log('❌ [DEBUG] Validation failed: printer required for', printMode)
      return
    }

    console.log('✅ [DEBUG] Starting calculation, status: calculating')
    setCalculationStatus('calculating')
    setError(null)

    // 1. Construire les paramètres de recherche à partir du formulaire
    const params: ShopOrderFilterParams = {
      site,
      startDate,
      blockDateEnabled,
      blockDateValue,
      sentToCuttingEnabled,
      sentToCuttingValue,
      operationBlockIdFilter: blockId ? 'not-empty' : 'all', 
    }
    
    if (productionLine) {
      params.productionLine = productionLine
    }

    try {
      // 2. Rechercher les Shop Orders
      console.log('📡 [DEBUG] Fetching shop orders...', params)
      setLoading(true)
      const response = await fetch('/api/part-printer/shop-orders/filter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      })

      console.log('📡 [DEBUG] Shop orders response:', response.status, response.ok)

      if (!response.ok) {
        throw new Error('Failed to fetch shop orders')
      }

      const data = await response.json()
      console.log('📦 [DEBUG] Full response data:', data)
      const orders = data.data?.shopOrders || data.shopOrders || []
      console.log('✅ [DEBUG] Shop orders received:', orders.length)
      setShopOrders(orders)
      setCurrentSite(site)

      if (orders.length === 0) {
        console.log('⚠️ [DEBUG] No shop orders found')
        setError('No shop orders found')
        setCalculationStatus('idle')
        setLoading(false)
        return
      }

      // 3. Si mode Labels Only → Imprimer directement sans générer PDF
      if (printMode === 'labels-only') {
        console.log('🖨️ [DEBUG] Labels Only mode: printing to IFS...')
        await handlePrintToIFS(orders)
        setCalculationStatus('success')
        setLoading(false)
        return
      }

      // 4. Générer les étiquettes (pour Listing Only ou Listing + Labels)
      console.log('🏷️ [DEBUG] Generating labels for', orders.length, 'shop orders...')
      setGeneratingLabels(true)
      const labelsResponse = await fetch('/api/part-printer/labels/consolidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shopOrders: orders, site }),
      })

      console.log('🏷️ [DEBUG] Labels response:', labelsResponse.status, labelsResponse.ok)

      if (!labelsResponse.ok) {
        throw new Error('Failed to generate labels')
      }

      const labelsData = await labelsResponse.json()
      console.log('📦 [DEBUG] Full labels data:', labelsData)
      const generatedLabels = labelsData.data?.labels || labelsData.labels || []
      console.log('✅ [DEBUG] Labels generated:', generatedLabels.length)
      setLabels(generatedLabels)

      // 5. Générer le PDF
      console.log('📄 [DEBUG] Generating PDF...')
      const pdfResponse = await fetch('/api/part-printer/labels/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ labels: generatedLabels }),
      })

      console.log('📄 [DEBUG] PDF response:', pdfResponse.status, pdfResponse.ok)

      if (!pdfResponse.ok) {
        throw new Error('Failed to generate PDF')
      }

      // ✅ FIX: Le PDF est retourné en JSON avec base64, pas en blob
      const pdfData = await pdfResponse.json()
      console.log('📦 [DEBUG] PDF data received:', {
        success: pdfData.success,
        pageCount: pdfData.data?.pageCount,
        labelCount: pdfData.data?.labelCount,
        hasBase64: !!pdfData.data?.pdfBase64
      })

      if (!pdfData.success || !pdfData.data?.pdfBase64) {
        throw new Error('Invalid PDF response')
      }

      // Convertir base64 en blob
      const base64 = pdfData.data.pdfBase64
      const binaryString = atob(base64)
      const bytes = new Uint8Array(binaryString.length)
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }
      const pdfBlob = new Blob([bytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(pdfBlob)
      
      setPdfUrl(url)
      setShowPreview(true)

      // 6. Si mode Listing + Labels → Imprimer aussi
      if (printMode === 'listing-and-labels') {
        console.log('🖨️ [DEBUG] Listing + Labels mode: printing to IFS...')
        await handlePrintToIFS(orders)
      }

      setCalculationStatus('success')
      console.log('🎉 [DEBUG] Success! PDF ready, labels:', generatedLabels.length)

    } catch (err) {
      console.error('❌ [DEBUG] Error:', err)
      setCalculationStatus('error')
      setError(err instanceof Error ? err.message : 'Calculation failed')
    } finally {
      setLoading(false)
      setGeneratingLabels(false)
    }
  }

  /**
   * Envoie les Shop Orders à l'API Azure Print
   */
  const handlePrintToIFS = async (orders: IFSShopOrderExtended[]) => {
    if (!printer) {
      throw new Error('Printer not selected')
    }

    try {
      setIsPrinting(true)
      console.log('🖨️ [Part Printer] Impression de', orders.length, 'Shop Orders sur', printer)

      // Préparer les données pour l'API
      const shopOrdersToPrint = orders.map(order => ({
        orderNo: order.OrderNo,
        releaseNo: order.ReleaseNo,
        sequenceNo: order.SequenceNo
      }))

      // Appeler l'API d'impression
      const response = await fetch('/api/part-printer/labels/print', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shopOrders: shopOrdersToPrint,
          printer: printer
        })
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Print failed')
      }

      console.log('✅ [Part Printer] Impression réussie:', result.data.message)

      // TODO: Afficher une notification de succès (toast)
      // toast.success(`Labels printed successfully to ${printer}`)

    } catch (err) {
      console.error('❌ [Part Printer] Erreur impression:', err)
      throw new Error(err instanceof Error ? err.message : 'Print to IFS failed')
    } finally {
      setIsPrinting(false)
    }
  }

  const handleCancel = () => {
    // Reset tous les champs du formulaire
    setSite('')
    setProductionLine('')
    setStartDate('')
    setBlockId('')
    setBlockDateEnabled(false)
    setBlockDateValue(false)
    setSentToCuttingEnabled(false)
    setSentToCuttingValue(false)
    setPrintMode('listing-only')
    setPrinter('')
    setShowPreview(false)
    setShopOrders([])
    setSelectedOrders(new Set())
    setLabels([])
    setPdfUrl('')
    setError(null)
    setCalculationStatus('idle')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-orange-900 to-amber-950">
      {/* Background Orbs - Dynamic wood/industrial style */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-48 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-yellow-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <div className="relative border-b border-amber-800/30 bg-gradient-to-r from-amber-900/40 to-orange-900/40 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8 max-w-5xl">
          <h1 className="text-3xl font-bold text-white mb-2">
            Part Printer
          </h1>
          <p className="text-amber-100">Wood parts labeling and listing system</p>
        </div>
      </div>

      <div className="relative container mx-auto px-6 py-8 max-w-5xl">
        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-900/80 backdrop-blur-xl border-l-4 border-red-500 rounded-lg p-6 shadow-xl">
            <p className="text-red-100 font-semibold flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              Error
            </p>
            <p className="text-red-200 text-sm mt-2">{error}</p>
          </div>
        )}

        {/* SECTION 1: REQUIRED SELECTIONS */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-amber-200/50 p-8 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white text-sm font-bold shadow-md">
              1
            </span>
            Required Information
          </h2>

          <div className="space-y-6">
            {/* Site (Contract) */}
            <div>
              <Label className="text-sm font-medium mb-2 block text-gray-700">
                Site (Contract) <span className="text-red-500">*</span>
              </Label>
              <SiteSelector
                value={site}
                onChange={setSite}
                disabled={loading}
              />
            </div>

            {/* Production Date */}
            <div>
              <Label className="text-sm font-medium mb-2 block text-gray-700">
                Production Date <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  type="date"
                  className="h-12 bg-white border-gray-300 text-gray-900 focus:border-amber-500 focus:ring-amber-500 pr-10"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  disabled={loading}
                  placeholder="Select production date"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1.5">Click on the field to open calendar picker</p>
            </div>
          </div>
        </div>

        {/* SECTION 2: OPTIONAL FILTERS */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/50 p-8 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 text-white text-sm font-bold shadow-md">
              2
            </span>
            Optional Filters
          </h2>

          <div className="space-y-6">
            {/* Production Line */}
            <div>
              <Label className="text-sm font-medium mb-2 block text-gray-700">
                Production Line
              </Label>
              <ProductionLineSelector
                site={site}
                value={productionLine}
                onChange={setProductionLine}
                disabled={loading || !site}
              />
              {!site && (
                <p className="text-xs text-gray-500 mt-1.5">Select a site first to enable this filter</p>
              )}
            </div>

            {/* Block ID */}
            <div>
              <Label className="text-sm font-medium mb-2 block text-gray-700">
                Block ID
              </Label>
              <Input
                type="text"
                className="h-12 bg-white border-gray-300 text-gray-900 focus:border-amber-500 focus:ring-amber-500"
                placeholder="Enter Block ID (optional)"
                value={blockId}
                onChange={(e) => setBlockId(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: ADVANCED OPTIONS */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/50 p-8 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 text-white text-sm font-bold shadow-md">
              3
            </span>
            Advanced Options
          </h2>

          <div className="space-y-6">
            {/* Block Date Filter */}
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50/50">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">Block Date Filter</h3>
                  <p className="text-xs text-gray-600">Filter shop orders by block date status</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={blockDateEnabled}
                    onChange={(e) => setBlockDateEnabled(e.target.checked)}
                    disabled={loading}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    {blockDateEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </label>
              </div>
              
              {blockDateEnabled && (
                <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setBlockDateValue(false)}
                    disabled={loading}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                      !blockDateValue
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    FALSE
                  </button>
                  <button
                    onClick={() => setBlockDateValue(true)}
                    disabled={loading}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                      blockDateValue
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    TRUE
                  </button>
                </div>
              )}
            </div>

            {/* Sent to Cutting System Filter */}
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50/50">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">Sent to Cutting System Filter</h3>
                  <p className="text-xs text-gray-600">Filter shop orders sent to cutting system</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sentToCuttingEnabled}
                    onChange={(e) => setSentToCuttingEnabled(e.target.checked)}
                    disabled={loading}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    {sentToCuttingEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </label>
              </div>
              
              {sentToCuttingEnabled && (
                <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setSentToCuttingValue(false)}
                    disabled={loading}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                      !sentToCuttingValue
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    FALSE
                  </button>
                  <button
                    onClick={() => setSentToCuttingValue(true)}
                    disabled={loading}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                      sentToCuttingValue
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    TRUE
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 4: PRINT TYPE */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-amber-200/50 p-8 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white text-sm font-bold shadow-md">
              4
            </span>
            Print Type
          </h2>

          <div className="space-y-6">
            {/* Print Mode Selection */}
            <div>
              <PrintModeSelector
                value={printMode}
                onChange={setPrintMode}
                disabled={loading || generatingLabels}
              />
            </div>

            {/* Printer Selection (conditional) */}
            {(printMode === 'labels-only' || printMode === 'listing-and-labels') && (
              <div className="pt-4 border-t border-gray-200">
                <PrinterSelector
                  value={printer}
                  onChange={setPrinter}
                  disabled={loading || generatingLabels}
                  required
                  label="Select IFS Printer"
                />
                <p className="text-xs text-gray-500 mt-2">
                  ⚠️ Printer selection is required for printing labels
                </p>
              </div>
            )}
          </div>
        </div>



        {/* ACTION BUTTONS */}
        <div className="space-y-4 mb-8">
          {/* Boutons Generate Preview / New Calculation */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1 h-14 text-base font-medium border-2 border-white/80 bg-white/40 backdrop-blur-sm text-gray-800 hover:bg-white/60 hover:border-white shadow-lg"
              onClick={handleCancel}
              disabled={loading || generatingLabels}
            >
              Cancel
            </Button>

            {calculationStatus === 'success' ? (
              // Bouton "New Calculation" après succès
              <Button
                variant="outline"
                className="flex-1 h-14 text-base font-semibold border-2 border-blue-500 bg-white hover:bg-blue-50 text-blue-600 shadow-lg"
                onClick={() => {
                  setCalculationStatus('idle')
                  setLabels([])
                  setPdfUrl('')
                  setShopOrders([])
                }}
                disabled={loading || generatingLabels || isPrinting}
              >
                <Search className="w-5 h-5 mr-2" />
                New Calculation
              </Button>
            ) : (
              // Bouton dynamique basé sur printMode
              <Button
                className={`flex-1 h-14 text-base font-semibold shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all text-white ${
                  printMode === 'listing-only' 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                    : printMode === 'labels-only'
                    ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
                    : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
                }`}
                onClick={() => {
                  console.log('🔘 [DEBUG] Button clicked, calculationStatus:', calculationStatus)
                  handleGeneratePreview()
                }}
                disabled={
                  !site || 
                  !startDate || 
                  (printMode !== 'listing-only' && !printer) ||  // Printer requis si labels
                  loading || 
                  generatingLabels || 
                  isPrinting ||
                  calculationStatus === 'calculating'
                }
              >
                {calculationStatus === 'calculating' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    {printMode === 'listing-only' ? (
                      <>
                        <FileText className="w-5 h-5 mr-2 animate-pulse" />
                        Generating Listing...
                      </>
                    ) : printMode === 'labels-only' ? (
                      <>
                        <Calculator className="w-5 h-5 mr-2 animate-pulse" />
                        Printing Labels...
                      </>
                    ) : (
                      <>
                        <Calculator className="w-5 h-5 mr-2 animate-pulse" />
                        Generating & Printing...
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {printMode === 'listing-only' ? (
                      <>
                        <FileText className="w-5 h-5 mr-2" />
                        DOWNLOAD PDF
                      </>
                    ) : printMode === 'labels-only' ? (
                      <>
                        <Calculator className="w-5 h-5 mr-2" />
                        PRINT TO IFS
                      </>
                    ) : (
                      <>
                        <Calculator className="w-5 h-5 mr-2" />
                        PRINT & DOWNLOAD
                      </>
                    )}
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Bouton Download PDF (affiché seulement si PDF généré) */}
          {pdfUrl && labels.length > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">Preview Ready!</p>
                    <p className="text-sm text-gray-600">
                      {labels.length} labels generated • Ready to download
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  {/* Bouton Download PDF */}
                  <Button
                    className="h-12 px-8 text-base font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-xl hover:shadow-2xl transition-all"
                    onClick={() => window.open(pdfUrl, '_blank')}
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Download PDF ({labels.length} labels)
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* PREVIEW (optional, collapsible) */}
        {shopOrders.length > 0 && (
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/50 overflow-hidden">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="w-full flex items-center justify-between p-6 hover:bg-amber-50 transition-colors"
            >
              <h3 className="text-base font-semibold text-gray-900 flex items-center gap-3">
                <FileText className="w-5 h-5 text-amber-600" />
                Results Preview
                <span className="px-3 py-1 bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 text-xs font-bold rounded-full shadow-sm">
                  {shopOrders.length} {shopOrders.length > 1 ? 'Shop Orders' : 'Shop Order'}
                </span>
              </h3>
              <ChevronDown 
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  showPreview ? 'rotate-180' : ''
                }`}
              />
            </button>

            {showPreview && (
              <div className="border-t border-gray-200 p-6 bg-gradient-to-br from-gray-50 to-amber-50/30">
                <div className="space-y-2">
                  {shopOrders.map(order => (
                    <div 
                      key={`${order.OrderNo}-${order.ReleaseNo}-${order.SequenceNo}`}
                      className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-amber-400 hover:shadow-md transition-all"
                    >
                      <span className="font-bold text-gray-900 min-w-[100px]">{order.OrderNo}</span>
                      <span className="text-gray-700 flex-1 font-mono text-sm">{order.PartNo}</span>
                      <span className="text-gray-500 text-sm font-medium">{order.Contract}</span>
                      <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-xs font-semibold rounded-full shadow-sm">
                        {order.Objstate}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>


    </div>
  )
}
