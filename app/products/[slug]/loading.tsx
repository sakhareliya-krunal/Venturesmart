export default function ProductLoading() {
  return (
    <main>
      <section className="product-detail section page-section product-detail-skeleton" aria-busy="true" aria-label="Loading product">
        <div className="product-detail-top">
          <div className="product-gallery-scroll">
            <div className="product-gallery">
              <div className="skeleton-block product-gallery-viewport" />
              <div className="product-thumbnail-row">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div className="skeleton-block product-thumbnail" key={index} />
                ))}
              </div>
            </div>
          </div>
          <div className="product-detail-content-scroll">
            <div className="product-buy-card">
              <div className="skeleton-line skeleton-line-sm" />
              <div className="skeleton-line skeleton-line-lg" />
              <div className="skeleton-line skeleton-line-md" />
              <div className="skeleton-line skeleton-line-xl" />
              <div className="skeleton-actions">
                <div className="skeleton-block skeleton-button" />
                <div className="skeleton-block skeleton-button" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
