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
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid grid-cols-1 items-start gap-8 lg:mb-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
          <h2 className="max-w-[14ch] font-display text-[2rem] font-semibold leading-[1.04] tracking-[-0.05em] text-[#2f3437] md:text-[3rem]">
            Why Choose
            <br />
            Medical Electives in China?
          </h2>
          <p className="max-w-[320px] text-[15px] leading-[1.6] text-[#5f666c] lg:pt-2">
            Discover the unique advantages of completing your medical elective in one of the world&apos;s most dynamic healthcare environments.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2">
          <div className="space-y-4">
            {WHY_CHOOSE_FEATURES.map((feature: WhyChooseFeature) => {
              const Icon = iconMap[feature.icon];

              return (
                <div
                  key={feature.id}
                  className={cn(
                    "group min-h-[140px] rounded-[4px] border border-[#f2f2f2] px-5 py-5 transition-all duration-300 ease-out md:px-6 md:py-6",
                    feature.id === 1 
                      ? "bg-brand-teal text-white" 
                      : "bg-[#fcfcfb] hover:border-[#39b3ae] hover:bg-[#39b3ae]"
                  )}
                >
                  <div
                    className={cn(
                      "mb-5 flex h-8 w-8 items-center justify-center rounded-[10px] transition-colors duration-300",
                      feature.id === 1 
                        ? "bg-white/20" 
                        : "bg-[#e8f6f4] group-hover:bg-white/15"
                    )}
                  >
                    <Icon
                      size={15}
                      className={cn(
                        "transition-colors duration-300",
                        feature.id === 1 
                          ? "text-white" 
                          : "text-brand-teal group-hover:text-white"
                      )}
                    />
                  </div>
                  <div>
                    <h3
                      className={cn(
                        "mb-2 text-[1.05rem] font-semibold leading-tight transition-colors duration-300 md:text-[1.12rem]",
                        feature.id === 1 
                          ? "text-white" 
                          : "text-[#313639] group-hover:text-white"
                      )}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className={cn(
                        "max-w-[32ch] text-[14px] leading-[1.6] transition-colors duration-300",
                        feature.id === 1 
                          ? "text-white/90" 
                          : "text-[#757c82] group-hover:text-white/90"
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
            <div className="relative h-[360px] overflow-hidden rounded-[16px] sm:h-[420px] lg:h-full lg:min-h-[472px]">
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
