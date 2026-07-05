import {
  ArrowUpRight,
  Mail,
  MessageCircle,
  PackageCheck,
  Phone,
  ShieldCheck,
  Truck
} from "lucide-react";
import {
  supportEmail,
  supportEmailMailto,
  supportPhoneDisplay,
  supportPhoneTel,
  supportWhatsAppUrl
} from "@/lib/site-contact";
import { BrandLogo } from "./BrandLogo";
import { TransitionLink } from "./TransitionLink";

const paymentMethods = ["UPI", "Cards", "Net Banking", "COD", "Razorpay"] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <section className="footer-trust" aria-label="Store benefits">
          <div>
            <Truck size={20} aria-hidden="true" />
            <span>Delivery across India</span>
          </div>
          <div>
            <ShieldCheck size={20} aria-hidden="true" />
            <span>7-day replacement support</span>
          </div>
          <div>
            <PackageCheck size={20} aria-hidden="true" />
            <span>Curated toys &amp; lunch boxes</span>
          </div>
        </section>

        <div className="footer-main">
          <div className="footer-brand">
            <TransitionLink className="brand footer-logo" href="/" aria-label="Toys home">
              <BrandLogo variant="footer" />
            </TransitionLink>
            <p>
              A focused store for creative toys and everyday lunch boxes across India.
            </p>
            <div className="footer-brand-actions">
              <a
                className="footer-whatsapp-button"
                href={supportWhatsAppUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Chat on WhatsApp
              </a>
              <TransitionLink className="footer-shop-link" href="/shop">
                Browse shop
                <ArrowUpRight size={16} aria-hidden="true" />
              </TransitionLink>
            </div>
          </div>

          <div className="footer-nav-grid">
            <nav className="footer-column" aria-label="Shop links">
              <h3 className="footer-column-heading">Shop</h3>
              <TransitionLink className="footer-link" href="/categories/toys">
                Toys
              </TransitionLink>
              <TransitionLink className="footer-link" href="/categories/lunch-box">
                Lunch Box
              </TransitionLink>
              <TransitionLink className="footer-link" href="/favourites">
                Favourites
              </TransitionLink>
            </nav>

            <nav className="footer-column" aria-label="Support links">
              <h3 className="footer-column-heading">Support</h3>
              <TransitionLink className="footer-link" href="/shipping">
                Shipping
              </TransitionLink>
              <TransitionLink className="footer-link" href="/returns">
                Returns
              </TransitionLink>
              <TransitionLink className="footer-link" href="/track-order">
                Track Order
              </TransitionLink>
              <TransitionLink className="footer-link" href="/contact">
                Contact
              </TransitionLink>
            </nav>

            <nav className="footer-column" aria-label="Company links">
              <h3 className="footer-column-heading">Company</h3>
              <TransitionLink className="footer-link" href="/about">
                Why Ventures Mart
              </TransitionLink>
              <TransitionLink className="footer-link" href="/payments">
                Payments
              </TransitionLink>
              <TransitionLink className="footer-link" href="/privacy">
                Privacy Policy
              </TransitionLink>
              <TransitionLink className="footer-link" href="/terms">
                Terms
              </TransitionLink>
            </nav>
          </div>

          <div className="footer-contact-card">
            <h3 className="footer-column-heading">Need help?</h3>
            <a className="footer-contact-row" href={supportEmailMailto}>
              <span className="footer-contact-icon" aria-hidden="true">
                <Mail size={18} />
              </span>
              <span>
                <small>Email</small>
                <strong>{supportEmail}</strong>
              </span>
            </a>
            <a className="footer-contact-row" href={supportPhoneTel}>
              <span className="footer-contact-icon" aria-hidden="true">
                <Phone size={18} />
              </span>
              <span>
                <small>Phone</small>
                <strong>{supportPhoneDisplay}</strong>
              </span>
            </a>
            <p>Mon–Sat support · Pan-India delivery</p>
          </div>
        </div>

        <div className="footer-payments">
          <div className="footer-payments-copy">
            <span>Payments coming soon</span>
            <TransitionLink className="footer-payments-link" href="/payments">
              Learn more
              <ArrowUpRight size={14} aria-hidden="true" />
            </TransitionLink>
          </div>
          <div className="footer-payment-badges" aria-label="Planned payment methods">
            {paymentMethods.map((method) => (
              <span key={method}>{method}</span>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Ventures Mart. All rights reserved.</span>
          <nav className="footer-legal" aria-label="Legal links">
            <TransitionLink href="/privacy">Privacy</TransitionLink>
            <TransitionLink href="/terms">Terms</TransitionLink>
            <TransitionLink href="/contact">Contact</TransitionLink>
          </nav>
        </div>
      </div>
    </footer>
  );
}
