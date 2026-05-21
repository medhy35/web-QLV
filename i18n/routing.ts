import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'en',
  // Détection automatique de la langue du navigateur
  // FR → /fr, tout le reste → /en (par défaut)
  localeDetection: true,
})
