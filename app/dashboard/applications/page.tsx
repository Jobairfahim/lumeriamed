"use client";

import { useState } from "react";
import Link from "next/link";

const MOCK_APPLICATIONS = [
  { id: "APP1023", program: "Surgery", date: "Mar 10", status: "Processing" },
  { id: "APP1021", program: "Oncology", date: "Mar 10", status: "Approved" },
  { id: "APP1019", program: "Psychiatry", date: "Mar 10", status: "Pending" },
  { id: "APP1019", program: "Psychiatry", date: "Mar 10", status: "Pending" },
  { id: "APP1019", program: "Psychiatry", date: "Mar 10", status: "Pending" },
  { id: "APP1019", program: "Psychiatry", date: "Mar 10", status: "Pending" },
  { id: "APP1019", program: "Psychiatry", date: "Mar 10", status: "Pending" },
  { id: "APP1019", program: "Psychiatry", date: "Mar 10", status: "Pending" },
  { id: "APP1019", program: "Psychiatry", date: "Mar 10", status: "Pending" },
];

const statusStyles: Record<string, string> = {
  Processing: "bg-orange-100 text-orange-600",
  Approved: "bg-teal-100 text-teal-700",
  Pending: "bg-gray-100 text-gray-500",
  Rejected: "bg-red-100 text-red-600",
};

export default function AllApplicationsPage() {
  const [search] = useState("");

  const filtered = MOCK_APPLICATIONS.filter(
    (application) =>
      application.id.toLowerCase().includes(search.toLowerCase()) ||
      application.program.toLowerCase().includes(search.toLowerCase())
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

      <div className="space-y-3 md:hidden">
        {filtered.map((application, index) => (
          <div key={`${application.id}-${index}`} className="rounded-2xl bg-white p-4 shadow-soft">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
                  Application ID
                </p>
                <p className="mt-1 text-sm font-semibold text-brand-navy">
                  {application.id}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[application.status]}`}
              >
                {application.status}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
                  Program
                </p>
                <p className="mt-1 text-sm text-brand-slate">{application.program}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
                  Date
                </p>
                <p className="mt-1 text-sm text-brand-slate">{application.date}</p>
              </div>
              <Link
                href={`/dashboard/applications/${application.id}`}
                className="inline-flex text-sm font-medium text-brand-teal hover:underline"
              >
                View
              </Link>
            </div>
          </div>
        ))}
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
              {filtered.map((application, index) => (
                <tr
                  key={`${application.id}-${index}`}
                  className="border-t border-brand-border transition-colors hover:bg-brand-light"
                >
                  <td className="px-6 py-4 text-sm font-medium text-brand-navy">
                    {application.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-brand-slate">
                    {application.program}
                  </td>
                  <td className="px-6 py-4 text-sm text-brand-slate">
                    {application.date}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[application.status]}`}
                    >
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/applications/${application.id}`}
                      className="text-sm font-medium text-brand-teal hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
