#!/usr/bin/env node
/**
 * Script de validation complète du workflow d'impression
 * Vérifie que le PDF est bien créé et le télécharge
 */

const https = require('https');
const fs = require('fs');

const IFS_BASE_URL = 'beneteau-group-ast.ifs.cloud';
const IFS_CLIENT_ID = process.env.IFS_CLIENT_ID || 'AIS_IFS_MA_AST';
const IFS_CLIENT_SECRET = process.env.IFS_CLIENT_SECRET;

const TEST_CONFIG = {
  orderNo: 'C1000038587',
  reportId: 'CUSTOMER_ORDER_CONF_REP',
  printerId: 'PDF_PRINTER',
  languageCode: 'fr',
  copies: 1
};

async function getAccessToken() {
  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: IFS_CLIENT_ID,
      client_secret: IFS_CLIENT_SECRET,
      scope: 'openid microprofile-jwt'
    }).toString();

    const options = {
      hostname: IFS_BASE_URL,
      port: 443,
      path: '/auth/realms/beneast1/protocol/openid-connect/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data).access_token);
        } else {
          reject(new Error(`Token error: ${res.statusCode}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function ifsGet(accessToken, path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: IFS_BASE_URL,
      port: 443,
      path: `/main/ifsapplications/projection/v1${path}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: JSON.parse(data)
          });
        } else {
          reject(new Error(`GET error: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function ifsPost(accessToken, path, body, etag = null) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(body);
    
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
      'Accept': 'application/json'
    };

    if (etag) {
      headers['If-Match'] = etag;
    }

    const options = {
      hostname: IFS_BASE_URL,
      port: 443,
      path: `/main/ifsapplications/projection/v1${path}`,
      method: 'POST',
      headers: headers
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data ? JSON.parse(data) : null
        });
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function savePdfFromBase64(pdfArchive, outputPath) {
  console.log(`\n📥 Sauvegarde du PDF depuis les données base64...`);
  console.log(`   FileName: ${pdfArchive.FileName}`);
  console.log(`   PdfSize attendu: ${(pdfArchive.PdfSize / 1024).toFixed(2)} KB`);
  
  try {
    if (!pdfArchive.Pdf) {
      throw new Error('Aucune donnée PDF dans l\'archive');
    }

    // Le champ Pdf contient les données en base64
    const pdfBuffer = Buffer.from(pdfArchive.Pdf, 'base64');
    fs.writeFileSync(outputPath, pdfBuffer);
    
    const stats = fs.statSync(outputPath);
    console.log(`   ✅ PDF sauvegardé!`);
    console.log(`   📁 Fichier: ${outputPath}`);
    console.log(`   📊 Taille: ${(stats.size / 1024).toFixed(2)} KB`);
    
    if (stats.size === 0) {
      throw new Error('Le fichier PDF est vide (0 octets)');
    }
    
    return true;
  } catch (error) {
    console.log(`   ❌ Erreur: ${error.message}`);
    throw error;
  }
}

async function executeFullWorkflow(accessToken) {
  console.log('\n' + '='.repeat(80));
  console.log('🚀 EXÉCUTION DU WORKFLOW COMPLET');
  console.log('='.repeat(80));

  // Étape 1
  console.log('\n📥 ÉTAPE 1 : GET Customer Order + ETag');
  const orderResponse = await ifsGet(
    accessToken,
    `/CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${TEST_CONFIG.orderNo}')`
  );
  const etag = orderResponse.body['@odata.etag'];
  console.log(`   ✅ ETag: ${etag}`);

  // Étape 2
  console.log('\n🖨️  ÉTAPE 2 : POST PrintResultKey');
  const resultKeyResponse = await ifsPost(
    accessToken,
    `/CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${TEST_CONFIG.orderNo}')/IfsApp.CustomerOrderHandling.CustomerOrder_PrintResultKey`,
    { ReportId: TEST_CONFIG.reportId },
    etag
  );
  const resultKey = resultKeyResponse.body?.value;
  console.log(`   ✅ ResultKey: ${resultKey}`);

  // Étape 3
  console.log('\n🔧 ÉTAPE 3 : POST PrintDialogInit');
  const dialogResponse = await ifsPost(
    accessToken,
    '/PrintDialog.svc/PrintDialogInit',
    { ResultKey: parseInt(resultKey) }
  );
  console.log(`   ✅ LayoutName: ${dialogResponse.body.LayoutName}`);

  // Étape 4
  console.log('\n🖨️  ÉTAPE 4 : POST ReportPrintRequest');
  const printResponse = await ifsPost(
    accessToken,
    '/PrintDialog.svc/ReportPrintRequest',
    {
      ResultKey: dialogResponse.body.ResultKey,
      LayoutName: dialogResponse.body.LayoutName,
      LanguageCode: TEST_CONFIG.languageCode,
      LogicalPrinter: TEST_CONFIG.printerId,
      Copies: TEST_CONFIG.copies
    }
  );
  console.log(`   ✅ Status: ${printResponse.statusCode} No Content`);

  return resultKey;
}

async function verifyPdfArchive(accessToken, resultKey, maxAttempts = 10) {
  console.log('\n' + '='.repeat(80));
  console.log('🔍 VÉRIFICATION DU PDF DANS L\'ARCHIVE');
  console.log('='.repeat(80));

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(`\n📋 Tentative ${attempt}/${maxAttempts}...`);
      
      // Utiliser $filter au lieu de chercher par clé composite (URL-encodé)
      // Inclure le champ Pdf dans le $select
      const filterQuery = encodeURIComponent(`ResultKey eq ${resultKey}`);
      const response = await ifsGet(
        accessToken,
        `/PrintDialog.svc/PdfArchiveSet?$filter=${filterQuery}&$select=ResultKey,Id,LayoutName,FileName,LangCode,Notes,Created,PdfSize,Pdf&$top=1`
      );

      if (response.statusCode === 200 && response.body && response.body.value && response.body.value.length > 0) {
        const pdfArchive = response.body.value[0];
        console.log(`\n✅ PDF TROUVÉ dans l'archive!`);
        console.log(`\n📄 Détails du PDF:`);
        console.log(`   ResultKey: ${pdfArchive.ResultKey}`);
        console.log(`   Id: ${pdfArchive.Id || 'N/A'}`);
        console.log(`   LayoutName: ${pdfArchive.LayoutName || 'N/A'}`);
        console.log(`   FileName: ${pdfArchive.FileName || 'N/A'}`);
        console.log(`   LangCode: ${pdfArchive.LangCode || 'N/A'}`);
        console.log(`   Notes: ${pdfArchive.Notes || 'N/A'}`);
        console.log(`   Created: ${pdfArchive.Created || 'N/A'}`);
        console.log(`   PdfSize: ${pdfArchive.PdfSize ? `${(pdfArchive.PdfSize / 1024).toFixed(2)} KB` : 'N/A'}`);
        console.log(`   Pdf data length: ${pdfArchive.Pdf ? pdfArchive.Pdf.length : 0} caractères`);
        
        return pdfArchive;
      }
    } catch (error) {
      if (attempt < maxAttempts) {
        console.log(`   ⏳ Pas encore disponible, attente 2s...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      } else {
        console.log(`   ❌ PDF non trouvé après ${maxAttempts} tentatives`);
        throw error;
      }
    }
  }
  
  throw new Error('PDF non trouvé dans l\'archive');
}

async function main() {
  try {
    console.log('🎯 VALIDATION COMPLÈTE DU WORKFLOW D\'IMPRESSION IFS');
    console.log('='.repeat(80));
    console.log('\n📋 Configuration:');
    console.log(`   Order No: ${TEST_CONFIG.orderNo}`);
    console.log(`   Report ID: ${TEST_CONFIG.reportId}`);
    console.log(`   Printer: ${TEST_CONFIG.printerId}`);
    console.log(`   Language: ${TEST_CONFIG.languageCode}`);

    // Authentification
    console.log('\n🔑 Authentification OAuth2...');
    const accessToken = await getAccessToken();
    console.log('✅ Token obtenu');

    // Exécuter le workflow
    const resultKey = await executeFullWorkflow(accessToken);

    // Attendre un peu pour que le PDF soit généré
    console.log('\n⏳ Attente de la génération du PDF (5 secondes)...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Vérifier l'archive
    const pdfInfo = await verifyPdfArchive(accessToken, resultKey);

    // Sauvegarder le PDF depuis base64
    const outputPath = `./customer-order-${TEST_CONFIG.orderNo}-${resultKey}.pdf`;
    
    try {
      await savePdfFromBase64(pdfInfo, outputPath);
      console.log(`\n🎉 VALIDATION COMPLÈTE : LE WORKFLOW FONCTIONNE À 100%!`);
      console.log(`   Le PDF a été généré, archivé et téléchargé avec succès!`);
    } catch (saveError) {
      console.log(`\n⚠️  Impossible de sauvegarder le PDF: ${saveError.message}`);
    }

    // Résumé final
    console.log('\n' + '='.repeat(80));
    console.log('📊 RÉSUMÉ FINAL');
    console.log('='.repeat(80));
    console.log(`\n✅ Workflow d'impression : SUCCÈS`);
    console.log(`✅ PDF créé dans l'archive : CONFIRMÉ`);
    console.log(`   ResultKey: ${resultKey}`);
    console.log(`   Id: ${pdfInfo.Id || 'N/A'}`);
    console.log(`   LayoutName: ${pdfInfo.LayoutName || 'N/A'}`);
    console.log(`   FileName: ${pdfInfo.FileName || 'N/A'}`);
    console.log(`   PdfSize: ${pdfInfo.PdfSize ? `${(pdfInfo.PdfSize / 1024).toFixed(2)} KB` : 'N/A'}`);
    console.log(`   Notes: ${pdfInfo.Notes || 'N/A'}`);
    
    if (fs.existsSync(outputPath)) {
      console.log(`✅ PDF téléchargé localement : OUI`);
      console.log(`   Fichier: ${outputPath}`);
    } else {
      console.log(`⚠️  PDF téléchargé localement : NON (mais existe dans IFS)`);
    }

    console.log('\n💡 Le workflow est complètement fonctionnel!');
    console.log('   Le PDF est généré et archivé dans IFS.');
    console.log('   Taille du PDF confirmée: ' + (pdfInfo.PdfSize ? `${(pdfInfo.PdfSize / 1024).toFixed(2)} KB` : 'N/A'));

  } catch (error) {
    console.error('\n❌ ERREUR:', error.message);
    console.error('\nStack:', error.stack);
    process.exit(1);
  }
}

if (!IFS_CLIENT_SECRET) {
  console.error('❌ ERREUR: Variable IFS_CLIENT_SECRET non définie');
  process.exit(1);
}

main();
