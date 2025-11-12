# 🎯 Guide d'Implémentation - Workflow d'Impression IFS

**Date** : 13 octobre 2025  
**Status** : ✅ **VALIDÉ ET PRÊT POUR IMPLÉMENTATION**

---

## 📊 Résumé du Workflow Validé

Le workflow complet d'impression IFS a été **testé et validé avec succès** en environnement AST (Dev).

### Résultats des tests

```
✅ Durée d'exécution : 13.34 secondes
✅ PDF téléchargé : 175.48 KB
✅ Format : PDF 1.3, 2 pages
✅ Fichier valide : downloaded-FR0090_SA502-558558.pdf
✅ ResultKey : 558558
```

---

## 🔄 Workflow en 5 Étapes

### 1️⃣ Récupération Customer Order + ETag
```http
GET /CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='{orderNo}')
→ 200 OK + ETag
```

### 2️⃣ Génération ResultKey
```http
POST /CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='{orderNo}')/IfsApp.CustomerOrderHandling.CustomerOrder_PrintResultKey
Body: { "ReportId": "CUSTOMER_ORDER_CONF_REP" }
Headers: If-Match: {etag}
→ 200 OK + ResultKey
```

### 3️⃣ Initialisation Print Dialog
```http
POST /PrintDialog.svc/PrintDialogInit
Body: { "ResultKey": 558558 }
→ 200 OK + LayoutName, ReportTitle
```

### 4️⃣ Envoi Impression
```http
POST /PrintDialog.svc/ReportPrintRequest
Body: {
  "ResultKey": 558558,
  "LayoutName": "BEN_Inventory-BAT.rdl",
  "LanguageCode": "fr",
  "LogicalPrinter": "PDF_PRINTER",
  "Copies": 1
}
→ 204 No Content (Succès)
```

### 5️⃣ Téléchargement PDF
```http
GET /PrintDialog.svc/PdfArchiveSet?$filter=ResultKey eq 558558
→ Récupérer Id du PDF

GET /PrintDialog.svc/PdfArchiveSet(ResultKey=558558,Id='{id}')/Pdf
Headers: Accept: application/octet-stream
→ 200 OK + Binary PDF Data
```

**⏱️ Délai** : Attendre 2-3 secondes après l'étape 4 avant l'étape 5

---

## 🚀 Implémentation dans l'Application

### Configuration Environnement

#### AST (Dev) - Configuration actuelle ✅
```typescript
const CONFIG_AST = {
  orderNo: 'C1000038587',
  reportId: 'CUSTOMER_ORDER_CONF_REP',
  printerId: 'PDF_PRINTER',
  languageCode: 'fr',
  copies: 1
};
```

#### PRODUCTION - Configuration à utiliser
```typescript
const CONFIG_PROD = {
  orderNo: '{dynamique}', // Order No saisi par l'utilisateur
  reportId: 'MA_FO_CR_1419', // Rapport custom Bénéteau
  printerId: 'PRTMNF012', // ou PRTMNF015 (imprimantes physiques)
  languageCode: 'fr', // ou autre langue sélectionnée
  copies: 1
};
```

---

## 💻 Code à Implémenter

### 1. Service d'impression (`src/lib/print-service.ts`)

```typescript
import { getIFSClient } from './ifs-client';

export interface PrintRequest {
  orderNo: string;
  reportId: string;
  printerId: string;
  languageCode: string;
  copies?: number;
  downloadPdf?: boolean;
}

export interface PrintResult {
  success: boolean;
  resultKey: number;
  reportTitle: string;
  pdfUrl?: string;
  pdfBlob?: Blob;
  pdfInfo?: {
    fileName: string;
    size: number;
    created: string;
  };
}

export async function printCustomerOrder(
  request: PrintRequest
): Promise<PrintResult> {
  const client = getIFSClient();
  
  try {
    // Étape 1 : GET Customer Order + ETag
    const orderResponse = await client.get(
      `CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${request.orderNo}')`
    );
    const etag = orderResponse['@odata.etag'];
    
    // Étape 2 : POST PrintResultKey
    const resultKeyResponse = await client.post(
      `CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${request.orderNo}')/IfsApp.CustomerOrderHandling.CustomerOrder_PrintResultKey`,
      { ReportId: request.reportId },
      { headers: { 'If-Match': etag } }
    );
    const resultKey = parseInt(resultKeyResponse.value);
    
    // Étape 3 : POST PrintDialogInit
    const dialogResponse = await client.post(
      'PrintDialog.svc/PrintDialogInit',
      { ResultKey: resultKey }
    );
    
    // Étape 4 : POST ReportPrintRequest
    await client.post(
      'PrintDialog.svc/ReportPrintRequest',
      {
        ResultKey: dialogResponse.ResultKey,
        LayoutName: dialogResponse.LayoutName,
        LanguageCode: request.languageCode,
        LogicalPrinter: request.printerId,
        Copies: request.copies || 1
      }
    );
    
    const result: PrintResult = {
      success: true,
      resultKey: resultKey,
      reportTitle: dialogResponse.ReportTitle
    };
    
    // Étape 5 (optionnelle) : Téléchargement PDF
    if (request.downloadPdf) {
      // Attendre que le PDF soit généré
      let pdfInfo = null;
      for (let attempt = 0; attempt < 15; attempt++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const archiveResponse = await client.get(
          `PrintDialog.svc/PdfArchiveSet?$filter=ResultKey eq ${resultKey}&$top=1`
        );
        
        if (archiveResponse.value?.length > 0) {
          pdfInfo = archiveResponse.value[0];
          break;
        }
      }
      
      if (pdfInfo) {
        // Télécharger le PDF
        const pdfResponse = await client.getRaw(
          `PrintDialog.svc/PdfArchiveSet(ResultKey=${pdfInfo.ResultKey},Id='${pdfInfo.Id}')/Pdf`,
          { headers: { 'Accept': 'application/octet-stream' } }
        );
        
        result.pdfBlob = new Blob([pdfResponse], { type: 'application/pdf' });
        result.pdfInfo = {
          fileName: pdfInfo.FileName,
          size: pdfInfo.PdfSize,
          created: pdfInfo.Created
        };
      }
    }
    
    return result;
    
  } catch (error) {
    console.error('Print error:', error);
    throw new Error(`Erreur d'impression: ${error.message}`);
  }
}
```

### 2. API Route (`src/app/api/print/route.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { printCustomerOrder } from '@/lib/print-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation
    if (!body.orderNo) {
      return NextResponse.json(
        { error: 'Order No requis' },
        { status: 400 }
      );
    }
    
    // Exécuter le workflow d'impression
    const result = await printCustomerOrder({
      orderNo: body.orderNo,
      reportId: body.reportId || 'CUSTOMER_ORDER_CONF_REP',
      printerId: body.printerId || 'PDF_PRINTER',
      languageCode: body.languageCode || 'fr',
      copies: body.copies || 1,
      downloadPdf: body.downloadPdf || false
    });
    
    // Si téléchargement PDF demandé, retourner le fichier
    if (result.pdfBlob) {
      return new NextResponse(result.pdfBlob, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${result.pdfInfo?.fileName || 'document.pdf'}"`
        }
      });
    }
    
    // Sinon retourner le résultat JSON
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('API /print error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

### 3. Composant UI

```typescript
// src/components/PrintDialog.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Select } from '@/components/atoms/Select';
import { toast } from 'sonner';

interface PrintDialogProps {
  orderNo: string;
}

export function PrintDialog({ orderNo }: PrintDialogProps) {
  const [printing, setPrinting] = useState(false);
  const [reportId, setReportId] = useState('CUSTOMER_ORDER_CONF_REP');
  const [printerId, setPrinterId] = useState('PDF_PRINTER');
  const [languageCode, setLanguageCode] = useState('fr');
  
  const handlePrint = async (downloadPdf: boolean) => {
    setPrinting(true);
    
    try {
      const response = await fetch('/api/print', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNo,
          reportId,
          printerId,
          languageCode,
          copies: 1,
          downloadPdf
        })
      });
      
      if (!response.ok) {
        throw new Error('Erreur d\'impression');
      }
      
      if (downloadPdf) {
        // Télécharger le PDF
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `order-${orderNo}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
        
        toast.success('PDF téléchargé avec succès!');
      } else {
        const result = await response.json();
        toast.success(`Impression envoyée! (ResultKey: ${result.resultKey})`);
      }
      
    } catch (error) {
      toast.error('Erreur lors de l\'impression');
      console.error(error);
    } finally {
      setPrinting(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <h3>Imprimer le document</h3>
      
      <Select
        label="Rapport"
        value={reportId}
        onChange={(e) => setReportId(e.target.value)}
      >
        <option value="CUSTOMER_ORDER_CONF_REP">Order Confirmation</option>
        <option value="MA_FO_CR_1419">Configuration Report (Prod)</option>
      </Select>
      
      <Select
        label="Imprimante"
        value={printerId}
        onChange={(e) => setPrinterId(e.target.value)}
      >
        <option value="PDF_PRINTER">PDF Archiver</option>
        <option value="PRTMNF012">PRTMNF012 - BW</option>
        <option value="PRTMNF015">PRTMNF015 - HR</option>
      </Select>
      
      <Select
        label="Langue"
        value={languageCode}
        onChange={(e) => setLanguageCode(e.target.value)}
      >
        <option value="fr">Français</option>
        <option value="en">English</option>
        <option value="da">Dansk</option>
      </Select>
      
      <div className="flex gap-2">
        <Button
          onClick={() => handlePrint(false)}
          disabled={printing}
        >
          {printing ? 'Impression...' : 'Imprimer'}
        </Button>
        
        <Button
          onClick={() => handlePrint(true)}
          disabled={printing}
          variant="outline"
        >
          Imprimer & Télécharger
        </Button>
      </div>
    </div>
  );
}
```

---

## 🔧 Configuration Production

### Changements nécessaires pour la production

1. **ReportId** : `CUSTOMER_ORDER_CONF_REP` → `MA_FO_CR_1419`
2. **PrinterId** : `PDF_PRINTER` → `PRTMNF012` ou autre imprimante physique
3. **Base URL** : Changer vers l'environnement de production IFS
4. **Credentials** : Utiliser les credentials OAuth2 de production

### Variables d'environnement

```bash
# .env.production
IFS_BASE_URL=https://beneteau-group-prod.ifs.cloud/main/ifsapplications/projection/v1
IFS_CLIENT_ID=AIS_IFS_MA_PROD
IFS_CLIENT_SECRET=<prod_secret>
IFS_TOKEN_URL=https://beneteau-group-prod.ifs.cloud/auth/realms/benprod/protocol/openid-connect/token
```

---

## ✅ Checklist avant Production

- [ ] Tester avec `MA_FO_CR_1419` en environnement de production
- [ ] Vérifier les imprimantes physiques disponibles
- [ ] Tester avec différentes langues (fr, en, da)
- [ ] Valider les permissions utilisateur (qui peut imprimer?)
- [ ] Documenter le workflow pour les utilisateurs finaux
- [ ] Ajouter des logs pour le monitoring
- [ ] Implémenter retry logic pour les erreurs réseau
- [ ] Ajouter un historique des impressions

---

## 📚 Scripts de Test

### Script validé
```bash
cd /home/rbottero/ManufacturingPortal
export IFS_CLIENT_SECRET="..."
node src/testscript/final-print-workflow.js
```

### Résultat attendu
```
✅ Workflow complet en ~13 secondes
✅ PDF téléchargé : downloaded-FR0090_SA502-{ResultKey}.pdf
✅ Taille : ~175 KB
✅ Format : PDF 1.3, 2 pages
```

---

## 🎯 Prochaines Étapes

1. ✅ **Workflow validé** - AST avec CUSTOMER_ORDER_CONF_REP
2. ⏳ **Créer les services** - Implémenter dans src/lib/print-service.ts
3. ⏳ **Créer l'API Route** - Implémenter /api/print
4. ⏳ **Créer le composant UI** - PrintDialog avec dropdowns
5. ⏳ **Tester en Production** - Avec MA_FO_CR_1419 et vraie imprimante
6. ⏳ **Déployer** - Mise en production

---

**Status** : ✅ PRÊT POUR IMPLÉMENTATION  
**Dernière validation** : 13 octobre 2025  
**Environnement testé** : IFS Cloud AST (Dev)  
**Temps d'exécution** : 13.34 secondes  
**PDF validé** : 175.48 KB, PDF 1.3, 2 pages
