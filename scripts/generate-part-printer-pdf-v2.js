#!/usr/bin/env node

/**
 * Script de génération PDF - Part Printer Business Documentation V2
 * 
 * Convertit BUSINESS_DOCUMENTATION_V2.md en PDF avec diagrammes Mermaid
 * 
 * Étapes:
 * 1. Convertir Markdown → HTML (avec marked)
 * 2. Injecter Mermaid CDN dans HTML
 * 3. Charger HTML avec Puppeteer
 * 4. Attendre rendu Mermaid
 * 5. Générer PDF
 * 
 * Usage:
 *   node scripts/generate-part-printer-pdf-v2.js
 */

const puppeteer = require('puppeteer');
const { marked } = require('marked');
const path = require('path');
const fs = require('fs');

const MD_PATH = path.join(__dirname, '../docs/tools/part-printer/BUSINESS_DOCUMENTATION_V2.md');
const HTML_PATH = path.join(__dirname, '../docs/tools/part-printer/BUSINESS_DOCUMENTATION_V2.html');
const PDF_PATH = path.join(__dirname, '../docs/tools/part-printer/BUSINESS_DOCUMENTATION_V2.pdf');

// Template HTML avec Mermaid CDN et styles
const HTML_TEMPLATE = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Part Printer - Business Documentation V2</title>
  
  <!-- Mermaid CDN -->
  <script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
    mermaid.initialize({ 
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis'
      }
    });
    window.mermaid = mermaid;
  </script>
  
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 900px;
      margin: 0 auto;
      padding: 40px 20px;
      background: #fff;
    }
    
    h1 {
      color: #2c3e50;
      font-size: 2.5em;
      margin-bottom: 10px;
      padding-bottom: 10px;
      border-bottom: 3px solid #3498db;
    }
    
    h2 {
      color: #34495e;
      font-size: 2em;
      margin-top: 40px;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #95a5a6;
    }
    
    h3 {
      color: #2c3e50;
      font-size: 1.5em;
      margin-top: 30px;
      margin-bottom: 15px;
    }
    
    h4 {
      color: #34495e;
      font-size: 1.2em;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    
    p {
      margin-bottom: 15px;
      text-align: justify;
    }
    
    ul, ol {
      margin-bottom: 15px;
      padding-left: 30px;
    }
    
    li {
      margin-bottom: 8px;
    }
    
    code {
      background: #f4f4f4;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
      color: #e74c3c;
    }
    
    pre {
      background: #2c3e50;
      color: #ecf0f1;
      padding: 20px;
      border-radius: 5px;
      overflow-x: auto;
      margin-bottom: 20px;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
    }
    
    pre code {
      background: none;
      color: inherit;
      padding: 0;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
      font-size: 0.9em;
    }
    
    table th {
      background: #3498db;
      color: white;
      padding: 12px;
      text-align: left;
      font-weight: bold;
    }
    
    table td {
      padding: 10px 12px;
      border: 1px solid #ddd;
    }
    
    table tr:nth-child(even) {
      background: #f9f9f9;
    }
    
    blockquote {
      border-left: 4px solid #3498db;
      padding-left: 20px;
      margin: 20px 0;
      color: #555;
      font-style: italic;
    }
    
    hr {
      border: none;
      border-top: 2px solid #ecf0f1;
      margin: 40px 0;
    }
    
    /* Mermaid diagrams */
    .mermaid {
      margin: 30px 0;
      text-align: center;
      background: #f9f9f9;
      padding: 20px;
      border-radius: 5px;
      page-break-inside: avoid;
    }
    
    .mermaid svg {
      max-width: 100%;
      height: auto;
    }
    
    /* Page breaks */
    h1, h2 {
      page-break-after: avoid;
    }
    
    h3, h4 {
      page-break-after: avoid;
    }
    
    table, figure, .mermaid {
      page-break-inside: avoid;
    }
    
    /* Badges/Icons */
    strong {
      color: #2c3e50;
    }
    
    em {
      color: #7f8c8d;
    }
    
    /* Links (for PDF) */
    a {
      color: #3498db;
      text-decoration: none;
    }
    
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  ${content}
</body>
</html>
`;

async function generatePDF() {
  console.log('🚀 Part Printer - Génération PDF Documentation V2\n');

  // Étape 1: Vérifier que le fichier Markdown existe
  if (!fs.existsSync(MD_PATH)) {
    console.error('❌ Erreur: Fichier Markdown introuvable:', MD_PATH);
    process.exit(1);
  }

  console.log('📄 Fichier Markdown:', MD_PATH);
  console.log('🌐 Fichier HTML (temp):', HTML_PATH);
  console.log('💾 Fichier PDF:', PDF_PATH);

  try {
    // Étape 2: Lire le Markdown
    console.log('\n📖 Lecture du Markdown...');
    const markdownContent = fs.readFileSync(MD_PATH, 'utf8');

    // Étape 3: Convertir Markdown → HTML
    console.log('🔄 Conversion Markdown → HTML...');
    
    // Configurer marked pour préserver les blocs Mermaid
    marked.setOptions({
      breaks: true,
      gfm: true,
      headerIds: true,
      mangle: false,
    });

    // Custom renderer pour préserver les blocs Mermaid
    const renderer = new marked.Renderer();
    const originalCode = renderer.code.bind(renderer);
    
    renderer.code = function(code, language) {
      if (language === 'mermaid') {
        // Wrapper pour Mermaid
        return `<div class="mermaid">\n${code}\n</div>`;
      }
      return originalCode(code, language);
    };

    marked.use({ renderer });

    const htmlContent = marked.parse(markdownContent);
    const fullHTML = HTML_TEMPLATE(htmlContent);

    // Étape 4: Écrire le HTML temporaire
    console.log('💾 Écriture du HTML temporaire...');
    fs.writeFileSync(HTML_PATH, fullHTML, 'utf8');

    // Étape 5: Lancer Puppeteer
    console.log('\n🌐 Lancement du navigateur...');
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Étape 6: Charger le HTML
    console.log('📖 Chargement du HTML...');
    const fileUrl = `file://${HTML_PATH}`;
    
    await page.goto(fileUrl, {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    // Étape 7: Attendre que Mermaid soit chargé
    console.log('🎨 Attente du chargement de Mermaid...');
    await page.waitForFunction(() => {
      return typeof window.mermaid !== 'undefined';
    }, { timeout: 30000 }).catch(() => {
      console.warn('⚠️  Timeout Mermaid');
    });

    // Étape 8: Attendre le rendu des diagrammes
    console.log('⏳ Rendu des diagrammes Mermaid...');
    await new Promise(resolve => setTimeout(resolve, 8000)); // 8 secondes

    // Vérifier les diagrammes rendus
    const diagramCount = await page.evaluate(() => {
      const mermaidElements = document.querySelectorAll('.mermaid');
      const renderedDiagrams = document.querySelectorAll('.mermaid svg');
      return {
        total: mermaidElements.length,
        rendered: renderedDiagrams.length
      };
    });
    console.log(`📊 Diagrammes: ${diagramCount.rendered}/${diagramCount.total} rendus`);

    // Étape 9: Générer le PDF
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
          <span>Part Printer - Business Documentation V2</span>
        </div>
      `,
      footerTemplate: `
        <div style="font-size: 9px; text-align: center; width: 100%; color: #666; padding: 5px;">
          <span>Page <span class="pageNumber"></span> / <span class="totalPages"></span></span>
          <span style="margin-left: 20px;">Version 2.0 - October 2025</span>
        </div>
      `,
      preferCSSPageSize: false,
    });

    await browser.close();

    // Vérifier que le PDF a été créé
    const stats = fs.statSync(PDF_PATH);
    const fileSizeKB = (stats.size / 1024).toFixed(2);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

    console.log('\n✅ PDF généré avec succès!');
    console.log(`📊 Taille: ${fileSizeKB} KB (${fileSizeMB} MB)`);
    console.log(`📁 Emplacement: ${PDF_PATH}`);
    console.log(`🌐 HTML conservé: ${HTML_PATH}`);

  } catch (error) {
    console.error('\n❌ Erreur lors de la génération:', error);
    throw error;
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
