import Link from 'next/link'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.honkainexusanimawiki.wiki'
  const path = '/about'

  return {
    title: 'About Honkai Nexus Anima Wiki - Your Ultimate Game Resource',
    description: 'Learn about Honkai Nexus Anima Wiki, a community-driven resource hub providing comprehensive guides, anima companion info, character builds, codes, and strategies for Honkai Nexus Anima.',
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: locale === 'en' ? `${siteUrl}${path}` : `${siteUrl}/${locale}${path}`,
      siteName: 'Honkai Nexus Anima Wiki',
      title: 'About Honkai Nexus Anima Wiki',
      description: 'Learn about our mission to provide the best Honkai Nexus Anima game resources and guides.',
      images: [
        {
          url: `${siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Honkai Nexus Anima Wiki',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About Honkai Nexus Anima Wiki',
      description: 'Learn about our mission to provide the best Honkai Nexus Anima game resources.',
      images: [`${siteUrl}/og-image.jpg`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Honkai Nexus Anima Wiki
          </h1>
          <p className="text-slate-300 text-lg mb-2">
            Your community-driven resource center for Honkai Nexus Anima
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Welcome to Honkai Nexus Anima Wiki</h2>
            <p>
              Honkai Nexus Anima Wiki is an <strong>unofficial, fan-made resource website</strong> dedicated to helping players
              master the game "Honkai Nexus Anima". We are a community-driven platform that provides comprehensive guides,
              anima companion info, character builds, codes, and strategic insights to enhance your gaming experience.
            </p>
            <p>
              Whether you're a new player just starting your adventure or a seasoned veteran looking to optimize your strategies,
              Honkai Nexus Anima Wiki is here to support you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Our Mission</h2>
            <p>
              Our mission is simple: <strong>to empower Honkai Nexus Anima players with accurate, up-to-date information
              and powerful tools</strong> that help them succeed in the game. We strive to:
            </p>
            <ul>
              <li><strong>Provide reliable information:</strong> Keep our content updated with the latest game changes, new items, and balance updates</li>
              <li><strong>Build useful tools:</strong> Develop guides, crafting calculators, and planners that help players make informed decisions</li>
              <li><strong>Foster community:</strong> Create a welcoming space where players can learn, share strategies, and grow together</li>
              <li><strong>Stay accessible:</strong> Keep all resources free and easy to use for players of all skill levels</li>
            </ul>

            <h2>Our Vision</h2>
            <p>
              We envision Honkai Nexus Anima Wiki as the <strong>go-to destination</strong> for every Honkai Nexus Anima player seeking
              to improve their gameplay. We want to be the resource that players trust and rely on, whether they need
              crafting guides, want to explore new biomes, or are looking for advanced survival tactics.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Feature Card 1 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">✨</div>
              <h3 className="text-xl font-semibold text-white mb-2">Anima Companions</h3>
              <p className="text-slate-300">
                Comprehensive guides on every anima companion — their abilities, evolutions,
                and how to build the perfect team for any encounter.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">👥</div>
              <h3 className="text-xl font-semibold text-white mb-2">Characters</h3>
              <p className="text-slate-300">
                Detailed breakdowns of every character — their roles, skills, and optimal builds
                so you always bring the right lineup to battle.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🎁</div>
              <h3 className="text-xl font-semibold text-white mb-2">Codes &amp; Beta Info</h3>
              <p className="text-slate-300">
                Up-to-date redemption codes, the Evolution Test schedule, supported platforms,
                and step-by-step guides to join the closed beta.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">📊</div>
              <h3 className="text-xl font-semibold text-white mb-2">Tier Lists</h3>
              <p className="text-slate-300">
                Community-tested tier lists for anima and characters, so you know exactly
                who to invest in first and who fits your playstyle.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">📖</div>
              <h3 className="text-xl font-semibold text-white mb-2">Strategy Guides</h3>
              <p className="text-slate-300">
                Battle strategy, team composition, and progression tips to help you master
                every challenge the world of Honkai Nexus Anima throws at you.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🌍</div>
              <h3 className="text-xl font-semibold text-white mb-2">Multilingual Support</h3>
              <p className="text-slate-300">
                Content available in multiple languages including English, Russian, Portuguese,
                German, Spanish, Japanese, Korean, and French.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Community-Driven</h2>
            <p>
              Honkai Nexus Anima Wiki is built <strong>by the community, for the community</strong>. We welcome contributions,
              feedback, and suggestions from players of all skill levels. Our content is constantly evolving based on:
            </p>
            <ul>
              <li><strong>Player feedback:</strong> Your suggestions help us improve and expand our resources</li>
              <li><strong>Community discoveries:</strong> New strategies, hidden mechanics, and pro tips shared by players</li>
              <li><strong>Game updates:</strong> We monitor official updates and adjust our content accordingly</li>
              <li><strong>Meta shifts:</strong> We track gameplay trends and update guides based on real player experiences</li>
            </ul>
            <p>
              <strong>Want to contribute?</strong> Whether you've discovered a new anima build, found a hidden strategy,
              or have suggestions for new guides, we'd love to hear from you! Reach out through our contact channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>About the Team</h2>
            <p>
              Honkai Nexus Anima Wiki is maintained by a dedicated team of passionate gamers and developers who love
              Honkai Nexus Anima as much as you do. We're players first, constantly testing strategies, exploring game
              mechanics, and staying updated with the latest discoveries.
            </p>
            <p>
              Our team combines expertise in:
            </p>
            <ul>
              <li><strong>Game analysis:</strong> Deep understanding of Honkai Nexus Anima mechanics and strategies</li>
              <li><strong>Web development:</strong> Building fast, user-friendly tools and interfaces</li>
              <li><strong>Content creation:</strong> Writing clear, helpful guides and tutorials</li>
              <li><strong>Community management:</strong> Listening to player feedback and fostering a positive environment</li>
            </ul>
            <p className="text-slate-400 italic text-sm">
              Project Codename: "Nexus Anima" – Building bonds between travelers and anima.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Important Disclaimer</h2>
            <p className="text-yellow-400/90">
              <strong>Honkai Nexus Anima Wiki is an unofficial fan-made website.</strong> We are NOT affiliated with,
              endorsed by, or associated with the developers of Honkai Nexus Anima or any official entities.
            </p>
            <p>
              All game content, trademarks, characters, and assets are the property of their respective owners.
              We use game-related content under fair use principles for informational and educational purposes only.
            </p>
            <p>
              Honkai Nexus Anima Wiki is a non-profit, community resource created by fans, for fans.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Get in Touch</h2>
            <p>
              We'd love to hear from you! Whether you have questions, suggestions, found a bug, or just want to say hi:
            </p>
            <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">General Inquiries</h3>
                <a href="mailto:contact@honkainexusanimawiki.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contact@honkainexusanimawiki.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Bug Reports</h3>
                <a href="mailto:support@honkainexusanimawiki.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  support@honkainexusanimawiki.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Content Submissions</h3>
                <a href="mailto:contribute@honkainexusanimawiki.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contribute@honkainexusanimawiki.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Partnerships</h3>
                <a href="mailto:partnerships@honkainexusanimawiki.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  partnerships@honkainexusanimawiki.wiki
                </a>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              <strong>Response Time:</strong> We aim to respond to all inquiries within 2-3 business days.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-y border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Stay updated with the latest guides, tips, and Honkai Nexus Anima news.
            Bookmark this site and check back regularly for new content!
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[hsl(var(--nav-theme-light))] text-white font-semibold hover:opacity-90 transition"
          >
            Explore Resources
          </Link>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Link href="/" className="text-[hsl(var(--nav-theme-light))] hover:underline">
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  )
}
