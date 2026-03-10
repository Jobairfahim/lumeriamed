export const NAV_LINKS = [
  { label: "Home",              href: "/" },
  { label: "Browse Placements", href: "/browse-placements" },
  { label: "About Us",          href: "/about" },
  { label: "FAQ",               href: "/faq" },
  { label: "Contact",           href: "/contact" },
] as const;

export const FAQ_ITEMS = [
  {
    id: "eligibility",
    question: "Who is eligible for medical electives in China?",
    answer:
      "Medical students enrolled in accredited medical schools worldwide are eligible. You should be in your clinical years (typically 3rd year or above). Some placements may require completion of specific modules — your eligibility will be confirmed during the application review.",
  },
  {
    id: "chinese",
    question: "Do I need to speak Chinese?",
    answer:
      "While speaking Chinese is not always required, it can significantly enhance your experience. Many of our partner hospitals have English-speaking supervisors and offer placements with English support. However, basic medical Chinese phrases are helpful and we can provide resources to help you prepare.",
  },
  {
    id: "process",
    question: "How does the application process work?",
    answer:
      "Submit your enquiry form with your details and placement preferences. Our team will review your application and match you with suitable placements within 1–2 weeks. Once matched, we guide you through all documentation, payment, and pre-arrival logistics.",
  },
  {
    id: "documents",
    question: "What documents do I need?",
    answer:
      "Typically you will need: a valid passport, proof of medical student enrolment, an up-to-date CV/resume, a personal statement, and evidence of relevant vaccinations. Specific placements may require additional documents, which we will communicate clearly during the process.",
  },
  {
    id: "timing",
    question: "When can I start my elective?",
    answer:
      "Placements are available year-round, subject to availability at partner hospitals. We recommend applying at least 8–12 weeks in advance to allow sufficient time for documentation and arrangements. Specific dates can be discussed during the matching process.",
  },
  {
    id: "financial",
    question: "Is financial assistance available?",
    answer:
      "We do not currently offer direct financial assistance, but we can provide documentation to support external funding applications. Many students secure elective bursaries through their medical school or national medical associations. Contact us for advice on available funding sources.",
  },
  {
    id: "accommodation",
    question: "What about accommodation?",
    answer:
      "Many of our partner hospitals offer on-site or nearby accommodation options. We can also assist with finding suitable housing close to your placement. Accommodation arrangements and costs will be discussed and confirmed during the placement matching process.",
  },
] as const;

export const FOOTER_QUICK_LINKS = [
  { label: "Home",              href: "/" },
  { label: "About Us",          href: "/about" },
  { label: "Browse Placements", href: "/browse-placements" },
  { label: "FAQ",               href: "/faq" },
  { label: "Contact",           href: "/contact" },
] as const;

export const FOOTER_LEGAL_LINKS = [
  { label: "For Consultants", href: "/consultants" },
  { label: "Privacy Policy",  href: "/privacy" },
  { label: "Terms of Service",href: "/terms" },
] as const;

export const WHY_CHOOSE_FEATURES = [
  {
    id: 1,
    icon: "globe",
    title: "World-Class Facilities",
    description: "Access to state-of-the-art hospitals and medical centers with cutting-edge technology.",
    highlight: false,
  },
  {
    id: 2,
    icon: "stethoscope",
    title: "Diverse Learning",
    description: "Gain exposure to unique cases and medical practices in one of the world's largest healthcare systems.",
    highlight: true,
  },
  {
    id: 3,
    icon: "heart",
    title: "Cultural Immersion",
    description: "Experience rich Chinese culture while developing a global perspective on healthcare.",
    highlight: false,
  },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    id: 1,
    title: "Submit Your Enquiry",
    description: "Fill out our enquiry form with your preferences, medical background, and desired placement dates.",
    image: "/images/step-apply.png",
    alt: "Student filling out enquiry form",
  },
  {
    id: 2,
    title: "Get Matched",
    description: "Our team reviews your application and matches you with the perfect hospital placement within 1-2 weeks.",
    image: "/images/step-match.png",
    alt: "Hospital matching process",
  },
  {
    id: 3,
    title: "Start Your Journey",
    description: "Complete documentation, arrive in China, and begin your transformative medical elective experience.",
    image: "/images/step-begin.png",
    alt: "Student starting medical placement",
  },
] as const;
