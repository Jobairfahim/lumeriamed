"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useModal } from "@/components/modals/ModalProvider";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);
  const pathname = usePathname();
  const { openEnquiry } = useModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <header className={cn(
      "fixed top-8 left-4 right-4 z-40 bg-white transition-all duration-300 rounded-2xl shadow-soft",
      scrolled ? "border border-brand-border/60" : "border border-brand-border"
    )}>
      <div className="w-full px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image 
              src="/images/logo.png" 
              alt="LumieraMed Logo" 
              width={120} 
              height={76} 
              className="w-16 h-10"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm rounded-lg transition-colors",
                  pathname === link.href
                    ? "text-brand-teal font-medium"
                    : "text-brand-slate hover:text-brand-teal"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm text-brand-slate hover:text-brand-navy transition-colors">
              Login
            </Link>
            <button
              onClick={openEnquiry}
              className="bg-brand-teal text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-brand-tealDark transition-all"
            >
              Enquire Now
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-brand-slate hover:text-brand-teal hover:bg-brand-tealLight transition-all"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-brand-border",
        menuOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
      )}>
        <nav className="px-4 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-3 text-sm rounded-xl transition-all",
                pathname === link.href
                  ? "text-brand-teal font-medium bg-brand-tealLight"
                  : "text-brand-slate hover:text-brand-teal hover:bg-brand-tealLight"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-brand-border">
            <Link href="/login" className="px-4 py-3 text-sm text-brand-slate text-center hover:text-brand-navy transition-colors">
              Login
            </Link>
            <button
              onClick={() => { setMenuOpen(false); openEnquiry(); }}
              className="w-full bg-brand-teal text-white text-sm font-medium px-6 py-3 rounded-xl hover:bg-brand-tealDark transition-all"
            >
              Enquire Now
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
