import { InnerHero } from "@/components/InnerHero";
import { PageContent } from "@/components/PageContent";
import { ProductListing } from "@/components/ProductListing";
import { categories, products } from "@/lib/products";

export const metadata = {
  title: "Shop Products | Ventures Mart"
};

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
        <ProductListing items={products} heading="Browse catalog" eyebrow="Filters & search" />
      </PageContent>
    </main>
  );
}
