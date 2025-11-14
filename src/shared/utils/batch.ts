/**
 * Utilitaires de batching
 * 
 * Fonctions pour découper des tableaux en lots (batches)
 * et les traiter séquentiellement avec progression.
 */

/**
 * Découpe un tableau en lots de taille fixe
 * 
 * @param items Tableau à découper
 * @param batchSize Taille de chaque lot
 * @returns Tableau de lots
 * 
 * @example
 * createBatches([1, 2, 3, 4, 5], 2)
 * // → [[1, 2], [3, 4], [5]]
 */
export function createBatches<T>(items: T[], batchSize: number): T[][] {
  const batches: T[][] = []
  
  for (let i = 0; i < items.length; i += batchSize) {
    batches.push(items.slice(i, i + batchSize))
  }
  
  return batches
}

/**
 * Callback de progression pour le traitement par lots
 */
export interface BatchProgressCallback {
  (current: number, total: number, currentBatch: number, totalBatches: number): void | Promise<void>
}

/**
 * Traite un tableau par lots avec callback de progression
 * 
 * @param items Tableau à traiter
 * @param batchSize Taille de chaque lot
 * @param processor Fonction de traitement pour chaque lot
 * @param onProgress Callback de progression optionnel
 * @returns Résultats de tous les lots
 * 
 * @example
 * await processBatches(
 *   shopOrders,
 *   5,
 *   async (batch) => await printLabels(batch),
 *   (current, total) => console.log(`${current}/${total}`)
 * )
 */
export async function processBatches<T, R>(
  items: T[],
  batchSize: number,
  processor: (batch: T[], batchIndex: number) => Promise<R>,
  onProgress?: BatchProgressCallback
): Promise<R[]> {
  const batches = createBatches(items, batchSize)
  const results: R[] = []
  
  let processedCount = 0
  
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i]
    
    // Traiter le lot
    const result = await processor(batch, i)
    results.push(result)
    
    // Mettre à jour le compteur
    processedCount += batch.length
    
    // Callback de progression
    if (onProgress) {
      await onProgress(processedCount, items.length, i + 1, batches.length)
    }
  }
  
  return results
}

/**
 * Informations sur un batch
 */
export interface BatchInfo {
  batchNumber: number
  totalBatches: number
  batchSize: number
  itemsInBatch: number
  processedItems: number
  totalItems: number
  progressPercent: number
}

/**
 * Calcule les informations de progression d'un batch
 */
export function calculateBatchProgress(
  currentBatch: number,
  totalBatches: number,
  batchSize: number,
  totalItems: number
): BatchInfo {
  const processedItems = Math.min((currentBatch - 1) * batchSize + batchSize, totalItems)
  const itemsInBatch = currentBatch === totalBatches 
    ? totalItems - (totalBatches - 1) * batchSize 
    : batchSize
  const progressPercent = Math.round((processedItems / totalItems) * 100)
  
  return {
    batchNumber: currentBatch,
    totalBatches,
    batchSize,
    itemsInBatch,
    processedItems,
    totalItems,
    progressPercent
  }
}
