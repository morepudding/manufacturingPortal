# 🏷️ Part Printer - Guide Complet

**Version** : 1.0  
**Status** : 🚧 En développement  
**Dernière mise à jour** : 12 novembre 2025

---

## 📋 Vue d'ensemble

Le **Part Printer** est un outil d'impression d'étiquettes et de listings pour les pièces de production (semi-finis). Il permet de générer des PDF de listings et d'imprimer des étiquettes selon des filtres avancés.

### Fonctionnalités principales

- 🏭 Sélection du site (Contract IFS)
- 📅 Filtrage par date de début et ligne de production
- 🔍 Filtres avancés (Block Date, Sent to Cutting System, Block ID)
- 📄 Génération de listings PDF (tableau multi-pages)
- 🏷️ Impression d'étiquettes (via Azure Print API)
- 📊 3 modes : Listing seul / Étiquettes seules / Listing + Étiquettes

---

## 🔄 Workflow complet

### Vue d'ensemble

```
1. SÉLECTION FILTRES
   ├─> Site (LOV IFS Contracts) - Obligatoire
   ├─> Production Line (LOV IFS) - Obligatoire si pas de Block ID
   ├─> Start Date (Calendar) - Obligatoire si pas de Block ID
   ├─> Block ID (text) - Optionnel
   ├─> Block Date (Boolean) - Optionnel
   └─> Sent to Cutting System (Boolean) - Optionnel

2. RECHERCHE SHOP ORDERS
   └─> POST /api/part-printer/shop-orders/filter
       → Liste des Shop Orders filtrés (State = Released)

3. EXTRACTION DONNÉES (Pour chaque Shop Order)
   ├─> GET /api/part-printer/operations (OP10)
   │   → Block ID + Raw Material
   ├─> GET /api/part-printer/master-parts/:partNo/attributes
   │   → Generic Code, Length Setup, Varnish Code
   ├─> GET /api/part-printer/ranges
   │   → Range ID
   └─> POST /api/part-printer/barcode/generate
       → Code-barres

4. CONSOLIDATION
   └─> POST /api/part-printer/labels/consolidate
       → Toutes les données dans PartLabel[]

5. MODE IMPRESSION
   ├─> Listing seul → Générer PDF tableau
   ├─> Étiquettes seules → Envoyer à imprimante
   └─> Listing + Étiquettes → Les deux

6. GÉNÉRATION & IMPRESSION
   ├─> PDF: POST /api/part-printer/labels/generate-pdf
   └─> Étiquettes: POST /api/part-printer/labels/print
```

### Modes d'impression

| Mode | Action | Output |
|------|--------|--------|
| **Listing seul** | Générer PDF tableau | PDF téléchargeable |
| **Étiquettes seules** | Envoyer à imprimante | Job d'impression |
| **Listing + Étiquettes** | Les deux | PDF + Job d'impression |

---

## 🖥️ Guide utilisateur

### Écran 1 : Filtres de sélection

**Champs obligatoires :**
- **Site** (dropdown) - Exemple : "BDR", "PRTBX"
- **Production Line** (dropdown) - Exemple : "Line 1", "Line 2"
  - Obligatoire si pas de Block ID
- **Start Date** (calendar) - Exemple : "2025-10-13"
  - Obligatoire si pas de Block ID

**Champs optionnels :**
- **Block ID** (text) - Si rempli, Start Date et Production Line deviennent optionnels
- **Block Date** (boolean) - TRUE/FALSE (désactivé par défaut)
- **Sent to Cutting System** (boolean) - TRUE/FALSE (désactivé par défaut)

**Mode d'impression :**
- Radio buttons : Listing seul / Étiquettes seules / Listing + Étiquettes

**Sélection imprimante :**
- Dropdown (visible uniquement si mode "Étiquettes" ou "Listing + Étiquettes")
- Obligatoire dans ces modes

### Écran 2 : Résultats et impression

**Affichage :**
- Nombre total de Shop Orders trouvés
- Aperçu des données (optionnel)
- Bouton "Generate / Print"

**Actions :**
- Générer PDF (mode Listing)
- Imprimer étiquettes (mode Étiquettes)
- Les deux (mode Listing + Étiquettes)

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
- Azure Print API (étiquettes)
- PDF Generation (listings)
```

### Services backend

```
src/tools/part-printer/services/
├── site-service.ts                    # Sites IFS (Contracts)
├── production-line-service.ts         # Lignes de production
├── shop-order-filter-service.ts       # Filtrage Shop Orders
├── operation-service.ts               # Opérations (OP10)
├── master-part-service.ts             # Attributs parts (Generic Code, etc.)
├── range-service.ts                   # Range ID
├── part-label-service.ts              # Consolidation données
├── barcode-service.ts                 # Génération codes-barres
├── label-pdf-service-table.ts         # PDF listings (tableau)
└── label-print-service.ts             # Impression étiquettes
```

### API Routes

```
src/app/api/part-printer/
├── sites/                             # GET - Liste sites
├── production-lines/                  # GET - Lignes de production
├── shop-orders/filter/                # POST - Recherche avec filtres
├── operations/                        # GET - Données opération (OP10)
├── master-parts/:partNo/attributes/   # GET - Attributs part
├── ranges/                            # GET - Range ID
├── barcode/generate/                  # POST - Génération code-barres
├── labels/consolidate/                # POST - Consolidation données
├── labels/generate-pdf/               # POST - PDF listing
└── labels/print/                      # POST - Impression étiquettes
```

---

## 📡 APIs IFS utilisées

### Services IFS (7 exclusifs + 1 partagé)

| Service | Endpoint | Usage |
|---------|----------|-------|
| **ShopOrderHandling** | `/ShopOrds` | Recherche Shop Orders (State = Released) |
| **ShopOrderHandling** | `/ShopOrds(...)/MaterialArray` | Raw Material |
| **ProductionLineHandling** | `/ProductionLines` | Lignes de production |
| **OperationBlockHandling** | `/Reference_ShopOrderOperation` | Données OP10 (Block ID) |
| **InventoryPartHandling** | `/InventoryPartSet(Contract,PartNo)` | Parts (clé composite) |
| **PartHandling** | `/PartCatalogSet/...` | Navigations attributs |
| **PartHandling** | `/TechnicalSpecBothArray` | Attributs techniques (Generic Code, Varnish, Length) |
| **EngineeringPartRevisionsHandling** | `/EngPartRevisionSet` | Révisions parts |
| **CompanySiteHandling** | `/CompanySiteSet/.../SiteMfgstdRangeArray` | Range ID |
| **PrintDialog** (partagé) | `/LogicalPrinterSet` | Liste imprimantes |

### Filtres avancés

#### Mode Débit classique

```typescript
{
  blockDate: true,                     // Block Date = TRUE
  op10BlockId: "EMPTY",                // OP10 Block ID strictement vide
  startDate: "2025-10-13"              // Date exacte
}
```

#### Mode Redébit

```typescript
{
  blockDate: false,                    // Block Date = FALSE
  op10BlockId: "NO_CONDITION",         // Pas de condition sur Block ID
  startDate: "2025-10-13"              // Date <= aujourd'hui
}
```

---

## 🐛 Problèmes connus & Solutions

### 1. TechnicalSpecBothArray - Timeout sur parts AN29-13-00

**Problème :** Parts AN29-13-00 ont 50+ attributs → timeout si récupération sans filtre

**Solution :** Utiliser `$filter` pour chaque attribut individuellement

```typescript
// ❌ Mauvais - récupère tous les attributs (50+)
GET /TechnicalSpecBothArray

// ✅ Bon - 3 requêtes parallèles avec filtres
GET /TechnicalSpecBothArray?$filter=Attribute eq 'GENERIC CODE'
GET /TechnicalSpecBothArray?$filter=Attribute eq 'VARNISH CODE'
GET /TechnicalSpecBothArray?$filter=Attribute eq 'LENGTH SETUP'
```

### 2. Navigation OData complexe

**Problème :** Navigation en 2 étapes avec clés composites encodées

**Solution :** Utiliser `encodeURIComponent()` pour les clés composites

```typescript
// Étape 1: Récupérer TechnicalSpecNo
const part = await get(`PartCatalogSet(...)/PartCatalogReferenceArray`)

// Étape 2: Navigation avec clé composite
const key = encodeURIComponent(`PartNo='${partNo}',TechnicalSpecNo='${specNo}'`)
const specs = await get(`PartCatalogReferenceArray(${key})/TechnicalSpecBothArray`)
```

### 3. Génération PDF multi-pages

**Challenge :** Grouper et trier les données correctement

**Solution :** Groupement par (Raw Material + Varnish Code), tri par Length Setup décroissant

```typescript
// Groupement
const groups = groupBy(labels, ['rawMaterial', 'varnishCode'])

// Tri décroissant par Length Setup
groups.forEach(group => {
  group.items.sort((a, b) => b.lengthSetup - a.lengthSetup)
})
```

---

## 🧪 Tests

### Tests unitaires

```bash
# Tous les tests Part Printer
pnpm run test src/tools/part-printer

# Test service spécifique
pnpm run test master-part-service.test.ts
```

### Tests manuels

Document de référence : `docs/tools/part-printer/MANUAL_TESTING_ERROR_HANDLING.md`

**Scénarios testés :**
- Recherche Shop Orders avec filtres
- Extraction attributs (3 types)
- Génération PDF tableau
- Impression étiquettes

---

## 📝 Configuration

### Variables d'environnement

```bash
# IFS Cloud (OAuth2)
IFS_BASE_URL=https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1
IFS_CLIENT_ID=***
IFS_CLIENT_SECRET=***

# Azure Print API (Étiquettes)
AZURE_PRINT_API_URL=https://print-api.beneteau.com
AZURE_PRINT_API_KEY=***

# Autres
DATABASE_USER=sa
DATABASE_PASSWORD=***
```

### Environnements

| Env | IFS URL | Status |
|-----|---------|--------|
| **DEV (AST)** | beneteau-group-ast.ifs.cloud | ✅ Actif |
| **PROD** | beneteau-group.ifs.cloud | 🔜 À venir |

---

## 📊 Spécifications fonctionnelles

### Règles métier

| Règle | Description |
|-------|-------------|
| **RG-001** | Site obligatoire (Contract IFS) |
| **RG-002** | Production Line obligatoire SI pas de Block ID |
| **RG-003** | Start Date obligatoire SI pas de Block ID |
| **RG-004** | Shop Orders filtrés par State = Released uniquement |
| **RG-005** | Block Date TRUE = Débit classique (OP10 Block ID vide) |
| **RG-006** | Block Date FALSE = Redébit (pas de condition Block ID) |
| **RG-007** | Imprimante obligatoire si mode Étiquettes |

### Gestion d'erreurs

| Code | Message | Action utilisateur |
|------|---------|-------------------|
| **E001** | No sites retrieved | Vérifier connexion IFS |
| **E002** | No production lines found | Sélectionner autre site |
| **E003** | No shop orders found | Ajuster filtres |
| **E004** | No raw material found | Contacter support |
| **E005** | Missing Generic Code | Contacter support |
| **E006** | Missing Length Setup | Contacter support |
| **E007** | Printer unavailable | Sélectionner autre imprimante |

---

## 📊 Format des étiquettes

### Données sur chaque étiquette

```
┌─────────────────────────────────────┐
│ BENETEAU                            │
│                                     │
│ Part No: AN29-13-00                 │
│ Description: Wooden Panel           │
│ Generic Code: PINE_WOOD             │
│ Length: 2400mm                      │
│ Varnish: VARNISH_01                │
│                                     │
│ [Barcode]                          │
│ 97277-1-10                         │
│                                     │
│ Order: 97277                       │
│ Qty: 5                             │
│ Range ID: R1                       │
└─────────────────────────────────────┘
```

### Format PDF Listing

- **Layout** : A4 Paysage
- **Sections** : Groupées par (Raw Material + Varnish Code)
- **Tri** : Length Setup décroissant
- **Colonnes** : Order No, Part No, Generic Code, Length, Varnish, Qty, Range ID

---

## 🚀 Roadmap (Planifié)

### Phase 1 : Fondations ✅ (Complète)
- Architecture services
- Types & Interfaces
- 3 attributs validés (Generic Code, Varnish Code, Length Setup)

### Phase 2 : Filtres & Recherche 🚧 (En cours)
- Filtres avancés (Block Date, Block ID, Sent to Cutting System)
- Recherche Shop Orders multi-critères
- Validation règles métier

### Phase 3 : Extraction données (À venir)
- Récupération complète attributs
- Navigation OData optimisée
- Gestion erreurs robuste

### Phase 4 : Génération & Impression (À venir)
- PDF listings tableau multi-pages
- Intégration Azure Print API
- 3 modes d'impression

### Phase 5 : Interface utilisateur (À venir)
- Filtres dynamiques
- Prévisualisation données
- Gestion états de chargement

### Phase 6-7 : Tests & Déploiement (À venir)
- Tests complets
- Validation utilisateurs
- Déploiement production

---

## 📞 Support

### Documentation complémentaire

- **Spécifications** : Voir archive/part-printer/specifications/
- **API Endpoints** : Voir archive/part-printer/api/ENDPOINTS.md
- **Architecture** : Voir [ARCHITECTURE.md](./architecture/ARCHITECTURE.md)

### Contacts

- **Product Owner** : Marc Toquard (Groupe Bénéteau)
- **IT Support** : IT Bénéteau
- **IFS Cloud** : https://beneteau-group-ast.ifs.cloud

---

**Maintenu par** : Équipe Manufacturing Portal  
**Version** : 1.0  
**Status** : 🚧 En développement actif
