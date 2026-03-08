"use client";

import { createContext, useContext, useState } from "react";
import SubmitEnquiryModal from "@/components/modals/SubmitEnquiryModal";
import PlacementEnquiryModal from "@/components/modals/PlacementEnquiryModal";

/**
 * ── INTEGRATION: when backend is ready, uncomment these imports and pass as props ──
 * import { submitContactEnquiry, submitPlacementEnquiry } from "@/lib/api";
 *
 * <SubmitEnquiryModal    onSubmit={submitContactEnquiry}    ... />
 * <PlacementEnquiryModal onSubmit={submitPlacementEnquiry}  ... />
 */

type ModalType = "enquiry" | "placement" | null;

interface ModalContextType {
  openEnquiry:   () => void;
  openPlacement: (title?: string) => void;
  close:         () => void;
}

const ModalContext = createContext<ModalContextType>({
  openEnquiry:   () => {},
  openPlacement: () => {},
  close:         () => {},
});

export function useModal() {
  return useContext(ModalContext);
}

export default function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal]               = useState<ModalType>(null);
  const [placementTitle, setPlacementTitle] = useState<string | undefined>();

  const openEnquiry   = () => setModal("enquiry");
  const openPlacement = (title?: string) => { setPlacementTitle(title); setModal("placement"); };
  const close         = () => setModal(null);

  return (
    <ModalContext.Provider value={{ openEnquiry, openPlacement, close }}>
      {children}
      <SubmitEnquiryModal
        isOpen={modal === "enquiry"}
        onClose={close}
        // onSubmit={submitContactEnquiry}
      />
      <PlacementEnquiryModal
        isOpen={modal === "placement"}
        onClose={close}
        placementTitle={placementTitle}
        // onSubmit={submitPlacementEnquiry}
      />
    </ModalContext.Provider>
  );
}
