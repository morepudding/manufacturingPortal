/**
 * API Route: GET /api/shared/sites
 * 
 * Récupère la liste des sites/contracts IFS disponibles
 * 
 * Phase 2.1 - Interface de filtrage
 * 
 * @returns Liste des sites avec leurs informations
 */

import { NextResponse } from 'next/server'
import { getSites } from '@/tools/part-printer/services/site-service'

export async function GET() {
  console.log('📡 [API] GET /api/shared/sites')

  try {
    const result = await getSites()

    console.log(`✅ [API] ${result.count} sites récupérés`)

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error('❌ [API] Erreur récupération sites:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch sites',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
