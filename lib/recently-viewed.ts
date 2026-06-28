import type { Product } from "@/lib/products";

const STORAGE_KEY = "toyjoy-recent";
const MAX_ITEMS = 4;

export function recordRecentlyViewed(product: Product) {
  if (typeof window === "undefined") {
    return;
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);
  const current: number[] = saved ? (JSON.parse(saved) as number[]) : [];
  const next = [product.id, ...current.filter((id) => id !== product.id)].slice(0, MAX_ITEMS);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function getRecentlyViewedIds(): number[] {
  if (typeof window === "undefined") {
    return [];
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved ? (JSON.parse(saved) as number[]) : [];
}
