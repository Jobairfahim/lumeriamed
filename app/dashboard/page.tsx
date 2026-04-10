"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  MessageSquare,
  Eye,
  Settings,
} from "lucide-react";
import Image from "next/image";
import { getStudentDashboardOverview, getStudentProfile } from "@/lib/api";
import type {
  DashboardOverview,
  DashboardOverviewApplication,
  DashboardOverviewNotification,
} from "@/lib/types";

const statusStyles: Record<string, string> = {
  Processing: "bg-orange-100 text-orange-600",
  Approved: "bg-teal-100 text-teal-700",
  Pending: "bg-gray-100 text-gray-500",
  Rejected: "bg-red-100 text-red-600",
};

function formatStatus(application: DashboardOverviewApplication) {
  const rawStatus =
    application.status ??
    application.stage ??
    application.studentStatus ??
    application.adminStatus ??
    application.hospitalStatus ??
    "Pending";

  const normalized = rawStatus.toLowerCase();

  if (normalized.includes("approve")) return "Approved";
  if (normalized.includes("reject")) return "Rejected";
  if (normalized.includes("process")) return "Processing";
  if (normalized.includes("review")) return "Processing";
  if (normalized.includes("payment")) return "Processing";
  return "Pending";
}

function formatDate(value?: string) {
  if (!value) return "-";

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function getApplicationId(application: DashboardOverviewApplication, index: number) {
  return application.applicationId || application.id || `APP-${index + 1}`;
}

function getApplicationMongoId(application: DashboardOverviewApplication) {
  return application._id || application.id || '';
}

function getProgramName(application: DashboardOverviewApplication) {
  return (
    application.program ||
    application.preferredSpecialty ||
    application.specialty ||
    "General Placement"
  );
}

function getNotificationText(notification: DashboardOverviewNotification) {
  return notification.text || notification.message || notification.title || "New update";
}

function getNotificationTime(notification: DashboardOverviewNotification) {
  return notification.time || formatDate(notification.createdAt);
}

export default function DashboardPage() {
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [displayName, setDisplayName] = useState("Student");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("accessToken") ?? "" : "";

    const loadDashboard = async () => {
      setLoadError(null);

      const [overviewResult, profileResult] = await Promise.all([
        getStudentDashboardOverview(token),
        getStudentProfile(token),
      ]);

      if (!overviewResult.success) {
        setLoadError(overviewResult.error);
        setLoading(false);
        return;
      }

      setOverview(overviewResult.data);

      if (profileResult.success) {
        const profile = profileResult.data;
        const fullName =
          profile.fullName ??
          profile.name ??
          [profile.firstName, profile.lastName].filter(Boolean).join(" ").trim();

        if (fullName) {
          setDisplayName(fullName.split(" ")[0] || fullName);
        }
      } else if (overviewResult.data.fullName || overviewResult.data.firstName) {
        const fullName = overviewResult.data.fullName || overviewResult.data.firstName || "Student";
        setDisplayName(fullName.split(" ")[0] || fullName);
      }

      setLoading(false);
    };

    void loadDashboard();
  }, []);

  const applications = useMemo(
    () => overview?.allApplications ?? overview?.applications ?? [],
    [overview],
  );
  const notifications = useMemo(() => overview?.notifications ?? [], [overview]);

  const stats = [
    {
      label: "Total Applications",
      value: overview?.total ?? 0,
      icon: FileText,
      color: "bg-brand-tealLight text-brand-teal",
    },
    {
      label: "Approved",
      value: overview?.approved ?? 0,
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Processing",
      value: overview?.pending ?? 0,
      icon: Clock,
      color: "bg-orange-100 text-orange-500",
    },
    {
      label: "Rejected",
      value: overview?.rejected ?? 0,
      icon: XCircle,
      color: "bg-red-100 text-red-500",
    },
  ];

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="relative flex min-h-[130px] items-center overflow-hidden rounded-2xl bg-brand-teal px-4 py-6 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            className="h-full w-full object-cover opacity-30"
            width={1200}
            height={130}
          />
        </div>
        <div className="relative z-10 max-w-[620px]">
          <h1 className="mb-2 font-display text-2xl font-bold text-white sm:text-3xl">
            Welcome back, {displayName}
          </h1>
          <p className="text-sm leading-relaxed text-white/80">
            This is your student dashboard where you can manage your applications
            and account information.
          </p>
        </div>
      </div>

      {loadError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {loadError}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-soft sm:p-5"
          >
            <div
              className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${stat.color}`}
            >
              <stat.icon size={18} />
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-brand-navy">
                {loading ? "--" : String(stat.value).padStart(2, "0")}
              </p>
              <p className="text-xs leading-tight text-brand-muted">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
        <div className="overflow-hidden rounded-2xl bg-white shadow-soft lg:col-span-2">
          <div className="flex items-center justify-between border-b border-brand-border px-4 py-4 sm:px-6">
            <h2 className="flex items-center gap-2 font-semibold text-brand-navy">
              <FileText size={16} className="text-brand-teal" /> All Applications
            </h2>
          </div>

          <div className="space-y-3 p-4 sm:hidden">
            {applications.length === 0 ? (
              <div className="rounded-xl border border-brand-border bg-brand-light p-4 text-sm text-brand-muted">
                No applications found.
              </div>
            ) : (
              applications.map((application, index) => {
                const applicationId = getApplicationId(application, index);
                const applicationMongoId = getApplicationMongoId(application);
                const status = formatStatus(application);

                return (
                  <div
                    key={applicationId}
                    className="rounded-xl border border-brand-border bg-brand-light p-4"
                  >
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
                          Application ID
                        </p>
                        <p className="mt-1 text-sm font-semibold text-brand-navy">
                          {applicationId}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
                      >
                        {status}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-brand-slate">{getProgramName(application)}</p>
                      <p className="text-xs text-brand-muted">
                        {formatDate(application.date || application.createdAt)}
                      </p>
                      <Link
                        href={`/dashboard/applications/${applicationMongoId}`}
                        className="inline-flex items-center justify-center rounded-lg border border-brand-teal px-3 py-1.5 text-xs font-medium text-brand-teal transition-colors hover:bg-brand-teal hover:text-white"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="hidden overflow-x-auto sm:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F4F6F8]">
                  {["Application ID", "Program", "Date", "Status", "Action"].map(
                    (heading) => (
                      <th
                        key={heading}
                        className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-brand-muted"
                      >
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {applications.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-6 text-center text-sm text-brand-muted"
                    >
                      No applications found.
                    </td>
                  </tr>
                ) : (
                  applications.map((application, index) => {
                    const applicationId = getApplicationId(application, index);
                    const applicationMongoId = getApplicationMongoId(application);
                    const status = formatStatus(application);

                    return (
                      <tr
                        key={applicationId}
                        className="border-t border-brand-border transition-colors hover:bg-brand-light"
                      >
                        <td className="px-5 py-3.5 text-xs font-medium text-brand-navy">
                          {applicationId}
                        </td>
                        <td className="px-5 py-3.5 text-xs text-brand-slate">
                          {getProgramName(application)}
                        </td>
                        <td className="px-5 py-3.5 text-xs text-brand-slate">
                          {formatDate(application.date || application.createdAt)}
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
                          >
                            {status}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <Link
                            href={`/dashboard/applications/${applicationMongoId}`}
                            className="text-xs font-medium text-brand-teal hover:underline"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-soft">
          <div className="border-b border-brand-border px-5 py-4">
            <h2 className="text-sm font-semibold text-brand-navy">Notifications</h2>
          </div>
          <div className="divide-y divide-brand-border">
            {notifications.length === 0 ? (
              <div className="px-5 py-4 text-sm text-brand-muted">
                No notifications available.
              </div>
            ) : (
              notifications.map((notification, index) => (
                <div key={`${getNotificationText(notification)}-${index}`} className="px-5 py-3.5">
                  <p className="text-xs leading-relaxed text-brand-slate">
                    {getNotificationText(notification)}
                  </p>
                  <p className="mt-1 text-[10px] text-brand-muted">
                    {getNotificationTime(notification)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-soft sm:p-5">
        <h2 className="mb-4 text-sm font-semibold text-brand-navy">
          Quick Actions
        </h2>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/dashboard/messages"
            className="flex items-center justify-center gap-2 rounded-xl bg-brand-teal px-5 py-2.5 text-xs font-medium text-white transition-all hover:bg-brand-tealDark sm:justify-start"
          >
            <MessageSquare size={14} /> Check Messages
          </Link>
          <Link
            href="/dashboard/applications"
            className="flex items-center justify-center gap-2 rounded-xl bg-brand-navy px-5 py-2.5 text-xs font-medium text-white transition-all hover:opacity-90 sm:justify-start"
          >
            <Eye size={14} /> View My Applications
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center justify-center gap-2 rounded-xl border border-brand-border px-5 py-2.5 text-xs font-medium text-brand-slate transition-all hover:border-brand-teal hover:text-brand-teal sm:justify-start"
          >
            <Settings size={14} /> Account Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
