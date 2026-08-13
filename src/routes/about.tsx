import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import heroImg from "../assets/hero-meral.jpg";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Meral — Our Story" },
      {
        name: "description",
        content:
          "Learn the story behind Meral, a handmade brand creating elegant bags and embroidered wedding keepsakes.",
      },
      { property: "og:title", content: "About Meral — Our Story" },
      {
        property: "og:description",
        content:
          "Learn the story behind Meral, a handmade brand creating elegant bags and embroidered wedding keepsakes.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useI18n();

  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <span className="inline-block rounded-full bg-secondary/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-secondary-foreground">
          {t.about.badge}
        </span>
        <h1 className="mt-6 font-heading text-4xl font-semibold text-foreground sm:text-5xl">
          {t.about.title}
        </h1>

        <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <p>{t.about.p3}</p>
        </div>

        <div className="mt-12 rounded-2xl border border-border/60 bg-card p-8 sm:p-10">
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            {t.about.nextTitle}
          </h2>
          <p className="mt-4 text-muted-foreground">{t.about.nextDesc}</p>
          <div className="mt-6">
            <Button asChild className="rounded-full">
              <Link to="/contact">{t.about.nextCta}</Link>
            </Button>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
