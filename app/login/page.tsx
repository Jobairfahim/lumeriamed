"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import Button from "@/components/ui/ui/Button";
import type { LoginForm } from "@/lib/types";

/**
 * ── INTEGRATION POINT ──────────────────────────────────────────────────────
 * import { login } from "@/lib/api";
 * import { useRouter } from "next/navigation";
 *
 * In handleSubmit, replace the stub with:
 *   const result = await login(form);
 *   if (!result.success) { setError(result.error); setLoading(false); return; }
 *   router.push(result.data.redirectUrl);
 * ───────────────────────────────────────────────────────────────────────────
 */

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm]       = useState<LoginForm>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setError(null);
    /* ── Replace stub below with API call when backend is ready ── */
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-16 bg-brand-light flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-card overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* ── Left: Image ───────────────────────────────────────────────── */}
          <div className="relative hidden md:block min-h-[560px]">
            <Image
              src="/images/login.png"
              alt="Medical professionals"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-brand-navy/20" />
          </div>

          {/* ── Right: Form ───────────────────────────────────────────────── */}
          <div className="px-8 py-10 flex flex-col justify-center">
            <div className="inline-flex items-center gap-1.5 bg-brand-tealLight text-brand-teal text-xs font-medium px-3 py-1.5 rounded-full w-fit mb-5">
              🎉 Student Portal Coming Soon
            </div>

            <h1 className="font-display text-3xl font-bold text-brand-navy mb-1.5">
              Welcome Back!
            </h1>
            <p className="text-brand-slate text-sm mb-7 leading-relaxed">
              Hey, welcome back to your account. Use login ID and password to get
              access to your account.
            </p>

            <div className="flex flex-col gap-4 mb-5">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-brand-navy">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-border bg-brand-light text-brand-navy text-sm placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-brand-navy">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-brand-border bg-brand-light text-brand-navy text-sm placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-slate transition-colors"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm mb-4">
                {error}
              </div>
            )}

            <Button onClick={handleSubmit} className="w-full mb-5" size="lg" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Signing in...
                </span>
              ) : (
                <>Login <ArrowRight size={16} /></>
              )}
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-brand-border" />
              <span className="text-brand-muted text-xs">Or Continue With</span>
              <div className="flex-1 h-px bg-brand-border" />
            </div>

            {/* Social icons — wire up OAuth providers here */}
            <div className="flex items-center justify-center gap-3 mb-7">
              {/* Google */}
              <button aria-label="Continue with Google" className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center hover:border-brand-teal hover:bg-brand-tealLight transition-all">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </button>
              {/* Apple */}
              <button aria-label="Continue with Apple" className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center hover:border-brand-teal hover:bg-brand-tealLight transition-all">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </button>
              {/* LinkedIn */}
              <button aria-label="Continue with LinkedIn" className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center hover:border-brand-teal hover:bg-brand-tealLight transition-all">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#0A66C2">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
              {/* X / Twitter */}
              <button aria-label="Continue with X" className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center hover:border-brand-teal hover:bg-brand-tealLight transition-all">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>
            </div>

            <p className="text-center text-brand-slate text-sm">
              Don&apos;t Have An Account?{" "}
              <Link href="/contact" className="text-brand-teal font-semibold hover:underline">
                Sign Up
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
