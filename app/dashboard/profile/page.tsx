"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { GraduationCap, Mail, Pencil, Phone, Upload, X } from "lucide-react";
import { getStudentProfile, updateStudentProfile } from "@/lib/api";
import type { StudentProfile } from "@/lib/types";

const EMPTY_PROFILE: StudentProfile = {
  fullName: "",
  studentId: "",
  email: "",
  phoneNumber: "",
  university: "",
  
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<StudentProfile>(EMPTY_PROFILE);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    university: "",
  });
  const fileRef = useRef<HTMLInputElement>(null);

  const applyProfileData = (data: StudentProfile) => {
    const fullName =
      data.fullName ??
      data.name ??
      [data.firstName, data.lastName].filter(Boolean).join(" ").trim();
    const phone = data.phoneNumber ?? data.phone ?? "";
    const university = data.university ?? data.universityOrMedicalSchool ?? "";
    const email =
      data.email ??
      (typeof data.userId === "object" && data.userId
        ? data.userId.email ?? ""
        : "");

    setProfile((prev) => ({
      ...prev,
      ...data,
      fullName,
      name: fullName,
      email: email || prev.email || "",
      phoneNumber: phone,
      university,
      universityOrMedicalSchool: university,
    }));

    setEditForm({
      fullName,
      email,
      phone,
      university,
    });
  };

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("accessToken") ?? "" : "";

    const loadProfile = async () => {
      setLoadError(null);
      const result = await getStudentProfile(token);
      if (!result.success) {
        setLoadError(result.error);
        setLoading(false);
        return;
      }

      applyProfileData(result.data);
      setLoading(false);
    };

    void loadProfile();
  }, []);

  useEffect(() => {
    if (!editImageFile) return;

    const objectUrl = URL.createObjectURL(editImageFile);
    setEditImagePreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [editImageFile]);

  const profileFields = [
    { icon: Mail, label: "Email", value: profile?.email ?? "-" },
    { icon: Phone, label: "Phone Number", value: profile?.phoneNumber ?? "-" },
    {
      icon: GraduationCap,
      label: "University/Medical School",
      value: profile?.university ?? profile?.universityOrMedicalSchool ?? "-",
    },
  ];

  const displayName = profile.fullName || profile.name || "Student";
  const displayStudentId = profile.studentId || "-";
  const avatarSrc = profile.avatar ?? profile.profileImage ?? "";
  const modalAvatarSrc = editImagePreview || avatarSrc;

  const handleEditProfile = () => {
    setEditImageFile(null);
    setEditImagePreview("");
    setSaveError(null);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditImageFile(null);
    setEditImagePreview("");
    setSaveError(null);
    setSaving(false);
    setIsEditModalOpen(false);
  };

  const handleSaveProfile = async () => {
    if (!editForm.fullName || !editForm.phone || !editForm.university) {
      setSaveError("Please complete all profile fields.");
      return;
    }

    const token =
      typeof window !== "undefined" ? localStorage.getItem("accessToken") ?? "" : "";

    setSaving(true);
    setSaveError(null);
    const result = await updateStudentProfile(
      {
        fullName: editForm.fullName,
        phoneNumber: editForm.phone,
        university: editForm.university,
      },
      token,
      editImageFile,
    );
    setSaving(false);

    if (!result.success) {
      setSaveError(result.error);
      return;
    }

    setProfile((prev) => ({
      ...prev,
      fullName: editForm.fullName,
      name: editForm.fullName,
      email: editForm.email,
      phoneNumber: editForm.phone,
      university: editForm.university,
      universityOrMedicalSchool: editForm.university,
    }));
    applyProfileData({
      ...result.data,
      email: result.data.email ?? editForm.email,
    });
    handleCloseModal();
  };

  const handleInputChange = (field: string, value: string) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-[980px]">
        <h1 className="mb-5 font-display text-[1.75rem] font-semibold tracking-[-0.03em] text-brand-navy sm:mb-6 sm:text-[2rem]">
          Profile
        </h1>
        <section className="rounded-[24px] bg-white px-4 py-10 shadow-soft sm:px-6 md:px-10">
          <p className="text-sm text-brand-muted">Loading profile...</p>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[980px]">
      <h1 className="mb-5 font-display text-[1.75rem] font-semibold tracking-[-0.03em] text-brand-navy sm:mb-6 sm:text-[2rem]">
        Profile
      </h1>

      <section className="relative rounded-[24px] bg-white px-4 py-6 shadow-soft sm:px-6 sm:py-8 md:px-10 md:py-10">
        <button
          onClick={handleEditProfile}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-brand-muted transition-colors hover:bg-brand-light hover:text-brand-navy sm:right-5 sm:top-5"
          aria-label="Edit profile"
        >
          <Pencil size={16} strokeWidth={1.8} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-brand-gray ring-2 ring-[#e8f6f4]">
            {avatarSrc && (
              <Image src={avatarSrc} alt={displayName} fill className="object-cover" />
            )}
          </div>
          <h2 className="font-display text-[1.45rem] font-semibold tracking-[-0.03em] text-brand-navy sm:text-[1.75rem]">
            {displayName}
          </h2>
          <p className="mt-1 text-sm text-brand-muted">Student ID: {displayStudentId}</p>
        </div>

        <div className="my-6 border-t border-dashed border-[#dbeff0]" />

        {loadError && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {loadError}
          </div>
        )}

        <div className="flex max-w-[420px] flex-col gap-5 sm:gap-6">
          {profileFields.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="mt-0.5 text-[#a8afb5]">
                <Icon size={16} strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-sm text-[#b1b7bd]">{label}</p>
                <p className="mt-1 text-sm font-medium text-[#3d464d]">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-brand-navy">Edit Profile</h3>
              <button
                onClick={handleCloseModal}
                className="flex h-8 w-8 items-center justify-center rounded-full text-brand-muted transition-colors hover:bg-brand-light hover:text-brand-navy"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-brand-navy">Profile Image</label>
                <div className="flex items-center gap-4">
                  <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-brand-gray ring-2 ring-[#e8f6f4]">
                    {modalAvatarSrc && (
                      <Image
                        src={modalAvatarSrc}
                        alt={editForm.fullName || displayName}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="inline-flex items-center gap-2 rounded-lg border border-brand-border px-4 py-2 text-sm font-medium text-brand-navy transition-colors hover:border-brand-teal hover:text-brand-teal"
                    >
                      <Upload size={15} />
                      Upload Image
                    </button>
                    <p className="mt-2 text-xs text-brand-muted">JPG, PNG, or WebP</p>
                    {editImageFile && (
                      <p className="mt-1 text-xs text-brand-slate">{editImageFile.name}</p>
                    )}
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0] ?? null;
                        setSaveError(null);
                        setEditImageFile(file);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-brand-navy">Full Name</label>
                <input
                  type="text"
                  value={editForm.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="w-full rounded-lg border border-brand-border px-4 py-2 text-sm focus:border-brand-teal focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-brand-navy">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  disabled
                  readOnly
                  className="w-full cursor-not-allowed rounded-lg border border-brand-border bg-brand-light px-4 py-2 text-sm text-brand-slate"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-brand-navy">Phone Number</label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full rounded-lg border border-brand-border px-4 py-2 text-sm focus:border-brand-teal focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-brand-navy">University/Medical School</label>
                <input
                  type="text"
                  value={editForm.university}
                  onChange={(e) => handleInputChange("university", e.target.value)}
                  className="w-full rounded-lg border border-brand-border px-4 py-2 text-sm focus:border-brand-teal focus:outline-none"
                />
              </div>
            </div>

            {saveError && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {saveError}
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleCloseModal}
                className="flex-1 rounded-lg border border-brand-border bg-white px-4 py-2 text-sm font-medium text-brand-navy transition-colors hover:bg-brand-light"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                disabled={saving}
                className="flex-1 rounded-lg bg-brand-teal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-tealDark disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
