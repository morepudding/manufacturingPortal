# Changelog - Part Printer

Historique des modifications importantes de l'outil Part Printer.

---

## [15 octobre 2025] - Autorisation des dates futures

### 🔧 Correction

**Problème** : L'input de date (`Start Date`) dans le `FilterPanel` empêchait la sélection de dates futures avec l'attribut `max={today}`.

**Impact** : Impossible de tester avec le Shop Order 463215 (date: 2025-10-22) car la date était dans le futur.

**Solution** :
- ✅ Supprimé l'attribut `max={today}` de l'input date
- ✅ Supprimé la variable `const today` devenue inutile
- ✅ L'utilisateur peut maintenant sélectionner n'importe quelle date (passée ou future)

**Fichier modifié** :
```
src/app/(tools)/part-printer/components/FilterPanel.tsx
```

**Changements** :
```diff
- const today = new Date().toISOString().split('T')[0]

  <input
    type="date"
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
-   max={today}
    disabled={loading}
    className="..."
  />
```

**Validation** :
- ✅ Pas d'erreurs TypeScript/ESLint
- ✅ L'input date est maintenant libre de toute restriction
- ✅ La date 2025-10-22 peut être sélectionnée pour tester le Shop Order 463215

---

### 📝 Notes

Cette modification permet de tester avec des Shop Orders planifiés dans le futur, ce qui est courant dans un environnement de production manufacturière où les ordres sont créés à l'avance.

**Use case validé** :
- Shop Order 463215 avec `RevisedStartDate = 2025-10-22`
- Site: FR017
- Production Line: MASSIF
- Mode: Redébit

---

**Version** : 1.0.1  
**Dernière mise à jour** : 15 octobre 2025
