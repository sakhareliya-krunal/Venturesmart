import type { ReactNode } from "react";

export function InnerHero({
  eyebrow,
  title,
  description,
  variant = "default",
  stats = [],
  actions,
  children
}: {
  eyebrow: string;
  title: string;
  description: string;
  variant?: "default" | "catalog";
  stats?: { value: string; label: string }[];
  actions?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className={`inner-hero inner-hero-${variant}`}>
      <div className="inner-hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
        {stats.length > 0 && (
          <div className="inner-hero-stats">
            {stats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        )}
        {actions && <div className="inner-hero-actions">{actions}</div>}
      </div>
      {children && <div className="inner-hero-panel">{children}</div>}
    </section>
  );
}
