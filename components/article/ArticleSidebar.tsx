import TableOfContents, { type TocHeading } from './TableOfContents'
import AffiliateCard from '@/components/cards/AffiliateCard'

type AffiliateItem = Parameters<typeof AffiliateCard>[0]['item']

type Props = {
  headings: TocHeading[]
  affiliateItem?: AffiliateItem
  locale: string
  slug: string
  title: string
  pillar: 'voyage' | 'food'
}

export default function ArticleSidebar({
  headings,
  affiliateItem,
  locale,
  slug,
  title,
  pillar,
}: Props) {
  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wanderbite.com'}/${locale}/${pillar}/${slug}`
  const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(pageUrl)}&description=${encodeURIComponent(title)}`

  return (
    <aside className="sticky top-24 space-y-8">
      {/* Table des matières */}
      {headings.length > 0 && <TableOfContents headings={headings} />}

      {/* Boutons de partage */}
      <div>
        <p className="text-xs text-[#faf9f6]/40 uppercase tracking-widest mb-4">
          {locale === 'fr' ? 'Partager' : 'Share'}
        </p>
        <div className="flex flex-wrap gap-2">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-2 border border-[#faf9f6]/20 text-[#faf9f6]/50 hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors"
          >
            Instagram
          </a>
          <a
            href={pinterestUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-2 border border-[#faf9f6]/20 text-[#faf9f6]/50 hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors"
          >
            Pinterest
          </a>
        </div>
      </div>

      {/* Bloc affilié hébergement */}
      {affiliateItem && (
        <div>
          <p className="text-xs text-[#faf9f6]/40 uppercase tracking-widest mb-4">
            {locale === 'fr' ? 'Bon plan hébergement' : 'Accommodation deal'}
          </p>
          <AffiliateCard item={affiliateItem} locale={locale} />
        </div>
      )}
    </aside>
  )
}
