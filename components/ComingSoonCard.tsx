import { Clock } from "lucide-react";
import type { ReactNode } from "react";
import { TransitionLink } from "./TransitionLink";

type ComingSoonCardProps = {
  title: string;
  description: string;
  eyebrow?: string;
  actions?: ReactNode;
};

export function ComingSoonCard({
  title,
  description,
  eyebrow = "Coming soon",
  actions
}: ComingSoonCardProps) {
  return (
    <div className="coming-soon-card" role="status">
      <span className="coming-soon-eyebrow">{eyebrow}</span>
      <div className="coming-soon-icon" aria-hidden="true">
        <Clock size={32} />
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="coming-soon-actions">
        {actions ?? (
          <>
            <TransitionLink className="primary-link" href="/shop">
              Browse products
            </TransitionLink>
            <TransitionLink className="secondary-dark-link" href="/contact">
              Contact us
            </TransitionLink>
          </>
        )}
      </div>
    </div>
  );
}
