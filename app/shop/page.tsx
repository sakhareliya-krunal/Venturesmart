import { InnerHero } from "@/components/InnerHero";
import { PageContent } from "@/components/PageContent";
import { ProductListing } from "@/components/ProductListing";
import { categories, products } from "@/lib/products";

export const metadata = {
  title: "Shop Products | Ventures Mart"
};

const shopCategoryOrder = ["All", "Lunch Box", "Toys"] as const;
const shopFeaturedCategoryOrder = ["Lunch Box", "Toys"] as const;

export default function ShopPage() {
  const catalogCategories = categories.filter((category) => category !== "All");

  return (
    <main>
      <InnerHero
        eyebrow="Catalog"
        title="All products"
        description="Browse toys and lunch boxes with filters and search."
        variant="catalog"
        stats={[
          { value: `${products.length}`, label: "Curated products" },
          { value: `${catalogCategories.length}`, label: "Shopping categories" },
          { value: "Rs 999+", label: "Free delivery threshold" }
        ]}
      />
      <PageContent id="catalog-products">
        <ProductListing
          categoryOrder={shopCategoryOrder}
          eyebrow="Filters & search"
          featuredCategoryOrder={shopFeaturedCategoryOrder}
          heading="Browse catalog"
          items={products}
        />
      </PageContent>
    </main>
  );
}
