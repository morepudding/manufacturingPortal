/**
 * Script de test pour operation-service.ts
 * Test avec Shop Order réel : 454853
 */

import { getOperation10Data, getOperation, hasEmptyBlockId } from '../src/tools/part-printer/services/operation-service'

async function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
  console.log('🧪 TEST OPERATION SERVICE - Shop Order 454853\n')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  try {
    // Test 1: getOperation10Data()
    console.log('📡 Test 1: getOperation10Data()\n')
    const op10Data = await getOperation10Data('454853', '*', '*')
    
    console.log('✅ Données OP10 récupérées:')
    console.log('   OrderNo:', op10Data.orderNo)
    console.log('   ReleaseNo:', op10Data.releaseNo)
    console.log('   SequenceNo:', op10Data.sequenceNo)
    console.log('   OperationNo:', op10Data.operationNo)
    console.log('   OperationBlockId:', op10Data.blockId || '(null)')
    console.log('   RawMaterial:', op10Data.rawMaterial)
    console.log('')

    // Test 2: getOperation() - OP10
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    console.log('📡 Test 2: getOperation() - OP10\n')
    const op10 = await getOperation('454853', '*', '*', 10)
    
    if (op10) {
      console.log('✅ Opération 10 trouvée:')
      console.log('   OrderNo:', op10.OrderNo)
      console.log('   OperationNo:', op10.OperationNo)
      console.log('   OperationBlockId:', op10.OperationBlockId || '(null)')
      console.log('   OperationDescription:', op10.OperationDescription || '(vide)')
      console.log('   WorkCenterNo:', op10.WorkCenterNo || '(vide)')
    } else {
      console.log('❌ Opération 10 non trouvée')
    }
    console.log('')

    // Test 3: hasEmptyBlockId()
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    console.log('📡 Test 3: hasEmptyBlockId()\n')
    const isEmpty = await hasEmptyBlockId('454853', '*', '*', 10)
    console.log(`✅ OP10 Block ID est ${isEmpty ? 'vide/null' : 'présent'}`)
    console.log('')

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    console.log('✅ Tous les tests réussis !\n')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  } catch (error) {
    console.error('❌ Erreur:', error)
    process.exit(1)
  }
}

main()
