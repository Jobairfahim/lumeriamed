"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize    = "sm" | "md" | "lg";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink   = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement>  & { href: string };
type ButtonProps    = ButtonAsButton | ButtonAsLink;

const variants: Record<ButtonVariant, string> = {
  primary:   "bg-brand-teal text-white hover:bg-brand-tealDark shadow-sm hover:shadow-md",
  secondary: "bg-white text-brand-navy border border-brand-border hover:bg-brand-gray hover:border-brand-teal",
  outline:   "border-2 border-brand-teal text-brand-teal bg-transparent hover:bg-brand-tealLight",
  ghost:     "text-brand-slate hover:text-brand-teal hover:bg-brand-tealLight bg-transparent",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-sm rounded-xl",
  lg: "px-8 py-4 text-base rounded-xl",
};

export default function Button({ variant = "primary", size = "md", className, children, href, ...props }: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 cursor-pointer",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
