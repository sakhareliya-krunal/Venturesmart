"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent
} from "react";
import { heroSlides } from "@/lib/hero-slides";
import { TransitionLink } from "./TransitionLink";

const swipeThreshold = 52;
const maxDragOffset = 72;
const interactiveSelector = "a, button, input, select, textarea";

function isInteractiveTarget(target: EventTarget | null) {
  return target instanceof HTMLElement && Boolean(target.closest(interactiveSelector));
}

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const carouselRef = useRef<HTMLElement>(null);

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

  const resetSwipe = () => {
    touchStartX.current = null;
    touchStartY.current = null;
    setDragOffset(0);
    setIsDragging(false);
  };

  const handleSwipeStart = (event: PointerEvent<HTMLDivElement>) => {
    if (isInteractiveTarget(event.target)) {
      return;
    }

    touchStartX.current = event.clientX;
    touchStartY.current = event.clientY;
    setIsDragging(true);
  };

  const handleSwipeMove = (event: PointerEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) {
      return;
    }

    const diffX = event.clientX - touchStartX.current;
    const diffY = event.clientY - touchStartY.current;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      setDragOffset(Math.max(-maxDragOffset, Math.min(maxDragOffset, diffX * 0.22)));
    }
  };

  const handleSwipeEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) {
      resetSwipe();
      return;
    }

    const diffX = event.clientX - touchStartX.current;
    const diffY = event.clientY - touchStartY.current;

    if (Math.abs(diffX) > swipeThreshold && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        goNext();
      } else {
        goPrev();
      }
    }

    resetSwipe();
  };

  const handleCarouselKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  return (
    <section
      ref={carouselRef}
      className="hero-carousel"
      data-dragging={isDragging ? "true" : undefined}
      id="top"
      aria-roledescription="carousel"
      aria-label="Featured promotions"
      onKeyDown={handleCarouselKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      tabIndex={0}
    >
      <div className="hero-carousel-track">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.title}
            className={index === activeIndex ? "hero-slide active" : "hero-slide"}
            aria-hidden={index !== activeIndex}
            onPointerCancel={handleSwipeEnd}
            onPointerDown={handleSwipeStart}
            onPointerLeave={handleSwipeEnd}
            onPointerMove={handleSwipeMove}
            onPointerUp={handleSwipeEnd}
            style={
              index === activeIndex
                ? ({ "--hero-drag-offset": `${dragOffset}px` } as CSSProperties)
                : undefined
            }
            {...(index !== activeIndex ? { inert: true } : {})}
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
                <TransitionLink className="primary-link" href={slide.href} tabIndex={index === activeIndex ? 0 : -1}>
                  {slide.ctaLabel} <ChevronRight size={18} />
                </TransitionLink>
              </div>
            </div>
          </div>
        ))}
      </div>

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
    </section>
  );
}
