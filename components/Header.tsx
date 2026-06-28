"use client";

import { ChevronDown, Menu, ShoppingBag, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { categoryPages } from "@/lib/products";
import { setScrollLock } from "@/lib/scroll-lock";
import { useCart } from "./CartProvider";
import { TransitionLink } from "./TransitionLink";

function isDesktopNav() {
  return typeof window !== "undefined" && window.matchMedia("(min-width: 901px)").matches;
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryHovered, setCategoryHovered] = useState(false);
  const [categoryDismissed, setCategoryDismissed] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const { cartCount, setCartOpen } = useCart();

  const categoryExpanded = isDesktopNav()
    ? !categoryDismissed && categoryHovered
    : categoryOpen;

  const closeNav = () => {
    setMenuOpen(false);
    setCategoryOpen(false);
    setCategoryHovered(false);
    setCategoryDismissed(true);

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  useEffect(() => {
    closeNav();
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      setCategoryOpen(false);
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      setCategoryOpen(false);
      setCategoryHovered(false);
      setCategoryDismissed(false);
    };

    if (!categoryExpanded) {
      return;
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [categoryExpanded]);

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
          <div
            ref={categoryRef}
            className={categoryExpanded ? "nav-item-has-dropdown open" : "nav-item-has-dropdown"}
            onMouseEnter={() => {
              if (!categoryDismissed) {
                setCategoryHovered(true);
              }
            }}
            onMouseLeave={() => {
              setCategoryHovered(false);
              setCategoryDismissed(false);
            }}
          >
            <button
              type="button"
              className="nav-dropdown-trigger"
              aria-haspopup="true"
              aria-expanded={categoryExpanded}
              onClick={(event) => {
                event.stopPropagation();

                if (isDesktopNav()) {
                  if (categoryExpanded) {
                    setCategoryDismissed(true);
                    setCategoryHovered(false);
                  }
                  return;
                }

                setCategoryOpen((open) => !open);
              }}
            >
              <span className="nav-dropdown-label">Category</span>
              <ChevronDown size={16} className="nav-dropdown-chevron" aria-hidden="true" />
            </button>
            <div className="nav-dropdown-panel" role="menu">
              {categoryPages.map((category) => (
                <TransitionLink
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  role="menuitem"
                  onClick={closeNav}
                >
                  {category.title}
                </TransitionLink>
              ))}
              <TransitionLink className="nav-dropdown-footer" href="/shop" role="menuitem" onClick={closeNav}>
                View all products
              </TransitionLink>
            </div>
          </div>
          <TransitionLink href="/about" onClick={closeNav}>
            Why us
          </TransitionLink>
          <TransitionLink href="/payments" onClick={closeNav}>
            Payments
          </TransitionLink>
          <TransitionLink href="/contact" onClick={closeNav}>
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
    </>
  );
}
