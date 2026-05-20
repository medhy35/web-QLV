import { client } from '@/lib/sanity/client'
import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wanderbite.com'
const LOCALES = ['fr', 'en'] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Pages statiques
  const staticPaths = ['', '/voyage', '/food', '/reels', '/bons-plans', '/a-propos']
  const staticEntries: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.8,
    }))
  )

  // Articles dynamiques
  let articleEntries: MetadataRoute.Sitemap = []
  try {
    const articles: { slug: { current: string }; pillar: string; publishedAt?: string }[] =
      await client.fetch(
        `*[_type == "article"] { slug, pillar, publishedAt }`
      )
    articleEntries = LOCALES.flatMap((locale) =>
      articles.map((a) => ({
        url: `${BASE_URL}/${locale}/${a.pillar}/${a.slug.current}`,
        lastModified: a.publishedAt ? new Date(a.publishedAt) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
    )
  } catch {
    // Sanity non configuré en build — sitemap partiel
  }

  return [...staticEntries, ...articleEntries]
}
