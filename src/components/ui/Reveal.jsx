import { motion } from "framer-motion";
import {
  fadeUp,
  slideLeft,
  slideRight,
  scaleFade,
  staggerContainer,
  staggerItem,
  viewport,
} from "../../hooks/useAnimations";

const VARIANTS = {
  fadeUp,
  slideLeft,
  slideRight,
  scaleFade,
};

/** Scroll-triggered section reveal */
export default function Reveal({
  children,
  variant = "fadeUp",
  delay = 0,
  className = "",
  as = "div",
}) {
  const MotionTag = motion[as] ?? motion.div;
  const variants = VARIANTS[variant] ?? fadeUp;

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      custom={delay}
    >
      {children}
    </MotionTag>
  );
}

/** Stagger children on scroll */
export function StaggerReveal({
  children,
  className = "",
  stagger = 0.12,
  delayChildren = 0,
}) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer(stagger, delayChildren)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}
