import type { Metadata } from 'next'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'fr' ? 'Politique de confidentialité — WanderBite' : 'Privacy Policy — WanderBite',
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

export default async function PolitiqueConfidentialitePage({ params }: Props) {
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
              {isFr ? 'Données personnelles' : 'Personal data'}
            </p>
          </div>
          <h1 className="font-serif text-4xl text-[#faf9f6]">
            {isFr ? 'Politique de confidentialité' : 'Privacy Policy'}
          </h1>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        {isFr ? (
          <>
            <p className="text-sm text-[#3d3330] leading-relaxed mb-10">
              La protection de vos données personnelles est une priorité.
              Cette politique explique quelles données sont collectées, pourquoi et comment elles sont utilisées.
            </p>

            <Section title="Données collectées">
              <p><strong>Newsletter :</strong> Votre adresse e-mail est collectée lorsque vous vous inscrivez à la newsletter.</p>
              <p><strong>Cookies analytiques :</strong> Si un outil d&apos;analyse est activé, des données anonymisées de navigation peuvent être collectées (pages visitées, durée de session).</p>
              <p><strong>Liens affiliés :</strong> Les partenaires affiliés peuvent utiliser leurs propres cookies pour suivre les conversions. Consultez leur politique de confidentialité respective.</p>
            </Section>

            <Section title="Base légale du traitement (RGPD)">
              <p><strong>Newsletter :</strong> Consentement explicite (opt-in). Vous pouvez vous désabonner à tout moment via le lien présent dans chaque e-mail.</p>
              <p><strong>Analytique :</strong> Intérêt légitime à l&apos;amélioration du site.</p>
            </Section>

            <Section title="Stockage et sécurité">
              <p>
                Les adresses e-mail de la newsletter sont stockées chez <strong>Resend</strong> (resend.com),
                un service tiers sécurisé. Elles ne sont ni vendues, ni partagées avec des tiers
                à des fins commerciales.
              </p>
            </Section>

            <Section title="Durée de conservation">
              <p>Adresses e-mail newsletter : conservées jusqu&apos;à désinscription.</p>
              <p>Données analytiques anonymisées : 13 mois maximum.</p>
            </Section>

            <Section title="Vos droits">
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Droit d&apos;accès à vos données</li>
                <li>Droit de rectification</li>
                <li>Droit à l&apos;effacement (&quot;droit à l&apos;oubli&quot;)</li>
                <li>Droit à la portabilité</li>
                <li>Droit d&apos;opposition</li>
              </ul>
              <p>
                Pour exercer ces droits, contactez-nous à :{' '}
                <a href="mailto:contact@wanderbite.com" className="text-[#c9a96e] hover:underline">
                  contact@wanderbite.com
                </a>
              </p>
            </Section>

            <Section title="Cookies">
              <p>
                Ce site utilise des cookies techniques nécessaires au fonctionnement
                (préférence de langue). Aucun cookie publicitaire n&apos;est utilisé par WanderBite.
                Les partenaires affiliés peuvent déposer leurs propres cookies lors d&apos;un clic
                sur un lien affilié.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                Pour toute question relative à vos données :{' '}
                <a href="mailto:contact@wanderbite.com" className="text-[#c9a96e] hover:underline">
                  contact@wanderbite.com
                </a>
              </p>
            </Section>

            <p className="text-xs text-[#3d3330]/50 mt-10">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </>
        ) : (
          <>
            <p className="text-sm text-[#3d3330] leading-relaxed mb-10">
              Your privacy matters. This policy explains what data is collected, why and how it is used.
            </p>

            <Section title="Data collected">
              <p><strong>Newsletter:</strong> Your email address is collected when you subscribe to the newsletter.</p>
              <p><strong>Analytics:</strong> If an analytics tool is enabled, anonymised browsing data may be collected (pages visited, session duration).</p>
              <p><strong>Affiliate links:</strong> Affiliate partners may use their own cookies to track conversions. Please refer to their respective privacy policies.</p>
            </Section>

            <Section title="Legal basis (GDPR)">
              <p><strong>Newsletter:</strong> Explicit consent (opt-in). You may unsubscribe at any time via the link in each email.</p>
              <p><strong>Analytics:</strong> Legitimate interest in site improvement.</p>
            </Section>

            <Section title="Storage & security">
              <p>
                Newsletter email addresses are stored with <strong>Resend</strong> (resend.com),
                a secure third-party service. They are neither sold nor shared with third parties
                for commercial purposes.
              </p>
            </Section>

            <Section title="Retention period">
              <p>Newsletter email addresses: retained until unsubscription.</p>
              <p>Anonymised analytics data: maximum 13 months.</p>
            </Section>

            <Section title="Your rights">
              <p>Under GDPR, you have the following rights:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Right of access to your data</li>
                <li>Right to rectification</li>
                <li>Right to erasure (&quot;right to be forgotten&quot;)</li>
                <li>Right to data portability</li>
                <li>Right to object</li>
              </ul>
              <p>
                To exercise these rights, contact us at:{' '}
                <a href="mailto:contact@wanderbite.com" className="text-[#c9a96e] hover:underline">
                  contact@wanderbite.com
                </a>
              </p>
            </Section>

            <Section title="Cookies">
              <p>
                This site uses technically necessary cookies for functionality (language preference).
                No advertising cookies are used by WanderBite.
                Affiliate partners may set their own cookies when you click an affiliate link.
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
