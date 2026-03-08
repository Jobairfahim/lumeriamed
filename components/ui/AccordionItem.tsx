"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export default function AccordionItem({ question, answer, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-brand-border rounded-xl overflow-hidden bg-white transition-all duration-200 hover:border-brand-teal/40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer"
      >
        <span className="font-medium text-brand-navy text-sm md:text-base pr-4">
          {question}
        </span>
        <span className={cn(
          "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200",
          isOpen ? "bg-brand-teal text-white" : "bg-brand-gray text-brand-slate"
        )}>
          {isOpen ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>

      <div className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="px-6 pb-5">
          <p className="text-brand-slate text-sm md:text-base leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}
