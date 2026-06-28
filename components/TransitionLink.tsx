"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { useRouteTransition } from "./PageTransition";

type TransitionLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode;
  };

export function TransitionLink({ href, onClick, target, children, ...props }: TransitionLinkProps) {
  const pathname = usePathname();
  const { navigate } = useRouteTransition();
  const hrefString = typeof href === "string" ? href : href.pathname ?? "/";

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0 ||
      target === "_blank" ||
      hrefString.startsWith("#")
    ) {
      return;
    }

    if (hrefString === pathname) {
      return;
    }

    event.preventDefault();
    navigate(hrefString);
  };

  return (
    <Link href={href} target={target} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
