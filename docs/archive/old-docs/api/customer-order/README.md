# 📦 IFS Cloud API - Customer Order Handling

**Service** : CustomerOrderHandling.svc  
**Type** : Projection API (OData v4)  
**Base URL** : `{IFS_BASE_URL}/CustomerOrderHandling.svc`  
**Authentication** : OAuth2 Bearer Token

---

## 📋 Vue d'ensemble

Le service **CustomerOrderHandling** gère les commandes clients (Customer Orders) dans IFS Cloud, incluant :
- Recherche et récupération de Customer Orders
- Gestion des lignes de commande (Customer Order Lines)
- Génération de ResultKey pour impression
- Informations de livraison et facturation

### Services connexes

- [ShopOrderHandling](../shop-order/) - Ordres de fabrication liés
- [PrintDialog](../print-dialog/) - Impression de documents Customer Order
- [SerialNumber](../serial-number/) - Serial Numbers des articles

---

## 🎯 Use Cases principaux

### 1. Rechercher un Customer Order par numéro

```
GET /CustomerOrderSet(OrderNo='C1000038587')
```

### 2. Rechercher via Serial Number

```
GET /CustomerOrderLineSet?$filter=SerialNo eq 'LG5MA0114'
→ Récupérer OrderNo + LineNo
→ GET /CustomerOrderSet(OrderNo='...')
```

### 3. Générer un ResultKey pour impression

```
POST /CustomerOrderSet(...)/CustomerOrder_PrintResultKey
→ Obtenir ResultKey pour PrintDialog
```

---

## 📡 Endpoints

### CustomerOrderSet

Ensemble des Customer Orders (commandes clients).

#### GET - Récupérer un Customer Order par clé

```http
GET /CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='{orderNo}')
```

**Paramètres**

| Paramètre | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `OrderNo` | string | Numéro de commande | `C1000038587` |

**Champs principaux**

| Champ | Type | Description |
|-------|------|-------------|
| `OrderNo` | string | Numéro de commande |
| `Contract` | string | Site de production |
| `CustomerId` | string | ID client |
| `CustomerName` | string | Nom du client |
| `OrderDate` | date | Date de commande |
| `WantedDeliveryDate` | date | Date de livraison souhaitée |
| `CurrencyCode` | string | Devise |
| `TotalSaleAmount` | number | Montant total TTC |
| `Objstate` | string | État (Planned, Released, etc) |
| `@odata.etag` | string | ETag (requis pour actions POST) |

**Exemple de requête**

```typescript
const response = await ifsClient.get<IFSCustomerOrderResponse>(
  `CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='C1000038587')`
)

const orderNo = response.OrderNo
const etag = response['@odata.etag']
```

**Réponse exemple**

```json
{
  "@odata.context": "...",
  "@odata.etag": "W/\"datetimeoffset'2025-10-13T12%3A00%3A00Z'\"",
  "OrderNo": "C1000038587",
  "Contract": "FR018",
  "CustomerId": "10012345",
  "CustomerName": "Marine Services SA",
  "OrderDate": "2025-07-01",
  "WantedDeliveryDate": "2025-08-15",
  "CurrencyCode": "EUR",
  "TotalSaleAmount": 425000.00,
  "Objstate": "Released"
}
```

---

#### GET - Rechercher des Customer Orders (avec filtres)

```http
GET /CustomerOrderHandling.svc/CustomerOrderSet
```

**Query Parameters (OData)**

| Paramètre | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `$filter` | string | Filtre OData | `contains(OrderNo,'C1000')` |
| `$select` | string | Champs à retourner | `OrderNo,CustomerName,OrderDate` |
| `$top` | integer | Limite de résultats | `50` |
| `$skip` | integer | Sauter N résultats | `100` |
| `$orderby` | string | Tri | `OrderDate desc` |
| `$expand` | string | Relations | `CustomerOrderLineSet` |

**Exemples de filtres**

```typescript
// Recherche par numéro partiel
{
  '$filter': "contains(OrderNo,'C1000')",
  '$select': 'OrderNo,CustomerName,OrderDate',
  '$top': '10'
}

// Recherche par client
{
  '$filter': "CustomerId eq '10012345'",
  '$orderby': 'OrderDate desc'
}

// Recherche par date
{
  '$filter': "OrderDate ge 2025-01-01 and OrderDate le 2025-12-31"
}
```

---

### CustomerOrderLineSet

Lignes de commande (articles commandés).

#### GET - Récupérer les lignes d'une commande

```http
GET /CustomerOrderHandling.svc/CustomerOrderLineSet
```

**Champs principaux**

| Champ | Type | Description |
|-------|------|-------------|
| `OrderNo` | string | Numéro de commande |
| `LineNo` | string | Numéro de ligne |
| `RelNo` | string | Numéro de livraison |
| `LineItemNo` | number | Numéro d'article |
| `CatalogNo` | string | Référence article |
| `CatalogDesc` | string | Description article |
| `BuyQtyDue` | number | Quantité commandée |
| `SaleUnitPrice` | number | Prix unitaire |
| `SerialNo` | string | Serial Number (si applicable) |
| `ConfigurationId` | string | ID configuration |
| `PlannedDeliveryDate` | date | Date de livraison prévue |

**Exemple de requête**

```typescript
// Rechercher une ligne par Serial Number
const response = await ifsClient.get(
  'CustomerOrderHandling.svc/CustomerOrderLineSet',
  {
    '$filter': `SerialNo eq 'LG5MA0114'`,
    '$select': 'OrderNo,LineNo,RelNo,CatalogNo,SerialNo'
  }
)

// Récupérer toutes les lignes d'une commande
const response = await ifsClient.get(
  'CustomerOrderHandling.svc/CustomerOrderLineSet',
  {
    '$filter': `OrderNo eq 'C1000038587'`,
    '$orderby': 'LineNo'
  }
)
```

**Réponse exemple**

```json
{
  "value": [
    {
      "OrderNo": "C1000038587",
      "LineNo": "1",
      "RelNo": "1",
      "LineItemNo": 0,
      "CatalogNo": "LG5MA",
      "CatalogDesc": "LAGOON 55 Main Assembly",
      "BuyQtyDue": 1,
      "SaleUnitPrice": 425000.00,
      "SerialNo": "LG5MA0114",
      "ConfigurationId": "41139",
      "PlannedDeliveryDate": "2025-08-15"
    }
  ]
}
```

---

### CustomerOrderAddresses

Adresses de livraison et facturation.

#### GET - Récupérer les adresses d'une commande

```http
GET /CustomerOrderHandling.svc/CustomerOrderAddresses
```

**Champs principaux**

| Champ | Type | Description |
|-------|------|-------------|
| `OrderNo` | string | Numéro de commande |
| `AddrFlag` | string | Type (DELIVERY, INVOICE) |
| `Name` | string | Nom destinataire |
| `Address1` | string | Adresse ligne 1 |
| `City` | string | Ville |
| `ZipCode` | string | Code postal |
| `Country` | string | Pays |

**Exemple de requête**

```typescript
const response = await ifsClient.get(
  'CustomerOrderHandling.svc/CustomerOrderAddresses',
  {
    '$filter': `OrderNo eq 'C1000038587'`,
    '$select': 'AddrFlag,Name,Address1,City,ZipCode,Country'
  }
)
```

---

## 🔄 Actions (Service Operations)

### CustomerOrder_PrintResultKey

Génère un ResultKey pour l'impression d'un document Customer Order.

**Endpoint**

```http
POST /CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='{orderNo}')/IfsApp.CustomerOrderHandling.CustomerOrder_PrintResultKey
Content-Type: application/json
If-Match: {etag}

{
  "ReportId": "CUSTOMER_ORDER_CONF_REP"
}
```

**Headers requis**

| Header | Valeur | Description |
|--------|--------|-------------|
| `Content-Type` | `application/json` | Format du body |
| `If-Match` | `{etag}` | ETag de l'entité (obligatoire) |

**Body**

| Paramètre | Type | Description |
|-----------|------|-------------|
| `ReportId` | string | ID du rapport à imprimer |

**ReportIds disponibles**

| ReportId | Environnement | Description |
|----------|---------------|-------------|
| `CUSTOMER_ORDER_CONF_REP` | AST (Dev) | Customer Order Configuration |
| `MA_FO_CR_1419` | Production | Rapport custom Bénéteau |

**Exemple de requête**

```typescript
// 1. Récupérer l'ETag
const orderResponse = await ifsClient.get(
  `CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='C1000038587')`
)
const etag = orderResponse['@odata.etag']

// 2. Générer le ResultKey
const resultKeyResponse = await ifsClient.post(
  `CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='C1000038587')/IfsApp.CustomerOrderHandling.CustomerOrder_PrintResultKey`,
  { ReportId: 'CUSTOMER_ORDER_CONF_REP' },
  { 'If-Match': etag }
)

const resultKey = parseInt(resultKeyResponse.value)
```

**Réponse**

```json
{
  "@odata.context": "...",
  "value": "558558"
}
```

**⚠️ Important** : La réponse retourne un string, penser à convertir en number avec `parseInt()`.

---

## 🛠️ Workflow complet

### Scénario : Rechercher Customer Order par Serial Number

```typescript
import { getIFSClient } from '@/lib/ifs-client'

async function getCustomerOrderBySerial(serialNumber: string) {
  const client = getIFSClient()
  
  try {
    // 1. Rechercher la ligne de commande avec le Serial Number
    const lineResponse = await client.get(
      'CustomerOrderHandling.svc/CustomerOrderLineSet',
      {
        '$filter': `SerialNo eq '${serialNumber}'`,
        '$select': 'OrderNo,LineNo,RelNo,CatalogNo,SerialNo',
        '$top': '1'
      }
    )
    
    if (!lineResponse.value || lineResponse.value.length === 0) {
      throw new Error(`No Customer Order Line found for Serial Number: ${serialNumber}`)
    }
    
    const line = lineResponse.value[0]
    const orderNo = line.OrderNo
    
    // 2. Récupérer le Customer Order complet
    const orderResponse = await client.get(
      `CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${orderNo}')`
    )
    
    // 3. (Optionnel) Récupérer toutes les lignes
    const allLinesResponse = await client.get(
      'CustomerOrderHandling.svc/CustomerOrderLineSet',
      {
        '$filter': `OrderNo eq '${orderNo}'`,
        '$orderby': 'LineNo'
      }
    )
    
    return {
      customerOrder: orderResponse,
      matchingLine: line,
      allLines: allLinesResponse.value
    }
    
  } catch (error) {
    console.error('Error fetching Customer Order:', error)
    throw error
  }
}
```

---

## ⚠️ Points d'attention

### 1. ETag obligatoire pour actions POST

Les actions comme `CustomerOrder_PrintResultKey` **requièrent** l'ETag :

```typescript
// ❌ ÉCHEC : Pas d'ETag
await client.post(
  'CustomerOrderSet(...)/CustomerOrder_PrintResultKey',
  { ReportId: 'CUSTOMER_ORDER_CONF_REP' }
)

// ✅ SUCCÈS : Avec ETag
await client.post(
  'CustomerOrderSet(...)/CustomerOrder_PrintResultKey',
  { ReportId: 'CUSTOMER_ORDER_CONF_REP' },
  { 'If-Match': etag }
)
```

### 2. Serial Number peut être sur plusieurs lignes

Un Customer Order peut avoir plusieurs lignes avec des Serial Numbers différents. Toujours filtrer sur `SerialNo` pour trouver la bonne ligne.

### 3. Relation avec Shop Order

La relation Customer Order ↔ Shop Order se fait via :
- `CustomerOrderLineSet.OrderNo` + `LineNo`
- `ShopOrds.CustomerOrderNo` + `CustomerLineNo`
- `DopHead` (intermédiaire via Serial Number)

Voir [Shop Order API](../shop-order/) pour détails.

### 4. États de commande (Objstate)

| Objstate | Description |
|----------|-------------|
| `Planned` | Planifiée |
| `Released` | Libérée |
| `Reserved` | Réservée |
| `Picked` | Prélevée |
| `PartiallyDelivered` | Partiellement livrée |
| `Delivered` | Livrée |
| `Invoiced` | Facturée |
| `Cancelled` | Annulée |

---

## 📊 Codes d'erreur courants

| Code | Erreur | Cause | Solution |
|------|--------|-------|----------|
| 404 | Not Found | OrderNo inexistant | Vérifier le numéro de commande |
| 412 | Precondition Failed | ETag manquant ou invalide | Récupérer un nouvel ETag |
| 404 | ReportId not found | ReportId inexistant dans l'environnement | Utiliser CUSTOMER_ORDER_CONF_REP (AST) |

---

## 📚 Références

### Documentation IFS

- [Customer Order Handling Projection API](https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1/CustomerOrderHandling.svc/$metadata)
- [IFS Cloud Customer Order Documentation](https://docs.ifs.com/cloud/)

### Documentation projet

- [Implémentation Customer Order](../../tools/boat-configuration-editor/implementation/customer-order.md)
- [Workflow Shop Order → Serial → Customer Order](../discoveries/shoporder-serial-customer-analysis.md)

---

**Dernière mise à jour** : 13 octobre 2025  
**Testé avec** : IFS Cloud AST (Beneteau Dev)  
**Validé par** : Implémentation Boat Configuration Editor
