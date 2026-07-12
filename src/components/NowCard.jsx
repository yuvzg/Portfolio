import { Card, Eyebrow } from "./Card.jsx";
import { now } from "../data.js";

export default function NowCard({ delay = 0 }) {
  return (
    <Card className="md:col-span-1" delay={delay}>
      <div className="flex items-baseline justify-between">
        <Eyebrow>now</Eyebrow>
        <span className="font-mono text-xs text-muted">{now.date}</span>
      </div>
      <ul className="space-y-3">
        {now.items.map((item) => (
          <li key={item} className="flex gap-3 text-[17px] leading-relaxed text-ink/90">
            <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}
