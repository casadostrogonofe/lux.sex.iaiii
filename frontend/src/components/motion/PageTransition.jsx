import React from "react";
import { motion, useReducedMotion } from "motion/react";

export const PageTransition = ({ children }) => {
  const reduceMotion = useReducedMotion();
  const variants = reduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -6 },
      };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
      data-testid="page-transition"
    >
      {children}
    </motion.div>
  );
};