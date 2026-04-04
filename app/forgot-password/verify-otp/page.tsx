"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/ui/Button";

export default function ForgotPasswordOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDigitChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) {
      return;
    }

    setError(null);
    setOtp((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleSubmit = async () => {
    if (otp.some((digit) => !digit)) {
      setError("Please enter the full verification code.");
      return;
    }

    setLoading(true);
    setError(null);

    setLoading(false);
    router.push("/login");
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
              Password Recovery
            </div>

            <h1 className="mb-1.5 font-display text-3xl font-bold text-brand-navy">
              Verify Reset Code
            </h1>
            <p className="mb-7 text-sm leading-relaxed text-brand-slate">
              Enter the 4-digit code sent to your email to continue resetting your
              password.
            </p>

            <div className="mb-5 flex items-center justify-between gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(index, e.target.value)}
                  className="h-14 w-14 rounded-2xl border border-brand-border bg-brand-light text-center text-lg font-semibold text-brand-navy transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-teal"
                />
              ))}
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
                  Verifying...
                </span>
              ) : (
                <>
                  Continue <ArrowRight size={16} />
                </>
              )}
            </Button>

            <p className="mb-3 text-center text-sm text-brand-slate">
              Didn&apos;t receive the code?{" "}
              <button
                type="button"
                className="font-semibold text-brand-teal transition-colors hover:underline"
              >
                Resend OTP
              </button>
            </p>

            <p className="text-center text-sm text-brand-slate">
              Back to{" "}
              <Link href="/login" className="font-semibold text-brand-teal hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
