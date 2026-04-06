"use client";

import { useRef, useState } from "react";
import { ChevronDown, Paperclip, Send, Upload, X } from "lucide-react";
import Button from "@/components/ui/ui/Button";
import { submitPlacementEnquiry } from "@/lib/api";
import type { PlacementEnquiryForm } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface PlacementEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  placementTitle?: string;
  onSubmit?: (
    form: PlacementEnquiryForm,
    files: File[]
  ) => Promise<{ success: boolean; error?: string }>;
}

const SPECIALTIES = [
  "Cardiology",
  "Emergency Medicine",
  "General Surgery",
  "Internal Medicine",
  "Neurology",
  "Obstetrics & Gynecology",
  "Oncology",
  "Orthopaedics",
  "Paediatrics",
  "Psychiatry",
  "Radiology & Imaging",
  "Traditional Chinese Medicine",
  "Other",
];

const LANGUAGES = ["English", "Chinese (Mandarin)", "Bilingual (Both)"];
const DURATIONS = [
  "2 weeks",
  "4 weeks",
  "6 weeks",
  "8 weeks",
  "10 weeks",
  "12 weeks",
  "Flexible",
];

const EMPTY: PlacementEnquiryForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  university: "",
  yearOfStudy: "",
  preferredSpecialty: "",
  preferredCities: "",
  duration: "",
  preferredStartDate: "",
  language: "",
  additionalInfo: "",
};

type FieldProps = {
  label: string;
  name: keyof PlacementEnquiryForm;
  value?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  className?: string;
};

function Field({
  label,
  name,
  value,
  placeholder,
  required,
  type = "text",
  onChange,
  className,
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label className="text-[12px] font-medium text-[#43474a]">
        {label}
        {required && <span className="text-[#e16464]">*</span>}
      </label>
      <input
        name={name}
        type={type}
        value={value ?? ""}
        placeholder={placeholder}
        onChange={onChange}
        className="h-11 w-full rounded-[10px] border border-[#efefef] bg-[#f8f8f8] px-4 text-[12px] text-[#32363a] placeholder:text-[#b4b4b4] outline-none transition focus:border-brand-teal"
      />
    </div>
  );
}

type SelectFieldProps = {
  label: string;
  name: keyof PlacementEnquiryForm;
  value?: string;
  placeholder: string;
  required?: boolean;
  options: readonly string[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  className?: string;
};

function SelectField({
  label,
  name,
  value,
  placeholder,
  required,
  options,
  onChange,
  className,
}: SelectFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label className="text-[12px] font-medium text-[#43474a]">
        {label}
        {required && <span className="text-[#e16464]">*</span>}
      </label>
      <div className="relative">
        <select
          name={name}
          value={value ?? ""}
          onChange={onChange}
          className="h-11 w-full appearance-none rounded-[10px] border border-[#efefef] bg-[#f8f8f8] px-4 pr-10 text-[12px] text-[#32363a] outline-none transition focus:border-brand-teal"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          size={15}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8a8f93]"
        />
      </div>
    </div>
  );
}

export default function PlacementEnquiryModal({
  isOpen,
  onClose,
  placementTitle,
  onSubmit,
}: PlacementEnquiryModalProps) {
  const router = useRouter();
  const [form, setForm] = useState<PlacementEnquiryForm>(EMPTY);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setError(null);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.phone ||
      !form.university ||
      !form.yearOfStudy ||
      !form.preferredSpecialty ||
      !form.preferredCities ||
      !form.duration ||
      !form.preferredStartDate ||
      !form.language ||
      !form.additionalInfo
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (Number.isNaN(Number(form.yearOfStudy))) {
      setError("Year of study must be a number.");
      return;
    }

    setLoading(true);
    setError(null);
    const submit = onSubmit ?? submitPlacementEnquiry;
    const result = await submit(form, files);
    setLoading(false);

    if (result.success) {
      setForm(EMPTY);
      setFiles([]);
      onClose();
      router.push("/enquiry-success");
      return;
    }

    setError(result.error ?? "Something went wrong. Please try again.");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[94vh] w-full max-w-[880px] flex-col overflow-hidden rounded-[18px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.22)] animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center text-[#464b4f] transition hover:text-black"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="overflow-y-auto px-5 pb-5 pt-7 sm:px-6 sm:pb-6 sm:pt-8">
          <div className="mb-5 pr-10">
            <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-[#313538]">
              Placement Enquiry Form
            </h2>
            <p className="mt-3 max-w-[690px] text-[11px] leading-[1.45] text-[#808487]">
              Please Provide The Following Information So We Can Match You With The Best Placement Options. Fields Marked With * Are Required.
            </p>
            {placementTitle && (
              <div className="mt-3 inline-flex items-center rounded-full bg-[#eaf8f7] px-3 py-1 text-[11px] font-medium text-brand-teal">
                {placementTitle}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="First Name"
                name="firstName"
                value={form.firstName}
                placeholder="Enter your first name"
                required
                onChange={handleChange}
              />
              <Field
                label="Last Name"
                name="lastName"
                value={form.lastName}
                placeholder="Enter your last name"
                required
                onChange={handleChange}
              />
            </div>

            <Field
              label="Email Address"
              name="email"
              value={form.email}
              type="email"
              placeholder="username@example.com"
              required
              onChange={handleChange}
            />

            <Field
              label="Phone Number"
              name="phone"
              value={form.phone}
              type="tel"
              placeholder="+1 (555) 123-4567"
              required
              onChange={handleChange}
            />

            <Field
              label="University/Medical School"
              name="university"
              value={form.university}
              placeholder="Your institution"
              required
              onChange={handleChange}
            />

            <Field
              label="Year Of Study"
              name="yearOfStudy"
              value={form.yearOfStudy}
              placeholder="e.g. 4/5"
              required
              onChange={handleChange}
            />

            <Field
              label="Preferred Cities"
              name="preferredCities"
              value={form.preferredCities}
              placeholder="e.g., Beijing, Shanghai"
              required
              onChange={handleChange}
            />

            <SelectField
              label="Preferred Specialty"
              name="preferredSpecialty"
              value={form.preferredSpecialty}
              placeholder="Select Specialty"
              required
              options={SPECIALTIES}
              onChange={handleChange}
            />

            <SelectField
              label="Duration"
              name="duration"
              value={form.duration}
              placeholder="Select Duration"
              required
              options={DURATIONS}
              onChange={handleChange}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="Preferred Start Date"
                name="preferredStartDate"
                value={form.preferredStartDate}
                placeholder="mm/dd/yyyy"
                required
                onChange={handleChange}
              />
              <SelectField
                label="Language"
                name="language"
                value={form.language}
                placeholder="Select Language"
                required
                options={LANGUAGES}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-medium text-[#43474a]">
                Upload Your Documents
              </label>
              <div
                onClick={() => fileRef.current?.click()}
                className="flex h-11 w-full cursor-pointer items-center justify-center rounded-[10px] border border-[#efefef] bg-[#f8f8f8] px-4 text-[12px] text-[#8a8f93] transition hover:border-brand-teal"
              >
                <span className="mr-2 font-medium text-[#4b4f53]">Upload</span>
                <Upload size={13} className="text-brand-teal" />
              </div>
              {files.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {files.map((file) => (
                    <span
                      key={`${file.name}-${file.size}`}
                      className="inline-flex items-center gap-1 rounded-full bg-[#eef7f7] px-3 py-1 text-[11px] text-[#5e6469]"
                    >
                      <Paperclip size={11} />
                      {file.name}
                    </span>
                  ))}
                </div>
              )}
              <input
                ref={fileRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.png"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) setFiles(Array.from(e.target.files));
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-medium text-[#43474a]">
                Additional Information<span className="text-[#e16464]">*</span>
              </label>
              <textarea
                name="additionalInfo"
                value={form.additionalInfo}
                placeholder="Any specific requirements, interests, or questions you'd like to share..."
                onChange={handleChange}
                rows={6}
                className="w-full resize-none rounded-[10px] border border-[#efefef] bg-[#f8f8f8] px-4 py-4 text-[12px] text-[#32363a] placeholder:text-[#b4b4b4] outline-none transition focus:border-brand-teal"
              />
            </div>

            {error && (
              <div className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <Button
              onClick={handleSubmit}
              className="mt-2 h-12 w-full rounded-[8px] bg-brand-teal text-[13px] font-medium hover:bg-brand-tealDark"
              disabled={loading}
            >
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
                  Submitting...
                </span>
              ) : (
                <>
                  Submit Enquiry <Send size={14} />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
