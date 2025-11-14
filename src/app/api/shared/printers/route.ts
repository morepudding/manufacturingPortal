/**
 * API Route - GET /api/shared/printers
 * 
 * Phase 2 Jour 2 - Validation PP_W003 (NO_PRINTERS)
 * 
 * Récupération de la liste des imprimantes disponibles via IFS
 * 
 * ⚠️ Si aucune imprimante trouvée: WARNING (force mode "List only")
 */

import { NextRequest, NextResponse } from 'next/server'
import { getIFSClient } from '@/shared/services/ifs-client'
import { getErrorService } from '@/tools/part-printer/services/error-service'
import { ErrorCode } from '@/tools/part-printer/types/error'

interface IFSPrinter {
  PrinterId: string      // ✅ Nom correct du champ IFS (pas LogicalPrinter)
  Description: string
  // Note: PhysicalPrinter n'existe pas dans LogicalPrinterSet
}

interface IFSODataResponse {
  value: IFSPrinter[]
}

export async function GET(request: NextRequest) {
  const errorService = getErrorService()
  
  console.log('🖨️ [API] GET /api/shared/printers')

  try {
    const client = getIFSClient()

    // ✅ Utiliser LogicalPrintersHandling (configuré dans Azure APIM)
    const response = await client.get<IFSODataResponse>(
      'LogicalPrintersHandling.svc/LogicalPrinterSet'
    )

    // ⚠️ PP_W003: Aucune imprimante trouvée (WARNING)
    if (!response.value || response.value.length === 0) {
      const warning = errorService.createError(ErrorCode.NO_PRINTERS)
      errorService.handleError(warning)

      console.log('⚠️ [API] PP_W003: Aucune imprimante disponible - Force mode "List only"')

      return NextResponse.json({
        success: true,
        printers: [],
        warning: {
          code: warning.code,
          message: warning.message,
          severity: warning.severity,
          action: warning.action,
        },
      })
    }

    console.log(`✅ ${response.value.length} imprimantes trouvées`)

    return NextResponse.json({
      success: true,
      printers: response.value
    })

  } catch (error) {
    console.error('❌ [API] Erreur récupération imprimantes:', error)
    
    // Erreur technique - traiter comme PP_W003
    const warning = errorService.createError(
      ErrorCode.NO_PRINTERS,
      { technical: error instanceof Error ? error.message : 'Unknown error' }
    )
    errorService.handleError(warning)

    return NextResponse.json(
      {
        success: true,
        printers: [],
        warning: {
          code: warning.code,
          message: warning.message,
          severity: warning.severity,
          action: warning.action,
          details: warning.details,
        },
      },
      { status: 200 } // ⚠️ WARNING = 200 (continue)
    )
  }
}
