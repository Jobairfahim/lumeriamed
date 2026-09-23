export const SITE_URL = (
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.lumieramed.com"
).replace(/\/+$/, "");

export function absoluteUrl(path = "/") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(cleanPath, `${SITE_URL}/`).toString();
}

const DEFAULT_OG_IMAGE = {
  url: "/images/og-share.png",
  width: 1200,
  height: 630,
  alt: "LumieraMed - Clinical Elective Placements in China",
};

export function buildSocialMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    openGraph: {
      type: "website" as const,
      locale: "en_GB",
      url: absoluteUrl(path),
      title,
      description,
      siteName: "LumieraMed",
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [DEFAULT_OG_IMAGE.url],
      creator: "@lumieramed",
    },
  };
}
