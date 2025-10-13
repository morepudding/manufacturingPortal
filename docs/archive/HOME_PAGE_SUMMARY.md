# 🎨 Manufacturing Portal - Page d'Accueil

**Le summum de l'art ! 🚀**

---

## 📸 Aperçu

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│                    [LOGO MANUFACTURING PORTAL]              │
│                                                              │
│                  Manufacturing Portal                        │
│          Plateforme de production Bénéteau                  │
│                                                              │
│         🟢 Connecté à IFS Cloud  •  2 outils disponibles   │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                                                        │ │
│  │           [CAROUSEL BATEAUX AUTO-DÉFILANT]            │ │
│  │                 8 images / 4s                         │ │
│  │              ← Navigation manuelle →                  │ │
│  │                    • • • • • • • •                    │ │
│  │                                                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│                    Nos Applications                          │
│         Sélectionnez l'outil dont vous avez besoin          │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │              │  │              │  │              │     │
│  │   [ICÔNE]    │  │   [ICÔNE]    │  │      +       │     │
│  │              │  │ COMING SOON  │  │              │     │
│  │ Boat Config  │  │ Wood Part    │  │  Plus à      │     │
│  │   Editor     │  │  Printer     │  │   venir      │     │
│  │              │  │              │  │              │     │
│  │ [Description]│  │[Description] │  │              │     │
│  │              │  │              │  │              │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ────────────────────────────────────────────────────────  │
│                                                              │
│  © 2025 Bénéteau  |  Documentation  Support  À propos      │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## ✨ Composants créés

### 1. 🖼️ BoatCarousel

**Fichier :** `src/components/organisms/BoatCarousel/index.tsx`

```tsx
<BoatCarousel />
```

**Features :**
- ✅ Auto-scroll 4s
- ✅ Pause au hover
- ✅ Flèches navigation
- ✅ Indicateurs position
- ✅ 8 images bateaux

### 2. 🎴 AppCard

**Fichier :** `src/components/molecules/AppCard/index.tsx`

```tsx
<AppCard
  title="Boat Configuration Editor"
  description="Gérez les Shop Orders..."
  icon="/app/BoatConfigurationEditor.png"
  href="/boat-configuration"
  available
/>
```

**States :**
- ✅ Available (cliquable)
- 🚧 Coming Soon (badge jaune)
- 📦 Placeholder (pointillés)

### 3. 🏠 Home Page

**Fichier :** `src/app/page.tsx`

**Sections :**
1. Hero (logo + titre + statut)
2. Carousel bateaux
3. Grid applications (3 cards)
4. Footer

---

## 🎨 Design Highlights

### Couleurs
- **Background :** Dégradé slate-50 → blue-50 → indigo-50
- **Cards :** Blanc avec border gris
- **Hover :** Border bleue + shadow 2xl
- **Accent :** Bleu Bénéteau (#2563EB)

### Animations
- **Carousel :** Fade 1s entre images
- **Cards hover :** Scale icône 110% + transition 300ms
- **Boutons :** Hover avec backdrop-blur

### Responsive
- **Mobile :** 1 colonne (< 768px)
- **Tablet :** 2 colonnes (768-1024px)
- **Desktop :** 3 colonnes (> 1024px)

---

## 📊 Métriques

| Composant | Lignes de code | Complexité |
|-----------|---------------|------------|
| BoatCarousel | ~130 | Moyenne |
| AppCard | ~95 | Simple |
| Home Page | ~145 | Simple |
| **Total** | **~370** | ✅ |

---

## ✅ Status

**Page d'accueil :** ✅ **COMPLÈTE**

- [x] Logo Manufacturing Portal
- [x] Carousel 8 bateaux
- [x] 2 AppCards (BCE + WPP)
- [x] Responsive design
- [x] Hover effects
- [x] Footer
- [x] Documentation

**Prochaine étape :** Phase 3 - Impression 🖨️
