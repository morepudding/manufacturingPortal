# 🏗️ IFS Cloud API - DOP Header Handling

**Service** : DopHeaderHandling.svc  
**Type** : Projection API (OData v4)  
**Base URL** : `{IFS_BASE_URL}/DopHeaderHandling.svc`  
**Authentication** : OAuth2 Bearer Token

---

## 📋 Vue d'ensemble

Le service **DopHeaderHandling** gère les en-têtes DOP (Discrete Order Planning) dans IFS Cloud, incluant :
- Lien entre Shop Orders et Serial Numbers
- Gestion des ordres de fabrication discrets
- Réservations de numéros de série
- Planification de production

### Services connexes

- [ShopOrderHandling](../shop-order/) - Ordres de fabrication
- [SerialReservationHandling](../serial-number/) - Réservation de Serial Numbers
- [CustomerOrderHandling](../customer-order/) - Commandes clients liées

---

## 🎯 Use Cases principaux

### 1. Récupérer Serial Number depuis DOP ID

```
GET /Reference_DopHeadSerialReserv?$filter=DopId eq '95'
```

### 2. Rechercher DOP Headers

```
GET /DopHeadSet?$filter=contains(DopId,'95')
```

### 3. Lien Shop Order → Serial Number

```
Shop Order.DopId → DOP Header → Serial Number
```

---

## 📡 Endpoints

### Reference_DopHeadSerialReserv

Référence des réservations de numéros de série par DOP Header.

#### GET - Récupérer les Serial Numbers d'un DOP

```http
GET /DopHeaderHandling.svc/Reference_DopHeadSerialReserv
```

**Query Parameters (OData)**

| Paramètre | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `$filter` | string | Filtre OData | `DopId eq '95'` |
| `$select` | string | Champs à retourner | `DopId,SerialNo,PartNo` |
| `$top` | integer | Limite de résultats | `10` |
| `$orderby` | string | Tri | `SerialNo` |

**Clés primaires**

| Champ | Type | Description |
|-------|------|-------------|
| `DopId` | string | ID du DOP Header |
| `SerialNo` | string | Numéro de série réservé |

**Champs importants**

| Champ | Type | Description |
|-------|------|-------------|
| `DopId` | string | ID du DOP Header |
| `SerialNo` | string | Numéro de série (ex: "LG5MA0114") |
| `PartNo` | string | Référence article |
| `PartDescription` | string | Description article |
| `Contract` | string | Site de production |
| `OrderNo` | string | Numéro d'ordre lié |
| `DemandOrderRef1` | string | Référence demande 1 (Shop Order) |
| `DemandOrderRef2` | string | Référence demande 2 |
| `DemandOrderRef3` | string | Référence demande 3 |

**Exemple de requête**

```typescript
const response = await ifsClient.get(
  'DopHeaderHandling.svc/Reference_DopHeadSerialReserv',
  {
    '$filter': `DopId eq '95'`,
    '$select': 'DopId,SerialNo,PartNo,PartDescription,Contract',
    '$top': '1'
  }
)

const serialNumber = response.value?.[0]?.SerialNo  // "LG5MA0114"
```

**Réponse exemple**

```json
{
  "@odata.context": "...",
  "value": [
    {
      "DopId": "95",
      "SerialNo": "LG5MA0114",
      "PartNo": "LG5MA",
      "PartDescription": "LAGOON 55 Main Assembly",
      "Contract": "FR018",
      "OrderNo": "97277",
      "DemandOrderRef1": "97277",
      "DemandOrderRef2": "*",
      "DemandOrderRef3": "*"
    }
  ]
}
```

---

### DopHeadSet

Ensemble des DOP Headers.

#### GET - Rechercher des DOP Headers

```http
GET /DopHeaderHandling.svc/DopHeadSet
```

**Query Parameters (OData)**

| Paramètre | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `$filter` | string | Filtre OData | `contains(DopId,'95')` |
| `$select` | string | Champs à retourner | `DopId,PartNo,RevisedQtyDemand` |
| `$top` | integer | Limite de résultats | `10` |
| `$expand` | string | Relations | `DopOrderSet,InventoryPartRef` |

**Champs principaux**

| Champ | Type | Description |
|-------|------|-------------|
| `DopId` | string | ID du DOP Header |
| `PartNo` | string | Référence article |
| `Contract` | string | Site de production |
| `RevisedQtyDemand` | number | Quantité demandée |
| `RevisedDueDate` | datetime | Date due révisée |
| `DopOrderType` | string | Type d'ordre |
| `Objstate` | string | État (Released, Closed, etc) |
| `PlanningMethod` | string | Méthode de planification |

**Exemple de requête**

```typescript
const response = await ifsClient.get(
  'DopHeaderHandling.svc/DopHeadSet',
  {
    '$filter': `contains(DopId,'95')`,
    '$select': 'DopId,PartNo,Contract,RevisedQtyDemand,Objstate'
  }
)
```

**Réponse exemple**

```json
{
  "value": [
    {
      "DopId": "95",
      "PartNo": "LG5MA",
      "Contract": "FR018",
      "RevisedQtyDemand": 1,
      "RevisedDueDate": "2025-08-15T00:00:00Z",
      "DopOrderType": "ShopOrder",
      "Objstate": "Released",
      "PlanningMethod": "B"
    }
  ]
}
```

---

#### GET - Récupérer un DOP Header spécifique

```http
GET /DopHeaderHandling.svc/DopHeadSet(DopId='{dopId}')
```

**Exemple**

```typescript
const response = await ifsClient.get(
  `DopHeaderHandling.svc/DopHeadSet(DopId='95')`,
  {
    '$select': 'DopId,PartNo,RevisedQtyDemand,RevisedDueDate,Objstate'
  }
)
```

---

### DopOrderSet

Ensemble des ordres DOP (lignes de DOP).

#### GET - Récupérer les ordres d'un DOP Header

```http
GET /DopHeaderHandling.svc/DopOrderSet
```

**Champs principaux**

| Champ | Type | Description |
|-------|------|-------------|
| `DopId` | string | ID du DOP Header |
| `DopOrderId` | number | ID de l'ordre DOP |
| `PartNo` | string | Référence article |
| `OrderType` | string | Type d'ordre |
| `RevisedQtyDemand` | number | Quantité demandée |
| `RevisedStartDate` | datetime | Date début révisée |
| `RevisedDueDate` | datetime | Date due révisée |
| `OrderSupplyType` | string | Type d'approvisionnement |

**Exemple de requête**

```typescript
const response = await ifsClient.get(
  'DopHeaderHandling.svc/DopOrderSet',
  {
    '$filter': `DopId eq '95'`,
    '$select': 'DopId,DopOrderId,PartNo,OrderType,RevisedQtyDemand',
    '$orderby': 'DopOrderId'
  }
)
```

**Réponse exemple**

```json
{
  "value": [
    {
      "DopId": "95",
      "DopOrderId": 10088,
      "PartNo": "LG5MA0XD02",
      "OrderType": "ShopOrder",
      "RevisedQtyDemand": 1,
      "RevisedStartDate": "2025-07-15T00:00:00Z",
      "RevisedDueDate": "2025-08-15T00:00:00Z",
      "OrderSupplyType": "InventoryOrder"
    }
  ]
}
```

---

## 🔄 Workflow complet

### Scénario : Shop Order → Serial Number via DOP

```typescript
import { getIFSClient } from '@/lib/ifs-client'

async function getSerialNumberFromDopId(dopId: string) {
  const client = getIFSClient()
  
  try {
    // 1. Récupérer les réservations Serial du DOP
    const serialResponse = await client.get(
      'DopHeaderHandling.svc/Reference_DopHeadSerialReserv',
      {
        '$filter': `DopId eq '${dopId}'`,
        '$select': 'DopId,SerialNo,PartNo,PartDescription,Contract',
        '$top': '1'
      }
    )
    
    if (!serialResponse.value || serialResponse.value.length === 0) {
      return {
        dopId,
        serialNumber: null,
        message: 'No Serial Number found for this DOP'
      }
    }
    
    const serialReservation = serialResponse.value[0]
    
    // 2. (Optionnel) Récupérer les détails du DOP Header
    const dopHeaderResponse = await client.get(
      `DopHeaderHandling.svc/DopHeadSet(DopId='${dopId}')`,
      {
        '$select': 'DopId,PartNo,RevisedQtyDemand,RevisedDueDate,Objstate'
      }
    )
    
    return {
      dopId,
      serialNumber: serialReservation.SerialNo,
      partNo: serialReservation.PartNo,
      partDescription: serialReservation.PartDescription,
      contract: serialReservation.Contract,
      dopHeader: dopHeaderResponse
    }
    
  } catch (error) {
    console.error('Error fetching Serial Number from DOP:', error)
    throw error
  }
}

// Utilisation avec DOP ID composite
async function getSerialFromShopOrder(shopOrder: any) {
  // Shop Order peut retourner "54 - 1035"
  const dopId = extractMainDopId(shopOrder.DopId)
  
  if (!dopId) {
    return { serialNumber: null }
  }
  
  return await getSerialNumberFromDopId(dopId)
}

function extractMainDopId(dopId: string | null): string | null {
  if (!dopId) return null
  
  // Parser "54 - 1035" → "54"
  if (dopId.includes(' - ')) {
    return dopId.split(' - ')[0].trim()
  }
  
  return dopId.trim()
}
```

---

## ⚠️ Points d'attention

### 1. DOP ID composite dans Shop Order

Le champ `DopId` dans Shop Order peut contenir :
- **Valeur simple** : `"95"`
- **Valeur composite** : `"95 - 10088"`

**Solution** : Toujours parser le DOP ID avant de requêter :

```typescript
// ❌ ÉCHEC
const dopId = "54 - 1035"  // Composite
GET /Reference_DopHeadSerialReserv?$filter=DopId eq '54 - 1035'
// → Erreur : DOP non trouvé

// ✅ SUCCÈS
const mainDopId = "54"  // Partie principale
GET /Reference_DopHeadSerialReserv?$filter=DopId eq '54'
// → Retourne le Serial Number
```

### 2. Plusieurs Serial Numbers par DOP

Un DOP Header peut avoir **plusieurs** Serial Numbers réservés :

```json
{
  "value": [
    { "DopId": "95", "SerialNo": "LG5MA0114" },
    { "DopId": "95", "SerialNo": "LG5MA0115" },
    { "DopId": "95", "SerialNo": "LG5MA0116" }
  ]
}
```

**Gestion** : Utiliser `$top=1` pour récupérer le premier Serial Number (principal).

### 3. Filtre OData : `eq` vs `contains`

Pour `Reference_DopHeadSerialReserv`, utiliser `eq` (pas `contains`) :

```typescript
// ✅ CORRECT
{
  '$filter': `DopId eq '95'`
}

// ❌ PEUT ÉCHOUER
{
  '$filter': `contains(DopId,'95')`
}
```

**Raison** : `DopId` est une clé primaire, `eq` est plus performant et fiable.

### 4. États de DOP Header (Objstate)

| Objstate | Description |
|----------|-------------|
| `Unreleased` | Non libéré |
| `Released` | Libéré |
| `Netted` | Netté (calculé) |
| `Closed` | Clôturé |
| `Cancelled` | Annulé |
| `Created` | Créé |

**Note** : Un DOP `Closed` peut toujours avoir des Serial Numbers valides.

---

## 🧪 Cas de test validés

### Cas réels testés (Boat Configuration Editor)

| Shop Order | DOP ID Brut | DOP ID Principal | Serial Number | Status |
|------------|-------------|------------------|---------------|--------|
| 563 | 34 - 1014 | **34** | JY6MB0019 | ✅ Validé |
| 949 | 48 - 10102 | **48** | LX6MA0116 | ✅ Validé |
| 97277 | 95 - 10088 | **95** | LG5MA0114 | ✅ Validé |
| 1043 | 54 - 1035 | **54** | LX6MA0115 | ✅ Validé |

**Environnement** : IFS Cloud AST (Dev)

---

## 📊 Relation Shop Order → DOP → Serial

```
┌─────────────────────────────────────────────────────────────────┐
│                     WORKFLOW COMPLET                            │
└─────────────────────────────────────────────────────────────────┘

1. SHOP ORDER (ShopOrderHandling.svc/ShopOrds)
   ├─> OrderNo: "97277"
   ├─> ReleaseNo: "*"
   ├─> SequenceNo: "*"
   └─> DopId: "95 - 10088"  ← Composite !

2. PARSING DOP ID
   "95 - 10088" → extractMainDopId() → "95"

3. DOP HEADER (DopHeaderHandling.svc/Reference_DopHeadSerialReserv)
   GET ?$filter=DopId eq '95'
   ├─> DopId: "95"
   ├─> SerialNo: "LG5MA0114"  ← SERIAL NUMBER
   ├─> PartNo: "LG5MA"
   └─> Contract: "FR018"

4. RÉSULTAT
   {
     "orderNo": "97277",
     "dopHeaderId": "95",
     "serialNumber": "LG5MA0114",
     "partNo": "LG5MA"
   }
```

---

## 🔗 Relations avec autres entités

```
DOP Header (DopHeadSet)
├─> Reference_DopHeadSerialReserv → Serial Numbers
├─> DopOrderSet → DOP Orders (lignes)
├─> Shop Orders ← DopId (référence inverse)
└─> Customer Order Lines (via Serial Number)
```

---

## 📚 Exemples d'utilisation

### Exemple 1 : Récupérer Serial Number simple

```typescript
const dopId = '95'

const response = await ifsClient.get(
  'DopHeaderHandling.svc/Reference_DopHeadSerialReserv',
  {
    '$filter': `DopId eq '${dopId}'`,
    '$select': 'SerialNo',
    '$top': '1'
  }
)

const serialNumber = response.value[0]?.SerialNo
console.log('Serial Number:', serialNumber)  // "LG5MA0114"
```

### Exemple 2 : Récupérer détails complets

```typescript
const dopId = '95'

const response = await ifsClient.get(
  'DopHeaderHandling.svc/Reference_DopHeadSerialReserv',
  {
    '$filter': `DopId eq '${dopId}'`,
    '$select': 'DopId,SerialNo,PartNo,PartDescription,Contract,OrderNo',
    '$top': '1'
  }
)

const data = response.value[0]
console.log({
  dopId: data.DopId,
  serialNumber: data.SerialNo,
  partNo: data.PartNo,
  description: data.PartDescription,
  site: data.Contract,
  orderNo: data.OrderNo
})
```

### Exemple 3 : Vérifier existence Serial Number

```typescript
async function hasSerialNumber(dopId: string): Promise<boolean> {
  const response = await ifsClient.get(
    'DopHeaderHandling.svc/Reference_DopHeadSerialReserv',
    {
      '$filter': `DopId eq '${dopId}'`,
      '$select': 'SerialNo',
      '$top': '1'
    }
  )
  
  return response.value && response.value.length > 0
}
```

---

## 📊 Codes d'erreur courants

| Code | Erreur | Cause | Solution |
|------|--------|-------|----------|
| 404 | Not Found | DopId inexistant | Vérifier le DOP ID |
| 400 | Bad Request | Format DopId incorrect | Parser le DOP ID composite |
| 400 | Invalid filter | Syntaxe OData incorrecte | Utiliser `eq` pas `contains` |

---

## 📚 Références

### Documentation IFS

- [DOP Header Handling Projection API](https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1/DopHeaderHandling.svc/$metadata)
- [IFS Cloud DOP Documentation](https://docs.ifs.com/cloud/)

### Documentation projet

- [Analyse Shop Order → Serial → DOP](../discoveries/shoporder-serial-dop-analysis.md)
- [Shop Order API](../shop-order/)
- [Serial Number API](../serial-number/)

---

**Dernière mise à jour** : 13 octobre 2025  
**Testé avec** : IFS Cloud AST (Beneteau Dev)  
**Validé par** : Implémentation Boat Configuration Editor (Phase 1)
