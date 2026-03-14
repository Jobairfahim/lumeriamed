"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ModalProvider from "@/components/modals/ModalProvider";

export default function ConditionalShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <ModalProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </ModalProvider>
  );
}
