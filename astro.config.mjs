// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // ⚠️ À remplacer par le domaine définitif du site (utilisé pour les URL canoniques,
  // les balises Open Graph, le sitemap et le fichier robots.txt).
  site: 'https://www.miya-agency.com',
  integrations: [sitemap()],
  // Compression HTML « classique » : conserve les espaces significatifs entre éléments en ligne.
  compressHTML: true,
});
