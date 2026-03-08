import FAQSection from "@/components/sections/FAQSection";
import CTABannerSection from "@/components/sections/CTABannerSection";

export default function FAQPage() {
  return (
    <div className="pt-16">
      <div className="bg-brand-light py-14 md:py-20 text-center px-4 border-b border-brand-border">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-3">
          Frequently Asked <span className="text-brand-teal">Questions</span>
        </h1>
        <p className="text-brand-slate text-sm md:text-base max-w-md mx-auto leading-relaxed">
          Everything you need to know about clinical elective placements in China.
        </p>
      </div>
      <FAQSection />
      <CTABannerSection />
    </div>
  );
}
