import { useEffect, type RefObject } from "react";

type SplitColumnScrollRefs = {
  containerRef: RefObject<HTMLElement | null>;
  leftRef: RefObject<HTMLElement | null>;
  rightRef: RefObject<HTMLElement | null>;
};

function canScrollColumn(element: HTMLElement, delta: number) {
  const atTop = element.scrollTop <= 0;
  const atBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 1;

  if (delta > 0) {
    return !atBottom;
  }

  if (delta < 0) {
    return !atTop;
  }

  return false;
}

export function useSplitColumnScroll({ containerRef, leftRef, rightRef }: SplitColumnScrollRefs) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const desktopQuery = window.matchMedia("(min-width: 901px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const resolveColumn = (clientX: number, clientY: number) => {
      const left = leftRef.current;
      const right = rightRef.current;

      if (!left || !right) {
        return null;
      }

      const target = document.elementFromPoint(clientX, clientY);

      if (target) {
        if (left.contains(target)) {
          return left;
        }

        if (right.contains(target)) {
          return right;
        }
      }

      const rect = container.getBoundingClientRect();
      return clientX < rect.left + rect.width / 2 ? left : right;
    };

    const onWheel = (event: WheelEvent) => {
      if (!desktopQuery.matches || reducedMotionQuery.matches) {
        return;
      }

      const column = resolveColumn(event.clientX, event.clientY);

      if (!column || !canScrollColumn(column, event.deltaY)) {
        return;
      }

      event.preventDefault();
      column.scrollTop += event.deltaY;
    };

    const bind = () => {
      if (desktopQuery.matches && !reducedMotionQuery.matches) {
        container.addEventListener("wheel", onWheel, { passive: false });
      }
    };

    const unbind = () => {
      container.removeEventListener("wheel", onWheel);
    };

    bind();

    const onPreferenceChange = () => {
      unbind();
      bind();
    };

    desktopQuery.addEventListener("change", onPreferenceChange);
    reducedMotionQuery.addEventListener("change", onPreferenceChange);

    return () => {
      unbind();
      desktopQuery.removeEventListener("change", onPreferenceChange);
      reducedMotionQuery.removeEventListener("change", onPreferenceChange);
    };
  }, [containerRef, leftRef, rightRef]);
}
