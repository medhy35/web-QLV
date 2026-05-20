import Link from 'next/link'

// Page 404 dans le contexte [locale] — next-intl injecte le locale via useLocale
// Ici on lit les searchParams ou utilise le cookie — le plus simple est de détecter
// via l'URL qui contient /fr/ ou /en/ dans le pathname réel.
// next.js appelle ce fichier avec le locale du segment, mais la prop n'est pas injectée.
// On utilise donc un composant server avec accès aux params via le segment parent.

export default function NotFound() {
  // Pas accès au locale ici, on affiche les deux langues
  return (
    <main className="min-h-screen bg-[#0d0b09] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="w-12 h-px bg-[#c9a96e]" />
          <p className="text-[#c9a96e] text-xs uppercase tracking-[0.3em]">404</p>
          <div className="w-12 h-px bg-[#c9a96e]" />
        </div>

        <h1 className="font-serif text-5xl md:text-7xl text-[#faf9f6] mb-6 leading-tight">
          Page introuvable
        </h1>

        <p className="text-[#faf9f6]/50 text-sm leading-relaxed mb-10">
          Cette page n&apos;existe pas ou a été déplacée.
          <br />
          <span className="text-[#faf9f6]/30 text-xs">
            This page does not exist or has been moved.
          </span>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/fr"
            className="px-8 py-3 border border-[#c9a96e]/50 text-[#c9a96e] text-xs uppercase tracking-widest hover:bg-[#c9a96e] hover:text-[#0d0b09] transition-all duration-300"
          >
            Accueil FR
          </Link>
          <Link
            href="/en"
            className="px-8 py-3 border border-[#faf9f6]/20 text-[#faf9f6]/50 text-xs uppercase tracking-widest hover:border-[#faf9f6]/50 hover:text-[#faf9f6] transition-all duration-300"
          >
            Home EN
          </Link>
        </div>
      </div>
    </main>
  )
}
