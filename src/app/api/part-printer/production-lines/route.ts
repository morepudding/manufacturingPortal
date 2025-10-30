/**
 * API Route: GET /api/part-printer/production-lines
 * 
 * Phase 2 Jour 2 - Validation PP_W002 (NO_PRODUCTION_LINES)
 * 
 * Récupère les lignes de production pour un site donné
 * 
 * Query Parameters:
 * - site: Code du site/contract (required)
 * 
 * ⚠️ Si aucune ligne trouvée: WARNING (continue sans filtre ligne)
 * 
 * @returns Liste des lignes de production filtrées par site
 */

import { NextRequest, NextResponse } from 'next/server'
import { 
  getProductionLinesBySite, 
  getAllProductionLines 
} from '@/tools/part-printer/services/production-line-service'
import { getErrorService } from '@/tools/part-printer/services/error-service'
import { ErrorCode } from '@/tools/part-printer/types/error'

export async function GET(request: NextRequest) {
  const errorService = getErrorService()
  
  console.log('📡 [API] GET /api/part-printer/production-lines')

  try {
    // Récupérer le paramètre site depuis l'URL
    const searchParams = request.nextUrl.searchParams
    const site = searchParams.get('site')

    if (!site) {
      console.log('⚠️ [API] Paramètre site manquant, récupération de toutes les lignes')
      
      const result = await getAllProductionLines()

      // ⚠️ PP_W002: Aucune ligne de production (WARNING)
      if (!result.productionLines || result.productionLines.length === 0) {
        const warning = errorService.createError(
          ErrorCode.NO_PRODUCTION_LINES,
          { site: 'all' }
        )
        errorService.handleError(warning)

        console.log('⚠️ [API] PP_W002: Aucune ligne de production trouvée - Continue sans filtre')

        return NextResponse.json({
          success: true,
          data: { productionLines: [], count: 0 },
          warning: {
            code: warning.code,
            message: warning.message,
            severity: warning.severity,
            action: warning.action,
          },
        })
      }

      return NextResponse.json({
        success: true,
        data: result,
      })
    }

    console.log(`🔍 [API] Récupération lignes pour site: ${site}`)

    const result = await getProductionLinesBySite(site)

    // ⚠️ PP_W002: Aucune ligne de production pour ce site (WARNING)
    if (!result.productionLines || result.productionLines.length === 0) {
      const warning = errorService.createError(
        ErrorCode.NO_PRODUCTION_LINES,
        { site }
      )
      errorService.handleError(warning)

      console.log(`⚠️ [API] PP_W002: Aucune ligne de production pour ${site} - Continue sans filtre`)

      return NextResponse.json({
        success: true,
        data: { productionLines: [], count: 0 },
        warning: {
          code: warning.code,
          message: warning.message,
          severity: warning.severity,
          action: warning.action,
        },
      })
    }

    console.log(`✅ [API] ${result.count} lignes trouvées pour ${site}`)

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error('❌ [API] Erreur récupération lignes de production:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch production lines',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
