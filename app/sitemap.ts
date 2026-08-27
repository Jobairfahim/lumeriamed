import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/config";
import { getPublishedBlogPosts, getSeoSettings } from "@/lib/seo/repository";

const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/faq",
  "/contact",
  "/browse-placements",
  "/blog",
  "/privacy-policy",
  "/terms",
] as const;

function asDate(value?: string | Date | null) {
  if (!value) return undefined;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSeoSettings();
  if (!settings.sitemapEnabled) return [];

  const excluded = new Set(settings.excludedUrls);
  const includedUrls = new Set<string>();
  const entries: MetadataRoute.Sitemap = PUBLIC_ROUTES.filter(
    (route) => !excluded.has(route),
  ).map((route) => {
    const url = absoluteUrl(route);
    includedUrls.add(url);
    return {
      url,
      changeFrequency: route === "/" ? "weekly" : "monthly",
      priority: route === "/" ? 1 : 0.7,
    };
  });

  if (settings.includePublishedPosts) {
    const posts = await getPublishedBlogPosts();
    for (const post of posts) {
      const identifier = post.slug || post._id || post.id;
      if (!identifier) continue;
      const path = `/blog/${identifier}`;
      const url = absoluteUrl(path);
      if (excluded.has(path) || includedUrls.has(url)) continue;
      includedUrls.add(url);
      entries.push({
        url,
        lastModified: asDate(post.updatedAt ?? post.createdAt),
      });
    }
  }

  return entries;
}
