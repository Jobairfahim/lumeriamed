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
  lastName: string;
  email: string;
  phone: string;
  university: string;
  yearOfStudy: string;
  preferredSpecialty: string;
  preferredCities: string;
  duration: string;
  preferredStartDate: string;
  language: string;
  additionalInfo?: string;
  placementId?: string;
  documents?: string[];
}

export interface StudentPlacementEnquiry {
  _id: string;
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  university: string;
  yearOfStudy: string;
  preferredSpecialty: string;
  preferredCities: string;
  duration: string;
  preferredStartDate: string;
  language: string;
  additionalInfo?: string;
  placementId?: string;
  documents?: string[];
  status?: string;
  studentStatus?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudentPlacementEnquiryDetail {
  _id: string;
  studentId: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  universityOrMedicalSchool: string;
  yearOfStudy: number;
  preferredStartDate: string;
  duration: string;
  preferredSpecialty: string;
  preferredCities: string;
  language: string;
  documents: string[];
  additionalInformation: string;
  stage: string;
  hospitalStatus: string;
  studentStatus: string;
  adminStatus: string;
  firstPayment: string;
  finalPayment: string;
  isVisibleToHospitals: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  studentUser: {
    _id: string;
    email: string;
    role: string;
  };
  studentData: {
    _id: string;
    userId: string;
    fullName: string;
    createdAt: string;
    updatedAt: string;
    languages: string;
    phoneNumber: string;
    preferredCities: string;
    preferredSpecialty: string;
    university: string;
    yearOfStudy: number;
  };
  matchingPlacements: Placement[];
}

/** Login form */
export interface LoginForm {
  email: string;
  password: string;
}

export interface GoogleAuthRequest {
  googleId: string;
  email: string;
  email_verified: boolean;
  name: string;
  picture: string;
}

/** Signup form */
export interface SignupForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest extends VerifyOtpRequest {
  verifyToken?: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
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

export interface StudentProfile {
  id?: string;
  studentId?: string;
  fullName?: string;
  userId?: {
    _id?: string;
    email?: string;
  } | string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  phone?: string;
  universityOrMedicalSchool?: string;
  university?: string;
  yearOfStudy?: number | string;
  preferredSpecialty?: string;
  preferredCities?: string;
  languages?: string;
  avatar?: string;
  profileImage?: string;
}

export interface ConversationParticipant {
  _id?: string;
  id?: string;
  fullName?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  profileImage?: string;
  email?: string;
  role?: string;
}

export interface ConversationSummary {
  _id?: string;
  id?: string;
  conversationId?: string;
  title?: string;
  name?: string;
  participants?: ConversationParticipant[];
  lastMessage?: {
    _id?: string;
    id?: string;
    content?: string;
    createdAt?: string;
    senderId?: string | { _id?: string; id?: string };
  };
  updatedAt?: string;
  createdAt?: string;
}

export interface ConversationMessage {
  _id?: string;
  id?: string;
  conversationId?: string;
  content?: string;
  attachments?: unknown[];
  createdAt?: string;
  updatedAt?: string;
  senderId?:
    | string
    | {
        _id?: string;
        id?: string;
        fullName?: string;
        name?: string;
        firstName?: string;
        lastName?: string;
        avatar?: string;
        profileImage?: string;
      };
}

export interface UpdateStudentProfileRequest {
  fullName: string;
  phoneNumber: string;
  university: string;
}

export interface DashboardOverviewStat {
  totalApplications?: number;
  approved?: number;
  processing?: number;
  rejected?: number;
}

export interface DashboardOverviewApplication {
  _id?: string;
  id?: string;
  applicationId?: string;
  program?: string;
  specialty?: string;
  preferredSpecialty?: string;
  date?: string;
  createdAt?: string;
  status?: string;
  stage?: string;
  studentStatus?: string;
  adminStatus?: string;
  hospitalStatus?: string;
}

export interface DashboardOverviewNotification {
  text?: string;
  message?: string;
  title?: string;
  time?: string;
  createdAt?: string;
}

export interface DashboardOverview {
  fullName?: string;
  firstName?: string;
  total?: number;
  pending?: number;
  approved?: number;
  rejected?: number;
  stats?: DashboardOverviewStat;
  allApplications?: DashboardOverviewApplication[];
  recentApplications?: DashboardOverviewApplication[];
  applications?: DashboardOverviewApplication[];
  notifications?: DashboardOverviewNotification[];
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
