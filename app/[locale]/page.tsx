import { client } from '@/lib/sanity/client'
import { HOMEPAGE_QUERY } from '@/lib/sanity/queries'
import HeroSection from '@/components/sections/HeroSection'
import FeaturedArticles from '@/components/sections/FeaturedArticles'
import PillarSection from '@/components/sections/PillarSection'
import AffiliateSection from '@/components/sections/AffiliateSection'
import NewsletterSection from '@/components/sections/NewsletterSection'

export const revalidate = 60

type Props = { params: Promise<{ locale: string }> }

export default async function HomePage({ params }: Props) {
  const { locale } = await params

  const data = await client
    .fetch(HOMEPAGE_QUERY, {}, { next: { revalidate: 60 } })
    .catch(() => null)

  const config = data?.config
  const headline =
    locale === 'en' && config?.heroHeadline?.en
      ? config.heroHeadline.en
      : (config?.heroHeadline?.fr ?? '_Aventures_ culinaires & voyages authentiques')
  const sub =
    locale === 'en' && config?.heroSub?.en ? config.heroSub.en : config?.heroSub?.fr

  return (
    <>
      <HeroSection headline={headline} sub={sub} />

      {config?.featuredArticles?.length > 0 && (
        <FeaturedArticles articles={config.featuredArticles} locale={locale} />
      )}

      <PillarSection locale={locale} />

      {data?.affiliates?.length > 0 && (
        <AffiliateSection items={data.affiliates} locale={locale} />
      )}

      <NewsletterSection />
    </>
  )
}
