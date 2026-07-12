import { Card, Eyebrow } from "../components/Card.jsx";
import BackHome from "../components/BackHome.jsx";
import { projects } from "../data.js";
import { GitHubStats, LeetCodeStats } from "../components/StatsPanel.jsx";

export default function Projects() {
  return (
    <div>
      <BackHome />
      <div className="grid gap-4">
        <div className="grid items-stretch gap-4 lg:grid-cols-3">
          <Card>
            <Eyebrow>selected work</Eyebrow>
            <h1 className="font-display text-3xl font-semibold sm:text-4xl">Projects</h1>
            <p className="mt-2 text-base text-muted">
              Everything here links to a real repository on GitHub.
            </p>
          </Card>
          <GitHubStats delay={0.06} />
          <LeetCodeStats delay={0.12} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Card key={p.name} delay={0.06 * (i + 1)} className="!p-0 overflow-hidden">
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col p-6 transition hover:bg-card-hover sm:p-7"
              >
                <h2 className="font-display text-xl font-semibold text-ink">
                  {p.name}
                  <span className="ml-1 inline-block text-muted transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent">
                    ↗
                  </span>
                </h2>
                <p className="mt-2 flex-1 text-base leading-relaxed text-muted">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
