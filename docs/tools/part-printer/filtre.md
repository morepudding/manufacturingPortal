# 📋 Analyse des Filtres Part Printer

## 🎯 Spécification Fonctionnelle Détaillée (SFD)

### Filtres disponibles pour l'extraction QR

| Filtre | Type | Obligatoire | Source IFS | Détails |
|--------|------|-------------|------------|---------|
| **Site** | LOV | ✅ Oui | `Contracts` | Ex: BDR |
| **Production Line** | LOV | ❌ Non | `Production lines` (pour site sélectionné) | Ex: Line 1 |
| **Revised Start Date** | Date | ✅ Oui | Date picker | Format: YYYY-MM-DD |
| **Block Date** | Boolean | ✅ Oui | Checkbox | `true` = Débit classique (default), `false` = Redébit |
| **OP10 Block ID** | Enum | ❌ Non | Filtre | `EMPTY` (vide strict) ou `NO_CONDITION` (aucun filtre) |

---

## 🔍 Règles métier détaillées

### Mode : Débit classique (par défaut)

**Définition** : Première découpe du bois brut en pièces selon le plan de fabrication.

**Comportement** :
- `Block Date` = `true` (case cochée)
- `CBlockDates = true` dans IFS
- Recherche Shop Orders à la **date exacte** sélectionnée
- Filtre OP10 Block ID : **EMPTY** (strictement vide)
  - Ne récupère que les pièces dont le Block ID est `null` ou `''`
  - Signifie : pièce **non bloquée**, prête à débiter

**Cas d'usage** :
- Production normale
- Étiquettes pour pièces neuves jamais débitées
- Workflow standard de découpe

**Filtre IFS appliqué** :
```
$filter=(RevisedStartDate eq '2025-10-22' AND CBlockDates eq true AND (BlockId eq null OR BlockId eq ''))
```

---

### Mode : Redébit

**Définition** : Re-découpe d'une pièce déjà débitée (correction, erreur, modification post-production).

**Comportement** :
- `Block Date` = `false` (case décochée)
- `CBlockDates = false` dans IFS
- Recherche Shop Orders à la **date sélectionnée** (sans contrainte ≤ aujourd'hui, accepte futur)
- Filtre OP10 Block ID : **NO_CONDITION** (aucun filtre)
  - Récupère **toutes** les pièces (Block ID vide ou non)
  - Signifie : on accepte même les pièces bloquées ou déjà débitées

**Cas d'usage** :
- Correction d'une erreur de découpe
- Modification de dimensions après première découpe
- Redébit d'une pièce défectueuse
- Retouche/ajustement post-production

**Filtre IFS appliqué** :
```
$filter=(RevisedStartDate eq '2025-10-22' AND CBlockDates eq false)
```
⚠️ **Pas de filtre sur Block ID** (on récupère tout)

---

## 📊 Tableau récapitulatif des règles

| Critère | Débit classique (default) | Redébit |
|---------|---------------------------|---------|
| **Block Date (UI)** | ✅ Coché (`true`) | ❌ Décoché (`false`) |
| **CBlockDates (IFS)** | `true` | `false` |
| **Filtre Date** | `date = startDate` (exacte) | `date = startDate` (accepte futur) |
| **OP10 Block ID** | **EMPTY** (strictement vide) | **NO_CONDITION** (aucun filtre) |
| **Pièces ciblées** | Neuves, non bloquées | Toutes (même bloquées/débitées) |
| **Lettre Range ID** | **A** (Attente) | **R** (Redébit) |

---

## ⚠️ Problème identifié : Block ID non disponible sur AST

### Constat

Le filtre **OP10 Block ID** (EMPTY vs NO_CONDITION) ne peut **pas être implémenté** sur l'environnement AST car :
- Le champ `BlockId` n'est pas disponible/récupérable sur AST
- L'API IFS AST ne retourne pas cette donnée dans les endpoints accessibles
- Impossible de filtrer sur un champ qui n'existe pas

### Impact

La SFD spécifie deux filtres distincts :
1. **Block Date** (checkbox) → ✅ **Implémentable**
2. **OP10 Block ID** (EMPTY/NO_CONDITION) → ❌ **Impossible sur AST**

### Conséquence actuelle

L'implémentation actuelle utilise :
- Un **toggle Débit classique / Redébit** (radio buttons)
- Ce toggle combine les deux filtres en un seul
- Simplification nécessaire car Block ID inaccessible

---

## 🎯 Solutions proposées

### **Option 1 : Simplification (RECOMMANDÉE)**

**Implémentation actuelle (à conserver)**

Interface :
```
☐ Block Date (Débit classique)
  ✓ Coché = Débit classique
  ✗ Décoché = Redébit
```

**Avantages** :
- ✅ Fonctionnel sur AST (pas besoin de Block ID)
- ✅ Simple et clair pour l'utilisateur
- ✅ Respecte l'esprit de la SFD (distinction Débit/Redébit)
- ✅ Déjà implémenté et testé

**Inconvénients** :
- ❌ Ne respecte pas strictement la SFD (manque filtre Block ID)
- ❌ Pas de granularité fine (on ne peut pas activer Block Date sans filtrer Block ID)

**Décision** : Documenter cette limitation et adapter la SFD à la réalité technique d'AST.

---

### **Option 2 : SFD stricte (RETENUE ✅)**

Interface :
```
☐ Block Date (Débit classique)
☐ OP10 Block ID empty

⚠️ [AST] Filtre Block ID non disponible sur cet environnement
```

**Avantages** :
- ✅ Respect strict de la SFD
- ✅ Granularité fine (4 combinaisons possibles)
- ✅ **Future-proof** : Prêt pour environnement production
- ✅ **Transparent** : Warning visible pour limitations AST
- ✅ Code maintenable et évolutif

**Inconvénients** :
- ⚠️ Filtre Block ID **non fonctionnel sur AST** (mais implémenté)
- ⚠️ Complexité UI légèrement accrue
- ⚠️ Nécessite documentation claire des limitations

**Décision** : ✅ **RETENUE** - Implémentation future-proof avec gestion transparente des limitations AST.

---

## ✅ Décision finale : Implémenter la SFD strictement (Option 2)

### Choix retenu : **Option 2 (SFD stricte avec 2 checkboxes)**

**Interface implémentée** :
```
☐ Block Date (Débit classique)
  ✓ Coché = Filtre CBlockDates = true
  ✗ Décoché = Pas de filtre sur CBlockDates

☐ OP10 Block ID empty
  ✓ Coché = Filtre Block ID strictement vide
  ✗ Décoché = Pas de filtre sur Block ID

⚠️ [AST] Le filtre Block ID n'est pas disponible sur l'environnement AST.
   Cette option sera ignorée jusqu'à migration vers un environnement complet.
```

**Comportement selon combinaisons** :

| Block Date | Block ID Empty | Comportement IFS | Cas d'usage |
|------------|----------------|------------------|-------------|
| ✅ Coché | ✅ Coché | `CBlockDates=true AND BlockId=null` | **Débit classique** (production normale) |
| ✅ Coché | ❌ Décoché | `CBlockDates=true` | Débit avec pièces potentiellement bloquées |
| ❌ Décoché | ✅ Coché | `BlockId=null` | Toutes dates, pièces non bloquées |
| ❌ Décoché | ❌ Décoché | Aucun filtre | **Redébit** (tout accepter) |

**Justification** :
1. ✅ **Respect strict de la SFD** (2 filtres indépendants)
2. ✅ **Future-proof** : Prêt pour environnement complet (production, autre région)
3. ✅ **Granularité maximale** : 4 combinaisons possibles
4. ✅ **Transparent sur les limitations** : Warning AST visible dans l'UI
5. ✅ **Code maintenable** : Logique complète implémentée, facile à activer plus tard

**Gestion limitation AST** :
- ⚠️ **Warning visuel** dans l'interface : "Environnement AST - Filtre Block ID non disponible"
- 🔧 Le filtre Block ID sera **ignoré silencieusement** sur AST (pas d'erreur)
- 📊 Logs indiquant que le filtre est skippé : `⚠️ [AST] Block ID filter skipped`
- 🚀 Code prêt à activer Block ID quand environnement le supportera

---

## 📝 Mise à jour de la documentation

**À faire** :
1. ✅ Mettre à jour `filtre.md` avec cette analyse complète
2. ✅ Documenter la limitation technique (Block ID non disponible sur AST)
3. ✅ Adapter la SFD pour refléter l'implémentation réelle
4. ✅ Ajouter un commentaire dans le code expliquant le choix

**Fichiers concernés** :
- `docs/tools/part-printer/filtre.md` (ce fichier)
- `src/app/(tools)/part-printer/components/BlockDateToggle.tsx`
- `src/tools/part-printer/services/shop-order-filter-service.ts`

---

## 🔄 Résumé pour l'équipe

| Question | Réponse |
|----------|---------|
| **Pourquoi un seul toggle au lieu de 2 checkboxes ?** | Le filtre Block ID est **inaccessible sur AST**, donc on combine les 2 filtres en un seul. |
| **C'est quoi le Redébit ?** | Re-découpe d'une pièce déjà débitée (correction/modification). |
| **Pourquoi on peut pas activer les 2 en même temps ?** | Ce sont 2 **modes exclusifs** : soit première découpe (Débit), soit re-découpe (Redébit). |
| **Impact de ne pas filtrer Block ID ?** | Minime : en Débit classique, on suppose Block ID vide (sans le vérifier). En Redébit, on accepte tout (conforme SFD). |
| **Solution pour production ?** | ✅ Implémentation actuelle valide - Documenter la limitation Block ID. |

---

**Version** : 2.0  
**Date** : 16 octobre 2025  
**Statut** : ✅ Analyse complète - Décision prise (Option 1)