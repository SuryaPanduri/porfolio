import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -80]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.85]);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const x = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const y = useTransform(smoothY, [-0.5, 0.5], [-4, 4]);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* HERO */}
      <section
        className="pt-44 pb-48 px-8"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mouseX.set((e.clientX - r.left) / r.width - 0.5);
          mouseY.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onMouseLeave={() => {
          mouseX.set(0);
          mouseY.set(0);
        }}
      >
        <motion.div
          style={{ x, y, y: heroY, opacity: heroOpacity }}
          className="max-w-6xl pl-4 sm:pl-8 lg:pl-16"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.p variants={item} className="text-xl md:text-8xl text-gray-300 mb-3">
            Hi, I’m Surya 👋
          </motion.p>

          <motion.p
            variants={item}
            className="text-base md:text-4xl uppercase tracking-[0.35em] text-gray-400 mb-8"
          >
            Full-Stack Developer
          </motion.p>

          <motion.h1
            variants={item}
            className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight max-w-4xl"
          >
            Designing & building
            <br />
            thoughtful digital
            <br />
            experiences.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 text-lg text-gray-300 max-w-2xl"
          >
            I focus on clean architecture, performance, and modern UI to
            build products that feel effortless.
          </motion.p>

          <motion.div variants={item} className="mt-12 flex gap-8">
            <motion.a
              href="/projects"
              whileHover={{
                scale: 1.04,
                boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
              }}
              whileTap={{ scale: 0.98 }}
              className="px-7 py-3 rounded-full border border-white/40 bg-white/10 backdrop-blur text-white hover:bg-white hover:text-black transition"
            >
              View work
            </motion.a>

            <a
              href="/contact"
              className="text-gray-300 hover:text-white transition"
            >
              Get in touch →
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* PROJECTS */}
      <section className="pb-40 px-8">
        <div className="max-w-6xl pl-4 sm:pl-8 lg:pl-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-16">
            Selected Work
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {["INVENZO Asset Manager", "Weather App"].map((p) => (
              <div
                key={p}
                className="rounded-3xl bg-white/95 backdrop-blur p-8 shadow-xl"
              >
                <h3 className="text-2xl font-medium text-gray-900">{p}</h3>
                <p className="mt-3 text-gray-600">
                  A clean, scalable product focused on usability and clarity.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}