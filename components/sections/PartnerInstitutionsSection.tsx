export default function PartnerInstitutionsSection() {
  return (
    <section className="bg-white py-16 md:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left: image */}
          <div className="rounded-2xl overflow-hidden h-72 md:h-80 bg-brand-gray order-last md:order-first">
            <img
              src="/images/partner-institutions.jpg"
              alt="Medical professionals in discussion"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: content */}
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-navy mb-4">
              Our Partner Institutions
            </h2>
            <p className="text-brand-slate text-sm md:text-base leading-relaxed mb-5">
              We work exclusively with accredited, high-quality medical institutions that
              have demonstrated commitment to international medical education. Our partner
              hospitals include:
            </p>

            <ul className="flex flex-col gap-3 mb-6">
              {[
                "University-affiliated teaching hospitals with international departments",
                "Specialised centres of excellence in specific medical fields",
                "Hospitals with English-speaking staff",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-brand-slate text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-teal mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="text-brand-slate text-sm leading-relaxed">
              Each placement is individually arranged based on your specific requirements,
              ensuring the best possible match for your educational objectives and career
              aspirations.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
