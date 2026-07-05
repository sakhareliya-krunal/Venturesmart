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
  ".feature-band > *",
  ".feature-list > div",
  ".payment-card",
  ".info-card",
  ".statement-band",
  ".contact-channels",
  ".contact-form-section",
  ".policy-document-header",
  ".policy-content",
  ".policy-document-cta",
  ".track-form",
  ".footer-trust > div",
  ".footer-main > *",
  ".footer-payments",
  ".footer-bottom"
].join(",");

const catalogInstantSelector =
  ".catalog-controls, .shop-toolbar, .empty-results";

const catalogPaths = ["/shop", "/favourites"];

function isCatalogPath(pathname: string) {
  return catalogPaths.includes(pathname) || pathname.startsWith("/categories/");
}

function markInView(element: HTMLElement) {
  element.setAttribute("data-inview", "true");
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

    elements.forEach((element) => element.removeAttribute("data-inview"));

    if (catalogPage) {
      const catalogRoot = document.getElementById("catalog-products") ?? document.getElementById("page-content");

      if (catalogRoot) {
        catalogRoot.querySelectorAll<HTMLElement>(catalogInstantSelector).forEach(markInView);
      }
    }

    if (prefersReducedMotion) {
      elements.forEach(markInView);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            markInView(entry.target as HTMLElement);
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
