# 🔍 Résultats des Tests - Azure Print API

**Date** : 30 octobre 2025  
**Environnement** : DEV (AST)  
**Status** : ⚠️ API accessible mais retourne HTTP 500

---

## ✅ Ce qui fonctionne

### 1. Authentification OAuth2

```bash
✅ Token obtenu avec succès
✅ Expire après 3599 secondes (1h)
✅ Format Bearer standard
```

### 2. Connexion à l'API

```bash
✅ API répond (pas de timeout réseau)
✅ Headers acceptés (Authorization + Ocp-Apim-Subscription-Key)
✅ Content-Type: application/json accepté
```

### 3. Format du Payload découvert

Le créateur a fourni le **format correct** :

```json
{
  "Printer": "PRTBX109 - MAFOPR183",
  "PrintModel": "BEN_MA_FO_CR_184.rdl",
  "Selection": "ORDER_NO=2259^RELEASE_NO=*^SEQUENCE_NO=*^;ORDER_NO=2525^RELEASE_NO=*^SEQUENCE_NO=*^;"
}
```

**Points clés** :
- ✅ Utilise un **layout IFS** (`BEN_MA_FO_CR_184.rdl`), pas un PDF custom
- ✅ Format `Selection` : `ORDER_NO=XXX^RELEASE_NO=Y^SEQUENCE_NO=Z^;`
- ✅ Séparateurs : `;` entre Shop Orders, `^` entre champs
- ✅ Wildcard `*` supporté pour RELEASE_NO et SEQUENCE_NO

---

## ❌ Ce qui ne fonctionne pas encore

### HTTP 500 Internal Server Error

```bash
📊 Response Status: 500 Internal Server Error
📄 Response Body: (vide)
```

**Causes possibles** :

1. **Shop Orders invalides**
   - Les Shop Orders testés (2259, 2525, 1689, 563, 949, 1043) n'existent peut-être pas en DEV
   - Besoin de Shop Orders valides pour le site BDR

2. **Layout introuvable**
   - Le layout `BEN_MA_FO_CR_184.rdl` n'est peut-être pas déployé en DEV
   - Besoin de vérifier les layouts disponibles dans IFS DEV

3. **Imprimante non configurée**
   - `PRTBX105_P` n'est peut-être pas configurée pour ce type d'impression
   - Besoin de la liste des imprimantes compatibles

4. **Format Selection incorrect**
   - Peut-être que les valeurs RELEASE_NO et SEQUENCE_NO doivent être exactes (pas `*`)
   - Besoin d'exemples de Shop Orders avec leurs valeurs correctes

---

## 🧪 Tests effectués

### Test 1 : OAuth2
```bash
✅ SUCCESS
Token: eyJ0eXAiOiJKV1QiLCJhbGc...
Expires: 3599s
```

### Test 2 : API avec format initial (incorrect)
```bash
❌ TIMEOUT 30s
Payload: { printerName, documentBase64, ... }
```

### Test 3 : API avec format correct
```bash
❌ HTTP 500
Payload: { Printer, PrintModel, Selection }
Shop Orders: 2259, 2525
```

### Test 4 : Shop Orders de Boat Configuration
```bash
❌ HTTP 500
Payload: { Printer, PrintModel, Selection }
Shop Orders: 563, 949, 1043
```

---

## 📋 Actions nécessaires

### 1. Obtenir des Shop Orders valides

**Besoin** : Shop Orders qui existent réellement en DEV pour le site BDR

**Options** :
- Demander au créateur de l'API des exemples de Shop Orders valides
- Interroger IFS directement : `GET /ShopOrderHandling.svc/ShopOrds?$filter=Contract eq 'BDR'&$top=10`
- Utiliser l'interface IFS pour trouver des Shop Orders actifs

### 2. Vérifier le layout IFS

**Besoin** : Confirmer que `BEN_MA_FO_CR_184.rdl` existe en DEV

**Actions** :
- Vérifier dans IFS : Navigation → Crystal Reports → Layouts
- Ou demander la liste des layouts disponibles pour le report MA_FO_CR_184
- Alternative : tester avec un autre layout connu

### 3. Vérifier l'imprimante

**Besoin** : Confirmer que `PRTBX105_P` est configurée

**Actions** :
- Vérifier via `/api/shared/printers` (liste des imprimantes)
- Tester avec une autre imprimante de la liste
- Vérifier les permissions d'impression

### 4. Clarifier le format Selection

**Questions pour le créateur** :
- Les valeurs `*` sont-elles supportées pour RELEASE_NO et SEQUENCE_NO ?
- Faut-il des valeurs exactes ? (ex: `RELEASE_NO=1^SEQUENCE_NO=10^`)
- Y a-t-il un nombre maximum de Shop Orders par requête ?
- Le format est-il sensible à la casse ?

---

## 💡 Prochaines étapes

### Option A : Déboguer l'erreur 500

1. Demander au créateur de l'API :
   - Des Shop Orders valides pour un test
   - Des logs côté serveur pour voir l'erreur exacte
   - La liste des layouts disponibles

2. Tester avec des données 100% valides

### Option B : Utiliser IFS PrintDialog directement

Si l'API Azure ne fonctionne pas, alternative :

```typescript
// Utiliser l'API IFS native
POST /ShopOrderHandling.svc/ShopOrders(OrderNo='563',ReleaseNo='1',SequenceNo='10')/PrintResultKey
{
  "ReportId": "MA_FO_CR_184",
  "LayoutName": "BEN_MA_FO_CR_184.rdl",
  "PrinterId": "PRTBX105_P"
}
```

**Avantages** :
- API IFS native et documentée
- Erreurs plus explicites
- Pas de couche Azure intermédiaire

**Inconvénients** :
- Faut imprimer Shop Order par Shop Order (pas de batch)
- Authentification IFS (pas Azure)

---

## 📊 Résumé

| Composant | Status | Note |
|-----------|--------|------|
| **OAuth2** | ✅ Fonctionne | Token obtenu en 1-2s |
| **API Gateway** | ✅ Accessible | Répond en ~90s |
| **Format Payload** | ✅ Connu | Fourni par le créateur |
| **Layout IFS** | ❓ Inconnu | À vérifier en DEV |
| **Shop Orders** | ❌ Invalides | Besoin de données réelles |
| **Imprimante** | ❓ Inconnue | À vérifier |
| **Impression** | ❌ Échec 500 | Besoin de déboguer |

---

## 🎯 Recommandation

**Court terme** : Contacter le créateur de l'API pour obtenir :
1. Des Shop Orders valides en DEV
2. Les logs de l'erreur 500
3. Confirmation que le layout BEN_MA_FO_CR_184.rdl est déployé

**Moyen terme** : Une fois les données valides obtenues, implémenter l'intégration dans Part Printer

**Fallback** : Si l'API Azure reste bloquée, utiliser l'API IFS PrintDialog native

---

**Prochaine action** : Demander au créateur des données de test valides 📧
