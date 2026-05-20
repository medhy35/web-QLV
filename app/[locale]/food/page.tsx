import { client } from '@/lib/sanity/client'
import { ARTICLES_QUERY } from '@/lib/sanity/queries'
import ArticleGrid from '@/components/cards/ArticleGrid'
import type { Metadata } from 'next'

export const revalidate = 60

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'Food — WanderBite',
    description:
      locale === 'fr'
        ? 'Street food, marchés, recettes locales. La gastronomie authentique du monde entier.'
        : 'Street food, markets, local recipes. Authentic gastronomy from around the world.',
  }
}

const FOOD_FILTERS = [
  { value: 'all', label: 'Tout' },
  { value: 'street-food', label: 'Street food' },
  { value: 'marches', label: 'Marchés' },
  { value: 'restaurants', label: 'Restaurants' },
  { value: 'recettes', label: 'Recettes' },
  { value: 'vegetarien', label: 'Végétarien' },
]

export default async function FoodPage({ params }: Props) {
  const { locale } = await params
  const articles = await client
    .fetch(ARTICLES_QUERY, { pillar: 'food' }, { next: { revalidate: 60 } })
    .catch(() => [])

  return (
    <div className="bg-[#0d0b09] min-h-screen">
      {/* Hero cinématique ambre chaud */}
      <div className="relative h-64 md:h-80 flex items-end pb-12 px-6 pt-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5c07a]/20 via-[#0d0b09]/60 to-[#0d0b09]" />
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <p className="text-xs text-[#f5c07a] uppercase tracking-[0.3em] mb-3">Gastronomie</p>
          <h1 className="font-serif text-5xl md:text-6xl text-[#faf9f6]">Food</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <ArticleGrid
          articles={articles}
          locale={locale}
          filters={FOOD_FILTERS}
          filterKey="tags"
        />
      </div>
    </div>
  )
}
