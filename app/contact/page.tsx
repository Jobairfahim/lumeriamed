"use client";

import { useState } from "react";
import { Mail, Phone, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input, Textarea } from "@/components/ui/ui/Input";
import Button from "@/components/ui/ui/Button";
import { submitContactEnquiry } from "@/lib/api";
import type { EnquiryForm } from "@/lib/types";
import PageMetadata from "@/components/seo/PageMetadata";

const EMPTY: EnquiryForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactPage() {
  const router = useRouter();
  const [form, setForm] = useState<EnquiryForm>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setError(null);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.firstName || !form.email || !form.message) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError(null);

    const result = await submitContactEnquiry(form);
    setLoading(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    router.push("/enquiry-success");
  };

  return (
    <>
      <PageMetadata
        title="Contact LumieraMed - Get in Touch"
        description="Contact LumieraMed for clinical elective placements in China. Call us at +44 7786 236891 or email support@lumieramed.com."
        keywords={[
          "contact lumieramed",
          "medical elective contact",
          "china hospital contact",
          "support team",
          "student enquiries"
        ]}
        canonical="/contact"
      />
      <div className="min-h-screen bg-white pt-16">
      <div className="border-b border-brand-border bg-brand-light px-4 py-12 text-center md:py-16">
        <h1 className="mb-3 font-display text-3xl font-bold text-brand-navy md:text-4xl">
          Contact <span className="text-brand-teal">Us</span>
        </h1>
        <p className="mx-auto max-w-sm text-sm leading-relaxed text-brand-slate md:text-base">
          Have questions? We&apos;d love to hear from you. Send us a message and
          we&apos;ll respond as soon as possible.
        </p>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-xl border border-brand-border bg-brand-light px-5 py-4">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-brand-border bg-white">
              <Mail size={14} className="text-brand-teal" />
            </div>
            <div>
              <p className="mb-0.5 text-xs font-medium uppercase tracking-widest text-brand-muted">
                Email
              </p>
              <a
                href="mailto:support@lumieramed.com"
                className="text-sm font-medium text-brand-navy transition-colors hover:text-brand-teal"
              >
                support@lumieramed.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-brand-border bg-brand-light px-5 py-4">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-brand-border bg-white">
              <Phone size={14} className="text-brand-teal" />
            </div>
            <div>
              <p className="mb-0.5 text-xs font-medium uppercase tracking-widest text-brand-muted">
                Phone
              </p>
              <a
                href="tel:+447786236891"
                className="text-sm font-medium text-brand-navy transition-colors hover:text-brand-teal"
              >
                +44 7786 236891
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="First Name"
              name="firstName"
              placeholder="Enter your first name"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <Input
              label="Last Name"
              name="lastName"
              placeholder="Enter your last name"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Phone"
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={form.phone}
            onChange={handleChange}
          />

          <Textarea
            label="Message"
            name="message"
            placeholder="Describe your message..."
            value={form.message}
            onChange={handleChange}
            required
            className="min-h-[140px]"
          />

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <Button onClick={handleSubmit} className="mt-1 w-full" size="lg" disabled={loading}>
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
                Sending...
              </span>
            ) : (
              <>
                Send Message <Send size={15} />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
    </>
  );
}
