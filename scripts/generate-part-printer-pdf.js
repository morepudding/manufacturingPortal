#!/usr/bin/env node

/**
 * Script de génération PDF pour Part Printer Business Documentation V2
 * 
 * Convertit BUSINESS_DOCUMENTATION_V2.md → HTML → PDF avec diagrammes Mermaid
 * 
 * Usage:
 *   node scripts/generate-part-printer-pdf.js
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const http = require('http');

const MD_PATH = path.join(__dirname, '../docs/tools/part-printer/BUSINESS_DOCUMENTATION_V2.md');
const HTML_PATH = path.join(__dirname, '../docs/tools/part-printer/BUSINESS_DOCUMENTATION_V2.html');
const PDF_PATH = path.join(__dirname, '../docs/tools/part-printer/BUSINESS_DOCUMENTATION_V2.pdf');
const DOCS_DIR = path.join(__dirname, '../docs/tools/part-printer');
const PORT = 8766;

/**
 * Convertit le Markdown en HTML avec support Mermaid
 */
function convertMarkdownToHTML(markdown) {
  // Convertir les titres
  let html = markdown
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$3</h3>')
    .replace(/^#### (.+)$/gm, '<h4>$1</h4>');

  // Convertir les listes
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/^✅ (.+)$/gm, '<li>✅ $1</li>');
  html = html.replace(/^❌ (.+)$/gm, '<li>❌ $1</li>');
  html = html.replace(/^⚠️ (.+)$/gm, '<li>⚠️ $1</li>');

  // Convertir les blocs de code
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    if (lang === 'mermaid') {
      return `<div class="mermaid">\n${code}\n</div>`;
    }
    return `<pre><code class="language-${lang || 'text'}">${code}</code></pre>`;
  });

  // Convertir les tableaux Markdown
  html = html.replace(/\|(.+)\|/g, (match, content) => {
    const cells = content.split('|').map(c => c.trim()).filter(c => c);
    const isHeader = match.includes('---');
    
    if (isHeader) {
      return '';
    }
    
    const tag = cells[0].includes('**') ? 'th' : 'td';
    const cellsHTML = cells.map(cell => {
      const cleanCell = cell.replace(/\*\*/g, '');
      return `<${tag}>${cleanCell}</${tag}>`;
    }).join('');
    
    return `<tr>${cellsHTML}</tr>`;
  });

  // Convertir le gras et italique
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Convertir les liens
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');

  // Convertir les backticks (code inline)
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Wrap lists dans <ul>
  html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');

  // Wrap table rows
  html = html.replace(/(<tr>.*<\/tr>)/gs, '<table>$1</table>');

  // Nettoyer les multiples balises ul/table consécutives
  html = html.replace(/<\/ul>\s*<ul>/g, '');
  html = html.replace(/<\/table>\s*<table>/g, '');

  // Paragraphes
  html = html.split('\n\n').map(para => {
    if (para.startsWith('<') || para.trim() === '') return para;
    return `<p>${para}</p>`;
  }).join('\n');

  return html;
}

/**
 * Génère le template HTML complet
 */
function generateHTMLTemplate(bodyContent) {
  return `<!DOCTYPE html>
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
      themeVariables: {
        primaryColor: '#3498db',
        primaryTextColor: '#fff',
        primaryBorderColor: '#2980b9',
        lineColor: '#2c3e50',
        secondaryColor: '#e74c3c',
        tertiaryColor: '#2ecc71'
      }
    });
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
      background: #fff;
      font-size: 11pt;
      padding: 20px;
    }

    h1 {
      color: #2c3e50;
      font-size: 28pt;
      margin: 30px 0 20px 0;
      padding-bottom: 10px;
      border-bottom: 3px solid #3498db;
      page-break-after: avoid;
    }

    h2 {
      color: #34495e;
      font-size: 20pt;
      margin: 25px 0 15px 0;
      padding-bottom: 8px;
      border-bottom: 2px solid #95a5a6;
      page-break-after: avoid;
    }

    h3 {
      color: #34495e;
      font-size: 16pt;
      margin: 20px 0 10px 0;
      page-break-after: avoid;
    }

    h4 {
      color: #7f8c8d;
      font-size: 13pt;
      margin: 15px 0 8px 0;
      page-break-after: avoid;
    }

    p {
      margin: 10px 0;
      text-align: justify;
    }

    ul, ol {
      margin: 10px 0 10px 25px;
    }

    li {
      margin: 5px 0;
    }

    code {
      background: #ecf0f1;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      font-size: 10pt;
      color: #e74c3c;
    }

    pre {
      background: #2c3e50;
      color: #ecf0f1;
      padding: 15px;
      border-radius: 5px;
      overflow-x: auto;
      margin: 15px 0;
      page-break-inside: avoid;
    }

    pre code {
      background: none;
      color: inherit;
      padding: 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
      page-break-inside: avoid;
    }

    th, td {
      border: 1px solid #bdc3c7;
      padding: 10px;
      text-align: left;
    }

    th {
      background: #3498db;
      color: white;
      font-weight: bold;
    }

    tr:nth-child(even) {
      background: #ecf0f1;
    }

    strong {
      color: #2c3e50;
      font-weight: 600;
    }

    a {
      color: #3498db;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    .mermaid {
      margin: 20px 0;
      text-align: center;
      page-break-inside: avoid;
    }

    .mermaid svg {
      max-width: 100%;
      height: auto;
    }

    /* Page breaks */
    h1 {
      page-break-before: always;
    }

    h1:first-of-type {
      page-break-before: avoid;
    }

    /* Print-specific */
    @media print {
      body {
        padding: 0;
      }

      h1, h2, h3, h4 {
        page-break-after: avoid;
      }

      table, figure, img, .mermaid {
        page-break-inside: avoid;
      }
    }

    /* Badges et emojis */
    .badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 3px;
      font-size: 9pt;
      font-weight: bold;
      margin: 0 3px;
    }

    .badge-success { background: #2ecc71; color: white; }
    .badge-warning { background: #f39c12; color: white; }
    .badge-danger { background: #e74c3c; color: white; }
    .badge-info { background: #3498db; color: white; }
  </style>
</head>
<body>
  ${bodyContent}
</body>
</html>`;
}

/**
 * Serveur HTTP simple
 */
function createServer() {
  return http.createServer((req, res) => {
    let filePath = path.join(DOCS_DIR, req.url === '/' ? 'BUSINESS_DOCUMENTATION_V2.html' : req.url);
    
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
  console.log('🚀 Part Printer Business Documentation V2 → PDF\n');

  // Vérifier que le fichier Markdown existe
  if (!fs.existsSync(MD_PATH)) {
    console.error('❌ Fichier Markdown introuvable:', MD_PATH);
    process.exit(1);
  }

  console.log('📄 Fichier Markdown:', MD_PATH);

  // Lire et convertir le Markdown en HTML
  console.log('📖 Lecture du Markdown...');
  const markdownContent = fs.readFileSync(MD_PATH, 'utf-8');
  
  console.log('🔄 Conversion Markdown → HTML...');
  const bodyHTML = convertMarkdownToHTML(markdownContent);
  const fullHTML = generateHTMLTemplate(bodyHTML);

  // Écrire le HTML temporaire
  console.log('💾 Écriture du HTML temporaire...');
  fs.writeFileSync(HTML_PATH, fullHTML, 'utf-8');
  console.log('✅ HTML créé:', HTML_PATH);

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
    // Lancer Puppeteer
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

    // Charger le HTML
    console.log('📖 Chargement du HTML...');
    await page.goto(`http://localhost:${PORT}`, {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    // Attendre que la page soit prête
    console.log('⏳ Attente du chargement complet de la page...');
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log('✅ Page chargée, prêt pour la génération PDF');

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
