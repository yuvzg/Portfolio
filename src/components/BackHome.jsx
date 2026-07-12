import { Link } from "react-router-dom";

export default function BackHome() {
  return (
    <Link
      to="/"
      className="mb-5 inline-flex items-center gap-2 font-mono text-xs text-muted transition hover:text-accent"
    >
      <span aria-hidden="true">←</span> home
    </Link>
  );
}
