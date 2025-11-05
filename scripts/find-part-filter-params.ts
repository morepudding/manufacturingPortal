/**
 * Script pour trouver les bons paramètres de filtrage pour une pièce donnée
 * 
 * Recherche tous les Shop Orders pour une pièce et affiche les valeurs de filtres
 * nécessaires pour les obtenir dans l'interface Part Printer.
 */

import { getIFSClient } from '../src/shared/services/ifs-client'

interface IFSODataResponse<T> {
  value: T[]
}

interface IFSShopOrder {
  OrderNo: string
  ReleaseNo: string
  SequenceNo: string
  Contract: string
  PartNo: string
  PartDescription: string
  Objstate: string
  RevisedStartDate: string
  CBlockDates: boolean
  ProductionLine: string | null
}

const TARGET_PART = '1000014690G136'

async function findFilterParamsForPart() {
  console.log('🔍 Recherche des Shop Orders pour la pièce:', TARGET_PART)
  console.log('━'.repeat(80))

  const client = getIFSClient()

  try {
    // Chercher tous les Shop Orders avec ce PartNo (sans filtre de site)
    console.log('\n📡 Récupération des Shop Orders (tous sites)...')
    const response = await client.get<IFSODataResponse<IFSShopOrder>>(
      'ShopOrderHandling.svc/ShopOrds',
      {
        $filter: `PartNo eq '${TARGET_PART}'`,
        $select: 'OrderNo,ReleaseNo,SequenceNo,Contract,PartNo,PartDescription,Objstate,RevisedStartDate,CBlockDates,ProductionLine',
        $orderby: 'RevisedStartDate desc',
        $top: '100'
      }
    )

    const shopOrders = response.value

    if (shopOrders.length === 0) {
      console.log('\n❌ Aucun Shop Order trouvé pour cette pièce')
      console.log('\n💡 Vérifiez:')
      console.log('   - Le numéro de pièce est correct: ' + TARGET_PART)
      console.log('   - La pièce existe dans IFS')
      console.log('   - Il y a des Shop Orders pour cette pièce')
      return
    }

    console.log(`\n✅ ${shopOrders.length} Shop Order(s) trouvé(s)\n`)

    // Analyser les valeurs uniques pour les filtres
    const sites = new Set<string>()
    const dates = new Set<string>()
    const states = new Set<string>()
    const productionLines = new Set<string>()
    const blockDates = new Set<boolean>()

    shopOrders.forEach(order => {
      sites.add(order.Contract)
      if (order.RevisedStartDate) {
        const date = order.RevisedStartDate.split('T')[0]
        dates.add(date)
      }
      states.add(order.Objstate)
      if (order.ProductionLine) {
        productionLines.add(order.ProductionLine)
      }
      blockDates.add(order.CBlockDates)
    })

    // Afficher les résultats groupés
    console.log('📊 RÉSUMÉ DES SHOP ORDERS\n')
    console.log('Sites (Contract):')
    sites.forEach(site => {
      const count = shopOrders.filter(o => o.Contract === site).length
      console.log(`   - ${site} (${count} Shop Order(s))`)
    })

    console.log('\nDates (RevisedStartDate):')
    Array.from(dates).sort().forEach(date => {
      const count = shopOrders.filter(o => o.RevisedStartDate?.startsWith(date)).length
      console.log(`   - ${date} (${count} Shop Order(s))`)
    })

    console.log('\nStates (Objstate):')
    states.forEach(state => {
      const count = shopOrders.filter(o => o.Objstate === state).length
      console.log(`   - ${state} (${count} Shop Order(s))`)
    })

    console.log('\nBlock Dates (CBlockDates):')
    blockDates.forEach(blockDate => {
      const count = shopOrders.filter(o => o.CBlockDates === blockDate).length
      console.log(`   - ${blockDate} (${count} Shop Order(s))`)
    })

    console.log('\nProduction Lines:')
    if (productionLines.size === 0) {
      console.log('   - (aucune)')
    } else {
      productionLines.forEach(line => {
        const count = shopOrders.filter(o => o.ProductionLine === line).length
        console.log(`   - ${line} (${count} Shop Order(s))`)
      })
    }

    // Afficher les détails de chaque Shop Order
    console.log('\n' + '━'.repeat(80))
    console.log('📋 DÉTAILS DES SHOP ORDERS\n')

    shopOrders.forEach((order, index) => {
      console.log(`${index + 1}. Shop Order ${order.OrderNo}-${order.ReleaseNo}-${order.SequenceNo}`)
      console.log(`   Site:            ${order.Contract}`)
      console.log(`   Date:            ${order.RevisedStartDate?.split('T')[0] || 'N/A'}`)
      console.log(`   State:           ${order.Objstate}`)
      console.log(`   Block Date:      ${order.CBlockDates}`)
      console.log(`   Production Line: ${order.ProductionLine || 'N/A'}`)
      console.log(`   Description:     ${order.PartDescription || 'N/A'}`)
      console.log()
    })

    // Proposer des paramètres de filtrage
    console.log('━'.repeat(80))
    console.log('🎯 PARAMÈTRES POUR L\'INTERFACE PART PRINTER\n')

    // Prendre le Shop Order Released le plus récent comme exemple
    const releasedOrders = shopOrders.filter(o => o.Objstate === 'Released')
    const exampleOrder = releasedOrders.length > 0 ? releasedOrders[0] : shopOrders[0]

    console.log('Pour obtenir le Shop Order:', `${exampleOrder.OrderNo}-${exampleOrder.ReleaseNo}-${exampleOrder.SequenceNo}`)
    console.log('\nParametres à entrer dans l\'interface:')
    console.log(`   Site:               ${exampleOrder.Contract}`)
    console.log(`   Production Line:    ${exampleOrder.ProductionLine || '(laisser vide)'}`)
    console.log(`   Start Date:         ${exampleOrder.RevisedStartDate?.split('T')[0]}`)
    console.log(`   Mode:               ${exampleOrder.CBlockDates ? 'Débit classique' : 'Redébit'}`)
    console.log(`   OP10 Block ID:      (laisser sur "No condition")`)

    if (exampleOrder.Objstate !== 'Released') {
      console.log('\n⚠️  ATTENTION: Ce Shop Order est en état "' + exampleOrder.Objstate + '"')
      console.log('    Le mode dev/test doit être activé pour voir les Shop Orders non-Released')
    }

    // Afficher tous les ensembles de paramètres possibles
    if (shopOrders.length > 1) {
      console.log('\n' + '─'.repeat(80))
      console.log('📝 AUTRES COMBINAISONS POSSIBLES:\n')

      shopOrders.slice(0, 5).forEach((order, index) => {
        console.log(`${index + 1}. Site: ${order.Contract}, Date: ${order.RevisedStartDate?.split('T')[0]}, Mode: ${order.CBlockDates ? 'Débit classique' : 'Redébit'}, State: ${order.Objstate}`)
      })

      if (shopOrders.length > 5) {
        console.log(`   ... et ${shopOrders.length - 5} autre(s)`)
      }
    }

  } catch (error) {
    console.error('\n❌ Erreur lors de la recherche:', error)
    if (error instanceof Error) {
      console.error('   Message:', error.message)
    }
  }
}

// Exécution
findFilterParamsForPart()
  .then(() => {
    console.log('\n✅ Analyse terminée')
    process.exit(0)
  })
  .catch(error => {
    console.error('\n❌ Erreur fatale:', error)
    process.exit(1)
  })
