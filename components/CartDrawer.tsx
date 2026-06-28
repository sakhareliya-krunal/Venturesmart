"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingBag, Truck, X } from "lucide-react";
import { useEffect, useId, useRef } from "react";
import { formatPrice } from "@/lib/products";
import { getFocusableElements, trapFocus } from "@/lib/focus-trap";
import { setScrollLock } from "@/lib/scroll-lock";
import { TransitionLink } from "./TransitionLink";
import { useCart } from "./CartProvider";

const FREE_DELIVERY_THRESHOLD = 999;

export function CartDrawer() {
  const titleId = useId();
  const drawerRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const { cart, cartOpen, cartCount, subtotal, savings, delivery, total, setCartOpen, updateQuantity } =
    useCart();

  const amountToFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const deliveryProgress = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);

  useEffect(() => {
    if (!cartOpen) {
      return;
    }

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setScrollLock(true);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCartOpen(false);
        return;
      }

      if (drawerRef.current) {
        trapFocus(drawerRef.current, event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    requestAnimationFrame(() => {
      if (!drawerRef.current) {
        return;
      }

      const focusable = getFocusableElements(drawerRef.current);
      focusable[0]?.focus();
    });

    return () => {
      setScrollLock(false);
      window.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [cartOpen, setCartOpen]);

  return (
    <>
      <aside
        ref={drawerRef}
        aria-hidden={!cartOpen}
        aria-labelledby={titleId}
        aria-modal={cartOpen ? "true" : undefined}
        className={cartOpen ? "cart-drawer open" : "cart-drawer"}
        role="dialog"
      >
        <div className="cart-header">
          <div>
            <p className="eyebrow dark">Your cart</p>
            <h2 id={titleId}>
              {cartCount} item{cartCount === 1 ? "" : "s"}
            </h2>
          </div>
          <button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close cart" type="button">
            <X size={20} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart" role="status">
            <div className="empty-cart-content">
              <div className="empty-cart-icon" aria-hidden="true">
                <ShoppingBag size={32} />
              </div>
              <div className="empty-cart-copy">
                <h3>Your cart is empty</h3>
                <p>Browse toys and lunch boxes to add your first item.</p>
              </div>
              <TransitionLink
                className="primary-link empty-cart-cta"
                href="/shop"
                onClick={() => setCartOpen(false)}
              >
                Continue shopping
              </TransitionLink>
            </div>
          </div>
        ) : (
          <div className="cart-body">
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-thumb">
                    <Image src={item.image} alt={item.name} fill sizes="72px" />
                  </div>
                  <div>
                    <h3>{item.name}</h3>
                    <span>{formatPrice(item.price)}</span>
                    <div className="quantity">
                      <button onClick={() => updateQuantity(item.id, -1)} aria-label={`Reduce ${item.name}`} type="button">
                        <Minus size={15} />
                      </button>
                      <strong>{item.quantity}</strong>
                      <button onClick={() => updateQuantity(item.id, 1)} aria-label={`Increase ${item.name}`} type="button">
                        <Plus size={15} />
                      </button>
                    </div>
                    <div className="cart-item-actions">
                      <button
                        className="cart-remove-button"
                        onClick={() => updateQuantity(item.id, -item.quantity)}
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              {subtotal > 0 && subtotal < FREE_DELIVERY_THRESHOLD && (
                <div className="delivery-progress">
                  <div className="delivery-progress-track" aria-hidden="true">
                    <div className="delivery-progress-fill" style={{ width: `${deliveryProgress}%` }} />
                  </div>
                  <p>
                    Add <strong>{formatPrice(amountToFreeDelivery)}</strong> more for free delivery
                  </p>
                </div>
              )}
              {subtotal >= FREE_DELIVERY_THRESHOLD && (
                <div className="delivery-progress">
                  <p>
                    <Truck size={16} style={{ display: "inline", verticalAlign: "middle" }} /> You qualify for{" "}
                    <strong>free delivery</strong>
                  </p>
                </div>
              )}
              <div>
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <div>
                <span>Delivery</span>
                <strong>{delivery === 0 ? "Free" : formatPrice(delivery)}</strong>
              </div>
              <div>
                <span>Savings</span>
                <strong>{formatPrice(savings)}</strong>
              </div>
              <div className="total">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <TransitionLink
                className="checkout-button"
                href="/checkout"
                onClick={() => setCartOpen(false)}
              >
                Proceed to checkout
              </TransitionLink>
            </div>
          </div>
        )}
      </aside>

      {cartOpen && <button className="backdrop" aria-label="Close cart" onClick={() => setCartOpen(false)} type="button" />}
    </>
  );
}
