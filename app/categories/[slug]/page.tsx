import { notFound } from "next/navigation";
import { InnerHero } from "@/components/InnerHero";
import { ProductListing } from "@/components/ProductListing";
import { categoryPages, getDisplayProducts, products } from "@/lib/products";

export function generateStaticParams() {
  return categoryPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categoryPage = categoryPages.find((page) => page.slug === slug);

  return {
    title: categoryPage ? `${categoryPage.title} | Ventures Mart` : "Category | Ventures Mart"
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categoryPage = categoryPages.find((page) => page.slug === slug);

  if (!categoryPage) {
    notFound();
  }

  const categoryProducts = products.filter((product) => product.category === categoryPage.category);
  const displayProducts = getDisplayProducts(categoryProducts);

  return (
    <main>
      <InnerHero
        eyebrow="Category"
        title={categoryPage.title}
        description={categoryPage.description}
        stats={[
          { value: `${displayProducts.length}`, label: "Products" },
          { value: "7-day", label: "Easy returns" },
          { value: "Fast", label: "Dispatch" }
        ]}
      />
      <section className="section page-section">
        <ProductListing
          items={categoryProducts}
          heading={categoryPage.title}
          eyebrow="Category collection"
          searchable={false}
          showCategories={false}
        />
      </section>
    </main>
  );
}
