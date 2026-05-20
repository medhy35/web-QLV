import { defineField, defineType } from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'string', validation: (r) => r.required() },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.fr' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'pillar',
      title: 'Pilier',
      type: 'string',
      options: {
        list: [
          { title: 'Voyage', value: 'voyage' },
          { title: 'Food', value: 'food' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'region', title: 'Région', type: 'string' }),
    defineField({
      name: 'coverImage',
      title: 'Image de couverture',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Extrait',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'text', rows: 3 },
        { name: 'en', title: 'English', type: 'text', rows: 3 },
      ],
    }),
    defineField({
      name: 'body',
      title: 'Contenu',
      type: 'object',
      fields: [
        {
          name: 'fr',
          title: 'Français',
          type: 'array',
          of: [
            { type: 'block' },
            { type: 'image', options: { hotspot: true } },
            { type: 'affiliateBlock' },
            { type: 'pullQuote' },
            { type: 'practicalBox' },
          ],
        },
        {
          name: 'en',
          title: 'English',
          type: 'array',
          of: [
            { type: 'block' },
            { type: 'image', options: { hotspot: true } },
            { type: 'affiliateBlock' },
            { type: 'pullQuote' },
            { type: 'practicalBox' },
          ],
        },
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'object',
      fields: [
        { name: 'fr', type: 'string' },
        { name: 'en', type: 'string' },
      ],
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'object',
      fields: [
        { name: 'fr', type: 'string' },
        { name: 'en', type: 'string' },
      ],
    }),
  ],
})

export const affiliateBlock = defineType({
  name: 'affiliateBlock',
  title: 'Bloc Affilié',
  type: 'object',
  fields: [
    { name: 'partner', title: 'Partenaire', type: 'string' },
    { name: 'name', title: 'Nom', type: 'string' },
    { name: 'url', title: 'URL affilié', type: 'url' },
    { name: 'price', title: 'Prix', type: 'string' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'description', title: 'Description courte', type: 'text', rows: 2 },
  ],
})

export const pullQuote = defineType({
  name: 'pullQuote',
  title: 'Pull Quote',
  type: 'object',
  fields: [{ name: 'quote', title: 'Citation', type: 'text', rows: 3 }],
})

export const practicalBox = defineType({
  name: 'practicalBox',
  title: 'Encadré Pratique',
  type: 'object',
  fields: [
    { name: 'title', title: 'Titre', type: 'string' },
    { name: 'content', title: 'Contenu', type: 'array', of: [{ type: 'block' }] },
  ],
})
