import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ModalProvider from "@/components/modals/ModalProvider";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

export const metadata: Metadata = {
  title: "LumieraMed – Clinical Elective Placements in China",
  description:
    "LumieraMed connects medical students with accredited clinical elective placements across China's leading hospitals.",
  keywords: ["medical elective", "China", "clinical placement", "medical students", "LumieraMed"],
  icons: {
    icon: "/images/logo.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.variable} font-body antialiased`}>
        <ModalProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ModalProvider>
      </body>
    </html>
  );
}
