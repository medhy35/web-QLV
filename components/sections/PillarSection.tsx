import Link from 'next/link'

type Props = { locale: string }

export default function PillarSection({ locale }: Props) {
  const fr = locale === 'fr'

  const pillars = [
    {
      key: 'voyage',
      href: `/${locale}/voyage`,
      border: 'border-[#7ec87e]/30',
      tagColor: 'text-[#7ec87e]',
      label: fr ? 'Voyage' : 'Travel',
      desc: fr
        ? 'Asie, Europe, Amériques. Guides pratiques, carnets de route, spots hors des sentiers battus.'
        : 'Asia, Europe, Americas. Practical guides, travel journals, off-the-beaten-path spots.',
      cta: fr ? 'Explorer' : 'Explore',
      tags: ['Asie', 'Europe', 'Guides', '48h'],
    },
    {
      key: 'food',
      href: `/${locale}/food`,
      border: 'border-[#f5c07a]/30',
      tagColor: 'text-[#f5c07a]',
      label: 'Food',
      desc: fr
        ? 'Street food, marchés, recettes locales. La gastronomie authentique à portée de fourchette.'
        : 'Street food, markets, local recipes. Authentic gastronomy at your fingertips.',
      cta: fr ? 'Découvrir' : 'Discover',
      tags: ['Street food', 'Marchés', 'Recettes', 'Végétarien'],
    },
  ]

  return (
    <section className="bg-[#0d0b09] py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-[#faf9f6]/5">
        {pillars.map((p) => (
          <div
            key={p.key}
            className="bg-[#0d0b09] p-12 flex flex-col justify-between min-h-[340px] group hover:bg-[#faf9f6]/[0.02] transition-colors duration-500"
          >
            <div>
              <p className={`text-xs uppercase tracking-[0.3em] ${p.tagColor} mb-4`}>
                {p.label}
              </p>
              <p className="font-serif text-3xl text-[#faf9f6] leading-tight mb-6">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs px-3 py-1 border ${p.border} ${p.tagColor} rounded-full`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href={p.href}
              className={`mt-8 self-start px-6 py-2.5 border ${p.border} ${p.tagColor} text-sm uppercase tracking-widest hover:border-current transition-all duration-300`}
            >
              {p.cta} →
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
