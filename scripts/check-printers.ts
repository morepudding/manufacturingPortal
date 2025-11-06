/**
 * Script pour vérifier les imprimantes disponibles
 * 
 * Usage: npx tsx scripts/check-printers.ts
 */

import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

import { getIFSClient } from '../src/shared/services/ifs-client'

async function checkPrinters() {
  console.log('🖨️  Vérification des imprimantes disponibles dans IFS\n')
  
  const client = getIFSClient()
  
  try {
    const printersResponse: any = await client.get(
      'PrintDialog.svc/LogicalPrinterSet',
      {
        '$top': '50'
      }
    )
    
    if (printersResponse.value && printersResponse.value.length > 0) {
      console.log(`✅ ${printersResponse.value.length} imprimante(s) trouvée(s):\n`)
      
      printersResponse.value.forEach((printer: any, index: number) => {
        console.log(`${index + 1}. ${printer.LogicalPrinter}`)
        if (printer.Description) {
          console.log(`   Description: ${printer.Description}`)
        }
        if (printer.PrinterType) {
          console.log(`   Type: ${printer.PrinterType}`)
        }
        console.log('')
      })
      
      // Chercher PDF_PRINTER
      const pdfPrinter = printersResponse.value.find((p: any) => 
        p.LogicalPrinter === 'PDF_PRINTER'
      )
      
      if (pdfPrinter) {
        console.log('✅ PDF_PRINTER trouvée !')
        console.log(`   Description: ${pdfPrinter.Description || 'N/A'}`)
        console.log(`   Type: ${pdfPrinter.PrinterType || 'N/A'}`)
      } else {
        console.log('❌ PDF_PRINTER NOT FOUND !')
        console.log('\nImprimantes PDF disponibles:')
        const pdfPrinters = printersResponse.value.filter((p: any) => 
          p.LogicalPrinter?.toLowerCase().includes('pdf')
        )
        if (pdfPrinters.length > 0) {
          pdfPrinters.forEach((p: any) => {
            console.log(`   - ${p.LogicalPrinter}`)
          })
        } else {
          console.log('   Aucune imprimante PDF trouvée')
        }
      }
      
    } else {
      console.log('⚠️  Aucune imprimante trouvée')
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error)
    process.exit(1)
  }
}

checkPrinters()
