import type { Metadata } from 'next'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'fr' ? 'Mentions légales — WanderBite' : 'Legal Notice — WanderBite',
    robots: { index: false },
  }
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="font-serif text-xl text-[#1c1917] mb-3">{title}</h2>
      <div className="text-[#3d3330] text-sm leading-relaxed space-y-2">{children}</div>
    </div>
  )
}

export default async function MentionsLegalesPage({ params }: Props) {
  const { locale } = await params
  const isFr = locale !== 'en'

  return (
    <main className="bg-[#faf9f6] min-h-screen">
      {/* Header */}
      <div className="bg-[#0d0b09] pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-[#c9a96e]" />
            <p className="text-xs text-[#c9a96e] uppercase tracking-[0.25em]">
              {isFr ? 'Informations légales' : 'Legal information'}
            </p>
          </div>
          <h1 className="font-serif text-4xl text-[#faf9f6]">
            {isFr ? 'Mentions légales' : 'Legal Notice'}
          </h1>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        {isFr ? (
          <>
            <Section title="Éditeur du site">
              <p>Le site WanderBite est édité à titre personnel.</p>
              <p><strong>Responsable de publication :</strong> [Prénom Nom]</p>
              <p><strong>Adresse e-mail :</strong> contact@wanderbite.com</p>
            </Section>

            <Section title="Hébergement">
              <p>Ce site est hébergé par :</p>
              <p><strong>Vercel Inc.</strong></p>
              <p>440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
              <p><a href="https://vercel.com" className="text-[#c9a96e] hover:underline">vercel.com</a></p>
            </Section>

            <Section title="Propriété intellectuelle">
              <p>
                L&apos;ensemble du contenu de ce site (textes, photographies, vidéos, illustrations)
                est la propriété exclusive de l&apos;autrice, sauf mentions contraires.
              </p>
              <p>
                Toute reproduction, distribution, modification ou utilisation de ce contenu,
                quel qu&apos;en soit le support, sans autorisation écrite préalable, est strictement interdite.
              </p>
            </Section>

            <Section title="Liens affiliés">
              <p>
                Ce site contient des liens d&apos;affiliation vers des partenaires commerciaux
                (GetYourGuide, Viator, Booking.com, Amazon, etc.). Cliquer sur ces liens
                et effectuer un achat peut générer une commission pour l&apos;autrice,
                sans frais supplémentaires pour vous.
              </p>
              <p>
                Seuls des produits et services réellement utilisés et approuvés sont recommandés.
              </p>
            </Section>

            <Section title="Limitation de responsabilité">
              <p>
                Les informations publiées sur ce site sont fournies à titre indicatif.
                WanderBite ne saurait être tenu responsable des erreurs ou omissions,
                ni de l&apos;utilisation faite des informations présentées.
              </p>
              <p>
                Les prix et disponibilités des offres affiliées sont susceptibles de changer
                sans préavis et relèvent de la responsabilité des partenaires concernés.
              </p>
            </Section>

            <Section title="Droit applicable">
              <p>
                Les présentes mentions légales sont soumises au droit français.
                Tout litige relatif à l&apos;utilisation de ce site sera soumis
                à la juridiction compétente française.
              </p>
            </Section>

            <p className="text-xs text-[#3d3330]/50 mt-10">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </>
        ) : (
          <>
            <Section title="Publisher">
              <p>WanderBite is a personal website.</p>
              <p><strong>Editor-in-chief:</strong> [First Name Last Name]</p>
              <p><strong>Email:</strong> contact@wanderbite.com</p>
            </Section>

            <Section title="Hosting">
              <p>This website is hosted by:</p>
              <p><strong>Vercel Inc.</strong></p>
              <p>440 N Barranca Ave #4133, Covina, CA 91723, United States</p>
              <p><a href="https://vercel.com" className="text-[#c9a96e] hover:underline">vercel.com</a></p>
            </Section>

            <Section title="Intellectual property">
              <p>
                All content on this site (texts, photographs, videos, illustrations)
                is the exclusive property of the author, unless otherwise stated.
              </p>
              <p>
                Any reproduction, distribution, modification or use of this content,
                in any medium, without prior written permission, is strictly prohibited.
              </p>
            </Section>

            <Section title="Affiliate links">
              <p>
                This site contains affiliate links to commercial partners
                (GetYourGuide, Viator, Booking.com, Amazon, etc.). Clicking these links
                and making a purchase may earn the author a commission,
                at no additional cost to you.
              </p>
              <p>Only genuinely used and approved products and services are recommended.</p>
            </Section>

            <Section title="Limitation of liability">
              <p>
                The information published on this site is provided for informational purposes only.
                WanderBite cannot be held responsible for errors or omissions,
                or for the use made of the information presented.
              </p>
            </Section>

            <p className="text-xs text-[#3d3330]/50 mt-10">
              Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </>
        )}
      </div>
    </main>
  )
}
