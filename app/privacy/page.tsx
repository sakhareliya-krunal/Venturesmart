import { InnerHero } from "@/components/InnerHero";
import { PageContent } from "@/components/PageContent";
import { policyTrustStats } from "@/lib/page-trust-stats";

export const metadata = {
  title: "Privacy Policy | Ventures Mart"
};

export default function PrivacyPage() {
  return (
    <main>
      <InnerHero
        eyebrow="Policy"
        title="Privacy Policy"
        description="How Ventures Mart should handle customer data when the store becomes fully transactional."
        stats={policyTrustStats}
      />
      <PageContent>
        <div className="policy-content">
          <div className="policy-block">
            <h2>Customer information</h2>
            <p>Ventures Mart may collect name, contact details, delivery address, and order information to process purchases.</p>
          </div>
          <div className="policy-block">
            <h2>Payment data</h2>
            <p>When payments are enabled, card or UPI processing should be handled by the selected payment gateway.</p>
          </div>
          <div className="policy-block">
            <h2>Communication</h2>
            <p>Customer contact details may be used for order updates, support, and service-related messages.</p>
          </div>
        </div>
      </PageContent>
    </main>
  );
}
