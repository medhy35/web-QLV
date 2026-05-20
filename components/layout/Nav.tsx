'use client'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Nav() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: `/${locale}/voyage`, label: t('voyage') },
    { href: `/${locale}/food`, label: t('food') },
    { href: `/${locale}/reels`, label: t('reels') },
    { href: `/${locale}/bons-plans`, label: t('bonsPlan') },
    { href: `/${locale}/a-propos`, label: t('about') },
  ]

  const switchLocale = (next: string) => {
    const segments = pathname.split('/')
    segments[1] = next
    router.push(segments.join('/') || '/')
  }

  return (
    <nav
      role="navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0d0b09]/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="font-serif text-xl text-[#faf9f6] tracking-wide hover:text-[#c9a96e] transition-colors"
        >
          WanderBite
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sm text-[#faf9f6]/80 hover:text-[#c9a96e] transition-colors tracking-wide uppercase"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm">
            <button
              onClick={() => switchLocale('fr')}
              className={`px-2 py-1 transition-colors ${
                locale === 'fr'
                  ? 'text-[#c9a96e] font-semibold'
                  : 'text-[#faf9f6]/60 hover:text-[#faf9f6]'
              }`}
            >
              FR
            </button>
            <span className="text-[#faf9f6]/30">|</span>
            <button
              onClick={() => switchLocale('en')}
              className={`px-2 py-1 transition-colors ${
                locale === 'en'
                  ? 'text-[#c9a96e] font-semibold'
                  : 'text-[#faf9f6]/60 hover:text-[#faf9f6]'
              }`}
            >
              EN
            </button>
          </div>

          <button
            className="md:hidden text-[#faf9f6] p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <span className="block w-5 h-0.5 bg-[#faf9f6] mb-1" />
            <span className="block w-5 h-0.5 bg-[#faf9f6] mb-1" />
            <span className="block w-5 h-0.5 bg-[#faf9f6]" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#0d0b09]/98 border-t border-[#faf9f6]/10 px-6 py-4">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-[#faf9f6]/80 hover:text-[#c9a96e] transition-colors text-sm uppercase tracking-wide"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
