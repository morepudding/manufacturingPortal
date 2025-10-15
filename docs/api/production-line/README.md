# 🏭 IFS Cloud API - Production Line Handling

**Service** : ProductionLineHandling.svc  
**Type** : Projection API (OData v4)  
**Base URL** : `{IFS_BASE_URL}/ProductionLineHandling.svc`  
**Authentication** : OAuth2 Bearer Token

---

## 📋 Vue d'ensemble

Le service **ProductionLineHandling** gère les lignes de production dans IFS Cloud, incluant :
- Recherche et récupération des lignes de production par site
- Configuration des lignes (calendrier, capacité)
- Gestion Kanban (circuits, signaux de réapprovisionnement)
- Relation avec les sites et les pièces

### Services connexes

- [SitesHandling](../site/) - Sites de production
- [ShopOrderHandling](../shop-order/) - Ordres de fabrication

---

## 🎯 Use Cases principaux

### 1. Lister toutes les lignes de production

```
GET /ProductionLines
```

### 2. Filtrer par site

```
GET /ProductionLines?$filter=Contract eq 'BDR'
```

### 3. Récupérer une ligne spécifique

```
GET /ProductionLines(ProductionLine='LINE_01',Contract='BDR')
```

---

## 📡 Endpoints

### ProductionLines

Ensemble des lignes de production.

#### GET - Lister les lignes de production

```http
GET /ProductionLineHandling.svc/ProductionLines
```

**Query Parameters (OData)**

| Paramètre | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `$filter` | string | Filtre OData | `Contract eq 'BDR'` |
| `$select` | string | Champs à retourner | `ProductionLine,Description,Contract` |
| `$top` | integer | Limite de résultats | `50` |
| `$orderby` | string | Tri | `ProductionLine asc` |
| `$expand` | string | Relations | `ContractRef` |

**Clés primaires**

| Champ | Type | Description |
|-------|------|-------------|
| `ProductionLine` | string (12 max) | Code de la ligne de production |
| `Contract` | string (5 max) | Code du site |

**Champs importants**

| Champ | Type | Description |
|-------|------|-------------|
| `ProductionLine` | string | Code ligne (ex: "LINE_01", "L1") |
| `Contract` | string | Code site (ex: "BDR") |
| `Description` | string | Description de la ligne |
| `CalendarId` | string | Calendrier de travail |
| `CreateDate` | date | Date de création |
| `LastActivityDate` | date | Dernière activité |
| `ReserveFlag` | enum | Indicateur de réservation |
| `DailyOperatingMinutes` | number | Minutes opérationnelles par jour |
| `LineSchedLoadMethod` | enum | Méthode de planification |
| `TaktTime` | number | Temps de cycle (Takt Time) |

**Exemple de requête**

```typescript
const response = await ifsClient.get(
  'ProductionLineHandling.svc/ProductionLines',
  {
    '$filter': "Contract eq 'BDR'",
    '$select': 'ProductionLine,Description,Contract,CalendarId',
    '$orderby': 'ProductionLine asc'
  }
)
```

**Réponse exemple**

```json
{
  "value": [
    {
      "ProductionLine": "L1",
      "Description": "Line 1 - Main Assembly",
      "Contract": "BDR",
      "CalendarId": "CAL_MANUF"
    },
    {
      "ProductionLine": "L2",
      "Description": "Line 2 - Secondary Assembly",
      "Contract": "BDR",
      "CalendarId": "CAL_MANUF"
    }
  ]
}
```

#### GET - Récupérer une ligne par clés

```http
GET /ProductionLineHandling.svc/ProductionLines(ProductionLine='L1',Contract='BDR')
```

**Réponse exemple**

```json
{
  "@odata.etag": "W/\"datetime'2025-10-13T10:00:00Z'\"",
  "ProductionLine": "L1",
  "Contract": "BDR",
  "Description": "Line 1 - Main Assembly",
  "CreateDate": "2020-01-15",
  "LastActivityDate": "2025-10-13",
  "CalendarId": "CAL_MANUF",
  "DailyOperatingMinutes": 480,
  "LineSchedLoadMethod": "LoadInfinite",
  "ReserveFlag": "ReserveAllowed"
}
```

---

## 🔗 Relations disponibles ($expand)

### ContractRef

Détails du site associé.

```http
GET /ProductionLines?$expand=ContractRef
```

### CalendarIdRef

Calendrier de travail de la ligne.

```http
GET /ProductionLines?$expand=CalendarIdRef
```

---

## 📚 Autres Endpoints disponibles

D'après les métadonnées OData, le service expose également :

| Endpoint | Description |
|----------|-------------|
| `KanbanCircuitSet` | Circuits Kanban |
| `CircuitHoldReasonSet` | Raisons de blocage circuit |
| `Reference_ProductionLine` | Référence lignes de production |
| `Reference_ProductionLinePart` | Pièces par ligne de production |
| `Reference_UserAllowedSiteLov` | Sites autorisés utilisateur |

---

## 🎯 Usage pour Part Printer

### Récupérer les lignes de production par site

```typescript
import { getIFSClient } from '@/shared/services/ifs-client'

export async function getProductionLinesBySite(site: string) {
  const client = getIFSClient()
  
  const response = await client.get(
    'ProductionLineHandling.svc/ProductionLines',
    {
      '$filter': `Contract eq '${site}'`,
      '$select': 'ProductionLine,Description,Contract',
      '$orderby': 'ProductionLine asc'
    }
  )
  
  return response.value.map(line => ({
    id: line.ProductionLine,
    name: `${line.ProductionLine} - ${line.Description}`,
    site: line.Contract
  }))
}
```

**Exemple de résultat**

```json
[
  { "id": "L1", "name": "L1 - Line 1 - Main Assembly", "site": "BDR" },
  { "id": "L2", "name": "L2 - Line 2 - Secondary Assembly", "site": "BDR" }
]
```

---

## ⚠️ Points d'attention

### 1. Clé composée

⚠️ Attention : L'endpoint utilise une **clé composée** (ProductionLine + Contract).

Pour récupérer une ligne spécifique :
```typescript
// ✅ Correct
GET /ProductionLines(ProductionLine='L1',Contract='BDR')

// ❌ Incorrect
GET /ProductionLines(ProductionLine='L1')  // Manque Contract
```

### 2. Filtrage par site obligatoire

Pour Part Printer, toujours filtrer par `Contract` (site) :

```typescript
{
  '$filter': "Contract eq 'BDR'"  // ✅ Fonctionne
}
```

### 3. Champ optionnel

Dans Part Printer, la ligne de production est **optionnelle** dans les filtres. Si non renseignée, on recherche sur tout le site.

### 4. Enums LineSchedLoadMethod

| Valeur | Description |
|--------|-------------|
| `LoadInfinite` | Charge infinie |
| `ForwardUpToLineRate` | En avant jusqu'au taux de ligne |
| `BackwardUpToLineRate` | En arrière jusqu'au taux de ligne |

---

## 🔄 Workflow Part Printer

```
1. Utilisateur sélectionne un site
   └─> Site = "BDR"

2. Chargement des lignes de production
   └─> GET /ProductionLines?$filter=Contract eq 'BDR'
       → Dropdown avec lignes disponibles

3. (Optionnel) Utilisateur sélectionne une ligne
   └─> Production Line = "L1"

4. Filtrage Shop Orders
   └─> $filter=Contract eq 'BDR' AND ProductionLine eq 'L1'
```

---

## ⚠️ Incertitudes & Vérifications nécessaires

### 🔍 À vérifier

1. **Endpoint correct ?**
   - ✅ Confirmé : `ProductionLineHandling.svc/ProductionLines`
   - ⚠️ Vérifier si Shop Orders utilisent le même champ `ProductionLine` pour filtrage

2. **Relation avec Shop Orders**
   - ⚠️ Confirmer que Shop Orders ont un champ `ProductionLine` pour filtrage
   - Alternative possible : filtrer via `Contract` uniquement

3. **Lignes vides**
   - ⚠️ Certains sites peuvent ne pas avoir de lignes de production définies dans IFS
   - Gérer le cas où `response.value` est vide

### 🧪 Tests à effectuer

```bash
# Test 1 : Lister toutes les lignes
curl -X GET "{IFS_BASE_URL}/ProductionLineHandling.svc/ProductionLines" \
  -H "Authorization: Bearer {TOKEN}"

# Test 2 : Filtrer par site BDR
curl -X GET "{IFS_BASE_URL}/ProductionLineHandling.svc/ProductionLines?\$filter=Contract eq 'BDR'" \
  -H "Authorization: Bearer {TOKEN}"

# Test 3 : Récupérer ligne spécifique
curl -X GET "{IFS_BASE_URL}/ProductionLineHandling.svc/ProductionLines(ProductionLine='L1',Contract='BDR')" \
  -H "Authorization: Bearer {TOKEN}"

# Test 4 : Vérifier champ ProductionLine dans Shop Orders
curl -X GET "{IFS_BASE_URL}/ShopOrderHandling.svc/ShopOrds?\$select=OrderNo,Contract,ProductionLine" \
  -H "Authorization: Bearer {TOKEN}"
```

---

## 🔗 Relation avec Shop Orders

### Hypothèse à valider

```
Production Line → Filtrage Shop Orders
```

**Scénario 1** : Shop Orders ont un champ `ProductionLine`
```typescript
{
  '$filter': "Contract eq 'BDR' and ProductionLine eq 'L1'"
}
```

**Scénario 2** : Shop Orders n'ont pas de champ `ProductionLine` direct
```typescript
// Filtrer uniquement par Contract
{
  '$filter': "Contract eq 'BDR'"
}
// Puis filtrer côté application via d'autres champs (OP10, etc)
```

---

## 📚 Références

### Documentation IFS

- [Production Line Handling Projection API](https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1/ProductionLineHandling.svc/$metadata)

### Documentation projet

- [Part Printer Roadmap](../../tools/part-printer/ROADMAP.md)
- [Part Printer Services](../../../src/tools/part-printer/services/)

---

**Dernière mise à jour** : 13 octobre 2025  
**Status** : ⚠️ **À vérifier** - Endpoint identifié mais nécessite validation avec IFS AST  
**Testé avec** : IFS Cloud AST (Beneteau Dev) - ⏳ Tests en attente
