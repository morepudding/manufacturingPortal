/**
 * PrintDialog Component
 * 
 * Phase 5 - Dialogue de sélection d'imprimante et confirmation d'impression
 * 
 * Permet de:
 * - Sélectionner une imprimante IFS
 * - Confirmer l'impression
 * - Afficher le statut d'impression
 * - Option "Nouvelle impression" après succès
 */

'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/shared/components/molecules/Dialog'
import { Button } from '@/shared/components/atoms/Button'
import { Label } from '@/shared/components/atoms/Label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/atoms/Select'

interface PrintDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: (printerId: string) => Promise<void>
  printing: boolean
  labelCount: number
}

interface Printer {
  PrinterId: string
  Description: string
}

export function PrintDialog({
  open,
  onClose,
  onConfirm,
  printing,
  labelCount,
}: PrintDialogProps) {
  const [printers, setPrinters] = useState<Printer[]>([])
  const [selectedPrinter, setSelectedPrinter] = useState<string>('')
  const [loadingPrinters, setLoadingPrinters] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Charger les imprimantes à l'ouverture du dialogue
  useEffect(() => {
    if (open) {
      loadPrinters()
    }
  }, [open])

  const loadPrinters = async () => {
    try {
      setLoadingPrinters(true)
      setError(null)

      const response = await fetch('/api/shared/printers')
      const json = await response.json()

      if (!response.ok || !json.success) {
        throw new Error(json.message || 'Failed to load printers')
      }

      setPrinters(json.data || [])
      
      // Sélectionner automatiquement la première imprimante si disponible
      if (json.data && json.data.length > 0) {
        setSelectedPrinter(json.data[0].PrinterId)
      }
    } catch (err) {
      console.error('❌ [PrintDialog] Erreur chargement imprimantes:', err)
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des imprimantes')
    } finally {
      setLoadingPrinters(false)
    }
  }

  const handleConfirm = async () => {
    if (!selectedPrinter) {
      setError('Veuillez sélectionner une imprimante')
      return
    }

    try {
      setError(null)
      await onConfirm(selectedPrinter)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'impression')
    }
  }

  const handleClose = () => {
    if (!printing) {
      setSelectedPrinter('')
      setError(null)
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">🖨️ Impression des étiquettes</DialogTitle>
          <DialogDescription>
            Sélectionnez une imprimante pour lancer l&apos;impression
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Info */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📋</span>
              <div>
                <p className="font-medium text-amber-900">
                  {labelCount} étiquette{labelCount > 1 ? 's' : ''} à imprimer
                </p>
                <p className="text-sm text-amber-700 mt-1">
                  Format A4 paysage, groupées par matériau et vernis
                </p>
              </div>
            </div>
          </div>

          {/* Sélection imprimante */}
          <div className="space-y-2">
            <Label htmlFor="printer-select" className="text-base font-medium">
              Imprimante <span className="text-red-500">*</span>
            </Label>
            <Select
              value={selectedPrinter}
              onValueChange={setSelectedPrinter}
              disabled={loadingPrinters || printing}
            >
              <SelectTrigger id="printer-select">
                <SelectValue placeholder={loadingPrinters ? 'Chargement...' : 'Sélectionnez une imprimante'} />
              </SelectTrigger>
              <SelectContent>
                {printers.map((printer) => (
                  <SelectItem key={printer.PrinterId} value={printer.PrinterId}>
                    {printer.Description} ({printer.PrinterId})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {printers.length === 0 && !loadingPrinters && (
              <p className="text-sm text-gray-500">
                Aucune imprimante disponible
              </p>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 font-medium text-sm">❌ {error}</p>
            </div>
          )}

          {/* Status d'impression */}
          {printing && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
                <p className="text-blue-800 font-medium text-sm">
                  Impression en cours...
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="border-t pt-4">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={printing}
          >
            Annuler
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedPrinter || printing || loadingPrinters}
            className="bg-amber-600 hover:bg-amber-500"
          >
            {printing ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Impression...
              </>
            ) : (
              <>
                🖨️ Lancer l&apos;impression
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
