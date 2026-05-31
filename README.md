# LumireaMed

LumireaMed is a premium, specialized medical elective platform designed to match medical students around the globe with clinical elective placement opportunities in China's leading healthcare and medical institutions. 

Our mission is to advance medical education, facilitate cross-cultural exchange, and provide future healthcare professionals with unparalleled global clinical exposure.

---

## 🚀 Key Features

* **Placement Directory:** Browse and filter clinical elective opportunities across leading hospitals and diverse medical specialties in China.
* **Streamlined Applications:** Built-in submission portal for student enquiries, CVs, references, and application processing.
* **Interactive Dashboard:** Complete student and portal dashboard for managing applications, checking application statuses, and tracking progress.
* **PCI-DSS Secure Payments:** Integrated payment portal for processing deposits and fees securely powered by Stripe.
* **Real-time Notifications:** WebSockets integration for real-time status updates, messages, and enquiries.
* **Secure Auth Systems:** Complete credentials-based and Google OAuth security powered by Firebase.

---

## 🛠️ Tech Stack

### Frontend & Core
* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) with Vanilla CSS enhancements for custom UI animations.
* **Icons:** [Lucide React](https://lucide.dev/)

### Backend, Database & APIs
* **Authentication & Database:** [Firebase Core & Firestore](https://firebase.google.com/)
* **Real-time Engine:** [Socket.io Client](https://socket.io/)
* **Payment Processing:** [Stripe API](https://stripe.com/)

---

## 📂 Directory Structure

```text
├── app/                  # Next.js App Router (pages & routing)
│   ├── dashboard/        # Student application management panels
│   ├── payment/          # Stripe checkout flows
│   ├── privacy-policy/   # Legal privacy page
│   ├── terms/            # Terms & conditions agreement page
│   └── globals.css       # Tailwind stylesheet
├── components/           # Reusable UI & Layout components
│   ├── layout/           # Shared page wrappers (Navbar, Footer, Shells)
│   ├── modals/           # Global overlay panels (Enquiry forms)
│   ├── sections/         # Static & interactive home/landing section components
│   └── ui/               # Core atomic design system elements (Buttons, Cards, Inputs)
├── lib/                  # Shared utilities and SDK setups
│   ├── api.ts            # Client-side API fetch abstraction & utilities
│   ├── firebase.ts       # Firebase SDK & authentication wrappers
│   └── socket.ts         # Socket.io connection utilities
└── public/               # Static assets (images, logos, and configuration files)
```

---

## ⚙️ Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18+ recommended) and `npm` installed.

### 1. Clone the repository
```bash
git clone https://github.com/Jobairfahim/lumeriamed.git
cd lumieramed-final
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory and configure the following environment variables:

```env
# Next.js Config
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# WebSockets Configuration
NEXT_PUBLIC_SOCKET_SERVER_URL=your_websocket_server_url
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🔒 Security Practices

* **Offloaded Authentication:** Passwords and user sessions are fully managed by Firebase Auth to guarantee state-of-the-art protection against brute-force attacks and session hijacking.
* **XSS Mitigation:** Built-in React escaping blocks Cross-Site Scripting. Hardcoded style tags use React's `dangerouslySetInnerHTML` pattern safely to bypass SSR hydration escape mismatches without exposing client-side vulnerability surfaces.
* **PCI-DSS Compliance:** Card handling and checkout sequences are directly piped into Stripe's secure infrastructure so card credentials never pass through our local backend environment.
* **Database Isolation:** Direct client-database communications are gated by rigorous Firestore Security Rules ensuring users can only read and write their own documents.

---

## 📄 License
This project is proprietary and private. All rights reserved by LumireaMed.
