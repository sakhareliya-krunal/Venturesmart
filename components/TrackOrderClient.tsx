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

  useEffect(() => {
    if (initialOrderId) {
      setOrderId(initialOrderId);
    }
  }, [initialOrderId]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearched(true);

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
            value={orderId}
            onChange={(event) => setOrderId(event.target.value)}
            placeholder="VM-10024"
          />
        </label>
        <label>
          Phone or email
          <input
            value={contact}
            onChange={(event) => setContact(event.target.value)}
            placeholder="Enter contact used for order"
          />
        </label>
        <button className="primary-link" type="submit">
          <Search size={18} />
          Track order
        </button>
        <p>Demo orders are stored in this browser only.</p>
      </form>

      {searched && notFound && (
        <div className="order-success-card track-order-result">
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
            <div className="order-timeline-step active">
              <Package size={18} />
              <span>Order placed</span>
            </div>
            <div className="order-timeline-step active">
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
