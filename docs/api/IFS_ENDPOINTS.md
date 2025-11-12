# 📡 IFS Endpoints - Documentation API

**Version** : 1.0  
**Client OAuth2** : `***REMOVED***`  
**Dernière mise à jour** : 12 novembre 2025

---

## 📋 Vue d'ensemble

Ce document liste tous les services IFS Cloud (OData v4) utilisés par le Manufacturing Portal. Au total, **11 services IFS** sont utilisés avec **26 endpoints**.

### Statistiques

| Métrique | Valeur |
|----------|--------|
| **Services IFS** | 11 |
| **Endpoints GET** | 22 |
| **Endpoints POST** | 3 |
| **Endpoints binaires** | 1 |
| **Total** | 26 |
| **Volume estimé** | ~3000 appels/jour |

---

## 🔐 Configuration OAuth2

### Authentification

```bash
IFS_BASE_URL=https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1
IFS_CLIENT_ID=***REMOVED***
IFS_CLIENT_SECRET=***
IFS_TOKEN_URL=https://beneteau-group-ast.ifs.cloud/auth/realms/beneast1/protocol/openid-connect/token
IFS_SCOPE=openid microprofile-jwt
```

### Gestion du token

```typescript
// src/shared/services/ifs-client.ts
class IFSClient {
  private token: string | null = null
  private tokenExpiry: number = 0

  async getToken(): Promise<string> {
    // Cache automatique avec expiration
    if (this.token && Date.now() < this.tokenExpiry) {
      return this.token
    }
    
    // Renouvellement automatique
    const response = await fetch(IFS_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: IFS_CLIENT_ID,
        client_secret: IFS_CLIENT_SECRET,
        scope: IFS_SCOPE
      })
    })
    
    const data = await response.json()
    this.token = data.access_token
    this.tokenExpiry = Date.now() + (data.expires_in - 60) * 1000
    
    return this.token
  }
}
```

---

## 🔄 Services partagés (2)

### 1. ShopOrderHandling.svc

**Usage :** Boat Config + Part Printer

#### GET `/ShopOrds`

Recherche de Shop Orders.

**Paramètres OData :**
```typescript
{
  $filter: "contains(OrderNo,'97277')",
  $select: "OrderNo,ReleaseNo,SequenceNo,PartNo,DopId,DopDemandExists"
}
```

**Exemple :**
```typescript
const response = await client.get('ShopOrderHandling.svc/ShopOrds', {
  $filter: "contains(OrderNo,'97277') and State eq 'Released'"
})
```

#### GET `/ShopOrds(...)/MaterialArray`

Navigation vers les matériaux d'un Shop Order.

**Usage :** Part Printer (récupération Raw Material)

---

### 2. PrintDialog.svc

**Usage :** Boat Config + Part Printer

#### GET `/LogicalPrinterSet`

Liste des imprimantes disponibles.

**Réponse :**
```json
{
  "value": [
    {
      "PrinterId": "PRTBX040C",
      "Description": "Production Printer",
      "Location": "Building 4"
    }
  ]
}
```

#### GET `/LanguageCodeSet`

Liste des langues disponibles.

**Réponse :**
```json
{
  "value": [
    { "LanguageCode": "en", "Description": "English" },
    { "LanguageCode": "fr", "Description": "French" }
  ]
}
```

---

## 🚢 Services Boat Configuration (4 exclusifs)

### 3. DopHeaderHandling.svc

#### GET `/Reference_DopHeadSerialReserv`

Récupération Serial Numbers via DOP Header ID.

**Paramètres :**
```typescript
{
  $filter: "contains(DopId,'95')"
}
```

**Exemple complet :**
```typescript
// 1. Shop Order retourne DopId = "95 - 10088"
// 2. Parser pour extraire "95"
const mainDopId = extractMainDopId("95 - 10088") // → "95"

// 3. Récupérer Serial Number
const response = await client.get(
  'DopHeaderHandling.svc/Reference_DopHeadSerialReserv',
  { $filter: `contains(DopId,'${mainDopId}')` }
)

// 4. Retour
{
  "value": [{
    "SerialNo": "LG5MA0114",
    "PartNo": "LG5MA",
    "DopId": "95"
  }]
}
```

---

### 4. CustomerOrderHandling.svc

⚠️ **CRITIQUE** : Site FR05A uniquement

#### GET `/CustomerOrderLineSet`

Recherche Customer Order Line par Serial Number.

**Paramètres :**
```typescript
{
  $filter: "SerialNo eq 'LG5MA0114' and Site eq 'FR05A' and OrderType eq 'BAT'"
}
```

**Important :** 
- Filtrer **obligatoirement** sur `Site eq 'FR05A'`
- Boat Config n'utilise jamais FR018 ou autres sites

#### GET `/CustomerOrderSet`

Détails du Customer Order.

#### POST `/CustomerOrder_PrintResultKey`

Action IFS pour générer un ResultKey d'impression.

**Body :**
```json
{
  "OrderNo": "C1000038587",
  "ResultKey": 0
}
```

---

## 🏷️ Services Part Printer (7 exclusifs)

### 5. ProductionLineHandling.svc

#### GET `/ProductionLines`

Liste des lignes de production par site.

**Paramètres :**
```typescript
{
  $filter: "Contract eq 'BDR'"
}
```

---

### 6. OperationBlockHandling.svc

#### GET `/Reference_ShopOrderOperation`

Données opération (notamment OP10 pour Block ID).

**Paramètres :**
```typescript
{
  $filter: "OrderNo eq '97277' and OperationNo eq 10"
}
```

**Retour :**
```json
{
  "value": [{
    "OrderNo": "97277",
    "OperationNo": 10,
    "BlockId": "BLOCK_001",
    "WorkCenter": "WC01"
  }]
}
```

---

### 7. InventoryPartHandling.svc

#### GET `/InventoryPartSet(Contract,PartNo)`

Récupération part avec clé composite.

**Exemple :**
```typescript
const key = `Contract='BDR',PartNo='AN29-13-00'`
const response = await client.get(
  `InventoryPartHandling.svc/InventoryPartSet(${key})`
)
```

---

### 8. PartHandling.svc

⚠️ **Service le plus complexe** - Navigations en 2 étapes

#### GET `/PartCatalogSet(...)/PartCatalogReferenceArray`

Navigation vers références part (récupère `TechnicalSpecNo`).

#### GET `/PartCatalogReferenceArray(...)/TechnicalSpecBothArray`

Navigation vers attributs techniques **avec filtres obligatoires**.

**⚠️ CRITIQUE** : Parts AN29-13-00 ont 50+ attributs → timeout sans filtre

**Solution :** 3 requêtes parallèles avec `$filter`

```typescript
// ❌ MAUVAIS - Timeout
const allAttrs = await get('TechnicalSpecBothArray')

// ✅ BON - 3 requêtes avec filtres
const [genericCode, varnishCode, lengthSetup] = await Promise.all([
  get('TechnicalSpecBothArray?$filter=Attribute eq \'GENERIC CODE\''),
  get('TechnicalSpecBothArray?$filter=Attribute eq \'VARNISH CODE\''),
  get('TechnicalSpecBothArray?$filter=Attribute eq \'LENGTH SETUP\'')
])
```

---

### 9. EngineeringPartRevisionsHandling.svc

#### GET `/EngPartRevisionSet`

Révisions engineering parts.

**Paramètres :**
```typescript
{
  $filter: "PartNo eq 'AN29-13-00' and EngChgLevel eq '1'"
}
```

---

### 10. CompanySiteHandling.svc

**Usage :** Part Printer (récupération des sites/contracts)

#### GET `/CompanySiteSet`

Liste de tous les sites/contracts IFS disponibles.

**Paramètres :**
```typescript
{
  $select: 'Contract,Description,Company,Country',
  $orderby: 'Contract asc'
}
```

**Exemple :**
```typescript
const response = await client.get('CompanySiteHandling.svc/CompanySiteSet', {
  $select: 'Contract,Description,Company,Country',
  $orderby: 'Contract asc'
})
```

**Réponse :**
```json
{
  "value": [
    {
      "Contract": "FR018",
      "Company": "FR0090",
      "Description": "BDX TAKT COURT",
      "Country": "FR"
    },
    {
      "Contract": "FR05A",
      "Company": "FR0090",
      "Description": "BDX ADMIN",
      "Country": "FR"
    }
  ]
}
```

**Sites disponibles (AST env):**
- IT001: MONFALCONE
- FR020: BDX PLT LOGISTIQUE  
- FR001: BELLEVILLE
- FR019: BDX TAKT LONG
- FR018: BDX TAKT COURT
- IT01A: GBI ADMIN
- FR013: LE POIRE
- FR05A: BDX ADMIN
- FR017: BDX AMONT

#### GET `/CompanySiteSet(...)/SiteMfgstdInfoArray(...)/SiteMfgstdRangeArray`

Navigation complexe pour Range ID.

**Exemple :**
```typescript
// Étape 1: CompanySiteSet
const site = await get(`CompanySiteSet(Contract='${contract}')`)

// Étape 2: Navigation SiteMfgstdInfoArray
const info = await get(
  `CompanySiteSet(Contract='${contract}')/SiteMfgstdInfoArray(ObjectId='${objectId}')`
)

// Étape 3: Navigation SiteMfgstdRangeArray
const ranges = await get(
  `.../SiteMfgstdRangeArray?$filter=StandardId eq '${standardId}'`
)
```

---

## ⚠️ Points d'attention

### 1. Filtres OData

**Problème :** `eq` avec strings cause erreurs de type

**Solution :** Utiliser `contains()` + filtrage côté code

```typescript
// ❌ Éviter
$filter: "OrderNo eq '1043'"  // ⚠️ Erreur "types not compatible"

// ✅ Préférer
$filter: "contains(OrderNo,'1043')"  // ✅ Fonctionne

// Filtrage exact côté code
const exactMatch = response.value.find(item => 
  item.OrderNo === searchValue.trim()
)
```

### 2. TechnicalSpecBothArray (Part Printer)

**CRITIQUE :** Toujours utiliser `$filter` pour éviter timeouts

```typescript
// Parts AN29-13-00 : 50+ attributs
// Sans filtre → timeout
// Avec filtre → 200ms chacun
```

### 3. DOP ID composite

**Problème :** Shop Order retourne `"54 - 1035"`, Serial Number cherche avec ID complet

**Solution :** Parser avant requête

```typescript
export function extractMainDopId(dopId: string): string {
  return dopId.split('-')[0].trim()  // "54 - 1035" → "54"
}
```

### 4. Navigations OData

**Clés composites** : Toujours encoder avec `encodeURIComponent()`

```typescript
const key = encodeURIComponent(`Contract='BDR',PartNo='AN29-13-00'`)
const url = `InventoryPartSet(${key})`
```

---

## 📊 Volume d'appels estimé

### Par outil

| Outil | Appels/opération | Volume/jour | Total |
|-------|------------------|-------------|-------|
| **Boat Config** | 5-8 | ~20 impressions | ~100-160 |
| **Part Printer** | 10-15 | ~100-200 étiquettes | ~1000-3000 |
| **Total estimé** | - | - | **~3000/jour** |

### Par service IFS

| Service | % utilisation | Appels/jour |
|---------|---------------|-------------|
| ShopOrderHandling | 30% | ~900 |
| PartHandling | 25% | ~750 |
| PrintDialog | 15% | ~450 |
| OperationBlockHandling | 10% | ~300 |
| Autres | 20% | ~600 |

---

## ✅ Checklist validation (Pour Thomas)

### Permissions client `***REMOVED***`

- [ ] ✅ Lecture sur les 11 services IFS
- [ ] ✅ Actions POST (CustomerOrder_PrintResultKey, PrintDialog)
- [ ] ✅ Navigations OData autorisées (clés composites)
- [ ] ✅ Téléchargement binaire PDF (PdfArchiveSet)
- [ ] ✅ Pas de rate limiting < 3000 appels/jour

### Tests à effectuer

- [ ] ✅ Boat Config: Impression Customer Order complète
- [ ] ✅ Part Printer: Génération étiquettes (attributs)
- [ ] ✅ Timeout fix TechnicalSpecBothArray validé
- [ ] ✅ Navigations OData (PartHandling, CompanySiteHandling)

---

## 🔧 Outils de debug

### Test connexion IFS

```bash
# Tester le token OAuth2
pnpm run test:ifs-token

# Tester un endpoint spécifique
pnpm run test:ifs-endpoint ShopOrderHandling.svc/ShopOrds
```

### Logs

```typescript
// Tous les appels IFS sont loggés
console.log(`🔍 IFS GET ${service} ${JSON.stringify(params)}`)
console.log(`✅ IFS Response: ${response.value.length} items`)
```

---

## 📞 Support

### Ressources

- **IFS Cloud Docs** : https://docs.ifs.com/cloud/
- **OData v4** : https://www.odata.org/documentation/
- **Client OAuth2** : `src/shared/services/ifs-client.ts`

### Contacts

- **IFS Admin** : Thomas (validation permissions)
- **Dev Team** : Équipe Manufacturing Portal

---

**Maintenu par** : Équipe Manufacturing Portal  
**Version** : 1.0  
**Pour toute question sur les permissions** : Contacter Thomas avec ce document
