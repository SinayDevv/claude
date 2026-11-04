/**
 * Script global (≈2 Ko) : en-tête au défilement, menu mobile, apparitions
 * au défilement et ouverture de Calendly dans une fenêtre intégrée.
 */

/* ── En-tête : état « scrolled » ───────────────────────────────────────── */

const header = document.querySelector<HTMLElement>('[data-header]');

const updateHeader = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 8);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

/* ── Menu mobile ───────────────────────────────────────────────────────── */

const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
const navPanel = document.querySelector<HTMLElement>('[data-nav]');

const setNav = (open: boolean) => {
  if (!toggle || !navPanel) return;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  navPanel.classList.toggle('is-open', open);
  document.body.classList.toggle('nav-open', open);
};

toggle?.addEventListener('click', () => {
  setNav(toggle.getAttribute('aria-expanded') !== 'true');
});

navPanel?.addEventListener('click', (event) => {
  if ((event.target as Element).closest('a')) setNav(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navPanel?.classList.contains('is-open')) {
    setNav(false);
    toggle?.focus();
  }
});

const desktopQuery = window.matchMedia('(min-width: 901px)');
desktopQuery.addEventListener('change', (event) => {
  if (event.matches) setNav(false);
});

/* ── Apparition au défilement ──────────────────────────────────────────── */

const revealTargets = document.querySelectorAll<HTMLElement>('[data-reveal]');

if ('IntersectionObserver' in window && revealTargets.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
  );
  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('is-visible'));
}

/* ── Calendly : fenêtre intégrée (chargée uniquement au clic) ──────────── */

interface CalendlyApi {
  initPopupWidget(options: { url: string }): void;
}

declare global {
  interface Window {
    Calendly?: CalendlyApi;
  }
}

let calendlyLoader: Promise<CalendlyApi> | undefined;

const loadCalendly = (): Promise<CalendlyApi> => {
  if (window.Calendly) return Promise.resolve(window.Calendly);
  if (calendlyLoader) return calendlyLoader;

  calendlyLoader = new Promise((resolve, reject) => {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.append(css);

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => (window.Calendly ? resolve(window.Calendly) : reject(new Error('Calendly indisponible')));
    script.onerror = () => reject(new Error('Calendly indisponible'));
    document.head.append(script);
  });

  return calendlyLoader;
};

document.addEventListener('click', (event) => {
  const link = (event.target as Element).closest<HTMLAnchorElement>('a[data-calendly]');
  if (!link) return;

  let url: URL;
  try {
    url = new URL(link.href);
  } catch {
    return;
  }
  // Fenêtre intégrée uniquement pour Calendly ; les autres outils s'ouvrent dans un nouvel onglet.
  if (!url.hostname.endsWith('calendly.com')) return;

  event.preventDefault();
  const href = url.toString();
  loadCalendly()
    .then((calendly) => calendly.initPopupWidget({ url: href }))
    .catch(() => window.open(href, '_blank', 'noopener'));
});

export {};
