/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  MIYA Agency — Contenu & configuration du site
 * ─────────────────────────────────────────────────────────────────────────────
 *  Ce fichier centralise TOUT le contenu modifiable du site : coordonnées,
 *  lien Calendly, navigation, indicateurs, services, méthode, études de cas…
 *  Modifiez les valeurs ici, aucune connaissance du code n'est nécessaire.
 *
 *  ⚠️  Les chiffres marqués comme « démonstration » (demoData: true) ne sont
 *      PAS des résultats réels. Remplacez-les par vos propres données, puis
 *      passez `demoData` à `false` pour retirer les badges « Exemple ».
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type IconName =
  | 'arrow-right'
  | 'arrow-up-right'
  | 'check'
  | 'menu'
  | 'close'
  | 'target'
  | 'funnel'
  | 'layout'
  | 'compass'
  | 'trending-up'
  | 'calendar'
  | 'clock'
  | 'mail'
  | 'linkedin'
  | 'instagram'
  | 'facebook'
  | 'x-twitter';

export interface NavItem {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Client {
  name: string;
  /** Chemin vers le logo, placé dans `public/logos/` (ex. `/logos/client.svg`). */
  logo?: string;
  /** Lien optionnel vers le site du client. */
  href?: string;
}

export interface Service {
  icon: IconName;
  title: string;
  description: string;
}

export interface Step {
  number: string;
  title: string;
  description: string;
}

export interface CaseStudy {
  name: string;
  sector: string;
  objective: string;
  results: Stat[];
  /** Style du visuel généré automatiquement si aucune image n'est fournie. */
  visual: 'bars' | 'line' | 'funnel';
  /** Capture de campagne : placez l'image dans `public/` (ex. `/cas/projet.jpg`). */
  image?: string;
  imageAlt?: string;
}

export interface Social {
  name: string;
  href: string;
  icon: IconName;
}

/* ── Identité & coordonnées ─────────────────────────────────────────────── */

export const site = {
  name: 'MIYA Agency',
  tagline: 'Agence de croissance digitale',
  description:
    "MIYA Agency aide les entreprises à générer plus de clients et de chiffre d'affaires : stratégie, acquisition (Meta Ads, Google Ads), génération de leads et landing pages conçues pour convertir.",
  locale: 'fr_FR',

  /** ⚠️ À remplacer par votre adresse e-mail de contact. */
  email: 'contact@miya-agency.com',

  /**
   * ⚠️ Lien de prise de rendez-vous. Remplacez-le par votre lien Calendly
   * (ex. https://calendly.com/votre-compte/appel-decouverte).
   * Tous les boutons « Réserver un appel » pointent vers cette adresse.
   * Si le lien est un lien Calendly, il s'ouvre dans une fenêtre intégrée ;
   * sinon il s'ouvre simplement dans un nouvel onglet.
   */
  calendlyUrl: 'https://calendly.com/miya-agency/appel-decouverte',

  /**
   * `true`  → affiche un badge « Exemple » sur les chiffres de démonstration.
   * `false` → masque les badges une fois vos vrais résultats renseignés.
   */
  demoData: true,
};

/* ── Réseaux sociaux (laissez le tableau vide pour ne rien afficher) ──────── */

export const socials: Social[] = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'linkedin' },
  { name: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' },
  { name: 'Facebook', href: 'https://www.facebook.com/', icon: 'facebook' },
  { name: 'X', href: 'https://x.com/', icon: 'x-twitter' },
];

/* ── Navigation ──────────────────────────────────────────────────────────── */

export const nav: NavItem[] = [
  { label: 'Accueil', href: '/#accueil' },
  { label: 'Services', href: '/#services' },
  { label: 'Études de cas', href: '/#etudes-de-cas' },
  { label: 'À propos', href: '/#a-propos' },
];

export const footerNav = {
  navigation: [
    { label: 'Accueil', href: '/#accueil' },
    { label: 'Services', href: '/#services' },
    { label: 'Études de cas', href: '/#etudes-de-cas' },
    { label: 'À propos', href: '/#a-propos' },
  ],
  contact: [
    { label: 'Contact', href: '/#contact' },
    { label: 'Réserver un appel', href: site.calendlyUrl },
    { label: site.email, href: `mailto:${site.email}` },
  ],
  legal: [
    { label: 'Mentions légales', href: '/mentions-legales/' },
    { label: 'Politique de confidentialité', href: '/politique-de-confidentialite/' },
  ],
} satisfies Record<string, NavItem[]>;

/* ── Hero ────────────────────────────────────────────────────────────────── */

export const hero = {
  badge: 'Agence de croissance digitale',
  /** Le segment `highlight` est affiché en violet dans le titre. */
  title: {
    before: 'Nous aidons les entreprises à générer ',
    highlight: 'plus de clients',
    after: " et de chiffre d'affaires.",
  },
  subtitle: 'Stratégie, acquisition et performance pour des résultats concrets et mesurables.',
  primaryCta: 'Réserver un appel',
  secondaryCta: 'Découvrir nos services',
};

/** Indicateurs affichés sous les boutons du hero — DONNÉES DE DÉMONSTRATION. */
export const heroStats: Stat[] = [
  { value: '+40 %', label: 'de leads qualifiés' },
  { value: 'x3', label: 'de retour sur investissement' },
  { value: '50+', label: 'campagnes pilotées' },
];

/* ── Clients ─────────────────────────────────────────────────────────────── */

/**
 * Ajoutez vos clients ici. Tant que le tableau est vide, le site affiche
 * `clientSlots` emplacements neutres prêts à recevoir vos logos.
 * Exemple : { name: 'Nom du client', logo: '/logos/nom-du-client.svg', href: 'https://…' }
 */
export const clients: Client[] = [];
export const clientSlots = 6;

/* ── Services ────────────────────────────────────────────────────────────── */

export const services: Service[] = [
  {
    icon: 'target',
    title: 'Acquisition de clients',
    description: "Meta Ads, Google Ads et stratégies d'acquisition sur mesure.",
  },
  {
    icon: 'funnel',
    title: 'Génération de leads',
    description: 'Des campagnes optimisées pour attirer des prospects qualifiés.',
  },
  {
    icon: 'layout',
    title: 'Création de landing pages',
    description: 'Des pages performantes conçues pour convertir les visiteurs en clients.',
  },
  {
    icon: 'compass',
    title: 'Stratégie digitale',
    description: 'Accompagnement stratégique et optimisation de la croissance.',
  },
];

/* ── Méthode ─────────────────────────────────────────────────────────────── */

export const steps: Step[] = [
  {
    number: '01',
    title: 'Analyse',
    description: 'Comprendre votre activité, vos objectifs et votre marché.',
  },
  {
    number: '02',
    title: 'Stratégie',
    description: "Construire une stratégie d'acquisition adaptée.",
  },
  {
    number: '03',
    title: 'Déploiement',
    description: 'Lancer et gérer les campagnes.',
  },
  {
    number: '04',
    title: 'Optimisation',
    description: 'Analyser les résultats et améliorer les performances.',
  },
];

/* ── Études de cas — DONNÉES DE DÉMONSTRATION ────────────────────────────── */

export const caseStudies: CaseStudy[] = [
  {
    name: 'Boutique de mode en ligne',
    sector: 'E-commerce',
    objective: 'Augmenter les ventes en ligne grâce à Meta Ads et Google Shopping.',
    results: [
      { value: '+45 %', label: "de chiffre d'affaires" },
      { value: 'x3,2', label: 'de ROAS' },
    ],
    visual: 'bars',
  },
  {
    name: 'Cabinet de conseil B2B',
    sector: 'Services B2B',
    objective: 'Générer des rendez-vous qualifiés avec une landing page et LinkedIn Ads.',
    results: [
      { value: '120', label: 'rendez-vous qualifiés' },
      { value: '-38 %', label: 'de coût par lead' },
    ],
    visual: 'line',
  },
  {
    name: "Réseau d'agences immobilières",
    sector: 'Immobilier',
    objective: "Capter des mandats de vente via une campagne locale d'acquisition.",
    results: [
      { value: '+210', label: 'leads vendeurs' },
      { value: '4,8 %', label: 'de taux de conversion' },
    ],
    visual: 'funnel',
  },
];

/* ── À propos ────────────────────────────────────────────────────────────── */

export const about = {
  title: 'Une agence de croissance, pas une agence de plus.',
  paragraphs: [
    "MIYA Agency accompagne les entreprises qui veulent transformer leur présence digitale en un véritable levier de croissance. Nous concevons et pilotons des dispositifs d'acquisition pensés pour une seule chose : générer des clients, de façon mesurable.",
    "Nous travaillons avec des marques en France et à l'international, avec une exigence commune : des décisions guidées par la donnée, une transparence totale sur les résultats et une relation de confiance sur le long terme.",
  ],
  values: [
    {
      title: 'Résultats mesurables',
      description: 'Chaque action est reliée à un objectif chiffré et suivie dans un reporting clair.',
    },
    {
      title: 'Transparence totale',
      description: 'Vous gardez la propriété de vos comptes publicitaires et la visibilité sur chaque euro investi.',
    },
    {
      title: 'Réactivité',
      description: 'Un interlocuteur dédié, des ajustements rapides et une communication directe.',
    },
    {
      title: 'Vision internationale',
      description: 'Des campagnes adaptées à chaque marché, en plusieurs langues et sur plusieurs plateformes.',
    },
  ],
};

/* ── Appel à l'action ────────────────────────────────────────────────────── */

export const cta = {
  title: 'Prêt à accélérer votre croissance ?',
  text: 'Discutons de votre projet et découvrons comment MIYA Agency peut vous aider à atteindre vos objectifs.',
  button: 'Réserver un appel',
  note: 'Appel découverte de 30 min · Sans engagement',
};
