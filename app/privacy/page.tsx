import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "MediaRiseGroup privacy policy covering personal data, contact inquiries, analytics, cookies, service providers, and user rights.",
  path: "/privacy",
});

const sections = [
  {
    title: "1. Information we collect",
    body: "We may collect contact details, company information, project descriptions, communications, device and browser metadata, and usage analytics when you interact with this website or contact MediaRiseGroup.",
  },
  {
    title: "2. How we use information",
    body: "We use information to respond to inquiries, evaluate project fit, provide services, improve website performance, maintain security, comply with legal obligations, and communicate relevant business updates.",
  },
  {
    title: "3. Cookies and analytics",
    body: "The website may use privacy-conscious analytics and essential cookies to understand aggregate usage, diagnose technical issues, and improve the browsing experience. You can control cookies through your browser settings.",
  },
  {
    title: "4. Service providers",
    body: "We may share limited information with trusted vendors that help operate our website, communications, hosting, analytics, project delivery, and security processes. These providers are expected to protect data and use it only for authorized purposes.",
  },
  {
    title: "5. Data retention",
    body: "We retain personal information only as long as needed for the purposes described in this policy, including business records, legal compliance, dispute resolution, and service continuity.",
  },
  {
    title: "6. Security",
    body: "We use reasonable administrative, technical, and organizational safeguards designed to protect information from unauthorized access, loss, misuse, or disclosure. No online system can be guaranteed to be completely secure.",
  },
  {
    title: "7. International processing",
    body: "MediaRiseGroup may work with distributed infrastructure and service providers. Information may be processed in countries different from your location, subject to applicable privacy and data protection requirements.",
  },
  {
    title: "8. Your rights",
    body: "Depending on your location, you may have rights to access, correct, delete, restrict, or object to certain processing of your personal information. You may contact us to request assistance with these rights.",
  },
  {
    title: "9. Children",
    body: "This website is intended for business audiences and is not directed to children. We do not knowingly collect personal information from children through this website.",
  },
  {
    title: "10. Contact",
    body: "For privacy questions or requests, contact hello@mediarisegroup.com. We may need to verify your identity before fulfilling certain requests.",
  },
];

export default function PrivacyPage() {
  return (
    <section className="container pt-36 pb-24">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase text-red-200/80">Privacy Policy</p>
        <h1 className="mt-4 font-display text-5xl font-semibold tracking-normal text-white md:text-6xl">MediaRiseGroup Privacy Policy</h1>
        <p className="mt-5 text-sm text-white/48">Effective date: April 25, 2026</p>
        <p className="mt-8 text-lg leading-8 text-white/64">
          This Privacy Policy explains how MediaRiseGroup collects, uses, shares, and protects information when you use mediarisegroup.com or communicate with us. This page is provided for general business transparency and should not be treated as legal advice.
        </p>
        <div className="mt-12 grid gap-5">
          {sections.map((section) => (
            <article key={section.title} className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
              <h2 className="font-display text-2xl font-semibold text-white">{section.title}</h2>
              <p className="mt-4 text-base leading-8 text-white/62">{section.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
