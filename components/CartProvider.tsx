"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem, Product } from "@/lib/products";
import { useAnnounce } from "./LiveRegion";

type AddToCartOptions = {
  openDrawer?: boolean;
  quantity?: number;
};

type CartContextValue = {
  cart: CartItem[];
  cartOpen: boolean;
  cartCount: number;
  subtotal: number;
  savings: number;
  delivery: number;
  total: number;
  addToCart: (product: Product, options?: AddToCartOptions) => void;
  updateQuantity: (id: number, delta: number) => void;
  clearCart: () => void;
  setCartOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const announce = useAnnounce();

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("toyjoy-cart");
      if (saved) {
        setCart(JSON.parse(saved) as CartItem[]);
      }
    } catch {
      window.localStorage.removeItem("toyjoy-cart");
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }
    window.localStorage.setItem("toyjoy-cart", JSON.stringify(cart));
  }, [cart, isHydrated]);

  const addToCart = (product: Product, options?: AddToCartOptions) => {
    const quantity = Math.max(1, options?.quantity ?? 1);

    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...current, { ...product, quantity }];
    });

    const shouldOpenDrawer = options?.openDrawer !== false;
    const label = quantity > 1 ? `${quantity} × ${product.name}` : product.name;

    if (shouldOpenDrawer) {
      setCartOpen(true);
    } else {
      announce(`Added ${label} to cart`);
    }
  };

  const clearCart = () => {
    setCart([]);
    setCartOpen(false);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((current) =>
      current
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const value = useMemo(() => {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const savings = cart.reduce((sum, item) => sum + (item.mrp - item.price) * item.quantity, 0);
    const delivery = subtotal > 999 || subtotal === 0 ? 0 : 79;

    return {
      cart,
      cartOpen,
      cartCount,
      subtotal,
      savings,
      delivery,
      total: subtotal + delivery,
      addToCart,
      updateQuantity,
      clearCart,
      setCartOpen
    };
  }, [cart, cartOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
