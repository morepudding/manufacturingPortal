/**
 * API Route - GET /api/shared/printers
 * 
 * Récupération de la liste des imprimantes disponibles via IFS
 */

import { NextRequest, NextResponse } from 'next/server'
import { getIFSClient } from '@/shared/services/ifs-client'

interface IFSPrinter {
  LogicalPrinter: string
  Description: string
  PhysicalPrinter: string
}

interface IFSODataResponse {
  value: IFSPrinter[]
}

export async function GET(request: NextRequest) {
  console.log('🖨️ [API] GET /api/shared/printers')

  try {
    const client = getIFSClient()

    const response = await client.get<IFSODataResponse>(
      'PrintDialog.svc/LogicalPrinterSet'
    )

    console.log(`✅ ${response.value.length} imprimantes trouvées`)

    return NextResponse.json({
      success: true,
      printers: response.value
    })

  } catch (error) {
    console.error('❌ [API] Erreur récupération imprimantes:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
