import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | LumieraMed",
  description:
    "Read the LumieraMed terms and conditions for using our website and placement services.",
  alternates: { canonical: "/terms" },
};

export default function TermsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
