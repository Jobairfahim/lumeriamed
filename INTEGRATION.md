# LumieraMed – API Integration Guide

Every integration point is marked in the source with a comment block:

```
/** ── INTEGRATION POINT ── ... */
```

---

## 1. Setup

Copy `.env.example` → `.env.local` and set your API URL:
```
NEXT_PUBLIC_API_URL=https://api.lumieramed.com
```

---

## 2. Integration Points

### Contact / Simple Enquiry
**Files:** `app/contact/page.tsx`, `components/modals/SubmitEnquiryModal.tsx`

```ts
import { submitContactEnquiry } from "@/lib/api";

const result = await submitContactEnquiry(form);
if (!result.success) { setError(result.error); setLoading(false); return; }
router.push("/enquiry-success");
```
Endpoint: `POST /api/enquiries/contact`

---

### Placement Enquiry Modal
**File:** `components/modals/ModalProvider.tsx`

Uncomment and import:
```ts
import { submitContactEnquiry, submitPlacementEnquiry } from "@/lib/api";

<SubmitEnquiryModal    onSubmit={submitContactEnquiry}   ... />
<PlacementEnquiryModal onSubmit={submitPlacementEnquiry} ... />
```
Endpoint: `POST /api/enquiries/placement` (multipart/form-data)

---

### Login
**File:** `app/login/page.tsx`

```ts
import { login } from "@/lib/api";
import { useRouter } from "next/navigation";

const result = await login(form);
if (!result.success) { setError(result.error); setLoading(false); return; }
router.push(result.data.redirectUrl);
```
Endpoint: `POST /api/auth/login`

---

### Browse Placements (future)
**File:** `app/browse-placements/page.tsx`

```ts
import { getPlacements } from "@/lib/api";

const result = await getPlacements({ specialty, city, search });
if (result.success) setPlacements(result.data);
```
Endpoint: `GET /api/placements`

---

## 3. All API functions → `lib/api.ts`

| Function                  | Endpoint                        | Used in                          |
|---------------------------|---------------------------------|----------------------------------|
| `submitContactEnquiry`    | POST /api/enquiries/contact     | contact page, enquiry modal      |
| `submitPlacementEnquiry`  | POST /api/enquiries/placement   | placement enquiry modal          |
| `login`                   | POST /api/auth/login            | login page                       |
| `getPlacements`           | GET  /api/placements            | browse placements page           |
