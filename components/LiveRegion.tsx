"use client";

import { createContext, useCallback, useContext, useState } from "react";

const LiveRegionContext = createContext<(message: string) => void>(() => {});

export function LiveRegionProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState("");

  const announce = useCallback((nextMessage: string) => {
    setMessage("");
    requestAnimationFrame(() => setMessage(nextMessage));
  }, []);

  return (
    <LiveRegionContext.Provider value={announce}>
      {children}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {message}
      </div>
    </LiveRegionContext.Provider>
  );
}

export function useAnnounce() {
  return useContext(LiveRegionContext);
}
