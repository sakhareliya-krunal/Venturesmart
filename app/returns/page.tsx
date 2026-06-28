import { InnerHero } from "@/components/InnerHero";

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
      />
      <section className="section page-section">
        <div className="policy-content">
          <h2>Return policy</h2>
          <p>Eligible items can be requested for return within 7 days of delivery.</p>
          <p>Products should be unused, complete, and returned with original packaging wherever possible.</p>
          <p>Items damaged in transit should be reported with photos so support can review the issue quickly.</p>
        </div>
      </section>
    </main>
  );
}
