# 🔍 Guide : Comment trouver l'endpoint MA_IN_EN_1543

**Date** : 13 novembre 2025  
**Objectif** : Localiser l'endpoint de l'interface Logic App Azure MA_IN_EN_1543

---

## 🎯 Contexte

L'interface **MA_IN_EN_1543** est mentionnée dans les spécifications fonctionnelles comme une **Logic App Azure** pour l'impression des étiquettes Part Printer, mais aucun endpoint n'est documenté dans le code actuel.

---

## 📋 Informations connues

### Azure Print API existante (pour Boat Configuration)

```bash
# Endpoint actuel (trouvé dans azure-print-service.ts)
https://gbenapimgtaiscommondev.azure-api.net/manufacturing/print/execute/Print

# Pattern identifié :
https://gbenapimgtais<ENV>.azure-api.net/<NAMESPACE>/<RESOURCE>/<ACTION>

Où :
- ENV: commondev | commonprd | common (PROD)
- NAMESPACE: manufacturing
- RESOURCE: print
- ACTION: execute/Print
```

### Credentials OAuth2 existantes

```bash
# Fichier: docs/archive/old-docs/api/azure-print-api/README.md

Client ID: ***REMOVED*** (masqué)
Client Secret: ***REMOVED*** (masqué)
Tenant: beneteaugroup.onmicrosoft.com
Scope: api://api.erpboat.dev/.default
Subscription Key: ***REMOVED***;product=erpboat
```

---

## 🔎 Méthodes de recherche

### Méthode 1 : IFS Cloud UI (Client Network / Logic Apps) ⭐ RECOMMANDÉ

**Étapes** :

1. **Se connecter à IFS Cloud DEV**
   ```
   URL: https://beneteau-group-ast.ifs.cloud/landing-page/
   ```

2. **Naviguer vers "Client Network"**
   - Menu : `Administration` → `Integration` → `Client Network`
   - Ou rechercher "MA_IN_EN_1543" dans la barre de recherche IFS

3. **Rechercher l'interface MA_IN_EN_1543**
   - Filtrer par : `Interface Name = MA_IN_EN_1543`
   - Type : `Logic App` ou `REST API`

4. **Récupérer les informations**
   - Endpoint URL
   - Authentication type (OAuth2)
   - Payload format
   - Documentation technique

**Résultat attendu** :
```
Interface: MA_IN_EN_1543
Type: Azure Logic App
URL: https://gbenapimgtaiscommondev.azure-api.net/manufacturing/partprinter/1543
Method: POST
Auth: OAuth2 Client Credentials
```

---

### Méthode 2 : Demander à l'équipe IFS/Azure 📞

**Contacts** :

| Personne | Rôle | Email/Contact |
|----------|------|---------------|
| **Marc TOQUARD** | Key User - Auteur des specs | marc.toquard@beneteau.com |
| **Équipe IT Azure** | Infrastructure Azure APIM | À identifier |
| **Admin IFS** | Configuration interfaces | À identifier |

**Questions à poser** :

```
Bonjour,

Je travaille sur l'implémentation de l'outil Part Printer dans le Manufacturing Portal.
Les spécifications fonctionnelles mentionnent l'interface MA_IN_EN_1543 (Logic App Azure)
pour l'impression des étiquettes.

Pourriez-vous me fournir :
1. L'endpoint URL (DEV, PPD, PROD)
2. Le format du payload JSON attendu
3. Les credentials OAuth2 (Client ID, Secret, Scope)
4. Un exemple d'appel réussi (curl ou Postman)
5. La documentation technique de l'interface

Merci d'avance,
[Votre nom]
```

---

### Méthode 3 : Azure Portal (si accès) ☁️

**Pré-requis** : Accès au tenant Azure `beneteaugroup.onmicrosoft.com`

**Étapes** :

1. **Se connecter au portail Azure**
   ```
   URL: https://portal.azure.com
   ```

2. **Naviguer vers "API Management"**
   - Rechercher : `gbenapimgtaiscommondev` (ou similaire)
   - Ou filtrer par Resource Group lié à Bénéteau

3. **Explorer les APIs**
   - Onglet : `APIs`
   - Rechercher : "manufacturing" ou "1543" ou "partprinter"

4. **Consulter l'API MA_IN_EN_1543**
   - Onglet : `Design` → Voir les endpoints
   - Onglet : `Test` → Tester directement l'API
   - Onglet : `Settings` → Voir les authentifications

**Résultat attendu** :
```
API Name: Manufacturing - Part Printer - MA_IN_EN_1543
Base URL: https://gbenapimgtaiscommondev.azure-api.net
Path: /manufacturing/partprinter/1543
Operations:
  - POST /manufacturing/partprinter/1543
```

---

### Méthode 4 : Documentation Bénéteau existante 📚

**Localisation possible** :

1. **Confluence / SharePoint Bénéteau**
   - Chercher : "MA_IN_EN_1543"
   - Chercher : "Part Printer API"
   - Chercher : "Logic App Azure Manufacturing"

2. **Dossier partagé IT**
   - Spécifications techniques Part Printer
   - Documentation d'intégration IFS ↔ Azure

3. **Email / Teams**
   - Historique de communication avec l'équipe IFS
   - Annonces de déploiement de nouvelles APIs

---

### Méthode 5 : Analyse du pattern d'URL ⚙️

**Hypothèse basée sur l'API existante** :

```typescript
// Azure Print API (Boat Configuration)
const AZURE_PRINT_URL = 'https://gbenapimgtaiscommondev.azure-api.net/manufacturing/print/execute/Print'

// Pattern identifié :
// https://gbenapimgtais<ENV>.azure-api.net/manufacturing/<TOOL>/<ACTION>

// Hypothèses pour MA_IN_EN_1543 :
const POSSIBLE_URLS = [
  // Option 1 : Sous-domaine "partprinter"
  'https://gbenapimgtaiscommondev.azure-api.net/manufacturing/partprinter/print',
  'https://gbenapimgtaiscommondev.azure-api.net/manufacturing/partprinter/labels/print',
  'https://gbenapimgtaiscommondev.azure-api.net/manufacturing/partprinter/1543',
  
  // Option 2 : Action directe "1543"
  'https://gbenapimgtaiscommondev.azure-api.net/manufacturing/1543',
  'https://gbenapimgtaiscommondev.azure-api.net/manufacturing/print/1543',
  
  // Option 3 : Logic App séparée
  'https://gbenapimgtaiscommondev.azure-api.net/logicapps/ma-in-en-1543',
  'https://gbenapimgtaiscommondev.azure-api.net/interfaces/MA_IN_EN_1543',
]
```

**⚠️ ATTENTION** : Cette méthode est **approximative**. Il faut **confirmer** avec l'équipe IFS avant d'utiliser l'URL.

---

### Méthode 6 : Test avec Postman/cURL 🧪

**Une fois un endpoint potentiel identifié** :

```bash
# 1. Obtenir un token OAuth2
curl -X POST \
  'https://login.microsoftonline.com/beneteaugroup.onmicrosoft.com/oauth2/v2.0/token' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'client_id=<CLIENT_ID>' \
  -d 'client_secret=<CLIENT_SECRET>' \
  -d 'scope=api://api.erpboat.dev/.default' \
  -d 'grant_type=client_credentials'

# 2. Tester l'endpoint MA_IN_EN_1543
curl -X POST \
  'https://gbenapimgtaiscommondev.azure-api.net/manufacturing/partprinter/1543' \
  -H 'Authorization: Bearer <ACCESS_TOKEN>' \
  -H 'Content-Type: application/json' \
  -H 'Ocp-Apim-Subscription-Key: <SUBSCRIPTION_KEY>' \
  -d '{
    "shopOrders": [
      {
        "orderNo": "495642",
        "releaseNo": "1",
        "sequenceNo": "10"
      }
    ],
    "printer": "PRTBX105_P",
    "site": "BDR"
  }'
```

**Réponses possibles** :

| Code | Signification | Action |
|------|---------------|--------|
| **200** | ✅ Succès ! Endpoint trouvé | Documenter le payload exact |
| **401** | 🔑 Authentification échouée | Vérifier token OAuth2 |
| **404** | ❌ Endpoint introuvable | Essayer une autre URL |
| **500** | ⚠️ Erreur serveur | Vérifier payload format |

---

## 📊 Comparaison avec Azure Print API

| Aspect | Azure Print API (Boat Config) | MA_IN_EN_1543 (Part Printer) |
|--------|-------------------------------|------------------------------|
| **Endpoint** | `/manufacturing/print/execute/Print` | `/manufacturing/partprinter/???` (à trouver) |
| **Layout IFS** | BEN_MA_FO_CR_184.rdl | BEN_MA_FO_CR_184.rdl (même ?) |
| **Payload** | `{ Printer, PrintModel, Selection }` | `{ shopOrders, printer, site }` (supposé) |
| **Auth** | OAuth2 Client Credentials | OAuth2 (même tenant ?) |
| **Subscription Key** | `***REMOVED***;product=erpboat` | À obtenir |

---

## ✅ Checklist de validation

Une fois l'endpoint trouvé, vérifier :

- [ ] **Endpoint URL** documenté pour DEV, PPD, PROD
- [ ] **OAuth2 credentials** (Client ID, Secret, Tenant, Scope)
- [ ] **Subscription Key** Azure APIM
- [ ] **Payload format** exact (JSON schema)
- [ ] **Response format** (Success et Error)
- [ ] **Timeout** (combien de temps IFS prend pour générer les labels ?)
- [ ] **Error codes** possibles (400, 404, 500, etc.)
- [ ] **Layout IFS** utilisé (confirmer BEN_MA_FO_CR_184.rdl)
- [ ] **Test avec Shop Orders réels** en DEV

---

## 📝 Template de documentation

Une fois trouvé, documenter ainsi :

```markdown
# Interface MA_IN_EN_1543 - Part Printer Labels

## Endpoint

**DEV** : https://gbenapimgtaiscommondev.azure-api.net/manufacturing/partprinter/1543
**PPD** : https://gbenapimgtaiscommonprd.azure-api.net/manufacturing/partprinter/1543
**PROD** : https://gbenapimgtaiscommon.azure-api.net/manufacturing/partprinter/1543

## Authentication

- **Type** : OAuth2 Client Credentials
- **Token URL** : https://login.microsoftonline.com/beneteaugroup.onmicrosoft.com/oauth2/v2.0/token
- **Client ID** : <à_obtenir>
- **Client Secret** : <à_obtenir>
- **Scope** : api://api.erpboat.dev/.default
- **Subscription Key** : <à_obtenir>

## Request

**Method** : POST

**Headers** :
```http
Authorization: Bearer <access_token>
Content-Type: application/json
Ocp-Apim-Subscription-Key: <subscription_key>
```

**Body** :
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

## Response

**Success (200)** :
```json
{
  "success": true,
  "message": "Labels sent to printer successfully",
  "jobId": "PRINT_JOB_12345"
}
```

**Error (500)** :
```json
{
  "success": false,
  "error": "Failed to generate labels",
  "details": "..."
}
```
```

---

## 🚀 Prochaines étapes

1. **Choisir la méthode 1 (IFS UI) en priorité**
2. **Contacter Marc TOQUARD** si nécessaire (Méthode 2)
3. **Documenter l'endpoint trouvé** (voir template ci-dessus)
4. **Créer le service TypeScript** `/shared/services/azure-logic-app-service.ts`
5. **Tester en DEV** avec des Shop Orders réels

---

## 📞 Besoin d'aide ?

**Contacts** :
- **Marc TOQUARD** (Key User IFS) : marc.toquard@beneteau.com
- **IT Azure** : À identifier via l'organisation Bénéteau
- **Dev Team Manufacturing Portal** : Votre équipe

**Documentation liée** :
- [MA_IN_EN_1543 Analysis](./MA_IN_EN_1543_ANALYSIS.md)
- [Azure Print API Documentation](/docs/archive/old-docs/api/azure-print-api/README.md)
- [Part Printer Functional Spec](/docs/specifications/part-printer-functional-spec.md)

---

**Dernière mise à jour** : 13 novembre 2025  
**Auteur** : GitHub Copilot  
**Statut** : 🔍 GUIDE DE RECHERCHE
