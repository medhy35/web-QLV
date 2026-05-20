'use client'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

export type TocHeading = {
  id: string
  text: string
  level: 2 | 3
}

type Props = {
  headings: TocHeading[]
}

export default function TableOfContents({ headings }: Props) {
  const t = useTranslations('article')
  const [activeId, setActiveId] = useState<string>('')

  /* IntersectionObserver : détecte la section visible */
  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  /* Smooth scroll + forçage de l'item actif au clic */
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveId(id)
    }
  }

  if (headings.length === 0) return null

  return (
    <nav aria-label={t('tableOfContents')}>
      <p className="text-xs text-[#faf9f6]/40 uppercase tracking-widest mb-4">
        {t('tableOfContents')}
      </p>
      <ul className="space-y-1">
        {headings.map(({ id, text, level }) => (
          <li key={id} className={level === 3 ? 'pl-4' : ''}>
            <a
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              className={`block py-1 text-sm transition-all duration-200 border-l-2 pl-3 ${
                activeId === id
                  ? 'text-[#c9a96e] border-[#c9a96e] font-medium pl-4'
                  : 'text-[#faf9f6]/50 border-transparent hover:text-[#faf9f6] hover:border-[#faf9f6]/30'
              }`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
