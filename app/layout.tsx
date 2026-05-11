import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import ConditionalShell from "@/components/layout/ConditionalShell";
import StructuredData from "@/components/seo/StructuredData";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

export const metadata: Metadata = {
  title: "LumieraMed – Clinical Elective Placements in China | Medical Student Opportunities",
  description:
    "LumieraMed connects international medical students with accredited clinical elective placements across China's leading hospitals. Gain hands-on experience in world-class healthcare facilities.",
  keywords: [
    "medical elective",
    "clinical placement",
    "medical students",
    "China hospitals",
    "international medical education",
    "clinical rotation",
    "medical internship",
    "healthcare experience",
    "LumieraMed",
    "medical training abroad",
    "elective programs",
    "clinical observership"
  ],
  authors: [{ name: "LumieraMed" }],
  creator: "LumieraMed",
  publisher: "LumieraMed",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://lumieramed.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lumieramed.com",
    title: "LumieraMed – Clinical Elective Placements in China",
    description: "Connect with accredited clinical elective placements across China's leading hospitals. Gain hands-on medical experience.",
    siteName: "LumieraMed",
    images: [
      {
        url: "/images/logo.png",
        width: 400,
        height: 133,
        alt: "LumieraMed - Clinical Elective Placements in China",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LumieraMed – Clinical Elective Placements in China",
    description: "Connect with accredited clinical elective placements across China's leading hospitals.",
    images: ["/images/logo.png"],
    creator: "@lumieramed",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  icons: {
    icon: "/images/logo.ico",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body className={`${instrumentSans.variable} font-body antialiased`}>
        <ConditionalShell>{children}</ConditionalShell>
      </body>
    </html>
  );
}
