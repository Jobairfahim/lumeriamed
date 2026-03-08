import { cn } from "@/lib/utils";
import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";

// ─── Input ────────────────────────────────────────────────────────────────────
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, required, className, ...props }, ref) => (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-brand-navy">
          {label}
          {required && <span className="text-brand-teal ml-0.5">*</span>}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          "w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-brand-navy placeholder:text-brand-muted",
          "text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all",
          error && "border-red-400 focus:ring-red-400",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
);
Input.displayName = "Input";

// ─── Textarea ─────────────────────────────────────────────────────────────────
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, required, className, ...props }, ref) => (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-brand-navy">
          {label}
          {required && <span className="text-brand-teal ml-0.5">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        rows={5}
        className={cn(
          "w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-brand-navy placeholder:text-brand-muted",
          "text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all resize-none",
          error && "border-red-400 focus:ring-red-400",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
);
Textarea.displayName = "Textarea";
