import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Star, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import bagsImg from "../assets/bags-collection.jpg";
import { products, reviewIds } from "@/data/products";
import { useI18n } from "@/i18n";
import { useCart } from "@/cart/CartContext";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Handmade Bags & Embroidered Handkerchiefs" },
      {
        name: "description",
        content:
          "Browse Meral's handmade bags and embroidered wedding handkerchiefs. Artisan pieces for everyday elegance and unforgettable occasions.",
      },
      { property: "og:title", content: "Products — Handmade Bags & Embroidered Handkerchiefs" },
      {
        property: "og:description",
        content:
          "Browse Meral's handmade bags and embroidered wedding handkerchiefs. Artisan pieces for everyday elegance and unforgettable occasions.",
      },
      { property: "og:image", content: bagsImg },
      { name: "twitter:image", content: bagsImg },
    ],
  }),
  component: ProductsPage,
});

export function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-0.5 ${className}`}
      aria-label={`${rating} / 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`size-3.5 ${
            i <= Math.round(rating) ? "fill-primary text-primary" : "text-muted-foreground/40"
          }`}
        />
      ))}
    </span>
  );
}

function ProductsPage() {
  const { t, lang } = useI18n();
  const { add } = useCart();
  const nf = new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-EG");

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-secondary/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-secondary-foreground">
            {t.products.badge}
          </span>
          <h1 className="mt-6 font-heading text-4xl font-semibold text-foreground sm:text-5xl">
            {t.products.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{t.products.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const copy = t.products.items[product.id]!;
            const discount =
              product.compareAt && product.price
                ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
                : null;

            return (
              <div
                key={product.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card subtle-shadow transition-all hover:card-shadow"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={copy.title}
                    width={1024}
                    height={1024}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {product.comingSoon && (
                    <span className="absolute start-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      {t.products.soon}
                    </span>
                  )}
                  {discount && (
                    <span className="absolute end-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                      -{nf.format(discount)}%
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <span className="text-xs font-medium uppercase tracking-wider text-primary">
                    {t.products.categories[product.category]}
                  </span>
                  <h3 className="mt-2 font-heading text-xl font-semibold text-foreground">
                    {copy.title}
                  </h3>
                  {product.rating && (
                    <div className="mt-2 flex items-center gap-2">
                      <Stars rating={product.rating} />
                      <span className="text-xs text-muted-foreground">
                        {nf.format(product.rating)} ({nf.format(product.reviews ?? 0)}{" "}
                        {t.products.reviews})
                      </span>
                    </div>
                  )}
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {copy.description}
                  </p>

                  {product.price ? (
                    <>
                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="font-heading text-xl font-semibold text-foreground">
                          {nf.format(product.price)} {t.currency}
                        </span>
                        {product.compareAt && (
                          <span className="text-sm text-muted-foreground line-through">
                            {nf.format(product.compareAt)} {t.currency}
                          </span>
                        )}
                      </div>
                      <Button
                        className="mt-4 w-full rounded-full"
                        onClick={() => {
                          add({
                            id: product.id,
                            title: copy.title,
                            price: product.price!,
                            image: product.image,
                          });
                          toast.success(t.cart.added);
                        }}
                      >
                        <ShoppingBag className="size-4" />
                        {t.cart.add}
                      </Button>
                    </>
                  ) : (
                    <p className="mt-4 text-sm font-medium text-primary">
                      {t.products.launchPrice}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Customer feedback */}
        <section className="mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
              {t.products.feedbackTitle}
            </h2>
            <div className="mt-3 flex items-center justify-center gap-2">
              <Stars rating={5} />
              <span className="text-sm text-muted-foreground">{t.products.feedbackAvg}</span>
            </div>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviewIds.map((id) => {
              const review = t.products.reviewsList[id]!;
              return (
                <figure
                  key={id}
                  className="rounded-2xl border border-border/60 bg-card p-6 subtle-shadow"
                >
                  <Stars rating={5} />
                  <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    “{review.text}”
                  </blockquote>
                  <figcaption className="mt-4 text-sm">
                    <span className="font-medium text-foreground">{review.name}</span>
                    <span className="block text-xs text-muted-foreground">{review.product}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground">{t.products.customNote}</p>
          <Button asChild className="mt-4 rounded-full">
            <Link to="/contact">{t.products.customCta}</Link>
          </Button>
        </div>
      </div>
    </SiteLayout>
  );
}
