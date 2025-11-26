/**
 * Test des filtres PartPrinter - Reproduction bug Massifs 24/11
 * 
 * Bug reporté:
 * 1. Avec "Sent to Cutting System = YES" → 2 SO attendus sur IFS, 0 retourné ("No shop order found")
 * 2. Sans filtres Block Date/Sent to Cutting → 73 SO attendus (75 total - 2 sent to cutting = YES), 72 retournés + affichage "75 SO"
 * 
 * Ce script va:
 * 1. Tester un appel IFS direct pour récupérer tous les Massifs du 24/11
 * 2. Vérifier les valeurs de CBlockDates et SentToCuttingSystem
 * 3. Appliquer manuellement les filtres pour comprendre le problème
 */

// Charger les variables d'environnement
import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(__dirname, '../.env.local') })

import { getIFSClient } from '../src/shared/services/ifs-client'
import type { IFSODataResponse } from '../src/shared/types/ifs'

interface ShopOrderDebug {
  OrderNo: string
  ReleaseNo: string
  SequenceNo: string
  PartNo: string
  PartDescription: string
  Objstate: string
  RevisedStartDate: string
  CBlockDates: boolean
  ProductionLine?: string
  SentToCuttingSystem?: boolean
  OperationBlockId?: string
}

async function testMassifs24Nov() {
  console.log('🧪 TEST PART PRINTER - MASSIFS 24/11/2025\n')
  console.log('=' .repeat(80))

  const client = getIFSClient()

  try {
    // 1. Récupération de TOUS les Shop Orders Massifs du 24/11
    console.log('\n📊 ÉTAPE 1: Récupération TOUS les Shop Orders Massifs')
    console.log('-'.repeat(80))

    const allResponse = await client.get<IFSODataResponse<ShopOrderDebug>>(
      'ShopOrderHandling.svc/ShopOrds',
      {
        $filter: "Contract eq 'BDR'",
        $select: 'OrderNo,ReleaseNo,SequenceNo,PartNo,PartDescription,Objstate,RevisedStartDate,CBlockDates,ProductionLine,SentToCuttingSystem',
        $orderby: 'OrderNo asc',
        $top: '5000'
      }
    )

    let allOrders = allResponse.value || []
    console.log(`✅ Total Shop Orders IFS (BDR, tous états): ${allOrders.length}`)

    // Filtrage par Objstate = Released
    allOrders = allOrders.filter(o => o.Objstate === 'Released')
    console.log(`✅ Shop Orders avec Objstate='Released': ${allOrders.length}`)

    // Filtrage par date 24/11/2025
    const targetDate = '2025-11-24'
    const orders24Nov = allOrders.filter(order => {
      if (!order.RevisedStartDate) return false
      const orderDate = new Date(order.RevisedStartDate).toISOString().split('T')[0]
      return orderDate === targetDate
    })

    console.log(`✅ Shop Orders avec date ${targetDate}: ${orders24Nov.length}`)

    // Filtrage par PartNo commençant par "AN" (Massifs)
    const massifs = orders24Nov.filter(order => 
      order.PartNo && order.PartNo.startsWith('AN')
    )

    console.log(`✅ Massifs (PartNo starts with 'AN'): ${massifs.length}`)

    // 2. Analyse des champs CBlockDates et SentToCuttingSystem
    console.log('\n📊 ÉTAPE 2: Analyse des champs de filtrage')
    console.log('-'.repeat(80))

    const withCBlockDatesTrue = massifs.filter(o => o.CBlockDates === true)
    const withCBlockDatesFalse = massifs.filter(o => o.CBlockDates === false)
    const withSentToCuttingTrue = massifs.filter(o => o.SentToCuttingSystem === true)
    const withSentToCuttingFalse = massifs.filter(o => o.SentToCuttingSystem === false || o.SentToCuttingSystem === undefined)

    console.log(`📌 CBlockDates = TRUE: ${withCBlockDatesTrue.length}`)
    console.log(`📌 CBlockDates = FALSE: ${withCBlockDatesFalse.length}`)
    console.log(`📌 SentToCuttingSystem = TRUE: ${withSentToCuttingTrue.length}`)
    console.log(`📌 SentToCuttingSystem = FALSE ou undefined: ${withSentToCuttingFalse.length}`)

    // 3. Test du filtre "Sent to Cutting System = YES"
    console.log('\n📊 ÉTAPE 3: Test filtre "Sent to Cutting System = YES"')
    console.log('-'.repeat(80))

    const sentToCuttingYes = massifs.filter(o => o.SentToCuttingSystem === true)
    console.log(`✅ Résultats attendus (IFS): ${sentToCuttingYes.length} SO`)

    if (sentToCuttingYes.length > 0) {
      console.log('\n📋 Détails des Shop Orders avec SentToCuttingSystem = TRUE:')
      sentToCuttingYes.forEach(order => {
        console.log(`  - ${order.OrderNo} (${order.PartNo}): CBlockDates=${order.CBlockDates}, SentToCuttingSystem=${order.SentToCuttingSystem}`)
      })
    } else {
      console.log('⚠️ AUCUN Shop Order avec SentToCuttingSystem = TRUE trouvé !')
    }

    // 4. Test du filtre "Block Date = NO" (devrait exclure CBlockDates = TRUE)
    console.log('\n📊 ÉTAPE 4: Test filtre "Block Date = NO"')
    console.log('-'.repeat(80))

    const blockDateNo = massifs.filter(o => o.CBlockDates === false)
    console.log(`✅ Résultats attendus (CBlockDates = FALSE): ${blockDateNo.length} SO`)

    // 5. Calcul attendu: 75 total - 2 sent to cutting = YES - 1 block date = YES
    console.log('\n📊 ÉTAPE 5: Calcul attendu selon bug reporté')
    console.log('-'.repeat(80))

    console.log(`Total Massifs 24/11: ${massifs.length}`)
    console.log(`- SentToCuttingSystem = TRUE: ${withSentToCuttingTrue.length}`)
    console.log(`- CBlockDates = TRUE (mais SentToCuttingSystem = FALSE): ${withCBlockDatesTrue.filter(o => o.SentToCuttingSystem !== true).length}`)
    console.log(`= Attendu (sans filtres actifs): ${massifs.length - withSentToCuttingTrue.length - withCBlockDatesTrue.filter(o => o.SentToCuttingSystem !== true).length}`)
    console.log(`Obtenu actuellement: 72`)

    // 6. Vérification du champ SentToCuttingSystem dans IFS
    console.log('\n📊 ÉTAPE 6: Vérification disponibilité champ SentToCuttingSystem')
    console.log('-'.repeat(80))

    const hasSentToCutting = massifs.some(o => o.SentToCuttingSystem !== undefined)
    if (hasSentToCutting) {
      console.log('✅ Champ SentToCuttingSystem DISPONIBLE dans IFS')
    } else {
      console.log('❌ Champ SentToCuttingSystem NON DISPONIBLE dans IFS (toujours undefined)')
      console.log('⚠️ CAUSE PROBABLE DU BUG: Le champ n\'existe pas dans cette version d\'IFS')
    }

    // 7. Récupération OperationBlockId pour un échantillon (vérifier si le filtrage Block Date fonctionne)
    console.log('\n📊 ÉTAPE 7: Vérification OperationBlockId sur échantillon')
    console.log('-'.repeat(80))

    const sampleOrders = massifs.slice(0, 5)
    console.log(`Échantillon: ${sampleOrders.length} Shop Orders`)

    for (const order of sampleOrders) {
      try {
        const opResponse = await client.get<IFSODataResponse<any>>(
          `ShopOrderHandling.svc/ShopOrds(OrderNo='${order.OrderNo}',ReleaseNo='${order.ReleaseNo}',SequenceNo='${order.SequenceNo}')/OperationArray`,
          {
            $filter: 'OperationNo eq 10',
            $select: 'OperationNo,OperationBlockId'
          }
        )

        const op10 = opResponse.value?.[0]
        const blockId = op10?.OperationBlockId || 'NULL'
        console.log(`  - ${order.OrderNo}: OperationBlockId=${blockId}, CBlockDates=${order.CBlockDates}, SentToCuttingSystem=${order.SentToCuttingSystem}`)
      } catch (error: any) {
        console.log(`  - ${order.OrderNo}: ❌ Erreur récupération OP10 (${error.message})`)
      }
    }

    // 8. Tableau récapitulatif
    console.log('\n📊 RÉCAPITULATIF')
    console.log('='.repeat(80))
    console.log(`Total Massifs 24/11: ${massifs.length}`)
    console.log(`CBlockDates = TRUE: ${withCBlockDatesTrue.length}`)
    console.log(`CBlockDates = FALSE: ${withCBlockDatesFalse.length}`)
    console.log(`SentToCuttingSystem = TRUE: ${withSentToCuttingTrue.length}`)
    console.log(`SentToCuttingSystem = FALSE/undefined: ${withSentToCuttingFalse.length}`)
    console.log('\n🐛 BUGS IDENTIFIÉS:')
    if (!hasSentToCutting) {
      console.log('❌ 1. Champ SentToCuttingSystem non disponible dans IFS → Filtre ne peut pas fonctionner')
    }
    if (withSentToCuttingTrue.length !== 2) {
      console.log(`⚠️ 2. SentToCuttingSystem = TRUE: ${withSentToCuttingTrue.length} trouvés (attendu: 2)`)
    }

  } catch (error: any) {
    console.error('❌ ERREUR:', error.message)
    if (error.response) {
      console.error('Response:', error.response.data)
    }
  }
}

// Exécution
testMassifs24Nov().then(() => {
  console.log('\n✅ Test terminé')
  process.exit(0)
}).catch(error => {
  console.error('❌ Erreur fatale:', error)
  process.exit(1)
})
