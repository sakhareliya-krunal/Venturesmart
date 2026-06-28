"use client";

import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { setScrollLock } from "@/lib/scroll-lock";
import { useCart } from "./CartProvider";
import { TransitionLink } from "./TransitionLink";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, setCartOpen } = useCart();

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    setScrollLock(true);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      setScrollLock(false);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="site-header">
        <TransitionLink className="brand" href="/" aria-label="Toys home">
          <BrandLogo priority />
        </TransitionLink>

        <nav
          id="mobile-navigation"
          className={menuOpen ? "nav-links open" : "nav-links"}
          aria-label="Primary navigation"
        >
          <TransitionLink href="/shop" onClick={() => setMenuOpen(false)}>
            Shop
          </TransitionLink>
          <TransitionLink href="/about" onClick={() => setMenuOpen(false)}>
            Why us
          </TransitionLink>
          <TransitionLink href="/payments" onClick={() => setMenuOpen(false)}>
            Payments
          </TransitionLink>
          <TransitionLink href="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </TransitionLink>
        </nav>

        <div className="header-actions">
          <button
            className="icon-button menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <button className="cart-button" onClick={() => setCartOpen(true)} aria-label="Open cart">
            <ShoppingBag size={20} />
            <span>Cart</span>
            {cartCount > 0 && <strong>{cartCount}</strong>}
          </button>
        </div>
      </header>

      {menuOpen && (
        <button className="backdrop" aria-label="Close menu" onClick={() => setMenuOpen(false)} type="button" />
      )}
    </>
  );
}
