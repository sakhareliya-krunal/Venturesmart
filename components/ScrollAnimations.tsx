"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const revealSelector = [
  ".inner-hero",
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

function markInView(element: HTMLElement) {
  element.setAttribute("data-inview", "true");
}

export function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    const mainContent = document.getElementById("main-content");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = mainContent
      ? Array.from(mainContent.querySelectorAll<HTMLElement>(revealSelector))
      : Array.from(document.querySelectorAll<HTMLElement>(revealSelector));

    elements.forEach((element) => element.removeAttribute("data-inview"));

    let autoScrollTimer: number | undefined;

    if (pathname !== "/") {
      const isMobileViewport = window.matchMedia("(max-width: 900px)").matches;
      const target =
        document.getElementById("catalog-products") ?? document.getElementById("page-content");

      if (target && !isMobileViewport) {
        autoScrollTimer = window.setTimeout(() => {
          target.scrollIntoView({
            behavior: prefersReducedMotion ? "instant" : "smooth",
            block: "start"
          });
        }, 700);
      }
    }

    const clearAutoScroll = () => {
      if (autoScrollTimer !== undefined) {
        window.clearTimeout(autoScrollTimer);
      }
    };

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach(markInView);
      return clearAutoScroll;
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

    return () => {
      observer.disconnect();
      clearAutoScroll();
    };
  }, [pathname]);

  return null;
}
