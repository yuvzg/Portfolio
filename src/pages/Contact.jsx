import { lazy, Suspense, useState } from "react";
import { Card, Eyebrow } from "../components/Card.jsx";
import BackHome from "../components/BackHome.jsx";
import TimeCard from "../components/TimeCard.jsx";
const MapCard = lazy(() => import("../components/MapCard.jsx"));
import Icon from "../components/Icon.jsx";
import { profile, socials, formEndpoint } from "../data.js";

function SocialRow() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.url}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-center gap-2.5 rounded-xl border border-line bg-bg px-4 py-3.5 text-base text-muted transition hover:border-accent hover:text-accent"
        >
          <Icon name={s.icon} className="h-5 w-5 shrink-0" />
          {s.label}
        </a>
      ))}
    </div>
  );
}

function InquiryForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    if (formEndpoint) {
      try {
        setStatus("sending");
        const res = await fetch(formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(form),
        });
        setStatus(res.ok ? "sent" : "error");
        if (res.ok) setForm({ name: "", email: "", message: "" });
      } catch {
        setStatus("error");
      }
    } else {
      // no endpoint configured — open the visitor's mail client pre-filled
      const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
    }
  }

  const inputCls =
    "w-full rounded-xl border border-line bg-bg px-4 py-3 text-base text-ink placeholder:text-muted/70 outline-none transition focus:border-accent";

  return (
    <Card className="md:col-span-2" delay={0.1}>
      <Eyebrow>send an inquiry</Eyebrow>
      <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
        <input
          className={inputCls}
          placeholder="Your name"
          value={form.name}
          onChange={set("name")}
          required
          autoComplete="name"
        />
        <input
          className={inputCls}
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={set("email")}
          required
          autoComplete="email"
        />
        <textarea
          className={`${inputCls} min-h-[130px] resize-y sm:col-span-2`}
          placeholder="What's on your mind — a role, a project, a question?"
          value={form.message}
          onChange={set("message")}
          required
        />
        <div className="flex items-center gap-4 sm:col-span-2">
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-full bg-accent px-7 py-3 text-base font-medium text-[#f4eded] transition hover:bg-accent-soft disabled:opacity-50"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
          <p className="font-mono text-xs text-muted" aria-live="polite">
            {status === "sent" && "Message on its way — thanks!"}
            {status === "error" && "Something broke. Email me directly instead."}
          </p>
        </div>
      </form>
    </Card>
  );
}

export default function Contact() {
  return (
    <div>
      <BackHome />
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <Eyebrow>contact</Eyebrow>
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">
            Let's build something.
          </h1>
          <p className="mt-2 text-base text-muted">
            {profile.location} · replies within a day
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-6 inline-block rounded-full bg-accent px-7 py-3.5 text-lg font-medium text-[#f4eded] transition hover:bg-accent-soft"
          >
            {profile.email}
          </a>
          <SocialRow />
        </Card>
        <TimeCard delay={0.06} />
        <InquiryForm />
        <Suspense fallback={<div className="min-h-[300px] rounded-2xl border border-line bg-card" />}>
          <MapCard delay={0.14} />
        </Suspense>
      </div>
    </div>
  );
}
