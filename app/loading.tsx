export default function Loading() {
  return (
    <main aria-busy="true" aria-label="Loading page" className="product-detail-skeleton">
      <section className="inner-hero inner-hero-default">
        <div className="inner-hero-shell">
          <div className="inner-hero-copy">
            <div className="skeleton-line skeleton-line-sm" />
            <div className="skeleton-line skeleton-line-lg" />
            <div className="skeleton-line skeleton-line-md" />
          </div>
        </div>
      </section>
      <section className="section page-content-section">
        <div className="page-content-panel">
          <div className="skeleton-line skeleton-line-md" />
          <div className="skeleton-line skeleton-line-lg" />
          <div className="skeleton-block" />
        </div>
      </section>
    </main>
  );
}
