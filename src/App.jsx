import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import PageTransition from "./components/PageTransition.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import Contact from "./pages/Contact.jsx";
import { profile } from "./data.js";

function NotFound() {
  return (
    <div className="py-24 text-center">
      <p className="font-mono text-xs text-accent">404</p>
      <h1 className="mt-2 font-display text-2xl font-semibold">Nothing here.</h1>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-8 sm:py-14">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </AnimatePresence>
        <footer className="mt-12 flex items-center justify-between font-mono text-xs text-muted">
          <span>© {new Date().getFullYear()} · {profile.name}</span>
          <span>React · Vite · Tailwind · Motion · Three.js</span>
        </footer>
      </main>
    </div>
  );
}
