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

export function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));

    elements.forEach((element, index) => {
      element.classList.add("reveal");
      element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 55}ms`);
    });

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

    if (pathname !== "/") {
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
