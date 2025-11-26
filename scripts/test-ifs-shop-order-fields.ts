/**
 * Test pour découvrir les champs disponibles dans ShopOrderHandling
 * et identifier le nom exact du champ "Sent to Cutting System"
 */

// Charger les variables d'environnement
import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(__dirname, '../.env.local') })

import { getIFSClient } from '../src/shared/services/ifs-client'
import type { IFSODataResponse } from '../src/shared/types/ifs'

async function discoverShopOrderFields() {
  console.log('🔍 DÉCOUVERTE DES CHAMPS SHOP ORDER IFS\n')
  console.log('='.repeat(80))

  const client = getIFSClient()

  try {
    // Récupérer quelques Shop Orders sans spécifier $select (pour avoir tous les champs)
    console.log('\n📊 Récupération d\'un Shop Order avec TOUS les champs...')
    
    const response = await client.get<IFSODataResponse<any>>(
      'ShopOrderHandling.svc/ShopOrds',
      {
        $filter: "Contract eq 'BDR'",
        $top: '1'
      }
    )

    if (response.value && response.value.length > 0) {
      const shopOrder = response.value[0]
      
      console.log(`✅ Shop Order trouvé: ${shopOrder.OrderNo}\n`)
      console.log('📋 CHAMPS DISPONIBLES:')
      console.log('='.repeat(80))
      
      const fields = Object.keys(shopOrder).sort()
      
      // Chercher spécifiquement les champs liés à "cutting"
      const cuttingFields = fields.filter(f => 
        f.toLowerCase().includes('cutting') || 
        f.toLowerCase().includes('cut') ||
        f.toLowerCase().includes('block')
      )
      
      console.log('\n🔪 CHAMPS LIÉS À "CUTTING" ou "BLOCK":')
      if (cuttingFields.length > 0) {
        cuttingFields.forEach(field => {
          const value = shopOrder[field]
          const type = typeof value
          console.log(`  - ${field}: ${value} (${type})`)
        })
      } else {
        console.log('  ❌ Aucun champ trouvé')
      }

      console.log('\n📋 TOUS LES CHAMPS (premier Shop Order):')
      console.log('-'.repeat(80))
      fields.forEach(field => {
        const value = shopOrder[field]
        const type = typeof value
        const display = type === 'object' ? JSON.stringify(value) : value
        console.log(`  ${field}: ${display} (${type})`)
      })

    } else {
      console.log('❌ Aucun Shop Order trouvé')
    }

  } catch (error: any) {
    console.error('❌ ERREUR:', error.message)
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response.data, null, 2))
    }
  }
}

// Exécution
discoverShopOrderFields().then(() => {
  console.log('\n✅ Test terminé')
  process.exit(0)
}).catch(error => {
  console.error('❌ Erreur fatale:', error)
  process.exit(1)
})
