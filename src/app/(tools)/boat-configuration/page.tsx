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

/**
 * Fetch customer order using OrderNo + LineNo (fast path)
 */
async function fetchCustomerOrderByOrderInfo(
  orderNo: string,
  lineNo: string,
  serialNumber: string
): Promise<CustomerOrderData | null> {
  console.log('🔍 Loading Customer Order from Shop Order data...')
  const response = await fetch(
    `/api/boat-configuration/customer-orders?orderNo=${orderNo}&lineNo=${lineNo}&serialNumber=${serialNumber}`
  )
  const data = await response.json()
  
  if (!response.ok) throw new Error(data.error || 'Failed to fetch Customer Order')
  
  return data.success && data.data?.customerOrder ? data.data.customerOrder : null
}

/**
 * Fetch customer order using Serial Number only (fallback, slower)
 */
async function fetchCustomerOrderBySerial(
  serialNumber: string
): Promise<CustomerOrderData | null> {
  console.log('🔍 Loading Customer Order via Serial Number...')
  const response = await fetch(
    `/api/boat-configuration/customer-orders?serialNumber=${serialNumber}`
  )
  const data = await response.json()
  
  if (!response.ok) throw new Error(data.error || 'Failed to fetch Customer Order')
  
  return data.success && data.data?.customerOrder ? data.data.customerOrder : null
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
    // No Serial Number - skip to selection
    if (!serialNumber || serialNumber === 'N/A') {
      setCurrentStep('selection')
      return
    }

    setLoadingCustomerOrder(true)
    setError(null)

    try {
      let customerOrderData: CustomerOrderData | null = null

      // Try fast path: OrderNo + LineNo if available
      const shopOrderData = searchResult?.shopOrder
      if (shopOrderData?.CustomerOrderNo && shopOrderData?.CustomerLineNo) {
        customerOrderData = await fetchCustomerOrderByOrderInfo(
          shopOrderData.CustomerOrderNo,
          shopOrderData.CustomerLineNo,
          serialNumber
        )
      }

      // Fallback: search by Serial Number
      if (!customerOrderData) {
        customerOrderData = await fetchCustomerOrderBySerial(serialNumber)
      }

      if (customerOrderData) {
        setCustomerOrder(customerOrderData)
        setCurrentStep('customer-order')
      } else {
        console.log('ℹ️ No Customer Order found, skipping to selection')
        setCurrentStep('selection')
      }
    } catch (err) {
      console.warn('⚠️ Failed to load Customer Order, continuing without it:', err)
      setCurrentStep('selection')
    } finally {
      setLoadingCustomerOrder(false)
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
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-950">
      {/* Background Orbs avec Parallax */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-48 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-teal-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Boat Configuration Editor
          </h1>
          <p className="text-cyan-200 text-lg">🚤 Gestion des ordres de fabrication</p>
        </div>

        {/* Step Indicators */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <StepIndicator step={1} label="Entry" active={currentStep === 'entry'} completed={['confirmation', 'customer-order', 'selection', 'print'].includes(currentStep)} />
            <StepIndicator step={2} label="Confirmation" active={currentStep === 'confirmation'} completed={['customer-order', 'selection', 'print'].includes(currentStep)} />
            <StepIndicator step={3} label="Customer Order" active={currentStep === 'customer-order'} completed={['selection', 'print'].includes(currentStep)} />
            <StepIndicator step={4} label="Selection" active={currentStep === 'selection'} completed={currentStep === 'print'} />
            <StepIndicator step={5} label="Print" active={currentStep === 'print'} completed={false} />
          </div>
        </div>

        {/* Step 1: Entry */}
        {currentStep === 'entry' && (
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Step 1: Enter Shop Order Details</h2>
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <Label htmlFor="orderNo" className="text-gray-200">Order No *</Label>
                <Input
                  id="orderNo"
                  type="text"
                  value={shopOrder.orderNo}
                  onChange={(e) => setShopOrder({ ...shopOrder, orderNo: e.target.value })}
                  placeholder="e.g., 563, 97277, 1043"
                  required
                  disabled={loading}
                  className="bg-gray-900/50 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="releaseNo" className="text-gray-200">Release No *</Label>
                <Input
                  id="releaseNo"
                  type="text"
                  value={shopOrder.releaseNo}
                  onChange={(e) => setShopOrder({ ...shopOrder, releaseNo: e.target.value })}
                  placeholder="e.g., 1 or * for all"
                  required
                  disabled={loading}
                  className="bg-gray-900/50 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="sequenceNo" className="text-gray-200">Sequence No *</Label>
                <Input
                  id="sequenceNo"
                  type="text"
                  value={shopOrder.sequenceNo}
                  onChange={(e) => setShopOrder({ ...shopOrder, sequenceNo: e.target.value })}
                  placeholder="e.g., 10 or * for all"
                  required
                  disabled={loading}
                  className="bg-gray-900/50 border-gray-600 text-white"
                />
              </div>
              {error && (
                <div className="bg-red-900/50 border border-red-700 text-red-200 rounded-md p-4">
                  <p className="font-semibold">Error</p>
                  <p>{error}</p>
                </div>
              )}
              <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500">
                {loading ? 'Searching...' : 'Search Shop Order'}
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
              <p className="text-center font-medium text-white">Is this the correct Serial Number?</p>
              <div className="flex gap-4">
                <Button onClick={handleConfirmYes} disabled={loadingCustomerOrder} className="flex-1 bg-teal-600 hover:bg-teal-500">
                  {loadingCustomerOrder ? 'Loading Customer Order...' : 'Yes, Continue'}
                </Button>
                <Button onClick={handleConfirmNo} variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700">No, Search Again</Button>
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
              <div className="flex gap-4">
                <Button onClick={handleSelectionValidate} disabled={!selectedPrinter || !selectedLanguage || loadingPrinters || loadingLanguages} className="flex-1 bg-blue-600 hover:bg-blue-500">Continue to Print</Button>
                <Button onClick={handleConfirmNo} variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700">Back</Button>
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
  )
}

function StepIndicator({ step, label, active, completed }: { step: number; label: string; active: boolean; completed: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${completed ? 'bg-teal-500 text-white' : active ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}`}>
        {completed ? '✓' : step}
      </div>
      <span className={`text-sm mt-2 ${active ? 'font-semibold text-white' : 'text-gray-400'}`}>{label}</span>
    </div>
  )
}
