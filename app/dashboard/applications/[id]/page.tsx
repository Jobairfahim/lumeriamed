import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail, GraduationCap, Phone, Clock, Calendar, Globe, MapPin, FileText, Download, Check } from "lucide-react";

// Mock data — replace with API fetch by params.id
const MOCK_APPLICATION = {
  id: "APP1023",
  status: "Pending",
  preferredSpecialty: "Cardiology Rotation",
  applicationDate: "1 Mar 2026",
  student: {
    name: "Ahmed Rahmin",
    year: "Final Year",
    email: "ahmed.rahim@gmail.com",
    university: "Ab university",
    phone: "+88987954767",
    duration: "6 month",
    startDate: "12/2/2026",
    language: "English",
    preferredCities: "London",
    avatar: "/images/avatar-student.jpg",
  },
  requirements: "I am a final-year medical student who is very interested in cardiology. I have completed my internal medicine rotations and performed very well in cardiac care. I am eager to learn from experienced cardiologists and gain practical, hands-on experience in this field.",
  documents: [
    { name: "Curriculum Vitae",       size: "245 kB" },
    { name: "Passport Copy",          size: "245 kB" },
    { name: "Academic Transcript",    size: "345 kB" },
    { name: "Recommendation Letter",  size: "245 kB" },
  ],
};

const statusStyles: Record<string, string> = {
  Pending:    "bg-gray-100 text-gray-500",
  Processing: "bg-orange-100 text-orange-600",
  Approved:   "bg-teal-100 text-teal-700",
  Rejected:   "bg-red-100 text-red-600",
};

export default function ApplicationDetailPage() {
  const app = MOCK_APPLICATION; // Replace: await getApplication(params.id)

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
              <p className="mt-1 text-sm font-medium text-[#687179]">ID: {app.id}</p>
              <p className="mt-1 text-sm text-[#afb6bc]">Applied {app.applicationDate}</p>
            </div>

            <div className="sm:text-right">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c1c6ca]">
                Status
              </p>
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusStyles[app.status]}`}>
                {app.status}
              </span>
            </div>
          </div>

          <div className="relative pt-1">
            <div className="absolute left-[18px] right-[18px] top-[19px] h-px bg-[#d8dddf] sm:left-[32px] sm:right-[32px]" />
            <div
              className="absolute left-[18px] top-[19px] h-px bg-brand-teal transition-all sm:left-[32px]"
              style={{ width: app.status === "Pending" ? "0%" : app.status === "Processing" ? "50%" : "100%" }}
            />

            <div className="relative grid grid-cols-3 gap-3">
              {[
                { key: "pending", label: "Pending" },
                { key: "matching", label: "Matching" },
                { key: "approved", label: "Approved" },
              ].map((step, index) => {
                const done = app.status === "Approved" ? true : app.status === "Processing" ? index < 1 : false;

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
              <Image src={app.student.avatar} alt={app.student.name} fill className="object-cover" />
              <span className="absolute text-sm font-semibold text-brand-navy">AR</span>
            </div>
            <h2 className="font-display font-bold text-brand-navy text-lg">{app.student.name}</h2>
            <p className="text-brand-muted text-sm">{app.student.year}</p>
          </div>

          {/* Info rows */}
          <div className="flex flex-col gap-4">
            {[
              { icon: Mail,            label: "Email",           value: app.student.email },
              { icon: GraduationCap,   label: "University",      value: app.student.university },
              { icon: Phone,           label: "Phone",           value: app.student.phone },
              { icon: Clock,           label: "Duration",        value: app.student.duration },
              { icon: Calendar,        label: "Start Date",      value: app.student.startDate },
              { icon: Globe,           label: "Language",        value: app.student.language },
              { icon: MapPin,          label: "Preferred Cities",value: app.student.preferredCities },
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
                <h3 className="font-semibold text-brand-navy text-base">{app.preferredSpecialty}</h3>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-brand-muted text-xs mb-1">STATUS</p>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[app.status]}`}>
                  {app.status}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-brand-muted text-xs mb-1">Application date</p>
              <p className="font-semibold text-brand-navy text-sm">{app.applicationDate}</p>
            </div>

            <div>
              <p className="text-brand-muted text-xs mb-2">Elective Requirements</p>
              <p className="text-brand-slate text-sm leading-relaxed">{app.requirements}</p>
            </div>
          </div>

          {/* Submitted documents */}
          <div className="rounded-2xl bg-white p-4 shadow-soft sm:p-6">
            <h3 className="font-semibold text-brand-navy text-sm mb-4">Submitted Documents</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {app.documents.map((doc) => (
                <div key={doc.name} className="flex items-center justify-between gap-3 rounded-xl border border-brand-border bg-brand-light p-3.5 transition-all hover:border-brand-teal">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-brand-tealLight flex items-center justify-center flex-shrink-0">
                      <FileText size={13} className="text-brand-teal" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-brand-navy text-xs font-medium">{doc.name}</p>
                      <p className="text-brand-muted text-[10px]">{doc.size}</p>
                    </div>
                  </div>
                  {/**
                   * ── INTEGRATION POINT ──
                   * Replace href with actual document download URL
                   */}
                  <button className="p-1.5 rounded-lg hover:bg-brand-tealLight text-brand-teal transition-all">
                    <Download size={14} />
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
      <div className="mt-6 flex justify-stretch sm:justify-end">
        <button className="w-full rounded-xl bg-brand-teal px-8 py-3 text-sm font-medium text-white transition-all hover:bg-brand-tealDark sm:w-auto">
          Payment Now
        </button>
      </div>
    </div>
  );
}
