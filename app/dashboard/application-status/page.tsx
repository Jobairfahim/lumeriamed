import Link from "next/link";

type StatusType = "deposit_pending" | "final_deposit_pending";

interface ApplicationCard {
  id: string;
  type: StatusType;
}

// Mock data — replace with API fetch
const MOCK_STATUS_CARDS: ApplicationCard[] = [
  { id: "APP1023",  type: "deposit_pending" },
  { id: "APP12523", type: "final_deposit_pending" },
  { id: "APP1023",  type: "deposit_pending" },
  { id: "APP12523", type: "final_deposit_pending" },
];

function DepositPendingCard({ id }: { id: string }) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-white p-4 shadow-soft sm:p-6">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row">
        <div>
          <h3 className="font-semibold text-brand-navy text-base">Application Status</h3>
          <p className="text-brand-muted text-sm mt-0.5">ID: {id}</p>
        </div>
        <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1.5 rounded-full">
          Deposit Pending
        </span>
      </div>

      <p className="text-brand-slate text-sm leading-relaxed">
        If they want to proceed and get a{" "}
        <span className="text-brand-teal font-medium">placement</span>, they will need to make a
        small advance payment of{" "}
        <span className="text-brand-teal font-medium">$1.00</span> as a deposit.
        <br /><br />
        After making this payment, your{" "}
        <span className="text-brand-teal font-medium">matching process</span> will begin.
      </p>

      {/**
       * ── INTEGRATION POINT ──
       * Wire to payment gateway: stripe.redirectToCheckout(...)
       */}
      <button className="w-full bg-brand-teal text-white font-medium py-3 rounded-xl hover:bg-brand-tealDark transition-all text-sm">
        Pay $1.00
      </button>

      <Link
        href={`/dashboard/applications/${id}`}
        className="text-center text-brand-slate text-sm hover:text-brand-navy transition-colors"
      >
        View Application
      </Link>
    </div>
  );
}

function FinalDepositPendingCard({ id }: { id: string }) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-white p-4 shadow-soft sm:p-6">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row">
        <div>
          <h3 className="font-semibold text-brand-navy text-base">Application Status</h3>
          <p className="text-brand-muted text-sm mt-0.5">ID: {id}</p>
        </div>
        <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1.5 rounded-full">
          Final Deposit Pending
        </span>
      </div>

      <p className="text-brand-slate text-sm leading-relaxed">
        The{" "}
        <span className="text-brand-teal font-medium">matching process</span> has been completed.
        Several{" "}
        <span className="text-brand-teal font-medium">placement options</span> have been found for you.
        <br /><br />
        Please select your preferred option and proceed with the{" "}
        <span className="text-brand-teal font-medium">final payment</span>.
      </p>

      {/**
       * ── INTEGRATION POINT ──
       * Navigate to placement selection page
       */}
      <Link
        href="/dashboard/application-status/choose-placement"
        className="w-full bg-brand-teal text-white font-medium py-3 rounded-xl hover:bg-brand-tealDark transition-all text-sm text-center"
      >
        Select placement
      </Link>

      <Link
        href={`/dashboard/applications/${id}`}
        className="text-center text-brand-slate text-sm hover:text-brand-navy transition-colors"
      >
        View Application
      </Link>
    </div>
  );
}

export default function ApplicationStatusPage() {
  return (
    <div>
      <h1 className="font-display font-bold text-brand-navy text-xl mb-6">Application Status</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_STATUS_CARDS.map((card, i) =>
          card.type === "deposit_pending" ? (
            <DepositPendingCard key={i} id={card.id} />
          ) : (
            <FinalDepositPendingCard key={i} id={card.id} />
          )
        )}
      </div>
    </div>
  );
}
