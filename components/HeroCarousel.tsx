"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides } from "@/lib/hero-slides";
import { TransitionLink } from "./TransitionLink";

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReducedMotion(mediaQuery.matches);

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);

    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + heroSlides.length) % heroSlides.length);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((index) => (index + 1) % heroSlides.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((index) => (index - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) {
      return;
    }

    const intervalId = window.setInterval(goNext, 5000);

    return () => window.clearInterval(intervalId);
  }, [goNext, paused, reducedMotion]);

  return (
    <section
      className="hero-carousel"
      id="top"
      aria-roledescription="carousel"
      aria-label="Featured promotions"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={(event) => {
        touchStartX.current = event.clientX;
        touchStartY.current = event.clientY;
      }}
      onPointerUp={(event) => {
        if (touchStartX.current === null || touchStartY.current === null) {
          return;
        }

        const diffX = event.clientX - touchStartX.current;
        const diffY = event.clientY - touchStartY.current;

        if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX < 0) {
            goNext();
          } else {
            goPrev();
          }
        }

        touchStartX.current = null;
        touchStartY.current = null;
      }}
    >
      <div className="hero-carousel-track">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.title}
            className={index === activeIndex ? "hero-slide active" : "hero-slide"}
            aria-hidden={index !== activeIndex}
          >
            <div className="hero-slide-media">
              <Image
                src={slide.image}
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
              />
              <div className="hero-slide-overlay" aria-hidden="true" />
            </div>
            <div className="hero-slide-copy">
              <p className="eyebrow">{slide.eyebrow}</p>
              <h1>{slide.title}</h1>
              <p>{slide.description}</p>
              <div className="hero-slide-actions">
                <TransitionLink className="primary-link" href={slide.href}>
                  {slide.ctaLabel} <ChevronRight size={18} />
                </TransitionLink>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!reducedMotion && (
        <>
          <button
            type="button"
            className="hero-carousel-arrow hero-carousel-prev"
            onClick={goPrev}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            className="hero-carousel-arrow hero-carousel-next"
            onClick={goNext}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
          <div className="hero-carousel-dots" role="tablist" aria-label="Slide navigation">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Go to slide ${index + 1}`}
                className={index === activeIndex ? "active" : ""}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
