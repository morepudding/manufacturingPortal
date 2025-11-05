# 🔍 Investigation - Serial Number vs Customer Order

**Date:** 13 octobre 2025  
**Contexte:** Clarification de ce qui est récupéré actuellement vs ce qui devrait l'être  
**Status:** 🚧 Investigation en cours - Phase 1

---

## 🎯 Problème identifié

### Ce qui se passe actuellement

Lorsqu'on recherche le **Shop Order 97277** dans l'outil :
1. ✅ Le Shop Order est trouvé dans IFS
2. ✅ Le DOP Header ID `95` est extrait
3. ✅ La valeur `LG5MA0114` est récupérée depuis `Reference_DopHeadSerialReserv`
4. ❌ **Cette valeur est affichée comme "Serial Number"**

### Le problème

**`LG5MA0114` n'est PAS le numéro de série du bateau !**

C'est un **Serial Number de réservation pour une Part** (`LG5MA`), pas le numéro de série de la commande client ou du bateau.

---

## 📊 Données actuelles dans IFS

### Shop Order 97277

```
Shop Order No: 97277
DOP Header ID: 95 (ou "95 - 10088")
Part No: LG5MA
```

### Customer Order associée

Dans IFS, pour le Shop Order 97277 :
- **Customer Order No**: `C1000038587`
- **Part No**: `LG5MA`
- ❌ **Aucune mention de `LG5MA0114` dans les Customer Order Lines**

---

## 🔬 Analyse de ce qu'on récupère

### Endpoint actuel : `Reference_DopHeadSerialReserv`

**Service:** `DopHeaderHandling.svc/Reference_DopHeadSerialReserv`

**Requête:**
```
GET /DopHeaderHandling.svc/Reference_DopHeadSerialReserv?$filter=contains(DopId,'95')
```

**Réponse obtenue:**
```json
{
  "DopId": "95",
  "PartNo": "LG5MA",
  "SerialNo": "LG5MA0114",
  "ConditionCode": null,
  "SerialSourceDb": "SHOP ORDER",
  "SerialSource": "Shop Order"
}
```

### ⚠️ Clarification

- `SerialNo: "LG5MA0114"` = **Serial Number de la PART réservée** pour ce DOP
- Ce n'est **pas** le numéro de série du bateau
- Ce n'est **pas** lié directement à la Customer Order

---

## 🎯 Ce qu'on doit vraiment récupérer

### Objectif métier

Pour l'**impression du document MA_FO_CR_1419**, on a besoin de :

1. **Customer Order Number** : `C1000038587` ✅ (disponible dans Shop Order)
2. **Serial Number du bateau** : ❓ (À déterminer - où est-il stocké ?)
3. **Part Number** : `LG5MA` ✅ (disponible dans Shop Order)

---

## 🔍 Questions à investiguer (Phase 2)

### Question 1 : Où est le vrai Serial Number du bateau ?

**Options possibles:**
1. Dans `Customer Order Lines` → Champ spécifique ?
2. Dans un autre service IFS lié aux Customer Orders ?
3. Dans les attributs custom de la Customer Order ?
4. Lié au DOP mais dans un autre endpoint ?

### Question 2 : Que contient vraiment Customer Order Lines ?

Pour `C1000038587` / `LG5MA` :
- Quels champs sont disponibles ?
- Y a-t-il un champ `SerialNo`, `BoatSerialNo`, ou équivalent ?
- Y a-t-il des champs custom Bénéteau ?

### Question 3 : Relation Customer Order → Serial Number

**Workflow à valider:**
```
Shop Order (97277)
    ↓
Customer Order No (C1000038587)
    ↓
??? Quel endpoint / champ ???
    ↓
Serial Number du bateau
```

---

## 📋 Plan d'action

### Phase 1 : Analyse Customer Order ✅ ACTUELLE

- [x] Identifier le problème actuel
- [x] Documenter ce qu'on récupère vs ce qu'on devrait récupérer
- [x] Clarifier que `LG5MA0114` n'est pas le bon Serial Number

### Phase 2 : Investigation Customer Order Lines 🚧 À FAIRE

- [ ] Explorer l'endpoint `CustomerOrderHandling.svc`
- [ ] Récupérer les détails de la Customer Order `C1000038587`
- [ ] Identifier tous les champs disponibles
- [ ] Chercher où est stocké le Serial Number du bateau

### Phase 3 : Validation avec données réelles 🔜 PLANIFIÉ

- [ ] Tester avec plusieurs Shop Orders
- [ ] Valider la présence du Serial Number dans Customer Order
- [ ] Comparer avec les données attendues pour l'impression

---

## 🧪 Tests à effectuer

### Test 1 : Récupérer Customer Order Details

```bash
GET /CustomerOrderHandling.svc/CustomerOrderLines?
    $filter=OrderNo eq 'C1000038587' and LineNo eq '1'
```

**Attentes:**
- Vérifier si un champ `SerialNo` existe
- Vérifier les champs custom (`C*` fields)
- Identifier le champ qui contient le numéro du bateau

### Test 2 : Explorer les références Customer Order

```bash
GET /CustomerOrderHandling.svc/CustomerOrders(OrderNo='C1000038587')
```

**Attentes:**
- Voir tous les champs disponibles au niveau Order
- Identifier les relations vers d'autres entités

---

## 📝 Hypothèses de travail

### Hypothèse 1 : Serial Number dans Customer Order Line

Le numéro de série du bateau pourrait être stocké dans :
- `CustomerOrderLine.SerialNo`
- Un champ custom comme `CustomerOrderLine.CBoatSerialNo`
- Un champ lié aux attributs de la ligne

### Hypothèse 2 : Serial Number via une table de liaison

Il pourrait exister une table de liaison entre :
- Customer Order
- Serial Objects (Equipment)
- DOP Header

### Hypothèse 3 : Serial Number = Reference différente

Le "Serial Number" pour l'impression pourrait être :
- Le numéro de la Customer Order elle-même
- Un identifiant de configuration
- Un numéro de projet/contrat

---

## 🔗 Liens avec l'impression

### Document à imprimer : MA_FO_CR_1419

**Paramètres d'impression requis:**
- `ResultKey` : Clé du résultat
- `LayoutName` : "MA_FO_CR_1419.rdl"
- `LanguageCode` : Langue sélectionnée
- `LogicalPrinter` : Imprimante sélectionnée

**Questions:**
- Quel paramètre identifie le document à imprimer ?
- Est-ce le Customer Order No ? Le Serial Number ? Les deux ?

---

## 📚 Références

### Documentation IFS

- `ShopOrderHandling.svc` : ✅ Validé
- `DopHeaderHandling.svc` : ✅ Validé (mais mauvaise donnée)
- `CustomerOrderHandling.svc` : ❓ À explorer

### Champs Shop Order confirmés

```typescript
{
  OrderNo: "97277",
  DopId: "95 - 10088",
  PartNo: "LG5MA",
  CustomerOrderNo: "C1000038587",  // ✅ Disponible !
  CustomerLineNo: "1",              // ✅ Disponible !
  CustomerRelNo: "*",
  CustomerLineItemNo: "*"
}
```

---

## 🚨 Impact sur le code actuel

### Services à modifier

1. **`serial-number-service.ts`**
   - ❌ Actuellement : Récupère `SerialNo` depuis `Reference_DopHeadSerialReserv`
   - ✅ Devrait : Récupérer le vrai Serial Number depuis Customer Order

2. **`shop-order-service.ts`**
   - ✅ Déjà récupère `CustomerOrderNo` et `CustomerLineNo`
   - ➕ Ajouter : Récupération du Serial Number depuis Customer Order

3. **API Routes**
   - ✅ `/api/shop-orders/search` : OK pour Shop Order
   - ➕ Créer : Service pour récupérer Customer Order details

---

## ✅ Conclusion Phase 1

### Ce qu'on sait maintenant

1. ✅ `LG5MA0114` n'est **pas** le numéro de série du bateau
2. ✅ C'est un Serial Number de **réservation de Part**
3. ✅ Le Shop Order contient le `CustomerOrderNo` (`C1000038587`)
4. ❌ On ne récupère pas encore le vrai Serial Number

### Prochaines étapes

1. 🔍 Explorer `CustomerOrderHandling.svc` pour trouver le Serial Number
2. 🧪 Tester avec la Customer Order `C1000038587`
3. 📝 Documenter la structure des Customer Order Lines
4. 🔧 Modifier le code pour récupérer la bonne donnée

---

**À suivre → Phase 2 : Investigation Customer Order Lines**
