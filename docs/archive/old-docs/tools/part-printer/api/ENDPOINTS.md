# 🔌 API Endpoints - Part Printer

**Version** : 1.0  
**Status** : 📋 Spécification  
**Base URL** : `/api/part-printer`

---

## 📋 Vue d'ensemble

Ce document liste tous les endpoints API nécessaires pour l'outil **Part Printer**. Tous les endpoints suivent les conventions REST et retournent du JSON.

### Convention de réponse

```typescript
// Success
{
  "success": true,
  "data": { ... }
}

// Error
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE"
  }
}
```

---

## 🏭 Sites & Production Lines

### GET /api/part-printer/sites

Récupère la liste des sites IFS (Contracts).

**Query Parameters** : Aucun

**Response** :
```json
{
  "success": true,
  "data": {
    "sites": [
      {
        "contract": "BDR",
        "name": "Site BDR",
        "companyId": "COMP_01",
        "active": true
      },
      {
        "contract": "PRTBX",
        "name": "Site PRTBX",
        "companyId": "COMP_02",
        "active": true
      }
    ],
    "count": 2
  }
}
```

**Errors** :
- `500` : Erreur serveur IFS

**IFS Service** : `ContractHandling.svc/Contracts`

---

### GET /api/part-printer/production-lines

Récupère les lignes de production filtrées par site.

**Query Parameters** :
- `site` (required) : Contract du site (ex: "BDR")

**Example** :
```
GET /api/part-printer/production-lines?site=BDR
```

**Response** :
```json
{
  "success": true,
  "data": {
    "productionLines": [
      {
        "lineId": "L1",
        "name": "Line 1",
        "site": "BDR",
        "description": "Production Line 1",
        "active": true
      },
      {
        "lineId": "L2",
        "name": "Line 2",
        "site": "BDR",
        "description": "Production Line 2",
        "active": true
      }
    ],
    "count": 2
  }
}
```

**Errors** :
- `400` : Paramètre `site` manquant
- `404` : Aucune ligne de production trouvée pour ce site
- `500` : Erreur serveur IFS

**IFS Service** : `ProductionLineHandling.svc/ProductionLines`

---

## 🔍 Shop Orders

### POST /api/part-printer/shop-orders/filter

Recherche des Shop Orders avec filtres avancés.

**Body Parameters** :
```typescript
{
  site: string                          // Required: "BDR", "PRTBX", etc.
  productionLine?: string               // Optional: "L1", "L2", etc.
  startDate: string                     // Required: ISO date "2025-10-13"
  blockDate: boolean                    // Required: true (débit) / false (redébit)
  op10BlockId?: "EMPTY" | "NO_CONDITION" // Optional
}
```

**Example Request** :
```json
{
  "site": "BDR",
  "productionLine": "L1",
  "startDate": "2025-10-13",
  "blockDate": true,
  "op10BlockId": "EMPTY"
}
```

**Response** :
```json
{
  "success": true,
  "data": {
    "shopOrders": [
      {
        "orderNo": "97277",
        "releaseNo": "1",
        "sequenceNo": "10",
        "partNo": "PART_001",
        "contract": "BDR",
        "state": "Released",
        "scheduledStartDate": "2025-10-13T08:00:00Z",
        "productionLine": "L1",
        "blockDate": true,
        "dopId": "95"
      }
    ],
    "count": 1,
    "filters": {
      "site": "BDR",
      "productionLine": "L1",
      "startDate": "2025-10-13",
      "blockDate": true,
      "op10BlockId": "EMPTY"
    }
  }
}
```

**Errors** :
- `400` : Paramètres manquants ou invalides
- `404` : Aucun Shop Order trouvé
- `500` : Erreur serveur IFS

**Business Rules** :
| Mode | Block Date | OP10 Block ID | Start Date Filter |
|------|------------|---------------|-------------------|
| **Débit classique** | `true` | `EMPTY` (strictly empty) | `= startDate` |
| **Redébit** | `false` | `NO_CONDITION` | `<= today` |

**IFS Service** : `ShopOrderHandling.svc/ShopOrds`

---

## ⚙️ Operations

### GET /api/part-printer/operations

Récupère les données de l'opération (notamment OP10).

**Query Parameters** :
- `orderNo` (required) : Numéro d'ordre
- `releaseNo` (required) : Numéro de release
- `sequenceNo` (required) : Numéro de séquence
- `operationNo` (optional, default: 10) : Numéro d'opération

**Example** :
```
GET /api/part-printer/operations?orderNo=97277&releaseNo=1&sequenceNo=10&operationNo=10
```

**Response** :
```json
{
  "success": true,
  "data": {
    "operation": {
      "orderNo": "97277",
      "releaseNo": "1",
      "sequenceNo": "10",
      "operationNo": 10,
      "blockId": "B25",
      "state": "Released",
      "materialLines": [
        {
          "lineItemNo": 1,
          "partNo": "OAK_RAW_001",
          "description": "Oak Raw Material",
          "quantity": 1
        }
      ]
    }
  }
}
```

**Errors** :
- `400` : Paramètres manquants
- `404` : Opération non trouvée
- `500` : Erreur serveur IFS

**IFS Service** : `OperationHandling.svc/Operations`

---

## 📦 Master Parts

### GET /api/part-printer/master-parts/:partNo/attributes

Récupère les attributs du Master Part.

**Path Parameters** :
- `partNo` (required) : Code de la pièce

**Example** :
```
GET /api/part-printer/master-parts/PART_001/attributes
```

**Response** :
```json
{
  "success": true,
  "data": {
    "partNo": "PART_001",
    "description": "Part Description",
    "genericCode": "GEN_CODE_001",
    "lengthSetup": "2850",
    "varnishCode": "VARN_A",
    "engineeringPartRev": "Rev_02",
    "active": true
  }
}
```

**Errors** :
- `400` : `partNo` manquant
- `404` : Master Part non trouvé
- `500` : Erreur serveur IFS

**Attributs IFS récupérés** :
- `GENERIC CODE` → `genericCode`
- `LENGTH SETUP` → `lengthSetup`
- `VARNISH CODE` → `varnishCode`
- Engineering Part Revision (dernière active) → `engineeringPartRev`

**IFS Service** : `MasterPartHandling.svc/MasterParts`

---

## 📅 Ranges

### GET /api/part-printer/ranges

Récupère le Range ID basé sur le site et la date.

**Query Parameters** :
- `site` (required) : Contract du site
- `date` (required) : Date ISO "2025-10-13"

**Example** :
```
GET /api/part-printer/ranges?site=BDR&date=2025-10-13
```

**Response** :
```json
{
  "success": true,
  "data": {
    "range": {
      "rangeId": "285 A",
      "site": "BDR",
      "startDate": "2025-10-13",
      "endDate": "2025-10-27",
      "description": "Range 285 A",
      "active": true
    }
  }
}
```

**Errors** :
- `400` : Paramètres manquants
- `404` : Aucun Range trouvé pour cette date/site
- `500` : Erreur serveur IFS

**Logique** :
```sql
WHERE site = :site
  AND :date BETWEEN startDate AND endDate
```

**IFS Service** : `RangeHandling.svc/Ranges` (à confirmer - peut être custom table)

---

## 🏷️ Labels

### POST /api/part-printer/labels/consolidate

Consolide les données pour générer les étiquettes.

**Body Parameters** :
```typescript
{
  shopOrders: Array<{
    orderNo: string
    releaseNo: string
    sequenceNo: string
  }>
  site: string
}
```

**Example Request** :
```json
{
  "shopOrders": [
    { "orderNo": "97277", "releaseNo": "1", "sequenceNo": "10" },
    { "orderNo": "97278", "releaseNo": "1", "sequenceNo": "10" }
  ],
  "site": "BDR"
}
```

**Response** :
```json
{
  "success": true,
  "data": {
    "labels": [
      {
        "orderNo": "97277",
        "releaseNo": "1",
        "sequenceNo": "10",
        "partNo": "PART_001",
        "startDate": "2025-10-13T08:00:00Z",
        "rawMaterial": "OAK_RAW_001",
        "blockId": "B25",
        "genericCode": "GEN_CODE_001",
        "lengthSetup": "2850",
        "varnishCode": "VARN_A",
        "engineeringPartRev": "Rev_02",
        "rangeId": "285 A",
        "barcode": "data:image/png;base64,..."
      }
    ],
    "count": 1
  }
}
```

**Process** :
1. Pour chaque Shop Order :
   - Récupérer Operation 10 (Block ID + Raw Material)
   - Récupérer Master Part attributes
   - Récupérer Range ID
   - Générer barcode
2. Consolider toutes les données
3. Retourner les labels

**Errors** :
- `400` : Paramètres manquants ou invalides
- `404` : Données manquantes pour certains Shop Orders
- `500` : Erreur serveur

---

### POST /api/part-printer/labels/generate-pdf

Génère le PDF des étiquettes.

**Body Parameters** :
```typescript
{
  labels: PartLabel[]     // Array de labels (de /consolidate)
  groupBy: string         // "rawMaterial_varnishCode"
  sortBy: string          // "lengthSetup_desc"
}
```

**Example Request** :
```json
{
  "labels": [ /* array de labels */ ],
  "groupBy": "rawMaterial_varnishCode",
  "sortBy": "lengthSetup_desc"
}
```

**Response** :
```json
{
  "success": true,
  "data": {
    "pdfUrl": "https://storage.example.com/labels/12345.pdf",
    "pdfId": "12345",
    "pages": 5,
    "labels": 25,
    "groups": [
      {
        "rawMaterial": "OAK_RAW_001",
        "varnishCode": "VARN_A",
        "count": 10,
        "page": 1
      }
    ]
  }
}
```

**Spécifications PDF** :
- **Format** : A4 paysage (297mm x 210mm)
- **Pagination** : 1 page par couple (Raw Material / Varnish Code)
- **Tri** : Par ordre décroissant de Length Setup
- **Contenu** : Tous les champs du label + barcode

**Errors** :
- `400` : Labels manquants ou invalides
- `500` : Erreur génération PDF

---

### POST /api/part-printer/labels/print

Envoie le PDF à l'imprimante IFS.

**Body Parameters** :
```typescript
{
  pdfUrl: string       // URL du PDF généré
  pdfId: string        // ID du PDF
  printer: string      // Nom de l'imprimante IFS
  site: string         // Site
}
```

**Example Request** :
```json
{
  "pdfUrl": "https://storage.example.com/labels/12345.pdf",
  "pdfId": "12345",
  "printer": "PRTBX101",
  "site": "BDR"
}
```

**Response** :
```json
{
  "success": true,
  "data": {
    "printJobId": "PRINT_JOB_12345",
    "printer": "PRTBX101",
    "status": "queued",
    "timestamp": "2025-10-13T10:30:00Z"
  }
}
```

**Errors** :
- `400` : Paramètres manquants
- `404` : PDF ou imprimante non trouvé
- `500` : Erreur impression IFS

**IFS Service** : `PrintDialog.svc` (comme Boat Config)

---

## 🔢 Barcode

### POST /api/part-printer/barcode/generate

Génère un code-barres (image base64).

**Body Parameters** :
```typescript
{
  text: string       // Texte à encoder
  format: string     // Format barcode (default: "CODE128")
  width?: number     // Largeur (default: 200)
  height?: number    // Hauteur (default: 50)
}
```

**Example Request** :
```json
{
  "text": "GEN_CODE_001_Rev_02",
  "format": "CODE128",
  "width": 300,
  "height": 80
}
```

**Response** :
```json
{
  "success": true,
  "data": {
    "barcode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "text": "GEN_CODE_001_Rev_02",
    "format": "CODE128"
  }
}
```

**Formats supportés** :
- `CODE128` (recommandé)
- `CODE39`
- `EAN13`
- `QR`

**Errors** :
- `400` : Paramètres invalides
- `500` : Erreur génération barcode

**Librairie** : `bwip-js` ou `jsbarcode`

---

## 📊 Récapitulatif des Endpoints

| Endpoint | Method | Description | IFS Service |
|----------|--------|-------------|-------------|
| `/api/part-printer/sites` | GET | Liste des sites | ContractHandling.svc |
| `/api/part-printer/production-lines` | GET | Lignes de production par site | ProductionLineHandling.svc |
| `/api/part-printer/shop-orders/filter` | POST | Recherche Shop Orders avec filtres | ShopOrderHandling.svc |
| `/api/part-printer/operations` | GET | Données opération (OP10) | OperationHandling.svc |
| `/api/part-printer/master-parts/:partNo/attributes` | GET | Attributs Master Part | MasterPartHandling.svc |
| `/api/part-printer/ranges` | GET | Range ID par site/date | RangeHandling.svc |
| `/api/part-printer/labels/consolidate` | POST | Consolidation données labels | Multiple services |
| `/api/part-printer/labels/generate-pdf` | POST | Génération PDF étiquettes | Internal |
| `/api/part-printer/labels/print` | POST | Impression PDF | PrintDialog.svc |
| `/api/part-printer/barcode/generate` | POST | Génération code-barres | Internal (bwip-js) |

**Total** : 10 endpoints

---

## 🔄 Flux de données typique

### Workflow complet

```
1. GET /api/part-printer/sites
   → Liste des sites

2. GET /api/part-printer/production-lines?site=BDR
   → Lignes de production pour BDR

3. POST /api/part-printer/shop-orders/filter
   Body: { site: "BDR", startDate: "2025-10-13", blockDate: true, ... }
   → Liste Shop Orders filtrés

4. POST /api/part-printer/labels/consolidate
   Body: { shopOrders: [...], site: "BDR" }
   → Données consolidées avec barcodes
   (Appelle en interne: operations, master-parts, ranges, barcode)

5. POST /api/part-printer/labels/generate-pdf
   Body: { labels: [...], groupBy: "...", sortBy: "..." }
   → PDF généré et stocké

6. POST /api/part-printer/labels/print
   Body: { pdfUrl: "...", printer: "PRTBX101", ... }
   → Job d'impression envoyé
```

---

## 🔐 Authentification

Tous les endpoints nécessitent une authentification via **NextAuth.js** (Azure AD).

**Header** :
```
Authorization: Bearer <token>
```

**Errors** :
- `401` : Non authentifié
- `403` : Accès refusé (role insuffisant)

---

## 🧪 Tests

### Test des endpoints

```bash
# Sites
curl http://localhost:3000/api/part-printer/sites

# Production Lines
curl http://localhost:3000/api/part-printer/production-lines?site=BDR

# Shop Orders (POST)
curl -X POST http://localhost:3000/api/part-printer/shop-orders/filter \
  -H "Content-Type: application/json" \
  -d '{"site":"BDR","startDate":"2025-10-13","blockDate":true}'

# Operations
curl http://localhost:3000/api/part-printer/operations?orderNo=97277&releaseNo=1&sequenceNo=10

# Master Parts
curl http://localhost:3000/api/part-printer/master-parts/PART_001/attributes

# Ranges
curl http://localhost:3000/api/part-printer/ranges?site=BDR&date=2025-10-13

# Barcode
curl -X POST http://localhost:3000/api/part-printer/barcode/generate \
  -H "Content-Type: application/json" \
  -d '{"text":"GEN_CODE_001","format":"CODE128"}'
```

---

## 📝 Notes d'implémentation

### Priorité d'implémentation

| Phase | Endpoints | Priorité |
|-------|-----------|----------|
| **Phase 1** | sites, production-lines | 🔴 P0 |
| **Phase 2** | shop-orders/filter, operations | 🔴 P0 |
| **Phase 3** | master-parts, ranges | 🔴 P0 |
| **Phase 4** | barcode, labels/consolidate | 🟡 P1 |
| **Phase 5** | labels/generate-pdf, labels/print | 🟡 P1 |

### Performance

- **Caching** : Implémenter cache pour sites, production-lines (change rarement)
- **Batch** : Endpoint `labels/consolidate` optimisé pour traiter plusieurs Shop Orders
- **Pagination** : Shop Orders filter avec pagination si > 100 résultats

### Sécurité

- Validation stricte des paramètres (Zod)
- Sanitization des inputs
- Rate limiting sur endpoints d'impression
- Logs d'audit pour impressions

---

**Maintenu par** : Équipe Manufacturing Portal  
**Version** : 1.0  
**Dernière mise à jour** : 13 octobre 2025
