# MIYA Agency — Site web

Site vitrine de **MIYA Agency**, agence de croissance digitale (acquisition de clients,
génération de leads, landing pages, stratégie digitale).

Conçu comme un véritable site d'agence premium : fond blanc cassé, typographie Inter
grande et épaisse, accents violets utilisés avec parcimonie, cartes blanches, espaces
généreux, animations discrètes.

---

## Stack technique

| Élément | Choix | Pourquoi |
| --- | --- | --- |
| Générateur | [Astro 7](https://astro.build) (sortie 100 % statique) | Composants réutilisables sans duplication, HTML pur en sortie, zéro JavaScript inutile, SEO natif |
| Styles | CSS natif (variables de design dans `src/styles/global.css` + styles scopés par composant) | Aucune dépendance, maintenable, léger |
| Police | Inter Variable auto-hébergée (`@fontsource-variable/inter`) | Rapide, conforme RGPD (pas d'appel à Google Fonts) |
| Script client | `src/scripts/main.ts` (≈ 2 Ko) | En-tête au défilement, menu mobile, apparitions au scroll, fenêtre Calendly |
| SEO | balises meta / Open Graph / Twitter, données structurées JSON-LD, `sitemap-index.xml`, `robots.txt`, URL canoniques | Généré automatiquement |

Poids total d'une page : ≈ 45 Ko de HTML + 32 Ko de CSS + 48 Ko de police (sous-ensemble latin).
Aucune image bitmap n'est chargée : tous les visuels sont en SVG/CSS.

---

## Démarrer

Prérequis : [Node.js](https://nodejs.org) 22.23 ou plus récent.

```bash
npm install        # installe les dépendances
npm run dev        # serveur de développement → http://localhost:4321
npm run build      # génère le site statique dans dist/
npm run preview    # prévisualise le contenu de dist/
npm run check      # vérification TypeScript / Astro
```

---

## Personnaliser le contenu

**Tout le contenu modifiable est centralisé dans un seul fichier : `src/data/site.ts`.**
Aucune connaissance du code n'est nécessaire pour l'éditer.

### 1. Lien Calendly (bouton « Réserver un appel »)

```ts
calendlyUrl: 'https://calendly.com/votre-compte/appel-decouverte',
```

Tous les boutons « Réserver un appel » (en-tête, hero, section CTA, menu mobile, pied de
page) pointent vers cette adresse. Un lien Calendly s'ouvre dans une fenêtre intégrée
(le script Calendly n'est chargé qu'au clic) ; tout autre outil de prise de rendez-vous
s'ouvre simplement dans un nouvel onglet.

### 2. Coordonnées, réseaux sociaux

- `site.email` : adresse de contact (liens `mailto:` et pages légales).
- `socials` : réseaux affichés dans le pied de page (laisser le tableau vide pour n'en
  afficher aucun).

### 3. Chiffres de démonstration

Les indicateurs du hero (`heroStats`) et les résultats des études de cas (`caseStudies`)
sont **des données de démonstration**, signalées par un badge « Exemple ».

1. Remplacez-les par vos résultats réels.
2. Passez `demoData` à `false` pour retirer tous les badges « Exemple ».

### 4. Logos clients

Déposez vos logos (SVG ou PNG transparent, ≈ 40 px de haut) dans `public/logos/` puis
renseignez `clients` :

```ts
export const clients: Client[] = [
  { name: 'Nom du client', logo: '/logos/nom-du-client.svg', href: 'https://www.client.com' },
];
```

Tant que le tableau est vide, des emplacements neutres sont affichés.

### 5. Études de cas

Chaque étude de cas comporte : nom du projet, secteur, objectif, résultats et visuel.
Sans image, un visuel « capture de tableau de bord » est généré automatiquement
(`visual: 'bars' | 'line' | 'funnel'`). Pour afficher une vraie capture de campagne,
placez l'image dans `public/` et renseignez `image` (et `imageAlt`).

### 6. Services, méthode, à propos, CTA

Textes des sections `services`, `steps`, `about` et `cta`, modifiables au même endroit.

### 7. Nom de domaine

Dans `astro.config.mjs`, remplacez `site` par votre domaine définitif : il sert aux URL
canoniques, aux balises Open Graph, au sitemap et au fichier `robots.txt`.

### 8. Pages légales

`src/pages/mentions-legales.astro` et `src/pages/politique-de-confidentialite.astro`
contiennent des trames conformes aux obligations françaises (LCEN, RGPD). Remplacez les
champs entre crochets, adaptez le texte à vos outils réels, puis supprimez l'encadré
« À compléter ».

---

## Structure du projet

```
├── astro.config.mjs            # configuration Astro (domaine, sitemap)
├── public/                     # fichiers servis tels quels
│   ├── favicon.svg, favicon-32.png, apple-touch-icon.png
│   ├── og-image.png            # image de partage (1200 × 630)
│   └── logos/                  # logos clients
└── src/
    ├── data/site.ts            # ★ TOUT LE CONTENU MODIFIABLE
    ├── styles/global.css       # tokens de design, typographie, boutons, utilitaires
    ├── layouts/Base.astro      # <head> SEO, en-tête, pied de page, script global
    ├── scripts/main.ts         # script client (menu, scroll, Calendly)
    ├── lib/svg.ts              # utilitaires de génération des graphiques SVG
    ├── components/
    │   ├── Header.astro, Footer.astro, Logo.astro, Button.astro, Icon.astro
    │   ├── DemoTag.astro       # badge « Exemple »
    │   ├── HeroVisual.astro    # visuel du hero (forme violette + cartes)
    │   ├── CaseVisual.astro    # visuels générés des études de cas
    │   ├── LegalPage.astro     # gabarit des pages légales
    │   └── sections/           # Hero, Clients, Services, Method, CaseStudies, About, Cta
    └── pages/
        ├── index.astro         # page d'accueil
        ├── mentions-legales.astro
        ├── politique-de-confidentialite.astro
        ├── 404.astro
        └── robots.txt.ts       # robots.txt généré
```

---

## Charte graphique

| Rôle | Valeur |
| --- | --- |
| Noir profond (textes, section CTA) | `#111018` |
| Blanc cassé (fond) | `#FAFAFC` |
| Violet principal (accents, boutons) | `#762BFF` |
| Violet clair (badges, icônes) | `#EEE5FF` |
| Gris secondaire (textes discrets) | `#777783` (ajusté à `#6E6E7A` pour un contraste AA) |

Les variables correspondantes sont définies dans `src/styles/global.css` (`:root`).

---

## Déploiement

Le site est entièrement statique : le dossier `dist/` généré par `npm run build` peut être
hébergé n'importe où.

- **Netlify / Vercel / Cloudflare Pages** : connectez le dépôt, la configuration Astro est
  détectée automatiquement (commande `npm run build`, dossier `dist`).
- **Hébergement classique (OVH, o2switch…)** : lancez `npm run build` puis déposez le
  contenu de `dist/` sur le serveur.
- **GitHub Pages** : utilisez l'action officielle `withastro/action` (voir la
  [documentation Astro](https://docs.astro.build/fr/guides/deploy/github/)).

---

## Accessibilité et performance

- Structure sémantique (landmarks, titres hiérarchisés, listes de définitions pour les
  chiffres), lien d'évitement, focus visible, contrastes AA.
- Menu mobile accessible (`aria-expanded`, fermeture à la touche Échap).
- Animations désactivées pour les personnes ayant activé « Réduire les animations ».
- Aucun script tiers chargé sans action de l'utilisateur (Calendly uniquement au clic).
