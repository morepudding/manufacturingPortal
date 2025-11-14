/**
 * Types pour le suivi de progression d'impression batch
 */

export interface PrintBatchProgress {
  /** Numéro du lot actuel */
  currentBatch: number
  /** Nombre total de lots */
  totalBatches: number
  /** Nombre de Shop Orders imprimés */
  printedOrders: number
  /** Nombre total de Shop Orders */
  totalOrders: number
  /** Pourcentage de progression (0-100) */
  progressPercent: number
  /** Statut actuel */
  status: 'starting' | 'processing' | 'completed' | 'error'
  /** Message actuel */
  message: string
  /** Temps écoulé en secondes */
  elapsedTime?: number
}

export interface PrintBatchResult {
  /** Nombre total de Shop Orders traités */
  totalOrders: number
  /** Nombre d'impressions réussies */
  successCount: number
  /** Nombre d'échecs */
  failureCount: number
  /** Temps total d'exécution en secondes */
  totalTime: number
  /** Erreurs rencontrées */
  errors?: Array<{
    orderNo: string
    error: string
  }>
}

export interface PrintBatchStats {
  /** Nombre de lots traités */
  batchesProcessed: number
  /** Nombre total de lots */
  totalBatches: number
  /** Nombre de Shop Orders imprimés */
  ordersPrinted: number
  /** Nombre total de Shop Orders */
  totalOrders: number
  /** Temps écoulé */
  elapsedTime: number
  /** Vitesse d'impression (orders/seconde) */
  speed: number
}
