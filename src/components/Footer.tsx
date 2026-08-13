import { Instagram, Mail, MapPin } from "lucide-react";
import { useI18n } from "@/i18n";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="w-full border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <h3 className="font-heading text-xl font-semibold text-foreground">{t.brand}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{t.footer.tagline}</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
              {t.footer.contact}
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-primary" />
                <span dir="ltr">hello@meral.handmade</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-primary" />
                <span>{t.footer.location}</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
              {t.footer.follow}
            </h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="size-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {t.brand}. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
