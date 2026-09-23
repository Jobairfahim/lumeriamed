import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/config";

const DISALLOWED_PATHS = [
  "/api/",
  "/admin/",
  "/dashboard/",
  "/account/",
  "/preview/",
  "/draft/",
  "/test/",
  "/staging/",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: DISALLOWED_PATHS,
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
