/**
 * Part Printer API - Sites (Contracts)
 * 
 * GET /api/part-printer/sites
 * 
 * Récupère la liste des sites (contracts) disponibles depuis IFS.
 * Ces sites sont nécessaires pour filtrer les Shop Orders.
 * 
 * @returns Liste des sites ou erreur PP_E001 si aucun site trouvé
 */

import { NextRequest, NextResponse } from 'next/server'
import { getSites } from '@/tools/part-printer/services/site-service'
import { getErrorService } from '@/tools/part-printer/services/error-service'
import { ErrorCode } from '@/tools/part-printer/types/error'

/**
 * GET /api/part-printer/sites
 * 
 * Récupère tous les sites (contracts) disponibles
 * 
 * @returns {
 *   success: true,
 *   data: Array<{ Contract: string, Name: string, Description: string }>
 * }
 * 
 * @throws PP_E001 si aucun site n'est trouvé (BLOQUANT)
 */
export async function GET(request: NextRequest) {
  const errorService = getErrorService()
  
  try {
    console.log('🔍 [API] GET /api/part-printer/sites - Récupération des sites')

    // Utiliser le service existant
    const sitesResponse = await getSites()

    console.log(`📊 [API] ${sitesResponse.count} sites récupérés depuis IFS`)

    // ❌ PP_E001: Aucun site trouvé (BLOQUANT)
    if (!sitesResponse.sites || sitesResponse.sites.length === 0) {
      const error = errorService.createError(ErrorCode.NO_SITES)
      errorService.handleError(error)

      console.error('❌ [API] Aucun site (contract) disponible dans IFS')

      return NextResponse.json(
        {
          success: false,
          error: {
            code: error.code,
            message: error.message,
            severity: error.severity,
            action: error.action,
            timestamp: error.timestamp,
          },
        },
        { status: 404 }
      )
    }

    console.log('✅ [API] Sites récupérés avec succès:', sitesResponse.sites.map(s => s.Contract).join(', '))

    return NextResponse.json({
      success: true,
      data: sitesResponse.sites,
      count: sitesResponse.count,
    })

  } catch (error) {
    console.error('❌ [API] Erreur lors de la récupération des sites:', error)

    // Créer une erreur technique générique avec PP_E001
    const ppError = errorService.createError(
      ErrorCode.NO_SITES,
      { 
        technical: error instanceof Error ? error.message : 'Unknown error' 
      }
    )
    errorService.handleError(ppError)

    return NextResponse.json(
      {
        success: false,
        error: {
          code: ppError.code,
          message: ppError.message,
          severity: ppError.severity,
          action: ppError.action,
          details: ppError.details,
          timestamp: ppError.timestamp,
        },
      },
      { status: 500 }
    )
  }
}
