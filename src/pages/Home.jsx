import { lazy, Suspense } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import { Card, Eyebrow } from "../components/Card.jsx";
import TimeCard from "../components/TimeCard.jsx";
import NowCard from "../components/NowCard.jsx";
import { profile, socials } from "../data.js";
import avatar from "../assets/avatar.png";

const RubiksCube = lazy(() => import("../components/RubiksCube.jsx"));

function Hero() {
  return (
    <Card className="md:col-span-4">
      <Eyebrow>welcome</Eyebrow>
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="relative w-fit">
            <span aria-hidden="true" className="absolute -left-4 -top-2 h-1 w-1 animate-pulse rounded-full bg-accent-soft" />
            <span aria-hidden="true" className="absolute -right-5 top-1 h-1.5 w-1.5 animate-ping rounded-full bg-accent-soft/70 [animation-duration:3s]" />
            <span aria-hidden="true" className="absolute -bottom-1 right-10 h-1 w-1 animate-pulse rounded-full bg-ink/50 [animation-duration:2.2s]" />
            <h1
              className="font-display text-3xl font-bold leading-snug tracking-tight sm:text-4xl"
              style={{ textShadow: "0 0 26px rgba(207,61,71,0.5), 0 8px 30px rgba(0,0,0,0.7)" }}
            >
              {profile.name}
            </h1>
          </div>
          <p className="mt-2 font-serif text-lg italic text-accent-soft">{profile.role}</p>
          <p className="mt-5 max-w-none text-[17px] leading-relaxed text-ink/90">{profile.intro}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="glow-accent rounded-full bg-accent px-6 py-2.5 text-base font-medium text-[#f4eded] transition hover:bg-accent-soft"
            >
              View resume
            </a>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="btn-anim-border rounded-full px-5 py-2.5 text-base text-muted transition hover:text-ink"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-4 sm:items-end">
          <img
            src={avatar}
            alt="Pixel-art avatar of Yuvraj Gupta"
            className="h-36 w-36 rounded-2xl border border-line object-cover sm:h-44 sm:w-44"
          />
          <p className="flex items-center gap-2 font-mono text-xs text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {profile.availability}
          </p>
        </div>
      </div>
    </Card>
  );
}


function TileDecoration({ page }) {
  if (page === "/about") {
    // rotating cube wireframe with sticker-colored faces
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="anim-spin-slow pointer-events-none absolute -right-7 -top-7 h-32 w-32 opacity-40"
      >
        <g fill="none" strokeWidth="2.5" strokeLinecap="round">
          <polygon points="50,14 81,32 81,68 50,86 19,68 19,32" stroke="#cf3d47" />
          <path d="M50,50 L50,14" stroke="#2e9e4f" />
          <path d="M50,50 L81,68" stroke="#f2c11e" />
          <path d="M50,50 L19,68" stroke="#3b82f6" />
        </g>
      </svg>
    );
  }
  if (page === "/projects") {
    // two drifting stripe fields: crimson + emerald, crossing angles
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="anim-drift absolute -inset-16 opacity-[0.16]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #cf3d47 0 3px, transparent 3px 26px)",
          }}
        />
        <div
          className="anim-drift absolute -inset-16 opacity-[0.14] [animation-duration:11s]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, #2e9e4f 0 3px, transparent 3px 30px)",
          }}
        />
      </div>
    );
  }
  if (page === "/contact") {
    // radiating two-tone signal rings
    return (
      <div aria-hidden="true" className="pointer-events-none absolute right-1 top-1 h-24 w-24 opacity-80">
        <span className="anim-ring absolute inset-0 rounded-full border-[3px] border-accent-soft" />
        <span className="anim-ring-2 absolute inset-0 rounded-full border-[3px] border-[#2e9e4f]" />
        <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-[#f2c11e]" />
      </div>
    );
  }
  return null;
}

const tiles = [
  { to: "/", label: "Home", here: true },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

function NavTiles() {
  return (
    <nav aria-label="Site pages" className="grid grid-cols-2 gap-4 md:col-span-4 md:grid-cols-4">
      {tiles.map((t, i) => (
        <Card key={t.to} delay={0.04 * i} className="relative !p-0 overflow-hidden">
          {t.here ? (
            <div className="relative flex h-full min-h-[110px] flex-col justify-between overflow-hidden p-6 sm:p-7">
              <div
                aria-hidden="true"
                className="anim-gradient absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, #b0262f 0%, #14532d 35%, #b0262f 70%, #6b1d22 100%)",
                }}
              />
              <span className="relative font-serif text-base italic text-accent-soft">
                you're here ✦
              </span>
              <span className="anim-gradient relative bg-gradient-to-r from-[#cf3d47] via-[#f2c11e] to-[#2e9e4f] bg-clip-text font-display text-2xl font-extrabold tracking-tight text-transparent sm:text-3xl">
                {t.label}
              </span>
            </div>
          ) : (
            <Link
              to={t.to}
              className="group relative flex h-full min-h-[110px] flex-col justify-between p-6 transition hover:bg-card-hover sm:p-7"
            >
              <TileDecoration page={t.to} />
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-[2px] bg-accent"
              />
              <span className="font-display text-xl font-semibold text-ink sm:text-2xl">
                {t.label}
                <span
                  aria-hidden="true"
                  className="ml-2 inline-block text-muted transition group-hover:translate-x-1 group-hover:text-accent"
                >
                  →
                </span>
              </span>
            </Link>
          )}
        </Card>
      ))}
    </nav>
  );
}

function CubeCard() {
  return (
    <Card className="relative min-h-[380px] overflow-hidden !p-0 md:col-span-2" delay={0.1}>
      <div className="pointer-events-none absolute left-7 top-7 z-10 sm:left-9 sm:top-9">
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
          <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-[2px] bg-accent" />
          off the clock
        </p>
        <p className="mt-1 max-w-[250px] text-base text-muted">
          I solve these. Scramble it, then bring it back one move at a time.
        </p>
      </div>
      <Suspense fallback={<div className="min-h-[380px]" />}>
        <RubiksCube />
      </Suspense>
    </Card>
  );
}

export default function Home() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Hero />
      <NavTiles />
      <CubeCard />
      <TimeCard delay={0.14} />
      <NowCard delay={0.18} />
    </div>
  );
}
