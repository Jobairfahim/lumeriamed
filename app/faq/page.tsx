import CTABannerSection from "@/components/sections/CTABannerSection";
import AccordionItem from "@/components/ui/AccordionItem";

const FAQ_GROUPS = [
  {
    title: "Eligibility",
    items: [
      {
        id: "eligibility",
        question: "Who is eligible for clinical electives through LumieriaMed?",
        answer:
          "Clinical elective placements are for medical students who have completed at least some clinical years of medical school. Students must be currently enrolled in an accredited medical program and have basic clinical skills training. Some placements may have additional requirements depending on the specialty and institution.",
      },
      {
        id: "chinese",
        question: "Do I need to speak Chinese?",
        answer:
          "Not always. Many of our partner hospitals offer departments with English-speaking supervisors or staff support. That said, basic conversational or medical Chinese can improve day-to-day communication and your overall experience during the placement.",
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
          "You submit your enquiry with your preferred specialty, dates, and academic background. We then review your profile, identify suitable institutions, confirm availability, and guide you through documentation and placement confirmation step by step.",
      },
      {
        id: "documents",
        question: "What documents do I need?",
        answer:
          "Most applications require a passport copy, proof of medical school enrollment, an academic transcript, CV, and your preferred elective dates. Some hospitals may also request vaccination records, a motivation letter, or additional supporting forms.",
      },
    ],
  },
  {
    title: "Timeline",
    items: [
      {
        id: "placement-time",
        question: "How long does the placement process take?",
        answer:
          "The matching and confirmation process typically takes around 1 to 2 weeks once we receive your full enquiry and required documents. More competitive specialties or date-specific requests can take longer depending on hospital availability.",
      },
      {
        id: "elective-length",
        question: "How long are the elective placements?",
        answer:
          "Placement length depends on the hospital and department, but most electives range from 2 to 8 weeks. We can help arrange durations that align with your medical school requirements and travel schedule.",
      },
      {
        id: "start-date",
        question: "When can I start my elective?",
        answer:
          "Electives are available throughout the year, subject to hospital schedules and department capacity. Applying at least 8 to 12 weeks in advance gives the best chance of securing your preferred timeframe.",
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
          "Costs vary depending on the hospital, specialty, and placement duration. Fees may include hospital administration charges, placement coordination, accommodation support, and other logistics. We provide a clear breakdown once a suitable placement option is identified.",
      },
      {
        id: "financial",
        question: "Is financial assistance available?",
        answer:
          "We do not currently provide direct financial assistance. However, we can supply supporting documents for students applying for bursaries, scholarships, or university elective funding through external programs.",
      },
      {
        id: "cost-start",
        question: "When can I start my elective?",
        answer:
          "Start dates depend on both your availability and the institution's intake windows. Once we know your preferred period, we coordinate with partner hospitals to secure the earliest suitable option.",
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
          "Students may need to provide vaccination records, proof of good health, or screening documents required by the host institution. Requirements vary by hospital, and we clarify them before your placement is finalized.",
      },
      {
        id: "visa",
        question: "Do I need a visa?",
        answer:
          "In most cases, yes. The exact visa type depends on your nationality, placement duration, and host institution documentation. We guide you on the required paperwork once your placement is confirmed.",
      },
      {
        id: "accommodation",
        question: "What about accommodation?",
        answer:
          "Accommodation options depend on the hospital and city. Some institutions offer on-site or nearby housing, while others require external arrangements. We help you identify suitable accommodation options close to your placement.",
      },
    ],
  },
] as const;

export default function FAQPage() {
  return (
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
  );
}
