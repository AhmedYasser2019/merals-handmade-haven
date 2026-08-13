import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/SiteLayout";
import heroImg from "../assets/hero-meral.jpg";
import bagsImg from "../assets/bags-collection.jpg";
import handkerchiefsImg from "../assets/handkerchiefs-collection.jpg";
import cosmeticsImg from "../assets/cosmetics-teaser.jpg";
import { Heart, Sparkles, Truck } from "lucide-react";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meral — Handmade Bags & Embroidered Keepsakes" },
      {
        name: "description",
        content:
          "Discover Meral's handmade bags and embroidered wedding handkerchiefs. Artisan pieces crafted with love and made to be treasured.",
      },
      { property: "og:title", content: "Meral — Handmade Bags & Embroidered Keepsakes" },
      {
        property: "og:description",
        content:
          "Discover Meral's handmade bags and embroidered wedding handkerchiefs. Artisan pieces crafted with love.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { t } = useI18n();

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="hero-blush-glow relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-24">
          <div className="order-2 lg:order-1">
            <span className="inline-block rounded-full bg-secondary/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-secondary-foreground">
              {t.home.badge}
            </span>
            <h1 className="mt-6 font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              {t.home.title1}
              <br />
              {t.home.title2}
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
              {t.home.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/products">{t.home.shop}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link to="/about">{t.home.story}</Link>
              </Button>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-3xl card-shadow">
              <img
                src={heroImg}
                alt={t.home.heroAlt}
                width={1280}
                height={768}
                className="aspect-[4/3] w-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
              {t.home.featured}
            </h2>
            <p className="mt-2 text-muted-foreground">{t.home.featuredSub}</p>
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/products">{t.home.viewAll}</Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ProductCard
            to="/products"
            image={bagsImg}
            title={t.home.bagsTitle}
            description={t.home.bagsDesc}
          />
          <ProductCard
            to="/products"
            image={handkerchiefsImg}
            title={t.home.hankTitle}
            description={t.home.hankDesc}
          />
          <ProductCard
            to="/cosmetics"
            image={cosmeticsImg}
            title={t.home.cosmeticsTitle}
            description={t.home.cosmeticsDesc}
            badge={t.home.soon}
          />
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-border/60 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            <ValueCard
              icon={<Heart className="size-6 text-primary" />}
              title={t.home.value1Title}
              description={t.home.value1Desc}
            />
            <ValueCard
              icon={<Sparkles className="size-6 text-primary" />}
              title={t.home.value2Title}
              description={t.home.value2Desc}
            />
            <ValueCard
              icon={<Truck className="size-6 text-primary" />}
              title={t.home.value3Title}
              description={t.home.value3Desc}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="gradient-blush-lavender rounded-3xl p-8 sm:p-12 lg:p-16">
          <h2 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            {t.home.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{t.home.ctaDesc}</p>
          <div className="mt-8">
            <Button asChild size="lg" variant="outline" className="rounded-full border-foreground/20 px-8">
              <Link to="/contact">{t.home.ctaButton}</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function ProductCard({
  to,
  image,
  title,
  description,
  badge,
}: {
  to: string;
  image: string;
  title: string;
  description: string;
  badge?: string;
}) {
  return (
    <Link to={to} className="group block overflow-hidden rounded-2xl border border-border/60 bg-card subtle-shadow transition-all hover:card-shadow">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          width={1024}
          height={1024}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {badge && (
          <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
            {badge}
          </span>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-heading text-xl font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-secondary/60">
        {icon}
      </div>
      <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}
