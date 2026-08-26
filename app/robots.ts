import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/config";
import { getSeoSettings } from "@/lib/seo/repository";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSeoSettings();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: settings.robotsDisallow,
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
