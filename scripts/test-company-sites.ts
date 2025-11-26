/**
 * Script de test pour récupérer tous les sites/contracts IFS disponibles
 * Endpoint: CompanySiteHandling.svc/CompanySiteSet
 */

import { getIFSClient } from '../src/shared/services/ifs-client'

interface CompanySite {
  Contract: string
  Company: string
  Description?: string
  CompanyId?: string
  [key: string]: any
}

interface IFSODataResponse<T> {
  value: T[]
  '@odata.context'?: string
  '@odata.count'?: number
}

async function testCompanySites() {
  console.log('🔍 Test endpoint: CompanySiteHandling.svc/CompanySiteSet')
  console.log('=' .repeat(60))
  
  try {
    const client = getIFSClient()
    
    console.log('\n📡 Récupération de tous les sites/contracts...')
    
    const response = await client.get<IFSODataResponse<CompanySite>>(
      'CompanySiteHandling.svc/CompanySiteSet',
      {
        $select: 'Contract,Company,Description,Country'
      }
    )
    
    console.log(`\n✅ Réponse reçue: ${response.value.length} sites trouvés\n`)
    
    // Afficher les sites
    console.log('📋 Liste des sites/contracts disponibles:')
    console.log('─'.repeat(60))
    
    response.value.forEach((site, index) => {
      console.log(`\n${index + 1}. Contract: ${site.Contract}`)
      console.log(`   Company: ${site.Company}`)
      if (site.Description) {
        console.log(`   Description: ${site.Description}`)
      }
      if (site.CompanyId) {
        console.log(`   Company ID: ${site.CompanyId}`)
      }
    })
    
    console.log('\n' + '─'.repeat(60))
    
    // Statistiques
    const companies = [...new Set(response.value.map(s => s.Company))]
    console.log(`\n📊 Statistiques:`)
    console.log(`   Total sites: ${response.value.length}`)
    console.log(`   Companies uniques: ${companies.length}`)
    console.log(`   Companies: ${companies.join(', ')}`)
    
    // Sites spécifiques utilisés dans le projet
    console.log(`\n🎯 Sites utilisés dans le projet:`)
    const projectSites = ['FR05A', 'BDR', 'FR018']
    projectSites.forEach(contract => {
      const site = response.value.find(s => s.Contract === contract)
      if (site) {
        console.log(`   ✅ ${contract}: ${site.Description || site.Company}`)
      } else {
        console.log(`   ❌ ${contract}: NON TROUVÉ`)
      }
    })
    
    console.log('\n✅ Test réussi!')
    
  } catch (error: any) {
    console.error('\n❌ Erreur lors du test:')
    console.error('Message:', error.message)
    if (error.response) {
      console.error('Status:', error.response.status)
      console.error('Data:', JSON.stringify(error.response.data, null, 2))
    }
    process.exit(1)
  }
}

// Exécution
testCompanySites()
