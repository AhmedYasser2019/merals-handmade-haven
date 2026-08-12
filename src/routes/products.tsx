import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import bagsImg from "../assets/bags-collection.jpg";
import handkerchiefsImg from "../assets/handkerchiefs-collection.jpg";
import cosmeticsImg from "../assets/cosmetics-teaser.jpg";

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

type Product = {
  id: string;
  image: string;
  title: string;
  category: string;
  description: string;
  price?: number;
  compareAt?: number;
  rating?: number;
  reviews?: number;
  badge?: string;
};

const products: Product[] = [
  {
    id: "embroidered-clutch",
    image: bagsImg,
    title: "Embroidered Floral Clutch",
    category: "Bags",
    description:
      "A hand-embroidered clutch in soft blush tones with delicate floral details. Perfect for weddings and elegant evenings.",
    price: 48,
    compareAt: 60,
    rating: 4.8,
    reviews: 36,
  },
  {
    id: "linen-pouch",
    image: bagsImg,
    title: "Linen Embroidery Pouch",
    category: "Bags",
    description:
      "A compact linen pouch with hand-stitched florals. Made to carry your everyday essentials beautifully.",
    price: 29,
    rating: 4.6,
    reviews: 21,
  },
  {
    id: "monogram-handkerchief",
    image: handkerchiefsImg,
    title: "Personalised Monogram Handkerchief",
    category: "Wedding Handkerchiefs",
    description:
      "A soft linen handkerchief embroidered with an initial and surrounded by delicate flowers. A keepsake for weddings and anniversaries.",
    price: 22,
    compareAt: 28,
    rating: 5,
    reviews: 54,
  },
  {
    id: "bridal-handkerchief",
    image: handkerchiefsImg,
    title: "Bridal Floral Handkerchief",
    category: "Wedding Handkerchiefs",
    description:
      "Hand-embroidered wedding handkerchief with lace trim and a floral wreath. Designed for the bride and her loved ones.",
    price: 34,
    rating: 4.9,
    reviews: 42,
  },
  {
    id: "custom-order",
    image: bagsImg,
    title: "Custom Embroidery Order",
    category: "Bespoke",
    description:
      "Work with us to create a custom piece — a special motif, a name, a date, or a colour that holds meaning for you.",
    price: 55,
    rating: 4.9,
    reviews: 18,
  },
  {
    id: "cosmetics-soon",
    image: cosmeticsImg,
    title: "Natural Cosmetics — Coming Soon",
    category: "Cosmetics",
    description:
      "Our upcoming line of gentle, handcrafted skincare and beauty products made with natural ingredients.",
    badge: "Soon",
  },
];

const reviews = [
  {
    id: "r1",
    name: "Amira H.",
    rating: 5,
    product: "Bridal Floral Handkerchief",
    text: "The embroidery is even more beautiful in person. My mother cried when I gave her hers on the wedding day.",
  },
  {
    id: "r2",
    name: "Laura M.",
    rating: 5,
    product: "Embroidered Floral Clutch",
    text: "Exquisite craftsmanship and the colours are so soft. It gets a compliment every time I carry it.",
  },
  {
    id: "r3",
    name: "Nour S.",
    rating: 4,
    product: "Personalised Monogram Handkerchief",
    text: "Lovely quality linen and the monogram was stitched exactly as I asked. Shipping was quick too.",
  },
];

function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${rating} out of 5 stars`}>
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
  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-secondary/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-secondary-foreground">
            Our Collection
          </span>
          <h1 className="mt-6 font-heading text-4xl font-semibold text-foreground sm:text-5xl">
            Handmade for every moment
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Elegant bags and embroidered keepsakes, crafted by hand and designed to be loved for
            years.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-2xl border border-border/60 bg-card subtle-shadow transition-all hover:card-shadow"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {product.badge && (
                  <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    {product.badge}
                  </span>
                )}
                {product.compareAt && product.price && (
                  <span className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                    -{Math.round(((product.compareAt - product.price) / product.compareAt) * 100)}%
                  </span>
                )}
              </div>
              <div className="p-6">
                <span className="text-xs font-medium uppercase tracking-wider text-primary">
                  {product.category}
                </span>
                <h3 className="mt-2 font-heading text-xl font-semibold text-foreground">
                  {product.title}
                </h3>
                {product.rating && (
                  <div className="mt-2 flex items-center gap-2">
                    <Stars rating={product.rating} />
                    <span className="text-xs text-muted-foreground">
                      {product.rating.toFixed(1)} ({product.reviews} reviews)
                    </span>
                  </div>
                )}
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
                {product.price ? (
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-heading text-xl font-semibold text-foreground">
                      ${product.price}
                    </span>
                    {product.compareAt && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.compareAt}
                      </span>
                    )}
                  </div>
                ) : (
                  <p className="mt-4 text-sm font-medium text-primary">Pricing announced at launch</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Customer feedback */}
        <section className="mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
              What our customers say
            </h2>
            <div className="mt-3 flex items-center justify-center gap-2">
              <Stars rating={5} />
              <span className="text-sm text-muted-foreground">4.9 average from 171 reviews</span>
            </div>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <figure
                key={review.id}
                className="rounded-2xl border border-border/60 bg-card p-6 subtle-shadow"
              >
                <Stars rating={review.rating} />
                <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  “{review.text}”
                </blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-medium text-foreground">{review.name}</span>
                  <span className="block text-xs text-muted-foreground">{review.product}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>


        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Interested in a custom piece? We'd love to hear your idea.
          </p>
          <Button asChild className="mt-4 rounded-full">
            <Link to="/contact">Request a Custom Order</Link>
          </Button>
        </div>
      </div>
    </SiteLayout>
  );
}
