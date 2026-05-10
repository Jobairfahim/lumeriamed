"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  {
    number: "01",
    title: "Definitions",
    content: (
      <>
        <p>For the purpose of these Terms and Conditions:</p>
        <ul>
          <li><strong>&quot;Client&quot;, &quot;You&quot;, &quot;Your&quot;</strong> refers to any individual or entity accessing this Website.</li>
          <li><strong>&quot;Company&quot;, &quot;We&quot;, &quot;Us&quot;, &quot;Our&quot;</strong> refers to Lumireamed.</li>
          <li><strong>&quot;Services&quot;</strong> refers to software development, consulting, digital solutions, and any other services offered by Lumireamed.</li>
          <li><strong>&quot;Party&quot;</strong> refers to either the Client or the Company individually, and &quot;Parties&quot; refers to both collectively.</li>
        </ul>
        <p>These terms govern the relationship between the Client and Lumireamed in accordance with applicable laws.</p>
      </>
    ),
  },
  {
    number: "02",
    title: "Cookies",
    content: (
      <p>
        We use cookies and similar technologies to enhance user experience and analyze website performance. By using our Website, you consent to our use of cookies in accordance with our Privacy Policy.
      </p>
    ),
  },
  {
    number: "03",
    title: "Intellectual Property Rights",
    content: (
      <>
        <p>
          Unless otherwise stated, Lumireamed and/or its licensors own all intellectual property rights for all content, materials, and functionality on this Website. All rights are reserved.
        </p>
        <p>You may access the Website for personal or internal business use only. You must not:</p>
        <ul>
          <li>Republish material from the Website</li>
          <li>Sell, rent, or sublicense Website material</li>
          <li>Reproduce, duplicate, or copy Website content</li>
          <li>Redistribute content without prior written consent</li>
        </ul>
      </>
    ),
  },
  {
    number: "04",
    title: "User Content",
    content: (
      <>
        <p>
          Certain areas of the Website may allow users to submit content, including comments or feedback (&quot;User Content&quot;). By submitting User Content, you confirm that:
        </p>
        <ul>
          <li>You own or have the right to post such content</li>
          <li>The content does not violate any third-party rights</li>
          <li>The content is not unlawful, offensive, or misleading</li>
        </ul>
        <p>
          You grant Lumireamed a non-exclusive, royalty-free, worldwide license to use, reproduce, and distribute such content. We reserve the right to remove any User Content at our discretion.
        </p>
      </>
    ),
  },
  {
    number: "05",
    title: "Hyperlinking to Our Website",
    content: (
      <>
        <p>The following organizations may link to our Website without prior written approval:</p>
        <ul>
          <li>Government agencies</li>
          <li>Search engines</li>
          <li>News organizations</li>
          <li>Online directories</li>
        </ul>
        <p>
          Other organizations may request approval to link to our Website. Approved links must not be misleading, must not imply endorsement, and must be contextually relevant.
        </p>
      </>
    ),
  },
  {
    number: "06",
    title: "iFrames",
    content: (
      <p>
        Without prior written approval, you may not create frames around our Website pages that alter the visual presentation or appearance of our Website.
      </p>
    ),
  },
  {
    number: "07",
    title: "Content Liability",
    content: (
      <p>
        We are not responsible for any content that appears on external websites linking to our Website. You agree to indemnify and defend Lumireamed against any claims arising from content on your website that links to ours.
      </p>
    ),
  },
  {
    number: "08",
    title: "Reservation of Rights",
    content: (
      <p>
        We reserve the right to request the removal of any links to our Website. You agree to immediately remove such links upon request. We may also amend these Terms and Conditions at any time. Continued use of the Website constitutes acceptance of any changes.
      </p>
    ),
  },
  {
    number: "09",
    title: "Removal of Links from Our Website",
    content: (
      <p>
        If you find any link on our Website that you believe is inappropriate or offensive, you may contact us. We will review requests but are not obligated to remove such links.
      </p>
    ),
  },
  {
    number: "10",
    title: "Disclaimer",
    content: (
      <>
        <p>To the maximum extent permitted by law:</p>
        <ul>
          <li>We exclude all warranties related to the Website and its use</li>
          <li>We are not liable for any indirect, incidental, or consequential damages</li>
          <li>Nothing in this disclaimer limits liability for death or personal injury caused by negligence</li>
        </ul>
        <p>The Website and its content are provided &quot;as is,&quot; without any guarantees.</p>
      </>
    ),
  },
  {
    number: "11",
    title: "Governing Law",
    content: (
      <p>
        These Terms and Conditions shall be governed by and interpreted in accordance with the laws applicable to Lumireamed jurisdiction. Any disputes shall be subject to the exclusive jurisdiction of the relevant courts.
      </p>
    ),
  },
  {
    number: "12",
    title: "Contact Information",
    content: (
      <p>
        If you have any questions about these Terms and Conditions, please contact us:{" "}
        <a href="mailto:info@lumireamed.com">info@lumireamed.com</a>
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

export default function TermsPage() {
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

        .terms-page {
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
        .intro a {
          color: var(--teal);
          text-decoration: underline;
          text-underline-offset: 3px;
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
        .section-content strong {
          font-weight: 500;
          color: var(--ink);
        }
        .section-content ul {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
          background: var(--teal-light);
          border-left: 3px solid var(--teal);
          border-radius: 0 8px 8px 0;
          padding: 16px 20px;
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

      <div className="terms-page">

        {/* HERO */}
        <section className="hero">
          <div className="hero-badge">Legal Document</div>
          <h1 className="hero-title">Terms &amp; Conditions</h1>
          <p className="hero-subtitle">
            Please read these terms carefully before using the Lumireamed website or any of our services.
          </p>
          <div className="hero-meta">
            <div className="hero-chip">
              <span className="hero-chip-label">Last Updated</span>
              <span className="hero-chip-value">January 01, 2026</span>
            </div>
            <div className="hero-chip">
              <span className="hero-chip-label">Website</span>
              <span className="hero-chip-value">https://lumireamed.com</span>
            </div>
            <div className="hero-chip">
              <span className="hero-chip-label">Sections</span>
              <span className="hero-chip-value">12 Clauses</span>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <div className="intro">
          <div className="intro-inner">
            <p>
              Welcome to <strong>Lumireamed</strong>. These Terms and Conditions govern your use of the Lumireamed website and any services provided by us. By accessing or using our website at{" "}
              <a href="https://lumireamed.com">https://lumireamed.com</a>, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please discontinue use of the Website.
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
            <h3>Have questions about these terms?</h3>
            <p>Our team is happy to clarify anything in this document.</p>
          </div>
          <a href="mailto:support@lumieramed.com" className="contact-btn">
            Contact Us →
          </a>
        </div>

      </div>
    </>
  );
}