"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FileText, CheckCircle, MessageSquare,
  User, Settings, LogOut, Bell, Search, Menu, X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const NAV = [
  { label: "Dashboard",          href: "/dashboard",                    icon: LayoutDashboard },
  { label: "All Applications",   href: "/dashboard/applications",       icon: FileText },
  { label: "Application Status", href: "/dashboard/application-status", icon: CheckCircle },
  { label: "Messages",           href: "/dashboard/messages",           icon: MessageSquare },
  { label: "Profile",            href: "/dashboard/profile",            icon: User },
  { label: "Settings",           href: "/dashboard/settings",           icon: Settings },
];

// Mock user — replace with real auth context when backend ready
const MOCK_USER = { name: "John Smith", studentId: "20394", avatar: "/images/avatar.png" };

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F4F6F8]">

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-[200px] bg-white border-r border-brand-border flex flex-col transition-transform duration-300",
        "md:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="px-4 py-5 border-b border-brand-border">
          <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="LumieraMed" width={82} height={42} className="w-30 h-30" />

          </Link>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-2 py-4 flex flex-col gap-0.5 overflow-y-auto">
          {NAV.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all",
                  active
                    ? "bg-brand-teal text-white"
                    : "text-brand-slate hover:bg-brand-tealLight hover:text-brand-teal"
                )}
              >
                <Icon size={15} className="flex-shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Log out */}
        <div className="px-2 py-4 border-t border-brand-border">
          <Link
            href="/login"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-brand-slate hover:bg-red-50 hover:text-red-500 transition-all"
          >
            <LogOut size={15} />
            Log Out
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* ── Main area ───────────────────────────────────────────────────── */}
      <div className="flex min-h-screen flex-1 flex-col md:ml-[200px]">

        {/* Topbar */}
        <header className="sticky top-0 z-20 border-b border-brand-border bg-white px-3 py-3 sm:px-4 md:px-6">
          <div className="flex items-center justify-between gap-3">

            <div className="flex items-center gap-2">
              <button
                className="rounded-lg p-1.5 text-brand-slate hover:bg-brand-tealLight md:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              <button
                className="rounded-lg p-1.5 text-brand-slate hover:bg-brand-tealLight sm:hidden"
                onClick={() => setMobileSearchOpen((prev) => !prev)}
                aria-label="Toggle search"
              >
                <Search size={18} />
              </button>
            </div>

            <div className="relative hidden max-w-sm flex-1 sm:block">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
              <input
                placeholder="Search applications, messages..."
                className="w-full rounded-xl border border-brand-border bg-[#F4F6F8] py-2 pl-9 pr-4 text-xs text-brand-navy placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-teal"
              />
            </div>

            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              <button className="relative rounded-xl p-2 transition-all hover:bg-brand-tealLight">
                <Bell size={18} className="text-brand-slate" />
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-brand-teal" />
              </button>

              <div className="flex items-center gap-2">
                <div className="hidden text-right sm:block">
                  <p className="text-xs font-semibold text-brand-navy">{MOCK_USER.name}</p>
                  <p className="text-[10px] text-brand-muted">Student ID: {MOCK_USER.studentId}</p>
                </div>
                <div className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-teal">
                  <Image src={MOCK_USER.avatar} alt="" fill className="object-cover" />
                  <span className="absolute text-xs font-bold text-white">JS</span>
                </div>
              </div>
            </div>
          </div>

          {mobileSearchOpen && (
            <div className="relative mt-3 sm:hidden">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
              <input
                placeholder="Search applications, messages..."
                className="w-full rounded-xl border border-brand-border bg-[#F4F6F8] py-2 pl-9 pr-4 text-xs text-brand-navy placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-teal"
              />
            </div>
          )}
        </header>

        {/* Page content */}
        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
