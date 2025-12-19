import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function MacbookScroll() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // MacBook lid animation
  const rotateX = useTransform(scrollYProgress, [0, 0.35], [90, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.85, 1]);
  const screenOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);

  return (
    <div ref={ref} className="sticky top-0 h-screen flex items-center justify-center">
      <motion.div
        style={{ scale, y }}
        className="relative w-[850px]"
      >

        {/* Base */}
        <img
          src="/images/macbook-base.png"
          className="w-full"
          alt="Macbook base"
        />

        {/* Lid */}
        <motion.img
          src="/images/macbook-lid.png"
          className="absolute top-0 left-0 w-full origin-bottom"
          style={{
            rotateX,
            transformPerspective: 1200,
          }}
        />

        {/* Screen */}
        <motion.div
          style={{ opacity: screenOpacity }}
          className="absolute inset-[8%] rounded-xl bg-black/90 backdrop-blur-xl p-10"
        >
          <ProjectSlides scrollYProgress={scrollYProgress} />
        </motion.div>

      </motion.div>
    </div>
  );
}