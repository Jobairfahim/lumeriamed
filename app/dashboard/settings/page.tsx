"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SettingsPage() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setSuccess(false);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.currentPassword || !form.newPassword || !form.confirmNewPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.newPassword !== form.confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (form.newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    setError(null);

    setLoading(false);
    setSuccess(true);
    setForm({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  const inputClass =
    "mt-2 h-12 w-full rounded-xl border border-transparent bg-[#fafafa] px-4 text-sm text-brand-navy outline-none transition-all placeholder:text-[#b8bfc5] focus:border-brand-teal focus:bg-white focus:ring-2 focus:ring-brand-teal/15";

  return (
    <div className="mx-auto w-full max-w-[980px]">
      <section className="rounded-[24px] bg-white px-4 py-6 shadow-soft sm:px-6 sm:py-7 md:px-8 md:py-8">
        <h1 className="mb-6 font-display text-[1.75rem] font-semibold tracking-[-0.03em] text-brand-navy sm:mb-8 sm:text-[2rem]">
          Security
        </h1>

        <div className="max-w-[720px]">
          <div className="mb-5">
            <label
              htmlFor="currentPassword"
              className="text-sm font-medium text-[#606970]"
            >
              Current Password
            </label>
            <div className="relative">
              <input
                id="currentPassword"
                name="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                value={form.currentPassword}
                onChange={handleChange}
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 flex h-5 w-5 items-center justify-center text-brand-muted transition-colors hover:text-brand-navy"
                aria-label={showCurrentPassword ? "Hide password" : "Show password"}
              >
                {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="newPassword"
              className="text-sm font-medium text-[#606970]"
            >
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={form.newPassword}
                onChange={handleChange}
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 flex h-5 w-5 items-center justify-center text-brand-muted transition-colors hover:text-brand-navy"
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmNewPassword"
              className="text-sm font-medium text-[#606970]"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                id="confirmNewPassword"
                name="confirmNewPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={form.confirmNewPassword}
                onChange={handleChange}
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 flex h-5 w-5 items-center justify-center text-brand-muted transition-colors hover:text-brand-navy"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-700">
              Password updated successfully.
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex h-12 w-full items-center justify-center rounded-xl bg-brand-teal text-sm font-medium text-white transition-all hover:bg-brand-tealDark disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </section>
    </div>
  );
}
