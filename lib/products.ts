export type ProductCategory = "Toys" | "Lunch Box";

export type Product = {
  id: number;
  slug: string;
  name: string;
  category: ProductCategory;
  detail: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  tag: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  stockStatus: string;
  deliveryNote: string;
  warrantyNote: string;
  variantGroupId?: string;
  colorName?: string;
  colorHex?: string;
};

export type CartItem = Product & { quantity: number };

type BaseProduct = Omit<
  Product,
  "slug" | "gallery" | "features" | "specs" | "stockStatus" | "deliveryNote" | "warrantyNote"
> & {
  gallery?: string[];
};

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const categoryDelivery: Record<ProductCategory, string> = {
  Toys: "Gift-ready packing and delivery in 3-5 days.",
  "Lunch Box": "Food-safe packing and delivery in 2-5 days."
};

const categoryWarranty: Record<ProductCategory, string> = {
  Toys: "7-day replacement for manufacturing defects.",
  "Lunch Box": "7-day replacement for damaged or incorrect lunch boxes."
};

const categoryFeature: Record<ProductCategory, string> = {
  Toys: "Child-friendly design focused on safe, creative play.",
  "Lunch Box": "Practical lunch storage selected for school, office, and travel."
};

const createSpecs = (product: BaseProduct) => [
  { label: "Category", value: product.category },
  { label: "Type", value: product.detail },
  ...(product.colorName ? [{ label: "Color", value: product.colorName }] : []),
  { label: "Rating", value: `${product.rating} out of 5` },
  { label: "Reviews", value: `${product.reviews}+ verified reviews` }
];

const enrichProduct = (product: BaseProduct): Product => ({
  ...product,
  slug: slugify(product.name),
  gallery: product.gallery ?? [product.image],
  features: [
    categoryFeature[product.category],
    product.description,
    `Save ${formatPrice(product.mrp - product.price)} compared with MRP.`,
    "Covered by Ventures Mart support after checkout."
  ],
  specs: createSpecs(product),
  stockStatus: product.id % 5 === 0 ? "Limited stock" : "In stock",
  deliveryNote: categoryDelivery[product.category],
  warrantyNote: categoryWarranty[product.category]
});

const lunchBoxGallery = (folder: string, count: number, first = 1) => {
  const images = Array.from({ length: count }, (_, index) => `/products/lunch-box/${folder}/${String(index + 1).padStart(2, "0")}.jpg`);

  if (first <= 1 || first > count) {
    return images;
  }

  return [images[first - 1], ...images.filter((_, index) => index !== first - 1)];
};

const baseProducts: BaseProduct[] = [
  {
    id: 1,
    name: "Magnetic Building Tiles",
    category: "Toys",
    detail: "Kids",
    price: 2499,
    mrp: 3199,
    rating: 4.5,
    reviews: 277,
    image: "/products/toys-tiles.jpg",
    tag: "Creative play",
    description: "Colorful magnetic tiles for open-ended shapes, towers, and vehicles."
  },
  {
    id: 2,
    name: "Plush Cuddle Bear",
    category: "Toys",
    detail: "Soft toy",
    price: 799,
    mrp: 1099,
    rating: 4.5,
    reviews: 277,
    image: "/products/toys-plush.jpg",
    tag: "Soft touch",
    description: "Machine-washable plush bear with child-safe stitching and a soft feel."
  },
  {
    id: 3,
    name: "Rainbow Wooden Blocks",
    category: "Toys",
    detail: "Learning",
    price: 1299,
    mrp: 1699,
    rating: 4.8,
    reviews: 312,
    image: "/products/toys-blocks.jpg",
    tag: "Skill builder",
    description: "Stackable blocks for color matching, balance, and early counting play."
  },
  {
    id: 4,
    name: "Little Chef Kitchen Set",
    category: "Toys",
    detail: "Pretend play",
    price: 2199,
    mrp: 2999,
    rating: 4.9,
    reviews: 421,
    image: "/products/toys-kitchen.jpg",
    tag: "Gift ready",
    description: "Pretend-play kitchen with utensils and accessories for role-play fun."
  },
  {
    id: 5,
    name: "Everyday Lunch Box Set",
    category: "Lunch Box",
    detail: "Lunch set",
    price: 899,
    mrp: 1299,
    rating: 4.6,
    reviews: 188,
    image: "/products/lunch-box/everyday-lunchbox-set/01.jpg",
    gallery: lunchBoxGallery("everyday-lunchbox-set", 13),
    tag: "Daily use",
    description: "Compact lunch box set with matching pieces for school, office, and daily meals."
  },
  {
    id: 6,
    name: "Tokyo 3 Compartment Steel Lunch Box - Blue",
    category: "Lunch Box",
    detail: "Steel lunch box",
    price: 1199,
    mrp: 1699,
    rating: 4.7,
    reviews: 246,
    image: "/products/lunch-box/tokyo-steel-lunch-box-blue/01.jpg",
    gallery: lunchBoxGallery("tokyo-steel-lunch-box-blue", 12),
    tag: "Steel body",
    description: "Blue three-compartment steel lunch box designed for neat portions and easy carrying.",
    variantGroupId: "tokyo-3-compartment-steel-lunch-box",
    colorName: "Blue",
    colorHex: "#3f82d7"
  },
  {
    id: 7,
    name: "Tokyo 3 Compartment Steel Lunch Box - Green",
    category: "Lunch Box",
    detail: "Steel lunch box",
    price: 1199,
    mrp: 1699,
    rating: 4.7,
    reviews: 219,
    image: "/products/lunch-box/tokyo-steel-lunch-box-green/01.jpg",
    gallery: lunchBoxGallery("tokyo-steel-lunch-box-green", 5),
    tag: "Fresh color",
    description: "Green three-compartment steel lunch box with a practical layout for balanced meals.",
    variantGroupId: "tokyo-3-compartment-steel-lunch-box",
    colorName: "Green",
    colorHex: "#64a85f"
  },
  {
    id: 8,
    name: "Tokyo 3 Compartment Steel Lunch Box - Pink",
    category: "Lunch Box",
    detail: "Steel lunch box",
    price: 1199,
    mrp: 1699,
    rating: 4.6,
    reviews: 205,
    image: "/products/lunch-box/tokyo-steel-lunch-box-pink/01.jpg",
    gallery: lunchBoxGallery("tokyo-steel-lunch-box-pink", 5),
    tag: "Color pick",
    description: "Pink three-compartment steel lunch box for tidy homemade meals and snacks.",
    variantGroupId: "tokyo-3-compartment-steel-lunch-box",
    colorName: "Pink",
    colorHex: "#f09bb9"
  },
  {
    id: 9,
    name: "Bear Family Lunch Box",
    category: "Lunch Box",
    detail: "Kids lunch box",
    price: 749,
    mrp: 1099,
    rating: 4.8,
    reviews: 294,
    image: "/products/lunch-box/bear-family-lunch-box/01.jpg",
    gallery: lunchBoxGallery("bear-family-lunch-box", 16),
    tag: "Cute design",
    description: "Bear-themed lunch box with a cheerful look for kids' meals, snacks, and school bags."
  },
  {
    id: 10,
    name: "Delicious Steel Lunch Box",
    category: "Lunch Box",
    detail: "Steel lunch box",
    price: 999,
    mrp: 1499,
    rating: 4.7,
    reviews: 231,
    image: "/products/lunch-box/delicious-steel-lunch-box/01.jpg",
    gallery: lunchBoxGallery("delicious-steel-lunch-box", 15),
    tag: "Meal ready",
    description: "Steel lunch box built for everyday tiffin packing with a clean, durable finish."
  },
  {
    id: 11,
    name: "Koi-Koi Steel Lunch Box - Blue",
    category: "Lunch Box",
    detail: "Steel lunch box",
    price: 1199,
    mrp: 1699,
    rating: 4.8,
    reviews: 198,
    image: "/products/lunch-box/koi-koi-steel-lunch-box-blue/01.jpg",
    gallery: lunchBoxGallery("koi-koi-steel-lunch-box-blue", 9),
    tag: "Steel body",
    description:
      "Three-compartment steel lunch box with leak-proof clips, a separate soup container, and a clear lid for easy packing.",
    variantGroupId: "koi-koi-steel-lunch-box",
    colorName: "Blue",
    colorHex: "#9ec5e8"
  },
  {
    id: 12,
    name: "Koi-Koi Steel Lunch Box - Pink",
    category: "Lunch Box",
    detail: "Steel lunch box",
    price: 1199,
    mrp: 1699,
    rating: 4.8,
    reviews: 176,
    image: "/products/lunch-box/koi-koi-steel-lunch-box-pink/01.jpg",
    gallery: lunchBoxGallery("koi-koi-steel-lunch-box-pink", 1),
    tag: "Steel body",
    description:
      "Pink three-compartment steel lunch box with leak-proof clips, a separate soup container, and a clear lid for everyday meals.",
    variantGroupId: "koi-koi-steel-lunch-box",
    colorName: "Pink",
    colorHex: "#f4c4d0"
  },
  {
    id: 13,
    name: "Koi-Koi Steel Lunch Box - Purple",
    category: "Lunch Box",
    detail: "Steel lunch box",
    price: 1199,
    mrp: 1699,
    rating: 4.7,
    reviews: 162,
    image: "/products/lunch-box/koi-koi-steel-lunch-box-purple/01.jpg",
    gallery: lunchBoxGallery("koi-koi-steel-lunch-box-purple", 1),
    tag: "Steel body",
    description:
      "Purple three-compartment steel lunch box with leak-proof clips, a separate soup container, and a clear lid for balanced tiffin packing.",
    variantGroupId: "koi-koi-steel-lunch-box",
    colorName: "Purple",
    colorHex: "#c4b0dc"
  },
  {
    id: 14,
    name: "Printed Steel Lunch Box - Blue",
    category: "Lunch Box",
    detail: "Steel lunch box",
    price: 999,
    mrp: 1499,
    rating: 4.6,
    reviews: 214,
    image: "/products/lunch-box/printed-steel-lunch-box-blue/01.jpg",
    gallery: lunchBoxGallery("printed-steel-lunch-box-blue", 4),
    tag: "Printed lid",
    description:
      "Teal printed steel lunch box with a playful food-themed lid, four-side locks, and a stainless steel interior for school and office meals.",
    variantGroupId: "printed-steel-lunch-box",
    colorName: "Blue",
    colorHex: "#4db8b0"
  },
  {
    id: 15,
    name: "Printed Steel Lunch Box - Pink",
    category: "Lunch Box",
    detail: "Steel lunch box",
    price: 999,
    mrp: 1499,
    rating: 4.6,
    reviews: 189,
    image: "/products/lunch-box/printed-steel-lunch-box-pink/01.jpg",
    gallery: lunchBoxGallery("printed-steel-lunch-box-pink", 3),
    tag: "Printed lid",
    description:
      "Pink printed steel lunch box with a colorful food-themed lid, secure side locks, and a stainless steel interior for daily tiffin use.",
    variantGroupId: "printed-steel-lunch-box",
    colorName: "Pink",
    colorHex: "#f0a8c0"
  },
  {
    id: 16,
    name: "Printed Steel Lunch Box - Purple",
    category: "Lunch Box",
    detail: "Steel lunch box",
    price: 999,
    mrp: 1499,
    rating: 4.5,
    reviews: 173,
    image: "/products/lunch-box/printed-steel-lunch-box-purple/01.jpg",
    gallery: lunchBoxGallery("printed-steel-lunch-box-purple", 4),
    tag: "Printed lid",
    description:
      "Purple printed steel lunch box with a fun food-themed lid, four-side locking clips, and a stainless steel interior for neat meal packing.",
    variantGroupId: "printed-steel-lunch-box",
    colorName: "Purple",
    colorHex: "#a898d8"
  },
  {
    id: 17,
    name: "Safari Kids Steel Lunch Box - Dino Green",
    category: "Lunch Box",
    detail: "Kids lunch box",
    price: 899,
    mrp: 1299,
    rating: 4.9,
    reviews: 267,
    image: "/products/lunch-box/safari-lunch-box-dino-green/01.jpg",
    gallery: lunchBoxGallery("safari-lunch-box-dino-green", 3),
    tag: "Kids design",
    description:
      "Super Dino Saur steel lunch box with a teal character lid, three-compartment steel tray, and four-side locks for school lunches.",
    variantGroupId: "safari-kids-steel-lunch-box",
    colorName: "Dino Green",
    colorHex: "#5eb8a8"
  },
  {
    id: 18,
    name: "Safari Kids Steel Lunch Box - Dino Yellow",
    category: "Lunch Box",
    detail: "Kids lunch box",
    price: 899,
    mrp: 1299,
    rating: 4.8,
    reviews: 241,
    image: "/products/lunch-box/safari-lunch-box-dino-yellow/01.jpg",
    gallery: lunchBoxGallery("safari-lunch-box-dino-yellow", 3),
    tag: "Kids design",
    description:
      "Yellow Super Dinosaur steel lunch box with a playful dino lid, stainless steel compartments, and secure side locks for kids on the go.",
    variantGroupId: "safari-kids-steel-lunch-box",
    colorName: "Dino Yellow",
    colorHex: "#f5c842"
  },
  {
    id: 19,
    name: "Safari Kids Steel Lunch Box - Chick Orange",
    category: "Lunch Box",
    detail: "Kids lunch box",
    price: 899,
    mrp: 1299,
    rating: 4.8,
    reviews: 228,
    image: "/products/lunch-box/safari-lunch-box-chick-orange/01.jpg",
    gallery: lunchBoxGallery("safari-lunch-box-chick-orange", 2),
    tag: "Kids design",
    description:
      "Super Bite Buddy chick steel lunch box with an orange character lid, steel interior tray, and leak-resistant locks for school tiffins.",
    variantGroupId: "safari-kids-steel-lunch-box",
    colorName: "Chick Orange",
    colorHex: "#f5924e"
  },
  {
    id: 20,
    name: "Safari Kids Steel Lunch Box - Owl Purple",
    category: "Lunch Box",
    detail: "Kids lunch box",
    price: 899,
    mrp: 1299,
    rating: 4.7,
    reviews: 205,
    image: "/products/lunch-box/safari-lunch-box-owl-purple/01.jpg",
    gallery: lunchBoxGallery("safari-lunch-box-owl-purple", 2),
    tag: "Kids design",
    description:
      "Super Chickey owl steel lunch box with a purple character lid, three-compartment steel tray, and four-side locks for everyday school use.",
    variantGroupId: "safari-kids-steel-lunch-box",
    colorName: "Owl Purple",
    colorHex: "#c4a8e8"
  }
];

export const products: Product[] = baseProducts.map(enrichProduct);

export type ProductVariantGroup = {
  key: string;
  product: Product;
  variants: Product[];
};

export const groupProductVariants = (items: Product[]): ProductVariantGroup[] => {
  const groups = new Map<string, ProductVariantGroup>();

  items.forEach((product) => {
    const key = product.variantGroupId ?? product.slug;
    const existingGroup = groups.get(key);

    if (existingGroup) {
      existingGroup.variants.push(product);
      return;
    }

    groups.set(key, {
      key,
      product,
      variants: [product]
    });
  });

  return Array.from(groups.values());
};

export const getDisplayProducts = (items: Product[]) =>
  groupProductVariants(items).map((group) => group.product);

export const getProductVariants = (product: Product, items: Product[] = products) => {
  if (!product.variantGroupId) {
    return [product];
  }

  return items.filter((item) => item.variantGroupId === product.variantGroupId);
};

export const categories = ["All", "Toys", "Lunch Box"] as const;

export const categoryPages = [
  {
    slug: "toys",
    category: "Toys",
    title: "Toys",
    description: "Creative play products and gift-ready favorites for children."
  },
  {
    slug: "lunch-box",
    category: "Lunch Box",
    title: "Lunch Box",
    description: "Lunch boxes and meal carriers for school, office, and everyday travel."
  }
] as const;
