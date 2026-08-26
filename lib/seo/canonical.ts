import { absoluteUrl } from "./config";

export function resolveCanonical(
  pathname: string,
  canonicalOverride?: string | null,
) {
  const override = canonicalOverride?.trim();
  return override || absoluteUrl(pathname);
}
