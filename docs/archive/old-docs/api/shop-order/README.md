# 🏭 IFS Cloud API - Shop Order Handling

**Service** : ShopOrderHandling.svc  
**Type** : Projection API (OData v4)  
**Base URL** : `{IFS_BASE_URL}/ShopOrderHandling.svc`  
**Authentication** : OAuth2 Bearer Token

---

## 📋 Vue d'ensemble

Le service **ShopOrderHandling** gère les ordres de fabrication (Shop Orders) dans IFS Cloud, incluant :
- Recherche et récupération de Shop Orders
- Gestion du statut de production
- Lien avec DOP Headers et Serial Numbers
- Relation avec Customer Orders

### Services connexes

- [CustomerOrderHandling](../customer-order/) - Commandes clients liées
- [DopHeaderHandling](../dop-header/) - DOP Headers et Serial Numbers
- [SerialNumber](../serial-number/) - Gestion des numéros de série

---

## 🎯 Use Cases principaux

### 1. Rechercher un Shop Order

```
GET /ShopOrds?$filter=contains(OrderNo,'97277')
```

### 2. Récupérer le Serial Number via DOP

```
Shop Order → DopId → DOP Header → Serial Number
```

### 3. Lien vers Customer Order

```
Shop Order → CustomerOrderNo + CustomerLineNo → Customer Order
```

---

## 📡 Endpoints

### ShopOrds

Ensemble des Shop Orders (ordres de fabrication).

#### GET - Rechercher des Shop Orders

```http
GET /ShopOrderHandling.svc/ShopOrds
```

**Query Parameters (OData)**

| Paramètre | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `$filter` | string | Filtre OData | `contains(OrderNo,'97277')` |
| `$select` | string | Champs à retourner | `OrderNo,DopId,PartNo` |
| `$top` | integer | Limite de résultats | `10` |
| `$orderby` | string | Tri | `OrderNo desc` |

**Clés primaires**

| Champ | Type | Description |
|-------|------|-------------|
| `OrderNo` | string | Numéro d'ordre |
| `ReleaseNo` | string | Numéro de release |
| `SequenceNo` | string | Numéro de séquence |

**Champs importants**

| Champ | Type | Description |
|-------|------|-------------|
| `OrderNo` | string | Numéro d'ordre de fabrication |
| `ReleaseNo` | string | Release ("*" pour tous) |
| `SequenceNo` | string | Séquence ("*" pour tous) |
| `DopId` | string | ID du DOP Header (lien vers Serial Number) |
| `PartNo` | string | Référence article |
| `PartDescription` | string | Description article |
| `Contract` | string | Site de production |
| `CustomerOrderNo` | string | Numéro Customer Order lié |
| `CustomerLineNo` | string | Numéro ligne Customer Order |
| `Objstate` | string | État (Released, Started, Closed, etc) |

**⚠️ Important** : Utiliser `contains()` pour les filtres, pas `eq` (évite les erreurs de type).

**Exemple de requête**

```typescript
const response = await ifsClient.get(
  'ShopOrderHandling.svc/ShopOrds',
  {
    '$filter': "contains(OrderNo,'97277')",
    '$select': 'OrderNo,ReleaseNo,SequenceNo,DopId,PartNo,PartDescription,Contract,CustomerOrderNo,CustomerLineNo',
    '$top': '10'
  }
)

// Filtrage exact côté code
const exactMatch = response.value.find(
  order => order.OrderNo === '97277'
)
```

**Réponse exemple**

```json
{
  "value": [
    {
      "OrderNo": "97277",
      "ReleaseNo": "*",
      "SequenceNo": "*",
      "DopId": "95 - 10088",
      "PartNo": "LG5MA0XD02",
      "PartDescription": "LG5MA - ENSEMBLES PREPARES POUR A2D02",
      "Contract": "FR018",
      "CustomerOrderNo": "C1000038587",
      "CustomerLineNo": "1",
      "Objstate": "Closed"
    }
  ]
}
```

---

## 🔄 Workflow : Shop Order → Serial Number

### Problème : DOP ID composite

IFS retourne souvent des DOP IDs composites : `"95 - 10088"`

Pour récupérer le Serial Number, il faut :
1. Parser le DOP ID principal (ex: `"95"`)
2. L'utiliser pour requêter `DopHeaderHandling`

**Exemple complet**

```typescript
import { getIFSClient } from '@/lib/ifs-client'

// Fonction utilitaire pour extraire le DOP ID principal
function extractMainDopId(dopId: string | null): string | null {
  if (!dopId) return null
  
  // Si le DopId contient " - ", prendre la partie avant
  if (dopId.includes(' - ')) {
    return dopId.split(' - ')[0].trim()
  }
  
  return dopId.trim()
}

async function getSerialNumberFromShopOrder(orderNo: string) {
  const client = getIFSClient()
  
  // 1. Rechercher le Shop Order
  const shopOrderResponse = await client.get(
    'ShopOrderHandling.svc/ShopOrds',
    {
      '$filter': `contains(OrderNo,'${orderNo}')`,
      '$select': 'OrderNo,ReleaseNo,SequenceNo,DopId,PartNo',
      '$top': '10'
    }
  )
  
  const shopOrder = shopOrderResponse.value.find(
    order => order.OrderNo === orderNo
  )
  
  if (!shopOrder) {
    throw new Error(`Shop Order ${orderNo} not found`)
  }
  
  // 2. Extraire le DOP ID principal
  const mainDopId = extractMainDopId(shopOrder.DopId)
  
  if (!mainDopId) {
    return { shopOrder, serialNumber: null }
  }
  
  // 3. Récupérer le Serial Number via DOP Header
  const dopResponse = await client.get(
    'DopHeaderHandling.svc/Reference_DopHeadSerialReserv',
    {
      '$filter': `DopId eq '${mainDopId}'`,
      '$select': 'DopId,SerialNo,PartNo',
      '$top': '1'
    }
  )
  
  const serialReservation = dopResponse.value?.[0]
  
  return {
    shopOrder,
    serialNumber: serialReservation?.SerialNo || null,
    dopHeaderId: mainDopId
  }
}
```

---

## ⚠️ Points d'attention

### 1. Filtre OData : `contains()` vs `eq`

**❌ ÉCHEC**
```typescript
{
  '$filter': "OrderNo eq '1043'"  // Erreur : types not compatible
}
```

**✅ SUCCÈS**
```typescript
{
  '$filter': "contains(OrderNo,'1043')"  // Fonctionne
}

// Puis filtrer côté code pour exact match
const exact = response.value.find(o => o.OrderNo === '1043')
```

### 2. DOP ID composite

Le champ `DopId` peut contenir :
- Valeur simple : `"54"`
- Valeur composite : `"54 - 1035"`
- Valeur nulle : `null`

Toujours utiliser `extractMainDopId()` avant de requêter DopHeaderHandling.

### 3. Release et Sequence

Les valeurs `"*"` signifient "tous" :
- `ReleaseNo: "*"` = Tous les releases
- `SequenceNo: "*"` = Toutes les séquences

En général, on recherche avec `"*"` pour ces deux champs.

### 4. Relation Customer Order

Les champs `CustomerOrderNo` et `CustomerLineNo` peuvent être :
- ✅ Renseignés : lien direct vers Customer Order
- ❌ Vides/null : pas de Customer Order lié (ou lien indirect via Serial Number)

---

## 📊 États de Shop Order (Objstate)

| Objstate | Description |
|----------|-------------|
| `Planned` | Planifié |
| `Released` | Libéré |
| `Started` | Démarré |
| `Closed` | Clôturé |
| `Cancelled` | Annulé |

---

## 🔗 Relations avec autres entités

```
Shop Order (ShopOrds)
├─> DopId → DOP Header (Reference_DopHeadSerialReserv)
│   └─> SerialNo → Serial Number
│
└─> CustomerOrderNo + CustomerLineNo → Customer Order Line
    └─> Customer Order (CustomerOrderSet)
```

---

## 📚 Exemples de cas d'usage

### Cas validés (Boat Configuration Editor)

| Order No | Serial Number | DOP Header ID | Customer Order | Status |
|----------|---------------|---------------|----------------|--------|
| 563 | JY6MB0019 | 34 - 1014 → 34 | C1000038587 | ✅ Validé |
| 949 | LX6MA0116 | 48 - 10102 → 48 | - | ✅ Validé |
| 97277 | LG5MA0114 | 95 - 10088 → 95 | C1000038587 | ✅ Validé |
| 1043 | LX6MA0115 | 54 - 1035 → 54 | - | ✅ Validé |

---

## 📚 Références

### Documentation IFS

- [Shop Order Handling Projection API](https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1/ShopOrderHandling.svc/$metadata)

### Documentation projet

- [Analyse relation Shop Order → Serial → DOP](../discoveries/shoporder-serial-dop-analysis.md)
- [Implémentation Shop Order Service](../../tools/boat-configuration-editor/implementation/)

---

**Dernière mise à jour** : 13 octobre 2025  
**Testé avec** : IFS Cloud AST (Beneteau Dev)  
**Validé par** : Implémentation Boat Configuration Editor (Phase 1)
