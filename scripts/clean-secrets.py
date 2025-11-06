#!/usr/bin/env python3
"""
Script de nettoyage des secrets IFS hardcodés
Remplace tous les secrets par des références à process.env uniquement
"""

import os
import re
from pathlib import Path

# Secrets à supprimer
SECRETS = {
    'IFS_CLIENT_SECRET': '***REMOVED***',
    'IFS_CLIENT_ID': '***REMOVED***',
}

# Fichiers à nettoyer
SCRIPT_FILES = [
    'scripts/find-shoporder-by-part.ts',
    'scripts/investigate-shoporder-fields.ts',
    'scripts/test-material-requisition-lines.ts',
    'scripts/ifs-test-14-single-part.ts',
    'scripts/ifs-test-13-reverse-search-complete.ts',
    'scripts/test-material-allocation-endpoints.ts',
    'scripts/ifs-test-12-user-provided-parts.ts',
    'scripts/test-shop-order-materials-array.ts',
    'scripts/ifs-test-12-user-parts-simple.ts',
    'scripts/test-manufacturing-material-history.ts',
    'scripts/test-material-history-final.ts',
    'scripts/investigate-shoporder-materials.ts',
    'scripts/test-product-structure-bom.ts',
    'src/testscript/test-shoporder-customer-fields.js',
    'src/testscript/test-customer-order-optimized.js',
    'src/testscript/test-customer-order-search-strategies.js',
]

DOC_FILES = [
    'docs/archive/phases/PHASE1_COMPLETE.md',
    'docs/IFS_ENDPOINTS_USED.md',
    '.github/copilot-instructions.md',
    'docs/tools/boat-configuration-editor/README.md',
    'README.md',
]

def clean_typescript_file(filepath):
    """Nettoie un fichier TypeScript/JavaScript"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        
        # Remplacer les secrets hardcodés dans les const
        for var_name, secret_value in SECRETS.items():
            # Pattern 1: const VAR = 'secret'
            pattern1 = rf"const {var_name} = '[^']*'"
            replacement1 = f"const {var_name} = process.env.{var_name} || ''"
            content = re.sub(pattern1, replacement1, content)
            
            # Pattern 2: const VAR = process.env.VAR || 'secret'
            pattern2 = rf"(const {var_name} = process\.env\.{var_name} \|\| )'[^']*'"
            replacement2 = r"\1''"
            content = re.sub(pattern2, replacement2, content)
        
        # Nettoyer les URLs hardcodées dans les fallbacks
        content = re.sub(
            r"\|\| 'https://beneteau-group-ast\.ifs\.cloud/main/ifsapplications/projection/v1'",
            "|| ''",
            content
        )
        content = re.sub(
            r"\|\| 'https://beneteau-group-ast\.ifs\.cloud/auth/realms/beneast1/protocol/openid-connect/token'",
            "|| ''",
            content
        )
        
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
        
    except Exception as e:
        print(f"  ⚠️  Erreur: {e}")
        return False

def clean_markdown_file(filepath):
    """Nettoie un fichier Markdown (documentation)"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        
        # Remplacer dans les blocs de code
        for var_name, secret_value in SECRETS.items():
            content = content.replace(
                f'{var_name}={secret_value}',
                f'{var_name}=your_{var_name.lower()}_here'
            )
        
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
        
    except Exception as e:
        print(f"  ⚠️  Erreur: {e}")
        return False

def main():
    print("🔒 Nettoyage des secrets IFS hardcodés...")
    print()
    
    repo_root = Path(__file__).parent.parent
    os.chdir(repo_root)
    
    count = 0
    
    # Nettoyer les fichiers scripts
    print("📝 Nettoyage des scripts TypeScript/JavaScript...")
    for filepath in SCRIPT_FILES:
        if not os.path.exists(filepath):
            print(f"  ⚠️  Fichier non trouvé: {filepath}")
            continue
        
        print(f"  🔧 {filepath} ... ", end='', flush=True)
        if clean_typescript_file(filepath):
            print("✅")
            count += 1
        else:
            print("⏭️  (aucun changement)")
    
    print()
    
    # Nettoyer les fichiers de documentation
    print("📚 Nettoyage des fichiers de documentation...")
    for filepath in DOC_FILES:
        if not os.path.exists(filepath):
            print(f"  ⚠️  Fichier non trouvé: {filepath}")
            continue
        
        print(f"  🔧 {filepath} ... ", end='', flush=True)
        if clean_markdown_file(filepath):
            print("✅")
            count += 1
        else:
            print("⏭️  (aucun changement)")
    
    print()
    print(f"✅ Nettoyage terminé! {count} fichiers modifiés")
    print()
    print("⚠️  IMPORTANT: Le fichier .environment.dev doit être supprimé du repo:")
    print("   git rm --cached .environment.dev")
    print()
    print("💡 Prochaines étapes:")
    print("   1. Vérifier les changements: git diff")
    print("   2. Commiter: git commit -am '🔒 Remove hardcoded IFS secrets'")
    print("   3. ⚠️  CRITIQUE: Nettoyer l'historique Git (voir SECURITY_CLEANUP.md)")
    print()

if __name__ == '__main__':
    main()
