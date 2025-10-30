/**
 * Script pour chercher un ResultKey spécifique
 * 
 * Usage: npx tsx scripts/find-resultkey.ts 559234
 */

import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

import { getIFSClient } from '../src/shared/services/ifs-client'

const resultKey = process.argv[2] || '559234'

async function findResultKey() {
  console.log(`🔍 Recherche du ResultKey: ${resultKey}\n`)
  
  const client = getIFSClient()
  
  try {
    const archiveResponse: any = await client.get(
      'PrintDialog.svc/PdfArchiveSet',
      {
        '$filter': `ResultKey eq ${resultKey}`
      }
    )
    
    if (archiveResponse.value && archiveResponse.value.length > 0) {
      console.log(`✅ PDF trouvé pour ResultKey ${resultKey}:\n`)
      archiveResponse.value.forEach((pdf: any) => {
        console.log(`FileName: ${pdf.FileName}`)
        console.log(`Layout: ${pdf.LayoutName}`)
        console.log(`Language: ${pdf.LangCode}`)
        console.log(`Size: ${(pdf.PdfSize / 1024).toFixed(2)} KB`)
        console.log(`Created: ${pdf.Created}`)
        console.log(`PrintJobId: ${pdf.PrintJobId}`)
        console.log('')
      })
    } else {
      console.log(`❌ Aucun PDF trouvé pour ResultKey ${resultKey}`)
      console.log('\nCela signifie que:')
      console.log('  1. Le PDF n\'a jamais été généré')
      console.log('  2. Le ReportPrintRequest a échoué silencieusement')
      console.log('  3. L\'imprimante/layout n\'a pas pu générer le PDF')
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error)
    process.exit(1)
  }
}

findResultKey()
