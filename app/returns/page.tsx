import { InnerHero } from "@/components/InnerHero";
import { PageContent } from "@/components/PageContent";
import { policyTrustStats } from "@/lib/page-trust-stats";

export const metadata = {
  title: "Returns | Ventures Mart"
};

export default function ReturnsPage() {
  return (
    <main>
      <InnerHero
        eyebrow="Support"
        title="Returns"
        description="Simple return guidance for marketplace orders."
        stats={policyTrustStats}
      />
      <PageContent>
        <div className="policy-content">
          <div className="policy-block">
            <h2>Return policy</h2>
            <p>Eligible items can be requested for return within 7 days of delivery.</p>
          </div>
          <div className="policy-block">
            <h2>Product condition</h2>
            <p>Products should be unused, complete, and returned with original packaging wherever possible.</p>
          </div>
          <div className="policy-block">
            <h2>Transit damage</h2>
            <p>Items damaged in transit should be reported with photos so support can review the issue quickly.</p>
          </div>
        </div>
      </PageContent>
    </main>
  );
}
