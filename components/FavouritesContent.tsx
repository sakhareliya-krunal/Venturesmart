"use client";

import { Heart } from "lucide-react";
import { useMemo } from "react";
import { PageContent } from "@/components/PageContent";
import { ProductListing } from "@/components/ProductListing";
import { TransitionLink } from "@/components/TransitionLink";
import { useFavourites } from "@/components/FavouritesProvider";
import { products } from "@/lib/products";

export function FavouritesContent() {
  const { favouriteIds } = useFavourites();

  const favouriteProducts = useMemo(
    () => products.filter((product) => favouriteIds.includes(product.id)),
    [favouriteIds]
  );

  if (favouriteProducts.length === 0) {
    return (
      <PageContent>
        <div className="empty-results favourites-empty">
          <Heart size={28} />
          <h3>No favourites yet</h3>
          <p>Tap the heart on any product to save it here for quick access later.</p>
          <TransitionLink className="primary-link" href="/shop">
            Browse products
          </TransitionLink>
        </div>
      </PageContent>
    );
  }

  return (
    <PageContent>
      <ProductListing
        items={favouriteProducts}
        heading="Saved products"
        eyebrow="Your list"
        searchable={false}
        showCategories={false}
      />
    </PageContent>
  );
}
