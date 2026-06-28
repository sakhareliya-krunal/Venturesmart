import { Facebook, Instagram, Mail, Phone, Twitter } from "lucide-react";
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
          <div className="social-links" aria-label="Social links">
            <a className="social-instagram" href="#" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a className="social-facebook" href="#" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a className="social-twitter" href="#" aria-label="Twitter">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Shop</h3>
          <TransitionLink href="/categories/toys">Toys</TransitionLink>
          <TransitionLink href="/categories/lunch-box">Lunch Box</TransitionLink>
          <TransitionLink href="/favourites">Favourites</TransitionLink>
        </div>

        <div className="footer-column">
          <h3>Support</h3>
          <TransitionLink href="/shipping">Shipping</TransitionLink>
          <TransitionLink href="/returns">Returns</TransitionLink>
          <TransitionLink href="/track-order">Track Order</TransitionLink>
          <TransitionLink href="/contact">Contact</TransitionLink>
        </div>

        <div className="footer-column">
          <h3>Company</h3>
          <TransitionLink href="/about">Why Ventures Mart</TransitionLink>
          <TransitionLink href="/payments">Payments</TransitionLink>
          <TransitionLink href="/privacy">Privacy Policy</TransitionLink>
          <TransitionLink href="/terms">Terms</TransitionLink>
        </div>

        <div className="footer-contact">
          <h3>Need help?</h3>
          <a href="mailto:support@venturesmart.in">
            <Mail size={17} />
            support@venturesmart.in
          </a>
          <a href="tel:+919876543210">
            <Phone size={17} />
            +91 98765 43210
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
