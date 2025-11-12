# IFS Endpoint Discovery (Projection Explorer)

Objectif : fournir à Copilot/Codex un point d'entrée LLM-friendly pour parcourir **l'intégralité** des APIs répertoriées dans _Projection Explorer_ d'IFS Cloud (exemple : `https://beneteau-group-ast.ifs.cloud/.../ProjExplorerPage`).  
Le but n'est plus de fouiller la doc locale, mais d'exposer les bons endpoints IFS disponibles côté AST et d'expliquer à quoi ils servent.

## Vision produit

- **Source officielle** : Projection Explorer (instances AST).
- **Sortie souhaitée** : réponse natural-language (Markdown) avec :
  - endpoint/projection (`Projection`, `Method`, `Path`) ;
  - description fonctionnelle synthétique ;
  - paramètres clés + payloads d'exemple ;
  - liens vers écrans ou ressources complémentaires.
- **Consommateurs** :
  1. humains (documentation interne) ;
  2. agents LLM (Copilot Chat, Codex).

## Contraintes & inconnues

- Accès réseau fortement limité en environnement repo → nécessitera soit une exportation manuelle, soit un connecteur hors repo.
- Projection Explorer n'offre pas d'API publique évidente :
  - besoin d'analyser les requêtes réseau (REST/gRPC ? WebSockets ?).
  - potentielle protection (authentification cookie SSO).
- Volume & format des données inconnus (HTML, JSON, OData metadata ?).
- Il faudra décider comment synchroniser les mises à jour (dump ponctuel vs. export automatisé).

## Hypothèses initiales à tester

1. **Scraping contrôlé** : possibilité d'extraire les métadonnées via script Playwright/Chromium avec login SSO → JSON/Markdown statique.
2. **Export IFS** : Projection Explorer peut peut-être exporter la structure des projections (à valider avec l'équipe AST).
3. **Fichier pivot** : générer un fichier unique (`ifs-endpoints.json`) stocké dans le repo puis indexé par les agents.
4. **MCP/Tooling** : exposer ce fichier via un MCP ou un CLI existant (ex. adapter `scripts/ifs-endpoint-finder/index.ts` pour lire le dump).

## Premiers livrables attendus

1. **Prototype d'extraction** (même manuel) qui produit un mini set d'endpoints depuis Projection Explorer.
2. **Schéma de données** décrivant comment stocker chaque endpoint :
   ```json
   {
     "projection": "PartHandling",
     "method": "Get",
     "path": "/PartHandling.svc/Parts",
     "summary": "Recherche de pièces",
     "parameters": [...],
     "examples": [...],
     "tags": ["part-printer", "inventory"]
   }
   ```
3. **Générateur de fiches Markdown** prenant ce JSON et produisant des fiches lisibles + prêtes pour un agent.
4. **Integration plan** avec MCP/Copilot (définir les prompts, endpoints, limitations).

## Etat actuel du repo

- `scripts/ifs-endpoint-finder/index.ts` : ancien outil de recherche _local docs_. Peut servir pour générer les fiches Markdown à partir d'un dump JSON à venir.
- `docs/tools/ifs-endpoint-finder/results/` : contiendra les fiches générées à partir des exports Projection Explorer.
- `docs/tools/ifs-endpoint-finder/ROADMAP.md` : feuille de route détaillée (à lire pour suivre l'avancement).
- `docs/tools/ifs-endpoint-finder/ARCHITECTURE.md` : description de l'outil global de cartographie (extractor → registry → MCP).

## Prochaines actions

1. Discuter avec AST pour comprendre les options d'export Projection Explorer.
2. Choisir une stratégie de collecte (scraping vs export).
3. Produire un premier dump minimal (même 5 endpoints) et le stocker dans le repo.
4. Adapter le script TypeScript existant pour consommer ce dump et générer la documentation.
5. Publier des rapports tests dans `results/`.
6. Monter progressivement en charge jusqu'à couvrir toutes les APIs, conformément à `ROADMAP.md` et `ARCHITECTURE.md`.
