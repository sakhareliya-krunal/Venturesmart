"use client";

import Image from "next/image";
import { Package, Search, Truck } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { findOrder, paymentMethodLabels, type StoredOrder } from "@/lib/orders";
import { formatPrice } from "@/lib/products";

type TrackOrderClientProps = {
  initialOrderId?: string;
};

export function TrackOrderClient({ initialOrderId = "" }: TrackOrderClientProps) {
  const [orderId, setOrderId] = useState(initialOrderId);
  const [contact, setContact] = useState("");
  const [order, setOrder] = useState<StoredOrder | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialOrderId) {
      setOrderId(initialOrderId);
    }
  }, [initialOrderId]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearched(true);

    if (!orderId.trim()) {
      setError("Enter your order ID.");
      setNotFound(false);
      setOrder(null);
      return;
    }

    if (!contact.trim()) {
      setError("Enter the phone or email used during checkout.");
      setNotFound(false);
      setOrder(null);
      return;
    }

    setError("");
    const match = findOrder(orderId, contact);
    setOrder(match);
    setNotFound(!match);
  };

  return (
    <>
      <form className="track-form" onSubmit={handleSubmit}>
        <label>
          Order ID
          <input
            name="orderId"
            value={orderId}
            onChange={(event) => {
              setOrderId(event.target.value);
              if (error) {
                setError("");
              }
            }}
            placeholder="VM-10024"
            autoComplete="off"
          />
        </label>
        <label>
          Phone or email
          <input
            name="contact"
            value={contact}
            onChange={(event) => {
              setContact(event.target.value);
              if (error) {
                setError("");
              }
            }}
            placeholder="Enter contact used for order"
            autoComplete="email"
          />
        </label>
        {error && (
          <p className="checkout-error" role="alert">
            {error}
          </p>
        )}
        <button className="primary-link" type="submit">
          <Search size={18} />
          Track order
        </button>
        <p>Demo orders are stored in this browser only.</p>
      </form>

      {searched && notFound && !error && (
        <div className="order-success-card track-order-result" role="alert">
          <h2>Order not found</h2>
          <p>Check the order ID and the phone or email used during checkout.</p>
        </div>
      )}

      {order && (
        <div className="order-success-card track-order-result">
          <p className="eyebrow dark">Order status</p>
          <h2>{order.id}</h2>
          <p className="order-success-meta">
            {paymentMethodLabels[order.paymentMethod]} · {formatPrice(order.totals.total)}
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
        </div>
      )}
    </>
  );
}
