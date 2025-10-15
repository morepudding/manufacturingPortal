# 🚀 Quick Start - Déploiement Vercel

Guide rapide pour déployer le Manufacturing Portal sur Vercel en 10 minutes.

---

## ⚡ Étapes Rapides

### 1️⃣ Créer le Repository GitHub (2 min)

```bash
# Initialiser Git (si pas déjà fait)
cd /home/rbottero/ManufacturingPortal
git init

# Ajouter tous les fichiers
git add .
git commit -m "feat: initial commit - Manufacturing Portal v2"

# Créer le repo sur GitHub et pousser
gh repo create ManufacturingPortal --private --source=. --remote=origin
git push -u origin main
```

**Ou via l'interface web** : [github.com/new](https://github.com/new)

---

### 2️⃣ Préparer les Variables d'Environnement (3 min)

Générer un secret NextAuth :

```bash
./scripts/generate-nextauth-secret.sh
# Copier le résultat
```

Préparer vos credentials dans un fichier temporaire (à supprimer après) :

```env
# IFS Cloud
IFS_BASE_URL=https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1
IFS_CLIENT_ID=***REMOVED***
IFS_CLIENT_SECRET=***REMOVED***
IFS_TOKEN_URL=https://beneteau-group-ast.ifs.cloud/auth/realms/beneast1/protocol/openid-connect/token
IFS_SCOPE=openid microprofile-jwt

# Azure AD
AZURE_AD_CLIENT_ID=<votre-client-id>
AZURE_AD_CLIENT_SECRET=<votre-secret>
AZURE_AD_TENANT_ID=<votre-tenant-id>

# NextAuth
NEXTAUTH_SECRET=<secret-généré>
NEXTAUTH_URL=https://[sera-défini-après].vercel.app

# Database (optionnel pour le moment)
DATABASE_USER=sa
DATABASE_PASSWORD=<password>
DATABASE_HOST=<host>
DATABASE_PORT=1433
DATABASE_NAME=ManufacturingPortal
```

---

### 3️⃣ Déployer sur Vercel (5 min)

#### Via l'interface web

1. Aller sur [vercel.com/new](https://vercel.com/new)
2. Se connecter avec GitHub
3. Importer `ManufacturingPortal`
4. Configurer :
   - **Framework** : Next.js (auto-détecté)
   - **Build Command** : `pnpm run build` (auto-détecté)
   - **Install Command** : `pnpm install`
5. **Ajouter les variables d'environnement** :
   - Copier-coller toutes les variables préparées à l'étape 2
   - Cocher `Production`, `Preview`, `Development`
6. Cliquer sur **Deploy**

#### Via CLI (alternative)

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Suivre les instructions interactives
```

---

### 4️⃣ Configuration Post-Déploiement (2 min)

Après le premier déploiement, récupérer l'URL Vercel :

```
https://manufacturing-portal-xyz.vercel.app
```

#### Mettre à jour NEXTAUTH_URL

Dans Vercel Dashboard → Settings → Environment Variables :

1. Éditer `NEXTAUTH_URL`
2. Remplacer par l'URL exacte : `https://manufacturing-portal-xyz.vercel.app`
3. Sauvegarder

#### Configurer Azure AD

1. Azure Portal → Azure AD → App registrations
2. Sélectionner votre app
3. Authentication → Add a redirect URI :
   ```
   https://manufacturing-portal-xyz.vercel.app/api/auth/callback/azure-ad
   ```
4. Sauvegarder

#### Redéployer

```bash
# Via CLI
vercel --prod

# Ou via interface : Deployments → Redeploy
```

---

## ✅ Tests

### Test 1 : Page d'accueil

Ouvrir : `https://manufacturing-portal-xyz.vercel.app`

Devrait afficher la page d'accueil du portal.

### Test 2 : API Health Check

```bash
curl https://manufacturing-portal-xyz.vercel.app/api/shared/health
```

**Attendu** :
```json
{
  "status": "ok",
  "timestamp": "2025-10-15T..."
}
```

### Test 3 : Authentification

1. Cliquer sur "Se connecter"
2. Se connecter avec Azure AD
3. Devrait rediriger vers le dashboard

### Test 4 : API Boat Configuration

```bash
curl -X POST https://manufacturing-portal-xyz.vercel.app/api/boat-configuration/shop-orders/search \
  -H "Content-Type: application/json" \
  -d '{"orderNo":"563","releaseNo":"*","sequenceNo":"*"}'
```

**Attendu** :
```json
{
  "success": true,
  "data": { ... }
}
```

---

## 🎉 C'est terminé !

Votre Manufacturing Portal est maintenant déployé sur Vercel !

### URLs importantes

- **Production** : `https://manufacturing-portal-xyz.vercel.app`
- **Dashboard Vercel** : [vercel.com/dashboard](https://vercel.com/dashboard)
- **GitHub Repo** : `https://github.com/<username>/ManufacturingPortal`

### Prochaines étapes

- 📊 Configurer le monitoring (Vercel Analytics)
- 🗄️ Migrer la database vers Azure SQL
- 🔄 Tester les preview deployments (créer une PR)
- 📱 Inviter les utilisateurs pour les tests

---

## 🆘 Problèmes ?

Consulter le guide complet : [docs/DEPLOYMENT.md](./DEPLOYMENT.md)

Ou vérifier les logs Vercel :
```bash
vercel logs --follow
```

---

## 📚 Ressources

- [Documentation Vercel](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Guide complet de déploiement](./DEPLOYMENT.md)
