/**
 * API Route: GET /api/printers
 * 
 * Récupère la liste des imprimantes disponibles depuis IFS Cloud
 * 
 * @returns {IFSPrinter[]} Liste des imprimantes
 * @returns {error} Message d'erreur en cas d'échec
 */

import { NextResponse } from 'next/server'
import { getPrinters } from '@/shared/services/printer-service'

export async function GET() {
  console.log('🔍 API Request: GET /api/printers')
  
  try {
    // Récupération de la liste des imprimantes
    const printers = await getPrinters()
    
    console.log(`✅ Successfully fetched ${printers.length} printer(s)`)
    
    return NextResponse.json({
      success: true,
      data: printers,
      count: printers.length,
    })
  } catch (error) {
    console.error('❌ API Error: Failed to fetch printers', error)
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch printers',
      },
      { status: 500 }
    )
  }
}
