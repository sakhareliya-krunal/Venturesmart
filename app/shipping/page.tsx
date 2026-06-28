import { InnerHero } from "@/components/InnerHero";
import { PageContent } from "@/components/PageContent";
import { policyTrustStats } from "@/lib/page-trust-stats";

export const metadata = {
  title: "Shipping | Ventures Mart"
};

export default function ShippingPage() {
  return (
    <main>
      <InnerHero
        eyebrow="Support"
        title="Shipping"
        description="Clear delivery information for Indian customers."
        stats={policyTrustStats}
      />
      <PageContent>
        <div className="policy-content">
          <div className="policy-block">
            <h2>Delivery policy</h2>
            <p>Free delivery is available on cart values above Rs 999. Smaller orders show a delivery estimate in the cart.</p>
          </div>
          <div className="policy-block">
            <h2>Delivery timelines</h2>
            <p>Standard delivery timelines depend on the destination pincode and product availability.</p>
          </div>
          <div className="policy-block">
            <h2>Address verification</h2>
            <p>Customers should verify address and phone details before checkout to avoid shipment delays.</p>
          </div>
        </div>
      </PageContent>
    </main>
  );
}
