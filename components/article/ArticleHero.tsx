import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/image'

type Props = {
  title: string
  coverImage: Record<string, unknown> | null
  pillar: 'voyage' | 'food'
  tags?: string[]
  publishedAt: string
  locale: string
}

export default function ArticleHero({
  title,
  coverImage,
  pillar,
  tags,
  publishedAt,
  locale,
}: Props) {
  const pillarHref = `/${locale}/${pillar}`
  const pillarLabel =
    pillar === 'voyage' ? (locale === 'fr' ? 'Voyage' : 'Travel') : 'Food'
  const pillarColor = pillar === 'voyage' ? 'text-[#7ec87e]' : 'text-[#f5c07a]'
  const pillarBorder =
    pillar === 'voyage' ? 'border-[#7ec87e]/30' : 'border-[#f5c07a]/30'

  const date = new Date(publishedAt).toLocaleDateString(
    locale === 'fr' ? 'fr-FR' : 'en-US',
    { day: 'numeric', month: 'long', year: 'numeric' }
  )

  return (
    <div className="relative h-[70vh] min-h-[480px] flex items-end overflow-hidden">
      {coverImage && (
        <Image
          src={urlFor(coverImage as Parameters<typeof urlFor>[0])
            .width(1600)
            .height(900)
            .url()}
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      )}
      {/* Gradient sombre du bas */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b09] via-[#0d0b09]/60 to-transparent" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-12">
        {/* Breadcrumb */}
        <nav
          aria-label={locale === 'fr' ? "Fil d'Ariane" : 'Breadcrumb'}
          className="flex items-center gap-2 text-xs text-[#faf9f6]/40 mb-4"
        >
          <Link href={`/${locale}`} className="hover:text-[#faf9f6] transition-colors">
            WanderBite
          </Link>
          <span>/</span>
          <Link
            href={pillarHref}
            className={`hover:text-[#faf9f6] transition-colors ${pillarColor}`}
          >
            {pillarLabel}
          </Link>
        </nav>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs px-3 py-1 border ${pillarBorder} ${pillarColor} rounded-full`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Titre */}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#faf9f6] leading-tight text-balance mb-4">
          {title}
        </h1>

        {/* Date */}
        <p className="text-[#faf9f6]/50 text-sm">{date}</p>
      </div>
    </div>
  )
}
