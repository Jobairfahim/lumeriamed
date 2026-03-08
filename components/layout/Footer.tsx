import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, ArrowUp } from "lucide-react";
import { FOOTER_QUICK_LINKS, FOOTER_LEGAL_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-brand-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <Image 
                src="/images/logo.png" 
                alt="LumieraMed Logo" 
                width={82} 
                height={42} 
                className="w-16 h-12"
              />
            </Link>
            <p className="text-brand-slate text-sm leading-relaxed max-w-xs">
              Empowering medical students with exceptional clinical elective experiences
              in China&apos;s leading healthcare institutions.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold text-brand-navy uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-brand-slate text-sm hover:text-brand-teal transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold text-brand-navy uppercase tracking-widest mb-4">
              Contact
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="tel:+15551234567" className="flex items-center gap-2.5 text-brand-slate text-sm hover:text-brand-teal transition-colors">
                  <Phone size={14} className="text-brand-teal flex-shrink-0" />
                  (555) 123-4567
                </a>
              </li>
              <li>
                <a href="mailto:info@lumieramed.com" className="flex items-center gap-2.5 text-brand-slate text-sm hover:text-brand-teal transition-colors">
                  <Mail size={14} className="text-brand-teal flex-shrink-0" />
                  info@lumieramed.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-brand-muted text-xs">© 2026 LumieraMed. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-brand-muted text-xs hover:text-brand-teal transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Back to top */}
      <a href="#top" aria-label="Back to top"
        className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-brand-teal text-white flex items-center justify-center shadow-lg hover:bg-brand-tealDark transition-all hover:-translate-y-0.5 z-40">
        <ArrowUp size={18} />
      </a>
    </footer>
  );
}
