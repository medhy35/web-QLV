'use client'
import { useEffect, useCallback } from 'react'
import type { ReelItem } from './ReelCard'

type Props = {
  reel: ReelItem | null
  onClose: () => void
  locale: string
}

export default function ReelLightbox({ reel, onClose, locale }: Props) {
  // Fermeture au clavier Escape
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (!reel) return
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [reel, handleKey])

  if (!reel) return null

  // Transformer l'URL Instagram en URL embed oEmbed
  // https://www.instagram.com/reel/CODE/ → https://www.instagram.com/p/CODE/embed/
  const embedUrl = reel.instagramUrl
    .replace(/\/$/, '')
    .replace('/reel/', '/p/')
    + '/embed/'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={reel.title}
    >
      {/* Conteneur interne — stoppe la propagation du clic */}
      <div
        className="relative w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton fermeture */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/60 hover:text-white transition-colors text-sm flex items-center gap-1"
          aria-label={locale === 'fr' ? 'Fermer' : 'Close'}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="text-xs uppercase tracking-widest">
            {locale === 'fr' ? 'Fermer' : 'Close'}
          </span>
        </button>

        {/* Iframe Instagram embed */}
        <div className="relative w-full aspect-[9/16] rounded-sm overflow-hidden bg-[#1a1714]">
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            scrolling="no"
            allowTransparency
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title={reel.title}
          />
        </div>

        {/* Titre + lien Instagram */}
        <div className="mt-3 flex items-start justify-between gap-4">
          <p className="text-white/80 text-xs leading-relaxed flex-1">
            {reel.title}
          </p>
          <a
            href={reel.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-[10px] text-[#c9a96e] hover:text-white transition-colors uppercase tracking-widest"
          >
            Instagram ↗
          </a>
        </div>
      </div>
    </div>
  )
}
