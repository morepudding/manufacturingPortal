#!/usr/bin/env node
/**
 * WORKFLOW COMPLET D'IMPRESSION IFS AVEC TÉLÉCHARGEMENT PDF
 * 
 * Ce script exécute les 5 étapes complètes :
 * 1. GET Customer Order + ETag
 * 2. POST PrintResultKey
 * 3. POST PrintDialogInit
 * 4. POST ReportPrintRequest
 * 5. GET PDF depuis PdfArchiveSet et téléchargement
 * 
 * Environnement AST : CUSTOMER_ORDER_CONF_REP
 * Environnement PROD : MA_FO_CR_1419 (à configurer)
 */

const https = require('https');
const fs = require('fs');

const IFS_BASE_URL = 'beneteau-group-ast.ifs.cloud';
const IFS_CLIENT_ID = process.env.IFS_CLIENT_ID || '***REMOVED***';
const IFS_CLIENT_SECRET = process.env.IFS_CLIENT_SECRET;

// Configuration du workflow
const CONFIG = {
  // Environnement AST (Dev)
  ast: {
    orderNo: 'C1000038587',
    reportId: 'CUSTOMER_ORDER_CONF_REP',
    printerId: 'PDF_PRINTER',
    languageCode: 'fr',
    copies: 1
  },
  // Environnement PROD (à adapter)
  prod: {
    orderNo: 'C1000038587', // À remplacer par un vrai Order No prod
    reportId: 'MA_FO_CR_1419', // Le rapport custom Bénéteau
    printerId: 'PRTMNF012', // Une vraie imprimante physique
    languageCode: 'fr',
    copies: 1
  }
};

// Utiliser la config AST par défaut
const ACTIVE_CONFIG = CONFIG.ast;

// ============================================================================
// Fonctions utilitaires HTTP
// ============================================================================

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

async function ifsRequest(accessToken, method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const defaultHeaders = {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    };

    if (body && method !== 'GET') {
      defaultHeaders['Content-Type'] = 'application/json';
    }

    const allHeaders = { ...defaultHeaders, ...headers };
    const postData = body ? JSON.stringify(body) : null;

    if (postData) {
      allHeaders['Content-Length'] = Buffer.byteLength(postData);
    }

    const options = {
      hostname: IFS_BASE_URL,
      port: 443,
      path: `/main/ifsapplications/projection/v1${path}`,
      method: method,
      headers: allHeaders
    };

    const req = https.request(options, (res) => {
      let data = Buffer.alloc(0);
      res.on('data', (chunk) => {
        data = Buffer.concat([data, chunk]);
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data,
          body: data.length > 0 && res.headers['content-type']?.includes('json') 
            ? JSON.parse(data.toString()) 
            : null
        });
      });
    });

    req.on('error', reject);
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

// ============================================================================
// Workflow d'impression (5 étapes)
// ============================================================================

async function step1_getCustomerOrder(accessToken, orderNo) {
  console.log('\n' + '='.repeat(80));
  console.log('📥 ÉTAPE 1/5 : Récupération Customer Order + ETag');
  console.log('='.repeat(80));
  console.log(`   Order No: ${orderNo}`);
  
  const response = await ifsRequest(
    accessToken,
    'GET',
    `/CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${orderNo}')`
  );

  if (response.statusCode !== 200) {
    throw new Error(`GET Customer Order failed: ${response.statusCode}`);
  }

  const etag = response.body['@odata.etag'];
  console.log(`   ✅ Customer Order récupéré`);
  console.log(`   📋 CustomerNo: ${response.body.CustomerNo}`);
  console.log(`   📋 Contract: ${response.body.Contract}`);
  console.log(`   🔐 ETag: ${etag}`);

  return { order: response.body, etag };
}

async function step2_printResultKey(accessToken, orderNo, etag, reportId) {
  console.log('\n' + '='.repeat(80));
  console.log('🖨️  ÉTAPE 2/5 : Génération ResultKey');
  console.log('='.repeat(80));
  console.log(`   ReportId: ${reportId}`);

  const response = await ifsRequest(
    accessToken,
    'POST',
    `/CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${orderNo}')/IfsApp.CustomerOrderHandling.CustomerOrder_PrintResultKey`,
    { ReportId: reportId },
    { 'If-Match': etag }
  );

  if (response.statusCode !== 200) {
    throw new Error(`PrintResultKey failed: ${response.statusCode} - ${JSON.stringify(response.body)}`);
  }

  const resultKey = response.body.value;
  console.log(`   ✅ ResultKey généré: ${resultKey}`);

  return parseInt(resultKey);
}

async function step3_printDialogInit(accessToken, resultKey) {
  console.log('\n' + '='.repeat(80));
  console.log('🔧 ÉTAPE 3/5 : Initialisation Print Dialog');
  console.log('='.repeat(80));
  console.log(`   ResultKey: ${resultKey}`);

  const response = await ifsRequest(
    accessToken,
    'POST',
    '/PrintDialog.svc/PrintDialogInit',
    { ResultKey: resultKey }
  );

  if (response.statusCode !== 200) {
    throw new Error(`PrintDialogInit failed: ${response.statusCode}`);
  }

  console.log(`   ✅ Dialog initialisé`);
  console.log(`   📄 ReportTitle: ${response.body.ReportTitle}`);
  console.log(`   📄 LayoutName: ${response.body.LayoutName}`);
  console.log(`   🌍 LangCode: ${response.body.LangCode}`);

  return response.body;
}

async function step4_reportPrintRequest(accessToken, dialogData, printerId, languageCode, copies) {
  console.log('\n' + '='.repeat(80));
  console.log('📤 ÉTAPE 4/5 : Envoi de l\'impression');
  console.log('='.repeat(80));
  console.log(`   ResultKey: ${dialogData.ResultKey}`);
  console.log(`   LayoutName: ${dialogData.LayoutName}`);
  console.log(`   PrinterId: ${printerId}`);
  console.log(`   LanguageCode: ${languageCode}`);
  console.log(`   Copies: ${copies}`);

  const response = await ifsRequest(
    accessToken,
    'POST',
    '/PrintDialog.svc/ReportPrintRequest',
    {
      ResultKey: dialogData.ResultKey,
      LayoutName: dialogData.LayoutName,
      LanguageCode: languageCode,
      LogicalPrinter: printerId,
      Copies: copies
    }
  );

  if (response.statusCode !== 204) {
    throw new Error(`ReportPrintRequest failed: ${response.statusCode}`);
  }

  console.log(`   ✅ Impression envoyée (Status: 204 No Content)`);
  console.log(`   🖨️  Le PDF est en cours de génération...`);

  return true;
}

async function step5_downloadPdf(accessToken, resultKey, maxAttempts = 15) {
  console.log('\n' + '='.repeat(80));
  console.log('📥 ÉTAPE 5/5 : Téléchargement du PDF');
  console.log('='.repeat(80));
  console.log(`   ResultKey: ${resultKey}`);
  console.log(`   Attente de la génération du PDF...`);

  let pdfInfo = null;

  // Polling pour attendre que le PDF soit disponible
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    console.log(`   🔄 Tentative ${attempt}/${maxAttempts}...`);
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    const filterQuery = encodeURIComponent(`ResultKey eq ${resultKey}`);
    const response = await ifsRequest(
      accessToken,
      'GET',
      `/PrintDialog.svc/PdfArchiveSet?$filter=${filterQuery}&$select=ResultKey,Id,LayoutName,FileName,PdfSize,LangCode,Notes,Created&$top=1`
    );

    if (response.statusCode === 200 && response.body.value && response.body.value.length > 0) {
      pdfInfo = response.body.value[0];
      console.log(`\n   ✅ PDF trouvé dans l'archive!`);
      console.log(`   📄 FileName: ${pdfInfo.FileName}`);
      console.log(`   📊 PdfSize: ${(pdfInfo.PdfSize / 1024).toFixed(2)} KB`);
      console.log(`   🆔 Id: ${pdfInfo.Id}`);
      console.log(`   🌍 LangCode: ${pdfInfo.LangCode}`);
      console.log(`   📅 Created: ${pdfInfo.Created}`);
      break;
    }
  }

  if (!pdfInfo) {
    throw new Error('PDF non trouvé dans l\'archive après ' + maxAttempts + ' tentatives');
  }

  // Télécharger le PDF
  console.log(`\n   📥 Téléchargement du fichier PDF...`);
  
  const pdfResponse = await ifsRequest(
    accessToken,
    'GET',
    `/PrintDialog.svc/PdfArchiveSet(ResultKey=${pdfInfo.ResultKey},Id='${pdfInfo.Id}')/Pdf`,
    null,
    { 'Accept': 'application/octet-stream' }
  );

  if (pdfResponse.statusCode !== 200) {
    throw new Error(`PDF download failed: ${pdfResponse.statusCode}`);
  }

  // Vérifier que c'est bien un PDF
  const isPdf = pdfResponse.data[0] === 0x25 && 
                pdfResponse.data[1] === 0x50 && 
                pdfResponse.data[2] === 0x44 && 
                pdfResponse.data[3] === 0x46;

  if (!isPdf) {
    throw new Error('Les données téléchargées ne sont pas un PDF valide');
  }

  // Sauvegarder le PDF
  const filename = `./downloaded-${pdfInfo.FileName}`;
  fs.writeFileSync(filename, pdfResponse.data);

  console.log(`   ✅ PDF téléchargé avec succès!`);
  console.log(`   💾 Fichier: ${filename}`);
  console.log(`   📊 Taille: ${(pdfResponse.data.length / 1024).toFixed(2)} KB`);
  console.log(`   📄 Pages: Vérifier avec "file ${filename}"`);

  return {
    filename: filename,
    size: pdfResponse.data.length,
    pdfInfo: pdfInfo
  };
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  console.log('🚀 WORKFLOW COMPLET D\'IMPRESSION IFS AVEC TÉLÉCHARGEMENT PDF');
  console.log('='.repeat(80));
  console.log('\n📋 Configuration:');
  console.log(`   Environment: AST (Dev)`);
  console.log(`   Order No: ${ACTIVE_CONFIG.orderNo}`);
  console.log(`   Report ID: ${ACTIVE_CONFIG.reportId}`);
  console.log(`   Printer: ${ACTIVE_CONFIG.printerId}`);
  console.log(`   Language: ${ACTIVE_CONFIG.languageCode}`);
  console.log(`   Copies: ${ACTIVE_CONFIG.copies}`);

  const startTime = Date.now();

  try {
    // Authentification OAuth2
    console.log('\n🔑 Authentification OAuth2...');
    const accessToken = await getAccessToken();
    console.log('✅ Token obtenu');

    // ÉTAPE 1
    const { order, etag } = await step1_getCustomerOrder(
      accessToken,
      ACTIVE_CONFIG.orderNo
    );

    // ÉTAPE 2
    const resultKey = await step2_printResultKey(
      accessToken,
      ACTIVE_CONFIG.orderNo,
      etag,
      ACTIVE_CONFIG.reportId
    );

    // ÉTAPE 3
    const dialogData = await step3_printDialogInit(
      accessToken,
      resultKey
    );

    // ÉTAPE 4
    await step4_reportPrintRequest(
      accessToken,
      dialogData,
      ACTIVE_CONFIG.printerId,
      ACTIVE_CONFIG.languageCode,
      ACTIVE_CONFIG.copies
    );

    // ÉTAPE 5
    const pdfResult = await step5_downloadPdf(
      accessToken,
      resultKey
    );

    // Résumé final
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log('\n' + '='.repeat(80));
    console.log('🎉 WORKFLOW COMPLET TERMINÉ AVEC SUCCÈS');
    console.log('='.repeat(80));
    console.log('\n✅ Résumé:');
    console.log(`   ⏱️  Durée totale: ${duration} secondes`);
    console.log(`   📄 ResultKey: ${resultKey}`);
    console.log(`   📊 ReportId: ${ACTIVE_CONFIG.reportId}`);
    console.log(`   🖨️  PrinterId: ${ACTIVE_CONFIG.printerId}`);
    console.log(`   📁 PDF: ${pdfResult.filename}`);
    console.log(`   📊 Taille: ${(pdfResult.size / 1024).toFixed(2)} KB`);
    
    console.log('\n💡 Prochaines étapes pour PRODUCTION:');
    console.log('   1. Modifier CONFIG.prod avec les valeurs de production');
    console.log('   2. Changer ACTIVE_CONFIG = CONFIG.prod');
    console.log('   3. ReportId: MA_FO_CR_1419 (rapport custom Bénéteau)');
    console.log('   4. PrinterId: PRTMNF012 ou autre imprimante physique');
    console.log('   5. Tester avec un vrai Order No de production');

    console.log('\n✅ Le workflow est prêt à être implémenté dans l\'application!');

  } catch (error) {
    console.error('\n❌ ERREUR:', error.message);
    console.error('\nStack:', error.stack);
    process.exit(1);
  }
}

if (!IFS_CLIENT_SECRET) {
  console.error('❌ ERREUR: Variable IFS_CLIENT_SECRET non définie');
  console.error('   Usage: export IFS_CLIENT_SECRET="..." && node final-print-workflow.js');
  process.exit(1);
}

main();
