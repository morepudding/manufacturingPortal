/**
 * API Route - GET /api/shared/languages
 * 
 * Récupération de la liste des langues disponibles via IFS
 */

import { NextRequest, NextResponse } from 'next/server'
import { getIFSClient } from '@/shared/services/ifs-client'

interface IFSLanguage {
  LangCode: string
  LangCodeRfc3066: string
  Description: string
}

interface IFSODataResponse {
  value: IFSLanguage[]
}

export async function GET(request: NextRequest) {
  console.log('🌐 [API] GET /api/shared/languages')

  try {
    const client = getIFSClient()

    const response = await client.get<IFSODataResponse>(
      'PrintDialog.svc/LanguageCodeSet'
    )

    console.log(`✅ ${response.value.length} langues trouvées`)

    return NextResponse.json({
      success: true,
      languages: response.value
    })

  } catch (error) {
    console.error('❌ [API] Erreur récupération langues:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
