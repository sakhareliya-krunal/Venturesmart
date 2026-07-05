"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition
} from "react";
import { RouteLoader } from "./RouteLoader";

const loaderShowDelay = 100;

type TransitionContextValue = {
  isPending: boolean;
  navigate: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [showLoader, setShowLoader] = useState(false);
  const pendingScrollTop = useRef(false);
  const showTimerRef = useRef<number | null>(null);

  const clearShowTimer = () => {
    if (showTimerRef.current) {
      window.clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }
  };

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname) {
        return;
      }

      pendingScrollTop.current = true;
      startTransition(() => {
        router.push(href, { scroll: false });
      });
    },
    [pathname, router]
  );

  useEffect(() => {
    if (isPending) {
      showTimerRef.current = window.setTimeout(() => {
        setShowLoader(true);
      }, loaderShowDelay);
    } else {
      clearShowTimer();
      setShowLoader(false);
    }

    return clearShowTimer;
  }, [isPending]);

  useEffect(() => {
    if (pendingScrollTop.current) {
      pendingScrollTop.current = false;
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      });
    }
  }, [pathname]);

  const value = useMemo(() => ({ isPending, navigate }), [isPending, navigate]);

  return (
    <TransitionContext.Provider value={value}>
      <RouteLoader visible={showLoader} />
      {children}
    </TransitionContext.Provider>
  );
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const context = useContext(TransitionContext);
  const pathname = usePathname();
  const isPending = context?.isPending ?? false;
  const [revealReady, setRevealReady] = useState(false);

  useEffect(() => {
    setRevealReady(false);
    const frameId = requestAnimationFrame(() => setRevealReady(true));
    return () => cancelAnimationFrame(frameId);
  }, [pathname]);

  return (
    <div
      aria-busy={isPending}
      className={`route-shell${revealReady ? " reveal-ready" : ""}`}
      id="main-content"
    >
      {children}
    </div>
  );
}

export function useRouteTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useRouteTransition must be used inside TransitionProvider");
  }
  return context;
}
