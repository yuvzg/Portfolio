import { Card, Eyebrow } from "../components/Card.jsx";
import BackHome from "../components/BackHome.jsx";
import MarqueeRow from "../components/Marquee.jsx";
import { profile, stack } from "../data.js";

export default function About() {
  const half = Math.ceil(stack.length / 2);
  return (
    <div>
    <BackHome />
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="md:col-span-2">
        <Eyebrow>about me</Eyebrow>
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">
          Engineer in training,
          <span className="font-serif italic text-accent-soft"> shipping while learning.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/90">
          {profile.about}
        </p>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          {profile.beyond}
        </p>
      </Card>
      <Card delay={0.08}>
        <Eyebrow>focus areas</Eyebrow>
        <ul className="space-y-4">
          {[
            ["Data structures & algorithms", "Daily problem-solving practice, interview-style, in C++ and Python."],
            ["Frontend engineering", "React, Vite and Tailwind — small apps shipped end to end."],
            ["Learning in public", "Building projects on GitHub instead of collecting tutorials."],
          ].map(([title, body]) => (
            <li key={title}>
              <p className="font-display text-base font-semibold text-ink">{title}</p>
              <p className="mt-1 text-[17px] leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ul>
      </Card>
      <Card delay={0.12}>
        <Eyebrow>stack &amp; tools</Eyebrow>
        <div className="flex h-full flex-col justify-center gap-2 pb-4">
          <MarqueeRow items={stack.slice(0, half)} />
          <MarqueeRow items={stack.slice(half)} reverse />
        </div>
      </Card>
    </div>
    </div>
  );
}
