# 🎯 Guide d'exécution - Workflow Tests (Niveau 3)

## 📋 Vue d'ensemble

Les **Workflow Tests** (Niveau 3) testent les parcours utilisateur complets à travers les 5 étapes de Boat Configuration Editor avec vraies APIs IFS AST.

### Tests créés

| Fichier | Tests | Description | Durée estimée |
|---------|-------|-------------|---------------|
| `workflows/happy-path.spec.ts` | 2 tests | Workflow complet + Stepper navigation | ~45s |
| `workflows/error-handling.spec.ts` | 2 tests | Shop Order not found + Cancel | ~25s |
| `workflows/multiple-scenarios.spec.ts` | 1 test | 3 Shop Orders séquentiels | ~30s |
| **TOTAL** | **5 tests** | - | **~100s (1min40s)** |

---

## 🚀 Commandes d'exécution

### Lancer tous les workflow tests

```bash
# Tous les tests workflow (headless)
pnpm exec playwright test workflows/ --project=chromium

# Avec UI interactive
pnpm exec playwright test workflows/ --project=chromium --ui

# Mode debug
pnpm exec playwright test workflows/ --project=chromium --debug
```

### Lancer des tests spécifiques

```bash
# Test 3.1 & 3.2 : Happy Path
pnpm exec playwright test workflows/happy-path.spec.ts --project=chromium

# Test 3.3 & 3.4 : Error Handling
pnpm exec playwright test workflows/error-handling.spec.ts --project=chromium

# Test 3.5 : Multiple Scenarios
pnpm exec playwright test workflows/multiple-scenarios.spec.ts --project=chromium
```

### Lancer un seul test

```bash
# Test 3.1 : Workflow complet
pnpm exec playwright test workflows/happy-path.spec.ts --project=chromium -g "3.1"

# Test 3.2 : Stepper Navigation
pnpm exec playwright test workflows/happy-path.spec.ts --project=chromium -g "3.2"

# Test 3.3 : Shop Order not found
pnpm exec playwright test workflows/error-handling.spec.ts --project=chromium -g "3.3"

# Test 3.4 : Cancel workflows
pnpm exec playwright test workflows/error-handling.spec.ts --project=chromium -g "3.4"

# Test 3.5 : Multiple Shop Orders
pnpm exec playwright test workflows/multiple-scenarios.spec.ts --project=chromium -g "3.5"
```

---

## 📊 Tests détaillés

### Test 3.1 : Happy Path complet ⭐⭐⭐⭐⭐

**Workflow** : Entry → Confirmation → Customer Order → Selection → Print

**Shop Order testé** : 100563 (JY6MB0019)

**Étapes** :
1. ✅ Entry : Recherche Shop Order 100563
2. ✅ Confirmation : Vérifier Serial Number JY6MB0019
3. ✅ Customer Order : Afficher données client
4. ✅ Selection : Choisir imprimante + langue
5. ✅ Print : Imprimer le document

**Validations** :
- ✅ Shop Order trouvé en < 10s
- ✅ Serial Number et DOP ID corrects
- ✅ Workflow complet en < 45s
- ✅ Bouton "New Print" visible

**Durée** : ~30-45s

---

### Test 3.2 : Stepper Navigation ⭐⭐⭐⭐

**Objectif** : Vérifier la progression visuelle du stepper

**Validations** :
- ✅ Step 1/5 : Entry (Shop Order Search)
- ✅ Step 2/5 : Confirmation (Serial Number)
- ✅ Step 3/5 : Customer Order (Client Info)
- ✅ Step 4/5 : Selection (Printer & Language)
- ✅ Step 5/5 : Print (Document Generation)
- ✅ Les étapes complétées sont marquées comme "completed"

**Durée** : ~25-30s

---

### Test 3.3 : Shop Order not found ⭐⭐⭐⭐

**Scénario négatif** : Tester avec Shop Order inexistant

**Étapes** :
1. ❌ Saisir Shop Order 999999 (inexistant)
2. ✅ Vérifier message d'erreur affiché
3. ✅ Rester sur Step 1 (Entry)
4. ✅ Retry avec Shop Order valide

**Validations** :
- ✅ Message d'erreur clair
- ✅ Pas de crash de l'application
- ✅ Possibilité de réessayer

**Durée** : ~15-20s

---

### Test 3.4 : Cancel workflows ⭐⭐⭐

**Objectif** : Tester le bouton "Non, Recommencer"

**Étapes** :
1. ✅ Aller jusqu'à Step 2 (Confirmation)
2. ❌ Cliquer sur "Non, Recommencer"
3. ✅ Retour à Step 1 (Entry)
4. ✅ Formulaire réinitialisé

**Validations** :
- ✅ Retour correct à l'étape initiale
- ✅ Formulaire proprement reset
- ✅ Serial Number caché

**Durée** : ~10-15s

---

### Test 3.5 : Multiple Shop Orders ⭐⭐⭐⭐

**Objectif** : Tester 3 Shop Orders séquentiels

**Shop Orders testés** :
1. 100563 → JY6MB0019 (DOP 38)
2. 100949 → LX6MA0116 (DOP 48)
3. 97277 → LG5MA0114 (DOP 95)

**Validations** :
- ✅ Les 3 Shop Orders trouvés correctement
- ✅ Pas d'interférence entre les tests
- ✅ "New Print" fonctionne correctement

**Durée** : ~30-45s (3 x 10-15s)

---

## ⚠️ Prérequis

### 1. Application démarrée

```bash
# Terminal 1 : Démarrer Next.js
pnpm run dev
```

Vérifier : http://localhost:3000 accessible

### 2. Variables d'environnement

```bash
# .env.local
IFS_BASE_URL=https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1
IFS_CLIENT_ID=your_ifs_client_id
IFS_CLIENT_SECRET=your_ifs_client_secret
IFS_TOKEN_URL=https://...../token
IFS_SCOPE=openid microprofile-jwt
```

### 3. IFS AST accessible

- ✅ Serveur IFS AST en ligne
- ✅ Credentials OAuth2 valides
- ✅ Shop Orders 100563, 100949, 97277 existent

---

## 📈 Résultats attendus

### Succès total (5/5 tests passing)

```
  🎯 Workflow Tests - Happy Path
    ✓ 3.1 - Happy Path complet : Entry → Confirmation → Customer Order → Selection → Print (30s)
    ✓ 3.2 - Stepper Navigation : Progression à travers les 5 étapes (25s)

  🎯 Workflow Tests - Error Handling
    ✓ 3.3 - Shop Order not found : Gestion erreur + retry (15s)
    ✓ 3.4 - Cancel workflows : Bouton "Non, Recommencer" (10s)

  🎯 Workflow Tests - Multiple Scenarios
    ✓ 3.5 - Multiple Shop Orders : Test de 3 Shop Orders séquentiels (30s)

  5 passed (110s)
```

### Métriques de qualité

| Métrique | Cible | Validation |
|----------|-------|------------|
| **Tests passing** | 5/5 (100%) | ✅ |
| **Workflow complet** | < 45s | ✅ |
| **Error handling** | Pas de crash | ✅ |
| **Multiple tests** | Pas d'interférence | ✅ |

---

## 🚨 Problèmes possibles

### Problem 1 : Tests timeout

**Symptômes** : `Error: Timeout 15000ms exceeded`

**Solutions** :
- Vérifier IFS AST accessible
- Augmenter `E2E_CONFIG.timeouts.ifsApi` à 20000ms
- Vérifier credentials OAuth2

### Problem 2 : Shop Order not found

**Symptômes** : `Serial Number not displayed`

**Solutions** :
- Vérifier que Shop Orders 100563, 100949, 97277 existent encore
- Utiliser d'autres Shop Orders dans `VALID_SHOP_ORDERS`
- Adapter les tests avec de nouvelles données

### Problem 3 : Stepper pas visible

**Symptômes** : `Selector '[data-testid="stepper"]' not found`

**Solutions** :
- Vérifier que les composants UI ont les `data-testid` corrects
- Adapter les selectors si l'UI a changé
- Vérifier que le stepper est bien affiché dans l'interface

---

## 📊 Progression Phase 4

### Status actuel

| Niveau | Tests créés | Tests passing | Status |
|--------|-------------|---------------|--------|
| **1. Health Checks** | 4 | 4/4 (100%) | ✅ Complet |
| **2. API Unit Tests** | 7 | 4/7 (57%) | 🟡 Partiel |
| **3. Workflow Tests** | 5 | 0/5 (0%) | 🔄 À tester |
| **4. Business Validation** | - | - | 📋 À créer |
| **5. Performance Tests** | - | - | 📋 À créer |
| **6. Cross-browser** | - | - | 📋 À créer |
| **TOTAL** | **16** | **8/16 (50%)** | **🟡** |

### Prochaines étapes

1. ✅ Exécuter les 5 tests Workflow (Niveau 3)
2. 📋 Débugger les 3 tests API skippés (Niveau 2)
3. 📋 Créer tests Business Validation (Niveau 4)
4. 📋 Créer tests Performance (Niveau 5)
5. 📋 Créer tests Cross-browser (Niveau 6)

---

## 📝 Logs & Debugging

### Activer les logs détaillés

```bash
# Logs Playwright
DEBUG=pw:api pnpm exec playwright test workflows/

# Logs console du navigateur
pnpm exec playwright test workflows/ --headed

# Mode debug interactif
pnpm exec playwright test workflows/ --debug
```

### Capturer screenshots et vidéos

Les screenshots et vidéos sont automatiquement capturés sur échec :
- 📸 Screenshots : `test-results/[test-name]/test-failed-*.png`
- 🎥 Vidéos : `test-results/[test-name]/video.webm`

---

**Dernière mise à jour** : 14 novembre 2025  
**Status** : ✅ Tests Niveau 3 créés - Prêts à être exécutés
