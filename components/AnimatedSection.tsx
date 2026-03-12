"use client";

import { motion, HTMLMotionProps } from "framer-motion";

interface AnimatedSectionProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

export default function AnimatedSection({ children, ...props }: AnimatedSectionProps) {
  return (
    <motion.div {...props}>
      {children}
    </motion.div>
  );
}
