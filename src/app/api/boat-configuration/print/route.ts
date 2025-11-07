/**
 * API Route - POST /api/boat-configuration/print
 * 
 * Impression Customer Order via IFS Cloud avec le bon layout
 * 
 * CONFIGURATION PRODUCTION - Testé et validé :
 * - Report ID: PROFORMA_INVOICE_REP (Proforma Invoice Report)
 * - Layout: BEN_Boat_configuration_for_production (layout officiel Boat Configuration)
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

    // Validation des paramètres requis
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

    // ⚠️ VALIDATION CRITIQUE : Vérifier que orderNo n'est pas "UNKNOWN"
    if (body.orderNo === 'UNKNOWN' || body.orderNo.trim() === '') {
      console.log('❌ Tentative d\'impression sans Customer Order valide')
      return NextResponse.json(
        {
          error: 'Customer Order manquant',
          details: 'Ce Shop Order n\'a pas de Customer Order associé dans IFS. L\'impression n\'est pas possible.',
          hint: 'Vérifiez que le Shop Order est correctement lié à un Customer Order dans IFS Cloud.'
        },
        { status: 400 }
      )
    }

    // 🔥 CONFIGURATION PRODUCTION - Layout validé
    // ⚠️ ATTENTION : Le layout DOIT avoir un "layout type owner" (printing solution) défini dans IFS
    // Sinon erreur : ORA-20110: PrintJobContents.MISSINGOWNER
    const layoutName = body.layoutName || 'BEN_Boat_configuration_for_production.rdl'

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
    console.log(`   Report ID: ${body.reportId}`)
    console.log(`   Order No: ${body.orderNo}`)
    
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

    // Déterminer quel layout utiliser
    const finalLayoutName = layoutName
    console.log(`   - Layout demandé: ${finalLayoutName}`)
    
    if (finalLayoutName !== dialogResponse.LayoutName) {
      console.log(`   ⚠️  Layout custom demandé (différent du défaut IFS)`)
      console.log(`   💡 Si erreur MISSINGOWNER, le layout n'a pas de printing solution définie`)
    }

    // ===== ÉTAPE 4 : ReportPrintRequest =====
    console.log('\n🖨️ ÉTAPE 4: Envoi ReportPrintRequest')
    console.log(`   Layout: ${finalLayoutName}`)
    await client.post(
      'PrintDialog.svc/ReportPrintRequest',
      {
        ResultKey: dialogResponse.ResultKey,
        LayoutName: finalLayoutName,
        LanguageCode: body.languageCode,
        LogicalPrinter: body.printerId,
        Copies: body.copies || 1
      }
    )
    console.log(`✅ Impression envoyée à ${body.printerId} avec layout : ${finalLayoutName}`)

    // ===== ÉTAPE 5 (Optionnelle) : Télécharger le PDF =====
    if (body.downloadPdf) {
      console.log('\n📄 ÉTAPE 5: Téléchargement PDF')
      console.log('⏳ Attente de la génération du PDF...')

      let pdfInfo: PdfArchiveInfo | null = null
      let pdfBlob: Buffer | null = null

      // Attendre que le PDF soit généré (max 60 secondes)
      for (let attempt = 0; attempt < 60; attempt++) {
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
          if (attempt < 59) {
            console.log(`⏳ Tentative ${attempt + 1}/60...`)
          }
        }
      }

      if (!pdfBlob) {
        console.warn('⚠️ PDF non disponible après 60 secondes')
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
    
    // Gestion spécifique pour Customer Order introuvable (404)
    if (error instanceof Error && error.message.includes('404')) {
      console.log('💡 Customer Order inexistant dans IFS')
      return NextResponse.json(
        {
          error: 'Customer Order introuvable',
          details: 'Le Customer Order n\'existe pas dans IFS Cloud.',
          hint: 'Ce Shop Order n\'a probablement pas de Customer Order associé. Vérifiez dans IFS Cloud.',
          technicalError: error.message
        },
        { status: 404 }
      )
    }

    // Autres erreurs
    return NextResponse.json(
      {
        error: 'Erreur lors de l\'impression',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
