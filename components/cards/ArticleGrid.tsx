'use client'
import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import FilterBar from '@/components/ui/FilterBar'
import SortMenu from '@/components/ui/SortMenu'
import ArticleCard from '@/components/cards/ArticleCard'

type Article = {
  _id: string
  title: { fr: string; en?: string }
  slug: { current: string }
  pillar: 'voyage' | 'food'
  tags?: string[]
  region?: string
  publishedAt: string
  coverImage: Record<string, unknown> | null
  excerpt?: { fr?: string; en?: string }
}

type Props = {
  articles: Article[]
  locale: string
  filters: { value: string; label: string }[]
  filterKey: 'region' | 'tags'
}

export default function ArticleGrid({ articles, locale, filters, filterKey }: Props) {
  const t = useTranslations('filters')
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeSort, setActiveSort] = useState('recent')

  const sortOptions = [
    { value: 'recent', label: t('recent') },
    { value: 'popular', label: t('popular') },
    { value: 'oldest', label: t('oldest') },
  ]

  const filtered = useMemo(() => {
    const matching =
      activeFilter === 'all'
        ? articles
        : articles.filter((a) =>
            filterKey === 'tags'
              ? a.tags?.includes(activeFilter)
              : a.region === activeFilter
          )

    return [...matching].sort((a, b) => {
      if (activeSort === 'recent')
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      if (activeSort === 'oldest')
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      return 0
    })
  }, [articles, activeFilter, activeSort, filterKey])

  return (
    <div>
      {/* Barre sticky filtre + tri */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sticky top-16 bg-[#0d0b09] py-4 z-10 border-b border-[#faf9f6]/5">
        <p className="text-xs text-[#faf9f6]/40 uppercase tracking-widest shrink-0">
          {t('articles', { count: filtered.length })}
        </p>
        <FilterBar filters={filters} active={activeFilter} onChange={setActiveFilter} />
        <SortMenu options={sortOptions} active={activeSort} onChange={setActiveSort} />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-[#faf9f6]/30 text-sm">
            {locale === 'fr'
              ? 'Aucun article dans cette catégorie.'
              : 'No articles in this category.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <ArticleCard key={article._id} article={article} locale={locale} size="small" />
          ))}
        </div>
      )}
    </div>
  )
}
