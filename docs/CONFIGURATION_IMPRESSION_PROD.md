# 🔥 Configuration Impression PRODUCTION - Boat Configuration Editor

**Date** : 17 octobre 2025  
**Status** : ✅ Appliqué dans tout le code  
**Version** : 1.0.0

---

## 📋 Configuration Validée

### Report & Layout PRODUCTION

| Paramètre | Valeur | Status |
|-----------|--------|--------|
| **Report ID** | `PROFORMA_INVOICE_REP` | ✅ Validé dans IFS AST |
| **Layout Name** | `BEN_Boat_configuration_for_production.rdl` | ✅ Validé dans IFS AST |
| **Format** | A4 Portrait | ✅ |
| **Type** | Report Designer (.rdl) | ✅ |

### Validation IFS Cloud AST

Résultats de l'exploration via script `list-all-reports-and-layouts.ts` :

```json
{
  "ReportId": "PROFORMA_INVOICE_REP",
  "LayoutName": "BEN_Boat_configuration_for_production.rdl",
  "LayoutTitle": "BEN_Boat_configuration_for_production",
  "PaperFormat": "A4",
  "EnumerateOrder": 1,
  "DesignTime": "FALSE",
  "InUse": "TRUE",
  "LayoutType": "ReportDesigner"
}
```

**Alternative validée** : Le même layout fonctionne aussi avec `CUSTOMER_ORDER_CONF_REP` (EnumerateOrder: 7)

---

## 🔍 Fichiers Modifiés

### 1. Frontend - PrintExecution Component

**Fichier** : `src/app/(tools)/boat-configuration/components/PrintExecution/index.tsx`

**Changements** :

```typescript
// 🔥 CONFIGURATION PRODUCTION - NE PAS MODIFIER
const REPORT_ID = 'PROFORMA_INVOICE_REP'
const LAYOUT_NAME = 'BEN_Boat_configuration_for_production.rdl'

console.log('🔍 VERIFICATION CONFIGURATION IMPRESSION:')
console.log(`   ✅ Report ID: ${REPORT_ID}`)
console.log(`   ✅ Layout Name: ${LAYOUT_NAME}`)
console.log(`   📋 Order No: ${orderNo}`)
console.log(`   🖨️ Printer: ${printerId}`)
console.log(`   🌍 Language: ${languageCode}`)

const response = await fetch('/api/boat-configuration/print', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    orderNo,
    reportId: REPORT_ID,
    printerId,
    languageCode,
    layoutName: LAYOUT_NAME,
    copies: 1,
    downloadPdf,
  }),
})
```

**Affichage UI** :

```typescript
<div className="col-span-2">
  <span className="font-medium text-cyan-400">Document:</span>
  <div className="text-white">Boat Configuration for Production (PROFORMA_INVOICE_REP)</div>
  <div className="text-xs text-cyan-200 mt-1">Layout: BEN_Boat_configuration_for_production.rdl</div>
</div>
```

---

### 2. Backend - API Route

**Fichier** : `src/app/api/boat-configuration/print/route.ts`

**Changements** :

```typescript
/**
 * 🔥 CONFIGURATION PRODUCTION:
 * - Report ID: PROFORMA_INVOICE_REP (validé dans IFS AST)
 * - Layout: BEN_Boat_configuration_for_production.rdl (validé dans IFS AST)
 */

// 🔥 CONFIGURATION PRODUCTION - Valeurs par défaut
const DEFAULT_REPORT_ID = 'PROFORMA_INVOICE_REP'
const DEFAULT_LAYOUT_NAME = 'BEN_Boat_configuration_for_production.rdl'

// Construire la requête d'impression avec valeurs par défaut
const printRequest: PrintRequest = {
  orderNo: body.orderNo.trim(),
  reportId: body.reportId || DEFAULT_REPORT_ID,
  printerId: body.printerId || 'PDF_PRINTER',
  languageCode: body.languageCode || 'fr',
  layoutName: body.layoutName || DEFAULT_LAYOUT_NAME,
  copies: body.copies || 1,
  downloadPdf: body.downloadPdf || false,
}

console.log('\n🔍 VERIFICATION CONFIGURATION IMPRESSION API:')
console.log(`   ✅ Report ID: ${printRequest.reportId} ${printRequest.reportId === DEFAULT_REPORT_ID ? '(DEFAULT ✓)' : '(CUSTOM)'}`)
console.log(`   ✅ Layout Name: ${printRequest.layoutName} ${printRequest.layoutName === DEFAULT_LAYOUT_NAME ? '(DEFAULT ✓)' : '(CUSTOM)'}`)
console.log(`   📋 Order No: ${printRequest.orderNo}`)
console.log(`   🖨️ Printer: ${printRequest.printerId}`)
console.log(`   🌍 Language: ${printRequest.languageCode}`)
console.log(`   📥 Download PDF: ${printRequest.downloadPdf}`)
```

---

### 3. Service - Print Service

**Fichier** : `src/tools/boat-configuration/services/print-service.ts`

**Changements** : Documentation mise à jour

```typescript
/**
 * @example
 * ```typescript
 * // 🔥 CONFIGURATION PRODUCTION (par défaut)
 * const result = await printCustomerOrder({
 *   orderNo: 'C1000038587',
 *   reportId: 'PROFORMA_INVOICE_REP',  // ✅ PRODUCTION
 *   printerId: 'PDF_PRINTER',
 *   languageCode: 'fr',
 *   layoutName: 'BEN_Boat_configuration_for_production.rdl',  // ✅ PRODUCTION
 *   copies: 1,
 *   downloadPdf: false
 * })
 * ```
 */
```

---

## 🧪 Logs de Vérification

### Frontend (Browser Console)

Lors du clic sur "Print Only" ou "Print & Download PDF" :

```
🔍 VERIFICATION CONFIGURATION IMPRESSION:
   ✅ Report ID: PROFORMA_INVOICE_REP
   ✅ Layout Name: BEN_Boat_configuration_for_production.rdl
   📋 Order No: C1000038587
   🖨️ Printer: PDF_PRINTER
   🌍 Language: fr
```

### Backend (Server Console)

Lors de la réception de la requête API :

```
🔍 VERIFICATION CONFIGURATION IMPRESSION API:
   ✅ Report ID: PROFORMA_INVOICE_REP (DEFAULT ✓)
   ✅ Layout Name: BEN_Boat_configuration_for_production.rdl (DEFAULT ✓)
   📋 Order No: C1000038587
   🖨️ Printer: PDF_PRINTER
   🌍 Language: fr
   📥 Download PDF: false
```

Si un Report ID custom est passé :

```
🔍 VERIFICATION CONFIGURATION IMPRESSION API:
   ✅ Report ID: CUSTOMER_ORDER_CONF_REP (CUSTOM)
   ✅ Layout Name: BEN_Boat_configuration_for_production.rdl (DEFAULT ✓)
   ...
```

---

## ✅ Validation Checklist

- [x] **Report ID modifié** : `PROFORMA_INVOICE_REP` partout
- [x] **Layout Name modifié** : `BEN_Boat_configuration_for_production.rdl` partout
- [x] **Logs ajoutés** : Frontend + Backend
- [x] **UI mise à jour** : Affichage du bon document
- [x] **Documentation mise à jour** : JSDoc dans service
- [x] **Aucune erreur TypeScript** : Compilation OK
- [x] **Valeurs par défaut** : Appliquées dans API route

---

## 🔄 Différences avec Ancienne Configuration

| Élément | Ancienne Valeur | Nouvelle Valeur |
|---------|-----------------|-----------------|
| **Report ID** | `CUSTOMER_ORDER_CONF_REP` | `PROFORMA_INVOICE_REP` |
| **Layout** | `BEN_Inventory-BAT.rdl` | `BEN_Boat_configuration_for_production.rdl` |
| **Titre** | Customer Order Configuration | Boat Configuration for Production |
| **Status** | DEV/Test | ✅ PRODUCTION |

---

## 🎯 Prochaines Étapes

### Jour J : Test en DEV (AST)

1. **Lancer l'application** :
   ```bash
   cd /home/rbottero/ManufacturingPortal
   pnpm run dev
   ```

2. **Tester workflow complet** :
   - Aller sur Boat Configuration Editor
   - Saisir Order No : `C1000038587` (ou autre valide)
   - Sélectionner imprimante : `PDF_PRINTER`
   - Sélectionner langue : `fr`
   - **Vérifier les logs dans Browser Console** ✅
   - Cliquer "Print Only"
   - **Vérifier les logs dans Server Console** ✅
   - Vérifier que le ResultKey est retourné
   - Refaire avec "Print & Download PDF"
   - **Vérifier que le PDF se télécharge**

3. **Valider les logs** :
   - ✅ Browser : `Report ID: PROFORMA_INVOICE_REP`
   - ✅ Browser : `Layout Name: BEN_Boat_configuration_for_production.rdl`
   - ✅ Server : `(DEFAULT ✓)` pour les deux valeurs
   - ✅ UI affiche : "Boat Configuration for Production (PROFORMA_INVOICE_REP)"

### Jour J+1 : Test en PROD

1. **Vérifier que le Report existe en PROD**
   - Contacter équipe IFS
   - Valider `PROFORMA_INVOICE_REP` existe en PROD
   - Valider `BEN_Boat_configuration_for_production.rdl` existe en PROD

2. **Déployer en PROD**
   - Suivre le plan : `docs/PLAN_ACTION_IMPRESSION.md`
   - Phase 2, Jour 12 : Déploiement PROD

3. **Tests smoke PROD**
   - Impression Customer Order réel
   - Vérification imprimantes physiques
   - Validation PDF généré

---

## 📞 Support

### En cas de problème

**Si le Report ne génère pas de contenu** :

1. Vérifier dans les logs que `PROFORMA_INVOICE_REP` est bien utilisé
2. Tester avec un autre Customer Order
3. Vérifier que le layout existe dans IFS UI
4. Contacter équipe IFS pour valider configuration du Report

**Si les logs n'apparaissent pas** :

1. Frontend : Ouvrir Browser Console (F12)
2. Backend : Vérifier terminal où tourne `pnpm run dev`
3. Chercher `🔍 VERIFICATION CONFIGURATION`

**Alternative de secours** :

Si `PROFORMA_INVOICE_REP` ne fonctionne pas, utiliser :

```typescript
const REPORT_ID = 'CUSTOMER_ORDER_CONF_REP'  // Alternative validée
const LAYOUT_NAME = 'BEN_Boat_configuration_for_production.rdl'  // Même layout
```

(Validé : Le layout fonctionne aussi avec `CUSTOMER_ORDER_CONF_REP`, EnumerateOrder: 7)

---

## 📚 Références

- **Script d'exploration** : `scripts/list-all-reports-and-layouts.ts`
- **Résultats validation** : `scripts/reports-layouts-exploration.json`
- **Plan déploiement** : `docs/PLAN_ACTION_IMPRESSION.md`
- **Rapport complet** : `docs/RAPPORT_IMPRESSION.md`

---

**Date de création** : 17 octobre 2025  
**Dernière mise à jour** : 17 octobre 2025  
**Status** : ✅ **Configuration PRODUCTION appliquée**
