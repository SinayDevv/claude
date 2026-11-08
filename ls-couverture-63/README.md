# LS Couverture 63 : maquette du nouvel en-tête

Proposition de refonte de l'en-tête de la page d'accueil (bandeau, menu, hero, prestations) de https://www.lscouverture63.fr/, repositionné sur la **rénovation et la peinture de façade**.

## Contenu

| Fichier | Rôle |
| --- | --- |
| `index.html` | La page, autonome (aucune dépendance externe) |
| `fonts/` | Polices Bricolage Grotesque et DM Sans (licence OFL) |
| `apercu/presentation-whatsapp.jpg` | Visuel de présentation (desktop + mobile) prêt à envoyer |
| `apercu/demo-mobile.mp4` | Vidéo de 10 s : avant/après animé sur mobile |
| `apercu/desktop.png`, `apercu/mobile.png` | Captures brutes |

## Ce que contient l'en-tête

- Bandeau d'infos : zone d'intervention (63), décennale, devis gratuit, téléphone.
- Menu orienté façade : Ravalement, Peinture façade, Toiture, Réalisations, Contact.
- Hero : promesse claire, deux appels à l'action (devis / appel), points de confiance.
- Avant/après interactif (glisser à la souris, au doigt ou au clavier), avec une animation d'ouverture « coup de rouleau ».
- Argument différenciant : un couvreur qui traite la façade *et* ce qui la protège (toiture, gouttières, rives).
- Sur mobile : barre fixe « Appeler / Devis gratuit » en bas de l'écran, menu latéral.

## À personnaliser avant mise en ligne

1. **Téléphone** : renseigner `CONFIG.phone` en bas de `index.html` (ex. `"06 12 34 56 78"`). Le numéro s'affiche alors partout et les boutons deviennent cliquables (`tel:`).
2. **Logo** : le monogramme « LS » est une proposition ; le remplacer par le logo du client si besoin.
3. **Avant/après** : l'illustration est générée en SVG. Idéalement, la remplacer par deux photos d'un vrai chantier du client.
4. **Mentions** : vérifier avec le client (décennale, zone d'intervention exacte, etc.).

## Voir la page

Ouvrir `index.html` dans un navigateur. Ajouter `?capture&pos=50` à l'URL fige les animations (utile pour faire des captures).
