# 🔧 IFS Cloud API - Master Parts

**⚠️ IMPORTANT** : Le service `PartService.svc` **N'EXISTE PAS** dans IFS Cloud AST.

**✅ Service alternatif validé** : `InventoryPartHandling.svc`  
**Type** : Projection API (OData v4)  
**Base URL** : `{IFS_BASE_URL}/InventoryPartHandling.svc`  
**Authentication** : OAuth2 Bearer Token  
**Status** : ✅ VALIDÉ (Test 1 - 288 types OData 4.01)

---

## 📋 Vue d'ensemble

Ce document **a été créé pour PartService.svc qui n'existe pas**. 

**👉 Utilisez plutôt** : [Inventory Part API](../inventory-part/README.md)

Le service **InventoryPartHandling** fournit l'accès aux données des pièces d'inventaire, incluant :
- ✅ Attributs des pièces (Generic Code, Length Setup, Varnish Code, etc.)
- ✅ Configuration des pièces par site (Contract)
- ✅ Relations avec les attributs de fabrication
- ✅ Caractéristiques techniques

### Services connexes

- [InventoryPartHandling](../inventory-part/) - **✅ SERVICE À UTILISER** (288 types)
- [ShopOrderHandling](../shop-order/) - Ordres de fabrication utilisant ces pièces
- [ProductionLineHandling](../production-line/) - Lignes de production
- [EngineeringPartRevisionsHandling](../engineering-part-revision/) - ✅ Révisions techniques

---

## ❌ Historique d'Investigation

### Test 1 - Vérification Métadonnées

**Date** : 14 octobre 2025

**Test effectué** :
```bash
GET /PartService.svc/$metadata
```

**Résultat** :
```json
{
  "error": {
    "code": "MI_METADATA_NOTFOUND",
    "message": "Metadata not found."
  }
}
```

**Conclusion** : ❌ Le service `PartService.svc` n'existe pas dans IFS Cloud AST.

### Alternative Validée : InventoryPartHandling.svc

**Test effectué** :
```bash
GET /InventoryPartHandling.svc/$metadata
```

**Résultat** :
- ✅ Service existe
- ✅ OData version : 4.01
- ✅ Types disponibles : 288
- ✅ Contient `InventoryPartSet` avec expansion `ManufPartAttributeRef`

**Documentation complète** : [Inventory Part API](../inventory-part/README.md)

---

## 🎯 Use Cases principaux - REDIRECTION

**⚠️ Ce document est obsolète**. Les endpoints ci-dessous ne fonctionnent pas.

**✅ Utilisez plutôt** : [Inventory Part API - Use Cases](../inventory-part/README.md#-cas-dusage--part-printer)

### Cas d'usage Part Printer

Pour récupérer les attributs (GENERIC CODE, LENGTH SETUP, VARNISH CODE) :

```typescript
// ✅ BON - Utiliser InventoryPartHandling
GET /InventoryPartHandling.svc/InventoryPartSet
  ?$filter=Contract eq 'BDR' and PartNo eq 'PART_001'
  &$expand=ManufPartAttributeRef

// ❌ MAUVAIS - PartService n'existe pas
GET /PartService.svc/Reference_AttributeStructure
  ?$filter=PartNo eq 'PART_001'
```

**Documentation complète** : [Inventory Part README](../inventory-part/README.md)

---

## ⚠️ Endpoints Obsolètes (Ne fonctionnent pas)

Les endpoints suivants ont été documentés mais **PartService.svc n'existe pas**.

### ❌ Reference_AttributeStructure (N'EXISTE PAS)
```

**Query Parameters (OData)**

| Paramètre | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `$filter` | string | Filtre OData | `PartNo eq 'PART_001'` |
| `$select` | string | Champs à retourner | `PartNo,AttributeName,AttributeValue` |
| `$top` | integer | Limite de résultats | `50` |

**Champs importants**

| Champ | Type | Description |
|-------|------|-------------|
| `PartNo` | string | Numéro de pièce |
| `AttributeName` | string | Nom de l'attribut (ex: "GENERIC CODE", "LENGTH SETUP") |
| `AttributeValue` | string | Valeur de l'attribut |

**Attributs recherchés pour Part Printer**

| Attribut IFS | Usage Part Printer | Type |
|--------------|-------------------|------|
| `GENERIC CODE` | Code générique de la pièce | string |
| `LENGTH SETUP` | Longueur de préparation (mm) | string/number |
| `VARNISH CODE` | Code vernis | string |

**Exemple de requête**

```typescript
const response = await ifsClient.get(
  'PartService.svc/Reference_AttributeStructure',
  {
    '$filter': "PartNo eq 'PART_001'",
    '$select': 'PartNo,AttributeName,AttributeValue'
  }
)

// Filtrer les attributs nécessaires
const attributes = {
  genericCode: response.value.find(a => a.AttributeName === 'GENERIC CODE')?.AttributeValue,
  lengthSetup: response.value.find(a => a.AttributeName === 'LENGTH SETUP')?.AttributeValue,
  varnishCode: response.value.find(a => a.AttributeName === 'VARNISH CODE')?.AttributeValue
}
```

**Réponse exemple**

```json
{
  "value": [
    {
      "PartNo": "PART_001",
      "AttributeName": "GENERIC CODE",
      "AttributeValue": "GEN_CODE_001"
    },
    {
      "PartNo": "PART_001",
      "AttributeName": "LENGTH SETUP",
      "AttributeValue": "2850"
    },
    {
      "PartNo": "PART_001",
      "AttributeName": "VARNISH CODE",
      "AttributeValue": "VARN_A"
    }
  ]
}
```

---

### Reference_AssortmentPartStructure

Structure d'assortiment des pièces.

#### GET - Récupérer les structures d'assortiment

```http
GET /PartService.svc/Reference_AssortmentPartStructure
```

**Query Parameters (OData)**

| Paramètre | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `$filter` | string | Filtre OData | `PartNo eq 'PART_001'` |
| `$select` | string | Champs à retourner | `PartNo,AssortmentId` |

**Champs importants**

| Champ | Type | Description |
|-------|------|-------------|
| `PartNo` | string | Numéro de pièce |
| `AssortmentId` | string | Identifiant assortiment |

⚠️ **Note** : Endpoint secondaire, probablement pas nécessaire pour Part Printer Phase 1.

---

## 🎯 Usage pour Part Printer

### Service TypeScript - Récupération des attributs

```typescript
import { getIFSClient } from '@/shared/services/ifs-client'

export interface MasterPartAttributes {
  partNo: string
  genericCode: string | null
  lengthSetup: string | null
  varnishCode: string | null
  engineeringPartRev: string | null
}

export async function getMasterPartAttributes(
  partNo: string
): Promise<MasterPartAttributes> {
  const client = getIFSClient()
  
  // 1. Récupérer les attributs
  const attrResponse = await client.get(
    'PartService.svc/Reference_AttributeStructure',
    {
      '$filter': `PartNo eq '${partNo}'`,
      '$select': 'PartNo,AttributeName,AttributeValue'
    }
  )
  
  // 2. Extraire les attributs nécessaires
  const getValue = (attrName: string) => 
    attrResponse.value.find(a => a.AttributeName === attrName)?.AttributeValue || null
  
  // 3. ✅ Récupérer dernière révision active (Engineering Part Revision)
  const revResponse = await client.get(
    'EngineeringPartRevisionsHandling.svc/EngPartRevisionSet',
    {
      '$filter': `PartNo eq '${partNo}' and Objstate eq 'Active'`,
      '$select': 'PartRev',
      '$orderby': 'RevNo desc',
      '$top': '1'
    }
  )
  
  return {
    partNo,
    genericCode: getValue('GENERIC CODE'),
    lengthSetup: getValue('LENGTH SETUP'),
    varnishCode: getValue('VARNISH CODE'),
    engineeringPartRev: revResponse.value[0]?.PartRev || null  // ✅ Résolu !
  }
}
```

---

## ⚠️ Points d'attention

### 1. Noms d'attributs exacts

⚠️ Les noms d'attributs dans IFS sont **sensibles à la casse** et peuvent contenir des espaces :
- ✅ `"GENERIC CODE"` (avec espace)
- ❌ `"GenericCode"` ou `"GENERIC_CODE"`

### 2. Attributs optionnels

Tous les attributs peuvent être **null** ou **absents**. Toujours gérer les cas où :
```typescript
getValue('GENERIC CODE')  // → null ou undefined
```

### 3. Engineering Part Revision

⚠️ **Incertitude** : L'attribut `Engineering Part Revision` n'apparaît pas dans les métadonnées actuelles.

Possibilités :
- Endpoint séparé pour les révisions
- Attribut avec un nom différent
- Information dans `Reference_AssortmentPartStructure`

---

## ⚠️ Incertitudes & Vérifications nécessaires

### 🔍 À vérifier

1. **Endpoint correct pour attributs ?**
   - ✅ Confirmé : `Reference_AttributeStructure`
   - ⚠️ Vérifier les noms exacts des attributs IFS (avec/sans espaces, majuscules)

2. **Engineering Part Revision** ✅ **RÉSOLU !**
   - ✅ Endpoint trouvé : `EngineeringPartRevisionsHandling.svc/EngPartRevisionSet`
   - ✅ Filtre : `PartNo eq '{partNo}' and Objstate eq 'Active'`
   - ✅ Tri : `RevNo desc` + `$top=1` pour dernière révision active
   - 📚 [Documentation complète](../engineering-part-revision/)

3. **Attributs nécessaires disponibles ?**
   - ⚠️ Vérifier que ces attributs existent réellement dans IFS AST :
     - `GENERIC CODE`
     - `LENGTH SETUP`
     - `VARNISH CODE`

4. **Format Length Setup**
   - ⚠️ Confirmer le format : string "2850" ou number 2850 ?
   - Unité : millimètres (mm) ?

### 🧪 Tests à effectuer

```bash
# Test 1 : Lister les attributs d'une pièce
curl -X GET "{IFS_BASE_URL}/PartService.svc/Reference_AttributeStructure?\$filter=PartNo eq 'PART_001'" \
  -H "Authorization: Bearer {TOKEN}"

# Test 2 : Vérifier les noms d'attributs disponibles
curl -X GET "{IFS_BASE_URL}/PartService.svc/Reference_AttributeStructure?\$filter=PartNo eq 'PART_001'&\$select=AttributeName" \
  -H "Authorization: Bearer {TOKEN}"

# Test 3 : Récupérer Engineering Part Revision ✅
curl -X GET "{IFS_BASE_URL}/EngineeringPartRevisionsHandling.svc/EngPartRevisionSet?\$filter=PartNo eq 'LG5MA0XD02' and Objstate eq 'Active'&\$orderby=RevNo desc&\$top=1" \
  -H "Authorization: Bearer {TOKEN}"

# Test 4 : Vérifier avec un PartNo réel
# Remplacer par un PartNo valide depuis Shop Orders
curl -X GET "{IFS_BASE_URL}/PartService.svc/Reference_AttributeStructure?\$filter=PartNo eq 'LG5MA0XD02'" \
  -H "Authorization: Bearer {TOKEN}"
```

---

## 🔄 Workflow Part Printer

```
Shop Order (PartNo)
└─> GET /PartService.svc/Reference_AttributeStructure
    └─> Extraction attributs :
        ├─> GENERIC CODE → Code générique
        ├─> LENGTH SETUP → Longueur (tri décroissant)
        ├─> VARNISH CODE → Groupement étiquettes
        └─> Engineering Part Revision → ??? (à localiser)
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

### Appel API

```
GET /PartService.svc/Reference_AttributeStructure?$filter=PartNo eq 'LG5MA0XD02'
```

### Réponse attendue (hypothétique)

```json
{
  "value": [
    { "AttributeName": "GENERIC CODE", "AttributeValue": "LG5MA" },
    { "AttributeName": "LENGTH SETUP", "AttributeValue": "2850" },
    { "AttributeName": "VARNISH CODE", "AttributeValue": "VARN_A" }
  ]
}
```

### Usage dans Part Printer

```typescript
const partLabel = {
  orderNo: "97277",
  partNo: "LG5MA0XD02",
  genericCode: "LG5MA",
  lengthSetup: "2850",  // Tri décroissant pour groupement
  varnishCode: "VARN_A", // Groupement par Raw Material + Varnish
  engineeringPartRev: "???" // À déterminer
}
```

---

## 📚 Références

### Documentation IFS

- [Part Service Projection API](https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1/PartService.svc/$metadata)

### Documentation projet

- [Part Printer Roadmap - Phase 3](../../tools/part-printer/ROADMAP.md#phase-3--extraction-des-données)
- [Part Printer Types](../../../src/tools/part-printer/types/)

---

**Dernière mise à jour** : 14 octobre 2025  
**Status** : ✅ **Endpoint trouvé** - Engineering Part Revision résolu !  
**Testé avec** : IFS Cloud AST (Beneteau Dev) - ⏳ Tests en attente  
**Priorité** : � **Moyen** - Bloquant critique levé, validation restante
