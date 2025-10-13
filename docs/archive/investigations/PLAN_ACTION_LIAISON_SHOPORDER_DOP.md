# Plan d'Action - Investigation Liaison Shop Order ↔ DOP Header

**Date :** 09/10/2025  
**Objectif :** Identifier TOUS les champs possibles permettant de faire le lien entre Shop Order et DOP Header  
**Environnement :** AST (DEV)

---

## 🎯 Objectif de l'Investigation

Actuellement, nous avons identifié que :
- ✅ Le champ `DopId` existe dans Shop Order
- ❌ MAIS il est toujours `null` dans l'environnement AST
- ❓ Il existe peut-être **d'autres champs** permettant de faire le lien

**Questions à résoudre :**
1. Y a-t-il des Shop Orders avec `DopId` renseigné dans AST ?
2. Y a-t-il d'autres champs communs entre Shop Order et DOP Header ?
3. Peut-on faire une liaison via des champs intermédiaires (PartNo, OrderNo, dates, etc.) ?

---

## 📋 Plan d'Action en 4 Phases

### Phase 1 : Analyse Exhaustive Shop Order ✅ FAIT

**Objectif :** Récupérer tous les champs disponibles dans Shop Order

**Actions réalisées :**
- ✅ Script `analyze-shoporder-fields.js` créé
- ✅ 50 Shop Orders analysés
- ✅ 240 champs identifiés
- ✅ Rapport JSON généré : `shoporder-analysis-report.json`

**Résultats :**
```json
{
  "totalAnalyzed": 50,
  "uniqueFields": 240,
  "dopFields": ["DopId", "DopDemandExists", "PlannedOpScrap", "ShippedOperationsExist"],
  "dopIdPopulated": 0  // ❌ Aucun Shop Order avec DopId
}
```

---

### Phase 2 : Analyse Exhaustive DOP Header 🔄 EN COURS

**Objectif :** Récupérer tous les champs disponibles dans DOP Header

**Actions à réaliser :**
1. ✅ Créer script `analyze-dopheader-fields.js`
2. ⏳ Récupérer 50-100 DOP Headers depuis l'API
3. ⏳ Identifier tous les champs (estimé : 150-200 champs)
4. ⏳ Générer rapport JSON `dopheader-analysis-report.json`

**API à utiliser :**
```
GET /DopOrderHandling.svc/DopOrders?$top=100
```

**Champs attendus (à confirmer) :**
- `DopId` (clé primaire)
- `DopOrderId`
- `OrderNo` (potentiel lien avec Shop Order ?)
- `PartNo` (potentiel lien via pièce ?)
- `Contract` (site)
- `Company`
- `RelatedShopOrder` (?)
- Dates de création/modification
- Statuts

---

### Phase 3 : Comparaison Cross-Reference 🔄 À FAIRE

**Objectif :** Identifier les champs communs entre Shop Order et DOP Header

**Actions à réaliser :**
1. ⏳ Créer script `compare-shoporder-dop-fields.js`
2. ⏳ Comparer les 240 champs Shop Order avec les ~150 champs DOP Header
3. ⏳ Identifier les champs communs (nom identique)
4. ⏳ Identifier les champs potentiellement liés (valeurs similaires)
5. ⏳ Générer rapport de corrélation

**Analyses à effectuer :**

#### A) Recherche de champs identiques
```javascript
// Exemple de champs communs possibles
const potentialCommonFields = [
  'OrderNo',      // Numéro d'ordre
  'PartNo',       // Référence pièce
  'Contract',     // Site
  'Company',      // Société
  'ProjectId',    // Projet
  'CustomerNo',   // Client
  'ConfigurationId', // Configuration
  'PreAccountingId', // ID comptabilité
  'BalanceId',    // Balance
  'ObjectId'      // ID objet IFS
];
```

#### B) Recherche par correspondance de valeurs
```javascript
// Stratégie : pour chaque Shop Order
// 1. Extraire toutes les valeurs de champs (OrderNo, PartNo, etc.)
// 2. Chercher ces valeurs dans TOUS les champs du DOP Header
// 3. Identifier les correspondances potentielles
```

---

### Phase 4 : Test de Liaison Réelle 🔄 À FAIRE

**Objectif :** Valider les liens identifiés avec des données réelles

**Scénarios de test :**

#### Scénario A : Recherche Shop Order avec DopId
```javascript
// Augmenter la taille de l'échantillon
GET /ShopOrderHandling.svc/ShopOrds
  ?$top=500
  &$filter=DopId ne null
  &$orderby=DateEntered desc
```

**Hypothèse :** Peut-être que les Shop Orders récents ont des DopId

#### Scénario B : Recherche Shop Order liés à Customer Order
```javascript
// Shop Orders avec commande client
GET /ShopOrderHandling.svc/ShopOrds
  ?$filter=CustomerOrderNo ne null
  &$top=100
```

**Hypothèse :** Les Shop Orders avec commande client ont plus de chances d'avoir un DopId

#### Scénario C : Recherche DOP avec référence Shop Order
```javascript
// DOP Headers récents
GET /DopOrderHandling.svc/DopOrders
  ?$top=100
  &$orderby=CreatedDate desc
  
// Puis pour chaque DOP, chercher les champs contenant des valeurs
// qui ressemblent à des OrderNo de Shop Order
```

#### Scénario D : Liaison via PartNo
```javascript
// 1. Récupérer un Shop Order
shopOrder.PartNo = "C000001204347P022D065"

// 2. Chercher DOP avec même PartNo
GET /DopOrderHandling.svc/DopOrders
  ?$filter=contains(PartNo,'C000001204347P022D065')
  
// 3. Vérifier si les dates/quantités correspondent
```

---

## 🔧 Scripts à Créer

### Script 1 : `analyze-dopheader-fields.js`

**Objectif :** Analyser tous les champs DOP Header

```javascript
/**
 * Analyse exhaustive des champs DOP Header
 * 
 * Actions :
 * 1. Authentification OAuth2
 * 2. Récupération de 100 DOP Headers
 * 3. Extraction de tous les champs
 * 4. Analyse de la structure
 * 5. Génération rapport JSON
 */

// Endpoints à tester :
const dopEndpoints = [
  '/DopOrderHandling.svc/DopOrders',           // Liste DOP
  '/DopOrderHandling.svc/DopHeaders',          // Headers DOP
  '/DopOrderHandling.svc/Reference_DopHeadSerialReserv' // Serial
];
```

### Script 2 : `compare-shoporder-dop-fields.js`

**Objectif :** Comparer les structures et identifier les liens

```javascript
/**
 * Comparaison Shop Order ↔ DOP Header
 * 
 * Stratégies de comparaison :
 * 1. Champs identiques (même nom)
 * 2. Champs similaires (nom proche)
 * 3. Valeurs communes (cross-reference)
 * 4. Types de données compatibles
 * 5. Relations parent-enfant détectées
 */

// Analyse à 3 niveaux :
// Niveau 1 : Noms de champs identiques
// Niveau 2 : Valeurs communes dans différents champs
// Niveau 3 : Patterns de données (dates, IDs, références)
```

### Script 3 : `find-shoporder-dop-links.js`

**Objectif :** Rechercher des liens réels entre Shop Orders et DOP existants

```javascript
/**
 * Recherche active de liaisons
 * 
 * Méthodes :
 * 1. Recherche directe via DopId
 * 2. Recherche via OrderNo
 * 3. Recherche via PartNo
 * 4. Recherche via dates/quantités
 * 5. Recherche via Customer Order
 */
```

---

## 📊 Matrices d'Analyse

### Matrice de Comparaison (à compléter)

| Champ Shop Order | Type | Champ DOP Header | Type | Correspondance | Confiance |
|------------------|------|------------------|------|----------------|-----------|
| `DopId` | string | `DopId` | string | ✅ Direct | 100% |
| `OrderNo` | string | `OrderNo` ou `DopOrderId` ? | string | ❓ À vérifier | ? |
| `PartNo` | string | `PartNo` | string | ✅ Probable | 80% |
| `Contract` | string | `Contract` | string | ✅ Probable | 90% |
| `Company` | string | `Company` | string | ✅ Probable | 90% |
| `ConfigurationId` | string | `ConfigurationId` | string | ❓ À vérifier | ? |
| `PreAccountingId` | number | ? | ? | ❓ À découvrir | ? |
| `CustomerOrderNo` | string | `CustomerOrderNo` | string | ❓ À vérifier | ? |
| `ProjectId` | string | `ProjectId` | string | ❓ À vérifier | ? |

### Matrice de Recherche (stratégies)

| Stratégie | Description | Priorité | Complexité | Fiabilité |
|-----------|-------------|----------|------------|-----------|
| **Direct DopId** | Shop Order.DopId → DOP Header.DopId | 🔴 HIGH | ⭐ Low | ⭐⭐⭐ High |
| **Via OrderNo** | Shop Order.OrderNo → DOP Header.OrderNo | 🟡 MEDIUM | ⭐⭐ Medium | ⭐⭐ Medium |
| **Via PartNo + Date** | Correspondance pièce + période | 🟡 MEDIUM | ⭐⭐⭐ High | ⭐⭐ Medium |
| **Via Customer Order** | Shop Order → Customer Order → DOP | 🟢 LOW | ⭐⭐⭐ High | ⭐ Low |
| **Reverse (DOP → SO)** | Chercher depuis DOP vers Shop Order | 🟡 MEDIUM | ⭐⭐ Medium | ⭐⭐ Medium |

---

## 📈 Résultats Attendus

### Scénario Idéal ✅

```
✅ Découverte : 15-20 Shop Orders avec DopId renseigné
✅ Lien direct validé : Shop Order.DopId → DOP Header.DopId
✅ Workflow fonctionnel : 3 clés → DopId → Serial Number
```

### Scénario Alternatif ⚠️

```
❌ Aucun Shop Order avec DopId
✅ Découverte : Champ alternatif (ex: PreAccountingId, ConfigurationId)
✅ Lien indirect validé via table intermédiaire
⚠️ Workflow adapté nécessaire
```

### Scénario Critique ❌

```
❌ Aucun DopId dans Shop Order
❌ Aucun champ commun identifié
❌ Aucune liaison possible directement
🔄 Solution : Passage obligatoire par Customer Order
   ou API additionnelle non documentée
```

---

## ⏱️ Planning d'Exécution

### Jour 1 (Aujourd'hui)
- ✅ Phase 1 complétée : Shop Order analysé
- 🔄 Phase 2 : Créer script analyse DOP Header
- 🔄 Phase 2 : Exécuter analyse DOP Header

### Jour 2
- ⏳ Phase 3 : Comparaison des structures
- ⏳ Phase 3 : Identification champs communs
- ⏳ Phase 4 : Tests de liaison (scénarios A-B)

### Jour 3
- ⏳ Phase 4 : Tests de liaison (scénarios C-D)
- ⏳ Génération rapport final
- ⏳ Recommandations implémentation

---

## 🚀 Prochaines Actions Immédiates

### Action 1 : Créer le script d'analyse DOP Header ⏳
```bash
# Créer scriptTest/analyze-dopheader-fields.js
# Objectif : Récupérer structure complète DOP Header
```

### Action 2 : Exécuter l'analyse DOP ⏳
```bash
node analyze-dopheader-fields.js
# Génère : dopheader-analysis-report.json
```

### Action 3 : Comparer les structures ⏳
```bash
# Créer scriptTest/compare-shoporder-dop-fields.js
# Compare shoporder-analysis-report.json + dopheader-analysis-report.json
```

### Action 4 : Rechercher des liaisons réelles ⏳
```bash
# Créer scriptTest/find-shoporder-dop-links.js
# Teste les différentes stratégies de liaison
```

---

## 📝 Questions à Documenter

Pendant l'investigation, noter :

### A) Questions sur les données
- [ ] Combien de DOP Headers existent dans AST ?
- [ ] Y a-t-il des DOP récents (derniers 30 jours) ?
- [ ] Quel est le ratio Shop Order / DOP Header ?
- [ ] Y a-t-il des DOP avec Serial Numbers ?

### B) Questions sur la structure
- [ ] Quels sont les champs obligatoires dans DOP Header ?
- [ ] Y a-t-il un champ de référence inverse (DOP → Shop Order) ?
- [ ] Y a-t-il des tables de liaison intermédiaires ?
- [ ] Quelle est la cardinalité : 1-1, 1-N, N-N ?

### C) Questions sur le workflow
- [ ] Dans quel ordre sont créés Shop Order et DOP ?
- [ ] Qui crée le lien (système automatique ou utilisateur) ?
- [ ] Le lien peut-il être modifié après création ?
- [ ] Y a-t-il des logs de création/modification ?

---

## 🎯 Critères de Succès

### Succès Total ✅
- Identification de 10+ Shop Orders avec DopId
- Lien direct Shop Order.DopId → DOP Header.DopId validé
- Workflow 3 clés → Serial Number fonctionnel
- Documentation complète des champs

### Succès Partiel ⚠️
- Identification d'un champ alternatif de liaison
- Workflow indirect possible (via champ intermédiaire)
- Documentation des limitations

### Échec ❌
- Aucune liaison identifiable dans AST
- Nécessité d'accès PROD pour validation
- Documentation du blocage + recommandations

---

## 📚 Livrables Attendus

### Documents
1. ✅ `ANALYSE_RELATION_SHOPORDER_SERIAL_DOP.md` (Phase 1)
2. ⏳ `ANALYSE_DOP_HEADER_STRUCTURE.md` (Phase 2)
3. ⏳ `COMPARAISON_SHOPORDER_DOP.md` (Phase 3)
4. ⏳ `STRATEGIE_LIAISON_FINALE.md` (Phase 4)

### Rapports JSON
1. ✅ `shoporder-analysis-report.json` (27,746 lignes)
2. ⏳ `dopheader-analysis-report.json` (~20,000 lignes estimé)
3. ⏳ `field-comparison-report.json`
4. ⏳ `link-validation-report.json`

### Scripts
1. ✅ `analyze-shoporder-fields.js`
2. ⏳ `analyze-dopheader-fields.js`
3. ⏳ `compare-shoporder-dop-fields.js`
4. ⏳ `find-shoporder-dop-links.js`

---

## 🔗 Références

### APIs IFS
- **ShopOrderHandling.svc** : `/main/ifsapplications/projection/v1/ShopOrderHandling.svc/`
  - `ShopOrds` : Liste des Shop Orders
  - `$metadata` : Structure complète
  
- **DopOrderHandling.svc** : `/main/ifsapplications/projection/v1/DopOrderHandling.svc/`
  - `DopOrders` : Liste des DOP Orders
  - `DopHeaders` : Headers DOP (à confirmer)
  - `Reference_DopHeadSerialReserv` : Serial Numbers
  - `$metadata` : Structure complète

### Documentation Projet
- [SPECIFICATION_FONCTIONNELLE.md](../workflows/SPECIFICATION_FONCTIONNELLE.md)
- [ANALYSE_RELATION_SHOPORDER_SERIAL_DOP.md](./ANALYSE_RELATION_SHOPORDER_SERIAL_DOP.md)
- [SerialNumberAPI.md](./SerialNumberAPI.md)
- [OdataShoporder.md](./OdataShoporder.md)

---

## ✅ Checklist Validation

### Phase 2 - Analyse DOP Header
- [ ] Script créé et testé
- [ ] 50-100 DOP Headers récupérés
- [ ] Tous les champs extraits
- [ ] Rapport JSON généré
- [ ] Champs clés identifiés

### Phase 3 - Comparaison
- [ ] Script de comparaison créé
- [ ] Champs identiques listés
- [ ] Champs similaires identifiés
- [ ] Valeurs communes détectées
- [ ] Matrice de correspondance complétée

### Phase 4 - Validation
- [ ] Stratégie Direct DopId testée
- [ ] Stratégie Via OrderNo testée
- [ ] Stratégie Via PartNo testée
- [ ] Stratégie Reverse testée
- [ ] Au moins 1 liaison validée

### Documentation
- [ ] Rapport Phase 2 rédigé
- [ ] Rapport Phase 3 rédigé
- [ ] Rapport Phase 4 rédigé
- [ ] Stratégie finale recommandée
- [ ] Code mis à jour si nécessaire

---

**Document créé le :** 09/10/2025  
**Statut :** 🔄 EN COURS - Phase 2 à démarrer  
**Prochaine action :** Créer `analyze-dopheader-fields.js`
