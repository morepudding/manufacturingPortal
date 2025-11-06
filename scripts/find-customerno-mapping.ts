/**
 * Script : Identifier le bon CustomerNo pour chaque HullNumber
 */

import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env.local') })

import { getIFSClient } from '../src/shared/services/ifs-client'

async function findCustomerNoForHull() {
  console.log('🔍 Recherche du CustomerNo pour chaque HullNumber\n')

  const client = getIFSClient()
  
  const testHulls = [
    'LG5MA0114', // Shop Order 97277
    'JY6MB0019', // Shop Order 563
    'LX6MA0116', // Shop Order 949
    'LX6MA0115', // Shop Order 1043
  ]

  for (const hull of testHulls) {
    console.log(`\n📦 Hull Number: ${hull}`)
    console.log('-'.repeat(60))

    try {
      // Recherche SANS filtre pour voir tous les résultats possibles
      const response = await client.get<any>(
        'CustomerOrderHandling.svc/CustomerOrderLineSet',
        {
          $filter: `CHullNumber eq '${hull}'`,
          $select: 'OrderNo,CustomerNo,Contract,PartNo',
          $top: '5'
        }
      )

      if (response.value && response.value.length > 0) {
        console.log(`✅ Trouvé ${response.value.length} résultat(s):`)
        response.value.forEach((line: any, idx: number) => {
          console.log(`   ${idx + 1}. OrderNo: ${line.OrderNo}`)
          console.log(`      CustomerNo: ${line.CustomerNo} ⭐ (à utiliser pour filtrer)`)
          console.log(`      Contract: ${line.Contract} (site production)`)
          console.log(`      PartNo: ${line.PartNo}`)
        })
      } else {
        console.log('❌ Aucun résultat')
      }

    } catch (error) {
      console.log('❌ Erreur:', error instanceof Error ? error.message : error)
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log('📋 RÉSUMÉ: Utilisez CustomerNo (pas Contract) pour filtrer')
  console.log('='.repeat(60))
}

findCustomerNoForHull()
