import { defineField, defineType } from 'sanity'

export const reel = defineType({
  name: 'reel',
  title: 'Reel Instagram',
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
      name: 'instagramUrl',
      title: 'URL Instagram',
      type: 'url',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'account',
      title: 'Compte',
      type: 'string',
      options: {
        list: [
          { title: '@QueleVentre', value: 'queleventre' },
          { title: '@gmjourneys', value: 'gmjourneys' },
        ],
      },
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
    }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'publishedAt',
      title: 'Date',
      type: 'datetime',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Image de couverture',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'stats',
      title: 'Statistiques',
      type: 'object',
      fields: [
        { name: 'likes', title: 'Likes', type: 'number' },
        { name: 'comments', title: 'Commentaires', type: 'number' },
        { name: 'shares', title: 'Partages', type: 'number' },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Mis en avant',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
