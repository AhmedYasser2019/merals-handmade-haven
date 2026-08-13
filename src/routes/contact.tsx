import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Instagram } from "lucide-react";
import heroImg from "../assets/hero-meral.jpg";
import { useI18n } from "@/i18n";

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
  const { t } = useI18n();

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-secondary/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-secondary-foreground">
            {t.contact.badge}
          </span>
          <h1 className="mt-6 font-heading text-4xl font-semibold text-foreground sm:text-5xl">
            {t.contact.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{t.contact.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-secondary/60">
                <Mail className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {t.contact.email}
                </h3>
                <p className="text-muted-foreground" dir="ltr">
                  hello@meral.handmade
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-secondary/60">
                <Instagram className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {t.contact.instagram}
                </h3>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                  dir="ltr"
                >
                  @meral.handmade
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <h3 className="font-heading text-lg font-semibold text-foreground">
                {t.contact.customTitle}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.contact.customDesc}</p>
            </div>
          </div>

          <form
            className="space-y-5 rounded-2xl border border-border/60 bg-card p-6 sm:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              alert(t.contact.thanks);
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">{t.contact.name}</Label>
                <Input
                  id="name"
                  placeholder={t.contact.namePlaceholder}
                  className="rounded-xl border-border/60 bg-background"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t.contact.email}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t.contact.emailPlaceholder}
                  className="rounded-xl border-border/60 bg-background"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">{t.contact.subject}</Label>
              <Input
                id="subject"
                placeholder={t.contact.subjectPlaceholder}
                className="rounded-xl border-border/60 bg-background"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">{t.contact.message}</Label>
              <Textarea
                id="message"
                placeholder={t.contact.messagePlaceholder}
                rows={5}
                className="rounded-xl border-border/60 bg-background"
                required
              />
            </div>

            <Button type="submit" className="w-full rounded-full">
              {t.contact.send}
            </Button>
          </form>
        </div>
      </div>
    </SiteLayout>
  );
}
