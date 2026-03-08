"use client";

import { useState, useRef } from "react";
import { X, Upload, Send } from "lucide-react";
import { Input, Textarea } from "@/components/ui/ui/Input";
import Button from "@/components/ui/ui/Button";
import type { PlacementEnquiryForm } from "@/lib/types";
import { useRouter } from "next/navigation";

interface PlacementEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  placementTitle?: string;
  /**
   * ── INTEGRATION POINT ──
   * onSubmit={async (form, files) => submitPlacementEnquiry(form, files)}
   */
  onSubmit?: (form: PlacementEnquiryForm, files: File[]) => Promise<{ success: boolean; error?: string }>;
}

const SPECIALTIES = ["Cardiology","Emergency Medicine","General Surgery","Internal Medicine","Neurology","Obstetrics & Gynecology","Oncology","Orthopaedics","Paediatrics","Psychiatry","Radiology & Imaging","Traditional Chinese Medicine","Other"];
const LANGUAGES   = ["English","Chinese (Mandarin)","Bilingual (Both)"];
const DURATIONS   = ["2 weeks","4 weeks","6 weeks","8 weeks","10 weeks","12 weeks","Flexible"];

const EMPTY: PlacementEnquiryForm = {
  firstName: "", email: "", phone: "", university: "", yearOfStudy: "",
  preferredSpecialty: "", preferredCities: "", duration: "",
  preferredStartDate: "", language: "", additionalInfo: "",
};

export default function PlacementEnquiryModal({ isOpen, onClose, placementTitle, onSubmit }: PlacementEnquiryModalProps) {
  const router = useRouter();
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
        !form.yearOfStudy || !form.preferredSpecialty || !form.duration || !form.preferredStartDate) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!onSubmit) {
      onClose();
      router.push("/enquiry-success");
      return;
    }
    setLoading(true);
    setError(null);
    const result = await onSubmit(form, files);
    setLoading(false);
    if (result.success) {
      setForm(EMPTY); setFiles([]); onClose();
      router.push("/enquiry-success");
    } else {
      setError(result.error ?? "Something went wrong. Please try again.");
    }
  };

  if (!isOpen) return null;

  const selectClass = "w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-brand-navy text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all appearance-none";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl relative animate-fade-up flex flex-col max-h-[92vh]" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="px-7 pt-7 pb-5 border-b border-brand-border flex-shrink-0">
          <h2 className="font-display font-semibold text-brand-navy text-2xl">Placement Enquiry Form</h2>
          <p className="text-brand-slate text-sm mt-1 leading-snug">
            Please provide the following information so we can match you with the best placement options.
            Fields marked with <span className="text-red-500">*</span> are required.
          </p>
          {placementTitle && (
            <div className="mt-3 inline-flex items-center gap-2 bg-brand-tealLight text-brand-teal text-xs font-medium px-3 py-1.5 rounded-full">
              🏥 {placementTitle}
            </div>
          )}
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-7 py-6">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="First Name"     name="firstName" placeholder="Enter your first name"       value={form.firstName} onChange={handleChange} required />
              <Input label="Email Address"  name="email"     type="email" placeholder="your@email.com" value={form.email}     onChange={handleChange} required />
            </div>

            <Input label="Phone Number" name="phone" type="tel" placeholder="+1 (555) 123-4567" value={form.phone} onChange={handleChange} required />
            <Input label="University / Medical School" name="university" placeholder="Your institution" value={form.university} onChange={handleChange} required />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Year of Study" name="yearOfStudy" placeholder="e.g. Year 3, Final Year" value={form.yearOfStudy} onChange={handleChange} required />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-brand-navy">Preferred Specialty <span className="text-brand-teal">*</span></label>
                <select name="preferredSpecialty" value={form.preferredSpecialty} onChange={handleChange} className={selectClass}>
                  <option value="" disabled>Select specialty</option>
                  {SPECIALTIES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Preferred Cities" name="preferredCities" placeholder="e.g. Beijing, Shanghai" value={form.preferredCities} onChange={handleChange} />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-brand-navy">Duration <span className="text-brand-teal">*</span></label>
                <select name="duration" value={form.duration} onChange={handleChange} className={selectClass}>
                  <option value="" disabled>Select duration</option>
                  {DURATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Preferred Start Date" name="preferredStartDate" type="date" value={form.preferredStartDate} onChange={handleChange} required />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-brand-navy">Language</label>
                <select name="language" value={form.language} onChange={handleChange} className={selectClass}>
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
                className="w-full border-2 border-dashed border-brand-border rounded-xl py-4 px-5 flex items-center justify-center gap-2 cursor-pointer hover:border-brand-teal hover:bg-brand-tealLight/40 transition-all"
              >
                <Upload size={16} className="text-brand-teal" />
                <span className="text-brand-slate text-sm">
                  {files.length > 0 ? files.map((f) => f.name).join(", ") : "Upload CV, Passport, Transcript…"}
                </span>
              </div>
              <input ref={fileRef} type="file" multiple accept=".pdf,.doc,.docx,.jpg,.png" className="hidden" onChange={(e) => { if (e.target.files) setFiles(Array.from(e.target.files)); }} />
              <p className="text-brand-muted text-xs">Accepted: PDF, DOC, DOCX, JPG, PNG (max 10MB each)</p>
            </div>

            <Textarea label="Additional Information" name="additionalInfo" placeholder="Any specific requirements, interests, or questions you'd like to share..." value={form.additionalInfo} onChange={handleChange} className="min-h-[90px]" />

            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-7 pb-7 pt-4 border-t border-brand-border flex-shrink-0">
          <Button onClick={handleSubmit} className="w-full" size="lg" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                Submitting...
              </span>
            ) : (
              <>Submit Enquiry <Send size={15} /></>
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
