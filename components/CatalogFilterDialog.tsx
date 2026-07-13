"use client";

import { ArrowDownUp, LayoutGrid, Star, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getFocusableElements, trapFocus } from "@/lib/focus-trap";
import { setScrollLock } from "@/lib/scroll-lock";
import type { ProductCategory } from "@/lib/products";

type CategoryFilter = "All" | ProductCategory;

type FilterOption = {
  label: string;
  value: string;
};

type CatalogFilterDialogProps = {
  id: string;
  open: boolean;
  onClose: () => void;
  priceBand: string;
  ratingBand: string;
  sortMode: string;
  onPriceBandChange: (value: string) => void;
  onRatingBandChange: (value: string) => void;
  onSortModeChange: (value: string) => void;
  priceOptions: FilterOption[];
  ratingOptions: FilterOption[];
  sortOptions: FilterOption[];
  resultCount: number;
  onReset: () => void;
  showCategories?: boolean;
  categoryOrder?: readonly CategoryFilter[];
  activeCategory?: CategoryFilter;
  onCategoryChange?: (value: CategoryFilter) => void;
};

function FilterOptionGroup({
  legend,
  icon: Icon,
  options,
  value,
  onChange
}: {
  legend: string;
  icon: typeof SlidersHorizontal;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className="filter-option-group">
      <legend>
        <Icon aria-hidden="true" size={16} />
        {legend}
      </legend>
      <div className="filter-option-list">
        {options.map((option) => (
          <button
            key={option.value}
            aria-pressed={value === option.value}
            className={value === option.value ? "filter-option active" : "filter-option"}
            onClick={() => onChange(option.value)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function CatalogFilterDialog({
  id,
  open,
  onClose,
  priceBand,
  ratingBand,
  sortMode,
  onPriceBandChange,
  onRatingBandChange,
  onSortModeChange,
  priceOptions,
  ratingOptions,
  sortOptions,
  resultCount,
  onReset,
  showCategories = false,
  categoryOrder = [],
  activeCategory = "All",
  onCategoryChange
}: CatalogFilterDialogProps) {
  const categoryOptions = categoryOrder.map((category) => ({
    label: category,
    value: category
  }));
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setScrollLock(true);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (dialogRef.current) {
        trapFocus(dialogRef.current, event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    requestAnimationFrame(() => {
      if (!dialogRef.current) {
        return;
      }

      const focusable = getFocusableElements(dialogRef.current);
      focusable[0]?.focus();
    });

    return () => {
      setScrollLock(false);
      window.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [onClose, open]);

  if (!open || !mounted) {
    return null;
  }

  return createPortal(
    <>
      <div
        ref={dialogRef}
        aria-labelledby={titleId}
        aria-modal="true"
        className="filter-dialog open"
        id={id}
        role="dialog"
      >
        <div className="filter-dialog-header">
          <div>
            <p className="eyebrow dark">Refine results</p>
            <h2 id={titleId}>Filters</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close filters" type="button">
            <X size={20} />
          </button>
        </div>

        <div className="filter-dialog-body">
          {showCategories && onCategoryChange && (
            <FilterOptionGroup
              icon={LayoutGrid}
              legend="Category"
              onChange={(value) => onCategoryChange(value as CategoryFilter)}
              options={categoryOptions}
              value={activeCategory}
            />
          )}
          <FilterOptionGroup
            icon={SlidersHorizontal}
            legend="Price"
            onChange={onPriceBandChange}
            options={priceOptions}
            value={priceBand}
          />
          <FilterOptionGroup
            icon={Star}
            legend="Rating"
            onChange={onRatingBandChange}
            options={ratingOptions}
            value={ratingBand}
          />
          <FilterOptionGroup
            icon={ArrowDownUp}
            legend="Sort"
            onChange={onSortModeChange}
            options={sortOptions}
            value={sortMode}
          />
        </div>

        <div className="filter-dialog-footer">
          <button className="secondary-dark-link" onClick={onReset} type="button">
            Reset filters
          </button>
          <button className="primary-link" onClick={onClose} type="button">
            Show {resultCount} product{resultCount === 1 ? "" : "s"}
          </button>
        </div>
      </div>

      <button
        className="backdrop filter-dialog-backdrop"
        aria-label="Close filters"
        onClick={onClose}
        type="button"
      />
    </>,
    document.body
  );
}
