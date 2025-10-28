#!/usr/bin/env node

/**
 * Script de génération PDF de la documentation métier
 * 
 * Convertit DOCUMENTATION_BUSINESS.html en PDF avec les diagrammes Mermaid rendus
 * 
 * Utilise Puppeteer pour :
 * - Charger le HTML
 * - Rendre les diagrammes Mermaid
 * - Générer un PDF de haute qualité
 * 
 * Usage:
 *   node scripts/generate-pdf-documentation.js
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const HTML_PATH = path.join(__dirname, '../docs/DOCUMENTATION_BUSINESS.html');
const PDF_PATH = path.join(__dirname, '../docs/DOCUMENTATION_BUSINESS.pdf');

async function generatePDF() {
  console.log('🚀 Démarrage de la génération PDF...\n');

  // Vérifier que le fichier HTML existe
  if (!fs.existsSync(HTML_PATH)) {
    console.error('❌ Erreur: Fichier HTML introuvable:', HTML_PATH);
    process.exit(1);
  }

  console.log('📄 Fichier HTML:', HTML_PATH);
  console.log('💾 Fichier PDF:', PDF_PATH);

  let browser;
  try {
    // Lancer le navigateur
    console.log('\n🌐 Lancement du navigateur...');
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Charger le HTML
    console.log('📖 Chargement du HTML...');
    const fileUrl = `file://${HTML_PATH}`;
    
    await page.goto(fileUrl, {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    // Attendre explicitement que le script Mermaid soit chargé
    console.log('🎨 Attente du chargement de Mermaid depuis le CDN...');
    await page.waitForFunction(() => {
      return typeof window.mermaid !== 'undefined';
    }, { timeout: 30000 }).catch(() => {
      console.warn('⚠️  Timeout Mermaid, tentative de chargement manuel...');
    });

    // Forcer l'initialisation de Mermaid si nécessaire
    await page.evaluate(() => {
      if (typeof window.mermaid !== 'undefined' && !window.mermaidInitialized) {
        window.mermaid.initialize({
          startOnLoad: true,
          theme: 'default',
          securityLevel: 'loose',
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: 'basis'
          }
        });
        window.mermaidInitialized = true;
      }
    });

    // Attendre que tous les diagrammes soient rendus
    console.log('⏳ Rendu des diagrammes Mermaid en cours...');
    await new Promise(resolve => setTimeout(resolve, 8000)); // 8 secondes pour être sûr
    
    // Vérifier le nombre de diagrammes rendus
    const diagramCount = await page.evaluate(() => {
      const mermaidElements = document.querySelectorAll('.mermaid');
      const renderedDiagrams = document.querySelectorAll('.mermaid svg');
      return {
        total: mermaidElements.length,
        rendered: renderedDiagrams.length
      };
    });
    console.log(`📊 Diagrammes: ${diagramCount.rendered}/${diagramCount.total} rendus`);

    // Générer le PDF
    console.log('\n📄 Génération du PDF...');
    await page.pdf({
      path: PDF_PATH,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      },
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size: 10px; text-align: center; width: 100%; color: #666;">
          <span>Manufacturing Portal - Documentation Métier</span>
        </div>
      `,
      footerTemplate: `
        <div style="font-size: 9px; text-align: center; width: 100%; color: #666; padding: 5px;">
          <span>Page <span class="pageNumber"></span> / <span class="totalPages"></span></span>
          <span style="margin-left: 20px;">Version 1.0 - Octobre 2025</span>
        </div>
      `,
      preferCSSPageSize: false,
    });

    // Vérifier que le PDF a été créé
    const stats = fs.statSync(PDF_PATH);
    const fileSizeKB = (stats.size / 1024).toFixed(2);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

    console.log('\n✅ PDF généré avec succès!');
    console.log(`📊 Taille: ${fileSizeKB} KB (${fileSizeMB} MB)`);
    console.log(`📁 Emplacement: ${PDF_PATH}`);

  } catch (error) {
    console.error('\n❌ Erreur lors de la génération:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
      console.log('\n🔒 Navigateur fermé');
    }
  }
}

// Exécuter
(async () => {
  try {
    await generatePDF();
    console.log('\n🎉 Processus terminé avec succès!\n');
    process.exit(0);
  } catch (error) {
    console.error('\n💥 Échec de la génération PDF\n');
    process.exit(1);
  }
})();
