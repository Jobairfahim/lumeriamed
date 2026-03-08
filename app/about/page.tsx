import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="pt-16">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="bg-brand-light py-14 md:py-20 text-center px-4 border-b border-brand-border">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy mb-3">
          About <span className="text-brand-teal">LumieraMed</span>
        </h1>
        <p className="text-brand-slate text-sm md:text-base max-w-sm mx-auto leading-relaxed">
          Building bridges between aspiring healthcare professionals
          and world-class medical institutions.
        </p>
      </div>

      {/* ── Our Mission ───────────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="rounded-2xl overflow-hidden h-64 md:h-80 bg-brand-gray relative">
              <Image 
                src="/images/our-mission.png" 
                alt="Medical students in a Chinese hospital" 
                fill
                className="object-cover" 
              />
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-navy mb-5">Our Mission</h2>
              <div className="flex flex-col gap-4 text-brand-slate text-sm md:text-base leading-relaxed">
                <p>
                  LumieraMed is dedicated to empowering the next generation of medical
                  professionals through exceptional international clinical experiences. We believe
                  that meaningful exposure to diverse healthcare systems, medical practices, and
                  emerging innovation is essential for developing well-rounded, culturally competent
                  physicians.
                </p>
                <p>
                  Our mission is to make world-class clinical electives in China accessible,
                  well-structured, and genuinely transformative for medical students from around
                  the globe.
                </p>
                <p className="font-medium text-brand-navy">
                  The future of medicine is global. We are preparing those who will define it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Values ────────────────────────────────────────────────────── */}
      <section className="bg-brand-light py-16 md:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-navy text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ),
                title: "Excellence",
                desc: "We partner only with prestigious institutions that meet our rigorous standards for clinical education and student support.",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                ),
                title: "Support",
                desc: "From initial enquiry to program completion, we provide comprehensive guidance and support at every step of your journey.",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
                  </svg>
                ),
                title: "Growth",
                desc: "We're committed to continuous improvement, expanding our network and enhancing the elective experience for every student.",
              },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 shadow-soft">
                <div className="w-10 h-10 rounded-xl bg-brand-tealLight flex items-center justify-center text-brand-teal mb-4">
                  {v.icon}
                </div>
                <h3 className="font-semibold text-brand-navy text-base mb-2">{v.title}</h3>
                <p className="text-brand-slate text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why China ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-navy mb-6">Why China?</h2>
              <div className="flex flex-col gap-4 text-brand-slate text-sm md:text-base leading-relaxed">
                <p>
                  China&apos;s healthcare system represents one of the most dynamic and rapidly
                  evolving medical landscapes in the world. Unique in its integration of
                  Traditional Chinese Medicine alongside modern hospital-based practice, it is
                  one of the few countries where both systems are actively practised within the
                  same clinical environment.
                </p>
                <p>
                  Supported by advanced technology, high-volume tertiary centres, and a
                  population of over one billion, students are exposed to an extraordinary
                  variety and volume of clinical cases — encountering conditions, presentations,
                  and treatment pathways across an exceptionally broad clinical spectrum.
                </p>
                <p>
                  Beyond clinical skills, students gain invaluable cross-cultural communication
                  experience and a deeper understanding of global health systems —
                  competencies that are increasingly vital in an interconnected world.
                </p>
                <p className="font-medium text-brand-navy italic">Perspective changes practice.</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden h-72 md:h-96 bg-brand-gray relative">
              <Image 
                src="/images/why-china.png" 
                alt="Medical professional in China" 
                fill
                className="object-cover" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Story ─────────────────────────────────────────────────────── */}
      <section className="bg-brand-light py-16 md:py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-navy text-center mb-8">
            Our Story
          </h2>
          <div className="flex flex-col gap-4 text-brand-slate text-sm md:text-base leading-relaxed">
            <p className="text-center">Hi, my name is Ding, and I am the founder of LumieraMed.</p>
            <p>
              I was brought up in England and studied Medicine in the UK. I come from a Chinese
              background, with both parents being Chinese. Growing up between two cultures shaped
              how I see the world — and, over time, how I came to understand medicine.
            </p>
            <p>
              During my training, I recognised how rarely students are exposed to systems beyond
              their own. We learn deeply within one framework, yet medicine globally looks very
              different.
            </p>
            <p className="font-semibold text-brand-navy">China challenged my assumptions.</p>
            <p>
              Hospitals operating at extraordinary scale. High-volume tertiary centres managing
              complex cases daily. Yet within these same institutions, centuries-old traditions
              sit alongside modern medical technology. Traditional Chinese Medicine is practised
              within hospital settings — acupuncture clinics adjacent to surgical departments,
              herbal prescriptions issued alongside pharmaceutical treatments. Concepts such as
              balance and Qi are considered within a system also driven by imaging, laboratory
              diagnostics, and advanced interventions. Experiencing this first-hand reshaped how
              I understood healthcare.
            </p>
            <p>LumieraMed was built to make that perspective accessible to others.</p>
            <p>
              I created it to give meaningful access to Chinese clinical environments — not as
              observers from the outside, but as students embedded within real systems. The goal
              is simple: to broaden perspective, strengthen cultural fluency, and develop doctors
              who think beyond a single model of care.
            </p>
            <p className="font-semibold text-brand-navy text-center">
              Because in modern medicine, perspective is not optional — it shapes the kind of
              doctor you become.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
