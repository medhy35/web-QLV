import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import type { PortableTextComponents } from '@portabletext/react'

/* ------------------------------------------------------------------ */
/* Types Sanity inline                                                   */
/* ------------------------------------------------------------------ */
type SanityImage = Record<string, unknown>

type AffiliateBlockValue = {
  partner?: string
  name?: string
  url?: string
  price?: string
  description?: string
  image?: SanityImage
}

type PullQuoteValue = {
  quote?: string
}

type PracticalBoxValue = {
  title?: string
  content?: Array<{
    _type: string
    children?: Array<{ text?: string }>
  }>
}

type ImageValue = SanityImage & {
  alt?: string
  caption?: string
}

/* ------------------------------------------------------------------ */
/* Composants                                                            */
/* ------------------------------------------------------------------ */
export const components: PortableTextComponents = {
  types: {
    /* ---------- Image pleine largeur ---------- */
    image: ({ value }: { value: ImageValue }) => (
      <figure className="my-8 -mx-4 md:mx-0">
        <div className="relative aspect-[16/9]">
          <Image
            src={urlFor(value as Parameters<typeof urlFor>[0]).width(1200).url()}
            alt={value.alt ?? ''}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>
        {value.caption && (
          <figcaption className="text-center text-xs text-[#3d3330]/60 mt-2 italic">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),

    /* ---------- Bloc affilié ---------- */
    affiliateBlock: ({ value }: { value: AffiliateBlockValue }) => (
      <aside className="my-8 border border-[#c9a96e]/30 rounded-sm overflow-hidden not-prose">
        {/* Header sombre */}
        <div className="bg-[#0d0b09] px-5 py-3 flex items-center gap-3">
          <span className="text-xs text-[#c9a96e] uppercase tracking-widest font-medium">
            {value.partner}
          </span>
          <div className="h-px flex-1 bg-[#c9a96e]/20" />
          <span className="text-xs text-[#faf9f6]/30">Lien affilié</span>
        </div>
        {/* Corps */}
        <div className="bg-[#faf9f6]/5 p-5 flex flex-col sm:flex-row gap-5 items-start">
          {value.image && (
            <div className="relative w-full sm:w-32 aspect-[4/3] shrink-0 overflow-hidden rounded-sm">
              <Image
                src={urlFor(value.image as Parameters<typeof urlFor>[0]).width(256).url()}
                alt={value.name ?? ''}
                fill
                className="object-cover"
                sizes="128px"
              />
            </div>
          )}
          <div className="flex-1">
            <p className="font-serif text-lg text-[#faf9f6] mb-1">{value.name}</p>
            {value.description && (
              <p className="text-sm text-[#3d3330] leading-relaxed mb-3">
                {value.description}
              </p>
            )}
            {value.price && (
              <p className="text-[#c9a96e] text-sm font-medium mb-4">
                à partir de {value.price}
              </p>
            )}
            {value.url && (
              <a
                href={value.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-block px-5 py-2 bg-[#c9a96e] text-[#0d0b09] text-xs uppercase tracking-widest font-semibold hover:bg-[#c9a96e]/90 transition-colors"
              >
                Voir l&apos;offre →
              </a>
            )}
          </div>
        </div>
      </aside>
    ),

    /* ---------- Pull quote ---------- */
    pullQuote: ({ value }: { value: PullQuoteValue }) => (
      <blockquote className="my-10 relative px-8 py-6 bg-[#0d0b09]/80 border-l-4 border-[#c9a96e] not-prose">
        <span
          className="absolute top-2 left-4 text-6xl text-[#c9a96e]/20 font-serif leading-none select-none"
          aria-hidden
        >
          &ldquo;
        </span>
        <p className="font-serif text-xl md:text-2xl text-[#faf9f6] leading-relaxed relative z-10">
          {value.quote}
        </p>
      </blockquote>
    ),

    /* ---------- Encadré pratique ---------- */
    practicalBox: ({ value }: { value: PracticalBoxValue }) => (
      <aside className="my-8 bg-[#faf9f6]/5 border border-[#f5c07a]/20 rounded-sm p-6 not-prose">
        {value.title && (
          <p className="text-xs text-[#f5c07a] uppercase tracking-widest font-medium mb-4">
            {value.title}
          </p>
        )}
        <div className="text-sm text-[#3d3330] leading-relaxed space-y-2">
          {value.content?.map((block, i) => (
            <p key={i}>{block.children?.map((c) => c.text).join('')}</p>
          ))}
        </div>
      </aside>
    ),
  },

  /* ---------------------------------------------------------------- */
  /* Blocs texte                                                        */
  /* ---------------------------------------------------------------- */
  block: {
    h2: ({ children }) => (
      <h2 className="font-serif text-3xl text-[#1c1917] mt-12 mb-4 scroll-mt-24 pb-3 border-b border-[#1c1917]/10">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-2xl text-[#1c1917] mt-8 mb-3 scroll-mt-24">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-[#3d3330] leading-[1.85] mb-5">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#c9a96e] pl-5 my-6 text-[#3d3330] italic text-lg">
        {children}
      </blockquote>
    ),
  },

  /* ---------------------------------------------------------------- */
  /* Marks (inline)                                                     */
  /* ---------------------------------------------------------------- */
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[#1c1917]">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="text-[#c9a96e] not-italic font-medium">{children}</em>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="text-[#c9a96e] underline underline-offset-2 hover:text-[#c9a96e]/70 transition-colors"
      >
        {children}
      </a>
    ),
  },
}
