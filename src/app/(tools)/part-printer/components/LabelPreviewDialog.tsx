/**
 * LabelPreviewDialog Component
 * 
 * Phase 5 - Aperçu des étiquettes avant impression
 * 
 * Affiche:
 * - Preview du PDF généré
 * - Liste des étiquettes à imprimer
 * - Statistiques (nombre, groupements)
 * - Actions: Annuler / Imprimer
 */

'use client'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/shared/components/molecules/Dialog'
import { Button } from '@/shared/components/atoms/Button'
import type { PartLabel } from '@/tools/part-printer/types'

interface LabelPreviewDialogProps {
  open: boolean
  onClose: () => void
  onPrint: () => void
  labels: PartLabel[]
  pdfUrl: string
}

export function LabelPreviewDialog({
  open,
  onClose,
  onPrint,
  labels,
  pdfUrl,
}: LabelPreviewDialogProps) {
  // Grouper par Raw Material / Varnish Code
  const grouped = labels.reduce((acc, label) => {
    const key = `${label.rawMaterial}_${label.varnishCode}`
    if (!acc[key]) {
      acc[key] = {
        rawMaterial: label.rawMaterial,
        varnishCode: label.varnishCode,
        count: 0,
      }
    }
    acc[key].count++
    return acc
  }, {} as Record<string, { rawMaterial: string; varnishCode: string; count: number }>)

  const groups = Object.values(grouped)

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">📄 Aperçu des étiquettes</DialogTitle>
          <DialogDescription>
            Vérifiez les étiquettes avant impression
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6">
          {/* Statistiques */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="text-amber-600 text-sm font-medium">Total étiquettes</div>
              <div className="text-2xl font-bold text-amber-900 mt-1">{labels.length}</div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="text-orange-600 text-sm font-medium">Groupes</div>
              <div className="text-2xl font-bold text-orange-900 mt-1">{groups.length}</div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-yellow-600 text-sm font-medium">Pages PDF</div>
              <div className="text-2xl font-bold text-yellow-900 mt-1">{groups.length}</div>
              <div className="text-xs text-yellow-600 mt-1">1 page / groupe</div>
            </div>
          </div>

          {/* Groupements */}
          <div>
            <h3 className="font-semibold text-lg mb-4">🗂️ Groupements par matériau & vernis</h3>
            <div className="space-y-3">
              {groups.map((group, index) => (
                <div
                  key={`${group.rawMaterial}_${group.varnishCode}`}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📄</span>
                        <div>
                          <div className="font-medium text-gray-900">
                            Page {index + 1}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">Matériau:</span> {group.rawMaterial}
                            {' · '}
                            <span className="font-medium">Vernis:</span> {group.varnishCode}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center px-3 py-1 bg-amber-100 border border-amber-300 rounded-full">
                        <span className="text-amber-900 font-medium">
                          {group.count} étiquette{group.count > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview PDF */}
          <div>
            <h3 className="font-semibold text-lg mb-4">👁️ Aperçu du document</h3>
            {pdfUrl ? (
              <div className="bg-gray-100 border-2 border-gray-300 rounded-lg overflow-hidden">
                <iframe
                  src={`data:application/pdf;base64,${pdfUrl}`}
                  className="w-full h-[500px]"
                  title="Aperçu PDF"
                />
              </div>
            ) : (
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <span className="text-6xl mb-4 block">📋</span>
                <p className="text-gray-600 font-medium">
                  Génération du PDF en cours...
                </p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="border-t pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="mr-2"
          >
            Annuler
          </Button>
          <Button
            onClick={onPrint}
            className="bg-amber-600 hover:bg-amber-500"
          >
            🖨️ Imprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
