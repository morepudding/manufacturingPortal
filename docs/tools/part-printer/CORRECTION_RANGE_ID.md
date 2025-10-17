# 🔄 Correction logique Range ID - 16 octobre 2025

## 🎯 Problème identifié

### ❌ Ancienne logique (INCORRECTE)

```typescript
// ❌ Basé sur le mode Débit/Redébit (CBlockDates)
const isRecutting = shopOrder.CBlockDates === false  // false = Redébit
const letter = isRecutting ? 'R' : 'A'
const rangeId = `${dayOfYear} ${letter}`  // Ex: "295 R" ou "295 A"
```

**Problème** : La lettre de la Range ne dépend **PAS** du mode Débit/Redébit, mais des **plages horaires du site**.

---

## ✅ Nouvelle logique (CORRECTE)

### Principe

La Range est déterminée par **l'heure actuelle** et les **plages horaires configurées pour le site** dans IFS.

### Endpoint IFS

```
CompanySiteHandling.svc/CompanySiteSet(Contract='FR017')/SiteMfgstdInfoArray(Contract='FR017')/SiteMfgstdRangeArray
```

### Exemple de données IFS

```json
{
  "value": [
    {
      "Contract": "FR017",
      "Range": "A",
      "StartTime": "00:00:00",
      "FinishTime": "11:59:00"
    },
    {
      "Contract": "FR017",
      "Range": "B",
      "StartTime": "12:00:00",
      "FinishTime": "23:59:00"
    }
  ]
}
```

### Logique de calcul

```typescript
// 1. Récupérer les plages horaires du site depuis IFS
const ranges = await getSiteMfgstdRanges("FR017")
// → [
//     { Range: "A", StartTime: "00:00:00", FinishTime: "11:59:00" },
//     { Range: "B", StartTime: "12:00:00", FinishTime: "23:59:00" }
//   ]

// 2. Obtenir l'heure actuelle
const currentTime = "14:30:00"

// 3. Trouver la Range active selon l'heure
const activeRange = getRangeByTime(ranges, currentTime)
// → { Range: "B", StartTime: "12:00:00", FinishTime: "23:59:00" }

// 4. Calculer le quantième du Shop Order
const dayOfYear = getDayOfYear("2025-10-22")  // → 295

// 5. Construire le Range ID
const rangeId = `${dayOfYear} ${activeRange.Range}`  // → "295 B"
```

---

## 🔧 Implémentation

### Nouveau service : `range-service.ts`

**Localisation** : `src/tools/part-printer/services/range-service.ts`

#### Fonctions principales

| Fonction | Description | Retour |
|----------|-------------|--------|
| `getSiteMfgstdRanges(site)` | Récupère les plages horaires du site depuis IFS | `IFSSiteMfgstdRange[]` |
| `getRangeByTime(ranges, time)` | Trouve la Range active selon l'heure | `IFSSiteMfgstdRange \| null` |
| `getDayOfYear(date)` | Calcule le quantième d'une date | `number` (1-366) |
| `getCurrentTime()` | Obtient l'heure actuelle (HH:mm:ss) | `string` |
| `calculateRangeId(site, date, time?)` | Calcule le Range ID complet | `CalculatedRangeId` |
| `getRangeId(site, date, time?)` | Alias simplifié de calculateRangeId | `string \| null` |

#### Exemple d'utilisation

```typescript
import { getRangeId } from './range-service'

// Calcul du Range ID pour un Shop Order
const rangeId = await getRangeId("FR017", "2025-10-22")
console.log(rangeId)  // "295 A" ou "295 B" selon l'heure actuelle
```

---

### Nouveaux types : `IFSSiteMfgstdRange` & `CalculatedRangeId`

**Localisation** : `src/tools/part-printer/types/index.ts`

```typescript
/**
 * Range IFS avec plages horaires
 */
export interface IFSSiteMfgstdRange {
  Contract: string           // Code du site (ex: "FR017")
  Range: string              // Lettre de la Range (ex: "A", "B", "C")
  StartTime: string          // Heure de début (HH:mm:ss)
  FinishTime: string         // Heure de fin (HH:mm:ss)
}

/**
 * Range ID calculé
 */
export interface CalculatedRangeId {
  rangeId: string            // Range ID complet (ex: "295 A")
  dayOfYear: number          // Quantième (1-366)
  rangeLetter: string        // Lettre de la Range (A, B, C, etc.)
  time: string               // Heure utilisée (HH:mm:ss)
}
```

---

## 📝 Fichiers modifiés

| Fichier | Modifications | Status |
|---------|---------------|--------|
| `src/tools/part-printer/types/index.ts` | Ajout types `IFSSiteMfgstdRange` & `CalculatedRangeId` | ✅ |
| `src/tools/part-printer/services/range-service.ts` | Réécriture complète avec vraie logique | ✅ |
| `src/tools/part-printer/services/part-label-service.ts` | Suppression paramètre `isRecutting` | ✅ |
| `src/tools/part-printer/services/orchestrator-service.ts` | Suppression logique `isRecutting` | ✅ |

---

## 🧪 Tests à effectuer

### Test 1 : Récupération plages horaires

**Test** :
```typescript
const ranges = await getSiteMfgstdRanges("FR017")
console.log(ranges)
```

**Résultat attendu** :
```json
[
  {
    "Contract": "FR017",
    "Range": "A",
    "StartTime": "00:00:00",
    "FinishTime": "11:59:00"
  },
  {
    "Contract": "FR017",
    "Range": "B",
    "StartTime": "12:00:00",
    "FinishTime": "23:59:00"
  }
]
```

---

### Test 2 : Calcul Range selon l'heure

**Test matin (10:00)** :
```typescript
const ranges = [
  { Range: "A", StartTime: "00:00:00", FinishTime: "11:59:00" },
  { Range: "B", StartTime: "12:00:00", FinishTime: "23:59:00" }
]
const active = getRangeByTime(ranges, "10:00:00")
console.log(active.Range)  // → "A"
```

**Test après-midi (14:30)** :
```typescript
const active = getRangeByTime(ranges, "14:30:00")
console.log(active.Range)  // → "B"
```

---

### Test 3 : Range ID complet

**Test** :
```typescript
const rangeId = await calculateRangeId("FR017", "2025-10-22", "10:00:00")
console.log(rangeId)
// → { rangeId: "295 A", dayOfYear: 295, rangeLetter: "A", time: "10:00:00" }

const rangeId2 = await calculateRangeId("FR017", "2025-10-22", "14:30:00")
console.log(rangeId2)
// → { rangeId: "295 B", dayOfYear: 295, rangeLetter: "B", time: "14:30:00" }
```

---

## 🔄 Migration

### Avant (ancienne méthode - DEPRECATED)

```typescript
// ❌ Ancienne méthode (basée sur CBlockDates)
const isRecutting = shopOrder.CBlockDates === false
const rangeId = await getRangeId(site, date, isRecutting)
```

### Après (nouvelle méthode - CORRECTE)

```typescript
// ✅ Nouvelle méthode (basée sur plages horaires)
const rangeId = await getRangeId(site, date)
// Le 3ème paramètre (currentTime) est optionnel
// Par défaut = heure actuelle
```

---

## ⚠️ Notes importantes

### 1. Heure utilisée

- **Par défaut** : Heure actuelle (`getCurrentTime()`)
- **Option** : Passer une heure spécifique en 3ème paramètre

```typescript
// Utilise l'heure actuelle
const rangeId = await getRangeId("FR017", "2025-10-22")

// Utilise une heure spécifique
const rangeId = await getRangeId("FR017", "2025-10-22", "10:30:00")
```

### 2. Sites sans plages horaires

Si un site n'a **pas de plages horaires configurées** dans IFS :
- La fonction `getSiteMfgstdRanges()` retourne un array vide `[]`
- `calculateRangeId()` **lève une erreur** : `"No Ranges found for site XXX"`
- `getRangeId()` retourne `null`

**Gestion d'erreur recommandée** :
```typescript
const rangeId = await getRangeId(site, date) || 'N/A'
```

### 3. Plages horaires qui se chevauchent

⚠️ **Hypothèse** : Les plages horaires IFS **ne se chevauchent pas**.

Si des plages se chevauchent, la fonction `getRangeByTime()` retourne la **première** trouvée (selon l'ordre du tri par `StartTime asc`).

### 4. Anciennes fonctions DEPRECATED

Ces fonctions sont **deprecated** et ne doivent **plus être utilisées** :

- ❌ `calculateRangeIdLocal(date, isRecutting)` - Utilisait CBlockDates
- ❌ `getRangeBySiteAndDate(site, date)` - Logique obsolète
- ❌ `getRangesBySite(site)` - Remplacée par `getSiteMfgstdRanges()`
- ❌ `rangeExists(site, date)` - Non pertinente

---

## 📚 Documentation de référence

- **Copilot Instructions** : `.github/copilot-instructions.md`
- **Types** : `src/tools/part-printer/types/index.ts`
- **Service Range** : `src/tools/part-printer/services/range-service.ts`
- **Exemple IFS** : Voir réponse JSON ci-dessus

---

## ✅ Checklist validation

- [x] ✅ Types `IFSSiteMfgstdRange` & `CalculatedRangeId` créés
- [x] ✅ Service `range-service.ts` réécrit
- [x] ✅ `part-label-service.ts` mis à jour
- [x] ✅ `orchestrator-service.ts` mis à jour
- [x] ✅ Anciennes fonctions marquées `@deprecated`
- [x] ✅ Documentation créée
- [ ] ⏳ Tests manuels (récupération plages IFS)
- [ ] ⏳ Tests unitaires
- [ ] ⏳ Validation avec données réelles
- [ ] ⏳ Review code

---

**Version** : 1.0  
**Date** : 16 octobre 2025  
**Auteur** : GitHub Copilot + rbottero  
**Status** : ✅ Implémentation complète - Prêt pour tests
