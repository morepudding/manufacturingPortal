# 🧩 Comprendre MA_IN_EN_1543

**Date** : 13 novembre 2025  
**Question** : "C'est quoi MA_IN_EN_1543 ?"

---

## ❓ Question initiale

> "J'ai la liste des imprimantes (PRTBX101, PRTBX109, etc.) mais je ne trouve pas MA_IN_EN_1543"

## ✅ Réponse

**MA_IN_EN_1543 n'est PAS une imprimante !**

---

## 🎯 Qu'est-ce que MA_IN_EN_1543 ?

### C'est un numéro de référence IFS

**MA_IN_EN_1543** est un **code interne IFS** qui désigne :

| Type | Description |
|------|-------------|
| **Interface d'intégration** | Une API ou un service d'intégration entre systèmes |
| **CRIM** | Change Request Identification Management (numéro de ticket) |
| **Logic App Azure** | Application d'orchestration dans Azure |
| **Custom Interface IFS** | Service développé spécifiquement pour Part Printer |

### Décomposition du code

```
MA_IN_EN_1543
│  │  │   └── Numéro de référence (1543)
│  │  └────── EN = Environnement ? English ? Engineering ?
│  └────────── IN = Interface / Integration
└───────────── MA = Manufacturing / MAFO (Fabrication)
```

**Hypothèse** : Interface de fabrication (Manufacturing) numéro 1543

---

## 🔄 Relation avec les imprimantes

### Workflow complet

```
┌─────────────────────────────────────────────────┐
│  Manufacturing Portal                           │
│  - User sélectionne Shop Orders                 │
│  - User choisit imprimante: PRTBX109            │
└─────────────┬───────────────────────────────────┘
              │
              │ HTTP POST
              │ { shopOrders, printer: "PRTBX109" }
              ▼
┌─────────────────────────────────────────────────┐
│  MA_IN_EN_1543 (Interface Logic App Azure)      │ ◄── C'est ICI !
│  - Reçoit les Shop Orders                       │
│  - Transforme en format IFS                     │
│  - Appelle PrintDialog.svc                      │
└─────────────┬───────────────────────────────────┘
              │
              │ IFS API Call
              │ { Printer: "PRTBX109", ... }
              ▼
┌─────────────────────────────────────────────────┐
│  IFS PrintDialog.svc                            │
│  - Génère les étiquettes (MA_FO_CR_184.rdl)     │
│  - Envoie à l'imprimante PRTBX109               │
└─────────────────────────────────────────────────┘
```

**MA_IN_EN_1543** est le **middleware** entre le Manufacturing Portal et IFS.

---

## 🔍 Où chercher MA_IN_EN_1543 ?

### ❌ Ne PAS chercher ici

- ❌ Dans la liste des **imprimantes** (PRTBX*, PRTMNF*, PRTSH*)
- ❌ Dans `PrintDialog.svc/LogicalPrinters`
- ❌ Dans les layouts Crystal Report (*.rdl)

### ✅ Chercher ici

1. **IFS Client Network** (Menu IFS)
   ```
   IFS Cloud → Administration → Integration → Client Network
   Filtrer par: Interface Name = "MA_IN_EN_1543"
   ```

2. **Azure API Management**
   ```
   Azure Portal → API Management → gbenapimgtaiscommondev
   Rechercher: "1543" ou "manufacturing" ou "partprinter"
   ```

3. **IFS Application Configurations**
   ```
   IFS Cloud → System → Application Configurations
   Rechercher: "1543" ou "MA_IN_EN"
   ```

4. **IFS Custom Objects / LU (Logical Units)**
   ```
   IFS Cloud → Tools → Custom Objects
   Rechercher: "MA_IN_EN_1543"
   ```

5. **Documentation IFS / Confluence Bénéteau**
   - Wiki interne Bénéteau
   - Documentation technique Part Printer
   - CRIM 26037 (Change Request Part Printer)

---

## 📊 Analogie avec Boat Configuration

| Aspect | Boat Configuration | Part Printer |
|--------|-------------------|--------------|
| **Outil** | Boat Configuration Editor | Part Printer |
| **Interface Azure** | Azure Print API (`/manufacturing/print/execute/Print`) | **MA_IN_EN_1543** (endpoint inconnu) |
| **Layout IFS** | BEN_MA_FO_CR_184.rdl | BEN_MA_FO_CR_184.rdl (même ?) |
| **Imprimantes** | PRTBX105_P, PRTBX109, etc. | PRTBX112_PP, PRTBX101_MAFOPR184, etc. |
| **Données** | Serial Numbers + DOP | Shop Orders + Operations |

**Conclusion** : MA_IN_EN_1543 est l'**équivalent** de l'Azure Print API pour Part Printer.

---

## 🎯 Liste des imprimantes pertinentes pour Part Printer

D'après la liste fournie, les imprimantes probables pour Part Printer sont :

### Imprimantes spécifiques Part Printer

```
PRTBX112_PP          ← "_PP" = Part Printer !
PRTBX101_MAFOPR184   ← MAFOPR184 (Manufacturing Form Print 184)
PRTBX109_MAFOPR183   ← MAFOPR183
```

### Imprimantes génériques BDR (Rochefort)

```
PRTBX101, PRTBX109, PRTBX107_P, PRTBX105_L, PRTBX108_L, ...
```

### Imprimantes Manufacturing (MNF)

```
PRTMNF005, PRTMNF011, PRTMNF012_C, PRTMNF018
```

**Note** : `PRTBX112_PP` semble être l'imprimante **dédiée Part Printer** (suffixe `_PP`).

---

## 🚀 Prochaines étapes

### 1. Identifier MA_IN_EN_1543 dans IFS

**Méthode recommandée** : IFS Client Network

```sql
-- Si vous avez accès SQL à la DB IFS (peu probable)
SELECT * FROM client_network_lu
WHERE interface_name LIKE '%1543%'
OR description LIKE '%Part Printer%'
```

### 2. Vérifier le CRIM 26037

Les spécifications mentionnent :
```
CR 26037 P1  ← Change Request 26037 Phase 1
CR 26037 P2/3 ← Change Request 26037 Phases 2/3
```

**Action** : Demander à Marc TOQUARD ou l'équipe IFS :
- Documentation du CRIM 26037
- Spécifications techniques MA_IN_EN_1543
- Exemples d'appels API

### 3. Tester avec l'imprimante PRTBX112_PP

Une fois l'endpoint MA_IN_EN_1543 trouvé, tester avec :

```json
POST https://<endpoint_MA_IN_EN_1543>
{
  "shopOrders": [
    { "orderNo": "495642", "releaseNo": "1", "sequenceNo": "10" }
  ],
  "printer": "PRTBX112_PP",  ← Imprimante Part Printer
  "site": "BDR",
  "printModel": "BEN_MA_FO_CR_184.rdl"
}
```

---

## 💡 Indices supplémentaires

### Naming pattern IFS

D'après les imprimantes trouvées :

```
PRTBX101_MAFOPR184  ← MAFOPR184 = MA_FO_PR_184
                                  │  │  │   └── Numéro
                                  │  │  └────── PR = Print / Printer
                                  │  └────────── FO = Form
                                  └───────────── MA = Manufacturing

MA_IN_EN_1543       ← MA_IN_EN_1543
│  │  │   └── Numéro 1543
│  │  └────── EN = ?
│  └────────── IN = Interface
└───────────── MA = Manufacturing
```

**Hypothèse** : Les interfaces IFS Manufacturing suivent le pattern `MA_XX_YY_NNNN`

---

## 📞 Contacts pour obtenir l'info

1. **Marc TOQUARD** (Auteur specs) : marc.toquard@beneteau.com
2. **Admin IFS Bénéteau** : Via l'équipe IT
3. **Azure APIM Admin** : Via l'équipe Infrastructure Azure

**Question à poser** :

```
Bonjour,

Je cherche l'endpoint de l'interface MA_IN_EN_1543 mentionnée dans 
les spécifications Part Printer (CRIM 26037).

Pouvez-vous me fournir :
1. Le type d'interface (Logic App Azure ? Custom IFS ?)
2. L'endpoint URL (DEV, PPD, PROD)
3. Le payload format
4. Les credentials OAuth2

Merci,
```

---

## 📚 Documents liés

- [MA_IN_EN_1543 Analysis](./MA_IN_EN_1543_ANALYSIS.md)
- [How to Find MA_IN_EN_1543 Endpoint](./HOW_TO_FIND_MA_IN_EN_1543_ENDPOINT.md)
- [Part Printer Functional Spec](/docs/specifications/part-printer-functional-spec.md)

---

**Dernière mise à jour** : 13 novembre 2025  
**Auteur** : GitHub Copilot  
**Statut** : 🔍 CLARIFICATION
