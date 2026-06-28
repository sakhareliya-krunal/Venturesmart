import { Check, ChevronRight, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ProductListing } from "@/components/ProductListing";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { StorefrontSections } from "@/components/StorefrontSections";
import { TransitionLink } from "@/components/TransitionLink";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <main>
      <HeroCarousel />

      <section className="trust-strip" aria-label="Store benefits">
        <div>
          <Truck size={22} />
          <span>Free delivery above Rs 999</span>
        </div>
        <div>
          <ShieldCheck size={22} />
          <span>Focused premium catalog</span>
        </div>
        <div>
          <PackageCheck size={22} />
          <span>Secure checkout preview</span>
        </div>
      </section>

      <StorefrontSections />

      <section className="section">
        <ProductListing
          items={products.slice(0, 3)}
          heading="Featured products"
          eyebrow="Popular picks"
          searchable={false}
          showCategories={false}
        />
        <div className="section-action">
          <TransitionLink className="primary-link" href="/shop">
            View full catalog <ChevronRight size={18} />
          </TransitionLink>
        </div>
      </section>

      <RecentlyViewed catalog={products} />

      <section className="feature-band">
        <div className="feature-copy">
          <p className="eyebrow dark">Built for everyday shopping</p>
          <h2>A refined shopping experience designed for repeat buyers.</h2>
          <p>
            The storefront keeps product discovery, cart review, and payment readiness clear so the
            brand can feel polished from the first visit through checkout.
          </p>
        </div>
        <div className="feature-list">
          {[
            "Premium mobile-first product cards and cart",
            "Rupee pricing with delivery and savings",
            "Focused category pages for toys and lunch boxes",
            "Order verification and support-ready flow",
            "UPI, cards, net banking, wallets, COD ready"
          ].map((item) => (
            <div key={item}>
              <Check size={18} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
