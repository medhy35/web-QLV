import type { Metadata } from 'next'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    title:
      locale === 'fr'
        ? 'À propos — WanderBite'
        : 'About — WanderBite',
    description:
      locale === 'fr'
        ? "Découvrez l'histoire derrière WanderBite, le blog voyage & food de @QueleVentre et @gmjourneys."
        : 'The story behind WanderBite, the travel & food blog by @QueleVentre and @gmjourneys.',
  }
}

const STATS = [
  { value: '2', label: { fr: 'comptes Instagram', en: 'Instagram accounts' } },
  { value: '50k+', label: { fr: 'abonnés réunis', en: 'combined followers' } },
  { value: '30+', label: { fr: 'pays explorés', en: 'countries explored' } },
  { value: '∞', label: { fr: 'bonnes adresses', en: 'good addresses' } },
]

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  const l = locale as 'fr' | 'en'

  return (
    <main>
      {/* Hero */}
      <section className="bg-[#0d0b09] pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-[#c9a96e]" />
            <p className="text-xs text-[#c9a96e] uppercase tracking-[0.25em]">
              {l === 'fr' ? 'Notre histoire' : 'Our story'}
            </p>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-[#faf9f6] leading-tight max-w-3xl">
            {l === 'fr'
              ? 'Voyages & saveurs, un seul endroit'
              : 'Travel & flavours, one place'}
          </h1>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#111]/80 border-y border-[#faf9f6]/10 py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.value} className="text-center">
              <p className="font-serif text-4xl text-[#c9a96e] mb-1">{s.value}</p>
              <p className="text-xs text-[#faf9f6]/40 uppercase tracking-widest">
                {s.label[l]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Histoire */}
      <section className="bg-[#faf9f6] py-20 px-6">
        <div className="max-w-3xl mx-auto prose prose-stone">
          <h2 className="font-serif text-3xl text-[#1c1917] mb-6">
            {l === 'fr' ? 'Qui sommes-nous ?' : 'Who are we?'}
          </h2>
          <p className="text-[#3d3330] leading-relaxed mb-6">
            {l === 'fr'
              ? "WanderBite est né de la rencontre de deux passions : explorer le monde et en dévorer les saveurs. Derrière ce blog, deux comptes Instagram — @QueleVentre pour la food, @gmjourneys pour le voyage — qui n'en forment désormais plus qu'un."
              : 'WanderBite was born from the collision of two passions: exploring the world and savouring its flavours. Behind this blog, two Instagram accounts — @QueleVentre for food, @gmjourneys for travel — now merged into one.'}
          </p>
          <p className="text-[#3d3330] leading-relaxed mb-6">
            {l === 'fr'
              ? "Chaque article est une invitation à partir — carnet de voyage réel, adresses testées, recettes glanées sur la route. Ici, pas de contenu sponsorisé caché : ce que nous recommandons, nous l'avons vraiment essayé."
              : 'Every article is an invitation to leave — a real travel journal, tested addresses, recipes gathered on the road. No hidden sponsored content here: what we recommend, we have truly tried.'}
          </p>
          <p className="text-[#3d3330] leading-relaxed">
            {l === 'fr'
              ? 'Bienvenue dans notre univers.'
              : 'Welcome to our world.'}
          </p>
        </div>
      </section>

      {/* Les deux univers */}
      <section className="bg-[#0d0b09] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-8 h-px bg-[#c9a96e]" />
            <p className="text-xs text-[#c9a96e] uppercase tracking-[0.25em]">
              {l === 'fr' ? 'Nos univers' : 'Our worlds'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Voyage */}
            <div className="border border-[#7ec87e]/20 p-8 group hover:border-[#7ec87e]/50 transition-colors">
              <p className="text-[10px] text-[#7ec87e] uppercase tracking-[0.2em] mb-4">
                @gmjourneys
              </p>
              <h3 className="font-serif text-2xl text-[#faf9f6] mb-3">
                {l === 'fr' ? 'Voyage' : 'Travel'}
              </h3>
              <p className="text-[#faf9f6]/50 text-sm leading-relaxed">
                {l === 'fr'
                  ? 'Carnets de route, itinéraires détaillés, bons plans hébergement et activités à travers le monde.'
                  : 'Road journals, detailed itineraries, accommodation deals and activities around the world.'}
              </p>
              <a
                href={`/${locale}/voyage`}
                className="inline-block mt-6 text-xs text-[#7ec87e] uppercase tracking-widest hover:text-white transition-colors"
              >
                {l === 'fr' ? 'Explorer →' : 'Explore →'}
              </a>
            </div>
            {/* Food */}
            <div className="border border-[#f5c07a]/20 p-8 group hover:border-[#f5c07a]/50 transition-colors">
              <p className="text-[10px] text-[#f5c07a] uppercase tracking-[0.2em] mb-4">
                @QueleVentre
              </p>
              <h3 className="font-serif text-2xl text-[#faf9f6] mb-3">
                Food
              </h3>
              <p className="text-[#faf9f6]/50 text-sm leading-relaxed">
                {l === 'fr'
                  ? 'Adresses coups de cœur, restaurants testés, marchés locaux et recettes de voyage.'
                  : 'Favourite addresses, tested restaurants, local markets and travel recipes.'}
              </p>
              <a
                href={`/${locale}/food`}
                className="inline-block mt-6 text-xs text-[#f5c07a] uppercase tracking-widest hover:text-white transition-colors"
              >
                {l === 'fr' ? 'Explorer →' : 'Explore →'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-[#0d0b09] border-t border-[#faf9f6]/10 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-[#faf9f6]/40 uppercase tracking-[0.2em] mb-4">
            {l === 'fr' ? 'Collaboration & presse' : 'Collaboration & press'}
          </p>
          <p className="text-[#faf9f6]/60 text-sm leading-relaxed mb-6">
            {l === 'fr'
              ? 'Pour toute demande de partenariat, presse ou collaboration créative, écrivez-nous.'
              : 'For any partnership, press or creative collaboration enquiry, reach out to us.'}
          </p>
          <a
            href="mailto:contact@wanderbite.com"
            className="inline-block px-8 py-3 border border-[#c9a96e]/50 text-[#c9a96e] text-xs uppercase tracking-widest hover:bg-[#c9a96e] hover:text-[#0d0b09] transition-all duration-300"
          >
            contact@wanderbite.com
          </a>
        </div>
      </section>
    </main>
  )
}
