/**
 * API Route - GET /api/part-printer/ranges
 * 
 * Phase 3.3 - Extraction Range ID
 * 
 * Récupère le Range ID pour un site et une date donnée
 * Logique: StartDate <= date <= EndDate
 */

import { NextRequest, NextResponse } from 'next/server'
import { getRangeId } from '@/tools/part-printer/services/range-service'

/**
 * GET /api/part-printer/ranges
 * 
 * Query params:
 * - site: Site code (required, ex: "BDR")
 * - date: Date ISO (required, ex: "2025-10-13")
 * 
 * Response:
 * {
 *   success: true,
 *   data: {
 *     rangeId: "285 A",
 *     site: "BDR",
 *     date: "2025-10-13"
 *   }
 * }
 */
export async function GET(request: NextRequest) {
  console.log('📥 [API] GET /api/part-printer/ranges')

  try {
    // 1. Récupérer les paramètres
    const { searchParams } = new URL(request.url)
    const site = searchParams.get('site')
    const date = searchParams.get('date')

    // 2. Validation
    if (!site || !date) {
      console.log('❌ [API] Paramètres manquants')
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required parameters: site, date'
        },
        { status: 400 }
      )
    }

    // Validation format date ISO
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      console.log('❌ [API] Format de date invalide')
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid date format. Expected YYYY-MM-DD'
        },
        { status: 400 }
      )
    }

    console.log(`🔍 [API] Site: ${site}, Date: ${date}`)

    // 3. Récupérer Range ID
    const rangeId = await getRangeId(site, date)

    if (!rangeId) {
      console.log(`⚠️ [API] Aucun Range trouvé pour ${site} à ${date}`)
      return NextResponse.json(
        {
          success: false,
          error: `No range found for site ${site} at date ${date}`
        },
        { status: 404 }
      )
    }

    console.log(`✅ [API] Range ID trouvé: ${rangeId}`)

    return NextResponse.json({
      success: true,
      data: {
        rangeId,
        site,
        date
      }
    })
  } catch (error) {
    console.error('❌ [API] Error:', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
