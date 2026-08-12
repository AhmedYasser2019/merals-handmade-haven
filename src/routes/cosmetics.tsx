import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import cosmeticsImg from "../assets/cosmetics-teaser.jpg";

export const Route = createFileRoute("/cosmetics")({
  head: () => ({
    meta: [
      { title: "Meral Cosmetics — Coming Soon" },
      {
        name: "description",
        content:
          "Meral is expanding into natural, handcrafted cosmetics. Sign up to be the first to know when our skincare line launches.",
      },
      { property: "og:title", content: "Meral Cosmetics — Coming Soon" },
      {
        property: "og:description",
        content:
          "Meral is expanding into natural, handcrafted cosmetics. Sign up to be the first to know when our skincare line launches.",
      },
      { property: "og:image", content: cosmeticsImg },
      { name: "twitter:image", content: cosmeticsImg },
    ],
  }),
  component: CosmeticsPage,
});

function CosmeticsPage() {
  return (
    <SiteLayout>
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <div className="relative overflow-hidden rounded-3xl card-shadow">
          <img
            src={cosmeticsImg}
            alt="Meral natural cosmetics line preview with elegant glass bottles and lavender"
            width={1024}
            height={768}
            className="aspect-[4/3] w-full object-cover"
            loading="eager"
          />
        </div>

        <div>
          <span className="inline-block rounded-full bg-secondary/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-secondary-foreground">
            Coming Soon
          </span>
          <h1 className="mt-6 font-heading text-4xl font-semibold text-foreground sm:text-5xl">
            Natural beauty, crafted by Meral
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            We are bringing the same care and softness from our handmade accessories into a new
            collection of natural cosmetics. Gentle skincare, soft textures, and ingredients chosen
            with intention.
          </p>
          <p className="mt-4 text-muted-foreground">
            Leave your email and we'll let you know as soon as the collection is ready.
          </p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you! We'll be in touch when Meral Cosmetics launches.");
            }}
          >
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cosmetics-name">Name</Label>
                <Input
                  id="cosmetics-name"
                  placeholder="Your name"
                  className="rounded-xl border-border/60 bg-card"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cosmetics-email">Email</Label>
                <Input
                  id="cosmetics-email"
                  type="email"
                  placeholder="you@example.com"
                  className="rounded-xl border-border/60 bg-card"
                />
              </div>
            </div>
            <Button type="submit" className="rounded-full px-8">
              Notify Me
            </Button>
          </form>
        </div>
      </div>
    </SiteLayout>
  );
}
