# 📦 Shop Order Materials (MaterialArray Navigation)

## 🎯 Vue d'ensemble

**Navigation OData** pour récupérer **tous les matériaux (Material Lines)** d'un Shop Order avec leurs numéros d'opération.

**🔑 Clé de découverte** : Les matériaux ne sont PAS dans un endpoint séparé mais dans une **navigation OData** depuis `ShopOrds` !

---

## 📍 Endpoint

```
GET /ShopOrderHandling.svc/ShopOrds(OrderNo='{orderNo}',ReleaseNo='{releaseNo}',SequenceNo='{sequenceNo}')/MaterialArray
```

### Base URL

```
https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1
```

---

## 🔐 Authentification

OAuth2 Bearer Token (cf. `/docs/api/README.md`)

---

## 📝 Paramètres de requête

### Path Parameters

| Paramètre | Type | Obligatoire | Description | Exemple |
|-----------|------|-------------|-------------|---------|
| `OrderNo` | string | ✅ | Numéro du Shop Order | `454853` |
| `ReleaseNo` | string | ✅ | Release Number (souvent `*`) | `*` |
| `SequenceNo` | string | ✅ | Sequence Number (souvent `*`) | `*` |

### Query Parameters (OData)

| Paramètre | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `$select` | string | Champs à récupérer | `LineItemNo,PartNo,OperationNo,QtyPerAssembly` |
| `$expand` | string | Relations à étendre | `PartNoRef($select=Description,UnitMeas)` |
| `$orderby` | string | Tri des résultats | `OperationNo,LineItemNo` |
| `$filter` | string | ⚠️ **NON SUPPORTÉ** - Filtrer côté code | ❌ |

---

## 📊 Structure de la réponse

### Type : `ShopMaterialAlloc`

```typescript
interface ShopMaterialAlloc {
  // Clés primaires
  LineItemNo: number              // ID unique du matériau (1, 2, 3, ...)
  OrderNo: string                 // Shop Order Number
  ReleaseNo: string               // Release Number (*)
  SequenceNo: string              // Sequence Number (*)
  
  // Informations matériau
  PartNo: string                  // 🎯 Numéro de pièce (Raw Material)
  OperationNo: number             // 🎯 Numéro d'opération (10, 20, 30, 40...)
  StructureLineNo: number         // Ligne dans la structure BOM
  
  // Quantités
  QtyPerAssembly: number          // Quantité par assemblage
  QtyRequired: number             // Quantité requise totale
  QtyAssigned: number             // Quantité assignée
  QtyIssued: number               // Quantité déjà utilisée
  QtyRemaining: number            // Quantité restante
  
  // Dates
  DateRequired: string            // Date requise (ISO 8601)
  
  // Statuts
  Objstate: "Released" | "Planned" | ...
  IssueType: "Backflush" | "Manual"
  
  // Relations (si $expand)
  PartNoRef?: {
    Description: string           // 🎯 Description du matériau
    UnitMeas: string             // Unité de mesure (pcs, l, kg...)
    Contract: string             // Site
  }
}
```

### Réponse complète

```typescript
interface ODataResponse {
  "@odata.context": string
  "value": ShopMaterialAlloc[]
}
```

---

## 🧪 Exemples de requêtes

### Exemple 1 : Tous les matériaux avec descriptions

**Requête** :
```http
GET /ShopOrderHandling.svc/ShopOrds(OrderNo='454853',ReleaseNo='*',SequenceNo='*')/MaterialArray
  ?$select=LineItemNo,PartNo,OperationNo,QtyPerAssembly,QtyRequired,StructureLineNo,DateRequired
  &$expand=PartNoRef($select=Description,UnitMeas)
  &$orderby=OperationNo,LineItemNo
```

**Réponse** :
```json
{
  "@odata.context": "...",
  "value": [
    {
      "LineItemNo": 1,
      "PartNo": "D8588H",
      "OperationNo": 10,
      "QtyPerAssembly": 0.762,
      "QtyRequired": 0.762,
      "StructureLineNo": 1,
      "DateRequired": "2025-10-01T00:00:00Z",
      "PartNoRef": {
        "Description": "GENERIQUE PROFIL 2647 ALPI CHENE SABLE BROSSE - LONGUEUR 2500 MM",
        "UnitMeas": "pcs"
      }
    },
    {
      "LineItemNo": 2,
      "PartNo": "95605J",
      "OperationNo": 40,
      "QtyPerAssembly": 0.163744,
      "QtyRequired": 0.163744,
      "StructureLineNo": 10,
      "DateRequired": "2025-10-03T00:00:00Z",
      "PartNoRef": {
        "Description": "VERNIS ACRYLIQUE MAT - 1 BIDON 25 LITRES",
        "UnitMeas": "l"
      }
    }
  ]
}
```

### Exemple 2 : Filtrage côté code (OperationNo = 10)

```typescript
// ❌ Ne PAS utiliser $filter (erreur 400)
// $filter=OperationNo eq 10  // NE FONCTIONNE PAS

// ✅ Filtrer côté code après récupération
const response = await fetch(url + '?$expand=PartNoRef($select=Description,UnitMeas)')
const data = await response.json()

// Filtrer les matériaux de l'opération 10
const op10Materials = data.value.filter(mat => mat.OperationNo === 10)

if (op10Materials.length > 0) {
  const rawMaterial = op10Materials[0]
  console.log(`Raw Material: ${rawMaterial.PartNo}`)
  console.log(`Description: ${rawMaterial.PartNoRef.Description}`)
}
```

---

## 📋 Cas d'usage

### 🏷️ Part Printer : Raw Material (OP10)

**Objectif** : Récupérer le **premier matériau** utilisé dans **l'opération 10** (OP10) pour le regroupement des étiquettes.

**Implémentation** :

```typescript
async function getRawMaterial(orderNo: string): Promise<RawMaterial> {
  const url = `${IFS_BASE_URL}/ShopOrderHandling.svc/ShopOrds(OrderNo='${orderNo}',ReleaseNo='*',SequenceNo='*')/MaterialArray`
  
  const params = new URLSearchParams({
    $select: 'PartNo,OperationNo,QtyPerAssembly',
    $expand: 'PartNoRef($select=Description,UnitMeas)',
    $orderby: 'OperationNo,StructureLineNo'
  })
  
  const response = await fetch(`${url}?${params}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  })
  
  const data = await response.json()
  
  // Filtrer les matériaux de l'opération 10
  const op10Materials = data.value.filter(mat => mat.OperationNo === 10)
  
  if (op10Materials.length === 0) {
    throw new Error(`No materials found for OP10 in Shop Order ${orderNo}`)
  }
  
  // Prendre le premier matériau (StructureLineNo le plus petit)
  const rawMaterial = op10Materials[0]
  
  return {
    partNo: rawMaterial.PartNo,
    description: rawMaterial.PartNoRef.Description,
    quantity: rawMaterial.QtyPerAssembly,
    unitMeas: rawMaterial.PartNoRef.UnitMeas
  }
}
```

---

## 🔄 Relations OData disponibles

### `PartNoRef`

Informations détaillées sur le matériau (depuis `InventoryPart`)

```typescript
PartNoRef: {
  PartNo: string
  Contract: string
  Description: string
  DescriptionInUse: string
  UnitMeas: string
}
```

**Utilisation** :
```
$expand=PartNoRef($select=Description,UnitMeas)
```

### `OperationNoRef`

Informations sur l'opération

```typescript
OperationNoRef: {
  OperationNo: number
  OperationDescription: string
}
```

**Utilisation** :
```
$expand=OperationNoRef($select=OperationDescription)
```

---

## ⚠️ Limitations connues

### 1. Pas de filtrage OData

Le paramètre `$filter` n'est **pas supporté** sur cette navigation.

```http
❌ $filter=OperationNo eq 10  // Retourne 400 Bad Request
```

**Solution** : Filtrer côté code après récupération de tous les matériaux.

### 2. Performance

Récupérer tous les matériaux peut être lent pour des Shop Orders avec **beaucoup de composants** (50+).

**Optimisation** : Limiter les champs avec `$select` et ne pas utiliser `$expand` si les descriptions ne sont pas nécessaires.

### 3. Structure complexe

Les matériaux peuvent avoir des relations complexes (PhantomPart, Alternatives, etc.) qui ne sont pas toujours remplies.

**Solution** : Toujours vérifier la présence des champs avec `?.` (optional chaining).

---

## 🎯 Validation du besoin Part Printer

### Données nécessaires

| Besoin | Champ | Disponible |
|--------|-------|------------|
| Raw Material | `PartNo` | ✅ |
| Description | `PartNoRef.Description` | ✅ |
| Opération | `OperationNo` | ✅ |
| Quantité | `QtyPerAssembly` | ✅ |
| Unité | `PartNoRef.UnitMeas` | ✅ |

### Test validé

**Shop Order** : `454853`  
**OP10 Raw Material** : `D8588H`  
**Description** : "GENERIQUE PROFIL 2647 ALPI CHENE SABLE BROSSE - LONGUEUR 2500 MM"  
**Quantité** : `0.762 pcs`

✅ **SUCCÈS** : Toutes les données nécessaires sont disponibles !

---

## 📚 Références

- [Shop Order API Documentation](/docs/api/shop-order/README.md)
- [Part Printer Roadmap](/docs/tools/part-printer/ROADMAP.md)
- [IFS Cloud OData v4 Documentation](https://docs.ifs.com/)

---

## 🔗 Scripts de test

### Test complet

```bash
npx tsx scripts/test-shop-order-materials-array.ts
```

**Résultat attendu** :
- ✅ TEST 1: Récupération de tous les matériaux (200 OK)
- ⚠️ TEST 2: Filtrage OData (400 Bad Request - normal)

---

**Dernière mise à jour** : 15 octobre 2025  
**Status** : ✅ Validé et documenté  
**Auteur** : Manufacturing Portal Team
