"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const revealSelector = [
  ".inner-hero",
  ".hero-carousel .hero-slide-copy > *",
  ".trust-strip > div",
  ".section-heading",
  ".section-action",
  ".page-content-panel",
  ".page-content-panel > *",
  ".product-card",
  ".feature-band > *",
  ".feature-list > div",
  ".payment-card",
  ".info-card",
  ".statement-band",
  ".policy-content",
  ".track-form",
  ".footer-main > *",
  ".footer-payments",
  ".footer-bottom"
].join(",");

const catalogPaths = ["/shop", "/favourites"];

function isCatalogPath(pathname: string) {
  return catalogPaths.includes(pathname) || pathname.startsWith("/categories/");
}

export function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    const mainContent = document.getElementById("main-content");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const catalogPage = isCatalogPath(pathname);
    const elements = mainContent
      ? Array.from(mainContent.querySelectorAll<HTMLElement>(revealSelector))
      : Array.from(document.querySelectorAll<HTMLElement>(revealSelector));

    elements.forEach((element, index) => {
      element.classList.add("reveal");
      element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 55}ms`);
    });

    if (catalogPage) {
      const catalogRoot = document.getElementById("catalog-products") ?? document.getElementById("page-content");

      if (catalogRoot) {
        catalogRoot.querySelectorAll<HTMLElement>(
          ".section-heading, .section-heading-compact, .catalog-controls, .shop-toolbar, .product-card, .empty-results"
        ).forEach((element) => {
          element.classList.add("visible");
        });
      }
    }

    if (prefersReducedMotion) {
      elements.forEach((element) => element.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.12
      }
    );

    elements.forEach((element) => observer.observe(element));

    let autoScrollTimer: number | undefined;

    if (pathname !== "/" && !catalogPage) {
      const target =
        document.getElementById("catalog-products") ?? document.getElementById("page-content");

      if (target) {
        autoScrollTimer = window.setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 700);
      }
    }

    return () => {
      observer.disconnect();
      if (autoScrollTimer !== undefined) {
        window.clearTimeout(autoScrollTimer);
      }
    };
  }, [pathname]);

  return null;
}
