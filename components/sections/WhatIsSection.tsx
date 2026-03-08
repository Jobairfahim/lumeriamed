import Image from "next/image";
import Button from "@/components/ui/ui/Button";
import SectionHeader from "@/components/ui/ui/SectionHeader";

export default function WhatIsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text side */}
          <div className="flex flex-col gap-6">
            <SectionHeader
              title="What is LumieraMed?"
              italicPart="LumieraMed?"
              description=""
            />

            <div className="flex flex-col gap-4 text-brand-slate text-base leading-relaxed">
              <p>
                LumieraMed is a specialized platform dedicated to facilitating
                medical elective placements in China for international medical
                students.
              </p>
              <p>
                We partner with prestigious hospitals and medical institutions
                across China to provide students with unparalleled learning
                experiences in diverse medical specialties.
              </p>
              <p>
                Our mission is to bridge cultures and advance medical education
                by creating opportunities for future healthcare professionals to
                gain global exposure and clinical excellence.
              </p>
            </div>

            <div className="pt-2">
              <Button href="/contact" variant="outline">
                Contact Us
              </Button>
            </div>
          </div>

          {/* Image side */}
          <div className="relative">
            <div className="relative h-[360px] md:h-[420px] rounded-3xl overflow-hidden shadow-card">
              <Image
                src="/images/what-is-lumieramed.jpg"
                alt="Medical student learning in a Chinese hospital"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-2xl bg-brand-tealLight border border-brand-teal/20 hidden md:block" />
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-xl bg-brand-gray border border-brand-border hidden md:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
