import { Check, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { InnerHero } from "@/components/InnerHero";

export const metadata = {
  title: "Why Ventures Mart | Ventures Mart"
};

export default function AboutPage() {
  return (
    <main>
      <InnerHero
        eyebrow="Why Ventures Mart"
        title="A focused store built around trust, clarity, and useful products."
        description="Ventures Mart focuses on creative toys, everyday lunch boxes, and a shopping flow customers can complete quickly."
      />
      <section className="section page-section">
        <div className="content-grid">
          {[
            {
              icon: ShieldCheck,
              title: "Clear product details",
              text: "Products are presented with focused descriptions, visible pricing, and category context."
            },
            {
              icon: PackageCheck,
              title: "Focused picks",
              text: "Collections are organized around toys and lunch boxes so customers can browse without clutter."
            },
            {
              icon: Truck,
              title: "India-focused delivery",
              text: "Pricing, shipping, and checkout readiness are designed around Indian customers."
            }
          ].map((item) => (
            <article className="info-card" key={item.title}>
              <item.icon size={26} />
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <div className="statement-band">
          <div>
            <p className="eyebrow dark">Our approach</p>
            <h2>Less clutter, better decisions.</h2>
          </div>
          <div className="feature-list">
            {["Clear product cards", "Transparent rupee pricing", "Simple cart review", "Payment-ready structure"].map(
              (item) => (
                <div key={item}>
                  <Check size={18} />
                  <span>{item}</span>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
