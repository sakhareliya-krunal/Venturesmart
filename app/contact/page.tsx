import { Mail, MapPin, Phone } from "lucide-react";
import { InnerHero } from "@/components/InnerHero";
import { PageContent } from "@/components/PageContent";
import { defaultTrustStats } from "@/lib/page-trust-stats";

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
        stats={defaultTrustStats}
      />
      <PageContent>
        <div className="content-grid">
          <article className="info-card">
            <div className="info-card-icon">
              <Mail size={26} />
            </div>
            <h2>Email</h2>
            <p>support@venturesmart.in</p>
          </article>
          <article className="info-card">
            <div className="info-card-icon">
              <Phone size={26} />
            </div>
            <h2>Phone</h2>
            <p>+91 98765 43210</p>
          </article>
          <article className="info-card">
            <div className="info-card-icon">
              <MapPin size={26} />
            </div>
            <h2>Service area</h2>
            <p>Delivery support across India.</p>
          </article>
        </div>
      </PageContent>
    </main>
  );
}
