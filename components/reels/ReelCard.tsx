'use client'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'

export type ReelItem = {
  _id: string
  title: string
  instagramUrl: string
  account: '@QueleVentre' | '@gmjourneys'
  thumbnail: Record<string, unknown> | null
  views?: number
  likes?: number
}

type Props = {
  reel: ReelItem
  onClick: (reel: ReelItem) => void
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`
  return String(n)
}

export default function ReelCard({ reel, onClick }: Props) {
  const imgSrc = reel.thumbnail
    ? urlFor(reel.thumbnail as Parameters<typeof urlFor>[0])
        .width(400)
        .height(700)
        .fit('crop')
        .url()
    : null

  const accountColor =
    reel.account === '@QueleVentre' ? '#f5c07a' : '#7ec87e'

  return (
    <button
      onClick={() => onClick(reel)}
      className="group relative w-full aspect-[9/16] overflow-hidden bg-[#1a1714] rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e]"
      aria-label={`Voir le reel : ${reel.title}`}
    >
      {/* Thumbnail */}
      {imgSrc ? (
        <Image
          src={imgSrc}
          alt={reel.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1714] to-[#0d0b09]" />
      )}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Bouton play */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Badge compte */}
      <div
        className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-medium tracking-wide rounded-sm"
        style={{ backgroundColor: accountColor + '22', color: accountColor, border: `1px solid ${accountColor}44` }}
      >
        {reel.account}
      </div>

      {/* Infos bas */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-white text-xs font-medium line-clamp-2 mb-2 leading-snug">
          {reel.title}
        </p>
        {(reel.views || reel.likes) && (
          <div className="flex items-center gap-3">
            {reel.views !== undefined && (
              <span className="flex items-center gap-1 text-white/60 text-[10px]">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                </svg>
                {formatCount(reel.views)}
              </span>
            )}
            {reel.likes !== undefined && (
              <span className="flex items-center gap-1 text-white/60 text-[10px]">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                {formatCount(reel.likes)}
              </span>
            )}
          </div>
        )}
      </div>
    </button>
  )
}
