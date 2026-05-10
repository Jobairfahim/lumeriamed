"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  {
    number: "01",
    title: "Information We Collect",
    content: (
      <>
        <p>
          We may collect personal information that you choose to share with us,
          including but not limited to:
        </p>
        <ul>
          <li>Your name, email address, phone number, and company details</li>
          <li>
            Information submitted through contact forms, inquiry forms, or job
            applications
          </li>
          <li>
            Any details you provide when communicating with us via email or
            other channels
          </li>
        </ul>
        <p>
          In addition, certain non-personal information may be collected
          automatically, such as browser type, device information, IP address,
          and website usage data.
        </p>
      </>
    ),
  },
  {
    number: "02",
    title: "How We Use Your Information",
    content: (
      <>
        <p>The information we collect is used to:</p>
        <ul>
          <li>Respond to your inquiries and communicate with you</li>
          <li>Provide and improve our services</li>
          <li>Review job applications and recruitment submissions</li>
          <li>
            Maintain and enhance website performance and user experience
          </li>
          <li>Analyze usage trends and visitor behavior</li>
          <li>Meet legal and regulatory obligations</li>
        </ul>
        <p>
          We only use your information for purposes that are relevant and
          necessary.
        </p>
      </>
    ),
  },
  {
    number: "03",
    title: "Cookies and Similar Technologies",
    content: (
      <>
        <p>
          Our website uses cookies and similar tracking technologies to improve
          functionality and user experience. Cookies help us understand how
          visitors interact with our site and allow us to remember preferences
          for future visits.
        </p>
        <p>
          You can control or disable cookies through your browser settings.
          Please note that disabling cookies may affect certain features of the
          website.
        </p>
      </>
    ),
  },
  {
    number: "04",
    title: "Use of Third-Party Services",
    content: (
      <p>
        We may use trusted third-party tools such as analytics providers to
        better understand website usage and performance. These third parties may
        collect information in accordance with their own privacy policies.
        Lumireamed does not control how third-party services handle your data.
      </p>
    ),
  },
  {
    number: "05",
    title: "Sharing and Disclosure of Information",
    content: (
      <>
        <p>
          We do not sell or rent your personal information. However, we may
          share information when required to:
        </p>
        <ul>
          <li>Comply with legal obligations or lawful requests</li>
          <li>
            Protect the rights, safety, or property of Lumireamed or others
          </li>
          <li>
            Support business operations such as mergers or asset transfers
          </li>
          <li>Prevent fraud or misuse of our website and services</li>
        </ul>
      </>
    ),
  },
  {
    number: "06",
    title: "Data Retention",
    content: (
      <p>
        We retain personal information only for as long as it is necessary to
        fulfill the purposes outlined in this policy, or as required by law.
        Once information is no longer needed, we take reasonable steps to
        securely delete or anonymize it.
      </p>
    ),
  },
  {
    number: "07",
    title: "Children's Privacy",
    content: (
      <p>
        Our website is not intended for individuals under the age of 18. We do
        not knowingly collect personal information from children. If we become
        aware that such information has been collected, we will take appropriate
        steps to remove it promptly.
      </p>
    ),
  },
  {
    number: "08",
    title: "Updates to This Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time to reflect changes
        in our practices or legal requirements. Any updates will be posted on
        this page, and continued use of the website indicates acceptance of the
        revised policy.
      </p>
    ),
  },
  {
    number: "09",
    title: "Contact Information",
    content: (
      <p>
        If you have any questions or concerns regarding this Privacy Policy or
        how we handle your information, please contact us:{" "}
        <a href="mailto:support@lumieramed.com">support@lumieramed.com</a>
      </p>
    ),
  },
];

function useVisible(ref: React.RefObject<Element | null>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

function Section({ number, title, content, index }: {
  number: string;
  title: string;
  content: React.ReactNode;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useVisible(ref);

  return (
    <div
      ref={ref}
      className="section-row"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.55s ease ${index * 0.05}s, transform 0.55s ease ${index * 0.05}s`,
      }}
    >
      <span className="section-num">{number}</span>
      <div className="section-body">
        <h2 className="section-title">{title}</h2>
        <div className="section-content">{content}</div>
      </div>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --teal: #2abfbf;
          --teal-dark: #2abfbf;
          --teal-light: #eaf4f2;
          --teal-mid: #d0ebe7;
          --white: #ffffff;
          --ink: #0d1f1d;
          --muted: #5a7570;
          --border: #d0e8e4;
          --text: #2d4a46;
        }

        .privacy-page {
          background: var(--white);
          color: var(--ink);
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          -webkit-font-smoothing: antialiased;
        }

        /* HERO */
        .hero {
          background: var(--teal);
          padding: 72px 64px 64px;
          position: relative;
          overflow: hidden;
        }
        .hero::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 0; right: 0;
          height: 40px;
          background: var(--white);
          clip-path: ellipse(55% 100% at 50% 100%);
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 100px;
          padding: 6px 14px;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.9);
          margin-bottom: 28px;
        }
        .hero-title {
          font-size: clamp(2rem, 5vw, 3.25rem);
          font-weight: 600;
          color: #ffffff;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
        }
        .hero-subtitle {
          font-size: 1rem;
          color: rgba(255,255,255,0.72);
          font-weight: 300;
          max-width: 520px;
          line-height: 1.7;
          margin-bottom: 36px;
        }
        .hero-meta {
          display: flex;
          gap: 32px;
          flex-wrap: wrap;
        }
        .hero-chip {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .hero-chip-label {
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          font-weight: 500;
        }
        .hero-chip-value {
          font-size: 0.88rem;
          color: rgba(255,255,255,0.9);
          font-weight: 400;
        }

        /* INTRO */
        .intro {
          padding: 56px 64px 48px;
          border-bottom: 1px solid var(--border);
        }
        .intro-inner {
          max-width: 680px;
        }
        .intro p {
          font-size: 1.0rem;
          line-height: 1.8;
          color: var(--text);
        }
        .intro strong {
          font-weight: 500;
          color: var(--ink);
        }

        /* SECTIONS */
        .sections {
          padding: 24px 64px 80px;
        }
        .section-row {
          display: grid;
          grid-template-columns: 52px 1fr;
          gap: 0 32px;
          padding: 44px 0;
          border-bottom: 1px solid var(--border);
        }
        .section-row:last-child { border-bottom: none; }
        .section-num {
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--teal);
          letter-spacing: 0.08em;
          padding-top: 5px;
          opacity: 0.7;
        }
        .section-body {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .section-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--ink);
          letter-spacing: -0.01em;
        }
        .section-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .section-content p {
          font-size: 0.95rem;
          line-height: 1.78;
          color: var(--text);
        }
        .section-content ul {
          list-style: none;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          background: var(--teal-light);
          border-left: 3px solid var(--teal);
          border-radius: 0 8px 8px 0;
        }
        .section-content li {
          font-size: 0.93rem;
          line-height: 1.65;
          color: var(--text);
          padding-left: 16px;
          position: relative;
        }
        .section-content li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 10px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--teal);
        }
        .section-content a {
          color: var(--teal);
          text-decoration: underline;
          text-underline-offset: 3px;
          font-weight: 500;
        }
        .section-content a:hover {
          color: var(--teal-dark);
        }

        /* CONTACT CALLOUT */
        .contact-callout {
          margin: 0 64px 64px;
          background: var(--teal-light);
          border: 1px solid var(--teal-mid);
          border-radius: 12px;
          padding: 32px 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .contact-callout-text h3 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 4px;
        }
        .contact-callout-text p {
          font-size: 0.88rem;
          color: var(--muted);
        }
        .contact-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--teal);
          color: #fff;
          font-size: 0.88rem;
          font-weight: 500;
          padding: 11px 22px;
          border-radius: 8px;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.2s;
        }
        .contact-btn:hover { background: var(--teal-dark); }

        @media (max-width: 640px) {
          .hero { padding: 48px 24px 52px; }
          .intro { padding: 40px 24px 36px; }
          .sections { padding: 16px 24px 60px; }
          .section-row { grid-template-columns: 1fr; gap: 6px; padding: 32px 0; }
          .section-num { padding-top: 0; }
          .contact-callout { margin: 0 24px 48px; }
        }
      `}</style>

      <div className="privacy-page">

        {/* HERO */}
        <section className="hero">
          <div className="hero-badge">Legal Document</div>
          <h1 className="hero-title">Privacy Policy</h1>
          <p className="hero-subtitle">
            We value your trust and are committed to protecting your privacy.
            Learn how we collect, use, and safeguard your information.
          </p>
          <div className="hero-meta">
            <div className="hero-chip">
              <span className="hero-chip-label">Effective Date</span>
              <span className="hero-chip-value">May 2025</span>
            </div>
            <div className="hero-chip">
              <span className="hero-chip-label">Applies To</span>
              <span className="hero-chip-value">All Lumireamed Services</span>
            </div>
            <div className="hero-chip">
              <span className="hero-chip-label">Sections</span>
              <span className="hero-chip-value">09 Clauses</span>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <div className="intro">
          <div className="intro-inner">
            <p>
              At <strong>Lumireamed</strong>, we value your trust and are
              committed to protecting your privacy. This Privacy Policy explains
              how Lumireamed collects, uses, stores, and safeguards your
              information when you visit our website or interact with our
              services. By using our website, you agree to the practices
              described in this policy.
            </p>
          </div>
        </div>

        {/* SECTIONS */}
        <main className="sections">
          {sections.map((s, i) => (
            <Section key={s.number} {...s} index={i} />
          ))}
        </main>

        {/* CONTACT CALLOUT */}
        <div className="contact-callout">
          <div className="contact-callout-text">
            <h3>Have questions about your privacy?</h3>
            <p>We&apos;re happy to explain how we handle your data.</p>
          </div>
          <a href="mailto:support@lumieramed.com" className="contact-btn">
            Contact Us →
          </a>
        </div>

      </div>
    </>
  );
}