# WanderBite — Design Spec
**Date :** 2026-05-20  
**Statut :** Approuvé  
**Placeholder de marque :** WanderBite (à remplacer quand le nom définitif est trouvé)

---

## 1. Contexte & objectif

Site web pour une influenceuse voyage + food. Elle publie sous deux comptes distincts : **@QueleVentre** (food) et **@gmjourneys** (voyage). Le site unifie les deux identités sous une marque commune à définir.

**Objectif double :**
- Vitrine de marque personnelle pour attirer des partenariats (offices de tourisme, marques food, plateformes affiliées)
- Hub de contenu pour sa communauté (articles, guides, recettes, Reels)

**Monétisation principale :** liens affiliés intégrés dans les articles (GetYourGuide, Viator, Booking.com, Amazon, etc.)

---

## 2. Direction artistique

**Style :** Immersive & Hybride — hero sections cinématiques sombres pour l'impact émotionnel, contenu éditorial clair et lisible pour les articles.

**Palette :**
| Rôle | Valeur |
|------|--------|
| Fond sombre (hero, footer, nav) | `#0d0b09` |
| Fond clair (articles, sections contenu) | `#faf9f6` |
| Accent or / doré | `#c9a96e` |
| Texte principal | `#1c1917` |
| Texte secondaire | `#3d3330` |
| Accent Voyage (vert forêt) | `#7ec87e` |
| Accent Food (ambre chaud) | `#f5c07a` |

**Typographie :**
- Titres / headlines : serif (Georgia fallback → Google Fonts : Playfair Display ou Cormorant Garamond)
- Corps de texte, UI, labels : sans-serif system (-apple-system / Inter)
- Taille de lecture : 15px, line-height 1.85

**Motifs visuels :**
- Hero plein écran avec overlay gradient sombre, grain de texture subtil
- Typographie serif avec italiques en couleur accent
- Séparateurs : lignes dorées fine, lettrines dorées, numérotation `01 /`
- Grille articles asymétrique : grande carte éditoriale + petites cartes satellites
- Hover sur cartes : zoom image 1.04 + léger voile doré

**Univers de contenu :** aventure + gastronomie locale (marchés, street food, spots authentiques hors des sentiers battus)

---

## 3. Stack technique

| Couche | Outil | Justification |
|--------|-------|---------------|
| Framework | Next.js 15 (App Router, ISR) | SEO parfait, regénération auto à chaque publication |
| CMS | Sanity Studio v3 | Dashboard le plus intuitif du marché, autonomie totale |
| Style | Tailwind CSS v4 | Utilitaires, dark mode natif, cohérence |
| Animations | Framer Motion | Hero immersifs, transitions de page |
| Internationalisation | next-intl | Bilingue FR/EN, routing `/fr` et `/en` |
| Images | next/image + Sanity CDN | Optimisation automatique, lazy loading |
| Déploiement | Vercel | Preview par PR, CDN global, déploiement en < 60s |
| Analytique | Vercel Analytics + Plausible | RGPD-friendly, pas de cookies |
| Email | Resend + React Email | Newsletter, notification de publication |

---

## 4. Structure des pages

### 4.1 Navigation principale
```
WanderBite  |  Voyage  |  Food  |  Reels  |  Bons Plans  |  À propos  ||  FR / EN
```
- Nav fixe, fond `#0d0b09` avec dégradé transparent en hero
- Barre de progression de lecture sur les pages article

### 4.2 Homepage `/`
Sections dans l'ordre de défilement :
1. **Hero plein écran** — headline serif + italique doré + 2 CTAs (Voyage / Food)
2. **Featured articles** — grille asymétrique 3 cartes (1 grande + 2 petites) sur fond crème
3. **Deux piliers** — split screen Voyage (vert) / Food (ambre), chacun avec ses tags et son CTA
4. **Bons plans affiliés** — 4 cartes partenaires sur fond sombre (GetYourGuide, Viator, Booking, Amazon)
5. **Newsletter** — capture email sur fond crème
6. **Footer** — logo + nav + réseaux sociaux + liens légaux

### 4.3 Page Voyage `/voyage`
- Hero cinématique (vert forêt)
- Barre de filtres sticky : Tout / Asie / Europe / Afrique / Amériques / Guides complets / 48h
- Compteur d'articles + tri (Plus récents / Plus populaires / Plus anciens)
- Grille asymétrique d'articles uniquement (pas de Reels)
- Pagination via "Charger plus"

### 4.4 Page Food `/food`
- Hero cinématique (ambre chaud)
- Barre de filtres sticky : Tout / Street food / Marchés / Restaurants / Recettes / Végétarien
- Compteur + tri identique
- Grille asymétrique d'articles uniquement

### 4.5 Page Reels `/reels`
- Hero cinématique (fond bleu nuit)
- Barre de filtres : Tout / Food / Voyage / Invité resto / Marchés / Recettes
- Grande carte featured (2 colonnes) pour le Reel épinglé
- Grille 4 colonnes de cartes portrait format Instagram
- Chaque carte affiche : compte source (@QueleVentre ou @gmjourneys), tag, titre, stats (❤ 💬 ↗)
- Au clic : lightbox avec iframe oEmbed Instagram

### 4.6 Page Bons Plans `/bons-plans`
- Hero sombre
- Grille de cartes affiliées filtrables par partenaire (GetYourGuide, Viator, Booking, Amazon...) et par destination
- Chaque carte : partenaire, nom, destination, prix, bouton CTA

### 4.7 Page Article `/voyage/[slug]` et `/food/[slug]`
- Hero plein écran (70vh) avec titre, tags, breadcrumb, meta auteur
- Layout two-column : corps article (large) + sidebar sticky (280px)
- **Corps de l'article :**
  - Intro en exergue (serif, bordure dorée gauche)
  - Titres H2 avec séparateur et `scroll-margin-top` pour le TOC
  - Pull quotes (fond sombre, guillemets géants dorés)
  - Photos pleine largeur avec légende
  - Grilles 2 colonnes de photos
  - Blocs affiliés intégrés (header sombre + détail + CTA doré)
  - Encadrés pratiques (fond crème, bordure ambre)
- **Sidebar sticky :**
  - Table des matières avec scroll-spy actif (item doré = section en cours)
  - Boutons de partage (Instagram, Pinterest, Copier le lien)
  - Bloc affilié hébergement
- Barre de progression de lecture (ligne dorée sous la nav)
- Articles liés (3 cartes, fond sombre)
- Footer complet

### 4.8 Page À propos `/a-propos`
- Hero photo pleine page avec présentation
- Ses deux univers (@QueleVentre + @gmjourneys)
- Stats réseaux sociaux
- Section partenariats / contact

---

## 5. Schéma Sanity CMS

### Type `article`
```
title (string, FR + EN)
slug (slug)
publishedAt (datetime)
pillar (reference → 'voyage' | 'food')
tags (array of string)  
region (string)           — pour les filtres
coverImage (image)
excerpt (text, FR + EN)
body (array of blocks)    — Portable Text avec blocs custom
affiliateLinks (array)    — [{partner, name, url, price, image}]
seoTitle / seoDescription
```

### Type `reel`
```
title (string, FR + EN)
instagramUrl (url)        — URL du Reel Instagram
account ('queleventre' | 'gmjourneys')
pillar ('voyage' | 'food')
tags (array of string)
publishedAt (datetime)
stats { likes, comments, shares }
featured (boolean)        — carte featured sur /reels
```

### Type `affiliateItem`
```
partner (string)          — 'getyourguide' | 'viator' | 'booking' | 'amazon'
name (string, FR + EN)
url (url)
destination (string)
price (string)
image (image)
featured (boolean)        — apparaît en homepage
```

### Type `siteConfig`
```
heroHeadline (text, FR + EN)
heroSub (text, FR + EN)
featuredArticles (array of references)
newsletterSubtitle (text, FR + EN)
```

---

## 6. Intégration affiliés

Les liens affiliés s'intègrent à deux niveaux :

**Dans les articles (blocs Portable Text custom) :**
- Bloc `affiliateBlock` : header sombre avec badge partenaire + image + nom + détail + prix + bouton CTA
- Positionnés par l'auteure au fil de l'article, pas automatiquement
- Disclaimer automatique en haut de chaque article contenant des affiliés : *"Cet article contient des liens affiliés."*

**Page Bons Plans + Homepage :**
- Tirés du type Sanity `affiliateItem`
- Les items `featured: true` apparaissent en homepage

**Partenaires initiaux :** GetYourGuide, Viator, Booking.com, Amazon (équipement voyage + cuisine)

---

## 7. Internationalisation FR / EN

- Routing : `/fr/voyage/[slug]` et `/en/voyage/[slug]`
- Langue par défaut : français (`/` redirige vers `/fr`)
- Switcher FR|EN dans la nav, persisté en cookie
- Contenu bilingue dans Sanity : champs `title.fr`, `title.en`, `body.fr`, `body.en`
- Si traduction EN absente : fallback vers la version FR (pas de page vide)
- SEO : balises `hreflang` alternates sur toutes les pages

---

## 8. Intégration Instagram Reels

**Flux de publication :**
1. Elle poste un Reel sur Instagram (@QueleVentre ou @gmjourneys)
2. Elle ouvre Sanity Studio, crée un nouveau `reel`, colle l'URL Instagram
3. Elle remplit : titre (FR+EN), tags, pilier, marque comme featured si souhaité
4. La carte apparaît dans `/reels` immédiatement (ISR revalide)

**Rendu côté site :**
- Les cartes affichent les métadonnées saisies dans Sanity (titre, stats, compte)
- Au clic sur une carte : lightbox avec `iframe` oEmbed Instagram officiel
- Les stats (❤ 💬) sont saisies manuellement dans Sanity (pas d'API Instagram)

---

## 9. Newsletter

- Fournisseur : **Resend** + liste dans Sanity ou Brevo
- Formulaire en homepage et en pied d'article
- Double opt-in obligatoire (RGPD)
- Template email : design cohérent avec le site (fond sombre, serif, accent doré)
- Fréquence : hebdomadaire — 1 article + 1 adresse food + 1 bon plan affilié

---

## 10. SEO

- Metadata dynamique via `generateMetadata()` de Next.js App Router
- `og:image` auto-générée depuis la cover Sanity (Vercel OG)
- Sitemap XML auto-généré (`next-sitemap`)
- Schema.org `Article` sur chaque article
- URLs canoniques FR/EN avec `hreflang`
- Performance cible : Lighthouse ≥ 95 sur mobile

---

## 11. Gestion des erreurs

- Pages article introuvables → page 404 custom avec suggestions d'articles
- Erreur Sanity fetch → `error.tsx` Next.js avec message FR/EN
- Images manquantes → placeholder neutre (jamais de broken image)
- Timeout affiliés → le bouton CTA reste visible, lien href direct en fallback

---

## 12. Pages hors scope v1

Les éléments suivants sont explicitement hors périmètre de la v1 :
- Espace commentaires
- Profils utilisateurs / comptes lecteurs
- Recherche full-text avancée (Algolia)
- Application mobile
- Intégration API Instagram officielle (stats en temps réel)

---

## 13. Mockups de référence

Les mockups HTML interactifs sont dans `.superpowers/brainstorm/` :
- `homepage-design.html` — Homepage complète
- `article-page-v2.html` — Page article avec TOC interactif
- `pillar-pages-v3.html` — Pages Voyage / Food / Reels avec filtres et tri

**Sites de référence DA :**
- https://www.atlasobscura.com/things-to-do/serbia
- https://www.sortiraparis.com
