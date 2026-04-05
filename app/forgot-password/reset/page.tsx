"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Lock } from "lucide-react";
import Button from "@/components/ui/ui/Button";
import { resetPassword } from "@/lib/api";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const otp = searchParams.get("otp") ?? "";
  const verifyToken =
    typeof window !== "undefined"
      ? sessionStorage.getItem("passwordResetVerifyToken") ?? ""
      : "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!email || !otp || !verifyToken) {
      setError("Missing reset session. Start the password reset flow again.");
      return;
    }

    if (!password || !confirmPassword) {
      setError("Please complete all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError(null);

    const result = await resetPassword({
      email,
      otp,
      verifyToken,
      newPassword: password,
      confirmPassword,
    });
    if (!result.success) {
      setError(result.error);
      setLoading(false);
      return;
    }

    setLoading(false);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("passwordResetVerifyToken");
    }
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
              Set New Password
            </h1>
            <p className="mb-7 text-sm leading-relaxed text-brand-slate">
              Create a new password for {email || "your account"}.
            </p>

            <div className="mb-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-brand-navy">New Password</label>
                <div className="relative">
                  <Lock
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setError(null);
                      setPassword(e.target.value);
                    }}
                    placeholder="Enter your new password"
                    className="w-full rounded-xl border border-brand-border bg-brand-light py-3 pl-10 pr-10 text-sm text-brand-navy placeholder:text-brand-muted transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-muted transition-colors hover:text-brand-slate"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-brand-navy">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted"
                  />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setError(null);
                      setConfirmPassword(e.target.value);
                    }}
                    placeholder="Confirm your new password"
                    className="w-full rounded-xl border border-brand-border bg-brand-light py-3 pl-10 pr-10 text-sm text-brand-navy placeholder:text-brand-muted transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-muted transition-colors hover:text-brand-slate"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
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
                  Updating password...
                </span>
              ) : (
                <>
                  Reset Password <ArrowRight size={16} />
                </>
              )}
            </Button>

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
