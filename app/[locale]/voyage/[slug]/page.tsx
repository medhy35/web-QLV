import { client } from '@/lib/sanity/client'
import { ARTICLE_QUERY, RELATED_ARTICLES_QUERY } from '@/lib/sanity/queries'
import { extractHeadings } from '@/lib/extractHeadings'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { components } from '@/components/article/PortableTextComponents'
import ArticleHero from '@/components/article/ArticleHero'
import ArticleSidebar from '@/components/article/ArticleSidebar'
import ReadingProgressBar from '@/components/ui/ReadingProgressBar'
import ArticleCard from '@/components/cards/ArticleCard'
import type { Metadata } from 'next'

export const revalidate = 60

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const article = await client.fetch(ARTICLE_QUERY, { slug }).catch(() => null)
  if (!article) return {}
  const title =
    locale === 'en' && article.seoTitle?.en
      ? article.seoTitle.en
      : (article.seoTitle?.fr ?? article.title.fr)
  const desc =
    locale === 'en' && article.seoDescription?.en
      ? article.seoDescription.en
      : article.seoDescription?.fr
  return {
    title: `${title} — WanderBite`,
    description: desc,
    openGraph: {
      images: [{ url: `/api/og?slug=${slug}&locale=${locale}` }],
    },
  }
}

export default async function VoyageArticlePage({ params }: Props) {
  const { locale, slug } = await params

  const [article, related] = await Promise.all([
    client
      .fetch(ARTICLE_QUERY, { slug }, { next: { revalidate: 60 } })
      .catch(() => null),
    client
      .fetch(RELATED_ARTICLES_QUERY, { pillar: 'voyage', slug }, { next: { revalidate: 60 } })
      .catch(() => []),
  ])

  if (!article || article.pillar !== 'voyage') notFound()

  const title = locale === 'en' && article.title.en ? article.title.en : article.title.fr
  const body =
    locale === 'en' && article.body?.en?.length > 0
      ? article.body.en
      : (article.body?.fr ?? [])
  const headings = extractHeadings(body)
  const hasAffiliates = body.some((b: { _type: string }) => b._type === 'affiliateBlock')

  return (
    <>
      <ReadingProgressBar />
      <article>
        {/* Disclaimer affilié */}
        {hasAffiliates && (
          <div className="bg-[#0d0b09] border-b border-[#faf9f6]/10 py-2 px-6 text-center">
            <p className="text-xs text-[#faf9f6]/40">
              {locale === 'fr'
                ? 'Cet article contient des liens affiliés.'
                : 'This article contains affiliate links.'}
            </p>
          </div>
        )}

        {/* Hero */}
        <ArticleHero
          title={title}
          coverImage={article.coverImage}
          pillar="voyage"
          tags={article.tags}
          publishedAt={article.publishedAt}
          locale={locale}
        />

        {/* Corps + sidebar */}
        <div className="bg-[#faf9f6]">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16">
              {/* Corps de l'article */}
              <div className="max-w-prose">
                <PortableText value={body} components={components} />
              </div>
              {/* Sidebar sticky */}
              <ArticleSidebar
                headings={headings}
                locale={locale}
                slug={slug}
                title={title}
                pillar="voyage"
              />
            </div>
          </div>
        </div>

        {/* Articles liés */}
        {related?.length > 0 && (
          <section className="bg-[#0d0b09] py-16 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-px bg-[#c9a96e]" />
                <p className="text-xs text-[#c9a96e] uppercase tracking-[0.25em]">
                  {locale === 'fr' ? 'À lire aussi' : 'Read next'}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((a: Parameters<typeof ArticleCard>[0]['article']) => (
                  <ArticleCard key={a._id} article={a} locale={locale} />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  )
}
