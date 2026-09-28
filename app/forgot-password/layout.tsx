import type { Metadata } from "next";
import { buildSocialMetadata } from "@/lib/seo/config";

const TITLE = "Forgot Password | LumieraMed";
const DESCRIPTION =
  "Reset the password for your LumieraMed account.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/forgot-password" },
  robots: { index: false, follow: true },
  ...buildSocialMetadata({ title: TITLE, description: DESCRIPTION, path: "/forgot-password" }),
};

export default function ForgotPasswordLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
