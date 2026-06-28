import type { CartItem } from "@/lib/products";

export type PaymentMethod = "upi" | "card" | "netbanking" | "cod";

export type CheckoutAddress = {
  fullName: string;
  phone: string;
  email: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
};

export type OrderTotals = {
  subtotal: number;
  savings: number;
  delivery: number;
  total: number;
};

export type StoredOrder = {
  id: string;
  createdAt: string;
  items: CartItem[];
  totals: OrderTotals;
  address: CheckoutAddress;
  paymentMethod: PaymentMethod;
  status: "confirmed";
};

const ORDERS_STORAGE_KEY = "venturesmart-orders";

export function generateOrderId(): string {
  return `VM-${Date.now()}`;
}

export function getOrders(): StoredOrder[] {
  if (typeof window === "undefined") {
    return [];
  }

  const saved = window.localStorage.getItem(ORDERS_STORAGE_KEY);
  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved) as StoredOrder[];
  } catch {
    return [];
  }
}

export function saveOrder(order: StoredOrder): void {
  const orders = getOrders();
  orders.unshift(order);
  window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
}

export function getOrderById(id: string): StoredOrder | null {
  return getOrders().find((order) => order.id === id) ?? null;
}

export function findOrder(id: string, contact: string): StoredOrder | null {
  const normalizedId = id.trim().toUpperCase();
  const normalizedContact = contact.trim().toLowerCase();

  return (
    getOrders().find((order) => {
      if (order.id.toUpperCase() !== normalizedId) {
        return false;
      }

      const phoneMatch = order.address.phone.replace(/\D/g, "") === normalizedContact.replace(/\D/g, "");
      const emailMatch = order.address.email.toLowerCase() === normalizedContact;

      return phoneMatch || emailMatch;
    }) ?? null
  );
}

export const paymentMethodLabels: Record<PaymentMethod, string> = {
  upi: "UPI",
  card: "Credit / Debit Card",
  netbanking: "Net Banking",
  cod: "Cash on Delivery"
};
