import { motion } from "framer-motion";

export default function PageLoader() {
  return (
    <motion.div
      className="page-loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="page-loader__bar"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <p className="page-loader__text">Loading…</p>
    </motion.div>
  );
}
