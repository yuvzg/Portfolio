import { useEffect, useState } from "react";
import { Card, Eyebrow } from "./Card.jsx";
import Icon from "./Icon.jsx";
import { statsUsernames } from "../data.js";

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-line bg-bg px-3 py-2.5">
      <p className="font-mono text-lg font-medium tabular-nums text-ink">{value ?? "—"}</p>
      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{label}</p>
    </div>
  );
}

function describeEvent(e) {
  const n = e.payload?.commits?.length || 0;
  switch (e.type) {
    case "PushEvent":
      return `pushed ${n} commit${n === 1 ? "" : "s"}`;
    case "CreateEvent":
      return `created ${e.payload?.ref_type || "repo"}`;
    case "DeleteEvent":
      return `deleted ${e.payload?.ref_type || "branch"}`;
    case "WatchEvent":
      return "starred";
    case "ForkEvent":
      return "forked";
    case "PublicEvent":
      return "made public";
    case "PullRequestEvent":
      return `${e.payload?.action || "opened"} a PR in`;
    case "IssuesEvent":
      return `${e.payload?.action || "opened"} an issue in`;
    case "IssueCommentEvent":
      return "commented in";
    case "ReleaseEvent":
      return "released in";
    default:
      return e.type.replace("Event", "").toLowerCase();
  }
}

function eventDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export function GitHubStats({ delay = 0 }) {
  const [data, setData] = useState(null);
  const [events, setEvents] = useState(null); // null = loading, [] = none/error
  const u = statsUsernames.github;

  useEffect(() => {
    let alive = true;
    fetch(`https://api.github.com/users/${u}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => alive && setData(d))
      .catch(() => {});
    fetch(`https://api.github.com/users/${u}/events?per_page=30`)
      .then((r) => (r.ok ? r.json() : []))
      .then((evts) => alive && setEvents(Array.isArray(evts) ? evts.slice(0, 10) : []))
      .catch(() => alive && setEvents([]));
    return () => {
      alive = false;
    };
  }, [u]);

  const commits =
    events?.filter((e) => e.type === "PushEvent")
      .reduce((s, e) => s + (e.payload?.commits?.length || 0), 0) ?? null;

  return (
    <Card delay={delay}>
      <div className="flex items-center justify-between">
        <Eyebrow>github</Eyebrow>
        <a
          href={`https://github.com/${u}`}
          target="_blank"
          rel="noreferrer"
          className="mb-4 inline-flex items-center gap-1.5 font-mono text-xs text-muted transition hover:text-accent"
        >
          <Icon name="github" className="h-4 w-4" />@{u}
        </a>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Stat label="repos" value={data?.public_repos} />
        <Stat label="followers" value={data?.followers} />
        <Stat label="recent commits" value={commits} />
      </div>
      <p className="mb-2 mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        last 10 events
      </p>
      {events === null && <p className="font-mono text-xs text-muted">loading…</p>}
      {events?.length === 0 && (
        <p className="text-base text-muted">No recent public activity.</p>
      )}
      {events?.length > 0 && (
        <ul className="max-h-56 space-y-1.5 overflow-y-auto pr-1">
          {events.map((e) => (
            <li key={e.id} className="flex items-baseline gap-2 text-sm leading-snug">
              <span className="font-mono text-[10px] tabular-nums text-muted">
                {eventDate(e.created_at)}
              </span>
              <span className="min-w-0 truncate text-ink/90">
                {describeEvent(e)}{" "}
                <a
                  href={`https://github.com/${e.repo?.name}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent-soft transition hover:text-accent"
                >
                  {e.repo?.name?.split("/")[1]}
                </a>
              </span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

export function LeetCodeStats({ delay = 0 }) {
  const [ok, setOk] = useState(true);
  const u = statsUsernames.leetcode;

  return (
    <Card delay={delay}>
      <div className="flex items-center justify-between">
        <Eyebrow>leetcode</Eyebrow>
        <a
          href={`https://leetcode.com/u/${u}/`}
          target="_blank"
          rel="noreferrer"
          className="mb-4 inline-flex items-center gap-1.5 font-mono text-xs text-muted transition hover:text-accent"
        >
          <Icon name="leetcode" className="h-4 w-4" />@{u}
        </a>
      </div>
      {ok ? (
        <a href={`https://leetcode.com/u/${u}/`} target="_blank" rel="noreferrer" className="block">
          <img
            src={`https://leetcard.jacoblin.cool/${u}?theme=dark&font=JetBrains%20Mono&ext=heatmap&border=0&radius=12`}
            alt={`LeetCode stats and heatmap for ${u} — problems solved by difficulty`}
            loading="lazy"
            onError={() => setOk(false)}
            className="w-full rounded-lg"
          />
        </a>
      ) : (
        <p className="text-base text-muted">
          Stats card unavailable right now —{" "}
          <a
            href={`https://leetcode.com/u/${u}/`}
            target="_blank"
            rel="noreferrer"
            className="text-accent-soft underline-offset-2 hover:underline"
          >
            view the profile directly
          </a>
          .
        </p>
      )}
    </Card>
  );
}
