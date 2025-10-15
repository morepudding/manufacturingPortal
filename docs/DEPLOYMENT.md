# 🚀 Guide de Déploiement - Manufacturing Portal

**Version** : 1.0.0  
**Dernière mise à jour** : 15 octobre 2025  
**Plateforme** : Vercel (Tests & Développement)  
**Future plateforme** : Azure (Production - TBD)

---

## 📋 Vue d'ensemble

Ce guide couvre le déploiement du Manufacturing Portal sur **Vercel** pour les phases de tests et développement. Le déploiement final sur **Azure** sera documenté ultérieurement.

### Pourquoi Vercel ?

- ✅ **Déploiement rapide** : Intégration GitHub automatique
- ✅ **Preview deployments** : Chaque PR génère un environnement de test
- ✅ **Zero config** : Next.js optimisé par défaut
- ✅ **SSL automatique** : HTTPS gratuit
- ✅ **Logs en temps réel** : Debugging facilité
- ✅ **Variables d'environnement** : Gestion sécurisée des secrets

### Prérequis

- ✅ Compte GitHub
- ✅ Compte Vercel (gratuit ou Team)
- ✅ Accès aux credentials IFS Cloud
- ✅ Accès aux credentials Azure AD
- ✅ Git installé localement

---

## 🐙 Étape 1 : Créer le Repository GitHub

### 1.1 Initialiser Git localement

```bash
# Si pas encore initialisé
cd /home/rbottero/ManufacturingPortal
git init

# Vérifier le status
git status

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "feat: initial commit - Manufacturing Portal v2"
```

### 1.2 Créer le repository sur GitHub

**Option A : Via l'interface GitHub**

1. Aller sur [https://github.com/new](https://github.com/new)
2. Remplir les informations :
   - **Repository name** : `ManufacturingPortal`
   - **Description** : `🏭 Manufacturing Portal - Plateforme multi-outils pour Bénéteau`
   - **Visibility** : `Private` (recommandé pour le code d'entreprise)
   - ⚠️ **Ne PAS** initialiser avec README, .gitignore, ou license (déjà existants localement)
3. Cliquer sur **Create repository**

**Option B : Via GitHub CLI**

```bash
# Installer GitHub CLI si nécessaire
# https://cli.github.com/

# Authentification
gh auth login

# Créer le repo
gh repo create ManufacturingPortal --private --source=. --remote=origin

# Pousser le code
git push -u origin main
```

### 1.3 Pousser le code initial

```bash
# Ajouter le remote (si créé via interface web)
git remote add origin https://github.com/<votre-username>/ManufacturingPortal.git

# Vérifier la branche principale
git branch -M main

# Pousser le code
git push -u origin main
```

### 1.4 Vérifier la structure GitHub

Votre repo GitHub doit contenir :

```
✅ .github/
   └── copilot-instructions.md
✅ docs/
✅ public/
✅ scripts/
✅ src/
✅ .gitignore
✅ next.config.js
✅ package.json
✅ README.md
✅ tsconfig.json
❌ .env.local (doit être exclu par .gitignore)
❌ node_modules/ (doit être exclu)
```

---

## 🔷 Étape 2 : Créer un fichier .env.example

Pour documenter les variables d'environnement nécessaires, créez un fichier `.env.example` :

```bash
# Ce fichier sera versionné dans Git (pas de valeurs sensibles)
touch .env.example
```

**Contenu du fichier `.env.example`** :

```env
# =============================================================================
# CONFIGURATION IFS CLOUD (OAuth2)
# =============================================================================
# Base URL de l'API IFS OData
IFS_BASE_URL=https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1

# Client ID de l'application IFS
IFS_CLIENT_ID=AIS_IFS_MA_AST

# Client Secret (à récupérer auprès de l'admin IFS)
IFS_CLIENT_SECRET=your_secret_here

# URL du serveur d'authentification OAuth2
IFS_TOKEN_URL=https://beneteau-group-ast.ifs.cloud/auth/realms/beneast1/protocol/openid-connect/token

# Scopes OAuth2 requis
IFS_SCOPE=openid microprofile-jwt

# =============================================================================
# CONFIGURATION AZURE AD (NextAuth.js)
# =============================================================================
# Client ID de l'App Registration Azure AD
AZURE_AD_CLIENT_ID=your_client_id

# Client Secret de l'App Registration
AZURE_AD_CLIENT_SECRET=your_secret

# Tenant ID Azure AD
AZURE_AD_TENANT_ID=your_tenant_id

# URL de base de l'application (sera différent en production)
NEXTAUTH_URL=http://localhost:3000

# Secret pour signer les tokens NextAuth (générer avec: openssl rand -base64 32)
NEXTAUTH_SECRET=your_generated_secret

# =============================================================================
# CONFIGURATION DATABASE (SQL Server)
# =============================================================================
# Note: Pour Vercel, utiliser une base de données cloud (Azure SQL, PlanetScale, etc.)
DATABASE_USER=sa
DATABASE_PASSWORD=your_password
DATABASE_HOST=your_host
DATABASE_PORT=1433
DATABASE_NAME=your_database
AZURE_SQL_AUTHENTICATIONTYPE=default

# =============================================================================
# CONFIGURATION ENVIRONNEMENT
# =============================================================================
NODE_ENV=production

# =============================================================================
# VERCEL (automatiquement injectées par Vercel)
# =============================================================================
# VERCEL=1
# VERCEL_ENV=production
# VERCEL_URL=your-app.vercel.app
```

**Commiter le fichier** :

```bash
git add .env.example
git commit -m "docs: add environment variables example"
git push origin main
```

---

## ☁️ Étape 3 : Déployer sur Vercel

### 3.1 Créer un compte Vercel

1. Aller sur [https://vercel.com/signup](https://vercel.com/signup)
2. S'inscrire avec votre compte GitHub
3. Autoriser Vercel à accéder à vos repositories

### 3.2 Importer le projet

**Option A : Via l'interface Vercel**

1. Cliquer sur **"Add New..."** → **"Project"**
2. Sélectionner **"Import Git Repository"**
3. Chercher et sélectionner `ManufacturingPortal`
4. Cliquer sur **"Import"**

**Option B : Via Vercel CLI**

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
cd /home/rbottero/ManufacturingPortal
vercel

# Suivre les instructions :
# ? Set up and deploy "~/ManufacturingPortal"? [Y/n] Y
# ? Which scope do you want to deploy to? <votre-scope>
# ? Link to existing project? [y/N] N
# ? What's your project's name? ManufacturingPortal
# ? In which directory is your code located? ./
```

### 3.3 Configurer le projet Vercel

#### Configuration Build & Output

Vercel détecte automatiquement Next.js, mais vérifiez :

- **Framework Preset** : Next.js
- **Build Command** : `next build`
- **Output Directory** : `.next`
- **Install Command** : `pnpm install`
- **Node Version** : 20.x (ou 18.x minimum)

#### Configuration Root Directory

Si votre code est à la racine, laisser par défaut `./`

### 3.4 Configurer les variables d'environnement

Dans le dashboard Vercel :

1. Aller dans **Settings** → **Environment Variables**
2. Ajouter **TOUTES** les variables du fichier `.env.example`
3. Pour chaque variable :
   - **Name** : Nom de la variable (ex: `IFS_BASE_URL`)
   - **Value** : Valeur réelle (secrets inclus)
   - **Environment** : Cocher `Production`, `Preview`, et `Development`

#### Variables critiques à configurer :

```env
# IFS Cloud
IFS_BASE_URL=https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1
IFS_CLIENT_ID=AIS_IFS_MA_AST
IFS_CLIENT_SECRET=ifiW7xzKNmj3a1fpEukFIImPFztb51R9
IFS_TOKEN_URL=https://beneteau-group-ast.ifs.cloud/auth/realms/beneast1/protocol/openid-connect/token
IFS_SCOPE=openid microprofile-jwt

# Azure AD
AZURE_AD_CLIENT_ID=<votre-client-id>
AZURE_AD_CLIENT_SECRET=<votre-secret>
AZURE_AD_TENANT_ID=<votre-tenant-id>

# NextAuth (générer un nouveau secret pour production)
NEXTAUTH_SECRET=<généré-avec-openssl-rand-base64-32>
NEXTAUTH_URL=https://votre-app.vercel.app

# Database (si cloud)
DATABASE_USER=<user>
DATABASE_PASSWORD=<password>
DATABASE_HOST=<host>
DATABASE_PORT=1433
DATABASE_NAME=<database>
```

⚠️ **IMPORTANT** : Pour `NEXTAUTH_URL`, utilisez l'URL Vercel exacte (fournie après le premier déploiement)

### 3.5 Déployer

Cliquer sur **"Deploy"** ou :

```bash
vercel --prod
```

Le déploiement prend environ 2-5 minutes.

---

## 🔧 Étape 4 : Configuration Post-Déploiement

### 4.1 Configurer Azure AD Redirect URI

1. Aller sur [Azure Portal](https://portal.azure.com)
2. Naviguer vers **Azure Active Directory** → **App registrations**
3. Sélectionner votre application
4. Aller dans **Authentication**
5. Ajouter un **Redirect URI** :
   ```
   https://votre-app.vercel.app/api/auth/callback/azure-ad
   ```
6. Sauvegarder

### 4.2 Mettre à jour NEXTAUTH_URL

1. Copier l'URL de déploiement Vercel (ex: `https://manufacturing-portal.vercel.app`)
2. Dans Vercel → **Settings** → **Environment Variables**
3. Éditer `NEXTAUTH_URL` avec l'URL exacte
4. Redéployer l'application :
   ```bash
   vercel --prod
   ```

### 4.3 Tester les APIs

#### Test 1 : Health Check

```bash
curl https://votre-app.vercel.app/api/shared/health
```

**Réponse attendue** :
```json
{
  "status": "ok",
  "timestamp": "2025-10-15T10:30:00.000Z",
  "services": {
    "database": "connected",
    "ifs": "authenticated"
  }
}
```

#### Test 2 : Shop Orders (Boat Configuration)

```bash
curl -X POST https://votre-app.vercel.app/api/boat-configuration/shop-orders/search \
  -H "Content-Type: application/json" \
  -d '{
    "orderNo": "563",
    "releaseNo": "*",
    "sequenceNo": "*"
  }'
```

#### Test 3 : Printers (Shared)

```bash
curl https://votre-app.vercel.app/api/shared/printers
```

### 4.4 Vérifier les logs

Dans le dashboard Vercel :

1. Aller dans **Deployments**
2. Cliquer sur le déploiement actif
3. Onglet **Functions** → Logs en temps réel

Rechercher les erreurs potentielles :
- `❌ IFS Client Error`
- `❌ Failed to fetch`
- `❌ Authentication error`

---

## 🌲 Étape 5 : Configurer les Branches & Preview

### 5.1 Stratégie de branches

```
main (production)
  ↳ develop (staging)
      ↳ feature/my-feature (preview)
```

### 5.2 Configurer les environnements Vercel

Dans Vercel → **Settings** → **Git** :

- **Production Branch** : `main`
- **Preview Branches** : Toutes les branches
- **Auto-deploy** : ✅ Activé

### 5.3 Workflow de développement

```bash
# Créer une feature branch
git checkout -b feature/part-printer-phase2

# Développer...
# ...

# Commit et push
git add .
git commit -m "feat(part-printer): add filter panel"
git push origin feature/part-printer-phase2
```

➡️ **Vercel génère automatiquement** une URL de preview :
```
https://manufacturing-portal-git-feature-part-printer-phase2.vercel.app
```

### 5.4 Process de merge

```bash
# Créer une Pull Request sur GitHub
gh pr create --title "feat: Part Printer Phase 2" --body "..."

# Après review et tests sur la preview URL
gh pr merge
```

➡️ Le merge vers `main` déclenche un **déploiement production automatique**

---

## 🔐 Étape 6 : Sécurité & Best Practices

### 6.1 Secrets Management

✅ **Faire** :
- Stocker TOUS les secrets dans Vercel Environment Variables
- Ne JAMAIS commiter `.env.local` ou `.env`
- Utiliser des secrets différents entre Dev/Preview/Production
- Régénérer `NEXTAUTH_SECRET` pour chaque environnement

❌ **Ne JAMAIS** :
- Commiter des credentials dans Git
- Partager des secrets par email/Slack
- Réutiliser le même secret entre environnements

### 6.2 Variables d'environnement par environnement

| Variable | Development | Preview | Production |
|----------|-------------|---------|------------|
| `IFS_BASE_URL` | AST | AST | PROD (future) |
| `IFS_CLIENT_ID` | Test | Test | Prod |
| `NEXTAUTH_URL` | localhost:3000 | preview-url | prod-url |
| `NEXTAUTH_SECRET` | dev-secret | preview-secret | prod-secret |

### 6.3 IP Whitelisting (Optionnel)

Si IFS Cloud requiert une IP whitelisting :

1. Demander les IPs Vercel :
   ```bash
   curl https://api.vercel.com/v1/edge-config/vercel-system-ip-addresses/items/ipv4
   ```
2. Fournir la liste au team IFS pour whitelisting

### 6.4 Rate Limiting

Activer dans `next.config.js` :

```javascript
const nextConfig = {
  output: "standalone",
  experimental: {
    // Rate limiting pour les API Routes
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Headers de sécurité
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ]
  },
}
```

---

## 🗄️ Étape 7 : Base de Données en Production

### Problème : Docker SQL Server local non accessible depuis Vercel

⚠️ Votre configuration actuelle (`localhost:1433`) **ne fonctionnera PAS** sur Vercel.

### Solutions pour la BDD sur Vercel

#### Option 1 : Azure SQL Database (Recommandé)

**Avantages** :
- ✅ Compatible avec la future migration Azure
- ✅ Haute disponibilité
- ✅ Backups automatiques
- ✅ Sécurisé avec Azure AD

**Setup** :

1. Créer une Azure SQL Database
2. Configurer le firewall pour autoriser les IPs Vercel
3. Mettre à jour les variables d'environnement Vercel :

```env
DATABASE_HOST=your-server.database.windows.net
DATABASE_USER=your-admin
DATABASE_PASSWORD=your-password
DATABASE_NAME=ManufacturingPortal
AZURE_SQL_AUTHENTICATIONTYPE=default
```

#### Option 2 : PlanetScale (Alternative)

**Avantages** :
- ✅ Serverless MySQL
- ✅ Scaling automatique
- ✅ Plan gratuit disponible

**Setup** :

```bash
# Installer PlanetScale CLI
brew install planetscale/tap/pscale  # macOS
# ou télécharger depuis https://planetscale.com/cli

# Se connecter
pscale auth login

# Créer une database
pscale database create manufacturing-portal

# Créer un connection string
pscale connection-string manufacturing-portal
```

Ajouter dans Vercel :
```env
DATABASE_URL=mysql://user:password@host/database?sslaccept=strict
```

#### Option 3 : Désactiver temporairement la BDD

Si la BDD n'est pas encore critique :

```typescript
// src/shared/services/database.ts
export async function getDatabaseConnection() {
  if (process.env.VERCEL) {
    console.warn('⚠️ Database not configured on Vercel')
    return null
  }
  // Logic normale...
}
```

---

## 📊 Étape 8 : Monitoring & Logging

### 8.1 Vercel Analytics (Inclus)

Activé automatiquement :
- **Real User Monitoring** : Temps de chargement réels
- **Web Vitals** : Core Web Vitals (LCP, FID, CLS)
- **API Latency** : Temps de réponse des API Routes

Voir dans Vercel → **Analytics**

### 8.2 Vercel Logs

Accès en temps réel :

```bash
# Via CLI
vercel logs --follow

# Via interface web
Deployments → [Deployment] → Runtime Logs
```

### 8.3 Logger personnalisé

Créer un logger structuré dans `src/core/lib/logger.ts` :

```typescript
export const logger = {
  info: (message: string, meta?: Record<string, any>) => {
    console.log(JSON.stringify({
      level: 'info',
      message,
      timestamp: new Date().toISOString(),
      ...meta,
    }))
  },
  error: (message: string, error?: Error, meta?: Record<string, any>) => {
    console.error(JSON.stringify({
      level: 'error',
      message,
      error: error?.message,
      stack: error?.stack,
      timestamp: new Date().toISOString(),
      ...meta,
    }))
  },
}
```

Utiliser dans les API Routes :

```typescript
import { logger } from '@/core/lib/logger'

export async function GET(request: Request) {
  logger.info('Fetching shop orders', { method: 'GET' })
  
  try {
    // ...
  } catch (error) {
    logger.error('Failed to fetch shop orders', error as Error, {
      url: request.url,
    })
  }
}
```

### 8.4 Intégrations tierces (Optionnel)

- **Sentry** : Error tracking
- **Datadog** : APM complet
- **LogRocket** : Session replay

```bash
# Exemple avec Sentry
pnpm add @sentry/nextjs

# Initialiser
npx @sentry/wizard@latest -i nextjs
```

---

## 🚨 Troubleshooting

### Problème 1 : Build Failed

**Erreur** : `Type error: Cannot find module...`

**Solution** :
```bash
# Localement
pnpm run build

# Si ça passe localement, vérifier :
# 1. Les chemins d'import (case-sensitive sur Vercel)
# 2. Les fichiers manquants dans .gitignore
```

### Problème 2 : API Routes 500 Error

**Erreur** : `Internal Server Error`

**Solution** :
1. Vérifier les logs Vercel
2. Tester les variables d'environnement :
   ```typescript
   console.log('IFS_BASE_URL:', process.env.IFS_BASE_URL)
   ```
3. Vérifier que toutes les variables sont définies pour l'environnement `Production`

### Problème 3 : OAuth2 IFS ne fonctionne pas

**Erreur** : `Failed to fetch access token`

**Solution** :
1. Vérifier `IFS_CLIENT_SECRET` dans Vercel
2. Vérifier que l'IP Vercel est whitelistée dans IFS
3. Tester manuellement le endpoint OAuth2 :
   ```bash
   curl -X POST https://beneteau-group-ast.ifs.cloud/auth/realms/beneast1/protocol/openid-connect/token \
     -d "grant_type=client_credentials" \
     -d "client_id=AIS_IFS_MA_AST" \
     -d "client_secret=<secret>" \
     -d "scope=openid microprofile-jwt"
   ```

### Problème 4 : NextAuth Redirect Error

**Erreur** : `[next-auth][error][CALLBACK_URL_ERROR]`

**Solution** :
1. Vérifier `NEXTAUTH_URL` dans Vercel (doit être l'URL exacte)
2. Vérifier le Redirect URI dans Azure AD
3. S'assurer que `NEXTAUTH_SECRET` est défini

### Problème 5 : Database Connection Failed

**Erreur** : `Cannot connect to database`

**Solution** :
1. Vérifier si la BDD locale est accessible depuis Vercel (non)
2. Migrer vers Azure SQL ou PlanetScale (voir Étape 7)
3. Désactiver temporairement les routes DB-dependent

### Problème 6 : Deployment Timeout

**Erreur** : `Build exceeded maximum duration`

**Solution** :
```javascript
// next.config.js
const nextConfig = {
  output: "standalone",
  // Désactiver les linters en build (déjà fait en dev)
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}
```

---

## 📋 Checklist de Déploiement

### Avant le premier déploiement

- [ ] Repository GitHub créé et code pushé
- [ ] `.env.example` créé et versionné
- [ ] `.gitignore` correctement configuré (exclut `.env.local`)
- [ ] Compte Vercel créé et connecté à GitHub
- [ ] Variables d'environnement préparées (IFS, Azure AD)
- [ ] Azure AD Redirect URI configuré (localhost pour tests)

### Déploiement initial

- [ ] Projet importé sur Vercel depuis GitHub
- [ ] Build Command : `next build`
- [ ] Output Directory : `.next`
- [ ] Install Command : `pnpm install`
- [ ] Node Version : 18.x ou 20.x
- [ ] Variables d'environnement configurées (toutes)
- [ ] Premier déploiement lancé

### Post-déploiement

- [ ] URL Vercel copiée (ex: `manufacturing-portal.vercel.app`)
- [ ] `NEXTAUTH_URL` mis à jour avec l'URL Vercel
- [ ] Azure AD Redirect URI ajouté : `https://[app].vercel.app/api/auth/callback/azure-ad`
- [ ] Redéploiement effectué après config NextAuth
- [ ] Tests des endpoints API (health, shop-orders, printers)
- [ ] Tests d'authentification Azure AD
- [ ] Vérification des logs Vercel (pas d'erreurs critiques)

### Configuration continue

- [ ] Preview deployments activés pour toutes les branches
- [ ] Protection de branche `main` configurée (require PR)
- [ ] Notifications Slack/Email configurées (optionnel)
- [ ] Monitoring activé (Vercel Analytics)
- [ ] Plan database cloud défini (Azure SQL / PlanetScale)

---

## 🔮 Prochaines Étapes : Migration Azure

### Timeline prévue : Q2-Q3 2026

Le déploiement final sera sur **Azure** avec l'architecture suivante :

```
Azure Front Door
      ↓
Azure App Service (Next.js)
      ↓
    ┌─────────────────┬─────────────────┐
    ↓                 ↓                 ↓
Azure SQL      Azure AD          IFS Cloud
Database       Authentication    (OData API)
```

### Ressources Azure nécessaires

- **Azure App Service** : Hébergement Next.js
- **Azure SQL Database** : Base de données production
- **Azure AD** : Authentification (déjà configuré)
- **Azure Front Door** : CDN + WAF
- **Azure Key Vault** : Gestion des secrets
- **Azure Monitor** : Logs + APM

### Documentation à venir

Un guide de migration Vercel → Azure sera créé quand les spécifications seront définies.

---

## 📞 Support

### Questions sur le déploiement Vercel

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Vercel Discord](https://vercel.com/discord)

### Issues GitHub

Pour reporter un problème de déploiement, créer une issue avec :
- Label : `deployment`
- Description du problème
- Logs Vercel (anonymisés)
- Variables d'environnement utilisées (SANS les secrets)

---

## 📝 Changelog

### v1.0.0 - 2025-10-15

- ✅ Guide initial de déploiement Vercel
- ✅ Configuration GitHub
- ✅ Configuration variables d'environnement
- ✅ Setup Azure AD redirect
- ✅ Troubleshooting commun

---

**Maintenu par** : Équipe Manufacturing Portal  
**Plateforme actuelle** : Vercel  
**Plateforme future** : Azure (TBD)
