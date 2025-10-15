# 🚀 Roadmap – Cartographie complète des APIs IFS

Ce document suit la progression vers un outil capable de cartographier l'intégralité des endpoints IFS en s'appuyant sur Projection Explorer (AST) et de rendre cette connaissance exploitable par humains & agents LLM.

## Vision cible

- **Couverture** : 100% des projections exposées dans Projection Explorer (Core + Industry Solutions).
- **Données** : tableau structuré incluant nom API, description, composant, couche, classe, statut (active/dépréciée), méthodes, chemins REST/OData, paramètres clés, payloads d'exemple.
- **Exports** : JSON unifié (`ifs-api-registry.json`) + fiches Markdown prêtes à être consommées par Copilot/Codex.
- **Accès** : outil CLI/MCP permettant de requêter “Quel endpoint pour gérer AccountingPeriodsHandling ?” et d'obtenir réponse + extraits doc.

## Phase 0 – Préparation (en cours)

- [ ] **Cartographier l'accès Projection Explorer**
  - Comprendre les besoins d'authentification (SSO, tokens).
  - Identifier les URLs exactes utilisées pour récupérer les données (browser devtools).
- [ ] **Recenser les attentes métiers**
  - Quels modules/endpoints sont prioritaires ?
  - Quel niveau de détail est nécessaire (payloads, filtres, use-cases) ?
- [ ] **Définir le schéma cible**
  - Mapper les champs souhaités (projection, méthode, path, description, tags).
  - Décider du format de stockage (`.json` initial puis `Markdown` généré).

## Phase 1 – Extraction initiale (prototype ponctuel)

- [ ] **Approche A : capture réseau**
  - Utiliser Playwright/Chromium pour charger Projection Explorer et enregistrer les réponses JSON.
  - Valider que les requêtes sont exploitables hors contexte (pas d'obfuscation).
- [ ] **Approche B : export IFS natif**
  - Vérifier si Projection Explorer propose une fonction d'export (CSV/Excel/JSON).
  - Alternativement, demander à AST si une API officielle existe déjà.
- [ ] **Produire un mini-dataset**
  - Sélectionner 5-10 endpoints représentatifs.
  - Nettoyer les données et sauvegarder dans `data/projection-explorer/seed.json`.
- [ ] **Documenter la procédure**
  - Ajouter un guide d'extraction (`docs/tools/ifs-endpoint-finder/EXTRACTION_GUIDE.md`).

## Phase 2 – Génération de documentation

- [ ] **Transformer JSON → Markdown**
  - Étendre `scripts/ifs-endpoint-finder/index.ts` pour lire le dump JSON et générer des fiches.
  - Produire des templates Markdown uniformisés (`results/<projection>-<method>.md`).
- [ ] **Indexation & recherche**
  - Mettre à jour l'outil pour répondre à `--query` en s'appuyant sur le nouveau dataset.
  - Ajouter métadonnées (tags, services, produits).
- [ ] **Validation métier**
  - Faire relire les fiches par un référent AST.
  - Marquer les endpoints validés et ceux à confirmer.

## Phase 3 – Exposition initiale aux agents LLM

- [ ] **Exposer un MCP / CLI**
  - Définir un endpoint `lookupProjectionEndpoint`.
  - Retourner les extraits Markdown ou JSON en réponse.
- [ ] **Branche Copilot / Codex**
  - Configurer le fichier `.copilot/chat` (ou équivalent) pour interroger le MCP.
  - Rédiger un guide d'utilisation pour les développeurs.
- [ ] **Feedback loop**
  - Collecter les requêtes fréquentes.
  - Améliorer la pertinence (scoring, alias, auto-tagging).

## Phase 4 – Scalabilité & couverture complète

- [ ] **Automatiser l'inventaire complet**
  - Faire tourner l'extraction sur toutes les catégories (Finance, Manufacturing, Supply Chain...).
  - Détecter les nouvelles APIs à chaque exécution.
- [ ] **Consolider un registre global**
  - Fusionner les exports en un fichier unique (`data/projection-explorer/ifs-api-registry.json`).
  - Ajouter les métadonnées Tableau (Component, Categories, Layer, API Class, Active, Deprecated).
- [ ] **Génération massive de fiches**
  - Produire/mettre à jour automatiquement les Markdown dans `docs/tools/ifs-endpoint-finder/results/`.
  - Générer un index synthétique (ex. `docs/tools/ifs-endpoint-finder/INDEX.md`).
- [ ] **Qualité & validation**
  - Marquer le statut de validation (✅ validé, ⚠️ en attente AST).
  - Ajouter tests automatisés (`scripts/test-ifs-endpoints-metadata.ts`) pour vérifier cohérence (ex. champ `Active` vs disponibilité API).

## Phase 5 – Intégration continue & gouvernance

- [ ] **Pipeline CI/CD**
  - Planifier des refresh (hebdo/mensuel).
  - Publier un diff (changements dans les APIs) à chaque build.
- [ ] **Alerting**
  - Notifier lors d'une dépréciation ou apparition d'une nouvelle API critique.
- [ ] **Expérience IA étendue**
  - Ajouter une classification par cas d'usage (Finance, Part Printer, Boat Config...).
  - Implémenter un `semantic search` (vectorisation du contenu doc).
- [ ] **Gouvernance**
  - Définir les responsables (contact AST, contact doc interne).
  - Documenter la procédure de validation avant diffusion dans l'organisation.

## Observations & questions ouvertes

- **Sécurité** : vérifier les obligations côté AST avant toute automatisation.
- **Mises à jour** : faut-il un refresh quotidien, hebdo, manuel ?
- **Périmètre** : se concentre-t-on sur Part Printer ou l'ensemble des outils (Boat Configuration, etc.) ?
- **Dependencies** : Playwright, puppeteer, ou outils internes AST ?

## Suivi d'avancement

| Phase | Statut | Notes |
|-------|--------|-------|
| Phase 0 | 🟡 En cours | En attente retour AST sur export |
| Phase 1 | 🔴 À démarrer | Choisir approche A ou B |
| Phase 2 | 🔴 À faire | Bloqué par dataset initial |
| Phase 3 | 🔴 À faire | Dépend de la phase 2 |
| Phase 4 | 🔴 À faire | Nécessite pipeline d'extraction fiable |
| Phase 5 | 🔴 À faire | Dépend de la gouvernance AST |

> Mettre à jour cette roadmap à chaque atelier ou décision clé afin de garder une trace claire des expérimentations réussies (ou abandonnées).
