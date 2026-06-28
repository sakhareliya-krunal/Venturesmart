"use client";

import { ChevronDown, Heart, Menu, ShoppingBag, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { categoryPages } from "@/lib/products";
import { getFocusableElements, trapFocusOnElements } from "@/lib/focus-trap";
import { setScrollLock } from "@/lib/scroll-lock";
import { useCart } from "./CartProvider";
import { useFavourites } from "./FavouritesProvider";
import { TransitionLink } from "./TransitionLink";

function getMenuFocusables(
  menuButton: HTMLButtonElement | null,
  nav: HTMLElement | null
) {
  const focusable: HTMLElement[] = [];

  if (menuButton) {
    focusable.push(menuButton);
  }

  if (nav) {
    focusable.push(...getFocusableElements(nav));
  }

  return focusable;
}

export function Header() {
  const pathname = usePathname();
  const isDesktop = useMediaQuery("(min-width: 901px)");
  const isCoarsePointer = useMediaQuery("(pointer: coarse)");
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryHovered, setCategoryHovered] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const { cartCount, setCartOpen } = useCart();
  const { favouriteCount } = useFavourites();

  const categoryExpanded = isDesktop ? categoryHovered || categoryOpen : categoryOpen;

  const resetNavOnRouteChange = () => {
    setMenuOpen(false);
    setCategoryOpen(false);
    setCategoryHovered(false);

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const closeNav = () => {
    resetNavOnRouteChange();
  };

  useEffect(() => {
    resetNavOnRouteChange();
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      setCategoryOpen(false);
      return;
    }

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const useEnhancedTrap = !isCoarsePointer;

    if (useEnhancedTrap) {
      setScrollLock(true);
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }

      if (!useEnhancedTrap) {
        return;
      }

      const focusable = getMenuFocusables(menuButtonRef.current, navRef.current);
      trapFocusOnElements(focusable, event);
    };

    window.addEventListener("keydown", handleKeyDown);

    if (useEnhancedTrap) {
      requestAnimationFrame(() => {
        const focusable = getMenuFocusables(menuButtonRef.current, navRef.current);
        focusable[0]?.focus();
      });
    }

    return () => {
      if (useEnhancedTrap) {
        setScrollLock(false);
      }

      window.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [isCoarsePointer, menuOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      setCategoryOpen(false);
      setCategoryHovered(false);
    };

    if (!categoryExpanded) {
      return;
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [categoryExpanded]);

  const favouritesLabel =
    favouriteCount > 0 ? `Favourites, ${favouriteCount} saved` : "Favourites";
  const cartLabel = cartCount > 0 ? `Cart, ${cartCount} items` : "Cart";

  return (
    <>
      {menuOpen && !isDesktop && (
        <button
          type="button"
          className="mobile-nav-backdrop"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <header className={menuOpen && !isDesktop ? "site-header site-header-menu-open" : "site-header"}>
        <TransitionLink className="brand" href="/" aria-label="Toys home">
          <BrandLogo priority />
        </TransitionLink>

        <nav
          ref={navRef}
          id="mobile-navigation"
          className={menuOpen ? "nav-links open" : "nav-links"}
          aria-label="Primary navigation"
          aria-hidden={!isDesktop && !menuOpen ? true : undefined}
          inert={!isDesktop && !menuOpen ? true : undefined}
        >
          <div
            className={categoryExpanded ? "nav-item-has-dropdown open" : "nav-item-has-dropdown"}
            onMouseEnter={() => {
              if (isDesktop) {
                setCategoryHovered(true);
              }
            }}
            onMouseLeave={() => {
              if (!isDesktop) {
                return;
              }

              setCategoryHovered(false);
              setCategoryOpen(false);
            }}
          >
            <button
              type="button"
              className="nav-dropdown-trigger"
              aria-haspopup="true"
              aria-expanded={categoryExpanded}
              onClick={(event) => {
                event.stopPropagation();

                if (isDesktop) {
                  if (categoryExpanded) {
                    setCategoryHovered(false);
                    setCategoryOpen(false);
                  } else {
                    setCategoryOpen(true);
                    setCategoryHovered(true);
                  }
                  return;
                }

                setCategoryOpen((open) => !open);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  event.currentTarget.click();
                }
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
            ref={menuButtonRef}
            className="icon-button menu-button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            type="button"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <TransitionLink className="favourites-button" href="/favourites" aria-label={favouritesLabel}>
            <Heart size={20} />
            <span>Favourites</span>
            {favouriteCount > 0 && <strong>{favouriteCount}</strong>}
          </TransitionLink>
          <button
            className="cart-button"
            onClick={() => setCartOpen(true)}
            aria-label={cartLabel}
            type="button"
          >
            <ShoppingBag size={20} />
            <span>Cart</span>
            {cartCount > 0 && <strong>{cartCount}</strong>}
          </button>
        </div>
      </header>
    </>
  );
}
