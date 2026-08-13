"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      data-progress
      className="print:hidden fixed top-0 right-0 left-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-sky-400 via-accent to-violet-500"
      style={{ scaleX }}
    />
  );
}
