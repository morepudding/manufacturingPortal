# IFS API lookup – customer order

> Rapport généré automatiquement pour analyser les endpoints liés à la recherche `customer order`.

Top 3 correspondances :

## 1. APIDOC
- Score : 805.00
- Fichier : `docs/api/production-line/APIDOC.md`

```text
..." "CurrencyCode" "CurrencyCode desc" "SuppGrp" "SuppGrp desc" "AdditionalCostAmount" "AdditionalCostAmount desc" "Contact" "Contact desc" "CrCheck" "CrCheck desc" "CrDate" "CrDate desc" "CrNoteText" "CrNoteText desc" "DateDel" "DateDel desc" "Discount" "Discount desc" "NoteText" "NoteText desc" "OurCustomerNo" "OurCustomerNo desc" "PackListFlag" "PackListFlag desc" "PurchOrderFlag" "PurchOrderFlag desc" "QcApproval" "QcApproval desc" "QcDate" "QcDate desc" "QcAudit" "QcAudit desc" "QcNoteText" "QcNoteText desc" "OrdConfRemInterval" "OrdConfRemInterval desc" "DeliveryRemInterval" "DeliveryRemIn...
```

## 2. APIDOC
- Score : 697.00
- Fichier : `docs/api/site/APIDOC.md`

```text
...arId" "DistCalendarId desc" "ManufCalendarId" "ManufCalendarId desc" "Offset" "Offset desc" "DataCaptureMenuId" "DataCaptureMenuId desc" "TimeZoneCode" "TimeZoneCode desc" "CUnpegSupplies" "CUnpegSupplies desc" "DocumentAddress" "DocumentAddress desc" "LastPeriodicWADate" "LastPeriodicWADate desc" "CustomerOrderReportsConditionCodeDisplay" "CustomerOrderReportsConditionCodeDisplay desc" "PurchaseOrderReportsConditionCodeDisplay" "PurchaseOrderReportsConditionCodeDisplay desc" "DefaultSOReceiptinBackground" "DefaultSOReceiptinBackground desc" "InternalCustomer" "InternalCustomer desc" "Internal...
```

## 3. 1. Modification du Service Shop Order
- Score : 178.00
- Fichier : `docs/tools/boat-configuration-editor/specifications/ux-customer-order.md`

```text
**Fichier** : `src/lib/shop-order-service.ts` ```typescript interface ShopOrderSearchResult { shopOrder: ShopOrder serialNumber: string dopHeaderId: string customerOrder: CustomerOrderInfo | null // ← NOUVEAU } interface CustomerOrderInfo { orderNo: string lineNo: string partNo: string catalogDesc: string chullNumber: string customerNo: string customerName?: string configurationId: string status: string quantity: number } export async function searchSh...
```
