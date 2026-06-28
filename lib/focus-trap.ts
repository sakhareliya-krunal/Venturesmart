const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function getFocusableElements(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) => !element.hasAttribute("inert") && element.getAttribute("aria-hidden") !== "true"
  );
}

export function trapFocus(container: HTMLElement, event: KeyboardEvent) {
  trapFocusOnElements(getFocusableElements(container), event);
}

export function trapFocusOnElements(focusable: HTMLElement[], event: KeyboardEvent) {
  if (event.key !== "Tab" || focusable.length === 0) {
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;

  if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus();
    return;
  }

  if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}
