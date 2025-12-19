import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          flex items-center gap-12
          px-10 py-4
          rounded-full
          bg-white/12 backdrop-blur-2xl
          border border-white/25
          shadow-[0_20px_60px_rgba(0,0,0,0.35)]
        "
      >
        {["Home", "Projects", "About", "Contact"].map((item) => (
          <motion.div
            key={item}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <NavLink
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={({ isActive }) =>
                `
                text-base md:text-lg font-medium tracking-wide
                transition-colors duration-200
                ${
                  isActive
                    ? "text-white"
                    : "text-white/75 hover:text-white"
                }
              `
              }
            >
              {item}
            </NavLink>
          </motion.div>
        ))}
      </motion.nav>
    </header>
  );
}