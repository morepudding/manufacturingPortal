# 🧪 Roadmap de Tests - Boat Configuration Editor

**Auteur:** Manufacturing Portal Team  
**Version:** 1.1  
**Date mise à jour:** 12 novembre 2025  
**Environnement cible:** Azure DevOps + Playwright Cloud

**⚡ Progression globale:** Phase 1 (100% ✅) | Phase 2 (100% ✅) | Phase 3 (100% ✅) | Phase 4 (Démarrage 🔄) | Total: ~60% complété

---

## 📋 Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture des tests](#architecture-des-tests)
3. [Phase 1 : Setup & Infrastructure](#phase-1--setup--infrastructure)
4. [Phase 2 : Tests Unitaires Services](#phase-2--tests-unitaires-services)
5. [Phase 3 : Tests Intégration API Routes](#phase-3--tests-intégration-api-routes)
6. [Phase 4 : Tests E2E Playwright](#phase-4--tests-e2e-playwright)
7. [Phase 5 : CI/CD Azure DevOps](#phase-5--cicd-azure-devops)
8. [Maintenance & Evolution](#maintenance--evolution)

---

## 🎯 Vue d'ensemble

### Objectifs
- ✅ Couverture > 80% du code critique
- ✅ Tests automatisés dans Azure DevOps Pipeline
- ✅ Tests E2E sur Playwright Cloud
- ✅ Documentation complète et maintenable

### Stack de tests
- **Tests Unitaires:** Vitest (déjà configuré)
- **Tests Intégration:** Vitest + MSW (Mock Service Worker)
- **Tests E2E:** Playwright + Playwright Cloud (Azure)
- **CI/CD:** Azure DevOps Pipelines

### Architecture actuelle analysée

```
src/
├── app/
│   ├── (tools)/boat-configuration/
│   │   ├── page.tsx                    # Page principale (5 steps)
│   │   └── components/
│   │       ├── CustomerOrderValidation/
│   │       ├── PrinterLanguageSelection/
│   │       ├── PrintExecution/
│   │       ├── VerticalStepper/
│   │       └── ContextualSidebar.tsx
│   │
│   └── api/boat-configuration/
│       ├── shop-orders/search/route.ts  # POST /api/boat-configuration/shop-orders/search
│       ├── customer-orders/route.ts     # GET /api/boat-configuration/customer-orders
│       └── print/route.ts              # POST /api/boat-configuration/print
│
└── tools/boat-configuration/
    └── services/
        ├── shop-order-service.ts        # searchShopOrder()
        ├── serial-number-service.ts     # getFirstSerialNumberFromDop()
        ├── dop-service.ts               # extractMainDopId()
        ├── customer-order-service.ts    # searchCustomerOrder()
        └── print-service.ts             # executePrint()
```

---

## 🏗️ Architecture des tests

### Structure cible

```
tests/
└── boat-configuration/
    ├── unit/                           # Tests unitaires (Vitest)
    │   ├── services/
    │   │   ├── shop-order.test.ts
    │   │   ├── serial-number.test.ts
    │   │   ├── dop.test.ts
    │   │   └── customer-order.test.ts
    │   │
    │   └── utils/
    │       └── validation.test.ts
    │
    ├── integration/                    # Tests API Routes (Vitest + MSW)
    │   ├── api/
    │   │   ├── shop-orders-search.test.ts
    │   │   ├── customer-orders.test.ts
    │   │   └── print.test.ts
    │   │
    │   └── mocks/
    │       ├── handlers.ts             # MSW handlers
    │       └── fixtures.ts             # Données de test
    │
    ├── e2e/                            # Tests E2E (Playwright)
    │   ├── workflows/
    │   │   ├── happy-path.spec.ts
    │   │   ├── shop-order-not-found.spec.ts
    │   │   ├── no-serial-number.spec.ts
    │   │   └── confirmation-cancel.spec.ts
    │   │
    │   ├── fixtures/
    │   │   └── test-data.ts
    │   │
    │   └── helpers/
    │       └── navigation.ts
    │
    └── docs/
        ├── UNIT_TESTS.md               # Guide tests unitaires
        ├── INTEGRATION_TESTS.md        # Guide tests intégration
        ├── E2E_TESTS.md                # Guide tests E2E
        └── AZURE_SETUP.md              # Setup Azure DevOps
```

### Conventions de nommage

```typescript
// ✅ Tests unitaires
describe('shopOrderService', () => {
  describe('searchShopOrder', () => {
    it('should return shop order with serial number when found', async () => {})
    it('should return null serialNumber when no DOP exists', async () => {})
    it('should extract main DOP ID from composite format', async () => {})
  })
})

// ✅ Tests intégration
describe('POST /api/boat-configuration/shop-orders/search', () => {
  it('should return 200 with shop order data', async () => {})
  it('should return 404 when shop order not found', async () => {})
  it('should return 400 when parameters are missing', async () => {})
})

// ✅ Tests E2E
test('Complete workflow: search → confirm → select → print', async ({ page }) => {})
test('Shop Order not found shows error message', async ({ page }) => {})
```

---

## 📅 Phase 1 : Setup & Infrastructure ✅ COMPLÈTE

**Statut:** ✅ Terminée (12 novembre 2025)  
**Durée réelle:** 1 jour (vs 3 jours estimés)

### ✅ Réalisations

#### 1.1 Installation des dépendances ✅
- Playwright @1.56.1 installé avec browsers (Chromium, Firefox, Webkit)
- MSW @2.12.1 installé
- @testing-library/user-event @14.6.1 installé
- @vitest/ui @4.0.8 installé
- .env.test créé avec variables de test

#### 1.2 Configuration Playwright ✅
- `playwright.config.ts` créé avec:
  - 3 browsers configurés (Chromium, Firefox, Webkit)
  - Retry logic (2 retries en CI)
  - HTML + JUnit reporters
  - Trace + screenshots on failure
  - WebServer auto-start

#### 1.3 Configuration MSW ✅
- `tests/boat-configuration/integration/mocks/setup.ts` créé
- `tests/boat-configuration/integration/mocks/handlers.ts` créé avec handlers pour:
  - ShopOrderHandling.svc/ShopOrds
  - DopHeaderHandling.svc/Reference_DopHeadSerialReserv
  - PrintDialog.svc (printers, languages)

#### 1.4 Scripts package.json ✅
- `test:unit` - Tests unitaires
- `test:integration` - Tests intégration
- `test:e2e` - Tests E2E headless
- `test:e2e:ui` - Tests E2E UI mode
- `test:e2e:headed` - Tests E2E avec browser visible
- `test:watch` - Watch mode
- `test:ci` - Pipeline CI/CD

#### 1.5 Structure de dossiers ✅
```
tests/boat-configuration/
├── unit/
│   ├── services/
│   │   └── shop-order.test.ts ✅ (9 tests passent)
│   ├── utils/
│   └── fixtures/
│       └── shop-order.fixture.ts ✅ (données IFS réelles)
├── integration/
│   ├── api/
│   ├── mocks/
│   │   ├── setup.ts ✅
│   │   └── handlers.ts ✅
│   └── fixtures/
├── e2e/
│   ├── workflows/
│   ├── fixtures/
│   └── helpers/
└── docs/
    └── PHASE_1_SETUP_COMPLETE.md ✅
```

#### 1.6 Premier test unitaire ✅
- **Fichier:** `tests/boat-configuration/unit/services/shop-order.test.ts`
- **Tests:** 9/9 passent (100% ✅)
- **Couverture:** searchShopOrder() complète
- **Données:** Fixtures avec Shop Orders IFS réels (563, 949, 1043, 97277)

**Cas testés:**
1. ✅ Cas nominal avec DOP et Serial Number
2. ✅ Shop Order sans DOP (serialNumber=null)
3. ✅ DOP ID composé ("54 - 1035" → "54")
4. ✅ Shop Order non trouvé (found=false)
5. ✅ Validation paramètres (orderNo vide)
6. ✅ Validation paramètres (releaseNo vide)
7. ✅ Filtrage exact (éviter "1043" → "101043")
8. ✅ Erreur IFS (timeout, 500)
9. ✅ Erreur service Serial Number

---

## 📅 Phase 2 : Tests Unitaires Services (Semaine 1-2 - 2 jours)

### Objectifs
- Tester TOUTE la logique métier des services
- Isolation complète (pas d'appels IFS réels)
- Couverture > 90% pour les services critiques

### Tâches

#### 2.1 shop-order-service.ts ✅ COMPLÉTÉ

**Statut:** ✅ 9/9 tests passent (100%)  
**Fichier:** `tests/boat-configuration/unit/services/shop-order.test.ts`  
**Fixtures:** `tests/boat-configuration/unit/fixtures/shop-order.fixture.ts` (données IFS réelles)

**Tests implémentés:**
- ✅ Cas nominal avec DOP et Serial Number (Shop Order 563)
- ✅ Shop Order sans DOP (serialNumber=null)
- ✅ DOP ID composé parsing ("54 - 1035" → "54")
- ✅ Shop Order non trouvé (found=false)
- ✅ Validation paramètres (orderNo vide)
- ✅ Validation paramètres (releaseNo vide)
- ✅ Filtrage exact (éviter faux positif "1043" vs "101043")
- ✅ Erreur IFS (timeout, connexion)
- ✅ Erreur service Serial Number

**Couverture:** ~95% (logique métier complète)

---

#### 2.2 serial-number-service.ts ✅ COMPLÉTÉ

**Statut:** ✅ Tests implémentés (12 novembre 2025)  
**Fichier:** `tests/boat-configuration/unit/services/serial-number.test.ts`  
**Fixtures:** Utilise `shop-order.fixture.ts` (MOCK_DOP_SERIAL_RESERVATIONS)

**Tests implémentés:**

##### getFirstSerialNumberFromDop() - 7 tests
- ✅ Cas nominal : DOP "34" → Serial Number "JY6MB0019"
- ✅ Retour du premier Serial Number quand plusieurs existent
- ✅ Retour null quand aucun Serial Number n'existe
- ✅ DOP ID vide → null + warning
- ✅ DOP ID avec espaces (trim automatique)
- ✅ Erreur IFS (timeout) → throw error
- ✅ Format IFS invalide → throw error

##### getAllSerialNumbersFromDop() - 5 tests
- ✅ Retour de tous les Serial Numbers (multi-résultats)
- ✅ Retour d'un seul Serial Number
- ✅ Tableau vide quand aucun Serial Number
- ✅ DOP ID vide → tableau vide + warning
- ✅ Erreur IFS → throw error

##### hasSerialNumbers() - 5 tests
- ✅ Retour true si Serial Number existe
- ✅ Retour false si aucun Serial Number
- ✅ DOP ID vide → false (pas d'appel IFS)
- ✅ Erreur IFS → false (pas de throw)
- ✅ Gestion silencieuse des erreurs (log mais pas throw)

##### Tests de cohérence - 2 tests
- ✅ Cohérence hasSerialNumbers() ↔ getFirstSerialNumberFromDop()
- ✅ Cohérence getAllSerialNumbersFromDop() ↔ getFirstSerialNumberFromDop()

**Total:** 19 tests  
**Couverture estimée:** ~95% du service  
**Données:** Fixtures avec Serial Numbers IFS réels validés

---

#### 2.3 dop-service.ts ✅ COMPLÉTÉ

**Statut:** ✅ Tests implémentés (12 novembre 2025)  
**Fichier:** `tests/boat-configuration/unit/services/dop.test.ts`  
**Type:** Tests unitaires purs (pas de mocks - logique pure)

**Tests implémentés:**

##### extractMainDopId() - 15 tests
- ✅ Cas nominaux : "54 - 1035" → "54", "95 - 10088" → "95", "34 - 1014" → "34"
- ✅ DOP ID simple : "103" → "103", "42" → "42"
- ✅ Formats alternatifs : "37-2" → "37" (sans espaces)
- ✅ Whitespace & trim : "  95 - 10088  " → "95", "  34  " → "34"
- ✅ Espaces multiples : "54  -  1035" → "54"
- ✅ Edge cases : string vide → "", espaces uniquement
- ✅ Logs : vérification des logs de parsing

##### isCompositeDopId() - 9 tests
- ✅ DOP IDs composés : "54 - 1035", "95 - 10088", "37-2" → true
- ✅ DOP IDs simples : "103", "42", "1" → false
- ✅ Edge cases : "", "   " → false

##### parseDopId() - 15 tests
- ✅ Parsing composé : "54 - 1035" → { mainId: "54", secondaryId: "1035", isComposite: true }
- ✅ Parsing simple : "103" → { mainId: "103", secondaryId: null, isComposite: false }
- ✅ Formats alternatifs : "37-2" (sans espaces)
- ✅ Whitespace handling : trim automatique
- ✅ Edge cases : string vide, espaces
- ✅ Cas complexes : plusieurs séparateurs "54 - 1035 - 2"

##### Tests de cohérence - 4 tests
- ✅ extractMainDopId() ↔ parseDopId().mainId
- ✅ isCompositeDopId() ↔ parseDopId().isComposite
- ✅ DOP composés → secondaryId non-null
- ✅ DOP simples → secondaryId null

**Total:** 43 tests  
**Couverture estimée:** ~100% du service (logique pure)  
**Cas réels testés:** DOP IDs IFS validés (54, 95, 34, 48, 37, 103)

---

#### 2.4 customer-order-service.ts ✅ COMPLÉTÉ

**Statut:** ✅ Tests implémentés (12 novembre 2025)  
**Fichier:** `tests/boat-configuration/unit/services/customer-order.test.ts`  
**Tests:** 36 tests (23 tests métier + 13 tests utilitaires)

**Fonctions principales testées:**

##### getCustomerOrderLineByOrderNo() - 6 tests
- ✅ Récupération Customer Order Line via OrderNo + LineNo (méthode recommandée)
- ✅ Retour null si ligne non trouvée
- ✅ Validation OrderNo requis
- ✅ Validation LineNo requis
- ✅ Trim espaces automatique (OrderNo + LineNo)
- ✅ Erreur IFS → throw error

##### getCustomerOrderHeader() - 4 tests
- ✅ Récupération header Customer Order
- ✅ Throw error si header non trouvé
- ✅ Validation OrderNo requis
- ✅ Erreur IFS → throw error

##### getCustomerOrderInfoFromShopOrder() - 5 tests
- ✅ Récupération infos complètes (Line + Header) avec Serial Number
- ✅ Fonctionne sans Serial Number (validation optionnelle)
- ✅ Fallback si getCustomerOrderHeader échoue (données partielles OK)
- ✅ Retour null si Line non trouvée
- ✅ Retour null si erreur critique

##### getCustomerOrderByHullNumber() - 8 tests ⭐
- ✅ Récupération via Hull Number (site FR05A par défaut - MANDATORY Boat Config)
- ✅ Site FR05A explicitement fourni → OK
- ✅ Rejet si site différent de FR05A (validation Boat Configuration)
- ✅ Validation Hull Number requis
- ✅ Retour null si Customer Order non trouvé
- ✅ Throw error si Contract retourné n'est pas FR05A (mismatch)
- ✅ Fonctionne même si getCustomerOrderHeader échoue
- ✅ Méthode optimale : Direct CHullNumber lookup (pas de timeout)

**Fonctions utilitaires testées:**

##### formatDate() - 2 tests
- ✅ Formater date ISO en format français (01/07/2025)
- ✅ Retour "Invalid Date" si format invalide

##### getStatusBadge() - 4 tests
- ✅ Badge Released (green)
- ✅ Badge Planned (blue)
- ✅ Badge par défaut pour statut inconnu (gray)
- ✅ Gestion de tous les statuts définis (Released, Planned, Reserved, PartiallyDelivered, etc.)

##### canPrintForStatus() - 7 tests
- ✅ Autorise impression : Released, Reserved, PartiallyDelivered
- ✅ Interdit impression : Closed, Cancelled, Delivered, Invoiced
- ✅ Interdit impression pour statut inconnu (sécurité)

**Total:** 36 tests  
**Couverture estimée:** ~95% (4 fonctions principales + 3 utilitaires)  
**Points clés validés:**
- ✅ Méthode recommandée : getCustomerOrderLineByOrderNo() (OrderNo + LineNo)
- ✅ Méthode optimale : getCustomerOrderByHullNumber() (Direct CHullNumber lookup)
- ✅ Validation site FR05A MANDATORY pour Boat Configuration
- ✅ Fallback gracieux si getCustomerOrderHeader échoue
- ⚠️ getCustomerOrderLineBySerial() NON testée (dépréciée - timeouts CHullNumber)

---

#### 2.5 print-service.ts ✅ COMPLÉTÉ

**Statut:** ✅ Tests implémentés (12 novembre 2025)  
**Fichier:** `tests/boat-configuration/unit/services/print.test.ts`  
**Tests:** 21 tests (workflow 5 étapes + download PDF + gestion erreurs)

**Workflow complet testé:**

##### Workflow sans PDF (4 étapes) - 11 tests
- ✅ Workflow complet 4 étapes (GET Order → POST ResultKey → POST DialogInit → POST PrintRequest)
- ✅ Layout personnalisé utilisé (BEN_Boat_configuration_for_production.rdl)
- ✅ Layout IFS par défaut si non fourni
- ✅ Appel GET Customer Order avec OrderNo correct
- ✅ Validation ETag présent dans réponse Customer Order
- ✅ Appel POST PrintResultKey avec ETag dans headers (If-Match)
- ✅ Validation ResultKey numérique valide (throw si invalide)
- ✅ Appel POST PrintDialogInit avec ResultKey
- ✅ Validation LayoutName présent (throw si manquant)
- ✅ Appel POST ReportPrintRequest avec tous paramètres (ResultKey, Layout, Language, Printer, Copies)
- ✅ Copies = 1 par défaut si non fourni
- ✅ Message d'erreur clair si une étape échoue

##### Workflow avec PDF (5 étapes) - 6 tests
- ✅ Workflow complet avec download PDF (5 étapes)
- ✅ Polling : attendre que PDF soit disponible (max 15 tentatives x 1s)
- ✅ Throw si PDF indisponible après max attempts (15s timeout)
- ✅ Téléchargement PDF avec getRaw (Accept: application/octet-stream)
- ✅ Validation PDF valide (header %PDF obligatoire)
- ✅ Infos PDF incluses dans résultat (fileName, size, created, id)

##### Gestion des erreurs - 4 tests
- ✅ Throw si GET Customer Order échoue
- ✅ Throw si POST PrintResultKey échoue
- ✅ Throw si POST PrintDialogInit échoue
- ✅ Throw si POST ReportPrintRequest échoue

**Total:** 21 tests  
**Couverture estimée:** ~95% (workflow complet + cas d'erreurs)  
**Points critiques validés:**
- ✅ Workflow 4 étapes (impression sans PDF)
- ✅ Workflow 5 étapes (impression avec PDF)
- ✅ Polling PDF avec timeout 15s
- ✅ Validation header PDF (%PDF)
- ✅ Layout personnalisé vs IFS default
- ✅ Gestion erreurs à chaque étape
- ⏱️ Tests longue durée : Polling timeout test (15s)

---

## 📊 Résumé Global des Tests Unitaires

### Services Boat Configuration ✅ 100% COMPLÉTÉ

| Service | Tests | Couverture | Status |
|---------|-------|------------|--------|
| shop-order-service.ts | 9 | ~95% | ✅ |
| serial-number-service.ts | 19 | ~95% | ✅ |
| dop-service.ts | 39 | ~100% | ✅ |
| customer-order-service.ts | 36 | ~95% | ✅ |
| print-service.ts | 21 | ~95% | ✅ |
| **TOTAL** | **124** | **~96%** | **✅** |

**Temps d'exécution:** ~22s (dont 15s pour polling timeout test)  
**Taux de réussite:** 124/124 (100%)

---

#### 1.2 Configuration Playwright

**Fichier:** `playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/boat-configuration/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['junit', { outputFile: 'test-results/junit.xml' }]
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
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

#### 1.3 Configuration MSW

**Fichier:** `tests/boat-configuration/integration/mocks/setup.ts`

```typescript
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)

// Démarrer le serveur avant tous les tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

// Réinitialiser après chaque test
afterEach(() => server.resetHandlers())

// Arrêter après tous les tests
afterAll(() => server.close())
```

#### 1.4 Mise à jour package.json

```json
{
  "scripts": {
    "test": "vitest",
    "test:unit": "vitest run tests/boat-configuration/unit",
    "test:integration": "vitest run tests/boat-configuration/integration",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:coverage": "vitest run --coverage",
    "test:watch": "vitest",
    "test:ci": "pnpm test:unit && pnpm test:integration && pnpm test:e2e"
  }
}
```

#### 1.5 Création structure de dossiers

```bash
mkdir -p tests/boat-configuration/{unit,integration,e2e}/{services,api,workflows,mocks,fixtures,helpers}
mkdir -p tests/boat-configuration/docs
```

**Durée estimée:** 1 jour  
**Responsable:** DevOps + Lead Dev  
**Deliverables:**
- ✅ Playwright installé et configuré
- ✅ MSW installé et configuré
- ✅ Structure de dossiers créée
- ✅ Scripts npm ajoutés

---

## 🧪 Phase 2 : Tests Unitaires Services (Semaine 1-2 - 5 jours)

### Objectifs
- ✅ Tester tous les services métier
- ✅ Couverture > 90% des services
- ✅ Mock des appels IFS

### 2.1 Test: shop-order-service.ts

**Fichier:** `tests/boat-configuration/unit/services/shop-order.test.ts`

**Cas à tester:**

```typescript
describe('searchShopOrder', () => {
  // ✅ Cas nominal
  it('should return shop order with serial number when DOP exists', async () => {
    // Mock IFS response avec DopId
    // Vérifier appel searchShopOrder()
    // Assertion: found=true, serialNumber présent
  })

  // ✅ Cas sans DOP
  it('should return shop order without serial number when no DOP exists', async () => {
    // Mock IFS response sans DopId
    // Assertion: found=true, serialNumber=null
  })

  // ✅ Cas DOP ID composé
  it('should extract main DOP ID from composite format "54 - 1035"', async () => {
    // Mock IFS response avec "54 - 1035"
    // Assertion: dopHeaderId="54"
  })

  // ✅ Cas Shop Order inexistant
  it('should return found=false when shop order not found', async () => {
    // Mock IFS response vide
    // Assertion: found=false, error présent
  })

  // ✅ Validation paramètres
  it('should return error when parameters are missing', async () => {
    // Appel sans orderNo
    // Assertion: error="Missing required parameters"
  })

  // ✅ Filtrage exact
  it('should filter exact match and avoid partial matches', async () => {
    // Mock IFS retourne [1043, 101043]
    // Recherche "1043"
    // Assertion: retourne uniquement 1043
  })

  // ✅ Erreur IFS
  it('should handle IFS connection errors gracefully', async () => {
    // Mock erreur réseau
    // Assertion: found=false, error message approprié
  })
})
```

**Mock IFS Client:**

```typescript
// tests/boat-configuration/unit/mocks/ifs-client.mock.ts
import { vi } from 'vitest'

export const mockIFSClient = {
  get: vi.fn(),
}

vi.mock('@/shared/services/ifs-client', () => ({
  getIFSClient: () => mockIFSClient,
}))
```

**Fixtures:**

```typescript
// tests/boat-configuration/unit/fixtures/shop-order.fixture.ts
export const MOCK_SHOP_ORDER_WITH_DOP = {
  OrderNo: '563',
  ReleaseNo: '*',
  SequenceNo: '*',
  DopId: '34 - 1014',
  PartNo: 'LG5XA',
  PartDescription: 'Hull Assembly',
  Contract: 'FR05A',
}

export const MOCK_SHOP_ORDER_WITHOUT_DOP = {
  OrderNo: '999',
  ReleaseNo: '*',
  SequenceNo: '*',
  DopId: null,
  PartNo: 'PART123',
  PartDescription: 'Component',
  Contract: 'FR05A',
}
```

**Durée estimée:** 2 jours  
**Couverture cible:** > 90%

---

### 2.2 Test: serial-number-service.ts

**Fichier:** `tests/boat-configuration/unit/services/serial-number.test.ts`

**Cas à tester:**

```typescript
describe('getFirstSerialNumberFromDop', () => {
  it('should return first serial number when found', async () => {})
  it('should return null when no serial number exists', async () => {})
  it('should handle empty DOP ID', async () => {})
  it('should log warning for empty DOP ID', async () => {})
})

describe('getAllSerialNumbersFromDop', () => {
  it('should return array of serial numbers', async () => {})
  it('should return empty array when none found', async () => {})
})

describe('hasSerialNumbers', () => {
  it('should return true when serial numbers exist', async () => {})
  it('should return false when no serial numbers exist', async () => {})
})
```

**Durée estimée:** 1 jour

---

### 2.3 Test: dop-service.ts

**Fichier:** `tests/boat-configuration/unit/services/dop.test.ts`

**Cas à tester:**

```typescript
describe('extractMainDopId', () => {
  it('should extract "54" from "54 - 1035"', () => {
    expect(extractMainDopId('54 - 1035')).toBe('54')
  })

  it('should return same value for non-composite ID', () => {
    expect(extractMainDopId('95')).toBe('95')
  })

  it('should handle empty string', () => {
    expect(extractMainDopId('')).toBe('')
  })

  it('should trim whitespace', () => {
    expect(extractMainDopId('  34  ')).toBe('34')
  })
})
```

**Durée estimée:** 0.5 jour

---

### 2.4 Test: customer-order-service.ts

**Fichier:** `tests/boat-configuration/unit/services/customer-order.test.ts`

**Cas à tester:**

```typescript
describe('searchCustomerOrder', () => {
  it('should find customer order by hull number and site', async () => {})
  it('should return null when not found', async () => {})
  it('should try multiple sites (FR05A, FR02A, FR01A)', async () => {})
  it('should handle IFS errors gracefully', async () => {})
})
```

**Durée estimée:** 1 jour

---

### 2.5 Test: print-service.ts

**Fichier:** `tests/boat-configuration/unit/services/print.test.ts`

**Cas à tester:**

```typescript
describe('executePrint', () => {
  it('should call IFS print API with correct parameters', async () => {})
  it('should return success with print job ID', async () => {})
  it('should handle print errors', async () => {})
  it('should validate required parameters', async () => {})
})
```

**Durée estimée:** 0.5 jour

---

**📊 Résumé Phase 2:**
- **Durée totale:** 5 jours
- **Fichiers de tests:** 5
- **Tests estimés:** ~40-50 tests unitaires
- **Couverture cible:** > 90% des services

---

## 🔌 Phase 3 : Tests Intégration API Routes ✅ COMPLÈTE

**Date de complétion:** 12 novembre 2025  
**Status:** ✅ **100% COMPLÈTE** (44/44 tests passants)

### 📊 Résultats globaux

- ✅ **44/44 tests d'intégration passants** (100%)
- ✅ **3/3 API Routes testées** (shop-orders/search, customer-orders, print)
- ✅ **18 handlers MSW validés** (Azure AD + IFS APIM + IFS Direct)
- ✅ **Fixtures avec données réelles IFS** (52 entités capturées)
- ✅ **Documentation complète** (PHASE_3_INTEGRATION_COMPLETE.md)

### Objectifs atteints
- ✅ Tester les API Routes Next.js
- ✅ Valider la communication Services ↔ API ↔ Frontend
- ✅ Tester les codes HTTP et formats de réponse
- ✅ **Mock Azure APIM** (pas d'appels réels à l'APIM en intégration)
- ✅ Valider l'authentification OAuth2 Azure AD

### ⚠️ Architecture avec Azure APIM

```
Tests Intégration
    ↓
Next.js API Routes
    ↓
Services (boat-configuration/services/)
    ↓
IFS Client (ifs-client.ts) ← MOCK ICI (MSW)
    ↓
[Azure APIM] ← PAS APPELÉ EN TESTS
    ↓
[IFS Cloud] ← PAS APPELÉ EN TESTS
```

**Stratégie de mock:**
- **MSW (Mock Service Worker)** intercepte les requêtes OAuth2 + APIM
- Mock des endpoints Azure AD Token (`IFS_TOKEN_URL`)
- Mock des endpoints Azure APIM (`IFS_BASE_URL`)
- Validation des headers `Authorization: Bearer <token>`
- Validation des headers `Ocp-Apim-Subscription-Key` (si utilisé)

### 3.0 Préparation : Investigation des données IFS réelles

**⚠️ PRÉREQUIS CRITIQUE : Récupération de données IFS réelles pour mocks fiables**

Avant de créer les mocks MSW, il est **essentiel d'investiguer l'APIM et IFS Cloud** pour récupérer de la vraie donnée et créer des fixtures réalistes.

**Objectifs:**
- ✅ Capturer les **vraies réponses IFS** via Azure APIM
- ✅ Analyser la **structure exacte** des réponses OData
- ✅ Identifier les **champs critiques** et leurs formats
- ✅ Créer des **fixtures basées sur vraies données** (pas d'inventions)

**Méthode d'investigation:**

```typescript
// Script d'investigation : scripts/investigate-ifs-data.ts
import { getIFSClient } from '@/shared/services/ifs-client'

async function investigateIFSData() {
  const client = getIFSClient()
  
  console.log('🔍 Investigation 1: Shop Orders')
  const shopOrders = await client.get(
    'ShopOrderHandling.svc/ShopOrds',
    {
      $filter: "contains(OrderNo,'563')",
      $select: '*', // Récupérer TOUS les champs
      $top: '5'
    }
  )
  console.log(JSON.stringify(shopOrders, null, 2))
  
  console.log('🔍 Investigation 2: DOP Headers')
  const dopHeaders = await client.get(
    'DopHeaderHandling.svc/Reference_DopHeadSerialReserv',
    {
      $filter: "contains(DopId,'34')",
      $select: '*',
      $top: '5'
    }
  )
  console.log(JSON.stringify(dopHeaders, null, 2))
  
  console.log('🔍 Investigation 3: Customer Orders')
  const customerOrders = await client.get(
    'CustomerOrderHandling.svc/CustomerOrderLines',
    {
      $filter: "CHullNumber eq 'LG5MA0114' and Contract eq 'FR05A'",
      $select: '*',
      $top: '5'
    }
  )
  console.log(JSON.stringify(customerOrders, null, 2))
  
  // Sauvegarder dans des fixtures
  await fs.writeFile(
    'tests/boat-configuration/integration/fixtures/ifs-real-data.json',
    JSON.stringify({ shopOrders, dopHeaders, customerOrders }, null, 2)
  )
}

investigateIFSData()
```

**Exécution:**
```bash
# Lancer l'investigation sur APIM AST (Test Environment)
export IFS_BASE_URL=https://gbenapimgtaiscommondev.azure-api.net/IFS/Manufacturing
export IFS_CLIENT_ID=<ast_client_id>
export IFS_CLIENT_SECRET=<ast_secret>
export IFS_TOKEN_URL=https://login.microsoftonline.com/.../token
export IFS_SCOPE=api://api.IFS.dev/.default

pnpm tsx scripts/investigate-ifs-data.ts
```

**Résultats attendus:**
- Fichier `ifs-real-data.json` avec **vraies structures IFS**
- Documentation des champs présents/absents
- Formats des dates, nombres, codes
- Relations entre entités (Shop Order → DOP → Serial Number)

**Durée estimée:** 0.5 jour (investigation + documentation)

---

### 3.1 Configuration MSW pour Azure APIM

**Fichier:** `tests/boat-configuration/integration/mocks/apim-handlers.ts`

**⚠️ IMPORTANT:** Les mocks MSW doivent être créés à partir des **vraies données IFS** récupérées lors de l'investigation (étape 3.0).

```typescript
import { http, HttpResponse } from 'msw'

// ===== Mock Azure AD OAuth2 Token Endpoint =====
export const azureAdTokenHandler = http.post(
  'https://login.microsoftonline.com/*/oauth2/v2.0/token',
  async ({ request }) => {
    const body = await request.text()
    const params = new URLSearchParams(body)

    // Valider les paramètres OAuth2
    if (params.get('grant_type') !== 'client_credentials') {
      return HttpResponse.json(
        { error: 'unsupported_grant_type' },
        { status: 400 }
      )
    }

    if (!params.get('client_id') || !params.get('client_secret')) {
      return HttpResponse.json(
        { error: 'invalid_client' },
        { status: 401 }
      )
    }

    // Retourner un token mocké
    return HttpResponse.json({
      access_token: 'mock_azure_ad_token_12345',
      token_type: 'Bearer',
      expires_in: 3600,
      scope: params.get('scope') || 'api://api.IFS.dev/.default'
    })
  }
)

// ===== Mock Azure APIM - ShopOrderHandling.svc =====
export const apimShopOrderHandler = http.get(
  'https://gbenapimgtaiscommondev.azure-api.net/IFS/Manufacturing/ShopOrderHandling.svc/ShopOrds',
  ({ request }) => {
    const url = new URL(request.url)
    const filter = url.searchParams.get('$filter')

    // Vérifier le token Azure AD
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer mock_azure_ad_token')) {
      return HttpResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Mock différents Shop Orders
    if (filter?.includes('563')) {
      return HttpResponse.json({
        '@odata.context': 'https://mock/ShopOrderHandling.svc/$metadata#ShopOrds',
        value: [{
          OrderNo: '563',
          ReleaseNo: '1',
          SequenceNo: '10',
          DopId: '34 - 1014',
          PartNo: 'LG5XA',
          Contract: 'FR05A'
        }]
      })
    }

    if (filter?.includes('999999')) {
      return HttpResponse.json({
        '@odata.context': 'https://mock/ShopOrderHandling.svc/$metadata#ShopOrds',
        value: []
      })
    }

    return HttpResponse.json({ value: [] })
  }
)

// ===== Mock Azure APIM - DopHeaderHandling.svc =====
export const apimDopHeaderHandler = http.get(
  'https://gbenapimgtaiscommondev.azure-api.net/IFS/Manufacturing/DopHeaderHandling.svc/Reference_DopHeadSerialReserv',
  ({ request }) => {
    const url = new URL(request.url)
    const filter = url.searchParams.get('$filter')

    // Vérifier le token Azure AD
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer mock_azure_ad_token')) {
      return HttpResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Mock Serial Numbers par DOP ID
    if (filter?.includes('34')) {
      return HttpResponse.json({
        value: [{
          DopId: '34',
          SerialNo: 'JY6MB0019'
        }]
      })
    }

    return HttpResponse.json({ value: [] })
  }
)

// ===== Mock Azure APIM - CustomerOrderHandling.svc =====
export const apimCustomerOrderHandler = http.get(
  'https://gbenapimgtaiscommondev.azure-api.net/IFS/Manufacturing/CustomerOrderHandling.svc/CustomerOrderLines',
  ({ request }) => {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer mock_azure_ad_token')) {
      return HttpResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    return HttpResponse.json({
      value: [{
        OrderNo: 'C1000038587',
        LineNo: '1',
        CHullNumber: 'LG5MA0114',
        Contract: 'FR05A'
      }]
    })
  }
)

// ===== Exporter tous les handlers APIM =====
export const apimHandlers = [
  azureAdTokenHandler,
  apimShopOrderHandler,
  apimDopHeaderHandler,
  apimCustomerOrderHandler,
]
```

### 3.2 Test: POST /api/boat-configuration/shop-orders/search

**Fichier:** `tests/boat-configuration/integration/api/shop-orders-search.test.ts`

**Cas à tester:**

```typescript
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { setupServer } from 'msw/node'
import { apimHandlers } from '../mocks/apim-handlers'
import { POST, GET } from '@/app/api/boat-configuration/shop-orders/search/route'

// Setup MSW server avec les handlers APIM
const server = setupServer(...apimHandlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('POST /api/boat-configuration/shop-orders/search (avec Azure APIM)', () => {
  // ✅ Succès avec Serial Number via APIM
  it('should return 200 with shop order and serial number from APIM', async () => {
    const request = new Request('http://localhost/api/boat-configuration/shop-orders/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderNo: '563',
        releaseNo: '*',
        sequenceNo: '*',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.found).toBe(true)
    expect(data.shopOrder).toBeDefined()
    expect(data.shopOrder.OrderNo).toBe('563')
    expect(data.serialNumber).toBe('JY6MB0019')
  })

  // ✅ Vérifier authentification OAuth2 Azure AD
  it('should authenticate with Azure AD before calling APIM', async () => {
    const request = new Request('http://localhost/api/boat-configuration/shop-orders/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderNo: '563',
        releaseNo: '*',
        sequenceNo: '*',
      }),
    })

    const response = await POST(request)
    
    // Si le token Azure AD n'est pas obtenu, l'appel APIM échouera
    expect(response.status).toBe(200)
  })

  // ✅ Succès sans Serial Number
  it('should return 200 with null serialNumber when no DOP', async () => {
    // Mock shop order sans DOP (géré dans apim-handlers)
    const request = new Request('http://localhost/api/boat-configuration/shop-orders/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderNo: '888',
        releaseNo: '*',
        sequenceNo: '*',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.serialNumber).toBeNull()
  })

  // ✅ Shop Order non trouvé via APIM
  it('should return 404 when shop order not found in APIM', async () => {
    const request = new Request('http://localhost/api/boat-configuration/shop-orders/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderNo: '999999',
        releaseNo: '*',
        sequenceNo: '*',
      }),
    })

    const response = await POST(request)

    expect(response.status).toBe(404)
  })

  // ✅ Validation paramètres
  it('should return 400 when orderNo is missing', async () => {
    const request = new Request('http://localhost/api/boat-configuration/shop-orders/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        releaseNo: '*',
        sequenceNo: '*',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toContain('Missing required parameters')
  })

  // ✅ Types invalides
  it('should return 400 when parameters are not strings', async () => {
    const request = new Request('http://localhost/api/boat-configuration/shop-orders/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderNo: 123, // Number au lieu de string
        releaseNo: '*',
        sequenceNo: '*',
      }),
    })

    const response = await POST(request)

    expect(response.status).toBe(400)
  })

  // ✅ Erreur APIM (401 Unauthorized)
  it('should handle APIM authentication errors gracefully', async () => {
    // Override handler pour simuler erreur auth
    server.use(
      http.post('https://login.microsoftonline.com/*/oauth2/v2.0/token', () => {
        return HttpResponse.json(
          { error: 'invalid_client' },
          { status: 401 }
        )
      })
    )

    const request = new Request('http://localhost/api/boat-configuration/shop-orders/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderNo: '563',
        releaseNo: '*',
        sequenceNo: '*',
      }),
    })

    const response = await POST(request)

    expect(response.status).toBe(500)
  })
})

describe('GET /api/boat-configuration/shop-orders/search', () => {
  it('should return 405 Method Not Allowed', async () => {
    const request = new Request('http://localhost/api/boat-configuration/shop-orders/search', {
      method: 'GET',
    })

    const response = await GET(request)

    expect(response.status).toBe(405)
  })
})
```

**Durée estimée:** 1.5 jours (+ config MSW APIM)

---

### 3.3 Test: GET /api/boat-configuration/customer-orders

**Fichier:** `tests/boat-configuration/integration/api/customer-orders.test.ts`

**Cas à tester:**

```typescript
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { setupServer } from 'msw/node'
import { apimHandlers, apimCustomerOrderHandler } from '../mocks/apim-handlers'
import { GET } from '@/app/api/boat-configuration/customer-orders/route'

const server = setupServer(...apimHandlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('GET /api/boat-configuration/customer-orders (avec Azure APIM)', () => {
  // ✅ Succès avec Customer Order via APIM
  it('should return 200 with customer order from APIM', async () => {
    const url = new URL('http://localhost/api/boat-configuration/customer-orders')
    url.searchParams.set('hullNumber', 'LG5MA0114')
    url.searchParams.set('site', 'FR05A')

    const request = new Request(url.toString())
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.OrderNo).toBe('C1000038587')
    expect(data.Contract).toBe('FR05A')
  })

  // ✅ Customer Order non trouvé
  it('should return 404 when not found in APIM', async () => {
    const url = new URL('http://localhost/api/boat-configuration/customer-orders')
    url.searchParams.set('hullNumber', 'UNKNOWN123')
    url.searchParams.set('site', 'FR05A')

    const request = new Request(url.toString())
    const response = await GET(request)

    expect(response.status).toBe(404)
  })

  // ✅ Validation hullNumber requis
  it('should validate hullNumber parameter', async () => {
    const url = new URL('http://localhost/api/boat-configuration/customer-orders')
    url.searchParams.set('site', 'FR05A')

    const request = new Request(url.toString())
    const response = await GET(request)

    expect(response.status).toBe(400)
  })

  // ✅ Site par défaut FR05A
  it('should use FR05A as default site', async () => {
    const url = new URL('http://localhost/api/boat-configuration/customer-orders')
    url.searchParams.set('hullNumber', 'LG5MA0114')

    const request = new Request(url.toString())
    const response = await GET(request)

    expect(response.status).toBe(200)
  })

  // ✅ Vérifier authentification APIM
  it('should pass Azure AD token to APIM', async () => {
    const url = new URL('http://localhost/api/boat-configuration/customer-orders')
    url.searchParams.set('hullNumber', 'LG5MA0114')

    const request = new Request(url.toString())
    const response = await GET(request)

    // Si le token n'est pas valide, APIM retournera 401
    expect(response.status).toBe(200)
  })
})
```

**Durée estimée:** 1 jour

---

### 3.4 Test: POST /api/boat-configuration/print

**Fichier:** `tests/boat-configuration/integration/api/print.test.ts`

**Cas à tester:**

```typescript
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { apimHandlers } from '../mocks/apim-handlers'
import { POST } from '@/app/api/boat-configuration/print/route'

// Ajouter les handlers APIM pour le workflow d'impression
const printHandlers = [
  ...apimHandlers,
  
  // Mock GET Customer Order avec ETag
  http.get(
    'https://gbenapimgtaiscommondev.azure-api.net/IFS/Manufacturing/CustomerOrderHandling.svc/CustomerOrderSet(*)',
    ({ request }) => {
      const authHeader = request.headers.get('Authorization')
      if (!authHeader?.startsWith('Bearer mock_azure_ad_token')) {
        return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      return HttpResponse.json(
        { OrderNo: 'C1000038587', CustomerNo: 'CNB' },
        { headers: { 'ETag': 'W/"abc123"' } }
      )
    }
  ),

  // Mock POST PrintResultKey
  http.post(
    'https://gbenapimgtaiscommondev.azure-api.net/IFS/Manufacturing/CustomerOrderHandling.svc/CustomerOrderSet(*)/CustomerOrder_PrintResultKey',
    ({ request }) => {
      const ifMatch = request.headers.get('If-Match')
      if (!ifMatch) {
        return HttpResponse.json({ error: 'ETag required' }, { status: 428 })
      }

      return HttpResponse.json({ ResultKey: 12345 })
    }
  ),

  // Mock POST PrintDialogInit
  http.post(
    'https://gbenapimgtaiscommondev.azure-api.net/IFS/Manufacturing/PrintDialog.svc/PrintDialogInit',
    () => {
      return HttpResponse.json({
        ResultKey: 12345,
        LayoutName: 'BEN_Boat_configuration_for_production.rdl',
        Title: 'Boat Configuration'
      })
    }
  ),

  // Mock POST ReportPrintRequest
  http.post(
    'https://gbenapimgtaiscommondev.azure-api.net/IFS/Manufacturing/PrintDialog.svc/ReportPrintRequests',
    () => {
      return new HttpResponse(null, { status: 204 })
    }
  ),
]

const server = setupServer(...printHandlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('POST /api/boat-configuration/print (via Azure APIM)', () => {
  // ✅ Workflow complet 4 étapes via APIM
  it('should complete 4-step print workflow via APIM', async () => {
    const request = new Request('http://localhost/api/boat-configuration/print', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderNo: 'C1000038587',
        reportId: 'PROFORMA_INVOICE_REP',
        printer: 'PDF_PRINTER',
        language: 'en',
        copies: 1,
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.message).toContain('Print workflow completed')
  })

  // ✅ Validation paramètres requis
  it('should validate required parameters', async () => {
    const request = new Request('http://localhost/api/boat-configuration/print', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderNo: 'C1000038587',
        // Manque reportId, printer, language
      }),
    })

    const response = await POST(request)

    expect(response.status).toBe(400)
  })

  // ✅ Vérifier authentification OAuth2
  it('should authenticate with Azure AD before calling APIM', async () => {
    const request = new Request('http://localhost/api/boat-configuration/print', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderNo: 'C1000038587',
        reportId: 'PROFORMA_INVOICE_REP',
        printer: 'PDF_PRINTER',
        language: 'en',
      }),
    })

    const response = await POST(request)

    // Si le token n'est pas obtenu, l'appel APIM échouera
    expect(response.status).toBe(200)
  })

  // ✅ Gestion erreur APIM (401 Unauthorized)
  it('should handle APIM authentication errors', async () => {
    server.use(
      http.post('https://login.microsoftonline.com/*/oauth2/v2.0/token', () => {
        return HttpResponse.json({ error: 'invalid_client' }, { status: 401 })
      })
    )

    const request = new Request('http://localhost/api/boat-configuration/print', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderNo: 'C1000038587',
        reportId: 'PROFORMA_INVOICE_REP',
        printer: 'PDF_PRINTER',
        language: 'en',
      }),
    })

    const response = await POST(request)

    expect(response.status).toBe(500)
  })

  // ✅ Validation ETag requis (428 Precondition Required)
  it('should require ETag for print request', async () => {
    server.use(
      http.get(
        'https://gbenapimgtaiscommondev.azure-api.net/IFS/Manufacturing/CustomerOrderHandling.svc/CustomerOrderSet(*)',
        () => {
          // Retourner sans ETag
          return HttpResponse.json({ OrderNo: 'C1000038587' })
        }
      )
    )

    const request = new Request('http://localhost/api/boat-configuration/print', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderNo: 'C1000038587',
        reportId: 'PROFORMA_INVOICE_REP',
        printer: 'PDF_PRINTER',
        language: 'en',
      }),
    })

    const response = await POST(request)

    expect(response.status).toBe(500)
  })
})
```

**Durée estimée:** 1.5 jours

---

**📊 Résumé Phase 3 (COMPLÈTE ✅):**
- **Durée réelle:** 1 jour (estimée: 4.5 jours - optimisation grâce aux fixtures Phase 2)
- **Fichiers de tests:** 3 tests API + 1 fichier handlers MSW (18 handlers)
- **Tests réalisés:** **44 tests** (vs 30-35 estimés - 126% de couverture)
- **Couverture atteinte:** **100% des API Routes** (3/3)
- **Infrastructure MSW:** **18 handlers** (Azure AD + APIM + Direct IFS)
- **Fixtures:** **52 entités IFS réelles** (investigation complétée en Phase 2)

### Tests par API Route

| API Route | Tests | Couverture | Status |
|-----------|-------|------------|--------|
| **POST /api/boat-configuration/shop-orders/search** | 15/15 ✅ | Complète | ✅ |
| **GET /api/boat-configuration/customer-orders** | 13/13 ✅ | Complète | ✅ |
| **POST /api/boat-configuration/print** | 16/16 ✅ | Complète | ✅ |
| **TOTAL** | **44/44** ✅ | **100%** | ✅ |

### Infrastructure MSW validée (18 handlers)

#### Authentification
1. ✅ **Azure AD Token** : POST `/auth/token` → Mock OAuth2 token

#### Shop Orders & DOP Headers
2. ✅ **Shop Orders** : GET `/ShopOrderHandling.svc/ShopOrds`
3. ✅ **DOP Headers** : GET `/DopHeaderHandling.svc/Reference_DopHeadSerialReservSet`

#### Customer Orders
4. ✅ **Customer Order Lines** : GET `/CustomerOrderHandling.svc/CustomerOrderLineSet`
5. ✅ **Customer Order Headers** : GET `/CustomerOrderHandling.svc/CustomerOrderSet`

#### Print - Shared Resources
6. ✅ **Printers** : GET `/PrintDialog.svc/LogicalPrinters`
7. ✅ **Languages** : GET `/PrintDialog.svc/LanguageCodes`

#### Print - Nouvelle API (5 étapes)
8. ✅ **Get Customer Order + ETag**
9. ✅ **Print Result Key**
10. ✅ **Print Dialog Init**
11. ✅ **Report Print Request**
12. ✅ **PDF Archive (polling)**
13. ✅ **Download PDF**

#### Print - Ancienne API (deprecated - 5 handlers)
14-18. ✅ **Legacy handlers** (gardés pour référence)

### Découvertes techniques importantes

1. **OData EntitySet naming** : Différence APIM vs Direct IFS (`CustomerOrderLineSet` vs `CustomerOrderLines`)
2. **Site FR05A obligatoire** : Boat Configuration Editor requiert exclusivement FR05A
3. **CHullNumber field** : Ajouté aux fixtures pour support Mode 1 (recherche optimale)
4. **Filtres OData** : Préférer `contains()` à `eq` pour compatibilité
5. **Nouvelle API Print** : Migration vers workflow 5 étapes optimisé

### Documentation créée

- ✅ `tests/boat-configuration/docs/PHASE_3_INTEGRATION_COMPLETE.md` (résumé complet)
- ✅ `tests/boat-configuration/integration/api/shop-orders-search.test.ts` (15 tests)
- ✅ `tests/boat-configuration/integration/api/customer-orders.test.ts` (13 tests)
- ✅ `tests/boat-configuration/integration/api/print.test.ts` (16 tests)
- ✅ `tests/boat-configuration/integration/mocks/apim-handlers.ts` (18 handlers)
- ✅ `tests/boat-configuration/integration/setup.ts` (MSW server)

---

## 🎭 Phase 4 : Tests E2E Playwright (Semaine 3 - 5 jours)

### Objectifs
- ✅ Tester le workflow complet utilisateur
- ✅ Tests sur navigateurs réels (Chrome, Firefox, Safari)
- ✅ Screenshots et vidéos en cas d'échec
- ✅ Prêt pour Azure Playwright Cloud
- ✅ **Tests avec Azure APIM mocké** (pas d'appels réels en E2E)

### ⚠️ Stratégie E2E avec Azure APIM

**Architecture choisie : Tests E2E avec APIM Test Environment (AST) - RECOMMANDÉ ✅**

```
Browser (Playwright)
    ↓
Next.js App (localhost:3000 ou staging)
    ↓
API Routes
    ↓
Services
    ↓
IFS Client
    ↓
[Azure APIM - Test Environment] ✅
    ↓
[IFS Cloud - AST] ✅ (Environnement de test dédié)
```

**Justification:**

❌ **Problème avec Mock MSW pour E2E:**
- Les mocks ne testent pas le **code réel** (IFS Client, authentification OAuth2, gestion erreurs APIM)
- Les mocks ne testent pas la **data réelle** (formats IFS, edge cases, relations entre entités)
- Faux sentiment de sécurité : tests passent mais bugs en production

✅ **Avantages APIM Test Environment (AST):**
- Teste le **workflow complet** : App → APIM → IFS Cloud
- Teste avec de la **vraie donnée IFS** (Shop Orders, Serial Numbers, Customer Orders réels)
- Teste l'**authentification OAuth2 réelle** Azure AD
- Teste la **gestion d'erreurs APIM** (rate limiting, timeouts, 500, etc.)
- Environnement **AST dédié aux tests** (pas de risque impact production)
- **Détecte les bugs d'intégration** que les mocks masquent

**Configuration :**

```typescript
// playwright.config.ts
export default defineConfig({
  testDir: './tests/boat-configuration/e2e',
  
  use: {
    // ✅ APIM Test Environment (AST)
    baseURL: process.env.E2E_BASE_URL || 'http://localhost:3000',
    
    // Pas de mock MSW pour E2E
    // NEXT_PUBLIC_MSW_ENABLED: false (par défaut)
  },
  
  webServer: {
    command: 'pnpm run dev',
    url: 'http://localhost:3000',
    env: {
      // Variables APIM Test Environment (AST)
      IFS_BASE_URL: process.env.IFS_TEST_APIM_URL,
      IFS_CLIENT_ID: process.env.IFS_TEST_CLIENT_ID,
      IFS_CLIENT_SECRET: process.env.IFS_TEST_CLIENT_SECRET,
      IFS_TOKEN_URL: process.env.AZURE_AD_TEST_TOKEN_URL,
      IFS_SCOPE: process.env.IFS_TEST_SCOPE,
    },
  },
})
```

**Variables d'environnement E2E (AST):**

```bash
# .env.e2e (APIM Test Environment - AST)
IFS_BASE_URL=https://gbenapimgtaiscommondev.azure-api.net/IFS/Manufacturing
IFS_CLIENT_ID=<ast_client_id>
IFS_CLIENT_SECRET=<ast_secret>
IFS_TOKEN_URL=https://login.microsoftonline.com/<tenant>/oauth2/v2.0/token
IFS_SCOPE=api://api.IFS.dev/.default

# Playwright Cloud
PLAYWRIGHT_SERVICE_ACCESS_TOKEN=<your_token>
PLAYWRIGHT_SERVICE_URL=https://playwright.microsoft.com/...
```

**Gestion des données de test AST:**

Pour éviter la pollution de l'environnement AST, utiliser des **données de test dédiées** :

```typescript
// tests/boat-configuration/e2e/fixtures/ast-test-data.ts

/**
 * Données de test validées sur environnement AST
 * ⚠️ Ces Shop Orders existent réellement sur IFS Cloud AST
 */
export const AST_TEST_DATA = {
  shopOrders: {
    withSerialNumber: {
      orderNo: '563',        // ✅ Existe sur AST
      releaseNo: '1',
      sequenceNo: '10',
      expectedSerial: 'JY6MB0019',
      expectedDopId: '34'
    },
    
    withoutSerialNumber: {
      orderNo: '888',        // ✅ Existe sur AST (sans DOP)
      releaseNo: '1',
      sequenceNo: '10',
      expectedSerial: null
    },
    
    notFound: {
      orderNo: '999999',     // ❌ N'existe pas (test erreur 404)
      releaseNo: '1',
      sequenceNo: '10'
    }
  },
  
  customerOrders: {
    valid: {
      hullNumber: 'LG5MA0114',  // ✅ Existe sur AST
      site: 'FR05A',
      expectedOrderNo: 'C1000038587'
    },
    
    notFound: {
      hullNumber: 'UNKNOWN123',  // ❌ N'existe pas
      site: 'FR05A'
    }
  }
}
```

**Stratégie de tests :**

1. **Tests Unitaires** → Mock IFS Client (isolation services)
2. **Tests Intégration** → Mock APIM MSW (isolation API Routes)
3. **Tests E2E** → **APIM Test Environment (AST)** ✅ (workflow complet réel)

**Risques & Mitigations :**

| Risque | Mitigation |
|--------|------------|
| **AST indisponible** | Retry automatique (2x), fallback sur staging |
| **Données AST changent** | Validation fixtures avant chaque run, alertes |
| **Rate limiting APIM** | Limiter parallélisation (workers=2), throttling |
| **Tests lents** | Parallélisation Playwright Cloud, cache intelligent |
| **Pollution données** | Utiliser données read-only, pas de modifications |

**Durée tests E2E (AST) :**
- ~15-20 minutes (vs 5-8 min avec mocks)
- Mais **100x plus fiables** pour détecter bugs réels

### 4.0 Configuration APIM Test Environment (AST)

**⚠️ CONFIGURATION OBLIGATOIRE : Tests E2E avec environnement IFS réel**

**Fichier:** `tests/boat-configuration/e2e/config/ast-environment.ts`

```typescript
/**
 * Configuration APIM Test Environment (AST - IFS Cloud)
 * 
 * Environnement dédié aux tests E2E avec vraie donnée IFS
 * ⚠️ NE PAS utiliser l'environnement PRODUCTION
 */

export const AST_APIM_CONFIG = {
  // Azure APIM Test Environment
  baseUrl: process.env.IFS_TEST_APIM_URL || 'https://gbenapimgtaiscommondev.azure-api.net/IFS/Manufacturing',
  
  // Azure AD OAuth2
  clientId: process.env.IFS_TEST_CLIENT_ID,
  clientSecret: process.env.IFS_TEST_CLIENT_SECRET,
  tokenUrl: process.env.AZURE_AD_TEST_TOKEN_URL || 'https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token',
  scope: process.env.IFS_TEST_SCOPE || 'api://api.IFS.dev/.default',
  
  // Rate limiting
  maxRequestsPerMinute: 100,
  retryAttempts: 3,
  retryDelay: 2000, // ms
}

/**
 * Valider la configuration avant de lancer les tests
 */
export function validateASTConfiguration() {
  const required = ['IFS_TEST_APIM_URL', 'IFS_TEST_CLIENT_ID', 'IFS_TEST_CLIENT_SECRET']
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    throw new Error(
      `❌ Missing AST configuration: ${missing.join(', ')}\n` +
      `Please configure these environment variables in .env.e2e`
    )
  }
  
  console.log('✅ AST APIM Configuration validated')
  console.log(`   Base URL: ${AST_APIM_CONFIG.baseUrl}`)
}
```

**Fichier:** `.env.e2e` (à créer)

```bash
# ===== Azure APIM - Test Environment (AST) =====
# ⚠️ Environnement IFS Cloud dédié aux tests (PAS PRODUCTION)

IFS_TEST_APIM_URL=https://gbenapimgtaiscommondev.azure-api.net/IFS/Manufacturing
IFS_TEST_CLIENT_ID=<obtenir_du_devops>
IFS_TEST_CLIENT_SECRET=<obtenir_du_devops>
AZURE_AD_TEST_TOKEN_URL=https://login.microsoftonline.com/<tenant_id>/oauth2/v2.0/token
IFS_TEST_SCOPE=api://api.IFS.dev/.default

# ===== Playwright Cloud =====
PLAYWRIGHT_SERVICE_ACCESS_TOKEN=<your_token>
PLAYWRIGHT_SERVICE_URL=https://playwright.microsoft.com/workspaces/...

# ===== Configuration App =====
E2E_BASE_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=test_secret_for_e2e_min_32_chars_long
```

**Configuration Playwright (mise à jour) :**

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'
import { validateASTConfiguration } from './tests/boat-configuration/e2e/config/ast-environment'

// ✅ Valider configuration AST avant de lancer les tests
if (process.env.CI || process.env.E2E_USE_AST === 'true') {
  validateASTConfiguration()
}

export default defineConfig({
  testDir: './tests/boat-configuration/e2e',
  fullyParallel: false, // ⚠️ Séquentiel pour éviter rate limiting APIM
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1, // Retry car APIM peut être instable
  workers: process.env.CI ? 2 : 1, // ⚠️ Max 2 workers pour rate limiting APIM
  timeout: 60000, // 60s timeout (APIM peut être lent)
  
  reporter: [
    ['html'],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list'] // Afficher progression en console
  ],
  
  use: {
    baseURL: process.env.E2E_BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    // ⚠️ Timeout plus long pour appels APIM réels
    actionTimeout: 15000,
    navigationTimeout: 30000,
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
    // ⚠️ Safari désactivé pour tests AST (instable)
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
    
    // Tests sur mobile
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  
  webServer: {
    command: 'pnpm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000, // 2 min timeout
    
    // ✅ Variables APIM AST injectées
    env: {
      IFS_BASE_URL: process.env.IFS_TEST_APIM_URL,
      IFS_CLIENT_ID: process.env.IFS_TEST_CLIENT_ID,
      IFS_CLIENT_SECRET: process.env.IFS_TEST_CLIENT_SECRET,
      IFS_TOKEN_URL: process.env.AZURE_AD_TEST_TOKEN_URL,
      IFS_SCOPE: process.env.IFS_TEST_SCOPE,
    },
  },
})
```

**Commande de lancement :**

```bash
# Lancer E2E avec APIM AST
export $(cat .env.e2e | xargs)
pnpm run test:e2e

# Ou avec env-cmd
pnpm add -D env-cmd
pnpm run test:e2e:ast  # Script: env-cmd -f .env.e2e playwright test
```

**Durée estimée:** 1 jour (configuration + validation)

---

### 4.1 Test: Happy Path (Workflow nominal avec APIM AST)

**Fichier:** `tests/boat-configuration/e2e/workflows/happy-path.spec.ts`

```typescript
import { test, expect } from '@playwright/test'
import { AST_TEST_DATA } from '../fixtures/ast-test-data'

test.describe('Boat Configuration - Happy Path (APIM AST - IFS Cloud)', () => {
  test('Complete workflow: search → confirm → customer order → select → print', async ({ page }) => {
    // ⚠️ Ce test utilise de vraies données IFS sur environnement AST
    const testData = AST_TEST_DATA.shopOrders.withSerialNumber
    
    // ===== Step 1: Navigation =====
    await page.goto('/boat-configuration')
    await expect(page.getByRole('heading', { name: 'Boat Configuration Editor' })).toBeVisible()

    // ===== Step 2: Saisie Shop Order (vraie donnée AST) =====
    await page.fill('input[name="orderNo"]', testData.orderNo)
    await page.fill('input[name="releaseNo"]', testData.releaseNo)
    await page.fill('input[name="sequenceNo"]', testData.sequenceNo)
    
    // Cliquer sur Rechercher (appel APIM AST réel)
    await page.click('button:has-text("Rechercher")')

    // Attendre la navigation (peut être lent avec APIM réel)
    await page.waitForURL('**/boat-configuration?step=confirmation', { timeout: 30000 })

    // ===== Step 3: Vérifier Serial Number (depuis IFS AST réel) =====
    await expect(page.getByText('Serial Number:')).toBeVisible()
    await expect(page.getByText(testData.expectedSerial)).toBeVisible()
    
    // Vérifier DOP ID affiché
    await expect(page.getByText('DOP ID:')).toBeVisible()
    await expect(page.getByText(testData.expectedDopId)).toBeVisible()

    // ===== Step 4: Confirmer =====
    await page.click('button:has-text("Oui, Continuer")')
    await page.waitForURL('**/boat-configuration?step=customer-order', { timeout: 30000 })

    // ===== Step 5: Vérifier Customer Order (depuis IFS AST réel) =====
    await expect(page.getByText('Customer Order')).toBeVisible()
    
    // ⚠️ Données Customer Order peuvent varier sur AST
    // On vérifie juste la présence, pas la valeur exacte
    await expect(page.locator('[data-testid="customer-order-number"]')).toBeVisible()
    
    // Confirmer Customer Order
    await page.click('button:has-text("Confirmer")')
    await page.waitForURL('**/boat-configuration?step=selection', { timeout: 30000 })

    // ===== Step 6: Sélection Imprimante et Langue =====
    // Attendre chargement des dropdowns (appels APIM AST réels)
    await expect(page.locator('select[name="printer"]')).toBeVisible({ timeout: 15000 })
    await expect(page.locator('select[name="language"]')).toBeVisible()
    
    // ⚠️ Les imprimantes disponibles viennent de l'IFS réel
    const printerSelect = page.locator('select[name="printer"]')
    const printerOptions = await printerSelect.locator('option').allTextContents()
    
    // Vérifier qu'on a au moins une imprimante
    expect(printerOptions.length).toBeGreaterThan(1)
    
    // Sélectionner première imprimante disponible
    await printerSelect.selectOption({ index: 1 })
    await page.selectOption('select[name="language"]', 'en')
    
    // Vérifier bouton activé
    const printButton = page.getByRole('button', { name: 'Print Document' })
    await expect(printButton).toBeEnabled()
    
    // Cliquer Print (workflow 4 étapes APIM AST réel)
    await printButton.click()

    // ===== Step 7: Vérifier confirmation =====
    // ⚠️ Le print peut prendre du temps avec IFS réel
    await page.waitForURL('**/boat-configuration?step=print-result', { timeout: 60000 })
    await expect(page.getByText(/Print.*success/i)).toBeVisible()

    // ===== Step 8: Bouton New Print =====
    await expect(page.getByRole('button', { name: 'New Print' })).toBeVisible()
    
    // Cliquer New Print pour recommencer
    await page.click('button:has-text("New Print")')
    await expect(page).toHaveURL('**/boat-configuration?step=entry')
  })
  
  test('Should display shop order details in sidebar with real IFS data', async ({ page }) => {
    const testData = AST_TEST_DATA.shopOrders.withSerialNumber
    
    await page.goto('/boat-configuration')
    
    // Workflow jusqu'à confirmation (vraies données AST)
    await page.fill('input[name="orderNo"]', testData.orderNo)
    await page.fill('input[name="releaseNo"]', testData.releaseNo)
    await page.fill('input[name="sequenceNo"]', testData.sequenceNo)
    await page.click('button:has-text("Rechercher")')
    
    await page.waitForURL('**/boat-configuration?step=confirmation', { timeout: 30000 })
    
    // Vérifier sidebar contextuel avec données IFS réelles
    const sidebar = page.locator('.contextual-sidebar')
    await expect(sidebar.getByText(`Order No: ${testData.orderNo}`)).toBeVisible()
    await expect(sidebar.getByText(`Serial Number: ${testData.expectedSerial}`)).toBeVisible()
    
    // ⚠️ Part No peut varier sur AST, on vérifie juste la présence
    await expect(sidebar.getByText(/Part No:/)).toBeVisible()
  })
})
```

**Durée estimée:** 1.5 jours

---

### 4.2 Test: Shop Order Not Found

**Fichier:** `tests/boat-configuration/e2e/workflows/shop-order-not-found.spec.ts`

```typescript
import { test, expect } from '@playwright/test'
import { AST_TEST_DATA } from '../fixtures/ast-test-data'

test.describe('Boat Configuration - Shop Order Not Found (APIM AST)', () => {
  test('Should show error message when shop order not found in IFS AST', async ({ page }) => {
    const testData = AST_TEST_DATA.shopOrders.notFound
    
    await page.goto('/boat-configuration')

    // Saisir Shop Order inexistant (vraie recherche IFS AST)
    await page.fill('input[name="orderNo"]', testData.orderNo)
    await page.fill('input[name="releaseNo"]', testData.releaseNo)
    await page.fill('input[name="sequenceNo"]', testData.sequenceNo)
    await page.click('button:has-text("Rechercher")')

    // Vérifier message d'erreur (peut prendre du temps avec APIM réel)
    await expect(page.getByText(/Shop Order not found/i)).toBeVisible({ timeout: 30000 })
    
    // Vérifier qu'on reste sur la page entry
    await expect(page).toHaveURL('**/boat-configuration?step=entry')
    
    // Vérifier que les champs sont toujours remplis
    await expect(page.locator('input[name="orderNo"]')).toHaveValue(testData.orderNo)
  })
  
  test('Should allow retry after error with real IFS data', async ({ page }) => {
    const notFoundData = AST_TEST_DATA.shopOrders.notFound
    const validData = AST_TEST_DATA.shopOrders.withSerialNumber
    
    await page.goto('/boat-configuration')
    
    // Premier essai - erreur (vraie recherche IFS AST)
    await page.fill('input[name="orderNo"]', notFoundData.orderNo)
    await page.fill('input[name="releaseNo"]', notFoundData.releaseNo)
    await page.fill('input[name="sequenceNo"]', notFoundData.sequenceNo)
    await page.click('button:has-text("Rechercher")')
    
    await expect(page.getByText(/Shop Order not found/i)).toBeVisible({ timeout: 30000 })
    
    // Deuxième essai - succès (vraie donnée IFS AST)
    await page.fill('input[name="orderNo"]', validData.orderNo)
    await page.fill('input[name="releaseNo"]', validData.releaseNo)
    await page.fill('input[name="sequenceNo"]', validData.sequenceNo)
    await page.click('button:has-text("Rechercher")')
    
    // Devrait réussir avec données IFS réelles
    await page.waitForURL('**/boat-configuration?step=confirmation', { timeout: 30000 })
    await expect(page.getByText('Serial Number:')).toBeVisible()
    await expect(page.getByText(validData.expectedSerial)).toBeVisible()
  })
})
```

**Durée estimée:** 0.5 jour

---

### 4.3 Test: No Serial Number (Shop Order sans DOP)

**Fichier:** `tests/boat-configuration/e2e/workflows/no-serial-number.spec.ts`

```typescript
import { test, expect } from '@playwright/test'

test.describe('Boat Configuration - No Serial Number', () => {
  test('Should handle shop order without serial number (no DOP)', async ({ page }) => {
    await page.goto('/boat-configuration')

    // Saisir Shop Order sans DOP (mock APIM)
    await page.fill('input[name="orderNo"]', '888')
    await page.fill('input[name="releaseNo"]', '*')
    await page.fill('input[name="sequenceNo"]', '*')
    await page.click('button:has-text("Rechercher")')

    await page.waitForURL('**/boat-configuration?step=confirmation')

    // Vérifier affichage N/A pour Serial Number
    await expect(page.getByText('Serial Number:')).toBeVisible()
    await expect(page.getByText('N/A')).toBeVisible()

    // Warning badge affiché
    await expect(page.locator('.badge-warning')).toBeVisible()
    await expect(page.getByText(/No serial number found/i)).toBeVisible()

    // Confirmer quand même
    await page.click('button:has-text("Oui, Continuer")')

    // Devrait passer directement à la sélection (skip customer order si pas de serial)
    await page.waitForURL('**/boat-configuration?step=selection')
  })
})
```

**Durée estimée:** 0.5 jour

---

### 4.4 Test: Confirmation Cancel

**Fichier:** `tests/boat-configuration/e2e/workflows/confirmation-cancel.spec.ts`

```typescript
import { test, expect } from '@playwright/test'

test.describe('Boat Configuration - Cancel Workflow', () => {
  test('Should return to entry when user clicks No', async ({ page }) => {
    await page.goto('/boat-configuration')

    // Workflow jusqu'à confirmation
    await page.fill('input[name="orderNo"]', '563')
    await page.fill('input[name="releaseNo"]', '*')
    await page.fill('input[name="sequenceNo"]', '*')
    await page.click('button:has-text("Rechercher")')

    await page.waitForURL('**/boat-configuration?step=confirmation')

    // Cliquer "Non, Recommencer"
    await page.click('button:has-text("Non, Recommencer")')

    // Retour à l'entry
    await expect(page).toHaveURL('**/boat-configuration?step=entry')
    await expect(page.getByRole('heading', { name: /Step 1/i })).toBeVisible()
    
    // Champs réinitialisés
    await expect(page.locator('input[name="orderNo"]')).toHaveValue('')
  })
})
```

**Durée estimée:** 0.5 jour

---

### 4.5 Test: Printer Selection Validation

**Fichier:** `tests/boat-configuration/e2e/workflows/printer-validation.spec.ts`

```typescript
import { test, expect } from '@playwright/test'

test.describe('Boat Configuration - Printer Validation', () => {
  test('Print button should be disabled until printer and language selected', async ({ page }) => {
    await page.goto('/boat-configuration')
    
    // Workflow jusqu'à sélection
    await page.fill('input[name="orderNo"]', '563')
    await page.fill('input[name="releaseNo"]', '*')
    await page.fill('input[name="sequenceNo"]', '*')
    await page.click('button:has-text("Rechercher")')
    
    await page.waitForURL('**/boat-configuration?step=confirmation')
    await page.click('button:has-text("Oui, Continuer")')
    
    await page.waitForURL('**/boat-configuration?step=customer-order')
    await page.click('button:has-text("Confirmer")')
    
    await page.waitForURL('**/boat-configuration?step=selection')

    // Vérifier bouton désactivé initialement
    const printButton = page.getByRole('button', { name: 'Print Document' })
    await expect(printButton).toBeDisabled()

    // Sélectionner seulement l'imprimante
    await page.selectOption('select[name="printer"]', 'PDF_PRINTER')
    await expect(printButton).toBeDisabled()

    // Sélectionner la langue
    await page.selectOption('select[name="language"]', 'en')
    await expect(printButton).toBeEnabled()
  })
  
  test('Should display printer list from APIM', async ({ page }) => {
    await page.goto('/boat-configuration')
    
    // Workflow jusqu'à sélection
    await page.fill('input[name="orderNo"]', '563')
    await page.fill('input[name="releaseNo"]', '*')
    await page.fill('input[name="sequenceNo"]', '*')
    await page.click('button:has-text("Rechercher")')
    await page.waitForURL('**/boat-configuration?step=confirmation')
    await page.click('button:has-text("Oui, Continuer")')
    await page.waitForURL('**/boat-configuration?step=customer-order')
    await page.click('button:has-text("Confirmer")')
    await page.waitForURL('**/boat-configuration?step=selection')
    
    // Vérifier dropdown imprimantes
    const printerSelect = page.locator('select[name="printer"]')
    await expect(printerSelect).toBeVisible()
    
    // Vérifier options (mockées par APIM)
    const options = await printerSelect.locator('option').allTextContents()
    expect(options.length).toBeGreaterThan(1) // Au moins une option + placeholder
  })
})
```

**Durée estimée:** 1 jour

---

### 4.6 Test: Stepper Navigation

**Fichier:** `tests/boat-configuration/e2e/workflows/stepper-navigation.spec.ts`

```typescript
import { test, expect } from '@playwright/test'

test.describe('Boat Configuration - Stepper UI', () => {
  test('Vertical stepper should show current step correctly', async ({ page }) => {
    await page.goto('/boat-configuration')

    // Step 1 actif
    const step1 = page.locator('.stepper-step').filter({ hasText: 'Entry' })
    await expect(step1).toHaveClass(/active/)

    // Workflow vers Step 2
    await page.fill('input[name="orderNo"]', '563')
    await page.fill('input[name="releaseNo"]', '*')
    await page.fill('input[name="sequenceNo"]', '*')
    await page.click('button:has-text("Rechercher")')
    await page.waitForURL('**/boat-configuration?step=confirmation')

    // Step 2 actif, Step 1 completed
    const step2 = page.locator('.stepper-step').filter({ hasText: 'Confirmation' })
    await expect(step2).toHaveClass(/active/)
    await expect(step1).toHaveClass(/completed/)
    
    // Continuer vers Step 3
    await page.click('button:has-text("Oui, Continuer")')
    await page.waitForURL('**/boat-configuration?step=customer-order')
    
    const step3 = page.locator('.stepper-step').filter({ hasText: 'Customer Order' })
    await expect(step3).toHaveClass(/active/)
  })
})
```

**Durée estimée:** 0.5 jour

---

### 4.7 Test: Error Handling APIM

**Fichier:** `tests/boat-configuration/e2e/workflows/apim-errors.spec.ts`

```typescript
import { test, expect } from '@playwright/test'

test.describe('Boat Configuration - APIM Error Handling', () => {
  test('Should handle APIM timeout gracefully', async ({ page }) => {
    // Note: Ce test nécessite de configurer MSW pour simuler timeout
    await page.goto('/boat-configuration')
    
    await page.fill('input[name="orderNo"]', 'TIMEOUT_TEST')
    await page.fill('input[name="releaseNo"]', '*')
    await page.fill('input[name="sequenceNo"]', '*')
    await page.click('button:has-text("Rechercher")')
    
    // Vérifier message d'erreur timeout
    await expect(page.getByText(/Connection timeout/i)).toBeVisible({ timeout: 30000 })
  })
  
  test('Should handle APIM 401 Unauthorized', async ({ page }) => {
    // Simuler erreur auth Azure AD
    await page.goto('/boat-configuration')
    
    await page.fill('input[name="orderNo"]', 'AUTH_ERROR_TEST')
    await page.fill('input[name="releaseNo"]', '*')
    await page.fill('input[name="sequenceNo"]', '*')
    await page.click('button:has-text("Rechercher")')
    
    // Vérifier message d'erreur auth
    await expect(page.getByText(/Authentication failed/i)).toBeVisible()
  })
  
  test('Should handle APIM 500 Internal Server Error', async ({ page }) => {
    await page.goto('/boat-configuration')
    
    await page.fill('input[name="orderNo"]', '500_ERROR_TEST')
    await page.fill('input[name="releaseNo"]', '*')
    await page.fill('input[name="sequenceNo"]', '*')
    await page.click('button:has-text("Rechercher")')
    
    // Vérifier message d'erreur serveur
    await expect(page.getByText(/Server error|Something went wrong/i)).toBeVisible()
  })
})
```

**Durée estimée:** 1 jour

---

### 4.8 Tests Cross-Browser & Mobile

**Fichier:** `tests/boat-configuration/e2e/workflows/cross-platform.spec.ts`

```typescript
import { test, expect } from '@playwright/test'

test.describe('Boat Configuration - Cross-Browser Compatibility', () => {
  test('Should work on all browsers (Chrome, Firefox, Safari)', async ({ page, browserName }) => {
    console.log(`Testing on ${browserName}`)
    
    await page.goto('/boat-configuration')
    
    // Workflow complet
    await page.fill('input[name="orderNo"]', '563')
    await page.fill('input[name="releaseNo"]', '*')
    await page.fill('input[name="sequenceNo"]', '*')
    await page.click('button:has-text("Rechercher")')
    
    await page.waitForURL('**/boat-configuration?step=confirmation')
    await expect(page.getByText('Serial Number:')).toBeVisible()
  })
})

test.describe('Boat Configuration - Mobile Compatibility', () => {
  test('Should work on mobile devices', async ({ page }) => {
    await page.goto('/boat-configuration')
    
    // Vérifier responsive design
    const heading = page.getByRole('heading', { name: 'Boat Configuration Editor' })
    await expect(heading).toBeVisible()
    
    // Workflow sur mobile
    await page.fill('input[name="orderNo"]', '563')
    await page.fill('input[name="releaseNo"]', '*')
    await page.fill('input[name="sequenceNo"]', '*')
    await page.click('button:has-text("Rechercher")')
    
    await page.waitForURL('**/boat-configuration?step=confirmation')
    await expect(page.getByText('Serial Number:')).toBeVisible()
  })
})
```

**Durée estimée:** 0.5 jour

---

**📊 Résumé Phase 4:**
- **Durée totale:** 7 jours (au lieu de 6 - configuration AST + fixtures)
- **Fichiers de tests:** 8
- **Tests estimés:** ~20-25 tests E2E
- **Navigateurs:** Chrome, Firefox (Safari désactivé pour AST)
- **Mobile:** Pixel 5
- **Couverture:** 100% des workflows critiques + gestion erreurs APIM
- **⚠️ IMPORTANT:** Tests avec **APIM Test Environment (AST) + vraies données IFS**
- **Performance:** ~15-20 minutes (vs 5-8 min avec mocks, mais **100x plus fiable**)
- **Prérequis:** Configuration `.env.e2e` avec credentials AST

---

## ☁️ Phase 5 : CI/CD Azure DevOps (Semaine 3-4 - 4 jours)

### Objectifs
- ✅ Pipeline Azure DevOps pour tests automatiques
- ✅ Intégration Playwright Cloud (Azure)
- ✅ Rapports de tests automatiques
- ✅ Blocage merge si tests échouent
- ✅ **Configuration Azure APIM pour tests CI/CD**

### ⚠️ Stratégie CI/CD avec Azure APIM

**Deux environnements:**

1. **Tests Unitaires & Intégration** → Mock APIM (MSW)
2. **Tests E2E en CI** → Azure APIM Test Environment (optionnel)

### 5.1 Configuration Azure Pipeline

**Fichier:** `azure-pipelines-tests.yml`

```yaml
trigger:
  branches:
    include:
      - main
      - develop
  paths:
    include:
      - src/app/(tools)/boat-configuration/**
      - src/tools/boat-configuration/**
      - src/app/api/boat-configuration/**
      - tests/boat-configuration/**

pool:
  vmImage: 'ubuntu-latest'

variables:
  - group: manufacturing-portal-test-vars  # ⚠️ Contient secrets APIM
  - name: NODE_VERSION
    value: '20.x'
  - name: PNPM_VERSION
    value: '8.x'

stages:
  # ===== Stage 1: Tests Unitaires (Mock APIM) =====
  - stage: UnitTests
    displayName: 'Unit Tests (Services)'
    jobs:
      - job: RunUnitTests
        displayName: 'Run Unit Tests (Vitest)'
        steps:
          - task: NodeTool@0
            inputs:
              versionSpec: $(NODE_VERSION)
            displayName: 'Install Node.js'

          - script: |
              npm install -g pnpm@$(PNPM_VERSION)
              pnpm install
            displayName: 'Install dependencies'

          - script: |
              # Variables d'environnement mockées (pas de vraies valeurs APIM)
              export IFS_BASE_URL=https://mock.apim.test
              export IFS_CLIENT_ID=mock_client_id
              export IFS_CLIENT_SECRET=mock_client_secret
              export IFS_TOKEN_URL=https://mock.login.test/token
              export IFS_SCOPE=api://mock/.default
              
              pnpm run test:unit
            displayName: 'Run unit tests (with mocked APIM)'

          - task: PublishTestResults@2
            inputs:
              testResultsFormat: 'JUnit'
              testResultsFiles: '**/junit.xml'
              failTaskOnFailedTests: true
            displayName: 'Publish unit test results'

          - task: PublishCodeCoverageResults@2
            inputs:
              summaryFileLocation: 'coverage/cobertura-coverage.xml'
            displayName: 'Publish code coverage'

  # ===== Stage 2: Tests Intégration (Mock APIM) =====
  - stage: IntegrationTests
    displayName: 'Integration Tests (API Routes with Mock APIM)'
    dependsOn: UnitTests
    jobs:
      - job: RunIntegrationTests
        displayName: 'Run Integration Tests (MSW Mock APIM)'
        steps:
          - task: NodeTool@0
            inputs:
              versionSpec: $(NODE_VERSION)

          - script: |
              npm install -g pnpm@$(PNPM_VERSION)
              pnpm install
            displayName: 'Install dependencies'

          - script: |
              # Mock APIM pour tests intégration
              export IFS_BASE_URL=https://mock.apim.test
              export IFS_CLIENT_ID=mock_client_id
              export IFS_CLIENT_SECRET=mock_client_secret
              export IFS_TOKEN_URL=https://mock.login.test/token
              export IFS_SCOPE=api://mock/.default
              
              pnpm run test:integration
            displayName: 'Run integration tests (MSW mocks APIM)'

          - task: PublishTestResults@2
            inputs:
              testResultsFormat: 'JUnit'
              testResultsFiles: '**/junit.xml'
              failTaskOnFailedTests: true
            displayName: 'Publish integration test results'

  # ===== Stage 3: Tests E2E (Playwright Cloud) =====
  - stage: E2ETests
    displayName: 'E2E Tests (Playwright Cloud)'
    dependsOn: IntegrationTests
    jobs:
      - job: RunE2ETests_Mock
        displayName: 'E2E Tests - Mock APIM (Fast)'
        steps:
          - task: NodeTool@0
            inputs:
              versionSpec: $(NODE_VERSION)

          - script: |
              npm install -g pnpm@$(PNPM_VERSION)
              pnpm install
              pnpm exec playwright install --with-deps chromium
            displayName: 'Install dependencies + Playwright'

          - script: |
              # Mock APIM pour E2E rapide
              export NEXT_PUBLIC_MSW_ENABLED=true
              export IFS_BASE_URL=https://mock.apim.test
              export IFS_CLIENT_ID=mock_client_id
              export IFS_CLIENT_SECRET=mock_client_secret
              export IFS_TOKEN_URL=https://mock.login.test/token
              export IFS_SCOPE=api://mock/.default
              
              # Playwright Cloud (Azure)
              export PLAYWRIGHT_SERVICE_ACCESS_TOKEN=$(PLAYWRIGHT_CLOUD_TOKEN)
              export PLAYWRIGHT_SERVICE_URL=$(PLAYWRIGHT_CLOUD_URL)
              
              pnpm run test:e2e --project=chromium
            displayName: 'Run E2E tests (Mock APIM - Playwright Cloud)'
            env:
              BASE_URL: http://localhost:3000

          - task: PublishTestResults@2
            inputs:
              testResultsFormat: 'JUnit'
              testResultsFiles: 'test-results/junit.xml'
              failTaskOnFailedTests: true
            displayName: 'Publish E2E test results'

          - task: PublishPipelineArtifact@1
            inputs:
              targetPath: 'playwright-report'
              artifact: 'playwright-report-mock'
            condition: always()
            displayName: 'Publish Playwright HTML report'

      # ===== Tests E2E avec APIM réel (optionnel - nightly) =====
      - job: RunE2ETests_RealAPIM
        displayName: 'E2E Tests - Real APIM Test Environment (Nightly)'
        condition: and(succeeded(), eq(variables['Build.Reason'], 'Schedule'))
        steps:
          - task: NodeTool@0
            inputs:
              versionSpec: $(NODE_VERSION)

          - script: |
              npm install -g pnpm@$(PNPM_VERSION)
              pnpm install
              pnpm exec playwright install --with-deps
            displayName: 'Install dependencies + Playwright'

          - script: |
              # ⚠️ Vraies variables APIM (environnement TEST)
              export IFS_BASE_URL=$(IFS_TEST_APIM_URL)
              export IFS_CLIENT_ID=$(IFS_TEST_CLIENT_ID)
              export IFS_CLIENT_SECRET=$(IFS_TEST_CLIENT_SECRET)
              export IFS_TOKEN_URL=$(AZURE_AD_TEST_TOKEN_URL)
              export IFS_SCOPE=$(IFS_TEST_SCOPE)
              
              # Playwright Cloud
              export PLAYWRIGHT_SERVICE_ACCESS_TOKEN=$(PLAYWRIGHT_CLOUD_TOKEN)
              export PLAYWRIGHT_SERVICE_URL=$(PLAYWRIGHT_CLOUD_URL)
              
              pnpm run test:e2e
            displayName: 'Run E2E tests (Real APIM Test Env - Playwright Cloud)'
            env:
              BASE_URL: $(TEST_APP_URL)  # URL app staging

          - task: PublishTestResults@2
            inputs:
              testResultsFormat: 'JUnit'
              testResultsFiles: 'test-results/junit.xml'
              failTaskOnFailedTests: false  # Warning seulement (pas blocker)
            displayName: 'Publish E2E test results (Real APIM)'

          - task: PublishPipelineArtifact@1
            inputs:
              targetPath: 'playwright-report'
              artifact: 'playwright-report-real-apim'
            condition: always()
            displayName: 'Publish Playwright HTML report (Real APIM)'

  # ===== Stage 4: Rapport Global =====
  - stage: PublishResults
    displayName: 'Publish Test Results Summary'
    dependsOn:
      - UnitTests
      - IntegrationTests
      - E2ETests
    jobs:
      - job: Summary
        displayName: 'Test Summary & Notifications'
        steps:
          - script: |
              echo "✅ All tests passed successfully!"
              echo "📊 Test Coverage: Check artifacts"
              echo "🎭 E2E Reports: Check Playwright Cloud dashboard"
            displayName: 'Success message'

          - task: PublishBuildArtifacts@1
            inputs:
              pathToPublish: 'test-results'
              artifactName: 'test-results-summary'
            displayName: 'Archive test results'
```

**Durée estimée:** 2 jours

---

### 5.2 Configuration Azure Variable Groups (Secrets APIM)

**Documentation:** `tests/boat-configuration/docs/AZURE_APIM_SETUP.md`

```markdown
# Configuration Azure APIM pour Tests CI/CD

## 1. Azure Variable Groups

### Variable Group: `manufacturing-portal-test-vars`

#### Variables publiques:
- `NODE_VERSION`: `20.x`
- `PNPM_VERSION`: `8.x`
- `PLAYWRIGHT_CLOUD_URL`: `https://playwright.microsoft.com/...`
- `TEST_APP_URL`: `https://manufacturing-portal-test.azurewebsites.net`

#### Variables secrètes (🔐):
- `PLAYWRIGHT_CLOUD_TOKEN`: Token d'accès Playwright Cloud
- `IFS_TEST_APIM_URL`: URL Azure APIM Test (ex: https://gbenapimgtaiscommondev.azure-api.net/IFS/Manufacturing)
- `IFS_TEST_CLIENT_ID`: Azure AD Client ID (Test)
- `IFS_TEST_CLIENT_SECRET`: Azure AD Client Secret (Test) 🔐
- `AZURE_AD_TEST_TOKEN_URL`: Azure AD Token endpoint (Test)
- `IFS_TEST_SCOPE`: Scope API (ex: api://api.IFS.dev/.default)
- `APIM_SUBSCRIPTION_KEY`: Clé d'abonnement APIM (si nécessaire) 🔐

## 2. Configuration APIM Test Environment

### Endpoints APIM Test:
- **Base URL**: `https://gbenapimgtaiscommondev.azure-api.net/IFS/Manufacturing`
- **Services disponibles**:
  - ShopOrderHandling.svc
  - DopHeaderHandling.svc
  - CustomerOrderHandling.svc
  - PrintDialog.svc

### Authentification:
- **Type**: OAuth2 Azure AD (Client Credentials)
- **Token URL**: `https://login.microsoftonline.com/{tenant_id}/oauth2/v2.0/token`
- **Scope**: `api://api.IFS.dev/.default`

### Throttling APIM:
- **Rate Limit**: 100 requêtes/minute (test env)
- **Quota**: 10,000 requêtes/jour
- ⚠️ Ne pas surcharger l'APIM avec des tests en boucle

## 3. Configuration Playwright Cloud (Azure)

### Créer un workspace Playwright:
1. Aller sur https://playwright.microsoft.com
2. Se connecter avec compte Azure Bénéteau
3. Créer workspace "Manufacturing Portal - Tests"

### Obtenir les credentials:
- **Token**: PLAYWRIGHT_SERVICE_ACCESS_TOKEN
- **URL**: PLAYWRIGHT_SERVICE_URL

### Configuration dans Azure DevOps:
```bash
# Ajouter dans Variable Group
PLAYWRIGHT_CLOUD_TOKEN=<your_token> (🔐 secret)
PLAYWRIGHT_CLOUD_URL=https://playwright.microsoft.com/workspaces/...
```

## 4. Configuration locale développeurs

### .env.local (développement):
```bash
# Azure APIM - Dev Environment
IFS_BASE_URL=https://gbenapimgtaiscommondev.azure-api.net/IFS/Manufacturing
IFS_CLIENT_ID=your_dev_client_id
IFS_CLIENT_SECRET=your_dev_client_secret
IFS_TOKEN_URL=https://login.microsoftonline.com/.../oauth2/v2.0/token
IFS_SCOPE=api://api.IFS.dev/.default
```

### .env.test (tests unitaires/intégration - MOCK):
```bash
# Mock APIM - Pas de vraies valeurs
IFS_BASE_URL=https://mock.apim.test
IFS_CLIENT_ID=mock_client_id
IFS_CLIENT_SECRET=mock_client_secret
IFS_TOKEN_URL=https://mock.login.test/token
IFS_SCOPE=api://mock/.default
NEXT_PUBLIC_MSW_ENABLED=true
```

### .env.e2e (tests E2E avec APIM réel - optionnel):
```bash
# Azure APIM - Test Environment
IFS_BASE_URL=https://gbenapimgtaiscommontest.azure-api.net/IFS/Manufacturing
IFS_CLIENT_ID=<test_client_id>
IFS_CLIENT_SECRET=<test_client_secret>
IFS_TOKEN_URL=https://login.microsoftonline.com/.../oauth2/v2.0/token
IFS_SCOPE=api://api.IFS.test/.default

# Playwright Cloud
PLAYWRIGHT_SERVICE_ACCESS_TOKEN=<your_token>
PLAYWRIGHT_SERVICE_URL=https://playwright.microsoft.com/...
```

## 5. Exécution locale

### Tests avec mock APIM (rapide):
```bash
# Tests unitaires
pnpm run test:unit

# Tests intégration
pnpm run test:integration

# Tests E2E (mock APIM)
export NEXT_PUBLIC_MSW_ENABLED=true
pnpm run test:e2e
```

### Tests avec APIM réel (validation complète):
```bash
# Charger variables E2E
export $(cat .env.e2e | xargs)

# Lancer E2E sur Playwright Cloud
pnpm run test:e2e
```

## 6. Stratégie de tests CI/CD

### Pipeline standard (PR + merge):
1. ✅ Unit Tests → Mock APIM (MSW)
2. ✅ Integration Tests → Mock APIM (MSW)
3. ✅ E2E Tests → Mock APIM (MSW) + Playwright Cloud

**Temps total: ~8-10 minutes**

### Pipeline nightly (validation complète):
1. ✅ Unit Tests → Mock APIM
2. ✅ Integration Tests → Mock APIM
3. ✅ E2E Tests Mock → Mock APIM + Playwright Cloud
4. ⚠️ E2E Tests Real → **APIM Test Environment** + Playwright Cloud

**Temps total: ~20-25 minutes**

## 7. Troubleshooting

### Erreur "401 Unauthorized" APIM:
- Vérifier `IFS_CLIENT_ID` et `IFS_CLIENT_SECRET`
- Vérifier que le scope est correct
- Régénérer le token Azure AD

### Erreur "429 Too Many Requests" APIM:
- Rate limit APIM atteint
- Attendre 1 minute ou réduire le nombre de tests

### Tests E2E timeout:
- APIM test environment peut être lent
- Augmenter timeout Playwright: `test.setTimeout(60000)`

### MSW ne mock pas APIM:
- Vérifier `NEXT_PUBLIC_MSW_ENABLED=true`
- Vérifier que les handlers MSW correspondent aux URLs APIM
```

**Durée estimée:** 1 jour

---

### 5.3 Branch Protection Rules

**Configuration Azure DevOps:**

```yaml
# Branch Policy pour main et develop

repositories:
  - main:
      policies:
        # Bloquer merge si tests échouent
        - require_status_checks:
            strict: true
            contexts:
              - "Unit Tests"
              - "Integration Tests (API Routes with Mock APIM)"
              - "E2E Tests - Mock APIM (Fast)"
        
        # Require pull request
        - require_pull_request_reviews:
            required_approving_review_count: 1
            dismiss_stale_reviews: true
        
        # Build validation
        - require_build_validation:
            build_definition_id: manufacturing-portal-tests
            valid_duration: 720  # 12 heures

  - develop:
      policies:
        # Plus souple pour develop
        - require_status_checks:
            strict: false
            contexts:
              - "Unit Tests"
              - "Integration Tests"
```

**Notifications:**

```yaml
# Notifications Teams/Slack si tests échouent
notifications:
  - type: "build_failed"
    recipients:
      - "manufacturing-portal-team@beneteau.com"
    channels:
      - "#manufacturing-portal-ci"
```

**Durée estimée:** 0.5 jour

---

### 5.4 Scheduled Pipelines (Nightly Tests)

**Fichier:** `azure-pipelines-nightly.yml`

```yaml
# Scheduled pipeline pour tests complets avec APIM réel
# Exécution: Tous les jours à 02:00 AM UTC

schedules:
  - cron: "0 2 * * *"
    displayName: "Nightly E2E Tests (Real APIM)"
    branches:
      include:
        - main
    always: true

trigger: none  # Pas de trigger sur commit

pool:
  vmImage: 'ubuntu-latest'

variables:
  - group: manufacturing-portal-test-vars

stages:
  - stage: NightlyE2ETests
    displayName: 'Nightly E2E Tests (Real APIM Test Environment)'
    jobs:
      - job: FullE2ETests
        displayName: 'Run Full E2E Test Suite with Real APIM'
        timeoutInMinutes: 60
        
        steps:
          - task: NodeTool@0
            inputs:
              versionSpec: '20.x'

          - script: |
              npm install -g pnpm@8.x
              pnpm install
              pnpm exec playwright install --with-deps
            displayName: 'Install dependencies'

          - script: |
              # ⚠️ Vraies variables APIM Test
              export IFS_BASE_URL=$(IFS_TEST_APIM_URL)
              export IFS_CLIENT_ID=$(IFS_TEST_CLIENT_ID)
              export IFS_CLIENT_SECRET=$(IFS_TEST_CLIENT_SECRET)
              export IFS_TOKEN_URL=$(AZURE_AD_TEST_TOKEN_URL)
              export IFS_SCOPE=$(IFS_TEST_SCOPE)
              
              # Playwright Cloud
              export PLAYWRIGHT_SERVICE_ACCESS_TOKEN=$(PLAYWRIGHT_CLOUD_TOKEN)
              export PLAYWRIGHT_SERVICE_URL=$(PLAYWRIGHT_CLOUD_URL)
              
              # Lancer tous les tests E2E
              pnpm run test:e2e --retries=2 --workers=2
            displayName: 'Run E2E tests (Real APIM)'
            continueOnError: true  # Ne pas bloquer si échec

          - task: PublishTestResults@2
            inputs:
              testResultsFormat: 'JUnit'
              testResultsFiles: 'test-results/junit.xml'
              failTaskOnFailedTests: false
            displayName: 'Publish test results'

          - task: PublishPipelineArtifact@1
            inputs:
              targetPath: 'playwright-report'
              artifact: 'nightly-e2e-report'
            condition: always()

          # Notification si échec
          - task: SendEmail@1
            inputs:
              to: 'manufacturing-portal-team@beneteau.com'
              subject: '⚠️ Nightly E2E Tests Failed (Real APIM)'
              body: 'Check pipeline for details: $(Build.BuildUri)'
            condition: failed()
```

**Durée estimée:** 0.5 jour

---

**📊 Résumé Phase 5:**
- **Durée totale:** 4 jours (au lieu de 3 - complexité APIM)
- **Deliverables:**
  - ✅ Pipeline Azure DevOps configurée (2 modes: mock + real APIM)
  - ✅ Playwright Cloud intégré
  - ✅ Branch protection activée
  - ✅ Rapports automatiques
  - ✅ Configuration APIM Test Environment
  - ✅ Scheduled nightly tests avec APIM réel
  - ✅ Documentation complète APIM setup

### Variables Azure DevOps nécessaires:

| Variable | Type | Description |
|----------|------|-------------|
| `PLAYWRIGHT_CLOUD_TOKEN` | Secret 🔐 | Token Playwright Cloud |
| `PLAYWRIGHT_CLOUD_URL` | Public | URL workspace Playwright |
| `IFS_TEST_APIM_URL` | Public | URL Azure APIM Test |
| `IFS_TEST_CLIENT_ID` | Public | Azure AD Client ID Test |
| `IFS_TEST_CLIENT_SECRET` | Secret 🔐 | Azure AD Client Secret Test |
| `AZURE_AD_TEST_TOKEN_URL` | Public | Token endpoint Azure AD |
| `IFS_TEST_SCOPE` | Public | Scope API Test |
| `TEST_APP_URL` | Public | URL app staging |

---

## 📚 Documentation des Tests

### Structure docs/

```
tests/boat-configuration/docs/
├── UNIT_TESTS.md              # Guide tests unitaires
├── INTEGRATION_TESTS.md       # Guide tests intégration
├── E2E_TESTS.md               # Guide tests E2E
├── AZURE_SETUP.md             # Configuration Azure
├── TROUBLESHOOTING.md         # Résolution problèmes
└── BEST_PRACTICES.md          # Bonnes pratiques
```

### Templates de documentation

**UNIT_TESTS.md - Exemple:**

```markdown
# Guide Tests Unitaires - Boat Configuration

## Lancer les tests

```bash
# Tous les tests unitaires
pnpm run test:unit

# Un fichier spécifique
pnpm run test:unit shop-order.test.ts

# Mode watch
pnpm run test:watch
```

## Écrire un nouveau test

```typescript
// tests/boat-configuration/unit/services/my-service.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { myService } from '@/tools/boat-configuration/services/my-service'

describe('myService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should do something', async () => {
    const result = await myService.doSomething()
    expect(result).toBeDefined()
  })
})
```

## Mock IFS Client

Voir `tests/boat-configuration/unit/mocks/ifs-client.mock.ts`

## Fixtures

Utiliser les fixtures dans `tests/boat-configuration/unit/fixtures/`
```

**Durée estimée:** 1 jour (toutes les docs)

---

## 📊 Récapitulatif Global

### Timeline

| Phase | Durée | Responsable | Status |
|-------|-------|-------------|--------|
| **Phase 1: Setup** | 3 jours | DevOps + Lead Dev | ✅ COMPLÈTE |
| **Phase 2: Tests Unitaires** | 5 jours | Dev Backend | ✅ COMPLÈTE (124/124 tests) |
| **Phase 3: Tests Intégration** | 4.5 jours | Dev Fullstack | 🔄 À planifier |
| **Phase 4: Tests E2E** | 7 jours | QA + Dev Frontend | 🔄 À planifier |
| **Phase 5: CI/CD Azure** | 4 jours | DevOps | 🔄 À planifier |
| **Documentation** | 1 jour | Tech Writer | 🔄 À planifier |
| **TOTAL** | **24.5 jours** (~5 semaines) | | |

### Changements vs estimation initiale:
- **+0.5 jour Phase 3**: Investigation IFS pour fixtures réalistes
- **+1 jour Phase 4**: Configuration AST + fixtures vraies données IFS
- **+1 jour Phase 5**: Configuration APIM Test Environment + nightly tests
- **Total**: 24.5 jours au lieu de 20 jours (+22%)

### ⚠️ Points critiques ajoutés:
1. **Investigation IFS (Phase 3)**: Récupérer vraies données pour mocks fiables
2. **Tests E2E avec AST (Phase 4)**: APIM Test Environment au lieu de mocks (plus fiable)
3. **Fixtures validées (Phase 3 & 4)**: Basées sur vraies données IFS, pas inventées

### Métriques cibles

| Métrique | Cible | Status |
|----------|-------|--------|
| **Couverture Services** | > 90% | - |
| **Couverture API Routes** | > 85% | - |
| **Tests E2E** | 100% workflows | - |
| **Temps exécution CI** | < 10 min | - |
| **Taux de succès CI** | > 95% | - |

### Coûts estimés

- **Playwright Cloud (Azure):** ~50€/mois
- **Azure DevOps Pipeline:** Inclus dans abonnement
- **Temps développement:** 20 jours x 1 dev

---

## 🔄 Maintenance & Evolution

### Maintenance continue

1. **Hebdomadaire**
   - Revue des tests échoués en CI
   - Mise à jour fixtures si données IFS changent

2. **Mensuel**
   - Analyse couverture de code
   - Identification tests flaky
   - Optimisation temps d'exécution

3. **Trimestriel**
   - Mise à jour Playwright
   - Revue stratégie de tests
   - Nettoyage tests obsolètes

### Évolution future

- **Phase 6 (Q1 2026):** Tests de performance (Lighthouse CI)
- **Phase 7 (Q2 2026):** Tests d'accessibilité (axe-core)
- **Phase 8 (Q2 2026):** Tests de sécurité (OWASP ZAP)

---

## ✅ Checklist de démarrage

### Avant de commencer

- [ ] Accès Azure DevOps configuré
- [ ] Accès Playwright Cloud (Azure) configuré
- [ ] Variables d'environnement créées
- [ ] Branch protection rules définies
- [ ] Équipe formée sur Playwright

### Phase 1 - Setup

- [ ] Playwright installé
- [ ] MSW installé
- [ ] Structure de dossiers créée
- [ ] Configuration vitest.config.mts mise à jour
- [ ] Configuration playwright.config.ts créée
- [ ] Scripts npm ajoutés à package.json
- [ ] Premier test "smoke" qui passe

### Ready to go! 🚀

---

**Document généré le:** 12 novembre 2025  
**Version:** 1.0  
**Prochaine revue:** Fin Phase 1 (Semaine 1)
