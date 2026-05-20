import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export default function Footer() {
  const t = useTranslations('nav')
  const locale = useLocale()

  return (
    <footer className="bg-[#0d0b09] border-t border-[#faf9f6]/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <Link
              href={`/${locale}`}
              className="font-serif text-2xl text-[#faf9f6] hover:text-[#c9a96e] transition-colors"
            >
              WanderBite
            </Link>
            <p className="mt-3 text-[#3d3330] text-sm leading-relaxed max-w-xs">
              {locale === 'fr'
                ? 'Aventures gastronomiques et voyages authentiques. Deux regards, une même passion.'
                : 'Gastronomic adventures and authentic travels. Two perspectives, one passion.'}
            </p>
            <div className="flex gap-4 mt-5">
              <a
                href="https://instagram.com/QueleVentre"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#faf9f6]/50 hover:text-[#c9a96e] transition-colors text-xs tracking-widest uppercase"
              >
                @QueleVentre
              </a>
              <a
                href="https://instagram.com/gmjourneys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#faf9f6]/50 hover:text-[#c9a96e] transition-colors text-xs tracking-widest uppercase"
              >
                @gmjourneys
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs text-[#faf9f6]/40 uppercase tracking-widest mb-4">Contenu</p>
            <ul className="space-y-2">
              {[
                { href: `/${locale}/voyage`, label: t('voyage') },
                { href: `/${locale}/food`, label: t('food') },
                { href: `/${locale}/reels`, label: t('reels') },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#faf9f6]/60 hover:text-[#c9a96e] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs text-[#faf9f6]/40 uppercase tracking-widest mb-4">
              {locale === 'fr' ? 'À propos' : 'About'}
            </p>
            <ul className="space-y-2">
              {[
                { href: `/${locale}/bons-plans`, label: t('bonsPlan') },
                { href: `/${locale}/a-propos`, label: t('about') },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#faf9f6]/60 hover:text-[#c9a96e] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#faf9f6]/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-[#faf9f6]/30">
            © {new Date().getFullYear()} WanderBite. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            {[
              { href: `/${locale}/mentions-legales`, label: 'Mentions légales' },
              { href: `/${locale}/politique-confidentialite`, label: 'Confidentialité' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-xs text-[#faf9f6]/30 hover:text-[#faf9f6]/60 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
