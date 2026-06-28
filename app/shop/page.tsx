import { InnerHero } from "@/components/InnerHero";
import { PageContent } from "@/components/PageContent";
import { ProductListing } from "@/components/ProductListing";
import { TransitionLink } from "@/components/TransitionLink";
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
        title="Shop products"
        description="Browse toys and lunch boxes by category, price, rating, and search."
        variant="catalog"
        stats={[
          { value: `${products.length}`, label: "Curated products" },
          { value: `${catalogCategories.length}`, label: "Shopping categories" },
          { value: "Rs 999+", label: "Free delivery threshold" }
        ]}
        actions={
          <>
            <a className="primary-link" href="#catalog-products">
              Explore catalog
            </a>
            <TransitionLink className="secondary-link" href="/track-order">
              Track order
            </TransitionLink>
          </>
        }
      >
        <div className="catalog-hero-card">
          <div>
            <span>Featured deal</span>
            <strong>Up to 35% off</strong>
            <p>Creative toys and daily lunch boxes in one focused catalog.</p>
          </div>
          <div className="catalog-chip-grid">
            {catalogCategories.map((category) => (
              <span key={category}>{category}</span>
            ))}
          </div>
        </div>
      </InnerHero>
      <PageContent id="catalog-products">
        <ProductListing items={products} />
      </PageContent>
    </main>
  );
}
