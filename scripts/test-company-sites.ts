/**
 * Script de test: Liste TOUS les sites via CompanySiteHandling
 * 
 * Usage: npx tsx scripts/test-company-sites.ts
 */

import 'dotenv/config'
import { getIFSClient } from '../src/shared/services/ifs-client'

async function testCompanySites() {
  console.log('🔍 Test: Récupération de TOUS les sites via CompanySiteHandling...\n')
  
  try {
    const client = getIFSClient()
    
    // Test 1: CompanySiteSet sans paramètres
    console.log('📊 Test 1: CompanySiteHandling.svc/CompanySiteSet')
    try {
      const response1 = await client.get<any>(
        'CompanySiteHandling.svc/CompanySiteSet',
        {
          $top: '100'
        }
      )
      
      console.log(`   ✅ ${response1.value.length} sites trouvés`)
      console.log('   Sites:')
      response1.value.forEach((site: any) => {
        console.log(`   - Contract: ${site.Contract}, Company: ${site.Company}, Description: ${site.Description || 'N/A'}`)
      })
    } catch (error: any) {
      console.log(`   ❌ Erreur: ${error.message}`)
    }
    
    console.log()
    
    // Test 2: Avec tous les champs disponibles
    console.log('📊 Test 2: Avec tous les champs')
    try {
      const response2 = await client.get<any>(
        'CompanySiteHandling.svc/CompanySiteSet',
        {
          $top: '100',
          $select: 'Contract,Company,Description'
        }
      )
      
      console.log(`   ✅ ${response2.value.length} sites trouvés`)
      console.log('   Sites détaillés:')
      response2.value.forEach((site: any) => {
        console.log(`   - ${site.Contract} (${site.Company}): ${site.Description || 'N/A'}`)
      })
    } catch (error: any) {
      console.log(`   ❌ Erreur: ${error.message}`)
    }
    
    console.log()
    
    // Test 3: Compter tous les sites sans limite
    console.log('📊 Test 3: Compter TOUS les sites (sans limite)')
    try {
      const response3 = await client.get<any>(
        'CompanySiteHandling.svc/CompanySiteSet',
        {
          $select: 'Contract'
        }
      )
      
      const uniqueContracts = new Set(response3.value.map((s: any) => s.Contract))
      console.log(`   ✅ Total de ${response3.value.length} entrées`)
      console.log(`   ✅ ${uniqueContracts.size} sites uniques`)
      console.log(`   �� Contracts: ${Array.from(uniqueContracts).join(', ')}`)
    } catch (error: any) {
      console.log(`   ❌ Erreur: ${error.message}`)
    }
    
    console.log('\n✅ Tests terminés!')
    
  } catch (error) {
    console.error('❌ Erreur générale:', error)
  }
}

testCompanySites()
