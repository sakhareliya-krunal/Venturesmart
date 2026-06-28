"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getRecentlyViewedIds } from "@/lib/recently-viewed";
import { formatPrice, type Product } from "@/lib/products";
import { TransitionLink } from "./TransitionLink";

type RecentlyViewedProps = {
  catalog: Product[];
  excludeId?: number;
  heading?: string;
  eyebrow?: string;
};

export function RecentlyViewed({
  catalog,
  excludeId,
  heading = "Recently viewed",
  eyebrow = "Pick up where you left off"
}: RecentlyViewedProps) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    const ids = getRecentlyViewedIds().filter((id) => id !== excludeId);
    setItems(ids.map((id) => catalog.find((product) => product.id === id)).filter(Boolean) as Product[]);
  }, [catalog, excludeId]);

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="section recently-viewed-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow dark">{eyebrow}</p>
          <h2>{heading}</h2>
        </div>
      </div>
      <div className="mini-product-grid">
        {items.map((product) => (
          <TransitionLink className="mini-product-card" href={`/products/${product.slug}`} key={product.id}>
            <div className="mini-product-image">
              <Image src={product.image} alt={product.name} fill sizes="108px" />
            </div>
            <div>
              <span>{product.category}</span>
              <strong>{product.name}</strong>
              <small>{formatPrice(product.price)}</small>
            </div>
          </TransitionLink>
        ))}
      </div>
    </section>
  );
}
