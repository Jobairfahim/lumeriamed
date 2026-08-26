import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/config";
import {
  getPublishedBlogPosts,
  getPublishedPages,
  getSeoSettings,
} from "@/lib/seo/repository";

const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/faq",
  "/contact",
  "/browse-placements",
  "/blog",
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
  const entries: MetadataRoute.Sitemap = PUBLIC_ROUTES.filter(
    (route) => !excluded.has(route),
  ).map((route) => ({
    url: absoluteUrl(route),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));

  if (settings.includePublishedPages) {
    const pages = await getPublishedPages();
    for (const page of pages) {
      const path = page.slug.startsWith("/") ? page.slug : `/${page.slug}`;
      if (excluded.has(path) || !path || page.canonicalOverride) continue;
      entries.push({ url: absoluteUrl(path), lastModified: asDate(page.updatedAt) });
    }
  }

  if (settings.includePublishedPosts) {
    const posts = await getPublishedBlogPosts();
    for (const post of posts) {
      const identifier = post.slug || post._id || post.id;
      if (!identifier) continue;
      const path = `/blog/${identifier}`;
      if (excluded.has(path)) continue;
      entries.push({
        url: absoluteUrl(path),
        lastModified: asDate(post.updatedAt ?? post.createdAt),
      });
    }
  }

  return entries;
}
