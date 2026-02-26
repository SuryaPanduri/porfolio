import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Github,
  Layers3,
  Loader2,
  Sparkles,
} from "lucide-react";
import { getProjectById } from "../api/projects";
import { getProjectProfile } from "../data/projectProfiles";

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
  bootstrap: { slug: "bootstrap", color: "7952B3" },
  materialui: { slug: "mui", color: "007FFF" },
};

const normalizeTech = (tech) =>
  tech.toLowerCase().replace(/\./g, "").replace(/[^a-z0-9]/g, "");

const getTechLogo = (tech) => {
  const meta = TECH_LOGOS[normalizeTech(tech)];
  if (!meta) return null;
  return `https://cdn.simpleicons.org/${meta.slug}/${meta.color}`;
};

const buildFallbackPoints = (project) => {
  const stack = project.techStack?.length
    ? project.techStack.join(", ")
    : "modern full-stack tooling";
  return [
    `Designed and delivered a production-style implementation using ${stack}.`,
    "Built modular API and UI layers to keep the codebase maintainable.",
    "Focused on real-world usability, performance, and clean project structure.",
  ];
};

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    getProjectById(id)
      .then((data) => {
        setProject(data);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }, [id]);

  if (status === "loading") {
    return (
      <main className="max-w-4xl mx-auto px-5 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-20 text-white">
        <p className="text-gray-300 inline-flex items-center gap-2">
          <Loader2 className="animate-spin" size={16} />
          Loading project...
        </p>
      </main>
    );
  }

  if (status === "error" || !project) {
    return (
      <main className="max-w-4xl mx-auto px-5 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-20 text-white">
        <h1 className="text-3xl font-semibold mb-3 inline-flex items-center gap-2">
          <AlertCircle size={22} />
          Project not found
        </h1>
        <Link to="/projects" className="text-gray-300 hover:text-white">
          ← Back to projects
        </Link>
      </main>
    );
  }

  const profile = getProjectProfile(project);
  const displaySummary =
    profile?.summary || project.longDescription || project.shortDescription;
  const keyPoints = profile?.keyPoints || buildFallbackPoints(project);
  const architecturePoints = profile?.architecture || [];
  const resolvedGithub = project.githubUrl || profile?.links?.githubUrl;
  const resolvedLive = project.liveUrl || profile?.links?.liveUrl;

  return (
    <main className="max-w-[1480px] mx-auto px-5 sm:px-6 xl:px-10 pt-24 sm:pt-32 pb-16 text-white">
      <div className="grid xl:grid-cols-12 gap-5">
        <div className="xl:col-span-8 rounded-3xl border border-white/15 bg-white/[0.05] backdrop-blur-xl p-8 md:p-10 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -left-20 h-60 w-60 bg-cyan-400/10 blur-3xl rounded-full" />
            <div className="absolute -bottom-24 right-0 h-64 w-64 bg-blue-500/10 blur-3xl rounded-full" />
          </div>

          <div className="relative z-10">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to projects
            </Link>

          <div className="mt-6 flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/15 bg-white/10 text-gray-100">
              <Sparkles size={13} />
              Resume Highlight
            </span>
            {project.featured && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-cyan-300/20 bg-cyan-500/10 text-cyan-200">
                Featured
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold mt-5">
            {project.title}
          </h1>

          {profile?.headline && (
            <p className="mt-2 text-cyan-200 text-lg">{profile.headline}</p>
          )}

          <p className="mt-6 text-gray-200 leading-relaxed text-[1.04rem]">
            {displaySummary}
          </p>

          {project.techStack?.length > 0 && (
            <div className="mt-8">
              <h2 className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-3">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {project.techStack.map((tech) => (
                  <div
                    key={tech}
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
            </div>
          )}

            <section className="mt-7 rounded-2xl border border-white/15 bg-white/5 p-5">
              <h3 className="text-lg font-semibold mb-4 inline-flex items-center gap-2">
                <CheckCircle2 size={18} />
                Key Contributions
              </h3>
              <ul className="space-y-3">
                {keyPoints.map((point) => (
                  <li
                    key={point}
                    className="text-sm text-gray-300 leading-relaxed flex gap-2"
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-6 flex flex-wrap gap-3">
              {resolvedGithub && (
                <a
                  href={resolvedGithub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15 text-gray-100"
                >
                  <Github size={16} />
                  View Code
                </a>
              )}
              {resolvedLive && (
                <a
                  href={resolvedLive}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-cyan-300/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-100"
                >
                  <ArrowUpRight size={16} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>

        <aside className="xl:col-span-4 space-y-6">
          {architecturePoints.length > 0 && (
            <section className="rounded-2xl border border-white/15 bg-white/5 p-5">
              <h3 className="text-lg font-semibold mb-4 inline-flex items-center gap-2">
                <Layers3 size={18} />
                Architecture Highlights
              </h3>
              <ul className="space-y-3">
                {architecturePoints.map((point) => (
                  <li
                    key={point}
                    className="text-sm text-gray-300 leading-relaxed flex gap-2"
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-300 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.techStack?.length > 0 && (
            <section className="rounded-2xl border border-white/15 bg-white/5 p-5">
              <h3 className="text-lg font-semibold mb-4">Technology Stack</h3>
              <div className="flex flex-wrap gap-2.5">
                {project.techStack.map((tech) => (
                  <div
                    key={`side-${tech}`}
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
            </section>
          )}

          <section className="rounded-2xl border border-white/15 bg-white/5 p-5">
            <h3 className="text-lg font-semibold mb-3">Project Snapshot</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300 shrink-0" />
                Built as part of your real-world portfolio proof of work.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300 shrink-0" />
                Includes production-style stack and deployment links.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300 shrink-0" />
                Optimized for clear storytelling during interviews and demos.
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </main>
  );
}
