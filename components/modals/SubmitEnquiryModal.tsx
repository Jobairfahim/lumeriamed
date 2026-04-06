"use client";

import { useState } from "react";
import { X, Send } from "lucide-react";
import { Input, Textarea } from "@/components/ui/ui/Input";
import Button from "@/components/ui/ui/Button";
import { submitContactEnquiry } from "@/lib/api";
import type { EnquiryForm } from "@/lib/types";
import { useRouter } from "next/navigation";

interface SubmitEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  /**
   * ── INTEGRATION POINT ──
   * onSubmit={async (form) => submitContactEnquiry(form)}
   */
  onSubmit?: (form: EnquiryForm) => Promise<{ success: boolean; error?: string }>;
}

const EMPTY: EnquiryForm = { firstName: "", lastName: "", email: "", phone: "", message: "" };

export default function SubmitEnquiryModal({ isOpen, onClose, onSubmit }: SubmitEnquiryModalProps) {
  const router = useRouter();
  const [form, setForm]     = useState<EnquiryForm>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState<string | null>(null);

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
    const submit = onSubmit ?? submitContactEnquiry;
    const result = await submit(form);
    setLoading(false);

    if (result.success) {
      setForm(EMPTY);
      onClose();
      router.push("/enquiry-success");
    } else {
      setError(result.error ?? "Something went wrong. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-7 pt-7 pb-5 border-b border-brand-border">
          <h2 className="font-display font-semibold text-brand-navy text-2xl">Submit Enquiry</h2>
          <p className="text-brand-slate text-sm mt-1">
            Tell us about your clinical elective needs and we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        {/* Body */}
        <div className="px-7 py-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" name="firstName" placeholder="Enter your first name" value={form.firstName} onChange={handleChange} required />
            <Input label="Last Name"  name="lastName"  placeholder="Enter your last name"  value={form.lastName}  onChange={handleChange} />
          </div>
          <div className="grid gap-4">
            <Input label="Email" name="email" type="email" placeholder="Enter your email address" value={form.email} onChange={handleChange} required />
          </div>
          <div className="grid gap-4">
            <Input label="Phone" name="phone" type="tel"   placeholder="Enter your phone number"  value={form.phone} onChange={handleChange} />
          </div>
          <Textarea label="Message" name="message" placeholder="Describe your message..." value={form.message} onChange={handleChange} className="min-h-[110px]" required />
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>
          )}
        </div>

        {/* Footer */}
        <div className="px-7 pb-7">
          <Button onClick={handleSubmit} className="w-full" size="lg" disabled={loading}>
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

        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-brand-muted hover:text-brand-navy hover:bg-brand-gray transition-all">
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
