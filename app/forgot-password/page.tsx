"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Mail } from "lucide-react";
import Button from "@/components/ui/ui/Button";
import { requestPasswordReset } from "@/lib/api";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    setError(null);

    const result = await requestPasswordReset({ email });
    if (!result.success) {
      setError(result.error);
      setLoading(false);
      return;
    }

    setLoading(false);
    router.push(`/forgot-password/verify-otp?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-light px-4 pt-16">
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-card">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative hidden min-h-[560px] md:block">
            <Image
              src="/images/login.png"
              alt="Medical professionals"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-brand-navy/20" />
          </div>

          <div className="flex flex-col justify-center px-8 py-10">
            <div className="mb-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-tealLight px-3 py-1.5 text-xs font-medium text-brand-teal">
              Account Recovery
            </div>

            <h1 className="mb-1.5 font-display text-3xl font-bold text-brand-navy">
              Forgot Password?
            </h1>
            <p className="mb-7 text-sm leading-relaxed text-brand-slate">
              Enter the email linked to your account and we&apos;ll send you a
              verification code to reset your password.
            </p>

            <div className="mb-5 flex flex-col gap-1.5">
              <label className="text-sm font-medium text-brand-navy">Email Address</label>
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => {
                    setError(null);
                    setEmail(e.target.value);
                  }}
                  className="w-full rounded-xl border border-brand-border bg-brand-light py-3 pl-10 pr-4 text-sm text-brand-navy placeholder:text-brand-muted transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-teal"
                />
              </div>
            </div>

            {error && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <Button onClick={handleSubmit} className="mb-5 w-full" size="lg" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Sending code...
                </span>
              ) : (
                <>
                  Send OTP <ArrowRight size={16} />
                </>
              )}
            </Button>

            <p className="text-center text-sm text-brand-slate">
              Remember your password?{" "}
              <Link href="/login" className="font-semibold text-brand-teal hover:underline">
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
