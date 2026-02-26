import React, { useEffect, useMemo, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  Download,
  Gauge,
  Linkedin,
  Mail,
  MapPin,
  MessageSquareText,
  PhoneCall,
  Send,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { getFeaturedProjects, getProjects } from "../api/projects";
import { sendContact } from "../api/api";

const TECH_MARQUEE = [
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
  { name: "Express", slug: "express", color: "FFFFFF" },
  { name: "MongoDB", slug: "mongodb", color: "47A248" },
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
  { name: "Docker", slug: "docker", color: "2496ED" },
  { name: "Postman", slug: "postman", color: "FF6C37" },
];

const PARTICLES = Array.from({ length: 15 }).map((_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  initialX: Math.random() * 100,
  initialY: Math.random() * 100,
  duration: Math.random() * 10 + 10,
  delay: Math.random() * 5,
}));

const TIMELINE_PREVIEW = [
  { date: "Aug 2024", title: "Started independent full-stack delivery" },
  { date: "2024", title: "Shipped INVENZO asset management app" },
  { date: "2024", title: "Built MFA-MERN authentication workflow" },
  { date: "2024-2025", title: "Led plagiSense implementation team" },
];

export default function Home() {
  const resumeUrl = import.meta.env.VITE_RESUME_URL || "/Surya_Panduri_Resume.pdf";
  const linkedInUrl = import.meta.env.VITE_LINKEDIN_URL || "";
  const phoneValue = import.meta.env.VITE_PHONE_NUMBER || "Available on request";
  const profileImageUrl = import.meta.env.VITE_PROFILE_IMAGE_URL || "/profile.jpg";
  const [projects, setProjects] = useState([]);
  const [featuredStatus, setFeaturedStatus] = useState("loading");
  const [quickForm, setQuickForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [quickStatus, setQuickStatus] = useState("");

  // Mouse Tracking for Interactive Effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax for Background
  const bgX = useTransform(smoothX, [-500, 500], [20, -20]);
  const bgY = useTransform(smoothY, [-500, 500], [20, -20]);

  // 3D Tilt for Profile Card
  const rotateX = useTransform(smoothY, [-300, 300], [10, -10]);
  const rotateY = useTransform(smoothX, [-300, 300], [-10, 10]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = clientX - innerWidth / 2;
    const y = clientY - innerHeight / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  useEffect(() => {
    getFeaturedProjects()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
          setFeaturedStatus("success");
          return;
        }
        return getProjects().then((allProjects) => {
          setProjects((allProjects || []).slice(0, 3));
          setFeaturedStatus("success");
        });
      })
      .catch(() =>
        getProjects()
          .then((allProjects) => {
            setProjects((allProjects || []).slice(0, 3));
            setFeaturedStatus("success");
          })
          .catch(() => setFeaturedStatus("error"))
      );
  }, []);

  const metrics = useMemo(() => {
    const totalProjects = projects.length;
    const totalTech = new Set(
      projects.flatMap((project) => project.techStack || [])
    ).size;
    const apiFocused = projects.filter((project) =>
      (project.techStack || []).some((tech) =>
        ["node", "node.js", "express", "mongodb", "mysql"].includes(
          tech.toLowerCase()
        )
      )
    ).length;
    return [
      { label: "Projects Shipped", value: totalProjects || 0, icon: Sparkles },
      { label: "API-Driven Builds", value: apiFocused || 0, icon: Workflow },
      { label: "Tech Used", value: totalTech || 0, icon: Gauge },
      { label: "Uptime Mindset", value: "99.9%", icon: Clock3 },
    ];
  }, [projects]);

  const spotlight = projects[0];
  const submitQuickContact = async (e) => {
    e.preventDefault();
    setQuickStatus("sending");
    try {
      await sendContact(quickForm);
      setQuickStatus("sent");
      setQuickForm({ name: "", email: "", message: "" });
    } catch {
      setQuickStatus("error");
    }
  };

  return (
    <main
      onMouseMove={handleMouseMove}
      className="home-page relative min-h-screen overflow-hidden text-white"
    >
      {/* Dynamic Background Elements */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute inset-0 pointer-events-none opacity-50"
      >
        <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px]" />

        {PARTICLES.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: `${particle.initialX}%`,
              y: `${particle.initialY}%`,
              opacity: 0
            }}
            animate={{
              opacity: [0, 0.4, 0],
              y: [`${particle.initialY}%`, `${particle.initialY - 10}%`]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
            style={{
              width: particle.size,
              height: particle.size,
            }}
            className="absolute bg-white rounded-full blur-[1px]"
          />
        ))}
      </motion.div>

      <section className="relative page-container pt-20 sm:pt-24 pb-8 sm:pb-10">
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative mb-8 sm:fixed sm:top-24 sm:right-8 z-40 inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-bold text-black hover:bg-amber-300 transition w-fit mx-auto sm:mx-0 shadow-xl shadow-amber-400/20 shine-effect"
        >
          <Download size={18} />
          Download CV
        </a>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="relative w-full"
        >
          <div className="w-full">
            <div className="py-4 sm:py-5 md:py-6">
              <div className="grid xl:grid-cols-[minmax(0,1.08fr)_560px] 2xl:grid-cols-[minmax(0,1.04fr)_620px] items-center gap-6 sm:gap-7 xl:gap-8 2xl:gap-12">
                <div className="max-w-5xl xl:max-w-none">
                  <div className="flex flex-wrap items-center justify-start gap-3 sm:gap-4">
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="inline-flex items-center gap-2.5 text-sm sm:text-base text-emerald-400 font-semibold px-4 py-2 rounded-full glass-pill"
                    >
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                      </span>
                      AVAILABLE FOR HIRE
                    </motion.p>
                  </div>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 inline-flex flex-wrap items-center gap-3 text-amber-300 font-semibold uppercase tracking-[0.12em] text-xl sm:text-2xl md:text-[1.7rem]"
                  >
                    Full-Stack MERN Developer
                    <motion.img
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      src="https://cdn.simpleicons.org/react/61DAFB"
                      alt="React logo"
                      className="h-6 w-6 sm:h-7 sm:w-7"
                      loading="lazy"
                    />
                    <motion.img
                      whileHover={{ scale: 1.2, rotate: -10 }}
                      src="https://cdn.simpleicons.org/express/FFFFFF"
                      alt="Express logo"
                      className="h-6 w-6 sm:h-7 sm:w-7"
                      loading="lazy"
                    />
                    <motion.img
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      src="https://cdn.simpleicons.org/nodedotjs/5FA04E"
                      alt="Node.js logo"
                      className="h-6 w-6 sm:h-7 sm:w-7"
                      loading="lazy"
                    />
                    <motion.img
                      whileHover={{ scale: 1.2, rotate: -10 }}
                      src="https://cdn.simpleicons.org/mongodb/47A248"
                      alt="MongoDB logo"
                      className="h-6 w-6 sm:h-7 sm:w-7"
                      loading="lazy"
                    />
                  </motion.p>
                  <p className="mt-5 text-3xl sm:text-4xl md:text-5xl text-gray-100 font-medium leading-none">
                    Hi 👋, I&apos;m
                  </p>
                  <h1 className="mt-2 text-6xl sm:text-7xl md:text-8xl lg:text-[6.4rem] 2xl:text-[7rem] font-semibold tracking-tight leading-[1.01] overflow-hidden">
                    {"Surya Teja Panduri".split(" ").map((word, i) => (
                      <motion.span
                        key={i}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: [0.33, 1, 0.68, 1] }}
                        className="inline-block mr-4 last:mr-0"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </h1>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-5 text-3xl sm:text-4xl md:text-5xl text-gray-100 font-medium max-w-4xl leading-tight"
                  >
                    Engineering secure and scalable web products.
                  </motion.p>
                  <p className="mt-5 text-xl sm:text-2xl md:text-3xl text-gray-300 max-w-3xl leading-relaxed">
                    I build production-focused MERN applications with clean architecture,
                    API-first thinking, and polished UI that stands as real proof of work.
                  </p>

                  <div className="mt-6 border-t border-white/10 pt-5 grid sm:grid-cols-2 gap-x-8 gap-y-3 text-gray-100">
                    <div className="inline-flex items-center gap-3">
                      <Mail size={16} className="text-amber-300" />
                      <span className="text-base sm:text-lg">suryapanduri5121@gmail.com</span>
                    </div>
                    <div className="inline-flex items-center gap-3">
                      <PhoneCall size={16} className="text-amber-300" />
                      <span className="text-base sm:text-lg">{phoneValue}</span>
                    </div>
                    <div className="inline-flex items-center gap-3">
                      <Linkedin size={16} className="text-amber-300" />
                      {linkedInUrl ? (
                        <a
                          href={linkedInUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base sm:text-lg hover:text-amber-200 transition"
                        >
                          {linkedInUrl.replace(/^https?:\/\/(www\.)?/, "")}
                        </a>
                      ) : (
                        <span className="text-base sm:text-lg">LinkedIn profile</span>
                      )}
                    </div>
                    <div className="inline-flex items-center gap-3">
                      <MapPin size={16} className="text-amber-300" />
                      <span className="text-base sm:text-lg">Hyderabad, Telangana, India</span>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row w-full sm:w-auto justify-start gap-4 sm:gap-6">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        to="/projects"
                        className="px-8 sm:px-10 py-4 sm:py-4.5 text-base sm:text-lg rounded-full bg-white text-black hover:bg-gray-100 transition text-center inline-flex items-center justify-center gap-2 font-semibold shadow-lg shadow-white/10 shine-effect"
                      >
                        <ArrowRight size={18} />
                        View Projects
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        to="/contact"
                        className="px-8 sm:px-10 py-4 sm:py-4.5 text-base sm:text-lg rounded-full border border-white/30 hover:bg-white/10 transition text-center inline-flex items-center justify-center gap-2 font-semibold glass-pill shine-effect"
                      >
                        <MessageSquareText size={18} />
                        Contact Me
                      </Link>
                    </motion.div>
                  </div>
                </div>
                <motion.div
                  style={{ rotateX, rotateY, perspective: 1000 }}
                  className="flex justify-center xl:justify-end mt-8 xl:mt-0 xl:pt-2"
                >
                  <div className="relative group">
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.2, 0.3, 0.2]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -inset-8 sm:-inset-10 rounded-full bg-cyan-400/30 blur-3xl"
                    />
                    <div className="relative h-56 w-56 sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80 xl:h-[31rem] xl:w-[31rem] 2xl:h-[34rem] 2xl:w-[34rem] rounded-full p-[6px] xl:p-[7px] bg-gradient-to-br from-cyan-300/75 via-sky-400/45 to-amber-300/75 shadow-[0_24px_75px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-[1.02]">
                      <div className="h-full w-full overflow-hidden rounded-full border border-white/25 bg-slate-900">
                        <img
                          src={profileImageUrl}
                          alt="Surya Teja Panduri"
                          className="h-full w-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-slate-950/70 px-4 py-1.5 text-[11px] tracking-[0.08em] text-gray-200 backdrop-blur-md"
                    >
                      MERN Developer
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="section-padding page-container">
        <div className="grid xl:grid-cols-12 gap-5 md:gap-8 items-stretch">
          <div className="xl:col-span-7 grid sm:grid-cols-2 gap-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/15 bg-white/5 p-4 text-center"
              >
                <p className="inline-flex items-center justify-center gap-2 text-xs text-gray-300 uppercase tracking-[0.12em]">
                  <metric.icon size={14} />
                  {metric.label}
                </p>
                <p className="text-2xl font-semibold mt-2">{metric.value}</p>
              </div>
            ))}
          </div>

          {spotlight && (
            <div className="xl:col-span-5 rounded-3xl border border-cyan-300/20 bg-cyan-500/[0.06] p-6 md:p-8 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">
                Featured Project Spotlight
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold mt-3">
                {spotlight.title}
              </h2>
              <p className="text-gray-200 mt-4 leading-relaxed">
                {spotlight.longDescription || spotlight.shortDescription}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  to={`/projects/${spotlight._id}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15"
                >
                  Read case study
                  <ArrowRight size={14} />
                </Link>
                {spotlight.githubUrl && (
                  <a
                    href={spotlight.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15"
                  >
                    View code
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section-padding page-container relative">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 md:mb-12">
          What I solve
        </h2>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              title: "Performance",
              desc: "Fast-loading experiences with optimized UI rendering and API design.",
              icon: Gauge,
            },
            {
              title: "Security",
              desc: "JWT authentication, role-based access, and clean backend authorization layers.",
              icon: ShieldCheck,
            },
            {
              title: "Scalability",
              desc: "Modular architecture and maintainable codebases designed to grow with product needs.",
              icon: Workflow,
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/15 bg-white/5 p-7 text-center"
            >
              <item.icon size={18} className="text-cyan-200 mx-auto" />
              <h3 className="text-xl font-medium mt-3">{item.title}</h3>
              <p className="text-gray-300 mt-3 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding page-container relative">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 md:mb-12">
          Featured Projects
        </h2>

        {featuredStatus === "loading" && (
          <p className="text-gray-400">Loading featured projects...</p>
        )}
        {featuredStatus === "error" && (
          <p className="text-red-300">
            Failed to load featured projects. Check backend/API connection.
          </p>
        )}
        {featuredStatus === "success" && projects.length === 0 && (
          <p className="text-gray-400">Featured projects coming soon.</p>
        )}

        {featuredStatus === "success" && projects.length > 0 && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-white/15 bg-white/5 p-7 flex flex-col h-full"
              >
                <h3 className="text-2xl font-medium mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-5 leading-relaxed flex-grow">
                  {project.shortDescription}
                </p>
                {project.techStack?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
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
                <div className="flex gap-6 text-sm mt-auto">
                  <Link to={`/projects/${project._id}`} className="font-medium text-cyan-200 hover:text-cyan-100 hover:underline">
                    View case study →
                  </Link>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition flex items-center gap-1.5"
                    >
                      <Linkedin size={14} className="opacity-70" />
                      GitHub
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <section className="section-padding page-container">
        <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-6 md:p-8">
          <div className="flex gap-7 animate-[marquee_24s_linear_infinite] w-max">
            {[...TECH_MARQUEE, ...TECH_MARQUEE].map((tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 border border-white/10"
              >
                <img
                  src={`https://cdn.simpleicons.org/${tech.slug}/${tech.color}`}
                  alt={`${tech.name} logo`}
                  className="h-4 w-4"
                  loading="lazy"
                />
                <span className="text-sm text-gray-200">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding page-container">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 md:mb-12">
          Experience Timeline Preview
        </h2>
        <div className="grid md:grid-cols-4 gap-4 md:gap-6">
          {TIMELINE_PREVIEW.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/15 bg-white/5 p-4"
            >
              <p className="text-xs text-cyan-200 uppercase tracking-[0.12em]">
                {item.date}
              </p>
              <p className="text-sm text-gray-200 mt-2">{item.title}</p>
            </div>
          ))}
        </div>
        <Link
          to="/about"
          className="inline-flex items-center gap-2 mt-5 text-sm text-cyan-200 hover:text-cyan-100"
        >
          View full timeline
          <ArrowRight size={14} />
        </Link>
      </section>

      <section className="section-padding page-container">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <article className="rounded-3xl border border-white/15 bg-white/5 p-6">
            <h3 className="text-xl font-semibold inline-flex items-center gap-2">
              <BadgeCheck size={18} />
              Code Quality
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li>Modular component patterns and reusable API layers</li>
              <li>Consistent error handling and backend validation</li>
              <li>Readable, maintainable project structure for scale</li>
            </ul>
          </article>

          <article className="rounded-3xl border border-white/15 bg-white/5 p-6">
            <h3 className="text-xl font-semibold inline-flex items-center gap-2">
              <Workflow size={18} />
              Deployment & DevOps
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Vercel",
                "Render",
                "MongoDB Atlas",
                "Docker (Learning & Practice)",
                "CI/CD Basics",
              ].map((item) => (
                <span
                  key={item}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-gray-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section-padding page-container">
        <div className="rounded-3xl border border-white/15 bg-white/5 p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-semibold">Testimonials & Feedback</h3>
          <p className="mt-4 text-gray-300 text-lg">
            Recommendations from collaborators and reviewers will be added here
            as I continue shipping production projects.
          </p>
        </div>
      </section>

      <section className="pb-24 sm:pb-32 px-5 sm:px-6">
        <div className="page-container grid lg:grid-cols-2 gap-6 md:gap-8">
          <div className="rounded-3xl border border-cyan-300/20 bg-cyan-500/[0.08] p-6 md:p-8">
            <h3 className="text-2xl font-semibold">Ready to collaborate?</h3>
            <p className="mt-3 text-gray-200 leading-relaxed">
              Open to full-stack developer roles, freelance builds, and product
              collaboration opportunities.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/Surya_Panduri_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20"
              >
                View Resume
              </a>
              <Link
                to="/contact"
                className="px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20"
              >
                Book a Call
              </Link>
              <a
                href="https://github.com/SuryaPanduri"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20"
              >
                GitHub
              </a>
            </div>
          </div>

          <form
            onSubmit={submitQuickContact}
            className="rounded-3xl border border-white/15 bg-white/5 p-6 md:p-8"
          >
            <h3 className="text-2xl font-semibold inline-flex items-center gap-2">
              <MessageSquareText size={20} />
              Quick Message
            </h3>
            <div className="mt-4 space-y-3">
              <input
                required
                value={quickForm.name}
                onChange={(e) =>
                  setQuickForm((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 outline-none focus:ring-2 focus:ring-cyan-400/20"
              />
              <input
                required
                type="email"
                value={quickForm.email}
                onChange={(e) =>
                  setQuickForm((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="Your email"
                className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 outline-none focus:ring-2 focus:ring-cyan-400/20"
              />
              <textarea
                required
                value={quickForm.message}
                onChange={(e) =>
                  setQuickForm((prev) => ({ ...prev, message: e.target.value }))
                }
                placeholder="Write a short note..."
                className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 outline-none focus:ring-2 focus:ring-cyan-400/20 min-h-[120px]"
              />
              <button
                type="submit"
                disabled={quickStatus === "sending"}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-cyan-300/30 bg-cyan-500/15 hover:bg-cyan-500/25 disabled:opacity-70"
              >
                <Send size={15} />
                {quickStatus === "sending" ? "Sending..." : "Send"}
              </button>
              {quickStatus === "sent" && (
                <p className="text-green-300 text-sm">
                  Message sent. I&apos;ll get back to you soon.
                </p>
              )}
              {quickStatus === "error" && (
                <p className="text-red-300 text-sm">Could not send message.</p>
              )}
            </div>
          </form>
        </div>
      </section>
    </main >
  );
}
