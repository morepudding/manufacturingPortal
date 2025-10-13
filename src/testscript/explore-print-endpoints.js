#!/usr/bin/env node
/**
 * Script d'exploration des endpoints d'impression IFS
 * 
 * Ce script explore les différents services IFS pour comprendre
 * le mécanisme d'impression sans avoir besoin de droits d'impression
 */

const https = require('https');

// Configuration IFS
const IFS_BASE_URL = 'beneteau-group-ast.ifs.cloud';
const IFS_CLIENT_ID = process.env.IFS_CLIENT_ID || '***REMOVED***';
const IFS_CLIENT_SECRET = process.env.IFS_CLIENT_SECRET;

/**
 * Récupère un access token OAuth2
 */
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
          const parsed = JSON.parse(data);
          resolve(parsed.access_token);
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

/**
 * Effectue une requête GET vers IFS
 */
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

    console.log(`\n📥 GET ${path}`);

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        console.log(`   Status: ${res.statusCode}`);
        if (res.statusCode === 200) {
          try {
            const parsed = JSON.parse(data);
            resolve(parsed);
          } catch (e) {
            resolve(data);
          }
        } else {
          reject(new Error(`GET error: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

/**
 * Exploration 1 : Liste des ReportLayoutDefinitions
 */
async function exploreReportLayouts(accessToken) {
  console.log('\n' + '='.repeat(80));
  console.log('🔍 EXPLORATION 1 : Report Layout Definitions');
  console.log('='.repeat(80));

  try {
    // Récupérer les premiers layouts
    const layouts = await ifsGet(accessToken, '/PrintDialog.svc/ReportLayoutDefinitionSet?$top=10');
    
    if (layouts.value && layouts.value.length > 0) {
      console.log(`\n✅ Trouvé ${layouts.value.length} layouts :`);
      layouts.value.forEach(layout => {
        console.log(`\n   📄 Layout:`);
        console.log(`      ReportId: ${layout.ReportId}`);
        console.log(`      LayoutName: ${layout.LayoutName}`);
        console.log(`      LayoutTitle: ${layout.LayoutTitle || 'N/A'}`);
        console.log(`      LayoutType: ${layout.LayoutType || 'N/A'}`);
      });
    }

    // Chercher spécifiquement les layouts Customer Order
    console.log('\n🔎 Recherche de layouts Customer Order...');
    const coLayouts = await ifsGet(
      accessToken, 
      '/PrintDialog.svc/ReportLayoutDefinitionSet?$filter=contains(LayoutName,%27CUSTOMER%27)&$top=5'
    );
    
    if (coLayouts.value && coLayouts.value.length > 0) {
      console.log(`\n✅ Trouvé ${coLayouts.value.length} layouts Customer Order :`);
      coLayouts.value.forEach(layout => {
        console.log(`\n   📄 ${layout.LayoutName}`);
        console.log(`      ReportId: ${layout.ReportId} (Type: ${typeof layout.ReportId})`);
      });
    }

  } catch (error) {
    console.log(`\n⚠️  Erreur: ${error.message}`);
  }
}

/**
 * Exploration 2 : Liste des imprimantes
 */
async function explorePrinters(accessToken) {
  console.log('\n' + '='.repeat(80));
  console.log('🔍 EXPLORATION 2 : Logical Printers');
  console.log('='.repeat(80));

  try {
    const printers = await ifsGet(accessToken, '/PrintDialog.svc/LogicalPrinterSet?$top=10');
    
    if (printers.value && printers.value.length > 0) {
      console.log(`\n✅ Trouvé ${printers.value.length} imprimantes :`);
      printers.value.forEach(printer => {
        console.log(`\n   🖨️  Imprimante:`);
        console.log(`      PrinterId: ${printer.PrinterId || printer.LogicalPrinterId || 'N/A'}`);
        console.log(`      Description: ${printer.Description || 'N/A'}`);
        console.log(`      PrinterType: ${printer.PrinterType || 'N/A'}`);
      });
    }
  } catch (error) {
    console.log(`\n⚠️  Erreur: ${error.message}`);
  }
}

/**
 * Exploration 3 : Liste des langues
 */
async function exploreLanguages(accessToken) {
  console.log('\n' + '='.repeat(80));
  console.log('🔍 EXPLORATION 3 : Language Codes');
  console.log('='.repeat(80));

  try {
    const languages = await ifsGet(accessToken, '/PrintDialog.svc/LanguageCodeSet?$top=10');
    
    if (languages.value && languages.value.length > 0) {
      console.log(`\n✅ Trouvé ${languages.value.length} langues :`);
      languages.value.forEach(lang => {
        console.log(`\n   🌍 Langue:`);
        console.log(`      LanguageCode: ${lang.LanguageCode || lang.Code}`);
        console.log(`      Description: ${lang.Description || 'N/A'}`);
      });
    }
  } catch (error) {
    console.log(`\n⚠️  Erreur: ${error.message}`);
  }
}

/**
 * Exploration 4 : Formats de rapports
 */
async function exploreReportFormats(accessToken) {
  console.log('\n' + '='.repeat(80));
  console.log('🔍 EXPLORATION 4 : Report Formats');
  console.log('='.repeat(80));

  try {
    const formats = await ifsGet(accessToken, '/PrintDialog.svc/ReportFormatSet?$top=5');
    
    if (formats.value && formats.value.length > 0) {
      console.log(`\n✅ Trouvé ${formats.value.length} formats :`);
      formats.value.forEach(format => {
        console.log(`\n   📋 Format:`);
        console.log(`      FormatId: ${format.FormatId || format.ReportFormatId}`);
        console.log(`      Description: ${format.Description || 'N/A'}`);
      });
    }
  } catch (error) {
    console.log(`\n⚠️  Erreur: ${error.message}`);
  }
}

/**
 * Exploration 5 : Métadonnées du service PrintDialog
 */
async function exploreMetadata(accessToken) {
  console.log('\n' + '='.repeat(80));
  console.log('🔍 EXPLORATION 5 : Service Metadata');
  console.log('='.repeat(80));

  try {
    const metadata = await ifsGet(accessToken, '/PrintDialog.svc/$metadata');
    console.log('\n✅ Metadata récupéré (voir détails en XML)');
    // Le metadata est en XML, difficile à parser ici
    console.log('   (Metadata est au format XML - nécessite parsing séparé)');
  } catch (error) {
    console.log(`\n⚠️  Erreur: ${error.message}`);
  }
}

/**
 * Exploration 6 : Customer Order spécifique
 */
async function exploreCustomerOrder(accessToken, orderNo) {
  console.log('\n' + '='.repeat(80));
  console.log(`🔍 EXPLORATION 6 : Customer Order ${orderNo}`);
  console.log('='.repeat(80));

  try {
    const order = await ifsGet(
      accessToken, 
      `/CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${orderNo}')`
    );
    
    console.log(`\n✅ Customer Order récupéré :`);
    console.log(`   OrderNo: ${order.OrderNo}`);
    console.log(`   CustomerNo: ${order.CustomerNo}`);
    console.log(`   Contract: ${order.Contract}`);
    console.log(`   Company: ${order.Company}`);
    console.log(`   PrintControlCode: ${order.PrintControlCode || 'N/A'}`);
    console.log(`   OrderConfFlag: ${order.OrderConfFlag || 'N/A'}`);
    
  } catch (error) {
    console.log(`\n⚠️  Erreur: ${error.message}`);
  }
}

/**
 * Exploration 7 : Archive PDF existants
 */
async function explorePdfArchive(accessToken) {
  console.log('\n' + '='.repeat(80));
  console.log('🔍 EXPLORATION 7 : PDF Archive');
  console.log('='.repeat(80));

  try {
    const pdfs = await ifsGet(accessToken, '/PrintDialog.svc/PdfArchiveSet?$top=5');
    
    if (pdfs.value && pdfs.value.length > 0) {
      console.log(`\n✅ Trouvé ${pdfs.value.length} PDFs archivés :`);
      pdfs.value.forEach(pdf => {
        console.log(`\n   📄 PDF:`);
        console.log(`      ResultKey: ${pdf.ResultKey || 'N/A'}`);
        console.log(`      ReportId: ${pdf.ReportId || 'N/A'}`);
        console.log(`      CreatedDate: ${pdf.CreatedDate || 'N/A'}`);
      });
    }
  } catch (error) {
    console.log(`\n⚠️  Erreur: ${error.message}`);
  }
}

/**
 * Main
 */
async function main() {
  try {
    console.log('🚀 EXPLORATION DU SYSTÈME D\'IMPRESSION IFS');
    console.log('='.repeat(80));

    // Récupérer le token
    console.log('\n🔑 Récupération du token OAuth2...');
    const accessToken = await getAccessToken();
    console.log('✅ Token obtenu');

    // Explorations
    await exploreReportLayouts(accessToken);
    await explorePrinters(accessToken);
    await exploreLanguages(accessToken);
    await exploreReportFormats(accessToken);
    await exploreCustomerOrder(accessToken, 'C1000038587');
    await explorePdfArchive(accessToken);

    console.log('\n' + '='.repeat(80));
    console.log('✅ EXPLORATION TERMINÉE');
    console.log('='.repeat(80));
    console.log('\n💡 Prochaines étapes:');
    console.log('   1. Analyser les ReportId trouvés');
    console.log('   2. Identifier le format correct pour PrintResultKey');
    console.log('   3. Tester avec le bon ReportId');

  } catch (error) {
    console.error('\n❌ ERREUR:', error.message);
    process.exit(1);
  }
}

// Vérification des variables d'environnement
if (!IFS_CLIENT_SECRET) {
  console.error('❌ ERREUR: Variable IFS_CLIENT_SECRET non définie');
  console.error('   Définir avec: export IFS_CLIENT_SECRET="..."');
  process.exit(1);
}

main();
