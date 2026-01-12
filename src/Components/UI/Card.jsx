import React from "react";
import { motion } from "framer-motion";

const Card = ({
  children,
  className = "",
  hoverScale = 1.05,
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.5 },
}) => {
  return (
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 md:p-8 text-center ${className}`}
      whileHover={{ scale: hoverScale }}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

export default Card;
