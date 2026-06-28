import { InnerHero } from "@/components/InnerHero";
import { PageContent } from "@/components/PageContent";
import { policyTrustStats } from "@/lib/page-trust-stats";

export const metadata = {
  title: "Terms | Ventures Mart"
};

export default function TermsPage() {
  return (
    <main>
      <InnerHero
        eyebrow="Policy"
        title="Terms and Conditions"
        description="Starter terms for browsing, ordering, and using the Ventures Mart storefront."
        stats={policyTrustStats}
      />
      <PageContent>
        <div className="policy-content">
          <div className="policy-block">
            <h2>Use of website</h2>
            <p>Customers should use the website for lawful browsing, product discovery, and order placement.</p>
          </div>
          <div className="policy-block">
            <h2>Product information</h2>
            <p>Product prices, availability, and descriptions may change as inventory and business details evolve.</p>
          </div>
          <div className="policy-block">
            <h2>Orders</h2>
            <p>Final order confirmation, payment collection, and fulfillment rules will apply when checkout is activated.</p>
          </div>
        </div>
      </PageContent>
    </main>
  );
}
