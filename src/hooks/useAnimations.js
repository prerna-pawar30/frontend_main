/** Shared Framer Motion variants — Tubik-style easing */

export const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export const slideLeft = {
  hidden: { opacity: 0, x: -56 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export const slideRight = {
  hidden: { opacity: 0, x: 56 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export const scaleFade = {
  hidden: { opacity: 0, scale: 0.94 },
  show: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export const pageTransition = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.32, ease: [0.55, 0, 1, 0.45] },
  },
};

export const viewport = { once: true, margin: "-80px" };
