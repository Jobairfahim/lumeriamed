import Image from "next/image";
import { Globe, Users, Heart, Shield } from "lucide-react";
import SectionHeader from "@/components/ui/ui/SectionHeader";
import { WHY_CHOOSE_FEATURES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { WhyChooseFeature } from "@/lib/types";

const iconMap: Record<string, React.ComponentType<{ size?: number | string; className?: string }>> = {
  globe: Globe,
  users: Users,
  heart: Heart,
  shield: Shield,
} as const;

export default function WhyChooseSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Features */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <SectionHeader
                title="Why Choose Medical Electives in China?"
              />
              <p className="text-brand-slate text-sm max-w-[200px] leading-relaxed md:text-right hidden md:block">
                Discover the unique advantages of completing your medical
                elective in one of the world&apos;s most dynamic healthcare
                environments.
              </p>
            </div>

            <p className="text-brand-slate text-sm leading-relaxed md:hidden">
              Discover the unique advantages of completing your medical elective
              in one of the world&apos;s most dynamic healthcare environments.
            </p>

            <div className="flex flex-col gap-3">
              {WHY_CHOOSE_FEATURES.map((feature: WhyChooseFeature) => {
                const Icon = iconMap[feature.icon];
                return (
                  <div
                    key={feature.id}
                    className={cn(
                      "flex gap-4 p-5 rounded-2xl transition-all duration-200",
                      feature.highlight
                        ? "bg-brand-teal text-white"
                        : "bg-brand-light hover:bg-brand-gray"
                    )}
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                        feature.highlight
                          ? "bg-white/20"
                          : "bg-brand-tealLight"
                      )}
                    >
                      <Icon
                        size={18}
                        className={feature.highlight ? "text-white" : "text-brand-teal"}
                      />
                    </div>
                    <div>
                      <h3
                        className={cn(
                          "font-semibold text-base mb-1",
                          feature.highlight ? "text-white" : "text-brand-navy"
                        )}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className={cn(
                          "text-sm leading-relaxed",
                          feature.highlight ? "text-white/80" : "text-brand-slate"
                        )}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative order-first lg:order-last">
            <div className="relative h-[500px] md:h-[500px] rounded-3xl overflow-hidden shadow-card">
              <Image
                src="/images/why-choose.png"
                alt="Chinese medical professional at her desk"
                fill
                className="object-cover object-top"
              />
            </div>
            {/* Floating stat card
            <div className="absolute bottom-6 left-6 bg-white rounded-2xl shadow-cardHover p-4 flex gap-3 items-center">
              <div className="w-10 h-10 rounded-xl bg-brand-tealLight flex items-center justify-center">
                <span className="text-brand-teal text-lg">🏥</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
