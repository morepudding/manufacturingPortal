/**
 * PrintExecution Component
 * 
 * Composant pour exécuter l'impression et télécharger le PDF
 */

'use client'

import { useState } from 'react'
import { Button } from '@/shared/components/atoms/Button'
import type { PrintResult } from '@/core/types/print'

interface PrintExecutionProps {
  /** Numéro de Customer Order */
  orderNo: string
  
  /** Serial Number */
  serialNumber: string
  
  /** ID de l'imprimante sélectionnée */
  printerId: string
  
  /** Code langue sélectionné */
  languageCode: string
  
  /** Callback pour réinitialiser le workflow */
  onReset: () => void
}

export function PrintExecution({
  orderNo,
  serialNumber,
  printerId,
  languageCode,
  onReset,
}: PrintExecutionProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<PrintResult | null>(null)
  const [downloadMode, setDownloadMode] = useState<'print' | 'download' | null>(null)

  /**
   * Exécuter l'impression (avec ou sans téléchargement PDF)
   */
  const handlePrint = async (downloadPdf: boolean) => {
    setLoading(true)
    setError(null)
    setDownloadMode(downloadPdf ? 'download' : 'print')
    
    try {
      console.log('🖨️ Starting print workflow:', {
        orderNo,
        printerId,
        languageCode,
        downloadPdf,
      })
      
      const response = await fetch('/api/boat-configuration/print', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNo,
          reportId: 'CUSTOMER_ORDER_CONF_REP', // AST (Dev)
          printerId,
          languageCode,
          copies: 1,
          downloadPdf,
        }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Print request failed')
      }
      
      // Si téléchargement PDF demandé
      if (downloadPdf) {
        // Récupérer le nom du fichier depuis le header Content-Disposition
        const contentDisposition = response.headers.get('Content-Disposition')
        const filenameMatch = contentDisposition?.match(/filename="(.+)"/)
        const filename = filenameMatch?.[1] || `order-${orderNo}.pdf`
        
        // Télécharger le PDF
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
        
        console.log(`✅ PDF downloaded: ${filename}`)
        
        setResult({
          success: true,
          resultKey: 0, // Le PDF a été téléchargé directement
          reportTitle: 'Customer Order Configuration',
          layoutName: 'BEN_Inventory-BAT.rdl',
          pdfInfo: {
            fileName: filename,
            size: blob.size,
            created: new Date().toISOString(),
            id: '',
          },
        })
      } else {
        // Impression simple
        const data: PrintResult = await response.json()
        console.log('✅ Print request successful:', data)
        setResult(data)
      }
      
    } catch (err) {
      console.error('❌ Print error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Configuration Summary */}
      <div className="bg-blue-900/30 border border-blue-700/50 rounded-md p-4">
        <h3 className="font-semibold text-cyan-300 mb-3">📋 Print Configuration</h3>
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-300">
          <div>
            <span className="font-medium text-cyan-400">Customer Order:</span>
            <div className="text-white font-semibold">{orderNo}</div>
          </div>
          <div>
            <span className="font-medium text-cyan-400">Serial Number:</span>
            <div className="text-white font-semibold">{serialNumber}</div>
          </div>
          <div>
            <span className="font-medium text-cyan-400">Printer:</span>
            <div className="text-white">{printerId}</div>
          </div>
          <div>
            <span className="font-medium text-cyan-400">Language:</span>
            <div className="text-white uppercase">{languageCode}</div>
          </div>
          <div className="col-span-2">
            <span className="font-medium text-cyan-400">Document:</span>
            <div className="text-white">Customer Order Configuration (CUSTOMER_ORDER_CONF_REP)</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      {!result && (
        <div className="space-y-3">
          <div className="bg-yellow-900/20 border border-yellow-700/40 rounded-md p-3">
            <p className="text-sm text-yellow-200">
              💡 <strong>Choose an action:</strong>
            </p>
            <ul className="text-sm text-yellow-200 mt-2 ml-4 space-y-1">
              <li>• <strong>Print Only</strong>: Send to printer (faster, ~10s)</li>
              <li>• <strong>Print & Download PDF</strong>: Get a copy of the document (slower, ~15s)</li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => handlePrint(false)}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600"
            >
              {loading && downloadMode === 'print' ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Printing...
                </>
              ) : (
                <>🖨️ Print Only</>
              )}
            </Button>

            <Button
              onClick={() => handlePrint(true)}
              disabled={loading}
              className="bg-teal-600 hover:bg-teal-500 disabled:bg-gray-600"
            >
              {loading && downloadMode === 'download' ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Downloading...
                </>
              ) : (
                <>📥 Print & Download PDF</>
              )}
            </Button>
          </div>

          <Button
            onClick={onReset}
            disabled={loading}
            variant="outline"
            className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            ← Back to Selection
          </Button>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-200 rounded-md p-4">
          <p className="font-semibold flex items-center">
            ❌ Print Error
          </p>
          <p className="mt-2">{error}</p>
          <Button
            onClick={() => setError(null)}
            variant="outline"
            className="mt-3 border-red-700 text-red-200 hover:bg-red-800"
          >
            Try Again
          </Button>
        </div>
      )}

      {/* Success Display */}
      {result && !error && (
        <div className="space-y-4">
          <div className="bg-teal-900/50 border border-teal-700 text-teal-200 rounded-md p-4">
            <p className="font-semibold flex items-center text-lg">
              ✅ Print Successful!
            </p>
            <div className="mt-3 space-y-2 text-sm">
              <div>
                <span className="font-medium text-teal-300">Result Key:</span>{' '}
                <span className="font-mono">{result.resultKey}</span>
              </div>
              <div>
                <span className="font-medium text-teal-300">Report:</span>{' '}
                {result.reportTitle}
              </div>
              <div>
                <span className="font-medium text-teal-300">Layout:</span>{' '}
                {result.layoutName}
              </div>
              {result.pdfInfo && (
                <>
                  <div className="border-t border-teal-700/50 pt-2 mt-2">
                    <span className="font-medium text-teal-300">PDF Downloaded:</span>
                  </div>
                  <div>
                    <span className="font-medium text-teal-300">File:</span>{' '}
                    {result.pdfInfo.fileName}
                  </div>
                  <div>
                    <span className="font-medium text-teal-300">Size:</span>{' '}
                    {(result.pdfInfo.size / 1024).toFixed(2)} KB
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={onReset}
              className="flex-1 bg-blue-600 hover:bg-blue-500"
            >
              🔄 New Print
            </Button>
          </div>
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="bg-blue-900/30 border border-blue-700/50 rounded-md p-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin text-3xl">⏳</div>
            <div className="text-white">
              <p className="font-semibold">
                {downloadMode === 'download' ? 'Printing & Downloading PDF...' : 'Sending to printer...'}
              </p>
              <p className="text-sm text-gray-300 mt-1">
                This may take {downloadMode === 'download' ? '10-15' : '5-10'} seconds
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
