"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { getStudentPlacementEnquiries } from "@/lib/api";
import type { StudentPlacementEnquiry } from "@/lib/types";

const statusStyles: Record<string, string> = {
  Processing: "bg-orange-100 text-orange-600",
  Approved: "bg-teal-100 text-teal-700",
  Pending: "bg-gray-100 text-gray-500",
  Rejected: "bg-red-100 text-red-600",
  under_review: "bg-orange-100 text-orange-600",
  matched: "bg-blue-100 text-blue-700",
  confirmed: "bg-teal-100 text-teal-700",
  completed: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-600",
  pending: "bg-gray-100 text-gray-500",
};

const STATUS_OPTIONS = ["All", "pending", "under_review", "matched", "confirmed", "rejected", "completed"] as const;

function formatStatus(application: StudentPlacementEnquiry) {
  const rawStatus =
    application.status ??
    application.studentStatus ??
    "Pending";

  const normalized = rawStatus.toLowerCase();

  if (normalized.includes("approve")) return "Approved";
  if (normalized.includes("reject")) return "Rejected";
  if (normalized.includes("process")) return "Processing";
  if (normalized.includes("review")) return "Processing";
  if (normalized.includes("payment")) return "Processing";
  return "Pending";
}

function getApplicationId(application: StudentPlacementEnquiry, index: number) {
  return application.id || `APP-${index + 1}`;
}

function getProgramName(application: StudentPlacementEnquiry) {
  return (
    application.preferredSpecialty ||
    "General Placement"
  );
}

export default function AllApplicationsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<(typeof STATUS_OPTIONS)[number]>("All");
  const [applications, setApplications] = useState<StudentPlacementEnquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken") ?? ""
          : "";

      if (!token) {
        setLoading(false);
        return;
      }

      const result = await getStudentPlacementEnquiries(token);
      if (result.success) {
        setApplications(result.data);
      }
      setLoading(false);
    };

    void fetchApplications();
  }, []);

  const filtered = applications.filter(
    (application) =>
      ((application._id?.toLowerCase().includes(search.toLowerCase()) || false) ||
        (application.preferredSpecialty?.toLowerCase().includes(search.toLowerCase()) || false)) &&
      (statusFilter === "All" || application.status === statusFilter)
  );

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <h1 className="font-display text-xl font-bold text-brand-navy">
          All Applications
        </h1>
        <Link
          href="/dashboard/applications/new"
          className="inline-flex items-center justify-center rounded-xl bg-brand-teal px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-brand-tealDark"
        >
          Apply for Placement
        </Link>
      </div>

      <div className="mb-6 grid gap-3 rounded-2xl bg-white p-4 shadow-soft sm:grid-cols-[minmax(0,1fr)_220px] sm:p-5">
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by application ID or program"
            className="h-11 w-full rounded-xl border border-brand-border bg-[#F4F6F8] pl-11 pr-4 text-sm text-brand-navy placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-teal"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as (typeof STATUS_OPTIONS)[number])}
          className="h-11 rounded-xl border border-brand-border bg-[#F4F6F8] px-4 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-teal"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option === "All" ? "All Statuses" : option}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-teal"></div>
            <p className="mt-4 text-sm text-brand-muted">Loading applications...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-3 md:hidden">
            {filtered.map((application, index) => {
                const applicationId = getApplicationId(application, index);
                const status = formatStatus(application);

                return (
          <div key={applicationId} className="rounded-2xl bg-white p-4 shadow-soft">
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
                className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
              >
                {status}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
                  Program
                </p>
                <p className="mt-1 text-sm text-brand-slate">{getProgramName(application)}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
                  Date
                </p>
                <p className="mt-1 text-sm text-brand-slate">
                  {application.createdAt ? new Date(application.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <Link
                href={`/dashboard/applications/${application._id}`}
                className="inline-flex items-center justify-center rounded-lg border border-brand-teal px-4 py-2 text-sm font-medium text-brand-teal transition-colors hover:bg-brand-teal hover:text-white"
              >
                View
              </Link>
            </div>
          </div>
                );
              })}
            {filtered.length === 0 && (
              <div className="rounded-2xl bg-white p-6 text-center text-sm text-brand-muted shadow-soft">
                No applications match the current filters.
              </div>
            )}
          </div>

          <div className="hidden overflow-hidden rounded-2xl bg-white shadow-soft md:block">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-border">
                {["Application ID", "Program", "Date", "Status", "Action"].map((heading) => (
                  <th
                    key={heading}
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-brand-muted"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((application, index) => {
                const applicationId = getApplicationId(application, index);
                const status = formatStatus(application);

                return (
                <tr
                  key={applicationId}
                  className="border-t border-brand-border transition-colors hover:bg-brand-light"
                >
                  <td className="px-6 py-4 text-sm font-medium text-brand-navy">
                    {applicationId}
                  </td>
                  <td className="px-6 py-4 text-sm text-brand-slate">
                    {getProgramName(application)}
                  </td>
                  <td className="px-6 py-4 text-sm text-brand-slate">
                    {application.createdAt ? new Date(application.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link
                      href={`/dashboard/applications/${application._id}`}
                      className="inline-flex items-center justify-center rounded-lg border border-brand-teal px-4 py-2 text-sm font-medium text-brand-teal transition-colors hover:bg-brand-teal hover:text-white"
                    >
                      View
                    </Link>
                  </td>
                </tr>
                );
              })}
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-10 text-center text-sm text-brand-muted"
                    >
                      No applications match the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          </div>
        </>
      )}
    </div>
  );
}
