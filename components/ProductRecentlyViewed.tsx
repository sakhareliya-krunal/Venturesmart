"use client";

import dynamic from "next/dynamic";
import type { Product } from "@/lib/products";

const RecentlyViewed = dynamic(
  () => import("@/components/RecentlyViewed").then((module) => module.RecentlyViewed),
  { ssr: false }
);

type ProductRecentlyViewedProps = {
  catalog: Product[];
  excludeId: number;
  heading?: string;
  eyebrow?: string;
};

export function ProductRecentlyViewed({ catalog, excludeId, heading, eyebrow }: ProductRecentlyViewedProps) {
  return <RecentlyViewed catalog={catalog} excludeId={excludeId} heading={heading} eyebrow={eyebrow} />;
}
