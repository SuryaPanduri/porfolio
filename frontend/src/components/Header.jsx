import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const location = useLocation();
  const [hovered, setHovered] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navRef = useRef(null);
  const frameRef = useRef(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5 });
  const { scrollY } = useScroll();

  // Apple's signature snappy, weighted spring physics
  const smoothScroll = useSpring(scrollY, { stiffness: 400, damping: 40, mass: 0.8 });

  // Trigger the transformation immediately over the first 60px of vertical scroll
  const scrollRange = [0, 60];

  const navY = useTransform(smoothScroll, scrollRange, [0, -8]);
  const navScale = useTransform(smoothScroll, scrollRange, [1, 0.96]);

  const navBorderAlpha = useTransform(smoothScroll, scrollRange, [0.08, 0.3]);
  const navShadowAlpha = useTransform(smoothScroll, scrollRange, [0.0, 0.25]);
  const navGlassAlpha = useTransform(smoothScroll, scrollRange, [0.05, 0.45]);
  const navBlurRaw = useTransform(smoothScroll, scrollRange, [8, 28]);

  const navBorderValue = useMotionTemplate`rgba(255, 255, 255, ${navBorderAlpha})`;
  const navShadowValue = useMotionTemplate`0 14px 44px rgba(0, 0, 0, ${navShadowAlpha})`;
  const navGlassValue = useMotionTemplate`${navGlassAlpha}`;
  const navBlurValue = useMotionTemplate`${navBlurRaw}px`;

  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest < previous && latest > 50) {
      setIsScrollingUp(true);
    } else {
      setIsScrollingUp(false);
    }
  });

  /* =========================
     MOUSE REFRACTION
  ========================= */
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const tick = () => {
      nav.style.setProperty("--mx", `${pointerRef.current.x * 100}%`);
      nav.style.setProperty("--my", `${pointerRef.current.y * 100}%`);
      frameRef.current = null;
    };

    const move = (e) => {
      const r = nav.getBoundingClientRect();
      pointerRef.current.x = (e.clientX - r.left) / r.width;
      pointerRef.current.y = (e.clientY - r.top) / r.height;
      if (!frameRef.current) frameRef.current = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      nav.style.setProperty("--mx", "50%");
      nav.style.setProperty("--my", "50%");
    };

    nav.addEventListener("mousemove", move);
    nav.addEventListener("mouseleave", onLeave);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      nav.removeEventListener("mousemove", move);
      nav.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Handle window resize for reactivity
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close menu on navigation for mobile
  useEffect(() => {
    if (windowWidth <= 768) setIsOpen(false);
  }, [location.pathname, windowWidth]);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-[60] p-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white md:hidden"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence>
        {(isOpen || windowWidth > 768) && (
          <motion.nav
            ref={navRef}
            initial={windowWidth <= 768 ? { opacity: 0, scale: 0.9, y: -20, x: "-50%" } : { opacity: 0, x: "-50%" }}
            animate={windowWidth <= 768 ? { opacity: 1, y: 0, x: "-50%", scale: 1 } : { opacity: 1, x: "-50%" }}
            exit={windowWidth <= 768 ? { opacity: 0, scale: 0.9, y: -20, x: "-50%" } : { opacity: 0, x: "-50%" }}
            style={{
              y: windowWidth <= 768 ? 0 : navY,
              scale: windowWidth <= 768 ? 1 : navScale,
              "--nav-border-color": navBorderValue,
              "--nav-shadow": navShadowValue,
              "--nav-glass-a": navGlassValue,
              "--nav-blur": navBlurValue,
              background: isScrollingUp ? "rgba(15, 23, 42, 0.85)" : undefined,
              willChange: "transform, background",
            }}
            className={`apple-navbar ${isOpen ? "mobile-open" : ""}`}
          >
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              const visible = active || hovered === item.path;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => {
                    if (windowWidth <= 768) setIsOpen(false);
                  }}
                  onMouseEnter={() => setHovered(item.path)}
                  onMouseLeave={() => setHovered(null)}
                  className="apple-nav-item"
                >
                  {visible && (
                    <motion.div
                      layoutId="apple-liquid"
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 40,
                        mass: 0.8,
                      }}
                      className="apple-liquid"
                    />
                  )}

                  <span
                    className={`
                      relative z-10 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 text-[12px] sm:text-[13px] md:text-[14px] font-medium
                      transition-all duration-300
                      ${visible ? "text-white" : "text-white/70"}
                    `}
                    style={{
                      textShadow: visible
                        ? "0 2px 4px rgba(0,0,0,0.6), 0 0 12px rgba(255,255,255,0.3)"
                        : "0 1px 2px rgba(0,0,0,0.5)",
                    }}
                  >
                    {item.name}
                  </span>
                </NavLink>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
