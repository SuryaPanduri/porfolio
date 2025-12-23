import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getProjects } from "../api/projects";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch((err) => console.error("Failed to load projects", err));
  }, []);

  return (
    <main className="relative min-h-screen px-6 py-32 text-white">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-semibold tracking-tight mb-20"
        >
          Projects
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project) => (
            <Link
              key={project._id}
              to={`/projects/${project._id}`}
              className="group rounded-3xl border border-white/15 bg-white/5 backdrop-blur p-8 transition hover:bg-white/10"
            >
              <h2 className="text-2xl font-medium mb-3 group-hover:underline">
                {project.title}
              </h2>

              {/* ✅ FIXED FIELD */}
              <p className="text-gray-300 leading-relaxed">
                {project.shortDescription}
              </p>

              <span className="inline-block mt-6 text-sm text-gray-400">
                View case study →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}