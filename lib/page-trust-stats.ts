export type PageTrustStat = {
  value: string;
  label: string;
};

export const defaultTrustStats: PageTrustStat[] = [
  { value: "4.8/5", label: "Customer rating" },
  { value: "Rs 999+", label: "Free delivery" },
  { value: "7-day", label: "Easy returns" }
];

export const policyTrustStats: PageTrustStat[] = [
  { value: "Secure", label: "Checkout ready" },
  { value: "Privacy", label: "First approach" },
  { value: "7-day", label: "Easy returns" }
];

export const trackOrderTrustStats: PageTrustStat[] = [
  { value: "Lookup", label: "Order tracking" },
  { value: "24/7", label: "Support ready" },
  { value: "Fast", label: "Status updates" }
];
