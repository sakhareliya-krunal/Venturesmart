import { InnerHero } from "@/components/InnerHero";

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
      />
      <section className="section page-section">
        <div className="policy-content">
          <h2>Delivery policy</h2>
          <p>Free delivery is available on cart values above Rs 999. Smaller orders show a delivery estimate in the cart.</p>
          <p>Standard delivery timelines depend on the destination pincode and product availability.</p>
          <p>Customers should verify address and phone details before checkout to avoid shipment delays.</p>
        </div>
      </section>
    </main>
  );
}
