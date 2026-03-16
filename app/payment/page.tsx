"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import {
  Apple,
  ArrowLeft,
  Check,
  ChevronDown,
  Laptop,
  ShieldCheck,
} from "lucide-react";
import PaymentPageContent from "./PaymentPageContent";

type PaymentType = "deposit" | "final";

const PAYMENT_COPY: Record<
  PaymentType,
  {
    title: string;
    amount: string;
    cta: string;
    success: string;
  }
> = {
  deposit: {
    title: "Placement Deposit",
    amount: "$1.00",
    cta: "Pay",
    success: "Your $1.00 payment has been successful.",
  },
  final: {
    title: "Placement Payment",
    amount: "$250.00",
    cta: "Pay",
    success: "Your placement payment has been successful.",
  },
};

const COUNTRIES = ["Bangladesh", "United Kingdom", "United States", "India", "United Arab Emirates"];

function CheckoutIllustration() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute -top-16 right-2 h-44 w-44 rounded-full bg-white/8 blur-[1px]" />
      <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-white/8 blur-[1px]" />

      <div className="relative flex flex-col items-center gap-6">
        <div className="relative">
          <Laptop className="h-44 w-44 text-[#213850]" strokeWidth={1.25} />
          <div className="absolute left-5 top-6 flex h-[72px] w-[136px] items-center justify-center rounded-md bg-[#246d78] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.06)]">
            <div className="relative h-10 w-24 rounded-md bg-[#f8c080]">
              <div className="absolute -left-4 top-2 h-6 w-10 rounded-l-md bg-[#e9a65f]" />
              <div className="absolute right-2 top-2 rounded-full bg-[#213850] px-2 py-1 text-[11px] font-semibold text-white">
                $
              </div>
            </div>
          </div>
        </div>

        <div className="w-[140px] rounded-xl bg-[#3487a0] p-3 shadow-lg shadow-black/10">
          <div className="mb-3 h-3 w-8 rounded bg-[#f3c560]" />
          <div className="mb-3 h-2 w-16 rounded bg-white/40" />
          <div className="flex items-center justify-between">
            <div className="h-4 w-8 rounded bg-white/55" />
            <div className="h-4 w-4 rounded-full bg-[#ef565a]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentPageContent>
        {({ type, returnTo }) => <PaymentPage type={type as PaymentType} returnTo={returnTo} />}
      </PaymentPageContent>
    </Suspense>
  );
}

function PaymentPage({ type, returnTo }: { type: PaymentType; returnTo: string }) {
  const router = useRouter();
  const payment = PAYMENT_COPY[type] ?? PAYMENT_COPY.deposit;

  const [email, setEmail] = useState("youremail@example.com");
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [expiry, setExpiry] = useState("MM / YY");
  const [cvc, setCvc] = useState("CVC");
  const [cardholderName, setCardholderName] = useState("Mostafa Rahman");
  const [country, setCountry] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const isFormValid = useMemo(() => {
    return (
      email.trim().length > 0 &&
      cardNumber.trim().length > 0 &&
      expiry.trim().length > 0 &&
      cvc.trim().length > 0 &&
      cardholderName.trim().length > 0 &&
      country.trim().length > 0
    );
  }, [email, cardNumber, expiry, cvc, cardholderName, country]);

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <div className="grid min-h-screen lg:grid-cols-[minmax(320px,1fr)_minmax(360px,1.05fr)]">
        <section className="relative overflow-hidden bg-[#38b7b5] px-6 py-8 text-white sm:px-10 lg:px-12 lg:py-10">
          <Link
            href={returnTo}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/85 transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={18} />
          </Link>

          <div className="mx-auto flex max-w-[360px] flex-col items-center pt-6 text-center sm:pt-10 lg:pt-8">
            <p className="text-lg font-medium text-white/85">{payment.title}</p>
            <p className="mt-2 text-5xl font-semibold tracking-[-0.05em]">{payment.amount}</p>

            <div className="my-12 sm:my-16">
              <CheckoutIllustration />
            </div>

            <div className="mt-auto flex items-center gap-2 text-xs text-white/80">
              <ShieldCheck size={13} />
              <span>Powered by Stripe</span>
              <span>Terms</span>
              <span>Privacy</span>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-5 py-8 sm:px-8">
          <div className="w-full max-w-[430px]">
            <button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2b2b2b] text-sm font-medium text-white transition hover:bg-black">
              <Apple size={16} />
              Pay
            </button>

            <p className="my-5 text-center text-xs font-medium text-[#afafaf]">Or Pay Another Way</p>

            <div className="rounded-[26px] bg-white px-5 py-6 shadow-soft sm:px-7 sm:py-7">
              <h1 className="mb-6 text-center font-display text-[1.85rem] font-semibold tracking-[-0.03em] text-[#2f3437]">
                Payment
              </h1>

              <form
                className="space-y-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!isFormValid) return;
                  setShowSuccess(true);
                }}
              >
                <label className="block">
                  <span className="mb-2 block text-xs font-medium text-[#4d545a]">
                    Email Address<span className="text-[#ff6b6b]">*</span>
                  </span>
                  <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-12 w-full rounded-xl border border-[#efefef] bg-[#f8f8f8] px-4 text-sm text-[#30363b] outline-none transition focus:border-brand-teal"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-medium text-[#4d545a]">Card Information</span>
                  <div className="relative">
                    <input
                      value={cardNumber}
                      onChange={(event) => setCardNumber(event.target.value)}
                      className="h-12 w-full rounded-t-xl border border-[#efefef] bg-[#f8f8f8] px-4 pr-24 text-sm text-[#30363b] outline-none transition focus:border-brand-teal"
                    />
                    <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1">
                      <span className="rounded bg-[#1a1f71] px-1.5 py-0.5 text-[9px] font-semibold text-white">VISA</span>
                      <span className="rounded bg-[#f4f4f4] px-1.5 py-0.5 text-[9px] font-semibold text-[#3b4349]">MC</span>
                      <span className="rounded bg-[#f4f4f4] px-1.5 py-0.5 text-[9px] font-semibold text-[#3b4349]">AMEX</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-px overflow-hidden rounded-b-xl border border-t-0 border-[#efefef] bg-[#efefef]">
                    <input
                      value={expiry}
                      onChange={(event) => setExpiry(event.target.value)}
                      className="h-12 bg-[#f8f8f8] px-4 text-sm text-[#30363b] outline-none"
                    />
                    <input
                      value={cvc}
                      onChange={(event) => setCvc(event.target.value)}
                      className="h-12 bg-[#f8f8f8] px-4 text-sm text-[#30363b] outline-none"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-medium text-[#4d545a]">Cardholder Name</span>
                  <input
                    value={cardholderName}
                    onChange={(event) => setCardholderName(event.target.value)}
                    className="h-12 w-full rounded-xl border border-[#efefef] bg-[#f8f8f8] px-4 text-sm text-[#30363b] outline-none transition focus:border-brand-teal"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-medium text-[#4d545a]">Country</span>
                  <div className="relative">
                    <select
                      value={country}
                      onChange={(event) => setCountry(event.target.value)}
                      className="h-12 w-full appearance-none rounded-xl border border-[#efefef] bg-[#f8f8f8] px-4 pr-10 text-sm text-[#30363b] outline-none transition focus:border-brand-teal"
                    >
                      <option value="">Select country</option>
                      {COUNTRIES.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8e959a]"
                    />
                  </div>
                </label>

                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="mt-3 flex h-12 w-full items-center justify-center rounded-xl bg-brand-teal text-sm font-medium text-white transition hover:bg-brand-tealDark disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {payment.cta}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-[420px] rounded-[24px] bg-white px-6 py-7 text-center shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-teal text-white">
              <Check size={32} strokeWidth={3} />
            </div>
            <h2 className="mt-5 font-display text-[1.9rem] font-semibold tracking-[-0.03em] text-[#353a3e]">
              Payment Successful
            </h2>
            <p className="mt-2 text-sm text-[#81898f]">{payment.success}</p>
            <button
              onClick={() => router.push(returnTo)}
              className="mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-brand-teal text-sm font-medium text-white transition hover:bg-brand-tealDark"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentPageWrapper;
