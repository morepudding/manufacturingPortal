# 🚢 Boat Configuration Editor - Guide Complet

**Version** : 1.5  
**Status** : ✅ Production  
**Dernière mise à jour** : 12 novembre 2025

---

## 📋 Vue d'ensemble

Le **Boat Configuration Editor** permet aux opérateurs de production de rechercher des Shop Orders, récupérer automatiquement les Serial Numbers, valider avec Customer Orders, et imprimer les documents de configuration.

### Fonctionnalités principales

- 🔍 Recherche de Shop Orders (3 clés : OrderNo, ReleaseNo, SequenceNo)
- 📋 Récupération automatique du Serial Number via DOP Header
- ✅ Validation avec Customer Order (site FR05A uniquement)
- 🖨️ Sélection imprimante et langue
- 📄 Impression document MA_FO_CR_1419
- 📥 Téléchargement PDF

---

## 🔄 Workflow complet

### Vue d'ensemble

```
1. SAISIE SHOP ORDER
   └─> OrderNo, ReleaseNo, SequenceNo

2. RECHERCHE IFS CLOUD
   └─> ShopOrderHandling.svc/ShopOrds

3. RÉCUPÉRATION SERIAL NUMBER
   ├─> Extraction DopId (ex: "95 - 10088" → "95")
   └─> DopHeaderHandling.svc/Reference_DopHeadSerialReserv

4. VALIDATION CUSTOMER ORDER (Optionnel)
   ├─> Recherche par Serial Number (site FR05A)
   └─> CustomerOrderHandling.svc

5. SÉLECTION IMPRESSION
   ├─> Imprimante (PrintDialog.svc)
   └─> Langue (PrintDialog.svc)

6. IMPRESSION
   ├─> Génération ResultKey
   ├─> Envoi Print Request
   ├─> Polling PDF Archive
   └─> Téléchargement PDF
```

### Cas de test validés

| OrderNo | ReleaseNo | SequenceNo | Serial Number | Customer Order | Status |
|---------|-----------|------------|---------------|----------------|--------|
| 563 | * | * | JY6MB0019 | C1000038587 | ✅ |
| 949 | * | * | LX6MA0116 | - | ✅ |
| 97277 | * | * | LG5MA0114 | C1000038587 | ✅ |
| 1043 | * | * | LX6MA0115 | - | ✅ |

---

## 🖥️ Guide utilisateur

### Écran 1 : Saisie Shop Order

**Champs obligatoires :**
- Order No (20 caractères max)
- Release No (10 caractères max) - Utiliser "*" pour tous
- Sequence No (10 caractères max) - Utiliser "*" pour tous

**Bouton :** "Search"

**Messages possibles :**
- ✅ "Shop Order found"
- ❌ "Shop Order not found"
- ❌ "Invalid format"

### Écran 2 : Confirmation Serial Number

**Affichage :**
- Serial Number : LG5XA0003
- DOP Header ID : 37

**Question :** "Is this Serial Number correct?"

**Actions :**
- "Yes" → Continuer
- "No" → Retour écran 1

### Écran 3 : Validation Customer Order (Optionnel)

**Recherche automatique** par Serial Number (site FR05A uniquement)

**Affichage si trouvé :**
- Customer Order : C1000038587
- Order Date : 2025-10-13
- Status : Released

**Actions :**
- "Continue" → Écran impression

### Écran 4 : Sélection Imprimante & Langue

**Champs obligatoires :**
- Printer (dropdown)
- Language (dropdown)

**Bouton :** "Print Document MA_FO_CR_1419"

### Écran 5 : Confirmation Impression

**Message :** "Print job started successfully"

**Actions :**
- "Download PDF" → Télécharger le document
- "New Print" → Retour écran 1

---

## 🏗️ Architecture technique

### Stack

```
Frontend:
- React 19 + Next.js 15
- shadcn/ui + Tailwind CSS
- TypeScript strict

Backend:
- Next.js API Routes
- OAuth2 IFS Client
- MS SQL Server (local)
```

### Services backend

```
src/tools/boat-configuration/services/
├── shop-order-service.ts         # Recherche Shop Orders
├── serial-number-service.ts      # Récupération Serial Numbers
├── dop-service.ts                # Gestion DOP Headers
├── customer-order-service.ts     # Validation Customer Orders
└── print-service.ts              # Impression documents
```

### API Routes

```
src/app/api/boat-configuration/
├── shop-orders/search/           # POST - Recherche Shop Order
├── serial-numbers/               # GET - Serial Number par DOP
├── customer-orders/              # GET - Customer Order par Serial
└── print/                        # POST - Impression document

src/app/api/shared/
├── printers/                     # GET - Liste imprimantes
└── languages/                    # GET - Liste langues
```

---

## 📡 APIs IFS utilisées

### Services IFS (4 exclusifs + 2 partagés)

| Service | Endpoint | Usage |
|---------|----------|-------|
| **ShopOrderHandling** | `/ShopOrds` | Recherche Shop Orders |
| **DopHeaderHandling** | `/Reference_DopHeadSerialReserv` | Récupération Serial Numbers |
| **CustomerOrderHandling** | `/CustomerOrderLineSet` | Validation CO (FR05A) |
| **CustomerOrderHandling** | `/CustomerOrderSet` | Détails Customer Order |
| **PrintDialog** (partagé) | `/LogicalPrinterSet` | Liste imprimantes |
| **PrintDialog** (partagé) | `/LanguageCodeSet` | Liste langues |

### Exemple requête Shop Order

```http
GET /ShopOrderHandling.svc/ShopOrds?$filter=contains(OrderNo,'97277')
Authorization: Bearer {token}
```

**Réponse :**
```json
{
  "value": [{
    "OrderNo": "97277",
    "ReleaseNo": "*",
    "SequenceNo": "*",
    "DopId": "95 - 10088",
    "DopDemandExists": "TRUE"
  }]
}
```

### Exemple requête Serial Number

```http
GET /DopHeaderHandling.svc/Reference_DopHeadSerialReserv?$filter=contains(DopId,'95')
Authorization: Bearer {token}
```

**Réponse :**
```json
{
  "value": [{
    "SerialNo": "LG5MA0114",
    "PartNo": "LG5MA",
    "DopId": "95"
  }]
}
```

---

## 🐛 Problèmes connus & Solutions

### 1. DOP ID composite

**Problème :** Shop Order retourne `"54 - 1035"` mais Serial Number cherche avec ID complet

**Solution :** Parser avec `extractMainDopId()` → `"54"`

```typescript
// src/tools/boat-configuration/services/dop-service.ts
export function extractMainDopId(dopId: string): string {
  return dopId.split('-')[0].trim()
}
```

### 2. Filtre OData `eq` vs `contains`

**Problème :** `OrderNo eq '1043'` retourne erreur "types not compatible"

**Solution :** Utiliser `contains(OrderNo,'1043')` + filtrage exact côté code

```typescript
const response = await client.get(`ShopOrderHandling.svc/ShopOrds`, {
  $filter: "contains(OrderNo,'1043')"
})

// Filtrage exact côté code
const exactMatch = response.value.find(item => 
  item.OrderNo === searchValue.trim()
)
```

### 3. Customer Order limité à FR05A

**Important :** Le Customer Order Handling ne retourne que les commandes du site FR05A (pas FR018 ou autres)

**Validation :** Toujours vérifier `Site === "FR05A"` dans les requêtes

---

## 🧪 Tests

### Tests unitaires

```bash
# Tous les tests Boat Config
pnpm run test src/tools/boat-configuration

# Test service spécifique
pnpm run test shop-order-service.test.ts
```

### Tests E2E

```bash
# Workflow complet
pnpm run test:e2e boat-configuration
```

### Cas de test

| Test | Objectif | Status |
|------|----------|--------|
| Shop Order valide | Récupération Serial Number | ✅ |
| Shop Order invalide | Message d'erreur | ✅ |
| DOP ID composite | Parsing correct | ✅ |
| Customer Order FR05A | Validation réussie | ✅ |
| Impression PDF | Document généré | ✅ |

---

## 📝 Configuration

### Variables d'environnement

```bash
# IFS Cloud (OAuth2)
IFS_BASE_URL=https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1
IFS_CLIENT_ID=***
IFS_CLIENT_SECRET=***
IFS_TOKEN_URL=https://beneteau-group-ast.ifs.cloud/auth/realms/beneast1/protocol/openid-connect/token

# Azure AD (NextAuth)
AZURE_AD_CLIENT_ID=***
AZURE_AD_CLIENT_SECRET=***
AZURE_AD_TENANT_ID=***

# Database (Local SQL Server)
DATABASE_USER=sa
DATABASE_PASSWORD=***
DATABASE_HOST=localhost
DATABASE_PORT=1433
DATABASE_NAME=testApp
```

### Environnements

| Env | IFS URL | Status |
|-----|---------|--------|
| **DEV (AST)** | beneteau-group-ast.ifs.cloud | ✅ Actif |
| **PROD** | beneteau-group.ifs.cloud | 🔜 À venir |

---

## 📊 Changelog

### v1.5 - 2025-10-10
- ✅ Intégration Customer Order complète
- ✅ Validation cohérence Serial Number ↔ Customer Order
- ✅ Amélioration UX avec messages explicites

### v1.4 - 2025-10-08
- ✅ Impression PDF complète
- ✅ Téléchargement PDF
- ✅ Polling automatique PDF Archive

### v1.3 - 2025-10-05
- ✅ Sélection imprimante et langue
- ✅ Génération ResultKey IFS

### v1.0 - 2025-09-25
- ✅ Recherche Shop Order
- ✅ Récupération Serial Number via DOP
- ✅ Interface utilisateur

---

## 📞 Support

### Documentation complémentaire

- **Spécification fonctionnelle** : Voir archive/boat-configuration/specifications/
- **API IFS** : Voir [IFS_ENDPOINTS.md](./IFS_ENDPOINTS.md)
- **Architecture** : Voir [ARCHITECTURE.md](./architecture/ARCHITECTURE.md)

### Contacts

- **Product Owner** : Marc Toquard (Groupe Bénéteau)
- **IT Support** : IT Bénéteau
- **IFS Cloud** : https://beneteau-group-ast.ifs.cloud

---

**Maintenu par** : Équipe Manufacturing Portal  
**Version** : 1.5
