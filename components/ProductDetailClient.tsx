"use client";

import Image from "next/image";
import {
  BadgeCheck,
  Check,
  ImagePlus,
  Minus,
  PackageCheck,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck
} from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { FavouriteButton } from "@/components/FavouriteButton";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useSplitColumnScroll } from "@/hooks/useSplitColumnScroll";
import { recordRecentlyViewed } from "@/lib/recently-viewed";
import { formatPrice, getProductVariants, products, type Product } from "@/lib/products";
import { useAnnounce } from "./LiveRegion";
import { useRouteTransition } from "./PageTransition";
import { useCart } from "./CartProvider";

type ProductDetailClientProps = {
  product: Product;
};

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [pincode, setPincode] = useState("");
  const [pincodeResult, setPincodeResult] = useState("");
  const topRef = useRef<HTMLDivElement>(null);
  const galleryScrollRef = useRef<HTMLDivElement>(null);
  const contentScrollRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const { navigate } = useRouteTransition();
  const announce = useAnnounce();
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const gallery = product.gallery.length > 0 ? product.gallery : [product.image];
  const colorVariants = getProductVariants(product, products);
  const hasColorVariants = colorVariants.length > 1;
  const isDesktopGallery = useMediaQuery("(min-width: 901px)");

  useSplitColumnScroll({
    containerRef: topRef,
    leftRef: galleryScrollRef,
    rightRef: contentScrollRef
  });

  useEffect(() => {
    recordRecentlyViewed(product);
  }, [product]);

  const checkPincode = () => {
    if (!/^\d{6}$/.test(pincode.trim())) {
      setPincodeResult("Enter a valid 6-digit pincode.");
      return;
    }

    setPincodeResult("Delivery available in 2–5 business days.");
  };

  const increaseQuantity = () => {
    setQuantity((current) => {
      if (current >= 9) {
        announce("Maximum quantity is 9");
        return current;
      }

      return current + 1;
    });
  };

  const addQuantityToCart = () => {
    for (let index = 0; index < quantity; index += 1) {
      addToCart(product);
    }
  };

  const buyNow = () => {
    for (let index = 0; index < quantity; index += 1) {
      addToCart(product, { openDrawer: false });
    }
    navigate("/checkout");
  };

  return (
    <section className="product-detail section page-section">
      <div className="product-detail-top" ref={topRef}>
        <div className="product-gallery-scroll" ref={galleryScrollRef}>
          {isDesktopGallery ? (
            <div className="product-gallery-desktop">
              {gallery.map((image, index) => (
                <div className="product-gallery-slide" key={`desktop-${image}-${index}`}>
                  <Image
                    src={image}
                    alt={index === 0 ? product.name : `${product.name} view ${index + 1}`}
                    fill
                    priority={index === 0}
                    loading={index === 0 ? undefined : "lazy"}
                    fetchPriority={index === 0 ? "high" : "low"}
                    sizes="(max-width: 980px) 100vw, 50vw"
                  />
                  {index === 0 && <span>{product.tag}</span>}
                </div>
              ))}
            </div>
          ) : (
            <div className="product-gallery-mobile">
              <div className="product-main-image">
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 980px) 100vw, 50vw"
                />
                <span>{product.tag}</span>
                <FavouriteButton className="product-favourite-corner" product={product} />
              </div>
              <div className="product-thumbnail-row" aria-label="Product highlights">
                {gallery.map((image, index) => (
                  <button
                    className={activeImageIndex === index ? "product-thumbnail active" : "product-thumbnail"}
                    key={`${image}-${index}`}
                    onClick={() => {
                      setActiveImage(image);
                      setActiveImageIndex(index);
                    }}
                    type="button"
                    aria-label={`View product image ${index + 1}`}
                  >
                    <Image
                      src={image}
                      alt=""
                      fill
                      loading={index === 0 ? undefined : "lazy"}
                      sizes="96px"
                    />
                    {index > 0 && <ImagePlus size={16} />}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="gallery-note">
            <BadgeCheck size={18} />
            <span>Gallery images show the selected product and its matching detail views.</span>
          </div>
        </div>

        <div className="product-detail-content-scroll" ref={contentScrollRef}>
          <div className="product-buy-card">
            <div className="product-detail-meta">
              <span>{product.category}</span>
              <span>{product.detail}</span>
              <strong>{product.stockStatus}</strong>
            </div>

            <h1>{product.name}</h1>

            <div className="detail-rating">
              <span>
                <Star size={16} fill="currentColor" />
                {product.rating}
              </span>
              <small>{product.reviews} verified reviews</small>
            </div>

            <p className="detail-description">{product.description}</p>

            <div className="detail-price-block">
              <strong>{formatPrice(product.price)}</strong>
              <span>{formatPrice(product.mrp)}</span>
              <em>{discount}% off</em>
            </div>

            {hasColorVariants && (
              <div className="color-selector detail" aria-label={`Choose color for ${product.name}`}>
                <span>Color: {product.colorName}</span>
                <div>
                  {colorVariants.map((variant) => (
                    <button
                      aria-current={product.id === variant.id ? "true" : undefined}
                      aria-label={`Select ${variant.colorName} color`}
                      className={product.id === variant.id ? "active" : ""}
                      disabled={product.id === variant.id}
                      key={variant.id}
                      onClick={() => navigate(`/products/${variant.slug}`)}
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

            <div className="pincode-delivery-card">
              <div className="pincode-delivery-header">
                <span className="pincode-delivery-icon" aria-hidden="true">
                  <Truck size={18} />
                </span>
                <div>
                  <strong>Check delivery</strong>
                  <p>Enter your pincode for an estimated delivery timeline.</p>
                </div>
              </div>
              <div className="pincode-input-group">
                <input
                  aria-label="6-digit pincode"
                  inputMode="numeric"
                  maxLength={6}
                  onChange={(event) => setPincode(event.target.value)}
                  placeholder="6-digit pincode"
                  value={pincode}
                />
                <button className="pincode-check-button" onClick={checkPincode} type="button">
                  Check
                </button>
              </div>
              {pincodeResult && (
                <p
                  className={
                    pincodeResult.startsWith("Enter a valid")
                      ? "pincode-delivery-result is-error"
                      : "pincode-delivery-result"
                  }
                  role="status"
                >
                  {pincodeResult}
                </p>
              )}
            </div>

            <div className="quantity-row">
              <span>Quantity</span>
              <div className="quantity-stepper">
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <strong>{quantity}</strong>
                <button
                  type="button"
                  onClick={increaseQuantity}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="detail-actions">
              <button className="detail-cart-button" type="button" onClick={addQuantityToCart}>
                <ShoppingCart size={18} />
                Add to cart
              </button>
              <button className="detail-buy-button" type="button" onClick={buyNow}>
                Buy now
              </button>
              <FavouriteButton className="detail-save-button" product={product} />
            </div>
          </div>

          <div className="product-detail-sections">
            <section className="product-detail-section">
              <p className="eyebrow dark">Highlights</p>
              <h2>Key features</h2>
              <div className="detail-feature-list">
                {product.features.map((feature) => (
                  <div key={feature}>
                    <Check size={17} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="product-detail-section">
              <p className="eyebrow dark">Trust</p>
              <h2>Delivery and support</h2>
              <div className="detail-service-grid">
                <div>
                  <Truck size={20} />
                  <span>{product.deliveryNote}</span>
                </div>
                <div>
                  <ShieldCheck size={20} />
                  <span>{product.warrantyNote}</span>
                </div>
                <div>
                  <PackageCheck size={20} />
                  <span>Secure checkout with UPI, cards, net banking, and COD readiness.</span>
                </div>
                <div>
                  <RotateCcw size={20} />
                  <span>Return request window and support notes are visible before payment integration.</span>
                </div>
              </div>
            </section>

            <section className="product-detail-section">
              <p className="eyebrow dark">Details</p>
              <h2>Specifications</h2>
              <div className="spec-table">
                {product.specs.map((spec) => (
                  <div key={spec.label}>
                    <span>{spec.label}</span>
                    <strong>{spec.value}</strong>
                  </div>
                ))}
              </div>
            </section>

            <section className="product-detail-section">
              <p className="eyebrow dark">Reviews</p>
              <h2>Customer feedback</h2>
              <div className="review-summary">
                <div>
                  <strong>{product.rating}</strong>
                  <span>
                    <Star size={16} fill="currentColor" />
                    Based on {product.reviews} reviews
                  </span>
                </div>
                <p>
                  Customers highlight useful details, reliable packaging, and clear checkout expectations in this
                  static storefront preview.
                </p>
              </div>

              <div className="review-list">
                {["Accurate listing and clean buying flow.", "Delivery and return notes were easy to find."].map(
                  (review) => (
                    <article key={review}>
                      <span>
                        <Star size={14} fill="currentColor" />
                        Verified buyer
                      </span>
                      <p>{review}</p>
                    </article>
                  )
                )}
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="mobile-buy-bar" aria-label="Mobile purchase actions">
        <div>
          <span>{formatPrice(product.price)}</span>
          <small>{product.stockStatus}</small>
        </div>
        <button
          aria-label={`Add ${product.name} to cart`}
          onClick={addQuantityToCart}
          type="button"
        >
          <ShoppingCart size={18} />
          Add
        </button>
        <button aria-label={`Buy ${product.name} now`} onClick={buyNow} type="button">
          Buy
        </button>
      </div>
    </section>
  );
}
