import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Building2,
  CalendarRange,
  CheckCircle2,
  Briefcase,
  Code2,
  Globe2,
  GraduationCap,
  Languages,
  Music2,
  ShieldCheck,
  Rocket,
  Trophy,
} from "lucide-react";

export default function About() {
  const resumeUrl = import.meta.env.VITE_RESUME_URL || "/Surya_Panduri_Resume.pdf";
  const highlights = [
    "1+ year hands-on full-stack development experience",
    "MERN stack architecture and production-oriented APIs",
    "Cloud deployment workflows with Vercel and Render",
    "Authentication, RBAC, and real-world project delivery",
  ];
  const skillCategories = [
    {
      name: "Frontend",
      skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      name: "Backend",
      skills: ["Node.js", "Express.js", "MongoDB", "MySQL", "PostgreSQL", "REST APIs", "JWT"],
    },
    {
      name: "Others",
      skills: ["Git/GitHub"],
    },
  ];

  const timeline = [
    {
      id: "freelance",
      title: "Independent MERN Projects",
      role: "Full Stack Developer (MERN Stack)",
      org: "Freelance / Independent",
      period: "Aug 2024 - Present",
      overview:
        "Built and delivered full-stack products focused on authentication, scalable APIs, and production deployments.",
      details: [
        "Designed modular APIs with secure auth flows (JWT, RBAC, MFA).",
        "Built responsive React interfaces with reusable components and role-based UX.",
        "Deployed live apps using Vercel and Render with cloud-hosted databases.",
      ],
    },
    {
      id: "invenzo",
      title: "INVENZO Milestone",
      role: "Project I - Asset Tracking & Management",
      org: "Product Implementation",
      period: "2024",
      overview:
        "Developed an asset lifecycle platform for inventory, checkouts, and operational role governance.",
      details: [
        "Implemented JWT auth with Admin, Manager, and Viewer access levels.",
        "Built CRUD flows for assets, users, and checkout records.",
        "Delivered role-driven dashboard behavior for secure operations.",
      ],
    },
    {
      id: "mfa",
      title: "MFA-MERN Milestone",
      role: "Project II - Multi-Factor Authentication",
      org: "Security-Focused Implementation",
      period: "2024",
      overview:
        "Built a secure authentication workflow using MERN, OTP verification, and session-aware route control.",
      details: [
        "Implemented OTP generation, resend, and expiration handling.",
        "Integrated SMTP-based email delivery for one-time passwords.",
        "Split deployment across Vercel (frontend) and Render (backend).",
      ],
    },
    {
      id: "plagisense",
      title: "plagiSense Milestone",
      role: "Project III - Plagiarism Detection System",
      org: "Team Project Lead (5 members)",
      period: "2024-2025",
      overview:
        "Led implementation of a text and image plagiarism platform with interpretable similarity reports.",
      details: [
        "Applied LCS and FMM algorithms for similarity scoring.",
        "Built dashboard and reporting experiences with React + Material UI.",
        "Implemented JWT-based secure backend with MongoDB persistence.",
      ],
    },
  ];
  const [selectedMilestone, setSelectedMilestone] = useState(timeline[0].id);
  const activeMilestone =
    timeline.find((item) => item.id === selectedMilestone) || timeline[0];
  const activeIndex = timeline.findIndex((item) => item.id === selectedMilestone);
  const railRef = useRef(null);
  const nodeRefs = useRef([]);
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      const rail = railRef.current;
      const activeNode = nodeRefs.current[activeIndex];
      if (!rail || !activeNode) return;

      const railRect = rail.getBoundingClientRect();
      const nodeRect = activeNode.getBoundingClientRect();
      const target = nodeRect.left - railRect.left + nodeRect.width / 2;
      const clamped = Math.max(0, Math.min(target, railRect.width));
      setProgressWidth(clamped);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeIndex, timeline.length]);
  const skillLogos = {
    "React.js": "https://cdn.simpleicons.org/react/61DAFB",
    "Next.js": "https://cdn.simpleicons.org/nextdotjs/FFFFFF",
    "Node.js": "https://cdn.simpleicons.org/nodedotjs/5FA04E",
    "Express.js": "https://cdn.simpleicons.org/express/FFFFFF",
    MongoDB: "https://cdn.simpleicons.org/mongodb/47A248",
    MySQL: "https://cdn.simpleicons.org/mysql/4479A1",
    PostgreSQL: "https://cdn.simpleicons.org/postgresql/4169E1",
    TypeScript: "https://cdn.simpleicons.org/typescript/3178C6",
    "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss/06B6D4",
    "REST APIs": "https://cdn.simpleicons.org/openapiinitiative/6BA539",
    JWT: "https://cdn.simpleicons.org/jsonwebtokens/F5F5F5",
    "Git/GitHub": "https://cdn.simpleicons.org/github/F5F5F5",
  };
  const container = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, staggerChildren: 0.08 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  return (
    <main className="page-container section-padding pt-32 sm:pt-40 text-white">
      <motion.section
        variants={container}
        initial="hidden"
        animate="visible"
        className="rounded-3xl border border-white/15 bg-white/[0.05] backdrop-blur-xl p-8 md:p-12"
      >
        <div className="grid xl:grid-cols-12 gap-6">
          <motion.div variants={item} className="xl:col-span-7">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-cyan-200">
              <Rocket size={14} />
              About Me
            </p>
            <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
              Surya Teja Panduri
            </h1>
            <p className="mt-2 text-gray-300">
              Full Stack Developer (MERN) • Hyderabad, Telangana
            </p>

            <p className="mt-6 text-gray-200 leading-relaxed">
              To join a dynamic tech team as a MERN stack developer, leveraging
              technical skills and problem-solving ability to build impactful
              products while continuously strengthening expertise in modern web
              technologies.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <motion.a
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-cyan-300/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-100"
              >
                <Trophy size={16} />
                View Resume
                <ArrowUpRight size={15} />
              </motion.a>
              <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15 text-gray-100"
                >
                  <Code2 size={16} />
                  View Projects
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15 text-gray-100"
                >
                  <Briefcase size={16} />
                  Contact Me
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            whileHover={{ y: -3 }}
            className="xl:col-span-5 rounded-2xl border border-white/15 bg-white/5 p-5"
          >
            <h2 className="text-lg font-semibold inline-flex items-center gap-2">
              <Briefcase size={18} />
              Experience Snapshot
            </h2>
            <ul className="mt-4 space-y-3">
              {highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="text-sm text-gray-300 leading-relaxed flex gap-2"
                >
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300 shrink-0" />
                  {highlight}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        variants={container}
        initial="hidden"
        animate="visible"
        className="mt-8 grid xl:grid-cols-12 gap-6 md:gap-8"
      >
        <motion.article
          variants={item}
          whileHover={{ y: -3 }}
          className="xl:col-span-12 rounded-2xl border border-white/15 bg-white/[0.05] p-6"
        >
          <h3 className="text-lg font-semibold inline-flex items-center gap-2 mb-6">
            <Code2 size={18} />
            Technical Expertise
          </h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {skillCategories.map((cat) => (
              <div key={cat.name}>
                <p className="text-xs uppercase tracking-widest text-cyan-200 mb-3 ml-1">{cat.name}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ y: -2, scale: 1.03 }}
                      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-gray-100"
                    >
                      {skillLogos[skill] ? (
                        <img
                          src={skillLogos[skill]}
                          alt={`${skill} logo`}
                          className="h-[13px] w-[13px] shrink-0"
                          loading="lazy"
                        />
                      ) : (
                        <ShieldCheck size={13} />
                      )}
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.article>

        <motion.article
          variants={item}
          whileHover={{ y: -3 }}
          className="xl:col-span-6 rounded-2xl border border-white/15 bg-white/[0.05] p-6 flex flex-col justify-center"
        >
          <h3 className="text-lg font-semibold inline-flex items-center gap-2">
            <GraduationCap size={18} />
            Education
          </h3>
          <p className="mt-4 text-gray-200 font-medium">SRKR Engineering College</p>
          <p className="text-sm text-gray-300 mt-1">
            Information Technology • Bhimavaram, Andhra Pradesh
          </p>
          <p className="text-sm text-gray-400 mt-2">Graduated: May 2023</p>
        </motion.article>

        <motion.article
          variants={item}
          whileHover={{ y: -3 }}
          className="xl:col-span-6 rounded-2xl border border-white/15 bg-white/[0.05] p-6 flex flex-row flex-wrap gap-8"
        >
          <div>
            <h3 className="text-lg font-semibold inline-flex items-center gap-2">
              <Languages size={18} />
              Languages
            </h3>
            <p className="text-sm text-gray-300 mt-2">Telugu, Hindi, English</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold inline-flex items-center gap-2">
              <Music2 size={18} />
              Interests
            </h3>
            <p className="text-sm text-gray-300 mt-2">
              Listening to Music, Badminton
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold inline-flex items-center gap-2">
              <Globe2 size={18} />
              Nationality
            </h3>
            <p className="text-sm text-gray-300 mt-2">Indian</p>
          </div>
        </motion.article>
      </motion.section>

      <motion.section
        variants={container}
        initial="hidden"
        animate="visible"
        className="mt-8 rounded-3xl border border-white/15 bg-white/[0.05] p-6 md:p-12"
      >
        <motion.div variants={item}>
          <h3 className="text-lg font-semibold inline-flex items-center gap-2">
            <CalendarRange size={18} />
            Experience Timeline
          </h3>
          <p className="mt-2 text-sm text-gray-300">
            Select a milestone to view detailed responsibilities and outcomes.
          </p>
        </motion.div>

        {/* Desktop Timeline (Horizontal) */}
        <motion.div variants={item} className="mt-8 hidden md:block">
          <div className="relative pt-4">
            <div
              ref={railRef}
              className="absolute left-0 right-0 top-4 h-px bg-white/15 overflow-hidden"
            />
            <motion.div
              className="absolute left-0 top-4 h-px bg-gradient-to-r from-cyan-300 to-blue-400"
              initial={{ width: 0 }}
              animate={{ width: progressWidth }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
            <div className="grid md:grid-cols-4 gap-3 items-start">
              {timeline.map((milestone, index) => {
                const active = milestone.id === selectedMilestone;
                return (
                  <div key={milestone.id} className="flex flex-col items-center">
                    <span
                      ref={(el) => {
                        nodeRefs.current[index] = el;
                      }}
                      className={`relative z-10 h-3.5 w-3.5 rounded-full border-2 transition-all duration-300 ${active
                        ? "bg-cyan-300 border-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.5)]"
                        : "bg-slate-700 border-slate-500"
                        }`}
                    />
                    <button
                      onClick={() => setSelectedMilestone(milestone.id)}
                      className={`w-full max-w-full text-center rounded-xl border px-4 py-3 transition mt-4 ${active
                        ? "border-cyan-300/40 bg-cyan-500/10 shadow-lg"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                        }`}
                    >
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-none mb-1.5">
                        {milestone.period}
                      </p>
                      <p className="text-xs font-semibold text-gray-100 leading-tight">
                        {milestone.title}
                      </p>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Mobile Timeline (Vertical) */}
        <motion.div variants={item} className="mt-6 md:hidden space-y-3">
          {timeline.map((milestone) => {
            const active = milestone.id === selectedMilestone;
            return (
              <button
                key={milestone.id}
                onClick={() => setSelectedMilestone(milestone.id)}
                className={`w-full text-left rounded-2xl border p-4 transition-all duration-300 ${active
                  ? "border-cyan-300/40 bg-cyan-500/10"
                  : "border-white/10 bg-white/5"
                  }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">{milestone.period}</p>
                  {active && <div className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />}
                </div>
                <p className={`text-sm font-semibold ${active ? 'text-white' : 'text-gray-300'}`}>
                  {milestone.title}
                </p>
              </button>
            );
          })}
        </motion.div>

        <motion.article
          key={activeMilestone.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8 rounded-2xl border border-cyan-300/20 bg-cyan-500/[0.06] p-5 md:p-8"
        >
          <div className="flex flex-wrap items-center gap-4">
            <h4 className="text-xl md:text-2xl font-bold text-white">{activeMilestone.role}</h4>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-gray-200 inline-flex items-center gap-1.5">
                <Building2 size={13} />
                {activeMilestone.org}
              </span>
              <span className="text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-gray-200 inline-flex items-center gap-1.5">
                <CalendarRange size={13} />
                {activeMilestone.period}
              </span>
            </div>
          </div>

          <p className="mt-5 text-base text-gray-200 leading-relaxed max-w-4xl">
            {activeMilestone.overview}
          </p>

          <div className="mt-6 space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200 font-semibold mb-3">Key Outcomes</p>
            <ul className="grid sm:grid-cols-2 gap-4">
              {activeMilestone.details.map((point) => (
                <li
                  key={point}
                  className="text-sm text-gray-300 leading-relaxed flex gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]"
                >
                  <CheckCircle2 size={16} className="mt-0.5 text-cyan-400 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </motion.article>
      </motion.section>
    </main>
  );
}
