import React from "react";

export default function About() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">About Me</h1>

      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        View Resume
      </a>
    </div>
  );
}