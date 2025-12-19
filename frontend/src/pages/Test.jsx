import React from "react";
import { motion } from "framer-motion";

export default function Test() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold text-white"
      >
        Motion is working 🚀
      </motion.div>
    </div>
  );
}