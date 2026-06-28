import { InnerHero } from "@/components/InnerHero";

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
      />
      <section className="section page-section">
        <div className="policy-content">
          <h2>Customer information</h2>
          <p>Ventures Mart may collect name, contact details, delivery address, and order information to process purchases.</p>
          <h2>Payment data</h2>
          <p>When payments are enabled, card or UPI processing should be handled by the selected payment gateway.</p>
          <h2>Communication</h2>
          <p>Customer contact details may be used for order updates, support, and service-related messages.</p>
        </div>
      </section>
    </main>
  );
}
