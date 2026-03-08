"use client";

import { useModal } from "@/components/modals/ModalProvider";

const SPECIALTIES = [
  { title: "Internal Medicine",          desc: "Cardiology, gastroenterology, endocrinology, respiratory medicine, and more." },
  { title: "Surgery",                    desc: "General surgery, orthopaedics, neurosurgery, and minimally invasive procedures." },
  { title: "Pediatrics",                 desc: "Neonatology, paediatric emergency, and developmental medicine." },
  { title: "Emergency Medicine",         desc: "Fast-paced departments in major urban hospitals with diverse case presentations." },
  { title: "Obstetrics & Gynecology",    desc: "Prenatal care, labour & delivery, gynaecological procedures, and reproductive health." },
  { title: "Traditional Chinese Medicine", desc: "Acupuncture, herbal medicine, and integrated care in hospital-based TCM departments." },
  { title: "Oncology",                   desc: "Medical and radiation oncology at cancer centres with cutting-edge treatments." },
  { title: "Radiology & Imaging",        desc: "CT, MRI, ultrasound, and interventional radiology at leading imaging centres." },
  { title: "Psychiatry",                 desc: "Inpatient and outpatient psychiatry and community mental health programs." },
];

const CITIES = ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu", "Hangzhou", "Xi'an", "Wuhan"];

export default function BrowsePlacementsPage() {
  const { openPlacement } = useModal();

  return (
    <div className="pt-16 min-h-screen bg-white">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="bg-brand-light py-14 md:py-20 text-center px-4 border-b border-brand-border">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-3">
          Find Your Perfect{" "}
          <span className="text-brand-teal">Clinical Elective</span>
        </h1>
        <p className="text-brand-slate text-sm md:text-base max-w-lg mx-auto leading-relaxed mb-7">
          We carefully match medical students with top hospitals across China based on
          specialty interests, experience level, and career goals. Every placement is
          personally curated — no generic listings.
        </p>
        <button
          onClick={() => openPlacement()}
          className="inline-flex items-center gap-2 bg-brand-teal text-white font-medium px-7 py-3.5 rounded-xl hover:bg-brand-tealDark transition-all shadow-sm text-sm"
        >
          Submit Your Enquiry →
        </button>
      </div>

      {/* ── Process ───────────────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-navy mb-4">
            How Our Placement Process Works
          </h2>
          <p className="text-brand-slate text-sm md:text-base leading-relaxed mb-10 max-w-lg mx-auto">
            We don&apos;t show placement listings because every student&apos;s needs are
            unique. Instead, we personally match you with the ideal placement.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {[
              { num: "01", title: "Submit Enquiry",    desc: "Tell us about your specialty interests, preferred dates, language skills, and goals." },
              { num: "02", title: "Personal Matching", desc: "Our team reviews your profile and matches you with suitable hospitals from our network." },
              { num: "03", title: "Confirmation",      desc: "Receive placement details, documentation requirements, and guidance within 1–2 weeks." },
              { num: "04", title: "Begin Your Journey",desc: "Complete preparations with our support and start your transformative clinical experience." },
            ].map((s) => (
              <div key={s.num} className="flex flex-col gap-2">
                <span className="text-brand-teal font-bold text-lg font-display">{s.num}</span>
                <h3 className="font-semibold text-brand-navy text-base">{s.title}</h3>
                <p className="text-brand-slate text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Specialties ───────────────────────────────────────────────────── */}
      <section className="bg-brand-light py-14 md:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-navy mb-3">
              Available Specialties
            </h2>
            <p className="text-brand-slate text-sm md:text-base max-w-md mx-auto leading-relaxed">
              We place students across a wide range of clinical specialties in China&apos;s leading hospitals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-border rounded-2xl overflow-hidden border border-brand-border">
            {SPECIALTIES.map((s) => (
              <div key={s.title} className="bg-white p-6 hover:bg-brand-light transition-colors">
                <h3 className="font-semibold text-brand-navy text-base mb-2">{s.title}</h3>
                <p className="text-brand-slate text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cities ────────────────────────────────────────────────────────── */}
      <section className="bg-white py-14 md:py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-navy mb-3">
            Placement Locations
          </h2>
          <p className="text-brand-slate text-sm md:text-base max-w-md mx-auto mb-8">
            We place students across China&apos;s leading medical cities.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {CITIES.map((city) => (
              <span key={city} className="px-5 py-2.5 rounded-full border border-brand-border text-brand-slate text-sm font-medium bg-brand-light hover:border-brand-teal hover:text-brand-teal transition-all">
                🏙 {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
      <section className="bg-brand-teal py-14 px-4 text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
          Ready to Find Your Placement?
        </h2>
        <p className="text-white/80 text-sm md:text-base mb-7 max-w-md mx-auto">
          Submit your enquiry today and our team will personally match you with the right
          hospital within 1–2 weeks.
        </p>
        <button
          onClick={() => openPlacement()}
          className="inline-flex items-center gap-2 bg-white text-brand-teal font-semibold px-7 py-3.5 rounded-xl hover:bg-brand-light transition-all shadow-sm text-sm"
        >
          Submit Your Enquiry →
        </button>
      </section>

    </div>
  );
}
