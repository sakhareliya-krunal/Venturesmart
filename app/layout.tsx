import type { Metadata, Viewport } from "next";
import { CartDrawer } from "@/components/CartDrawer";
import { CartProvider } from "@/components/CartProvider";
import { FavouritesProvider } from "@/components/FavouritesProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageTransition, TransitionProvider } from "@/components/PageTransition";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ventures Mart | Toys and Lunch Boxes",
  description:
    "A responsive India-focused e-commerce storefront for creative toys and everyday lunch boxes.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/icon.png"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CartProvider>
          <FavouritesProvider>
            <TransitionProvider>
              <Header />
              <PageTransition>{children}</PageTransition>
              <Footer />
              <CartDrawer />
              <ScrollAnimations />
            </TransitionProvider>
          </FavouritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
