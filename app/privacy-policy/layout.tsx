import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | LumieraMed",
  description:
    "Read the LumieraMed privacy policy and learn how we handle personal information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
