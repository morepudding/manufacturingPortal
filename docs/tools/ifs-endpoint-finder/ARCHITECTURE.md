# 🧭 Architecture – Outil de cartographie globale des APIs IFS

Ce document décrit les briques fonctionnelles nécessaires pour construire un outil capable de cartographier toutes les APIs IFS référencées dans Projection Explorer et de les rendre consultables par une IA (Copilot/Codex).

## 1. Flux de traitement

```
Projection Explorer (UI) ──► Extractor ──► Raw JSON ──► Normalizer ──► Registry
                                                   │                     │
                                                   ▼                     ▼
                                             Evidence Store       Markdown Generator
                                                   │                     │
                                                   ▼                     ▼
                                             Validation Scripts      Search/MCP Tool
```

1. **Extractor**  
   - Automatisation Playwright/Puppeteer (ou script interne AST) qui visite Projection Explorer, paginate et récupère les lignes du tableau (API Name, Description, Component...).  
   - Pour chaque projection trouvée, déclenche la récupération des métadonnées (OData `$metadata`, documentation JSON/REST, etc.).  
   - Stocke la matière première dans `data/projection-explorer/raw/<timestamp>/`.

2. **Evidence Store**  
   - Conserve les artefacts source : réponses HTTP, exports CSV, captures éventuelles.  
   - Sert de preuve en cas de divergence (ex. API marquée active mais inaccessible).

3. **Normalizer**  
   - Convertit les formats hétérogènes (HTML table, OData XML) en JSON unifié.  
   - Applique des règles de nettoyage (trim, description longue vs courte).  
   - Ajoute des clés calculées (`slug`, `tags`, `serviceArea`).

4. **Registry**  
   - Fichier central `data/projection-explorer/ifs-api-registry.json`.  
   - Contient un enregistrement par projection + détails des méthodes.  
   - Versionné dans Git pour obtenir l’historique des évolutions.

5. **Markdown Generator**  
   - Script (extension de `scripts/ifs-endpoint-finder/index.ts`) qui lit le registre et produit :
     - fiches par API (`docs/tools/ifs-endpoint-finder/results/<slug>.md`);
     - un index global (`docs/tools/ifs-endpoint-finder/INDEX.md`).

6. **Validation Scripts**  
   - Tests automatisés (`scripts/test-ifs-endpoints-metadata.ts`) vérifiant :
     - cohérence des statuts Active/Deprecated ;
     - existence d’au moins une méthode/documentation par API ;
     - alignement des catégories et composants avec référentiel AST.

7. **Search/MCP Tool**  
   - Interface CLI ou MCP exposant une recherche mot-clé / filtre multi-critères.  
   - Réponses formatées pour l’IA avec résumé, endpoints, liens vers fiches détaillées.

## 2. Modèle de données (registry)

```json
{
  "apiName": "CostRevenueElementPerCodePartValueHandling",
  "description": "Cost/Revenue Element per Code Part Value",
  "component": "ACCRUL",
  "categories": ["Users"],
  "layer": "Core",
  "apiClass": "Standard",
  "status": { "active": true, "deprecated": false },
  "source": {
    "projectionExplorerUrl": "https://beneteau-group-ast.ifs.cloud/.../ProjectExplorer?projection=CostRevenue...",
    "metadataUrl": "https://.../CostRevenueElementPerCodePartValueHandling.svc/$metadata",
    "capturedAt": "2025-02-14T15:20:00Z"
  },
  "methods": [
    {
      "verb": "GET",
      "path": "/CostRevenueElementPerCodePartValueHandling.svc/CostRevenueElementPerCodePartValue",
      "summary": "Liste les éléments coût/revenu par code part.",
      "parameters": [
        { "name": "company", "in": "query", "type": "string", "required": true }
      ],
      "examples": {
        "curl": "curl ...",
        "typescript": "await client.getCostRevenueElementPerCodePartValue(...)"
      }
    }
  ],
  "tags": ["finance", "accounting", "chart-of-accounts"]
}
```

## 3. Considérations techniques

- **Authentification** : prévoir un mécanisme pour injecter les cookies/headers nécessaires dans l’extractor sans les stocker en clair dans Git.
- **Pagination & performance** : la table Projection Explorer peut compter plusieurs centaines d’entrées → utiliser scrolling infini ou requêtes directes aux endpoints sous-jacents.
- **Détection des changements** : comparer le nouveau registre avec le précédent et générer un diff (`scripts/ifs-endpoint-finder/diff.ts` à créer).
- **Internationalisation** : descriptions disponibles en anglais ? Si oui, stocker la langue (`description_fr`, `description_en`).
- **Sécurité** : anonymiser les éventuelles données sensibles avant commit.

## 4. Intégration IA

- **Mode CLI** : `yarn ts-node scripts/ifs-endpoint-finder/index.ts --registry data/projection-explorer/ifs-api-registry.json --query "accounting period"`.
- **Mode MCP** : exposer un tool `ifsApiLookup` avec paramètres `query`, `filters` (component, layer, status).
- **Prompting** : définir un guide pour Copilot/Codex indiquant comment utiliser le tool et interpréter les résultats.

## 5. Plan de livraison (synthèse)

| Sprint | Livrable clé | Description |
|--------|--------------|-------------|
| S1 | Extractor PoC | Script manuel + 10 APIs exportées |
| S2 | Registry initial | JSON structuré + générateur Markdown |
| S3 | Validation + CLI | Tests de cohérence + recherche locale |
| S4 | MCP & automatisation | Intégration Copilot + pipeline de refresh |
| S5 | Couverture globale | 100% des modules + alertes sur changements |

> Cette architecture est volontairement modulaire pour permettre des itérations rapides : commence par un petit échantillon, puis étends la couverture et la sophistication (scoring sémantique, tags métiers, etc.).
