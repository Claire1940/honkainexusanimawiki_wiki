"use client";

import { useState, Suspense, lazy } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  Check,
  ChevronDown,
  ExternalLink,
  FlaskConical,
  Newspaper,
  PawPrint,
  Sparkles,
  Swords,
  Trophy,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";
import type { ModuleLinkMap } from "@/lib/buildModuleLinkMap";

// Lazy load heavy components
const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

// Loading placeholder
const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div
    className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`}
  />
);

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  moduleLinkMap: ModuleLinkMap;
  locale: string;
}

// Reusable module section header (icon badge + title + intro)
function ModuleHeader({
  icon: Icon,
  title,
  intro,
}: {
  icon: LucideIcon;
  title: string;
  intro: string;
}) {
  return (
    <div className="mb-8 md:mb-12 scroll-reveal">
      <div className="flex flex-col items-center gap-3 mb-4 md:mb-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
          <Icon className="w-7 h-7 text-[hsl(var(--nav-theme-light))]" />
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center max-w-3xl leading-tight">
          {title}
        </h2>
      </div>
      <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto text-center">
        {intro}
      </p>
    </div>
  );
}

export default function HomePageClient({
  latestArticles,
  locale,
}: HomePageClientProps) {
  const t = useMessages() as any;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.honkainexusanimawiki.wiki";

  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Honkai Nexus Anima Wiki",
        description:
          "Complete Honkai Nexus Anima Wiki covering anima companions, codes, characters, tier lists, and Evolution Test beta info for HoYoverse's creature-collector strategy RPG.",
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Honkai Nexus Anima - Creature-Collector Strategy RPG",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Honkai Nexus Anima Wiki",
        alternateName: "Honkai Nexus Anima",
        url: siteUrl,
        description:
          "Complete Honkai Nexus Anima Wiki resource hub for anima companions, codes, characters, and strategy guides",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Honkai Nexus Anima Wiki - Creature-Collector Strategy RPG",
        },
        sameAs: [
          "https://hna.hoyoverse.com/",
          "https://discord.com/invite/honkainexusanima",
          "https://x.com/HonkaiNA",
          "https://www.reddit.com/r/HonkaiNexusAnima/",
          "https://www.youtube.com/@HonkaiNA",
        ],
      },
      {
        "@type": "VideoGame",
        name: "Honkai Nexus Anima",
        gamePlatform: ["PC", "iOS", "Android"],
        applicationCategory: "Game",
        genre: ["Adventure", "Strategy", "RPG", "Creature Collector"],
        numberOfPlayers: {
          minValue: 1,
          maxValue: 1,
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://hna.hoyoverse.com/",
        },
      },
      {
        "@type": "VideoObject",
        name: "Honkai: Nexus Anima - Evolution Test Gameplay Showcase",
        description:
          "Official Honkai: Nexus Anima Evolution Test gameplay showcase video — a peek at what to expect from the upcoming creature-collector strategy adventure test.",
        uploadDate: "2026-07-09",
        thumbnailUrl: `${siteUrl}/images/hero.webp`,
        embedUrl: "https://www.youtube.com/embed/1Em1aoE1TMQ",
        url: "https://www.youtube.com/watch?v=1Em1aoE1TMQ",
      },
    ],
  };

  // Module 6 (Battle System) accordion state
  const [faqExpanded, setFaqExpanded] = useState<number | null>(null);
  const mobileBannerAd = getPreferredMobileBannerSelection();

  // Tools Grid card -> section anchor mapping (must match the 8 module sections)
  const sectionIds = [
    "release-date-platforms",
    "evolution-test",
    "beginner-guide",
    "anima-list",
    "tier-list",
    "battle-system",
    "characters-story",
    "latest-news",
  ];

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 广告位 1: 顶部固定横幅 */}
      <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2
                            bg-[hsl(var(--nav-theme)/0.1)]
                            border border-[hsl(var(--nav-theme)/0.3)] mb-4 md:mb-6"
            >
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">
                {t.hero.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.05]">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <button
                onClick={() => scrollToSection("beginner-guide")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </button>
              <a
                href="https://hna.hoyoverse.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-base md:text-lg transition-colors"
              >
                {t.hero.playOnRobloxCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* Video Section */}
      <section className="px-4 py-10 md:py-12">
        <div className="scroll-reveal container mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature
              videoId="1Em1aoE1TMQ"
              title="Honkai: Nexus Anima - Evolution Test Gameplay Showcase"
            />
          </div>
        </div>
      </section>

      {/* Tools Grid - 8 Navigation Cards */}
      <section className="px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.tools.title}{" "}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {t.tools.cards.map((card: any, index: number) => {
              const sectionId = sectionIds[index];
              return (
                <button
                  key={index}
                  onClick={() => scrollToSection(sectionId)}
                  className="scroll-reveal group rounded-xl border border-border p-4 md:p-6
                             bg-card hover:border-[hsl(var(--nav-theme)/0.5)]
                             transition-all duration-300 cursor-pointer text-left
                             hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12
                                  bg-[hsl(var(--nav-theme)/0.1)]
                                  flex items-center justify-center
                                  group-hover:bg-[hsl(var(--nav-theme)/0.2)]
                                  transition-colors"
                  >
                    <DynamicIcon
                      name={card.icon}
                      className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <h3 className="mb-1.5 text-sm md:text-base font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <LatestGuidesAccordion
        articles={latestArticles}
        locale={locale}
        max={12}
      />

      {/* 广告位 2: 首屏内容之后再加载广告 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      {/* 广告位 3: 移动端优先使用方形，桌面端保留横幅 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Module 1: Release Date and Platforms (table) */}
      <section id="release-date-platforms" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={CalendarCheck}
            title={t.modules.honkaiNexusAnimaReleaseDate.title}
            intro={t.modules.honkaiNexusAnimaReleaseDate.intro}
          />
          {/* Desktop table */}
          <div className="scroll-reveal hidden md:block overflow-hidden rounded-xl border border-border">
            <table className="w-full text-left">
              <thead className="bg-[hsl(var(--nav-theme)/0.1)]">
                <tr>
                  <th className="px-5 py-3 text-sm font-semibold">Topic</th>
                  <th className="px-5 py-3 text-sm font-semibold">Status</th>
                  <th className="px-5 py-3 text-sm font-semibold">Details</th>
                </tr>
              </thead>
              <tbody>
                {t.modules.honkaiNexusAnimaReleaseDate.rows.map(
                  (row: any, index: number) => (
                    <tr
                      key={index}
                      className="border-t border-border align-top"
                    >
                      <td className="px-5 py-4 font-semibold whitespace-nowrap">
                        {row.topic}
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm font-medium text-[hsl(var(--nav-theme-light))]">
                          {row.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-muted-foreground">
                        {row.details}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
          {/* Mobile stacked list */}
          <div className="scroll-reveal md:hidden space-y-3">
            {t.modules.honkaiNexusAnimaReleaseDate.rows.map(
              (row: any, index: number) => (
                <div
                  key={index}
                  className="p-4 bg-white/5 border border-border rounded-xl"
                >
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <span className="font-semibold text-sm">{row.topic}</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-xs font-medium text-[hsl(var(--nav-theme-light))]">
                      {row.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{row.details}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* 广告位 4: 阅读停顿位 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="hidden md:flex"
      />

      {/* Module 2: Evolution Test (steps with status) */}
      <section
        id="evolution-test"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={FlaskConical}
            title={t.modules.honkaiNexusAnimaEvolutionTest.title}
            intro={t.modules.honkaiNexusAnimaEvolutionTest.intro}
          />
          <div className="scroll-reveal space-y-3 md:space-y-4">
            {t.modules.honkaiNexusAnimaEvolutionTest.steps.map(
              (step: any, index: number) => (
                <div
                  key={index}
                  className="flex gap-3 md:gap-4 p-4 md:p-6 bg-white/5 border border-border rounded-xl"
                >
                  <div className="flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]">
                    <span className="text-base md:text-xl font-bold text-[hsl(var(--nav-theme-light))]">
                      {index + 1}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5 md:mb-2">
                      <h3 className="text-lg md:text-xl font-bold">{step.title}</h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-xs font-medium">
                        {step.status}
                      </span>
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Module 3: Beginner Guide (steps with tip) */}
      <section id="beginner-guide" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={BookOpen}
            title={t.modules.honkaiNexusAnimaBeginnerGuide.title}
            intro={t.modules.honkaiNexusAnimaBeginnerGuide.intro}
          />
          <div className="scroll-reveal space-y-3 md:space-y-4">
            {t.modules.honkaiNexusAnimaBeginnerGuide.steps.map(
              (step: any, index: number) => (
                <div
                  key={index}
                  className="p-4 md:p-6 bg-white/5 border border-border rounded-xl"
                >
                  <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-3">
                    <div className="flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]">
                      <span className="text-base md:text-xl font-bold text-[hsl(var(--nav-theme-light))]">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold">{step.title}</h3>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground mb-3">
                    {step.description}
                  </p>
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.2)]">
                    <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      {step.tip}
                    </span>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Module 4: Anima List (cards) */}
      <section
        id="anima-list"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={PawPrint}
            title={t.modules.honkaiNexusAnimaAnimaList.title}
            intro={t.modules.honkaiNexusAnimaAnimaList.intro}
          />
          <div className="scroll-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.honkaiNexusAnimaAnimaList.cards.map(
              (card: any, index: number) => (
                <div
                  key={index}
                  className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)] flex-shrink-0">
                      <PawPrint className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                    </div>
                    <h3 className="font-bold text-base md:text-lg leading-tight">
                      {card.name}
                    </h3>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 mb-2.5 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-xs font-medium text-[hsl(var(--nav-theme-light))]">
                    {card.category}
                  </span>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* 广告位 6: 移动端横幅 320×50 */}
      {mobileBannerAd && (
        <AdBanner
          type={mobileBannerAd.type}
          adKey={mobileBannerAd.adKey}
          className="md:hidden"
        />
      )}

      {/* Module 5: Tier List (tier grid) */}
      <section id="tier-list" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Trophy}
            title={t.modules.honkaiNexusAnimaTierList.title}
            intro={t.modules.honkaiNexusAnimaTierList.intro}
          />
          <div className="scroll-reveal space-y-5 md:space-y-6">
            {t.modules.honkaiNexusAnimaTierList.tiers.map(
              (tier: any, index: number) => (
                <div
                  key={index}
                  className="rounded-xl border border-border overflow-hidden"
                >
                  <div className="p-4 md:p-5 bg-[hsl(var(--nav-theme)/0.1)] border-b border-[hsl(var(--nav-theme)/0.2)]">
                    <div className="flex items-center gap-2 mb-1">
                      <Trophy className="w-5 h-5 text-[hsl(var(--nav-theme-light))] flex-shrink-0" />
                      <h3 className="font-bold text-base md:text-lg">
                        {tier.tier}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{tier.summary}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 md:p-4 bg-white/[0.02]">
                    {tier.entries.map((entry: any, ei: number) => (
                      <div
                        key={ei}
                        className="p-4 bg-white/5 border border-border rounded-lg"
                      >
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h4 className="font-semibold">{entry.name}</h4>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-xs font-medium">
                            {entry.role}
                          </span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/5 border border-border text-xs text-muted-foreground">
                            {entry.aspect}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {entry.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Module 6: Battle System (accordion) */}
      <section
        id="battle-system"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Swords}
            title={t.modules.honkaiNexusAnimaBattleSystem.title}
            intro={t.modules.honkaiNexusAnimaBattleSystem.intro}
          />
          <div className="scroll-reveal space-y-2.5">
            {t.modules.honkaiNexusAnimaBattleSystem.faqs.map(
              (faq: any, index: number) => (
                <div
                  key={index}
                  className="border border-border rounded-xl overflow-hidden bg-white/5"
                >
                  <button
                    onClick={() =>
                      setFaqExpanded(faqExpanded === index ? null : index)
                    }
                    className="w-full flex items-center justify-between gap-3 p-4 md:p-5 text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="font-semibold text-sm md:text-base">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 transition-transform ${faqExpanded === index ? "rotate-180" : ""}`}
                    />
                  </button>
                  {faqExpanded === index && (
                    <div className="px-4 md:px-5 pb-4 md:pb-5">
                      <p className="text-sm text-muted-foreground mb-3">
                        {faq.answer}
                      </p>
                      <ul className="space-y-1.5">
                        {faq.keyPoints.map((kp: string, ki: number) => (
                          <li
                            key={ki}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                            <span>{kp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Module 7: Characters and Story (cards) */}
      <section id="characters-story" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Users}
            title={t.modules.honkaiNexusAnimaCharacters.title}
            intro={t.modules.honkaiNexusAnimaCharacters.intro}
          />
          <div className="scroll-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.honkaiNexusAnimaCharacters.cards.map(
              (card: any, index: number) => (
                <div
                  key={index}
                  className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <h3 className="font-bold text-base md:text-lg leading-tight">
                      {card.name}
                    </h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-xs font-medium text-[hsl(var(--nav-theme-light))] whitespace-nowrap flex-shrink-0">
                      {card.tag}
                    </span>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 mb-2.5 rounded-full bg-white/5 border border-border text-xs text-muted-foreground">
                    {card.category}
                  </span>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Module 8: Latest News and Trailers (external links) */}
      <section
        id="latest-news"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Newspaper}
            title={t.modules.honkaiNexusAnimaLatestNews.title}
            intro={t.modules.honkaiNexusAnimaLatestNews.intro}
          />
          <div className="scroll-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.honkaiNexusAnimaLatestNews.items.map(
              (item: any, index: number) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-xs font-medium text-[hsl(var(--nav-theme-light))]">
                      {item.type}
                    </span>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                  <h3 className="font-bold mb-1.5 flex items-start gap-1.5">
                    <span>{item.title}</span>
                    <ExternalLink className="w-3.5 h-3.5 mt-1 flex-shrink-0 text-muted-foreground" />
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{item.summary}</p>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/5 border border-border text-xs text-muted-foreground">
                    {item.tag}
                  </span>
                </a>
              ),
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Ad Banner 3 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Footer */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.footer.description}
              </p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://discord.com/invite/honkainexusanima"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/HonkaiNA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.reddit.com/r/HonkaiNexusAnima/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.reddit}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@HonkaiNA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.youtube}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {t.footer.copyright}
              </p>
              <p className="text-xs text-muted-foreground">
                {t.footer.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
