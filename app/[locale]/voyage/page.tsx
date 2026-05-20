import { client } from '@/lib/sanity/client'
import { ARTICLES_QUERY } from '@/lib/sanity/queries'
import ArticleGrid from '@/components/cards/ArticleGrid'
import type { Metadata } from 'next'

export const revalidate = 60

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'fr' ? 'Voyage — WanderBite' : 'Travel — WanderBite',
    description:
      locale === 'fr'
        ? 'Guides, carnets de route et adresses authentiques à travers le monde.'
        : 'Practical guides and authentic travel spots around the world.',
  }
}

const VOYAGE_FILTERS = [
  { value: 'all', label: 'Tout' },
  { value: 'asie', label: 'Asie' },
  { value: 'europe', label: 'Europe' },
  { value: 'afrique', label: 'Afrique' },
  { value: 'ameriques', label: 'Amériques' },
]

export default async function VoyagePage({ params }: Props) {
  const { locale } = await params
  const articles = await client
    .fetch(ARTICLES_QUERY, { pillar: 'voyage' }, { next: { revalidate: 60 } })
    .catch(() => [])

  return (
    <div className="bg-[#0d0b09] min-h-screen">
      {/* Hero cinématique vert forêt */}
      <div className="relative h-64 md:h-80 flex items-end pb-12 px-6 pt-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7ec87e]/20 via-[#0d0b09]/60 to-[#0d0b09]" />
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <p className="text-xs text-[#7ec87e] uppercase tracking-[0.3em] mb-3">Destinations</p>
          <h1 className="font-serif text-5xl md:text-6xl text-[#faf9f6]">
            {locale === 'fr' ? 'Voyage' : 'Travel'}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <ArticleGrid
          articles={articles}
          locale={locale}
          filters={VOYAGE_FILTERS}
          filterKey="region"
        />
      </div>
    </div>
  )
}
