let lockCount = 0;
let savedScrollY = 0;

function applyScrollLock() {
  savedScrollY = window.scrollY;
  document.body.classList.add("scroll-locked");
  document.body.style.position = "fixed";
  document.body.style.top = `-${savedScrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";
}

function releaseScrollLock() {
  document.body.classList.remove("scroll-locked");
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";
  window.scrollTo(0, savedScrollY);
}

export function setScrollLock(locked: boolean) {
  const wasLocked = lockCount > 0;

  lockCount += locked ? 1 : -1;

  if (lockCount < 0) {
    lockCount = 0;
  }

  const isLocked = lockCount > 0;

  if (isLocked && !wasLocked) {
    applyScrollLock();
  } else if (!isLocked && wasLocked) {
    releaseScrollLock();
  }
}
