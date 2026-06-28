"use client";

import { Heart } from "lucide-react";
import type { Product } from "@/lib/products";
import { useFavourites } from "./FavouritesProvider";

type FavouriteButtonProps = {
  product: Product;
  className?: string;
  size?: number;
};

export function FavouriteButton({ product, className = "", size = 18 }: FavouriteButtonProps) {
  const { isFavourite, toggleFavourite } = useFavourites();
  const active = isFavourite(product.id);

  return (
    <button
      aria-label={active ? `Remove ${product.name} from favourites` : `Save ${product.name} to favourites`}
      aria-pressed={active}
      className={active ? `favourite-button active ${className}`.trim() : `favourite-button ${className}`.trim()}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleFavourite(product);
      }}
      type="button"
    >
      <Heart size={size} fill={active ? "currentColor" : "none"} />
    </button>
  );
}
