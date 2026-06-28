import Image from "next/image";
import {
  BadgeCheck,
  ChevronRight,
  Clock3,
  Headphones,
  PackageCheck,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Truck
} from "lucide-react";
import { categoryPages, formatPrice, getDisplayProducts, products } from "@/lib/products";
import { TransitionLink } from "./TransitionLink";

const categoryImages: Record<string, string> = {
  Toys: "/products/toys-blocks.jpg",
  "Lunch Box": "/products/lunch-box/everyday-lunchbox-set/01.jpg"
};

const testimonials = [
  {
    name: "Aarav Mehta",
    city: "Mumbai",
    text: "The product pages made comparison easy and the delivery estimate was clear before checkout.",
    rating: "4.9"
  },
  {
    name: "Nisha Rao",
    city: "Bengaluru",
    text: "Clean catalog, simple cart, and no confusing checkout steps. It feels ready for repeat orders.",
    rating: "4.8"
  },
  {
    name: "Kabir Sinha",
    city: "Delhi NCR",
    text: "I liked seeing returns, payment options, and product specs together instead of hunting for them.",
    rating: "4.7"
  }
];

export function StorefrontSections() {
  const bestSellers = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 4);
  const newArrivals = products.slice(-4).reverse();
  const trending = products.filter((product) => product.rating >= 4.7).slice(0, 4);
  const categoryCount = categoryPages.length;

  return (
    <>
      <section className="section category-showcase">
        <div className="section-heading">
          <div>
            <p className="eyebrow dark">Shop faster</p>
            <h2>Browse by category</h2>
          </div>
          <TransitionLink className="text-link" href="/shop">
            View all categories <ChevronRight size={17} />
          </TransitionLink>
        </div>

        <div className="category-card-grid">
          {categoryPages.map((category) => (
            <TransitionLink className="category-card" href={`/categories/${category.slug}`} key={category.slug}>
              <Image src={categoryImages[category.title]} alt="" fill sizes="(max-width: 720px) 50vw, 20vw" />
              <span>{category.title}</span>
              <strong>
                {getDisplayProducts(products.filter((product) => product.category === category.category)).length} products
              </strong>
            </TransitionLink>
          ))}
        </div>
      </section>

      <section className="section deal-section">
        <div className="deal-panel">
          <div>
            <p className="eyebrow dark">Today on Ventures Mart</p>
            <h2>Toys and lunch boxes with clear prices and confident checkout flow.</h2>
            <p>
              Customers can compare playful gifts and everyday lunch boxes, review delivery, and move
              through checkout with the details they need already in view.
            </p>
          </div>
          <div className="deal-metrics" aria-label="Store highlights">
            <div>
              <strong>{products.length}</strong>
              <span>curated products</span>
            </div>
            <div>
              <strong>{categoryCount}</strong>
              <span>categories</span>
            </div>
            <div>
              <strong>Rs 999+</strong>
              <span>free delivery</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section collection-rail">
        <div className="rail-header">
          <p className="eyebrow dark">Best sellers</p>
          <h2>Popular picks</h2>
        </div>
        <div className="mini-product-grid">
          {bestSellers.map((product) => (
            <TransitionLink className="mini-product-card" href={`/products/${product.slug}`} key={product.id}>
              <div className="mini-product-image">
                <Image src={product.image} alt={product.name} fill sizes="108px" />
              </div>
              <div>
                <span>{product.category}</span>
                <strong>{product.name}</strong>
                <small>{formatPrice(product.price)}</small>
              </div>
            </TransitionLink>
          ))}
        </div>
      </section>

      <section className="section trust-dashboard">
        <div className="trust-copy">
          <p className="eyebrow dark">Built for trust</p>
          <h2>Every screen answers the questions shoppers ask before paying.</h2>
          <p>
            The static UI keeps service promises, delivery notes, return rules, payment readiness, and
            contact options visible across the buying journey.
          </p>
        </div>
        <div className="trust-feature-grid">
          {[
            { icon: ShieldCheck, title: "Secure-ready", text: "Payment labels, privacy pages, and checkout messaging are visible before integration." },
            { icon: RotateCcw, title: "Easy returns", text: "Return windows and category-specific warranty notes appear near purchase decisions." },
            { icon: Truck, title: "Delivery clarity", text: "Free-delivery threshold, stock status, and delivery estimates are repeated in context." },
            { icon: Headphones, title: "Support access", text: "Contact, tracking, and policy links stay available from header, footer, and checkout." },
            { icon: Search, title: "Fast discovery", text: "Search, filters, category chips, and compact cards support quick scanning across toys and lunch boxes." },
            { icon: PackageCheck, title: "Order clarity", text: "Cart, delivery, and checkout details stay direct so every step feels predictable." }
          ].map((item) => (
            <article className="trust-feature" key={item.title}>
              <item.icon size={22} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-collections">
        <div className="collection-card">
          <div>
            <p className="eyebrow dark">New arrivals</p>
            <h2>Freshly added lunch boxes</h2>
          </div>
          {newArrivals.map((product) => (
            <TransitionLink href={`/products/${product.slug}`} key={product.id}>
              <span>{product.name}</span>
              <strong>{formatPrice(product.price)}</strong>
            </TransitionLink>
          ))}
        </div>
        <div className="collection-card">
          <div>
            <p className="eyebrow dark">Trending now</p>
            <h2>Highly rated picks</h2>
          </div>
          {trending.map((product) => (
            <TransitionLink href={`/products/${product.slug}`} key={product.id}>
              <span>{product.name}</span>
              <strong>{product.rating} rating</strong>
            </TransitionLink>
          ))}
        </div>
      </section>

      <section className="section testimonial-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow dark">Customer confidence</p>
            <h2>Reviews that make the store feel lived in</h2>
          </div>
          <div className="rating-pill">
            <Star size={17} fill="currentColor" />
            <span>4.8 average rating</span>
          </div>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <article className="testimonial-card" key={testimonial.name}>
              <div>
                <BadgeCheck size={20} />
                <strong>{testimonial.rating}</strong>
              </div>
              <p>{testimonial.text}</p>
              <span>
                {testimonial.name}, {testimonial.city}
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="section service-cta">
        <div>
          <Sparkles size={24} />
          <h2>Ready for a polished shopping experience.</h2>
          <p>Toy browsing, lunch-box galleries, cart review, checkout, policies, and trust content all work together in one clean retail journey.</p>
        </div>
        <div className="service-cta-actions">
          <TransitionLink className="primary-link" href="/shop">
            Start shopping <ChevronRight size={18} />
          </TransitionLink>
          <TransitionLink className="secondary-dark-link" href="/track-order">
            Track an order <Clock3 size={18} />
          </TransitionLink>
        </div>
      </section>
    </>
  );
}
