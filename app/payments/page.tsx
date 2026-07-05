import { InnerHero } from "@/components/InnerHero";
import { ComingSoonCard } from "@/components/ComingSoonCard";
import { PageContent } from "@/components/PageContent";
import { defaultTrustStats } from "@/lib/page-trust-stats";

export const metadata = {
  title: "Payments | Ventures Mart"
};

export default function PaymentsPage() {
  return (
    <main>
      <InnerHero
        eyebrow="Payments"
        title="Payment options"
        description="Secure Indian payment methods will be available here soon."
        stats={defaultTrustStats}
      />
      <PageContent>
        <ComingSoonCard
          title="Payments coming soon"
          description="UPI, cards, net banking, and COD will be enabled when live checkout goes live."
        />
      </PageContent>
    </main>
  );
}
