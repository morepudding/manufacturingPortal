/**
 * Script de recherche de Shop Orders avec OperationBlockId
 * 
 * Recherche des Shop Orders où OperationBlockId n'est pas NULL
 * pour comprendre la structure des blocs d'opération
 * 
 * Usage: npx tsx scripts/find-shoporders-with-operation-block.ts
 */

import { getIFSClient } from '../src/shared/services/ifs-client'

interface IFSShopOrderOperation {
  OrderNo: string
  ReleaseNo: string
  SequenceNo: string
  OperationNo: number
  OperationDescription: string
  OperationBlockId: string | null
  OperStatusCode: string
  Contract: string
  WorkCenterNo: string
  PartNo: string
  RemainingQty: number
  OperationBlockObjstate: string | null
  // Autres propriétés
  [key: string]: any
}

interface IFSShopOrder {
  OrderNo: string
  ReleaseNo: string
  SequenceNo: string
  Contract: string
  PartNo: string
  ObjState: string
  RevisedQtyDue: number
  QtyComplete: number
  // Navigation properties
  OperationArray?: IFSShopOrderOperation[]
  [key: string]: any
}

interface IFSODataResponse<T> {
  '@odata.context': string
  value: T[]
  '@odata.nextLink'?: string
}

async function findShopOrdersWithOperationBlock() {
  console.log('🔍 === RECHERCHE SHOP ORDERS AVEC OPERATION BLOCK ID ===\n')
  console.log('⚡ Utilisation de la stratégie RAPIDE (requête directe)\n')
  
  try {
    const client = getIFSClient()
    
    // 1. Recherche directe sur les opérations (RAPIDE)
    console.log('📋 1. Recherche directe sur ShopOrderOperationSet...\n')
    
    let directResponse: IFSODataResponse<IFSShopOrderOperation>
    
    try {
      directResponse = await client.get<IFSODataResponse<IFSShopOrderOperation>>(
        'ShopOrderHandling.svc/ShopOrderOperationSet',
        {
          $select: 'OrderNo,ReleaseNo,SequenceNo,OperationNo,OperationDescription,OperationBlockId,OperationBlockObjstate,OperStatusCode,WorkCenterNo,PartNo,RemainingQty,Contract',
          $filter: "OperationBlockId ne null",
          $top: '100',
          $orderby: 'OrderNo desc'
        }
      )
      
      console.log(`✅ ${directResponse.value.length} opération(s) avec OperationBlockId trouvée(s)\n`)
      console.log('='.repeat(120))
      
    } catch (error: any) {
      console.log(`❌ Erreur avec filtre "ne null": ${error.message}`)
      console.log('   Tentative sans filtre et filtrage côté client...\n')
      
      // Fallback: récupérer sans filtre et filtrer côté client
      directResponse = await client.get<IFSODataResponse<IFSShopOrderOperation>>(
        'ShopOrderHandling.svc/ShopOrderOperationSet',
        {
          $select: 'OrderNo,ReleaseNo,SequenceNo,OperationNo,OperationDescription,OperationBlockId,OperationBlockObjstate,OperStatusCode,WorkCenterNo,PartNo,RemainingQty,Contract',
          $top: '500',
          $orderby: 'OrderNo desc'
        }
      )
      
      // Filtrer côté client
      directResponse.value = directResponse.value.filter(op => op.OperationBlockId !== null)
      console.log(`✅ ${directResponse.value.length} opération(s) avec OperationBlockId (filtré côté client)\n`)
      console.log('='.repeat(120))
    }
    
    if (directResponse.value.length === 0) {
      console.log('\n❌ Aucune opération trouvée avec OperationBlockId')
      console.log('   → Les Operation Blocks ne sont peut-être pas utilisés dans ce système IFS')
      console.log('\n✅ === RECHERCHE TERMINÉE ===\n')
      return
    }
    
    // 2. Grouper par Shop Order
    console.log('\n📊 2. REGROUPEMENT PAR SHOP ORDER:\n')
    console.log('-'.repeat(100))
    
    const shopOrderMap = new Map<string, IFSShopOrderOperation[]>()
    
    directResponse.value.forEach(op => {
      const key = `${op.OrderNo}-${op.ReleaseNo}-${op.SequenceNo}`
      if (!shopOrderMap.has(key)) {
        shopOrderMap.set(key, [])
      }
      shopOrderMap.get(key)!.push(op)
    })
    
    console.log(`   Nombre de Shop Orders distincts: ${shopOrderMap.size}\n`)
    
    // Afficher chaque Shop Order
    let shopOrderIndex = 1
    shopOrderMap.forEach((operations, shopOrderKey) => {
      const firstOp = operations[0]
      console.log(`\n${shopOrderIndex}. SHOP ORDER: ${shopOrderKey}`)
      console.log('-'.repeat(100))
      console.log(`   🏭 Site: ${firstOp.Contract}`)
      console.log(`   📦 Part No: ${firstOp.PartNo}`)
      console.log(`   🔧 ${operations.length} opération(s) avec Block ID:`)
      
      operations.forEach(op => {
        console.log(`\n      OP ${op.OperationNo} - ${op.OperationDescription}`)
        console.log(`         ├─ Block ID: ${op.OperationBlockId}`)
        console.log(`         ├─ Block State: ${op.OperationBlockObjstate || 'N/A'}`)
        console.log(`         ├─ Status: ${op.OperStatusCode}`)
        console.log(`         ├─ Work Center: ${op.WorkCenterNo}`)
        console.log(`         └─ Remaining Qty: ${op.RemainingQty}`)
      })
      
      shopOrderIndex++
    })
    
    // 3. Analyser les patterns d'OperationBlockId
    console.log('\n\n� 3. ANALYSE DES OPERATION BLOCK IDs:\n')
    console.log('-'.repeat(100))
    
    const allBlockIds = new Set<string>()
    const blockIdUsage = new Map<string, number>()
    const blockIdBySite = new Map<string, Set<string>>()
    
    directResponse.value.forEach(op => {
      if (op.OperationBlockId) {
        allBlockIds.add(op.OperationBlockId)
        blockIdUsage.set(
          op.OperationBlockId, 
          (blockIdUsage.get(op.OperationBlockId) || 0) + 1
        )
        
        if (!blockIdBySite.has(op.Contract)) {
          blockIdBySite.set(op.Contract, new Set())
        }
        blockIdBySite.get(op.Contract)!.add(op.OperationBlockId)
      }
    })
    
    console.log(`   Nombre unique de Block IDs: ${allBlockIds.size}`)
    console.log(`\n   Liste des Block IDs (triés par utilisation):`)
    
    Array.from(blockIdUsage.entries())
      .sort((a, b) => b[1] - a[1])
      .forEach(([blockId, count]) => {
        console.log(`      • ${blockId} (utilisé ${count} fois)`)
      })
    
    // 4. Groupement par Block State
    console.log('\n\n🔄 4. GROUPEMENT PAR BLOCK STATE:\n')
    console.log('-'.repeat(100))
    
    const blockStates = new Map<string, number>()
    directResponse.value.forEach(op => {
      if (op.OperationBlockId) {
        const state = op.OperationBlockObjstate || 'NULL'
        blockStates.set(state, (blockStates.get(state) || 0) + 1)
      }
    })
    
    Array.from(blockStates.entries()).sort((a, b) => b[1] - a[1]).forEach(([state, count]) => {
      console.log(`   ${state}: ${count} opération(s)`)
    })
    
    // 5. Groupement par Site
    console.log('\n\n🏭 5. RÉPARTITION PAR SITE:\n')
    console.log('-'.repeat(100))
    
    const siteStats = new Map<string, number>()
    directResponse.value.forEach(op => {
      siteStats.set(op.Contract, (siteStats.get(op.Contract) || 0) + 1)
    })
    
    Array.from(siteStats.entries()).sort((a, b) => b[1] - a[1]).forEach(([site, count]) => {
      const blocks = blockIdBySite.get(site) || new Set()
      console.log(`   ${site}: ${count} opération(s) | ${blocks.size} Block ID(s) unique(s)`)
    })
    
    // 6. Statistiques globales
    console.log('\n\n📊 6. STATISTIQUES GLOBALES:\n')
    console.log('-'.repeat(100))
    
    console.log(`   Total opérations avec Block ID: ${directResponse.value.length}`)
    console.log(`   Nombre de Shop Orders distincts: ${shopOrderMap.size}`)
    console.log(`   Nombre de Block IDs uniques: ${allBlockIds.size}`)
    console.log(`   Nombre de sites utilisant les blocks: ${blockIdBySite.size}`)
    
    const avgOpsPerShopOrder = directResponse.value.length / shopOrderMap.size
    console.log(`   Moyenne opérations/Shop Order: ${avgOpsPerShopOrder.toFixed(2)}`)
    
    // 7. Export JSON pour analyse
    console.log('\n\n� 7. EXPORT DES DONNÉES:\n')
    console.log('-'.repeat(100))
    
    const exportData = {
      timestamp: new Date().toISOString(),
      summary: {
        totalOperations: directResponse.value.length,
        uniqueShopOrders: shopOrderMap.size,
        uniqueBlockIds: allBlockIds.size,
        sitesWithBlocks: blockIdBySite.size
      },
      shopOrders: Array.from(shopOrderMap.entries()).map(([key, operations]) => ({
        shopOrderKey: key,
        orderNo: operations[0].OrderNo,
        releaseNo: operations[0].ReleaseNo,
        sequenceNo: operations[0].SequenceNo,
        contract: operations[0].Contract,
        partNo: operations[0].PartNo,
        operationsCount: operations.length,
        operations: operations.map(op => ({
          operationNo: op.OperationNo,
          description: op.OperationDescription,
          blockId: op.OperationBlockId,
          blockState: op.OperationBlockObjstate,
          status: op.OperStatusCode,
          workCenter: op.WorkCenterNo,
          remainingQty: op.RemainingQty
        }))
      })),
      blockIds: Array.from(blockIdUsage.entries()).map(([blockId, count]) => ({
        blockId,
        usageCount: count
      }))
    }
    
    const fs = require('fs')
    const outputPath = 'scripts/operation-block-results.json'
    fs.writeFileSync(outputPath, JSON.stringify(exportData, null, 2))
    console.log(`   ✅ Données exportées vers: ${outputPath}`)
    
    // 7. Recommandations
    console.log('\n\n💡 7. RECOMMANDATIONS POUR PART PRINTER:\n')
    console.log('-'.repeat(100))
    console.log('   1. Vérifier si OperationBlockId est utilisé dans votre site cible (BDR)')
    console.log('   2. Si présent, intégrer OperationBlockId dans les filtres de recherche')
    console.log('   3. Documenter la signification des Block States')
    console.log('   4. Tester l\'impact sur l\'extraction de données (OP10)')
    console.log('   5. Prévoir un traitement spécial pour les opérations groupées')
    
    console.log('\n\n✅ === RECHERCHE TERMINÉE ===\n')
    
  } catch (error: any) {
    console.error('❌ Erreur lors de la recherche:', error.message)
    if (error.response) {
      console.error('   Response:', JSON.stringify(error.response.data, null, 2))
    }
    process.exit(1)
  }
}

// Exécution
findShopOrdersWithOperationBlock()
