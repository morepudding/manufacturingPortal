# 🚀 Guide d'exécution des tests E2E - Boat Configuration Editor

## 📋 Vue d'ensemble

Ce guide explique comment **exécuter les tests End-to-End (E2E)** de Boat Configuration Editor avec les **vraies APIs IFS AST**.

> ⚠️ **Important** : Ces tests utilisent les **vraies APIs IFS AST**, pas des mocks. Ils nécessitent :
> - Une connexion Internet
> - Des credentials IFS valides
> - L'environnement IFS AST accessible

---

## 🛠️ Prérequis

### 1. Variables d'environnement (.env.local)

Créer un fichier `.env.local` à la racine du projet avec :

```bash
# IFS Cloud AST (Environnement de développement)
IFS_BASE_URL=https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1
IFS_CLIENT_ID=your_ifs_client_id_here
IFS_CLIENT_SECRET=your_ifs_client_secret_here
IFS_TOKEN_URL=https://beneteau-group-ast.ifs.cloud/auth/realms/beneast1/protocol/openid-connect/token
IFS_SCOPE=openid microprofile-jwt

# Next.js
NODE_ENV=development
NEXTAUTH_URL=http://localhost:3000
```

> 🔐 **Sécurité** : Ne jamais committer `.env.local` (déjà dans `.gitignore`)

### 2. Dépendances installées

```bash
# Installer les dépendances du projet
pnpm install

# Installer les navigateurs Playwright (si première fois)
pnpm exec playwright install
```

### 3. Application Next.js fonctionnelle

```bash
# Vérifier que l'app démarre correctement
pnpm run dev

# L'app doit être accessible sur http://localhost:3000
```

---

## 🎯 Commandes de test

### Tests complets (tous niveaux)

```bash
# Lancer TOUS les tests E2E (headless)
pnpm run test:e2e

# Équivalent à :
pnpm exec playwright test

# Lancer en mode interactif (UI Playwright)
pnpm run test:e2e:ui

# Équivalent à :
pnpm exec playwright test --ui
```

### Tests par niveau

```bash
# Niveau 1 : Health Checks (4 tests - ~30s)
pnpm exec playwright test health-checks.spec.ts

# Niveau 2 : API Unit Tests (6 tests - ~40s)
pnpm exec playwright test api-unit-tests.spec.ts

# Niveau 3 : Workflow Tests (5 tests - ~3min)
pnpm exec playwright test workflows/

# Niveau 4 : Business Validation (5 tests - ~50s)
pnpm exec playwright test business-validation.spec.ts

# Niveau 5 : Performance Tests (5 tests - ~2.5min)
pnpm exec playwright test performance-tests.spec.ts

# Niveau 6 : Cross-browser Tests (4 tests - ~2min)
pnpm exec playwright test cross-browser.spec.ts
```

### Tests par navigateur

```bash
# Chromium uniquement
pnpm exec playwright test --project=chromium

# Firefox uniquement
pnpm exec playwright test --project=firefox

# Webkit (Safari) uniquement
pnpm exec playwright test --project=webkit
```

### Tests spécifiques

```bash
# Exécuter un test spécifique par nom
pnpm exec playwright test -g "should complete happy path workflow"

# Exécuter un fichier de test spécifique
pnpm exec playwright test workflows/happy-path.spec.ts

# Exécuter en mode debug (pas à pas)
pnpm exec playwright test --debug workflows/happy-path.spec.ts
```

---

## 📊 Rapports de test

### Générer et visualiser les rapports

```bash
# Après l'exécution des tests, générer le rapport HTML
pnpm exec playwright show-report

# Le rapport s'ouvrira automatiquement dans votre navigateur
# URL : http://localhost:9323
```

### Contenu du rapport

Le rapport HTML inclut :
- ✅ **Statut de chaque test** (passed/failed/skipped)
- 📸 **Screenshots** des échecs
- 🎥 **Vidéos** des tests échoués
- 📊 **Traces Playwright** (timeline détaillée)
- ⏱️ **Durées d'exécution**
- 🌐 **Tests par navigateur**

---

## 🐛 Debug des tests

### Mode debug interactif

```bash
# Lancer un test en mode debug (pas à pas)
pnpm exec playwright test --debug workflows/happy-path.spec.ts

# Le navigateur s'ouvrira avec l'inspecteur Playwright
# Vous pouvez :
# - Avancer pas à pas (Step Over)
# - Voir les sélecteurs
# - Inspecter les éléments
# - Voir les logs console
```

### Mode headed (voir le navigateur)

```bash
# Exécuter les tests en mode "headed" (navigateur visible)
pnpm exec playwright test --headed

# Utile pour voir ce qui se passe en temps réel
```

### Logs & Traces

```bash
# Activer les logs détaillés
DEBUG=pw:api pnpm exec playwright test

# Générer des traces pour tous les tests
pnpm exec playwright test --trace on

# Voir les traces après exécution
pnpm exec playwright show-trace test-results/.../trace.zip
```

---

## 🚨 Résolution des problèmes

### Problème : "IFS AST inaccessible"

**Symptôme** : Tests échouent avec erreur réseau

**Solutions** :
1. Vérifier connexion Internet
2. Vérifier que IFS AST est accessible : https://beneteau-group-ast.ifs.cloud
3. Vérifier les credentials IFS dans `.env.local`
4. Tester manuellement l'API avec :
   ```bash
   pnpm run test:ifs-connection
   ```

### Problème : "Token OAuth2 invalide"

**Symptôme** : Erreur 401 Unauthorized

**Solutions** :
1. Vérifier `IFS_CLIENT_ID` et `IFS_CLIENT_SECRET`
2. Régénérer un token IFS si nécessaire
3. Vérifier que le token n'est pas expiré
4. Tester l'authentification avec :
   ```bash
   curl -X POST "$IFS_TOKEN_URL" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "grant_type=client_credentials" \
     -d "client_id=$IFS_CLIENT_ID" \
     -d "client_secret=$IFS_CLIENT_SECRET" \
     -d "scope=$IFS_SCOPE"
   ```

### Problème : "Shop Order introuvable"

**Symptôme** : Tests échouent car Shop Order n'existe plus dans IFS

**Solutions** :
1. Vérifier que le Shop Order existe toujours dans IFS AST
2. Utiliser un autre Shop Order validé (voir `fixtures/shop-orders.fixture.ts`)
3. Mettre à jour les fixtures avec de nouveaux Shop Orders

### Problème : "Timeout dépassé"

**Symptôme** : Tests échouent avec "Test timeout of 90000ms exceeded"

**Solutions** :
1. Vérifier que l'app Next.js tourne (`pnpm run dev`)
2. Vérifier que IFS AST répond rapidement (peut être lent)
3. Augmenter les timeouts dans `playwright.config.ts` :
   ```typescript
   timeout: 120000, // 2 minutes
   expect: { timeout: 20000 } // 20s
   ```

### Problème : "Port 3000 déjà utilisé"

**Symptôme** : Playwright ne peut pas démarrer le serveur Next.js

**Solutions** :
1. Tuer le processus utilisant le port 3000 :
   ```bash
   lsof -ti:3000 | xargs kill -9
   ```
2. Ou démarrer l'app manuellement et utiliser `reuseExistingServer` :
   ```bash
   pnpm run dev
   # Dans un autre terminal :
   pnpm exec playwright test
   ```

---

## 📈 Métriques de succès

### Critères d'acceptation

| Métrique | Cible | Comment vérifier |
|----------|-------|------------------|
| **Tests réussis** | 100% | Rapport Playwright |
| **Durée totale** | < 10 min | `pnpm exec playwright test` |
| **Pas de flakiness** | 0 tests instables | Exécuter 3x de suite |
| **Coverage workflow** | 5 étapes testées | Vérifier workflows/ |
| **Cross-browser** | 3 navigateurs | Vérifier `--project=*` |

### Exécution typique (temps attendus)

```bash
# Niveau 1 : Health Checks
✓ 4 tests passés | Durée : ~30s

# Niveau 2 : API Unit Tests
✓ 6 tests passés | Durée : ~40s

# Niveau 3 : Workflow Tests
✓ 5 tests passés | Durée : ~3min

# Niveau 4 : Business Validation
✓ 5 tests passés | Durée : ~50s

# Niveau 5 : Performance Tests
✓ 5 tests passés | Durée : ~2.5min

# Niveau 6 : Cross-browser Tests
✓ 4 tests passés | Durée : ~2min

# TOTAL : 29 tests | ~9 minutes ✅
```

---

## 🔧 Configuration avancée

### Exécution en parallèle

```bash
# Exécuter 4 tests en parallèle
pnpm exec playwright test --workers=4

# Exécuter 1 seul test à la fois (plus stable)
pnpm exec playwright test --workers=1
```

### CI/CD (GitHub Actions)

```yaml
# .github/workflows/e2e-tests.yml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Install Playwright browsers
        run: pnpm exec playwright install --with-deps
      
      - name: Run E2E tests
        run: pnpm run test:e2e
        env:
          IFS_CLIENT_ID: ${{ secrets.IFS_CLIENT_ID }}
          IFS_CLIENT_SECRET: ${{ secrets.IFS_CLIENT_SECRET }}
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

---

## 📚 Ressources

### Documentation officielle

- **Playwright** : https://playwright.dev
- **Playwright Best Practices** : https://playwright.dev/docs/best-practices
- **Debugging Guide** : https://playwright.dev/docs/debug

### Documentation projet

- **Phase 4 Roadmap** : `docs/tests/boat-configuration-editor/PHASE_4_E2E_ROADMAP.md`
- **Test Fixtures** : `tests/boat-configuration/e2e/fixtures/shop-orders.fixture.ts`
- **Test Helpers** : `tests/boat-configuration/e2e/helpers/test-helpers.ts`
- **E2E Config** : `tests/boat-configuration/e2e/config/e2e.config.ts`

---

## 📞 Support

### Problèmes courants

Voir la section **🚨 Résolution des problèmes** ci-dessus.

### Contact

Pour toute question ou problème :
1. Vérifier la documentation dans `docs/tests/`
2. Consulter les issues GitHub
3. Contacter l'équipe de développement

---

**Version** : 1.0.0  
**Dernière mise à jour** : 13 novembre 2025  
**Status** : ✅ Phase 4 Semaine 1 - Infrastructure complète
