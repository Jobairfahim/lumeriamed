const SPECIALTIES = [
  {
    title: "Internal Medicine",
    desc: "General internal medicine and subspecialties including cardiology, gastroenterology, and endocrinology.",
  },
  {
    title: "Surgery",
    desc: "Observe and assist in general surgery, orthopaedics, neurosurgery, and minimally invasive procedures.",
  },
  {
    title: "Pediatrics",
    desc: "Comprehensive paediatric care including neonatology, pediatric emergency, and developmental medicine.",
  },
  {
    title: "Emergency Medicine",
    desc: "Fast-paced emergency departments in major urban hospitals with diverse case presentations.",
  },
  {
    title: "Obstetrics & Gynecology",
    desc: "Prenatal care, labor & delivery, gynecological procedures, and reproductive health.",
  },
  {
    title: "Traditional Chinese Medicine",
    desc: "Acupuncture, herbal medicine, and integrated care in hospital-based TCM departments.",
  },
  {
    title: "Oncology",
    desc: "Medical and radiation oncology experiences at cancer centres with cutting-edge treatments.",
  },
  {
    title: "Radiology & Imaging",
    desc: "Diagnostic imaging including CT, MRI, ultrasound, and interventional radiology.",
  },
  {
    title: "Psychiatry",
    desc: "Mental health services, inpatient and outpatient psychiatry, and community health programs.",
  },
];

export default function PlacementSpecialtiesSection() {
  return (
    <section className="bg-white py-16 md:py-20 px-4">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-navy mb-3">
            How Our Placement Process Works
          </h2>
          <p className="text-brand-slate text-sm md:text-base max-w-md mx-auto leading-relaxed">
            We don&apos;t show placement listings because every student&apos;s needs are unique.
            Instead, we personally match you with the ideal placement.
          </p>
        </div>

        {/* 3-col bordered grid */}
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
  );
}
