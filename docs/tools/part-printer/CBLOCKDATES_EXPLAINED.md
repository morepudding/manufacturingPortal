# 📅 Explication : CBlockDates (Block Date)

## 🤔 C'est quoi CBlockDates ?

**CBlockDates** est un **champ booléen IFS** (true/false) qui indique si un Shop Order est **bloqué sur une date de production précise**.

### Valeurs possibles

| Valeur | Signification | Usage |
|--------|---------------|-------|
| **true** | 🔒 **Date bloquée** | Le Shop Order DOIT être produit à la date `RevisedStartDate` exacte |
| **false** | 🔓 **Date flexible** | Le Shop Order peut être produit à n'importe quelle date |

---

## 🎯 Pourquoi c'est important pour Part Printer ?

### Cas d'usage 1 : Débit classique (Production normale)

**Filtre** : `CBlockDates = true` + Date exacte

```typescript
// Recherche uniquement les pièces à produire AUJOURD'HUI
{
  site: 'FR017',
  startDate: '2025-10-17',  // Date exacte
  blockDate: true,           // ✅ CBlockDates = true
  operationBlockIdFilter: 'empty'
}
```

**Résultat** :
- ✅ Shop Order 99500 : RevisedStartDate = 2025-10-17, CBlockDates = true → **INCLUS**
- ❌ Shop Order 99501 : RevisedStartDate = 2025-10-18, CBlockDates = true → **EXCLU** (date différente)
- ❌ Shop Order 99502 : RevisedStartDate = 2025-10-17, CBlockDates = false → **EXCLU** (non bloqué)

### Cas d'usage 2 : Redébit (Re-découpe / Rattrapage)

**Filtre** : `CBlockDates = false` (ou pas de filtre)

```typescript
// Recherche toutes les pièces, peu importe la date
{
  site: 'FR017',
  startDate: '2025-10-17',
  blockDate: false,          // ❌ Pas de filtre sur CBlockDates
  operationBlockIdFilter: 'all'
}
```

**Résultat** :
- ✅ Shop Order 99500 : RevisedStartDate = 2025-10-17, CBlockDates = true → **INCLUS**
- ✅ Shop Order 99501 : RevisedStartDate = 2025-10-18, CBlockDates = true → **INCLUS** (date ignorée)
- ✅ Shop Order 99502 : RevisedStartDate = 2025-10-17, CBlockDates = false → **INCLUS**

---

## 📊 Matrice de filtrage complète

| Block Date | OperationBlockId | Comportement | Cas d'usage |
|------------|------------------|--------------|-------------|
| ✅ true | empty | Date exacte + CBlockDates=true + Block ID vide | **Débit classique** (production du jour) |
| ✅ true | not-empty | Date exacte + CBlockDates=true + Block ID non-vide | Débit avec pièces bloquées |
| ✅ true | all | Date exacte + CBlockDates=true | Débit (tous Block IDs) |
| ❌ false | empty | Date exacte + Block ID vide | Toutes dates (non bloquées) |
| ❌ false | not-empty | Date exacte + Block ID non-vide | Toutes dates (bloquées) |
| ❌ false | all | Date exacte uniquement | **Redébit** (rattrapage) |

---

## 💡 Exemples concrets

### Exemple 1 : Production du 17 octobre (Débit classique)

**Contexte** : L'opérateur veut imprimer les étiquettes pour la production d'aujourd'hui uniquement.

**Filtres** :
```typescript
{
  site: 'FR017',
  startDate: '2025-10-17',
  blockDate: true,               // ✅ Filtre CBlockDates = true
  operationBlockIdFilter: 'empty'
}
```

**SQL équivalent** :
```sql
SELECT * FROM ShopOrds
WHERE Contract = 'FR017'
  AND RevisedStartDate = '2025-10-17'
  AND CBlockDates = true           -- ⭐ Ligne clé
  AND Objstate = 'Released'
  -- + Filtrage OP10 Block ID vide côté code
```

### Exemple 2 : Redébit (Rattrapage de pièces manquées)

**Contexte** : Une pièce a été ratée hier, on doit la re-découper aujourd'hui.

**Filtres** :
```typescript
{
  site: 'FR017',
  startDate: '2025-10-16',       // Date d'origine de la pièce
  blockDate: false,              // ❌ Ignore CBlockDates
  operationBlockIdFilter: 'all'
}
```

**SQL équivalent** :
```sql
SELECT * FROM ShopOrds
WHERE Contract = 'FR017'
  AND RevisedStartDate = '2025-10-16'
  AND Objstate = 'Released'
  -- Pas de filtre sur CBlockDates     -- ⭐ Ligne clé
```

---

## 🔍 Comment vérifier CBlockDates dans IFS ?

### Via OData API

```typescript
const response = await client.get(
  'ShopOrderHandling.svc/ShopOrds',
  {
    $filter: "Contract eq 'FR017'",
    $select: 'OrderNo,RevisedStartDate,CBlockDates',
    $top: '10'
  }
)

// Résultat exemple:
// [
//   { OrderNo: '99500', RevisedStartDate: '2025-10-17T00:00:00', CBlockDates: true },
//   { OrderNo: '99501', RevisedStartDate: '2025-10-18T00:00:00', CBlockDates: true },
//   { OrderNo: '99502', RevisedStartDate: '2025-10-17T00:00:00', CBlockDates: false }
// ]
```

### Via IFS Cloud UI

1. Aller dans **Manufacturing** > **Shop Order**
2. Rechercher un Shop Order (ex: 99500)
3. Onglet **Dates**
4. Chercher le champ **"Block Dates"** ou **"CBlockDates"**
   - ✅ Coché = true (date bloquée)
   - ❌ Décoché = false (date flexible)

---

## 🚨 Erreurs courantes

### ❌ Erreur 1 : Oublier le filtre CBlockDates en débit classique

```typescript
// ❌ MAUVAIS - Trop de résultats
{
  site: 'FR017',
  startDate: '2025-10-17',
  blockDate: false,  // ⚠️ Pas de filtre CBlockDates
}
// Résultat: 500 Shop Orders (toutes dates)
```

```typescript
// ✅ BON - Résultats précis
{
  site: 'FR017',
  startDate: '2025-10-17',
  blockDate: true,   // ✅ Filtre CBlockDates = true
}
// Résultat: 50 Shop Orders (date exacte uniquement)
```

### ❌ Erreur 2 : Utiliser CBlockDates en redébit

```typescript
// ❌ MAUVAIS - Trop restrictif
{
  site: 'FR017',
  startDate: '2025-10-16',
  blockDate: true,   // ⚠️ Bloque sur la date
}
// Résultat: Seulement les pièces du 16 octobre (rate les pièces à rattraper)
```

```typescript
// ✅ BON - Flexible
{
  site: 'FR017',
  startDate: '2025-10-16',
  blockDate: false,  // ✅ Ignore CBlockDates
}
// Résultat: Toutes les pièces du 16 octobre (incluant celles à rattraper)
```

---

## 📖 Origine du nom "CBlockDates"

**C** = Probablement un préfixe IFS (Convention, Custom, ou Contract)  
**Block** = Bloque/Fige  
**Dates** = Les dates de production

→ **"Bloquer les dates de production"**

---

## ✅ En résumé

| Concept | Explication simple |
|---------|-------------------|
| **CBlockDates = true** | 🔒 "Cette pièce DOIT être produite exactement à la date prévue" |
| **CBlockDates = false** | 🔓 "Cette pièce peut être produite n'importe quand" |
| **Block Date checkbox ✅** | Filtre actif : Recherche uniquement les pièces avec CBlockDates = true |
| **Block Date checkbox ❌** | Filtre inactif : Accepte toutes les pièces (CBlockDates true ou false) |

**Conseil** : En production normale, **toujours activer Block Date** pour ne produire que les pièces du jour !

---

**Document créé le** : 17 octobre 2025  
**Version** : 1.0  
**Auteur** : Manufacturing Portal Team
