export default function ShopLoading() {
  return (
    <main>
      <section className="inner-hero inner-hero-catalog product-detail-skeleton" aria-busy="true" aria-label="Loading shop">
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
          <div className="product-grid shop-skeleton-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <div className="skeleton-block product-card-skeleton" key={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
