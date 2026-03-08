import Image from "next/image";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-[880px] md:min-h-[640px] flex items-center pt-16"
    >
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/hero-bg.jpg"
          alt="Medical professionals in a clinical setting"
          fill
          priority
          className="object-cover object-center"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUEA//EACUQAAIBBAEEAgMAAAAAAAAAAAECAwQFERIhBhMxQVFhcf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFhEBAQEAAAAAAAAAAAAAAAAAABES/9oADAMBAAIRAxEAPwCtyFhJazSRSxPG8bFXRlIKkdCDXjxWlxJZyXEMbPDGQHcDIBPQZr1WT2uuarbX9hFbSrJLJbGQKsY4lI9SBgfAooo/9k="
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/70 via-brand-navy/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-xl animate-fade-up">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
            <span className="text-white/90 text-xs font-medium tracking-wide">
              Trusted Clinical Elective Platform
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Secure Your Clinical <br className="hidden sm:block" />
            Elective Placement in{" "}
            <span className="text-brand-teal">
              China 🇨🇳
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-white/80 text-base md:text-lg mb-8 leading-relaxed">
            We connect medical students with accredited hospitals across China —
            a seamless path to transformative clinical experience.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button href="/browse-placements" size="lg">
              Apply for Placement
            </Button>
            <Button href="/contact" size="lg" variant="secondary">
              Contact Us
            </Button>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap gap-6 mt-8">
            {[
              { value: "50+", label: "Partner Hospitals" },
              { value: "500+", label: "Students Placed" },
              { value: "10+", label: "Specialties" },
            ].map((stat) => (
              <div key={stat.label} className="text-white">
                <div className="text-2xl font-display font-bold text-brand-teal">
                  {stat.value}
                </div>
                <div className="text-white/70 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
