import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
  /** Wrap part of title in italic teal — pass the italic part */
  italicPart?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  description,
  align = "left",
  className,
  titleClassName,
  italicPart,
}: SectionHeaderProps) {
  const alignClass = {
    left:   "text-left",
    center: "text-center mx-auto",
    right:  "text-right ml-auto",
  }[align];

  // Replace italicPart in title with styled version
  const renderTitle = () => {
    if (!italicPart) return title;
    const parts = title.split(italicPart);
    return (
      <>
        {parts[0]}
        <em className="text-brand-teal not-italic font-bold font-display">{italicPart}</em>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={cn("max-w-xl", alignClass, className)}>
      {subtitle && (
        <p className="text-brand-teal text-sm font-medium tracking-widest uppercase mb-2">
          {subtitle}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-3xl md:text-4xl font-semibold text-brand-navy leading-tight",
          titleClassName
        )}
      >
        {renderTitle()}
      </h2>
      {description && (
        <p className="mt-4 text-brand-slate text-base leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
