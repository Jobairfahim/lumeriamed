import type { BlogPost } from "@/lib/types";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://server.lumieramed.com/api/v1"
).replace(/\/+$/, "");

export interface SeoSettings {
  sitemapEnabled: boolean;
  includePublishedPages: boolean;
  includePublishedPosts: boolean;
  excludedUrls: string[];
  robotsDisallow: string[];
}

function unwrap<T>(payload: unknown): T | null {
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as { data: T }).data;
  }
  return payload as T;
}

async function fetchApi<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      next: { revalidate: 300 },
    });
    if (!response.ok) return null;
    return unwrap<T>(await response.json());
  } catch {
    return null;
  }
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const posts = await fetchApi<BlogPost[]>("/blogs");
  return Array.isArray(posts) ? posts.filter((post) => !post.isDeleted) : [];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return fetchApi<BlogPost>(`/blogs/${encodeURIComponent(slug)}`);
}

export async function getSeoSettings(): Promise<SeoSettings> {
  const settings = await fetchApi<Partial<SeoSettings>>("/seo/settings");
  return {
    sitemapEnabled: settings?.sitemapEnabled ?? true,
    includePublishedPages: settings?.includePublishedPages ?? false,
    includePublishedPosts: settings?.includePublishedPosts ?? true,
    excludedUrls: settings?.excludedUrls ?? [],
    robotsDisallow: settings?.robotsDisallow ?? ["/admin/", "/dashboard/", "/login/"],
  };
}
