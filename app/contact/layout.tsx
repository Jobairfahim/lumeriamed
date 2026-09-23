import type { Metadata } from "next";
import { buildSocialMetadata } from "@/lib/seo/config";

const TITLE = "Contact LumieraMed | Medical Electives in China";
const DESCRIPTION =
  "Contact LumieraMed for help arranging your medical elective in China. Specialties, dates, eligibility, documents, costs and placement matching.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  ...buildSocialMetadata({ title: TITLE, description: DESCRIPTION, path: "/contact" }),
};

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
