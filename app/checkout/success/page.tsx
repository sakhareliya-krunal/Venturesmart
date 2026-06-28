import { CheckoutSuccessClient } from "@/components/CheckoutSuccessClient";

export const metadata = {
  title: "Order Confirmed | Ventures Mart"
};

type CheckoutSuccessPageProps = {
  searchParams: Promise<{ order?: string }>;
};

export default async function CheckoutSuccessPage({ searchParams }: CheckoutSuccessPageProps) {
  const params = await searchParams;
  const orderId = params.order ?? "";

  return <CheckoutSuccessClient orderId={orderId} />;
}
