"use client";

import { ShoppingCart } from "lucide-react";
import type { MouseEvent } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "./CartProvider";

type AddToCartButtonProps = {
  product: Product;
  variant?: "icon" | "compact" | "full";
  className?: string;
  openDrawer?: boolean;
  quantity?: number;
  label?: string;
  iconSize?: number;
  onAdded?: () => void;
};

export function AddToCartButton({
  product,
  variant = "compact",
  className = "",
  openDrawer = true,
  quantity = 1,
  label = "Add",
  iconSize = 18,
  onAdded
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const ariaLabel =
    quantity > 1 ? `Add ${quantity} ${product.name} to cart` : `Add ${product.name} to cart`;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product, { openDrawer, quantity });
    onAdded?.();
  };

  if (variant === "icon") {
    return (
      <button
        aria-label={ariaLabel}
        className={className ? `add-to-cart-button icon ${className}`.trim() : "add-to-cart-button icon"}
        onClick={handleClick}
        type="button"
      >
        <ShoppingCart size={iconSize} />
      </button>
    );
  }

  if (variant === "full") {
    return (
      <button
        aria-label={ariaLabel}
        className={className ? `add-to-cart-button full ${className}`.trim() : "add-to-cart-button full"}
        onClick={handleClick}
        type="button"
      >
        <ShoppingCart size={iconSize} />
        <span>{label}</span>
      </button>
    );
  }

  return (
    <button
      aria-label={ariaLabel}
      className={className ? `add-to-cart-button compact ${className}`.trim() : "add-to-cart-button compact"}
      onClick={handleClick}
      type="button"
    >
      <ShoppingCart size={iconSize} />
      {label}
    </button>
  );
}
