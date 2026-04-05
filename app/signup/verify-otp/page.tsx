"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/ui/Button";
import { resendOtp, verifyEmail } from "@/lib/api";

export default function SignupOtpVerificationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;

    setError(null);
    const nextOtp = [...otp];
    nextOtp[index] = value;
    setOtp(nextOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const digits = pastedData.match(/\d/g) || [];

    setError(null);
    const nextOtp = [...otp];
    digits.forEach((digit, index) => {
      if (index < 6) nextOtp[index] = digit;
    });
    setOtp(nextOtp);

    const nextIndex = Math.min(digits.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async () => {
    if (!email) {
      setError("Missing email address. Please sign up again.");
      return;
    }

    if (otp.some((digit) => !digit)) {
      setError("Please enter the full verification code.");
      return;
    }

    setLoading(true);
    setError(null);

    const result = await verifyEmail({ email, otp: otp.join("") });
    if (!result.success) {
      setError(result.error);
      setLoading(false);
      return;
    }

    setLoading(false);
    router.push("/login");
  };

  const handleResendOtp = async () => {
    if (!email) {
      setError("Missing email address. Please sign up again.");
      return;
    }

    setResending(true);
    setError(null);

    const result = await resendOtp({ email });
    if (!result.success) {
      setError(result.error);
    }

    setResending(false);
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
              OTP Verification
            </div>

            <h1 className="mb-1.5 font-display text-3xl font-bold text-brand-navy">
              Verify Your Email
            </h1>
            <p className="mb-7 text-sm leading-relaxed text-brand-slate">
              Enter the 6-digit code sent to {email || "your email"} to complete
              your signup.
            </p>

            <div className="mb-6 flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="h-14 w-14 rounded-lg bg-gray-100 text-center text-3xl font-medium text-brand-navy transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
                  Verify OTP <ArrowRight size={16} />
                </>
              )}
            </Button>

            <p className="mb-3 text-center text-sm text-brand-slate">
              Didn&apos;t receive the code?{" "}
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resending}
                className="font-semibold text-brand-teal transition-colors hover:underline disabled:opacity-70"
              >
                {resending ? "Resending..." : "Resend OTP"}
              </button>
            </p>

            <p className="text-center text-sm text-brand-slate">
              Already verified?{" "}
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
