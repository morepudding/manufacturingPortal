/**
 * API Route - POST /api/boat-configuration/print
 * 
 * Impression Customer Order via IFS Cloud avec le bon layout
 * 
 * CONFIGURATION PRODUCTION - Testé et validé :
 * - Report ID: CUSTOMER_ORDER_CONF_REP
 * - Layout: BEN_Inventory-BAT.rdl (layout par défaut IFS avec contenu)
 */

import { NextRequest, NextResponse } from 'next/server'
import { getIFSClient } from '@/shared/services/ifs-client'

interface PrintRequest {
  orderNo: string
  reportId: string
  printerId: string
  languageCode: string
  layoutName?: string
  copies?: number
  downloadPdf?: boolean
}

interface CustomerOrderResponse {
  '@odata.etag': string
  OrderNo: string
  [key: string]: unknown
}

interface PrintResultKeyResponse {
  value: string
}

interface PrintDialogInitResponse {
  ResultKey: number
  ReportTitle: string
  LayoutName: string
  [key: string]: unknown
}

interface PdfArchiveInfo {
  ResultKey: number
  Id: string
  FileName: string
  PdfSize: number
  LayoutName: string
  LangCode: string
  Created: string
}

interface PdfArchiveResponse {
  value: PdfArchiveInfo[]
}

export async function POST(request: NextRequest) {
  console.log('🖨️ [API] POST /api/boat-configuration/print')

  try {
    const body: PrintRequest = await request.json()

    // Validation
    if (!body.orderNo) {
      return NextResponse.json({ error: 'Missing orderNo' }, { status: 400 })
    }
    if (!body.reportId) {
      return NextResponse.json({ error: 'Missing reportId' }, { status: 400 })
    }
    if (!body.printerId) {
      return NextResponse.json({ error: 'Missing printerId' }, { status: 400 })
    }
    if (!body.languageCode) {
      return NextResponse.json({ error: 'Missing languageCode' }, { status: 400 })
    }

    // 🔥 CONFIGURATION PRODUCTION - Layout validé
    const layoutName = body.layoutName || 'BEN_Inventory-BAT.rdl'

    console.log('📋 Configuration impression:')
    console.log(`   Order No: ${body.orderNo}`)
    console.log(`   Report ID: ${body.reportId}`)
    console.log(`   Layout: ${layoutName}`)
    console.log(`   Printer: ${body.printerId}`)
    console.log(`   Language: ${body.languageCode}`)
    console.log(`   Download PDF: ${body.downloadPdf ? 'Oui' : 'Non'}`)

    const client = getIFSClient()

    // ===== ÉTAPE 1 : Récupérer Customer Order + ETag =====
    console.log('\n📥 ÉTAPE 1: Récupération Customer Order + ETag')
    const orderResponse = await client.get<CustomerOrderResponse>(
      `CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${body.orderNo}')`
    )
    const etag = orderResponse['@odata.etag']
    console.log(`✅ ETag récupéré: ${etag}`)

    // ===== ÉTAPE 2 : PrintResultKey =====
    console.log('\n🔑 ÉTAPE 2: Génération PrintResultKey')
    const resultKeyResponse = await client.post<PrintResultKeyResponse>(
      `CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${body.orderNo}')/IfsApp.CustomerOrderHandling.CustomerOrder_PrintResultKey`,
      { ReportId: body.reportId },
      { 'If-Match': etag }
    )
    const resultKey = parseInt(resultKeyResponse.value)
    console.log(`✅ ResultKey généré: ${resultKey}`)

    // ===== ÉTAPE 3 : PrintDialogInit =====
    console.log('\n📋 ÉTAPE 3: Initialisation PrintDialog')
    const dialogResponse = await client.post<PrintDialogInitResponse>(
      'PrintDialog.svc/PrintDialogInit',
      { ResultKey: resultKey }
    )
    console.log(`✅ Dialog initialisé:`)
    console.log(`   - Report Title: ${dialogResponse.ReportTitle}`)
    console.log(`   - Layout (défaut IFS): ${dialogResponse.LayoutName}`)

    // ===== ÉTAPE 4 : ReportPrintRequest =====
    console.log('\n🖨️ ÉTAPE 4: Envoi ReportPrintRequest')
    await client.post(
      'PrintDialog.svc/ReportPrintRequest',
      {
        ResultKey: dialogResponse.ResultKey,
        LayoutName: layoutName, // ✅ Utiliser le layout spécifié (BEN_Inventory-BAT.rdl)
        LanguageCode: body.languageCode,
        LogicalPrinter: body.printerId,
        Copies: body.copies || 1
      }
    )
    console.log(`✅ Impression envoyée à ${body.printerId}`)

    // ===== ÉTAPE 5 (Optionnelle) : Télécharger le PDF =====
    if (body.downloadPdf) {
      console.log('\n📄 ÉTAPE 5: Téléchargement PDF')
      console.log('⏳ Attente de la génération du PDF...')

      let pdfInfo: PdfArchiveInfo | null = null
      let pdfBlob: Buffer | null = null

      // Attendre que le PDF soit généré (max 30 secondes)
      for (let attempt = 0; attempt < 30; attempt++) {
        await new Promise(resolve => setTimeout(resolve, 1000))

        try {
          const archiveResponse = await client.get<PdfArchiveResponse>(
            `PrintDialog.svc/PdfArchiveSet?$filter=ResultKey eq ${resultKey}`
          )

          if (archiveResponse.value && archiveResponse.value.length > 0) {
            pdfInfo = archiveResponse.value[0]
            console.log(`✅ PDF trouvé après ${attempt + 1} secondes:`)
            console.log(`   - FileName: ${pdfInfo.FileName}`)
            console.log(`   - Size: ${(pdfInfo.PdfSize / 1024).toFixed(2)} KB`)

            // Télécharger le PDF
            const pdfResponse = await client.getRaw(
              `PrintDialog.svc/PdfArchiveSet(ResultKey=${pdfInfo.ResultKey},Id='${pdfInfo.Id}')/Pdf`
            )

            pdfBlob = Buffer.from(pdfResponse)
            console.log(`✅ PDF téléchargé: ${pdfBlob.length} bytes`)
            break
          }
        } catch (err) {
          // PDF pas encore prêt, continuer d'attendre
          if (attempt < 29) {
            console.log(`⏳ Tentative ${attempt + 1}/30...`)
          }
        }
      }

      if (!pdfBlob) {
        console.warn('⚠️ PDF non disponible après 30 secondes')
        return NextResponse.json(
          { error: 'PDF generation timeout' },
          { status: 408 }
        )
      }

      // Retourner le PDF
      const filename = pdfInfo?.FileName || `order-${body.orderNo}.pdf`
      
      return new NextResponse(new Uint8Array(pdfBlob), {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${filename}"`,
          'Content-Length': pdfBlob.length.toString(),
        },
      })
    }

    // Impression simple (sans téléchargement PDF)
    return NextResponse.json({
      success: true,
      resultKey: resultKey,
      reportTitle: dialogResponse.ReportTitle,
      layoutName: layoutName,
    })

  } catch (error) {
    console.error('❌ [API] Erreur impression:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
