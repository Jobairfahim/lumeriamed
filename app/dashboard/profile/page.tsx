import { GraduationCap, Mail, Pencil, Phone } from "lucide-react";

const MOCK_PROFILE = {
  name: "Ahmed Rahmin",
  studentId: "20394",
  email: "ahmed.rahim@gmail.com",
  phone: "+8898795467",
  university: "Ab university",
  avatar: "/images/avatar.png",
};

const PROFILE_FIELDS = [
  { icon: Mail, label: "Email", value: MOCK_PROFILE.email },
  { icon: Phone, label: "Phone Number", value: MOCK_PROFILE.phone },
  {
    icon: GraduationCap,
    label: "University/Medical School",
    value: MOCK_PROFILE.university,
  },
];

export default function ProfilePage() {
  return (
    <div className="mx-auto w-full max-w-[980px]">
      <h1 className="mb-5 font-display text-[1.75rem] font-semibold tracking-[-0.03em] text-brand-navy sm:mb-6 sm:text-[2rem]">
        Profile
      </h1>

      <section className="relative rounded-[24px] bg-white px-4 py-6 shadow-soft sm:px-6 sm:py-8 md:px-10 md:py-10">
        <button
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-brand-muted transition-colors hover:bg-brand-light hover:text-brand-navy sm:right-5 sm:top-5"
          aria-label="Edit profile"
        >
          <Pencil size={16} strokeWidth={1.8} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-brand-gray ring-2 ring-[#e8f6f4]">
            <img
              src={MOCK_PROFILE.avatar}
              alt={MOCK_PROFILE.name}
              className="h-full w-full object-cover"
            />
            <span className="absolute text-lg font-semibold text-brand-navy">AR</span>
          </div>
          <h2 className="font-display text-[1.45rem] font-semibold tracking-[-0.03em] text-brand-navy sm:text-[1.75rem]">
            {MOCK_PROFILE.name}
          </h2>
          <p className="mt-1 text-sm text-brand-muted">
            Student ID: {MOCK_PROFILE.studentId}
          </p>
        </div>

        <div className="my-6 border-t border-dashed border-[#dbeff0]" />

        <div className="flex max-w-[420px] flex-col gap-5 sm:gap-6">
          {PROFILE_FIELDS.map(({ icon: Icon, label, value }) => (
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
    </div>
  );
}
