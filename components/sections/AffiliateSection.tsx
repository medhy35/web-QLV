import Link from 'next/link'
import AffiliateCard from '@/components/cards/AffiliateCard'

type Props = {
  items: Parameters<typeof AffiliateCard>[0]['item'][]
  locale: string
}

export default function AffiliateSection({ items, locale }: Props) {
  return (
    <section className="bg-[#0d0b09] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-8 h-px bg-[#c9a96e]" />
              <p className="text-xs text-[#c9a96e] uppercase tracking-[0.25em]">
                {locale === 'fr' ? 'Bons Plans' : 'Deals'}
              </p>
            </div>
            <h2 className="font-serif text-3xl text-[#faf9f6]">
              {locale === 'fr' ? 'Mes recommandations' : 'My recommendations'}
            </h2>
          </div>
          <Link
            href={`/${locale}/bons-plans`}
            className="hidden md:block text-xs text-[#faf9f6]/50 hover:text-[#c9a96e] transition-colors uppercase tracking-widest"
          >
            {locale === 'fr' ? 'Tout voir →' : 'See all →'}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item) => (
            <AffiliateCard key={item._id} item={item} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  )
}
