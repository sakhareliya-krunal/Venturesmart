import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import { ProductListing } from "@/components/ProductListing";
import { ProductRecentlyViewed } from "@/components/ProductRecentlyViewed";
import { products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  return {
    title: product ? `${product.name} | Ventures Mart` : "Product | Ventures Mart",
    description: product?.description
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  return (
    <main>
      <ProductDetailClient product={product} />
      <ProductRecentlyViewed
        catalog={products}
        excludeId={product.id}
        heading="Recently viewed"
        eyebrow="Continue browsing"
      />
      <section className="section related-section">
        <ProductListing
          items={relatedProducts}
          heading="Related products"
          eyebrow="Complete the set"
          searchable={false}
          showCategories={false}
        />
      </section>
    </main>
  );
}
