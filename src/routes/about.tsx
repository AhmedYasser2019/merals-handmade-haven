import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import heroImg from "../assets/hero-meral.jpg";

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
  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <span className="inline-block rounded-full bg-secondary/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-secondary-foreground">
          Our Story
        </span>
        <h1 className="mt-6 font-heading text-4xl font-semibold text-foreground sm:text-5xl">
          Made slowly, treasured always
        </h1>

        <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            Meral was born from a love of slow, thoughtful craft. Every bag, every handkerchief,
            every embroidered detail carries a story — of patience, of care, and of the belief that
            the most meaningful things are made by hand.
          </p>
          <p>
            We began with a simple idea: to create beautiful, useful pieces that feel personal.
            Today, our collection includes handmade bags for everyday elegance and delicate wedding
            handkerchiefs embroidered with names, dates, and flowers that last forever.
          </p>
          <p>
            Each piece is designed in soft, romantic tones and finished with the kind of detail
            that only handwork can give. Whether you are buying for yourself or searching for a gift
            that will be remembered, we hope Meral becomes part of your most treasured moments.
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-border/60 bg-card p-8 sm:p-10">
          <h2 className="font-heading text-2xl font-semibold text-foreground">What's next</h2>
          <p className="mt-4 text-muted-foreground">
            We are expanding into natural cosmetics — a new line of gentle, handcrafted skincare
            inspired by the same softness and care we bring to every stitch. Sign up for updates to
            be the first to know.
          </p>
          <div className="mt-6">
            <Button asChild className="rounded-full">
              <Link to="/contact">Stay Updated</Link>
            </Button>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
