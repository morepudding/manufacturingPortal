/**
 * Script pour explorer les layouts de rapports disponibles dans IFS
 */

const https = require('https');
const fs = require('fs');

// Configuration IFS
const IFS_CONFIG = {
  hostname: 'beneteau-group-ast.ifs.cloud',
  realm: 'beneast1',
  clientId: '***REMOVED***',
  clientSecret: '***REMOVED***'
};

// Fonction pour obtenir le token OAuth2
function getAccessToken() {
  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: IFS_CONFIG.clientId,
      client_secret: IFS_CONFIG.clientSecret,
      scope: 'openid microprofile-jwt'
    }).toString();
    
    const options = {
      hostname: IFS_CONFIG.hostname,
      port: 443,
      path: `/auth/realms/${IFS_CONFIG.realm}/protocol/openid-connect/token`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          resolve(json.access_token);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// Fonction pour faire des requêtes OData
async function makeRequest(path) {
  try {
    const token = await getAccessToken();

    return new Promise((resolve, reject) => {
      const options = {
        hostname: IFS_CONFIG.hostname,
        port: 443,
        path: `/main/ifsapplications/projection/v1${path}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      };

      https.get(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
          try {
            const json = JSON.parse(body);
            resolve(json);
          } catch (e) {
            resolve({ 
              error: true, 
              statusCode: res.statusCode, 
              body: body.substring(0, 500) 
            });
          }
        });
      }).on('error', reject);
    });
  } catch (error) {
    return { error: true, message: error.message };
  }
}

// Exécution principale
(async () => {
  console.log('🎨 EXPLORATION DES LAYOUTS DE RAPPORTS IFS\n');
  console.log('═'.repeat(80) + '\n');

  const results = {
    timestamp: new Date().toISOString(),
    layoutDefinitions: [],
    layouts: [],
    reportFormats: [],
    languages: []
  };

  try {
    // 1. ReportLayoutDefinitionSet
    console.log('📋 ÉTAPE 1: ReportLayoutDefinitionSet');
    console.log('─'.repeat(80) + '\n');
    
    const layoutDefs = await makeRequest('/PrintDialog.svc/ReportLayoutDefinitionSet');
    
    if (layoutDefs.error) {
      console.log(`   ❌ Erreur ${layoutDefs.statusCode}: ${layoutDefs.body || layoutDefs.message}\n`);
    } else if (layoutDefs.value) {
      console.log(`   ✅ ${layoutDefs.value.length} définitions trouvées\n`);
      results.layoutDefinitions = layoutDefs.value;
      
      console.log('   📊 Premiers exemples:\n');
      layoutDefs.value.slice(0, 10).forEach(layout => {
        const fields = Object.keys(layout).filter(k => !k.startsWith('@'));
        console.log(`      • ID: ${layout.ReportId || layout.LayoutName || 'N/A'}`);
        if (layout.Description) console.log(`        Description: ${layout.Description}`);
        console.log(`        Champs: ${fields.slice(0, 5).join(', ')}`);
        console.log('');
      });
    } else {
      console.log('   ⚠️  Structure inattendue:', Object.keys(layoutDefs).join(', '));
    }

    // 2. ReportLayoutSet
    console.log('\n📋 ÉTAPE 2: ReportLayoutSet');
    console.log('─'.repeat(80) + '\n');
    
    const layouts = await makeRequest('/PrintDialog.svc/ReportLayoutSet');
    
    if (layouts.error) {
      console.log(`   ❌ Erreur ${layouts.statusCode}: ${layouts.body || layouts.message}\n`);
    } else if (layouts.value) {
      console.log(`   ✅ ${layouts.value.length} layouts trouvés\n`);
      results.layouts = layouts.value;
      
      // Analyser les champs disponibles
      if (layouts.value.length > 0) {
        const sampleFields = Object.keys(layouts.value[0]).filter(k => !k.startsWith('@'));
        console.log(`   📋 Champs disponibles: ${sampleFields.join(', ')}\n`);
        
        console.log('   📊 Premiers exemples:\n');
        layouts.value.slice(0, 10).forEach(layout => {
          console.log(`      Layout: ${JSON.stringify(layout, null, 2).substring(0, 200)}...`);
          console.log('');
        });
      }
    } else {
      console.log('   ⚠️  Structure inattendue:', Object.keys(layouts).join(', '));
    }

    // 3. ReportFormatSet
    console.log('\n📋 ÉTAPE 3: ReportFormatSet');
    console.log('─'.repeat(80) + '\n');
    
    const formats = await makeRequest('/PrintDialog.svc/ReportFormatSet');
    
    if (formats.error) {
      console.log(`   ❌ Erreur ${formats.statusCode}: ${formats.body || formats.message}\n`);
    } else if (formats.value) {
      console.log(`   ✅ ${formats.value.length} formats trouvés\n`);
      results.reportFormats = formats.value;
      
      console.log('   📊 Formats disponibles:\n');
      formats.value.forEach(format => {
        console.log(`      • ${JSON.stringify(format)}`);
      });
      console.log('');
    } else {
      console.log('   ⚠️  Structure inattendue:', Object.keys(formats).join(', '));
    }

    // 4. LanguageCodeSet
    console.log('\n📋 ÉTAPE 4: LanguageCodeSet');
    console.log('─'.repeat(80) + '\n');
    
    const languages = await makeRequest('/PrintDialog.svc/LanguageCodeSet');
    
    if (languages.error) {
      console.log(`   ❌ Erreur ${languages.statusCode}: ${languages.body || languages.message}\n`);
    } else if (languages.value) {
      console.log(`   ✅ ${languages.value.length} langues trouvées\n`);
      results.languages = languages.value;
      
      console.log('   🌍 Langues disponibles:\n');
      languages.value.forEach(lang => {
        console.log(`      • ${JSON.stringify(lang)}`);
      });
      console.log('');
    } else {
      console.log('   ⚠️  Structure inattendue:', Object.keys(languages).join(', '));
    }

    // Sauvegarder les résultats
    const timestamp = Date.now();
    const jsonFile = `report-layouts-analysis-${timestamp}.json`;
    fs.writeFileSync(jsonFile, JSON.stringify(results, null, 2));
    
    console.log('\n' + '═'.repeat(80));
    console.log('💾 RÉSULTATS SAUVEGARDÉS');
    console.log('═'.repeat(80) + '\n');
    console.log(`📄 Fichier JSON: ${jsonFile}\n`);

    // Générer un résumé
    console.log('📊 RÉSUMÉ:\n');
    console.log(`   • ReportLayoutDefinitionSet: ${results.layoutDefinitions.length} éléments`);
    console.log(`   • ReportLayoutSet: ${results.layouts.length} éléments`);
    console.log(`   • ReportFormatSet: ${results.reportFormats.length} éléments`);
    console.log(`   • LanguageCodeSet: ${results.languages.length} éléments\n`);

    // Interpréter les résultats
    console.log('💡 INTERPRÉTATION:\n');
    
    if (results.layoutDefinitions.length > 0) {
      console.log('   ✅ ReportLayoutDefinitionSet contient probablement:');
      console.log('      - Les définitions de TOUS les types de rapports/documents disponibles');
      console.log('      - Les templates d\'impression configurés dans IFS');
      console.log('      - Les layouts pour Shop Orders, DOP Orders, Serial Numbers, etc.\n');
    }
    
    if (results.layouts.length > 0) {
      console.log('   ✅ ReportLayoutSet contient probablement:');
      console.log('      - Les instances de layouts activées/assignées');
      console.log('      - Les configurations spécifiques par utilisateur/site\n');
    }

    if (results.reportFormats.length > 0) {
      console.log('   ✅ ReportFormatSet contient:');
      console.log('      - Les formats de sortie disponibles (PDF, Excel, Word, etc.)\n');
    }

    if (results.languages.length > 0) {
      console.log('   ✅ LanguageCodeSet contient:');
      console.log('      - Les langues disponibles pour l\'impression des documents\n');
    }

    console.log('\n✅ Exploration terminée!\n');

  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
})();
