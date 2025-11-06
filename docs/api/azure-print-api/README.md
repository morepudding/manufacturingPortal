# Azure Print API - Bénéteau ERP Boat

## 📋 Vue d'ensemble

API Azure pour l'impression via l'infrastructure Bénéteau ERP Boat.
Cette API permet d'envoyer des jobs d'impression à des imprimantes IFS via Azure API Management.

---

## 🔐 Configuration

### Environnement: DEV (AST)

```json
{
  "Client:ClientId": "***REMOVED***",
  "Client:ClientSecret": "***REMOVED***",
  "OAuthURL": "https://login.microsoftonline.com/beneteaugroup.onmicrosoft.com/oauth2/v2.0/token",
  "RequestURL": "https://gbenapimgtaiscommondev.azure-api.net/manufacturing/print/execute/Print",
  "OAuthScope": "api://api.erpboat.dev/.default",
  "GrantType": "client_credentials",
  "Ocpm": "***REMOVED***;product=erpboat"
}
```

### Variables d'environnement (.env.local)

```bash
# Azure Print API (Bénéteau ERP Boat)
AZURE_PRINT_CLIENT_ID=***REMOVED***
AZURE_PRINT_CLIENT_SECRET=***REMOVED***
AZURE_PRINT_OAUTH_URL=https://login.microsoftonline.com/beneteaugroup.onmicrosoft.com/oauth2/v2.0/token
AZURE_PRINT_API_URL=https://gbenapimgtaiscommondev.azure-api.net/manufacturing/print/execute/Print
AZURE_PRINT_OAUTH_SCOPE=api://api.erpboat.dev/.default
AZURE_PRINT_SUBSCRIPTION_KEY=***REMOVED***;product=erpboat
```

---

## 🔑 Authentification OAuth2

### Étape 1 : Obtenir un Access Token

**Endpoint** : `POST https://login.microsoftonline.com/beneteaugroup.onmicrosoft.com/oauth2/v2.0/token`

**Headers** :
```http
Content-Type: application/x-www-form-urlencoded
```

**Body** :
```
client_id=***REMOVED***
client_secret=***REMOVED***
scope=api://api.erpboat.dev/.default
grant_type=client_credentials
```

**Réponse** :
```json
{
  "token_type": "Bearer",
  "expires_in": 3599,
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### Étape 2 : Utiliser le Token

Le token doit être utilisé dans le header `Authorization` de toutes les requêtes vers l'API Print.

---

## 🖨️ API Print

### Endpoint

```
POST https://gbenapimgtaiscommondev.azure-api.net/manufacturing/print/execute/Print
```

### Headers Requis

```http
Authorization: Bearer {access_token}
Content-Type: application/json
Ocp-Apim-Subscription-Key: ***REMOVED***;product=erpboat
```

⚠️ **IMPORTANT** : Le header `Ocp-Apim-Subscription-Key` est **obligatoire** pour Azure API Management.

### Request Body (Format CORRECT - fourni par le créateur)

```json
{
  "Printer": "PRTBX109 - MAFOPR183",
  "PrintModel": "BEN_MA_FO_CR_184.rdl",
  "Selection": "ORDER_NO=2259^RELEASE_NO=*^SEQUENCE_NO=*^;ORDER_NO=2525^RELEASE_NO=*^SEQUENCE_NO=*^;ORDER_NO=1689^RELEASE_NO=*^SEQUENCE_NO=*^;"
}
```

⚠️ **NOTE** : Ce format utilise **un layout IFS** (`BEN_MA_FO_CR_184.rdl`) et non un PDF custom !

### Champs du Request

| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| `Printer` | string | ✅ | Nom logique de l'imprimante IFS (ex: "PRTBX105_P") |
| `PrintModel` | string | ✅ | Nom du layout IFS Crystal Report (ex: "BEN_MA_FO_CR_184.rdl") |
| `Selection` | string | ✅ | Liste des Shop Orders au format spécial (voir ci-dessous) |

### Format du champ Selection

Le champ `Selection` contient les Shop Orders à imprimer dans un format spécifique :

```
ORDER_NO=XXX^RELEASE_NO=Y^SEQUENCE_NO=Z^;ORDER_NO=AAA^RELEASE_NO=B^SEQUENCE_NO=C^;
```

**Structure** :
- Séparateur entre Shop Orders : `;`
- Séparateur entre champs : `^`
- Wildcard : `*` pour RELEASE_NO et SEQUENCE_NO (si applicable)
- Format par Shop Order : `ORDER_NO=XXX^RELEASE_NO=Y^SEQUENCE_NO=Z^`

**Exemple** :
```typescript
// 3 Shop Orders
const selection = [
  "ORDER_NO=2259^RELEASE_NO=*^SEQUENCE_NO=*^",
  "ORDER_NO=2525^RELEASE_NO=*^SEQUENCE_NO=*^",
  "ORDER_NO=1689^RELEASE_NO=*^SEQUENCE_NO=*^"
].join(';') + ';'

// Résultat:
// "ORDER_NO=2259^RELEASE_NO=*^SEQUENCE_NO=*^;ORDER_NO=2525^RELEASE_NO=*^SEQUENCE_NO=*^;ORDER_NO=1689^RELEASE_NO=*^SEQUENCE_NO=*^;"
```

### Response Success (200)

```json
{
  "Message": "Success"
}
```

⚠️ **NOTE** : La réponse peut prendre jusqu'à 120 secondes (IFS génère les étiquettes).

### Response Error (500)

```json
{
  "error": "Internal Server Error"
}
```

**Causes possibles** :
- Shop Orders inexistants
- Layout IFS introuvable
- Format Selection invalide
- Imprimante non configurée dans IFS

---

## 🧪 Test de Connexion

### Script cURL

```bash
# 1. Obtenir le token OAuth2
TOKEN=$(curl -s -X POST \
  "https://login.microsoftonline.com/beneteaugroup.onmicrosoft.com/oauth2/v2.0/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "client_id=***REMOVED***" \
  -d "client_secret=***REMOVED***" \
  -d "scope=api://api.erpboat.dev/.default" \
  -d "grant_type=client_credentials" \
  | jq -r '.access_token')

echo "Token obtained: ${TOKEN:0:50}..."

# 2. Tester l'API Print (avec un PDF de test)
curl -X POST \
  "https://gbenapimgtaiscommondev.azure-api.net/manufacturing/print/execute/Print" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -H "Ocp-Apim-Subscription-Key: ***REMOVED***;product=erpboat" \
  -d '{
    "printerName": "PRTBX105_P",
    "documentName": "test.pdf",
    "documentBase64": "JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSL0NvbnRlbnRzIDQgMCBSPj4KZW5kb2JqCjQgMCBvYmoKPDwvRmlsdGVyL0ZsYXRlRGVjb2RlL0xlbmd0aCA0OT4+c3RyZWFtCniynFMwUDAxVDBQMFYwMFZQUDAxMFFQUDBSMFFRUNBXUNBQyEhQ0NBQMFAwVDBQ0FVQUARAFqQVAQFgYgpfAQAAc3RyZWFt",
    "copies": 1
  }'
```

### Script Node.js (test-azure-print-api.ts)

Créer dans `/scripts/test-azure-print-api.ts` :

```typescript
/**
 * Test Azure Print API
 * 
 * Script pour tester la connexion à l'API d'impression Azure
 */

async function getAccessToken(): Promise<string> {
  const params = new URLSearchParams({
    client_id: process.env.AZURE_PRINT_CLIENT_ID!,
    client_secret: process.env.AZURE_PRINT_CLIENT_SECRET!,
    scope: process.env.AZURE_PRINT_OAUTH_SCOPE!,
    grant_type: 'client_credentials',
  })

  const response = await fetch(process.env.AZURE_PRINT_OAUTH_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  })

  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(`OAuth failed: ${JSON.stringify(data)}`)
  }

  console.log('✅ Access token obtained')
  return data.access_token
}

async function testPrintAPI(accessToken: string) {
  const testPdf = Buffer.from('Test PDF content').toString('base64')

  const response = await fetch(process.env.AZURE_PRINT_API_URL!, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': process.env.AZURE_PRINT_SUBSCRIPTION_KEY!,
    },
    body: JSON.stringify({
      printerName: 'PRTBX105_P',
      documentName: 'test.pdf',
      documentBase64: testPdf,
      copies: 1,
    }),
  })

  const data = await response.json()
  
  console.log('📊 Response status:', response.status)
  console.log('📄 Response data:', JSON.stringify(data, null, 2))

  return data
}

async function main() {
  try {
    console.log('🔐 Step 1: Getting OAuth2 token...')
    const token = await getAccessToken()
    
    console.log('\n🖨️ Step 2: Testing Print API...')
    const result = await testPrintAPI(token)
    
    console.log('\n✅ Test completed successfully!')
  } catch (error) {
    console.error('❌ Test failed:', error)
    process.exit(1)
  }
}

main()
```

**Exécuter** :
```bash
cd /home/rbottero/ManufacturingPortal
npx tsx scripts/test-azure-print-api.ts
```

---

## 🔄 Intégration dans Part Printer

### Architecture proposée

```
┌─────────────────────────────────────────────────┐
│  Frontend: Part Printer Page                   │
│  - Sélection filtres (Site, Date, Line, etc.)  │
│  - Récupération Shop Orders filtrés            │
│  - Sélection imprimante IFS                    │
│  - Sélection mode impression                   │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  API Route: /api/part-printer/labels/print     │
│  - Reçoit liste Shop Orders + Printer          │
│  - Génère string Selection (format IFS)        │
│  - Obtient token OAuth2 (cached)               │
│  - Envoie à Azure Print API                    │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  Azure Print Service                            │
│  - Gère OAuth2 (token cache 1h)                │
│  - Envoi vers Azure API Management             │
│  - Retry logic (3 tentatives)                  │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  Azure API Management (APIM)                    │
│  - Validation Subscription Key                 │
│  - Routing vers IFS Print Infrastructure       │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  IFS Print Infrastructure                       │
│  - Utilise layout BEN_MA_FO_CR_184.rdl         │
│  - Génère étiquettes pour Shop Orders          │
│  - Envoie job à l'imprimante physique          │
└─────────────────────────────────────────────────┘
```

### Workflow complet

```typescript
// 1. Frontend: Récupérer les Shop Orders filtrés
const shopOrders = await fetchFilteredShopOrders({
  site: 'BDR',
  startDate: '2025-10-30',
  productionLine: 'Line 1',
  // ... autres filtres
})

// 2. Frontend: Générer le string Selection
const selectionString = shopOrders
  .map(order => `ORDER_NO=${order.orderNo}^RELEASE_NO=${order.releaseNo}^SEQUENCE_NO=${order.sequenceNo}^`)
  .join(';') + ';'

// 3. Frontend: Envoyer à l'API Print
const printResponse = await fetch('/api/part-printer/labels/print', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    printer: selectedPrinter,          // Ex: "PRTBX105_P"
    printModel: 'BEN_MA_FO_CR_184.rdl', // Layout IFS
    selection: selectionString,        // Shop Orders au format IFS
    metadata: {
      site,
      orderCount: shopOrders.length,
      printMode
    }
  })
})

// 4. Backend: API /api/part-printer/labels/print
// - Obtient token OAuth2
// - Envoie à Azure Print API
// - Retourne succès/erreur

if (printResponse.ok) {
  toast.success(`Impression lancée pour ${shopOrders.length} Shop Orders !`)
} else {
  const error = await printResponse.json()
  toast.error(`Erreur d'impression: ${error.message}`)
}
```

---

## 📊 Codes d'Erreur

| Code | HTTP | Description | Action |
|------|------|-------------|--------|
| `AUTH_FAILED` | 401 | Échec authentification OAuth2 | Vérifier credentials |
| `INVALID_TOKEN` | 401 | Token expiré ou invalide | Renouveler le token |
| `MISSING_SUBSCRIPTION_KEY` | 403 | Header Ocp-Apim manquant | Ajouter le header |
| `PRINTER_NOT_FOUND` | 404 | Imprimante introuvable | Vérifier nom imprimante |
| `INVALID_PDF` | 400 | PDF Base64 invalide | Vérifier encodage |
| `PRINT_JOB_FAILED` | 500 | Erreur lors de l'impression | Retry ou contact support |

---

## 🔒 Sécurité

### Best Practices

1. **Credentials** : Stocker dans `.env.local` (jamais commité)
2. **Token Caching** : Cache le token OAuth2 (expire après 1h)
3. **HTTPS Only** : Toutes les communications en HTTPS
4. **Subscription Key** : Protéger la clé APIM (rotation régulière)
5. **Error Logging** : Logger les erreurs sans exposer les credentials

### Token Caching Strategy

```typescript
// Cache simple en mémoire (production: Redis recommandé)
let cachedToken: { token: string; expiresAt: number } | null = null

async function getAccessToken(): Promise<string> {
  // Check cache
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token
  }
  
  // Fetch new token
  const response = await fetchOAuthToken()
  
  // Cache for 55 minutes (token valid 1h)
  cachedToken = {
    token: response.access_token,
    expiresAt: Date.now() + (55 * 60 * 1000)
  }
  
  return cachedToken.token
}
```

---

## 📝 TODO

- [x] Créer `/api/part-printer/labels/print` route
- [x] Créer `azure-print-service.ts` avec OAuth2 + caching
- [x] Tester avec script `test-azure-print-api.ts`
- [x] Découvrir le format correct du payload (Printer, PrintModel, Selection)
- [ ] **BLOQUEUR** : Obtenir Shop Orders valides pour tester l'API
- [ ] **BLOQUEUR** : Vérifier que le layout BEN_MA_FO_CR_184.rdl existe en DEV
- [ ] **BLOQUEUR** : Déboguer l'erreur HTTP 500
- [ ] Intégrer dans le workflow Part Printer
- [ ] Ajouter gestion d'erreurs (PP_E006 : Print failed ?)
- [ ] Ajouter retry logic (3 tentatives)
- [ ] Implémenter token caching (Redis en production)
- [ ] Ajouter logging détaillé (succès/échecs)
- [ ] Tests E2E avec vraie imprimante

**📄 Voir aussi** : [FINDINGS.md](./FINDINGS.md) - Résultats détaillés des tests

---

**Version** : 2.0.0  
**Date** : 30 octobre 2025  
**Environnement** : DEV (AST)  
**Status API** : ⚠️ Accessible mais retourne HTTP 500 (données de test invalides)
