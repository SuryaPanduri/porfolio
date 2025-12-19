import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Projects() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /* ---------------- TEXT (Best Work) ---------------- */

  // Slower fade out
  const titleOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.35], // increased range → slower fade
    [1, 0]
  );

  /* ---------------- MACBOOK ---------------- */

  // Slower fade in
  const macOpacity = useTransform(
    scrollYProgress,
    [0.25, 0.55], // increased range
    [0, 1]
  );

  // Slower bottom → center movement
  const macY = useTransform(
    scrollYProgress,
    [0.25, 0.55],
    [260, 0] // slightly more distance
  );

  // Subtle zoom while pinned
const macScale = useTransform(
  scrollYProgress,
  [0.35, 0.85], // long range = slow zoom
  [1, 1.05]
);

  return (
    <section
      ref={ref}
      className="relative h-[450vh] bg-black text-white"
    >
      {/* BEST WORK TEXT */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.4, // slower fade-in
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{ opacity: titleOpacity }}
          className="text-7xl md:text-8xl font-semibold tracking-tight"
        >
          Best Work
        </motion.h1>
      </div>

      {/* MACBOOK */}
      <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none">
      <motion.img
  src="/images/macbook.png"
  alt="MacBook"
  style={{
    opacity: macOpacity,
    y: macY,
    scale: macScale, // 👈 ADD THIS
  }}
  className="w-[900px] max-w-full"
/>
      </div>
    </section>
  );
}