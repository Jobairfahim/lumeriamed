import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import WhatIsSection from "@/components/sections/WhatIsSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import WhyChooseSection from "@/components/sections/WhyChooseSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import CTABannerSection from "@/components/sections/CTABannerSection";
import { buildSocialMetadata } from "@/lib/seo/config";

const TITLE = "LumieraMed | Medical Electives in China";
const DESCRIPTION =
  "LumieraMed is a specialised platform matching medical students with clinical elective placements at China's leading hospitals.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  ...buildSocialMetadata({ title: TITLE, description: DESCRIPTION, path: "/" }),
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
