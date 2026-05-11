import HeroSection from "@/components/sections/HeroSection";
import WhatIsSection from "@/components/sections/WhatIsSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import WhyChooseSection from "@/components/sections/WhyChooseSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import CTABannerSection from "@/components/sections/CTABannerSection";
import PageMetadata from "@/components/seo/PageMetadata";

export default function HomePage() {
  return (
    <>
      <PageMetadata
        title="LumieraMed – Clinical Elective Placements in China | Medical Students"
        description="Connect with accredited clinical elective placements across China's leading hospitals. Gain hands-on medical experience in world-class healthcare facilities."
        keywords={[
          "medical elective china",
          "clinical placement",
          "medical students",
          "china hospitals",
          "international medical education",
          "clinical rotation",
          "medical internship"
        ]}
        canonical="/"
      />
      <HeroSection />
      <WhatIsSection />
      <HowItWorksSection />
      <WhyChooseSection />
      <FAQSection />
      <ContactSection />
      <CTABannerSection />
    </>
  );
}
