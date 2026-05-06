"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import {
  Check,
  Clock3,
  FileUp,
  Languages,
  MapPin,
  Timer,
} from "lucide-react";
import { getStudentPlacementEnquiryById } from "@/lib/api";
import type { StudentPlacementEnquiryDetail } from "@/lib/types";

type ApplicationStage =
  | "payment_required_initial"
  | "matching_in_progress"
  | "awaiting_response"
  | "payment_required_final"
  | "accepted";

function getApplicationStage(stage: string, firstPayment: string, finalPayment: string): ApplicationStage {
  if (stage === "awaiting for payment" && firstPayment === "pending") {
    return "payment_required_initial";
  } else if (stage === "matching required" || stage === "awaiting response") {
    return "matching_in_progress";
  } else if (stage === "awaiting for payment" && firstPayment === "paid" && finalPayment === "pending") {
    return "payment_required_final";
  } else if (stage === "completed") {
    return "accepted";
  } else {
    return "payment_required_initial";
  }
}

const STATUS_COPY: Record<
  ApplicationStage,
  {
    badge: string;
    badgeClassName: string;
    ctaLabel?: string;
    ctaHref?: string;
    showApplicationDetails: boolean;
    showUpload: boolean;
    showPlacementDetails: boolean;
  }
> = {
  payment_required_initial: {
    badge: "Payment Required",
    badgeClassName: "bg-[#fff4df] text-[#f0b44d]",
    ctaLabel: "Payment Now",
    showApplicationDetails: true,
    showUpload: false,
    showPlacementDetails: false,
  },
  matching_in_progress: {
    badge: "Matching In Progress",
    badgeClassName: "bg-[#fff4df] text-[#f0b44d]",
    showApplicationDetails: true,
    showUpload: true,
    showPlacementDetails: false,
  },
  awaiting_response: {
    badge: "Awaiting Response",
    badgeClassName: "bg-[#fff4df] text-[#f0b44d]",
    showApplicationDetails: false,
    showUpload: false,
    showPlacementDetails: true,
  },
  payment_required_final: {
    badge: "Payment Required",
    badgeClassName: "bg-[#fff4df] text-[#f0b44d]",
    ctaLabel: "Payment Required",
    showApplicationDetails: false,
    showUpload: false,
    showPlacementDetails: true,
  },
  accepted: {
    badge: "Accepted",
    badgeClassName: "bg-[#eaf8f4] text-[#49b68d]",
    showApplicationDetails: false,
    showUpload: false,
    showPlacementDetails: true,
  },
};

const STAGES = [
  { key: "pending", label: "Pending" },
  { key: "matching", label: "Matching" },
  { key: "approved", label: "Approved" },
] as const;

function getCompletedSteps(stage: ApplicationStage) {
  switch (stage) {
    case "payment_required_initial":
      return 1;
    case "matching_in_progress":
    case "awaiting_response":
    case "payment_required_final":
      return 2;
    case "accepted":
      return 3;
  }
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string; size?: string | number; strokeWidth?: string | number }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 rounded-full bg-brand-tealLight p-1.5 text-brand-teal">
        <Icon size={13} strokeWidth={2} />
      </div>
      <div>
        <p className="text-xs text-[#b2b8bd]">{label}</p>
        <p className="mt-1 text-sm font-medium text-[#3b4349]">{value}</p>
      </div>
    </div>
  );
}

function SectionCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-[24px] bg-white shadow-soft ${className}`}>{children}</section>;
}

export default function ApplicationStatusPage() {
  const params = useParams();
  const router = useRouter();
  const [application, setApplication] = useState<StudentPlacementEnquiryDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplication = async () => {
      const token = typeof window !== "undefined" 
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
        const token = typeof window !== "undefined" 
          ? localStorage.getItem("accessToken") ?? ""
          : "";
        
        if (token && params.id) {
          getStudentPlacementEnquiryById(params.id as string, token)
            .then(result => {
              if (result.success) {
                setApplication(result.data);
                window.history.replaceState({}, '', window.location.pathname);
              }
            });
        }
      }
    };

    handlePaymentReturn();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-teal"></div>
          <p className="mt-4 text-sm text-brand-muted">Loading application status...</p>
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
            Back to Applications
          </Link>
        </div>
      </div>
    );
  }

  const activeStage = getApplicationStage(application.stage, application.firstPayment, application.finalPayment);
  const status = STATUS_COPY[activeStage];
  const completedSteps = getCompletedSteps(activeStage);
  const progressWidth =
    completedSteps === 1 ? "0%" : completedSteps === 2 ? "50%" : "100%";

  return (
    <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-6">
      <SectionCard className="px-4 py-5 sm:px-6 sm:py-6">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="font-display text-[1.55rem] font-semibold tracking-[-0.03em] text-brand-navy sm:text-[1.8rem]">
                Application Status
              </h1>
              <p className="mt-1 text-sm font-medium text-[#687179]">ID: {application._id}</p>
              <p className="mt-1 text-sm text-[#afb6bc]">Applied {new Date(application.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="sm:text-right">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c1c6ca]">
                Status
              </p>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${status.badgeClassName}`}
              >
                {status.badge}
              </span>
            </div>
          </div>

          <div className="relative pt-1">
            <div className="absolute left-[18px] right-[18px] top-[19px] h-px bg-[#d8dddf] sm:left-[32px] sm:right-[32px]" />
            <div
              className="absolute left-[18px] top-[19px] h-px bg-brand-teal transition-all sm:left-[32px]"
              style={{ width: progressWidth }}
            />

            <div className="relative grid grid-cols-3 gap-3">
              {STAGES.map((step, index) => {
                const done = index < completedSteps;

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
      </SectionCard>

      {status.showApplicationDetails && (
        <div className="grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
          <SectionCard className="px-4 py-5 sm:px-5">
            <div className="space-y-5">
              <DetailItem icon={Timer} label="Duration" value={application.duration} />
              <DetailItem icon={Clock3} label="Start Date" value={application.preferredStartDate} />
              <DetailItem icon={Languages} label="Language" value={application.language} />
              <DetailItem icon={MapPin} label="Preferred Cities" value={application.preferredCities} />
            </div>
          </SectionCard>

          <SectionCard className="px-4 py-5 sm:px-5">
            <div className="space-y-5">
              <div>
                <p className="text-xs text-[#b2b8bd]">Preferred Specialty</p>
                <p className="mt-1 text-sm font-medium text-[#3b4349]">{application.preferredSpecialty}</p>
              </div>

              <div>
                <p className="text-xs text-[#b2b8bd]">Elective Requirements</p>
                <p className="mt-1 max-w-[70ch] text-sm leading-6 text-[#5c656c]">
                  {application.additionalInformation || 'No additional information provided'}
                </p>
              </div>
            </div>
          </SectionCard>
        </div>
      )}

      {status.showUpload && (
        <SectionCard className="px-4 py-5 sm:px-5">
          <p className="mb-4 text-sm font-medium text-[#4b545b]">Upload Your Documents</p>
          <button className="flex h-14 w-full items-center justify-center gap-2 rounded-[18px] border border-dashed border-[#d8eaea] bg-[#fcfefe] text-sm font-medium text-brand-teal transition-all hover:border-brand-teal hover:bg-brand-tealLight/30">
            Upload <FileUp size={14} />
          </button>
        </SectionCard>
      )}

      {status.showPlacementDetails && (
        <div className="space-y-5">
          <div>
            <h2 className="font-display text-[1.55rem] font-semibold tracking-[-0.03em] text-brand-navy sm:text-[1.8rem]">
              Placement Details
            </h2>
          </div>

          <SectionCard className="px-4 py-5 sm:px-5">
            <div className="text-center py-8">
              <p className="text-sm text-brand-muted">
                Placement details will be available once a placement has been assigned.
              </p>
            </div>
          </SectionCard>
        </div>
      )}

      {status.ctaLabel && (
        <div className="flex justify-end">
          <button
            onClick={() => {
              const paymentType = activeStage === "payment_required_initial" ? "deposit" : "final";
              const returnTo = encodeURIComponent(`/dashboard/application-status/${params.id}`);
              router.push(`/payment?type=${paymentType}&returnTo=${returnTo}`);
            }}
            className="inline-flex min-w-[190px] items-center justify-center rounded-xl bg-brand-teal px-6 py-3 text-sm font-medium text-white transition-all hover:bg-brand-tealDark"
          >
            {status.ctaLabel}
          </button>
        </div>
      )}
    </div>
  );
}
