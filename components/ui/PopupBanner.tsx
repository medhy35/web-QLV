'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'

export type PopupData = {
  active: boolean
  title?: { fr?: string; en?: string } | null
  text?: { fr?: string; en?: string } | null
  image?: Record<string, unknown> | null
  buttonLabel?: { fr?: string; en?: string } | null
  buttonUrl?: string | null
  expiresAt?: string | null
}

type Props = {
  data: PopupData | null
  locale: string
}

export default function PopupBanner({ data, locale }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!data?.active) return

    // Vérifier si le popup a expiré
    if (data.expiresAt && new Date(data.expiresAt) < new Date()) return

    // Afficher immédiatement
    setVisible(true)
  }, [data])

  if (!visible || !data?.active) return null

  const l = locale as 'fr' | 'en'
  const title = l === 'en' && data.title?.en ? data.title.en : (data.title?.fr ?? null)
  const text = l === 'en' && data.text?.en ? data.text.en : (data.text?.fr ?? null)
  const btnLabel = l === 'en' && data.buttonLabel?.en
    ? data.buttonLabel.en
    : (data.buttonLabel?.fr ?? null)

  const imgSrc = data.image
    ? urlFor(data.image as Parameters<typeof urlFor>[0]).width(600).height(400).fit('crop').url()
    : null

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={() => setVisible(false)}
      role="dialog"
      aria-modal="true"
      aria-label={title ?? 'Annonce'}
    >
      {/* Carte popup */}
      <div
        className="relative w-full max-w-md bg-[#0d0b09] border border-[#faf9f6]/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton fermeture */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 z-10 text-[#faf9f6]/40 hover:text-[#faf9f6] transition-colors"
          aria-label={l === 'fr' ? 'Fermer' : 'Close'}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        {imgSrc && (
          <div className="relative w-full aspect-[3/2] overflow-hidden">
            <Image
              src={imgSrc}
              alt={title ?? ''}
              fill
              className="object-cover"
              sizes="(max-width: 448px) 100vw, 448px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b09]/60 to-transparent" />
          </div>
        )}

        {/* Contenu texte */}
        <div className="p-7">
          {/* Ligne décorative */}
          <div className="w-8 h-px bg-[#c9a96e] mb-5" />

          {title && (
            <h2 className="font-serif text-2xl text-[#faf9f6] leading-tight mb-3">
              {title}
            </h2>
          )}

          {text && (
            <p className="text-[#faf9f6]/60 text-sm leading-relaxed mb-6">
              {text}
            </p>
          )}

          {/* Bouton CTA */}
          {btnLabel && data.buttonUrl && (
            <a
              href={data.buttonUrl}
              target={data.buttonUrl.startsWith('http') ? '_blank' : undefined}
              rel={data.buttonUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
              onClick={() => setVisible(false)}
              className="block text-center py-3 px-6 border border-[#c9a96e]/50 text-[#c9a96e] text-xs uppercase tracking-widest hover:bg-[#c9a96e] hover:text-[#0d0b09] transition-all duration-300"
            >
              {btnLabel}
            </a>
          )}

          {/* Lien fermeture discret */}
          <button
            onClick={() => setVisible(false)}
            className="block w-full text-center mt-4 text-[10px] text-[#faf9f6]/25 hover:text-[#faf9f6]/50 transition-colors uppercase tracking-widest"
          >
            {l === 'fr' ? 'Non merci' : 'No thanks'}
          </button>
        </div>
      </div>
    </div>
  )
}
