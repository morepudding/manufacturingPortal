#!/usr/bin/env node
/**
 * Exploration approfondie pour télécharger le PDF
 * Recherche de tous les moyens possibles de récupérer le PDF généré
 */

const https = require('https');
const fs = require('fs');

const IFS_BASE_URL = 'beneteau-group-ast.ifs.cloud';
const IFS_CLIENT_ID = process.env.IFS_CLIENT_ID || '***REMOVED***';
const IFS_CLIENT_SECRET = process.env.IFS_CLIENT_SECRET;

const RESULT_KEY = 558555; // ResultKey du dernier test
const PDF_ID = '783d639e-990f-42ae-b617-d09a00860540';

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

async function tryGetRequest(accessToken, path, acceptHeader = 'application/json') {
  return new Promise((resolve) => {
    const options = {
      hostname: IFS_BASE_URL,
      port: 443,
      path: `/main/ifsapplications/projection/v1${path}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': acceptHeader
      }
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
          size: data.length
        });
      });
    });

    req.on('error', (error) => {
      resolve({
        statusCode: 0,
        error: error.message
      });
    });
    req.end();
  });
}

async function main() {
  try {
    console.log('🔍 EXPLORATION TÉLÉCHARGEMENT PDF');
    console.log('='.repeat(80));
    console.log(`\nResultKey: ${RESULT_KEY}`);
    console.log(`PDF Id: ${PDF_ID}`);

    const accessToken = await getAccessToken();
    console.log('✅ Token obtenu\n');

    const tests = [
      // PrintDialog.svc
      {
        label: 'PrintDialog - PdfArchiveSet avec $value',
        path: `/PrintDialog.svc/PdfArchiveSet(ResultKey=${RESULT_KEY},Id='${PDF_ID}')/Pdf/$value`,
        accept: 'application/octet-stream'
      },
      {
        label: 'PrintDialog - PdfArchiveSet Pdf stream',
        path: `/PrintDialog.svc/PdfArchiveSet(ResultKey=${RESULT_KEY},Id='${PDF_ID}')/Pdf`,
        accept: 'application/octet-stream'
      },
      {
        label: 'PrintDialog - Get avec Accept */*',
        path: `/PrintDialog.svc/PdfArchiveSet(ResultKey=${RESULT_KEY},Id='${PDF_ID}')`,
        accept: '*/*'
      },
      
      // PrintAgent.svc (alternative)
      {
        label: 'PrintAgent - PdfArchiveSet',
        path: `/PrintAgent.svc/PdfArchiveSet(ResultKey=${RESULT_KEY},Id='${PDF_ID}')`,
        accept: 'application/json'
      },
      {
        label: 'PrintAgent - Pdf $value',
        path: `/PrintAgent.svc/PdfArchiveSet(ResultKey=${RESULT_KEY},Id='${PDF_ID}')/Pdf/$value`,
        accept: 'application/octet-stream'
      },
      {
        label: 'PrintAgent - GetRemoteJob',
        path: `/PrintAgent.svc/GetRemoteJob(ResultKey=${RESULT_KEY})`,
        accept: 'application/json'
      },
      
      // Tentatives avec PrintJobSet
      {
        label: 'PrintAgent - PrintJobSet filter',
        path: `/PrintAgent.svc/PrintJobSet?$filter=ResultKey eq ${RESULT_KEY}`,
        accept: 'application/json'
      },
      
      // Alternative: récupérer l'entité complète
      {
        label: 'PrintDialog - Entity complète (no select)',
        path: `/PrintDialog.svc/PdfArchiveSet(ResultKey=${RESULT_KEY},Id='${PDF_ID}')`,
        accept: 'application/json'
      },
      
      // Tentatives avec différents formats
      {
        label: 'PrintDialog - application/pdf Accept',
        path: `/PrintDialog.svc/PdfArchiveSet(ResultKey=${RESULT_KEY},Id='${PDF_ID}')`,
        accept: 'application/pdf'
      },
      {
        label: 'PrintDialog - text/plain Accept',
        path: `/PrintDialog.svc/PdfArchiveSet(ResultKey=${RESULT_KEY},Id='${PDF_ID}')`,
        accept: 'text/plain'
      }
    ];

    console.log('🧪 TEST DES DIFFÉRENTS ENDPOINTS ET MÉTHODES\n');
    console.log('='.repeat(80));

    for (const test of tests) {
      console.log(`\n📋 ${test.label}`);
      console.log(`   Path: ${test.path}`);
      console.log(`   Accept: ${test.accept}`);
      
      const result = await tryGetRequest(accessToken, test.path, test.accept);
      
      console.log(`   Status: ${result.statusCode}`);
      if (result.size > 0) {
        console.log(`   Size: ${(result.size / 1024).toFixed(2)} KB`);
        console.log(`   Content-Type: ${result.headers['content-type'] || 'N/A'}`);
        
        // Si on a récupéré des données significatives
        if (result.size > 1000) {
          console.log(`   ✅ DONNÉES REÇUES! Taille significative`);
          
          // Sauvegarder si c'est du binaire
          if (result.data[0] === 0x25 && result.data[1] === 0x50 && result.data[2] === 0x44 && result.data[3] === 0x46) {
            const filename = `./pdf-test-${RESULT_KEY}-method-${tests.indexOf(test)}.pdf`;
            fs.writeFileSync(filename, result.data);
            console.log(`   💾 PDF sauvegardé: ${filename}`);
            console.log(`   🎉 MÉTHODE FONCTIONNELLE TROUVÉE!`);
            
            // Vérifier que c'est bien un PDF
            const pdfHeader = result.data.slice(0, 8).toString();
            console.log(`   📄 Header: ${pdfHeader}`);
          } else if (result.headers['content-type']?.includes('json')) {
            // C'est du JSON, afficher un extrait
            try {
              const json = JSON.parse(result.data.toString());
              if (json.Pdf) {
                console.log(`   📄 Champ Pdf présent: ${json.Pdf.substring(0, 50)}...`);
                console.log(`   📊 Longueur Pdf: ${json.Pdf.length} caractères`);
                
                // Tenter de décoder le base64
                try {
                  const pdfBuffer = Buffer.from(json.Pdf, 'base64');
                  const filename = `./pdf-from-json-${RESULT_KEY}.pdf`;
                  fs.writeFileSync(filename, pdfBuffer);
                  console.log(`   💾 PDF décodé depuis JSON: ${filename}`);
                  console.log(`   📊 Taille: ${(pdfBuffer.length / 1024).toFixed(2)} KB`);
                  console.log(`   🎉 MÉTHODE FONCTIONNELLE TROUVÉE!`);
                } catch (e) {
                  console.log(`   ⚠️  Erreur décodage base64: ${e.message}`);
                }
              }
            } catch (e) {
              console.log(`   ⚠️  JSON parse error`);
            }
          }
        }
      } else if (result.error) {
        console.log(`   ❌ Error: ${result.error}`);
      }
      
      // Petite pause entre les requêtes
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('\n' + '='.repeat(80));
    console.log('📊 FIN DE L\'EXPLORATION');
    console.log('='.repeat(80));
    console.log('\nVérifiez les fichiers pdf-* dans le répertoire courant.');

  } catch (error) {
    console.error('\n❌ ERREUR:', error.message);
    process.exit(1);
  }
}

if (!IFS_CLIENT_SECRET) {
  console.error('❌ Variable IFS_CLIENT_SECRET non définie');
  process.exit(1);
}

main();
