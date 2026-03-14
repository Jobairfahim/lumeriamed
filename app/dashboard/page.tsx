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

const MOCK_APPLICATIONS = [
  { id: "APP1023", program: "Surgery", date: "Mar 10", status: "Processing" },
  { id: "APP1021", program: "Oncology", date: "Mar 10", status: "Approved" },
  { id: "APP1019", program: "Psychiatry", date: "Mar 10", status: "Pending" },
];

const NOTIFICATIONS = [
  { text: "Your application APP1023 is currently processing.", time: "3 min" },
  { text: "Your Business Studies application fee has been approved.", time: "10 min" },
  { text: "Your application APP1023 is currently processing.", time: "1 hr" },
  { text: "You have received a new message.", time: "2 hr" },
  { text: "Your Business Studies application has been approved.", time: "1 day" },
];

const statusStyles: Record<string, string> = {
  Processing: "bg-orange-100 text-orange-600",
  Approved: "bg-teal-100 text-teal-700",
  Pending: "bg-gray-100 text-gray-500",
  Rejected: "bg-red-100 text-red-600",
};

export default function DashboardPage() {
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
            Welcome back, John
          </h1>
          <p className="text-sm leading-relaxed text-white/80">
            This is your student dashboard where you can manage your applications
            and account information.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
        {[
          {
            label: "Total Applications",
            value: "05",
            icon: FileText,
            color: "bg-brand-tealLight text-brand-teal",
          },
          {
            label: "Approved",
            value: "02",
            icon: CheckCircle,
            color: "bg-green-100 text-green-600",
          },
          {
            label: "Processing",
            value: "02",
            icon: Clock,
            color: "bg-orange-100 text-orange-500",
          },
          {
            label: "Rejected",
            value: "01",
            icon: XCircle,
            color: "bg-red-100 text-red-500",
          },
        ].map((stat) => (
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
                {stat.value}
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
            {MOCK_APPLICATIONS.map((application) => (
              <div
                key={application.id}
                className="rounded-xl border border-brand-border bg-brand-light p-4"
              >
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
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[application.status]}`}
                  >
                    {application.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-brand-slate">{application.program}</p>
                  <p className="text-xs text-brand-muted">{application.date}</p>
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

          <div className="hidden sm:block overflow-x-auto">
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
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {MOCK_APPLICATIONS.map((application) => (
                  <tr
                    key={application.id}
                    className="border-t border-brand-border transition-colors hover:bg-brand-light"
                  >
                    <td className="px-5 py-3.5 text-xs font-medium text-brand-navy">
                      {application.id}
                    </td>
                    <td className="px-5 py-3.5 text-xs text-brand-slate">
                      {application.program}
                    </td>
                    <td className="px-5 py-3.5 text-xs text-brand-slate">
                      {application.date}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[application.status]}`}
                      >
                        {application.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/dashboard/applications/${application.id}`}
                        className="text-xs font-medium text-brand-teal hover:underline"
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

        <div className="overflow-hidden rounded-2xl bg-white shadow-soft">
          <div className="border-b border-brand-border px-5 py-4">
            <h2 className="text-sm font-semibold text-brand-navy">Notifications</h2>
          </div>
          <div className="divide-y divide-brand-border">
            {NOTIFICATIONS.map((notification, index) => (
              <div key={index} className="px-5 py-3.5">
                <p className="text-xs leading-relaxed text-brand-slate">
                  {notification.text}
                </p>
                <p className="mt-1 text-[10px] text-brand-muted">
                  {notification.time}
                </p>
              </div>
            ))}
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
