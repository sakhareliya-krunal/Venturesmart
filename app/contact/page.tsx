import { Mail, MapPin, Phone } from "lucide-react";
import { InnerHero } from "@/components/InnerHero";

export const metadata = {
  title: "Contact | Ventures Mart"
};

export default function ContactPage() {
  return (
    <main>
      <InnerHero
        eyebrow="Support"
        title="Contact Ventures Mart"
        description="Reach the Ventures Mart team for order help, product guidance, and delivery questions."
      />
      <section className="section page-section">
        <div className="content-grid">
          <article className="info-card">
            <Mail size={26} />
            <h2>Email</h2>
            <p>support@venturesmart.in</p>
          </article>
          <article className="info-card">
            <Phone size={26} />
            <h2>Phone</h2>
            <p>+91 98765 43210</p>
          </article>
          <article className="info-card">
            <MapPin size={26} />
            <h2>Service area</h2>
            <p>Delivery support across India.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
