# 📊 SonarQube Issues - Manufacturing Portal

**Date**: 26 novembre 2025  
**Projet**: morepudding_manufacturingPortal  
**Total issues High/Medium**: 145 issues

---

## 🔴 Issues HIGH (11 issues)

| Fichier | Ligne | Message | Règle | Effort |
|---------|-------|---------|-------|--------|
| `tests/boat-configuration/e2e/helpers/test-helpers.ts` | 33 | Refactor this function to reduce its Cognitive Complexity from 17 to the 15 allo | S3776 | 7min |
| `src/tools/part-printer/services/site-service.ts` | 53 | Provide a compare function that depends on "String.localeCompare", to reliably s | S2871 | 10min |
| `src/tools/boat-configuration/services/print-service.ts` | 69 | Refactor this function to reduce its Cognitive Complexity from 22 to the 15 allo | S3776 | 12min |
| `src/tools/boat-configuration/services/shop-order-service.ts` | 51 | Refactor this function to reduce its Cognitive Complexity from 18 to the 15 allo | S3776 | 8min |
| `src/shared/components/organisms/EditTable/index.tsx` | 284 | Refactor this code to not nest functions more than 4 levels deep. | S2004 | 20min |
| `src/app/(tools)/boat-configuration/page.tsx` | 105 | Refactor this function to reduce its Cognitive Complexity from 21 to the 15 allo | S3776 | 11min |
| `src/app/api/boat-configuration/customer-orders/route.ts` | 31 | Refactor this function to reduce its Cognitive Complexity from 19 to the 15 allo | S3776 | 9min |
| `src/testscript/explore-pdf-download-methods.js` | 93 | Refactor this function to reduce its Cognitive Complexity from 30 to the 15 allo | S3776 | 20min |
| `src/testscript/template.js` | 96 | Refactor this function to reduce its Cognitive Complexity from 19 to the 15 allo | S3776 | 9min |
| `src/testscript/test-customer-order.js` | 110 | Refactor this function to reduce its Cognitive Complexity from 23 to the 15 allo | S3776 | 13min |
| `src/testscript/validate-complete-workflow.js` | 217 | Refactor this function to reduce its Cognitive Complexity from 16 to the 15 allo | S3776 | 6min |

---

## 🟠 Issues MEDIUM (134 issues)

| Fichier | Ligne | Message | Règle | Effort |
|---------|-------|---------|-------|--------|
| `tests/boat-configuration/e2e/helpers/test-helpers.ts` | 34 | Remove this useless assignment to variable "totalSeconds". | S1854 | 1min |
| `tests/boat-configuration/e2e/helpers/test-helpers.ts` | 61 | Extract this nested ternary operation into an independent statement. | S3358 | 5min |
| `tests/boat-configuration/e2e/helpers/test-helpers.ts` | 63 | Extract this nested ternary operation into an independent statement. | S3358 | 5min |
| `tests/boat-configuration/e2e/helpers/test-helpers.ts` | 102 | Extract this nested ternary operation into an independent statement. | S3358 | 5min |
| `tests/boat-configuration/e2e/helpers/test-helpers.ts` | 104 | Extract this nested ternary operation into an independent statement. | S3358 | 5min |
| `tests/boat-configuration/e2e/helpers/test-helpers.ts` | 124 | Prefer `node:fs` over `fs`. | S7772 | 5min |
| `tests/boat-configuration/e2e/helpers/test-helpers.ts` | 125 | Prefer `node:path` over `path`. | S7772 | 5min |
| `tests/boat-configuration/integration/api/print.test.ts` | 377 | Prefer `Number.parseInt` over `parseInt`. | S7773 | 2min |
| `tests/boat-configuration/integration/mocks/apim-handlers.ts` | 55 | Remove this useless assignment to variable "scope". | S1854 | 1min |
| `tests/boat-configuration/integration/mocks/apim-handlers.ts` | 93 | Prefer using an optional chain expression instead, as it's more concise and easi | S6582 | 5min |
| `tests/boat-configuration/integration/mocks/apim-handlers.ts` | 137 | Prefer using an optional chain expression instead, as it's more concise and easi | S6582 | 5min |
| `tests/boat-configuration/integration/mocks/apim-handlers.ts` | 181 | Prefer using an optional chain expression instead, as it's more concise and easi | S6582 | 5min |
| `tests/boat-configuration/integration/mocks/apim-handlers.ts` | 228 | Prefer using an optional chain expression instead, as it's more concise and easi | S6582 | 5min |
| `tests/boat-configuration/integration/mocks/apim-handlers.ts` | 269 | Prefer using an optional chain expression instead, as it's more concise and easi | S6582 | 5min |
| `tests/boat-configuration/integration/mocks/apim-handlers.ts` | 295 | Prefer using an optional chain expression instead, as it's more concise and easi | S6582 | 5min |
| `tests/boat-configuration/integration/mocks/apim-handlers.ts` | 321 | Prefer using an optional chain expression instead, as it's more concise and easi | S6582 | 5min |
| `tests/boat-configuration/integration/mocks/apim-handlers.ts` | 373 | Prefer using an optional chain expression instead, as it's more concise and easi | S6582 | 5min |
| `tests/boat-configuration/integration/mocks/apim-handlers.ts` | 416 | Prefer using an optional chain expression instead, as it's more concise and easi | S6582 | 5min |
| `tests/boat-configuration/integration/mocks/apim-handlers.ts` | 455 | Prefer using an optional chain expression instead, as it's more concise and easi | S6582 | 5min |
| `tests/boat-configuration/integration/mocks/apim-handlers.ts` | 463 | Remove this useless assignment to variable "Copies". | S1854 | 1min |
| `tests/boat-configuration/integration/mocks/apim-handlers.ts` | 492 | Prefer using an optional chain expression instead, as it's more concise and easi | S6582 | 5min |
| `tests/boat-configuration/integration/mocks/apim-handlers.ts` | 504 | Prefer `Number.parseInt` over `parseInt`. | S7773 | 2min |
| `tests/boat-configuration/integration/mocks/apim-handlers.ts` | 536 | Prefer using an optional chain expression instead, as it's more concise and easi | S6582 | 5min |
| `tests/boat-configuration/integration/mocks/apim-handlers.ts` | 563 | Prefer using an optional chain expression instead, as it's more concise and easi | S6582 | 5min |
| `tests/boat-configuration/integration/mocks/apim-handlers.ts` | 581 | Prefer using an optional chain expression instead, as it's more concise and easi | S6582 | 5min |
| `tests/boat-configuration/integration/mocks/apim-handlers.ts` | 598 | Prefer using an optional chain expression instead, as it's more concise and easi | S6582 | 5min |
| `tests/boat-configuration/integration/mocks/apim-handlers.ts` | 615 | Prefer using an optional chain expression instead, as it's more concise and easi | S6582 | 5min |
| `tests/boat-configuration/integration/mocks/apim-handlers.ts` | 632 | Prefer using an optional chain expression instead, as it's more concise and easi | S6582 | 5min |
| `src/app/(tools)/part-printer/components/FilterPanel.tsx` | 120 | A form label must be associated with a control. | S6853 | 5min |
| `src/app/(tools)/part-printer/components/FilterPanel.tsx` | 165 | Ambiguous spacing after previous element span | S6772 | 5min |
| `src/app/(tools)/part-printer/components/PrintDialog.tsx` | 190 | Ambiguous spacing after previous element span | S6772 | 5min |
| `src/app/(tools)/part-printer/components/ProductionLineSelector.tsx` | 105 | Extract this nested ternary operation into an independent statement. | S3358 | 5min |
| `src/app/(tools)/part-printer/components/ProductionLineSelector.tsx` | 107 | Extract this nested ternary operation into an independent statement. | S3358 | 5min |
| `src/app/(tools)/part-printer/components/ShopOrderTable.tsx` | 63 | Extract this nested ternary operation into an independent statement. | S3358 | 5min |
| `src/app/(tools)/part-printer/components/ShopOrderTable.tsx` | 71 | Remove this useless assignment to variable "someSelected". | S1854 | 1min |
| `src/app/(tools)/part-printer/components/ShopOrderTable.tsx` | 73 | Move this component definition out of the parent component and pass data as prop | S6478 | 5min |
| `src/app/(tools)/part-printer/components/ShopOrderTable.tsx` | 239 | Ambiguous spacing after previous element span | S6772 | 5min |
| `src/app/(tools)/part-printer/components/ShopOrderTable.tsx` | 244 | Ambiguous spacing after previous element span | S6772 | 5min |
| `src/app/(tools)/part-printer/components/SiteSelector.tsx` | 83 | Extract this nested ternary operation into an independent statement. | S3358 | 5min |
| `src/app/(tools)/part-printer/page.tsx` | 80 | Provide multiple methods instead of using "checked" to determine which action to | S2301 | 15min |
| `src/app/(tools)/part-printer/page.tsx` | 191 | Prefer `childNode.remove()` over `parentNode.removeChild(childNode)`. | S7762 | 2min |
| `src/tools/part-printer/services/label-pdf-service-table.ts` | 123 | Prefer `Number.parseFloat` over `parseFloat`. | S7773 | 2min |
| `src/tools/part-printer/services/label-pdf-service-table.ts` | 124 | Prefer `Number.parseFloat` over `parseFloat`. | S7773 | 2min |
| `src/tools/part-printer/services/label-pdf-service-table.ts` | 186 | Prefer `Number.parseFloat` over `parseFloat`. | S7773 | 2min |
| `src/tools/part-printer/services/label-print-service.ts` | 207 | Remove this useless assignment to variable "client". | S1854 | 1min |
| `src/tools/part-printer/services/orchestrator-service.ts` | 530 | Remove this useless assignment to variable "key". | S1854 | 1min |
| `src/tools/part-printer/services/orchestrator-service.ts` | 532 | Prefer `Number.parseFloat` over `parseFloat`. | S7773 | 2min |
| `src/tools/part-printer/services/orchestrator-service.ts` | 533 | Prefer `Number.parseFloat` over `parseFloat`. | S7773 | 2min |
| `src/tools/part-printer/services/part-label-service.ts` | 215 | Prefer `Number.parseFloat` over `parseFloat`. | S7773 | 2min |
| `src/tools/part-printer/services/part-label-service.ts` | 216 | Prefer `Number.parseFloat` over `parseFloat`. | S7773 | 2min |
| `src/tools/part-printer/services/shop-order-filter-service.ts` | 244 | Prefer `Number.isNaN` over `isNaN`. | S7773 | 2min |
| `src/shared/services/ifs-client.ts` | 24 | Member 'config' is never reassigned; mark it as `readonly`. | S2933 | 2min |
| `src/tools/boat-configuration/services/print-service.ts` | 105 | Prefer `Number.parseInt` over `parseInt`. | S7773 | 2min |
| `src/tools/boat-configuration/services/print-service.ts` | 106 | Prefer `Number.isNaN` over `isNaN`. | S7773 | 2min |
| `src/app/(tools)/boat-configuration/components/PrintExecution/index.tsx` | 91 | Prefer `childNode.remove()` over `parentNode.removeChild(childNode)`. | S7762 | 2min |
| `src/app/(tools)/boat-configuration/components/PrintExecution/index.tsx` | 173 | Ambiguous spacing after previous element span | S6772 | 5min |
| `src/app/(tools)/boat-configuration/components/PrintExecution/index.tsx` | 188 | Ambiguous spacing after previous element span | S6772 | 5min |
| `src/shared/components/organisms/BoatCarousel/index.tsx` | 55 | Avoid non-native interactive elements. If using native HTML is not possible, add | S6848 | 5min |
| `src/shared/components/organisms/BoatCarousel/index.tsx` | 116 | Do not use Array index in keys | S6479 | 5min |
| `src/shared/components/organisms/DataTable/index.tsx` | 32 | Prefer `node:url` over `url`. | S7772 | 5min |
| `src/shared/components/organisms/DataTable/index.tsx` | 50 | Unexpected empty object pattern. | S3799 | 5min |
| `src/shared/components/organisms/DataTable/mock.ts` | 55 | Remove this commented out code. | S125 | 5min |
| `src/shared/components/organisms/DynamicBreadcrumb/index.tsx` | 87 | Prefer `Number.parseInt` over `parseInt`. | S7773 | 2min |
| `src/shared/components/organisms/DynamicBreadcrumb/index.tsx` | 91 | Prefer `Number.parseInt` over `parseInt`. | S7773 | 2min |
| `src/shared/components/organisms/DynamicBreadcrumb/index.tsx` | 95 | Prefer `Number.parseInt` over `parseInt`. | S7773 | 2min |
| `src/shared/components/organisms/DynamicBreadcrumb/index.tsx` | 99 | Prefer `Number.parseInt` over `parseInt`. | S7773 | 2min |
| `src/shared/components/organisms/DynamicBreadcrumb/index.tsx` | 103 | Prefer `Number.parseInt` over `parseInt`. | S7773 | 2min |
| `src/shared/components/organisms/EditTable/index.tsx` | 238 | Prefer using an optional chain expression instead, as it's more concise and easi | S6582 | 5min |
| `src/shared/components/organisms/EditTable/index.tsx` | 284 | Consider using "forEach" instead of "map" as its return value is not being used  | S2201 | 5min |
| `src/shared/components/molecules/ButtonLink/index.tsx` | 2 | Prefer `node:url` over `url`. | S7772 | 5min |
| `src/shared/components/molecules/ButtonWithIcon/index.tsx` | 2 | Prefer `node:url` over `url`. | S7772 | 5min |
| `src/shared/components/molecules/ButtonsList/index.tsx` | 30 | Extract this nested ternary operation into an independent statement. | S3358 | 5min |
| `src/shared/components/molecules/LanguageSelector/index.tsx` | 78 | Extract this nested ternary operation into an independent statement. | S3358 | 5min |
| `src/shared/components/molecules/PrinterSearch/index.tsx` | 50 | Prefer using an optional chain expression instead, as it's more concise and easi | S6582 | 5min |
| `src/shared/components/atoms/Breadcrumb/index.tsx` | 65 | Use <a href=...>, or <area href=...> instead of the "link" role to ensure access | S6819 | 5min |
| `src/shared/components/atoms/Breadcrumb/index.tsx` | 81 | Use <img alt=...> instead of the "presentation" role to ensure accessibility acr | S6819 | 5min |
| `src/shared/components/atoms/Breadcrumb/index.tsx` | 96 | Use <img alt=...> instead of the "presentation" role to ensure accessibility acr | S6819 | 5min |
| `src/shared/components/atoms/Card/index.tsx` | 35 | Headings must have content and the content must be accessible by a screen reader | S6850 | 5min |
| `src/shared/components/atoms/Table/index.tsx` | 11 | Add a valid header row or column to this "<table>". | S5256 | 2min |
| `eslint.config.mjs` | 1 | Prefer `node:path` over `path`. | S7772 | 5min |
| `eslint.config.mjs` | 2 | Prefer `node:url` over `url`. | S7772 | 5min |
| `src/app/(tools)/boat-configuration/page.tsx` | 415 | Extract this nested ternary operation into an independent statement. | S3358 | 5min |
| `src/app/api/boat-configuration/customer-orders/route.ts` | 95 | Review this redundant assignment: "customerOrderInfo" already holds the assigned | S4165 | 5min |
| `src/app/globals.css` | 2 | Unexpected unknown at-rule "@config" | S4662 | 1min |
| `src/app/page.tsx` | 281 | Unknown property 'jsx' found | S6747 | 5min |
| `src/app/page.tsx` | 281 | Unknown property 'global' found | S6747 | 5min |
| `src/testscript/explore-pdf-download-methods.js` | 7 | Prefer `node:https` over `https`. | S7772 | 5min |
| `src/testscript/explore-pdf-download-methods.js` | 8 | Prefer `node:fs` over `fs`. | S7772 | 5min |
| `src/testscript/explore-pdf-download-methods.js` | 243 | Prefer top-level await over an async function `main` call. | S7785 | 5min |
| `src/testscript/explore-print-endpoints.js` | 9 | Prefer `node:https` over `https`. | S7772 | 5min |
| `src/testscript/explore-print-endpoints.js` | 224 | Remove this useless assignment to variable "metadata". | S1854 | 1min |
| `src/testscript/explore-print-endpoints.js` | 327 | Prefer top-level await over an async function `main` call. | S7785 | 5min |
| `src/testscript/final-print-workflow.js` | 16 | Prefer `node:https` over `https`. | S7772 | 5min |
| `src/testscript/final-print-workflow.js` | 17 | Prefer `node:fs` over `fs`. | S7772 | 5min |
| `src/testscript/final-print-workflow.js` | 189 | Prefer `Number.parseInt` over `parseInt`. | S7773 | 2min |
| `src/testscript/final-print-workflow.js` | 353 | Remove this useless assignment to variable "order". | S1854 | 1min |
| `src/testscript/final-print-workflow.js` | 423 | Prefer top-level await over an async function `main` call. | S7785 | 5min |
| `src/testscript/quick-test-customer-order.js` | 5 | Prefer `node:https` over `https`. | S7772 | 5min |
| `src/testscript/quick-test-customer-order.js` | 131 | Prefer top-level await over an async IIFE. | S7785 | 5min |
| `src/testscript/search-and-test-reportids.js` | 7 | Prefer `node:https` over `https`. | S7772 | 5min |
| `src/testscript/search-and-test-reportids.js` | 331 | Prefer top-level await over an async function `main` call. | S7785 | 5min |
| `src/testscript/template.js` | 5 | Prefer `node:https` over `https`. | S7772 | 5min |
| `src/testscript/template.js` | 6 | Prefer `node:fs` over `fs`. | S7772 | 5min |
| `src/testscript/template.js` | 96 | Prefer top-level await over an async IIFE. | S7785 | 5min |
| `src/testscript/test-complete-print-workflow.js` | 12 | Prefer `node:https` over `https`. | S7772 | 5min |
| `src/testscript/test-complete-print-workflow.js` | 205 | Prefer `Number.parseInt` over `parseInt`. | S7773 | 2min |
| `src/testscript/test-complete-print-workflow.js` | 314 | Remove this useless assignment to variable "order". | S1854 | 1min |
| `src/testscript/test-complete-print-workflow.js` | 371 | Prefer top-level await over an async function `main` call. | S7785 | 5min |
| `src/testscript/test-customer-order-by-orderno.js` | 5 | Prefer `node:https` over `https`. | S7772 | 5min |
| `src/testscript/test-customer-order-by-orderno.js` | 130 | Prefer top-level await over an async IIFE. | S7785 | 5min |
| `src/testscript/test-customer-order-optimized.js` | 8 | Prefer `node:https` over `https`. | S7772 | 5min |
| `src/testscript/test-customer-order-optimized.js` | 209 | Prefer top-level await over using a promise chain. | S7785 | 5min |
| `src/testscript/test-customer-order-search-strategies.js` | 5 | Prefer `node:https` over `https`. | S7772 | 5min |
| `src/testscript/test-customer-order-search-strategies.js` | 204 | Prefer top-level await over using a promise chain. | S7785 | 5min |
| `src/testscript/test-customer-order-service.js` | 12 | Prefer `node:https` over `https`. | S7772 | 5min |
| `src/testscript/test-customer-order-service.js` | 13 | Prefer `node:fs` over `fs`. | S7772 | 5min |
| `src/testscript/test-customer-order-service.js` | 309 | Prefer top-level await over an async IIFE. | S7785 | 5min |
| `src/testscript/test-customer-order.js` | 6 | Prefer `node:https` over `https`. | S7772 | 5min |
| `src/testscript/test-customer-order.js` | 7 | Prefer `node:fs` over `fs`. | S7772 | 5min |
| `src/testscript/test-customer-order.js` | 110 | Prefer top-level await over an async IIFE. | S7785 | 5min |
| `src/testscript/test-print-api.js` | 14 | Prefer `node:fs` over `fs`. | S7772 | 5min |
| `src/testscript/test-print-api.js` | 15 | Prefer `node:path` over `path`. | S7772 | 5min |
| `src/testscript/test-print-api.js` | 155 | Prefer top-level await over an async function `main` call. | S7785 | 5min |
| `src/testscript/test-print-resultkey.js` | 11 | Prefer `node:https` over `https`. | S7772 | 5min |
| `src/testscript/test-print-resultkey.js` | 206 | Prefer top-level await over an async function `main` call. | S7785 | 5min |
| `src/testscript/test-shoporder-customer-fields.js` | 6 | Prefer `node:https` over `https`. | S7772 | 5min |
| `src/testscript/test-shoporder-customer-fields.js` | 213 | Prefer top-level await over using a promise chain. | S7785 | 5min |
| `src/testscript/validate-complete-workflow.js` | 7 | Prefer `node:https` over `https`. | S7772 | 5min |
| `src/testscript/validate-complete-workflow.js` | 8 | Prefer `node:fs` over `fs`. | S7772 | 5min |
| `src/testscript/validate-complete-workflow.js` | 195 | Prefer `Number.parseInt` over `parseInt`. | S7773 | 2min |
| `src/testscript/validate-complete-workflow.js` | 245 | Refactor this code to not use nested template literals. | S4624 | 10min |
| `src/testscript/validate-complete-workflow.js` | 310 | Refactor this code to not use nested template literals. | S4624 | 10min |
| `src/testscript/validate-complete-workflow.js` | 336 | Prefer top-level await over an async function `main` call. | S7785 | 5min |
| `vitest.config.mts` | 4 | Prefer `node:url` over `url`. | S7772 | 5min |

---

## 📈 Résumé

- **High**: 11 issues
- **Medium**: 134 issues

## 🔗 Liens utiles

- [SonarCloud Dashboard](https://sonarcloud.io/project/overview?id=morepudding_manufacturingPortal)
- [Toutes les issues](https://sonarcloud.io/project/issues?id=morepudding_manufacturingPortal)
