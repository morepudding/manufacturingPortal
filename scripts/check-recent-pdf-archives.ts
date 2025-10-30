/**
 * Script pour vérifier les archives PDF récentes et leurs imprimantes
 * 
 * Usage: npx tsx scripts/check-recent-pdf-archives.ts
 */

import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

import { getIFSClient } from '../src/shared/services/ifs-client'

async function checkRecentPdfArchives() {
  console.log('📄 Vérification des archives PDF récentes dans IFS\n')
  
  const client = getIFSClient()
  
  try {
    // Récupérer les 20 dernières archives PDF
    const archivesResponse: any = await client.get(
      'PrintDialog.svc/PdfArchiveSet',
      {
        '$top': '20',
        '$orderby': 'Created desc'
      }
    )
    
    if (archivesResponse.value && archivesResponse.value.length > 0) {
      console.log(`✅ ${archivesResponse.value.length} archive(s) PDF trouvée(s):\n`)
      
      archivesResponse.value.forEach((archive: any, index: number) => {
        console.log(`${index + 1}. ${archive.FileName || 'N/A'}`)
        console.log(`   Result Key: ${archive.ResultKey}`)
        console.log(`   Layout: ${archive.LayoutName || 'N/A'}`)
        console.log(`   Language: ${archive.LangCode || 'N/A'}`)
        console.log(`   Size: ${archive.PdfSize ? (archive.PdfSize / 1024).toFixed(2) + ' KB' : 'N/A'}`)
        console.log(`   Created: ${archive.Created || 'N/A'}`)
        console.log(`   Printer: ${archive.PrinterId || archive.LogicalPrinter || 'N/A'}`)
        
        // Afficher toutes les propriétés pour voir les champs disponibles
        if (index === 0) {
          console.log(`\n   📋 Toutes les propriétés disponibles:`)
          Object.keys(archive).forEach(key => {
            if (!key.startsWith('@') && !key.startsWith('_')) {
              console.log(`      - ${key}: ${archive[key]}`)
            }
          })
        }
        
        console.log('')
      })
      
      // Chercher les PDFs générés par notre app (ResultKey > 559200)
      const ourPdfs = archivesResponse.value.filter((a: any) => a.ResultKey >= 559200)
      
      if (ourPdfs.length > 0) {
        console.log(`\n✅ ${ourPdfs.length} PDF(s) généré(s) par notre app récemment:\n`)
        ourPdfs.forEach((pdf: any) => {
          console.log(`   - ${pdf.FileName}`)
          console.log(`     Layout: ${pdf.LayoutName}`)
          console.log(`     Printer: ${pdf.PrinterId || pdf.LogicalPrinter || 'N/A'}`)
          console.log(`     Result Key: ${pdf.ResultKey}`)
          console.log('')
        })
      } else {
        console.log('\n⚠️  Aucun PDF généré par notre app récemment (ResultKey >= 559200)')
      }
      
    } else {
      console.log('⚠️  Aucune archive PDF trouvée')
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error)
    if (error instanceof Error && error.stack) {
      console.error('Stack:', error.stack)
    }
    process.exit(1)
  }
}

checkRecentPdfArchives()
