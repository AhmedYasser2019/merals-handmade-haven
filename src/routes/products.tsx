import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
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

const products = [
  {
    id: "embroidered-clutch",
    image: bagsImg,
    title: "Embroidered Floral Clutch",
    category: "Bags",
    description:
      "A hand-embroidered clutch in soft blush tones with delicate floral details. Perfect for weddings and elegant evenings.",
  },
  {
    id: "linen-pouch",
    image: bagsImg,
    title: "Linen Embroidery Pouch",
    category: "Bags",
    description:
      "A compact linen pouch with hand-stitched florals. Made to carry your everyday essentials beautifully.",
  },
  {
    id: "monogram-handkerchief",
    image: handkerchiefsImg,
    title: "Personalised Monogram Handkerchief",
    category: "Wedding Handkerchiefs",
    description:
      "A soft linen handkerchief embroidered with an initial and surrounded by delicate flowers. A keepsake for weddings and anniversaries.",
  },
  {
    id: "bridal-handkerchief",
    image: handkerchiefsImg,
    title: "Bridal Floral Handkerchief",
    category: "Wedding Handkerchiefs",
    description:
      "Hand-embroidered wedding handkerchief with lace trim and a floral wreath. Designed for the bride and her loved ones.",
  },
  {
    id: "custom-order",
    image: bagsImg,
    title: "Custom Embroidery Order",
    category: "Bespoke",
    description:
      "Work with us to create a custom piece — a special motif, a name, a date, or a colour that holds meaning for you.",
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
              </div>
              <div className="p-6">
                <span className="text-xs font-medium uppercase tracking-wider text-primary">
                  {product.category}
                </span>
                <h3 className="mt-2 font-heading text-xl font-semibold text-foreground">
                  {product.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>

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
