"use client";

import { useEffect, useRef, useState } from "react";

type RouteProgressBarProps = {
  isPending: boolean;
};

const showDelayMs = 350;
const completeMs = 220;

export function RouteProgressBar({ isPending }: RouteProgressBarProps) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const wasPendingRef = useRef(false);

  useEffect(() => {
    if (isPending) {
      wasPendingRef.current = true;
      const showTimer = window.setTimeout(() => {
        setVisible(true);
        setProgress(70);
      }, showDelayMs);

      return () => window.clearTimeout(showTimer);
    }

    if (wasPendingRef.current) {
      wasPendingRef.current = false;
      setProgress(100);
      const hideTimer = window.setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, completeMs);

      return () => window.clearTimeout(hideTimer);
    }

    setVisible(false);
    setProgress(0);
    return undefined;
  }, [isPending]);

  if (!visible && progress === 0) {
    return null;
  }

  return (
    <div
      aria-hidden={!visible}
      className={`route-progress${visible ? " route-progress-visible" : ""}`}
      role="presentation"
    >
      <div className="route-progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
}
