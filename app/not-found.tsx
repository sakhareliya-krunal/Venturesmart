import { InnerHero } from "@/components/InnerHero";
import { PageContent } from "@/components/PageContent";
import { TransitionLink } from "@/components/TransitionLink";

export default function NotFound() {
  return (
    <main>
      <InnerHero
        eyebrow="404"
        title="Page not found"
        description="The page you are looking for may have moved or no longer exists."
        actions={
          <>
            <TransitionLink className="primary-link" href="/shop">
              Browse products
            </TransitionLink>
            <TransitionLink className="secondary-dark-link" href="/">
              Back to home
            </TransitionLink>
          </>
        }
      />
      <PageContent>
        <div className="empty-results not-found-links">
          <h3>Popular destinations</h3>
          <div className="not-found-link-grid">
            <TransitionLink href="/categories/toys">Toys</TransitionLink>
            <TransitionLink href="/categories/lunch-box">Lunch Box</TransitionLink>
            <TransitionLink href="/favourites">Favourites</TransitionLink>
            <TransitionLink href="/track-order">Track order</TransitionLink>
          </div>
        </div>
      </PageContent>
    </main>
  );
}
