import CTABannerSection from "@/components/sections/CTABannerSection";
import AccordionItem from "@/components/ui/AccordionItem";
import PageMetadata from "@/components/seo/PageMetadata";

const FAQ_GROUPS = [
  {
    title: "Eligibility",
    items: [
      {
        id: "eligibility",
        question: "Who is eligible for clinical electives through LumieraMed?",
        answer:
          "Medical students enrolled in accredited medical schools worldwide are eligible for our electives. To ensure you gain the most from the experience, we typically recommend that you are in your clinical years (usually 3rd year or above). Some placements may require the completion of specific modules or coursework. Your eligibility will be reviewed and confirmed during the application process, ensuring a perfect match for your medical background.",
      },
      {
        id: "chinese",
        question: "Do I need to speak Chinese?",
        answer:
          "While speaking Chinese is not required, it can enhance your experience. Many of our partner hospitals have English-speaking supervisors and offer placements with English support. However, learning basic Chinese phrases can be very helpful for communication in clinical settings. We provide resources to help you prepare and make your transition smoother.",
      },
    ],
  },
  {
    title: "Process",
    items: [
      {
        id: "process",
        question: "How does the application process work?",
        answer:
          "To begin, submit your enquiry form with your details and placement preferences. After reviewing your application, we'll require a deposit to begin the matching process. Once matched, we'll guide you through the documentation, final payment, and pre-arrival logistics, ensuring everything is in place for your elective experience.",
      },
      {
        id: "documents",
        question: "What documents do I need?",
        answer:
          "Typically, you will need a valid passport, proof of medical student enrolment, an up-to-date CV, a personal statement, and evidence of relevant vaccinations. Some placements may require additional documents, which we will provide details for during the application process.",
      },
      {
        id: "city-choice",
        question: "Can I choose which city or hospital I'm placed in?",
        answer:
          "You are welcome to express preferences for specific cities, regions, or hospital types during the application process. While we cannot guarantee a specific placement, we take your preferences into account when matching you with a suitable hospital.",
      },
      {
        id: "friend-placement",
        question: "Can I do an elective alongside a friend at the same hospital?",
        answer:
          "Yes, in many cases this is possible. Please indicate this preference in your enquiry form and we will do our best to accommodate joint placements, subject to hospital availability.",
      },
    ],
  },
  {
    title: "On the Ground",
    items: [
      {
        id: "supervisor",
        question: "Will I have a dedicated supervisor during my placement?",
        answer:
          "Yes. All students are assigned a clinical supervisor at their host hospital for the duration of their placement. Your supervisor will oversee your experience, provide guidance, and act as your primary point of contact within the institution.",
      },
      {
        id: "clinical-involvement",
        question: "What level of clinical involvement can I expect?",
        answer:
          "The level of involvement varies by hospital and department, but students typically participate in ward rounds, outpatient clinics, and observational procedures. Active participation is encouraged where appropriate and permitted by the host institution. We will provide a clear outline of what to expect before your placement begins.",
      },
    ],
  },
  {
    title: "Timeline",
    items: [
      {
        id: "placement-time",
        question: "When should I apply for my elective?",
        answer:
          "Placements are available year-round, subject to availability at partner hospitals. We recommend applying at least 8 to 12 weeks in advance to allow sufficient time for documentation and arrangements. Specific dates can be discussed during the matching process.",
      },
      {
        id: "elective-length",
        question: "How long does the placement matching process take?",
        answer:
          "The matching and confirmation process typically takes around 1 to 2 weeks once we receive your full enquiry and required documents. More competitive specialties or date-specific requests can take longer depending on hospital availability.",
      },
      {
        id: "start-date",
        question: "How long are the elective placements?",
        answer:
          "The length of placements depends on the hospital and department, but most electives range from 2 to 8 weeks. We can assist in arranging durations that align with your medical school requirements and travel schedule.",
      },
    ],
  },
  {
    title: "Costs",
    items: [
      {
        id: "costs",
        question: "What are the costs involved?",
        answer:
          "The initial cost involves a £250 deposit to begin the matching process. If no suitable placement is found, this deposit is refunded in full. Once a placement is confirmed and you proceed, the deposit becomes non-refundable. A placement fee will then apply, covering hospital administration charges, placement coordination, placement support, and other logistics. We provide a clear breakdown of all costs once a placement option is identified.",
      },
      {
        id: "cost-start",
        question: "What are the rough estimated costs for the elective placement?",
        answer:
          "The total cost includes a £250 deposit to begin the matching process. If no placement is found, this is refunded in full. Once a placement is confirmed and you proceed, the deposit becomes non-refundable. Placement fees range from £500 to £2,000, covering hospital administration and placement coordination. Accommodation, visa, and travel costs are additional and will vary based on individual circumstances.",
      },
      {
        id: "financial",
        question: "Is financial assistance available?",
        answer:
          "We do not currently offer direct financial assistance, but we can provide documentation to support external funding applications. Many students secure elective bursaries through their medical schools or national medical associations. Contact us for advice on available funding sources.",
      },
      {
        id: "deposit-cancel",
        question: "What happens to my deposit if I cancel?",
        answer:
          "If you cancel before a placement has been confirmed, your deposit will be refunded in full. If a placement has already been confirmed and you subsequently cancel, the deposit becomes non-refundable. Please refer to our Terms of Service for full details on our cancellation and refund policy.",
      },
    ],
  },
  {
    title: "Requirements",
    items: [
      {
        id: "medical-requirements",
        question: "What are the medical requirements?",
        answer:
          "Students may need to provide vaccination records, proof of good health, or screening documents as required by the host institution. Medical requirements vary by hospital, and we will clarify these before your placement is finalised.",
      },
      {
        id: "visa",
        question: "Do I need a visa?",
        answer:
          "In most cases, yes. The exact visa type depends on your nationality, placement duration, and host institution documentation. A special visa may be required for certain placements. We will provide detailed information on the required visa and guide you through the application process once your placement is confirmed.",
      },
      {
        id: "travel-insurance",
        question: "Do I need travel insurance?",
        answer:
          "Yes. All students are required to hold comprehensive travel and medical insurance for the duration of their placement. We strongly recommend arranging this before departure. Your medical school may have guidance on suitable policies, and some student associations offer group cover.",
      },
      {
        id: "school-recognition",
        question: "Will my elective be recognised by my medical school?",
        answer:
          "Most medical schools accept internationally based electives, but it is your responsibility to confirm this with your institution before applying. We can provide official documentation, including a placement confirmation letter, to support your medical school's approval process.",
      },
      {
        id: "accommodation",
        question: "What about accommodation?",
        answer:
          "While we do not offer accommodation directly, we can assist you in finding suitable housing close to your placement. We also offer a package to help with accommodation arrangements. Costs and options will be discussed and confirmed during the placement matching process.",
      },
    ],
  },
] as const;

export default function FAQPage() {
  return (
    <>
      <PageMetadata
        title="FAQ - LumieraMed Clinical Elective Placements"
        description="Find answers to frequently asked questions about clinical electives in China, eligibility, application process, and placement details."
        keywords={[
          "medical elective faq",
          "clinical placement questions",
          "china elective requirements",
          "medical student eligibility",
          "application process"
        ]}
        canonical="/faq"
      />
      <div className="pt-16 bg-white">
      <div className="bg-brand-light py-14 md:py-20 text-center px-4 border-b border-brand-border">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-3">
          Frequently Asked <span className="text-brand-teal">Questions</span>
        </h1>
        <p className="text-brand-slate text-sm md:text-base max-w-md mx-auto leading-relaxed">
          Everything you need to know about clinical elective placements in China.
        </p>
      </div>

      <section className="bg-[#f6f7f7] py-14 md:py-20 px-4">
        <div className="max-w-5xl mx-auto space-y-10">
          {FAQ_GROUPS.map((group, groupIndex) => (
            <div key={group.title}>
              <div className="mb-4 border-b border-brand-teal/30 pb-3">
                <h2 className="text-xl md:text-2xl font-semibold text-brand-navy">
                  {group.title}
                </h2>
              </div>
              <div className="space-y-3">
                {group.items.map((item, itemIndex) => (
                  <AccordionItem
                    key={item.id}
                    question={item.question}
                    answer={item.answer}
                    defaultOpen={groupIndex === 0 && itemIndex === 0}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTABannerSection />
    </div>
    </>
  );
}