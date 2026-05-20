'use client'
import { useEffect } from 'react'
import Link from 'next/link'

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error('[WanderBite] Erreur inattendue:', error)
  }, [error])

  return (
    <main className="min-h-screen bg-[#0d0b09] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="w-12 h-px bg-[#c9a96e]" />
          <p className="text-[#c9a96e] text-xs uppercase tracking-[0.3em]">500</p>
          <div className="w-12 h-px bg-[#c9a96e]" />
        </div>

        <h1 className="font-serif text-5xl md:text-6xl text-[#faf9f6] mb-6 leading-tight">
          Quelque chose s&apos;est mal passé
        </h1>

        <p className="text-[#faf9f6]/50 text-sm leading-relaxed mb-10">
          Une erreur inattendue s&apos;est produite.
          <br />
          <span className="text-[#faf9f6]/30 text-xs">
            Something went wrong. Please try again.
          </span>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={reset}
            className="px-8 py-3 border border-[#c9a96e]/50 text-[#c9a96e] text-xs uppercase tracking-widest hover:bg-[#c9a96e] hover:text-[#0d0b09] transition-all duration-300"
          >
            Réessayer
          </button>
          <Link
            href="/fr"
            className="px-8 py-3 border border-[#faf9f6]/20 text-[#faf9f6]/50 text-xs uppercase tracking-widest hover:border-[#faf9f6]/50 hover:text-[#faf9f6] transition-all duration-300"
          >
            Accueil
          </Link>
        </div>
      </div>
    </main>
  )
}
