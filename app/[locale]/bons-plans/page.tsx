import { client } from '@/lib/sanity/client'
import { AFFILIATE_QUERY } from '@/lib/sanity/queries'
import AffiliateCard from '@/components/cards/AffiliateCard'
import type { Metadata } from 'next'

export const revalidate = 60

type Props = { params: Promise<{ locale: string }> }

const PARTNERS = ['getyourguide', 'viator', 'booking', 'amazon'] as const
type Partner = (typeof PARTNERS)[number]

const PARTNER_LABELS: Record<Partner, { fr: string; en: string }> = {
  getyourguide: { fr: 'Activités', en: 'Activities' },
  viator: { fr: 'Expériences', en: 'Experiences' },
  booking: { fr: 'Hébergement', en: 'Accommodation' },
  amazon: { fr: 'Équipement', en: 'Gear' },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    title:
      locale === 'fr'
        ? 'Bons Plans voyage & food — WanderBite'
        : 'Travel & Food Deals — WanderBite',
    description:
      locale === 'fr'
        ? 'Activités, hébergements et équipements sélectionnés par nos soins.'
        : 'Activities, accommodations and gear handpicked for you.',
  }
}

type AffiliateItem = {
  _id: string
  partner: string
  name: { fr: string; en?: string }
  url: string
  destination?: string
  price?: string
  image?: Record<string, unknown> | null
  featured?: boolean
}

export default async function BonsPlansPage({ params }: Props) {
  const { locale } = await params

  const affiliates: AffiliateItem[] = await client
    .fetch(AFFILIATE_QUERY, {}, { next: { revalidate: 60 } })
    .catch(() => [])

  // Grouper par partenaire
  const byPartner: Record<string, AffiliateItem[]> = {}
  for (const item of affiliates) {
    if (!byPartner[item.partner]) byPartner[item.partner] = []
    byPartner[item.partner].push(item)
  }

  // Partenaires présents dans les données, dans l'ordre défini
  const activePartners = PARTNERS.filter((p) => (byPartner[p]?.length ?? 0) > 0)

  return (
    <main>
      {/* Hero */}
      <section className="bg-[#0d0b09] pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-[#c9a96e]" />
            <p className="text-xs text-[#c9a96e] uppercase tracking-[0.25em]">
              {locale === 'fr' ? 'Sélection' : 'Curated picks'}
            </p>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl text-[#faf9f6] leading-tight mb-4">
            {locale === 'fr' ? 'Bons Plans' : 'Best Deals'}
          </h1>
          <p className="text-[#faf9f6]/50 text-base max-w-xl leading-relaxed">
            {locale === 'fr'
              ? 'Activités, hébergements, restaurants et équipements testés et approuvés.'
              : 'Activities, stays, restaurants and gear tested and approved by us.'}
          </p>
          {/* Disclaimer affilié */}
          <p className="mt-6 text-[10px] text-[#faf9f6]/25 max-w-lg leading-relaxed">
            {locale === 'fr'
              ? 'Certains liens sont affiliés — nous touchons une petite commission sans frais supplémentaires pour vous. Nous ne recommandons que ce que nous utilisons vraiment.'
              : 'Some links are affiliate links — we earn a small commission at no extra cost to you. We only recommend what we genuinely use.'}
          </p>
        </div>
      </section>

      {/* Sections par partenaire */}
      <div className="bg-[#0d0b09] pb-24">
        {activePartners.length === 0 ? (
          <div className="max-w-7xl mx-auto px-6 py-20 text-center">
            <p className="text-[#faf9f6]/40 text-sm">
              {locale === 'fr'
                ? 'Les bons plans arrivent bientôt…'
                : 'Deals coming soon…'}
            </p>
          </div>
        ) : (
          activePartners.map((partner) => {
            const items = byPartner[partner]
            const label =
              PARTNER_LABELS[partner]?.[locale as 'fr' | 'en'] ??
              PARTNER_LABELS[partner]?.fr ??
              partner

            return (
              <section key={partner} className="max-w-7xl mx-auto px-6 py-12">
                {/* En-tête de section */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-6 h-px bg-[#faf9f6]/20" />
                  <h2 className="text-xs text-[#faf9f6]/40 uppercase tracking-[0.2em]">
                    {label}
                  </h2>
                  <div className="flex-1 h-px bg-[#faf9f6]/10" />
                </div>

                {/* Grille de cartes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {items.map((item) => (
                    <AffiliateCard key={item._id} item={item} locale={locale} />
                  ))}
                </div>
              </section>
            )
          })
        )}
      </div>
    </main>
  )
}
