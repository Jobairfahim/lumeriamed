import type {
  ApiResult,
  AuthTokens,
  ChangePasswordRequest,
  EnquiryForm,
  ForgotPasswordRequest,
  LoginForm,
  PlacementEnquiryForm,
  Placement,
  ResetPasswordRequest,
  SignupRequest,
  VerifyOtpRequest,
} from "./types";

const DEFAULT_BASE_URL = "https://server.lumieramed.com/api/v1";

function normalizeBaseUrl(rawUrl?: string) {
  const trimmed = (rawUrl ?? DEFAULT_BASE_URL).trim().replace(/\/+$/, "");
  return trimmed.endsWith("/api/v1") ? trimmed : `${trimmed}/api/v1`;
}

const BASE_URL = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL,
);

function getErrorMessage(data: unknown, fallback: string) {
  if (typeof data === "string" && data) return data;
  if (!data || typeof data !== "object") return fallback;

  const record = data as Record<string, unknown>;
  if (typeof record.message === "string" && record.message)
    return record.message;
  if (typeof record.error === "string" && record.error) return record.error;
  if (Array.isArray(record.error) && record.error.length > 0) {
    const first = record.error[0] as Record<string, unknown>;
    if (typeof first?.message === "string" && first.message)
      return first.message;
  }

  const issues = record.errorSources;
  if (Array.isArray(issues) && issues.length > 0) {
    const first = issues[0] as Record<string, unknown>;
    if (typeof first?.message === "string" && first.message)
      return first.message;
  }

  return fallback;
}

function getPayload<T>(data: unknown): T {
  if (data && typeof data === "object" && "data" in data) {
    return (data as { data: T }).data;
  }
  return data as T;
}

async function request<T>(
  path: string,
  options?: RequestInit & { token?: string; json?: boolean },
): Promise<ApiResult<T>> {
  const { token, json = true, headers, ...rest } = options ?? {};

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: {
        ...(json ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(headers ?? {}),
      },
      ...rest,
    });
    const contentType = res.headers.get("content-type") ?? "";
    const data = contentType.includes("application/json")
      ? await res.json()
      : await res.text();

    if (!res.ok) {
      return {
        success: false,
        error: getErrorMessage(data, "Something went wrong."),
      };
    }

    return { success: true, data: getPayload<T>(data) };
  } catch {
    return { success: false, error: "Network error. Please try again." };
  }
}

// ─── Enquiries ────────────────────────────────────────────────────────────────

/**
 * POST /api/enquiries
 * Used by: SubmitEnquiryModal, ContactSection, contact/page.tsx
 */
export async function submitContactEnquiry(
  form: EnquiryForm,
): Promise<ApiResult<{ enquiryId: string }>> {
  return request("/enquiries", {
    method: "POST",
    body: JSON.stringify({
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      phoneNumber: form.phone ?? "",
      message: form.message,
    }),
  });
}

/**
 * POST /api/placements-enquiries  (multipart/form-data)
 * Used by: PlacementEnquiryModal
 */
export async function submitPlacementEnquiry(
  form: PlacementEnquiryForm,
  files: File[],
): Promise<ApiResult<{ enquiryId: string }>> {
  const payload = new FormData();
  const body = {
    email: form.email,
    firstName: form.firstName,
    lastName: form.lastName,
    phoneNumber: form.phone,
    universityOrMedicalSchool: form.university,
    yearOfStudy: Number(form.yearOfStudy),
    preferredStartDate: form.preferredStartDate,
    duration: form.duration,
    preferredSpecialty: form.preferredSpecialty,
    preferredCities: form.preferredCities,
    language: form.language,
    additionalInfo: form.additionalInfo,
  };
  payload.append("data", JSON.stringify(body));
  files.forEach((file) => payload.append("documents", file));
  try {
    const res = await fetch(`${BASE_URL}/placements-enquiries`, {
      method: "POST",
      body: payload,
    });
    const data = await res.json();
    if (!res.ok)
      return {
        success: false,
        error: getErrorMessage(data, "Submission failed."),
      };
    return { success: true, data: getPayload(data) };
  } catch {
    return { success: false, error: "Network error. Please try again." };
  }
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

/**
 * POST /auth/login
 * Used by: login/page.tsx
 */
export async function login(
  form: LoginForm,
): Promise<ApiResult<AuthTokens & { role?: string; redirectUrl?: string }>> {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(form),
  });
}

export async function registerStudent(
  form: SignupRequest,
): Promise<ApiResult<{ message?: string }>> {
  return request("/users/student", {
    method: "POST",
    body: JSON.stringify(form),
  });
}

export async function requestPasswordReset(
  form: ForgotPasswordRequest,
): Promise<ApiResult<{ message?: string }>> {
  return request("/auth/forget-password", {
    method: "POST",
    body: JSON.stringify(form),
  });
}

export async function verifyEmail(
  form: VerifyOtpRequest,
): Promise<ApiResult<{ message?: string; verifyToken?: string }>> {
  return request("/auth/verify-email", {
    method: "POST",
    body: JSON.stringify({
      email: form.email,
      oneTimeCode: parseInt(form.otp),
    }),
  });
}

export async function resendOtp(
  form: ForgotPasswordRequest,
): Promise<ApiResult<{ message?: string }>> {
  return request("/auth/resend-otp", {
    method: "POST",
    body: JSON.stringify(form),
  });
}

export async function resetPassword(
  form: ResetPasswordRequest,
): Promise<ApiResult<{ message?: string }>> {
  const headers: Record<string, string> = {};
  if (form.verifyToken) {
    headers.resettoken = form.verifyToken;
  }

  return request("/auth/reset-password", {
    method: "POST",
    headers,
    body: JSON.stringify({
      newPassword: form.newPassword,
      confirmPassword: form.confirmPassword,
    }),
  });
}

// ─── Placements ───────────────────────────────────────────────────────────────

/**
 * GET /api/placements
 * Used by: browse-placements/page.tsx (when ready)
 */
export async function changePassword(
  form: ChangePasswordRequest,
  token: string,
): Promise<ApiResult<{ message?: string }>> {
  return request("/auth/change-password", {
    method: "POST",
    token,
    body: JSON.stringify(form),
  });
}

export async function getPlacements(params?: {
  specialty?: string;
  city?: string;
  search?: string;
}): Promise<ApiResult<Placement[]>> {
  const query = new URLSearchParams(
    Object.fromEntries(
      Object.entries(params ?? {}).filter(([, v]) => Boolean(v)),
    ),
  ).toString();
  return request(`/placements${query ? `?${query}` : ""}`);
}
