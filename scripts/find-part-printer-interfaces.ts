/**
 * Script de recherche des interfaces et layouts Part Printer dans IFS
 * 
 * Recherche :
 * - Interface MA_IN_EN_1543 (Logic App Azure)
 * - Report/Layout MA_FO_CR_184
 * - Layouts d'étiquettes (label printing)
 * - Reports liés à Shop Order / Manufacturing
 * 
 * Usage: npx tsx scripts/find-part-printer-interfaces.ts
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
  ReportCategory?: string
}

interface IFSODataResponse<T> {
  '@odata.context': string
  value: T[]
}

interface IFSPrinter {
  LogicalPrinter: string
  Description?: string
  PhysicalPrinter?: string
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
  console.log('✅ Token récupéré\n')
  return data.access_token
}

/**
 * Rechercher les reports par critères
 */
async function searchReports(token: string, searchTerms: string[]): Promise<IFSLogicalReport[]> {
  const baseUrl = process.env.IFS_BASE_URL!
  
  console.log(`🔍 Recherche de Reports avec : ${searchTerms.join(', ')}`)
  
  const allReports: IFSLogicalReport[] = []
  
  for (const term of searchTerms) {
    try {
      // Recherche par ReportId
      const urlById = `${baseUrl}/PrintDialog.svc/LogicalReportSet?$filter=contains(ReportId,'${term}')&$top=50`
      const responseById = await fetch(urlById, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      })
      
      if (responseById.ok) {
        const data: IFSODataResponse<IFSLogicalReport> = await responseById.json()
        allReports.push(...data.value)
        console.log(`  ✓ ${data.value.length} report(s) trouvé(s) avec ID contenant "${term}"`)
      }
      
      // Recherche par ReportTitle
      const urlByTitle = `${baseUrl}/PrintDialog.svc/LogicalReportSet?$filter=contains(ReportTitle,'${term}')&$top=50`
      const responseByTitle = await fetch(urlByTitle, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      })
      
      if (responseByTitle.ok) {
        const data: IFSODataResponse<IFSLogicalReport> = await responseByTitle.json()
        allReports.push(...data.value)
        console.log(`  ✓ ${data.value.length} report(s) trouvé(s) avec Title contenant "${term}"`)
      }
    } catch (err) {
      console.log(`  ✗ Erreur recherche "${term}":`, err instanceof Error ? err.message : err)
    }
  }
  
  // Dédupliquer par ReportId
  const uniqueReports = Array.from(
    new Map(allReports.map(r => [r.ReportId, r])).values()
  )
  
  console.log(`✅ Total unique : ${uniqueReports.length} report(s)\n`)
  return uniqueReports
}

/**
 * Rechercher les layouts par pattern
 */
async function searchLayouts(token: string, patterns: string[]): Promise<Set<string>> {
  const baseUrl = process.env.IFS_BASE_URL!
  
  console.log(`🎨 Recherche de Layouts avec patterns : ${patterns.join(', ')}`)
  
  const allLayouts = new Set<string>()
  
  for (const pattern of patterns) {
    try {
      const url = `${baseUrl}/PrintDialog.svc/LogicalReportSet?$filter=contains(LayoutName,'${pattern}')&$select=ReportId,LayoutName&$top=100`
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      })
      
      if (response.ok) {
        const data: IFSODataResponse<IFSLogicalReport> = await response.json()
        data.value.forEach(r => {
          if (r.LayoutName) {
            allLayouts.add(r.LayoutName)
          }
        })
        console.log(`  ✓ Layouts trouvés avec pattern "${pattern}": ${data.value.length}`)
      }
    } catch (err) {
      console.log(`  ✗ Erreur pattern "${pattern}":`, err instanceof Error ? err.message : err)
    }
  }
  
  console.log(`✅ Total layouts uniques : ${allLayouts.size}\n`)
  return allLayouts
}

/**
 * Lister les imprimantes IFS
 */
async function listPrinters(token: string): Promise<IFSPrinter[]> {
  const baseUrl = process.env.IFS_BASE_URL!
  const url = `${baseUrl}/PrintDialog.svc/LogicalPrinterSet?$top=100`

  console.log('🖨️  Récupération liste des imprimantes IFS...')

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch printers: ${response.status}`)
  }

  const data: IFSODataResponse<IFSPrinter> = await response.json()
  console.log(`✅ ${data.value.length} imprimantes trouvées\n`)
  
  return data.value
}

/**
 * Afficher les résultats
 */
function displayResults(
  reports: IFSLogicalReport[],
  layouts: Set<string>,
  printers: IFSPrinter[]
) {
  console.log('\n═══════════════════════════════════════════════════════════')
  console.log('📊 RÉSULTATS - INTERFACES PART PRINTER')
  console.log('═══════════════════════════════════════════════════════════\n')

  // 1. Interface MA_IN_EN_1543
  console.log('1️⃣  INTERFACE MA_IN_EN_1543 (Logic App Azure)')
  console.log('───────────────────────────────────────────────────────────')
  const maInEn1543 = reports.find(r => r.ReportId === 'MA_IN_EN_1543')
  if (maInEn1543) {
    console.log('✅ TROUVÉ dans IFS')
    console.log(`   Report ID: ${maInEn1543.ReportId}`)
    console.log(`   Titre: ${maInEn1543.ReportTitle || 'N/A'}`)
    console.log(`   Module: ${maInEn1543.Module || 'N/A'}`)
    console.log(`   Layout: ${maInEn1543.LayoutName || 'N/A'}`)
  } else {
    console.log('❌ NON TROUVÉ dans IFS')
    console.log('   → Peut être une interface externe (Logic App)')
    console.log('   → Vérifier avec l\'équipe Azure/IFS')
  }
  console.log('')

  // 2. Report MA_FO_CR_184
  console.log('2️⃣  REPORT/LAYOUT MA_FO_CR_184')
  console.log('───────────────────────────────────────────────────────────')
  const maFoCr184 = reports.find(r => r.ReportId === 'MA_FO_CR_184')
  if (maFoCr184) {
    console.log('✅ TROUVÉ dans IFS')
    console.log(`   Report ID: ${maFoCr184.ReportId}`)
    console.log(`   Titre: ${maFoCr184.ReportTitle || 'N/A'}`)
    console.log(`   Module: ${maFoCr184.Module || 'N/A'}`)
    console.log(`   Layout: ${maFoCr184.LayoutName || 'N/A'}`)
  } else {
    console.log('❌ NON TROUVÉ dans IFS')
    console.log('   → Doit être créé pour PROD')
    console.log('   → Report Crystal custom Bénéteau')
  }
  console.log('')

  // 3. Reports contenant "MA_" (Bénéteau custom)
  console.log('3️⃣  REPORTS BÉNÉTEAU CUSTOM (MA_*)')
  console.log('───────────────────────────────────────────────────────────')
  const maReports = reports.filter(r => r.ReportId.startsWith('MA_'))
  if (maReports.length > 0) {
    console.log(`✅ ${maReports.length} report(s) MA_* trouvé(s):`)
    maReports.forEach(r => {
      console.log(`   • ${r.ReportId}`)
      console.log(`     ${r.ReportTitle || 'Sans titre'}`)
      if (r.LayoutName) {
        console.log(`     Layout: ${r.LayoutName}`)
      }
    })
  } else {
    console.log('❌ Aucun report MA_* trouvé')
  }
  console.log('')

  // 4. Reports Shop Order
  console.log('4️⃣  REPORTS SHOP ORDER')
  console.log('───────────────────────────────────────────────────────────')
  const shopOrderReports = reports.filter(r => 
    r.ReportId.includes('SHOP_ORDER') ||
    r.ReportTitle?.includes('Shop Order') ||
    r.ReportId.includes('SHOP_ORD')
  )
  if (shopOrderReports.length > 0) {
    console.log(`✅ ${shopOrderReports.length} report(s) Shop Order:`)
    shopOrderReports.slice(0, 10).forEach(r => {
      console.log(`   • ${r.ReportId}`)
      console.log(`     ${r.ReportTitle || 'Sans titre'}`)
      if (r.LayoutName) {
        console.log(`     Layout: ${r.LayoutName}`)
      }
    })
  } else {
    console.log('❌ Aucun report Shop Order trouvé')
  }
  console.log('')

  // 5. Layouts étiquettes (label/tag)
  console.log('5️⃣  LAYOUTS ÉTIQUETTES (label/tag)')
  console.log('───────────────────────────────────────────────────────────')
  const labelLayouts = Array.from(layouts).filter(l => 
    l.toLowerCase().includes('label') ||
    l.toLowerCase().includes('tag') ||
    l.toLowerCase().includes('etiquette')
  )
  if (labelLayouts.length > 0) {
    console.log(`✅ ${labelLayouts.length} layout(s) étiquette:`)
    labelLayouts.forEach(l => console.log(`   • ${l}`))
  } else {
    console.log('❌ Aucun layout étiquette trouvé')
  }
  console.log('')

  // 6. Imprimantes BDR (Part Printer)
  console.log('6️⃣  IMPRIMANTES BDR (Part Printer)')
  console.log('───────────────────────────────────────────────────────────')
  const bdrPrinters = printers.filter(p => 
    p.LogicalPrinter.includes('BDR') ||
    p.LogicalPrinter.includes('BX') ||
    p.Description?.includes('BDR')
  )
  if (bdrPrinters.length > 0) {
    console.log(`✅ ${bdrPrinters.length} imprimante(s) BDR:`)
    bdrPrinters.forEach(p => {
      console.log(`   • ${p.LogicalPrinter}`)
      if (p.Description) {
        console.log(`     ${p.Description}`)
      }
      if (p.PhysicalPrinter) {
        console.log(`     Physique: ${p.PhysicalPrinter}`)
      }
    })
  } else {
    console.log('❌ Aucune imprimante BDR trouvée')
    console.log('   → Vérifier configuration IFS PROD')
  }
  console.log('')

  // 7. Recommandations
  console.log('7️⃣  RECOMMANDATIONS')
  console.log('───────────────────────────────────────────────────────────')
  
  if (!maInEn1543) {
    console.log('   🔴 MA_IN_EN_1543 non trouvé')
    console.log('      → C\'est probablement une Logic App Azure externe')
    console.log('      → Contacter équipe Azure pour vérifier l\'interface')
    console.log('      → Documenter l\'endpoint et le format des données')
  }
  
  if (!maFoCr184) {
    console.log('   🔴 MA_FO_CR_184 non trouvé')
    console.log('      → Report Crystal custom à créer pour PROD')
    console.log('      → Travailler avec équipe IFS pour le setup')
  }
  
  if (labelLayouts.length === 0) {
    console.log('   🟠 Aucun layout étiquette standard')
    console.log('      → Créer un layout custom pour Part Printer')
    console.log('      → Exemple: BEN_PartLabel.rdl')
  }
  
  if (bdrPrinters.length === 0) {
    console.log('   🟠 Aucune imprimante BDR configurée')
    console.log('      → Configurer les imprimantes physiques en PROD')
    console.log('      → Utiliser PDF_PRINTER en DEV/AST')
  }
  
  console.log('')
  console.log('═══════════════════════════════════════════════════════════')
  console.log('✅ Analyse terminée')
  console.log('═══════════════════════════════════════════════════════════\n')

  // Retourner les résultats pour sauvegarde
  return {
    timestamp: new Date().toISOString(),
    environment: 'AST',
    searches: {
      ma_in_en_1543: maInEn1543 || null,
      ma_fo_cr_184: maFoCr184 || null,
      ma_reports: maReports,
      shop_order_reports: shopOrderReports,
      label_layouts: labelLayouts,
      bdr_printers: bdrPrinters,
    },
    all_reports: reports,
    all_layouts: Array.from(layouts),
    all_printers: printers,
  }
}

/**
 * Main
 */
async function main() {
  try {
    console.log('🚀 Recherche interfaces Part Printer dans IFS Cloud AST\n')
    console.log(`Environnement : ${process.env.IFS_BASE_URL}\n`)

    // 1. Récupérer token
    const token = await getIFSToken()

    // 2. Rechercher les reports
    const searchTerms = [
      'MA_IN_EN_1543',
      'MA_FO_CR_184',
      'MA_FO',
      'MA_IN',
      'SHOP_ORDER',
      'SHOP_ORD',
      'label',
      'tag',
      'etiquette',
    ]
    const reports = await searchReports(token, searchTerms)

    // 3. Rechercher les layouts
    const layoutPatterns = [
      'label',
      'tag',
      'BEN_',
      'MA_',
      'etiquette',
    ]
    const layouts = await searchLayouts(token, layoutPatterns)

    // 4. Lister les imprimantes
    const printers = await listPrinters(token)

    // 5. Afficher les résultats
    const results = displayResults(reports, layouts, printers)

    // 6. Sauvegarder en JSON
    const fs = await import('fs')
    const outputPath = './scripts/part-printer-interfaces-analysis.json'
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2))
    console.log(`💾 Résultats sauvegardés dans : ${outputPath}\n`)

  } catch (error) {
    console.error('\n❌ Erreur:', error)
    process.exit(1)
  }
}

main()
