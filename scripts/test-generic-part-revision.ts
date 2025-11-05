/**
 * 🧪 Script de test - Validation Generic Part No + Revision
 * 
 * Shop Order: 463215
 * Valeur attendue: C000001026112G110-A
 * 
 * Test des corrections:
 * 1. Generic Code doit garder le suffixe G### (C000001026112G110, pas C000001026112)
 * 2. Engineering Part Revision doit utiliser EngPartRevisionSet (pas EngPartRevisions)
 * 3. Format affiché: {genericCode}-{revision}
 */

// Charger les variables d'environnement
import { config } from 'dotenv'
config({ path: '.env.local' })

import { getMasterPartAttributes } from '@/tools/part-printer/services/master-part-service'

async function testGenericPartRevision() {
  console.log('🧪 Test Generic Part No + Revision')
  console.log('=====================================\n')

  // Test case: Shop Order 463215
  const testPartNo = 'C000001026112G110'
  const expectedGenericCode = 'C000001026112G110'
  const expectedRevision = 'A'
  const expectedFull = 'C000001026112G110-A'

  console.log(`📋 Part No à tester: ${testPartNo}`)
  console.log(`✅ Generic Code attendu: ${expectedGenericCode}`)
  console.log(`✅ Revision attendue: ${expectedRevision}`)
  console.log(`✅ Format complet attendu: ${expectedFull}\n`)

  try {
    // Récupérer les attributs
    console.log('🔍 Récupération des attributs...\n')
    const attributes = await getMasterPartAttributes(testPartNo)

    console.log('\n📊 Résultats:')
    console.log('=============')
    console.log(`Part No: ${attributes.partNo}`)
    console.log(`Generic Code: ${attributes.genericCode}`)
    console.log(`Engineering Part Rev: ${attributes.engineeringPartRev}`)
    console.log(`Length Setup: ${attributes.lengthSetup}`)
    console.log(`Varnish Code: ${attributes.varnishCode}`)

    // Format complet pour affichage
    const fullFormat = `${attributes.genericCode}-${attributes.engineeringPartRev}`
    console.log(`\n📝 Format complet: ${fullFormat}`)

    // Validation
    console.log('\n✅ Validation:')
    console.log('===============')
    
    const genericCodeOk = attributes.genericCode === expectedGenericCode
    const revisionOk = attributes.engineeringPartRev === expectedRevision
    const fullFormatOk = fullFormat === expectedFull

    console.log(`Generic Code: ${genericCodeOk ? '✅' : '❌'} (${attributes.genericCode} ${genericCodeOk ? '==' : '!='} ${expectedGenericCode})`)
    console.log(`Revision: ${revisionOk ? '✅' : '❌'} (${attributes.engineeringPartRev} ${revisionOk ? '==' : '!='} ${expectedRevision})`)
    console.log(`Format complet: ${fullFormatOk ? '✅' : '❌'} (${fullFormat} ${fullFormatOk ? '==' : '!='} ${expectedFull})`)

    if (genericCodeOk && revisionOk && fullFormatOk) {
      console.log('\n🎉 SUCCÈS : Toutes les validations passent !')
      console.log('Le Generic Part No + Revision est correct.')
    } else {
      console.log('\n⚠️ ATTENTION : Certaines validations échouent.')
      if (!genericCodeOk) {
        console.log(`  - Generic Code doit être "${expectedGenericCode}" (avec G###)`)
      }
      if (!revisionOk) {
        console.log(`  - Revision doit être "${expectedRevision}"`)
      }
      if (!fullFormatOk) {
        console.log(`  - Format complet doit être "${expectedFull}"`)
      }
    }

  } catch (error) {
    console.error('\n❌ ERREUR lors du test:', error)
    if (error instanceof Error) {
      console.error('Message:', error.message)
      console.error('Stack:', error.stack)
    }
  }
}

// Lancer le test
testGenericPartRevision()
  .then(() => {
    console.log('\n✅ Test terminé')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Test échoué:', error)
    process.exit(1)
  })
