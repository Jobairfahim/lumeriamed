"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, GraduationCap, Phone, Clock, Calendar, Globe, MapPin, FileText, Eye, Check } from "lucide-react";
import { getStudentPlacementEnquiryById } from "@/lib/api";
import type { StudentPlacementEnquiryDetail } from "@/lib/types";

const statusStyles: Record<string, string> = {
  pending: "bg-gray-100 text-gray-500",
  under_review: "bg-orange-100 text-orange-600",
  matched: "bg-blue-100 text-blue-700",
  confirmed: "bg-teal-100 text-teal-700",
  completed: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-600",
  Processing: "bg-orange-100 text-orange-600",
  Approved: "bg-teal-100 text-teal-700",
  Pending: "bg-gray-100 text-gray-500",
  Rejected: "bg-red-100 text-red-600",
};

export default function ApplicationDetailPage() {
  const params = useParams();
  const [application, setApplication] = useState<StudentPlacementEnquiryDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchApplication = async () => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken") ?? ""
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

  // Refetch data when returning from payment page
  useEffect(() => {
    const handlePaymentReturn = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const paymentStatus = urlParams.get('payment');
      
      if (paymentStatus === 'success' || paymentStatus === 'completed') {
        // Refetch application data to get updated payment status
        const token = typeof window !== "undefined" 
          ? localStorage.getItem("accessToken") ?? ""
          : "";
        
        if (token && params.id) {
          getStudentPlacementEnquiryById(params.id as string, token)
            .then(result => {
              if (result.success) {
                setApplication(result.data);
                // Clean URL parameters
                window.history.replaceState({}, '', window.location.pathname);
              }
            });
        }
      }
    };

    handlePaymentReturn();
  }, [params.id]);

  const handleViewDocument = (documentUrl: string) => {
    // Open document in new tab
    window.open(documentUrl, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-teal"></div>
          <p className="mt-4 text-sm text-brand-muted">Loading application details...</p>
        </div>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-sm text-brand-muted">{error || "Application not found"}</p>
          <Link href="/dashboard/applications" className="mt-4 inline-flex items-center gap-1.5 text-sm text-brand-teal transition-colors hover:text-brand-tealDark">
            <ArrowLeft size={16} /> Back to Applications
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Back link */}
      <Link href="/dashboard/applications" className="mb-5 inline-flex items-center gap-1.5 text-sm text-brand-slate transition-colors hover:text-brand-navy sm:mb-6">
        <ArrowLeft size={16} /> Go to back
      </Link>

      {/* Application Status Card */}
      <div className="mb-6 rounded-2xl bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="font-display text-[1.55rem] font-semibold tracking-[-0.03em] text-brand-navy sm:text-[1.8rem]">
                Application Status
              </h2>
              <p className="mt-1 text-sm font-medium text-[#687179]">ID: {application._id}</p>
              <p className="mt-1 text-sm text-[#afb6bc]">Applied {new Date(application.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="sm:text-right">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c1c6ca]">
                Status
              </p>
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusStyles[application.studentStatus] || statusStyles.pending}`}>
                {application.studentStatus || 'pending'}
              </span>
            </div>
          </div>

          <div className="relative pt-1">
            <div className="absolute left-[18px] right-[18px] top-[19px] h-px bg-[#d8dddf] sm:left-[32px] sm:right-[32px]" />
            <div
              className="absolute left-[18px] top-[19px] h-px bg-brand-teal transition-all sm:left-[32px]"
              style={{ width: application.studentStatus === "pending" ? "0%" : application.studentStatus === "under_review" ? "50%" : "100%" }}
            />

            <div className="relative grid grid-cols-3 gap-3">
              {[
                { key: "pending", label: "Pending" },
                { key: "matching", label: "Matching" },
                { key: "approved", label: "Approved" },
              ].map((step, index) => {
                const done = application.studentStatus === "confirmed" ? true : application.studentStatus === "under_review" ? index < 1 : false;

                return (
                  <div key={step.key} className="flex flex-col items-center text-center">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full border-2 ${
                        done ? "border-brand-teal bg-brand-teal text-white" : "border-[#d9dcdf] bg-white text-transparent"
                      }`}
                    >
                      <Check size={16} strokeWidth={3} />
                    </div>
                    <p className="mt-3 text-sm font-medium text-[#3d454b]">{step.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-5">

        {/* ── Left: student info card ────────────────────────────────────── */}
        <div className="rounded-2xl bg-white p-4 shadow-soft sm:p-6 lg:col-span-2">
          {/* Avatar + name */}
          <div className="mb-5 flex flex-col items-center border-b border-brand-border pb-5 text-center sm:mb-6 sm:pb-6">
            <div className="relative mb-3 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-brand-gray ring-2 ring-brand-tealLight">
              <span className="absolute text-sm font-semibold text-brand-navy">
                {application.firstName?.[0]}{application.lastName?.[0]}
              </span>
            </div>
            <h2 className="font-display font-bold text-brand-navy text-lg">
              {application.studentData?.fullName || `${application.firstName} ${application.lastName}`}
            </h2>
            <p className="text-brand-muted text-sm">Year {application.yearOfStudy}</p>
          </div>

          {/* Info rows */}
          <div className="flex flex-col gap-4">
            {[
              { icon: Mail,            label: "Email",           value: application.email },
              { icon: GraduationCap,   label: "University",      value: application.universityOrMedicalSchool },
              { icon: Phone,           label: "Phone",           value: application.phoneNumber },
              { icon: Clock,           label: "Duration",        value: application.duration },
              { icon: Calendar,        label: "Start Date",      value: application.preferredStartDate },
              { icon: Globe,           label: "Language",        value: application.language },
              { icon: MapPin,          label: "Preferred Cities",value: application.preferredCities },
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
        </div>

        {/* ── Right: details + documents ────────────────────────────────── */}
        <div className="flex flex-col gap-4 sm:gap-5 lg:col-span-3">

          {/* Specialty + status */}
          <div className="rounded-2xl bg-white p-4 shadow-soft sm:p-6">
            <div className="mb-4 flex flex-col items-start gap-3 sm:flex-row sm:justify-between">
              <div>
                <p className="text-brand-muted text-xs mb-1">Preferred Specialty</p>
                <h3 className="font-semibold text-brand-navy text-base">{application.preferredSpecialty}</h3>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-brand-muted text-xs mb-1">STATUS</p>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[application.studentStatus] || statusStyles.pending}`}>
                  {application.studentStatus || 'pending'}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-brand-muted text-xs mb-1">Application date</p>
              <p className="font-semibold text-brand-navy text-sm">{new Date(application.createdAt).toLocaleDateString()}</p>
            </div>

            <div>
              <p className="text-brand-muted text-xs mb-2">Elective Requirements</p>
              <p className="text-brand-slate text-sm leading-relaxed">{application.additionalInformation || 'No additional information provided'}</p>
            </div>
          </div>

          {/* Submitted documents */}
          <div className="rounded-2xl bg-white p-4 shadow-soft sm:p-6">
            <h3 className="font-semibold text-brand-navy text-sm mb-4">Submitted Documents</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {application.documents.map((doc: string, index: number) => (
                <div key={index} className="flex items-center justify-between gap-3 rounded-xl border border-brand-border bg-brand-light p-3.5 transition-all hover:border-brand-teal">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-brand-tealLight flex items-center justify-center flex-shrink-0">
                      <FileText size={13} className="text-brand-teal" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-brand-navy text-xs font-medium">Document {index + 1}</p>
                      <p className="text-brand-muted text-[10px]">File uploaded</p>
                    </div>
                  </div>
                  {/**
                   * ── INTEGRATION POINT ──
                   * Replace href with actual document download URL
                   */}
                  <button 
                    onClick={() => handleViewDocument(application.documents[index])}
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

      {/* Payment button — fixed bottom right */}
      {/**
       * ── INTEGRATION POINT ──
       * Wire to payment gateway (Stripe, etc.)
       */}
      <div onClick={()=>router.push(`/payment/${application?._id}`)} className="mt-6 flex justify-stretch sm:justify-end">
        <button className="w-full rounded-xl bg-brand-teal px-8 py-3 text-sm font-medium text-white transition-all hover:bg-brand-tealDark sm:w-auto">
          Payment Now
        </button>
      </div>
    </div>
  );
}
