// ─── API Result wrapper ───────────────────────────────────────────────────────
export type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

// ─── Placement ────────────────────────────────────────────────────────────────
export interface Placement {
  id: string;
  title: string;
  hospital: string;
  city: string;
  specialty: string;
  duration: string;
  startDate: string;
  spotsAvailable: number;
  language: "English" | "Chinese" | "Bilingual";
  description: string;
  imageUrl: string;
  fee?: number;
  tags?: string[];
}

// ─── Forms ────────────────────────────────────────────────────────────────────

/** Simple contact / enquiry form */
export interface EnquiryForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
}

/** Full placement enquiry form */
export interface PlacementEnquiryForm {
  firstName: string;
  email: string;
  phone: string;
  university: string;
  yearOfStudy: string;
  preferredSpecialty: string;
  preferredCities?: string;
  duration: string;
  preferredStartDate: string;
  language?: string;
  additionalInfo?: string;
  placementId?: string;
}

/** Login form */
export interface LoginForm {
  email: string;
  password: string;
}

// ─── Application ─────────────────────────────────────────────────────────────
export type ApplicationStatus =
  | "pending"
  | "under_review"
  | "matched"
  | "confirmed"
  | "rejected"
  | "completed";

export interface Application {
  id: string;
  studentId: string;
  placementId: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
}

// ─── User ─────────────────────────────────────────────────────────────────────
export type UserRole = "student" | "hospital" | "admin";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  createdAt: string;
}

// ─── Navigation ──────────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
}

// ─── How It Works Steps ──────────────────────────────────────────────────────
export interface HowItWorksStep {
  id: number;
  title: string;
  description: string;
  image: string;
  alt: string;
}

// ─── Why Choose Features ─────────────────────────────────────────────────────
export interface WhyChooseFeature {
  id: number;
  icon: string;
  title: string;
  description: string;
  highlight: boolean;
}
