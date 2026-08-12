import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Instagram } from "lucide-react";
import heroImg from "../assets/hero-meral.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Meral — Custom Orders & Inquiries" },
      {
        name: "description",
        content:
          "Get in touch with Meral for custom orders, wholesale inquiries, or questions about our handmade bags and embroidered handkerchiefs.",
      },
      { property: "og:title", content: "Contact Meral — Custom Orders & Inquiries" },
      {
        property: "og:description",
        content:
          "Get in touch with Meral for custom orders, wholesale inquiries, or questions about our handmade bags and embroidered handkerchiefs.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-secondary/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-secondary-foreground">
            Get in Touch
          </span>
          <h1 className="mt-6 font-heading text-4xl font-semibold text-foreground sm:text-5xl">
            Let's create something beautiful
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Whether you have a custom order, a wholesale question, or just want to say hello, we
            would love to hear from you.
          </p>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-secondary/60">
                <Mail className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground">Email</h3>
                <p className="text-muted-foreground">hello@meral.handmade</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-secondary/60">
                <Instagram className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground">Instagram</h3>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  @meral.handmade
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <h3 className="font-heading text-lg font-semibold text-foreground">Custom orders</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We specialise in personalised wedding handkerchiefs and custom embroidery. Share
                your ideas and we'll help you design the perfect piece.
              </p>
            </div>
          </div>

          <form
            className="space-y-5 rounded-2xl border border-border/60 bg-card p-6 sm:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for your message! We'll get back to you soon.");
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  className="rounded-xl border-border/60 bg-background"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="rounded-xl border-border/60 bg-background"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Custom order / Wholesale / General inquiry"
                className="rounded-xl border-border/60 bg-background"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Tell us about your idea..."
                rows={5}
                className="rounded-xl border-border/60 bg-background"
                required
              />
            </div>

            <Button type="submit" className="w-full rounded-full">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </SiteLayout>
  );
}
