"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  Apple,
  ArrowLeft,
  Check,
  ChevronDown,
  Laptop,
  ShieldCheck,
} from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// ─── Config ──────────────────────────────────────────────────────────────────

const STRIPE_PUBLISHABLE_KEY = process.env
  .NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string; // Replace with your key

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

// ─── Types & Constants ────────────────────────────────────────────────────────

type PaymentType = "deposit" | "final";

const COUNTRIES = [
  { code: "BD", name: "Bangladesh" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "IN", name: "India" },
  { code: "AE", name: "United Arab Emirates" },
];

// ─── Illustration ─────────────────────────────────────────────────────────────

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

interface PaymentInfo {
  title: string;
  amount: string;
  cta: string;
  success: string;
}

// ─── Stripe Checkout Form ─────────────────────────────────────────────────────

interface StripeCheckoutFormProps {
  payment: PaymentInfo;
  returnTo: string;
  onSuccess: () => void;
}

function StripeCheckoutForm({
  payment,
  returnTo,
  onSuccess,
}: StripeCheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isFormValid = useMemo(
    () =>
      email.trim().length > 0 &&
      cardholderName.trim().length > 0 &&
      country.trim().length > 0 &&
      !!stripe &&
      !!elements,
    [email, cardholderName, country, stripe, elements],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !isFormValid) return;

    setLoading(true);
    setErrorMessage(null);

const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}${returnTo}`,
        payment_method_data: {
          billing_details: {
            name: cardholderName,
            email: email,
            address: { country: country },
          },
        },
      },
      redirect: "if_required",
    });

    if (result.error) {
      setErrorMessage(result.error.message || "Payment failed.");
      setLoading(false);
    } else if (result.paymentIntent) {
      // 👇 Check status
      if (result.paymentIntent.status === "succeeded") {
        onSuccess();
      } else if (result.paymentIntent.status === "requires_action") {
        // Stripe will handle OTP popup automatically
        console.log("Authentication required (OTP/3DS)");
      }
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Email */}
      <label className="block">
        <span className="mb-2 block text-xs font-medium text-[#4d545a]">
          Email Address<span className="text-[#ff6b6b]">*</span>
        </span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="youremail@example.com"
          required
          className="h-12 w-full rounded-xl border border-[#efefef] bg-[#f8f8f8] px-4 text-sm text-[#30363b] outline-none transition focus:border-[#38b7b5] focus:ring-1 focus:ring-[#38b7b5]"
        />
      </label>

      {/* Stripe Payment Element (card, Apple Pay, Google Pay) */}
      <div>
        <span className="mb-2 block text-xs font-medium text-[#4d545a]">
          Card Information
        </span>
        <div className="rounded-xl border border-[#efefef] bg-[#f8f8f8] px-4 py-3">
          <PaymentElement
            options={{
              layout: "tabs",
              fields: {
                billingDetails: {
                  name: "never",
                  email: "never",
                  address: { country: "never" },
                },
              },
            }}
          />
        </div>
      </div>

      {/* Cardholder Name */}
      <label className="block">
        <span className="mb-2 block text-xs font-medium text-[#4d545a]">
          Cardholder Name
        </span>
        <input
          type="text"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          placeholder="Full name on card"
          required
          className="h-12 w-full rounded-xl border border-[#efefef] bg-[#f8f8f8] px-4 text-sm text-[#30363b] outline-none transition focus:border-[#38b7b5] focus:ring-1 focus:ring-[#38b7b5]"
        />
      </label>

      {/* Country */}
      <label className="block">
        <span className="mb-2 block text-xs font-medium text-[#4d545a]">
          Country
        </span>
        <div className="relative">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className="h-12 w-full appearance-none rounded-xl border border-[#efefef] bg-[#f8f8f8] px-4 pr-10 text-sm text-[#30363b] outline-none transition focus:border-[#38b7b5] focus:ring-1 focus:ring-[#38b7b5]"
          >
            <option value="">Select country</option>
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8e959a]"
          />
        </div>
      </label>

      {/* Error */}
      {errorMessage && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-xs text-red-600">
          {errorMessage}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={!isFormValid || loading}
        className="mt-3 flex h-12 w-full items-center justify-center rounded-xl bg-[#38b7b5] text-sm font-medium text-white transition hover:bg-[#2da3a1] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            Processing…
          </span>
        ) : (
          payment.cta
        )}
      </button>
    </form>
  );
}

// ─── Inner Page (after client secret is fetched) ──────────────────────────────

function PaymentPageInner({
  type,
  returnTo,
  id,
}: {
  type: PaymentType;
  returnTo: string;
  id: string;
}) {
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [enquiryAmount, setEnquiryAmount] = useState<number | null>(null);

  // Only fetch from API for the final payment; first payment is always £250
  useEffect(() => {
    if (type !== "final") return;
    const fetchEnquiry = async () => {
      try {
        const token = localStorage.getItem("accessToken") ?? "";
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/student-placement-enquiries/${id}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const json = await res.json();
        const data = json.data ?? json;
        if (data.finalPaymentAmount != null) {
          setEnquiryAmount(data.finalPaymentAmount);
        }
      } catch {
        // amount remains null — will show £… until resolved
      }
    };
    fetchEnquiry();
  }, [id, type]);

  // First payment is always £250; final is dynamically set by admin
  const amountDisplay =
    type === "deposit" ? "£250.00" : enquiryAmount != null ? `£${enquiryAmount.toFixed(2)}` : "£…";
  const payment: PaymentInfo = {
    title: type === "final" ? "Placement Payment" : "Placement Deposit",
    amount: amountDisplay,
    cta: `Pay ${amountDisplay}`,
    success:
      type === "final"
        ? `Your placement payment of ${amountDisplay} has been successful.`
        : `Your deposit payment of ${amountDisplay} has been successful.`,
  };

  // Fetch client secret from your backend
  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/payments/create-payment/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          },
        );
        const json = await res.json();
        if (json.success && json.data?.clientSecret) {
          setClientSecret(json.data.clientSecret);
        } else {
          setFetchError("Failed to initialize payment. Please try again.");
        }
      } catch {
        setFetchError("Network error. Please check your connection.");
      }
    };
    fetchClientSecret();
  }, [id]);
  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <div className="grid min-h-screen lg:grid-cols-[minmax(320px,1fr)_minmax(360px,1.05fr)]">
        {/* ── Left Panel ── */}
        <section className="relative overflow-hidden bg-[#38b7b5] px-6 py-8 text-white sm:px-10 lg:px-12 lg:py-10">
          <Link
            href={returnTo}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/85 transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={18} />
          </Link>

          <div className="mx-auto flex max-w-[360px] flex-col items-center pt-6 text-center sm:pt-10 lg:pt-8">
            <p className="text-lg font-medium text-white/85">{payment.title}</p>
            <p className="mt-2 text-5xl font-semibold tracking-[-0.05em]">
              {payment.amount}
            </p>

            <div className="my-12 sm:my-16">
              <CheckoutIllustration />
            </div>

            <div className="mt-auto flex items-center gap-2 text-xs text-white/80">
              <ShieldCheck size={13} />
              <span>Powered by Stripe</span>
              <span>·</span>
              <span>Terms</span>
              <span>·</span>
              <span>Privacy</span>
            </div>
          </div>
        </section>

        {/* ── Right Panel ── */}
        <section className="flex items-center justify-center px-5 py-8 sm:px-8">
          <div className="w-full max-w-[430px]">
            {/* Apple Pay shortcut (handled by Stripe PaymentElement internally) */}
            <button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2b2b2b] text-sm font-medium text-white transition hover:bg-black">
              <Apple size={16} />
              Pay
            </button>

            <p className="my-5 text-center text-xs font-medium text-[#afafaf]">
              Or Pay Another Way
            </p>

            <div className="rounded-[26px] bg-white px-5 py-6 shadow-sm sm:px-7 sm:py-7">
              <h1 className="mb-6 text-center text-[1.85rem] font-semibold tracking-[-0.03em] text-[#2f3437]">
                Payment
              </h1>

              {fetchError ? (
                <div className="rounded-xl bg-red-50 px-4 py-6 text-center text-sm text-red-600">
                  {fetchError}
                </div>
              ) : !clientSecret ? (
                <div className="flex flex-col items-center gap-3 py-8">
                  <svg
                    className="h-7 w-7 animate-spin text-[#38b7b5]"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  <p className="text-xs text-[#afafaf]">
                    Initializing secure payment…
                  </p>
                </div>
              ) : (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: "stripe",
                      variables: {
                        colorPrimary: "#38b7b5",
                        colorBackground: "#f8f8f8",
                        colorText: "#30363b",
                        colorDanger: "#ff6b6b",
                        borderRadius: "12px",
                        fontFamily: "inherit",
                      },
                    },
                  }}
                >
                  <StripeCheckoutForm
                    payment={payment}
                    returnTo={returnTo}
                    onSuccess={() => setShowSuccess(true)}
                  />
                </Elements>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* ── Success Modal ── */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-[420px] rounded-[24px] bg-white px-6 py-7 text-center shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#38b7b5] text-white">
              <Check size={32} strokeWidth={3} />
            </div>
            <h2 className="mt-5 text-[1.9rem] font-semibold tracking-[-0.03em] text-[#353a3e]">
              Payment Successful
            </h2>
            <p className="mt-2 text-sm text-[#81898f]">{payment.success}</p>
            <button
              onClick={() => router.push(returnTo)}
              className="mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-[#38b7b5] text-sm font-medium text-white transition hover:bg-[#2da3a1]"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Search Params Reader ─────────────────────────────────────────────────────

function PaymentPageContent({ id }: { id: string }) {
  const searchParams = useSearchParams();
  const type = (searchParams.get("type") || "deposit") as PaymentType;
  const returnTo =
    searchParams.get("returnTo") || `/dashboard/applications/${id}`;
  return <PaymentPageInner type={type} returnTo={returnTo} id={id} />;
}

// ─── Default Export ───────────────────────────────────────────────────────────

export default function PaymentPage() {
  const params = useParams();

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-gray-400">
          Loading…
        </div>
      }
    >
      <PaymentPageContent id={params.id as string} />
    </Suspense>
  );
}
