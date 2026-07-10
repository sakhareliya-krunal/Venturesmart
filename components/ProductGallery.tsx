"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, ImagePlus } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type UIEvent
} from "react";
import { FavouriteButton } from "@/components/FavouriteButton";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { Product } from "@/lib/products";

type ProductGalleryProps = {
  product: Product;
  images: string[];
};

export function ProductGallery({ product, images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const hasMultipleImages = images.length > 1;
  const scrollBehavior = prefersReducedMotion ? "auto" : "smooth";

  const syncActiveIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) {
      return;
    }

    const nextIndex = Math.round(track.scrollLeft / track.clientWidth);
    setActiveIndex(Math.max(0, Math.min(nextIndex, images.length - 1)));
  }, [images.length]);

  const handleScroll = (_event: UIEvent<HTMLDivElement>) => {
    if (scrollFrameRef.current !== null) {
      return;
    }

    scrollFrameRef.current = window.requestAnimationFrame(() => {
      scrollFrameRef.current = null;
      syncActiveIndex();
    });
  };

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) {
        return;
      }

      const normalizedIndex = (index + images.length) % images.length;
      const slide = track.children[normalizedIndex];

      if (slide instanceof HTMLElement) {
        slide.scrollIntoView({
          behavior: scrollBehavior,
          block: "nearest",
          inline: "start"
        });
      }

      setActiveIndex(normalizedIndex);
    },
    [images.length, scrollBehavior]
  );

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    track.scrollTo({ left: 0, behavior: "auto" });
    setActiveIndex(0);
  }, [product.id, images]);

  useEffect(() => {
    return () => {
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!hasMultipleImages) {
      return;
    }

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
      aria-label={`${product.name} images`}
      aria-roledescription="carousel"
      className="product-gallery"
      onKeyDown={handleKeyDown}
      tabIndex={hasMultipleImages ? 0 : undefined}
    >
      <div className="product-gallery-frame">
        <div
          aria-live="polite"
          className="product-gallery-viewport"
          onScroll={handleScroll}
          ref={trackRef}
        >
          {images.map((image, index) => (
            <div
              aria-hidden={index !== activeIndex}
              className="product-gallery-slide"
              key={`${product.id}-${image}-${index}`}
            >
              <Image
                alt={index === 0 ? product.name : `${product.name} view ${index + 1}`}
                fetchPriority={index === 0 ? "high" : "low"}
                fill
                loading={index === 0 ? undefined : "lazy"}
                priority={index === 0}
                sizes="(max-width: 980px) 100vw, 50vw"
                src={image}
              />
              {index === 0 && <span>{product.tag}</span>}
            </div>
          ))}
        </div>

        <FavouriteButton className="product-favourite-corner" product={product} />

        {hasMultipleImages && (
          <>
            <button
              aria-label="Previous product image"
              className="product-gallery-arrow product-gallery-prev"
              onClick={goPrev}
              type="button"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              aria-label="Next product image"
              className="product-gallery-arrow product-gallery-next"
              onClick={goNext}
              type="button"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      {hasMultipleImages && (
        <>
          <div aria-label="Image navigation" className="product-gallery-dots" role="tablist">
            {images.map((image, index) => (
              <button
                aria-label={`Go to image ${index + 1}`}
                aria-selected={activeIndex === index}
                className={activeIndex === index ? "active" : ""}
                key={`dot-${image}-${index}`}
                onClick={() => goTo(index)}
                role="tab"
                type="button"
              />
            ))}
          </div>

          <div aria-label="Product highlights" className="product-thumbnail-row">
            {images.map((image, index) => (
              <button
                aria-current={activeIndex === index ? "true" : undefined}
                aria-label={`View product image ${index + 1}`}
                className={activeIndex === index ? "product-thumbnail active" : "product-thumbnail"}
                key={`thumb-${image}-${index}`}
                onClick={() => goTo(index)}
                type="button"
              >
                <Image alt="" fill loading={index === 0 ? undefined : "lazy"} sizes="96px" src={image} />
                {index > 0 && <ImagePlus size={16} />}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
