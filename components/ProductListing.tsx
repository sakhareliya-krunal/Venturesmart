"use client";

import Image from "next/image";
import { ArrowDownUp, Eye, Search, SlidersHorizontal, Star } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import {
  categories,
  formatPrice,
  groupProductVariants,
  type Product,
  type ProductCategory,
  type ProductVariantGroup
} from "@/lib/products";
import { AddToCartButton } from "./AddToCartButton";
import { CustomDropdown } from "./CustomDropdown";
import { FavouriteButton } from "./FavouriteButton";
import { ScrollReveal } from "./ScrollReveal";
import { TransitionLink } from "./TransitionLink";

type ProductListingProps = {
  items: Product[];
  heading?: string;
  eyebrow?: string;
  searchable?: boolean;
  showCategories?: boolean;
  showHeading?: boolean;
  initialCategory?: "All" | ProductCategory;
  categoryOrder?: readonly ("All" | ProductCategory)[];
  featuredCategoryOrder?: readonly ProductCategory[];
};

const catalogPaths = ["/shop", "/favourites"];

function isCatalogPath(pathname: string) {
  return catalogPaths.includes(pathname) || pathname.startsWith("/categories/");
}

export function ProductListing({
  items,
  heading = "Shop by category",
  eyebrow = "Curated collection",
  searchable = true,
  showCategories = true,
  showHeading = true,
  initialCategory = "All",
  categoryOrder = categories,
  featuredCategoryOrder = []
}: ProductListingProps) {
  const pathname = usePathname();
  const isCatalogPage = isCatalogPath(pathname);
  const [activeCategory, setActiveCategory] = useState<typeof initialCategory>(initialCategory);
  const [query, setQuery] = useState("");
  const [priceBand, setPriceBand] = useState("All");
  const [ratingBand, setRatingBand] = useState("All");
  const [sortMode, setSortMode] = useState("featured");
  const priceOptions = ["All", "Under Rs 1,000", "Rs 1,000-3,000", "Above Rs 3,000"].map((option) => ({
    label: option,
    value: option
  }));
  const ratingOptions = ["All", "4.5+", "4.7+"].map((option) => ({ label: option, value: option }));
  const sortOptions = [
    { label: "Featured", value: "featured" },
    { label: "Top rated", value: "rating" },
    { label: "Price: low to high", value: "price-low" },
    { label: "Price: high to low", value: "price-high" }
  ];

  const productGroups = useMemo(() => {
    const result = items.filter((product) => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const matchesQuery = `${product.name} ${product.category} ${product.detail}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesPrice =
        priceBand === "All" ||
        (priceBand === "Under Rs 1,000" && product.price < 1000) ||
        (priceBand === "Rs 1,000-3,000" && product.price >= 1000 && product.price <= 3000) ||
        (priceBand === "Above Rs 3,000" && product.price > 3000);
      const matchesRating =
        ratingBand === "All" ||
        (ratingBand === "4.5+" && product.rating >= 4.5) ||
        (ratingBand === "4.7+" && product.rating >= 4.7);

      return matchesCategory && matchesQuery && matchesPrice && matchesRating;
    });

    const featuredCategoryRank = new Map(
      featuredCategoryOrder.map((category, index) => [category, index])
    );

    return [...result].sort((a, b) => {
      if (sortMode === "price-low") {
        return a.price - b.price;
      }

      if (sortMode === "price-high") {
        return b.price - a.price;
      }

      if (sortMode === "rating") {
        return b.rating - a.rating;
      }

      const categoryPriority =
        (featuredCategoryRank.get(a.category) ?? Number.MAX_SAFE_INTEGER) -
        (featuredCategoryRank.get(b.category) ?? Number.MAX_SAFE_INTEGER);

      if (categoryPriority !== 0) {
        return categoryPriority;
      }

      return b.reviews - a.reviews;
    });
  }, [activeCategory, featuredCategoryOrder, items, priceBand, query, ratingBand, sortMode]);

  const filteredProductGroups = useMemo(() => groupProductVariants(productGroups), [productGroups]);

  const resetFilters = () => {
    setActiveCategory(initialCategory);
    setQuery("");
    setPriceBand("All");
    setRatingBand("All");
    setSortMode("featured");
  };

  return (
    <>
      {showHeading && (
        <ScrollReveal className="section-heading" delayIndex={0} instant={isCatalogPage}>
          <div>
            <p className="eyebrow dark">{eyebrow}</p>
            <h2>{heading}</h2>
          </div>
          {searchable && (
            <label className="search-box">
              <Search size={18} />
              <input
                aria-label="Search products"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products or category"
              />
            </label>
          )}
        </ScrollReveal>
      )}

      {!showHeading && searchable && (
        <ScrollReveal className="section-heading section-heading-compact" delayIndex={0} instant={isCatalogPage}>
          <label className="search-box">
            <Search size={18} />
            <input
              aria-label="Search products"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products or category"
            />
          </label>
        </ScrollReveal>
      )}

      <div className="catalog-controls">
        {showCategories && (
          <div className="category-tabs" aria-label="Product categories">
            {categoryOrder.map((category) => (
              <button
                key={category}
                aria-pressed={activeCategory === category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <div className="filter-panel" aria-label="Catalog filters">
          <CustomDropdown icon={SlidersHorizontal} label="Price" options={priceOptions} value={priceBand} onChange={setPriceBand} />
          <CustomDropdown icon={Star} label="Rating" options={ratingOptions} value={ratingBand} onChange={setRatingBand} />
          <CustomDropdown icon={ArrowDownUp} label="Sort" options={sortOptions} value={sortMode} onChange={setSortMode} />
        </div>
      </div>

      <div className="shop-toolbar">
        <span>
          Showing <strong>{filteredProductGroups.length}</strong> product{filteredProductGroups.length === 1 ? "" : "s"}
        </span>
        <span>Featured selection</span>
      </div>

      <div className="product-grid">
        {filteredProductGroups.map((group, index) => (
          <ProductCard delayIndex={index % 6} group={group} instant={isCatalogPage} key={group.key} />
        ))}
      </div>

      {filteredProductGroups.length === 0 && (
        <div className="empty-results" role="status">
          <Search size={28} />
          <h3>No products found</h3>
          <p>Try a broader category, price band, or search term.</p>
          <button className="secondary-dark-link" onClick={resetFilters} type="button">
            Reset filters
          </button>
        </div>
      )}
    </>
  );
}

function ProductCard({
  delayIndex,
  group,
  instant
}: {
  delayIndex: number;
  group: ProductVariantGroup;
  instant: boolean;
}) {
  const [selectedProduct, setSelectedProduct] = useState(group.product);
  const hasColorVariants = group.variants.length > 1;
  const discount = Math.round(((selectedProduct.mrp - selectedProduct.price) / selectedProduct.mrp) * 100);

  useEffect(() => {
    setSelectedProduct(group.product);
  }, [group.product]);

  return (
    <ScrollReveal as="article" className="product-card" delayIndex={delayIndex} instant={instant}>
      <div className="product-image">
        <TransitionLink href={`/products/${selectedProduct.slug}`} aria-label={`View ${selectedProduct.name}`}>
          <Image
            src={selectedProduct.image}
            alt={selectedProduct.name}
            fill
            sizes="(max-width: 720px) 100vw, (max-width: 980px) 50vw, 25vw"
          />
        </TransitionLink>
        <div className="product-badges">
          <span>{selectedProduct.tag}</span>
          <strong>{discount}% off</strong>
        </div>
        <FavouriteButton className="product-favourite-corner" product={selectedProduct} />
        <AddToCartButton className="product-cart-corner" product={selectedProduct} variant="icon" />
        <div className="product-image-overlay" aria-hidden="true" />
        <div className="product-hover-actions">
          <FavouriteButton product={selectedProduct} />
          <TransitionLink href={`/products/${selectedProduct.slug}`} aria-label={`View ${selectedProduct.name}`}>
            <Eye size={18} />
          </TransitionLink>
        </div>
      </div>
      <div className="product-info">
        <div className="product-meta">
          <span>{selectedProduct.category}</span>
          <span>{selectedProduct.detail}</span>
          {selectedProduct.colorName && <span>{selectedProduct.colorName}</span>}
        </div>
        <h3>
          <TransitionLink href={`/products/${selectedProduct.slug}`}>{selectedProduct.name}</TransitionLink>
        </h3>
        <p>{selectedProduct.description}</p>
        <div className="rating">
          <Star size={16} fill="currentColor" />
          <span>{selectedProduct.rating}</span>
          <small>({selectedProduct.reviews})</small>
        </div>
        <div className="stock-line">
          <span>{selectedProduct.stockStatus}</span>
          <span>{selectedProduct.deliveryNote.split(" with ")[0]}</span>
        </div>
        {hasColorVariants && (
          <div className="color-selector compact" aria-label={`Choose color for ${group.product.name}`}>
            <span>Color</span>
            <div>
              {group.variants.map((variant) => (
                <button
                  aria-label={`Select ${variant.colorName} color`}
                  className={selectedProduct.id === variant.id ? "active" : ""}
                  key={variant.id}
                  onClick={() => setSelectedProduct(variant)}
                  style={{ "--swatch-color": variant.colorHex ?? "#dce3ec" } as CSSProperties}
                  title={variant.colorName}
                  type="button"
                >
                  <span>{variant.colorName}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="price-row">
          <div>
            <strong>{formatPrice(selectedProduct.price)}</strong>
            <span>{formatPrice(selectedProduct.mrp)}</span>
          </div>
          <AddToCartButton product={selectedProduct} variant="compact" label="Add" />
        </div>
      </div>
    </ScrollReveal>
  );
}
