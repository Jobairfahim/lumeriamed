"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Mail, GraduationCap, Phone, Clock,
  Calendar, Globe, MapPin, FileText, Eye, Check,
} from "lucide-react";
import { getStudentPlacementEnquiryById } from "@/lib/api";
import type { StudentPlacementEnquiryDetail } from "@/lib/types";

// ── studentStatus: 'pending' | 'matching' | 'approved' | 'rejected'
const studentStatusStyles: Record<string, string> = {
  pending:  "bg-gray-100 text-gray-600",
  matching: "bg-blue-100 text-blue-700",
  approved: "bg-teal-100 text-teal-700",
  rejected: "bg-red-100 text-red-600",
};

// ── hospitalStatus / adminStatus: 'pending' | 'approved' | 'rejected'
const genericStatusStyles: Record<string, string> = {
  pending:  "bg-gray-100 text-gray-600",
  approved: "bg-teal-100 text-teal-700",
  rejected: "bg-red-100 text-red-600",
};

// ── stage: 'awaiting for payment' | 'matching required' | 'awaiting response' | 'completed' | 'rejected'
const stageStyles: Record<string, string> = {
  "awaiting for payment": "bg-amber-100 text-amber-800 border border-amber-300",
  "matching required":    "bg-blue-100  text-blue-800  border border-blue-300",
  "awaiting response":    "bg-green-100 text-green-700 border border-green-300",
  "completed":            "bg-teal-100  text-teal-700  border border-teal-300",
  "rejected":             "bg-red-100   text-red-700   border border-red-300",
};

// ── firstPayment / finalPayment: 'pending' | 'paid'
const paymentStyles: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 border border-amber-300",
  paid:    "bg-green-100 text-green-700 border border-green-300",
};

// Progress steps matching actual studentStatus enum
const PROGRESS_STEPS = [
  { key: "pending",  label: "Pending"  },
  { key: "matching", label: "Matching" },
  { key: "approved", label: "Approved" },
] as const;

const stepIndex = (status: string) =>
  PROGRESS_STEPS.findIndex(s => s.key === status);

const progressWidth = (status: string) => {
  const idx = stepIndex(status);
  if (idx <= 0) return "0%";
  return `${(idx / (PROGRESS_STEPS.length - 1)) * 100}%`;
};

// Hide payment button when application is closed or already paid
const showPaymentButton = (
  stage: string,
  firstPayment: string,
  finalPayment: string,
) =>
  stage !== "completed" &&
  stage !== "rejected"  &&
  !(firstPayment === "paid" && finalPayment === "paid");

export default function ApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [application, setApplication] = useState<StudentPlacementEnquiryDetail | null>(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);

  useEffect(() => {
    const fetchApplication = async () => {
      const token =
        typeof window !== "undefined"
          ? (localStorage.getItem("accessToken") ?? "")
          : "";

      if (!token || !params.id) {
        setError("No token or application ID provided");
        setLoading(false);
        return;
      }

      const result = await getStudentPlacementEnquiryById(params.id as string, token);
      if (result.success) {
        setApplication(result.data);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    void fetchApplication();
  }, [params.id]);

  // Refetch after payment redirect
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get("payment");

    if (paymentStatus === "success" || paymentStatus === "completed") {
      const token =
        typeof window !== "undefined"
          ? (localStorage.getItem("accessToken") ?? "")
          : "";

      if (token && params.id) {
        getStudentPlacementEnquiryById(params.id as string, token).then(result => {
          if (result.success) {
            setApplication(result.data);
            window.history.replaceState({}, "", window.location.pathname);
          }
        });
      }
    }
  }, [params.id]);

  const handleViewDocument = (documentUrl: string) => {
    window.open(documentUrl, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-teal" />
          <p className="mt-4 text-sm text-brand-muted">Loading application details...</p>
        </div>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-sm text-brand-muted">{error ?? "Application not found"}</p>
          <Link
            href="/dashboard/applications"
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-brand-teal transition-colors hover:text-brand-tealDark"
          >
            <ArrowLeft size={16} /> Back to Applications
          </Link>
        </div>
      </div>
    );
  }

  const currentStepIdx = stepIndex(application.studentStatus);

  return (
    <div>
      {/* Back link */}
      <Link
        href="/dashboard/applications"
        className="mb-5 inline-flex items-center gap-1.5 text-sm text-brand-slate transition-colors hover:text-brand-navy sm:mb-6"
      >
        <ArrowLeft size={16} /> Go back
      </Link>

      {/* ── Application Status Card ─────────────────────────────────────── */}
      <div className="mb-6 rounded-2xl bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="font-display text-[1.55rem] font-semibold tracking-[-0.03em] text-brand-navy sm:text-[1.8rem]">
                Application Status
              </h2>
              <p className="mt-1 text-sm font-medium text-[#687179]">ID: {application._id}</p>
              <p className="mt-1 text-sm text-[#afb6bc]">
                Applied {new Date(application.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Stage badge (top-level pipeline stage) */}
            <div className="sm:text-right">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c1c6ca]">
                Stage
              </p>
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${stageStyles[application.stage] ?? ""}`}>
                {application.stage}
              </span>
            </div>
          </div>

          {/* Progress bar — driven by studentStatus enum */}
          <div className="relative pt-1">
            {/* Track */}
            <div className="absolute left-[18px] right-[18px] top-[19px] h-px bg-[#d8dddf] sm:left-[32px] sm:right-[32px]" />
            {/* Fill */}
            <div
              className="absolute left-[18px] top-[19px] h-px bg-brand-teal transition-all sm:left-[32px]"
              style={{ width: progressWidth(application.studentStatus) }}
            />

            <div className="relative grid grid-cols-3 gap-3">
              {PROGRESS_STEPS.map((step, index) => {
                const done = currentStepIdx >= index;
                const active = currentStepIdx === index;

                return (
                  <div key={step.key} className="flex flex-col items-center text-center">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${
                        done
                          ? "border-brand-teal bg-brand-teal text-white"
                          : active
                          ? "border-brand-teal bg-white text-brand-teal"
                          : "border-[#d9dcdf] bg-white text-transparent"
                      }`}
                    >
                      <Check size={16} strokeWidth={3} />
                    </div>
                    <p className={`mt-3 text-sm font-medium ${done ? "text-brand-navy" : "text-[#3d454b]"}`}>
                      {step.label}
                    </p>
                    {/* studentStatus badge under each step */}
                    {active && (
                      <span className={`mt-1 text-[10px] px-2 py-0.5 rounded-full font-medium ${studentStatusStyles[application.studentStatus] ?? ""}`}>
                        {application.studentStatus}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payment status summary row */}
          <div className="flex flex-wrap gap-3 border-t border-brand-border pt-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#c1c6ca] mb-1">
                First Payment
              </p>
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${paymentStyles[application.firstPayment] ?? ""}`}>
                {application.firstPayment}
                {application.firstPaymentAmount
                  ? ` — $${application.firstPaymentAmount}`
                  : ""}
              </span>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#c1c6ca] mb-1">
                Final Payment
              </p>
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${paymentStyles[application.finalPayment] ?? ""}`}>
                {application.finalPayment}
                {application.finalPaymentAmount
                  ? ` — $${application.finalPaymentAmount}`
                  : ""}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-5">

        {/* ── Left: student info ───────────────────────────────────────── */}
        <div className="rounded-2xl bg-white p-4 shadow-soft sm:p-6 lg:col-span-2">
          <div className="mb-5 flex flex-col items-center border-b border-brand-border pb-5 text-center sm:mb-6 sm:pb-6">
            <div className="relative mb-3 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-brand-gray ring-2 ring-brand-tealLight">
              <span className="absolute text-sm font-semibold text-brand-navy">
                {application.firstName?.[0]}{application.lastName?.[0]}
              </span>
            </div>
            <h2 className="font-display font-bold text-brand-navy text-lg">
              {application.studentData?.fullName ?? `${application.firstName} ${application.lastName}`}
            </h2>
            <p className="text-brand-muted text-sm">Year {application.yearOfStudy}</p>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { icon: Mail,          label: "Email",            value: application.email },
              { icon: GraduationCap, label: "University",       value: application.universityOrMedicalSchool },
              { icon: Phone,         label: "Phone",            value: application.phoneNumber },
              { icon: Clock,         label: "Duration",         value: application.duration },
              { icon: Calendar,      label: "Start Date",       value: application.preferredStartDate },
              { icon: Globe,         label: "Language",         value: application.language },
              { icon: MapPin,        label: "Preferred Cities", value: application.preferredCities },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <Icon size={14} className="text-brand-teal mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-brand-muted text-xs">{label}</p>
                  <p className="text-brand-navy text-sm font-medium">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* hospitalStatus + adminStatus chips */}
          <div className="mt-5 flex flex-wrap gap-3 border-t border-brand-border pt-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#c1c6ca] mb-1">Hospital</p>
              <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${genericStatusStyles[application.hospitalStatus] ?? ""}`}>
                {application.hospitalStatus}
              </span>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#c1c6ca] mb-1">Admin</p>
              <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${genericStatusStyles[application.adminStatus] ?? ""}`}>
                {application.adminStatus}
              </span>
            </div>
          </div>
        </div>

        {/* ── Right: specialty + documents ────────────────────────────── */}
        <div className="flex flex-col gap-4 sm:gap-5 lg:col-span-3">

          <div className="rounded-2xl bg-white p-4 shadow-soft sm:p-6">
            <div className="mb-4 flex flex-col items-start gap-3 sm:flex-row sm:justify-between">
              <div>
                <p className="text-brand-muted text-xs mb-1">Preferred Specialty</p>
                <h3 className="font-semibold text-brand-navy text-base">{application.preferredSpecialty}</h3>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-brand-muted text-xs mb-1">Student status</p>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${studentStatusStyles[application.studentStatus] ?? ""}`}>
                  {application.studentStatus}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-brand-muted text-xs mb-1">Application date</p>
              <p className="font-semibold text-brand-navy text-sm">
                {new Date(application.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-brand-muted text-xs mb-2">Elective Requirements</p>
              <p className="text-brand-slate text-sm leading-relaxed">
                {application.additionalInformation ?? "No additional information provided"}
              </p>
            </div>
          </div>

          {/* Submitted documents */}
          <div className="rounded-2xl bg-white p-4 shadow-soft sm:p-6">
            <h3 className="font-semibold text-brand-navy text-sm mb-4">Submitted Documents</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {application.documents.map((doc: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-3 rounded-xl border border-brand-border bg-brand-light p-3.5 transition-all hover:border-brand-teal"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-brand-tealLight flex items-center justify-center flex-shrink-0">
                      <FileText size={13} className="text-brand-teal" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-brand-navy text-xs font-medium">Document {index + 1}</p>
                      <p className="text-brand-muted text-[10px]">File uploaded</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleViewDocument(doc)}
                    className="p-1.5 rounded-lg hover:bg-brand-tealLight text-brand-teal transition-all"
                  >
                    <Eye size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment button — hidden when stage is closed or both payments done */}
      {showPaymentButton(application.stage, application.firstPayment, application.finalPayment) && (
        <div
          onClick={() => router.push(`/payment/${application._id}`)}
          className="mt-6 flex justify-stretch sm:justify-end"
        >
          <button className="w-full rounded-xl bg-brand-teal px-8 py-3 text-sm font-medium text-white transition-all hover:bg-brand-tealDark sm:w-auto">
            {application.firstPayment === "pending" ? "Pay First Payment" : "Pay Final Payment"}
          </button>
        </div>
      )}
    </div>
  );
}