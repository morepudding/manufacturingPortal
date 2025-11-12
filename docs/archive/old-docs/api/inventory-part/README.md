# 📦 Inventory Part API - InventoryPartHandling

**Service IFS** : `InventoryPartHandling.svc`  
**Version OData** : 4.01  
**Types disponibles** : 288  
**Status** : ✅ VALIDÉ (Test 1)

---

## 📋 Vue d'ensemble

L'API **InventoryPartHandling** fournit l'accès aux données des pièces d'inventaire (Inventory Parts) dans IFS Cloud. Ce service est utilisé pour récupérer les attributs des pièces nécessaires à l'impression des étiquettes dans **Part Printer**.

### Utilisé par

- 🏷️ **Part Printer** : Récupération des attributs GENERIC CODE, LENGTH SETUP, VARNISH CODE

---

## 🔑 Endpoint Principal : `InventoryPartSet`

### Description

`InventoryPartSet` permet de récupérer les informations complètes sur les pièces d'inventaire, incluant leurs attributs personnalisés.

### URL

```
GET /InventoryPartHandling.svc/InventoryPartSet
```

### Paramètres OData

| Paramètre | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `$filter` | string | Filtrage par propriétés | `PartNo eq 'LG5MA0XD02'` |
| `$select` | string | Sélection de champs | `PartNo,Description,UnitMeas` |
| `$expand` | string | Expansion des relations | `ManufPartAttributeRef` |
| `$top` | integer | Limite de résultats | `10` |
| `$skip` | integer | Pagination | `20` |

---

## 📊 Structure des Données

### Entity : `InventoryPart`

#### Clés primaires
- `Contract` (string, 5 chars) - Site/Contract
- `PartNo` (string, 25 chars) - Numéro de pièce

#### Champs principaux

| Champ | Type | Description |
|-------|------|-------------|
| `PartNo` | string | Numéro de pièce |
| `Contract` | string | Site/Contract |
| `Description` | string | Description de la pièce |
| `UnitMeas` | string | Unité de mesure |
| `TypeCode` | string | Type de pièce |
| `PartStatus` | string | Statut (Active, Obsolete, etc.) |
| `EngAttribute` | string | Attribut engineering |

#### Relations importantes

| Relation | Type | Description |
|----------|------|-------------|
| `ManufPartAttributeRef` | Expand | **Attributs de fabrication** (⭐ GENERIC CODE, LENGTH SETUP, VARNISH CODE) |
| `PartCatalogRef` | Expand | Catalogue de pièces |
| `InventoryPartCharRef` | Expand | Caractéristiques de la pièce |

---

## 🎯 Cas d'Usage : Part Printer

### Objectif

Récupérer les **3 attributs critiques** pour l'impression d'étiquettes :
1. **GENERIC CODE** (Generic Part Number)
2. **LENGTH SETUP** (Longueur de configuration)
3. **VARNISH CODE** (Code de vernis)

### Requête OData Recommandée

```odata
GET /InventoryPartHandling.svc/InventoryPartSet
  ?$filter=Contract eq 'BDR' and PartNo eq 'LG5MA0XD02'
  &$expand=ManufPartAttributeRef
  &$select=PartNo,Contract,Description,UnitMeas,EngAttribute
```

### Exemple de Réponse

```json
{
  "@odata.context": "...",
  "value": [
    {
      "PartNo": "LG5MA0XD02",
      "Contract": "BDR",
      "Description": "Wooden Panel Oak",
      "UnitMeas": "mm",
      "EngAttribute": "A",
      "ManufPartAttributeRef": [
        {
          "AttributeCode": "GENERIC_CODE",
          "AttributeValue": "GEN_OAK_001",
          "AttributeDescription": "Generic Code"
        },
        {
          "AttributeCode": "LENGTH_SETUP",
          "AttributeValue": "2850",
          "AttributeDescription": "Length Setup"
        },
        {
          "AttributeCode": "VARNISH_CODE",
          "AttributeValue": "VARN_A",
          "AttributeDescription": "Varnish Code"
        }
      ]
    }
  ]
}
```

---

## 💻 Utilisation TypeScript

### Interface TypeScript

```typescript
interface IFSInventoryPart {
  PartNo: string
  Contract: string
  Description: string
  UnitMeas: string
  EngAttribute?: string
  ManufPartAttributeRef?: IFSManufPartAttribute[]
}

interface IFSManufPartAttribute {
  AttributeCode: string
  AttributeValue: string
  AttributeDescription?: string
}
```

### Service Example

```typescript
import { getIFSClient } from '@/shared/services/ifs-client'

export class InventoryPartService {
  /**
   * Récupère une pièce avec ses attributs
   */
  async getPartWithAttributes(
    contract: string, 
    partNo: string
  ): Promise<IFSInventoryPart | null> {
    const client = getIFSClient()
    
    const response = await client.get<IFSODataResponse<IFSInventoryPart>>(
      'InventoryPartHandling.svc/InventoryPartSet',
      {
        $filter: `Contract eq '${contract}' and PartNo eq '${partNo}'`,
        $expand: 'ManufPartAttributeRef',
        $select: 'PartNo,Contract,Description,UnitMeas,EngAttribute'
      }
    )
    
    return response.value[0] || null
  }
  
  /**
   * Extrait les attributs spécifiques (GENERIC CODE, LENGTH SETUP, VARNISH CODE)
   */
  extractPartAttributes(part: IFSInventoryPart) {
    const attributes = part.ManufPartAttributeRef || []
    
    return {
      genericCode: attributes.find(a => a.AttributeCode === 'GENERIC_CODE')?.AttributeValue || '',
      lengthSetup: attributes.find(a => a.AttributeCode === 'LENGTH_SETUP')?.AttributeValue || '',
      varnishCode: attributes.find(a => a.AttributeCode === 'VARNISH_CODE')?.AttributeValue || ''
    }
  }
}
```

---

## 🧪 Tests & Validation

### Test 1 : Métadonnées ✅

```bash
npx tsx scripts/test-ifs-endpoints-metadata.ts
```

**Résultat** :
- ✅ Service existe : `InventoryPartHandling.svc`
- ✅ OData version : 4.01
- ✅ Types disponibles : 288

### Test 2 : Données Réelles ⏳

```bash
# À implémenter
npx tsx scripts/test-ifs-endpoints-real-data.ts --service=inventory-part
```

**Test prévu** :
1. Récupérer une pièce par PartNo (ex: `LG5MA0XD02`)
2. Vérifier la présence des attributs de fabrication
3. Valider les codes GENERIC_CODE, LENGTH_SETUP, VARNISH_CODE

---

## 🔍 Endpoints Alternatifs

### `Reference_ManufPartAttribute`

Accès direct aux attributs de fabrication :

```
GET /InventoryPartHandling.svc/Reference_ManufPartAttribute
  ?$filter=PartNo eq 'LG5MA0XD02'
```

### `InventoryPartCharRef`

Accès aux caractéristiques techniques :

```
GET /InventoryPartHandling.svc/InventoryPartSet('...')/InventoryPartCharRef
```

---

## ⚠️ Points d'Attention

### 1. Nom des Attributs

Les codes d'attributs peuvent varier selon la configuration IFS :
- `GENERIC_CODE` vs `GENERIC CODE` (avec/sans underscore)
- Vérifier les codes exacts dans l'environnement IFS

### 2. Expansion des Relations

L'expansion `$expand=ManufPartAttributeRef` **peut** ne pas fonctionner si :
- Les attributs ne sont pas configurés
- Les permissions sont insuffisantes
- La relation n'est pas exposée via OData

**Solution de repli** : Utiliser `Reference_ManufPartAttribute` directement.

### 3. Filtrage Multi-Site

Si plusieurs sites, toujours filtrer par `Contract` :

```odata
$filter=Contract eq 'BDR' and PartNo eq 'LG5MA0XD02'
```

---

## 📚 Documentation Complémentaire

### Liens Internes

- [Shop Order API](../shop-order/README.md) - Récupération des Shop Orders
- [Site API](../site/README.md) - Liste des sites
- [Engineering Part Revision API](../engineering-part-revision/README.md) - Révisions engineering

### Spécifications IFS

- **APIDOC** : [APIDOC.md](./APIDOC.md) - Documentation complète de l'API
- **ODATA** : [ODATA.MD](./ODATA.MD) - Métadonnées OData brutes

---

## 🚀 Prochaines Étapes

1. ✅ **Test 1 réussi** - Service validé (288 types)
2. ⏳ **Test 2 en attente** - Tester avec données réelles
3. ⏳ **Implémenter service** - Créer `master-part-service.ts` basé sur InventoryPartHandling
4. ⏳ **Valider attributs** - Confirmer GENERIC_CODE, LENGTH_SETUP, VARNISH_CODE existent

---

**Version** : 1.0  
**Status** : ✅ VALIDÉ (Test 1 réussi)  
**Dernière mise à jour** : 14 octobre 2025  
**Maintenu par** : Équipe Manufacturing Portal
