#!/usr/bin/env node

/**
 * Script de génération PDF de la documentation métier (Version 2 - avec serveur HTTP)
 * 
 * Convertit DOCUMENTATION_BUSINESS.html en PDF avec les diagrammes Mermaid rendus
 * Utilise un serveur HTTP local pour permettre le chargement du CDN Mermaid
 * 
 * Usage:
 *   node scripts/generate-pdf-documentation-v2.js
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const http = require('http');

const HTML_PATH = path.join(__dirname, '../docs/DOCUMENTATION_BUSINESS.html');
const PDF_PATH = path.join(__dirname, '../docs/DOCUMENTATION_BUSINESS.pdf');
const DOCS_DIR = path.join(__dirname, '../docs');
const PORT = 8765;

// Créer un serveur HTTP simple qui sert les fichiers du dossier docs
function createServer() {
  return http.createServer((req, res) => {
    let filePath = path.join(DOCS_DIR, req.url === '/' ? 'DOCUMENTATION_BUSINESS.html' : req.url);
    
    // Déterminer le Content-Type
    const ext = path.extname(filePath);
    let contentType = 'text/html; charset=utf-8';
    if (ext === '.js') contentType = 'application/javascript';
    else if (ext === '.css') contentType = 'text/css';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('File not found');
        return;
      }
      
      res.writeHead(200, {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*'
      });
      res.end(data);
    });
  });
}

async function generatePDF() {
  console.log('🚀 Démarrage de la génération PDF (avec serveur HTTP)...\n');

  // Vérifier que le fichier HTML existe
  if (!fs.existsSync(HTML_PATH)) {
    console.error('❌ Erreur: Fichier HTML introuvable:', HTML_PATH);
    process.exit(1);
  }

  console.log('📄 Fichier HTML:', HTML_PATH);
  console.log('💾 Fichier PDF:', PDF_PATH);

  // Démarrer le serveur HTTP
  console.log('\n🌐 Démarrage du serveur HTTP local...');
  const server = createServer();
  
  await new Promise((resolve) => {
    server.listen(PORT, () => {
      console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
      resolve();
    });
  });

  let browser;
  try {
    // Lancer le navigateur
    console.log('\n🌐 Lancement du navigateur...');
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process'
      ]
    });

    const page = await browser.newPage();

    // Charger le HTML depuis le serveur HTTP
    console.log('📖 Chargement du HTML...');
    await page.goto(`http://localhost:${PORT}`, {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    // Attendre que Mermaid soit chargé
    console.log('🎨 Attente du chargement de Mermaid...');
    await page.waitForFunction(() => {
      return typeof window.mermaid !== 'undefined';
    }, { timeout: 30000 });

    console.log('✅ Mermaid chargé depuis le CDN');

    // Attendre que tous les diagrammes soient rendus
    console.log('⏳ Rendu des diagrammes Mermaid...');
    
    // Attendre que tous les SVG soient générés
    await page.waitForFunction(() => {
      const mermaidDivs = document.querySelectorAll('.mermaid');
      const svgs = document.querySelectorAll('.mermaid svg');
      return mermaidDivs.length > 0 && svgs.length === mermaidDivs.length;
    }, { timeout: 15000 }).catch(() => {
      console.warn('⚠️  Timeout pendant le rendu Mermaid, continuation...');
    });

    // Attente supplémentaire pour s'assurer que tout est rendu
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Vérifier le nombre de diagrammes rendus
    const diagramCount = await page.evaluate(() => {
      const mermaidElements = document.querySelectorAll('.mermaid');
      const renderedDiagrams = document.querySelectorAll('.mermaid svg');
      return {
        total: mermaidElements.length,
        rendered: renderedDiagrams.length
      };
    });
    console.log(`✅ Diagrammes: ${diagramCount.rendered}/${diagramCount.total} rendus`);

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
    
    // Arrêter le serveur
    server.close(() => {
      console.log('🔒 Serveur HTTP fermé');
    });
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
