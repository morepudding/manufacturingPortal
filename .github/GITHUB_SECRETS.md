# Configuration GitHub Actions Secrets

Pour que le workflow CI/CD fonctionne, vous devez configurer les secrets GitHub suivants.

## 📋 Secrets Requis

Aller sur GitHub : **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

### Secrets minimaux pour le build

| Secret | Valeur | Description |
|--------|--------|-------------|
| `IFS_BASE_URL` | `https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1` | Base URL IFS Cloud |
| `IFS_CLIENT_ID` | `***REMOVED***` | Client ID IFS (non sensible) |

### Secrets optionnels (pour tests complets)

| Secret | Valeur | Description |
|--------|--------|-------------|
| `IFS_CLIENT_SECRET` | `<votre-secret>` | Client Secret IFS (sensible) |
| `IFS_TOKEN_URL` | `https://beneteau-group-ast.ifs.cloud/auth/realms/beneast1/protocol/openid-connect/token` | URL OAuth2 |
| `AZURE_AD_CLIENT_ID` | `<votre-client-id>` | Azure AD Client ID |
| `AZURE_AD_CLIENT_SECRET` | `<votre-secret>` | Azure AD Secret |
| `AZURE_AD_TENANT_ID` | `<votre-tenant-id>` | Azure AD Tenant ID |

## 🔧 Configuration via CLI

```bash
# Installer GitHub CLI
# https://cli.github.com/

# S'authentifier
gh auth login

# Ajouter les secrets
gh secret set IFS_BASE_URL --body "https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1"
gh secret set IFS_CLIENT_ID --body "***REMOVED***"
gh secret set IFS_CLIENT_SECRET --body "your_secret_here"
# etc...
```

## ✅ Vérifier la configuration

Après avoir ajouté les secrets :

1. Faire un commit sur une branche
2. Le workflow CI/CD se lance automatiquement
3. Vérifier dans **Actions** que tout est vert ✅

---

**Note** : Les secrets ne sont pas visibles après création (par sécurité). Pour les modifier, il faut les recréer.
