# 🔍 Investigation Serial Number - Phase 2 : Découvertes & Plan d'Action

**Date** : 13 octobre 2025  
**Objectif** : Clarifier la nature du Serial Number `LG5MA0114` et valider l'implémentation actuelle  
**Shop Order de référence** : 97277

---

## 📊 Résumé Exécutif

### ✅ Conclusion Principale

**L'implémentation actuelle est CORRECTE** pour récupérer le **Serial Number de la pièce** (Part Serial Number).

- `LG5MA0114` est bien le **numéro de série de la pièce** `LG5MA` fabriquée par le Shop Order 97277
- Ce Serial Number est nécessaire pour imprimer le document de configuration MA_FO_CR_1419
- Le document d'impression concerne **la pièce spécifique**, pas le bateau entier

### ⚠️ Point de Confusion Identifié

Le Customer Order `C1000038587` visible dans l'UI IFS n'est **pas accessible via l'API Shop Order** (retourne `null`).

---

## 🧪 Tests & Comparaisons

### Test 1 : Récupération Shop Order 97277 via API

**Endpoint** : `ShopOrderHandling.svc/ShopOrds`  
**Filter** : `contains(OrderNo,'97277')`

#### Résultat API vs IFS UI

| Champ | Valeur IFS UI | Valeur API | Match | Note |
|-------|---------------|------------|-------|------|
| **Order No** | 97277 | `"97277"` | ✅ | Exact |
| **Part No** | LG5MA0XD02 | `"LG5MA0XD02"` | ✅ | Part complet avec variante |
| **Part Description** | LG5MA - ENSEMBLES PREPARES | `"LG5MA - ENSEMBLES PREPARES POUR A2D02"` | ✅ | API plus détaillée |
| **Configuration ID** | 41139 | `"41139"` | ✅ | Exact |
| **DOP Order ID** | 95 - LAGOON 55 - 10088 | `"95 - 10088"` | ✅ | API sans le nom bateau |
| **Customer Order No** | C1000038587 (UI) | `null` | ❌ | **Pas dans l'API** |
| **Customer Line No** | 1 (UI) | `null` | ❌ | **Pas dans l'API** |
| **Site** | FR018 | `"FR018"` | ✅ | Exact |
| **Status** | Closed | `"Closed"` | ✅ | Exact |
| **Lot Size** | 1 | `"1"` (OrgQtyDue) | ✅ | Exact |

#### Champs Supplémentaires dans l'API

```json
{
  "PartNo": "LG5MA0XD02",
  "PartDescription": "LG5MA - ENSEMBLES PREPARES POUR A2D02",
  "ConfigurationId": "41139",
  "DopId": "95 - 10088",
  "CustomerOrderNo": null,        // ⚠️ Null malgré C1000038587 dans UI
  "CustomerLineNo": null,
  "CustomerRelNo": null,
  "CustomerLineItemNo": null,
  "SerialBegin": "*",
  "SerialEnd": "*",
  "NoteText": "LG5MA",
  "DemandCode": "DOPOrder",
  "ProcessType": "DOP",
  "ConfigurationState": "Completed"
}
```

**❌ Champ SerialNo absent** : Il n'y a PAS de `SerialNo` directement dans `ShopOrds`.

---

### Test 2 : Récupération Serial Number via DOP Header

**Endpoint** : `DopHeaderHandling.svc/Reference_DopHeadSerialReserv`  
**Filter** : `contains(DopId,'95')`

#### Résultat

```json
{
  "value": [
    {
      "luname": "SerialNoReservation",
      "keyref": "DOP_ID=95^PART_NO=LG5MA^SERIAL_NO=LG5MA0114^",
      "DopId": "95",
      "PartNo": "LG5MA",
      "SerialNo": "LG5MA0114",         // 🎯 TROUVÉ !
      "ConditionCode": null,
      "SerialSourceDb": "SHOP ORDER",
      "SerialSource": "Shop Order"
    }
  ]
}
```

#### Analyse

✅ **Le Serial Number `LG5MA0114` existe bien dans IFS**  
✅ **Il est lié au DOP 95 et au Part `LG5MA`**  
✅ **La source est "Shop Order"** (pas Customer Order)  
✅ **C'est une réservation de série pour la pièce fabriquée**

---

## 🧩 Compréhension du Workflow IFS

### Hiérarchie des Données

```
Customer Order C1000038587
  └─> Line 1 : Part LG5MA (Qty: 1)
       └─> DOP Header 95 (LAGOON 55 - 10088)
            └─> Shop Order 97277
                 ├─> Fabrique : LG5MA0XD02 (Part avec variante)
                 └─> Serial Number réservé : LG5MA0114
```

### Nature du Serial Number `LG5MA0114`

**Type** : Part Serial Number (Numéro de série de pièce)  
**Usage** : Traçabilité de la pièce `LG5MA` dans la production  
**Lien** : Réservé pour le Shop Order 97277 via DOP 95

**Ce n'est PAS** :
- ❌ Le numéro de série du bateau (Hull Number)
- ❌ Le Serial Number du Customer Order
- ❌ Un identifiant configuré manuellement

**C'est** :
- ✅ Le Serial Number de la pièce `LG5MA`
- ✅ Généré/réservé par IFS pour traçabilité
- ✅ Nécessaire pour l'impression du document de configuration

---

## 🔍 Mystère du Customer Order

### Observation

Dans l'IFS UI, le Shop Order 97277 affiche :
- **Customer Order** : `C1000038587`
- **Line No** : `1`
- **Del No** : `1`
- **Line Item No** : `0`

Mais l'API retourne :
```json
{
  "CustomerOrderNo": null,
  "CustomerLineNo": null,
  "CustomerRelNo": null,
  "CustomerLineItemNo": null
}
```

### Hypothèses

1. **Relation indirecte via DOP**
   - Le Customer Order est lié au DOP Header
   - Le Shop Order n'a pas de lien direct dans la DB
   - L'UI fait une jointure que l'API OData n'expose pas

2. **Droits d'accès API**
   - Les champs Customer Order nécessitent peut-être des droits spécifiques
   - L'authentification OAuth2 actuelle n'a pas accès à ces champs

3. **Endpoint spécialisé nécessaire**
   - Il existe peut-être un endpoint dédié pour obtenir ces liens
   - Ex: `ShopOrderCustomerOrders`, `ShopOrderDemand`, etc.

---

## 🎯 Plan d'Action Validé

### ✅ Phase 1 : Shop Order → Serial Number (IMPLÉMENTATION CORRECTE)

**Workflow actuel** :
```typescript
1. Recherche Shop Order 97277
   ├─> Extraction DOP ID : "95 - 10088" → "95"
   └─> Appel Reference_DopHeadSerialReserv($filter=contains(DopId,'95'))

2. Récupération Serial Number
   └─> SerialNo : "LG5MA0114"
```

**✅ À CONSERVER** : Ce workflow est correct pour le besoin d'impression

---

### 🔄 Phase 2 : Investigation Customer Order (OPTIONNEL)

**Objectif** : Comprendre pourquoi `CustomerOrderNo` est `null` dans l'API

#### Action 1 : Tester endpoint DOP Header complet

```bash
GET DopHeaderHandling.svc/DopHeaders
$filter: DopId eq '95'
$expand: CustomerOrders  # Si disponible
```

**Objectif** : Vérifier si le Customer Order est accessible via le DOP

#### Action 2 : Explorer CustomerOrderHandling

```bash
GET CustomerOrderHandling.svc/CustomerOrderLines
$filter: OrderNo eq 'C1000038587' and LineNo eq '1'
```

**Objectif** : Vérifier les détails du Customer Order Line et voir s'il référence le Shop Order

#### Action 3 : Rechercher relations Shop Order ↔ Customer Order

```bash
# Chercher dans la documentation OData IFS
- ShopOrderDemand
- ShopOrderPegging
- ShopOrderCustomerOrder
```

---

### 📋 Phase 3 : Documentation (PRIORITÉ HAUTE)

#### À Mettre à Jour

1. **`PHASE1_COMPLETE.md`**
   - ✅ Clarifier que `LG5MA0114` est le Part Serial Number
   - ✅ Ajouter la distinction Part Serial vs Customer Serial
   - ✅ Expliquer que ce Serial est correct pour l'impression

2. **`SPECIFICATION_FONCTIONNELLE.md`**
   - ✅ Mettre à jour le workflow avec la terminologie correcte
   - ✅ Préciser "Part Serial Number" au lieu de "Serial Number" générique

3. **Création `GLOSSAIRE_SERIAL_NUMBERS.md`**
   - Part Serial Number
   - Customer Order Serial Number
   - Equipment Serial Number
   - Hull Number / Boat Serial Number

#### Nouveau Document : Glossaire

```markdown
# Glossaire des Serial Numbers dans IFS

## Part Serial Number
- Numéro de série d'une **pièce fabriquée**
- Exemple : `LG5MA0114` pour la pièce `LG5MA`
- Source : `Reference_DopHeadSerialReserv`
- Usage : Traçabilité production, impression documents config

## Customer Order Serial Number
- Numéro de série associé à la **commande client**
- Exemple : À déterminer
- Source : `CustomerOrderLines` (?)
- Usage : Suivi commande client

## Equipment Serial Number
- Numéro de série d'un **équipement installé**
- Exemple : Moteur, GPS, etc.
- Source : `EquipmentSerial`
- Usage : Maintenance, garantie

## Hull Number / Boat Serial Number
- Numéro de série du **bateau complet**
- Exemple : `LG5MA0XD02` ou identifiant bateau
- Source : Customer Order ou configuration bateau
- Usage : Identification unique du bateau
```

---

## 🧪 Tests de Validation Supplémentaires

### Test 1 : Vérifier cohérence Part vs Serial

| Shop Order | Part No | DOP ID | Serial Number Attendu | Pattern |
|------------|---------|--------|-----------------------|---------|
| 97277 | LG5MA0XD02 | 95 - 10088 | LG5MA0114 | ✅ LG5MA + numéro |
| 563 | ? | 34 - 1014 | JY6MB0019 | ? |
| 949 | ? | 48 - 10102 | LX6MA0116 | ? |
| 1043 | ? | 54 - 1035 | LX6MA0115 | ? |

**À FAIRE** : Récupérer les Part Numbers pour les autres Shop Orders et valider le pattern

---

### Test 2 : Vérifier existence du Serial dans IFS UI

**Shop Order 97277** :
- ✅ Serial `LG5MA0114` visible dans UI ? → **À VÉRIFIER**
- ✅ Où apparaît-il dans l'UI ?
  - Tab "Material Actions" ?
  - Tab "Produced Parts" ?
  - Dans les réservations de série ?

---

## 📊 Conclusion & Recommandations

### ✅ Validation Implémentation Actuelle

**L'implémentation est CORRECTE** pour le besoin fonctionnel :
- Le Serial Number `LG5MA0114` est le bon identifiant de la pièce
- Le document MA_FO_CR_1419 doit s'imprimer pour cette pièce spécifique
- Le workflow Shop Order → DOP → Serial Number fonctionne

### 🔄 Actions Recommandées

#### Priorité HAUTE
1. **Clarifier la terminologie** dans toute la documentation
   - Remplacer "Serial Number" par "Part Serial Number"
   - Ajouter un glossaire des différents types de Serial Numbers

2. **Valider avec les utilisateurs**
   - Confirmer que `LG5MA0114` est bien le numéro attendu sur le document imprimé
   - Vérifier un document imprimé réel pour valider

#### Priorité MOYENNE
3. **Investigation Customer Order** (si besoin fonctionnel)
   - Déterminer si le Customer Order est nécessaire dans le workflow
   - Identifier l'endpoint correct pour récupérer cette information

#### Priorité BASSE
4. **Enrichissement des données**
   - Ajouter des métadonnées (Part Description, DOP Name, etc.)
   - Améliorer les logs pour faciliter le débogage

---

## 🔗 Références

- **Shop Order API** : `ShopOrderHandling.svc/ShopOrds`
- **DOP Serial API** : `DopHeaderHandling.svc/Reference_DopHeadSerialReserv`
- **Customer Order API** : `CustomerOrderHandling.svc/CustomerOrderLines` (à explorer)
- **Document précédent** : `INVESTIGATION_SERIAL_NUMBER_VS_CUSTOMER_ORDER.md`

---

## 📝 Notes & Découvertes

### Différence Part No dans Shop Order

**Observation** :
- Shop Order fabrique : `LG5MA0XD02` (Part avec variante)
- Serial Number réservé : `LG5MA0114` (référence Part base `LG5MA`)

**Explication** :
- `LG5MA` = Part de base (famille de pièces)
- `LG5MA0XD02` = Variante spécifique configurée
- `LG5MA0114` = Serial Number de cette instance de la pièce

**Pattern** :
```
Part Base + Configuration → Part Variant
Part Base + Numéro Séquentiel → Serial Number
```

### Champs Shop Order Intéressants

```json
{
  "NoteText": "LG5MA",                    // Note textuelle simple
  "DemandCode": "DOPOrder",               // Vient d'un DOP
  "ProcessType": "DOP",                   // Processus DOP
  "ConfigurationId": "41139",             // ID de configuration
  "ConfigurationState": "Completed",      // Configuration terminée
  "SerialBegin": "*",                     // Pas de range serial
  "SerialEnd": "*",                       // Pas de range serial
  "SerialRule": "MANUAL"                  // Gestion manuelle des serials
}
```

---

## 🚀 Prochaines Étapes

1. ✅ **Créer ce document** → FAIT
2. ⏳ **Valider avec l'utilisateur** : Le Serial Number `LG5MA0114` est-il visible dans l'UI IFS ?
3. ⏳ **Tester les autres Shop Orders** (563, 949, 1043) pour valider le pattern
4. ⏳ **Mettre à jour la documentation** avec la terminologie correcte
5. ⏳ **Décider si investigation Customer Order est nécessaire**

---

**Status** : ✅ Phase 2 Investigation Complète  
**Prochaine Phase** : Validation utilisateur + Mise à jour documentation
