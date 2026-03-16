"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, GraduationCap, MapPin, Users, Clock, Calendar, CheckCircle } from "lucide-react";

// Mock placement options — replace with API fetch
const PLACEMENT_OPTIONS = [
  {
    id: "PL001",
    hospital: "AB University",
    department: "Medical University",
    location: "London",
    seats: "3 / 5",
    duration: "4 Weeks",
    deadline: "15 Apr 2026",
    startDate: "12/2/2026",
  },
  {
    id: "PL002",
    hospital: "AB University",
    department: "Medical University",
    location: "London",
    seats: "3 / 5",
    duration: "4 Weeks",
    deadline: "15 Apr 2026",
    startDate: "12/2/2026",
  },
];

export default function ChoosePlacementPage() {
  const [selected, setSelected] = useState<string | null>(PLACEMENT_OPTIONS[0].id);
  const router = useRouter();

  return (
    <div>
      {/* Back */}
      <Link href="/dashboard/application-status" className="mb-5 inline-flex items-center gap-1.5 text-sm text-brand-slate transition-colors hover:text-brand-navy sm:mb-6">
        <ArrowLeft size={16} /> Go to back
      </Link>

      <h1 className="mb-6 font-display text-[1.75rem] font-bold text-brand-navy sm:mb-8 sm:text-2xl">
        Choose Placement Options
      </h1>

      <div className="grid max-w-3xl grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
        {PLACEMENT_OPTIONS.map((opt) => {
          const isSelected = selected === opt.id;
          return (
            <div
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className={`cursor-pointer rounded-2xl border-2 bg-white p-4 shadow-soft transition-all sm:p-6 ${
                isSelected ? "border-brand-teal" : "border-transparent hover:border-brand-tealLight"
              }`}
            >
              {/* Hospital name */}
              <h3 className="mb-5 border-b border-brand-border pb-4 text-center text-base font-semibold text-brand-navy">
                {opt.hospital}
              </h3>

              {/* Info grid */}
              <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {[
                  { icon: GraduationCap, label: "Department", value: opt.department },
                  { icon: MapPin,        label: "Location",   value: opt.location },
                  { icon: Users,         label: "Seats",      value: opt.seats },
                  { icon: Clock,         label: "Duration",   value: opt.duration },
                  { icon: Calendar,      label: "Deadline",   value: opt.deadline },
                  { icon: CheckCircle,   label: "Start Date", value: opt.startDate },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Icon size={11} className="text-brand-teal" />
                      <span className="text-brand-muted text-[10px]">{label}</span>
                    </div>
                    <p className="truncate text-xs font-semibold text-brand-navy">{value}</p>
                  </div>
                ))}
              </div>

              {/**
               * ── INTEGRATION POINT ──
               * On continue: POST /api/placements/select with { placementId: opt.id }
               * Then redirect to payment
               */}
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  setSelected(opt.id);
                  router.push("/payment?type=final&returnTo=%2Fdashboard%2Fapplication-status");
                }}
                className={`w-full py-3 rounded-xl font-medium text-sm transition-all ${
                  isSelected
                    ? "bg-brand-teal text-white hover:bg-brand-tealDark"
                    : "border border-brand-border text-brand-slate hover:border-brand-teal hover:text-brand-teal"
                }`}
              >
                Continue
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
