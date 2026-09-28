import type { Metadata } from "next";
import { buildSocialMetadata } from "@/lib/seo/config";

const TITLE = "Clinical Elective Placements in China | LumieraMed";
const DESCRIPTION =
  "Explore clinical elective placements across China's leading hospitals, from family medicine to cardiology and surgery. Personally matched to your interests.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/browse-placements" },
  ...buildSocialMetadata({ title: TITLE, description: DESCRIPTION, path: "/browse-placements" }),
};

export default function BrowsePlacementsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
