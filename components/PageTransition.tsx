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
import { RouteProgressBar } from "./RouteProgressBar";

const EXIT_MS = 180;
const ENTER_MS = 280;

type TransitionPhase = "idle" | "exiting" | "entering";

type TransitionContextValue = {
  isPending: boolean;
  phase: TransitionPhase;
  navigate: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const pendingScrollTop = useRef(false);
  const exitTimerRef = useRef<number | null>(null);
  const isNavigatingRef = useRef(false);
  const isInitialPathnameRef = useRef(true);

  const clearExitTimer = () => {
    if (exitTimerRef.current !== null) {
      window.clearTimeout(exitTimerRef.current);
      exitTimerRef.current = null;
    }
  };

  const pushRoute = useCallback(
    (href: string) => {
      pendingScrollTop.current = true;
      startTransition(() => {
        router.push(href, { scroll: false });
      });
    },
    [router]
  );

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname || isNavigatingRef.current) {
        return;
      }

      isNavigatingRef.current = true;
      clearExitTimer();

      if (prefersReducedMotion()) {
        setPhase("idle");
        pushRoute(href);
        return;
      }

      setPhase("exiting");
      exitTimerRef.current = window.setTimeout(() => {
        exitTimerRef.current = null;
        pushRoute(href);
      }, EXIT_MS);
    },
    [pathname, pushRoute]
  );

  useEffect(() => {
    if (isInitialPathnameRef.current) {
      isInitialPathnameRef.current = false;
      return;
    }

    if (pendingScrollTop.current) {
      pendingScrollTop.current = false;
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      });
    }

    if (prefersReducedMotion()) {
      setPhase("idle");
      isNavigatingRef.current = false;
      return;
    }

    setPhase("entering");
    const idleTimer = window.setTimeout(() => {
      setPhase("idle");
      isNavigatingRef.current = false;
    }, ENTER_MS);

    return () => window.clearTimeout(idleTimer);
  }, [pathname]);

  useEffect(() => clearExitTimer, []);

  const value = useMemo(() => ({ isPending, phase, navigate }), [isPending, phase, navigate]);

  return (
    <TransitionContext.Provider value={value}>
      <RouteProgressBar isPending={isPending} />
      {children}
    </TransitionContext.Provider>
  );
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const context = useContext(TransitionContext);
  const pathname = usePathname();
  const isPending = context?.isPending ?? false;
  const phase = context?.phase ?? "idle";
  const [revealReady, setRevealReady] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      setRevealReady(true);
      return;
    }

    setRevealReady(false);
    const frameId = requestAnimationFrame(() => setRevealReady(true));
    return () => cancelAnimationFrame(frameId);
  }, [pathname]);

  const shellClassName = [
    "route-shell",
    phase === "exiting" && "route-shell-exiting",
    phase === "entering" && "route-shell-entering",
    revealReady && "route-shell-ready reveal-ready"
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div aria-busy={isPending} className={shellClassName} id="main-content">
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
