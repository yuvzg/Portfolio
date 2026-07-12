import { useEffect, useState } from "react";
import { Card, Eyebrow } from "./Card.jsx";
import { profile } from "../data.js";

function fmt(date, tz) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: tz,
  }).format(date);
}

export default function TimeCard({ delay = 0 }) {
  const [t, setT] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const visitorTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <Card className="relative overflow-hidden md:col-span-1" delay={delay}>
      <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 opacity-[0.22]">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <circle cx="50" cy="50" r="46" fill="none" stroke="#cf3d47" strokeWidth="2.5" />
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i * Math.PI) / 6;
            return (
              <line
                key={i}
                x1={50 + 40 * Math.sin(a)}
                y1={50 - 40 * Math.cos(a)}
                x2={50 + 46 * Math.sin(a)}
                y2={50 - 46 * Math.cos(a)}
                stroke={i % 3 === 0 ? "#f2c11e" : "#2e9e4f"}
                strokeWidth="2.5"
              />
            );
          })}
          <g className="anim-spin-slow" style={{ transformOrigin: "50px 50px" }}>
            <line x1="50" y1="50" x2="50" y2="16" stroke="#f2c11e" strokeWidth="3" strokeLinecap="round" />
            <circle cx="50" cy="50" r="3" fill="#cf3d47" />
          </g>
        </svg>
      </div>
      <Eyebrow>timezones</Eyebrow>
      <div className="relative space-y-5">
        <div>
          <p className="font-mono text-xs text-muted">my time</p>
          <p className="font-mono text-3xl tabular-nums text-ink">{fmt(t, profile.timezone)}</p>
          <p className="font-mono text-xs text-muted">{profile.timezoneLabel}</p>
        </div>
        <div className="h-px bg-line" />
        <div>
          <p className="font-mono text-xs text-muted">your time</p>
          <p className="font-mono text-3xl tabular-nums text-ink">{fmt(t, visitorTz)}</p>
          <p className="font-mono text-xs text-muted">{visitorTz}</p>
        </div>
      </div>
    </Card>
  );
}
