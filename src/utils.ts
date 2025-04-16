import { Transition } from "framer-motion";

export const scrollTargetToChild = (
  target: string,
  child: string,
  smooth?: boolean,
  offsetTop: number = 0
) => {
  const targetEl = document.querySelector(target) as HTMLElement;
  const childEl = document.querySelector(child) as HTMLElement;

  if (targetEl && childEl) {
    targetEl.scroll({
      top: childEl.offsetTop + offsetTop,
      behavior: smooth ? "smooth" : "instant",
    });
  }
};

export const motionEnterFromFadeY = (
  offset?: number,
  transitionOptions?: Transition
) => {
  return {
    viewport: { once: true },
    initial: { opacity: 0, y: offset || 20 },
    animate: { opacity: 1, y: 0 },
    transition: { ...{ duration: 0.5 }, ...transitionOptions },
  };
};
