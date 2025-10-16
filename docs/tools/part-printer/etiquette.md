# 🏷️ Validation des Étiquettes Part Printer - Shop Order 463215

## 📋 Shop Order de Référence

**Shop Order** : `463215`

Ce document détaille les valeurs attendues pour chaque champ de l'étiquette et le processus pour les obtenir. Nous allons valider chaque valeur une par une.

---

## ✅ Valeurs Attendues (Référence)

| Champ | Valeur Attendue | Status |
|-------|-----------------|--------|
| **Shop Order (complet)** | `463215-*-*` | ✅ VALIDÉ |
| **Raw Material** | `C2117J` | ✅ VALIDÉ |
| **Operation ID (OpId)** | `3218730` | ✅ VALIDÉ (valeur temporaire AST - à remplacer par Block ID en PROD) |
| **Generic Part No + Revision** | `C000001026112G110-A` | ✅ VALIDÉ |
| **Generic Code** | `C000001026112` | ✅ VALIDÉ (calculé automatiquement) |
| **Length Setup** | `0.499999` | ✅ VALIDÉ |
| **Varnish Code** | `RCTL0000` | ✅ VALIDÉ |
| **Code-barres** | Image visuelle uniquement | ✅ VALIDÉ (texte alphanumérique supprimé) |

---

## 🔍 Processus de Récupération des Données

### 0️⃣ Shop Order (Format Complet)

**Définition** : Shop Order au format `OrderNo-ReleaseNo-SequenceNo`

**Processus** :
1. Récupérer le Shop Order depuis IFS
2. Extraire les champs `OrderNo`, `ReleaseNo`, `SequenceNo`
3. Concaténer avec des tirets : `{OrderNo}-{ReleaseNo}-{SequenceNo}`

**Exemple pour Shop Order 463215** :

**Champs IFS** :
```json
{
  "OrderNo": "463215",
  "ReleaseNo": "*",
  "SequenceNo": "*"
}
```

**Format affiché** : `463215-*-*`

**✅ Valeur attendue** : `463215-*-*`

---

### 1️⃣ Raw Material

**Définition** : Material line lié à l'opération ayant l'Operation No le plus faible (généralement Operation No = 10)

**Processus** :
1. Récupérer le Shop Order `463215`
2. Chercher l'onglet **Material** (tableau)
3. Prendre la **première ligne** du tableau (opération commençant à 10)
4. Sur cette ligne d'opération, récupérer la **Component Part**
5. Extraire le **code** de la Component Part

**Exemple pour Shop Order 463215** :
- Première opération Material : `10 - CL`
- Component Part : `C2117J - GENERIQUE CADRE DE PORTE 5624 - Lg 1950 mm - hêtre`
- **Raw Material extrait** : `C2117J`

**Champ IFS** :
```json
{
  "PartNo": "C2117J"
}
```

**✅ Valeur attendue** : `C2117J`

---

### 2️⃣ Operation ID (OpId) ✅

**⚠️ IMPORTANT : Valeur TEMPORAIRE pour l'environnement AST (Dev)**

**Définition** : L'Operation 10 - CL est liée à une **Operation Block ID**. Dans l'environnement de dev (AST), le Block ID n'est pas disponible, on doit utiliser temporairement l'**Operation ID (OpId)**.

**⚠️ À FAIRE** : En production, remplacer OpId par le vrai **OP 10 Block ID** quand il sera disponible.

**Processus (temporaire)** :
1. Récupérer l'opération avec `OpSequenceNo = 10`
2. Extraire le champ `OpId` (temporaire)

**Exemple pour Shop Order 463215** :

**Champs IFS** :
```json
{
  "OrderNo": "463215",
  "OperationDescription": "CL",
  "OpSequenceNo": "10",
  "OpId": "3218730"
}
```

**⚠️ Valeur temporaire (AST/Dev)** : `3218730` (OpId)  
**✅ Valeur finale (PROD)** : `OP 10 Block ID` (quand disponible)

**✅ STATUS : VALIDÉ** - La valeur `3218730` s'affiche correctement dans les étiquettes. Le système fait automatiquement un fallback vers OpId quand Block ID est vide (AST). En PROD, il utilisera directement Block ID quand disponible.

---

### 3️⃣ Generic Part No + Revision ✅

**Définition** : Numéro de pièce générique avec sa révision (format: `{PartNo}-{PartRev}`)

**Processus** :
1. Récupérer le Generic Part No (PartNo complet avec suffixe G### si applicable)
2. Appeler l'endpoint `EngineeringPartRevisionsHandling.svc/EngPartRevisionSet`
3. Filtrer par `PartNo = {GenericPartNo}`
4. Extraire le champ `PartRev`
5. Concaténer : `{PartNo}-{PartRev}`

**Exemple pour Shop Order 463215** :

**Generic Part No obtenu** : `C000001026112G110`

**Appel API IFS** :
```
GET EngineeringPartRevisionsHandling.svc/EngPartRevisionSet?$filter=PartNo eq 'C000001026112G110'&$select=PartNo,PartRev,Description&$orderby=PartRev desc&$top=1
```

**Réponse IFS** :
```json
{
  "PartNo": "C000001026112G110",
  "PartRev": "A",
  "Description": "TRAVERSE"
}
```

**✅ Valeur attendue** : `C000001026112G110-A`

**✅ STATUS : VALIDÉ** - Le système récupère correctement le Part No complet avec le suffixe G### et la révision depuis `EngPartRevisionSet`. Le format affiché est correct.

---

### 4️⃣ Generic Code ✅

**Définition** : Code générique de la pièce (extrait du Part No, sans le suffixe G###)

**Exemple pour Shop Order 463215** :

**Part No complet** : `C000001026112G110`
**Generic Code** : `C000001026112` (calculé automatiquement en enlevant G110)

**✅ Valeur attendue** : `C000001026112`

**✅ STATUS : VALIDÉ** - Le Generic Code est calculé automatiquement à partir du Part No en supprimant le suffixe G###.

---

### 5️⃣ Length Setup ✅

**Définition** : Longueur de configuration de la pièce (attribut technique)

**Exemple pour Shop Order 463215** :

**✅ Valeur attendue** : `0.499999` 

**✅ STATUS : VALIDÉ** - La valeur est correctement récupérée depuis IFS via `TechnicalSpecBothArray` avec le filtre `Attribute eq 'LENGTH SETUP'`.

---

### 6️⃣ Varnish Code ✅

**Définition** : Code du vernis appliqué à la pièce (attribut technique)

**Exemple pour Shop Order 463215** :

**✅ Valeur attendue** : `RCTL0000`

**✅ STATUS : VALIDÉ** - La valeur est correctement récupérée depuis IFS via `TechnicalSpecBothArray` avec le filtre `Attribute eq 'VARNISH CODE'`.

---

### 7️⃣ Code-barres ✅

**Définition** : Code-barres visuel généré à partir de `{GenericCode}_{Revision}`

**Format** : Image de code-barres uniquement (pas de texte alphanumérique)

**Exemple pour Shop Order 463215** :

**Données** : `C000001026112G110_A`
**Affichage** : Code-barres visuel uniquement (barres verticales)

**✅ STATUS : VALIDÉ** - Le code-barres est généré et affiché correctement dans la colonne "Barre-code" du tableau. Les textes alphanumériques (`C000001026112G110_A` et `*C000001026112G110_A*`) ont été supprimés, seul le code-barres visuel est affiché.

---

## 🎯 Plan de Validation

Nous allons valider chaque champ **un par un** en lançant des impressions d'étiquettes pour le Shop Order `463215`.

### Ordre de validation :

1. ✅ **Shop Order (complet)** (`463215-*-*`) - VALIDÉ
2. ✅ **Raw Material** (`C2117J`) - VALIDÉ
3. ✅ **Operation ID** (`3218730`) - VALIDÉ (valeur temporaire AST, système prêt pour Block ID en PROD)
4. ✅ **Generic Part No + Revision** (`C000001026112G110-A`) - VALIDÉ
5. ✅ **Generic Code** (`C000001026112`) - VALIDÉ (calculé automatiquement)
6. ✅ **Length Setup** (`0.499999`) - VALIDÉ
7. ✅ **Varnish Code** (`RCTL0000`) - VALIDÉ
8. ✅ **Code-barres** - VALIDÉ (image visuelle uniquement, texte supprimé)

---

## 🎉 VALIDATION COMPLÈTE

**Toutes les valeurs des étiquettes Part Printer sont maintenant validées et correctes !**

### Résumé des corrections apportées :

1. **Shop Order** : Format complet `OrderNo-ReleaseNo-SequenceNo` ✅
2. **Raw Material** : Récupération via MaterialArray (Operation 10) ✅
3. **Operation ID** : Fallback OpId en AST (en attente Block ID PROD) ✅
4. **Generic Part No + Revision** : Part No complet avec G### + Révision depuis EngPartRevisionSet ✅
5. **Generic Code** : Calculé automatiquement (Part No sans G###) ✅
6. **Length Setup** : Récupéré via TechnicalSpecBothArray ✅
7. **Varnish Code** : Récupéré via TechnicalSpecBothArray ✅
8. **Code-barres** : Affichage visuel uniquement (textes alphanumériques supprimés) ✅

### Shop Order de référence : 463215

Toutes les valeurs correspondent parfaitement aux valeurs attendues. Le système est prêt pour la production !

---

## 📝 Notes de Référence

### API Endpoint - Engineering Part Revisions

```
GET https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1/EngineeringPartRevisionsHandling.svc/EngPartRevisionSet(PartNo='C000001026112G110',PartRev='A')
```

**Réponse complète** :
```json
{
  "@odata.context": "https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1/EngineeringPartRevisionsHandling.svc/$metadata#EngPartRevisionSet",
  "value": [
    {
      "@odata.etag": "W/\"Vy8iQUFBU1RjQUNyQUFPTVhLQUFEOjIwMjQxMjExMDg0NjIwIg==\"",
      "@odata.type": "#IfsApp.EngineeringPartRevisionsHandling.EngPartRevision",
      "@odata.id": "https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1/EngineeringPartRevisionsHandling.svc/EngPartRevisionSet(PartNo='C000001026112G110',PartRev='A')",
      "PartNo": "C000001026112G110",
      "PartRev": "A",
      "RevNo": "0",
      "StdName": "*",
      "Description": "TRAVERSE",
      "Objstate": "Preliminary"
    }
  ]
}
```

---

## 🚀 Prochaines Étapes

### ✅ Phase de validation terminée

Toutes les données des étiquettes sont maintenant validées et correctes. Le système Part Printer peut passer à la phase suivante :

1. **Tests d'impression réels** : Valider l'impression physique sur imprimante
2. **Tests avec d'autres Shop Orders** : Valider avec plusieurs références différentes
3. **Optimisations de performance** : Si nécessaire, optimiser les appels API
4. **Interface utilisateur complète** : Finaliser l'UI de sélection des filtres
5. **Déploiement en PROD** : Migration vers l'environnement de production avec Block ID réel

---

## ⚠️ Notes Importantes - Environnement AST (Dev) vs PROD

### Operation Block ID - Limitation AST

Le champ **OP 10 Block ID** affiché dans les étiquettes utilise actuellement une **valeur temporaire** en environnement AST (Dev) :

- **AST (Dev)** : Utilise `OperationBlockId` de l'API (souvent vide/null)
- **PROD** : Devra utiliser le vrai **OP 10 Block ID** quand disponible

**Code marqué avec** :
```typescript
// ⚠️ TEMPORAIRE (AST/Dev)
// TODO PRODUCTION : Remplacer par le vrai OP 10 Block ID
```

**Fichiers concernés** :
- `src/tools/part-printer/services/operation-service.ts`
- `src/tools/part-printer/types/index.ts`
- `src/tools/part-printer/services/label-pdf-service-table.ts`

**Action requise en PROD** :
1. Vérifier que l'API IFS PROD retourne bien l'OP 10 Block ID
2. Si nécessaire, adapter la logique de récupération
3. Retirer les commentaires `// ⚠️ TEMPORAIRE`


