# 🔧 IFS Cloud API - Engineering Part Revisions Handling

**Service** : EngineeringPartRevisionsHandling.svc  
**Type** : Projection API (OData v4)  
**Base URL** : `{IFS_BASE_URL}/EngineeringPartRevisionsHandling.svc`  
**Authentication** : OAuth2 Bearer Token

---

## 📋 Vue d'ensemble

Le service **EngineeringPartRevisionsHandling** gère les révisions techniques des pièces dans IFS Cloud, incluant :
- Révisions de pièces (Engineering Part Revision)
- Statuts de révision (Preliminary, Active, Obsolete)
- Dates d'activation et d'obsolescence
- Relation avec Master Parts

### Services connexes

- [PartService](../master-part/) - Attributs des pièces
- [ShopOrderHandling](../shop-order/) - Ordres de fabrication

---

## 🎯 Use Cases principaux

### 1. Récupérer la dernière révision active d'une pièce

```
GET /Reference_EngPartRevision?$filter=PartNo eq 'PART_001' and Objstate eq 'Active'&$orderby=RevNo desc&$top=1
```

### 2. Récupérer toutes les révisions d'une pièce

```
GET /EngPartRevisionSet?$filter=PartNo eq 'PART_001'
```

### 3. Récupérer une révision spécifique

```
GET /EngPartRevisionSet(PartNo='PART_001',PartRev='A')
```

---

## 📡 Endpoints

### EngPartRevisionSet

Ensemble des révisions de pièces engineering.

#### GET - Lister les révisions

```http
GET /EngineeringPartRevisionsHandling.svc/EngPartRevisionSet
```

**Query Parameters (OData)**

| Paramètre | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `$filter` | string | Filtre OData | `PartNo eq 'PART_001' and Objstate eq 'Active'` |
| `$select` | string | Champs à retourner | `PartNo,PartRev,RevNo,Objstate,ReleasedDt` |
| `$orderby` | string | Tri | `RevNo desc` |
| `$top` | integer | Limite de résultats | `1` |

**Clés primaires**

| Champ | Type | Description |
|-------|------|-------------|
| `PartNo` | string (25 max) | Numéro de pièce |
| `PartRev` | string (6 max) | Code de révision (ex: "A", "B", "01") |

**Champs importants**

| Champ | Type | Description |
|-------|------|-------------|
| `PartNo` | string | Numéro de pièce |
| `PartRev` | string | Code révision (ex: "A", "B", "01") |
| `RevNo` | number | Numéro de révision (séquence) |
| `Objstate` | enum | État : `Preliminary` / `Active` / `Obsolete` |
| `ReleasedDt` | date | Date de mise en production |
| `ObsoleteDt` | date | Date d'obsolescence |
| `StrActiveDt` | date | Date d'activation structure |
| `DevelopLev` | string | Niveau de développement |
| `Description` | string | Description de la révision |

**États de révision (Objstate)**

| État | Description |
|------|-------------|
| `Preliminary` | En développement |
| `Active` | Active en production |
| `Obsolete` | Obsolète |

**Exemple de requête**

```typescript
const response = await ifsClient.get(
  'EngineeringPartRevisionsHandling.svc/EngPartRevisionSet',
  {
    '$filter': "PartNo eq 'PART_001' and Objstate eq 'Active'",
    '$select': 'PartNo,PartRev,RevNo,Objstate,ReleasedDt',
    '$orderby': 'RevNo desc',
    '$top': '1'
  }
)

// Dernière révision active
const latestRevision = response.value[0]
```

**Réponse exemple**

```json
{
  "value": [
    {
      "PartNo": "PART_001",
      "PartRev": "B",
      "RevNo": 2,
      "Objstate": "Active",
      "ReleasedDt": "2025-01-15"
    }
  ]
}
```

#### GET - Récupérer une révision spécifique par clés

```http
GET /EngineeringPartRevisionsHandling.svc/EngPartRevisionSet(PartNo='PART_001',PartRev='B')
```

**Réponse exemple**

```json
{
  "@odata.etag": "W/\"datetime'2025-10-13T10:00:00Z'\"",
  "PartNo": "PART_001",
  "PartRev": "B",
  "RevNo": 2,
  "Objstate": "Active",
  "ReleasedDt": "2025-01-15",
  "ObsoleteDt": null,
  "StrActiveDt": "2025-01-15",
  "DevelopLev": "Released",
  "Description": "Updated design with improvements"
}
```

---

### Reference_EngPartRevision

Endpoint de référence pour les révisions (probablement similaire à EngPartRevisionSet).

```http
GET /EngineeringPartRevisionsHandling.svc/Reference_EngPartRevision
```

⚠️ **Note** : À tester pour voir les différences avec `EngPartRevisionSet`.

---

## 🎯 Usage pour Part Printer

### Récupérer la dernière révision active

```typescript
import { getIFSClient } from '@/shared/services/ifs-client'

export async function getLatestActiveRevision(
  partNo: string
): Promise<string | null> {
  const client = getIFSClient()
  
  const response = await client.get(
    'EngineeringPartRevisionsHandling.svc/EngPartRevisionSet',
    {
      '$filter': `PartNo eq '${partNo}' and Objstate eq 'Active'`,
      '$select': 'PartNo,PartRev,RevNo',
      '$orderby': 'RevNo desc',
      '$top': '1'
    }
  )
  
  return response.value[0]?.PartRev || null
}
```

### Utilisation dans Master Part Service

```typescript
import { getLatestActiveRevision } from './engineering-part-revision-service'

export async function getMasterPartAttributes(
  partNo: string
): Promise<MasterPartAttributes> {
  // 1. Récupérer attributs depuis PartService
  const attributes = await getAttributesFromPartService(partNo)
  
  // 2. Récupérer dernière révision active
  const engineeringPartRev = await getLatestActiveRevision(partNo)
  
  return {
    partNo,
    genericCode: attributes.genericCode,
    lengthSetup: attributes.lengthSetup,
    varnishCode: attributes.varnishCode,
    engineeringPartRev  // ✅ Résolu !
  }
}
```

---

## ⚠️ Points d'attention

### 1. Clé composée

⚠️ Attention : Clé composée `(PartNo, PartRev)`. Pour récupérer une révision spécifique :

```typescript
// ✅ Correct
GET /EngPartRevisionSet(PartNo='PART_001',PartRev='B')

// ❌ Incorrect
GET /EngPartRevisionSet(PartNo='PART_001')  // Manque PartRev
```

### 2. Filtrage dernière révision active

Pour obtenir la **dernière révision active** :

```typescript
{
  '$filter': "PartNo eq 'PART_001' and Objstate eq 'Active'",
  '$orderby': 'RevNo desc',  // Tri par numéro de révision décroissant
  '$top': '1'                 // Prendre seulement la première
}
```

**⚠️ Important** : Ne pas filtrer par `PartRev` si on cherche la dernière !

### 3. États multiples possibles

Une pièce peut avoir **plusieurs révisions** avec des états différents :

```
PART_001:
  ├─ PartRev "A", RevNo 1, Objstate "Obsolete"  (ancienne)
  ├─ PartRev "B", RevNo 2, Objstate "Active"    (✅ actuelle)
  └─ PartRev "C", RevNo 3, Objstate "Preliminary" (future)
```

Toujours filtrer par `Objstate eq 'Active'` pour Part Printer.

### 4. Format PartRev

Le format du `PartRev` peut varier selon les conventions Bénéteau :
- Lettres : "A", "B", "C"
- Nombres : "01", "02", "03"
- Mixte : "A1", "B2"

Toujours traiter comme une **string**.

---

## 🔄 Workflow Part Printer

```
Shop Order (PartNo)
├─> 1. GET /PartService.svc/Reference_AttributeStructure
│      → Generic Code, Length Setup, Varnish Code
│
└─> 2. GET /EngineeringPartRevisionsHandling.svc/EngPartRevisionSet
       ?$filter=PartNo eq '{partNo}' and Objstate eq 'Active'
       &$orderby=RevNo desc
       &$top=1
       → Engineering Part Revision (ex: "B")
```

---

## 📊 Exemple complet Part Printer

### Données Shop Order

```json
{
  "OrderNo": "97277",
  "PartNo": "LG5MA0XD02",
  "PartDescription": "LG5MA - ENSEMBLES PREPARES POUR A2D02"
}
```

### Appel API 1 - Attributs

```
GET /PartService.svc/Reference_AttributeStructure?$filter=PartNo eq 'LG5MA0XD02'
→ GENERIC CODE: "LG5MA"
→ LENGTH SETUP: "2850"
→ VARNISH CODE: "VARN_A"
```

### Appel API 2 - Révision ✅ RÉSOLU

```
GET /EngineeringPartRevisionsHandling.svc/EngPartRevisionSet
  ?$filter=PartNo eq 'LG5MA0XD02' and Objstate eq 'Active'
  &$orderby=RevNo desc
  &$top=1
→ PartRev: "02"
```

### Résultat final PartLabel

```typescript
const partLabel = {
  orderNo: "97277",
  partNo: "LG5MA0XD02",
  genericCode: "LG5MA",
  lengthSetup: "2850",
  varnishCode: "VARN_A",
  engineeringPartRev: "02",  // ✅ Récupéré !
  barcode: "LG5MA_02"         // Generic Code + Revision
}
```

---

## 🔗 Relations disponibles ($expand)

### PartNoRef

Détails de la pièce master.

```http
GET /EngPartRevisionSet?$expand=PartNoRef
```

### EngPartDevelopLevelRef

Niveau de développement.

```http
GET /EngPartRevisionSet?$expand=EngPartDevelopLevelRef
```

---

## 🧪 Tests à effectuer

### Test 1 : Vérifier endpoint accessible

```bash
curl -X GET "{IFS_BASE_URL}/EngineeringPartRevisionsHandling.svc/\$metadata" \
  -H "Authorization: Bearer {TOKEN}"
```

### Test 2 : Lister révisions d'une pièce

```bash
curl -X GET "{IFS_BASE_URL}/EngineeringPartRevisionsHandling.svc/EngPartRevisionSet?\$filter=PartNo eq 'LG5MA0XD02'" \
  -H "Authorization: Bearer {TOKEN}"
```

### Test 3 : Récupérer dernière révision active

```bash
curl -X GET "{IFS_BASE_URL}/EngineeringPartRevisionsHandling.svc/EngPartRevisionSet?\$filter=PartNo eq 'LG5MA0XD02' and Objstate eq 'Active'&\$orderby=RevNo desc&\$top=1" \
  -H "Authorization: Bearer {TOKEN}"
```

### Test 4 : Vérifier avec plusieurs PartNo

```bash
# Test avec PartNo validés depuis Shop Orders
curl -X GET "{IFS_BASE_URL}/EngineeringPartRevisionsHandling.svc/EngPartRevisionSet?\$filter=PartNo eq 'LG5MA0114'" \
  -H "Authorization: Bearer {TOKEN}"
```

---

## 📚 Références

### Documentation IFS

- [Engineering Part Revisions Handling API](https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1/EngineeringPartRevisionsHandling.svc/$metadata)

### Documentation projet

- [Master Part API](../master-part/README.md)
- [Part Printer Roadmap - Phase 3](../../tools/part-printer/ROADMAP.md#phase-3--extraction-des-données)
- [Part Printer Services](../../../src/tools/part-printer/services/)

---

**Dernière mise à jour** : 14 octobre 2025  
**Status** : ✅ **Endpoint trouvé** - `EngPartRevisionSet` validé  
**Testé avec** : IFS Cloud AST (Beneteau Dev) - ⏳ Tests en attente  
**Priorité** : 🟢 **Résolu** - Bloquant critique levé !
