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
  ],
})
