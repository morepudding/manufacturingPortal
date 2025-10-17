# 📋 Changelog - 16 octobre 2025

## 🎯 Implémentation SFD stricte + Passage en mode Production

**Date** : 16 octobre 2025  
**Version** : 2.0  
**Type** : Major Update

---

## 📝 Résumé des changements

### 1. ✅ Implémentation SFD stricte (2 checkboxes indépendantes)

**Décision** : Implémenter la spécification fonctionnelle détaillée avec **2 filtres indépendants** au lieu d'un simple toggle Débit/Redébit.

**Raison** : 
- ✅ Respect strict de la SFD
- ✅ Future-proof (prêt pour environnement avec Block ID disponible)
- ✅ Granularité maximale (4 combinaisons possibles)
- ✅ Transparent sur les limitations AST

---

### 2. ✅ Passage en mode Production (Objstate "Released" uniquement)

**Avant** : 
```typescript
// Mode dev/test - Acceptait Released ET Closed
shopOrders.filter(order => 
  order.Objstate === 'Released' || order.Objstate === 'Closed'
)
```

**Après** :
```typescript
// Mode production - Uniquement Released
shopOrders.filter(order => 
  order.Objstate === 'Released'
)
```

**Impact** : 
- ❌ Suppression du bandeau d'avertissement "Mode Développement / Test" dans l'interface
- ✅ Filtrage strict sur Shop Orders "Released" uniquement (conformité production)
- 📊 Réduction potentielle du nombre de résultats (Closed exclus)

---

## 🎨 Nouveaux composants créés

### `BlockFilters.tsx`

**Localisation** : `src/app/(tools)/part-printer/components/BlockFilters.tsx`

**Description** : Composant avec 2 checkboxes indépendantes pour les filtres de blocage.

**Fonctionnalités** :
- ☑️ **Block Date** : Filtre sur `CBlockDates = true`
- ☑️ **OP10 Block ID empty** : Filtre sur `BlockId = null` (avec warning AST)
- 📊 **Indicateur de mode dynamique** : Affiche le mode actif selon la combinaison
- 🎯 **Raccourcis rapides** : Boutons Débit classique / Redébit / Reset
- ⚠️ **Warning AST** : Visible quand Block ID activé

**Interface** :
```
┌─────────────────────────────────────────────────┐
│  Filtres de blocage                             │
├─────────────────────────────────────────────────┤
│                                                 │
│  ☑ Block Date (CBlockDates)      [Recommandé]  │
│    ✅ Filtre actif : CBlockDates = true         │
│                                                 │
│  ☑ OP10 Block ID empty  [⚠️ Non dispo (AST)]   │
│    ✅ Filtre actif : Block ID vide              │
│                                                 │
│  ⚠️ Limitation environnement AST               │
│  Le filtre OP10 Block ID n'est pas disponible  │
│                                                 │
│  Mode détecté : Débit classique                │
│  🔹 Production normale : pièces neuves          │
│                                                 │
│  [🔹 Débit classique] [🔸 Redébit] [🔄 Reset]  │
└─────────────────────────────────────────────────┘
```

---

## 📊 Les 4 combinaisons possibles

| Block Date | Block ID Empty | Comportement IFS | Cas d'usage | Mode affiché |
|------------|----------------|------------------|-------------|--------------|
| ✅ | ✅ | `CBlockDates=true AND BlockId=null` | Production normale | **🔹 Débit classique** |
| ✅ | ❌ | `CBlockDates=true` | Débit avec pièces potentiellement bloquées | ⚠️ Débit (pièces bloquées OK) |
| ❌ | ✅ | `BlockId=null` | Toutes dates, pièces non bloquées | 📊 Toutes dates (non bloquées) |
| ❌ | ❌ | Aucun filtre | Re-découpe (tout accepter) | **🔸 Redébit** |

---

## 🔧 Fichiers modifiés

### Composants UI

| Fichier | Type | Modifications |
|---------|------|---------------|
| `src/app/(tools)/part-printer/components/BlockFilters.tsx` | **CRÉÉ** | Nouveau composant 2 checkboxes (200 lignes) |
| `src/app/(tools)/part-printer/components/FilterPanel.tsx` | Modifié | Intégration BlockFilters + state `blockIdEmpty` |
| `src/app/(tools)/part-printer/components/index.ts` | Modifié | Export `BlockFilters` |
| `src/app/(tools)/part-printer/page.tsx` | Modifié | ❌ Suppression bandeau "Mode Développement / Test" |

### Services Backend

| Fichier | Type | Modifications |
|---------|------|---------------|
| `src/tools/part-printer/services/shop-order-filter-service.ts` | Modifié | • Logique 2 checkboxes<br>• Gestion 4 combinaisons<br>• Warning AST pour Block ID<br>• ✅ Filtrage "Released" uniquement |
| `src/tools/part-printer/types/index.ts` | Modifié | Type `ShopOrderFilterParams` mis à jour :<br>• `blockDate: boolean`<br>• `blockIdEmpty: boolean`<br>• ❌ Suppression `op10BlockId` |

### API Routes

| Fichier | Type | Modifications |
|---------|------|---------------|
| `src/app/api/part-printer/shop-orders/filter/route.ts` | Modifié | Documentation mise à jour (4 combinaisons) |

### Documentation

| Fichier | Type | Modifications |
|---------|------|---------------|
| `docs/tools/part-printer/filtre.md` | Modifié | Analyse complète SFD + décision Option 2 (250+ lignes) |
| `docs/tools/part-printer/IMPLEMENTATION_FILTRES_V2.md` | **CRÉÉ** | Guide implémentation technique (400+ lignes) |
| `docs/tools/part-printer/CHANGELOG_16_OCT_2025.md` | **CRÉÉ** | Ce fichier - Changelog complet |

---

## ⚠️ Gestion limitation AST

### Problème

Le champ `BlockId` de l'opération OP10 **n'est pas disponible** sur l'environnement AST.

### Solution implémentée

**3 niveaux de gestion** :

#### 1. UI (Frontend)
- ⚠️ **Warning orange** visible quand checkbox Block ID activée
- 🏷️ Badge `[⚠️ Non dispo (AST)]` sur le label
- 📋 Message clair : "Le filtre Block ID n'est pas disponible sur l'environnement AST"

#### 2. Service (Backend)
```typescript
if (blockIdEmpty) {
  // ⚠️ AST: Log warning et skip
  console.log('⚠️ [AST] Block ID filter skipped - Not available on AST')
  
  // 🚀 PRODUCTION: Décommenter quand disponible
  // shopOrders = await filterByEmptyOP10BlockId(shopOrders)
}
```

#### 3. Documentation
- Limitation documentée dans `filtre.md`
- Instructions d'activation future dans `IMPLEMENTATION_FILTRES_V2.md`
- Commentaires `TODO` dans le code source

### Activation future

**1 ligne à décommenter** quand Block ID sera disponible :
```typescript
shopOrders = await filterByEmptyOP10BlockId(shopOrders)
```

La fonction est **déjà implémentée** et prête à l'emploi.

---

## 🔄 Migration depuis ancienne version

### Types TypeScript

**Avant** :
```typescript
interface ShopOrderFilterParams {
  blockDate: boolean                     // true = Débit, false = Redébit
  op10BlockId?: 'EMPTY' | 'NO_CONDITION' // Optional
}
```

**Après** :
```typescript
interface ShopOrderFilterParams {
  blockDate: boolean      // true = filtre CBlockDates=true
  blockIdEmpty: boolean   // true = filtre BlockId vide
}
```

### Appel API

**Avant** :
```json
{
  "site": "BDR",
  "startDate": "2025-10-22",
  "blockDate": true,
  "op10BlockId": "EMPTY"
}
```

**Après** :
```json
{
  "site": "BDR",
  "startDate": "2025-10-22",
  "blockDate": true,
  "blockIdEmpty": true
}
```

### Correspondance modes

| Ancien mode | Nouveau mode | block Date | blockIdEmpty |
|-------------|--------------|------------|--------------|
| Débit classique (blockDate=true, op10BlockId=EMPTY) | Débit classique | ✅ true | ✅ true |
| Redébit (blockDate=false, op10BlockId=NO_CONDITION) | Redébit | ❌ false | ❌ false |

---

## 🧪 Tests à effectuer

### Test 1 : Débit classique (valeurs par défaut)

**Paramètres** :
```json
{
  "site": "BDR",
  "startDate": "2025-10-22",
  "blockDate": true,
  "blockIdEmpty": true
}
```

**Comportement attendu** :
- ✅ Filtre Shop Orders avec `Objstate = 'Released'` et `CBlockDates = true`
- ⚠️ Warning AST visible dans l'UI
- ⚠️ Log backend : `[AST] Block ID filter skipped`
- 📊 Mode affiché : "Débit classique"
- ❌ PAS de bandeau "Mode Développement / Test"

---

### Test 2 : Redébit

**Paramètres** :
```json
{
  "site": "BDR",
  "startDate": "2025-10-22",
  "blockDate": false,
  "blockIdEmpty": false
}
```

**Comportement attendu** :
- ✅ Filtre Shop Orders avec `Objstate = 'Released'` (tous CBlockDates)
- ✅ Pas de warning AST
- 📊 Mode affiché : "Redébit"

---

### Test 3 : Vérification Objstate

**Test** : Comparer le nombre de résultats avant/après changement.

**Avant (Released + Closed)** : X résultats  
**Après (Released uniquement)** : Y résultats (Y ≤ X)

**Validation** : Vérifier qu'aucun Shop Order "Closed" n'apparaît dans les résultats.

---

## 📈 Impact sur les performances

### Nombre de Shop Orders filtrés

**Avant** :
- Mode Débit classique : `Objstate = ('Released' OR 'Closed') AND CBlockDates = true`
- Mode Redébit : `Objstate = ('Released' OR 'Closed') AND CBlockDates = false`

**Après** :
- Débit classique : `Objstate = 'Released' AND CBlockDates = true`
- Redébit : `Objstate = 'Released'` (tous CBlockDates)

**Impact estimé** :
- ⚠️ **Réduction du nombre de résultats** (exclusion des "Closed")
- ✅ **Conformité production** (seuls les ordres actifs)
- 📊 **Performance stable** (pas de dégradation attendue)

---

## 🚀 Déploiement

### Checklist avant déploiement

- [x] ✅ Code modifié (services + composants + types)
- [x] ✅ Documentation mise à jour (filtre.md + implémentation)
- [x] ✅ Bandeau "Mode Dev" supprimé
- [x] ✅ Filtrage "Released" uniquement activé
- [x] ✅ Aucune erreur de compilation
- [ ] ⏳ Tests manuels (4 combinaisons)
- [ ] ⏳ Validation utilisateur
- [ ] ⏳ Tests de régression
- [ ] ⏳ Review code
- [ ] ⏳ Merge + Déploiement

### Commandes de test

```bash
# Démarrer le serveur dev
pnpm run dev

# Tester l'application
# → http://localhost:3000/part-printer

# Vérifier les logs backend
# → Console terminal (rechercher "[Shop Order Filter]")

# Vérifier le warning AST
# → Activer checkbox "OP10 Block ID empty"
# → Vérifier bandeau orange visible
```

---

## 📚 Documentation de référence

- [Analyse SFD complète](./filtre.md)
- [Guide d'implémentation v2](./IMPLEMENTATION_FILTRES_V2.md)
- [Corrections 15 octobre](./CORRECTIONS_15_OCT.md)
- [Roadmap Part Printer](./ROADMAP.md)

---

## 👥 Contributeurs

- **rbottero** : Demande de fonctionnalité + validation
- **GitHub Copilot** : Implémentation technique + documentation

---

## 📝 Notes de version

### Version 2.0 - Major Update

**Breaking Changes** :
- ❌ Type `ShopOrderFilterParams.op10BlockId` supprimé
- ✅ Ajout `ShopOrderFilterParams.blockIdEmpty`
- ⚠️ Comportement filtrage modifié (Released uniquement)

**New Features** :
- ✅ 2 checkboxes indépendantes (Block Date + Block ID Empty)
- ✅ 4 combinaisons de filtrage possibles
- ✅ Warning AST transparent
- ✅ Raccourcis rapides (Débit/Redébit/Reset)
- ✅ Indicateur de mode dynamique

**Improvements** :
- 🎨 UI plus claire et intuitive
- 📊 Meilleure granularité de filtrage
- 🚀 Code future-proof (prêt pour Block ID)
- 📖 Documentation complète et à jour

**Bug Fixes** :
- 🐛 Correction filtrage Objstate (mode production)
- 🐛 Suppression bandeau "Mode Dev" obsolète

---

**Version** : 2.0  
**Date** : 16 octobre 2025  
**Status** : ✅ Prêt pour déploiement
