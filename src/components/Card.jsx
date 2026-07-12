import { motion } from "motion/react";

export function Card({ children, className = "", delay = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.6, 0.35, 1] }}
      className={`rounded-2xl border border-line bg-card p-7 sm:p-9 ${className}`}
    >
      {children}
    </motion.section>
  );
}

export function Eyebrow({ children }) {
  return (
    <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
      <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-[2px] bg-accent" />
      {children}
    </p>
  );
}
