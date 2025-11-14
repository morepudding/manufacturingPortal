'use client'

/**
 * Modal de progression d'impression batch
 * 
 * Affiche une barre de progression en temps réel lors de l'impression
 * de plusieurs Shop Orders en parallèle.
 */

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/components/molecules/Dialog'
import { Progress } from '@/shared/components/atoms/Progress'
import { Button } from '@/shared/components/atoms/Button'
import { CheckCircle2, XCircle, Loader2, Clock, Printer } from 'lucide-react'
import type { PrintBatchProgress, PrintBatchResult } from '@/shared/types/print-progress'

interface PrintProgressModalProps {
  /** Modal ouvert */
  open: boolean
  /** Callback fermeture */
  onClose: () => void
  /** Shop Orders à imprimer */
  shopOrders: Array<{
    orderNo: string
    releaseNo?: string
    sequenceNo?: string
  }>
  /** Imprimante */
  printer: string
  /** Layout optionnel */
  printModel?: string
  /** Parallélisme */
  parallelism?: number
}

export function PrintProgressModal({
  open,
  onClose,
  shopOrders,
  printer,
  printModel,
  parallelism = 10
}: PrintProgressModalProps) {
  const [progress, setProgress] = useState<PrintBatchProgress>({
    currentBatch: 0,
    totalBatches: 0,
    printedOrders: 0,
    totalOrders: shopOrders.length,
    progressPercent: 0,
    status: 'starting',
    message: 'Initialisation...',
    elapsedTime: 0
  })

  const [result, setResult] = useState<PrintBatchResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Démarrer l'impression quand le modal s'ouvre
  useEffect(() => {
    if (!open) return

    // Reset state
    setProgress({
      currentBatch: 0,
      totalBatches: 0,
      printedOrders: 0,
      totalOrders: shopOrders.length,
      progressPercent: 0,
      status: 'starting',
      message: 'Initialisation...',
      elapsedTime: 0
    })
    setResult(null)
    setError(null)

    // Démarrer le stream SSE
    const eventSource = new EventSource(
      `/api/part-printer/labels/print-batch-stream?${new URLSearchParams({
        shopOrders: JSON.stringify(shopOrders),
        printer,
        printModel: printModel || 'BEN_MA_FO_CR_184.rdl',
        parallelism: parallelism.toString()
      })}`
    )

    // Alternative: utiliser fetch avec POST
    startPrintStream()

    async function startPrintStream() {
      try {
        const response = await fetch('/api/part-printer/labels/print-batch-stream', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            shopOrders,
            printer,
            printModel,
            parallelism
          })
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const reader = response.body?.getReader()
        const decoder = new TextDecoder()

        if (!reader) {
          throw new Error('No response body')
        }

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (line.startsWith('event: ')) {
              const event = line.substring(7).trim()
              continue
            }

            if (line.startsWith('data: ')) {
              const data = line.substring(6)
              
              try {
                const parsed = JSON.parse(data)

                // Déterminer le type d'event
                if (parsed.status) {
                  // Event progress
                  setProgress(parsed as PrintBatchProgress)
                } else if (parsed.totalOrders !== undefined) {
                  // Event complete
                  setResult(parsed as PrintBatchResult)
                  setProgress(prev => ({ ...prev, status: 'completed' }))
                } else if (parsed.error) {
                  // Event error
                  setError(parsed.error)
                  setProgress(prev => ({ ...prev, status: 'error' }))
                }
              } catch (e) {
                console.error('Failed to parse SSE data:', e)
              }
            }
          }
        }
      } catch (err) {
        console.error('Stream error:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        setProgress(prev => ({ ...prev, status: 'error' }))
      }
    }

    return () => {
      // Cleanup
    }
  }, [open, shopOrders, printer, printModel, parallelism])

  const isCompleted = progress.status === 'completed'
  const hasError = progress.status === 'error'
  const isProcessing = progress.status === 'processing' || progress.status === 'starting'

  const formatTime = (seconds: number | undefined) => {
    if (seconds === undefined) return '-'
    if (seconds < 60) return `${seconds.toFixed(1)}s`
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}m ${secs}s`
  }

  const speed = result 
    ? (result.successCount / result.totalTime).toFixed(1)
    : progress.elapsedTime && progress.printedOrders > 0
      ? (progress.printedOrders / progress.elapsedTime).toFixed(1)
      : '0'

  return (
    <Dialog open={open} onOpenChange={(isOpen: boolean) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isProcessing && <Loader2 className="h-5 w-5 animate-spin text-blue-500" />}
            {isCompleted && <CheckCircle2 className="h-5 w-5 text-green-500" />}
            {hasError && <XCircle className="h-5 w-5 text-red-500" />}
            
            {isProcessing && 'Impression en cours...'}
            {isCompleted && 'Impression terminée'}
            {hasError && 'Erreur d\'impression'}
          </DialogTitle>
          <DialogDescription>
            {printer}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Barre de progression */}
          {!hasError && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{progress.message}</span>
                <span className="font-medium">{progress.progressPercent}%</span>
              </div>
              <Progress value={progress.progressPercent} className="h-2" />
            </div>
          )}

          {/* Stats temps réel */}
          {isProcessing && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Lots traités</div>
                <div className="text-2xl font-bold">{progress.currentBatch}/{progress.totalBatches}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Shop Orders</div>
                <div className="text-2xl font-bold">{progress.printedOrders}/{progress.totalOrders}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Temps écoulé
                </div>
                <div className="text-lg font-medium">{formatTime(progress.elapsedTime)}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Printer className="h-3 w-3" />
                  Vitesse
                </div>
                <div className="text-lg font-medium">{speed} SO/s</div>
              </div>
            </div>
          )}

          {/* Résumé final */}
          {isCompleted && result && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-semibold">
                    {result.successCount} Shop Order{result.successCount > 1 ? 's' : ''} imprimé{result.successCount > 1 ? 's' : ''} avec succès
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Réussis</div>
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                      {result.successCount}
                    </div>
                  </div>
                  {result.failureCount > 0 && (
                    <div>
                      <div className="text-muted-foreground">Échecs</div>
                      <div className="text-lg font-bold text-red-600 dark:text-red-400">
                        {result.failureCount}
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="text-muted-foreground">Durée</div>
                    <div className="text-lg font-bold">{formatTime(result.totalTime)}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Vitesse</div>
                    <div className="text-lg font-bold">{speed} SO/s</div>
                  </div>
                </div>

                {result.errors && result.errors.length > 0 && (
                  <div className="mt-3 space-y-1">
                    <div className="text-sm font-medium text-red-700 dark:text-red-400">
                      Erreurs ({result.errors.length}):
                    </div>
                    <div className="max-h-32 overflow-y-auto space-y-1">
                      {result.errors.map((err, idx) => (
                        <div key={idx} className="text-xs text-red-600 dark:text-red-400">
                          • Order {err.orderNo}: {err.error}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Erreur */}
          {hasError && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
              <div className="flex items-start gap-2 text-red-700 dark:text-red-400">
                <XCircle className="h-5 w-5 mt-0.5" />
                <div>
                  <div className="font-semibold mb-1">Erreur lors de l'impression</div>
                  <div className="text-sm">{error || 'Une erreur inconnue s\'est produite'}</div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2">
            {isProcessing && (
              <Button variant="outline" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                En cours...
              </Button>
            )}
            
            {(isCompleted || hasError) && (
              <Button onClick={onClose}>
                Fermer
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
