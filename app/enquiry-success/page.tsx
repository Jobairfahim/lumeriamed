import { Home, ArrowRight } from "lucide-react";
import Button from "@/components/ui/ui/Button";

const NEXT_STEPS = [
  {
    number: "01",
    title: "Confirmation Email",
    desc: "Check your inbox for an automated confirmation of the enquiry submission.",
  },
  {
    number: "02",
    title: "Team Review",
    desc: "Our placement specialists will review your preferences and begin identifying suitable matches.",
  },
  {
    number: "03",
    title: "Personal Response",
    desc: "A member of our team will reach out within 24 hours to discuss next steps and answer any questions.",
  },
];

export default function EnquirySuccessPage() {
  return (
    <div className="min-h-screen pt-16 bg-brand-light flex items-start justify-center px-4">
      <div className="w-full max-w-2xl py-12 md:py-16">

        {/* ── Hero text ───────────────────────────────────────────────────── */}
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-4 leading-snug">
            Thank You For{" "}
            <span className="text-brand-teal">Your Enquiry!</span>
          </h1>
          <p className="text-brand-slate text-sm md:text-base max-w-md mx-auto leading-relaxed">
            We&apos;ve received your submission and our team will review your information
            carefully. You can expect to hear back from us within 24 hours.
          </p>
        </div>

        {/* ── What Happens Next card ──────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-brand-border p-6 md:p-8 mb-5 shadow-soft">
          <h2 className="font-display font-bold text-brand-navy text-xl text-center mb-8">
            What Happens Next?
          </h2>
          <div className="flex flex-col gap-6">
            {NEXT_STEPS.map((step) => (
              <div key={step.number} className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-xl bg-brand-teal text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-semibold text-brand-navy text-base mb-0.5">{step.title}</h3>
                  <p className="text-brand-slate text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Note ────────────────────────────────────────────────────────── */}
        <div className="bg-white rounded-xl px-5 py-4 mb-8 text-center border border-brand-border">
          <p className="text-brand-slate text-sm leading-relaxed">
            <strong className="text-brand-navy">Note:</strong> Please check your spam/junk folder
            if you don&apos;t see our email. Add{" "}
            <a href="mailto:info@lumieramed.com" className="text-brand-teal hover:underline font-medium">
              info@lumieramed.com
            </a>{" "}
            to your contacts to ensure you receive our messages.
          </p>
        </div>

        {/* ── Action buttons ──────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <Button href="/" size="lg">
            <Home size={16} /> Return to Home
          </Button>
          <Button href="/faq" size="lg" variant="ghost">
            View FAQ <ArrowRight size={16} />
          </Button>
        </div>

        {/* ── Support line ────────────────────────────────────────────────── */}
        <p className="text-center text-brand-muted text-xs">
          Need immediate assistance? Contact us at{" "}
          <a href="mailto:info@lumieramed.com" className="text-brand-teal hover:underline">
            info@lumieramed.com
          </a>{" "}
          or call{" "}
          <a href="tel:+8612345678900" className="text-brand-teal hover:underline">
            +86 123 4567 8900
          </a>
        </p>

      </div>
    </div>
  );
}
