import React, { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { getFeaturedProjects } from "../api/projects";

export default function Home() {
  // ✅ STATE
  const [projects, setProjects] = useState([]);

  // ✅ EFFECT (must be inside component)
  useEffect(() => {
    getFeaturedProjects()
      .then((data) => {
        setProjects(data);
      })
      .catch((err) => {
        console.error("Failed to load projects", err);
      });
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      {/* HERO */}
      <section className="min-h-screen flex items-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          <p className="text-xl md:text-2xl text-gray-300 mb-6">
            Hi, I’m Surya 👋
          </p>

          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-tight">
            I build scalable
            <br />
            full-stack web applications.
          </h1>

          <p className="mt-8 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Full-Stack MERN Developer focused on clean architecture,
            performance, and real-world problem solving.
          </p>

          <div className="mt-14 flex justify-center gap-8">
            <a
              href="/projects"
              className="px-9 py-4 text-lg rounded-full bg-white text-black hover:bg-gray-200 transition"
            >
              View Projects
            </a>
            <a
              href="/contact"
              className="px-9 py-4 text-lg rounded-full border border-white/30 hover:bg-white hover:text-black transition"
            >
              Contact Me
            </a>
          </div>
        </motion.div>
      </section>

      {/* WHAT I BUILD */}
      {/* WHAT I BUILD */}
<section className="py-32 px-6 relative">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-semibold mb-16">
      What I build
    </h2>

    <div className="grid md:grid-cols-3 gap-12">
      {[
        {
          title: "Full-Stack Applications",
          desc: "End-to-end MERN applications with authentication, APIs, and scalable architecture.",
          glow: "from-purple-500/30 to-pink-500/30",
        },
        {
          title: "Secure Backend APIs",
          desc: "Well-structured REST APIs using JWT, MongoDB, and role-based access control.",
          glow: "from-blue-500/30 to-cyan-500/30",
        },
        {
          title: "Scalable Frontends",
          desc: "Modern React interfaces with performance-first design and subtle motion.",
          glow: "from-emerald-500/30 to-teal-500/30",
        },
      ].map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          viewport={{ once: true }}
          className="group relative rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl p-8 overflow-hidden"
        >
          {/* Glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
            <div
              className={`absolute -top-24 -left-24 w-72 h-72 bg-gradient-to-br ${item.glow} blur-3xl rounded-full`}
            />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-xl font-medium mb-4">
              {item.title}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {item.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* FEATURED PROJECTS */}
{/* FEATURED PROJECTS */}
<section className="py-32 px-6 relative">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-semibold mb-16">
      Featured Projects
    </h2>

    {projects.length === 0 ? (
      <p className="text-gray-400">
        Featured projects coming soon.
      </p>
    ) : (
      <div className="grid md:grid-cols-2 gap-12">
        {projects.map((project, i) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group relative rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl p-8 overflow-hidden"
          >
            {/* Glow Layer */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-500/20 blur-3xl rounded-full" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/20 blur-3xl rounded-full" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-2xl font-medium mb-3">
                {project.title}
              </h3>

              <p className="text-gray-300 mb-6 leading-relaxed">
                {project.shortDescription}
              </p>

              {/* Tech stack */}
              {project.techStack?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 rounded-full bg-white/10 text-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA */}
              <div className="flex gap-6 text-sm">
                <a
                  href="/projects"
                  className="font-medium hover:underline"
                >
                  View case study →
                </a>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition"
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    )}
  </div>
</section>

      {/* CTA */}
      <section className="py-40 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
          Let’s build something meaningful.
        </h2>
        <p className="text-gray-300 mb-10">
          Open to full-stack roles, collaborations, and startup ideas.
        </p>
        <a
          href="/contact"
          className="inline-block px-8 py-4 rounded-full bg-white text-black hover:bg-gray-200 transition"
        >
          Get in touch
        </a>
      </section>
    </main>
  );
}