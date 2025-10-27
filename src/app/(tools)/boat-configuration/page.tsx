'use client'

/**
 * Boat Configuration Editor
 * Ambiance: Océan/Maritime (tons bleus)
 */

import { useState, useEffect } from 'react'
import { Button } from '@/shared/components/atoms/Button'
import { Input } from '@/shared/components/atoms/Input'
import { Label } from '@/shared/components/atoms/Label'
import { PrinterSearch } from '@/shared/components/molecules/PrinterSearch'
import { LanguageSelector } from '@/shared/components/molecules/LanguageSelector'
import { CustomerOrderValidation, type CustomerOrderData } from '@/app/(tools)/boat-configuration/components/CustomerOrderValidation'
import { PrintExecution } from '@/app/(tools)/boat-configuration/components/PrintExecution'
import { ContextualSidebar } from '@/app/(tools)/boat-configuration/components/ContextualSidebar'
import { VerticalStepper } from '@/app/(tools)/boat-configuration/components/VerticalStepper'
import { Search, CheckCircle, XCircle, ChevronRight, ArrowLeft, Loader2 } from 'lucide-react'

type Step = 'entry' | 'confirmation' | 'customer-order' | 'selection' | 'print'

interface Printer {
  PrinterId: string
  Description: string
}

interface Language {
  LangCode: string
  Description: string
}

interface ShopOrderData {
  orderNo: string
  releaseNo: string
  sequenceNo: string
}

interface ShopOrderResult {
  found: boolean
  shopOrder?: {
    OrderNo: string
    ReleaseNo: string
    SequenceNo: string
    DopId: string | null
    PartNo: string
    PartDescription: string
    Contract: string
    CustomerOrderNo?: string
    CustomerLineNo?: string
  }
  serialNumber?: string | null
  dopHeaderId?: string | null
  error?: string
}

export default function BoatConfigurationPage() {
  const [currentStep, setCurrentStep] = useState<Step>('entry')
  const [shopOrder, setShopOrder] = useState<ShopOrderData>({
    orderNo: '',
    releaseNo: '*',
    sequenceNo: '*',
  })
  const [searchResult, setSearchResult] = useState<ShopOrderResult | null>(null)
  const [serialNumber, setSerialNumber] = useState<string>('N/A')
  const [dopHeaderId, setDopHeaderId] = useState<string>('N/A')
  const [customerOrder, setCustomerOrder] = useState<CustomerOrderData | null>(null)
  const [printers, setPrinters] = useState<Printer[]>([])
  const [languages, setLanguages] = useState<Language[]>([])
  const [selectedPrinter, setSelectedPrinter] = useState<string>('')
  const [selectedLanguage, setSelectedLanguage] = useState<string>('')
  const [loadingPrinters, setLoadingPrinters] = useState(false)
  const [loadingLanguages, setLoadingLanguages] = useState(false)
  const [loadingCustomerOrder, setLoadingCustomerOrder] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Mapping des steps pour le stepper
  const stepMapping: Record<Step, number> = {
    'entry': 1,
    'confirmation': 2,
    'customer-order': 3,
    'selection': 4,
    'print': 5,
  }

  const currentStepNumber = stepMapping[currentStep]

  // Configuration du stepper
  const stepperSteps = [
    { id: 1, label: 'Entry', completed: currentStepNumber > 1, active: currentStepNumber === 1 },
    { id: 2, label: 'Confirm', completed: currentStepNumber > 2, active: currentStepNumber === 2 },
    { id: 3, label: 'Customer', completed: currentStepNumber > 3, active: currentStepNumber === 3 },
    { id: 4, label: 'Selection', completed: currentStepNumber > 4, active: currentStepNumber === 4 },
    { id: 5, label: 'Print', completed: currentStepNumber > 5, active: currentStepNumber === 5 },
  ]

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/boat-configuration/shop-orders/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(shopOrder),
      })

      const data: ShopOrderResult = await response.json()

      if (!response.ok) throw new Error(data.error || 'Failed to search Shop Order')

      if (data.found && data.shopOrder) {
        setSearchResult(data)
        setSerialNumber(data.serialNumber || 'N/A')
        setDopHeaderId(data.dopHeaderId || 'N/A')
        setCurrentStep('confirmation')
      } else {
        setError(data.error || 'Shop Order not found')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleConfirmYes = async () => {
    // Charger le Customer Order via Serial Number (toujours, même si Shop Order n'a pas les champs)
    if (serialNumber && serialNumber !== 'N/A') {
      setLoadingCustomerOrder(true)
      setError(null)

      try {
        // Essayer d'abord avec OrderNo + LineNo si disponibles
        if (searchResult?.shopOrder?.CustomerOrderNo && searchResult?.shopOrder?.CustomerLineNo) {
          console.log('🔍 Loading Customer Order from Shop Order data...')
          const response = await fetch(
            `/api/boat-configuration/customer-orders?orderNo=${searchResult.shopOrder.CustomerOrderNo}&lineNo=${searchResult.shopOrder.CustomerLineNo}&serialNumber=${serialNumber}`
          )

          const data = await response.json()

          if (!response.ok) throw new Error(data.error || 'Failed to fetch Customer Order')

          if (data.success && data.data?.customerOrder) {
            setCustomerOrder(data.data.customerOrder)
            setCurrentStep('customer-order')
            setLoadingCustomerOrder(false)
            return
          }
        }

        // Fallback: Chercher via Serial Number (plus lent mais fonctionne toujours)
        console.log('🔍 Loading Customer Order via Serial Number...')
        const response = await fetch(
          `/api/boat-configuration/customer-orders?serialNumber=${serialNumber}`
        )

        const data = await response.json()

        if (!response.ok) throw new Error(data.error || 'Failed to fetch Customer Order')

        if (data.success && data.data?.customerOrder) {
          setCustomerOrder(data.data.customerOrder)
          setCurrentStep('customer-order')
        } else {
          // Pas de Customer Order trouvé, passer directement à la sélection
          console.log('ℹ️ No Customer Order found, skipping to selection')
          setCurrentStep('selection')
        }
      } catch (err) {
        console.warn('⚠️ Failed to load Customer Order, continuing without it:', err)
        // En cas d'erreur, passer directement à la sélection
        setCurrentStep('selection')
      } finally {
        setLoadingCustomerOrder(false)
      }
    } else {
      // Pas de Serial Number, passer directement à la sélection
      setCurrentStep('selection')
    }
  }

  const handleCustomerOrderConfirm = () => {
    setCurrentStep('selection')
  }

  const handleCustomerOrderCancel = () => {
    setCurrentStep('confirmation')
    setCustomerOrder(null)
  }

  useEffect(() => {
    if (currentStep === 'selection') {
      loadPrintersAndLanguages()
    }
  }, [currentStep])

  const loadPrintersAndLanguages = async () => {
    setLoadingPrinters(true)
    try {
      const printersResponse = await fetch('/api/shared/printers')
      const printersData = await printersResponse.json()
      if (printersData.success && printersData.data) {
        setPrinters(printersData.data)
      }
    } catch (err) {
      console.error('Error loading printers:', err)
    } finally {
      setLoadingPrinters(false)
    }

    setLoadingLanguages(true)
    try {
      const languagesResponse = await fetch('/api/shared/languages')
      const languagesData = await languagesResponse.json()
      if (languagesData.success && languagesData.data) {
        setLanguages(languagesData.data)
      }
    } catch (err) {
      console.error('Error loading languages:', err)
    } finally {
      setLoadingLanguages(false)
    }
  }

  const handleSelectionValidate = () => {
    if (!selectedPrinter || !selectedLanguage) {
      setError('Please select both a printer and a language')
      return
    }
    setCurrentStep('print')
  }

  const handleConfirmNo = () => {
    setCurrentStep('entry')
    setSearchResult(null)
    setError(null)
  }

  const handleReset = () => {
    setCurrentStep('entry')
    setShopOrder({ orderNo: '', releaseNo: '*', sequenceNo: '*' })
    setSearchResult(null)
    setSerialNumber('N/A')
    setDopHeaderId('N/A')
    setCustomerOrder(null)
    setSelectedPrinter('')
    setSelectedLanguage('')
    setError(null)
  }

  return (
    <>
      {/* Stepper Vertical Gauche */}
      <VerticalStepper steps={stepperSteps} />

      {/* Sidebar Contextuelle Droite */}
      <ContextualSidebar
        orderNo={searchResult?.shopOrder?.OrderNo}
        releaseNo={searchResult?.shopOrder?.ReleaseNo}
        sequenceNo={searchResult?.shopOrder?.SequenceNo}
        serialNumber={serialNumber !== 'N/A' ? serialNumber : undefined}
        partNo={searchResult?.shopOrder?.PartNo}
        partDescription={searchResult?.shopOrder?.PartDescription}
        contract={searchResult?.shopOrder?.Contract}
        customerOrderNo={customerOrder?.orderNo}
      />

      {/* Contenu principal avec décalage pour stepper gauche et sidebar droite */}
      <div className="ml-28 mr-80 min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-950">
        {/* Background Orbs avec Parallax */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 -right-48 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-700" />
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-teal-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative container mx-auto px-6 py-12 max-w-5xl">
          {/* Titre principal */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Boat Configuration Editor
            </h1>
            <p className="text-xl text-cyan-200 font-light">Gestion des ordres de fabrication</p>
          </div>

        {/* Step 1: Entry */}
        {currentStep === 'entry' && (
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-8">Step 1: Enter Shop Order Details</h2>
            <form onSubmit={handleSearch} className="space-y-8">
              <div>
                <Label htmlFor="orderNo" className="text-gray-200 text-xl mb-3 block font-medium">Order No *</Label>
                <Input
                  id="orderNo"
                  type="text"
                  value={shopOrder.orderNo}
                  onChange={(e) => setShopOrder({ ...shopOrder, orderNo: e.target.value })}
                  placeholder="ex: 563, 97277, 1043"
                  required
                  disabled={loading}
                  className="bg-gray-900/50 border-2 border-gray-600 text-white h-24 text-3xl px-8 rounded-xl focus:ring-4 focus:ring-blue-600/50 focus:border-blue-600"
                />
              </div>
              <div>
                <Label htmlFor="releaseNo" className="text-gray-200 text-xl mb-3 block font-medium">Release No *</Label>
                <Input
                  id="releaseNo"
                  type="text"
                  value={shopOrder.releaseNo}
                  onChange={(e) => setShopOrder({ ...shopOrder, releaseNo: e.target.value })}
                  placeholder="ex: 1 ou * pour tous"
                  required
                  disabled={loading}
                  className="bg-gray-900/50 border-2 border-gray-600 text-white h-24 text-3xl px-8 rounded-xl focus:ring-4 focus:ring-blue-600/50 focus:border-blue-600"
                />
              </div>
              <div>
                <Label htmlFor="sequenceNo" className="text-gray-200 text-xl mb-3 block font-medium">Sequence No *</Label>
                <Input
                  id="sequenceNo"
                  type="text"
                  value={shopOrder.sequenceNo}
                  onChange={(e) => setShopOrder({ ...shopOrder, sequenceNo: e.target.value })}
                  placeholder="ex: 10 ou * pour tous"
                  required
                  disabled={loading}
                  className="bg-gray-900/50 border-2 border-gray-600 text-white h-24 text-3xl px-8 rounded-xl focus:ring-4 focus:ring-blue-600/50 focus:border-blue-600"
                />
              </div>
              {error && (
                <div className="bg-red-900/50 border-2 border-red-700 text-red-200 rounded-xl p-6">
                  <p className="font-semibold text-lg">Error</p>
                  <p className="text-base">{error}</p>
                </div>
              )}
              <Button type="submit" disabled={loading} className="w-full h-28 text-2xl font-bold bg-blue-600 hover:bg-blue-500 transition-all hover:scale-105 active:scale-95 shadow-lg rounded-xl">
                {loading ? (
                  <span className="flex items-center justify-center gap-4">
                    <Loader2 className="w-10 h-10 animate-spin" />
                    <span>Recherche...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-4">
                    <Search className="w-10 h-10" />
                    <span>Rechercher</span>
                  </span>
                )}
              </Button>
            </form>
          </div>
        )}

        {/* Step 2: Confirmation */}
        {currentStep === 'confirmation' && searchResult && (
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Step 2: Confirm Serial Number</h2>
            <div className="space-y-4 mb-6">
              <div className="bg-blue-900/30 border border-blue-700/50 rounded-md p-4">
                <h3 className="font-semibold text-lg text-cyan-300 mb-2">Shop Order Found</h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                  <div><span className="font-medium text-cyan-400">Order No:</span> {searchResult.shopOrder?.OrderNo}</div>
                  <div><span className="font-medium text-cyan-400">Release No:</span> {searchResult.shopOrder?.ReleaseNo}</div>
                  <div><span className="font-medium text-cyan-400">Sequence No:</span> {searchResult.shopOrder?.SequenceNo}</div>
                  <div><span className="font-medium text-cyan-400">Contract:</span> {searchResult.shopOrder?.Contract}</div>
                  <div className="col-span-2"><span className="font-medium text-cyan-400">Part No:</span> {searchResult.shopOrder?.PartNo}</div>
                  <div className="col-span-2"><span className="font-medium text-cyan-400">Description:</span> {searchResult.shopOrder?.PartDescription}</div>
                </div>
              </div>
              <div className="bg-teal-900/30 border border-teal-700/50 rounded-md p-4">
                <h3 className="font-semibold text-lg text-teal-300 mb-2">Serial Number Information</h3>
                <div className="space-y-2 text-gray-300">
                  <div><span className="font-medium text-teal-400">Serial Number:</span> <span className="text-xl font-bold text-teal-200">{serialNumber}</span></div>
                  <div><span className="font-medium text-teal-400">DOP Header ID:</span> <span className="text-lg">{dopHeaderId}</span></div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-center font-medium text-white text-2xl mb-6">Confirmez-vous ce numéro de série ?</p>
              <div className="flex gap-6">
                <Button onClick={handleConfirmYes} disabled={loadingCustomerOrder} className="flex-1 h-24 text-2xl font-bold bg-teal-600 hover:bg-teal-500 transition-all hover:scale-105 active:scale-95 shadow-lg rounded-xl">
                  {loadingCustomerOrder ? (
                    <span className="flex items-center justify-center gap-3">
                      <Loader2 className="w-10 h-10 animate-spin" />
                      <span>Chargement...</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-3">
                      <CheckCircle className="w-10 h-10" />
                      <span>Oui, Continuer</span>
                    </span>
                  )}
                </Button>
                <Button onClick={handleConfirmNo} variant="outline" className="flex-1 h-24 text-2xl font-bold border-2 border-gray-600 text-gray-300 hover:bg-gray-700 transition-all hover:scale-105 active:scale-95 rounded-xl">
                  <span className="flex items-center justify-center gap-3">
                    <XCircle className="w-10 h-10" />
                    <span>Non, Recommencer</span>
                  </span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Customer Order Validation */}
        {currentStep === 'customer-order' && customerOrder && (
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-6">
            <CustomerOrderValidation
              customerOrder={customerOrder}
              serialNumber={serialNumber}
              serialNumberMatch={customerOrder.chullNumber === serialNumber}
              onConfirm={handleCustomerOrderConfirm}
              onCancel={handleCustomerOrderCancel}
              isLoading={false}
            />
          </div>
        )}

        {/* Step 4: Selection */}
        {currentStep === 'selection' && (
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Step 4: Select Printer & Language</h2>
            <div className="bg-blue-900/30 border border-blue-700/50 rounded-md p-4 mb-6">
              <h3 className="font-semibold text-cyan-300 mb-2">Selected Configuration</h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                <div><span className="font-medium text-cyan-400">Order No:</span> {searchResult?.shopOrder?.OrderNo}</div>
                <div><span className="font-medium text-cyan-400">Serial Number:</span> <span className="font-bold text-cyan-200">{serialNumber}</span></div>
              </div>
            </div>
            <div className="space-y-6">
              <PrinterSearch printers={printers} value={selectedPrinter} onChange={setSelectedPrinter} loading={loadingPrinters} required />
              <LanguageSelector languages={languages} value={selectedLanguage} onChange={setSelectedLanguage} loading={loadingLanguages} required />
              {error && (
                <div className="bg-red-900/50 border border-red-700 text-red-200 rounded-md p-4">
                  <p className="font-semibold">Error</p>
                  <p>{error}</p>
                </div>
              )}
              <div className="flex gap-6">
                <Button onClick={handleSelectionValidate} disabled={!selectedPrinter || !selectedLanguage || loadingPrinters || loadingLanguages} className="flex-1 h-24 text-2xl font-bold bg-blue-600 hover:bg-blue-500 transition-all hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed rounded-xl">
                  <span className="flex items-center justify-center gap-3">
                    <ChevronRight className="w-10 h-10" />
                    <span>Continuer</span>
                  </span>
                </Button>
                <Button onClick={handleConfirmNo} variant="outline" className="flex-1 h-24 text-2xl font-bold border-2 border-gray-600 text-gray-300 hover:bg-gray-700 transition-all hover:scale-105 active:scale-95 rounded-xl">
                  <span className="flex items-center justify-center gap-3">
                    <ArrowLeft className="w-10 h-10" />
                    <span>Retour</span>
                  </span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Print */}
        {currentStep === 'print' && (
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Step 5: Print Document</h2>
            <PrintExecution
              orderNo={customerOrder?.orderNo || searchResult?.shopOrder?.CustomerOrderNo || 'UNKNOWN'}
              serialNumber={serialNumber}
              printerId={selectedPrinter}
              languageCode={selectedLanguage}
              onReset={handleReset}
            />
          </div>
        )}
        </div>
      </div>
    </>
  )
}
