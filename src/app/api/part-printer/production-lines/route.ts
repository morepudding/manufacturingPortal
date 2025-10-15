/**
 * API Route: GET /api/part-printer/production-lines
 * 
 * Récupère les lignes de production pour un site donné
 * 
 * Phase 2.1 - Interface de filtrage
 * 
 * Query Parameters:
 * - site: Code du site/contract (required)
 * 
 * @returns Liste des lignes de production filtrées par site
 */

import { NextRequest, NextResponse } from 'next/server'
import { 
  getProductionLinesBySite, 
  getAllProductionLines 
} from '@/tools/part-printer/services/production-line-service'

export async function GET(request: NextRequest) {
  console.log('📡 [API] GET /api/part-printer/production-lines')

  try {
    // Récupérer le paramètre site depuis l'URL
    const searchParams = request.nextUrl.searchParams
    const site = searchParams.get('site')

    if (!site) {
      console.log('⚠️ [API] Paramètre site manquant, récupération de toutes les lignes')
      
      const result = await getAllProductionLines()

      return NextResponse.json({
        success: true,
        data: result,
      })
    }

    console.log(`🔍 [API] Récupération lignes pour site: ${site}`)

    const result = await getProductionLinesBySite(site)

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
