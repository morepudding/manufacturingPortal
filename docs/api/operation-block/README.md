# 🔧 IFS Cloud API - Operation Block Handling

**Service** : OperationBlockHandling.svc  
**Type** : Projection API (OData v4)  
**Base URL** : `{IFS_BASE_URL}/OperationBlockHandling.svc`  
**Authentication** : OAuth2 Bearer Token

---

## 📋 Vue d'ensemble

Le service **OperationBlockHandling** gère les opérations de fabrication et les blocks associés dans IFS Cloud, incluant :
- Récupération des opérations d'un Shop Order
- Accès au Block ID (OperationBlockId) de chaque opération
- Informations sur les Work Centers et descriptions d'opérations
- Support du filtrage par numéro d'opération (ex: OP10)

### Services connexes

- [ShopOrderHandling](../shop-order/) - Ordres de fabrication
- [MasterPart](../master-part/) - Pièces et attributs techniques
- [ProductionLine](../production-line/) - Lignes de production

---

## 🎯 Use Cases principaux

### 1. Récupérer toutes les opérations d'un Shop Order

```
GET /Reference_ShopOrderOperation?$filter=OrderNo eq '454853'
```

### 2. Récupérer uniquement l'opération 10 (OP10)

```
GET /Reference_ShopOrderOperation?$filter=OrderNo eq '454853' and OperationNo eq 10
```

### 3. Récupérer le Block ID d'une opération

```
GET /Reference_ShopOrderOperation?$filter=OrderNo eq '454853' and OperationNo eq 10&$select=OperationBlockId
```

---

## 📡 Endpoints

### Reference_ShopOrderOperation

Référence croisée des opérations de Shop Order avec leurs blocks associés.

#### GET - Récupérer les opérations d'un Shop Order

```http
GET /OperationBlockHandling.svc/Reference_ShopOrderOperation
```

**Query Parameters (OData)**

| Paramètre | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `$filter` | string | Filtre OData (requis) | `OrderNo eq '454853'` |
| `$select` | string | Champs à retourner | `OrderNo,OperationNo,OperationBlockId` |
| `$top` | integer | Limite de résultats | `50` |
| `$orderby` | string | Tri | `OperationNo asc` |

**Champs principaux**

| Champ | Type | Nullable | Description |
|-------|------|----------|-------------|
| `OrderNo` | string | ❌ | Numéro de Shop Order |
| `ReleaseNo` | string | ❌ | Release Number (souvent '*') |
| `SequenceNo` | string | ❌ | Sequence Number (souvent '*') |
| `OperationNo` | number | ❌ | Numéro d'opération (10, 20, 30...) |
| `OperationBlockId` | string | ✅ | **Block ID** (peut être vide/null) |
| `OperationDescription` | string | ✅ | Description de l'opération (ex: "CL") |
| `WorkCenterNo` | string | ✅ | Numéro du Work Center (ex: "W4X09") |

**⚠️ Important** :
- Le champ s'appelle **`OperationBlockId`** (pas `BlockId`) ✅
- `OperationBlockId` peut être **null** ou vide (valeur valide)
- Le filtre sur `OrderNo` est **obligatoire** (sinon trop de résultats)

**Exemples de requêtes**

```typescript
// Récupérer toutes les opérations d'un Shop Order
const response = await ifsClient.get(
  'OperationBlockHandling.svc/Reference_ShopOrderOperation',
  {
    '$filter': "OrderNo eq '454853'",
    '$select': 'OrderNo,ReleaseNo,SequenceNo,OperationNo,OperationBlockId,OperationDescription,WorkCenterNo',
    '$orderby': 'OperationNo asc'
  }
)

// Récupérer uniquement l'opération 10
const response = await ifsClient.get(
  'OperationBlockHandling.svc/Reference_ShopOrderOperation',
  {
    '$filter': "OrderNo eq '454853' and OperationNo eq 10",
    '$select': 'OrderNo,OperationNo,OperationBlockId'
  }
)
```

**Réponse exemple (toutes les opérations)**

```json
{
  "@odata.context": "...",
  "value": [
    {
      "OrderNo": "454853",
      "ReleaseNo": "*",
      "SequenceNo": "*",
      "OperationNo": 10,
      "OperationBlockId": null,
      "OperationDescription": "CL",
      "WorkCenterNo": "W4X09"
    },
    {
      "OrderNo": "454853",
      "ReleaseNo": "*",
      "SequenceNo": "*",
      "OperationNo": 20,
      "OperationBlockId": "BLOCK_A25",
      "OperationDescription": "ASS",
      "WorkCenterNo": "W4X10"
    },
    {
      "OrderNo": "454853",
      "ReleaseNo": "*",
      "SequenceNo": "*",
      "OperationNo": 30,
      "OperationBlockId": "BLOCK_A25",
      "OperationDescription": "CTRL",
      "WorkCenterNo": "W4X11"
    }
  ]
}
```

**Réponse exemple (opération 10 uniquement)**

```json
{
  "@odata.context": "...",
  "value": [
    {
      "OrderNo": "454853",
      "ReleaseNo": "*",
      "SequenceNo": "*",
      "OperationNo": 10,
      "OperationBlockId": null,
      "OperationDescription": "CL",
      "WorkCenterNo": "W4X09"
    }
  ]
}
```

---

## 🛠️ Workflow complet

### Scénario : Récupérer le Block ID de l'opération 10

```typescript
import { getIFSClient } from '@/shared/services/ifs-client'

async function getOperation10BlockId(
  orderNo: string,
  releaseNo: string = '*',
  sequenceNo: string = '*'
): Promise<string | null> {
  const client = getIFSClient()
  
  try {
    // Récupérer l'opération 10
    const response = await client.get(
      'OperationBlockHandling.svc/Reference_ShopOrderOperation',
      {
        '$filter': `OrderNo eq '${orderNo}' and OperationNo eq 10`,
        '$select': 'OrderNo,ReleaseNo,SequenceNo,OperationNo,OperationBlockId,OperationDescription,WorkCenterNo'
      }
    )
    
    if (!response.value || response.value.length === 0) {
      console.warn(`⚠️ No Operation 10 found for Shop Order: ${orderNo}`)
      return null
    }
    
    const operation10 = response.value[0]
    
    // OperationBlockId peut être null ou vide (c'est normal)
    const blockId = operation10.OperationBlockId || null
    
    console.log(`✅ Operation 10 Block ID for ${orderNo}: ${blockId || '(empty)'}`)
    
    return blockId
    
  } catch (error) {
    console.error('❌ Error fetching Operation 10:', error)
    throw error
  }
}

// Utilisation
const blockId = await getOperation10BlockId('454853')
// → null (pour ce Shop Order, l'OP10 n'a pas de Block ID)
```

### Scénario : Récupérer toutes les opérations avec leurs blocks

```typescript
async function getAllOperationsWithBlocks(orderNo: string) {
  const client = getIFSClient()
  
  try {
    const response = await client.get(
      'OperationBlockHandling.svc/Reference_ShopOrderOperation',
      {
        '$filter': `OrderNo eq '${orderNo}'`,
        '$select': 'OperationNo,OperationBlockId,OperationDescription,WorkCenterNo',
        '$orderby': 'OperationNo asc'
      }
    )
    
    if (!response.value || response.value.length === 0) {
      console.warn(`⚠️ No operations found for Shop Order: ${orderNo}`)
      return []
    }
    
    // Mapper et nettoyer les données
    const operations = response.value.map((op: any) => ({
      operationNo: op.OperationNo,
      blockId: op.OperationBlockId || null,
      description: op.OperationDescription || '',
      workCenter: op.WorkCenterNo || ''
    }))
    
    console.log(`✅ Found ${operations.length} operations for ${orderNo}`)
    
    return operations
    
  } catch (error) {
    console.error('❌ Error fetching operations:', error)
    throw error
  }
}
```

---

## ⚠️ Points d'attention

### 1. Nom du champ : OperationBlockId (pas BlockId)

```typescript
// ❌ ÉCHEC : Mauvais nom de champ
{
  '$select': 'OrderNo,OperationNo,BlockId'
}
// → Erreur: property 'BlockId' not defined in type 'ShopOrderOperation'

// ✅ SUCCÈS : Bon nom de champ
{
  '$select': 'OrderNo,OperationNo,OperationBlockId'
}
```

### 2. OperationBlockId peut être null

C'est une **valeur valide** et fréquente. L'opération 10 (OP10) a souvent `OperationBlockId = null`.

```typescript
// ✅ Gérer les valeurs nulles
const blockId = operation.OperationBlockId || null

// ✅ Vérifier avant utilisation
if (blockId) {
  console.log(`Block ID: ${blockId}`)
} else {
  console.log('No Block ID assigned')
}
```

### 3. Filtrage par OrderNo obligatoire

Sans filtre, l'endpoint retourne **trop de résultats** → timeout possible.

```typescript
// ❌ DÉCONSEILLÉ : Sans filtre
await client.get('OperationBlockHandling.svc/Reference_ShopOrderOperation')
// → Peut retourner des milliers d'opérations

// ✅ RECOMMANDÉ : Toujours filtrer par OrderNo
await client.get(
  'OperationBlockHandling.svc/Reference_ShopOrderOperation',
  { '$filter': "OrderNo eq '454853'" }
)
```

### 4. ReleaseNo et SequenceNo sont souvent '*'

Pour la plupart des Shop Orders :
- `ReleaseNo = '*'`
- `SequenceNo = '*'`

Mais ils font partie de la clé composite du Shop Order dans IFS.

---

## 📊 Codes d'erreur courants

| Code | Erreur | Cause | Solution |
|------|--------|-------|----------|
| 400 | Invalid property | Nom de champ incorrect | Utiliser `OperationBlockId` (pas `BlockId`) |
| 404 | Not Found | OrderNo inexistant | Vérifier le numéro de Shop Order |
| 500 | Timeout | Requête sans filtre | Toujours filtrer par OrderNo |
| 200 + empty array | Aucune opération | Shop Order sans opérations | Vérifier l'état du Shop Order |

---

## 🔍 Tests validés

### Test 1 : Toutes les opérations du Shop Order 454853

```bash
GET /Reference_ShopOrderOperation?$filter=OrderNo eq '454853'

✅ Résultat : 4 opérations retournées
- OP10 : OperationBlockId = null, Description = "CL"
- OP20 : OperationBlockId = "BLOCK_A25"
- OP30 : OperationBlockId = "BLOCK_A25"
- OP40 : OperationBlockId = "BLOCK_B12"
```

### Test 2 : Opération 10 uniquement

```bash
GET /Reference_ShopOrderOperation?$filter=OrderNo eq '454853' and OperationNo eq 10

✅ Résultat : 1 opération retournée
{
  "OrderNo": "454853",
  "ReleaseNo": "*",
  "SequenceNo": "*",
  "OperationNo": 10,
  "OperationBlockId": null,
  "OperationDescription": "CL",
  "WorkCenterNo": "W4X09"
}
```

---

## 📚 Références

### Documentation IFS

- [Operation Block Handling Projection API](https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1/OperationBlockHandling.svc/$metadata)
- [IFS Cloud Shop Order Operations Documentation](https://docs.ifs.com/cloud/)

### Documentation projet

- [Part Printer Roadmap](../../tools/part-printer/ROADMAP.md)
- [Part Printer Operations Implementation](../../tools/part-printer/implementation/operations.md)
- [Shop Order Handling API](../shop-order/)

---

## 🧪 Script de test

Un script de test est disponible pour valider l'endpoint :

```bash
cd /home/rbottero/ManufacturingPortal

# Tester avec le Shop Order 454853
IFS_BASE_URL="..." \
IFS_CLIENT_ID="..." \
IFS_CLIENT_SECRET="..." \
IFS_TOKEN_URL="..." \
IFS_SCOPE="..." \
npx tsx scripts/test-operation-block-endpoint.ts
```

**Fichier** : `/scripts/test-operation-block-endpoint.ts`

---

**Dernière mise à jour** : 14 octobre 2025  
**Testé avec** : IFS Cloud AST (Beneteau Dev)  
**Validé par** : Implémentation Part Printer Phase 3  
**Shop Order de test** : 454853 (4 opérations trouvées)
