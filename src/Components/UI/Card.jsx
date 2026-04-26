import React from "react";
import { motion } from "framer-motion";

/**
 * Card
 *
 * Props:
 *  children   – content
 *  className  – extra Tailwind classes
 *  shadow     – resting shadow            (default: true)
 *  border     – hairline border           (default: true)
 *  padding    – default inner padding     (default: true)
 *  hover      – lift-on-hover effect      (default: true)
 *  animate    – entrance fade/slide       (default: true)
 *               Set false when a parent
 *               stagger container owns
 *               the entrance animation.
 *  onClick    – makes card clickable
 */
const Card = ({
  children,
  className = "",
  shadow = true,
  border = true,
  padding = true,
  hover = true,
  animate = true,
  onClick,
}) => {
  const baseClasses = [
    "relative bg-white dark:bg-[#111117]",
    "rounded-2xl",
    border && "border border-black/[0.06] dark:border-white/[0.06]",
    shadow &&
      "shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_20px_-4px_rgba(0,0,0,0.4)]",
    padding && "p-7 md:p-8",
    onClick && "cursor-pointer",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const hoverProps = hover
    ? {
        whileHover: {
          y: -5,
          scale: 1.015,
          boxShadow: "0 20px 48px -12px rgba(0,0,0,0.13)",
          transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
        },
      }
    : {};

  const entranceProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      }
    : {};

  return (
    <motion.div
      onClick={onClick}
      className={baseClasses}
      {...hoverProps}
      {...entranceProps}
    >
      {children}
    </motion.div>
  );
};

export default Card;
