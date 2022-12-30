import { motion } from "framer-motion";
import React from "react";

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const AnimatePage = ({ children }) => {
  return (
    <motion.div
      variants={variants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={{duration: 1, ease: 'linear'}}
    >
      {children}
    </motion.div>
  );
};

export default AnimatePage;
