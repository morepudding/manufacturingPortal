# 🏢 IFS Cloud API - Sites Handling

**Service** : SitesHandling.svc  
**Type** : Projection API (OData v4)  
**Base URL** : `{IFS_BASE_URL}/SitesHandling.svc`  
**Authentication** : OAuth2 Bearer Token

---

## 📋 Vue d'ensemble

Le service **SitesHandling** gère les sites de production (Sites/Contracts) dans IFS Cloud, incluant :
- Recherche et récupération des sites/contrats
- Configuration des sites (adresses, calendriers, paramètres)
- Relation avec les lignes de production
- Paramètres de gestion (inventaire, distribution, fabrication)

### Services connexes

- [ProductionLineHandling](../production-line/) - Lignes de production par site
- [ShopOrderHandling](../shop-order/) - Ordres de fabrication par site

---

## 🎯 Use Cases principaux

### 1. Lister tous les sites disponibles

```
GET /SiteSet
```

### 2. Récupérer un site spécifique par Contract

```
GET /SiteSet(Contract='BDR')
```

### 3. Filtrer par site pour Part Printer

```
GET /SiteSet?$filter=Contract eq 'BDR'
```

---

## 📡 Endpoints

### SiteSet

Ensemble des sites de production (LOV Contracts dans IFS).

#### GET - Lister les sites

```http
GET /SitesHandling.svc/SiteSet
```

**Query Parameters (OData)**

| Paramètre | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `$filter` | string | Filtre OData | `Contract eq 'BDR'` |
| `$select` | string | Champs à retourner | `Contract,Description,Company` |
| `$top` | integer | Limite de résultats | `50` |
| `$orderby` | string | Tri | `Contract asc` |
| `$expand` | string | Relations | `CompanySiteRef` |

**Clé primaire**

| Champ | Type | Description |
|-------|------|-------------|
| `Contract` | string (5 max) | Code du site/contrat |

**Champs importants**

| Champ | Type | Description |
|-------|------|-------------|
| `Contract` | string | Code du site (ex: "BDR", "FR018") |
| `Description` | string | Description du site |
| `Company` | string | Société liée |
| `DeliveryAddress` | string | Adresse de livraison |
| `CountryCode` | string | Code pays |
| `RegionCode` | string | Code région |
| `ManufCalendarId` | string | Calendrier de fabrication |
| `DistCalendarId` | string | Calendrier de distribution |

**Exemple de requête**

```typescript
const response = await ifsClient.get(
  'SitesHandling.svc/SiteSet',
  {
    '$select': 'Contract,Description,Company,CountryCode',
    '$orderby': 'Contract asc'
  }
)
```

**Réponse exemple**

```json
{
  "value": [
    {
      "Contract": "BDR",
      "Description": "SITE BDR - VENDEE",
      "Company": "10",
      "CountryCode": "FR"
    },
    {
      "Contract": "FR018",
      "Description": "SITE PRODUCTION FRANCE",
      "Company": "10",
      "CountryCode": "FR"
    }
  ]
}
```

#### GET - Récupérer un site par clé

```http
GET /SitesHandling.svc/SiteSet(Contract='BDR')
```

**Réponse exemple**

```json
{
  "@odata.etag": "W/\"datetime'2025-10-13T10:00:00Z'\"",
  "Contract": "BDR",
  "Company": "10",
  "Description": "SITE BDR - VENDEE",
  "DeliveryAddress": "ADR_001",
  "ManufCalendarId": "CAL_MANUF",
  "DistCalendarId": "CAL_DIST",
  "CountryCode": "FR",
  "RegionCode": "PDL"
}
```

---

## 🔗 Relations disponibles ($expand)

### CompanySiteRef

Détails du site au niveau entreprise.

```http
GET /SiteSet?$expand=CompanySiteRef
```

### SiteMfgstdInfoRef

Configuration de fabrication du site.

```http
GET /SiteSet?$expand=SiteMfgstdInfoRef
```

### SiteInventInfoRef

Configuration inventaire du site.

```http
GET /SiteSet?$expand=SiteInventInfoRef
```

---

## 📚 Endpoints de référence disponibles

D'après les métadonnées OData, le service expose également :

| Endpoint | Description |
|----------|-------------|
| `Reference_CompanySite` | Sites au niveau entreprise |
| `Reference_CustOrdCust1` | Clients internes par site |
| `Reference_Supplier` | Fournisseurs par site |
| `Lookup_IsoCountry_EntitySet` | Liste des pays (ISO) |

---

## 🎯 Usage pour Part Printer

### Récupérer la liste des sites pour le dropdown

```typescript
import { getIFSClient } from '@/shared/services/ifs-client'

export async function getSites() {
  const client = getIFSClient()
  
  const response = await client.get(
    'SitesHandling.svc/SiteSet',
    {
      '$select': 'Contract,Description',
      '$orderby': 'Contract asc'
    }
  )
  
  return response.value.map(site => ({
    code: site.Contract,
    name: `${site.Contract} - ${site.Description}`
  }))
}
```

**Exemple de résultat**

```json
[
  { "code": "BDR", "name": "BDR - SITE BDR - VENDEE" },
  { "code": "FR018", "name": "FR018 - SITE PRODUCTION FRANCE" }
]
```

---

## ⚠️ Points d'attention

### 1. Contract vs Site

Dans IFS, les termes sont souvent interchangeables :
- **Contract** = Code du site (champ technique)
- **Site** = Terme métier

Pour Part Printer, on utilise le champ `Contract` pour filtrer les Shop Orders.

### 2. Filtrage exact

Contrairement à Shop Orders, utiliser `eq` fonctionne pour les sites :

```typescript
{
  '$filter': "Contract eq 'BDR'"  // ✅ Fonctionne
}
```

### 3. Autorisations

⚠️ **Attention** : L'utilisateur connecté peut ne pas avoir accès à tous les sites. Vérifier les autorisations IFS (`Objgrants`).

---

## 🔄 Workflow Part Printer

```
1. Utilisateur sélectionne un site
   └─> GET /SiteSet → Dropdown avec codes sites

2. Sélection site "BDR"
   └─> Utilisé pour filtrer Shop Orders et Production Lines
       ├─> Shop Orders: $filter=Contract eq 'BDR'
       └─> Production Lines: $filter=Contract eq 'BDR'
```

---

## ⚠️ Incertitudes & Vérifications nécessaires

### 🔍 À vérifier

1. **Endpoint correct ?**
   - ✅ Confirmé : `SitesHandling.svc/SiteSet`
   - ⚠️ Vérifier si `Reference_CompanySite` est plus approprié pour Part Printer

2. **Filtrage par utilisateur**
   - ⚠️ Vérifier si IFS filtre automatiquement les sites selon les droits de l'utilisateur
   - Alternative possible : `Reference_UserAllowedSiteLov`

3. **Relation avec Production Lines**
   - ⚠️ Confirmer que `Contract` dans SiteSet = `Contract` dans ProductionLines

### 🧪 Tests à effectuer

```bash
# Test 1 : Lister tous les sites
curl -X GET "{IFS_BASE_URL}/SitesHandling.svc/SiteSet" \
  -H "Authorization: Bearer {TOKEN}"

# Test 2 : Récupérer site BDR
curl -X GET "{IFS_BASE_URL}/SitesHandling.svc/SiteSet(Contract='BDR')" \
  -H "Authorization: Bearer {TOKEN}"

# Test 3 : Sites autorisés pour l'utilisateur
curl -X GET "{IFS_BASE_URL}/SitesHandling.svc/Reference_UserAllowedSiteLov" \
  -H "Authorization: Bearer {TOKEN}"
```

---

## 📚 Références

### Documentation IFS

- [Sites Handling Projection API](https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1/SitesHandling.svc/$metadata)

### Documentation projet

- [Part Printer Roadmap](../../tools/part-printer/ROADMAP.md)
- [Part Printer Services](../../../src/tools/part-printer/services/)

---

**Dernière mise à jour** : 13 octobre 2025  
**Status** : ⚠️ **À vérifier** - Endpoint identifié mais nécessite validation avec IFS AST  
**Testé avec** : IFS Cloud AST (Beneteau Dev) - ⏳ Tests en attente
