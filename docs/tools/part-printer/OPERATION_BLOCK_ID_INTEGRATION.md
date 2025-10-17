# 🔗 Intégration OperationBlockId - Part Printer

## 📋 Contexte

Suite à l'analyse des Shop Orders avec `OperationBlockId`, nous avons découvert que **Bénéteau utilise activement les Operation Blocks** sur le site FR017 (Vendée).

### Résultats de l'analyse (17 octobre 2025)

- ✅ **100 opérations** trouvées avec `OperationBlockId`
- 🏭 **Site principal** : FR017
- 🔗 **2 Block IDs** : B89 (94x - CN), B92 (6x - CL)
- 📊 **État** : Tous fermés (Closed)

**Fichier d'analyse** : `scripts/find-shoporders-with-operation-block.ts`  
**Résultats exportés** : `scripts/operation-block-results.json`

---

## 🎯 Objectif

Mettre à jour **Part Printer** pour être **100% conforme à la SFD** (Spécification Fonctionnelle Détaillée) en intégrant correctement `OperationBlockId`.

---

## 🚨 Problèmes identifiés

### 1. Filtre "OP10 Block ID" désactivé

**État actuel** :
```typescript
// ⚠️ NON DISPONIBLE (AST)
// ⚪ Filtre désactivé : Accepte toutes les pièces (Block ID vide ou non)
```

**Problème** :
- Le filtre est marqué comme "Non disponible" alors que les données existent dans IFS
- Les utilisateurs ne peuvent pas filtrer par Block ID empty/non-empty

### 2. Étiquette incorrecte : Operation ID au lieu de OperationBlockId

**État actuel** :
```typescript
// Dans la génération d'étiquette, on insère :
label.operationId = operation.OpId  // ❌ INCORRECT

// Alors qu'on devrait insérer :
label.operationBlockId = operation.OperationBlockId  // ✅ CORRECT
```

**Impact** :
- Les étiquettes ne sont pas conformes à la SFD
- Les utilisateurs ne peuvent pas identifier les pièces groupées par Block

---

## 📝 Plan d'action - Intégration complète

### Phase 1 : Réactivation du filtre "OP10 Block ID" ✅

**Fichiers impactés** :
- `src/app/(tools)/part-printer/components/FilterPanel.tsx`
- `src/tools/part-printer/services/shop-order-filter-service.ts`
- `src/tools/part-printer/types/filters.ts`

**Actions** :

#### 1.1 Mettre à jour le type de filtre

**Fichier** : `src/tools/part-printer/types/filters.ts`

```typescript
export interface PartPrinterFilters {
  site: string
  productionLine?: string
  startDate: string
  mode: 'standard' | 'recut'
  
  // ✅ RÉACTIVER : Filtre OperationBlockId
  operationBlockIdFilter: 'all' | 'empty' | 'not-empty'  // Nouveau choix
}
```

#### 1.2 Ajouter le champ dans FilterPanel

**Fichier** : `src/app/(tools)/part-printer/components/FilterPanel.tsx`

```typescript
// Ajouter un Select pour OperationBlockId
<div>
  <Label htmlFor="operationBlockIdFilter">OP10 Block ID</Label>
  <Select
    id="operationBlockIdFilter"
    value={filters.operationBlockIdFilter}
    onChange={(e) => updateFilter('operationBlockIdFilter', e.target.value)}
  >
    <option value="all">Tous (Block ID vide ou non)</option>
    <option value="empty">Vide uniquement</option>
    <option value="not-empty">Non vide uniquement</option>
  </Select>
</div>
```

#### 1.3 Implémenter le filtrage côté service

**Fichier** : `src/tools/part-printer/services/shop-order-filter-service.ts`

```typescript
async filterShopOrders(filters: PartPrinterFilters): Promise<ShopOrder[]> {
  // ... filtrage existant ...
  
  // ✅ NOUVEAU : Filtrer par OperationBlockId
  if (filters.operationBlockIdFilter === 'empty') {
    shopOrders = shopOrders.filter(so => {
      // Récupérer l'opération OP10
      const op10 = so.operations?.find(op => op.OperationNo === 10)
      return !op10?.OperationBlockId || op10.OperationBlockId === null
    })
  } else if (filters.operationBlockIdFilter === 'not-empty') {
    shopOrders = shopOrders.filter(so => {
      const op10 = so.operations?.find(op => op.OperationNo === 10)
      return op10?.OperationBlockId && op10.OperationBlockId !== null
    })
  }
  
  return shopOrders
}
```

---

### Phase 2 : Correction de l'étiquette - OperationBlockId ✅

**Fichiers impactés** :
- `src/tools/part-printer/types/part-label.ts`
- `src/tools/part-printer/services/part-label-service.ts`
- `src/tools/part-printer/services/label-print-service.ts`

**Actions** :

#### 2.1 Mettre à jour le type PartLabel

**Fichier** : `src/tools/part-printer/types/part-label.ts`

```typescript
export interface PartLabel {
  // ... champs existants ...
  
  // ❌ SUPPRIMER
  // operationId: number
  
  // ✅ AJOUTER
  operationBlockId: string | null  // Block ID de l'opération OP10
  
  // ... autres champs ...
}
```

#### 2.2 Corriger l'extraction de données

**Fichier** : `src/tools/part-printer/services/part-label-service.ts`

```typescript
async consolidateLabels(shopOrders: ShopOrder[]): Promise<PartLabel[]> {
  const labels: PartLabel[] = []
  
  for (const shopOrder of shopOrders) {
    const op10 = shopOrder.operations?.find(op => op.OperationNo === 10)
    
    if (!op10) continue
    
    const label: PartLabel = {
      // ... autres champs ...
      
      // ❌ AVANT (INCORRECT)
      // operationId: op10.OpId,
      
      // ✅ APRÈS (CORRECT - Conforme SFD)
      operationBlockId: op10.OperationBlockId || null,
      
      // ... autres champs ...
    }
    
    labels.push(label)
  }
  
  return labels
}
```

#### 2.3 Mettre à jour le template PDF

**Fichier** : `src/tools/part-printer/services/label-print-service.ts`

```typescript
// Dans la génération du PDF
function generateLabelPDF(label: PartLabel): Buffer {
  // ... génération du PDF ...
  
  // ✅ Afficher OperationBlockId sur l'étiquette (si présent)
  if (label.operationBlockId) {
    pdf.text(`Block ID: ${label.operationBlockId}`, x, y)
  }
  
  // ... suite du PDF ...
}
```

---

### Phase 3 : Mise à jour de l'API ✅

**Fichiers impactés** :
- `src/app/api/part-printer/operations/route.ts`
- `src/app/api/part-printer/labels/consolidate/route.ts`

**Actions** :

#### 3.1 Inclure OperationBlockId dans les requêtes IFS

**Fichier** : `src/tools/part-printer/services/operation-service.ts`

```typescript
async getOperations(shopOrder: ShopOrder): Promise<Operation[]> {
  const response = await this.client.get<IFSODataResponse<IFSOperation>>(
    `ShopOrderHandling.svc/ShopOrds(OrderNo='${shopOrder.OrderNo}',ReleaseNo='${shopOrder.ReleaseNo}',SequenceNo='${shopOrder.SequenceNo}')/OperationArray`,
    {
      $select: 'OperationNo,OperationDescription,OpId,OperationBlockId,OperationBlockObjstate,WorkCenterNo,PartNo,RemainingQty',
      $filter: 'OperationNo eq 10'
    }
  )
  
  return response.value
}
```

---

### Phase 4 : Tests et validation ✅

**Tests à effectuer** :

#### 4.1 Tests unitaires

```typescript
// Test du filtre OperationBlockId
describe('ShopOrderFilterService', () => {
  test('should filter by empty OperationBlockId', async () => {
    const filters = {
      site: 'FR017',
      startDate: '2025-10-01',
      mode: 'standard',
      operationBlockIdFilter: 'empty'
    }
    
    const result = await filterService.filterShopOrders(filters)
    
    // Vérifier que toutes les opérations OP10 ont OperationBlockId null
    result.forEach(so => {
      const op10 = so.operations?.find(op => op.OperationNo === 10)
      expect(op10?.OperationBlockId).toBeNull()
    })
  })
  
  test('should filter by non-empty OperationBlockId', async () => {
    const filters = {
      site: 'FR017',
      startDate: '2025-10-01',
      mode: 'standard',
      operationBlockIdFilter: 'not-empty'
    }
    
    const result = await filterService.filterShopOrders(filters)
    
    // Vérifier que toutes les opérations OP10 ont OperationBlockId non null
    result.forEach(so => {
      const op10 = so.operations?.find(op => op.OperationNo === 10)
      expect(op10?.OperationBlockId).not.toBeNull()
    })
  })
})

// Test de consolidation des étiquettes
describe('PartLabelService', () => {
  test('should include OperationBlockId in labels', async () => {
    const shopOrders = [/* ... */]
    const labels = await labelService.consolidateLabels(shopOrders)
    
    labels.forEach(label => {
      // ✅ Vérifier que operationBlockId est présent (pas operationId)
      expect(label).toHaveProperty('operationBlockId')
      expect(label).not.toHaveProperty('operationId')
    })
  })
})
```

#### 4.2 Tests d'intégration

**Scénarios de test** :

| Scénario | Filtre | Résultat attendu |
|----------|--------|------------------|
| 1 | `operationBlockIdFilter: 'all'` | Toutes les pièces (B89, B92, NULL) |
| 2 | `operationBlockIdFilter: 'empty'` | Pièces sans Block ID uniquement |
| 3 | `operationBlockIdFilter: 'not-empty'` | Pièces avec Block ID (B89, B92) |
| 4 | Label avec B89 | Étiquette affiche "Block ID: B89" |
| 5 | Label sans Block ID | Étiquette n'affiche pas de Block ID |

#### 4.3 Tests sur données réelles

**Sites de test** :
- ✅ **FR017** (Vendée) - Site avec Block IDs (B89, B92)
- ✅ **BDR** (Votre site cible) - Vérifier présence de Block IDs

**Commande de test** :
```bash
# 1. Vérifier les Block IDs sur FR017
npx tsx scripts/find-shoporders-with-operation-block.ts

# 2. Vérifier les Block IDs sur BDR
# TODO: Créer script spécifique BDR
npx tsx scripts/find-shoporders-with-operation-block-bdr.ts
```

---

## 📊 Impact et bénéfices

### Conformité SFD

| Aspect | Avant | Après |
|--------|-------|-------|
| Filtre Block ID | ❌ Désactivé | ✅ Actif avec 3 choix |
| Champ étiquette | ❌ `operationId` (incorrect) | ✅ `operationBlockId` (correct) |
| Affichage étiquette | ❌ Pas de Block ID | ✅ Block ID affiché si présent |
| Filtrage précis | ❌ Impossible | ✅ Possible (empty/non-empty) |

### Expérience utilisateur

**Avant** :
- ⚠️ Utilisateurs ne peuvent pas isoler les pièces avec/sans Block ID
- ⚠️ Étiquettes non conformes aux attentes métier
- ⚠️ Confusion entre Operation ID et Block ID

**Après** :
- ✅ Filtrage granulaire des pièces
- ✅ Étiquettes conformes à la SFD
- ✅ Information Block ID visible et exploitable
- ✅ Meilleure traçabilité des opérations groupées

---

## 🗓️ Planning de mise en œuvre

### Timeline estimée : **3 jours**

| Phase | Durée | Responsable | Status |
|-------|-------|-------------|--------|
| **Phase 1** : Réactivation filtre | 1 jour | Dev | 📋 À faire |
| **Phase 2** : Correction étiquette | 1 jour | Dev | 📋 À faire |
| **Phase 3** : Mise à jour API | 0.5 jour | Dev | 📋 À faire |
| **Phase 4** : Tests & validation | 0.5 jour | Dev + QA | 📋 À faire |

### Jalons (Milestones)

- [ ] **M1** : Filtre OperationBlockId réactivé et fonctionnel
- [ ] **M2** : Étiquettes affichent OperationBlockId au lieu de OpId
- [ ] **M3** : Tests unitaires passent (100% coverage sur nouvelles fonctions)
- [ ] **M4** : Tests d'intégration validés sur FR017
- [ ] **M5** : Validation sur site BDR
- [ ] **M6** : Documentation utilisateur mise à jour
- [ ] **M7** : Déploiement en production

---

## 📚 Ressources

### Documentation technique

- **Script d'analyse** : `scripts/find-shoporders-with-operation-block.ts`
- **Résultats d'analyse** : `scripts/operation-block-results.json`
- **SFD Part Printer** : `docs/tools/part-printer/specifications/SFD_Part_Printer.md`
- **API IFS** : `docs/api/shop-order/OPERATIONS.md`

### Endpoints IFS concernés

| Endpoint | Usage |
|----------|-------|
| `ShopOrderHandling.svc/ShopOrds/.../OperationArray` | Récupération des opérations avec OperationBlockId |
| `ShopOrderHandling.svc/ShopOrderOperationSet` | Requête directe sur opérations (filtrage rapide) |

### Types TypeScript

```typescript
// IFS Operation avec OperationBlockId
interface IFSOperation {
  OperationNo: number
  OperationDescription: string
  OpId: number
  OperationBlockId: string | null        // ⭐ CHAMP CLÉ
  OperationBlockObjstate: string | null   // État du block (Closed, Released, etc.)
  WorkCenterNo: string
  PartNo: string
  RemainingQty: number
}
```

---

## ✅ Checklist de déploiement

Avant de considérer cette feature comme terminée :

- [ ] Code implémenté et testé localement
- [ ] Tests unitaires écrits et passent (100%)
- [ ] Tests d'intégration validés sur FR017
- [ ] Tests d'intégration validés sur BDR
- [ ] Revue de code effectuée
- [ ] Documentation technique mise à jour
- [ ] Documentation utilisateur mise à jour
- [ ] Demo préparée pour les utilisateurs
- [ ] Validation métier obtenue
- [ ] Déploiement en production
- [ ] Monitoring post-déploiement (48h)

---

## 🔗 Liens utiles

- **Copilot Instructions** : `.github/copilot-instructions.md`
- **Architecture Part Printer** : `docs/tools/part-printer/ROADMAP.md`
- **Phase 1 Part Printer** : `docs/tools/part-printer/implementation/PHASE_1_IMPLEMENTATION.md`

---

**Document créé le** : 17 octobre 2025  
**Dernière mise à jour** : 17 octobre 2025  
**Version** : 1.0  
**Auteur** : Manufacturing Portal Team
