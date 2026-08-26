export const SITE_URL = (
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.lumieramed.com"
).replace(/\/+$/, "");

export function absoluteUrl(path = "/") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(cleanPath, `${SITE_URL}/`).toString();
}
