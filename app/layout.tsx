import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ModalProvider from "@/components/modals/ModalProvider";

export const metadata: Metadata = {
  title: "LumieraMed – Clinical Elective Placements in China",
  description:
    "LumieraMed connects medical students with accredited clinical elective placements across China's leading hospitals.",
  keywords: ["medical elective", "China", "clinical placement", "medical students", "LumieraMed"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ModalProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ModalProvider>
      </body>
    </html>
  );
}
