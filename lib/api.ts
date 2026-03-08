/**
 * lib/api.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * All backend calls live here. Set NEXT_PUBLIC_API_URL in .env.local.
 * Every function returns ApiResult<T> — no try/catch needed in components.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type {
  ApiResult,
  EnquiryForm,
  PlacementEnquiryForm,
  LoginForm,
  Placement,
} from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

async function request<T>(path: string, options?: RequestInit): Promise<ApiResult<T>> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data?.message ?? "Something went wrong." };
    return { success: true, data };
  } catch {
    return { success: false, error: "Network error. Please try again." };
  }
}

// ─── Enquiries ────────────────────────────────────────────────────────────────

/**
 * POST /api/enquiries/contact
 * Used by: SubmitEnquiryModal, ContactSection, contact/page.tsx
 */
export async function submitContactEnquiry(
  form: EnquiryForm
): Promise<ApiResult<{ enquiryId: string }>> {
  return request("/api/enquiries/contact", {
    method: "POST",
    body: JSON.stringify(form),
  });
}

/**
 * POST /api/enquiries/placement  (multipart/form-data)
 * Used by: PlacementEnquiryModal
 */
export async function submitPlacementEnquiry(
  form: PlacementEnquiryForm,
  files: File[]
): Promise<ApiResult<{ enquiryId: string }>> {
  const payload = new FormData();
  (Object.keys(form) as (keyof PlacementEnquiryForm)[]).forEach((key) => {
    const val = form[key];
    if (val !== undefined && val !== null) payload.append(key, String(val));
  });
  files.forEach((file) => payload.append("documents", file));
  try {
    const res = await fetch(`${BASE_URL}/api/enquiries/placement`, {
      method: "POST",
      body: payload,
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data?.message ?? "Submission failed." };
    return { success: true, data };
  } catch {
    return { success: false, error: "Network error. Please try again." };
  }
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

/**
 * POST /api/auth/login
 * Used by: login/page.tsx
 */
export async function login(
  form: LoginForm
): Promise<ApiResult<{ token: string; role: string; redirectUrl: string }>> {
  return request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(form),
  });
}

// ─── Placements ───────────────────────────────────────────────────────────────

/**
 * GET /api/placements
 * Used by: browse-placements/page.tsx (when ready)
 */
export async function getPlacements(params?: {
  specialty?: string;
  city?: string;
  search?: string;
}): Promise<ApiResult<Placement[]>> {
  const query = new URLSearchParams(
    Object.fromEntries(Object.entries(params ?? {}).filter(([, v]) => Boolean(v)))
  ).toString();
  return request(`/api/placements${query ? `?${query}` : ""}`);
}
