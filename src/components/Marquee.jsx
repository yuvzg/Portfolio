export default function MarqueeRow({ items, reverse = false }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className={`flex w-max gap-2 ${reverse ? "marquee-r" : "marquee-l"}`}>
        {doubled.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="whitespace-nowrap rounded-full border border-line bg-bg px-3 py-1 font-mono text-xs text-muted"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
