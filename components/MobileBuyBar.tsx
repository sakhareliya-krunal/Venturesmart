"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AddToCartButton } from "@/components/AddToCartButton";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { formatPrice, type Product } from "@/lib/products";

type MobileBuyBarProps = {
  product: Product;
  quantity: number;
  onBuyNow: () => void;
};

export function MobileBuyBar({ product, quantity, onBuyNow }: MobileBuyBarProps) {
  const [mounted, setMounted] = useState(false);
  const showBar = useMediaQuery("(max-width: 1100px)");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !showBar) {
    return null;
  }

  return createPortal(
    <div className="mobile-buy-bar" aria-label="Mobile purchase actions">
      <div className="mobile-buy-bar-copy">
        <strong className="mobile-buy-bar-title">{product.name}</strong>
        <span>{formatPrice(product.price)}</span>
        <small>{product.stockStatus}</small>
      </div>
      <AddToCartButton
        className="mobile-buy-bar-add"
        label="Add to cart"
        product={product}
        quantity={quantity}
        variant="full"
      />
      <button
        aria-label={`Order ${product.name} now`}
        className="mobile-buy-bar-order"
        onClick={onBuyNow}
        type="button"
      >
        <span>Order now</span>
      </button>
    </div>,
    document.body
  );
}
