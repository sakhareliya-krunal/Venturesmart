import { InnerHero } from "@/components/InnerHero";
import { PageContent } from "@/components/PageContent";
import { PolicyDocument } from "@/components/PolicyDocument";
import { legalLastUpdated, privacySections } from "@/lib/legal-content";
import { policyTrustStats } from "@/lib/page-trust-stats";

export const metadata = {
  title: "Privacy Policy | Ventures Mart",
  description:
    "Learn how Ventures Mart collects, uses, and protects your personal information when you shop for toys and lunch boxes in India."
};

export default function PrivacyPage() {
  return (
    <main>
      <InnerHero
        eyebrow="Policy"
        title="Privacy Policy"
        description="How Ventures Mart handles your personal information when you browse, order, and contact support."
        stats={policyTrustStats}
      />
      <PageContent>
        <PolicyDocument lastUpdated={legalLastUpdated} sections={privacySections} />
      </PageContent>
    </main>
  );
}
