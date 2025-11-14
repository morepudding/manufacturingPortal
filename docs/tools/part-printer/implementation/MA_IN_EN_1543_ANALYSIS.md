# 🔍 Analyse Interface MA_IN_EN_1543 - Part Printer

**Date** : 13 novembre 2025  
**Statut** : 🔴 NON IMPLÉMENTÉ  
**Priorité** : ⚠️ BLOQUEUR PRODUCTION

---

## 📋 Vue d'ensemble

L'interface **MA_IN_EN_1543** est une **Logic App Azure** qui doit être utilisée pour l'impression des **étiquettes** (labels) Part Printer selon les spécifications fonctionnelles.

**Problème actuel** : Part Printer génère les PDF **localement** avec jsPDF, mais les specs exigent l'utilisation de l'infrastructure IFS via Azure Logic App.

---

## 📚 Références

| Document | Section | Description |
|----------|---------|-------------|
| `part-printer-functional-spec.md` | Step 7 | Définition des 3 modes d'impression |
| `part-printer-functional-spec.md` | Step 7 - Labels only | "Related CRIM: Interface MA_IN_EN_1543 + MA_FO_CR_184" |
| `part-printer-functional-spec.md` | Step 7 - Listing + labels | "Interface MA_IN_EN_1543 → Logic App Azure" |

---

## 🎯 Les 3 modes d'impression

### Mode 1 : Listing Only 📄

**Spec** : "Generated the listing only ready to print from local devices"

**Implémentation actuelle** :
```typescript
// ✅ CONFORME - Génération locale avec jsPDF
src/tools/part-printer/services/label-pdf-service-table.ts
```

**Infrastructure** :
- **Génération** : Locale (jsPDF dans le Manufacturing Portal)
- **Format** : PDF A4 paysage
- **Impression** : Locale (téléchargement PDF)

**Utilise IFS** : ❌ NON

---

### Mode 2 : Labels Only 🏷️

**Spec** : "User must select a printer in a LOV called from IFS before. If OK, trigger the label printing."

**Related CRIM** : 
- Interface **MA_IN_EN_1543** (Logic App Azure)
- FORMS **MA_FO_CR_184** (Layout IFS Crystal Report)

**Implémentation actuelle** :
```typescript
// ❌ NON CONFORME - On génère localement, on n'utilise PAS MA_IN_EN_1543
src/tools/part-printer/services/label-pdf-service-table.ts
src/shared/services/azure-print-service.ts (utilise MA_FO_CR_184 mais pas MA_IN_EN_1543)
```

**Infrastructure requise** :
```
┌────────────────────────────────────────────────────┐
│  Manufacturing Portal (Frontend)                   │
│  - Sélection Shop Orders                           │
│  - Choix imprimante IFS                            │
│  - Déclenchement impression                        │
└─────────────┬──────────────────────────────────────┘
              │
              │ HTTP POST
              │ payload: { shopOrders, printer, site }
              ▼
┌────────────────────────────────────────────────────┐
│  Azure Logic App MA_IN_EN_1543                     │
│  - Reçoit la liste des Shop Orders                 │
│  - Transforme en format IFS                        │
│  - Appelle IFS PrintDialog.svc                     │
└─────────────┬──────────────────────────────────────┘
              │
              │ IFS API Call
              │ payload: { Printer, PrintModel, Selection }
              ▼
┌────────────────────────────────────────────────────┐
│  IFS Cloud - PrintDialog.svc                       │
│  - Génère les étiquettes avec MA_FO_CR_184.rdl     │
│  - Envoie à l'imprimante                           │
└────────────────────────────────────────────────────┘
```

**Utilise IFS** : ✅ OUI (via Logic App)

---

### Mode 3 : Listing + Labels 📄 + 🏷️

**Spec** : "User must select a printer in a LOV called from IFS before. If OK, generated the listing + trigger the label printing"

**Related CRIM** :
- Interface **MA_IN_EN_1543** → Logic App Azure
- FORMS **MA_FO_CR_184**

**Implémentation requise** :
1. **Listing** : Génération locale (comme Mode 1)
2. **Labels** : Via Logic App MA_IN_EN_1543 (comme Mode 2)

**Utilise IFS** : ✅ OUI (pour les labels uniquement)

---

## 🔧 Composants IFS

### MA_IN_EN_1543 (Interface Logic App Azure)

**Type** : Interface REST Azure Logic App

**Rôle** :
- Recevoir la liste des Shop Orders depuis le Manufacturing Portal
- Transformer les données au format IFS
- Appeler l'API IFS PrintDialog.svc
- Déclencher l'impression des étiquettes

**Endpoints probables** :
```
DEV:  https://gbenapimgtaiscommondev.azure-api.net/manufacturing/partprinter/labels/print
PPD:  https://gbenapimgtaiscommonprd.azure-api.net/manufacturing/partprinter/labels/print
PROD: https://gbenapimgtaiscommon.azure-api.net/manufacturing/partprinter/labels/print
```

**Payload supposé** (à vérifier avec l'équipe IFS) :
```json
{
  "shopOrders": [
    {
      "orderNo": "495642",
      "releaseNo": "1",
      "sequenceNo": "10"
    }
  ],
  "printer": "PRTBX105_P",
  "site": "BDR",
  "printModel": "BEN_MA_FO_CR_184.rdl"
}
```

**Authentification** :
- OAuth2 Client Credentials (comme Azure Print API actuelle)
- Tenant : `beneteaugroup.onmicrosoft.com`
- Scope : `api://api.erpboat.dev/.default` (à confirmer)

---

### MA_FO_CR_184 (Formulaire IFS Crystal Report)

**Type** : Layout Crystal Report (.rdl)

**Localisation** : IFS Cloud (déployé dans chaque environnement)

**Rôle** :
- Template pour générer les étiquettes Part Printer
- Utilisé par PrintDialog.svc pour créer le PDF
- Contient le design exact des étiquettes (format, champs, codes-barres)

**Utilisation** :
```typescript
// Via azure-print-service.ts (Boat Configuration)
const payload = {
  Printer: "PRTBX105_P",
  PrintModel: "BEN_MA_FO_CR_184.rdl", // ← Le layout Crystal Report
  Selection: "ORDER_NO=495642^RELEASE_NO=1^SEQUENCE_NO=10^;"
}
```

**Status actuel** : ✅ Référencé dans le code mais **jamais testé** pour Part Printer

---

## ❌ Gap Analysis - Ce qui manque

### 1. Endpoint Logic App MA_IN_EN_1543 inconnu

**Problème** :
- Aucune documentation de l'endpoint Azure Logic App
- Pas de payload format connu
- Pas de credentials (Client ID, Secret, Scope)

**Action requise** :
- Contacter l'équipe IFS / Azure pour obtenir :
  - Endpoint URL (DEV, PPD, PROD)
  - Payload format exact
  - OAuth2 credentials
  - Documentation API

---

### 2. Service TypeScript pour MA_IN_EN_1543 inexistant

**Problème** :
- Pas de service `/shared/services/azure-logic-app-service.ts`
- Impossible d'appeler MA_IN_EN_1543 depuis le Manufacturing Portal

**⚠️ CLARIFICATION** :
- **MA_IN_EN_1543** n'est **PAS une imprimante** (ex: PRTBX101, PRTBX109)
- C'est un **numéro de référence IFS** pour une **interface technique** (CRIM)
- Désigne probablement une **Logic App Azure** ou un **service IFS custom**
- À chercher dans **IFS Client Network** ou **Azure APIM**, pas dans la liste des imprimantes

**Action requise** :
- Créer le service (similaire à `azure-print-service.ts`)
- Implémenter OAuth2 authentication
- Gérer retry logic + error handling
- Tester avec des Shop Orders réels

---

### 3. Layout MA_FO_CR_184.rdl non testé pour Part Printer

**Problème** :
- Le layout `BEN_MA_FO_CR_184.rdl` est référencé dans le code
- Mais il a été conçu pour **Boat Configuration** (Serial Numbers)
- Pas de confirmation qu'il fonctionne pour **Part Printer** (Shop Orders simples)

**Questions** :
- Le layout MA_FO_CR_184 supporte-t-il les Shop Orders **sans** Serial Numbers ?
- Faut-il un layout différent pour Part Printer ?
- Les champs requis (Raw Material, Generic Code, Block ID, etc.) sont-ils disponibles ?

**Action requise** :
- Tester MA_FO_CR_184 avec des Shop Orders Part Printer en DEV
- Confirmer que tous les champs s'affichent correctement
- Demander la création d'un layout dédié si nécessaire

---

### 4. Logique de routage Mode → Service inexistante

**Problème** :
- Pas de logique pour choisir entre :
  - Génération locale (Mode 1 : Listing Only)
  - Logic App Azure (Mode 2/3 : Labels Only / Listing + Labels)

**Action requise** :
- Créer un service orchestrateur :
  ```typescript
  // src/tools/part-printer/services/print-orchestrator-service.ts
  
  async function printPartLabels(
    mode: 'listing-only' | 'labels-only' | 'listing-and-labels',
    shopOrders: ShopOrder[],
    printer?: string,
    site: string
  ) {
    switch (mode) {
      case 'listing-only':
        // Génération locale PDF uniquement
        return await generateLocalPDF(shopOrders, site)
      
      case 'labels-only':
        // Appel MA_IN_EN_1543 (Logic App Azure)
        return await printViaLogicApp(shopOrders, printer!, site)
      
      case 'listing-and-labels':
        // Les deux : local PDF + Logic App
        const pdf = await generateLocalPDF(shopOrders, site)
        const printResult = await printViaLogicApp(shopOrders, printer!, site)
        return { pdf, printResult }
    }
  }
  ```

---

## 🚧 Plan d'action

### Phase 1 : Investigation (Urgent)

- [ ] **Contacter l'équipe IFS** pour obtenir la doc MA_IN_EN_1543
  - Endpoint URL
  - Payload format
  - OAuth2 credentials
  - Exemples d'appels

- [ ] **Tester MA_FO_CR_184.rdl** en DEV avec des Shop Orders Part Printer
  - Vérifier que tous les champs s'affichent
  - Confirmer que les codes-barres fonctionnent
  - Identifier les éventuels problèmes

---

### Phase 2 : Implémentation (Sprint suivant)

- [ ] **Créer le service Logic App**
  ```
  /shared/services/azure-logic-app-service.ts
  ```

- [ ] **Créer l'orchestrateur**
  ```
  /tools/part-printer/services/print-orchestrator-service.ts
  ```

- [ ] **Créer l'API route**
  ```
  /api/part-printer/labels/print-via-logic-app/route.ts
  ```

- [ ] **Mettre à jour l'UI** pour gérer les 3 modes correctement

---

### Phase 3 : Tests (Validation)

- [ ] **Test Mode 1** : Listing Only (local PDF) → ✅ Déjà fonctionnel
- [ ] **Test Mode 2** : Labels Only (Logic App MA_IN_EN_1543)
- [ ] **Test Mode 3** : Listing + Labels (local PDF + Logic App)

---

## 🔑 Variables d'environnement requises

```bash
# .env.local (à compléter après investigation)

# Azure Logic App MA_IN_EN_1543 (Part Printer Labels)
AZURE_LOGIC_APP_CLIENT_ID=<à_obtenir>
AZURE_LOGIC_APP_CLIENT_SECRET=<à_obtenir>
AZURE_LOGIC_APP_TENANT_ID=beneteaugroup.onmicrosoft.com
AZURE_LOGIC_APP_URL_DEV=https://gbenapimgtaiscommondev.azure-api.net/manufacturing/partprinter/labels/print
AZURE_LOGIC_APP_URL_PPD=https://gbenapimgtaiscommonprd.azure-api.net/manufacturing/partprinter/labels/print
AZURE_LOGIC_APP_URL_PROD=https://gbenapimgtaiscommon.azure-api.net/manufacturing/partprinter/labels/print
AZURE_LOGIC_APP_SCOPE=api://api.erpboat.dev/.default
AZURE_LOGIC_APP_SUBSCRIPTION_KEY=<à_obtenir>
```

---

## 📊 Comparaison avec Boat Configuration

| Aspect | Boat Configuration Editor | Part Printer (requis) |
|--------|---------------------------|------------------------|
| **Layout IFS** | BEN_MA_FO_CR_184.rdl | BEN_MA_FO_CR_184.rdl (même layout ?) |
| **API Azure** | Azure Print API (`/manufacturing/print/execute/Print`) | Logic App MA_IN_EN_1543 (différent) |
| **Génération PDF** | IFS uniquement (via PrintDialog.svc) | Local (jsPDF) + IFS (Logic App) selon mode |
| **Modes** | 1 seul mode (Print) | 3 modes (Listing / Labels / Both) |
| **Données** | Serial Numbers + DOP | Shop Orders + Operations + Master Parts |

**Conclusion** : Part Printer nécessite une **architecture hybride** (local + IFS) contrairement à Boat Config qui est 100% IFS.

---

## ✅ Checklist avant déploiement PROD

- [ ] Endpoint Logic App MA_IN_EN_1543 documenté
- [ ] Service `azure-logic-app-service.ts` créé et testé
- [ ] Layout MA_FO_CR_184.rdl validé pour Part Printer
- [ ] Orchestrateur de modes implémenté
- [ ] Tests en DEV avec Shop Orders réels
- [ ] Tests en PPD (pré-production)
- [ ] Variables d'environnement configurées (DEV, PPD, PROD)
- [ ] Documentation utilisateur mise à jour
- [ ] Formation équipe GAP Leaders / Supervisors

---

## 📞 Contacts

| Équipe | Contact | Rôle |
|--------|---------|------|
| **IFS Cloud** | Marc TOQUARD | Key User - Spécifications |
| **Azure / IT** | À identifier | Configuration Logic App MA_IN_EN_1543 |
| **Dev Team** | Manufacturing Portal | Implémentation |

---

## 📚 Documents liés

- [Part Printer Functional Spec](../specifications/part-printer-functional-spec.md)
- [Azure Print API Documentation](/docs/archive/old-docs/api/azure-print-api/README.md)
- [Part Printer Roadmap](../ROADMAP.md)
- [IFS Endpoints Documentation](/docs/api/IFS_ENDPOINTS.md)

---

**Dernière mise à jour** : 13 novembre 2025  
**Auteur** : GitHub Copilot  
**Statut** : 🔴 INVESTIGATION REQUISE
