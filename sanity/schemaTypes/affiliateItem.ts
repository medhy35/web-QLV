import { defineField, defineType } from 'sanity'

export const affiliateItem = defineType({
  name: 'affiliateItem',
  title: 'Bon Plan Affilié',
  type: 'document',
  fields: [
    defineField({
      name: 'partner',
      title: 'Partenaire',
      type: 'string',
      options: {
        list: ['getyourguide', 'viator', 'booking', 'amazon'].map((v) => ({
          title: v,
          value: v,
        })),
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'object',
      fields: [
        { name: 'fr', type: 'string', validation: (r) => r.required() },
        { name: 'en', type: 'string' },
      ],
    }),
    defineField({
      name: 'url',
      title: 'URL affilié',
      type: 'url',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'destination', title: 'Destination', type: 'string' }),
    defineField({ name: 'price', title: 'Prix', type: 'string' }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'featured',
      title: 'Mis en avant (homepage)',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
