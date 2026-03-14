"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
            <label className="text-sm font-medium text-[#606970]">
              Change Password
            </label>
            <input
              type="password"
              value="********"
              readOnly
              aria-label="Change Password"
              className={inputClass}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="currentPassword"
              className="text-sm font-medium text-[#606970]"
            >
              Current Password
            </label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={form.currentPassword}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="newPassword"
              className="text-sm font-medium text-[#606970]"
            >
              New Password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              value={form.newPassword}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmNewPassword"
              className="text-sm font-medium text-[#606970]"
            >
              Confirm New Password
            </label>
            <input
              id="confirmNewPassword"
              name="confirmNewPassword"
              type="password"
              value={form.confirmNewPassword}
              onChange={handleChange}
              className={inputClass}
            />
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
