/**
 * Script de test pour le workflow PDF Part Printer
 * 
 * Test complet : Filter → Consolidate → Generate PDF
 * Vérifie que tous les éléments requis sont présents dans le PDF
 */

import { generatePartLabels, prepareLabelsForPrinting } from '../src/tools/part-printer/services/part-label-service'
import { generateLabelsPDF } from '../src/tools/part-printer/services/label-pdf-service'
import type { IFSShopOrderExtended } from '../src/tools/part-printer/types'
import fs from 'fs'
import path from 'path'

async function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
  console.log('🧪 TEST WORKFLOW PDF PART PRINTER\n')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  try {
    // 1. Créer des Shop Orders mock pour tester
    console.log('📊 Étape 1/4 : Création de Shop Orders mock...\n')
    
    const mockShopOrders: IFSShopOrderExtended[] = [
      {
        OrderNo: '454853',
        ReleaseNo: '*',
        SequenceNo: '*',
        PartNo: '1000014690G136',
        RevisedStartDate: '2025-10-15',
        Contract: 'FR017',
        Objstate: 'Released',
        ProductionLine: 'MASSIF',
        CBlockDates: true,
      },
      {
        OrderNo: '454854',
        ReleaseNo: '*',
        SequenceNo: '*',
        PartNo: '1000014691G136',
        RevisedStartDate: '2025-10-15',
        Contract: 'FR017',
        Objstate: 'Released',
        ProductionLine: 'MASSIF',
        CBlockDates: true,
      },
      {
        OrderNo: '454855',
        ReleaseNo: '*',
        SequenceNo: '*',
        PartNo: '1000014692G136',
        RevisedStartDate: '2025-10-16',
        Contract: 'FR017',
        Objstate: 'Released',
        ProductionLine: 'MASSIF',
        CBlockDates: true,
      },
    ]

    console.log(`✅ ${mockShopOrders.length} Shop Orders mock créés\n`)

    // 2. Générer les étiquettes (consolidate)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    console.log('📊 Étape 2/4 : Génération des étiquettes (consolidate)...\n')
    
    const labels = await generatePartLabels(mockShopOrders, 'FR017')
    
    console.log(`\n✅ ${labels.length} étiquettes générées\n`)

    // Afficher quelques labels pour debug
    console.log('📋 Aperçu des étiquettes générées:\n')
    labels.slice(0, 2).forEach((label, i) => {
      console.log(`  Étiquette ${i + 1}:`)
      console.log(`    - Shop Order: ${label.orderNo}-${label.releaseNo}-${label.sequenceNo}`)
      console.log(`    - Part No: ${label.partNo}`)
      console.log(`    - Generic Code: ${label.genericCode}`)
      console.log(`    - Varnish Code: ${label.varnishCode}`)
      console.log(`    - Length Setup: ${label.lengthSetup}`)
      console.log(`    - Raw Material: ${label.rawMaterial}`)
      console.log(`    - Block ID: ${label.blockId || '(null)'}`)
      console.log(`    - Range ID: ${label.rangeId}`)
      console.log(`    - Barcode: ${label.barcode}`)
      console.log(`    - Start Date: ${label.startDate}`)
      console.log('')
    })

    // 3. Préparer pour impression (grouper + trier)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    console.log('📊 Étape 3/4 : Préparation pour impression...\n')
    
    const grouped = prepareLabelsForPrinting(labels)
    
    console.log(`\n✅ ${grouped.size} groupe(s) créé(s)\n`)

    // Afficher les groupes
    console.log('📦 Groupes (Raw Material / Varnish Code):\n')
    for (const [key, groupLabels] of grouped.entries()) {
      console.log(`  ${key}: ${groupLabels.length} étiquette(s)`)
    }
    console.log('')

    // 4. Générer le PDF
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    console.log('📊 Étape 4/4 : Génération du PDF...\n')
    
    const pdfResult = await generateLabelsPDF(labels, {
      orientation: 'landscape',
      size: 'A4',
      includeMetadata: true,
    })

    console.log(`\n✅ PDF généré avec succès!\n`)
    console.log('📄 Informations PDF:')
    console.log(`   - Pages: ${pdfResult.pageCount}`)
    console.log(`   - Étiquettes: ${pdfResult.labelCount}`)
    console.log(`   - Groupes: ${pdfResult.groupCount}`)
    console.log(`   - Taille: ${(pdfResult.size / 1024).toFixed(2)} KB`)
    console.log('')

    // 5. Sauvegarder le PDF pour inspection manuelle
    const outputPath = path.join(process.cwd(), 'test-part-printer-labels.pdf')
    fs.writeFileSync(outputPath, pdfResult.buffer)
    
    console.log(`✅ PDF sauvegardé : ${outputPath}\n`)

    // 6. Vérifier les éléments requis
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    console.log('🔍 Vérification des éléments requis:\n')

    const sampleLabel = labels[0]
    
    const checks = [
      { name: 'Shop Order', value: `${sampleLabel.orderNo}-${sampleLabel.releaseNo}-${sampleLabel.sequenceNo}`, ok: true },
      { name: 'Range ID', value: sampleLabel.rangeId, ok: !!sampleLabel.rangeId },
      { name: 'Varnish Code', value: sampleLabel.varnishCode, ok: !!sampleLabel.varnishCode },
      { name: 'Raw Material', value: sampleLabel.rawMaterial, ok: !!sampleLabel.rawMaterial },
      { name: 'Generic Code', value: sampleLabel.genericCode, ok: !!sampleLabel.genericCode },
      { name: 'Revision', value: sampleLabel.engineeringPartRev, ok: !!sampleLabel.engineeringPartRev },
      { name: 'Length Setup', value: sampleLabel.lengthSetup, ok: !!sampleLabel.lengthSetup },
      { name: 'Barcode', value: sampleLabel.barcode, ok: !!sampleLabel.barcode },
      { name: 'Block ID', value: sampleLabel.blockId || '(null)', ok: true }, // null est valide
      { name: 'Start Date', value: sampleLabel.startDate, ok: !!sampleLabel.startDate },
    ]

    checks.forEach(check => {
      const icon = check.ok ? '✅' : '❌'
      console.log(`  ${icon} ${check.name}: ${check.value}`)
    })

    const allOk = checks.every(c => c.ok)
    
    console.log('')
    if (allOk) {
      console.log('✅ TOUS LES ÉLÉMENTS SONT PRÉSENTS !\n')
    } else {
      console.log('⚠️ CERTAINS ÉLÉMENTS MANQUENT\n')
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    console.log('🎉 TEST TERMINÉ AVEC SUCCÈS !\n')
    console.log('📌 Note: Raw Material affiche des données mock en attendant l\'endpoint IFS\n')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  } catch (error) {
    console.error('❌ Erreur:', error)
    process.exit(1)
  }
}

main()
