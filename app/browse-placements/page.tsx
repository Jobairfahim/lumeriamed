"use client";

import Image from "next/image";
// import { cn } from "@/lib/utils";
// import Button from "@/components/ui/Button";
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

// const CITIES = ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu", "Hangzhou", "Xi'an", "Wuhan"];

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { image: "enquiry", title: "Submit Enquiry",    desc: "Tell us about your specialty interests, preferred dates, language skills, and goals." },
              { image: "matchings", title: "Personal Matching", desc: "Our team reviews your profile and matches you with suitable hospitals from our network." },
              { image: "confirmation", title: "Confirmation",      desc: "Receive placement details, documentation requirements, and guidance within 1–2 weeks." },
              { image: "begin", title: "Begin Your Journey",desc: "Complete preparations with our support and start your transformative clinical experience." },
            ].map((s, index) => (
              <div key={index} className="bg-brand-light p-6 rounded-2xl text-center">
                <div className="flex justify-center mb-4">
                  <Image
                    src={`/images/${s.image}.png`}
                    alt={s.title}
                    width={60}
                    height={60}
                    className="w-12 h-12"
                  />
                </div>
                <h3 className="font-semibold text-brand-navy text-base mb-2">{s.title}</h3>
                <p className="text-brand-slate text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Placement Works Image ─────────────────────────────────────── */}
      <section className="px-6 py-15">
        <Image
          src="/images/placement-works.png"
          alt="How Our Placement Process Works"
          width={1320}
          height={600}
          className="w-full h-auto object-cover rounded-2xl"
        />
      </section>

      {/* ── Specialties ───────────────────────────────────────────────────── */}
      <section className="bg-brand-light py-14 md:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-navy mb-3">
             What We Offer
            </h2>
            <p className="text-brand-slate text-sm md:text-base max-w-md mx-auto leading-relaxed">
              We offer a range of different specialties depending on your interests, providing you with the flexibility to gain experience in areas that align with your career goals. 
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPECIALTIES.map((s) => (
              <div key={s.title} className="group bg-white p-6 rounded-2xl border border-brand-border hover:bg-brand-teal transition-colors shadow-sm cursor-pointer">
                <h3 className="font-semibold text-brand-navy text-base mb-2 group-hover:text-white transition-colors">{s.title}</h3>
                <p className="text-brand-slate text-sm leading-relaxed group-hover:text-white transition-colors">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <Image
              src="/images/partner-inst.png"
              alt="Our partner institutions"
              width={720}
              height={520}
              className="w-full h-auto rounded-2xl object-cover"
            />
          </div>
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-navy mb-4">
              Our Partner Institutions
            </h2>
            <p className="text-brand-slate text-sm md:text-base leading-relaxed mb-5">
              We work exclusively with accredited, high-quality medical institutions that have demonstrated commitment to international medical education. Our partner hospitals include:
            </p>
            <ul className="space-y-3 text-brand-slate text-sm md:text-base leading-relaxed mb-5">
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-brand-teal shrink-0" />
                <span>University-affiliated teaching hospitals with dedicated international departments</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-brand-teal shrink-0" />
                <span>Specialist centres of excellence in various medical fields</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-brand-teal shrink-0" />
                <span>Hospitals with English-speaking staff to ensure smooth communication</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-brand-teal shrink-0" />
                <span>Traditional Chinese medicine clinics, offering a unique blend of Eastern and Western medical practices</span>
              </li>
            </ul>
            <p className="text-brand-slate text-sm md:text-base leading-relaxed">
              Each placement is individually arranged based on your specific requirements, ensuring the best possible match for your educational objectives and career aspirations.
            </p>
          </div>
        </div>
      </section>

      {/* ── Cities ────────────────────────────────────────────────────────── */}
      {/* <section className="bg-white py-14 md:py-20 px-4">
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
      </section> */}

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
