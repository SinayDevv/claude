# Logos clients

Déposez ici les logos de vos clients (SVG ou PNG transparent, hauteur conseillée : 40 px),
puis référencez-les dans `src/data/site.ts` :

```ts
export const clients: Client[] = [
  { name: 'Nom du client', logo: '/logos/nom-du-client.svg', href: 'https://www.client.com' },
];
```
