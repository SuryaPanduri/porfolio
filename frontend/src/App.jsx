import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MacbookScroll from "./components/MacbookScroll";

function App() {
  return (
    <>
      {/* ✅ NAVBAR */}
      <Header />

      {/* Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/MacbookScroll" element={<MacbookScroll />} />
      </Routes>
    </>
  );
}

export default App;