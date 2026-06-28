"use client";

import Image from "next/image";
import { BadgePercent, Minus, Plus, ShieldCheck, ShoppingBag, Truck, X } from "lucide-react";
import { useEffect } from "react";
import { formatPrice } from "@/lib/products";
import { setScrollLock } from "@/lib/scroll-lock";
import { TransitionLink } from "./TransitionLink";
import { useCart } from "./CartProvider";

export function CartDrawer() {
  const { cart, cartOpen, cartCount, subtotal, savings, delivery, total, setCartOpen, updateQuantity } =
    useCart();

  useEffect(() => {
    if (!cartOpen) {
      return;
    }

    setScrollLock(true);

    return () => {
      setScrollLock(false);
    };
  }, [cartOpen]);

  return (
    <>
      <aside className={cartOpen ? "cart-drawer open" : "cart-drawer"} aria-label="Shopping cart">
        <div className="cart-header">
          <div>
            <p className="eyebrow dark">Your cart</p>
            <h2>
              {cartCount} item{cartCount === 1 ? "" : "s"}
            </h2>
          </div>
          <button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <ShoppingBag size={34} />
            <p>Your cart is empty.</p>
            <button onClick={() => setCartOpen(false)}>Continue shopping</button>
          </div>
        ) : (
          <>
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
                      <button onClick={() => updateQuantity(item.id, -1)} aria-label={`Reduce ${item.name}`}>
                        <Minus size={15} />
                      </button>
                      <strong>{item.quantity}</strong>
                      <button onClick={() => updateQuantity(item.id, 1)} aria-label={`Increase ${item.name}`}>
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="coupon-box">
                <BadgePercent size={18} />
                <span>Demo coupon area</span>
                <strong>WELCOME10</strong>
              </div>
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
              <div className="cart-trust-row">
                <span>
                  <ShieldCheck size={16} />
                  No real payment
                </span>
                <span>
                  <Truck size={16} />
                  Free over Rs 999
                </span>
              </div>
            </div>
          </>
        )}
      </aside>

      {cartOpen && <button className="backdrop" aria-label="Close cart" onClick={() => setCartOpen(false)} />}
    </>
  );
}
