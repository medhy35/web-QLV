import { client } from '@/lib/sanity/client'
import { REELS_QUERY } from '@/lib/sanity/queries'
import ReelGrid from '@/components/reels/ReelGrid'
import type { ReelItem } from '@/components/reels/ReelCard'
import type { Metadata } from 'next'

export const revalidate = 60

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    title:
      locale === 'fr'
        ? 'Reels Instagram — WanderBite'
        : 'Instagram Reels — WanderBite',
    description:
      locale === 'fr'
        ? 'Toutes les vidéos voyage et food de @QueleVentre et @gmjourneys.'
        : 'All travel and food videos from @QueleVentre and @gmjourneys.',
  }
}

export default async function ReelsPage({ params }: Props) {
  const { locale } = await params

  const rawReels = await client
    .fetch(REELS_QUERY, {}, { next: { revalidate: 60 } })
    .catch(() => [])

  // Mapper les données Sanity vers le type ReelItem
  const reels: ReelItem[] = (rawReels ?? []).map(
    (r: {
      _id: string
      title: string
      instagramUrl: string
      account: string
      thumbnail?: Record<string, unknown> | null
      stats?: { views?: number; likes?: number }
    }) => ({
      _id: r._id,
      title: r.title,
      instagramUrl: r.instagramUrl,
      account: r.account as ReelItem['account'],
      thumbnail: r.thumbnail ?? null,
      views: r.stats?.views,
      likes: r.stats?.likes,
    })
  )

  return (
    <main>
      {/* Hero sombre */}
      <section className="bg-[#0d0b09] pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Label */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-[#c9a96e]" />
            <p className="text-xs text-[#c9a96e] uppercase tracking-[0.25em]">
              {locale === 'fr' ? 'Sur Instagram' : 'On Instagram'}
            </p>
          </div>

          {/* Titre */}
          <h1 className="font-serif text-5xl md:text-6xl text-[#faf9f6] leading-tight mb-4">
            {locale === 'fr' ? 'Nos Reels' : 'Our Reels'}
          </h1>

          {/* Sous-titre */}
          <p className="text-[#faf9f6]/50 text-base max-w-xl leading-relaxed">
            {locale === 'fr'
              ? 'Voyages en images, adresses food et coulisses — en 60 secondes.'
              : 'Travels in pictures, food spots and behind the scenes — in 60 seconds.'}
          </p>

          {/* Badges comptes */}
          <div className="flex flex-wrap gap-3 mt-8">
            <a
              href="https://www.instagram.com/QueleVentre"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#f5c07a]/30 text-[#f5c07a] text-xs hover:border-[#f5c07a] transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              @QueleVentre
            </a>
            <a
              href="https://www.instagram.com/gmjourneys"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#7ec87e]/30 text-[#7ec87e] text-xs hover:border-[#7ec87e] transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              @gmjourneys
            </a>
          </div>
        </div>
      </section>

      {/* Grille reels */}
      <section className="bg-[#0d0b09] pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ReelGrid reels={reels} locale={locale} />
        </div>
      </section>
    </main>
  )
}
