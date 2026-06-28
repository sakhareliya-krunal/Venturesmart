let lockCount = 0;

export function setScrollLock(locked: boolean) {
  lockCount += locked ? 1 : -1;

  if (lockCount < 0) {
    lockCount = 0;
  }

  document.body.classList.toggle("scroll-locked", lockCount > 0);
}
