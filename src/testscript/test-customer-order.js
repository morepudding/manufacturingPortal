/**
 * Script pour tester la récupération du Customer Order C1000038587
 * et trouver la relation avec le Shop Order 97277
 */

const https = require('https');
const fs = require('fs');

// Configuration IFS
const IFS_CONFIG = {
  hostname: 'beneteau-group-ast.ifs.cloud',
  realm: 'beneast1',
  clientId: 'AIS_IFS_MA_AST',
  clientSecret: 'ifiW7xzKNmj3a1fpEukFIImPFztb51R9'
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
async function makeRequest(path, service = 'projection') {
  try {
    const token = await getAccessToken();

    return new Promise((resolve, reject) => {
      const basePath = service === 'entity' 
        ? '/int/ifsapplications/entity/v1'
        : '/main/ifsapplications/projection/v1';
      
      // Encoder les caractères spéciaux dans l'URL
      const encodedPath = path.split('?').map((part, index) => {
        if (index === 0) return part; // Ne pas encoder la partie avant le ?
        return part.split('&').map(param => {
          const [key, value] = param.split('=');
          return `${key}=${encodeURIComponent(value)}`;
        }).join('&');
      }).join('?');
      
      const options = {
        hostname: IFS_CONFIG.hostname,
        port: 443,
        path: `${basePath}${encodedPath}`,
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
              body: body.substring(0, 1000) 
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
  console.log('🔍 TEST CUSTOMER ORDER C1000038587\n');
  console.log('═'.repeat(80) + '\n');

  const results = {
    timestamp: new Date().toISOString(),
    shopOrder: null,
    customerOrderHeader: null,
    customerOrderLines: null,
    dopHeader: null,
    dopSerials: null
  };

  try {
    // 1. Shop Order 97277 (référence)
    console.log('📦 ÉTAPE 1: Shop Order 97277');
    console.log('─'.repeat(80) + '\n');
    
    const shopOrder = await makeRequest('/ShopOrderHandling.svc/ShopOrds?$filter=contains(OrderNo,\'97277\')');
    
    if (shopOrder.error) {
      console.log(`   ❌ Erreur: ${shopOrder.body || shopOrder.message}\n`);
    } else if (shopOrder.value && shopOrder.value.length > 0) {
      results.shopOrder = shopOrder.value[0];
      console.log(`   ✅ Shop Order trouvé\n`);
      console.log(`   📊 Données clés:`);
      console.log(`      • Order No: ${results.shopOrder.OrderNo}`);
      console.log(`      • Part No: ${results.shopOrder.PartNo}`);
      console.log(`      • DOP ID: ${results.shopOrder.DopId}`);
      console.log(`      • Customer Order No: ${results.shopOrder.CustomerOrderNo || 'null ❌'}`);
      console.log(`      • Customer Line No: ${results.shopOrder.CustomerLineNo || 'null ❌'}`);
      console.log(`      • Configuration ID: ${results.shopOrder.ConfigurationId}`);
      console.log(`      • Status: ${results.shopOrder.Objstate}\n`);
    }

    // 2. Customer Order Header C1000038587
    console.log('📋 ÉTAPE 2: Customer Order Header C1000038587');
    console.log('─'.repeat(80) + '\n');
    
    const customerOrderHeader = await makeRequest('/CustomerOrderHandling.svc/CustomerOrderSet?$filter=OrderNo eq \'C1000038587\'');
    
    if (customerOrderHeader.error) {
      console.log(`   ❌ Erreur: ${customerOrderHeader.body || customerOrderHeader.message}\n`);
    } else if (customerOrderHeader.value) {
      if (customerOrderHeader.value.length > 0) {
        results.customerOrderHeader = customerOrderHeader.value[0];
        console.log(`   ✅ Customer Order Header trouvé\n`);
        console.log(`   📊 Données clés:`);
        console.log(`      • Order No: ${results.customerOrderHeader.OrderNo}`);
        console.log(`      • Customer No: ${results.customerOrderHeader.CustomerNo}`);
        console.log(`      • Status: ${results.customerOrderHeader.Objstate}`);
        console.log(`      • Contract: ${results.customerOrderHeader.Contract}`);
        console.log(`      • Date Entered: ${results.customerOrderHeader.DateEntered}`);
        console.log(`      • Order Code: ${results.customerOrderHeader.OrderCode}`);
        
        // Afficher tous les champs disponibles
        const fields = Object.keys(results.customerOrderHeader).filter(k => !k.startsWith('@'));
        console.log(`\n   📋 Tous les champs disponibles (${fields.length}):`);
        fields.forEach(field => {
          const value = results.customerOrderHeader[field];
          if (value !== null && value !== '' && typeof value !== 'object') {
            console.log(`      • ${field}: ${value}`);
          }
        });
        console.log('');
      } else {
        console.log(`   ⚠️  Aucun Customer Order trouvé avec OrderNo = 'C1000038587'\n`);
      }
    }

    // 3. Customer Order Lines
    console.log('📦 ÉTAPE 3: Customer Order Lines');
    console.log('─'.repeat(80) + '\n');
    
    const customerOrderLines = await makeRequest('/CustomerOrderHandling.svc/CustomerOrderLineSet?$filter=OrderNo eq \'C1000038587\'');
    
    if (customerOrderLines.error) {
      console.log(`   ❌ Erreur: ${customerOrderLines.body || customerOrderLines.message}\n`);
    } else if (customerOrderLines.value) {
      results.customerOrderLines = customerOrderLines.value;
      console.log(`   ✅ ${customerOrderLines.value.length} ligne(s) trouvée(s)\n`);
      
      customerOrderLines.value.forEach((line, index) => {
        console.log(`   📦 Ligne ${index + 1}:`);
        console.log(`      • Line No: ${line.LineNo}`);
        console.log(`      • Part No: ${line.PartNo}`);
        console.log(`      • Part Description: ${line.PartDescription || 'N/A'}`);
        console.log(`      • Qty Ordered: ${line.QtyOrdered || line.BuyQtyDue}`);
        console.log(`      • Configuration ID: ${line.ConfigurationId || 'N/A'}`);
        
        // Rechercher des champs liés au serial number
        const serialFields = Object.keys(line).filter(k => 
          k.toLowerCase().includes('serial') || 
          k.toLowerCase().includes('boat') ||
          k.toLowerCase().includes('hull') ||
          k.toLowerCase().includes('dop')
        );
        
        if (serialFields.length > 0) {
          console.log(`      🎯 Champs Serial/Boat/DOP trouvés:`);
          serialFields.forEach(field => {
            console.log(`         • ${field}: ${line[field]}`);
          });
        }
        
        // Afficher tous les champs non-null
        const fields = Object.keys(line).filter(k => !k.startsWith('@'));
        console.log(`\n      📋 Tous les champs non-null:`);
        fields.forEach(field => {
          const value = line[field];
          if (value !== null && value !== '' && typeof value !== 'object') {
            console.log(`         • ${field}: ${value}`);
          }
        });
        console.log('');
      });
    }

    // 4. DOP Header 95
    console.log('🏗️  ÉTAPE 4: DOP Header 95');
    console.log('─'.repeat(80) + '\n');
    
    const dopHeader = await makeRequest('/DopHeaderHandling.svc/DopHeaders?$filter=contains(DopId,\'95\')');
    
    if (dopHeader.error) {
      console.log(`   ❌ Erreur: ${dopHeader.body || dopHeader.message}\n`);
    } else if (dopHeader.value && dopHeader.value.length > 0) {
      results.dopHeader = dopHeader.value[0];
      console.log(`   ✅ DOP Header trouvé\n`);
      console.log(`   📊 Données clés:`);
      
      const fields = Object.keys(results.dopHeader).filter(k => !k.startsWith('@'));
      fields.forEach(field => {
        const value = results.dopHeader[field];
        if (value !== null && value !== '' && typeof value !== 'object') {
          console.log(`      • ${field}: ${value}`);
        }
      });
      console.log('');
    }

    // 5. DOP Serial Reservations
    console.log('🔢 ÉTAPE 5: DOP Serial Reservations');
    console.log('─'.repeat(80) + '\n');
    
    const dopSerials = await makeRequest('/DopHeaderHandling.svc/Reference_DopHeadSerialReserv?$filter=contains(DopId,\'95\')');
    
    if (dopSerials.error) {
      console.log(`   ❌ Erreur: ${dopSerials.body || dopSerials.message}\n`);
    } else if (dopSerials.value) {
      results.dopSerials = dopSerials.value;
      console.log(`   ✅ ${dopSerials.value.length} réservation(s) trouvée(s)\n`);
      
      dopSerials.value.forEach((serial, index) => {
        console.log(`   🔢 Serial ${index + 1}:`);
        console.log(`      • DOP ID: ${serial.DopId}`);
        console.log(`      • Part No: ${serial.PartNo}`);
        console.log(`      • Serial No: ${serial.SerialNo} 🎯`);
        console.log(`      • Serial Source: ${serial.SerialSource}`);
        console.log('');
      });
    }

    // Sauvegarder les résultats
    const timestamp = Date.now();
    const jsonFile = `customer-order-analysis-${timestamp}.json`;
    fs.writeFileSync(jsonFile, JSON.stringify(results, null, 2));
    
    console.log('\n' + '═'.repeat(80));
    console.log('💾 RÉSULTATS SAUVEGARDÉS');
    console.log('═'.repeat(80) + '\n');
    console.log(`📄 Fichier JSON: ${jsonFile}\n`);

    // Analyse et conclusion
    console.log('🔍 ANALYSE & CONCLUSIONS:\n');
    console.log('─'.repeat(80) + '\n');

    if (results.shopOrder && results.customerOrderLines) {
      console.log('✅ RELATIONS TROUVÉES:\n');
      
      console.log('📦 Shop Order 97277:');
      console.log(`   • Fabrique: ${results.shopOrder.PartNo}`);
      console.log(`   • DOP ID: ${results.shopOrder.DopId}`);
      console.log(`   • CustomerOrderNo dans API: ${results.shopOrder.CustomerOrderNo || 'null ❌'}\n`);
      
      if (results.dopSerials && results.dopSerials.length > 0) {
        console.log('🔢 Serial Number trouvé:');
        console.log(`   • ${results.dopSerials[0].SerialNo} (Part: ${results.dopSerials[0].PartNo})`);
        console.log(`   • Source: ${results.dopSerials[0].SerialSource}\n`);
      }
      
      if (results.customerOrderLines.length > 0) {
        console.log('📋 Customer Order Lines:');
        results.customerOrderLines.forEach((line, index) => {
          console.log(`   Ligne ${index + 1}: ${line.PartNo} (Qty: ${line.QtyOrdered || line.BuyQtyDue})`);
        });
        console.log('');
      }
    }

    console.log('💡 HYPOTHÈSES À VALIDER:\n');
    console.log('   1. Le Customer Order est-il lié au DOP plutôt qu\'au Shop Order ?');
    console.log('   2. Y a-t-il un champ Serial Number dans Customer Order Lines ?');
    console.log('   3. Le Serial Number LG5MA0114 est-il le bon pour l\'impression ?\n');

    console.log('✅ Exploration terminée!\n');

  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
})();
