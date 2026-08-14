import bagsImg from "../assets/bags-collection.jpg";
import handkerchiefsImg from "../assets/handkerchiefs-collection.jpg";
import cosmeticsImg from "../assets/cosmetics-teaser.jpg";

export type Product = {
  id: string;
  image: string;
  category: string;
  price?: number;
  compareAt?: number;
  rating?: number;
  reviews?: number;
  comingSoon?: boolean;
};

export const products: Product[] = [
  {
    id: "embroidered-clutch",
    image: bagsImg,
    category: "Bags",
    price: 1450,
    compareAt: 1800,
    rating: 4.8,
    reviews: 36,
  },
  { id: "linen-pouch", image: bagsImg, category: "Bags", price: 850, rating: 4.6, reviews: 21 },
  {
    id: "monogram-handkerchief",
    image: handkerchiefsImg,
    category: "Wedding Handkerchiefs",
    price: 650,
    compareAt: 820,
    rating: 5,
    reviews: 54,
  },
  {
    id: "bridal-handkerchief",
    image: handkerchiefsImg,
    category: "Wedding Handkerchiefs",
    price: 990,
    rating: 4.9,
    reviews: 42,
  },
  { id: "custom-order", image: bagsImg, category: "Bespoke", price: 1600, rating: 4.9, reviews: 18 },
  { id: "cosmetics-soon", image: cosmeticsImg, category: "Cosmetics", comingSoon: true },
];

export const reviewIds = ["r1", "r2", "r3"] as const;
