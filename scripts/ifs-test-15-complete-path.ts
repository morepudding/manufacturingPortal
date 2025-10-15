/**
 * 🎉 TEST 15: CHEMIN ODATA COMPLET POUR TechnicalSpecBothArray
 * 
 * DÉCOUVERTE: Le chemin complet existe ! (fourni par l'utilisateur)
 * 
 * URL COMPLÈTE:
 * /PartHandling.svc/PartCatalogSet(PartNo='1000014690G136')
 *   /PartCatalogReferenceArray(LuName='PartCatalog',KeyRef='PART_NO%3D1000014690G136%5E',TechnicalSpecNo=234656)
 *   /TechnicalSpecBothArray
 * 
 * CE TEST VA VALIDER:
 * 1. ✅ Navigation complète avec clés composites
 * 2. ✅ Récupération du TechnicalSpecNo (234656)
 * 3. ✅ Accès aux attributs (VARNISH CODE, LENGTH SETUP, GENERIC CODE)
 * 4. ✅ Filtrage par $filter=Attribute eq 'XXX'
 * 
 * @see Découverte utilisateur - 15 octobre 2025
 */

import { getIFSClient } from '../src/shared/services/ifs-client'

// =============================================================================
// Types IFS
// =============================================================================

interface TechnicalSpec {
  TechnicalSpecNo: string
  TechnicalClass: string
  Attribute: string
  AttribNumber: number
  ValueNo: number | null
  ValueText: string | null
  LowerLimit: number | null
  UpperLimit: number | null
  Info: string | null
  TechnicalUom: string | null
  TechnicalAttribStdRef?: {
    Attribute: string
    AttribDesc: string
  }
}

interface PartCatalogReference {
  LuName: string
  KeyRef: string
  TechnicalSpecNo: string
}

// =============================================================================
// Tests
// =============================================================================

async function test15CompleteODataPath() {
  console.log('🎉 ============================================')
  console.log('🎉 TEST 15: CHEMIN ODATA COMPLET')
  console.log('🎉 ============================================\n')

  const client = getIFSClient()
  const partNo = '1000014690G136'

  // ---------------------------------------------------------------------------
  // ÉTAPE 1: Récupérer PartCatalogReferenceArray pour obtenir TechnicalSpecNo
  // ---------------------------------------------------------------------------
  console.log('📋 ÉTAPE 1: Récupération TechnicalSpecNo')
  console.log('─────────────────────────────────────────\n')

  try {
    const refArrayResponse = await client.get<{
      value: PartCatalogReference[]
    }>(
      `PartHandling.svc/PartCatalogSet(PartNo='${partNo}')/PartCatalogReferenceArray`,
      {
        $select: 'LuName,KeyRef,TechnicalSpecNo'
      }
    )

    console.log(`✅ PartCatalogReferenceArray récupéré:`)
    console.log(`   Nombre d'entrées: ${refArrayResponse.value.length}`)

    if (refArrayResponse.value.length === 0) {
      console.log('❌ Aucune référence trouvée')
      return
    }

    // Prendre la première référence
    const firstRef = refArrayResponse.value[0]
    console.log(`   LuName: ${firstRef.LuName}`)
    console.log(`   KeyRef: ${firstRef.KeyRef}`)
    console.log(`   TechnicalSpecNo: ${firstRef.TechnicalSpecNo}\n`)

    // ---------------------------------------------------------------------------
    // ÉTAPE 2: Accéder TechnicalSpecBothArray avec le chemin complet
    // ---------------------------------------------------------------------------
    console.log('📋 ÉTAPE 2: Accès TechnicalSpecBothArray (chemin complet)')
    console.log('─────────────────────────────────────────\n')

    const encodedKeyRef = encodeURIComponent(firstRef.KeyRef)
    const technicalSpecNo = firstRef.TechnicalSpecNo

    // Construire le chemin complet comme dans la découverte utilisateur
    const fullPath = `PartHandling.svc/PartCatalogSet(PartNo='${partNo}')/PartCatalogReferenceArray(LuName='${firstRef.LuName}',KeyRef='${encodedKeyRef}',TechnicalSpecNo=${technicalSpecNo})/TechnicalSpecBothArray`

    console.log(`🔗 Chemin complet:`)
    console.log(`   ${fullPath}\n`)

    const specsResponse = await client.get<{
      value: TechnicalSpec[]
    }>(fullPath, {
      $select: 'TechnicalSpecNo,TechnicalClass,Attribute,AttribNumber,ValueNo,ValueText,TechnicalUom',
      $expand: 'TechnicalAttribStdRef($select=Attribute,AttribDesc)',
      $orderby: 'AttribNumber',
      $top: '50'
    })

    console.log(`✅ TechnicalSpecBothArray récupéré avec succès !`)
    console.log(`   Nombre d'attributs: ${specsResponse.value.length}`)
    console.log(`   Technical Class: ${specsResponse.value[0]?.TechnicalClass}\n`)

    // ---------------------------------------------------------------------------
    // ÉTAPE 3: Rechercher les 3 attributs Part Printer
    // ---------------------------------------------------------------------------
    console.log('📋 ÉTAPE 3: Recherche attributs Part Printer')
    console.log('─────────────────────────────────────────\n')

    const targetAttributes = ['GENERIC CODE', 'VARNISH CODE', 'LENGTH SETUP']
    
    for (const attrName of targetAttributes) {
      const found = specsResponse.value.find(spec => spec.Attribute === attrName)
      
      if (found) {
        console.log(`✅ ${attrName}:`)
        console.log(`   ValueText: ${found.ValueText || 'null'}`)
        console.log(`   ValueNo: ${found.ValueNo || 'null'}`)
        console.log(`   UoM: ${found.TechnicalUom || 'null'}`)
        if (found.TechnicalAttribStdRef) {
          console.log(`   Description: ${found.TechnicalAttribStdRef.AttribDesc}`)
        }
        console.log()
      } else {
        console.log(`❌ ${attrName}: NON TROUVÉ\n`)
      }
    }

    // ---------------------------------------------------------------------------
    // ÉTAPE 4: Test avec $filter direct
    // ---------------------------------------------------------------------------
    console.log('📋 ÉTAPE 4: Test $filter sur attribut spécifique')
    console.log('─────────────────────────────────────────\n')

    const varnishFilterResponse = await client.get<{
      value: TechnicalSpec[]
    }>(fullPath, {
      $filter: "Attribute eq 'VARNISH CODE'",
      $select: 'Attribute,ValueText'
    })

    if (varnishFilterResponse.value.length > 0) {
      console.log(`✅ VARNISH CODE trouvé avec $filter:`)
      console.log(`   ValueText: ${varnishFilterResponse.value[0].ValueText}\n`)
    } else {
      console.log(`❌ VARNISH CODE: Non trouvé avec $filter\n`)
    }

    // ---------------------------------------------------------------------------
    // ÉTAPE 5: Afficher tous les attributs disponibles
    // ---------------------------------------------------------------------------
    console.log('📋 ÉTAPE 5: Liste complète des attributs')
    console.log('─────────────────────────────────────────\n')

    console.log(`Total: ${specsResponse.value.length} attributs\n`)

    specsResponse.value.slice(0, 10).forEach((spec, index) => {
      console.log(`${index + 1}. ${spec.Attribute}`)
      console.log(`   ValueText: ${spec.ValueText || 'null'}`)
      console.log(`   ValueNo: ${spec.ValueNo || 'null'}`)
      if (spec.TechnicalAttribStdRef) {
        console.log(`   Description: ${spec.TechnicalAttribStdRef.AttribDesc}`)
      }
      console.log()
    })

    if (specsResponse.value.length > 10) {
      console.log(`... et ${specsResponse.value.length - 10} autres attributs\n`)
    }

    console.log('✅ ============================================')
    console.log('✅ TEST 15 RÉUSSI !')
    console.log('✅ Le chemin OData complet fonctionne !')
    console.log('✅ ============================================')

  } catch (error: any) {
    console.error('\n❌ ============================================')
    console.error('❌ TEST 15 ÉCHOUÉ')
    console.error('❌ ============================================\n')
    console.error('Erreur:', error.message)
    if (error.response?.data) {
      console.error('Détails:', JSON.stringify(error.response.data, null, 2))
    }
  }
}

// =============================================================================
// Exécution
// =============================================================================

test15CompleteODataPath()
  .then(() => {
    console.log('\n✅ Script terminé avec succès')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Erreur fatale:', error)
    process.exit(1)
  })
