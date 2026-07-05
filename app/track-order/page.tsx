import { InnerHero } from "@/components/InnerHero";
import { PageContent } from "@/components/PageContent";
import { TrackOrderClient } from "@/components/TrackOrderClient";
import { trackOrderTrustStats } from "@/lib/page-trust-stats";

export const metadata = {
  title: "Track Order | Ventures Mart"
};

type TrackOrderPageProps = {
  searchParams: Promise<{ order?: string }>;
};

export default async function TrackOrderPage({ searchParams }: TrackOrderPageProps) {
  const params = await searchParams;

  return (
    <main>
      <InnerHero
        eyebrow="Support"
        title="Track order"
        description="Look up orders using your order ID and contact details."
        stats={trackOrderTrustStats}
      />
      <PageContent>
        <TrackOrderClient initialOrderId={params.order ?? ""} />
      </PageContent>
    </main>
  );
}
