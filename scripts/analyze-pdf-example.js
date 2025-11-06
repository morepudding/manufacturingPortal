const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

async function analyzePDF() {
  try {
    console.log('📄 Analyse du PDF exemple parfait...\n');
    
    const dataBuffer = fs.readFileSync('./docs/exempleparfait.pdf');
    const pdfDoc = await PDFDocument.load(dataBuffer);
    
    console.log('=== INFORMATIONS GÉNÉRALES ===');
    console.log('Nombre de pages:', pdfDoc.getPageCount());
    console.log('Titre:', pdfDoc.getTitle() || 'N/A');
    console.log('Auteur:', pdfDoc.getAuthor() || 'N/A');
    console.log('Sujet:', pdfDoc.getSubject() || 'N/A');
    
    console.log('\n=== DIMENSIONS DES PAGES ===');
    for (let i = 0; i < pdfDoc.getPageCount(); i++) {
      const page = pdfDoc.getPage(i);
      const { width, height } = page.getSize();
      const orientation = width > height ? 'Paysage' : 'Portrait';
      
      // Conversion en mm (1 point = 0.352778 mm)
      const widthMm = (width * 0.352778).toFixed(2);
      const heightMm = (height * 0.352778).toFixed(2);
      
      console.log(`Page ${i + 1}:`);
      console.log(`  - Dimensions: ${width.toFixed(2)} x ${height.toFixed(2)} points`);
      console.log(`  - En mm: ${widthMm} x ${heightMm} mm`);
      console.log(`  - Orientation: ${orientation}`);
      console.log(`  - Format détecté: ${detectFormat(width, height)}`);
    }
    
    console.log('\n=== ANALYSE STRUCTURE ===');
    console.log('Pour voir le contenu exact du PDF, ouvrez-le dans un lecteur PDF.');
    console.log('Chemin: /home/rbottero/ManufacturingPortal/docs/exempleparfait.pdf');
    
    console.log('\n✅ Analyse terminée');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

function detectFormat(width, height) {
  // Tolérance de 1 point
  const formats = {
    'A4 Portrait': { w: 595.28, h: 841.89 },
    'A4 Paysage': { w: 841.89, h: 595.28 },
    'Letter Portrait': { w: 612, h: 792 },
    'Letter Paysage': { w: 792, h: 612 },
  };
  
  for (const [name, { w, h }] of Object.entries(formats)) {
    if (Math.abs(width - w) < 2 && Math.abs(height - h) < 2) {
      return name;
    }
  }
  
  return 'Format personnalisé';
}

analyzePDF();
