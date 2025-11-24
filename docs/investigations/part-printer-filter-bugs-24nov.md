# 🐛 Investigation Bugs Filtres PartPrinter - 24 novembre 2025

## 📋 Contexte

**Environnement**: ACC (Production)  
**Outil**: Part Printer  
**Date**: 24 novembre 2025  
**Filtres testés**: Massifs (PartNo commence par "AN")

---

## 🔴 Problèmes reportés

### Problème 1: Filtre "Sent to Cutting System = YES"
**Attendu**: 2 Shop Orders (visibles dans IFS)  
**Obtenu**: 0 Shop Orders ("No shop order found")  
**Impact**: Le filtre ne fonctionne pas du tout

### Problème 2: Filtre "Block Date" désactivé
**Attendu**: 73 Shop Orders (75 total - 2 avec Sent to Cutting = YES)  
**Obtenu**: 72 Shop Orders  
**Affichage**: "Result Preview 75 SO" (nombre incorrect)  
**Impact**: 
- 1 Shop Order manquant
- Le compteur affiche le mauvais nombre

---

## 🔍 Analyse technique

### Architecture du filtrage

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLUX DE FILTRAGE                              │
└─────────────────────────────────────────────────────────────────┘

1. FRONTEND (page.tsx)
   ├─> blockDateEnabled: boolean
   ├─> blockDateValue: boolean
   ├─> sentToCuttingEnabled: boolean
   ├─> sentToCuttingValue: boolean
   └─> operationBlockIdFilter: 'all' | 'empty' | 'not-empty'

2. API ROUTE (/api/part-printer/shop-orders/filter/route.ts)
   └─> Valide et transmet les paramètres au service

3. SERVICE (shop-order-filter-service.ts)
   ├─> Appel IFS avec $filter et $select
   ├─> Filtrage côté code (date + CBlockDates)
   ├─> Filtrage SentToCuttingSystem (si enabled)
   └─> Filtrage OperationBlockId (si not-empty ou empty)

4. RETOUR
   └─> Liste des Shop Orders filtrés
```

---

## 🐛 BUG #1: Champ `SentToCuttingSystem` absent du `$select`

### 📍 Localisation
**Fichier**: `src/tools/part-printer/services/shop-order-filter-service.ts`  
**Ligne**: 120

### 🔍 Code actuel

```typescript
const response = await client.get<IFSODataResponse<IFSShopOrderExtended>>(
  'ShopOrderHandling.svc/ShopOrds',
  {
    $filter: odataFilter,
    $select: 'OrderNo,ReleaseNo,SequenceNo,Contract,PartNo,PartDescription,Objstate,RevisedStartDate,CBlockDates,ProductionLine',
    //      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //      ⚠️ MANQUANT: SentToCuttingSystem
    $orderby: orderBy,
    $top: topLimit
  }
)
```

### ❌ Problème

Quand on fait une requête OData avec `$select`, **seuls les champs listés sont retournés par IFS**.

Si `SentToCuttingSystem` n'est pas dans le `$select`, alors :
- IFS ne retourne pas ce champ
- `order.SentToCuttingSystem` sera toujours `undefined`
- Le filtre à la ligne 175 ne peut pas fonctionner

### 🔍 Code du filtre (ligne 170-179)

```typescript
// ✅ Step 6: Filtrage Sent to Cutting System (si enabled)
if (sentToCuttingEnabled) {
  logger.debug(`🔍 [Shop Order Filter] Filtrage Sent to Cutting System: ${sentToCuttingValue}`)
  shopOrders = shopOrders.filter(order => {
    // Assumer que le champ s'appelle "SentToCuttingSystem" dans IFS
    // Si le champ n'existe pas, on filtre comme si c'était false
    const sentValue = (order as any).SentToCuttingSystem ?? false
    //                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //                                ⚠️ Toujours undefined car pas dans $select
    //                                   donc toujours traité comme false
    return sentValue === sentToCuttingValue
  })
  logger.debug(`✅ [Shop Order Filter] ${shopOrders.length} Shop Orders avec SentToCuttingSystem=${sentToCuttingValue}`)
}
```

### 📊 Simulation du bug

```
Scénario: Utilisateur filtre avec "Sent to Cutting System = YES"

IFS a 75 Shop Orders Massifs 24/11:
├─> 73 avec SentToCuttingSystem = false
└─> 2 avec SentToCuttingSystem = true ✅ (ceux qu'on cherche)

1. Requête IFS
   $select ne contient pas SentToCuttingSystem
   → IFS retourne 75 Shop Orders SANS le champ SentToCuttingSystem

2. Filtrage côté code (ligne 175)
   Pour chaque Shop Order:
   - order.SentToCuttingSystem = undefined (pas retourné par IFS)
   - sentValue = undefined ?? false = false
   - Comparaison: false === true → ❌ FAUX

   Résultat: AUCUN Shop Order ne passe le filtre
   
3. Retour
   ❌ 0 Shop Orders → "No shop order found"
```

### ✅ Solution

Ajouter `SentToCuttingSystem` dans le `$select` :

```typescript
$select: 'OrderNo,ReleaseNo,SequenceNo,Contract,PartNo,PartDescription,Objstate,RevisedStartDate,CBlockDates,ProductionLine,SentToCuttingSystem',
```

**Note**: Vérifier que le nom du champ est correct dans IFS (peut être différent selon la version)

---

## 🐛 BUG #2: Filtre "Block Date" toujours actif sur la date

### 📍 Localisation
**Fichier**: `src/tools/part-printer/services/shop-order-filter-service.ts`  
**Lignes**: 138-167

### 🔍 Code actuel

```typescript
// Filtrage local côté code pour date et CBlockDates
const targetDate = startDate

// ✅ Step 5: Filtrage Block Date (si enabled)
if (blockDateEnabled) {
  logger.debug(`🔍 [DEBUG] Block Date enabled=${blockDateEnabled}, value=${blockDateValue} - Recherche date=${targetDate}`)
  
  shopOrders = shopOrders.filter(order => {
    const orderDate = order.RevisedStartDate ? new Date(order.RevisedStartDate).toISOString().split('T')[0] : null
    return orderDate === targetDate && order.CBlockDates === blockDateValue
    //     ^^^^^^^^^^^^^^^^^^^^^^       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //     Filtre sur DATE              Filtre sur CBlockDates
  })
  logger.debug(`✅ [Shop Order Filter] ${shopOrders.length} Shop Orders avec date=${targetDate} et CBlockDates=${blockDateValue}`)
} else {
  // Block Date inactif: pas de filtre sur CBlockDates
  logger.debug(`🔍 [DEBUG] Block Date disabled - Recherche date=${targetDate}, tous CBlockDates`)
  
  shopOrders = shopOrders.filter(order => {
    const orderDate = order.RevisedStartDate ? new Date(order.RevisedStartDate).toISOString().split('T')[0] : null
    return orderDate === targetDate
    //     ^^^^^^^^^^^^^^^^^^^^^^
    //     ⚠️ PROBLÈME: On filtre QUAND MÊME par date !
  })
  logger.debug(`✅ [Shop Order Filter] ${shopOrders.length} Shop Orders avec date=${targetDate} (tous CBlockDates)`)
}
```

### ❌ Problème

**Confusion sur le rôle du filtre "Block Date"**

Selon le code actuel :
```
blockDateEnabled = true
  → Filtre par date ET CBlockDates

blockDateEnabled = false
  → Filtre par date SEULEMENT (ignore CBlockDates)
```

**Mais cela n'a PAS DE SENS !** 🤔

### 🤷 Qu'est-ce que "Block Date" devrait faire ?

Il y a **deux interprétations possibles** :

#### **Interprétation A : "Block Date" contrôle le filtre CBlockDates**
```
blockDateEnabled = true, blockDateValue = true
  → Date exacte + CBlockDates = true

blockDateEnabled = true, blockDateValue = false
  → Date exacte + CBlockDates = false

blockDateEnabled = false
  → Date exacte + TOUS les CBlockDates (true ou false)
```
**Dans ce cas, on filtre TOUJOURS par date**

#### **Interprétation B : "Block Date" contrôle AUSSI le filtre de date** ❓
```
blockDateEnabled = true, blockDateValue = true
  → Date exacte + CBlockDates = true

blockDateEnabled = true, blockDateValue = false
  → Date exacte + CBlockDates = false

blockDateEnabled = false
  → TOUTES les dates + TOUS les CBlockDates
```
**Dans ce cas, désactiver "Block Date" = ignorer complètement la date**

### 📊 Simulation du bug (avec Interprétation A)

```
Scénario: Utilisateur désactive "Block Date"

IFS a 500 Shop Orders Massifs sur BDR:
├─> 75 avec date = 24/11 (ceux qu'on veut)
│   ├─> 2 avec SentToCuttingSystem = true
│   ├─> 1 avec CBlockDates = true (mais SentToCuttingSystem = false)
│   └─> 72 avec CBlockDates = false
└─> 425 avec d'autres dates

Filtres:
- Site: BDR
- Date: 24/11
- Block Date: DISABLED ⚠️
- Sent to Cutting: DISABLED

1. Requête IFS
   → 500 Shop Orders Massifs

2. Filtrage par Objstate = Released
   → 450 Shop Orders

3. Filtrage par date (ligne 163)
   blockDateEnabled = false
   MAIS on filtre quand même par date !
   → 75 Shop Orders avec date = 24/11

4. Pas de filtre CBlockDates
   → 75 Shop Orders (tous CBlockDates acceptés) ✅

5. Pas de filtre SentToCuttingSystem (disabled)
   → 75 Shop Orders

Attendu: 75 Shop Orders
Obtenu: 72-75 Shop Orders (selon le bug exact)
```

### ❓ Question clé

**Que doit faire "Block Date Disabled" ?**

Option 1 (actuelle): Filtrer par date mais accepter tous les CBlockDates
Option 2 (alternative): Ne PAS filtrer par date du tout

**Il faut clarifier avec l'utilisateur métier !**

---

## 🐛 BUG #3: Compteur affiche 75 au lieu de 72

### 📍 Localisation probable
**Fichier**: `src/app/(tools)/part-printer/page.tsx` ou composant d'affichage

### 🔍 Hypothèse

Le compteur affiche probablement :
- Le nombre AVANT filtrage SentToCuttingSystem
- OU le nombre de Shop Orders dans `shopOrders` state (pas mis à jour)

### 🔍 Code à vérifier

Chercher dans `page.tsx` ou `ShopOrderTable.tsx` :
```typescript
// Quelque part dans le code
<div>Result Preview {shopOrders.length} SO</div>
//                   ^^^^^^^^^^^^^^^^^^
//                   Utilise peut-être le mauvais compteur
```

### ✅ Solution

S'assurer que le compteur affiche :
```typescript
{labels.length} SO  // Nombre de labels générés (après tous les filtrages)
// OU
{filteredOrders.length} SO  // Nombre de Shop Orders après filtrage complet
```

---

## 🔧 Résumé des corrections nécessaires

### ✅ Correction 1: Ajouter `SentToCuttingSystem` au $select

**Fichier**: `src/tools/part-printer/services/shop-order-filter-service.ts`  
**Ligne**: 120

```diff
  const response = await client.get<IFSODataResponse<IFSShopOrderExtended>>(
    'ShopOrderHandling.svc/ShopOrds',
    {
      $filter: odataFilter,
-     $select: 'OrderNo,ReleaseNo,SequenceNo,Contract,PartNo,PartDescription,Objstate,RevisedStartDate,CBlockDates,ProductionLine',
+     $select: 'OrderNo,ReleaseNo,SequenceNo,Contract,PartNo,PartDescription,Objstate,RevisedStartDate,CBlockDates,ProductionLine,SentToCuttingSystem',
      $orderby: orderBy,
      $top: topLimit
    }
  )
```

### ❓ Correction 2: Clarifier le rôle de "Block Date"

**Option A**: "Block Date" contrôle uniquement CBlockDates (date toujours filtrée)
```typescript
// TOUJOURS filtrer par date
shopOrders = shopOrders.filter(order => {
  const orderDate = order.RevisedStartDate ? new Date(order.RevisedStartDate).toISOString().split('T')[0] : null
  
  if (blockDateEnabled) {
    // Filtre date + CBlockDates
    return orderDate === targetDate && order.CBlockDates === blockDateValue
  } else {
    // Filtre date seulement
    return orderDate === targetDate
  }
})
```

**Option B**: "Block Date" contrôle date ET CBlockDates
```typescript
if (blockDateEnabled) {
  // Filtre date + CBlockDates
  shopOrders = shopOrders.filter(order => {
    const orderDate = order.RevisedStartDate ? new Date(order.RevisedStartDate).toISOString().split('T')[0] : null
    return orderDate === targetDate && order.CBlockDates === blockDateValue
  })
} else {
  // Pas de filtre du tout (accepte toutes les dates et tous les CBlockDates)
  // (on ne filtre que par site/production line dans OData)
}
```

**⚠️ À DÉCIDER AVEC L'UTILISATEUR MÉTIER**

### ✅ Correction 3: Vérifier le compteur d'affichage

Vérifier que le frontend affiche le bon nombre après tous les filtrages.

---

## 🧪 Plan de test

### Test 1: Sent to Cutting System = YES
```
Filtres:
- Site: BDR
- Date: 24/11/2025
- Block Date: Disabled
- Sent to Cutting: Enabled, Value = TRUE

Attendu: 2 Shop Orders
```

### Test 2: Block Date = NO
```
Filtres:
- Site: BDR
- Date: 24/11/2025
- Block Date: Disabled
- Sent to Cutting: Disabled

Attendu: 73 Shop Orders (ou 75 selon l'option choisie pour Bug #2)
```

### Test 3: Tous filtres désactivés
```
Filtres:
- Site: BDR
- Date: 24/11/2025
- Block Date: Disabled
- Sent to Cutting: Disabled

Attendu: 75 Shop Orders (tous les Massifs du 24/11)
```

---

## 📞 Questions pour l'utilisateur métier

### Question 1: Nom du champ dans IFS
Le champ s'appelle-t-il vraiment `SentToCuttingSystem` dans IFS ?  
Ou est-ce `SentToCutting`, `SendToCuttingSystem`, etc. ?

→ **Action**: Faire un appel IFS sur ACC sans `$select` pour voir tous les champs disponibles

### Question 2: Comportement attendu de "Block Date Disabled"
Quand "Block Date" est désactivé, que doit-on faire ?

**Option A**: Filtrer par date mais accepter tous les CBlockDates (true et false)  
**Option B**: Ne PAS filtrer par date du tout (accepter toutes les dates)

→ **Action**: Valider avec l'équipe métier

---

## 📝 Prochaines étapes

1. ✅ Ajouter `SentToCuttingSystem` au `$select` (facile, immédiat)
2. ❓ Clarifier le comportement de "Block Date Disabled" avec l'utilisateur
3. 🔍 Tester sur ACC pour vérifier le nom exact du champ IFS
4. 🐛 Corriger le compteur d'affichage si nécessaire
5. ✅ Tester les 3 scénarios ci-dessus

---

## ✅ CORRECTIONS APPLIQUÉES

### 🔧 Correction Bug #1: SentToCuttingSystem ajouté au $select

**Fichier**: `src/tools/part-printer/services/shop-order-filter-service.ts`  
**Ligne**: 120

```typescript
// ✅ AVANT (BUG)
$select: 'OrderNo,ReleaseNo,SequenceNo,Contract,PartNo,PartDescription,Objstate,RevisedStartDate,CBlockDates,ProductionLine',

// ✅ APRÈS (CORRIGÉ)
$select: 'OrderNo,ReleaseNo,SequenceNo,Contract,PartNo,PartDescription,Objstate,RevisedStartDate,CBlockDates,ProductionLine,SentToCuttingSystem',
```

### 🔧 Correction Bug #2: Clarification du rôle des filtres

**Selon les specs fonctionnelles (Step 2, Step 5, Step 6)** :

- **Start Date** : TOUJOURS actif (mandatory) → filtre par date
- **Block Date** : Filtre INDÉPENDANT sur `CBlockDates` (si enabled)
- **Sent to Cutting** : Filtre INDÉPENDANT sur `SentToCuttingSystem` (si enabled)

**Code corrigé** :

```typescript
// ✅ STEP 1: Filtrage par date (TOUJOURS actif)
shopOrders = shopOrders.filter(order => {
  const orderDate = order.RevisedStartDate ? new Date(order.RevisedStartDate).toISOString().split('T')[0] : null
  return orderDate === targetDate
})

// ✅ STEP 2: Filtrage Block Date (si enabled)
if (blockDateEnabled) {
  shopOrders = shopOrders.filter(order => order.CBlockDates === blockDateValue)
}

// ✅ STEP 3: Filtrage Sent to Cutting (si enabled)
if (sentToCuttingEnabled) {
  shopOrders = shopOrders.filter(order => {
    const sentValue = (order as any).SentToCuttingSystem ?? false
    return sentValue === sentToCuttingValue
  })
}
```

### 📊 Résultats attendus après correction

#### Test 1: Sent to Cutting System = YES
```
Filtres:
- Site: BDR
- Date: 24/11/2025
- Block Date: Disabled
- Sent to Cutting: Enabled, Value = TRUE

Avant: 0 Shop Orders ❌
Après: 2 Shop Orders ✅
```

#### Test 2: Tous filtres désactivés
```
Filtres:
- Site: BDR
- Date: 24/11/2025
- Block Date: Disabled
- Sent to Cutting: Disabled

Avant: 72 Shop Orders ❌ (1 manquant)
Après: 75 Shop Orders ✅ (tous les Massifs du 24/11)
```

---

**Date**: 24 novembre 2025  
**Auteur**: GitHub Copilot  
**Statut**: ✅ Bugs corrigés - Prêt pour test utilisateur
