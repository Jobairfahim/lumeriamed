"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  name: string;
  value?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function parseIso(iso?: string): Date | null {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function toIso(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function formatDisplay(iso?: string) {
  const date = parseIso(iso);
  if (!date) return "";
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

export default function DatePicker({
  name,
  value,
  className,
  onChange,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const selected = parseIso(value);
  const [viewDate, setViewDate] = useState(() => selected ?? new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openPicker = () => {
    setViewDate(selected ?? new Date());
    setOpen((prev) => !prev);
  };

  const selectDay = (day: number) => {
    const picked = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    onChange({ target: { name, value: toIso(picked) } } as React.ChangeEvent<HTMLInputElement>);
    setOpen(false);
  };

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <button
        type="button"
        onClick={openPicker}
        className="flex h-11 w-full items-center justify-between rounded-[10px] border border-[#efefef] bg-[#f8f8f8] px-4 text-left text-[12px] text-[#32363a] outline-none transition focus:border-brand-teal"
      >
        <span className={value ? "" : "text-[#b4b4b4]"}>
          {value ? formatDisplay(value) : "dd/mm/yyyy"}
        </span>
        <Calendar size={15} className="text-brand-teal" />
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-[260px] rounded-[12px] border border-[#efefef] bg-white p-3 shadow-[0_12px_32px_rgba(0,0,0,0.14)]">
          <div className="mb-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setViewDate(new Date(year, month - 1, 1))}
              className="flex h-7 w-7 items-center justify-center rounded-full text-[#5a5e61] transition hover:bg-[#f0f0f0]"
              aria-label="Previous month"
            >
              <ChevronLeft size={15} />
            </button>
            <span className="text-[12px] font-semibold text-[#313538]">
              {MONTHS[month]} {year}
            </span>
            <button
              type="button"
              onClick={() => setViewDate(new Date(year, month + 1, 1))}
              className="flex h-7 w-7 items-center justify-center rounded-full text-[#5a5e61] transition hover:bg-[#f0f0f0]"
              aria-label="Next month"
            >
              <ChevronRight size={15} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-[#8a8f93]">
            {WEEKDAYS.map((day) => (
              <div key={day} className="py-1">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, idx) => {
              if (day === null) return <div key={`empty-${idx}`} />;
              const isSelected =
                selected &&
                selected.getFullYear() === year &&
                selected.getMonth() === month &&
                selected.getDate() === day;
              const isToday =
                today.getFullYear() === year &&
                today.getMonth() === month &&
                today.getDate() === day;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => selectDay(day)}
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full text-[11px] transition",
                    isSelected
                      ? "bg-brand-teal text-white"
                      : isToday
                      ? "border border-brand-teal text-brand-teal"
                      : "text-[#32363a] hover:bg-[#f0f0f0]"
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
