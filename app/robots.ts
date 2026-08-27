import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/config";

const DISALLOWED_PATHS = [
  "/_next/",
  "/api/",
  "/admin/",
  "/dashboard/",
  "/login/",
  "/account/",
  "/preview/",
  "/draft/",
  "/test/",
  "/staging/",
  "/search",
  "/*?",
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
