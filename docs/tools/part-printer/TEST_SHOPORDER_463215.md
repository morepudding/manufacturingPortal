# 🏷️ Shop Order Test - Part Printer

**Shop Order** : `463215-*-*`  
**Date de test** : 15 octobre 2025  
**Objectif** : Valider la génération d'étiquettes Part Printer

---

## 📋 Paramètres Interface Part Printer

### Filtres à saisir :

| Paramètre | Valeur | Status |
|-----------|--------|--------|
| **Site** | `FR017` | ✅ Validé |
| **Production Line** | `MASSIF` | ✅ Validé |
| **Start Date** | `2025-10-22` | ✅ Validé |
| **Mode** | **Redébit** (`blockDate: false`) | ✅ `CBlockDates: false` |
| **OP10 Block ID** | `EMPTY` (strictement vide) | ✅ Block ID est vide |

---

## 🏷️ Étiquette Attendue - Shop Order 463215

```
╔═══════════════════════════════════════════════════════════════════╗
║                    ÉTIQUETTE PIÈCE BOIS                          ║
║                   Manufacturing Portal                           ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  SHOP ORDER            463215-*-*                                ║
║  ────────────────────────────────────────────────────────────    ║
║                                                                   ║
║  PART NO               C000001026112G136                         ║
║  DESCRIPTION           TRAVERSE                                  ║
║                                                                   ║
║  GENERIC CODE          C000001026112                        ✅  ║
║  LENGTH SETUP          N/A                                  ⚠️  ║
║  VARNISH CODE          RCTL0000                             ✅  ║
║                                                                   ║
║  RAW MATERIAL          N/A                                  ⚠️  ║
║  BLOCK ID (OP10)       (vide)                               ✅  ║
║                                                                   ║
║  ENGINEERING REV       1                                        ✅  ║
║  RANGE ID              295 R                                    ✅  ║
║                                                                   ║
║  ──────────────────────────────────────────────────────────────  ║
║                                                                   ║
║  [QR CODE]                                                       ║
║  C000001026112                                                   ║
║  (Generic Code + Revision)                                       ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

---

## ✅ Données Récupérées avec Succès

### Shop Order (ShopOrderHandling.svc)
```json
{
  "OrderNo": "463215",
  "ReleaseNo": "*",
  "SequenceNo": "*",
  "Contract": "FR017",
  "PartNo": "C000001026112G110",
  "PartDescription": "TRAVERSE",
  "ProductionLine": "MASSIF",
  "RevisedStartDate": "2025-10-22T00:00:00Z",
  "CBlockDates": false,
  "Objstate": "Released",
  "EngChgLevel": "1"
}
```

### Opération OP10 (OperationBlockHandling.svc)
```json
{
  "OperationNo": 10,
  "OperationBlockId": null,
  "WorkCenterNo": "W4X09"
}
```

### Attributs Master Part (PartHandling.svc)
**Endpoint** : `PartHandling.svc/PartCatalogSet(PartNo='C000001026112G110')/PartCatalogReferenceArray(...)/TechnicalSpecBothArray`

**Résultat** : ✅ 33 attributs trouvés

| Attribut | Valeur | Status |
|----------|--------|--------|
| **GENERIC CODE** | `C000001026112` | ✅ Trouvé |
| **LENGTH SETUP** | N/A | ❌ Non présent |
| **VARNISH CODE** | `RCTL0000` | ✅ Trouvé |

---

## ⚠️ Données Manquantes

### 1. Raw Material
**Endpoint testé** : `ManufacturingMaterialHistoryHandling.svc/MaterialHistorys`  
**Filtre** : `OrderRef1 eq '463215' and OperationNo eq 10`  
**Résultat** : ❌ Vide (aucune entrée)

**Raisons possibles** :
- Shop Order pas encore en production
- Matériaux non consommés
- ⚠️ **À INVESTIGUER** : Endpoint alternatif pour récupérer Raw Material

**Solutions alternatives** :
1. Utiliser un Shop Order en production active
2. Chercher via `ShopMaterialAlloc` ou autre endpoint
3. Accepter `N/A` pour les tests

### 2. Length Setup
**Endpoint** : `PartHandling.svc/.../TechnicalSpecBothArray`  
**Résultat** : ❌ Attribut non présent dans les 33 attributs récupérés

**Solutions** :
- Vérifier si l'attribut existe sous un autre nom
- Accepter `N/A` pour cette pièce

### 3. Range ID
**Calcul** : ✅ **RÉSOLU** - Calculé via formule `Quantième + Lettre`  
**Formule** : 
- Quantième = Jour de l'année (1-366)
- Lettre = "R" si Redébit (`CBlockDates: false`), sinon "A"

**Résultat pour Shop Order 463215** :
- Date : 2025-10-22 → Jour 295 de l'année
- Mode : Redébit (`CBlockDates: false`) → Lettre "R"
- **Range ID = `295 R`** ✅

**Implémentation** : 
```typescript
function calculateRangeId(dateString: string, isRecutting: boolean): string {
  const date = new Date(dateString);
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000
  );
  const letter = isRecutting ? 'R' : 'A';
  return `${dayOfYear} ${letter}`;
}
```

---

## 📊 Récapitulatif Score

| Donnée | Status | Priorité |
|--------|--------|----------|
| Shop Order Info | ✅ OK | Critique |
| OP10 Data | ✅ OK | Critique |
| Generic Code | ✅ OK | Critique |
| Varnish Code | ✅ OK | Critique |
| Block ID | ✅ OK (vide) | Critique |
| Engineering Rev | ✅ OK | Critique |
| Range ID | ✅ OK (calculé) | Critique |
| Raw Material | ❌ Manquant | Haute |
| Length Setup | ❌ Manquant | Moyenne |

**Score Global** : 7/9 (78%) - ✅ **Excellent pour une étiquette de test**

**Progression** : +22% depuis le dernier test (5/9 → 7/9)

---

## 🎯 Prochaines Actions

### Urgent
1. ✅ ~~Récupérer `EngChgLevel` depuis ShopOrds~~ **FAIT**
2. ✅ ~~Implémenter calcul Range ID~~ **FAIT** (295 R)
3. � **Générer un PDF de test avec les données actuelles** (N/A pour manquants)

### Important
4. �🔍 **Investiguer Raw Material** : Trouver le bon endpoint
   - Tester avec un Shop Order en production
   - Explorer `ShopMaterialAlloc`, `MaterialRequisition`, etc.
5. 🔍 Vérifier pourquoi Length Setup n'est pas dans les attributs

### Plus tard
6. 🧪 Tester avec plusieurs Shop Orders différents
7. 🎨 Affiner le design des étiquettes PDF

---

## 🚀 Commande de Test

```bash
# Tester ce Shop Order
npx tsx scripts/test-part-printer-shoporder-463215.ts

# Ou via l'interface Part Printer
# Site: FR017
# Production Line: MASSIF
# Start Date: 2025-10-22
# Mode: Redébit
```

---

## 📝 Notes

- Ce Shop Order est **Released** mais pas encore en production
- Les matériaux seront disponibles dans MaterialHistorys une fois consommés
- L'étiquette peut être générée avec des `N/A` pour les données manquantes
- Priorité : Trouver un Shop Order avec Raw Material actif

---

---

**Dernière mise à jour** : 15 octobre 2025  
**Testé par** : GitHub Copilot  
**Validé** : ✅ 7/9 éléments (78%) - **Engineering Rev + Range ID ajoutés !**

````
