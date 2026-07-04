"use client";

import { useEffect, useRef, useState } from "react";

const groups = [
  {
    label: "Who We Are & What We Collect",
    sections: [
      {
        number: "01",
        title: "Who We Are",
        content: (
          <p>
            LumieraMed Ltd is the data controller responsible for your personal data. If you
            have any questions about this policy or how we handle your information, please
            contact us at{" "}
            <a href="mailto:support@lumieramed.com">support@lumieramed.com</a>.
          </p>
        ),
      },
      {
        number: "02",
        title: "Information We Collect",
        content: (
          <>
            <p>We collect personal information in the following categories:</p>

            <p><strong>Information you provide to us:</strong></p>
            <ul>
              <li>Contact details: your name, email address, phone number, and country of residence.</li>
              <li>Account and application information: login credentials, preferred placement dates, availability, and placement preferences.</li>
              <li>Professional and academic documents: your CV, academic transcript, letter of good standing or enrolment, personal statement, and proof of language proficiency.</li>
              <li>Identity and travel documents: passport copy, photographs, and related identification.</li>
              <li>Health and immunisation records: where required by a Host Hospital or destination country (see Clause 4 regarding special category data).</li>
              <li>Communications: any details you provide when contacting us by email, through contact or enquiry forms, or through our Client Portal.</li>
            </ul>

            <p><strong>Information collected automatically:</strong></p>
            <ul>
              <li>Technical data: browser type, device type, operating system, IP address, and website usage data collected via cookies and similar technologies (see Clause 7).</li>
              <li>Usage data: pages visited, time spent on the website, and interaction patterns, collected to help us improve our services.</li>
            </ul>

            <p><strong>Information collected via your account and Client Portal:</strong></p>
            <ul>
              <li>Account registration data: your name, email address, and login credentials created when you register for an account.</li>
              <li>Portal activity: login timestamps, document uploads, application status interactions, and messages sent through the Portal.</li>
              <li>Application progress data: records of your placement search progress, correspondence with us, and any notes or updates recorded during the facilitation process.</li>
            </ul>
          </>
        ),
      },
    ],
  },
  {
    label: "How & Why We Use Your Data",
    sections: [
      {
        number: "03",
        title: "Lawful Basis for Processing",
        content: (
          <>
            <p>
              Under the UK GDPR, we are required to have a lawful basis for processing your
              personal data. We rely on the following:
            </p>
            <ul>
              <li>
                <strong>Contract:</strong> to process your placement application, communicate with you about
                your enquiry, collect and submit documents on your behalf, and fulfil our
                obligations under our Terms and Conditions.
              </li>
              <li>
                <strong>Legitimate interests:</strong> to improve our website and services, analyse usage
                trends, maintain the security of our systems, and promote our services, where
                these interests are not overridden by your rights.
              </li>
              <li>
                <strong>Legal obligation:</strong> to comply with applicable laws, regulatory requirements, or
                lawful requests from authorities.
              </li>
              <li>
                <strong>Consent:</strong> where you have given us specific consent, for example, to use your
                testimonial or photographs in our marketing materials, or to receive marketing
                communications from us. You may withdraw consent at any time by contacting us
                at <a href="mailto:support@lumieramed.com">support@lumieramed.com</a>, although
                withdrawal does not affect the lawfulness of processing carried out before withdrawal.
              </li>
            </ul>
          </>
        ),
      },
      {
        number: "04",
        title: "Special Category Data (Health Information)",
        content: (
          <>
            <p>
              Health and immunisation records are classified as special category data under the
              UK GDPR, which carries additional legal protections. We collect this information
              solely where it is required by a Host Hospital or destination country as a condition
              of your Placement.
            </p>
            <p>We process this data on the following additional legal bases:</p>
            <ul>
              <li>
                <strong>Explicit consent:</strong> by providing your health and immunisation records to us, you
                give your explicit consent to our processing and sharing of that data with the
                relevant Host Hospital for the purpose of facilitating your Placement.
              </li>
              <li>
                <strong>Vital interests:</strong> in circumstances where sharing health information is necessary
                to protect your vital interests or those of others during a Placement.
              </li>
            </ul>
            <p>
              We will only share health data with Host Hospitals where it is strictly necessary
              and required by them. You may withdraw consent to the processing of your health
              data at any time by contacting{" "}
              <a href="mailto:support@lumieramed.com">support@lumieramed.com</a>, although
              this may affect our ability to arrange your Placement.
            </p>
          </>
        ),
      },
      {
        number: "05",
        title: "How We Use Your Information",
        content: (
          <>
            <p>We use the personal information we collect to:</p>
            <ul>
              <li>Respond to your enquiries and communicate with you about our services.</li>
              <li>Create and manage your account and Client Portal access.</li>
              <li>Process and manage your placement application, including matching you with suitable Host Hospitals, collecting and submitting your documents, and tracking progress through the Client Portal.</li>
              <li>Share your professional and academic documents (including your CV, transcript, personal statement and supporting documents) with Host Hospitals and relevant third parties solely for the purpose of facilitating your placement.</li>
              <li>Provide general guidance on related processes such as visa applications (noting that this is not immigration or legal advice).</li>
              <li>Send you service-related communications, including placement updates, document requests, and confirmations.</li>
              <li>Send you marketing communications where you have given consent, and manage your communication preferences.</li>
              <li>Maintain and improve the performance and security of our website and Client Portal.</li>
              <li>Analyse usage trends and visitor behaviour to improve user experience.</li>
              <li>Comply with our legal and regulatory obligations.</li>
              <li>Use your testimonial, name, and photographs in our marketing and on our website and social media channels, where you have given consent.</li>
            </ul>
            <p>
              We only use your information for purposes that are relevant and necessary, and
              will not use it in a way that is incompatible with the purpose for which it was collected.
            </p>
          </>
        ),
      },
      {
        number: "06",
        title: "Data Security",
        content: (
          <>
            <p>
              We take the security of your personal data seriously and implement appropriate
              technical and organisational measures to protect it against unauthorised access,
              loss, destruction, alteration, or disclosure. These measures include:
            </p>
            <ul>
              <li>Password-protected access to our Client Portal and internal systems.</li>
              <li>Secure transmission of data using encryption where appropriate.</li>
              <li>Limiting access to your personal data to those members of our team who need it to perform their role.</li>
              <li>Regularly reviewing our data handling practices and security measures.</li>
            </ul>
            <p>
              No method of electronic transmission or storage is completely secure. Whilst we
              take all reasonable steps to protect your information, we cannot guarantee absolute
              security. If you have reason to believe that your interaction with us is no longer
              secure, please notify us immediately at{" "}
              <a href="mailto:support@lumieramed.com">support@lumieramed.com</a>.
            </p>
            <p>
          {`    In the event of a personal data breach that is likely to result in a risk to your rights
              and freedoms, we will notify the Information Commissioner's Office (ICO) and,
              where required, you, in accordance with our obligations under the UK GDPR.`}
            </p>
          </>
        ),
      },
    ],
  },
  {
    label: "Sharing & International Transfers",
    sections: [
      {
        number: "07",
        title: "Cookies and Similar Technologies",
        content: (
          <>
            <p>
              Our website uses cookies and similar tracking technologies to improve functionality
              and user experience. Cookies help us understand how visitors interact with our site
              and allow us to remember preferences for future visits.
            </p>
            <p>
              You can control or disable cookies through your browser settings. Please note that
              disabling cookies may affect certain features of the website. For more information
              about the cookies we use, please refer to any cookie notice displayed on our website.
            </p>
          </>
        ),
      },
      {
        number: "08",
        title: "Sharing and Disclosure of Information",
        content: (
          <>
            <p>We do not sell or rent your personal information. We may share your information in the following circumstances:</p>

            <p><strong>Host Hospitals and placement partners:</strong></p>
            <p>
              As a core part of our service, we share your professional, academic and personal
              documents with Host Hospitals (including partner hospitals in China) for the purpose
              of assessing and facilitating your placement. This is necessary to perform our
              contract with you.
            </p>

            <p><strong>Third-party service providers:</strong></p>
            <p>
              We use trusted third-party tools to operate our services (see Clause 9). These
              providers process data on our behalf and are required to keep it secure and use it
              only for the purposes we specify.
            </p>

            <p><strong>Legal and regulatory requirements:</strong></p>
            <p>
              We may disclose your information where required to comply with a legal obligation,
              court order, or lawful request from a regulatory authority, or to protect the rights,
              safety, or property of LumieraMed or others.
            </p>

            <p><strong>Business transfers:</strong></p>
            <p>
              In the event of a merger, acquisition, or transfer of all or part of our business,
              your information may be transferred to the relevant third party, subject to equivalent
              privacy protections.
            </p>
          </>
        ),
      },
      {
        number: "09",
        title: "Third-Party Service Providers",
        content: (
          <>
            <p>
              We use the following categories of third-party service providers to help us operate
              our business. Each processes your data only as necessary for the specified purpose
              and is bound by appropriate data processing obligations:
            </p>
            <ul>
              <li><strong>Analytics providers:</strong> to help us understand how visitors use our website (e.g. Google Analytics or equivalent). Usage data such as pages visited and session duration may be collected.</li>
              <li><strong>Email and communication platforms:</strong> to send and manage email communications with you.</li>
              <li><strong>Payment processors:</strong> to securely process payment of the Placement Deposit and Hospital Fee. We do not store your full payment card details.</li>
              <li><strong>Website hosting and infrastructure providers:</strong> to host and maintain the LumieraMed website and Client Portal.</li>
            </ul>
            <p>
              We will update this clause as our technology stack develops. If you have questions
              about a specific provider, please contact us at{" "}
              <a href="mailto:support@lumieramed.com">support@lumieramed.com</a>.
            </p>
          </>
        ),
      },
      {
        number: "10",
        title: "International Data Transfers",
        content: (
          <p>
            Because we facilitate placements at hospitals in China, your personal data
            (including your CV, academic documents, identity documents, and where applicable
            health records) will be transferred to and processed by recipients located outside
            the United Kingdom and the European Economic Area. Where we transfer your data
            outside the UK, we take steps to ensure that appropriate safeguards are in place to
            protect your information, in accordance with UK GDPR requirements. By engaging
            our services and providing your information, you acknowledge that your data will be
            shared with Host Hospitals in China as described in this policy. If you have questions
            about the safeguards in place, please contact us at{" "}
            <a href="mailto:support@lumieramed.com">support@lumieramed.com</a>.
          </p>
        ),
      },
    ],
  },
  {
    label: "Accounts, Retention & Children",
    sections: [
      {
        number: "11",
        title: "Your Account & Client Portal",
        content: (
          <>
            <p>
              When you create an account with LumieraMed, we collect and store the
              registration information and activity data described in Clause 2. Your Client Portal
              is used to manage your placement application, upload documents, and communicate
              with our team.
            </p>

            <p><strong>Account activity logging:</strong></p>
            <p>
              We log account activity including login timestamps and document uploads for
              security purposes and to maintain an accurate record of your application progress.
              This data is not shared with third parties except as described in Clause 8.
            </p>

            <p><strong>Account suspension or termination:</strong></p>
            <p>
              We reserve the right to suspend or terminate your account where required under
              our Terms and Conditions. Upon termination of your engagement with us, we may
              retain your account data for the period set out in Clause 12, after which it will be
              securely deleted or anonymised. You will not be able to access the Client Portal
              after your account has been terminated.
            </p>

            <p><strong>Closing your account:</strong></p>
            <p>
              If you wish to close your account or request deletion of your Portal data, please
              contact us in writing at{" "}
              <a href="mailto:support@lumieramed.com">support@lumieramed.com</a>. We will
              process your request in accordance with your rights under Clause 15, subject to any
              legal obligation we have to retain certain records.
            </p>
          </>
        ),
      },
      {
        number: "12",
        title: "Data Retention",
        content: (
          <>
            <p>
              We retain your personal information only for as long as is necessary to fulfil the
              purposes set out in this policy, or as required by law. In practice:
            </p>
            <ul>
              <li>Placement application records (including documents, correspondence, and Client Portal data) are retained for a period of up to 6 years following the conclusion of your engagement with us, in line with standard UK limitation periods.</li>
              <li>Account data is retained for the duration of your engagement and for up to 6 years thereafter, unless you request earlier deletion and we are not legally required to retain it.</li>
              <li>Marketing consent records are retained until you withdraw consent.</li>
              <li>Technical and usage data collected via cookies is typically retained for a shorter period in line with the relevant cookie settings.</li>
            </ul>
            <p>
              Once information is no longer needed, we take reasonable steps to securely delete
              or anonymise it.
            </p>
          </>
        ),
      },
      {
        number: "13",
        title: "Children's Privacy",
        content: (
          <p>
            Our website and services are not intended for individuals under the age of 18. We
            do not knowingly collect personal information from children. If we become aware
            that personal data has been collected from a child without appropriate consent, we
            will take steps to delete it promptly.
          </p>
        ),
      },
      {
        number: "14",
        title: "Automated Decision-Making and Profiling",
        content: (
          <p>
            We do not make any decisions about you solely by automated means (including
            profiling) that produce legal or similarly significant effects. All placement matching
            and eligibility assessments are carried out manually by our team, taking into account
            the information you provide and the requirements of the relevant Host Hospital.
          </p>
        ),
      },
    ],
  },
  {
    label: "Your Rights & Communications",
    sections: [
      {
        number: "15",
        title: "Your Data Protection Rights",
        content: (
          <>
            <p>
              Under UK data protection law, you have the following rights in relation to your
              personal data:
            </p>
            <ul>
              <li><strong>Right of access:</strong> you may request a copy of the personal data we hold about you (a Subject Access Request).</li>
              <li><strong>Right to rectification:</strong> you may ask us to correct any inaccurate or incomplete personal data.</li>
              <li><strong>Right to erasure:</strong> {`you may ask us to delete your personal data in certain circumstances (the "right to be forgotten")`}.</li>
              <li><strong>Right to restrict processing:</strong> you may ask us to limit how we use your data in certain circumstances.</li>
              <li><strong>Right to data portability:</strong> you may ask us to provide your personal data in a structured, commonly used, machine-readable format.</li>
              <li><strong>Right to object:</strong> you may object to processing based on legitimate interests, or to direct marketing.</li>
              <li><strong>Right to withdraw consent:</strong> where processing is based on your consent, you may withdraw it at any time.</li>
              <li><strong>Right to complain:</strong>{` you have the right to lodge a complaint with the Information Commissioner's Office (ICO) at`} <a href="https://www.ico.org.uk" target="_blank" rel="noopener noreferrer">www.ico.org.uk</a> if you believe we have not handled your data in accordance with the law.</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us in writing at{" "}
              <a href="mailto:support@lumieramed.com">support@lumieramed.com</a>. We will
              respond within one month. We may need to verify your identity before fulfilling your
              request.
            </p>
          </>
        ),
      },
      {
        number: "16",
        title: "Marketing & Communications Preferences",
        content: (
          <>
            <p>
              From time to time, we may send you marketing communications about our services,
              new placement opportunities, or updates we think may be of interest to you. We will
              only do this where you have given your consent.
            </p>
            <p>You can opt out of marketing communications at any time by:</p>
            <ul>
              <li>Clicking the unsubscribe link in any marketing email we send you.</li>
              <li>Contacting us directly at <a href="mailto:support@lumieramed.com">support@lumieramed.com</a> and requesting to be removed from our mailing list.</li>
            </ul>
            <p>
              Please note that opting out of marketing communications does not affect
              service-related communications, such as placement updates, document requests,
              payment confirmations, or other messages necessary to manage your application.
              These will continue for as long as you are engaged with us.
            </p>
          </>
        ),
      },
    ],
  },
  {
    label: "Updates & Contact",
    sections: [
      {
        number: "17",
        title: "Third-Party Websites",
        content: (
          <p>
            Our website may contain links to third-party websites. We are not responsible for
            the privacy practices or content of those sites. We encourage you to read the
            privacy policies of any third-party services you use.
          </p>
        ),
      },
      {
        number: "18",
        title: "Updates to This Policy",
        content: (
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our
            practices, services or legal requirements. The current version will always be
            available at{" "}
            <a href="https://lumieramed.com/privacy-policy" target="_blank" rel="noopener noreferrer">
              https://lumieramed.com/privacy-policy
            </a>. Where changes are material, we will take reasonable steps to bring them to
            your attention. Continued use of our website or services after any update constitutes
            acceptance of the revised policy.
          </p>
        ),
      },
      {
        number: "19",
        title: "Closing Your Account & Requesting Data Deletion",
        content: (
          <>
            <p>
              If you wish to close your LumieraMed account or request that we delete your
              personal data, please follow these steps:
            </p>
            <ul>
              <li>
                <strong>Step 1 — Contact us:</strong> send a written request to{" "}
                <a href="mailto:support@lumieramed.com">support@lumieramed.com</a>{` with the
                subject line "Account Closure / Data Deletion Request". Please include your full
                name and the email address associated with your account.`}
              </li>
              <li>
                <strong>Step 2 — Identity verification:</strong> we may ask you to verify your identity
                before processing your request, to ensure we do not delete data at the request
                of an unauthorised person.
              </li>
              <li>
                <strong>Step 3 — Processing:</strong> we will confirm receipt of your request within 5
                working days and aim to complete it within one month. Where we are legally
                required to retain certain records (for example, for a period of up to 6 years under
                UK law), we will inform you of this and explain what data we must keep and why.
              </li>
            </ul>
            <p>
              Closing your account will result in the termination of your Client Portal access. Any
              active placement engagement will also be terminated, and the refund terms set out
              in our Terms and Conditions will apply.
            </p>
          </>
        ),
      },
      {
        number: "20",
        title: "Contact Us",
        content: (
          <>
            <p>
              If you have any questions or concerns about this Privacy Policy, or about how we
              handle your personal information, please contact us:
            </p>
            <ul>
              <li><strong>LumieraMed Ltd</strong></li>
              <li>Email: <a href="mailto:support@lumieramed.com">support@lumieramed.com</a></li>
              <li>Website: <a href="https://lumieramed.com" target="_blank" rel="noopener noreferrer">https://lumieramed.com</a></li>
            </ul>
            <p>
             {` If you are not satisfied with our response, you have the right to contact the
              Information Commissioner's Office (ICO) at`}{" "}
              <a href="https://www.ico.org.uk" target="_blank" rel="noopener noreferrer">www.ico.org.uk</a>{" "}
              or by calling 0303 123 1113.
            </p>
          </>
        ),
      },
    ],
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
        transition: `opacity 0.55s ease ${index * 0.04}s, transform 0.55s ease ${index * 0.04}s`,
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

let globalIndex = 0;

export default function PrivacyPolicyPage() {
  globalIndex = 0;
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
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
          padding: 160px 64px 64px;
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

        /* GROUP LABEL */
        .group-label {
          padding: 40px 64px 0;
          font-size: 1.25rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--teal);
          opacity: 0.8;
        }

        /* SECTIONS */
        .sections {
          padding: 8px 64px 80px;
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
          .hero { padding: 130px 24px 52px; }
          .intro { padding: 40px 24px 36px; }
          .group-label { padding: 32px 24px 0; }
          .sections { padding: 8px 24px 60px; }
          .section-row { grid-template-columns: 1fr; gap: 6px; padding: 32px 0; }
          .section-num { padding-top: 0; }
          .contact-callout { margin: 0 24px 48px; }
        }
      ` }} />

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
              <span className="hero-chip-value">June 2026</span>
            </div>
            <div className="hero-chip">
              <span className="hero-chip-label">Applies To</span>
              <span className="hero-chip-value">All LumieraMed Services</span>
            </div>
            <div className="hero-chip">
              <span className="hero-chip-label">Sections</span>
              <span className="hero-chip-value">20 Clauses</span>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <div className="intro">
          <div className="intro-inner">
            <p>
              At <strong>LumieraMed</strong>, we value your trust and are committed to protecting
              your privacy. This Privacy Policy explains how LumieraMed Ltd (company number
              16668686, registered in England and Wales) collects, uses, stores, shares and
              protects your personal information when you visit our website at{" "}
              <strong>https://lumieramed.com</strong> or engage our placement services. It should
              be read alongside our{" "}
              <a href="https://lumieramed.com/terms" target="_blank" rel="noopener noreferrer" style={{ color: "var(--teal)", fontWeight: 500 }}>
                Terms and Conditions
              </a>
              . We process your personal data in accordance with the UK General Data
              Protection Regulation (UK GDPR) and the Data Protection Act 2018.
            </p>
          </div>
        </div>

        {/* GROUPED SECTIONS */}
        {groups.map((group) => {
          return (
            <div key={group.label}>
              <div className="group-label">{group.label}</div>
              <main className="sections">
                {group.sections.map((s) => {
                  const idx = globalIndex++;
                  return <Section key={s.number} {...s} index={idx} />;
                })}
              </main>
            </div>
          );
        })}

        {/* CONTACT CALLOUT */}
        <div className="contact-callout">
          <div className="contact-callout-text">
            <h3>Have questions about your privacy?</h3>
            <p>
              Contact us at support@lumieramed.com or reach the ICO at www.ico.org.uk.
            </p>
          </div>
          <a href="mailto:support@lumieramed.com" className="contact-btn">
            Contact Us →
          </a>
        </div>

      </div>
    </>
  );
}