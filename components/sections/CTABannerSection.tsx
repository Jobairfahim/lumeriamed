import Image from "next/image";
import Button from "@/components/ui/Button";

export default function CTABannerSection() {
  return (
    <section className="bg-brand-light py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden w-full min-h-[700px] md:min-h-[400px] flex items-center justify-center">
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="/images/cta-bg.png"
              alt="Medical team"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-brand-navy/65" />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-6 py-12">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
              Ready To Transform Your Life?
            </h2>
            <p className="text-white/75 text-sm md:text-base mb-8 max-w-sm mx-auto">
              Take the first step toward your international clinical career. 
              Apply for your China elective today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button href="/browse-placements" size="lg">
                Enquire Now
              </Button>
              <Button href="/contact" size="lg" variant="transparent">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
