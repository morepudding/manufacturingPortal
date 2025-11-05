/**
 * PrinterLanguageSelection Component
 * 
 * Permet de sélectionner une langue IFS
 * L'imprimante est toujours PDF_PRINTER (IFS PDF Archiver)
 */

'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/shared/components/atoms/Button'
import { Label } from '@/shared/components/atoms/Label'
import { ArrowLeft, ChevronRight, Languages, Loader2, Printer } from 'lucide-react'

interface Language {
  LangCode: string
  LangCodeRfc3066: string
  Description: string
}

interface PrinterLanguageSelectionProps {
  onConfirm: (printerId: string, languageCode: string) => void
  onCancel: () => void
}

export function PrinterLanguageSelection({
  onConfirm,
  onCancel,
}: PrinterLanguageSelectionProps) {
  const [languages, setLanguages] = useState<Language[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Imprimante fixe : PDF_PRINTER (IFS PDF Archiver)
  const PRINTER_ID = 'PDF_PRINTER'

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/shared/languages')

      if (!response.ok) {
        throw new Error('Failed to fetch languages')
      }

      const languagesData = await response.json()

      setLanguages(languagesData.languages || [])

      // Sélectionner par défaut le premier élément
      if (languagesData.languages?.length > 0) {
        setSelectedLanguage(languagesData.languages[0].LangCode)
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleConfirm = () => {
    if (selectedLanguage) {
      onConfirm(PRINTER_ID, selectedLanguage)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-blue-400 animate-spin mx-auto" />
          <p className="text-gray-300">Chargement des langues...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-900/50 border border-red-700 text-red-200 rounded-md p-4">
        <p className="font-semibold">Erreur de chargement</p>
        <p className="mt-2">{error}</p>
        <Button
          onClick={fetchData}
          variant="outline"
          className="mt-3 border-red-700 text-red-200 hover:bg-red-800"
        >
          Réessayer
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Imprimante fixe (info seulement) */}
      <div className="space-y-3">
        <Label className="text-lg font-semibold text-cyan-300 flex items-center gap-2">
          <Printer className="w-5 h-5" />
          Imprimante
        </Label>
        <div className="w-full px-4 py-3 bg-gray-900/30 border border-blue-700/30 rounded-md text-gray-300">
          <div className="flex items-center gap-2">
            <Printer className="w-4 h-4 text-blue-400" />
            <span className="font-semibold text-white">PDF_PRINTER</span>
            <span className="text-sm text-gray-400">- IFS PDF Archiver (automatique)</span>
          </div>
        </div>
      </div>

      {/* Language Selection */}
      <div className="space-y-3">
        <Label className="text-lg font-semibold text-cyan-300 flex items-center gap-2">
          <Languages className="w-5 h-5" />
          Langue *
        </Label>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="w-full px-4 py-3 bg-gray-900/50 border border-blue-700/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sélectionner une langue</option>
          {languages.map((language) => (
            <option key={language.LangCode} value={language.LangCode}>
              {language.LangCode} - {language.Description}
            </option>
          ))}
        </select>
        <p className="text-sm text-gray-400">
          {languages.length} langue(s) disponible(s)
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-4">
        <Button
          onClick={onCancel}
          variant="outline"
          className="flex-1 h-14 text-lg"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour
        </Button>

        <Button
          onClick={handleConfirm}
          disabled={!selectedLanguage}
          className="flex-1 h-14 text-lg bg-blue-600 hover:bg-blue-500"
        >
          Continuer
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  )
}
