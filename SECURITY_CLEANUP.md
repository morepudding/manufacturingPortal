# 🚨 Guide de nettoyage des secrets IFS exposés

## ⚠️ Problème identifié

Des secrets IFS (`IFS_CLIENT_SECRET`) ont été commités dans le repository Git dans **20+ fichiers** :
- Scripts de test dans `/scripts`
- Fichiers de test dans `/src/testscript`
- Documentation (README, copilot-instructions, etc.)
- Fichier `.environment.dev`

**Ces secrets sont dans tout l'historique Git** et doivent être complètement supprimés.

---

## 🎯 Plan d'action (3 étapes critiques)

### ✅ Étape 1: Nettoyer les fichiers actuels

```bash
# Rendre le script exécutable
chmod +x scripts/remove-hardcoded-secrets.sh

# Exécuter le nettoyage automatique
bash scripts/remove-hardcoded-secrets.sh

# Vérifier les changements
git diff

# Supprimer .environment.dev du repo
git rm --cached .environment.dev

# Commiter les changements
git add .gitignore scripts/ docs/ src/testscript/ README.md .github/
git commit -m "🔒 security: Remove hardcoded IFS secrets from all files"
```

### 🔥 Étape 2: Nettoyer l'historique Git

⚠️ **CRITIQUE**: Les secrets sont toujours dans l'historique Git. Il faut les supprimer complètement.

#### Option A: git-filter-repo (Recommandé)

```bash
# 1. Installer git-filter-repo
pip install git-filter-repo

# 2. Créer une sauvegarde
git clone /home/rbottero/ManufacturingPortal /home/rbottero/ManufacturingPortal_backup

# 3. Créer un fichier avec les secrets à supprimer
cat > /tmp/secrets-to-remove.txt <<EOF
***REMOVED***
***REMOVED***
EOF

# 4. Nettoyer l'historique (supprime toutes les occurrences)
git filter-repo --replace-text /tmp/secrets-to-remove.txt --force

# 5. Vérifier que les secrets ont disparu
git log --all --full-history --source --patch -S "***REMOVED***"

# 6. Force push (⚠️ DESTRUCTIF - prévenir l'équipe!)
git push origin --force --all
git push origin --force --tags
```

#### Option B: BFG Repo-Cleaner (Alternative)

```bash
# 1. Télécharger BFG
wget https://repo1.maven.org/maven2/com/madgag/bfg/1.14.0/bfg-1.14.0.jar

# 2. Créer un fichier avec les secrets
cat > passwords.txt <<EOF
***REMOVED***
***REMOVED***
EOF

# 3. Nettoyer l'historique
java -jar bfg-1.14.0.jar --replace-text passwords.txt

# 4. Nettoyer les refs
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# 5. Force push
git push origin --force --all
```

#### Option C: Nouveau repository (Plus simple)

Si le repo n'est pas critique ou peu de collaborateurs :

```bash
# 1. Créer un nouveau repo vide sur GitHub
# 2. Cloner le repo actuel
git clone /home/rbottero/ManufacturingPortal /home/rbottero/ManufacturingPortal_new

cd /home/rbottero/ManufacturingPortal_new

# 3. Supprimer l'historique Git
rm -rf .git

# 4. Initialiser un nouveau repo propre
git init
git add .
git commit -m "🎉 Initial commit with cleaned secrets"

# 5. Pousser vers le nouveau repo
git remote add origin https://github.com/<org>/<new-repo>.git
git push -u origin main
```

---

### 🔑 Étape 3: Régénérer les secrets compromis

⚠️ **CRITIQUE**: Une fois les secrets exposés publiquement, ils doivent être régénérés.

**Actions à faire :**

1. **Contacter l'équipe IFS** :
   ```
   Sujet: Régénération urgente du CLIENT_SECRET IFS
   
   Bonjour,
   
   Le CLIENT_SECRET suivant a été accidentellement exposé dans notre repo Git :
   - IFS_CLIENT_ID: ***REMOVED***
   - IFS_CLIENT_SECRET: ***REMOVED***
   
   Merci de :
   1. Révoquer ce CLIENT_SECRET
   2. Générer un nouveau CLIENT_SECRET
   3. Nous communiquer les nouvelles credentials
   
   Cordialement
   ```

2. **Une fois le nouveau secret reçu**, le stocker UNIQUEMENT dans `.env.local` :
   ```bash
   echo "IFS_CLIENT_SECRET=NEW_SECRET_HERE" >> .env.local
   echo "IFS_CLIENT_ID=NEW_CLIENT_ID_HERE" >> .env.local
   ```

3. **Mettre à jour les GitHub Secrets** (CI/CD) :
   ```bash
   gh secret set IFS_CLIENT_SECRET --body "NEW_SECRET_HERE"
   gh secret set IFS_CLIENT_ID --body "NEW_CLIENT_ID_HERE"
   ```

---

## 📋 Checklist de vérification

- [ ] ✅ `.gitignore` mis à jour (inclut `.environment.dev`, `.environment.*`)
- [ ] ✅ Script de nettoyage exécuté (`remove-hardcoded-secrets.sh`)
- [ ] ✅ `.environment.dev` supprimé du Git (`git rm --cached`)
- [ ] ✅ Changements committés
- [ ] 🔥 Historique Git nettoyé (git-filter-repo ou BFG)
- [ ] 🔥 Force push effectué (après accord de l'équipe)
- [ ] 🔑 Équipe IFS contactée pour régénération des secrets
- [ ] 🔑 Nouveaux secrets stockés dans `.env.local` uniquement
- [ ] 🔑 GitHub Secrets mis à jour

---

## 🛡️ Bonnes pratiques pour l'avenir

### 1. Utiliser UNIQUEMENT des variables d'environnement

```typescript
// ❌ JAMAIS
const IFS_CLIENT_SECRET = '***REMOVED***'

// ✅ TOUJOURS
const IFS_CLIENT_SECRET = process.env.IFS_CLIENT_SECRET || ''

// ✅ Avec validation
if (!IFS_CLIENT_SECRET) {
  throw new Error('IFS_CLIENT_SECRET is required')
}
```

### 2. Vérifier avant chaque commit

```bash
# Installer git-secrets (prévient les commits de secrets)
brew install git-secrets  # macOS
apt-get install git-secrets  # Linux

# Configurer git-secrets
git secrets --install
git secrets --register-aws
git secrets --add 'IFS_CLIENT_SECRET'
git secrets --add 'IFS_CLIENT_ID'
```

### 3. Utiliser un pre-commit hook

Créer `.git/hooks/pre-commit` :

```bash
#!/bin/bash
# Vérifier qu'aucun secret n'est commité

if git diff --cached | grep -E "(IFS_CLIENT_SECRET|***REMOVED***)"; then
  echo "❌ ERREUR: Secret IFS détecté dans le commit!"
  echo "Supprimez les secrets hardcodés avant de commiter."
  exit 1
fi
```

### 4. Scanner régulièrement le repo

```bash
# Avec gitleaks
docker run -v $(pwd):/repo zricethezav/gitleaks:latest \
  detect --source="/repo" --verbose

# Avec truffleHog
docker run --rm -v $(pwd):/repo trufflesecurity/trufflehog:latest \
  filesystem /repo
```

---

## 📚 Références

- [GitHub: Removing sensitive data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- [git-filter-repo documentation](https://github.com/newren/git-filter-repo)
- [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/)
- [git-secrets](https://github.com/awslabs/git-secrets)

---

## ⏰ Temps estimé

- **Étape 1** (Nettoyage fichiers actuels) : 5 minutes
- **Étape 2** (Nettoyage historique Git) : 15-30 minutes
- **Étape 3** (Régénération secrets) : Dépend de l'équipe IFS

**Total : ~1 heure** (incluant validation)

---

## 🆘 Support

En cas de problème, contacter :
- Équipe DevOps pour l'aide sur Git
- Équipe IFS pour la régénération des secrets
- Security team pour validation finale
