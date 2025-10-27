/**
 * PrintExecution Component
 * 
 * Composant pour exécuter l'impression et télécharger le PDF
 */

'use client'

import { useState } from 'react'
import { Button } from '@/shared/components/atoms/Button'
import { Printer, Download, ArrowLeft, CheckCircle, XCircle, Loader2, FileText, Globe } from 'lucide-react'
import type { PrintResult } from '@/tools/boat-configuration/types'

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
      
      // 🔥 CONFIGURATION PRODUCTION - NE PAS MODIFIER
      const REPORT_ID = 'PROFORMA_INVOICE_REP'
      const LAYOUT_NAME = 'BEN_Boat_configuration_for_production.rdl'
      
      console.log('🔍 VERIFICATION CONFIGURATION IMPRESSION:')
      console.log(`   ✅ Report ID: ${REPORT_ID}`)
      console.log(`   ✅ Layout Name: ${LAYOUT_NAME}`)
      console.log(`   📋 Order No: ${orderNo}`)
      console.log(`   🖨️ Printer: ${printerId}`)
      console.log(`   🌍 Language: ${languageCode}`)
      
      const response = await fetch('/api/boat-configuration/print', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNo,
          reportId: REPORT_ID,
          printerId,
          languageCode,
          layoutName: LAYOUT_NAME,
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
          reportTitle: 'Boat Configuration for Production',
          layoutName: LAYOUT_NAME,
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
            {/* Configuration Summary */}
      <div className="bg-blue-900/30 border border-blue-700/50 rounded-md p-4">
        <h3 className="font-semibold text-cyan-300 mb-3 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Configuration d'Impression
        </h3>
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
            <span className="font-medium text-cyan-400 flex items-center gap-1">
              <Printer className="w-3 h-3" />
              Imprimante:
            </span>
            <div className="text-white">{printerId}</div>
          </div>
          <div>
            <span className="font-medium text-cyan-400 flex items-center gap-1">
              <Globe className="w-3 h-3" />
              Langue:
            </span>
            <div className="text-white uppercase">{languageCode}</div>
          </div>
          <div className="col-span-2">
            <span className="font-medium text-cyan-400">Document:</span>
            <div className="text-white">Boat Configuration for Production (PROFORMA_INVOICE_REP)</div>
            <div className="text-xs text-cyan-200 mt-1">Layout: BEN_Boat_configuration_for_production.rdl</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      {!result && !loading && (
        <div className="space-y-4">
          <div className="bg-yellow-900/20 border border-yellow-700/40 rounded-md p-4">
            <p className="text-base text-yellow-200 font-medium">
              Choisissez une action:
            </p>
            <ul className="text-sm text-yellow-200 mt-2 ml-4 space-y-1">
              <li className="flex items-center gap-2">
                <Printer className="w-4 h-4" />
                <span><strong>Imprimer uniquement</strong>: Envoi à l'imprimante</span>
              </li>
              <li className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span><strong>Imprimer + Télécharger PDF</strong>: Copie du document</span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() => handlePrint(false)}
              className="h-20 text-xl font-bold bg-blue-600 hover:bg-blue-500 transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              <span className="flex flex-col items-center gap-2">
                <Printer className="w-10 h-10" />
                <span>Imprimer</span>
              </span>
            </Button>

            <Button
              onClick={() => handlePrint(true)}
              className="h-20 text-xl font-bold bg-teal-600 hover:bg-teal-500 transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              <span className="flex flex-col items-center gap-2">
                <Download className="w-10 h-10" />
                <span>Imprimer + PDF</span>
              </span>
            </Button>
          </div>

          <Button
            onClick={onReset}
            variant="outline"
            className="w-full h-14 text-lg border-gray-600 text-gray-300 hover:bg-gray-700 transition-all"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour à la sélection
          </Button>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-200 rounded-md p-4">
          <p className="font-semibold flex items-center gap-2">
            <XCircle className="w-5 h-5" />
            Erreur d'Impression
          </p>
          <p className="mt-2">{error}</p>
          <Button
            onClick={() => setError(null)}
            variant="outline"
            className="mt-3 border-red-700 text-red-200 hover:bg-red-800"
          >
            Réessayer
          </Button>
        </div>
      )}

      {/* Success Display */}
      {result && !error && (
        <div className="space-y-4">
          <div className="bg-teal-900/50 border border-teal-700 text-teal-200 rounded-md p-4">
            <p className="font-semibold flex items-center gap-2 text-lg">
              <CheckCircle className="w-6 h-6" />
              Impression Réussie !
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
                    <span className="font-medium text-teal-300 flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      PDF Téléchargé:
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-teal-300">Fichier:</span>{' '}
                    {result.pdfInfo.fileName}
                  </div>
                  <div>
                    <span className="font-medium text-teal-300">Taille:</span>{' '}
                    {(result.pdfInfo.size / 1024).toFixed(2)} KB
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={onReset}
              className="flex-1 h-16 text-xl font-bold bg-blue-600 hover:bg-blue-500 transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              <span className="flex items-center justify-center gap-2">
                <Printer className="w-6 h-6" />
                Nouvelle Impression
              </span>
            </Button>
          </div>
        </div>
      )}

      {/* Loading Indicator - Full Screen Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gradient-to-br from-blue-900/90 to-cyan-900/90 border-2 border-blue-500/50 rounded-3xl p-12 shadow-2xl max-w-md mx-4">
            {/* Spinner animé */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                {/* Cercle externe qui tourne */}
                <div className="w-32 h-32 rounded-full border-8 border-blue-500/30 border-t-blue-500 animate-spin"></div>
                {/* Icône centrale */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {downloadMode === 'download' ? (
                    <Download className="w-16 h-16 text-blue-400 animate-pulse" />
                  ) : (
                    <Printer className="w-16 h-16 text-blue-400 animate-pulse" />
                  )}
                </div>
              </div>
            </div>

            {/* Texte de statut */}
            <div className="text-center space-y-4">
              <h3 className="text-3xl font-bold text-white">
                {downloadMode === 'download' ? 'Impression & Téléchargement' : 'Impression en cours'}
              </h3>
              <p className="text-xl text-cyan-200">
                Veuillez patienter...
              </p>
              
              {/* Barre de progression animée */}
              <div className="w-full bg-blue-950/50 rounded-full h-3 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 animate-progress"></div>
              </div>

              {/* Informations */}
              <div className="text-sm text-gray-300 space-y-2 pt-4">
                <p className="flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" />
                  Commande: <span className="font-bold text-white">{orderNo}</span>
                </p>
                <p className="flex items-center justify-center gap-2">
                  <Printer className="w-4 h-4" />
                  Imprimante: <span className="font-bold text-white">{printerId}</span>
                </p>
                <p className="text-yellow-300 text-xs pt-2 flex items-center justify-center gap-2">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Cette opération peut prendre 15-30 secondes
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Style pour l'animation de progression */}
      <style jsx>{`
        @keyframes progress {
          0% {
            width: 0%;
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
          100% {
            width: 100%;
            opacity: 0.5;
          }
        }
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
