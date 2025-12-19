import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-6 text-center text-sm text-gray-400">
      © {new Date().getFullYear()} Surya Panduri · Built with React & Node
    </footer>
  );
}