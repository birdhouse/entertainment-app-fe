// components/PageWrapper.jsx
import { motion } from "framer-motion";

export default function PageWrapper({ children }) {
  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
}
