export default function CheckoutLoading() {
  return (
    <main>
      <section className="inner-hero inner-hero-default product-detail-skeleton" aria-busy="true" aria-label="Loading checkout">
        <div className="inner-hero-copy">
          <div className="skeleton-line skeleton-line-sm" />
          <div className="skeleton-line skeleton-line-lg" />
        </div>
      </section>
      <section className="section page-section">
        <div className="checkout-layout">
          <div className="checkout-panel">
            <div className="skeleton-line skeleton-line-md" />
            <div className="skeleton-line skeleton-line-xl" />
            <div className="skeleton-line skeleton-line-lg" />
            <div className="skeleton-block skeleton-button" />
          </div>
          <aside className="checkout-summary">
            <div className="skeleton-line skeleton-line-sm" />
            <div className="skeleton-line skeleton-line-md" />
            <div className="skeleton-line skeleton-line-lg" />
          </aside>
        </div>
      </section>
    </main>
  );
}
