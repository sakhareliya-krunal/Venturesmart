import { InnerHero } from "@/components/InnerHero";
import { PageContent } from "@/components/PageContent";
import { PolicyDocument } from "@/components/PolicyDocument";
import { legalLastUpdated, termsSections } from "@/lib/legal-content";
import { policyTrustStats } from "@/lib/page-trust-stats";

export const metadata = {
  title: "Terms and Conditions | Ventures Mart",
  description:
    "Read the terms and conditions for using Ventures Mart, including orders, shipping, returns, and customer responsibilities in India."
};

export default function TermsPage() {
  return (
    <main>
      <InnerHero
        eyebrow="Policy"
        title="Terms and Conditions"
        description="The terms that apply when you browse, order from, and use the Ventures Mart storefront."
        stats={policyTrustStats}
      />
      <PageContent>
        <PolicyDocument lastUpdated={legalLastUpdated} sections={termsSections} />
      </PageContent>
    </main>
  );
}
