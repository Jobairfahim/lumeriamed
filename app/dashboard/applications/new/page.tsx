"use client";

import { useState, useRef } from "react";
import { X, Upload, Send } from "lucide-react";
import type { PlacementEnquiryForm } from "@/lib/types";
import { useRouter } from "next/navigation";
import Link from "next/link";

/**
 * ── INTEGRATION POINT ──
 * import { submitPlacementEnquiry } from "@/lib/api";
 */

const LANGUAGES   = ["English","Chinese (Mandarin)","Bilingual (Both)"];

const EMPTY: PlacementEnquiryForm = {
  firstName: "", lastName: "", email: "", phone: "", university: "", yearOfStudy: "",
  preferredSpecialty: "", preferredCities: "", duration: "",
  preferredStartDate: "", language: "", additionalInfo: "",
};

export default function NewApplicationPage() {
  const router  = useRouter();
  const [form, setForm]       = useState<PlacementEnquiryForm>(EMPTY);
  const [files, setFiles]     = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const fileRef               = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setError(null);
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.firstName || !form.email || !form.phone || !form.university ||
        !form.yearOfStudy || !form.preferredStartDate || !form.duration) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    /* ── INTEGRATION POINT: const result = await submitPlacementEnquiry(form, files); ── */
    setLoading(false);
    router.push("/dashboard/applications");
  };

  const inputClass = "w-full rounded-xl border border-brand-border bg-white px-4 py-3 text-sm text-brand-navy placeholder:text-brand-muted transition-all focus:outline-none focus:ring-2 focus:ring-brand-teal";

  return (
    <div className="mx-auto max-w-2xl">
      {/* Header row */}
      <div className="mb-2 flex items-start justify-between gap-3">
        <h1 className="font-display text-xl font-bold text-brand-navy sm:text-[1.625rem]">Placement Enquiry Form</h1>
        <Link href="/dashboard/applications" className="p-1.5 rounded-lg text-brand-muted hover:text-brand-navy hover:bg-brand-gray transition-all">
          <X size={18} />
        </Link>
      </div>
      <p className="mb-6 text-xs leading-relaxed text-brand-slate sm:mb-7">
        Please Provide The Following Information So We Can Match You With The Best Placement Options.
        Fields Marked With <span className="text-red-500">*</span> Are Required.
      </p>

      <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-soft sm:p-6">
        {/* First / Last name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-brand-navy">First Name <span className="text-red-500">*</span></label>
            <input name="firstName" placeholder="Enter your first name" value={form.firstName} onChange={handleChange} className={inputClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-brand-navy">Last Name <span className="text-red-500">*</span></label>
            <input name="lastName" placeholder="Enter your last name" value={form.lastName} onChange={handleChange} className={inputClass} />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-brand-navy">Email Address</label>
          <input name="email" type="email" placeholder="your.email@example.com" value={form.email} onChange={handleChange} className={inputClass} />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-brand-navy">Phone Number</label>
          <input name="phone" type="tel" placeholder="+1(555) 123-4567" value={form.phone} onChange={handleChange} className={inputClass} />
        </div>

        {/* University */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-brand-navy">University/Medical School</label>
          <input name="university" placeholder="Your institution" value={form.university} onChange={handleChange} className={inputClass} />
        </div>

        {/* Year of study */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-brand-navy">Year Of Study</label>
          <input name="yearOfStudy" placeholder="e.g. 4.3" value={form.yearOfStudy} onChange={handleChange} className={inputClass} />
        </div>

        {/* Preferred Start Date */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-brand-navy">Preferred Start Date <span className="text-red-500">*</span></label>
          <input name="preferredStartDate" type="date" placeholder="dd/mm/yyyy" value={form.preferredStartDate} onChange={handleChange} className={inputClass} />
        </div>

        {/* Duration */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-brand-navy">Duration <span className="text-red-500">*</span></label>
          <input name="duration" placeholder="How many weeks" value={form.duration} onChange={handleChange} className={inputClass} />
        </div>

        {/* Preferred Specialty */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-brand-navy">Preferred Speciality</label>
          <input name="preferredSpecialty" placeholder="e.g. Cardiology" value={form.preferredSpecialty} onChange={handleChange} className={inputClass} />
        </div>

        {/* Preferred Cities + Language */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-brand-navy">Preferred Cities</label>
            <input name="preferredCities" placeholder="e.g. Beijing, Shanghai" value={form.preferredCities} onChange={handleChange} className={inputClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-brand-navy">Language</label>
            <select name="language" value={form.language} onChange={handleChange} className={`${inputClass} appearance-none`}>
              <option value="">Select Language</option>
              {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>

        {/* File upload */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-brand-navy">Upload Your Documents</label>
          <div
            onClick={() => fileRef.current?.click()}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-brand-border px-5 py-4 text-center hover:border-brand-teal hover:bg-brand-tealLight/30 transition-all"
          >
            <Upload size={15} className="text-brand-teal" />
            <span className="text-brand-slate text-sm">
              {files.length > 0 ? files.map((f) => f.name).join(", ") : "Upload 📎"}
            </span>
          </div>
          <input ref={fileRef} type="file" multiple accept=".pdf,.doc,.docx,.jpg,.png" className="hidden"
            onChange={(e) => { if (e.target.files) setFiles(Array.from(e.target.files)); }} />
        </div>

        {/* Additional info */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-brand-navy">Additional Information <span className="text-red-500">*</span></label>
          <textarea
            name="additionalInfo"
            placeholder="Any specific requirements, interests, or questions you'd like to share..."
            value={form.additionalInfo}
            onChange={handleChange}
            rows={5}
            className={`${inputClass} resize-none`}
          />
        </div>

        {error && (
          <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-brand-teal text-white font-medium py-3.5 rounded-xl hover:bg-brand-tealDark transition-all text-sm flex items-center justify-center gap-2 mt-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
              Submitting...
            </>
          ) : (
            <>Submit Enquiry <Send size={14} /></>
          )}
        </button>
      </div>
    </div>
  );
}
