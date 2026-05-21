import { defineField, defineType } from 'sanity'

export const popup = defineType({
  name: 'popup',
  title: 'Popup / Annonce',
  type: 'document',
  fields: [
    defineField({
      name: 'active',
      title: 'Activer le popup',
      type: 'boolean',
      description: 'Cochez pour afficher le popup aux visiteurs. Décochez pour le masquer.',
      initialValue: false,
    }),
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'object',
      fields: [
        { name: 'fr', type: 'string', title: 'Français' },
        { name: 'en', type: 'string', title: 'Anglais' },
      ],
    }),
    defineField({
      name: 'text',
      title: 'Texte / Description',
      type: 'object',
      fields: [
        { name: 'fr', type: 'text', rows: 3, title: 'Français' },
        { name: 'en', type: 'text', rows: 3, title: 'Anglais' },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Image (optionnel)',
      type: 'image',
      options: { hotspot: true },
      description: "Si présente, elle s'affiche en haut du popup.",
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Texte du bouton',
      type: 'object',
      fields: [
        { name: 'fr', type: 'string', title: 'Français', placeholder: 'Découvrir →' },
        { name: 'en', type: 'string', title: 'Anglais', placeholder: 'Discover →' },
      ],
    }),
    defineField({
      name: 'buttonUrl',
      title: 'Lien du bouton',
      type: 'url',
      description: 'URL vers laquelle le bouton redirige (lien interne ou externe).',
      validation: (r) => r.uri({ allowRelative: true }),
    }),
    defineField({
      name: 'expiresAt',
      title: "Date d'expiration (optionnel)",
      type: 'datetime',
      description: 'Le popup se désactive automatiquement après cette date.',
    }),
  ],
  preview: {
    select: { title: 'title.fr', active: 'active' },
    prepare({ title, active }) {
      return {
        title: title ?? 'Popup sans titre',
        subtitle: active ? '✅ Actif' : '⏸ Désactivé',
      }
    },
  },
})
