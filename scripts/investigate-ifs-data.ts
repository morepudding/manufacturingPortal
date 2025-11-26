/**
 * Script d'investigation IFS Cloud via Azure APIM
 * 
 * Objectif: Récupérer de VRAIES données IFS pour créer des fixtures réalistes
 * ⚠️ Ne pas inventer de données - capturer la structure réelle OData
 * 
 * Usage:
 * 1. Configurer .env.local avec credentials APIM AST
 * 2. pnpm tsx scripts/investigate-ifs-data.ts
 * 3. Analyser le fichier généré: tests/boat-configuration/integration/fixtures/ifs-real-data.json
 * 
 * @author Manufacturing Portal Team
 * @date November 12, 2025
 */

import { config } from 'dotenv'
import { resolve } from 'path'
import { writeFile } from 'fs/promises'
import { getIFSClient } from '../src/shared/services/ifs-client'

// Load .env.local
config({ path: resolve(__dirname, '../.env.local') })

interface InvestigationResult {
  timestamp: string
  environment: string
  shopOrders: unknown[]
  dopHeaders: unknown[]
  customerOrderLines: unknown[]
  customerOrderHeaders: unknown[]
  printers: unknown[]
  languages: unknown[]
  metadata: {
    shopOrdersFields: string[]
    dopHeadersFields: string[]
    customerOrderLinesFields: string[]
    customerOrderHeadersFields: string[]
  }
}

/**
 * Extraire les noms de champs d'un objet IFS
 */
function extractFieldNames(obj: any): string[] {
  if (!obj) return []
  return Object.keys(obj).filter(key => !key.startsWith('@odata'))
}

/**
 * Investigation Shop Orders
 */
async function investigateShopOrders() {
  console.log('\n🔍 Investigation 1: Shop Orders')
  console.log('=' .repeat(60))
  
  const client = getIFSClient()
  
  try {
    // Récupérer plusieurs Shop Orders pour analyser la structure
    const testOrders = ['563', '949', '1043', '97277']
    const results = []
    
    for (const orderNo of testOrders) {
      console.log(`\n📦 Fetching Shop Order: ${orderNo}`)
      
      const response = await client.get<any>(
        'ShopOrderHandling.svc/ShopOrds',
        {
          $filter: `contains(OrderNo,'${orderNo}')`,
          $select: '*', // ⚠️ Récupérer TOUS les champs
          $top: '5'
        }
      )
      
      if (response.value && response.value.length > 0) {
        const shopOrder = response.value[0]
        results.push(shopOrder)
        
        console.log(`   ✅ Found: ${shopOrder.OrderNo} - ${shopOrder.PartNo || 'N/A'}`)
        console.log(`   DOP ID: ${shopOrder.DopId || 'N/A'}`)
        console.log(`   Contract: ${shopOrder.Contract || 'N/A'}`)
      } else {
        console.log(`   ❌ Not found`)
      }
    }
    
    return results
  } catch (error) {
    console.error('❌ Error fetching Shop Orders:', error)
    return []
  }
}

/**
 * Investigation DOP Headers
 */
async function investigateDopHeaders() {
  console.log('\n🔍 Investigation 2: DOP Headers (Serial Numbers)')
  console.log('=' .repeat(60))
  
  const client = getIFSClient()
  
  try {
    // DOP IDs connus (extraits des Shop Orders)
    const testDopIds = ['34', '48', '54', '95']
    const results = []
    
    for (const dopId of testDopIds) {
      console.log(`\n📋 Fetching DOP Header: ${dopId}`)
      
      const response = await client.get<any>(
        'DopHeaderHandling.svc/Reference_DopHeadSerialReserv',
        {
          $filter: `contains(DopId,'${dopId}')`,
          $select: '*',
          $top: '10'
        }
      )
      
      if (response.value && response.value.length > 0) {
        results.push(...response.value)
        
        console.log(`   ✅ Found ${response.value.length} Serial Number(s)`)
        response.value.forEach((item: any) => {
          console.log(`      - ${item.SerialNo || 'N/A'} (DOP: ${item.DopId})`)
        })
      } else {
        console.log(`   ❌ Not found`)
      }
    }
    
    return results
  } catch (error) {
    console.error('❌ Error fetching DOP Headers:', error)
    return []
  }
}

/**
 * Investigation Customer Order Lines
 */
async function investigateCustomerOrderLines() {
  console.log('\n🔍 Investigation 3: Customer Order Lines')
  console.log('=' .repeat(60))
  
  const client = getIFSClient()
  
  try {
    // Hull Numbers connus
    const testHullNumbers = ['LG5MA0114', 'LX6MA0115', 'LX6MA0116', 'JY6MB0019']
    const results = []
    
    for (const hullNumber of testHullNumbers) {
      console.log(`\n🚢 Fetching Customer Order Line for Hull: ${hullNumber}`)
      
      const response = await client.get<any>(
        'CustomerOrderHandling.svc/CustomerOrderLines',
        {
          $filter: `CHullNumber eq '${hullNumber}' and Contract eq 'FR05A'`,
          $select: '*',
          $top: '5'
        }
      )
      
      if (response.value && response.value.length > 0) {
        const line = response.value[0]
        results.push(line)
        
        console.log(`   ✅ Found: ${line.OrderNo} - Line ${line.LineNo}`)
        console.log(`   Customer: ${line.CustomerNo || 'N/A'}`)
        console.log(`   Part: ${line.CatalogNo || 'N/A'}`)
      } else {
        console.log(`   ❌ Not found`)
      }
    }
    
    return results
  } catch (error) {
    console.error('❌ Error fetching Customer Order Lines:', error)
    return []
  }
}

/**
 * Investigation Customer Order Headers
 */
async function investigateCustomerOrderHeaders(orderNos: string[]) {
  console.log('\n🔍 Investigation 4: Customer Order Headers')
  console.log('=' .repeat(60))
  
  const client = getIFSClient()
  const results = []
  
  try {
    for (const orderNo of orderNos) {
      console.log(`\n📄 Fetching Customer Order Header: ${orderNo}`)
      
      const response = await client.get<any>(
        'CustomerOrderHandling.svc/CustomerOrderHeaders',
        {
          $filter: `OrderNo eq '${orderNo}'`,
          $select: '*',
          $top: '1'
        }
      )
      
      if (response.value && response.value.length > 0) {
        const header = response.value[0]
        results.push(header)
        
        console.log(`   ✅ Found: ${header.OrderNo}`)
        console.log(`   Customer Name: ${header.CustomerName || 'N/A'}`)
        console.log(`   State: ${header.Objstate || 'N/A'}`)
      } else {
        console.log(`   ❌ Not found`)
      }
    }
    
    return results
  } catch (error) {
    console.error('❌ Error fetching Customer Order Headers:', error)
    return []
  }
}

/**
 * Investigation Printers
 */
async function investigatePrinters() {
  console.log('\n🔍 Investigation 5: Printers (Print Dialog)')
  console.log('=' .repeat(60))
  
  const client = getIFSClient()
  
  try {
    const response = await client.get<any>(
      'PrintDialog.svc/LogicalPrinters',
      {
        $select: '*',
        $top: '20'
      }
    )
    
    if (response.value && response.value.length > 0) {
      console.log(`   ✅ Found ${response.value.length} printer(s)`)
      response.value.slice(0, 5).forEach((printer: any) => {
        console.log(`      - ${printer.LogicalPrinterId || printer.PrinterId || 'N/A'}`)
      })
      
      return response.value
    } else {
      console.log(`   ❌ No printers found`)
      return []
    }
  } catch (error) {
    console.error('❌ Error fetching Printers:', error)
    return []
  }
}

/**
 * Investigation Languages
 */
async function investigateLanguages() {
  console.log('\n🔍 Investigation 6: Languages (Print Dialog)')
  console.log('=' .repeat(60))
  
  const client = getIFSClient()
  
  try {
    const response = await client.get<any>(
      'PrintDialog.svc/LanguageCodes',
      {
        $select: '*',
        $top: '20'
      }
    )
    
    if (response.value && response.value.length > 0) {
      console.log(`   ✅ Found ${response.value.length} language(s)`)
      response.value.slice(0, 5).forEach((lang: any) => {
        console.log(`      - ${lang.LanguageCode || 'N/A'}: ${lang.Description || 'N/A'}`)
      })
      
      return response.value
    } else {
      console.log(`   ❌ No languages found`)
      return []
    }
  } catch (error) {
    console.error('❌ Error fetching Languages:', error)
    return []
  }
}

/**
 * Main investigation
 */
async function main() {
  console.log('🚀 Starting IFS Cloud Data Investigation (via Azure APIM)')
  console.log('=' .repeat(60))
  console.log('⚠️  Objective: Capture REAL IFS data structures')
  console.log('⚠️  DO NOT invent data - use actual OData responses')
  console.log('=' .repeat(60))
  
  try {
    // Investigation séquentielle
    const shopOrders = await investigateShopOrders()
    const dopHeaders = await investigateDopHeaders()
    const customerOrderLines = await investigateCustomerOrderLines()
    
    // Extraire Order Numbers des Customer Order Lines
    const orderNos = customerOrderLines
      .map((line: any) => line.OrderNo)
      .filter((orderNo, index, self) => orderNo && self.indexOf(orderNo) === index)
    
    const customerOrderHeaders = await investigateCustomerOrderHeaders(orderNos)
    const printers = await investigatePrinters()
    const languages = await investigateLanguages()
    
    // Compiler les résultats
    const result: InvestigationResult = {
      timestamp: new Date().toISOString(),
      environment: process.env.IFS_BASE_URL || 'unknown',
      shopOrders,
      dopHeaders,
      customerOrderLines,
      customerOrderHeaders,
      printers,
      languages,
      metadata: {
        shopOrdersFields: shopOrders.length > 0 ? extractFieldNames(shopOrders[0]) : [],
        dopHeadersFields: dopHeaders.length > 0 ? extractFieldNames(dopHeaders[0]) : [],
        customerOrderLinesFields: customerOrderLines.length > 0 ? extractFieldNames(customerOrderLines[0]) : [],
        customerOrderHeadersFields: customerOrderHeaders.length > 0 ? extractFieldNames(customerOrderHeaders[0]) : [],
      }
    }
    
    // Sauvegarder dans fichier JSON
    const outputPath = 'tests/boat-configuration/integration/fixtures/ifs-real-data.json'
    await writeFile(outputPath, JSON.stringify(result, null, 2), 'utf-8')
    
    console.log('\n' + '=' .repeat(60))
    console.log('✅ Investigation completed successfully!')
    console.log('=' .repeat(60))
    console.log(`📄 Results saved to: ${outputPath}`)
    console.log(`\n📊 Summary:`)
    console.log(`   - Shop Orders: ${shopOrders.length}`)
    console.log(`   - DOP Headers: ${dopHeaders.length}`)
    console.log(`   - Customer Order Lines: ${customerOrderLines.length}`)
    console.log(`   - Customer Order Headers: ${customerOrderHeaders.length}`)
    console.log(`   - Printers: ${printers.length}`)
    console.log(`   - Languages: ${languages.length}`)
    console.log(`\n💡 Next steps:`)
    console.log(`   1. Review ${outputPath}`)
    console.log(`   2. Create MSW handlers based on real structures`)
    console.log(`   3. Use this data for integration test fixtures`)
    
  } catch (error) {
    console.error('\n❌ Investigation failed:', error)
    process.exit(1)
  }
}

// Execute
main()
