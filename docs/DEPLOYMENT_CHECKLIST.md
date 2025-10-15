# ✅ Checklist de Déploiement - Manufacturing Portal

Utilisez cette checklist avant chaque déploiement pour vous assurer que tout est prêt.

---

## 📋 Avant le Premier Déploiement

### Repository GitHub

- [ ] Repository GitHub créé (`ManufacturingPortal`)
- [ ] Code local committé et pushé sur `main`
- [ ] `.env.example` créé et versionné
- [ ] `.gitignore` correctement configuré (exclut `.env.local`, `node_modules/`)
- [ ] README.md à jour avec les instructions de déploiement
- [ ] Branche `main` protégée (require PR, status checks)

### Credentials & Secrets

- [ ] Client ID IFS récupéré
- [ ] Client Secret IFS récupéré (gardé secret)
- [ ] Azure AD App Registration créée
- [ ] Azure AD Client ID récupéré
- [ ] Azure AD Client Secret créé (gardé secret)
- [ ] Azure AD Tenant ID récupéré
- [ ] `NEXTAUTH_SECRET` généré avec `./scripts/generate-nextauth-secret.sh`
- [ ] Tous les secrets sauvegardés dans un gestionnaire de mots de passe (1Password, etc.)

### Build Local

- [ ] `pnpm install` fonctionne sans erreur
- [ ] `pnpm run lint` passe sans erreur
- [ ] `pnpm run build` réussit localement
- [ ] Application démarre avec `pnpm run dev`
- [ ] Tests passent : `pnpm run test`
- [ ] Pas de fichiers `.env.local` ou secrets committés dans Git

---

## 🚀 Déploiement Vercel Initial

### Configuration Vercel

- [ ] Compte Vercel créé et connecté à GitHub
- [ ] Projet Vercel créé depuis le repository GitHub
- [ ] Framework détecté : Next.js
- [ ] Build Command : `next build` (auto)
- [ ] Install Command : `pnpm install`
- [ ] Output Directory : `.next` (auto)
- [ ] Node.js Version : 20.x
- [ ] Region : Paris (cdg1) ou la plus proche

### Variables d'Environnement Vercel

- [ ] `IFS_BASE_URL` configurée
- [ ] `IFS_CLIENT_ID` configurée
- [ ] `IFS_CLIENT_SECRET` configurée
- [ ] `IFS_TOKEN_URL` configurée
- [ ] `IFS_SCOPE` configurée
- [ ] `AZURE_AD_CLIENT_ID` configurée
- [ ] `AZURE_AD_CLIENT_SECRET` configurée
- [ ] `AZURE_AD_TENANT_ID` configurée
- [ ] `NEXTAUTH_SECRET` configurée (secret DIFFÉRENT de dev)
- [ ] `NEXTAUTH_URL` configurée (sera mise à jour après déploiement)
- [ ] Toutes les variables définies pour : Production ✅ Preview ✅ Development ✅
- [ ] `DATABASE_*` configurées (si base cloud disponible)

### Déploiement

- [ ] Premier déploiement lancé
- [ ] Build réussit (pas d'erreurs)
- [ ] Déploiement terminé avec succès
- [ ] URL de production récupérée (ex: `manufacturing-portal-xyz.vercel.app`)

---

## 🔧 Post-Déploiement

### Configuration NEXTAUTH_URL

- [ ] URL Vercel copiée
- [ ] `NEXTAUTH_URL` mise à jour dans Vercel Environment Variables
- [ ] Valeur exacte : `https://manufacturing-portal-xyz.vercel.app`
- [ ] Redéploiement effectué pour prendre en compte la nouvelle valeur

### Configuration Azure AD

- [ ] Azure Portal ouvert
- [ ] App Registration sélectionnée
- [ ] Redirect URI ajouté : `https://[app].vercel.app/api/auth/callback/azure-ad`
- [ ] Type : Web
- [ ] Sauvegardé

### Tests Fonctionnels

- [ ] **Page d'accueil** : `https://[app].vercel.app` charge correctement
- [ ] **Health Check** : `curl https://[app].vercel.app/api/shared/health` retourne 200
- [ ] **Authentification** : Connexion avec Azure AD fonctionne
- [ ] **Shop Orders API** : Test d'une recherche de Shop Order réussit
- [ ] **Printers API** : Liste des imprimantes récupérée
- [ ] **Logs Vercel** : Pas d'erreurs critiques

### Monitoring & Alertes

- [ ] Vercel Analytics activé
- [ ] Logs Vercel vérifiés (pas d'erreurs)
- [ ] Notifications configurées (email/Slack)
- [ ] Domaine personnalisé configuré (optionnel)

---

## 🌲 Configuration Preview Deployments

### Git Workflow

- [ ] Production branch : `main` configurée
- [ ] Preview enabled pour toutes les branches
- [ ] Auto-deploy activé

### Tests

- [ ] Créer une branche de test : `git checkout -b test/preview`
- [ ] Push : `git push origin test/preview`
- [ ] Preview URL générée automatiquement
- [ ] Preview fonctionne correctement
- [ ] Variables d'environnement "Preview" appliquées

---

## 🗄️ Base de Données (Phase 2)

### Migration vers Cloud Database

- [ ] Azure SQL Database créée (ou PlanetScale)
- [ ] Firewall configuré pour autoriser IPs Vercel
- [ ] Connection string récupérée
- [ ] Variables `DATABASE_*` mises à jour dans Vercel
- [ ] Test de connexion réussi
- [ ] Migrations de schéma exécutées
- [ ] Redéploiement avec nouvelle BDD

---

## 🔐 Sécurité

### Secrets Management

- [ ] Aucun secret dans le code (vérifier avec `git log`)
- [ ] `.env.local` dans `.gitignore`
- [ ] Secrets différents entre Dev / Preview / Production
- [ ] Azure Key Vault créé (future migration Azure)

### Headers de Sécurité

- [ ] `X-Content-Type-Options: nosniff` configuré
- [ ] `X-Frame-Options: DENY` configuré
- [ ] `X-XSS-Protection: 1; mode=block` configuré
- [ ] HTTPS activé (automatique sur Vercel)

### Compliance

- [ ] CORS configuré correctement
- [ ] Rate limiting activé (si nécessaire)
- [ ] Logs d'audit activés
- [ ] IP Whitelisting IFS vérifié

---

## 📊 Monitoring Post-Lancement

### Jour 1

- [ ] Vérifier les logs Vercel toutes les heures
- [ ] Tester tous les endpoints critiques
- [ ] Monitorer les temps de réponse (< 2s pour APIs)
- [ ] Vérifier l'authentification Azure AD

### Semaine 1

- [ ] Analyser les métriques Vercel Analytics
- [ ] Vérifier les Core Web Vitals (LCP, FID, CLS)
- [ ] Identifier les endpoints lents
- [ ] Collecter les retours utilisateurs

### Mois 1

- [ ] Review des erreurs récurrentes
- [ ] Optimisation des requêtes IFS lentes
- [ ] Mise à jour de la documentation
- [ ] Planification des améliorations

---

## 🚨 Rollback Plan

En cas de problème critique :

1. **Immediate Rollback**
   - Vercel Dashboard → Deployments
   - Sélectionner le dernier déploiement stable
   - Cliquer sur "Promote to Production"

2. **Investigation**
   - Télécharger les logs Vercel
   - Identifier la cause du problème
   - Créer une issue GitHub

3. **Fix & Redeploy**
   - Fixer en local
   - Tester complètement
   - Merger dans `main`
   - Vérifier le nouveau déploiement

---

## 📞 Contacts d'Urgence

| Composant | Contact | Documentation |
|-----------|---------|---------------|
| **Vercel** | Support Vercel | https://vercel.com/support |
| **IFS Cloud** | Équipe IFS Bénéteau | [Contact interne] |
| **Azure AD** | IT Bénéteau | [Contact interne] |
| **Database** | DBA Bénéteau | [Contact interne] |

---

## ✅ Sign-off

**Déploiement effectué par** : ______________________  
**Date** : ____________  
**Version déployée** : ____________  
**URL Production** : ______________________  

**Vérifications complètes** : ☐ Oui ☐ Non  
**Tests passés** : ☐ Oui ☐ Non  
**Documentation à jour** : ☐ Oui ☐ Non  

---

**Template Version** : 1.0  
**Dernière mise à jour** : 15 octobre 2025
