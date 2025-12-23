import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const location = useLocation();
  const [hovered, setHovered] = useState(null);
  const navRef = useRef(null);

  /* =========================
     SCROLL-BASED GLASS DENSITY
  ========================= */
  useEffect(() => {
    const onScroll = () => {
      const alpha = Math.min(0.32, 0.22 + window.scrollY / 3000);
      navRef.current?.style.setProperty("--glass-alpha", alpha.toString());
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* =========================
     MOUSE REFRACTION
  ========================= */
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const move = (e) => {
      const r = nav.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;

      nav.style.backgroundPosition = `${50 + (x - 0.5) * 6}% ${50 + (y - 0.5) * 6}%`;
    };

    nav.addEventListener("mousemove", move);
    nav.addEventListener("mouseleave", () => {
      nav.style.backgroundPosition = "50% 50%";
    });

    return () => nav.removeEventListener("mousemove", move);
  }, []);

  return (
    <nav ref={navRef} className="apple-navbar">
      {navItems.map((item) => {
        const active = location.pathname === item.path;
        const visible = active || hovered === item.path;

        return (
          <NavLink
            key={item.name}
            to={item.path}
            onMouseEnter={() => setHovered(item.path)}
            onMouseLeave={() => setHovered(null)}
            className="apple-nav-item"
          >
            {visible && (
              <motion.div
                layoutId="apple-liquid"
                transition={{
                  type: "spring",
                  stiffness: 90,
                  damping: 26,
                  mass: 1.6,
                }}
                className="apple-liquid"
              />
            )}

            <span
              className={`
                relative z-10 px-7 py-2 text-[14px] font-medium
                transition-all duration-300
                ${visible ? "text-white" : "text-white/85"}
              `}
              style={{
                textShadow: visible
                  ? "0 2px 4px rgba(0,0,0,0.6), 0 0 6px rgba(255,255,255,0.25)"
                  : "0 1px 2px rgba(0,0,0,0.5)",
              }}
            >
              {item.name}
            </span>
          </NavLink>
        );
      })}
    </nav>
  );
}