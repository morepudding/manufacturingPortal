# 🏷️ Attributes Handling API - AttributesHandling.svc

**Service IFS** : `AttributesHandling.svc`  
**Version OData** : 4.01  
**Types disponibles** : 1 (TechnicalAttribStd)  
**Status** : ✅ **VALIDÉ** (Test 4) - 🎉 **DÉCOUVERTE MAJEURE**

---

## 📋 Vue d'ensemble

L'API **AttributesHandling** fournit l'accès aux **attributs techniques standard** dans IFS Cloud. Ce service expose les définitions des attributs personnalisés de Bénéteau, incluant les **3 attributs critiques** pour Part Printer.

### 🎯 Découverte Majeure

Ce service contient **TOUS les attributs personnalisés Bénéteau** recherchés :

| Attribut | Nom IFS | Type | Status |
|----------|---------|------|--------|
| **GENERIC CODE** | `GENERIC CODE` | Alphanumeric | ✅ TROUVÉ |
| **LENGTH SETUP** | `LENGTH SETUP` | Numeric | ✅ TROUVÉ |
| **VARNISH CODE** | `VARNISH CODE` | Alphanumeric | ✅ TROUVÉ |

### Utilisé par

- 🏷️ **Part Printer** : Récupération des attributs GENERIC CODE, LENGTH SETUP, VARNISH CODE
- 🏭 **Manufacturing Portal** : Attributs techniques des pièces

---

## 🔑 Endpoint Principal : `TechnicalAttribStdSet`

### Description

`TechnicalAttribStdSet` contient les **définitions** des attributs techniques standard configurés dans IFS. C'est une table de **référence** qui liste les attributs disponibles, leurs types, et descriptions.

⚠️ **IMPORTANT** : Ce service contient les **définitions** des attributs, pas les **valeurs** associées aux pièces. Les valeurs des attributs pour une pièce spécifique sont probablement dans un autre service (voir section "Lien avec les pièces").

### URL

```
GET /AttributesHandling.svc/TechnicalAttribStdSet
```

### Paramètres OData

| Paramètre | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `$top` | integer | Limite de résultats | `$top=50` |
| `$skip` | integer | Pagination | `$skip=20` |
| `$filter` | string | Filtrage | `contains(Attribute,'GENERIC')` |
| `$orderby` | string | Tri | `Attribute asc` |
| `$select` | string | Sélection de champs | `Attribute,AttribDesc,AttribType` |
| `$count` | boolean | Inclure le count | `true` |

---

## 📊 Structure des Données

### Entity : `TechnicalAttribStd`

#### Clé primaire
- `Attribute` (string, 15 chars) - Nom de l'attribut (ex: "GENERIC CODE")

#### Champs

| Champ | Type | Longueur | Description |
|-------|------|----------|-------------|
| `Attribute` | string | 15 | **Nom de l'attribut** (ex: "GENERIC CODE") |
| `AttribDesc` | string | 40 | Description de l'attribut (ex: "generic code") |
| `AttribType` | enum | - | Type de données : **"Alphanumeric"** ou **"Numeric"** |
| `luname` | string | 80 | Nom logique de l'unité (toujours "TechnicalAttribStd") |
| `keyref` | string | 4000 | Référence de clé (ex: "ATTRIBUTE=GENERIC CODE^") |
| `Objgrants` | string | - | Droits d'objet (généralement null) |

#### Enum : `TechnicalAttribType`

```typescript
enum TechnicalAttribType {
  Numeric = 0,      // Attribut numérique (ex: LENGTH SETUP)
  Alphanumeric = 1  // Attribut alphanumérique (ex: GENERIC CODE)
}
```

---

## 🎯 Attributs Part Printer

### Attributs Trouvés (3/3) ✅

#### 1. GENERIC CODE ✅

```json
{
  "Attribute": "GENERIC CODE",
  "AttribDesc": "generic code",
  "AttribType": "Alphanumeric"
}
```

**Utilisation** : Code générique de la pièce (ex: "GEN_OAK_001")

#### 2. LENGTH SETUP ✅

```json
{
  "Attribute": "LENGTH SETUP",
  "AttribDesc": "length setup",
  "AttribType": "Numeric"
}
```

**Utilisation** : Longueur de configuration (ex: "2850")

#### 3. VARNISH CODE ✅

```json
{
  "Attribute": "VARNISH CODE",
  "AttribDesc": "varnish code",
  "AttribType": "Alphanumeric"
}
```

**Utilisation** : Code de vernis (ex: "VARN_A")

---

## 🔍 Autres Attributs Bénéteau Disponibles (182 total)

### Attributs Bois (Wood)

- `WOOD SPECIES` - Essence de bois
- `CROSS GRAINED W` - Bois traversant
- `PLYWOOD TREATM` - Traitement contreplaqué
- `EDGE WD SPC` - Essence du chant
- `END FINISHING` - Finition des extrémités

### Attributs Panneaux

- `PANEL THICKNESS` - Épaisseur (Numeric)
- `PANEL ESSENCE` - Code WFG
- `FACE A JOINERY` - Menuiserie face A
- `FACE B JOINERY` - Menuiserie face B

### Attributs Dimensions

- `LENGTH` - Longueur (Numeric)
- `WIDTH` - Largeur (Numeric)
- `WEIGHT` - Poids (Numeric)
- `SURFACE` - Surface (Numeric)
- `THICKNESS` - Épaisseur (Numeric)

### Attributs Finition

- `FINISH` - Finition
- `GLOSS` - Brillance
- `N VARNISH SIDES` - Nombre de côtés vernis (Numeric)

### Attributs Technique

- `MATERIAL` - Matériau
- `BRAND` - Marque
- `PROFIL CODE` - Code profil
- `GLUING` - Collage

---

## 💻 Utilisation TypeScript

### Interface TypeScript

```typescript
/**
 * Attribut technique standard IFS
 */
interface IFSTechnicalAttribStd {
  /** Nom de l'attribut (ex: "GENERIC CODE") */
  Attribute: string
  /** Description de l'attribut */
  AttribDesc: string
  /** Type de données */
  AttribType: 'Alphanumeric' | 'Numeric'
  /** Nom logique unité */
  luname: string
  /** Référence de clé */
  keyref: string
  /** Droits objet */
  Objgrants: string | null
}

/**
 * Réponse OData TechnicalAttribStdSet
 */
interface IFSTechnicalAttribStdResponse {
  '@odata.context': string
  '@odata.count'?: number
  value: IFSTechnicalAttribStd[]
}
```

### Service Example

```typescript
import { getIFSClient } from '@/shared/services/ifs-client'

export class AttributesService {
  /**
   * Récupère la définition d'un attribut par son nom
   */
  async getAttributeDefinition(
    attributeName: string
  ): Promise<IFSTechnicalAttribStd | null> {
    const client = getIFSClient()
    
    try {
      // Accès direct par clé
      const attr = await client.get<IFSTechnicalAttribStd>(
        `AttributesHandling.svc/TechnicalAttribStdSet(Attribute='${attributeName}')`
      )
      
      return attr
    } catch (error) {
      console.error('Attribut non trouvé:', attributeName)
      return null
    }
  }
  
  /**
   * Liste tous les attributs disponibles
   */
  async listAllAttributes(): Promise<IFSTechnicalAttribStd[]> {
    const client = getIFSClient()
    
    const response = await client.get<IFSTechnicalAttribStdResponse>(
      'AttributesHandling.svc/TechnicalAttribStdSet',
      { $top: '200' }
    )
    
    return response.value
  }
  
  /**
   * Récupère les 3 attributs Part Printer
   */
  async getPartPrinterAttributes(): Promise<{
    genericCode: IFSTechnicalAttribStd | null
    lengthSetup: IFSTechnicalAttribStd | null
    varnishCode: IFSTechnicalAttribStd | null
  }> {
    const [genericCode, lengthSetup, varnishCode] = await Promise.all([
      this.getAttributeDefinition('GENERIC CODE'),
      this.getAttributeDefinition('LENGTH SETUP'),
      this.getAttributeDefinition('VARNISH CODE')
    ])
    
    return { genericCode, lengthSetup, varnishCode }
  }
}
```

---

## 🔗 Lien avec les Pièces (PartNo)

### ⚠️ Problème Actuel

`TechnicalAttribStdSet` contient les **définitions** des attributs, mais **PAS les valeurs** associées à chaque pièce.

**Exemple** :
- ✅ On sait que l'attribut "GENERIC CODE" existe (type Alphanumeric)
- ❌ On ne sait PAS quelle est la valeur de "GENERIC CODE" pour la pièce "LG5MA0XD02"

### 🔍 Service Complémentaire à Trouver

Il doit exister un service IFS qui lie les **attributs techniques** aux **pièces** :

**Hypothèses** :

#### Hypothèse 1 : `PartTechnicalAttribute` ou similaire

```
GET /AttributesHandling.svc/PartTechnicalAttributeSet
  ?$filter=PartNo eq 'LG5MA0XD02'
  &$expand=TechnicalAttribStdRef
```

#### Hypothèse 2 : Dans `InventoryPartHandling`

```
GET /InventoryPartHandling.svc/InventoryPartSet(Contract='BDR',PartNo='LG5MA0XD02')
  ?$expand=TechnicalAttributesRef
```

#### Hypothèse 3 : Service séparé `PartAttributesHandling`

```
GET /PartAttributesHandling.svc/PartAttributeSet
  ?$filter=PartNo eq 'LG5MA0XD02' and Attribute eq 'GENERIC CODE'
```

### 📋 Prochaines Actions

1. **Explorer métadonnées AttributesHandling** :
   ```bash
   GET /AttributesHandling.svc/$metadata
   # Chercher "PartTechnicalAttribute", "PartAttribute", etc.
   ```

2. **Tester expansions possibles** :
   ```typescript
   // Essayer d'accéder aux valeurs depuis TechnicalAttribStd
   GET /AttributesHandling.svc/TechnicalAttribStdSet(Attribute='GENERIC CODE')?$expand=PartValuesRef
   ```

3. **Explorer autres services** :
   - `EngineeringPartRevisionsHandling.svc` (attributs par révision?)
   - `ManufacturingPartHandling.svc` (si existe)
   - `PartCatalogHandling.svc` (si existe)

---

## 🧪 Tests & Validation

### Test 4 : Découverte ✅

```bash
npx tsx scripts/ifs-test-4-attributes-handling.ts
```

**Résultats** :
- ✅ Service accessible
- ✅ 182 attributs techniques disponibles
- ✅ GENERIC CODE trouvé
- ✅ LENGTH SETUP trouvé
- ✅ VARNISH CODE trouvé

### Test 5 : Lien avec PartNo ⏳

**À implémenter** : Trouver comment récupérer les valeurs des attributs pour une pièce spécifique.

---

## 📚 Documentation Complémentaire

### Liens Internes

- [Inventory Part API](../inventory-part/README.md) - Pièces d'inventaire
- [Engineering Part Revision API](../engineering-part-revision/README.md) - Révisions engineering
- [Part Printer Test 4](../../tools/part-printer/TEST4_RESULTS.md) - Résultats tests AttributesHandling

### Spécifications IFS

- **API Documentation** : https://docs.ifs.com/
- **Service Type** : Standard (API Class)
- **Terms of Service** : https://docs.ifs.com/policy/APIUsageCloud.pdf

---

## 🎯 Cas d'Usage : Part Printer

### Objectif

Récupérer les définitions des attributs techniques pour valider qu'ils existent dans IFS.

### Requête OData

```odata
GET /AttributesHandling.svc/TechnicalAttribStdSet
  ?$filter=Attribute in ('GENERIC CODE','LENGTH SETUP','VARNISH CODE')
  &$select=Attribute,AttribDesc,AttribType
```

### Exemple de Réponse

```json
{
  "@odata.context": "...",
  "value": [
    {
      "Attribute": "GENERIC CODE",
      "AttribDesc": "generic code",
      "AttribType": "Alphanumeric"
    },
    {
      "Attribute": "LENGTH SETUP",
      "AttribDesc": "length setup",
      "AttribType": "Numeric"
    },
    {
      "Attribute": "VARNISH CODE",
      "AttribDesc": "varnish code",
      "AttribType": "Alphanumeric"
    }
  ]
}
```

---

## 🚀 Prochaines Étapes

1. ✅ **Service découvert** - AttributesHandling.svc validé
2. ✅ **Attributs trouvés** - GENERIC CODE, LENGTH SETUP, VARNISH CODE
3. ⏳ **Trouver service de liaison** - PartNo → Valeurs attributs
4. ⏳ **Implémenter récupération valeurs** - Service complet Part Printer
5. ⏳ **Documenter architecture finale** - Workflow complet

---

**Version** : 1.0  
**Status** : ✅ **VALIDÉ** - 🎉 Découverte majeure!  
**Dernière mise à jour** : 14 octobre 2025  
**Maintenu par** : Équipe Manufacturing Portal

---

## 🎉 Impact sur Part Printer

### Avant Découverte

❌ **Bloqué** - Attributs GENERIC CODE, LENGTH SETUP, VARNISH CODE introuvables

### Après Découverte

✅ **50% Résolu** - Attributs trouvés dans AttributesHandling.svc  
⏳ **50% Restant** - Trouver comment lier aux pièces (PartNo → Valeurs)

### Nouvelle Priorité

🔴 **URGENT** : Trouver le service qui lie TechnicalAttribStd aux PartNo
