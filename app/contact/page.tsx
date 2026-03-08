"use client";

import { useState } from "react";
import { Mail, Phone, Send } from "lucide-react";
import { Input, Textarea } from "@/components/ui/ui/Input";
import Button from "@/components/ui/ui/Button";
import type { EnquiryForm } from "@/lib/types";
import { useRouter } from "next/navigation";

/**
 * ── INTEGRATION POINT ──────────────────────────────────────────────────────
 * import { submitContactEnquiry } from "@/lib/api";
 * Replace the stub in handleSubmit with:
 *   const result = await submitContactEnquiry(form);
 *   if (!result.success) { setError(result.error); setLoading(false); return; }
 *   router.push("/enquiry-success");
 * ───────────────────────────────────────────────────────────────────────────
 */

const EMPTY: EnquiryForm = { firstName: "", lastName: "", email: "", phone: "", message: "" };

export default function ContactPage() {
  const router = useRouter();
  const [form, setForm]       = useState<EnquiryForm>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setError(null);
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.firstName || !form.email || !form.message) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError(null);
    /* ── Replace stub below with API call when backend is ready ── */
    setLoading(false);
    router.push("/enquiry-success");
  };

  return (
    <div className="min-h-screen pt-16 bg-white">

      {/* ── Hero header ─────────────────────────────────────────────────── */}
      <div className="bg-brand-light py-12 md:py-16 text-center px-4 border-b border-brand-border">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-3">
          Contact <span className="text-brand-teal">Us</span>
        </h1>
        <p className="text-brand-slate text-sm md:text-base max-w-sm mx-auto leading-relaxed">
          Have questions? We&apos;d love to hear from you. Send us a message and
          we&apos;ll respond as soon as possible.
        </p>
      </div>

      {/* ── Form area ───────────────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="flex items-center gap-3 px-5 py-4 rounded-xl border border-brand-border bg-brand-light">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0 border border-brand-border">
              <Mail size={14} className="text-brand-teal" />
            </div>
            <div>
              <p className="text-brand-muted text-xs font-medium uppercase tracking-widest mb-0.5">Email</p>
              <a href="mailto:info@lumieramed.com" className="text-brand-navy text-sm font-medium hover:text-brand-teal transition-colors">
                info@lumieramed.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-4 rounded-xl border border-brand-border bg-brand-light">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0 border border-brand-border">
              <Phone size={14} className="text-brand-teal" />
            </div>
            <div>
              <p className="text-brand-muted text-xs font-medium uppercase tracking-widest mb-0.5">Phone</p>
              <a href="tel:+8612345678900" className="text-brand-navy text-sm font-medium hover:text-brand-teal transition-colors">
                +86 123 4567 8900
              </a>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="First Name" name="firstName" placeholder="Enter your first name" value={form.firstName} onChange={handleChange} required />
            <Input label="Last Name"  name="lastName"  placeholder="Enter your last name"  value={form.lastName}  onChange={handleChange} required />
          </div>
          <Input label="Email" name="email" type="email" placeholder="Enter your email address" value={form.email} onChange={handleChange} required />
          <Input label="Phone" name="phone" type="tel"   placeholder="Enter your phone number"  value={form.phone}  onChange={handleChange} />
          <Textarea label="Message" name="message" placeholder="Describe your message..." value={form.message} onChange={handleChange} className="min-h-[140px]" />

          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>
          )}

          <Button onClick={handleSubmit} className="w-full mt-1" size="lg" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                Sending...
              </span>
            ) : (
              <>Send Message <Send size={15} /></>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
