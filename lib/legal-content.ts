import { supportEmail } from "@/lib/site-contact";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export const legalLastUpdated = "June 2026";

export const privacySections: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction & scope",
    paragraphs: [
      "Ventures Mart operates an online storefront for toys and lunch boxes serving customers across India. This Privacy Policy explains how we collect, use, and protect personal information when you browse our website, contact support, or place an order.",
      "By using Ventures Mart, you agree to the practices described in this policy. If you do not agree, please discontinue use of the website."
    ]
  },
  {
    id: "information-collected",
    title: "Information we collect",
    paragraphs: [
      "We may collect information you provide directly, including your name, email address, phone number, delivery address, and order details when you checkout or contact support.",
      "When you browse the site, we may collect basic technical data such as device type, browser, and pages visited to keep the storefront secure and improve performance.",
      "We do not intentionally collect sensitive personal data unless required for a specific service you request."
    ]
  },
  {
    id: "how-we-use",
    title: "How we use your information",
    paragraphs: [
      "We use customer information to process orders, arrange delivery, respond to support requests, and send service-related updates about your purchase.",
      "Contact details may be used to verify orders, resolve delivery issues, and follow up on return or replacement requests.",
      "We do not sell your personal information to third parties for marketing purposes."
    ]
  },
  {
    id: "cookies",
    title: "Cookies & website analytics",
    paragraphs: [
      "Ventures Mart may use cookies and similar technologies to remember preferences, keep your session secure, and understand how visitors use the website.",
      "You can control cookies through your browser settings. Disabling cookies may affect certain site features such as cart persistence."
    ]
  },
  {
    id: "payments",
    title: "Payment processing",
    paragraphs: [
      "When online checkout is enabled, payments will be processed through a secure payment gateway such as Razorpay. Card, UPI, net banking, and COD options will be offered at checkout.",
      "Ventures Mart does not store full card numbers or UPI PINs on our servers. Payment credentials are handled directly by the payment provider in accordance with their security standards."
    ]
  },
  {
    id: "data-sharing",
    title: "Data sharing",
    paragraphs: [
      "We may share limited order information with delivery partners and payment processors only as needed to fulfill your order or complete a transaction.",
      "We may disclose information if required by law, court order, or to protect the rights, safety, and security of Ventures Mart, our customers, or others."
    ]
  },
  {
    id: "retention-security",
    title: "Data retention & security",
    paragraphs: [
      "We retain customer and order records for as long as needed to provide services, comply with legal obligations, and resolve disputes.",
      "We apply reasonable administrative and technical safeguards to protect personal information. No online system is completely secure, and we encourage customers to use strong, unique contact details and report suspicious activity promptly."
    ]
  },
  {
    id: "your-rights",
    title: "Your rights & contact",
    paragraphs: [
      "You may request access to, correction of, or deletion of personal information we hold about you, subject to applicable law and legitimate business needs such as completed order records.",
      `For privacy-related questions or requests, contact us at ${supportEmail} or through the Contact page on this website.`
    ]
  }
];

export const termsSections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of terms",
    paragraphs: [
      "These Terms and Conditions govern your use of the Ventures Mart website and any purchases made through it. By accessing or using the site, you agree to these terms.",
      "If you do not agree, please do not use the website or place orders through Ventures Mart."
    ]
  },
  {
    id: "eligibility",
    title: "Eligibility & account use",
    paragraphs: [
      "You must be legally capable of entering into a binding contract under Indian law to place an order. If you are under 18, a parent or guardian should complete purchases on your behalf.",
      "You agree to provide accurate contact and delivery information and to use the website only for lawful purposes."
    ]
  },
  {
    id: "products-pricing",
    title: "Products, pricing & availability",
    paragraphs: [
      "Product descriptions, images, and prices are shown in Indian Rupees (INR). MRP and selling prices are displayed on product pages where applicable.",
      "We strive to keep product information accurate, but descriptions, availability, and pricing may change without notice due to inventory or supplier updates.",
      "Colours and packaging may vary slightly from images due to screen settings or manufacturer updates."
    ]
  },
  {
    id: "orders-payment",
    title: "Orders & payment",
    paragraphs: [
      "Online checkout and payment collection are being prepared for launch. Until checkout is fully live, product browsing and enquiry flows may be available without completed payment on the website.",
      "When checkout is active, an order is confirmed only after successful payment or COD acceptance and an order confirmation is shared with you by email or SMS.",
      "We reserve the right to cancel or refuse orders in cases of pricing errors, suspected fraud, or stock unavailability."
    ]
  },
  {
    id: "shipping",
    title: "Shipping & delivery",
    paragraphs: [
      "Ventures Mart delivers across India subject to serviceable pin codes and product availability. Free delivery applies on cart values above Rs 999 as stated on the website.",
      "Estimated delivery timelines depend on your location and may vary during peak periods or due to courier delays. See our Shipping page for current delivery guidance."
    ]
  },
  {
    id: "returns",
    title: "Returns & refunds",
    paragraphs: [
      "Eligible products may be returned within 7 days of delivery in unused condition with original packaging where possible. Manufacturing defects and transit damage should be reported promptly with supporting photos.",
      "Refund or replacement decisions are handled according to our Returns policy once the returned item is inspected."
    ]
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    paragraphs: [
      "All content on Ventures Mart — including logos, product photography, text, and layout — is owned by Ventures Mart or used with permission. You may not copy, reproduce, or distribute site content without written consent.",
      "Product brand names and trademarks belong to their respective owners and are used for identification only."
    ]
  },
  {
    id: "liability",
    title: "Limitation of liability",
    paragraphs: [
      "Ventures Mart provides the website and products on an as-available basis. To the fullest extent permitted by law, we are not liable for indirect, incidental, or consequential damages arising from use of the site or products.",
      "Our total liability for any claim related to a product or order is limited to the amount you paid for that order, except where applicable law requires otherwise."
    ]
  },
  {
    id: "governing-law",
    title: "Governing law & contact",
    paragraphs: [
      "These terms are governed by the laws of India. Disputes shall be subject to the jurisdiction of competent courts in India.",
      `For questions about these terms, contact us at ${supportEmail} or visit the Contact page on this website.`
    ]
  }
];
