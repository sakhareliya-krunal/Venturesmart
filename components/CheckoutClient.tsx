"use client";

import Image from "next/image";
import { BadgeIndianRupee, Banknote, CreditCard, Landmark, LockKeyhole, ShoppingBag, Truck } from "lucide-react";
import { FormEvent, useEffect, useId, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { useRouteTransition } from "@/components/PageTransition";
import { formatPrice } from "@/lib/products";
import {
  generateOrderId,
  paymentMethodLabels,
  saveOrder,
  type CheckoutAddress,
  type PaymentMethod
} from "@/lib/orders";

const paymentOptions: { id: PaymentMethod; icon: typeof BadgeIndianRupee; description: string }[] = [
  { id: "upi", icon: BadgeIndianRupee, description: "Pay with any UPI app" },
  { id: "card", icon: CreditCard, description: "Visa, Mastercard, RuPay" },
  { id: "netbanking", icon: Landmark, description: "All major banks supported" },
  { id: "cod", icon: Banknote, description: "Pay when your order arrives" }
];

const emptyAddress: CheckoutAddress = {
  fullName: "",
  phone: "",
  email: "",
  addressLine: "",
  city: "",
  state: "",
  pincode: ""
};

export function CheckoutClient() {
  const { cart, cartCount, subtotal, savings, delivery, total, clearCart } = useCart();
  const { navigate } = useRouteTransition();
  const [address, setAddress] = useState<CheckoutAddress>(emptyAddress);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirectingEmpty, setRedirectingEmpty] = useState(false);
  const errorId = useId();

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready && cart.length === 0) {
      setRedirectingEmpty(true);
      const timer = window.setTimeout(() => navigate("/shop"), 1200);
      return () => window.clearTimeout(timer);
    }
  }, [cart.length, navigate, ready]);

  const updateField = (field: keyof CheckoutAddress, value: string) => {
    setAddress((current) => ({ ...current, [field]: value }));
    if (error) {
      setError("");
    }
  };

  const validate = () => {
    if (!address.fullName.trim()) {
      return "Enter your full name.";
    }

    if (address.phone.replace(/\D/g, "").length < 10) {
      return "Enter a valid 10-digit phone number.";
    }

    if (!address.email.trim() || !address.email.includes("@")) {
      return "Enter a valid email address.";
    }

    if (!address.addressLine.trim()) {
      return "Enter your delivery address.";
    }

    if (!address.city.trim() || !address.state.trim()) {
      return "Enter your city and state.";
    }

    if (!/^\d{6}$/.test(address.pincode.trim())) {
      return "Enter a valid 6-digit pincode.";
    }

    return "";
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    const orderId = generateOrderId();
    saveOrder({
      id: orderId,
      createdAt: new Date().toISOString(),
      items: cart,
      totals: { subtotal, savings, delivery, total },
      address: {
        ...address,
        fullName: address.fullName.trim(),
        phone: address.phone.trim(),
        email: address.email.trim(),
        addressLine: address.addressLine.trim(),
        city: address.city.trim(),
        state: address.state.trim(),
        pincode: address.pincode.trim()
      },
      paymentMethod,
      status: "confirmed"
    });

    clearCart();
    navigate(`/checkout/success?order=${encodeURIComponent(orderId)}`);
  };

  if (!ready) {
    return (
      <main>
        <section className="inner-hero inner-hero-default product-detail-skeleton" aria-busy="true" aria-label="Loading checkout">
          <div className="inner-hero-copy">
            <div className="skeleton-line skeleton-line-sm" />
            <div className="skeleton-line skeleton-line-lg" />
          </div>
        </section>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main>
        <section className="section page-section">
          <div className="checkout-empty-notice" role="status">
            <h1>Your cart is empty</h1>
            <p>{redirectingEmpty ? "Redirecting you to the shop…" : "Add products before checkout."}</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="inner-hero inner-hero-default">
        <div className="inner-hero-copy">
          <p className="eyebrow">Checkout</p>
          <h1>Complete your order</h1>
          <p>Review delivery details, choose a payment method, and place your order.</p>
        </div>
      </section>

      <section className="section page-section">
        <form className="checkout-layout" onSubmit={handleSubmit}>
          <div className="checkout-panel">
            <div className="checkout-trust-strip">
              <span>
                <LockKeyhole size={17} />
                Secure checkout
              </span>
              <span>
                <Truck size={17} />
                Delivery shown before payment
              </span>
              <span>
                <ShoppingBag size={17} />
                Track your order anytime
              </span>
            </div>

            <h2>Delivery details</h2>
            <div className="checkout-form-grid">
              <label className="checkout-field checkout-field-wide">
                Full name
                <input
                  value={address.fullName}
                  onChange={(event) => updateField("fullName", event.target.value)}
                  placeholder="Enter your name"
                  autoComplete="name"
                  aria-invalid={Boolean(error && !address.fullName.trim())}
                  aria-describedby={error ? errorId : undefined}
                />
              </label>
              <label className="checkout-field">
                Phone
                <input
                  value={address.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  placeholder="10-digit mobile number"
                  autoComplete="tel"
                  inputMode="tel"
                  aria-invalid={Boolean(error && address.phone.replace(/\D/g, "").length < 10)}
                  aria-describedby={error ? errorId : undefined}
                />
              </label>
              <label className="checkout-field">
                Email
                <input
                  value={address.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  type="email"
                  aria-invalid={Boolean(error && (!address.email.trim() || !address.email.includes("@")))}
                  aria-describedby={error ? errorId : undefined}
                />
              </label>
              <label className="checkout-field checkout-field-wide">
                Address
                <input
                  value={address.addressLine}
                  onChange={(event) => updateField("addressLine", event.target.value)}
                  placeholder="House no., street, landmark"
                  autoComplete="street-address"
                  aria-invalid={Boolean(error && !address.addressLine.trim())}
                  aria-describedby={error ? errorId : undefined}
                />
              </label>
              <label className="checkout-field">
                City
                <input
                  value={address.city}
                  onChange={(event) => updateField("city", event.target.value)}
                  placeholder="City"
                  autoComplete="address-level2"
                  aria-invalid={Boolean(error && !address.city.trim())}
                  aria-describedby={error ? errorId : undefined}
                />
              </label>
              <label className="checkout-field">
                State
                <input
                  value={address.state}
                  onChange={(event) => updateField("state", event.target.value)}
                  placeholder="State"
                  autoComplete="address-level1"
                  aria-invalid={Boolean(error && !address.state.trim())}
                  aria-describedby={error ? errorId : undefined}
                />
              </label>
              <label className="checkout-field">
                Pincode
                <input
                  value={address.pincode}
                  onChange={(event) => updateField("pincode", event.target.value)}
                  placeholder="6-digit pincode"
                  autoComplete="postal-code"
                  inputMode="numeric"
                  maxLength={6}
                  aria-invalid={Boolean(error && !/^\d{6}$/.test(address.pincode.trim()))}
                  aria-describedby={error ? errorId : undefined}
                />
              </label>
            </div>

            <h2>Payment method</h2>
            <div className="payment-method-grid" role="radiogroup" aria-label="Payment method">
              {paymentOptions.map((option) => {
                const Icon = option.icon;
                const checked = paymentMethod === option.id;

                return (
                  <label className={checked ? "payment-method-card active" : "payment-method-card"} key={option.id}>
                    <input
                      type="radio"
                      name="payment-method"
                      value={option.id}
                      checked={checked}
                      onChange={() => setPaymentMethod(option.id)}
                    />
                    <Icon size={22} />
                    <span>
                      <strong>{paymentMethodLabels[option.id]}</strong>
                      <small>{option.description}</small>
                    </span>
                  </label>
                );
              })}
            </div>

            {error && (
              <p className="checkout-error" id={errorId} role="alert">
                {error}
              </p>
            )}

            <button className="checkout-button checkout-submit" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Placing order…" : "Place order"}
            </button>
          </div>

          <aside className="checkout-summary">
            <p className="eyebrow dark">Order summary</p>
            <h2>
              {cartCount} item{cartCount === 1 ? "" : "s"}
            </h2>

            <div className="checkout-summary-items">
              {cart.map((item) => (
                <div className="checkout-summary-item" key={item.id}>
                  <div className="cart-thumb">
                    <Image src={item.image} alt={item.name} fill sizes="72px" />
                  </div>
                  <div>
                    <h3>{item.name}</h3>
                    <span>
                      {item.quantity} x {formatPrice(item.price)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary checkout-summary-totals">
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
            </div>

            <div className="checkout-summary-note">
              <ShoppingBag size={18} />
              <p>Your order is saved so you can track delivery.</p>
            </div>
          </aside>
        </form>
      </section>
    </main>
  );
}
