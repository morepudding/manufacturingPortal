# 🔄 Comparaison Impression - Boat Config vs Part Printer

**Date** : 17 octobre 2025  
**Objectif** : Comprendre les différences et similitudes des systèmes d'impression

---

## 📊 Vue d'ensemble comparative

| Critère | Boat Configuration Editor | Part Printer |
|---------|---------------------------|--------------|
| **Type de document** | Configuration bateau (PDF multi-pages) | Étiquettes pièces bois (A4 paysage) |
| **Format** | A4 portrait, 2+ pages | A4 paysage, tableau |
| **Contenu** | Shop Order, Serial Number, Customer Order | Liste pièces + code-barres |
| **Source IFS** | Customer Order + Shop Order | Shop Order uniquement |
| **Workflow IFS** | ✅ Implémenté | ⚠️ À implémenter |
| **Status PROD** | ⚠️ Config requise | ❌ Non implémenté |

---

## 🏗️ Architecture d'impression

### Similitudes (services partagés)

Les deux outils utilisent les **mêmes services partagés** :

```typescript
// Services communs
src/shared/services/
  ├─> printer-service.ts     // Liste des imprimantes IFS
  ├─> ifs-client.ts          // Client OAuth2 IFS
  └─> language-service.ts    // Langues disponibles

// Types communs
src/shared/types/
  └─> print.ts               // PrintRequest, PrintResult, etc.
```

### Différences (services spécifiques)

```
Boat Configuration                    Part Printer
─────────────────                    ─────────────
src/tools/boat-configuration/        src/tools/part-printer/
└─> services/                        └─> services/
    └─> print-service.ts                 ├─> part-label-service.ts
        ✅ Workflow 5 étapes IFS          ├─> barcode-service.ts
        ✅ Customer Order                 ├─> label-pdf-service.ts
        ✅ PDF Download                   └─> label-print-service.ts
                                             ⚠️ Mode DEV uniquement
```

---

## 🔧 Workflow d'impression IFS

### Boat Configuration Editor (✅ Implémenté)

```
┌─────────────────────────────────────────────────────────┐
│           Workflow Boat Config (5 étapes)               │
└─────────────────────────────────────────────────────────┘

1. GET Customer Order + ETag
   └─> CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='...')

2. POST PrintResultKey
   └─> .../CustomerOrder_PrintResultKey
       Body: { ReportId: "CUSTOMER_ORDER_CONF_REP" }
       Returns: { value: "558558" }

3. POST PrintDialogInit
   └─> PrintDialog.svc/PrintDialogInit
       Body: { ResultKey: 558558 }
       Returns: { LayoutName: "...", ReportTitle: "..." }

4. POST ReportPrintRequest
   └─> PrintDialog.svc/ReportPrintRequest
       Body: {
         ResultKey: 558558,
         LayoutName: "BEN_Inventory-BAT.rdl",
         LanguageCode: "fr",
         LogicalPrinter: "PDF_PRINTER",
         Copies: 1
       }

5. (Optionnel) GET PDF from Archive
   └─> PrintDialog.svc/PdfArchiveSet?$filter=ResultKey eq 558558
```

**Performance** : ~13-15 secondes (avec téléchargement PDF)

---

### Part Printer (⚠️ À implémenter)

```
┌─────────────────────────────────────────────────────────┐
│           Workflow Part Printer (5 étapes)              │
│                    ⚠️ NON IMPLÉMENTÉ                     │
└─────────────────────────────────────────────────────────┘

1. GET Shop Order principal + ETag
   └─> ShopOrderHandling.svc/ShopOrds(OrderNo='...',ReleaseNo='*',SequenceNo='*')
   
   ❓ Problème : Quel Shop Order choisir ?
      - Option A : Premier du lot
      - Option B : Celui avec plus de pièces
      - Option C : Shop Order "parent" (si existe)

2. POST PrintResultKey (depuis Shop Order)
   └─> .../ShopOrd_PrintResultKey
       Body: { ReportId: "PART_LABEL_REPORT" }
       
   ❓ Problème : Cette méthode existe-t-elle sur ShopOrd ?
      - Si non : Option alternative via PdfArchiveSet

3. POST PrintDialogInit
   └─> PrintDialog.svc/PrintDialogInit
       Body: { ResultKey: ... }

4. POST ReportPrintRequest
   └─> PrintDialog.svc/ReportPrintRequest
       Body: {
         ResultKey: ...,
         LayoutName: "BEN_Part_Labels.rdl",
         LanguageCode: "fr",
         LogicalPrinter: "PRTBX101",
         Copies: 1
       }

5. (Pas de téléchargement PDF nécessaire)
```

**Performance estimée** : ~8-10 secondes

---

## 📋 Configuration IFS requise

### Boat Configuration Editor

| Élément | DEV (AST) | PROD | Status |
|---------|-----------|------|--------|
| **Report ID** | `CUSTOMER_ORDER_CONF_REP` | `MA_FO_CR_1419` | ⚠️ À valider |
| **Layout** | `BEN_Inventory-BAT.rdl` | `BEN_Boat_configuration_for_production.rdl` | ⚠️ À valider |
| **Imprimantes** | `PDF_PRINTER` | `PRTMNF012`, `PRTMNF015` | ⚠️ À tester |
| **Source** | Customer Order | Customer Order | ✅ OK |
| **Langues** | fr, en, da | fr, en, da, it, pl, pt | ✅ OK |

---

### Part Printer

| Élément | DEV | PROD | Status |
|---------|-----|------|--------|
| **Report ID** | N/A | `PART_LABEL_REPORT` | ❌ À créer |
| **Layout** | N/A | `BEN_Part_Labels.rdl` | ❌ À créer |
| **Imprimantes** | Simulé | `PRTBX101`, `PRTBX109`, `PRTBX239` | ⚠️ À tester |
| **Source** | Shop Order | Shop Order | ⚠️ Workflow à implémenter |
| **Langues** | fr | fr | ✅ OK (fixe) |

---

## 🎯 Types de documents

### Boat Configuration Editor

**Document généré** : Configuration de bateau pour production

**Contenu** :
- En-tête : Logo Bénéteau, titre "Configuration Bateau"
- **Shop Order** : OrderNo, ReleaseNo, SequenceNo, PartNo, PartDescription
- **Serial Number** : Numéro unique du bateau
- **Customer Order** : OrderNo, LineNo, CustomerName, DeliveryAddress
- **DOP Header** : DopId, informations planification
- **Configuration technique** : Liste des équipements, options, spécifications
- Pied de page : Mentions légales Bénéteau

**Format** : A4 portrait, 2-5 pages selon configuration

**Usage** : Accompagne le bateau tout au long de la production

---

### Part Printer

**Document généré** : Étiquettes pour pièces en bois

**Contenu** :
```
┌──────────────────────────────────────────────────────────┐
│  ÉTIQUETTES PIÈCES BOIS - BDR - 2025-10-17              │
├──────┬────────────┬─────────┬────────────┬──────────────┤
│  SO  │   Part No  │ Length  │  Generic   │   Varnish    │
│      │            │  Setup  │    Code    │     Code     │
├──────┼────────────┼─────────┼────────────┼──────────────┤
│ 1234 │ AN29-13-00 │  2500   │   TEAK     │    V100      │
│ 1234 │ AN29-13-01 │  2400   │   TEAK     │    V100      │
│ 1235 │ AN28-14-02 │  2300   │    OAK     │    V200      │
│ ...  │ ...        │  ...    │   ...      │    ...       │
├──────┴────────────┴─────────┴────────────┴──────────────┤
│  CODE-BARRES : 1234*AN29-13-00*2500*TEAK*V100           │
│  [████ ██ ████ ██ ████]                                 │
└──────────────────────────────────────────────────────────┘
```

**Format** : A4 paysage, tableau multi-lignes

**Usage** : Étiquettes collées sur les pièces bois pour traçabilité

---

## 🔐 Authentification & Sécurité

### Configuration OAuth2 IFS

**Identique pour les deux outils** :

```bash
# DEV (AST)
IFS_BASE_URL=https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1
IFS_CLIENT_ID=***REMOVED***
IFS_CLIENT_SECRET=***REMOVED***
IFS_TOKEN_URL=https://beneteau-group-ast.ifs.cloud/auth/realms/beneast1/protocol/openid-connect/token

# PROD (à configurer)
IFS_BASE_URL=https://beneteau-group-prod.ifs.cloud/main/ifsapplications/projection/v1
IFS_CLIENT_ID=???  # À obtenir
IFS_CLIENT_SECRET=???  # À obtenir
IFS_TOKEN_URL=https://beneteau-group-prod.ifs.cloud/auth/realms/[REALM]/protocol/openid-connect/token
```

**Gestion du token** : Automatique via `ifs-client.ts` (cache + renouvellement)

---

## 🖨️ Imprimantes physiques

### Boat Configuration Editor - Site MNF

| Printer ID | Type | Localisation | Format | Status |
|------------|------|--------------|--------|--------|
| `PRTMNF012` | HP LaserJet Enterprise | Atelier Production | A4 portrait | ⏳ À valider |
| `PRTMNF015` | HP LaserJet Enterprise | Bureau Qualité | A4 portrait | ⏳ À valider |

**Usage** : Documents de configuration imprimés en 2+ exemplaires
- 1 exemplaire reste avec le bateau
- 1 exemplaire archivé bureau qualité

---

### Part Printer - Site BDR

| Printer ID | Type | Localisation | Format | Status |
|------------|------|--------------|--------|--------|
| `PRTBX101` | Zebra / Brother | Atelier Bois | A4 paysage | ⏳ À valider |
| `PRTBX109` | Zebra / Brother | Zone Préparation | A4 paysage | ⏳ À valider |
| `PRTBX239` | Zebra / Brother | Stock Bois | A4 paysage | ⏳ À valider |

**Usage** : Étiquettes imprimées et collées directement sur les pièces

---

## 🧪 Scénarios de test

### Test Boat Configuration

**Scénario typique** :

1. Opérateur MNF arrive sur sa ligne de production
2. Bateau prêt à assembler → Shop Order `97277`
3. Ouvre Manufacturing Portal → Boat Config
4. Saisit Shop Order : `97277` / `*` / `*`
5. Valide Serial Number : `LG5MA0114`
6. Valide Customer Order : `C1000038587`
7. Sélectionne imprimante : `PRTMNF012` (près de sa ligne)
8. Sélectionne langue : `fr`
9. Clique "Print Only"
10. Document imprimé en 10s → Accompagne le bateau

**Critère de succès** : Document complet, lisible, en français

---

### Test Part Printer

**Scénario typique** :

1. Opérateur BDR prépare les pièces du jour
2. Ouvre Manufacturing Portal → Part Printer
3. Filtre : Site=BDR, Date=2025-10-17, Mode=Débit classique
4. Liste de 8 Shop Orders avec 25 pièces bois total
5. Clique "Generate Labels"
6. PDF généré avec tableau trié par Raw Material + Varnish
7. Sélectionne imprimante : `PRTBX101` (près de lui)
8. Clique "Print"
9. Étiquettes imprimées en 8s
10. Colle chaque étiquette sur la pièce correspondante
11. Scanne le code-barres pour vérifier lisibilité

**Critère de succès** : Étiquettes lisibles, code-barres scannable, tri correct

---

## 🚨 Points d'attention

### Boat Configuration

| Risque | Impact | Mitigation |
|--------|--------|------------|
| **Layout PROD vide** | 🔴 Critique | Valider layout `BEN_Boat_configuration_for_production.rdl` avant déploiement |
| **Report MA_FO_CR_1419 manquant** | 🔴 Critique | Créer Report custom avec équipe IFS |
| **Imprimante hors ligne** | 🟠 Moyen | Message d'erreur clair + imprimante backup |
| **PDF trop lourd** | 🟡 Faible | Optimisation images si > 1 MB |

---

### Part Printer

| Risque | Impact | Mitigation |
|--------|--------|------------|
| **Workflow IFS non implémenté** | 🔴 Bloquant | Développement 2 jours (voir plan action) |
| **Report PART_LABEL_REPORT manquant** | 🔴 Bloquant | Créer Report custom A4 paysage avec IFS |
| **Code-barres illisible** | 🟠 Moyen | Test scan + ajustement taille code-barres |
| **Mauvais groupement pièces** | 🟡 Faible | Validation logique tri avec équipe production |

---

## 📊 Métriques de succès

### KPIs communs

| Métrique | Objectif | Mesure |
|----------|----------|--------|
| **Taux de réussite impression** | > 95% | Logs application |
| **Temps moyen impression** | < 15s | Timer automatique |
| **Satisfaction utilisateurs** | > 4/5 | Enquête mensuelle |

---

### KPIs spécifiques

**Boat Configuration** :

| Métrique | Objectif |
|----------|----------|
| Impressions par jour | 50-100 |
| Taux d'utilisation téléchargement PDF | 20-30% |
| Nombre de langues utilisées | 3+ (fr, en, da) |

**Part Printer** :

| Métrique | Objectif |
|----------|----------|
| Étiquettes imprimées par jour | 200-500 |
| Taux de scan code-barres réussi | > 99% |
| Temps moyen génération étiquettes | < 5s |

---

## 📞 Contacts par outil

### Boat Configuration Editor

| Rôle | Contact | Responsabilité |
|------|---------|----------------|
| **Utilisateurs** | Opérateurs MNF | Usage quotidien |
| **Support IT** | IT MNF | Imprimantes, réseau |
| **Config IFS** | Équipe IFS | Report MA_FO_CR_1419 |

---

### Part Printer

| Rôle | Contact | Responsabilité |
|------|---------|----------------|
| **Utilisateurs** | Opérateurs BDR Atelier Bois | Usage quotidien |
| **Support IT** | IT BDR | Imprimantes étiquettes |
| **Config IFS** | Équipe IFS | Report PART_LABEL_REPORT |

---

## 📚 Documentation de référence

| Document | Boat Config | Part Printer |
|----------|-------------|--------------|
| **Spécifications** | ✅ [Lien](../tools/boat-configuration-editor/specifications/) | ✅ [Lien](../tools/part-printer/specifications/) |
| **Guide implémentation** | ✅ [Lien](../tools/boat-configuration-editor/implementation/) | ⏳ En cours |
| **Guide utilisateur** | ✅ [Lien](../tools/boat-configuration-editor/user-guide/) | ⏳ À créer |
| **Workflow impression** | ✅ Implémenté | ⚠️ À implémenter |

---

**Date** : 17 octobre 2025  
**Version** : 1.0  
**Auteur** : Manufacturing Portal Team
