'use client'
import { useState } from 'react'
import ReelCard, { type ReelItem } from './ReelCard'
import ReelLightbox from './ReelLightbox'

type FilterAccount = 'all' | '@QueleVentre' | '@gmjourneys'

type Props = {
  reels: ReelItem[]
  locale: string
}

export default function ReelGrid({ reels, locale }: Props) {
  const [filter, setFilter] = useState<FilterAccount>('all')
  const [active, setActive] = useState<ReelItem | null>(null)

  const filtered = filter === 'all' ? reels : reels.filter((r) => r.account === filter)

  const filters: { value: FilterAccount; label: string }[] = [
    { value: 'all', label: locale === 'fr' ? 'Tous' : 'All' },
    { value: '@QueleVentre', label: '@QueleVentre' },
    { value: '@gmjourneys', label: '@gmjourneys' },
  ]

  return (
    <>
      {/* Filtres */}
      <div className="flex flex-wrap items-center gap-3 mb-10">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={[
              'text-xs px-4 py-2 border transition-colors',
              filter === f.value
                ? 'border-[#c9a96e] text-[#c9a96e]'
                : 'border-[#faf9f6]/20 text-[#faf9f6]/40 hover:border-[#faf9f6]/40 hover:text-[#faf9f6]/60',
            ].join(' ')}
          >
            {f.label}
          </button>
        ))}
        <span className="ml-auto text-xs text-[#faf9f6]/30">
          {filtered.length} reel{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Grille 4 colonnes */}
      {filtered.length === 0 ? (
        <p className="text-center text-[#faf9f6]/40 py-20 text-sm">
          {locale === 'fr' ? 'Aucun reel pour le moment.' : 'No reels yet.'}
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((reel, i) => (
            <div
              key={reel._id}
              // Premier reel : occupe 2 colonnes et 2 rangées (reel vedette)
              className={i === 0 ? 'col-span-2 row-span-2' : ''}
            >
              <ReelCard reel={reel} onClick={setActive} />
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <ReelLightbox
        reel={active}
        onClose={() => setActive(null)}
        locale={locale}
      />
    </>
  )
}
