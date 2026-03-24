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
            <br />
            <br />
            <br />



            <div className="pt-2">
              <Button href="/contact" variant="primary">
                Contact Us
              </Button>
            </div>
          </div>

          {/* Image side */}
          <div className="relative">
            <div className="flex flex-col gap-4 text-brand-slate text-base leading-relaxed">
              <p>
                LumieraMed is a specialised platform designed to offer medical students unique and easily accessible elective placement opportunities in China.
              </p>
              <p>
                We partner with leading hospitals and medical institutions across China to provide students with an exceptional blend of learning experiences in diverse medical specialties.
              </p>
              <p>
                Our mission is to bridge cultures and advance medical education by creating opportunities for future healthcare professionals to gain global exposure and clinical excellence.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
