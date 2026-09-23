import type { Metadata } from "next";
import { buildSocialMetadata } from "@/lib/seo/config";

const TITLE = "Terms & Conditions | LumieraMed";
const DESCRIPTION =
  "Read the full terms and conditions governing use of LumieraMed's website and clinical elective placement services.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/terms" },
  ...buildSocialMetadata({ title: TITLE, description: DESCRIPTION, path: "/terms" }),
};

export default function TermsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
