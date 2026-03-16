"use client";

import { useSearchParams } from "next/navigation";

interface PaymentPageContentProps {
  children: (params: { type: string; returnTo: string }) => React.ReactNode;
}

export default function PaymentPageContent({ children }: PaymentPageContentProps) {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "deposit";
  const returnTo = searchParams.get("returnTo") || "/dashboard/application-status";

  return <>{children({ type, returnTo })}</>;
}
