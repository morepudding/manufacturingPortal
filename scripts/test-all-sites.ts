/**
 * Script de test: Récupération de TOUS les sites disponibles dans IFS
 * 
 * Usage: npx tsx scripts/test-all-sites.ts
 */

import 'dotenv/config'
import { getIFSClient } from '../src/shared/services/ifs-client'

async function testAllSites() {
  console.log('🔍 Test: Récupération de TOUS les sites disponibles dans IFS...\n')
  
  try {
    const client = getIFSClient()
    
    // Test 1: Chercher dans l'endpoint Company Sites
    console.log('📊 Test 1: Endpoint CompanySites')
    try {
      const response1 = await client.get<any>(
        'CompanySite.svc/Sites',
        {
          $select: 'Contract,Company,Description',
          $top: '100'
        }
      )
      
      console.log(`   ✅ ${response1.value.length} sites trouvés`)
      console.log('   Sites:')
      response1.value.forEach((site: any) => {
        console.log(`   - ${site.Contract}: ${site.Description || 'N/A'}`)
      })
    } catch (error: any) {
      console.log(`   ❌ Erreur: ${error.message}`)
    }
    
    console.log()
    
    // Test 2: Chercher dans Site
    console.log('📊 Test 2: Endpoint Site')
    try {
      const response2 = await client.get<any>(
        'Site.svc/Sites',
        {
          $select: 'Contract,Company,Description',
          $top: '100'
        }
      )
      
      console.log(`   ✅ ${response2.value.length} sites trouvés`)
      console.log('   Sites:')
      response2.value.forEach((site: any) => {
        console.log(`   - ${site.Contract}: ${site.Description || 'N/A'}`)
      })
    } catch (error: any) {
      console.log(`   ❌ Erreur: ${error.message}`)
    }
    
    console.log()
    
    // Test 3: Chercher dans UserAllowedSite
    console.log('📊 Test 3: Endpoint UserAllowedSite')
    try {
      const response3 = await client.get<any>(
        'UserAllowedSite.svc/Sites',
        {
          $select: 'Contract,Description',
          $top: '100'
        }
      )
      
      console.log(`   ✅ ${response3.value.length} sites trouvés`)
      console.log('   Sites:')
      response3.value.forEach((site: any) => {
        console.log(`   - ${site.Contract}: ${site.Description || 'N/A'}`)
      })
    } catch (error: any) {
      console.log(`   ❌ Erreur: ${error.message}`)
    }
    
    console.log()
    
    // Test 4: Explorer les metadata pour trouver le bon endpoint
    console.log('📊 Test 4: Recherche dans les métadonnées OData')
    try {
      const response4 = await client.get<any>(
        '$metadata',
        {}
      )
      
      console.log('   ℹ️  Recherche des endpoints contenant "Site" dans les métadonnées...')
      const metadata = response4.toString()
      const siteEndpoints = metadata.match(/EntitySet.*Site.*Name="[^"]+"/gi)
      
      if (siteEndpoints) {
        console.log(`   📍 ${siteEndpoints.length} endpoints trouvés:`)
        siteEndpoints.slice(0, 20).forEach((ep: string) => {
          console.log(`   - ${ep}`)
        })
      }
    } catch (error: any) {
      console.log(`   ❌ Erreur: ${error.message}`)
    }
    
    console.log('\n✅ Tests terminés!')
    
  } catch (error) {
    console.error('❌ Erreur générale:', error)
  }
}

testAllSites()
