const fs = require('fs');

async function readPDF() {
  try {
    // Lire le fichier PDF comme buffer
    const dataBuffer = fs.readFileSync('./docs/exempleparfait.pdf');
    
    console.log('=== PDF METADATA ===');
    console.log('Size:', dataBuffer.length, 'bytes');
    console.log('Size KB:', (dataBuffer.length / 1024).toFixed(2), 'KB');
    
    // Chercher des patterns dans le PDF brut
    const pdfString = dataBuffer.toString('latin1');
    
    // Extraire dimensions de page
    const mediaBoxMatch = pdfString.match(/\/MediaBox\s*\[\s*(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s*\]/);
    if (mediaBoxMatch) {
      console.log('\n=== PAGE DIMENSIONS ===');
      console.log('MediaBox:', mediaBoxMatch[0]);
      console.log('Width:', mediaBoxMatch[3], 'Height:', mediaBoxMatch[4]);
    }
    
    // Extraire les polices
    const fontMatches = pdfString.match(/\/Font\s*<<[^>]+>>/g);
    if (fontMatches) {
      console.log('\n=== FONTS ===');
      fontMatches.slice(0, 3).forEach(font => console.log(font));
    }
    
    // Sauvegarder un extrait du contenu brut
    const textContent = pdfString.substring(0, 5000);
    fs.writeFileSync('./docs/exempleparfait-raw.txt', textContent);
    console.log('\n✅ Extrait sauvegardé dans docs/exempleparfait-raw.txt');
    
    // Essayer avec pdf-lib pour avoir plus d'infos
    console.log('\n=== Tentative de lecture structurée ===');
    const PDFDocument = require('pdf-lib').PDFDocument;
    const pdfDoc = await PDFDocument.load(dataBuffer);
    
    console.log('Pages:', pdfDoc.getPageCount());
    const firstPage = pdfDoc.getPage(0);
    const { width, height } = firstPage.getSize();
    console.log('First page size:', width, 'x', height);
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

readPDF();
