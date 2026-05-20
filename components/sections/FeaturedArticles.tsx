import ArticleCard from '@/components/cards/ArticleCard'

type Props = {
  articles: Parameters<typeof ArticleCard>[0]['article'][]
  locale: string
}

export default function FeaturedArticles({ articles, locale }: Props) {
  const [featured, ...rest] = articles

  return (
    <section className="bg-[#faf9f6] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-8 h-px bg-[#c9a96e]" />
          <p className="text-xs text-[#c9a96e] uppercase tracking-[0.25em]">
            {locale === 'fr' ? 'À la une' : 'Featured'}
          </p>
        </div>

        {/* Grille asymétrique 12 colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {featured && (
            <div className="lg:col-span-7">
              <ArticleCard article={featured} locale={locale} size="large" />
            </div>
          )}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {rest.slice(0, 2).map((article) => (
              <ArticleCard key={article._id} article={article} locale={locale} size="small" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
