"use client";

import { TransitionLink } from "@/components/TransitionLink";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main>
      <section className="inner-hero inner-hero-default">
        <div className="inner-hero-copy">
          <p className="eyebrow">Error</p>
          <h1>Something went wrong</h1>
          <p>We hit an unexpected issue loading this page. You can try again or return to the store.</p>
          <div className="inner-hero-actions">
            <button className="primary-link" onClick={reset} type="button">
              Try again
            </button>
            <TransitionLink className="secondary-dark-link" href="/">
              Back to home
            </TransitionLink>
          </div>
        </div>
      </section>
      {process.env.NODE_ENV === "development" && (
        <section className="section page-section">
          <pre className="error-debug">{error.message}</pre>
        </section>
      )}
    </main>
  );
}
