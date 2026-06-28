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
    image: "/products/lunch-box/delicious-steel-lunch-box/15.jpg",
    gallery: lunchBoxGallery("delicious-steel-lunch-box", 15, 15),
    tag: "Meal ready",
    description: "Steel lunch box built for everyday tiffin packing with a clean, durable finish."
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
