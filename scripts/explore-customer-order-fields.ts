/**
 * Script : Explorer les champs CustomerOrderLine pour filtrage
 */

import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env.local') })

import { getIFSClient } from '../src/shared/services/ifs-client'

async function exploreCustomerOrderFields() {
  console.log('🔍 Exploration des champs CustomerOrderLine pour filtrage\n')

  const client = getIFSClient()

  try {
    // Récupérer un exemple complet
    console.log('📦 Récupération d\'un CustomerOrderLine complet...\n')
    
    const response = await client.get<any>(
      'CustomerOrderHandling.svc/CustomerOrderLineSet',
      {
        $filter: `CHullNumber eq 'LG5MA0114'`,
        $top: '1'
      }
    )

    if (response.value && response.value.length > 0) {
      const line = response.value[0]
      
      console.log('✅ Champs disponibles :\n')
      
      // Filtrer les champs pertinents pour le filtrage
      const relevantFields = [
        'OrderNo', 'LineNo', 'RelNo',
        'CustomerNo', 'Contract',
        'OrderType', 'OrderTypeDb', 
        'OrderClass', 'OrderClassDb',
        'CategoryId', 'CategoryIdDb',
        'ShipViaCode', 'ShipViaDesc',
        'PartOwnership', 'PartOwnershipDb',
        'CHullNumber', 'BoatHullNumber',
        'PartNo', 'CatalogNo',
        'Objstate'
      ]
      
      console.log('🔍 Champs potentiellement utiles pour filtrage :\n')
      relevantFields.forEach(field => {
        if (line.hasOwnProperty(field)) {
          console.log(`   ✅ ${field}: "${line[field]}"`)
        } else {
          console.log(`   ❌ ${field}: non disponible`)
        }
      })
      
      console.log('\n📋 Tous les champs disponibles :\n')
      Object.keys(line).forEach(key => {
        if (!key.startsWith('@odata')) {
          console.log(`   ${key}: ${JSON.stringify(line[key])}`)
        }
      })
    }

  } catch (error) {
    console.error('❌ Erreur:', error)
  }
}

exploreCustomerOrderFields()
