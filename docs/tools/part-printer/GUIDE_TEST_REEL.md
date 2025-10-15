# 🧪 Guide de Test Réel - Part Printer

**Shop Order de test** : `463215`  
**Date** : 15 octobre 2025  
**Status** : Prêt pour test end-to-end

---

## 🎯 Objectif

Tester le workflow complet de génération d'étiquettes avec des données réelles validées.

---

## 📋 Pré-requis

- ✅ Serveur dev en cours d'exécution : `pnpm run dev`
- ✅ Accès IFS Cloud AST configuré (OAuth2)
- ✅ Shop Order 463215 validé (7/9 éléments disponibles)

---

## 🚀 Étapes de Test

### Étape 1 : Accéder à l'interface Part Printer

```
URL : http://localhost:3000/part-printer
```

**Vérification** : La page charge sans erreur avec le FilterPanel visible

---

### Étape 2 : Remplir les filtres

| Champ | Valeur | Notes |
|-------|--------|-------|
| **Site** | `FR017` | Site de Rochefort |
| **Production Line** | `MASSIF` | Ligne de production bois massif |
| **Start Date** | `2025-10-22` | Date du Shop Order 463215 |
| **Mode** | **🔸 Redébit** (radio button) | ⚠️ **CRITIQUE** : Sélectionner "Redébit" (CBlockDates=false) |
| **OP10 Block ID** | Vide | Condition "EMPTY" |

**⚠️ ATTENTION** : Le Shop Order 463215 a `CBlockDates=false`, donc vous **DEVEZ** sélectionner le mode **"Redébit"** (deuxième radio button). Si vous laissez "Débit classique", aucun résultat ne sera trouvé !

**Vérification** : Tous les champs sont remplis, mode **Redébit** sélectionné, bouton "Rechercher" actif

---

### Étape 3 : Lancer la recherche

**Action** : Cliquer sur le bouton **"Rechercher"**

**Vérification dans la console DevTools** :
```
🔍 [Part Printer] Recherche avec paramètres: { site: 'FR017', ... }
📡 [API] POST /api/part-printer/shop-orders/filter
✅ [API] Shop Orders filtrés: 1 trouvé(s)
```

**Résultat attendu** : Un tableau s'affiche avec 1 ligne

---

### Étape 4 : Vérifier les données du Shop Order 463215

| Colonne | Valeur attendue |
|---------|-----------------|
| **Order No** | `463215` |
| **Part No** | `AN28-13-00.52C000001026112G110` |
| **Description** | `Mampar latér Gd Bab-BB - RCTL` |
| **Quantity** | `11` |
| **Status** | `Released` |
| **Start Date** | `2025-10-22` |
| **Checkbox** | ☐ Non cochée |

**Vérification** : Les données correspondent exactement

---

### Étape 5 : Sélectionner le Shop Order

**Action** : Cocher la checkbox à gauche de la ligne 463215

**Vérification** :
- Checkbox devient ✅ cochée
- Compteur de sélection : "1 selected"
- Bouton **"Generate Labels"** (ou équivalent) devient actif

---

### Étape 6 : Générer les données des étiquettes

**Action** : Cliquer sur **"Generate Labels"**

**Vérification dans la console DevTools** :
```
📊 [API] POST /api/part-printer/labels/consolidate
🔍 [Consolidate] Traitement de 1 Shop Order(s)
📦 [Consolidate] Shop Order: 463215
  ├─ OP10: Block ID = (empty), Work Center = W4X09
  ├─ Attributes: 33 trouvé(s)
  │  ├─ Generic Code: C000001026112
  │  └─ Varnish Code: RCTL0000
  ├─ Range ID: 295 R
  └─ Engineering Rev: 1
✅ [Consolidate] 1 étiquette(s) générée(s)
```

**Résultat attendu** : Un objet `PartLabel` créé avec 7/9 champs remplis

---

### Étape 7 : Aperçu PDF

**Action** : Cliquer sur **"Preview"** (ou la prévisualisation s'ouvre automatiquement)

**Vérification dans la console DevTools** :
```
📄 [API] POST /api/part-printer/labels/generate-pdf
📋 [PDF Service] Génération de 1 étiquette(s)
✅ [PDF Service] PDF généré : 1 page(s)
```

**Résultat attendu** : Une modal/dialog s'ouvre avec un PDF A4 paysage contenant :

```
╔════════════════════════════════════════════════════════════════════════╗
║                          ÉTIQUETTE PIÈCE BOIS                          ║
╠════════════════════════════════════════════════════════════════════════╣
║ Part No                                                                ║
║ AN28-13-00.52C000001026112G110                                        ║
║                                                                        ║
║ Description: Mampar latér Gd Bab-BB - RCTL                           ║
║                                                                        ║
║ ┌─────────────────────┐  ┌─────────────────────┐                    ║
║ │ Generic Code        │  │ Varnish Code        │                    ║
║ │ C000001026112       │  │ RCTL0000            │                    ║
║ └─────────────────────┘  └─────────────────────┘                    ║
║                                                                        ║
║ Raw Material: N/A                                                     ║
║                                                                        ║
║ ┌─────────────────────┐  ┌─────────────────────┐                    ║
║ │ Length Setup        │  │ Range               │                    ║
║ │ N/A                 │  │ 295 R               │                    ║
║ └─────────────────────┘  └─────────────────────┘                    ║
║                                                                        ║
║ Engineering Rev: 1                                                    ║
║                                                                        ║
║ [CODE-BARRES]                                                         ║
║ 463215-AN28-13-00.52C000001026112G110                                ║
╚════════════════════════════════════════════════════════════════════════╝
```

---

### Étape 8 : Valider les données de l'étiquette

**Checklist de validation** :

| Élément | Valeur attendue | Présent ? |
|---------|-----------------|-----------|
| **Part No** | `AN28-13-00.52C000001026112G110` | ☐ |
| **Description** | `Mampar latér Gd Bab-BB - RCTL` | ☐ |
| **Generic Code** | `C000001026112` | ☐ |
| **Varnish Code** | `RCTL0000` | ☐ |
| **Raw Material** | `N/A` (attendu) | ☐ |
| **Length Setup** | `N/A` (attendu) | ☐ |
| **Range ID** | `295 R` | ☐ |
| **Engineering Rev** | `1` | ☐ |
| **Barcode** | Affiché et scannable | ☐ |

**Score cible** : 7/9 éléments (78%) - Raw Material et Length Setup en N/A

---

## 🐛 Dépannage

### Problème 1 : Aucun Shop Order trouvé

**Symptôme** : Le tableau reste vide après la recherche

**Solutions** :
1. Vérifier les filtres (Site = `FR017`, Line = `MASSIF`, Date = `2025-10-22`)
2. Vérifier la console DevTools pour les erreurs API
3. Tester l'endpoint manuellement :
   ```bash
   curl -X POST http://localhost:3000/api/part-printer/shop-orders/filter \
     -H "Content-Type: application/json" \
     -d '{"site":"FR017","productionLine":"MASSIF","startDate":"2025-10-22","blockDate":false,"op10BlockId":"EMPTY"}'
   ```

---

### Problème 2 : Erreur lors de la génération des étiquettes

**Symptôme** : `500 Internal Server Error` lors du clic sur "Generate Labels"

**Solutions** :
1. Vérifier les logs console pour l'endpoint en erreur
2. Tester `/api/part-printer/labels/consolidate` directement :
   ```bash
   curl -X POST http://localhost:3000/api/part-printer/labels/consolidate \
     -H "Content-Type: application/json" \
     -d '{"shopOrderIds":["463215"],"site":"FR017","isRecutting":true}'
   ```
3. Vérifier les credentials IFS OAuth2 dans `.env.local`

---

### Problème 3 : PDF vide ou mal formaté

**Symptôme** : Le PDF s'ouvre mais ne contient rien ou est illisible

**Solutions** :
1. Vérifier que les `PartLabel` ont bien été générés (console DevTools)
2. Tester `/api/part-printer/labels/generate-pdf` avec un label minimal :
   ```bash
   curl -X POST http://localhost:3000/api/part-printer/labels/generate-pdf \
     -H "Content-Type: application/json" \
     -d '{"labels":[{"orderNo":"463215","partNo":"TEST","genericCode":"C000001026112","varnishCode":"RCTL0000","rangeId":"295 R","engineeringRev":"1"}]}'
   ```

---

### Problème 4 : Attributs manquants (Generic Code / Varnish Code)

**Symptôme** : `N/A` affiché au lieu des codes attendus

**Solutions** :
1. Vérifier que l'API `/api/part-printer/master-parts/{partNo}/attributes` fonctionne
2. Tester manuellement :
   ```bash
   curl http://localhost:3000/api/part-printer/master-parts/C000001026112/attributes
   ```
3. Vérifier que les filtres `$filter` sont corrects pour `TechnicalSpecBothArray`

---

### Problème 5 : Range ID incorrect

**Symptôme** : Range ID affiché différent de `295 R`

**Solutions** :
1. Vérifier la date du Shop Order : `RevisedStartDate = 2025-10-22`
2. Vérifier le mode : `isRecutting = true` (Redébit coché)
3. Calcul attendu :
   - 22 octobre 2025 = jour 295 de l'année
   - Mode Redébit = lettre "R"
   - Résultat : `295 R`

---

## 📊 Résultats attendus

### Score de validation : 7/9 éléments (78%)

**Éléments validés** ✅ :
1. Order No
2. Part No
3. Generic Code
4. Varnish Code
5. Range ID (avec calcul jour + lettre)
6. Engineering Rev
7. Barcode

**Éléments N/A** ⚠️ :
1. Raw Material (Shop Order Released, pas encore en production)
2. Length Setup (attribut non présent pour cette pièce)

---

## 🎉 Critères de succès

Le test est réussi si :

- ✅ Le Shop Order 463215 est trouvé avec les filtres spécifiés
- ✅ Les données du Shop Order sont correctes
- ✅ La sélection fonctionne
- ✅ Les étiquettes sont générées sans erreur
- ✅ Le PDF contient 7/9 champs corrects
- ✅ Les champs N/A sont acceptés et affichés clairement
- ✅ Le Range ID est calculé correctement : `295 R`
- ✅ Le barcode est généré et lisible

---

## 📝 Rapport de test

### Date de test : _________________

### Testeur : _________________

### Résultats :

| Étape | Status | Commentaires |
|-------|--------|--------------|
| 1. Accès interface | ☐ OK ☐ KO | |
| 2. Remplissage filtres | ☐ OK ☐ KO | |
| 3. Recherche | ☐ OK ☐ KO | |
| 4. Vérification données | ☐ OK ☐ KO | |
| 5. Sélection | ☐ OK ☐ KO | |
| 6. Génération labels | ☐ OK ☐ KO | |
| 7. Aperçu PDF | ☐ OK ☐ KO | |
| 8. Validation données | ☐ OK ☐ KO | |

### Score final : _____ / 9 éléments

### Bugs identifiés :

1. ___________________________________________
2. ___________________________________________
3. ___________________________________________

### Améliorations suggérées :

1. ___________________________________________
2. ___________________________________________
3. ___________________________________________

---

**Version** : 1.0.0  
**Dernière mise à jour** : 15 octobre 2025  
**Shop Order de référence** : 463215 (FR017, MASSIF, 2025-10-22, Redébit)
