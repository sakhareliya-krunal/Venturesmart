"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/products";

type FavouritesContextValue = {
  favouriteIds: number[];
  favouriteCount: number;
  isFavourite: (id: number) => boolean;
  toggleFavourite: (product: Product) => void;
  clearFavourites: () => void;
};

const FavouritesContext = createContext<FavouritesContextValue | null>(null);
const FAVOURITES_STORAGE_KEY = "toyjoy-favourites";

export function FavouritesProvider({ children }: { children: React.ReactNode }) {
  const [favouriteIds, setFavouriteIds] = useState<number[]>([]);

  useEffect(() => {
    const saved = window.localStorage.getItem(FAVOURITES_STORAGE_KEY);

    if (!saved) {
      return;
    }

    try {
      const parsed = JSON.parse(saved) as number[];

      if (Array.isArray(parsed)) {
        setFavouriteIds(parsed.filter((id) => typeof id === "number"));
      }
    } catch {
      setFavouriteIds([]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(favouriteIds));
  }, [favouriteIds]);

  const toggleFavourite = (product: Product) => {
    setFavouriteIds((current) =>
      current.includes(product.id) ? current.filter((id) => id !== product.id) : [...current, product.id]
    );
  };

  const clearFavourites = () => {
    setFavouriteIds([]);
  };

  const value = useMemo(
    () => ({
      favouriteIds,
      favouriteCount: favouriteIds.length,
      isFavourite: (id: number) => favouriteIds.includes(id),
      toggleFavourite,
      clearFavourites
    }),
    [favouriteIds]
  );

  return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>;
}

export function useFavourites() {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error("useFavourites must be used inside FavouritesProvider");
  }

  return context;
}
