import Image from "next/image";
import SectionHeader from "@/components/ui/ui/SectionHeader";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import { HowItWorksStep } from "@/lib/types";

export default function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <SectionHeader
            title="How It Works"
            subtitle="Simple Process"
          />
          <p className="text-brand-slate text-sm md:text-base max-w-xs leading-relaxed md:text-right">
            Getting started with your medical elective in China is simple.
            Follow these three easy steps.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 stagger-children">
          {HOW_IT_WORKS_STEPS.map((step: HowItWorksStep) => (
            <div
              key={step.id}
              className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-cardHover transition-all duration-300 hover:-translate-y-1"
            >
              {/* Step image */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  className="object-cover"
                />
                {/* Step number badge */}
                <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-brand-teal text-white flex items-center justify-center text-sm font-bold shadow-sm">
                  {step.id}
                </div>
              </div>

              {/* Step content */}
              <div className="p-6">
                <h3 className="font-display font-semibold text-brand-navy text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-brand-slate text-sm leading-relaxed">
                  {step.description.split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < step.description.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
