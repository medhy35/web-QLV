import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'

type GalleryPhoto = {
  image: Record<string, unknown> | null
  caption?: { fr?: string; en?: string } | null
  category?: 'voyage' | 'food'
}

type Props = {
  photos: GalleryPhoto[]
  locale: string
}

const CATEGORY_COLORS = {
  voyage: '#7ec87e',
  food: '#f5c07a',
}

export default function PhotoGrid({ photos, locale }: Props) {
  if (!photos || photos.length === 0) return null

  // Mise en page mosaïque : première photo en grand (col-span-2, row-span-2)
  // puis le reste en grille 2 colonnes
  return (
    <section className="bg-[#0d0b09] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-[#c9a96e]" />
            <p className="text-xs text-[#c9a96e] uppercase tracking-[0.25em]">
              {locale === 'fr' ? 'En images' : 'In pictures'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-[#7ec87e] uppercase tracking-widest">Voyage</span>
            <span className="text-[10px] text-[#faf9f6]/20">·</span>
            <span className="text-[10px] text-[#f5c07a] uppercase tracking-widest">Food</span>
          </div>
        </div>

        {/* Grille mosaïque */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-3">
          {photos.map((photo, i) => {
            if (!photo.image) return null

            const src = urlFor(photo.image as Parameters<typeof urlFor>[0])
              .width(i === 0 ? 900 : 500)
              .height(i === 0 ? 600 : 400)
              .fit('crop')
              .url()

            const caption =
              locale === 'en' && photo.caption?.en
                ? photo.caption.en
                : (photo.caption?.fr ?? null)

            const catColor = photo.category ? CATEGORY_COLORS[photo.category] : '#c9a96e'

            // Première photo : grande (2 colonnes, 2 rangées)
            const isFirst = i === 0
            const colSpan = isFirst ? 'col-span-2 row-span-2' : ''

            return (
              <div
                key={i}
                className={`relative overflow-hidden group bg-[#1a1714] ${colSpan}`}
              >
                <Image
                  src={src}
                  alt={caption ?? `Photo ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes={isFirst
                    ? '(max-width: 768px) 100vw, 50vw'
                    : '(max-width: 768px) 50vw, 25vw'}
                />

                {/* Overlay au hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />

                {/* Badge catégorie */}
                {photo.category && (
                  <div
                    className="absolute top-3 left-3 px-2 py-0.5 text-[9px] uppercase tracking-widest font-medium"
                    style={{
                      backgroundColor: catColor + '22',
                      color: catColor,
                      border: `1px solid ${catColor}44`,
                    }}
                  >
                    {photo.category}
                  </div>
                )}

                {/* Légende */}
                {caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-xs leading-snug">{caption}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
