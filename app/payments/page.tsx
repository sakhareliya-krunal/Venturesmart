import { BadgeIndianRupee, CreditCard, ShieldCheck } from "lucide-react";
import { InnerHero } from "@/components/InnerHero";

export const metadata = {
  title: "Payments | Ventures Mart"
};

export default function PaymentsPage() {
  return (
    <main>
      <InnerHero
        eyebrow="Future integration"
        title="Best payment fit for India"
        description="Demo checkout is available for UI testing. Live Razorpay collection can be connected later."
      />
      <section className="section page-section">
        <div className="payment-grid">
          <article className="payment-card recommended">
            <BadgeIndianRupee size={28} />
            <h3>Razorpay</h3>
            <p>
              Recommended first because it supports common Indian payment modes, has strong web
              checkout docs, and works well with Node.js/Next.js backends.
            </p>
            <span>Use later: Standard Checkout + server-side order verification</span>
          </article>
          <article className="payment-card">
            <CreditCard size={28} />
            <h3>Cashfree or PayU</h3>
            <p>
              Good alternatives if pricing, settlement, onboarding, or support terms are better for
              the business account.
            </p>
            <span>Compare before launch: MDR, settlement time, refunds, support</span>
          </article>
          <article className="payment-card">
            <ShieldCheck size={28} />
            <h3>Recommended methods</h3>
            <p>
              Keep UPI, cards, net banking, wallets, and cash on delivery visible for India-only
              customers.
            </p>
            <span>Demo checkout available now; live gateway later</span>
          </article>
        </div>
      </section>
    </main>
  );
}
