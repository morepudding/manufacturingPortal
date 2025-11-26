# 🎭 Phase 4 - Tests E2E Playwright - DÉMARRAGE

**Date de démarrage** : 12 novembre 2025  
**Status** : 🔄 **EN COURS** (2/8 fichiers de tests créés)

---

## 📊 Objectifs Phase 4

### Objectifs principaux
- ✅ Tester le workflow complet utilisateur
- ✅ Tests sur navigateurs réels (Chrome, Firefox, Safari)
- ✅ Screenshots et vidéos en cas d'échec
- ✅ Prêt pour déploiement CI/CD
- 🔄 **Tests avec MSW (Mock Service Worker)** pour isolation

### Stratégie de tests E2E

```
Browser (Playwright)
    ↓
Next.js App (localhost:3000)
    ↓
API Routes
    ↓
Services
    ↓
MSW (Mock Service Worker) ← Intercepte les requêtes IFS
    ↓
[Mocked IFS Responses]
```

**Avantages de l'approche MSW pour E2E:**
- ✅ Tests **rapides** (~5-10s par test vs 20-30s avec API réelle)
- ✅ Tests **déterministes** (pas de dépendance environnement externe)
- ✅ Tests **isolés** (pas d'impact sur données IFS)
- ✅ **Données contrôlées** (fixtures avec vraies structures IFS)
- ✅ **Facile à maintenir** (pas de credentials IFS à gérer)

---

## 📂 Structure créée

```
tests/boat-configuration/e2e/
├── workflows/                              ✅ Créé
│   ├── happy-path.spec.ts                 ✅ CRÉÉ (4 tests)
│   ├── shop-order-not-found.spec.ts       ✅ CRÉÉ (8 tests)
│   ├── no-serial-number.spec.ts           🔄 À créer
│   ├── confirmation-cancel.spec.ts        🔄 À créer
│   ├── printer-validation.spec.ts         🔄 À créer
│   ├── stepper-navigation.spec.ts         🔄 À créer
│   ├── apim-errors.spec.ts                🔄 À créer
│   └── cross-platform.spec.ts             🔄 À créer
│
├── fixtures/                               🔄 À créer
│   └── test-data.ts
│
└── helpers/                                🔄 À créer
    └── navigation.ts
```

---

## ✅ Tests créés (2/8)

### 1. Happy Path (100% ✅)

**Fichier:** `tests/boat-configuration/e2e/workflows/happy-path.spec.ts`  
**Tests:** 4 tests  
**Couverture:** Workflow complet + sidebar + stepper + performance

#### Tests implémentés:
1. ✅ **Complete workflow** (5 étapes)
   - Saisie Shop Order → Confirmation → Customer Order → Sélection → Impression
   - Vérification Serial Number (JY6MB0019)
   - Vérification DOP ID (38)
   - Sélection imprimante & langue
   - Confirmation impression
   - Bouton "New Print" fonctionnel

2. ✅ **Contextual Sidebar**
   - Affichage Order No, Serial Number, Part No
   - Visible tout au long du workflow

3. ✅ **Stepper Navigation**
   - État "active" sur step courant
   - État "completed" sur steps précédents
   - Progression correcte (Entry → Confirmation → Customer Order → Selection)

4. ✅ **Performance**
   - Workflow complet < 30s avec mocks
   - Mesure temps d'exécution

**Status:** ✅ 100% complété

---

### 2. Shop Order Not Found (100% ✅)

**Fichier:** `tests/boat-configuration/e2e/workflows/shop-order-not-found.spec.ts`  
**Tests:** 8 tests  
**Couverture:** Gestion d'erreurs + validation + retry + UX

#### Tests implémentés:
1. ✅ **Error message display**
   - Message d'erreur clair et visible
   - Reste sur page d'entrée
   - Champs conservés pour faciliter correction

2. ✅ **Retry after error**
   - Premier essai → erreur (999999)
   - Second essai → succès (100563)
   - Workflow continue normalement

3. ✅ **Error message clarity**
   - Message avec suggestions
   - Format clair et actionnable

4. ✅ **No navigation on error**
   - URL reste sur `/boat-configuration?step=entry`
   - Formulaire visible
   - Pas de redirection intempestive

5. ✅ **Error dismissal**
   - Erreur disparaît en retapant des valeurs
   - UX fluide

6. ✅ **Form validation**
   - Champs requis validés
   - Bouton désactivé si invalide OU erreur au submit

7. ✅ **Invalid format handling**
   - Format invalide (ABC123) détecté
   - Erreur appropriée affichée

8. ✅ **Timeout handling**
   - Loader/spinner affiché pendant requête
   - Gestion gracieuse des timeouts

**Status:** ✅ 100% complété

---

## 🔄 Tests à créer (6/8)

### 3. No Serial Number (Shop Order sans DOP)

**Fichier:** `tests/boat-configuration/e2e/workflows/no-serial-number.spec.ts`  
**Status:** 🔄 À créer  
**Priorité:** Haute

**Tests planifiés:**
- Shop Order sans DOP → Serial Number = N/A
- Badge warning affiché
- Workflow continue quand même
- Skip ou Customer Order step adapté

**Durée estimée:** 0.5 jour

---

### 4. Confirmation Cancel

**Fichier:** `tests/boat-configuration/e2e/workflows/confirmation-cancel.spec.ts`  
**Status:** 🔄 À créer  
**Priorité:** Moyenne

**Tests planifiés:**
- Cliquer "Non, Recommencer" → retour entry
- Champs réinitialisés
- Workflow redémarre proprement

**Durée estimée:** 0.5 jour

---

### 5. Printer Validation

**Fichier:** `tests/boat-configuration/e2e/workflows/printer-validation.spec.ts`  
**Status:** 🔄 À créer  
**Priorité:** Haute

**Tests planifiés:**
- Bouton Print désactivé initialement
- Activé après sélection imprimante + langue
- Liste imprimantes chargée depuis API
- Liste langues chargée depuis API

**Durée estimée:** 1 jour

---

### 6. Stepper Navigation (complet)

**Fichier:** `tests/boat-configuration/e2e/workflows/stepper-navigation.spec.ts`  
**Status:** 🔄 À créer  
**Priorité:** Basse

**Tests planifiés:**
- États stepper à chaque étape
- Progression visuelle
- Retour en arrière (si supporté)

**Durée estimée:** 0.5 jour

---

### 7. APIM Errors

**Fichier:** `tests/boat-configuration/e2e/workflows/apim-errors.spec.ts`  
**Status:** 🔄 À créer  
**Priorité:** Haute

**Tests planifiés:**
- Timeout APIM (30s)
- 401 Unauthorized
- 500 Internal Server Error
- Messages d'erreur appropriés

**Durée estimée:** 1 jour

---

### 8. Cross-Platform

**Fichier:** `tests/boat-configuration/e2e/workflows/cross-platform.spec.ts`  
**Status:** 🔄 À créer  
**Priorité:** Moyenne

**Tests planifiés:**
- Chrome, Firefox, Safari (Webkit)
- Mobile (Pixel 5)
- Responsive design

**Durée estimée:** 1 jour

---

## 📊 Progression Phase 4

| Tâche | Tests | Status | Durée |
|-------|-------|--------|-------|
| **Happy Path** | 4 | ✅ | 0.5j |
| **Shop Order Not Found** | 8 | ✅ | 0.5j |
| **No Serial Number** | 2 | 🔄 | 0.5j |
| **Confirmation Cancel** | 2 | 🔄 | 0.5j |
| **Printer Validation** | 3 | 🔄 | 1j |
| **Stepper Navigation** | 2 | 🔄 | 0.5j |
| **APIM Errors** | 4 | 🔄 | 1j |
| **Cross-Platform** | 3 | 🔄 | 1j |
| **Total** | **28** | **12/28 (43%)** | **5.5j** |

**Temps total estimé:** 5.5 jours (vs 7 jours roadmap initiale - optimisation tests)  
**Temps écoulé:** 1 jour  
**Temps restant:** 4.5 jours

---

## 🛠️ Configuration Playwright

### Configuration actuelle

**Fichier:** `playwright.config.ts`

```typescript
export default defineConfig({
  testDir: './tests/boat-configuration/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 30000, // 30s timeout par test
  
  reporter: [
    ['html'],
    ['junit', { outputFile: 'test-results/junit.xml' }]
  ],
  
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  
  webServer: {
    command: 'pnpm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

### Scripts npm disponibles

```json
{
  "test:e2e": "playwright test",
  "test:e2e:ui": "playwright test --ui",
  "test:e2e:headed": "playwright test --headed",
  "test:e2e:debug": "playwright test --debug",
  "test:e2e:report": "playwright show-report"
}
```

---

## 🎯 Prochaines étapes

### Court terme (Cette semaine)

1. ✅ ~~Créer Happy Path test~~ (FAIT)
2. ✅ ~~Créer Shop Order Not Found test~~ (FAIT)
3. 🔄 Créer No Serial Number test
4. 🔄 Créer Confirmation Cancel test
5. 🔄 Créer Printer Validation test

### Moyen terme (Semaine prochaine)

6. 🔄 Créer Stepper Navigation test
7. 🔄 Créer APIM Errors test
8. 🔄 Créer Cross-Platform test
9. 🔄 Créer fixtures helper
10. 🔄 Créer navigation helper

### Long terme (Phase 5)

11. 🔄 Intégrer dans Azure DevOps Pipeline
12. 🔄 Configurer Playwright Cloud
13. 🔄 Tests automatiques sur PR

---

## 📝 Notes techniques

### MSW avec Playwright

Pour que MSW fonctionne avec Playwright E2E, il faut:

1. **Activer MSW dans l'app Next.js:**

```typescript
// src/app/layout.tsx ou src/app/providers.tsx
if (process.env.NEXT_PUBLIC_MSW_ENABLED === 'true') {
  if (typeof window === 'undefined') {
    // Server-side
    const { server } = await import('@/tests/boat-configuration/integration/mocks/setup')
    server.listen()
  } else {
    // Client-side
    const { worker } = await import('@/mocks/browser')
    worker.start()
  }
}
```

2. **Variables d'environnement E2E:**

```bash
# .env.e2e
NEXT_PUBLIC_MSW_ENABLED=true
BASE_URL=http://localhost:3000
```

3. **Lancer tests avec MSW:**

```bash
export NEXT_PUBLIC_MSW_ENABLED=true
pnpm run test:e2e
```

### Debugging

```bash
# Mode UI (interactif)
pnpm run test:e2e:ui

# Mode debug (step by step)
pnpm run test:e2e:debug

# Mode headed (voir le browser)
pnpm run test:e2e:headed

# Test spécifique
pnpm run test:e2e tests/boat-configuration/e2e/workflows/happy-path.spec.ts

# Voir le rapport HTML
pnpm run test:e2e:report
```

---

## 🎉 Conclusion Phase 4 (En cours)

**Status actuel:** 🔄 43% complété (12/28 tests)

**Points positifs:**
- ✅ Infrastructure Playwright opérationnelle
- ✅ MSW handlers réutilisés depuis tests intégration
- ✅ Tests happy path et erreurs de base créés
- ✅ Documentation en place

**Prochaines priorités:**
1. Tests validation (No Serial Number, Printer)
2. Tests gestion erreurs (APIM Errors)
3. Tests cross-browser

**Estimation mise à jour:** 4.5 jours restants pour Phase 4 complète

---

**Auteur:** GitHub Copilot  
**Dernière mise à jour:** 12 novembre 2025  
**Version:** 1.0.0
