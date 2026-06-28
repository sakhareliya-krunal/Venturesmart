import type { StoredOrder } from "@/lib/orders";

export async function initiatePayment(_order: StoredOrder): Promise<void> {
  throw new Error("Live payments not enabled");
}

export function isLivePaymentsEnabled(): boolean {
  return process.env.NEXT_PUBLIC_PAYMENTS_ENABLED === "true";
}
