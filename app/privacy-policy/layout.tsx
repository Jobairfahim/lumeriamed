import type { Metadata } from "next";
import { buildSocialMetadata } from "@/lib/seo/config";

const TITLE = "Privacy Policy | LumieraMed";
const DESCRIPTION =
  "Read LumieraMed's privacy policy to understand how we collect, store and use your personal data in accordance with UK GDPR.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/privacy-policy" },
  ...buildSocialMetadata({ title: TITLE, description: DESCRIPTION, path: "/privacy-policy" }),
};

export default function PrivacyPolicyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
