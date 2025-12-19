import React, { useEffect, useState } from "react";
import { motion, useTransform } from "framer-motion";

export default function ProjectSlides({ scrollYProgress }) {
  const index = useTransform(scrollYProgress, [0.5, 0.9], [0, 2]);

  const projects = [
    {
      title: "INVENZO",
      desc: "Asset Management System with RBAC & JWT",
    },
    {
      title: "Portfolio Website",
      desc: "Apple-inspired UI with smooth motion",
    },
    {
      title: "MERN Applications",
      desc: "Full-stack apps with MongoDB & Express",
    },
  ];

  return (
    <motion.div
      style={{ y: index }}
      className="space-y-10"
    >
      {projects.map((p, i) => (
        <div key={i}>
          <h3 className="text-3xl font-semibold">{p.title}</h3>
          <p className="text-gray-400 mt-2">{p.desc}</p>
        </div>
      ))}
    </motion.div>
  );
}