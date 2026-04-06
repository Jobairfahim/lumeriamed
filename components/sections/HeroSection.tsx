import Image from "next/image";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-[980px] md:min-h-[800px] flex items-end"
    >
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/hero-bg.jpg"
          alt="Medical professionals in a clinical setting"
          fill
          priority
          className="object-cover object-center"
          placeholder="empty"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUEA//EACUQAAIBBAEEAgMAAAAAAAAAAAECAwQFERIhBhMxQVFhcf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFhEBAQEAAAAAAAAAAAAAAAAAABES/9oADAMBAAIRAxEAPwCtyFhJazSRSxPG8bFXRlIKkdCDXjxWlxJZyXEMbPDGQHcDIBPQZr1WT2uuarbX9hFbSrJLJbGQKsY4lI9SBgfAooo/9k="
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/70 via-brand-navy/40 to-transparent" />
      </div>

      {/* Content */}
       <div className="relative z-10 px-4 sm:px-6 lg:px-8 w-full flex justify-start pb-16">
        <div className="animate-fade-up">
          {/* Blurred card container */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 shadow-2xl max-w-2xl">
            {/* Headline */}
            <h1 className="font-kefa text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Secure Your Clinical <br />
              Elective Placement in <br />
              {" "}
              <span className="text-white inline-flex items-center gap-2">
                <Image 
                  src="/images/china.png" 
                  alt="China flag" 
                  width={60} 
                  height={50} 
                  className="inline-block"
                />
                China 
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
              <Button href="/contact" size="lg" variant="transparent">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
