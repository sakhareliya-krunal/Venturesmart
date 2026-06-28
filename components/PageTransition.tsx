"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

type TransitionPhase = "idle" | "leaving" | "entering";

type TransitionContextValue = {
  phase: TransitionPhase;
  navigate: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);
const exitDuration = 160;
const enterDuration = 320;

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const firstRender = useRef(true);
  const pendingScrollTop = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname || phase === "leaving") {
        return;
      }

      clearTimer();
      pendingScrollTop.current = true;
      setPhase("leaving");
      timeoutRef.current = window.setTimeout(() => {
        router.push(href, { scroll: false });
      }, exitDuration);
    },
    [pathname, phase, router]
  );

  useEffect(() => {
    clearTimer();

    if (firstRender.current) {
      firstRender.current = false;
      setPhase("idle");
      return;
    }

    if (pendingScrollTop.current) {
      pendingScrollTop.current = false;
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      });
    }

    setPhase("entering");
    timeoutRef.current = window.setTimeout(() => {
      setPhase("idle");
    }, enterDuration);

    return clearTimer;
  }, [pathname]);

  const value = useMemo(() => ({ phase, navigate }), [navigate, phase]);

  return (
    <TransitionContext.Provider value={value}>
      <div className={phase === "leaving" ? "route-progress active" : "route-progress"} />
      {children}
    </TransitionContext.Provider>
  );
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const context = useContext(TransitionContext);
  const phase = context?.phase ?? "idle";

  return (
    <div className={`route-shell ${phase}`} id="main-content">
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
