import { defineField, defineType } from 'sanity'

export const siteConfig = defineType({
  name: 'siteConfig',
  title: 'Configuration du site',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeadline',
      title: 'Accroche Hero',
      type: 'object',
      fields: [
        { name: 'fr', type: 'string', validation: (r) => r.required() },
        { name: 'en', type: 'string' },
      ],
    }),
    defineField({
      name: 'heroSub',
      title: 'Sous-titre Hero',
      type: 'object',
      fields: [
        { name: 'fr', type: 'text', rows: 2 },
        { name: 'en', type: 'text', rows: 2 },
      ],
    }),
    defineField({
      name: 'featuredArticles',
      title: 'Articles mis en avant',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'article' }] }],
      validation: (r) => r.max(3),
    }),
    defineField({
      name: 'newsletterSubtitle',
      title: 'Newsletter sous-titre',
      type: 'object',
      fields: [
        { name: 'fr', type: 'text', rows: 2 },
        { name: 'en', type: 'text', rows: 2 },
      ],
    }),

    // — Page À propos —
    defineField({
      name: 'aboutPhoto',
      title: 'Photo principale (À propos)',
      type: 'image',
      options: { hotspot: true },
      description: 'Photo portrait affichée sur la page À propos',
    }),
    defineField({
      name: 'aboutName',
      title: 'Prénom / Nom public',
      type: 'string',
      description: 'Ex : "Sophie" ou "Sophie G."',
    }),
    defineField({
      name: 'aboutIntro',
      title: 'Intro personnelle (1ère personne)',
      type: 'object',
      description: '2-3 phrases à la 1ère personne — ton chaleureux, affiché en grand',
      fields: [
        { name: 'fr', type: 'text', rows: 4 },
        { name: 'en', type: 'text', rows: 4 },
      ],
    }),
    defineField({
      name: 'aboutBio',
      title: 'Bio éditoriale (3ème personne)',
      type: 'object',
      description: 'Paragraphe style presse / magazine',
      fields: [
        { name: 'fr', type: 'text', rows: 6 },
        { name: 'en', type: 'text', rows: 6 },
      ],
    }),
  ],
})
