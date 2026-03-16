import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Check,
  Clock3,
  FileUp,
  Languages,
  MapPin,
  Timer,
  University,
  Users,
} from "lucide-react";

type ApplicationStage =
  | "payment_required_initial"
  | "matching_in_progress"
  | "awaiting_response"
  | "payment_required_final"
  | "accepted";

const ACTIVE_STAGE: ApplicationStage = "payment_required_final";

const APPLICATION = {
  id: "AAOUR435",
  appliedAt: "12 Jan 2026",
  duration: "6 month",
  startDate: "12/2/2026",
  language: "English",
  preferredCities: "London",
  preferredSpeciality: "Cardiology Rotation",
  electiveRequirements:
    "I am a final-year medical student who is very interested in cardiology. I have completed my internal medicine rotation and performed very well in cardiac care. I am eager to learn from experienced cardiologists and gain practical, hands-on experience in this field.",
  placement: {
    university: "AB University",
    department: "Medical University",
    location: "London",
    seats: "3 / 5",
    duration: "4 Weeks",
    deadline: "15 Apr 2026",
    startDate: "12/2/2026",
  },
};

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
    ctaHref: "/payment?type=deposit&returnTo=%2Fdashboard%2Fapplication-status",
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
    ctaHref: "/payment?type=final&returnTo=%2Fdashboard%2Fapplication-status",
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
  icon: ComponentType<{ className?: string; size?: number; strokeWidth?: number }>;
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
  const status = STATUS_COPY[ACTIVE_STAGE];
  const completedSteps = getCompletedSteps(ACTIVE_STAGE);
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
              <p className="mt-1 text-sm font-medium text-[#687179]">ID: {APPLICATION.id}</p>
              <p className="mt-1 text-sm text-[#afb6bc]">Applied {APPLICATION.appliedAt}</p>
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
              <DetailItem icon={Timer} label="Duration" value={APPLICATION.duration} />
              <DetailItem icon={Clock3} label="Start Date" value={APPLICATION.startDate} />
              <DetailItem icon={Languages} label="Language" value={APPLICATION.language} />
              <DetailItem icon={MapPin} label="Preferred Cities" value={APPLICATION.preferredCities} />
            </div>
          </SectionCard>

          <SectionCard className="px-4 py-5 sm:px-5">
            <div className="space-y-5">
              <div>
                <p className="text-xs text-[#b2b8bd]">Preferred Specialty</p>
                <p className="mt-1 text-sm font-medium text-[#3b4349]">{APPLICATION.preferredSpeciality}</p>
              </div>

              <div>
                <p className="text-xs text-[#b2b8bd]">Elective Requirements</p>
                <p className="mt-1 max-w-[70ch] text-sm leading-6 text-[#5c656c]">
                  {APPLICATION.electiveRequirements}
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

          <SectionCard className="px-4 py-5 sm:px-6 sm:py-6">
            <h3 className="border-b border-dashed border-[#dbeef0] pb-5 text-center font-display text-[1.25rem] font-semibold tracking-[-0.03em] text-[#42484d]">
              {APPLICATION.placement.university}
            </h3>

            <div className="grid gap-5 pt-5 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-6">
              <DetailItem icon={University} label="Department" value={APPLICATION.placement.department} />
              <DetailItem icon={MapPin} label="Location" value={APPLICATION.placement.location} />
              <DetailItem icon={Users} label="Seats" value={APPLICATION.placement.seats} />
              <DetailItem icon={Timer} label="Duration" value={APPLICATION.placement.duration} />
              <DetailItem icon={CalendarDays} label="Deadline" value={APPLICATION.placement.deadline} />
              <DetailItem icon={CalendarDays} label="Start Date" value={APPLICATION.placement.startDate} />
            </div>
          </SectionCard>
        </div>
      )}

      {status.ctaLabel && (
        <div className="flex justify-end">
          <Link
            href={status.ctaHref ?? "#"}
            className="inline-flex min-w-[190px] items-center justify-center rounded-xl bg-brand-teal px-6 py-3 text-sm font-medium text-white transition-all hover:bg-brand-tealDark"
          >
            {status.ctaLabel}
          </Link>
        </div>
      )}
    </div>
  );
}
