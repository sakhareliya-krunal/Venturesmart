"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode
} from "react";

type ScrollRevealProps = {
  className?: string;
  delayIndex?: number;
  as?: ElementType;
  instant?: boolean;
  children: ReactNode;
} & HTMLAttributes<HTMLElement>;

export function ScrollReveal({
  className = "",
  delayIndex = 0,
  as: Tag = "div",
  instant = false,
  children,
  style,
  ...props
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(instant);

  useEffect(() => {
    if (instant) {
      return;
    }

    const element = ref.current;
    if (!element) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.12
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [instant]);

  const combinedClassName = [className, "reveal", visible ? "visible" : ""].filter(Boolean).join(" ");
  const combinedStyle = {
    ...style,
    "--reveal-delay": `${Math.min(delayIndex, 5) * 55}ms`
  } as CSSProperties;

  return (
    <Tag ref={ref} className={combinedClassName} style={combinedStyle} {...props}>
      {children}
    </Tag>
  );
}
