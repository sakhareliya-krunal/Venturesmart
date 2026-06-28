"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem, Product } from "@/lib/products";
import { useAnnounce } from "./LiveRegion";

type AddToCartOptions = {
  openDrawer?: boolean;
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
  const announce = useAnnounce();

  useEffect(() => {
    const saved = window.localStorage.getItem("toyjoy-cart");
    if (saved) {
      setCart(JSON.parse(saved) as CartItem[]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("toyjoy-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, options?: AddToCartOptions) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });

    const shouldOpenDrawer = options?.openDrawer !== false;
    if (shouldOpenDrawer) {
      setCartOpen(true);
    } else {
      announce(`Added ${product.name} to cart`);
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
