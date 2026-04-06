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
    answer: "Medical students enrolled in accredited medical schools worldwide are eligible for our electives. To ensure you gain the most from the experience, we typically recommend that you are in your clinical years (usually 3rd year or above). Some placements may require the completion of specific modules or coursework. Your eligibility will be reviewed and confirmed during the application process, ensuring a perfect match for your medical background.",
  },
  {
    id: "chinese",
    question: "Do I need to speak Chinese?",
    answer: "While speaking Chinese is not required, it can enhance your experience. Many of our partner hospitals have English-speaking supervisors and offer placements with English support. However, learning basic Chinese phrases can be very helpful for communication in clinical settings. We provide resources to help you prepare and make your transition smoother.",
  },

  {
    id: "process-deposit",
    question: "How does the application process work?",
    answer: "To begin, submit your enquiry form with your details and placement preferences. After reviewing your application, we'll require a deposit to begin the matching process. Once matched, we'll guide you through the documentation, final payment, and pre-arrival logistics, ensuring everything is in place for your elective experience.",
  },
  {
    id: "documents",
    question: "What documents do I need?",
    answer: "Typically, you will need a valid passport, proof of medical student enrolment, an up-to-date CV, a personal statement, and evidence of relevant vaccinations. Some placements may require additional documents, which we will provide details for during the application process.",
  },
  {
    id: "timing",
    question: "When can I start my elective?",
    answer: "Placements are available year-round, subject to availability at partner hospitals. We recommend applying at least 8–12 weeks in advance to allow sufficient time for documentation and arrangements. Specific dates can be discussed during the matching process.",
  },
  {
    id: "financial",
    question: "Is financial assistance available?",
    answer: "We do not currently offer direct financial assistance, but we can provide documentation to support external funding applications. Many students secure elective bursaries through their medical school or national medical associations. Contact us for advice on available funding sources.",
  },
  {
    id: "accommodation",
    question: "What about accommodation?",
    answer: "While we do not offer accommodation directly, we can assist you in finding suitable housing close to your placement. We also offer a package to help with accommodation arrangements. Costs and options will be discussed and confirmed during the placement matching process.",
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
    title: "World-Class Hospitals",
    description: "Access to China's top-tier medical institutions with advanced technology and renowned medical professionals.",
    highlight: true,
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
    description: "Experience China's rich culture while building your medical career in one of the world's most dynamic countries.",
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
    description: "Our team reviews your application and matches you withthe perfect hospital placement within 1-2 weeks.",
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
