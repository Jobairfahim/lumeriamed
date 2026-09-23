import type { Metadata } from "next";
import { buildSocialMetadata } from "@/lib/seo/config";

const TITLE = "Login | LumieraMed";
const DESCRIPTION =
  "Access your LumieraMed account to track your clinical elective placement application.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/login" },
  robots: { index: false, follow: true },
  ...buildSocialMetadata({ title: TITLE, description: DESCRIPTION, path: "/login" }),
};

export default function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
