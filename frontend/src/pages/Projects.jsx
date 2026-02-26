import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  ArrowUpRight,
  FolderKanban,
  Github,
  Layers3,
  Loader2,
  Sparkles,
} from "lucide-react";
import { getProjects } from "../api/projects";

const TECH_LOGOS = {
  react: { slug: "react", color: "61DAFB" },
  node: { slug: "nodedotjs", color: "5FA04E" },
  nodejs: { slug: "nodedotjs", color: "5FA04E" },
  express: { slug: "express", color: "FFFFFF" },
  mongodb: { slug: "mongodb", color: "47A248" },
  mongoose: { slug: "mongoose", color: "880000" },
  javascript: { slug: "javascript", color: "F7DF1E" },
  typescript: { slug: "typescript", color: "3178C6" },
  html: { slug: "html5", color: "E34F26" },
  css: { slug: "css3", color: "1572B6" },
  tailwind: { slug: "tailwindcss", color: "06B6D4" },
  tailwindcss: { slug: "tailwindcss", color: "06B6D4" },
  vite: { slug: "vite", color: "646CFF" },
  mysql: { slug: "mysql", color: "4479A1" },
  postgresql: { slug: "postgresql", color: "4169E1" },
  firebase: { slug: "firebase", color: "DD2C00" },
  nextjs: { slug: "nextdotjs", color: "FFFFFF" },
  redux: { slug: "redux", color: "764ABC" },
};

const normalizeTech = (tech) =>
  tech.toLowerCase().replace(/\./g, "").replace(/[^a-z0-9]/g, "");

const getTechLogo = (tech) => {
  const meta = TECH_LOGOS[normalizeTech(tech)];
  if (!meta) return null;
  return `https://cdn.simpleicons.org/${meta.slug}/${meta.color}`;
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    getProjects()
      .then((data) => {
        setProjects(data);
        setStatus("success");
      })
      .catch((err) => {
        console.error("Failed to load projects", err);
        setStatus("error");
      });
  }, []);

  return (
    <main className="relative min-h-screen page-container section-padding pt-32 sm:pt-40 text-white">
      <div className="w-full">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight"
        >
          Projects
        </motion.h1>
        <div className="mt-3 flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4">
          <p className="text-gray-300 max-w-2xl">
            A curated set of products and experiments with production-focused
            architecture, clean APIs, and polished UI.
          </p>

          {status === "success" && projects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 xl:min-w-[620px] w-full xl:w-auto mt-4 md:mt-0">
              <div className="rounded-2xl border border-white/15 bg-white/5 p-3.5 sm:p-4 flex-1">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-gray-300 text-sm leading-tight">
                    <FolderKanban size={16} />
                    <span>Total Projects</span>
                  </div>
                  <p className="text-lg font-semibold leading-none">{projects.length}</p>
                </div>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-3.5 sm:p-4 flex-1">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-gray-300 text-sm leading-tight">
                    <Sparkles size={16} />
                    <span>Featured</span>
                  </div>
                  <p className="text-lg font-semibold leading-none">
                    {projects.filter((project) => project.featured).length}
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-3.5 sm:p-4 flex-1">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-gray-300 text-sm leading-tight">
                    <Layers3 size={16} />
                    <span>Total Tech</span>
                  </div>
                  <p className="text-lg font-semibold leading-none">
                    {
                      new Set(
                        projects.flatMap((project) => project.techStack || [])
                      ).size
                    }
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {status === "loading" && (
          <div className="mt-12 flex items-center gap-3 text-gray-300">
            <Loader2 size={18} className="animate-spin" />
            Loading projects...
          </div>
        )}

        {status === "error" && (
          <div className="mt-12 flex items-center gap-3 text-red-300 rounded-2xl border border-red-300/30 bg-red-500/10 p-4 max-w-xl">
            <AlertCircle size={18} />
            Failed to load projects. Check backend/API connection.
          </div>
        )}

        {status === "success" && projects.length === 0 ? (
          <p className="text-gray-400 mt-12">
            No projects found yet. Add projects from backend or run the seed
            script.
          </p>
        ) : null}

        {status === "success" && projects.length > 0 ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 mt-7">
            {projects.map((project, index) => (
              <motion.article
                key={project._id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] backdrop-blur p-8 transition hover:bg-white/[0.10] hover:border-white/25 flex flex-col h-full"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                  <div className="absolute -top-24 -left-20 h-56 w-56 rounded-full bg-cyan-400/15 blur-3xl" />
                  <div className="absolute -bottom-24 right-0 h-56 w-56 rounded-full bg-blue-500/15 blur-3xl" />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <h2 className="text-2xl font-medium mb-3">{project.title}</h2>

                  <p className="text-gray-300 leading-relaxed flex-grow">
                    {project.longDescription || project.shortDescription}
                  </p>

                  {project.techStack?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-6">
                      {project.techStack.map((tech) => (
                        <div
                          key={`${project._id}-${tech}`}
                          className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-white/10 text-gray-100 border border-white/10"
                        >
                          {getTechLogo(tech) ? (
                            <img
                              src={getTechLogo(tech)}
                              alt={`${tech} logo`}
                              className="h-3.5 w-3.5"
                              loading="lazy"
                            />
                          ) : (
                            <span className="inline-flex items-center justify-center h-3.5 w-3.5 rounded-full bg-white/20 text-[9px] font-semibold">
                              {tech.trim().charAt(0).toUpperCase()}
                            </span>
                          )}
                          {tech}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto pt-6 flex flex-wrap items-center gap-5 text-sm">
                    <Link
                      to={`/projects/${project._id}`}
                      className="inline-flex items-center gap-1 text-cyan-200 hover:text-cyan-100 font-medium"
                    >
                      View details <ArrowUpRight size={14} />
                    </Link>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-gray-300 hover:text-white"
                      >
                        <Github size={14} />
                        GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-gray-300 hover:text-white"
                      >
                        <ArrowUpRight size={14} />
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : null}
      </div>
    </main>
  );
}
