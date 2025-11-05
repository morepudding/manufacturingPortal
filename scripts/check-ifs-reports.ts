/**
 * Script de vérification des Reports et Layouts IFS Cloud
 * 
 * Vérifie :
 * 1. Liste des Reports disponibles (LogicalReportSet)
 * 2. Existence du Report MA_FO_CR_1419
 * 3. Layouts disponibles pour les Reports
 * 4. Imprimantes configurées
 * 
 * Usage: npx tsx scripts/check-ifs-reports.ts
 */

import { config } from 'dotenv'
import { resolve } from 'path'

// Charger .env.local
config({ path: resolve(process.cwd(), '.env.local') })

interface IFSLogicalReport {
  ReportId: string
  ReportTitle?: string
  Description?: string
  Module?: string
  LayoutName?: string
}

interface IFSODataResponse<T> {
  '@odata.context': string
  value: T[]
}

interface IFSPrinter {
  PrinterId: string
  Description?: string
  PrinterType?: string
}

/**
 * Récupérer un token OAuth2 IFS
 */
async function getIFSToken(): Promise<string> {
  const tokenUrl = process.env.IFS_TOKEN_URL!
  const clientId = process.env.IFS_CLIENT_ID!
  const clientSecret = process.env.IFS_CLIENT_SECRET!
  const scope = process.env.IFS_SCOPE!

  console.log('🔐 Récupération token OAuth2 IFS...')

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      scope: scope,
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to get token: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  console.log('✅ Token récupéré avec succès\n')
  return data.access_token
}

/**
 * Lister tous les Reports disponibles
 */
async function listAllReports(token: string): Promise<IFSLogicalReport[]> {
  const baseUrl = process.env.IFS_BASE_URL!
  const url = `${baseUrl}/PrintDialog.svc/LogicalReportSet?$top=100&$select=ReportId,ReportTitle,Description,Module,LayoutName`

  console.log('📋 Récupération de la liste des Reports IFS...')

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch reports: ${response.status} ${response.statusText}`)
  }

  const data: IFSODataResponse<IFSLogicalReport> = await response.json()
  console.log(`✅ ${data.value.length} Reports trouvés\n`)
  
  return data.value
}

/**
 * Chercher un Report spécifique
 */
async function findReport(token: string, reportId: string): Promise<IFSLogicalReport | null> {
  const baseUrl = process.env.IFS_BASE_URL!
  const url = `${baseUrl}/PrintDialog.svc/LogicalReportSet?$filter=ReportId eq '${reportId}'`

  console.log(`🔍 Recherche du Report "${reportId}"...`)

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch report: ${response.status} ${response.statusText}`)
  }

  const data: IFSODataResponse<IFSLogicalReport> = await response.json()
  
  if (data.value.length > 0) {
    console.log('✅ Report trouvé !\n')
    return data.value[0]
  } else {
    console.log('❌ Report non trouvé\n')
    return null
  }
}

/**
 * Lister les imprimantes disponibles
 */
async function listPrinters(token: string): Promise<IFSPrinter[]> {
  const baseUrl = process.env.IFS_BASE_URL!
  const url = `${baseUrl}/PrintDialog.svc/LogicalPrinterSet?$top=100&$select=PrinterId,Description,PrinterType`

  console.log('🖨️  Récupération de la liste des Imprimantes...')

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch printers: ${response.status} ${response.statusText}`)
  }

  const data: IFSODataResponse<IFSPrinter> = await response.json()
  console.log(`✅ ${data.value.length} Imprimantes trouvées\n`)
  
  return data.value
}

/**
 * Afficher les résultats
 */
function displayResults(
  allReports: IFSLogicalReport[],
  targetReport: IFSLogicalReport | null,
  printers: IFSPrinter[]
) {
  console.log('═══════════════════════════════════════════════════════════')
  console.log('📊 RÉSULTATS DE L\'ANALYSE IFS CLOUD AST')
  console.log('═══════════════════════════════════════════════════════════\n')

  // 1. Report MA_FO_CR_1419
  console.log('1️⃣  REPORT MA_FO_CR_1419 (Boat Configuration)')
  console.log('───────────────────────────────────────────────────────────')
  if (targetReport) {
    console.log('✅ Status : TROUVÉ')
    console.log(`   Report ID : ${targetReport.ReportId}`)
    console.log(`   Titre : ${targetReport.ReportTitle || 'N/A'}`)
    console.log(`   Description : ${targetReport.Description || 'N/A'}`)
    console.log(`   Module : ${targetReport.Module || 'N/A'}`)
    console.log(`   Layout : ${targetReport.LayoutName || 'N/A'}`)
  } else {
    console.log('❌ Status : NON TROUVÉ')
    console.log('   ⚠️  Ce Report doit être créé pour PROD')
  }
  console.log('')

  // 2. Reports Customer Order (similaires)
  console.log('2️⃣  REPORTS CUSTOMER ORDER (alternatives)')
  console.log('───────────────────────────────────────────────────────────')
  const customerOrderReports = allReports.filter(r => 
    r.ReportId.includes('CUSTOMER_ORDER') || 
    r.ReportTitle?.includes('Customer Order') ||
    r.Module === 'ORDER'
  )
  
  if (customerOrderReports.length > 0) {
    customerOrderReports.slice(0, 10).forEach(report => {
      console.log(`   • ${report.ReportId}`)
      console.log(`     ${report.ReportTitle || 'Sans titre'}`)
      if (report.LayoutName) {
        console.log(`     Layout: ${report.LayoutName}`)
      }
      console.log('')
    })
  } else {
    console.log('   Aucun report Customer Order trouvé')
  }
  console.log('')

  // 3. Layouts Bénéteau
  console.log('3️⃣  LAYOUTS BÉNÉTEAU (BEN_*)')
  console.log('───────────────────────────────────────────────────────────')
  const beneateuLayouts = allReports.filter(r => 
    r.LayoutName?.startsWith('BEN_')
  )
  
  if (beneateuLayouts.length > 0) {
    const uniqueLayouts = new Set(beneateuLayouts.map(r => r.LayoutName).filter(Boolean))
    uniqueLayouts.forEach(layout => {
      console.log(`   • ${layout}`)
      const reportsWithLayout = beneateuLayouts.filter(r => r.LayoutName === layout)
      reportsWithLayout.forEach(r => {
        console.log(`     └─> ${r.ReportId} (${r.ReportTitle || 'Sans titre'})`)
      })
      console.log('')
    })
  } else {
    console.log('   Aucun layout Bénéteau trouvé')
  }
  console.log('')

  // 4. Imprimantes
  console.log('4️⃣  IMPRIMANTES DISPONIBLES')
  console.log('───────────────────────────────────────────────────────────')
  
  // Imprimantes Boat Config (MNF)
  console.log('   📌 Site MNF (Boat Configuration):')
  const mnfPrinters = printers.filter(p => 
    p.PrinterId.includes('MNF') || p.PrinterId.includes('PRTMNF')
  )
  if (mnfPrinters.length > 0) {
    mnfPrinters.forEach(printer => {
      console.log(`      ✅ ${printer.PrinterId}`)
      if (printer.Description) {
        console.log(`         ${printer.Description}`)
      }
    })
  } else {
    console.log('      ❌ Aucune imprimante MNF trouvée')
  }
  console.log('')

  // Imprimantes Part Printer (BDR/BX)
  console.log('   📌 Site BDR (Part Printer):')
  const bdrPrinters = printers.filter(p => 
    p.PrinterId.includes('BDR') || p.PrinterId.includes('PRTBX') || p.PrinterId.includes('BX')
  )
  if (bdrPrinters.length > 0) {
    bdrPrinters.forEach(printer => {
      console.log(`      ✅ ${printer.PrinterId}`)
      if (printer.Description) {
        console.log(`         ${printer.Description}`)
      }
    })
  } else {
    console.log('      ❌ Aucune imprimante BDR trouvée')
  }
  console.log('')

  // Imprimante PDF (DEV)
  console.log('   📌 Imprimantes virtuelles (DEV):')
  const pdfPrinters = printers.filter(p => 
    p.PrinterId.includes('PDF') || p.Description?.includes('PDF')
  )
  if (pdfPrinters.length > 0) {
    pdfPrinters.forEach(printer => {
      console.log(`      ✅ ${printer.PrinterId}`)
      if (printer.Description) {
        console.log(`         ${printer.Description}`)
      }
    })
  } else {
    console.log('      ⚠️  Aucune imprimante PDF trouvée')
  }
  console.log('')

  // 5. Statistiques globales
  console.log('5️⃣  STATISTIQUES GLOBALES')
  console.log('───────────────────────────────────────────────────────────')
  console.log(`   Total Reports : ${allReports.length}`)
  console.log(`   Total Imprimantes : ${printers.length}`)
  console.log(`   Layouts Bénéteau : ${new Set(beneateuLayouts.map(r => r.LayoutName).filter(Boolean)).size}`)
  console.log('')

  // 6. Recommandations
  console.log('6️⃣  RECOMMANDATIONS')
  console.log('───────────────────────────────────────────────────────────')
  
  if (!targetReport) {
    console.log('   🔴 BLOQUEUR : Report MA_FO_CR_1419 non trouvé en AST')
    console.log('      → Contacter équipe IFS pour créer ce Report custom')
    console.log('      → Utiliser CUSTOMER_ORDER_CONF_REP en attendant')
  } else {
    console.log('   ✅ Report MA_FO_CR_1419 disponible')
    console.log(`      → Layout configuré : ${targetReport.LayoutName || 'N/A'}`)
  }
  console.log('')

  if (mnfPrinters.length === 0) {
    console.log('   🟠 ATTENTION : Aucune imprimante MNF trouvée')
    console.log('      → Vérifier configuration IFS PROD')
    console.log('      → Utiliser PDF_PRINTER en DEV')
  } else {
    console.log(`   ✅ ${mnfPrinters.length} imprimante(s) MNF disponible(s)`)
  }
  console.log('')

  if (bdrPrinters.length === 0) {
    console.log('   🟠 ATTENTION : Aucune imprimante BDR trouvée')
    console.log('      → Vérifier configuration IFS PROD')
  } else {
    console.log(`   ✅ ${bdrPrinters.length} imprimante(s) BDR disponible(s)`)
  }
  console.log('')

  console.log('═══════════════════════════════════════════════════════════')
  console.log('✅ Analyse terminée')
  console.log('═══════════════════════════════════════════════════════════\n')

  // Sauvegarder dans un fichier JSON
  const results = {
    timestamp: new Date().toISOString(),
    environment: 'AST',
    targetReport: targetReport,
    allReports: allReports,
    printers: printers,
    statistics: {
      totalReports: allReports.length,
      totalPrinters: printers.length,
      mnfPrinters: mnfPrinters.length,
      bdrPrinters: bdrPrinters.length,
      pdfPrinters: pdfPrinters.length,
    }
  }

  return results
}

/**
 * Main
 */
async function main() {
  try {
    console.log('🚀 Démarrage de l\'analyse IFS Cloud AST\n')
    console.log(`Environnement : ${process.env.IFS_BASE_URL}\n`)

    // 1. Récupérer token
    const token = await getIFSToken()

    // 2. Lister tous les Reports
    const allReports = await listAllReports(token)

    // 3. Chercher MA_FO_CR_1419
    const targetReport = await findReport(token, 'MA_FO_CR_1419')

    // 4. Lister les imprimantes
    const printers = await listPrinters(token)

    // 5. Afficher les résultats
    const results = displayResults(allReports, targetReport, printers)

    // 6. Sauvegarder en JSON
    const fs = await import('fs')
    const outputPath = './scripts/ifs-reports-analysis.json'
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2))
    console.log(`💾 Résultats sauvegardés dans : ${outputPath}\n`)

  } catch (error) {
    console.error('\n❌ Erreur:', error)
    process.exit(1)
  }
}

main()
