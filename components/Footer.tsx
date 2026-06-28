import { MessageCircle } from "lucide-react";
import { supportPhoneDisplay, supportPhoneTel, supportWhatsAppUrl } from "@/lib/site-contact";
import { BrandLogo } from "./BrandLogo";
import { TransitionLink } from "./TransitionLink";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <TransitionLink className="brand footer-logo" href="/" aria-label="Toys home">
            <BrandLogo variant="footer" />
          </TransitionLink>
          <p>
            A focused store for creative toys and everyday lunch boxes across India.
          </p>
          <div className="social-links" aria-label="Contact shortcuts">
            <a
              className="social-whatsapp"
              href={supportWhatsAppUrl}
              aria-label="Chat on WhatsApp"
              rel="noopener noreferrer"
              target="_blank"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        <nav className="footer-column" aria-label="Shop links">
          <h3>Shop</h3>
          <TransitionLink href="/categories/toys">Toys</TransitionLink>
          <TransitionLink href="/categories/lunch-box">Lunch Box</TransitionLink>
          <TransitionLink href="/favourites">Favourites</TransitionLink>
        </nav>

        <nav className="footer-column" aria-label="Support links">
          <h3>Support</h3>
          <TransitionLink href="/shipping">Shipping</TransitionLink>
          <TransitionLink href="/returns">Returns</TransitionLink>
          <TransitionLink href="/track-order">Track Order</TransitionLink>
          <TransitionLink href="/contact">Contact</TransitionLink>
        </nav>

        <nav className="footer-column" aria-label="Company links">
          <h3>Company</h3>
          <TransitionLink href="/about">Why Ventures Mart</TransitionLink>
          <TransitionLink href="/payments">Payments</TransitionLink>
          <TransitionLink href="/privacy">Privacy Policy</TransitionLink>
          <TransitionLink href="/terms">Terms</TransitionLink>
        </nav>

        <div className="footer-contact">
          <h3>Need help?</h3>
          <a href="mailto:support@venturesmart.in">
            support@venturesmart.in
          </a>
          <a href={supportPhoneTel}>
            {supportPhoneDisplay}
          </a>
          <p>Delivery available across India.</p>
        </div>
      </div>

      <div className="footer-payments">
        <span>Payment-ready for</span>
        <strong>UPI</strong>
        <strong>Cards</strong>
        <strong>Net Banking</strong>
        <strong>COD</strong>
        <strong>Razorpay</strong>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Ventures Mart. All rights reserved.</span>
        <span>Built with TypeScript and Next.js.</span>
      </div>
    </footer>
  );
}
