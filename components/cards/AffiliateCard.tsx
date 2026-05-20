import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'

const PARTNER_COLORS: Record<string, string> = {
  getyourguide: '#FF5533',
  viator: '#1C5FAD',
  booking: '#003580',
  amazon: '#FF9900',
}

type AffiliateItem = {
  _id: string
  partner: string
  name: { fr: string; en?: string }
  url: string
  destination?: string
  price?: string
  image?: Record<string, unknown> | null
}

type Props = {
  item: AffiliateItem
  locale: string
}

export default function AffiliateCard({ item, locale }: Props) {
  const name = locale === 'en' && item.name.en ? item.name.en : item.name.fr
  const color = PARTNER_COLORS[item.partner] ?? '#c9a96e'

  return (
    <div className="bg-[#0d0b09]/60 border border-[#faf9f6]/10 rounded-sm overflow-hidden group hover:border-[#c9a96e]/30 transition-colors">
      {item.image && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={urlFor(item.image as Parameters<typeof urlFor>[0]).width(400).height(225).url()}
            alt={name}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b09]/50 to-transparent" />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs uppercase tracking-widest" style={{ color }}>
            {item.partner}
          </span>
          {item.destination && (
            <span className="text-xs text-[#faf9f6]/40">{item.destination}</span>
          )}
        </div>
        <p className="font-serif text-lg text-[#faf9f6] leading-snug mb-3">{name}</p>
        {item.price && (
          <p className="text-[#c9a96e] text-sm font-medium mb-4">
            {locale === 'fr' ? 'à partir de' : 'from'} {item.price}
          </p>
        )}
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="block text-center py-2.5 px-4 border border-[#c9a96e]/50 text-[#c9a96e] text-xs uppercase tracking-widest hover:bg-[#c9a96e] hover:text-[#0d0b09] transition-all duration-300"
        >
          {locale === 'fr' ? 'Voir le bon plan →' : 'See deal →'}
        </a>
      </div>
    </div>
  )
}
