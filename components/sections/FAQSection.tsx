import AccordionItem from "@/components/ui/ui/AccordionItem";
import { FAQ_ITEMS } from "@/lib/constants";

export default function FAQSection() {
  return (
    <section className="bg-brand-light py-16 md:py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-navy mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-brand-slate text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Find clear, concise answers to common questions about medical elective
            placements in China.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem
              key={item.id}
              question={item.question}
              answer={item.answer}
              defaultOpen={i === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
