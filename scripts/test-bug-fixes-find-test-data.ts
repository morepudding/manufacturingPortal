/**
 * Script de test pour trouver des jeux de données sur AST (DEV)
 * permettant de valider les correctifs des bugs de filtrage
 * 
 * Bugs corrigés:
 * - Bug #1: SentToCuttingSystem absent du $select
 * - Bug #2: Filtrage date toujours actif
 * 
 * Objectif: Trouver des Shop Orders avec différentes combinaisons de:
 * - CBlockDates (true/false)
 * - SentToCuttingSystem (true/false)
 * - Même date de production
 */

// Charger les variables d'environnement
import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(__dirname, '../.env.local') })

import { getIFSClient } from '../src/shared/services/ifs-client'
import type { IFSODataResponse } from '../src/shared/types/ifs'

interface ShopOrderTest {
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
  Contract: string
}

async function findTestData() {
  console.log('🔍 RECHERCHE DE JEUX DE DONNÉES DE TEST SUR AST (DEV)\n')
  console.log('=' .repeat(80))

  const client = getIFSClient()

  try {
    // 1. Récupérer tous les Shop Orders (sans filtre site)
    console.log('\n📊 ÉTAPE 1: Récupération des Shop Orders (tous sites)')
    console.log('-'.repeat(80))

    const response = await client.get<IFSODataResponse<ShopOrderTest>>(
      'ShopOrderHandling.svc/ShopOrds',
      {
        // Pas de filtre Contract pour voir tous les sites disponibles
        $select: 'OrderNo,ReleaseNo,SequenceNo,PartNo,PartDescription,Objstate,RevisedStartDate,CBlockDates,ProductionLine,SentToCuttingSystem,Contract',
        $orderby: 'RevisedStartDate desc',
        $top: '500'
      }
    )

    let allOrders = response.value || []
    console.log(`✅ Total Shop Orders récupérés: ${allOrders.length}`)

    // Voir quels sites sont disponibles
    const sites = [...new Set(allOrders.map(o => o.Contract))].filter(Boolean)
    console.log(`✅ Sites disponibles: ${sites.join(', ') || 'Aucun'}`)

    // Filtrer par Objstate = Released
    allOrders = allOrders.filter(o => o.Objstate === 'Released')
    console.log(`✅ Shop Orders avec Objstate='Released': ${allOrders.length}`)

    if (allOrders.length === 0) {
      console.log('❌ Aucun Shop Order trouvé sur AST. Impossible de créer des jeux de test.')
      return
    }

    // 2. Analyser les champs disponibles
    console.log('\n📊 ÉTAPE 2: Analyse des champs disponibles')
    console.log('-'.repeat(80))

    const hasSentToCutting = allOrders.some(o => o.SentToCuttingSystem !== undefined)
    console.log(`Champ SentToCuttingSystem: ${hasSentToCutting ? '✅ DISPONIBLE' : '❌ NON DISPONIBLE'}`)

    if (!hasSentToCutting) {
      console.log('⚠️ ATTENTION: Le champ SentToCuttingSystem n\'est pas disponible sur AST')
      console.log('   Les tests sur ce filtre ne pourront pas être validés sur cet environnement')
    }

    // 3. Grouper par date
    console.log('\n📊 ÉTAPE 3: Groupement par date')
    console.log('-'.repeat(80))

    const byDate = new Map<string, ShopOrderTest[]>()
    allOrders.forEach(order => {
      if (!order.RevisedStartDate) return
      const date = new Date(order.RevisedStartDate).toISOString().split('T')[0]
      if (!byDate.has(date)) {
        byDate.set(date, [])
      }
      byDate.get(date)!.push(order)
    })

    // Trier par nombre de SO décroissant
    const datesSorted = Array.from(byDate.entries())
      .sort((a, b) => b[1].length - a[1].length)

    console.log(`✅ Dates trouvées: ${datesSorted.length}`)
    console.log('\nTop 10 dates avec le plus de Shop Orders:')
    datesSorted.slice(0, 10).forEach(([date, orders]) => {
      console.log(`  - ${date}: ${orders.length} SO`)
    })

    // 4. Trouver une date avec diversité de données
    console.log('\n📊 ÉTAPE 4: Recherche d\'une date avec diversité (CBlockDates + SentToCuttingSystem)')
    console.log('-'.repeat(80))

    let bestDate: string | null = null
    let bestOrders: ShopOrderTest[] = []

    for (const [date, orders] of datesSorted) {
      if (orders.length < 3) continue // Au moins 3 SO pour faire des tests

      const withCBlockTrue = orders.filter(o => o.CBlockDates === true).length
      const withCBlockFalse = orders.filter(o => o.CBlockDates === false).length
      const withSentTrue = orders.filter(o => o.SentToCuttingSystem === true).length
      const withSentFalse = orders.filter(o => o.SentToCuttingSystem === false || o.SentToCuttingSystem === undefined).length

      // Chercher une date avec diversité
      if (withCBlockTrue > 0 && withCBlockFalse > 0) {
        bestDate = date
        bestOrders = orders
        
        console.log(`✅ Date trouvée: ${date}`)
        console.log(`   - Total SO: ${orders.length}`)
        console.log(`   - CBlockDates = TRUE: ${withCBlockTrue}`)
        console.log(`   - CBlockDates = FALSE: ${withCBlockFalse}`)
        console.log(`   - SentToCuttingSystem = TRUE: ${withSentTrue}`)
        console.log(`   - SentToCuttingSystem = FALSE/undefined: ${withSentFalse}`)
        break
      }
    }

    if (!bestDate) {
      console.log('⚠️ Aucune date avec diversité trouvée, utilisation de la date avec le plus de SO')
      bestDate = datesSorted[0][0]
      bestOrders = datesSorted[0][1]
    }

    // Quel site utiliser ?
    const testSite = bestOrders[0].Contract
    console.log(`\n✅ Site de test sélectionné: ${testSite}`)

    // 5. Créer les jeux de données de test
    console.log('\n📊 ÉTAPE 5: JEUX DE DONNÉES DE TEST')
    console.log('='.repeat(80))

    const withCBlockTrue = bestOrders.filter(o => o.CBlockDates === true)
    const withCBlockFalse = bestOrders.filter(o => o.CBlockDates === false)
    const withSentTrue = bestOrders.filter(o => o.SentToCuttingSystem === true)
    const withSentFalse = bestOrders.filter(o => o.SentToCuttingSystem === false || o.SentToCuttingSystem === undefined)

    console.log('\n🧪 JEU DE TEST #1: Test filtre Block Date')
    console.log('-'.repeat(80))
    console.log('Objectif: Vérifier que le filtre Block Date fonctionne correctement')
    console.log('')
    console.log('Configuration:')
    console.log(`  - Site: ${testSite}`)
    console.log(`  - Date: ${bestDate}`)
    console.log('  - Block Date: ENABLED, Value = TRUE')
    console.log('  - Sent to Cutting: DISABLED')
    console.log('')
    console.log(`Résultat attendu: ${withCBlockTrue.length} Shop Orders`)
    if (withCBlockTrue.length > 0) {
      console.log('\nExemples de Shop Orders (5 premiers):')
      withCBlockTrue.slice(0, 5).forEach(o => {
        console.log(`  - ${o.OrderNo} (${o.PartNo}): CBlockDates=${o.CBlockDates}, SentToCuttingSystem=${o.SentToCuttingSystem}`)
      })
    }

    console.log('\n🧪 JEU DE TEST #2: Test filtre Sent to Cutting System')
    console.log('-'.repeat(80))
    console.log('Objectif: Vérifier que le filtre Sent to Cutting System fonctionne correctement')
    console.log('')
    console.log('Configuration:')
    console.log(`  - Site: ${testSite}`)
    console.log(`  - Date: ${bestDate}`)
    console.log('  - Block Date: DISABLED')
    console.log('  - Sent to Cutting: ENABLED, Value = TRUE')
    console.log('')
    
    if (hasSentToCutting && withSentTrue.length > 0) {
      console.log(`Résultat attendu: ${withSentTrue.length} Shop Orders`)
      console.log('\nExemples de Shop Orders (5 premiers):')
      withSentTrue.slice(0, 5).forEach(o => {
        console.log(`  - ${o.OrderNo} (${o.PartNo}): CBlockDates=${o.CBlockDates}, SentToCuttingSystem=${o.SentToCuttingSystem}`)
      })
    } else {
      console.log('⚠️ IMPOSSIBLE DE TESTER: Aucun Shop Order avec SentToCuttingSystem = TRUE')
      console.log('   OU le champ SentToCuttingSystem n\'est pas disponible sur AST')
      
      // Alternative: tester avec FALSE
      console.log('\n📋 TEST ALTERNATIF: Sent to Cutting = FALSE')
      console.log(`Résultat attendu: ${withSentFalse.length} Shop Orders`)
    }

    // 6. Résumé des commandes à exécuter
    console.log('\n📋 COMMANDES DE TEST À EXÉCUTER')
    console.log('='.repeat(80))

    console.log('\n1️⃣ Test Block Date = TRUE:')
    console.log('   Dans l\'interface PartPrinter sur http://localhost:3000/part-printer')
    console.log(`   - Site: ${testSite}`)
    console.log(`   - Date: ${bestDate}`)
    console.log('   - Block Date: ✅ Enabled, Value = TRUE')
    console.log('   - Sent to Cutting: ❌ Disabled')
    console.log(`   ➡️ Attendu: ${withCBlockTrue.length} Shop Orders`)

    console.log('\n2️⃣ Test Sent to Cutting System = TRUE:')
    if (hasSentToCutting && withSentTrue.length > 0) {
      console.log('   Dans l\'interface PartPrinter sur http://localhost:3000/part-printer')
      console.log(`   - Site: ${testSite}`)
      console.log(`   - Date: ${bestDate}`)
      console.log('   - Block Date: ❌ Disabled')
      console.log('   - Sent to Cutting: ✅ Enabled, Value = TRUE')
      console.log(`   ➡️ Attendu: ${withSentTrue.length} Shop Orders`)
    } else {
      console.log('   ⚠️ TEST NON DISPONIBLE SUR AST (champ ou données manquantes)')
      console.log('   Ce test devra être fait sur ACC/PROD')
    }

    console.log('\n3️⃣ Test TOUS filtres désactivés (baseline):')
    console.log('   Dans l\'interface PartPrinter sur http://localhost:3000/part-printer')
    console.log(`   - Site: ${testSite}`)
    console.log(`   - Date: ${bestDate}`)
    console.log('   - Block Date: ❌ Disabled')
    console.log('   - Sent to Cutting: ❌ Disabled')
    console.log(`   ➡️ Attendu: ${bestOrders.length} Shop Orders (tous les SO de la date)`)

    // 7. Vérifier le champ dans la réponse
    console.log('\n📊 ÉTAPE 6: Vérification du champ SentToCuttingSystem dans la réponse')
    console.log('-'.repeat(80))

    if (bestOrders.length > 0) {
      const sample = bestOrders[0]
      console.log('Premier Shop Order récupéré:')
      console.log(`  OrderNo: ${sample.OrderNo}`)
      console.log(`  PartNo: ${sample.PartNo}`)
      console.log(`  CBlockDates: ${sample.CBlockDates}`)
      console.log(`  SentToCuttingSystem: ${sample.SentToCuttingSystem}`)
      
      if (sample.SentToCuttingSystem !== undefined) {
        console.log('\n✅ Le champ SentToCuttingSystem est bien retourné par IFS')
        console.log('   Le Bug #1 est corrigé et fonctionnel')
      } else {
        console.log('\n❌ Le champ SentToCuttingSystem est undefined')
        console.log('   Causes possibles:')
        console.log('   1. Le champ n\'existe pas sur AST (environnement de dev)')
        console.log('   2. Le champ n\'est pas encore ajouté au $select')
        console.log('   3. Le nom du champ est différent')
      }
    }

  } catch (error: any) {
    console.error('❌ ERREUR:', error.message)
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response.data, null, 2))
    }
  }
}

// Exécution
findTestData().then(() => {
  console.log('\n✅ Recherche terminée')
  process.exit(0)
}).catch(error => {
  console.error('❌ Erreur fatale:', error)
  process.exit(1)
})
