# 📊 Analyse Relations : Shop Order → Serial Number → DOP Header

**Date d'analyse** : 09 octobre 2025  
**Environnement** : AST (DEV)  
**API** : IFS Cloud OData v1 - ShopOrderHandling.svc  
**Échantillon** : 50 Shop Orders

---

## 🎯 Objectif

Identifier les champs disponibles dans l'API Shop Order et déterminer comment établir la relation entre :
- **Shop Order** (3 clés : OrderNo, ReleaseNo, SequenceNo)
- **Serial Number** (numéro de série du bateau)
- **DOP Header ID** (identifiant de commande de fabrication)

---

## 📋 Résumé Exécutif

| Critère | Résultat | Status |
|---------|----------|--------|
| **Shop Orders analysés** | 50 | ✅ |
| **Champs disponibles** | 240 | ✅ |
| **Champs DOP trouvés** | 4 | ⚠️ |
| **Champs Serial trouvés** | 4 | ⚠️ |
| **Shop Orders avec DopId** | 0/50 | ❌ |
| **Shop Orders avec Serial** | 0/50 | ❌ |

---

## 🔍 Champs Clés Identifiés

### 1️⃣ Champs DOP Header

| Champ | Type | Valeur AST | Usage |
|-------|------|------------|-------|
| **`DopId`** | string/null | `null` (100%) | **🎯 CHAMP CLÉ** Shop Order → DOP |
| `DopDemandExists` | string | `"FALSE"` | Indicateur demande DOP |
| `PlannedOpScrap` | number | `0` | Rebut planifié |
| `ShippedOperationsExist` | boolean | `false` | Opérations expédiées |

**Constat critique** :
- ✅ Le champ `DopId` existe dans la structure
- ❌ Systématiquement `null` dans l'environnement AST
- ✅ En production, devrait contenir l'ID du DOP Header
- ✅ C'est le **lien direct** Shop Order → DOP

---

### 2️⃣ Champs Serial Number

| Champ | Type | Valeur AST | Usage |
|-------|------|------------|-------|
| `SerialBegin` | string | `"*"` (100%) | Début de plage série |
| `SerialEnd` | string | `"*"` (100%) | Fin de plage série |
| `SerialRule` | string | `"MANUAL"` | Règle génération |
| `MroTopPartSerialNo` | string/null | `null` | Serial MRO (maintenance) |

**Constat** :
- ✅ Champs existent
- ❌ `SerialBegin`/`SerialEnd` = `"*"` (wildcard)
- ❌ Pas de numéro de série réel dans Shop Order
- ✅ Serial réel dans DOP Header via `Reference_DopHeadSerialReserv`

---

## 🏗️ Architecture de Relation

### Workflow Théorique (IFS Standard)

```
Shop Order
├─> DopId (ex: "95", "54 - 1035")
└─> DOP Header (DopHeaderHandling.svc)
    ├─> Reference_DopHeadSerialReserv
    └─> Serial Number (ex: "LG5MA0114")
```

### Workflow AST (Environnement Dev)

```
Shop Order
├─> DopId = null ❌
├─> SerialBegin = "*" ❌
└─> CustomerOrderNo = null ❌
```

**Impact** : Impossible de tester le workflow complet en AST. Nécessite validation en PROD.

---

## ⚠️ Problématiques Identifiées

### 1. DopId systématiquement null

**Observation** : 0/50 Shop Orders avec `DopId` renseigné

**Causes possibles** :
1. ❌ Environnement AST : données incomplètes/anciennes
2. ❌ Type `InventOrder` (stock) : pas de DOP créé
3. ❌ Processus métier : DOP uniquement pour commandes clients BAT
4. ✅ Besoin de tester en PROD avec données réelles

---

### 2. DopId composite en production

**Format observé en PROD** :
```
"54 - 1035"  → DOP ID principal = "54"
"95 - 10088" → DOP ID principal = "95"
```

**Solution** : Parser avant requête DOP Header

```typescript
function extractMainDopId(dopId: string | null): string | null {
  if (!dopId) return null
  if (dopId.includes(' - ')) {
    return dopId.split(' - ')[0].trim()
  }
  return dopId.trim()
}
```

---

## ✅ Solution Recommandée

### Workflow Standard (PROD)

```typescript
// 1. Récupérer Shop Order
const shopOrder = await searchShopOrder({
  orderNo: "97277",
  releaseNo: "*",
  sequenceNo: "*"
})

// 2. Extraire DOP ID principal
const dopId = extractMainDopId(shopOrder.DopId)  // "95 - 10088" → "95"

if (!dopId) {
  return { serialNumber: null, needsProduction: true }
}

// 3. Récupérer Serial Number via DOP
const serialResponse = await ifsClient.get(
  'DopHeaderHandling.svc/Reference_DopHeadSerialReserv',
  {
    '$filter': `DopId eq '${dopId}'`,
    '$select': 'SerialNo',
    '$top': '1'
  }
)

const serialNumber = serialResponse.value[0]?.SerialNo

return {
  orderNo: shopOrder.OrderNo,
  dopHeaderId: dopId,
  serialNumber  // "LG5MA0114"
}
```

---

## 🧪 Cas de Test Validés (PROD)

| Order No | DOP ID Brut | DOP Principal | Serial Number | Status |
|----------|-------------|---------------|---------------|--------|
| 563 | 34 - 1014 | **34** | JY6MB0019 | ✅ |
| 949 | 48 - 10102 | **48** | LX6MA0116 | ✅ |
| 97277 | 95 - 10088 | **95** | LG5MA0114 | ✅ |
| 1043 | 54 - 1035 | **54** | LX6MA0115 | ✅ |

---

## 📚 Références

- [Shop Order API](../shop-order/)
- [DOP Header API](../dop-header/)
- [Serial Number API](../serial-number/)
- Script d'analyse : `src/testscript/analyze-shoporder-fields.js`

---

**Dernière mise à jour** : 13 octobre 2025  
**Statut** : ✅ Workflow validé en PROD
