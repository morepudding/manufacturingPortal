# 🧪 Guide de Test Manuel - Système de Gestion d'Erreurs Part Printer

## 📋 Vue d'ensemble

Ce guide décrit comment tester manuellement toutes les validations d'erreurs implémentées dans la Phase 1 et Phase 2.

**Date** : 30 octobre 2025  
**Branch** : `feature/part-printer-error-handling`  
**Status** : Phase 2 Jours 1-2 complétés

---

## 🚀 Prérequis

### 1. Démarrer l'application

```bash
cd /home/rbottero/ManufacturingPortal
git checkout feature/part-printer-error-handling
pnpm install
pnpm dev
```

### 2. Ouvrir l'application

- URL : http://localhost:3000
- Naviguer vers : **Part Printer** tool

---

## ✅ Tests Phase 1 : Infrastructure d'Erreurs

### Test 1.1 : ErrorDialog (Composant)

**Objectif** : Vérifier que le dialogue d'erreur bloquante s'affiche correctement

**Pas à pas** :
1. Ouvrir le Part Printer
2. Déclencher une erreur bloquante (voir tests ci-dessous)
3. Vérifier l'affichage du dialogue :
   - ✅ Icône 🛑 rouge
   - ✅ Code d'erreur (ex: PP_E001)
   - ✅ Message clair et professionnel
   - ✅ Détails (si disponibles)
   - ✅ Bouton "Fermer" ou "OK"
   - ✅ Backdrop sombre cliquable

### Test 1.2 : WarningToast (Composant)

**Objectif** : Vérifier que les toasts de warning s'affichent et disparaissent

**Pas à pas** :
1. Déclencher un warning (voir tests ci-dessous)
2. Vérifier l'affichage du toast :
   - ✅ Icône ⚠️ jaune/orange
   - ✅ Code warning (ex: PP_W001)
   - ✅ Message clair
   - ✅ Auto-dismiss après 5 secondes
   - ✅ Bouton fermeture (X)
   - ✅ Barre de progression

---

## 🛑 Tests Phase 2 Jour 1 : Validation NO_SITES (PP_E001)

### Test 2.1 : Scénario Normal - Sites Disponibles

**Objectif** : Vérifier le chargement normal des sites

**Pas à pas** :
1. Ouvrir le Part Printer
2. Observer le champ "Site"
3. **Résultat attendu** :
   - ✅ Dropdown affiche "Chargement des sites..."
   - ✅ Après quelques secondes : liste des sites (BDR, etc.)
   - ✅ Aucune erreur

**Console (F12)** :
```
🔍 [API] GET /api/part-printer/sites - Récupération des sites
📊 [API] X sites récupérés depuis IFS
✅ [API] Sites récupérés avec succès: BDR, ...
```

### Test 2.2 : Scénario Erreur - Aucun Site (BLOQUANT)

**Objectif** : Simuler l'erreur PP_E001 et vérifier le comportement

**Comment déclencher** :

**Option A : Modifier temporairement le code du service**

```typescript
// Dans src/tools/part-printer/services/site-service.ts
export async function getSites(): Promise<SitesResponse> {
  // FORCER L'ERREUR POUR TEST
  return {
    sites: [],
    count: 0,
  }
}
```

**Option B : Couper la connexion IFS**
- Modifier temporairement `IFS_BASE_URL` dans `.env.local`
- Redémarrer le serveur

**Pas à pas** :
1. Appliquer une des options ci-dessus
2. Rafraîchir la page Part Printer (F5)
3. **Résultat attendu** :
   - ✅ **ErrorDialog s'affiche** avec :
     - Titre : "Error PP_E001"
     - Message : "No Site data could be retrieved..."
     - Icône 🛑 rouge
   - ✅ Le champ Site est **désactivé** (grisé)
   - ✅ Placeholder : "❌ Erreur - Sites indisponibles"
   - ✅ Message sous le champ : "⚠️ No Site data..."
   - ✅ Impossible de continuer (formulaire bloqué)

**Console (F12)** :
```
❌ [API] Aucun site (contract) disponible dans IFS
🛑 [BLOCKING] [PP_E001] No Site data could be retrieved...
```

**Screenshot attendu** :
```
┌────────────────────────────────────────┐
│  🛑 Error PP_E001                      │
├────────────────────────────────────────┤
│  No Site data could be retrieved.      │
│  Unable to load available sites from   │
│  IFS. Please contact support.          │
│                                        │
│                    [ OK ]              │
└────────────────────────────────────────┘

Site: [  ❌ Erreur - Sites indisponibles  ▼ ] (disabled)
      ⚠️ No Site data could be retrieved...
```

---

## ⚠️ Tests Phase 2 Jour 2 : Validations WARNING

### Test 2.3 : PP_W001 - NO_RANGES (Continue sans Range)

**Objectif** : Vérifier que l'absence de Range ne bloque pas

**Pas à pas** :
1. Sélectionner un site : **BDR**
2. Sélectionner une date : **2099-12-31** (date dans le futur = aucun range)
3. Cliquer sur "Rechercher"
4. **Résultat attendu** :
   - ✅ **WarningToast s'affiche** (coin supérieur droit) :
     - "⚠️ Warning PP_W001"
     - "No Range data available for this site"
     - "The application will continue without Range filtering"
   - ✅ Toast disparaît après 5 secondes
   - ✅ Recherche **continue** malgré le warning
   - ✅ Pas de blocage

**Console (F12)** :
```
⚠️ [API] PP_W001: Aucun Range trouvé pour BDR à 2099-12-31 - Continue sans filtre Range
⚠️ [WARNING] [PP_W001] No Range data available for this site...
```

### Test 2.4 : PP_W002 - NO_PRODUCTION_LINES (Continue sans ligne)

**Objectif** : Vérifier que l'absence de lignes de production ne bloque pas

**Pas à pas** :
1. Sélectionner un site : **TEST_SITE_VIDE** (ou un site sans lignes)
2. Observer le champ "Production Line"
3. **Résultat attendu** :
   - ✅ **WarningToast s'affiche** :
     - "⚠️ Warning PP_W002"
     - "No Production Line data could be retrieved"
   - ✅ Dropdown vide ou message "Aucune ligne disponible"
   - ✅ Recherche possible **sans** sélectionner de ligne
   - ✅ Pas de blocage

**Console (F12)** :
```
⚠️ [API] PP_W002: Aucune ligne de production pour TEST_SITE_VIDE - Continue sans filtre
⚠️ [WARNING] [PP_W002] No Production Line data could be retrieved...
```

### Test 2.5 : PP_W003 - NO_PRINTERS (Force "List only")

**Objectif** : Vérifier que l'absence d'imprimantes force le mode liste seule

**Comment déclencher** :

**Option A : Modifier l'API temporairement**

```typescript
// Dans src/app/api/shared/printers/route.ts
export async function GET(request: NextRequest) {
  // FORCER L'ERREUR POUR TEST
  return NextResponse.json({
    success: true,
    printers: [],
    warning: {
      code: 'PP_W003',
      message: 'No logical printers could be retrieved...',
      severity: 'warning',
      action: 'continue',
    },
  })
}
```

**Pas à pas** :
1. Appliquer la modification ci-dessus
2. Naviguer vers l'écran d'impression (après recherche Shop Orders)
3. **Résultat attendu** :
   - ✅ **WarningToast s'affiche** :
     - "⚠️ Warning PP_W003"
     - "No logical printers could be retrieved"
     - "Printer selection unavailable. Only list generation will be possible"
   - ✅ Options d'impression :
     - "List only" : **Activée** (sélectionnée par défaut)
     - "Labels only" : **Désactivée** (grisée)
     - "List + labels" : **Désactivée** (grisée)
   - ✅ Champ "Printer" : **Masqué** ou désactivé
   - ✅ Génération possible en mode liste seule

**Console (F12)** :
```
⚠️ [API] PP_W003: Aucune imprimante disponible - Force mode "List only"
⚠️ [WARNING] [PP_W003] No logical printers could be retrieved...
```

---

## 🔧 Tests Combinés

### Test 3.1 : Plusieurs Warnings en Séquence

**Objectif** : Vérifier que plusieurs warnings peuvent coexister

**Pas à pas** :
1. Déclencher PP_W001 (date invalide pour Range)
2. Déclencher PP_W002 (site sans lignes)
3. Déclencher PP_W003 (pas d'imprimantes)
4. **Résultat attendu** :
   - ✅ Chaque toast s'affiche successivement
   - ✅ Pas de conflit entre warnings
   - ✅ Application continue à fonctionner
   - ✅ Historique des erreurs disponible dans `errorService.getErrorHistory()`

### Test 3.2 : Erreur Bloquante puis Warning

**Objectif** : Vérifier que les bloquants priment sur les warnings

**Pas à pas** :
1. Déclencher PP_E001 (no sites)
2. **Résultat attendu** :
   - ✅ ErrorDialog bloquant s'affiche
   - ✅ Impossible d'accéder aux autres champs
   - ✅ Aucun warning ne peut être déclenché (formulaire bloqué)

---

## 🎯 Checklist de Validation Complète

### Interface Utilisateur

- [ ] **ErrorDialog** :
  - [ ] S'affiche pour erreurs bloquantes
  - [ ] Backdrop sombre
  - [ ] Message clair et professionnel
  - [ ] Bouton fermeture fonctionnel
  - [ ] Bloque l'interaction avec le formulaire

- [ ] **WarningToast** :
  - [ ] S'affiche pour warnings
  - [ ] Position : coin supérieur droit
  - [ ] Auto-dismiss après 5 secondes
  - [ ] Bouton fermeture (X) fonctionnel
  - [ ] Barre de progression visible

- [ ] **Champs de formulaire** :
  - [ ] Se désactivent correctement sur erreur bloquante
  - [ ] Restent actifs sur warning
  - [ ] Messages d'erreur sous les champs visibles

### Comportements Fonctionnels

- [ ] **PP_E001 (NO_SITES)** :
  - [ ] Bloque le formulaire
  - [ ] Affiche ErrorDialog
  - [ ] Impossible de continuer

- [ ] **PP_W001 (NO_RANGES)** :
  - [ ] Affiche WarningToast
  - [ ] Continue sans Range
  - [ ] Pas de blocage

- [ ] **PP_W002 (NO_PRODUCTION_LINES)** :
  - [ ] Affiche WarningToast
  - [ ] Continue sans ligne de production
  - [ ] Pas de blocage

- [ ] **PP_W003 (NO_PRINTERS)** :
  - [ ] Affiche WarningToast
  - [ ] Force mode "List only"
  - [ ] Désactive options avec labels

### Console & Logs

- [ ] Logs clairs avec emojis (🔍, ✅, ❌, ⚠️)
- [ ] Codes d'erreur visibles (PP_E001, PP_W001, etc.)
- [ ] Pas d'erreurs JavaScript non gérées
- [ ] Messages de succès après résolution

---

## 🐛 Tests de Régression

### Test R.1 : Workflow Normal Sans Erreur

**Objectif** : S'assurer que le workflow normal fonctionne toujours

**Pas à pas** :
1. Sélectionner un site valide : **BDR**
2. Sélectionner une date valide : **2025-10-13**
3. Cliquer sur "Rechercher"
4. **Résultat attendu** :
   - ✅ Aucun dialogue d'erreur
   - ✅ Aucun toast de warning
   - ✅ Résultats affichés normalement
   - ✅ Workflow complet fonctionnel

### Test R.2 : Restauration Après Erreur

**Objectif** : Vérifier qu'on peut récupérer après une erreur

**Pas à pas** :
1. Déclencher PP_E001 (no sites)
2. Fermer le dialogue d'erreur
3. Restaurer la connexion IFS (remettre le code correct)
4. Rafraîchir la page (F5)
5. **Résultat attendu** :
   - ✅ Sites se chargent normalement
   - ✅ Plus d'erreur
   - ✅ Formulaire fonctionnel

---

## 📊 Métriques de Succès

| Critère | Objectif | Status |
|---------|----------|--------|
| ErrorDialog s'affiche pour PP_E001 | ✅ Bloquant | ⬜ À tester |
| WarningToast s'affiche pour PP_W001-003 | ✅ Non-bloquant | ⬜ À tester |
| Formulaire bloqué sur erreur bloquante | ✅ Désactivé | ⬜ À tester |
| Formulaire actif sur warning | ✅ Continue | ⬜ À tester |
| Messages clairs et professionnels | ✅ Lisibles | ⬜ À tester |
| Pas d'erreurs console JavaScript | ✅ Propre | ⬜ À tester |
| Workflow normal sans régression | ✅ Fonctionnel | ⬜ À tester |

---

## 🔍 Debugging Tips

### Inspecter l'état des erreurs

Ouvrir la console (F12) et exécuter :

```javascript
// Récupérer l'historique des erreurs
const errorService = require('@/tools/part-printer/services/error-service').getErrorService()
errorService.getErrorHistory()

// Statistiques
errorService.getErrorStats()

// Erreurs bloquantes seulement
errorService.getBlockingErrors()

// Warnings seulement
errorService.getWarningErrors()
```

### Forcer un warning manuellement

```javascript
const { getErrorService } = require('@/tools/part-printer/services/error-service')
const { ErrorCode } = require('@/tools/part-printer/types/error')

const service = getErrorService()
const warning = service.createError(ErrorCode.NO_RANGES, { site: 'TEST' })
service.handleError(warning)
```

### Vérifier les appels API

Dans l'onglet **Network** (F12) :
- Filtrer par : `part-printer`, `sites`, `ranges`, `printers`
- Vérifier les réponses :
  - Status code (200, 404, 500)
  - Body JSON (`success`, `error`, `warning`)

---

## 📝 Rapport de Test

Après avoir complété tous les tests, remplir ce rapport :

**Date** : __________  
**Testeur** : __________  
**Branch** : `feature/part-printer-error-handling`  

### Résultats

| Test | Status | Commentaires |
|------|--------|--------------|
| PP_E001 - NO_SITES | ⬜ Pass / ⬜ Fail | |
| PP_W001 - NO_RANGES | ⬜ Pass / ⬜ Fail | |
| PP_W002 - NO_PRODUCTION_LINES | ⬜ Pass / ⬜ Fail | |
| PP_W003 - NO_PRINTERS | ⬜ Pass / ⬜ Fail | |
| ErrorDialog UI | ⬜ Pass / ⬜ Fail | |
| WarningToast UI | ⬜ Pass / ⬜ Fail | |
| Workflow Normal | ⬜ Pass / ⬜ Fail | |

### Bugs Trouvés

1. ___________________________
2. ___________________________
3. ___________________________

### Recommandations

- ___________________________
- ___________________________

---

**Version** : 1.0.0  
**Dernière mise à jour** : 30 octobre 2025  
**Status** : ✅ Phase 2 Jours 1-2 prêts pour tests
