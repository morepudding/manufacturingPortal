# Part Printer - Gestion des Erreurs et Validations

## 📋 Vue d'ensemble

Ce document définit toutes les règles de gestion des erreurs pour l'application **Part Printer**. Les erreurs sont classées en deux catégories :
- **🛑 BLOQUANT** : Arrête le processus et affiche une erreur
- **⚠️ CONTINUE** : Affiche un warning mais permet de continuer

---

## 🎯 Écran 1 - Filtres et Sélection

### Site (Contract) 🛑 BLOQUANT

**Source** : API IFS Contracts exposée via Azure

**Règle** : Si aucun site n'est récupéré → **STOP PROCESSING**

**Message d'erreur** :
```
❌ No Site data could be retrieved
Unable to load available sites from IFS. Please contact support.
```

**Comportement** :
- Bloquer l'accès au formulaire
- Afficher un pop-up d'alerte
- Désactiver tous les autres champs

---

### Range ID ⚠️ CONTINUE

**Source** : Table Range filtrée par Site sélectionné

**Règle** : Si aucun Range n'est récupéré → **CONTINUE PROCESSING**

**Message d'erreur** :
```
⚠️ No Range data available for this site
The application will continue without Range filtering.
```

**Comportement** :
- Afficher un warning (toast notification)
- Masquer/désactiver le champ Range ID
- Permettre la saisie des autres filtres

---

### Production Line ⚠️ CONTINUE

**Source** : API IFS Production Lines exposée via Azure (filtrée par Site)

**Disponibilité** : Uniquement si un Site est sélectionné

**Règle** : Si aucune ligne de production n'est récupérée → **CONTINUE PROCESSING**

**Message d'erreur** :
```
⚠️ No Production Line data could be retrieved
No production lines found for the selected site. You can continue without this filter.
```

**Comportement** :
- Afficher un warning (toast notification)
- Laisser le champ vide/désactivé
- Permettre la génération sans ce filtre

---

### Start Date

**Type** : Calendrier de sélection de date

**Règle** : Définit la "Start Date" des Shop Orders à filtrer

**Validation** :
- Date obligatoire par défaut
- Devient optionnelle si Block ID est renseigné

---

### Block ID

**Type** : Champ texte alphanumérique

**Règle** : Filtre les Shop Orders avec Operation No = 10 liée au Block ID saisi

**Comportement spécial** :
- Si valeur saisie → Start Date ET Production Line deviennent **optionnels**
- Si vide → Filtre désactivé

---

### Filtres booléens (optionnels)

#### Block Date
**Type** : Toggle (désactivé par défaut)

**Règle** : Si activé, filtre sur un champ booléen du Shop Order Header (TRUE/FALSE)

#### Sent to Cutting System
**Type** : Toggle (désactivé par défaut)

**Règle** : Si activé, filtre sur un champ booléen du Shop Order Header (TRUE/FALSE)

---

### Logical Printer ⚠️ CONTINUE

**Source** : API IFS Logical Printers

**Disponibilité** : Obligatoire uniquement si option "Labels only" ou "List + labels" sélectionnée

**Règle** : Si aucune imprimante n'est récupérée → **CONTINUE PROCESSING**

**Message d'erreur** :
```
⚠️ No logical printers could be retrieved
Printer selection unavailable. Only list generation will be possible.
```

**Comportement** :
- Afficher un warning (toast notification)
- Désactiver l'option "Labels only"
- Forcer l'option "List only"

---

### Options d'impression

**Type** : Radio buttons (3 choix)

1. **List only** : Génère uniquement la liste
2. **Labels only** : Génère uniquement les étiquettes (imprimante requise)
3. **List + labels** : Génère les deux (imprimante requise)

---

## 🚀 Écran 2 - Génération et Traitement

### Bouton "Generate / Print"

**Déclenchement** : Appel API pour récupérer les Shop Orders et données associées

**Objet IFS** : Shop Order avec State = "Released"

**Filtres appliqués** :
- Site (obligatoire)
- Production Line (optionnel)
- Start Date (obligatoire sauf si Block ID)
- Block Date (optionnel)
- Sent to Cutting System (optionnel)
- Block ID sur Operation No = 10 (optionnel)

---

### Shop Orders 🛑 BLOQUANT

**Règle** : Si aucun Shop Order n'est récupéré → **STOP PROCESSING**

**Message d'erreur** :
```
❌ No Shop Orders found
No shop orders match the selected filters. Please adjust your criteria and try again.

Filters applied:
- Site: {site}
- Start Date: {date}
- Production Line: {line}
- Block ID: {blockId}
```

**Comportement** :
- Afficher un pop-up d'alerte détaillé
- Permettre de modifier les filtres
- Ne pas générer de rapport/étiquettes

---

### Raw Material 🛑 BLOQUANT

**Règle** : Si aucun Raw Material n'est trouvé pour un Shop Order → **STOP PROCESSING**

**Message d'erreur** :
```
❌ Missing Raw Material data
No raw material information found for Shop Order: {orderNo}

This is required for label generation. Please check the shop order configuration in IFS.
```

**Comportement** :
- Bloquer la génération
- Afficher le Shop Order problématique
- Demander une vérification dans IFS

---

### Generic Code (Attribut Part) 🛑 BLOQUANT

**Source** : TechnicalSpecBothArray → ValueText (attribute specific)

**Règle** : Si Generic Code non trouvé pour une Part → **STOP PROCESSING**

**Message d'erreur** :
```
❌ Missing Generic Code
No Generic Code found for part: {partNo} (Shop Order: {orderNo})

This attribute is mandatory for label generation. Please configure it in IFS.
```

**Comportement** :
- Bloquer la génération
- Lister tous les parts manquants
- Fournir un CSV d'export des parts problématiques

---

### Length Setup (Attribut Part) 🛑 BLOQUANT

**Source** : TechnicalSpecBothArray → ValueNo (attribute specific)

**Règle** : Si Length Setup non trouvé pour une Part → **STOP PROCESSING**

**Message d'erreur** :
```
❌ Missing Length Setup
No Length Setup found for part: {partNo} (Shop Order: {orderNo})

This attribute is mandatory for label sorting. Please configure it in IFS.
```

**Comportement** :
- Bloquer la génération
- Lister tous les parts manquants
- Fournir un CSV d'export des parts problématiques

---

### Varnish Code (Attribut Part) ⚠️ WARNING

**Source** : TechnicalSpecBothArray → ValueText (attribute specific)

**Règle** : Si Varnish Code non trouvé → **CONTINUE avec valeur par défaut**

**Message d'erreur** :
```
⚠️ Missing Varnish Code
No Varnish Code found for part: {partNo}
Default value "N/A" will be used.
```

**Comportement** :
- Continuer le traitement
- Utiliser "N/A" comme valeur
- Logger dans le rapport de génération

---

## ✅ Écran 3 - Confirmation d'Impression

### Dialogue de confirmation

**Déclenchement** : Avant l'impression finale

**Contenu** :
```
🖨️ Print Confirmation

You are about to print labels for:
- {count} Shop Order(s)
- {totalParts} Part(s)
- {totalPages} Page(s)

Printer: {printerName}
Output: {outputType}

Options:
- Raw Material grouping: {enabled/disabled}
- Varnish Code grouping: {enabled/disabled}
- Length sorting: Descending

Do you want to proceed?

[Cancel] [Print]
```

**Informations affichées** :
- ✅ Nombre de Shop Orders
- ✅ Nombre total de parts
- ✅ Nombre de pages à imprimer
- ✅ Imprimante sélectionnée
- ✅ Type de sortie (List/Labels/Both)
- ✅ Options de groupement et tri

**Actions** :
- **Cancel** : Retour à l'écran de filtres
- **Print** : Lancement de l'impression

---

## 📊 Résumé des Priorités

| Erreur | Type | Impact | Action |
|--------|------|--------|--------|
| No Sites | 🛑 Bloquant | Critique | Stop + Alert |
| No Range | ⚠️ Continue | Faible | Warning + Continue |
| No Production Lines | ⚠️ Continue | Faible | Warning + Continue |
| No Printers | ⚠️ Continue | Moyen | Warning + Disable labels |
| No Shop Orders | 🛑 Bloquant | Élevé | Stop + Alert |
| No Raw Material | 🛑 Bloquant | Élevé | Stop + Alert |
| No Generic Code | 🛑 Bloquant | Élevé | Stop + Alert |
| No Length Setup | 🛑 Bloquant | Élevé | Stop + Alert |
| No Varnish Code | ⚠️ Continue | Faible | Warning + Default |

---

## 🔧 Implémentation Technique

### Structure des erreurs

```typescript
interface PartPrinterError {
  code: string
  severity: 'blocking' | 'warning'
  message: string
  details?: Record<string, any>
  action: 'stop' | 'continue' | 'default'
}
```

### Codes d'erreur

```typescript
enum ErrorCode {
  // Bloquants
  NO_SITES = 'PP_E001',
  NO_SHOP_ORDERS = 'PP_E002',
  NO_RAW_MATERIAL = 'PP_E003',
  NO_GENERIC_CODE = 'PP_E004',
  NO_LENGTH_SETUP = 'PP_E005',
  
  // Warnings
  NO_RANGES = 'PP_W001',
  NO_PRODUCTION_LINES = 'PP_W002',
  NO_PRINTERS = 'PP_W003',
  NO_VARNISH_CODE = 'PP_W004',
}
```

---

## 🗺️ Roadmap d'Implémentation

### Vue d'ensemble des phases

| Phase | Description | Durée | Dépendances |
|-------|-------------|-------|-------------|
| **Phase 1** | Infrastructure d'erreurs | 2 jours | - |
| **Phase 2** | Validations des filtres | 3 jours | Phase 1 |
| **Phase 3** | Validations de génération | 4 jours | Phase 1, 2 |
| **Phase 4** | Confirmation d'impression | 2 jours | Phase 3 |
| **Phase 5** | Tests & Documentation | 2 jours | Phase 1-4 |

**Durée totale estimée** : 13 jours (2.6 semaines)

---

### 📦 Phase 1 : Infrastructure d'Erreurs (2 jours)

#### Objectif
Créer le système de gestion d'erreurs centralisé et réutilisable

#### Tâches

**Jour 1 : Types & Constantes**

```typescript
// 📁 src/tools/part-printer/types/error.ts
- [ ] Créer interface PartPrinterError
- [ ] Créer enum ErrorCode (PP_E001-005, PP_W001-004)
- [ ] Créer enum ErrorSeverity ('blocking', 'warning', 'info')
- [ ] Créer type ErrorAction ('stop', 'continue', 'default')
```

**Jour 2 : Service d'erreurs**

```typescript
// 📁 src/tools/part-printer/services/error-service.ts
- [ ] Créer ErrorService avec méthodes :
  - [ ] handleError(error: PartPrinterError): void
  - [ ] getErrorMessage(code: ErrorCode): string
  - [ ] logError(error: PartPrinterError): void
  - [ ] shouldStopProcessing(error: PartPrinterError): boolean
```

**Composants UI**

```typescript
// 📁 src/app/(tools)/part-printer/components/ErrorDialog.tsx
- [ ] Composant ErrorDialog (blocking errors)
- [ ] Composant WarningToast (warnings)
- [ ] Composant ErrorSummary (liste des erreurs)
```

**Livrables** :
- ✅ Système d'erreurs centralisé
- ✅ Composants UI réutilisables
- ✅ Tests unitaires du service

---

### 🔍 Phase 2 : Validations des Filtres (3 jours)

#### Objectif
Implémenter toutes les validations de l'écran de filtres

#### Jour 1 : Validations critiques (BLOQUANT)

```typescript
// 📁 src/app/api/part-printer/sites/route.ts
- [ ] Validation NO_SITES (PP_E001)
  - [ ] Try/catch sur appel API
  - [ ] Vérifier response.value.length > 0
  - [ ] Retourner erreur si vide
```

```typescript
// 📁 src/app/(tools)/part-printer/components/FilterPanel.tsx
- [ ] Gérer erreur NO_SITES
  - [ ] Afficher ErrorDialog
  - [ ] Bloquer formulaire
  - [ ] Désactiver tous les champs
```

#### Jour 2 : Validations WARNING

```typescript
// 📁 src/app/api/part-printer/ranges/route.ts
- [ ] Validation NO_RANGES (PP_W001)
  - [ ] Vérifier si ranges vides
  - [ ] Retourner warning mais status 200
  - [ ] Logger le warning
```

```typescript
// 📁 src/app/api/part-printer/production-lines/route.ts
- [ ] Validation NO_PRODUCTION_LINES (PP_W002)
  - [ ] Même pattern que ranges
```

```typescript
// 📁 src/app/api/shared/printers/route.ts
- [ ] Validation NO_PRINTERS (PP_W003)
  - [ ] Désactiver options "Labels only"
  - [ ] Forcer "List only"
```

#### Jour 3 : Logique conditionnelle

```typescript
// 📁 src/app/(tools)/part-printer/components/FilterPanel.tsx
- [ ] Implémenter logique Block ID
  - [ ] Si Block ID rempli → Start Date optionnel
  - [ ] Si Block ID rempli → Production Line optionnel
  - [ ] Si Block ID vide → Start Date obligatoire
  
- [ ] Implémenter logique Printer
  - [ ] Si "Labels only" → Printer obligatoire
  - [ ] Si "List + labels" → Printer obligatoire
  - [ ] Si "List only" → Printer masqué
  
- [ ] Implémenter toggles optionnels
  - [ ] Block Date (booléen)
  - [ ] Sent to Cutting System (booléen)
```

**Livrables** :
- ✅ Tous les champs validés
- ✅ Gestion des erreurs UI
- ✅ Tests E2E des filtres

---

### 🚀 Phase 3 : Validations de Génération (4 jours)

#### Objectif
Valider les données lors de la génération des étiquettes

#### Jour 1 : Validation Shop Orders

```typescript
// 📁 src/app/api/part-printer/shop-orders/filter/route.ts
- [ ] Validation NO_SHOP_ORDERS (PP_E002)
  - [ ] Vérifier résultat après filtrage
  - [ ] Construire message détaillé avec filtres appliqués
  - [ ] Retourner erreur bloquante
```

```typescript
// 📁 src/app/(tools)/part-printer/components/GenerateButton.tsx
- [ ] Gérer erreur NO_SHOP_ORDERS
  - [ ] Afficher ErrorDialog avec détails
  - [ ] Permettre modification des filtres
  - [ ] Logger les filtres pour debug
```

#### Jour 2 : Validation Raw Material

```typescript
// 📁 src/app/api/part-printer/operations/route.ts
- [ ] Validation NO_RAW_MATERIAL (PP_E003)
  - [ ] Vérifier MaterialNo dans operation OP10
  - [ ] Si null/undefined → erreur bloquante
  - [ ] Inclure OrderNo dans message
```

```typescript
// 📁 src/tools/part-printer/services/operation-service.ts
- [ ] Créer validateRawMaterial(operation: Operation)
  - [ ] Vérifier présence MaterialNo
  - [ ] Vérifier format valide
  - [ ] Retourner erreur typée
```

#### Jour 3 : Validation Attributs Parts (Bloquants)

```typescript
// 📁 src/app/api/part-printer/master-parts/[partNo]/attributes/route.ts
- [ ] Validation NO_GENERIC_CODE (PP_E004)
  - [ ] Filter sur AttributeId spécifique
  - [ ] Vérifier ValueText existe
  - [ ] Erreur si manquant
  
- [ ] Validation NO_LENGTH_SETUP (PP_E005)
  - [ ] Filter sur AttributeId spécifique
  - [ ] Vérifier ValueNo existe
  - [ ] Erreur si manquant
```

```typescript
// 📁 src/tools/part-printer/services/master-part-service.ts
- [ ] Créer validateMandatoryAttributes(partNo: string)
  - [ ] Vérifier Generic Code
  - [ ] Vérifier Length Setup
  - [ ] Retourner liste des parts en erreur
  
- [ ] Créer exportMissingAttributesCsv()
  - [ ] Générer CSV des parts problématiques
  - [ ] Colonnes : PartNo, MissingAttribute, ShopOrderNo
```

#### Jour 4 : Validation Attributs Parts (Warning)

```typescript
// 📁 src/app/api/part-printer/master-parts/[partNo]/attributes/route.ts
- [ ] Validation NO_VARNISH_CODE (PP_W004)
  - [ ] Filter sur AttributeId Varnish
  - [ ] Si manquant → valeur par défaut "N/A"
  - [ ] Retourner warning (status 200)
  - [ ] Logger dans rapport
```

```typescript
// 📁 src/tools/part-printer/services/part-label-service.ts
- [ ] Modifier consolidateLabels()
  - [ ] Gérer valeur par défaut Varnish Code
  - [ ] Tracker les parts avec N/A
  - [ ] Inclure dans rapport de génération
```

**Livrables** :
- ✅ Toutes les validations de génération
- ✅ Export CSV des erreurs
- ✅ Rapport de génération détaillé

---

### ✅ Phase 4 : Confirmation d'Impression (2 jours)

#### Objectif
Créer le dialogue de confirmation avec statistiques

#### Jour 1 : Composant PrintConfirmationDialog

```typescript
// 📁 src/app/(tools)/part-printer/components/PrintConfirmationDialog.tsx
- [ ] Créer interface PrintConfirmationData
  interface PrintConfirmationData {
    shopOrderCount: number
    totalParts: number
    totalPages: number
    printerName: string
    outputType: 'list' | 'labels' | 'both'
    groupingOptions: {
      rawMaterial: boolean
      varnishCode: boolean
      lengthSorting: 'ascending' | 'descending'
    }
    warnings?: PartPrinterError[]
  }

- [ ] Créer composant Dialog
  - [ ] Header avec icône 🖨️
  - [ ] Section statistiques (Shop Orders, Parts, Pages)
  - [ ] Section imprimante (nom, type sortie)
  - [ ] Section options (groupement, tri)
  - [ ] Section warnings (si présents)
  - [ ] Boutons Cancel / Print
```

#### Jour 2 : Intégration & Calculs

```typescript
// 📁 src/tools/part-printer/services/label-print-service.ts
- [ ] Créer calculatePrintStatistics(labels: PartLabel[])
  - [ ] Compter Shop Orders uniques
  - [ ] Compter Parts totales
  - [ ] Calculer pages nécessaires (format A4 paysage)
  - [ ] Grouper par Raw Material / Varnish Code
  - [ ] Retourner PrintConfirmationData
```

```typescript
// 📁 src/app/(tools)/part-printer/page.tsx
- [ ] Intégrer PrintConfirmationDialog
  - [ ] Afficher avant impression
  - [ ] Passer données calculées
  - [ ] Gérer Cancel (retour filtres)
  - [ ] Gérer Print (lancer impression)
```

```typescript
// 📁 src/app/api/part-printer/labels/print/route.ts
- [ ] Modifier pour calculer stats avant impression
  - [ ] Appeler calculatePrintStatistics()
  - [ ] Retourner stats + PDF buffer
  - [ ] Logger confirmation utilisateur
```

**Livrables** :
- ✅ Dialogue de confirmation fonctionnel
- ✅ Calculs statistiques précis
- ✅ Workflow Print complet

---

### 🧪 Phase 5 : Tests & Documentation (2 jours)

#### Objectif
Valider l'ensemble du système et documenter

#### Jour 1 : Tests

```typescript
// Tests unitaires
- [ ] error-service.test.ts (100% coverage)
- [ ] validation functions (toutes les règles)
- [ ] calculatePrintStatistics.test.ts

// Tests d'intégration
- [ ] Scénario complet sans erreurs
- [ ] Scénario avec erreurs bloquantes
- [ ] Scénario avec warnings
- [ ] Scénario avec attributs manquants

// Tests E2E
- [ ] User flow complet (filtres → génération → confirmation → print)
- [ ] Gestion erreur NO_SITES (stop)
- [ ] Gestion erreur NO_SHOP_ORDERS (stop)
- [ ] Gestion warning NO_PRINTERS (continue)
- [ ] Gestion attributs manquants (stop + CSV export)
```

#### Jour 2 : Documentation

```markdown
// 📁 docs/tools/part-printer/ERROR_HANDLING.md
- [ ] Documentation utilisateur
  - [ ] Liste des erreurs possibles
  - [ ] Actions recommandées
  - [ ] FAQ troubleshooting

// 📁 docs/tools/part-printer/implementation/ERROR_SYSTEM.md
- [ ] Documentation technique
  - [ ] Architecture du système
  - [ ] Flow des validations
  - [ ] Ajout de nouvelles erreurs

// 📁 docs/tools/part-printer/api/ERROR_CODES.md
- [ ] Référence API des codes d'erreur
  - [ ] Tous les codes (PP_E*, PP_W*)
  - [ ] Exemples de réponses
  - [ ] Gestion côté client
```

**Livrables** :
- ✅ Coverage tests > 80%
- ✅ Documentation complète
- ✅ Validation QA

---

## 📋 Checklist de Déploiement

### Avant le merge

- [ ] Tous les tests passent (unit + integration + E2E)
- [ ] Coverage > 80% sur les services d'erreurs
- [ ] Tous les codes d'erreur documentés
- [ ] Review par lead dev
- [ ] Test en environnement AST (dev)

### Vérifications fonctionnelles

- [ ] Erreur NO_SITES bloque correctement
- [ ] Erreur NO_SHOP_ORDERS affiche filtres appliqués
- [ ] Warning NO_PRINTERS désactive options labels
- [ ] Attributs manquants génèrent CSV export
- [ ] Confirmation d'impression affiche stats correctes
- [ ] Tous les messages d'erreur sont clairs et professionnels

### Post-déploiement

- [ ] Monitoring des erreurs activé (Sentry/Logger)
- [ ] Dashboard des erreurs fréquentes
- [ ] Formation équipe support
- [ ] Documentation utilisateur publiée

---

## 🎯 Priorités de Dev

### Must-have (Launch Blocker)

1. ✅ Infrastructure erreurs (Phase 1)
2. ✅ Validation NO_SITES (Phase 2)
3. ✅ Validation NO_SHOP_ORDERS (Phase 3)
4. ✅ Validation attributs bloquants (Phase 3)
5. ✅ Confirmation d'impression (Phase 4)

### Should-have (Post-Launch)

6. ✅ Export CSV parts en erreur
7. ✅ Rapport de génération détaillé
8. ✅ Warning Varnish Code avec défaut "N/A"

### Nice-to-have (Backlog)

9. 🔮 Dashboard statistiques d'erreurs
10. 🔮 Suggestions automatiques de correction
11. 🔮 Email notifications pour erreurs critiques
12. 🔮 Historique des erreurs par utilisateur

---

## 📊 Métriques de Succès

| Métrique | Objectif | Mesure |
|----------|----------|--------|
| **Erreurs bloquantes évitées** | 95% | % d'impressions sans erreur critique |
| **Temps de résolution** | < 2 min | Temps moyen de correction erreur |
| **Satisfaction utilisateur** | > 4/5 | Note sur clarté des messages |
| **False positives** | < 5% | Erreurs déclenchées à tort |
| **Code coverage** | > 80% | Tests du système d'erreurs |

---

**Version** : 1.0.0  
**Dernière mise à jour** : 30 octobre 2025  
**Status** : ✅ Spécifications complètes + Roadmap d'implémentation  

 

Block date : Filter wich can be enabled (disabled by default). If enabled, activate a Boolean field related to shop order header to filter on value (TRUE / FALSE) 

Sent to cutting system : Filter wich can be enabled (disabled by default). If enabled, activate a Boolean field related to shop order header to filter on value (TRUE / FALSE) 

List only OR labels only OR  list + label : 3 different options of printing 

Printer selection : Available and mandatory only if option “Labels only” or “List + labels” selected.  

 

Error handling for no logical printers retrieved è Continue processing 

Une image contenant texte, capture d’écran, Police, logo

Le contenu généré par l’IA peut être incorrect. 

 

 

 

Generate / Print button :  

 

This button trigger the API call to get the Shop orders list and data related.  

IFS Object requested : Shop order with State = Released 

Filters : Site / Production line / Start Date / Block date / Sent to cutting system  

Filter on shop order operation : Block ID value (only if value filled) 

 

Error handling for no Shop orders retrieved è Stop processingUne image contenant texte, capture d’écran, Police, logo

Le contenu généré par l’IA peut être incorrect. 

Error handling if no Raw Material retrieved related to Shop order è Stop processing 

Une image contenant texte, capture d’écran, Police, conception

Le contenu généré par l’IA peut être incorrect. 

Error handling if no Generic code value retrieved for part related to Shop order è Stop processing 

Une image contenant texte, capture d’écran, Police, conception

Le contenu généré par l’IA peut être incorrect. 

Error handling if no Length setup value retrieved for part related to Shop order è Stop processing 

Une image contenant texte, capture d’écran, Police, conception

Le contenu généré par l’IA peut être incorrect. 

 

 

 

 

 

 

 

 

 

Screen 3 – Printing confirmation 