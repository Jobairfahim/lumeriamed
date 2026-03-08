import { cn } from "@/lib/utils";

type BadgeVariant = "teal" | "navy" | "light" | "success" | "warning" | "error";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  teal:    "bg-brand-tealLight text-brand-teal",
  navy:    "bg-brand-navy text-white",
  light:   "bg-brand-gray text-brand-slate",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  error:   "bg-red-50 text-red-600",
};

export default function Badge({ label, variant = "teal", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {label}
    </span>
  );
}
