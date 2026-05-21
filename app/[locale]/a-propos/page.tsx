import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { ABOUT_QUERY } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import type { Metadata } from 'next'

export const revalidate = 60

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'fr' ? 'À propos — WanderBite' : 'About — WanderBite',
    description:
      locale === 'fr'
        ? "Découvrez qui se cache derrière WanderBite — voyage, food et passion authentique."
        : 'Discover the person behind WanderBite — travel, food and genuine passion.',
    openGraph: {
      images: [{ url: `/api/og?slug=a-propos&locale=${locale}` }],
    },
  }
}

type AboutData = {
  aboutPhoto?: Record<string, unknown> | null
  aboutName?: string | null
  aboutIntro?: { fr?: string; en?: string } | null
  aboutBio?: { fr?: string; en?: string } | null
}

const STATS = [
  { value: '2', label: { fr: 'comptes Instagram', en: 'Instagram accounts' } },
  { value: '50k+', label: { fr: 'abonnés réunis', en: 'combined followers' } },
  { value: '30+', label: { fr: 'pays explorés', en: 'countries explored' } },
  { value: '∞', label: { fr: 'bonnes adresses', en: 'good addresses' } },
]

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  const l = locale as 'fr' | 'en'

  const about: AboutData = await client
    .fetch(ABOUT_QUERY, {}, { next: { revalidate: 60 } })
    .catch(() => ({}))

  const name = about?.aboutName ?? null
  const intro = l === 'en' && about?.aboutIntro?.en
    ? about.aboutIntro.en
    : (about?.aboutIntro?.fr ?? null)
  const bio = l === 'en' && about?.aboutBio?.en
    ? about.aboutBio.en
    : (about?.aboutBio?.fr ?? null)

  const photoUrl = about?.aboutPhoto
    ? urlFor(about.aboutPhoto as Parameters<typeof urlFor>[0])
        .width(800)
        .height(1000)
        .fit('crop')
        .url()
    : null

  return (
    <main>
      {/* Hero */}
      <section className="bg-[#0d0b09] pt-32 pb-0 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-[#c9a96e]" />
            <p className="text-xs text-[#c9a96e] uppercase tracking-[0.25em]">
              {l === 'fr' ? 'La personne derrière le blog' : 'The person behind the blog'}
            </p>
          </div>
        </div>
      </section>

      {/* Section principale : photo + intro */}
      <section className="bg-[#0d0b09] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 items-start">

            {/* Texte gauche */}
            <div>
              {/* Prénom */}
              {name && (
                <h1 className="font-serif text-6xl md:text-8xl text-[#faf9f6] leading-none mb-8">
                  {name}
                </h1>
              )}

              {/* Intro personnelle */}
              {intro ? (
                <p className="font-serif text-xl md:text-2xl text-[#faf9f6]/80 leading-relaxed mb-10 max-w-xl">
                  {intro}
                </p>
              ) : (
                <p className="font-serif text-xl md:text-2xl text-[#faf9f6]/40 leading-relaxed mb-10 max-w-xl italic">
                  {l === 'fr'
                    ? "Remplis ta bio dans le Studio Sanity → Site Config → Intro personnelle"
                    : "Fill in your bio in Sanity Studio → Site Config → Personal intro"}
                </p>
              )}

              {/* Badges comptes */}
              <div className="flex flex-wrap gap-3 mb-10">
                <a
                  href="https://instagram.com/QueleVentre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-[#f5c07a]/30 text-[#f5c07a] text-xs hover:border-[#f5c07a] transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  @QueleVentre — Food
                </a>
                <a
                  href="https://instagram.com/gmjourneys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-[#7ec87e]/30 text-[#7ec87e] text-xs hover:border-[#7ec87e] transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  @gmjourneys — Voyage
                </a>
              </div>

              {/* Bio éditoriale */}
              {bio && (
                <div className="border-l-2 border-[#c9a96e]/30 pl-6">
                  <p className="text-[#faf9f6]/60 text-sm leading-relaxed">
                    {bio}
                  </p>
                </div>
              )}
            </div>

            {/* Photo droite */}
            <div className="relative">
              {photoUrl ? (
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={photoUrl}
                    alt={name ?? 'Portrait'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 420px"
                    priority
                  />
                  {/* Overlay léger en bas */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b09]/30 to-transparent" />
                </div>
              ) : (
                /* Placeholder si pas encore de photo */
                <div className="aspect-[4/5] bg-[#1a1714] border border-[#faf9f6]/10 flex flex-col items-center justify-center gap-3">
                  <svg className="w-10 h-10 text-[#faf9f6]/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="text-[#faf9f6]/30 text-xs text-center px-6">
                    {l === 'fr'
                      ? "Ajoute ta photo dans\nStudio → Site Config"
                      : "Add your photo in\nStudio → Site Config"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#111]/80 border-y border-[#faf9f6]/10 py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.value} className="text-center">
              <p className="font-serif text-4xl text-[#c9a96e] mb-1">{s.value}</p>
              <p className="text-xs text-[#faf9f6]/40 uppercase tracking-widest">{s.label[l]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Les deux univers */}
      <section className="bg-[#0d0b09] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-8 h-px bg-[#c9a96e]" />
            <p className="text-xs text-[#c9a96e] uppercase tracking-[0.25em]">
              {l === 'fr' ? 'Mes univers' : 'My worlds'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-[#7ec87e]/20 p-8 hover:border-[#7ec87e]/50 transition-colors group">
              <p className="text-[10px] text-[#7ec87e] uppercase tracking-[0.2em] mb-4">@gmjourneys</p>
              <h3 className="font-serif text-2xl text-[#faf9f6] mb-3">
                {l === 'fr' ? 'Voyage' : 'Travel'}
              </h3>
              <p className="text-[#faf9f6]/50 text-sm leading-relaxed">
                {l === 'fr'
                  ? "Carnets de route, itinéraires détaillés, bons plans hébergement et activités à travers le monde."
                  : "Road journals, detailed itineraries, accommodation deals and activities around the world."}
              </p>
              <a href={`/${locale}/voyage`} className="inline-block mt-6 text-xs text-[#7ec87e] uppercase tracking-widest hover:text-white transition-colors">
                {l === 'fr' ? 'Explorer →' : 'Explore →'}
              </a>
            </div>
            <div className="border border-[#f5c07a]/20 p-8 hover:border-[#f5c07a]/50 transition-colors group">
              <p className="text-[10px] text-[#f5c07a] uppercase tracking-[0.2em] mb-4">@QueleVentre</p>
              <h3 className="font-serif text-2xl text-[#faf9f6] mb-3">Food</h3>
              <p className="text-[#faf9f6]/50 text-sm leading-relaxed">
                {l === 'fr'
                  ? "Adresses coups de cœur, restaurants testés, marchés locaux et recettes de voyage."
                  : "Favourite addresses, tested restaurants, local markets and travel recipes."}
              </p>
              <a href={`/${locale}/food`} className="inline-block mt-6 text-xs text-[#f5c07a] uppercase tracking-widest hover:text-white transition-colors">
                {l === 'fr' ? 'Explorer →' : 'Explore →'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-[#0d0b09] border-t border-[#faf9f6]/10 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-[#faf9f6]/40 uppercase tracking-[0.2em] mb-4">
            {l === 'fr' ? 'Collaboration & presse' : 'Collaboration & press'}
          </p>
          <p className="text-[#faf9f6]/60 text-sm leading-relaxed mb-6">
            {l === 'fr'
              ? "Pour toute demande de partenariat, presse ou collaboration créative, écris-moi."
              : "For any partnership, press or creative collaboration enquiry, reach out."}
          </p>
          <a
            href="mailto:contact@wanderbite.com"
            className="inline-block px-8 py-3 border border-[#c9a96e]/50 text-[#c9a96e] text-xs uppercase tracking-widest hover:bg-[#c9a96e] hover:text-[#0d0b09] transition-all duration-300"
          >
            contact@wanderbite.com
          </a>
        </div>
      </section>
    </main>
  )
}
