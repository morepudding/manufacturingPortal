/**
 * Script d'exploration : Serial Reservation avec Customer Order
 * 
 * Objectif : Trouver les champs disponibles dans SerialReservation
 * qui permettent de lier directement au Customer Order
 */

// Charger les variables d'environnement
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env.local') })

import { getIFSClient } from '../src/shared/services/ifs-client'

async function exploreSerialReservation() {
  console.log('🔍 Exploration de SerialReservation API...\n')

  const client = getIFSClient()

  try {
    // Test avec un Serial Number connu
    const testSerialNumbers = [
      'LG5MA0114', // Shop Order 97277
      'JY6MB0019', // Shop Order 563
      'LX6MA0116', // Shop Order 949
    ]

    for (const serialNo of testSerialNumbers) {
      console.log(`\n${'='.repeat(80)}`)
      console.log(`📦 Serial Number: ${serialNo}`)
      console.log('='.repeat(80))

      // Essayer Reference_DopHeadSerialReserv (endpoint actuel)
      console.log('\n🔍 Endpoint: DopHeaderHandling.svc/Reference_DopHeadSerialReserv')
      try {
        const response1 = await client.get<any>(
          'DopHeaderHandling.svc/Reference_DopHeadSerialReserv',
          {
            $filter: `SerialNo eq '${serialNo}'`,
            $top: '1'
          }
        )

        if (response1.value && response1.value.length > 0) {
          console.log('✅ Données trouvées:')
          console.log(JSON.stringify(response1.value[0], null, 2))
        } else {
          console.log('❌ Aucune donnée trouvée')
        }
      } catch (error) {
        console.log('❌ Erreur:', error instanceof Error ? error.message : error)
      }

      // Essayer SerialNumberReservation (possiblement plus complet)
      console.log('\n🔍 Endpoint: SerialNumberReservation.svc/SerialNumberReservations')
      try {
        const response2 = await client.get<any>(
          'SerialNumberReservation.svc/SerialNumberReservations',
          {
            $filter: `SerialNo eq '${serialNo}'`,
            $top: '1'
          }
        )

        if (response2.value && response2.value.length > 0) {
          console.log('✅ Données trouvées:')
          console.log(JSON.stringify(response2.value[0], null, 2))
        } else {
          console.log('❌ Aucune donnée trouvée')
        }
      } catch (error) {
        console.log('❌ Erreur:', error instanceof Error ? error.message : error)
      }

      // Essayer PartSerialCatalog (autre possibilité)
      console.log('\n🔍 Endpoint: PartSerialCatalog.svc/PartSerialCatalogs')
      try {
        const response3 = await client.get<any>(
          'PartSerialCatalog.svc/PartSerialCatalogs',
          {
            $filter: `SerialNo eq '${serialNo}'`,
            $top: '1'
          }
        )

        if (response3.value && response3.value.length > 0) {
          console.log('✅ Données trouvées:')
          console.log(JSON.stringify(response3.value[0], null, 2))
        } else {
          console.log('❌ Aucune donnée trouvée')
        }
      } catch (error) {
        console.log('❌ Erreur:', error instanceof Error ? error.message : error)
      }

      // Essayer CustomerOrderLineHandling avec navigation
      console.log('\n🔍 Endpoint: CustomerOrderHandling.svc/CustomerOrderLineSet')
      try {
        const response4 = await client.get<any>(
          'CustomerOrderHandling.svc/CustomerOrderLineSet',
          {
            $filter: `CHullNumber eq '${serialNo}'`,
            $select: 'OrderNo,LineNo,RelNo,PartNo,CHullNumber,CustomerNo',
            $top: '1'
          }
        )

        if (response4.value && response4.value.length > 0) {
          console.log('✅ Données trouvées:')
          console.log(JSON.stringify(response4.value[0], null, 2))
        } else {
          console.log('❌ Aucune donnée trouvée')
        }
      } catch (error) {
        console.log('❌ Erreur:', error instanceof Error ? error.message : error)
      }
    }

    console.log('\n' + '='.repeat(80))
    console.log('✅ Exploration terminée')
    console.log('='.repeat(80))

  } catch (error) {
    console.error('❌ Erreur globale:', error)
    process.exit(1)
  }
}

exploreSerialReservation()
