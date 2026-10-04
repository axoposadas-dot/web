import type { ReactNode } from "react";
export function Wordmark({ small = false }: { small?: boolean }) {
  return (
    <span
      className={`wordmark ${small ? "wordmark-small" : ""}`}
      aria-label="AXO"
    >
      a<span>x</span>o<span className="brand-point">.</span>
    </span>
  );
}
export function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <div className="eyebrow">
        <span /> {eyebrow}
      </div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
export function Tag({ children }: { children: ReactNode }) {
  return <span className="tag">{children}</span>;
}
