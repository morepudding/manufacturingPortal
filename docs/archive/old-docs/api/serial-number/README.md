# 🔢 IFS Cloud API - Serial Number Handling

**Service** : SerialReservationHandling.svc  
**Type** : Projection API (OData v4)  
**Base URL** : `{IFS_BASE_URL}/SerialReservationHandling.svc`  
**Authentication** : OAuth2 Bearer Token

---

## 📋 Vue d'ensemble

Le service **SerialReservationHandling** gère les numéros de série (Serial Numbers) dans IFS Cloud, incluant :
- Génération et réservation de Serial Numbers
- Lien avec les Shop Orders via DOP Headers
- Gestion des séquences et plages de numéros
- Validation de disponibilité

### Services connexes

- [DopHeaderHandling](../dop-header/) - DOP Headers et réservations Serial
- [ShopOrderHandling](../shop-order/) - Ordres de fabrication liés
- [CustomerOrderHandling](../customer-order/) - Commandes clients

---

## 🎯 Use Cases principaux

### 1. Récupérer un Serial Number depuis Shop Order

```
Shop Order → DopId → DOP Header → Serial Number
```

### 2. Réserver des Serial Numbers

```
POST /SerialReservationSet
→ Créer une réservation de numéros de série
```

### 3. Générer des séquences

```
POST /SequenceGeneratorSet
→ Générer une plage de Serial Numbers
```

---

## 📡 Endpoints

### SerialReservationSet

Ensemble des réservations de numéros de série.

#### GET - Récupérer les réservations

```http
GET /SerialReservationHandling.svc/SerialReservationSet
```

**Query Parameters (OData)**

| Paramètre | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `$filter` | string | Filtre OData | `OrderRef1 eq '97277'` |
| `$select` | string | Champs à retourner | `OrderRef1,PartNo,SerialRule` |
| `$top` | integer | Limite de résultats | `10` |
| `$expand` | string | Relations | `PartCatalogRef` |

**Champs principaux**

| Champ | Type | Description |
|-------|------|-------------|
| `Objkey` | string | Clé unique |
| `OrderRef1` | string | Référence ordre (Shop Order No) |
| `OrderRef2` | string | Référence 2 (Release No) |
| `OrderRef3` | string | Référence 3 (Sequence No) |
| `OrderRef4` | number | Référence 4 (Line Item) |
| `PartNo` | string | Référence article |
| `PartDescription` | string | Description article |
| `SourceQty` | number | Quantité source |
| `SerialsToReserve` | number | Nombre de serials à réserver |
| `SerialReservationSource` | string | Source de réservation |
| `Contract` | string | Site |
| `SerialRule` | string | Règle de génération (MANUAL, etc) |
| `MaxSerial` | string | Serial maximum |
| `CountReservation` | number | Nombre de réservations |
| `UnreservedSerials` | number | Serials non réservés |

**Exemple de requête**

```typescript
const response = await ifsClient.get(
  'SerialReservationHandling.svc/SerialReservationSet',
  {
    '$filter': `OrderRef1 eq '97277'`,
    '$select': 'OrderRef1,OrderRef2,OrderRef3,PartNo,SerialsToReserve,SerialRule'
  }
)
```

**Réponse exemple**

```json
{
  "value": [
    {
      "Objkey": "ABC123",
      "OrderRef1": "97277",
      "OrderRef2": "*",
      "OrderRef3": "*",
      "PartNo": "LG5MA",
      "PartDescription": "LAGOON 55 Main Assembly",
      "SourceQty": 1,
      "SerialsToReserve": 1,
      "SerialReservationSource": "Shop Order",
      "Contract": "FR018",
      "SerialRule": "MANUAL",
      "CountReservation": 1,
      "UnreservedSerials": 0
    }
  ]
}
```

---

#### POST - Créer une réservation de Serial Numbers

```http
POST /SerialReservationHandling.svc/SerialReservationSet
Content-Type: application/json

{
  "OrderRef1": "97277",
  "OrderRef2": "*",
  "OrderRef3": "*",
  "PartNo": "LG5MA",
  "SourceQty": 1,
  "SerialsToReserve": 1,
  "SerialReservationSource": "ShopOrder",
  "Contract": "FR018",
  "SerialRule": "MANUAL"
}
```

**Réponse**

- **Status** : 201 Created
- **Body** : Entité créée avec `Objkey`

---

### SequenceGeneratorSet

Générateur de séquences de numéros de série.

#### GET - Récupérer les générateurs de séquences

```http
GET /SerialReservationHandling.svc/SequenceGeneratorSet
```

**Champs principaux**

| Champ | Type | Description |
|-------|------|-------------|
| `Objkey` | string | Clé unique |
| `ParentObjkey` | string | Clé parent |
| `Prefix` | string | Préfixe (ex: "LG5MA") |
| `Suffix` | string | Suffixe |
| `Length` | number | Longueur totale |
| `SerialList` | string | Liste des serials générés |
| `Quantity` | number | Quantité à générer |

**Exemple de requête**

```typescript
const response = await ifsClient.get(
  'SerialReservationHandling.svc/SequenceGeneratorSet',
  {
    '$filter': `contains(Prefix,'LG5MA')`,
    '$select': 'Prefix,Suffix,Length,Quantity,SerialList'
  }
)
```

**Réponse exemple**

```json
{
  "value": [
    {
      "Objkey": "SEQ001",
      "Prefix": "LG5MA",
      "Suffix": "",
      "Length": 9,
      "SerialList": "LG5MA0114",
      "Quantity": 1
    }
  ]
}
```

---

#### POST - Générer une séquence

```http
POST /SerialReservationHandling.svc/SequenceGeneratorSet
Content-Type: application/json

{
  "Prefix": "LG5MA",
  "Suffix": "",
  "Length": 9,
  "Quantity": 1
}
```

**Réponse**

- **Status** : 201 Created
- **Body** : Séquence générée avec `SerialList`

---

### SequencePreviewSet

Prévisualisation de séquences avant génération.

#### GET - Prévisualiser une séquence

```http
GET /SerialReservationHandling.svc/SequencePreviewSet
```

**Champs principaux**

| Champ | Type | Description |
|-------|------|-------------|
| `Objkey` | string | Clé unique |
| `SerialObjkey` | string | Clé serial |
| `Prefix` | string | Préfixe |
| `Suffix` | string | Suffixe |
| `Length` | number | Longueur |
| `Sum` | number | Total de serials |

**Utilité** : Permet de vérifier les numéros qui seront générés avant de créer la réservation.

---

## 🔄 Workflow complet

### Scénario : Récupérer Serial Number depuis Shop Order

```typescript
import { getIFSClient } from '@/lib/ifs-client'

async function getSerialNumberFromShopOrder(
  orderNo: string,
  releaseNo: string = '*',
  sequenceNo: string = '*'
) {
  const client = getIFSClient()
  
  try {
    // 1. Rechercher Shop Order
    const shopOrderResponse = await client.get(
      'ShopOrderHandling.svc/ShopOrds',
      {
        '$filter': `contains(OrderNo,'${orderNo}')`,
        '$select': 'OrderNo,ReleaseNo,SequenceNo,DopId,PartNo'
      }
    )
    
    const shopOrder = shopOrderResponse.value.find(
      order => order.OrderNo === orderNo
    )
    
    if (!shopOrder) {
      throw new Error(`Shop Order ${orderNo} not found`)
    }
    
    // 2. Extraire DopId (peut être composite : "54 - 1035")
    const dopId = extractMainDopId(shopOrder.DopId)
    
    if (!dopId) {
      return {
        shopOrder,
        serialNumber: null,
        message: 'No DOP ID found for this Shop Order'
      }
    }
    
    // 3. Récupérer Serial Number via DOP Header
    const dopResponse = await client.get(
      'DopHeaderHandling.svc/Reference_DopHeadSerialReserv',
      {
        '$filter': `DopId eq '${dopId}'`,
        '$select': 'DopId,SerialNo,PartNo',
        '$top': '1'
      }
    )
    
    const serialReservation = dopResponse.value?.[0]
    
    return {
      shopOrder,
      serialNumber: serialReservation?.SerialNo || null,
      dopHeaderId: dopId,
      partNo: serialReservation?.PartNo
    }
    
  } catch (error) {
    console.error('Error fetching Serial Number:', error)
    throw error
  }
}

// Fonction utilitaire pour parser DOP ID composite
function extractMainDopId(dopId: string | null): string | null {
  if (!dopId) return null
  
  // Si le DopId contient " - ", prendre la partie avant
  if (dopId.includes(' - ')) {
    return dopId.split(' - ')[0].trim()
  }
  
  return dopId.trim()
}
```

---

## ⚠️ Points d'attention

### 1. DOP ID composite

Le champ `DopId` dans Shop Order peut être composite :

```typescript
// Exemples réels
"54 - 1035"  → DOP ID principal = "54"
"95 - 10088" → DOP ID principal = "95"
"48 - 10102" → DOP ID principal = "48"
```

**Solution** : Toujours parser avec `extractMainDopId()` avant de requêter DOP Header.

### 2. Serial Number vs Serial Rule

| Champ | Description | Valeurs |
|-------|-------------|---------|
| `SerialBegin` | Début de plage | `"*"` (wildcard) ou valeur |
| `SerialEnd` | Fin de plage | `"*"` (wildcard) ou valeur |
| `SerialRule` | Règle de génération | `MANUAL`, `AUTOMATIC` |

**Important** : 
- `SerialBegin` et `SerialEnd` définissent une **plage possible**
- Le **Serial Number réel** est dans DOP Header (`Reference_DopHeadSerialReserv`)

### 3. Shop Orders sans DOP

Certains Shop Orders n'ont pas de `DopId` :
- Type `InventOrder` (stock) : pas de DOP
- Type `CustomerOrder` (commande client) : généralement avec DOP
- Environnement de test (AST) : données incomplètes

**Gestion** : Toujours vérifier `if (dopId)` avant de requêter DOP Header.

### 4. Relation avec Customer Order

Alternative si `DopId` non disponible :

```typescript
// Via Customer Order Line
if (shopOrder.CustomerOrderNo) {
  const customerOrderLine = await getCustomerOrderLine(
    shopOrder.CustomerOrderNo,
    shopOrder.CustomerLineNo
  )
  
  // Hull Number = Serial Number
  return customerOrderLine.HullNumber
}
```

---

## 📊 Codes d'erreur courants

| Code | Erreur | Cause | Solution |
|------|--------|-------|----------|
| 404 | Not Found | DopId inexistant | Vérifier que le DOP existe |
| 400 | Bad Request | Format DopId incorrect | Parser le DopId composite |
| 400 | Invalid OrderRef | Références Shop Order incorrectes | Vérifier OrderNo, ReleaseNo, SequenceNo |

---

## 🧪 Cas de test validés

| Order No | DOP ID | Serial Number | Status |
|----------|--------|---------------|--------|
| 563 | 34 - 1014 → 34 | JY6MB0019 | ✅ Validé |
| 949 | 48 - 10102 → 48 | LX6MA0116 | ✅ Validé |
| 97277 | 95 - 10088 → 95 | LG5MA0114 | ✅ Validé |
| 1043 | 54 - 1035 → 54 | LX6MA0115 | ✅ Validé |

**Environnement** : IFS Cloud AST (Dev)

---

## 📚 Références

### Documentation IFS

- [Serial Reservation Handling Projection API](https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1/SerialReservationHandling.svc/$metadata)
- [IFS Cloud Serial Number Documentation](https://docs.ifs.com/cloud/)

### Documentation projet

- [Shop Order → Serial Number Workflow](../discoveries/shoporder-serial-dop-analysis.md)
- [DOP Header API](../dop-header/)
- [Boat Configuration Editor Implementation](../../tools/boat-configuration-editor/implementation/)

---

**Dernière mise à jour** : 13 octobre 2025  
**Testé avec** : IFS Cloud AST (Beneteau Dev)  
**Validé par** : Implémentation Boat Configuration Editor (Phase 1)
