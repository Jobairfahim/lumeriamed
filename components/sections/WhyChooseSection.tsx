import Image from "next/image";
import { Globe, Heart, Stethoscope } from "lucide-react";
import { WHY_CHOOSE_FEATURES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { WhyChooseFeature } from "@/lib/types";

const iconMap: Record<
  string,
  React.ComponentType<{ size?: number | string; className?: string }>
> = {
  globe: Globe,
  stethoscope: Stethoscope,
  heart: Heart,
} as const;

export default function WhyChooseSection() {
  return (
    <section className="bg-wpy-16 md:py-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 lg:gap-16 items-start mb-10">
          <h2 className="font-display text-[2.2rem] md:text-[3.15rem] leading-[1.06] font-semibold tracking-[-0.04em] text-[#2f3437] max-w-[11ch]">
            Why Choose Medical Electives in China?
          </h2>
          <p className="text-[#5f666c] text-[15px] leading-[1.55] max-w-[310px] lg:pt-2">
            Discover the unique advantages of completing your medical elective in one of the world&apos;s most dynamic healthcare environments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-5 lg:gap-5 items-stretch">
          <div className="space-y-4">
            {WHY_CHOOSE_FEATURES.map((feature: WhyChooseFeature) => {
              const Icon = iconMap[feature.icon];

              return (
                <div
                  key={feature.id}
                  className={cn(
                    "rounded-[6px] px-4 py-4 md:px-4 md:py-5 min-h-[116px] transition-colors duration-200",
                    feature.highlight ? "bg-[#39b3ae]" : "bg-[#fbfbfb]"
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-md flex items-center justify-center mb-5",
                      feature.highlight ? "bg-white/15" : "bg-[#e9f8f7]"
                    )}
                  >
                    <Icon
                      size={15}
                      className={feature.highlight ? "text-white" : "text-brand-teal"}
                    />
                  </div>
                  <div>
                    <h3
                      className={cn(
                        "font-semibold text-[1rem] md:text-[1.08rem] mb-2 leading-tight",
                        feature.highlight ? "text-white" : "text-[#313639]"
                      )}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className={cn(
                        "text-[13px] leading-[1.55] max-w-[31ch]",
                        feature.highlight ? "text-white/90" : "text-[#757c82]"
                      )}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative">
            <div className="relative h-[360px] sm:h-[420px] lg:h-full lg:min-h-[396px] rounded-[12px] overflow-hidden">
              <Image
                src="/images/why-choose.png"
                alt="Chinese medical professional at her desk"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
