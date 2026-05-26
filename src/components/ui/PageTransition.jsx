import { motion } from "framer-motion";
import { pageTransition } from "../../hooks/useAnimations";

export default function PageTransition({ children }) {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="page-transition-root"
    >
      {children}
    </motion.div>
  );
}
