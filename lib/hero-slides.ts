export type HeroSlide = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  image: string;
  ctaLabel: string;
};

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: "Sale! Up to 50% off",
    title: "Little Chef Kitchen Set",
    description: "Pretend-play kitchen with utensils and accessories for role-play fun.",
    href: "/products/little-chef-kitchen-set",
    image: "/products/toys-kitchen.jpg",
    ctaLabel: "Shop now"
  },
  {
    eyebrow: "New arrival",
    title: "Rainbow Wooden Blocks",
    description: "Stackable blocks for color matching, balance, and early counting play.",
    href: "/products/rainbow-wooden-blocks",
    image: "/products/toys-blocks.jpg",
    ctaLabel: "Shop now"
  },
  {
    eyebrow: "Daily essentials",
    title: "Everyday Lunch Box Set",
    description: "Compact lunch box set with matching pieces for school, office, and daily meals.",
    href: "/products/everyday-lunch-box-set",
    image: "/products/lunch-box/everyday-lunchbox-set/01.jpg",
    ctaLabel: "Shop now"
  },
  {
    eyebrow: "Creative play",
    title: "Magnetic Building Tiles",
    description: "Colorful magnetic tiles for open-ended shapes, towers, and vehicles.",
    href: "/products/magnetic-building-tiles",
    image: "/products/toys-tiles.jpg",
    ctaLabel: "Shop now"
  }
];
