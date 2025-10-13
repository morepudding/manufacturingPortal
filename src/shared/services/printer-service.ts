/**
 * Service de gestion des imprimantes IFS Cloud
 * 
 * Récupère la liste des imprimantes disponibles depuis PrintDialog.svc
 * 
 * @module printer-service
 */

import { getIFSClient } from './ifs-client'
import { IFSODataResponse, IFSPrinter } from '@/shared/types/ifs'

/**
 * Service pour récupérer les imprimantes depuis IFS Cloud
 */

/**
 * Récupère la liste des imprimantes disponibles depuis IFS Cloud
 * @returns Liste des imprimantes
 */
export async function getPrinters(): Promise<IFSPrinter[]> {
  console.log('🖨️  Fetching printers from IFS Cloud...')
  
  try {
    const client = getIFSClient()
    
    // Récupérer la liste des imprimantes depuis IFS PrintDialog service
    const response = await client.get<IFSODataResponse<IFSPrinter>>(
      'PrintDialog.svc/LogicalPrinterSet',
      {
        $select: 'PrinterId,Description',
        $top: '100',
      }
    )
    
    console.log(`✅ Found ${response.value.length} printer(s)`)
    
    return response.value
  } catch (error) {
    console.error('❌ Error fetching printers:', error)
    throw new Error('Failed to fetch printers from IFS Cloud')
  }
}

/**
 * Récupère une imprimante spécifique par son ID
 * 
 * @param printerId - ID de l'imprimante
 * @returns Promise<IFSPrinter | null> - Imprimante trouvée ou null
 * 
 * @example
 * const printer = await getPrinterById("PRINTER01")
 */
export async function getPrinterById(printerId: string): Promise<IFSPrinter | null> {
  console.log(`🖨️  Fetching printer: ${printerId}`)
  
  try {
    const printers = await getPrinters()
    const printer = printers.find(p => p.PrinterId === printerId)
    
    if (printer) {
      console.log(`✅ Printer found: ${printer.PrinterId} - ${printer.Description}`)
    } else {
      console.log(`❌ Printer not found: ${printerId}`)
    }
    
    return printer || null
  } catch (error) {
    console.error('❌ Error fetching printer by ID:', error)
    return null
  }
}
