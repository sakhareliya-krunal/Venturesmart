"use client";

import Image from "next/image";
import { CheckCircle2, Package, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { TransitionLink } from "@/components/TransitionLink";
import { formatPrice } from "@/lib/products";
import { getOrderById, paymentMethodLabels, type StoredOrder } from "@/lib/orders";

type CheckoutSuccessClientProps = {
  orderId: string;
};

export function CheckoutSuccessClient({ orderId }: CheckoutSuccessClientProps) {
  const [order, setOrder] = useState<StoredOrder | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setOrder(getOrderById(orderId));
    setReady(true);
  }, [orderId]);

  if (!ready) {
    return (
      <main>
        <section className="inner-hero inner-hero-default product-detail-skeleton" aria-busy="true" aria-label="Loading order">
          <div className="inner-hero-copy">
            <div className="skeleton-line skeleton-line-sm" />
            <div className="skeleton-line skeleton-line-lg" />
          </div>
        </section>
      </main>
    );
  }

  if (!order) {
    return (
      <main>
        <section className="section page-section">
          <div className="order-success-card">
            <h1>Order not found</h1>
            <p>We could not find details for order {orderId}. It may have been cleared from this browser.</p>
            <TransitionLink className="primary-link" href="/shop">
              Continue shopping
            </TransitionLink>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="inner-hero inner-hero-default">
        <div className="inner-hero-copy">
          <p className="eyebrow">Order confirmed</p>
          <h1>Thank you for your order</h1>
          <p>Your order has been placed successfully. Save your order ID to track delivery.</p>
        </div>
      </section>

      <section className="section page-section">
        <div className="order-success-card">
          <div className="order-success-header">
            <CheckCircle2 size={34} />
            <div>
              <p className="eyebrow dark">Order ID</p>
              <h1>{order.id}</h1>
            </div>
          </div>

          <p className="order-success-meta">
            Paid via {paymentMethodLabels[order.paymentMethod]} · Total {formatPrice(order.totals.total)}
          </p>

          <div className="order-timeline" aria-label="Order status">
            <div aria-current="step" className="order-timeline-step active">
              <Package size={18} />
              <span>Order placed</span>
            </div>
            <div className="order-timeline-step">
              <Package size={18} />
              <span>Packed</span>
            </div>
            <div className="order-timeline-step">
              <Truck size={18} />
              <span>Out for delivery</span>
            </div>
          </div>

          <div className="checkout-summary-items">
            {order.items.map((item) => (
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

          <div className="order-success-address">
            <h2>Delivery to</h2>
            <p>
              {order.address.fullName}
              <br />
              {order.address.addressLine}
              <br />
              {order.address.city}, {order.address.state} {order.address.pincode}
              <br />
              {order.address.phone} · {order.address.email}
            </p>
          </div>

          <div className="inner-hero-actions">
            <TransitionLink className="primary-link" href={`/track-order?order=${encodeURIComponent(order.id)}`}>
              Track order
            </TransitionLink>
            <TransitionLink className="secondary-link" href="/shop">
              Continue shopping
            </TransitionLink>
          </div>
        </div>
      </section>
    </main>
  );
}
