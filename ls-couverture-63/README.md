# LS Couverture 63 : maquette du nouvel en-tête

Proposition de refonte de l'en-tête de la page d'accueil (bandeau, menu, hero, prestations) de https://www.lscouverture63.fr/, repositionné sur la **rénovation et la peinture de façade**.

## Contenu

| Fichier | Rôle |
| --- | --- |
| `index.html` | La page, autonome (aucune dépendance externe) |
| `img/logo-ls-couvreur-63.png` | Logo du client, détouré (fond transparent) |
| `img/facade-avant-*.jpg`, `img/facade-apres-*.jpg` | Photos de l'avant/après (800 et 1200 px) |
| `fonts/` | Polices Bricolage Grotesque et DM Sans (licence OFL) |
| `apercu/presentation-whatsapp.jpg` | Visuel de présentation (desktop + mobile) prêt à envoyer |
| `apercu/demo-mobile.mp4` | Vidéo de 10 s : avant/après animé sur mobile |
| `apercu/desktop.png`, `apercu/mobile.png` | Captures brutes |

## Ce que contient l'en-tête

- Bandeau d'infos : zone d'intervention (Clermont-Ferrand et 70 km alentour), décennale, devis gratuit, téléphone.
- Menu orienté façade : Ravalement, Peinture façade, Toiture, Réalisations, Contact.
- Hero : promesse claire, deux appels à l'action (devis / appel), points de confiance (dont « 230+ toitures rénovées »).
- Avant/après interactif sur photo réelle (glisser à la souris, au doigt ou au clavier), avec une animation d'ouverture.
- Argument différenciant : un couvreur qui traite la façade *et* ce qui la protège (toiture, gouttières, rives).
- Sur mobile : barre fixe « Appeler / Devis gratuit » en bas de l'écran, menu latéral.

Les informations (téléphone 07 80 10 31 14, 230+ toitures, 70 km, décennale, devis gratuit) viennent du site actuel du client.

## Avant/après : à remplacer avant la mise en ligne

- **Avant** : photo réelle d'une maison de Saint-Diéry (63), par Torsade de Pointes, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Saint-Di%C3%A9ry-Bas1.JPG), domaine public (CC0).
- **Après** : simulation numérique de rénovation sur la même photo (enduit repeint, volets repeints, toiture démoussée). Ce n'est pas un chantier du client.

Le site actuel du client ne contient aucune photo de façade (uniquement des toitures). Pour la version en ligne, remplacer ces deux images par un vrai avant/après de ses chantiers, pris sous le même angle. Montrer un chantier qui n'est pas le sien serait trompeur pour ses prospects.

## Voir la page

Ouvrir `index.html` dans un navigateur. Ajouter `?capture&pos=50` à l'URL fige les animations (utile pour faire des captures). Le numéro de téléphone se modifie dans l'objet `CONFIG` en bas du fichier.
