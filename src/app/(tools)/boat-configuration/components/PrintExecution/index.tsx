/**
 * PrintExecution Component
 * 
 * Composant pour télécharger le PDF de configuration bateau via IFS
 * Utilise le système d'impression IFS pour générer un PDF avec le bon format
 */

'use client'

import { useState } from 'react'
import { Button } from '@/shared/components/atoms/Button'
import { Download, CheckCircle, XCircle, Loader2, FileText, ArrowLeft } from 'lucide-react'

interface PrintExecutionProps {
  orderNo: string
  serialNumber: string
  onReset: () => void
}

export function PrintExecution({
  orderNo,
  serialNumber,
  onReset,
}: PrintExecutionProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [pdfFileName, setPdfFileName] = useState<string>('')

  // Valeurs par défaut fixes
  const selectedPrinter = 'PDF_PRINTER'
  const selectedLanguage = 'en'

  const handleDownloadPDF = async () => {
    setLoading(true)
    setError(null)
    setSuccess(false)
    
    try {
      const response = await fetch('/api/boat-configuration/print', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNo,
          reportId: 'PROFORMA_INVOICE_REP',
          printerId: selectedPrinter,
          languageCode: selectedLanguage,
          layoutName: 'BEN_Boat_configuration_for_production.rdl',
          downloadPdf: true,
        }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        
        // Gestion spécifique pour Customer Order manquant (404)
        if (response.status === 404) {
          throw new Error(
            `❌ Customer Order introuvable\n\n` +
            `${errorData.details || 'Le Customer Order n\'existe pas dans IFS.'}\n\n` +
            `💡 ${errorData.hint || 'Vérifiez que le Shop Order a bien un Customer Order associé dans IFS Cloud.'}`
          )
        }
        
        throw new Error(errorData.error || 'PDF generation failed')
      }
      
      const contentDisposition = response.headers.get('Content-Disposition')
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/)
      const filename = filenameMatch?.[1] || `boat-config-${orderNo}-${serialNumber}.pdf`
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
      
      setPdfFileName(filename)
      setSuccess(true)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Sélection Imprimante & Langue */}
      {!success && (
        <div className="space-y-6">
          <div className="bg-blue-900/30 border border-blue-700/50 rounded-md p-4">
            <h3 className="font-semibold text-cyan-300 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Impression PDF
            </h3>

            <div className="space-y-3">
              {/* Info Impression PDF */}
              <div className="bg-blue-950/50 border border-blue-800/50 rounded-md p-4">
                <div className="space-y-2">
                  <p className="text-sm text-blue-200 flex items-start gap-2">
                    <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span><strong>Format :</strong> Le document sera généré en PDF et téléchargé automatiquement sur votre ordinateur.</span>
                  </p>
                  <p className="text-sm text-blue-200 flex items-start gap-2">
                    <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    <span><strong>Langues :</strong> Le document contiendra les informations en français et en anglais.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-900/30 border border-blue-700/50 rounded-md p-4">
            <h3 className="font-semibold text-cyan-300 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Configuration PDF
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
            </div>
          </div>
        </div>
      )}

      {!success && !loading && (
        <div className="space-y-4">
          <Button
            onClick={handleDownloadPDF}
            disabled={loading}
            className="w-full h-24 text-2xl font-bold bg-blue-600 hover:bg-blue-500"
          >
            <span className="flex items-center justify-center gap-3">
              <Download className="w-10 h-10" />
              <span>Télécharger PDF</span>
            </span>
          </Button>

          <Button
            onClick={onReset}
            variant="outline"
            className="w-full h-14 text-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Button>
        </div>
      )}

      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-200 rounded-md p-4">
          <p className="font-semibold flex items-center gap-2 text-lg mb-3">
            <XCircle className="w-5 h-5" />
            Erreur d'impression
          </p>
          <div className="text-sm whitespace-pre-line leading-relaxed">
            {error}
          </div>
        </div>
      )}

      {success && !error && (
        <div className="space-y-4">
          <div className="bg-teal-900/50 border border-teal-700 text-teal-200 rounded-md p-4">
            <p className="font-semibold flex items-center gap-2 text-lg">
              <CheckCircle className="w-6 h-6" />
              PDF Téléchargé avec Succès !
            </p>
            <div className="mt-3 space-y-2 text-sm">
              <div>
                <span className="font-medium text-teal-300">Fichier:</span>{' '}
                <span className="font-mono">{pdfFileName}</span>
              </div>
            </div>
          </div>

          <Button
            onClick={onReset}
            className="w-full h-16 text-xl font-bold bg-blue-600 hover:bg-blue-500"
          >
            <FileText className="w-5 h-5 mr-2" />
            Nouvelle Configuration
          </Button>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gradient-to-br from-blue-900/90 to-cyan-900/90 border-2 border-blue-500/50 rounded-3xl p-12 shadow-2xl max-w-md mx-4">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-8 border-blue-500/30 border-t-blue-500 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Download className="w-16 h-16 text-blue-400 animate-pulse" />
                </div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <h3 className="text-3xl font-bold text-white">Génération du PDF via IFS</h3>
              <p className="text-xl text-cyan-200">Veuillez patienter...</p>
              
              <div className="text-sm text-gray-300 space-y-2 pt-4">
                <p className="flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" />
                  Commande: <span className="font-bold text-white">{orderNo}</span>
                </p>
                <p className="text-yellow-300 text-xs pt-2 flex items-center justify-center gap-2">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Impression IFS + Téléchargement PDF (30 secondes max)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
