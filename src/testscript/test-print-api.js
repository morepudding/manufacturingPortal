#!/usr/bin/env node

/**
 * Script de test rapide pour l'API /api/print
 * 
 * Usage:
 *   node src/testscript/test-print-api.js [--download]
 * 
 * Options:
 *   --download : Télécharge le PDF (plus lent, ~15s)
 *   (sans option) : Print only (rapide, ~10s)
 */

const fs = require('fs')
const path = require('path')

// Configuration
const API_BASE_URL = 'http://localhost:3000'
const TEST_ORDER = 'C1000038587'  // Customer Order validé

// Parser arguments
const downloadPdf = process.argv.includes('--download')

console.log('\n╔══════════════════════════════════════════════════════════════╗')
console.log('║        TEST API /api/print - Manufacturing Portal           ║')
console.log('╚══════════════════════════════════════════════════════════════╝\n')

console.log('📋 Configuration:')
console.log(`   Order No: ${TEST_ORDER}`)
console.log(`   Mode: ${downloadPdf ? '📥 Print & Download PDF' : '🖨️  Print Only'}`)
console.log(`   API: ${API_BASE_URL}/api/print\n`)

async function testPrintAPI() {
  const startTime = Date.now()
  
  try {
    // Préparer la requête
    const requestBody = {
      orderNo: TEST_ORDER,
      reportId: 'CUSTOMER_ORDER_CONF_REP',
      printerId: 'PDF_PRINTER',
      languageCode: 'fr',
      copies: 1,
      downloadPdf: downloadPdf,
    }
    
    console.log('📤 Sending request...')
    console.log(JSON.stringify(requestBody, null, 2))
    console.log('')
    
    // Faire la requête
    const response = await fetch(`${API_BASE_URL}/api/print`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2)
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`HTTP ${response.status}: ${errorData.error}`)
    }
    
    // Traiter la réponse
    if (downloadPdf) {
      // Récupérer le PDF
      const contentDisposition = response.headers.get('Content-Disposition')
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/)
      const filename = filenameMatch?.[1] || `test-${TEST_ORDER}.pdf`
      
      const buffer = Buffer.from(await response.arrayBuffer())
      const filepath = path.join(__dirname, filename)
      
      fs.writeFileSync(filepath, buffer)
      
      console.log('✅ SUCCESS - PDF Downloaded\n')
      console.log('📄 PDF Information:')
      console.log(`   File: ${filename}`)
      console.log(`   Path: ${filepath}`)
      console.log(`   Size: ${(buffer.length / 1024).toFixed(2)} KB`)
      console.log(`   Duration: ${duration}s`)
      
      // Vérifier le header PDF
      const header = buffer.slice(0, 8).toString('ascii')
      console.log(`   Header: ${header.substring(0, 5)}`)
      
      if (header.startsWith('%PDF')) {
        console.log(`   ✅ Valid PDF format\n`)
      } else {
        console.log(`   ❌ Invalid PDF format!\n`)
      }
      
    } else {
      // Récupérer le JSON
      const data = await response.json()
      
      console.log('✅ SUCCESS - Print Request Sent\n')
      console.log('📋 Print Information:')
      console.log(`   Result Key: ${data.resultKey}`)
      console.log(`   Report Title: ${data.reportTitle}`)
      console.log(`   Layout Name: ${data.layoutName}`)
      console.log(`   Duration: ${duration}s\n`)
    }
    
    console.log('╔══════════════════════════════════════════════════════════════╗')
    console.log('║                    ✅ TEST PASSED                            ║')
    console.log('╚══════════════════════════════════════════════════════════════╝\n')
    
  } catch (error) {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2)
    
    console.error('\n❌ TEST FAILED\n')
    console.error('Error:', error.message)
    console.error(`Duration: ${duration}s\n`)
    
    console.log('╔══════════════════════════════════════════════════════════════╗')
    console.log('║                    ❌ TEST FAILED                            ║')
    console.log('╚══════════════════════════════════════════════════════════════╝\n')
    
    process.exit(1)
  }
}

// Vérifier que le serveur est accessible
async function checkServer() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`, {
      method: 'GET',
    })
    return response.ok
  } catch {
    return false
  }
}

// Main
async function main() {
  console.log('🔍 Checking server availability...')
  
  const serverAvailable = await checkServer()
  if (!serverAvailable) {
    console.error(`\n❌ Server not available at ${API_BASE_URL}`)
    console.error('   Please start the server with: pnpm run dev\n')
    process.exit(1)
  }
  
  console.log('✅ Server is running\n')
  
  await testPrintAPI()
}

main()
