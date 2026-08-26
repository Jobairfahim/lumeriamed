import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import WhatIsSection from "@/components/sections/WhatIsSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import WhyChooseSection from "@/components/sections/WhyChooseSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import CTABannerSection from "@/components/sections/CTABannerSection";

export const metadata: Metadata = {
  title: "Medical Electives in China for Students | LumieraMed",
  description:
    "Find tailored medical electives in China for international students. Explore clinical specialties, hospital matching and expert placement support.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
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
