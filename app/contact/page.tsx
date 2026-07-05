import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { InnerHero } from "@/components/InnerHero";
import { PageContent } from "@/components/PageContent";
import { defaultTrustStats } from "@/lib/page-trust-stats";
import {
  supportEmail,
  supportEmailMailto,
  supportPhoneDisplay,
  supportPhoneTel,
  supportWhatsAppUrl
} from "@/lib/site-contact";

export const metadata = {
  title: "Contact | Ventures Mart",
  description:
    "Contact Ventures Mart for order help, product questions, and delivery support across India."
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
        <div className="contact-page-layout">
          <section className="contact-channels" aria-label="Contact options">
            <header className="contact-section-heading">
              <p className="eyebrow dark">Get in touch</p>
              <h2>We are here to help</h2>
              <p>Mon–Sat support · Pan-India delivery · Reply within 1–2 business days</p>
            </header>
            <div className="content-grid">
              <article className="info-card">
                <div className="info-card-icon">
                  <Mail size={26} aria-hidden="true" />
                </div>
                <h2>Email</h2>
                <p>
                  <a href={supportEmailMailto}>{supportEmail}</a>
                </p>
              </article>
              <article className="info-card">
                <div className="info-card-icon">
                  <Phone size={26} aria-hidden="true" />
                </div>
                <h2>Phone</h2>
                <p>
                  <a href={supportPhoneTel}>{supportPhoneDisplay}</a>
                </p>
              </article>
              <article className="info-card">
                <div className="info-card-icon">
                  <MessageCircle size={26} aria-hidden="true" />
                </div>
                <h2>WhatsApp</h2>
                <p>
                  <a href={supportWhatsAppUrl} rel="noopener noreferrer" target="_blank">
                    Chat on WhatsApp
                  </a>
                </p>
              </article>
              <article className="info-card">
                <div className="info-card-icon">
                  <MapPin size={26} aria-hidden="true" />
                </div>
                <h2>Service area</h2>
                <p>Delivery support across India.</p>
              </article>
            </div>
          </section>
          <section className="contact-form-section" aria-label="Contact form">
            <ContactForm />
          </section>
        </div>
      </PageContent>
    </main>
  );
}
