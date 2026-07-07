"use client";

import Image from "next/image";
import { formatPrice, type Product } from "@/lib/products";
import { AddToCartButton } from "./AddToCartButton";
import { TransitionLink } from "./TransitionLink";

type MiniProductCardProps = {
  product: Product;
};

export function MiniProductCard({ product }: MiniProductCardProps) {
  return (
    <article className="mini-product-card">
      <TransitionLink className="mini-product-card-link" href={`/products/${product.slug}`}>
        <div className="mini-product-image">
          <Image src={product.image} alt={product.name} fill sizes="108px" />
        </div>
        <div className="mini-product-copy">
          <span>{product.category}</span>
          <strong>{product.name}</strong>
          <small>{formatPrice(product.price)}</small>
        </div>
      </TransitionLink>
      <AddToCartButton className="mini-product-add" product={product} variant="icon" iconSize={16} />
    </article>
  );
}
