import type { Metadata } from "next";
import { buildSocialMetadata } from "@/lib/seo/config";

const TITLE = "Sign Up | LumieraMed";
const DESCRIPTION =
  "Create your LumieraMed account to apply for clinical elective placements in China.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/signup" },
  robots: { index: false, follow: true },
  ...buildSocialMetadata({ title: TITLE, description: DESCRIPTION, path: "/signup" }),
};

export default function SignupLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
