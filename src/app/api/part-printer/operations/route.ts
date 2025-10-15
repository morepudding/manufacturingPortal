/**
 * API Route - GET /api/part-printer/operations
 * 
 * Phase 3.1 - Extraction Operation 10
 * 
 * Récupère les données de l'opération 10 d'un Shop Order :
 * - Block ID
 * - Raw Material (première ligne de composant liée à OP10)
 */

import { NextRequest, NextResponse } from 'next/server'
import { getOperation10Data } from '@/tools/part-printer/services/operation-service'

/**
 * GET /api/part-printer/operations
 * 
 * Query params:
 * - orderNo: Order number (required)
 * - releaseNo: Release number (required)
 * - sequenceNo: Sequence number (required)
 * 
 * Response:
 * {
 *   success: true,
 *   data: {
 *     operationNo: 10,
 *     blockId: "B25",
 *     rawMaterial: "OAK_RAW_001"
 *   }
 * }
 */
export async function GET(request: NextRequest) {
  console.log('📥 [API] GET /api/part-printer/operations')

  try {
    // 1. Récupérer les paramètres
    const { searchParams } = new URL(request.url)
    const orderNo = searchParams.get('orderNo')
    const releaseNo = searchParams.get('releaseNo')
    const sequenceNo = searchParams.get('sequenceNo')

    // 2. Validation
    if (!orderNo || !releaseNo || !sequenceNo) {
      console.log('❌ [API] Paramètres manquants')
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required parameters: orderNo, releaseNo, sequenceNo'
        },
        { status: 400 }
      )
    }

    console.log(`🔍 [API] Shop Order: ${orderNo}-${releaseNo}-${sequenceNo}`)

    // 3. Récupérer Operation 10
    const operation10 = await getOperation10Data(orderNo, releaseNo, sequenceNo)

    console.log(`✅ [API] Operation 10 récupérée:`, operation10)

    return NextResponse.json({
      success: true,
      data: operation10
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
