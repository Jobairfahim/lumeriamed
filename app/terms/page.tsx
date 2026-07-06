"use client";

import { useEffect, useRef, useState } from "react";

const groups = [
  {
    label: "Introduction & Definitions",
    sections: [
      {
        number: "01",
        title: "About Us",
        content: (
          <p>
            LumieraMed Ltd is a company registered in England and Wales under company number 16668686. Wherever these
            Terms refer to <strong>&quot;LumieraMed&quot;</strong>, <strong>&quot;we&quot;</strong>, <strong>&quot;us&quot;</strong> or{" "}
            <strong>&quot;our&quot;</strong>, they mean LumieraMed Ltd. You can contact us at any time by email at{" "}
            <a href="mailto:support@lumieramed.com">support@lumieramed.com</a>.
          </p>
        ),
      },
      {
        number: "02",
        title: "These Terms",
        content: (
          <p>
            These Terms, together with our Privacy Policy and any Placement Confirmation (as defined in Clause 3) we
            issue to you, form the entire agreement between you and us in relation to your use of the Website and our
            Services, and supersede any prior discussions, representations or arrangements. In the event of any
            conflict, a Placement Confirmation takes precedence over these Terms, and these Terms take precedence over
            any other communication. We may update these Terms from time to time in accordance with Clause 34.
          </p>
        ),
      },
      {
        number: "03",
        title: "Definitions",
        content: (
          <>
            <p>In these Terms, the following words have the following meanings:</p>
            <ul>
              <li><strong>&quot;Client&quot;, &quot;You&quot;, &quot;Your&quot;</strong> means the individual who accesses the Website, submits an enquiry, or engages our Services.</li>
              <li><strong>&quot;Company&quot;, &quot;We&quot;, &quot;Us&quot;, &quot;Our&quot;, &quot;LumieraMed&quot;</strong> means LumieraMed Ltd.</li>
              <li><strong>&quot;Services&quot;</strong> means the clinical elective placement search, facilitation and related support services described in Clause 6.</li>
              <li><strong>&quot;Placement&quot;</strong> means a clinical elective placement at a Host Hospital that we help to identify and arrange on your behalf.</li>
              <li><strong>&quot;Host Hospital&quot;</strong> means a hospital or clinical institution (including our partner hospitals in China) at which a Placement may take place.</li>
              <li><strong>&quot;Placement Deposit&quot;</strong> means our facilitation fee of £250, payable to commence the placement process, as set out in Clauses 16 and 18.</li>
              <li><strong>&quot;Hospital Fee&quot;</strong> means the fee payable in respect of a Host Hospital&apos;s charges for hosting a Placement, which varies by hospital and duration, as set out in Clause 16. The Hospital Fee is payable to LumieraMed, who pays the Host Hospital on your behalf.</li>
              <li><strong>&quot;Add-on Services&quot;</strong> means optional extra services (such as help arranging accommodation or logistics support) that we may offer for an additional fee.</li>
              <li><strong>&quot;Confirmation&quot;</strong> means the point at which a suitable Placement has been identified and formally offered to you.</li>
              <li><strong>&quot;Placement Confirmation&quot;</strong> means the written confirmation we issue to you at Confirmation, setting out the specific details of your Placement (see Clause 7).</li>
              <li><strong>&quot;Client Portal&quot;</strong> means the password-protected area of the Website through which you may view and track the progress of your Placement application.</li>
              <li><strong>&quot;Party&quot; / &quot;Parties&quot;</strong> means either you or us individually, or both collectively.</li>
            </ul>
            <p>
              References to &quot;writing&quot; include email. Headings are for convenience only and do not affect
              interpretation. &quot;Including&quot; and &quot;in particular&quot; do not limit the generality of any
              preceding words.
            </p>
          </>
        ),
      },
      {
        number: "04",
        title: "Eligibility & Capacity",
        content: (
          <>
            <p>By engaging our Services you confirm that:</p>
            <ul>
              <li>you are at least 18 years old and have the legal capacity to enter into a binding contract;</li>
              <li>you are a current medical student, or are otherwise eligible for a clinical elective as required by the relevant Host Hospital;</li>
              <li>you are able to meet the eligibility, documentation, language, health and conduct requirements of the relevant Host Hospital and destination country; and</li>
              <li>you are not aware of any matter — including any criminal record, disciplinary finding, fitness-to-practise issue, immigration history or health condition — that would or might prevent you from being accepted for, travelling to, or safely undertaking a Placement.</li>
            </ul>
            <p>
              Placements are at all times subject to the eligibility criteria and approval of the relevant Host
              Hospital, which are outside our control and may change. We may decline to provide, or may suspend or
              withdraw, our Services where we reasonably believe any of the above is not satisfied.
            </p>
          </>
        ),
      },
      {
        number: "05",
        title: "Accounts & Client Portal",
        content: (
          <>
            <p>
              To use certain parts of our Services, you may be required to create an account and access our Client
              Portal. When you create an account, you agree to:
            </p>
            <ul>
              <li>provide accurate and complete registration information, and keep it up to date;</li>
              <li>keep your login credentials (including your password) confidential and not share them with any other person;</li>
              <li>notify us immediately at support@lumieramed.com if you become aware of any unauthorised access to or use of your account;</li>
              <li>accept responsibility for all activity that occurs under your account, whether or not authorised by you.</li>
            </ul>
            <p>
              The Client Portal allows you to view the status and progress of your Placement application, upload
              documents, and communicate with us. Information displayed on the Client Portal (including application
              status, timelines and progress updates) is provided for your convenience and general guidance only; it
              does not constitute a contractual commitment, guarantee or promise regarding the outcome, timing or
              availability of any Placement. We aim to keep the Portal accurate and up to date, but we do not warrant
              that the information displayed will be complete, current or error-free at all times.
            </p>
            <p>
              We reserve the right to suspend or terminate your account at any time, with or without notice, if we
              reasonably believe you have breached these Terms, if the engagement has ended, or for security reasons.
              Upon termination of the engagement, we may retain or delete your account and any data within it in
              accordance with our Privacy Policy. You must not attempt to access the Client Portal after your account
              has been terminated.
            </p>
          </>
        ),
      },
    ],
  },
  {
    label: "Our Service",
    sections: [
      {
        number: "06",
        title: "Scope of Service",
        content: (
          <>
            <p>
              LumieraMed provides a clinical elective placement search and facilitation service. We act as a
              facilitator and intermediary only.
            </p>
            <p><strong>What we provide:</strong></p>
            <ul>
              <li>Identification of potential clinical elective opportunities at Host Hospitals based on the information you provide;</li>
              <li>Liaison with Host Hospitals and relevant third parties to facilitate introductions and applications;</li>
              <li>Assistance with the collection and submission of documents required by the Host Hospital, and eligibility checks;</li>
              <li>Guidance and support throughout the placement process, including general (non-advisory) guidance on related steps such as visa applications.</li>
            </ul>
            <p><strong>What we are not, and do not do:</strong></p>
            <p>
              We are not a hospital, medical school, university, training provider, recruitment or employment agency,
              travel agent, insurer, or immigration or legal adviser. We do not provide medical training, supervision,
              teaching or clinical instruction; we do not arrange visas, travel or insurance; and we do not arrange
              accommodation except where expressly agreed as an Add-on Service. The clinical experience, supervision,
              teaching, facilities and conduct of any Placement are the sole responsibility of the Host Hospital.
            </p>
            <p><strong>What we do not guarantee:</strong></p>
            <ul>
              <li>That a Placement will be secured, or that any specific Host Hospital, specialty, location, department, start date, duration or pace of placement will be available;</li>
              <li>That any application, visa, permit or other approval will be granted, or granted within any particular timeframe;</li>
              <li>Any particular outcome of a Placement, or that a Placement will be recognised, credited or accredited by your university or any other body.</li>
            </ul>
            <p>
              By engaging our Services you acknowledge that the outcome of any placement search depends on Host
              Hospital availability, eligibility and acceptance, and on third parties and circumstances beyond our
              control.
            </p>
          </>
        ),
      },
      {
        number: "07",
        title: "The Placement Process & Placement Confirmation",
        content: (
          <>
            <p>The placement process typically follows these stages, although they may vary by Host Hospital:</p>
            <ul>
              <li>Enquiry and initial discussion of your requirements, availability and preferences;</li>
              <li>Payment of the Placement Deposit to commence the search;</li>
              <li>Sourcing and matching with a suitable Host Hospital, and collection and submission of required documents;</li>
              <li>Confirmation — a suitable Placement is identified and formally offered to you, and the applicable Hospital Fee is quoted;</li>
              <li>We issue a Placement Confirmation to you, setting out the Host Hospital, specialty or department, agreed dates, duration, the Hospital Fee, and any other material terms;</li>
              <li>Acceptance, payment of the Hospital Fee (on the terms set out in the Placement Confirmation), and completion of any remaining requirements;</li>
              <li>Pre-departure preparations (which are your responsibility), and the Placement itself.</li>
            </ul>
            <p>
              The Placement Confirmation records the specific details of your Placement and, together with these
              Terms, forms the basis of our agreement for that Placement. We recommend you allow a lead time of at
              least 8 to 12 weeks before your intended start date. We are not responsible for outcomes affected by
              late enquiries, delayed responses, or incomplete or inaccurate information.
            </p>
          </>
        ),
      },
      {
        number: "08",
        title: "Nature of Placements",
        content: (
          <p>
            Placements facilitated by LumieraMed are educational clinical electives, not employment. Nothing in these
            Terms, and nothing communicated by LumieraMed verbally or in writing, constitutes a guarantee of a
            placement, an offer of employment, a salary or wage, or a promise of any specific outcome. You will not be
            an employee, worker or agent of LumieraMed or, unless the Host Hospital expressly agrees otherwise, of the
            Host Hospital. LumieraMed acts solely as a facilitator and is not an employment or recruitment agency.
          </p>
        ),
      },
    ],
  },
  {
    label: "Your Obligations",
    sections: [
      {
        number: "09",
        title: "Information & Documentation",
        content: (
          <>
            <p>
              You are responsible for providing true, accurate, complete and up-to-date information and documents,
              both at the outset and throughout the process, and for informing us promptly of any change. You warrant
              that all information and documents you provide are genuine, valid and your own. Typical documents
              include a passport copy, academic transcript, letter of good standing or enrolment, CV, personal
              statement, proof of language proficiency, and medical or immunisation records; exact requirements vary
              by Host Hospital.
            </p>
            <p>
              We are entitled to rely on the information you provide, and we are not liable for any consequence of
              information that is false, misleading, incomplete or out of date. Providing false or misleading
              information may result in withdrawal of our Services and forfeiture of the Placement Deposit, and may be
              reported to the relevant Host Hospital or authorities.
            </p>
          </>
        ),
      },
      {
        number: "10",
        title: "Communication & Responsiveness",
        content: (
          <p>
            You agree to respond to communications from LumieraMed within a reasonable timeframe (we recommend within
            3 working days unless otherwise agreed) and to keep us informed of any changes to your circumstances,
            availability or requirements. Delays in responding may result in missed opportunities, changes to Host
            Hospital availability, or delay to your Placement, for which we are not responsible.
          </p>
        ),
      },
      {
        number: "11",
        title: "Conduct & Professional Standards",
        content: (
          <>
            <p>While engaging our Services and during any Placement, you agree to:</p>
            <ul>
              <li>Conduct yourself professionally, lawfully and with appropriate maturity and cultural sensitivity at all times;</li>
              <li>Comply with the policies, rules, supervision, dress code, professional standards and code of conduct of the Host Hospital;</li>
              <li>Comply with the laws of the destination country and respect local customs;</li>
              <li>Not bring LumieraMed or any Host Hospital into disrepute.</li>
            </ul>
            <p>
              Host Hospitals may suspend or terminate a Placement for misconduct or breach of their rules. Where a
              Placement is curtailed or cancelled because of your conduct, you will not be entitled to any refund, and
              you will remain responsible for any costs incurred.
            </p>
          </>
        ),
      },
      {
        number: "12",
        title: "Visas, Immigration & Travel",
        content: (
          <p>
            You are solely responsible for obtaining and holding a valid passport and the correct visa, entry
            clearance and any permissions required to travel to and undertake a Placement, and for meeting all entry,
            immigration and legal requirements of the destination country. You are responsible for arranging and
            paying for your own travel. Any guidance we provide on visa or immigration matters is general information
            only and is not immigration or legal advice; you should verify requirements with the relevant embassy,
            consulate or authority. We are not liable for any refusal, delay, revocation or condition of any visa or
            entry clearance, or for any consequence of your failure to obtain the correct documentation.
          </p>
        ),
      },
      {
        number: "13",
        title: "Insurance",
        content: (
          <p>
            You must obtain and maintain, at your own cost, appropriate travel and medical insurance for the full
            duration of your Placement before you travel. Your insurance should provide adequate cover for the
            activities involved in a clinical elective, including medical treatment, emergency repatriation, personal
            liability, and cancellation or curtailment. It is your responsibility to ensure your cover is suitable. We
            do not provide insurance and are not responsible for any loss, liability or expense that would have been
            covered by appropriate insurance.
          </p>
        ),
      },
      {
        number: "14",
        title: "Health, Fitness & Vaccinations",
        content: (
          <p>
            You are responsible for ensuring that you are medically fit to undertake the Placement and for complying
            with all health, vaccination, screening and immunisation requirements of the Host Hospital and destination
            country. You should obtain appropriate medical advice before travelling. You agree to disclose to us and
            to the Host Hospital, where required, any health condition relevant to your ability to undertake the
            Placement safely. We are not responsible for any health consequence arising during travel or a Placement,
            and you participate at your own risk as set out in Clause 23.
          </p>
        ),
      },
      {
        number: "15",
        title: "Confidentiality & Patient Data",
        content: (
          <>
            <p>
              A Placement may give you access to confidential information, including patient information and the
              confidential or proprietary information of a Host Hospital. You agree to:
            </p>
            <ul>
              <li>keep all such information strictly confidential and use it only as permitted by the Host Hospital;</li>
              <li>comply with all applicable data protection, privacy and medical confidentiality laws (including, where applicable, Chinese data protection law) and the Host Hospital&apos;s own policies;</li>
              <li>not photograph, record, copy, remove or publish (including on social media) any patient information, confidential material, or any material that could identify a patient or breach their privacy.</li>
            </ul>
            <p>
              This obligation continues after the Placement ends and is not limited in time. You are solely
              responsible for any breach of confidentiality or patient privacy by you, and you will indemnify us in
              respect of any such breach as set out in Clause 26.
            </p>
          </>
        ),
      },
    ],
  },
  {
    label: "Fees, Payment & Refunds",
    sections: [
      {
        number: "16",
        title: "Fees",
        content: (
          <>
            <p>
              <strong>Placement Deposit (£250).</strong> To commence the placement process you must pay a Placement
              Deposit of £250 to LumieraMed. This is our facilitation fee, and is separate from and in addition to the
              Hospital Fee and any Add-on Services.
            </p>
            <p>
              <strong>Hospital Fee.</strong> Each Host Hospital charges its own fee for hosting a Placement. This
              varies by hospital and by the length of your Placement, and typically ranges from £500 to £2,000. The
              applicable Hospital Fee will be quoted to you at or before Confirmation and set out in your Placement
              Confirmation, before you are asked to commit. The Hospital Fee is payable to LumieraMed; we collect it
              and pay the Host Hospital on your behalf.
            </p>
            <p>
              <strong>Add-on Services.</strong> We may be able to help you arrange accommodation, logistics or other
              support for an additional fee, which will be quoted separately and agreed in advance. Add-on Services
              are subject to third-party availability and we act as a facilitator in arranging them, not as the
              provider.
            </p>
            <p>
              <strong>Not included.</strong> Unless expressly stated in writing, our fees do not include travel,
              flights, visas, insurance, accommodation (unless agreed as an Add-on Service), vaccinations, living
              costs, or any fee, deposit or charge payable directly to an embassy, third party or authority. You are
              responsible for all such costs.
            </p>
          </>
        ),
      },
      {
        number: "17",
        title: "Payment Terms",
        content: (
          <>
            <p>All fees are stated in pounds sterling (GBP) and, where applicable, are inclusive of any UK taxes unless stated otherwise:</p>
            <ul>
              <li>You are responsible for any bank charges, currency conversion costs, payment-processor fees or third-party transaction charges;</li>
              <li>Fees must be paid by the method and by the due date we notify to you. We are not obliged to commence or continue work until payment has been received in full;</li>
              <li>All amounts are payable in full without deduction, set-off or counterclaim;</li>
              <li>If you initiate a chargeback or payment dispute in respect of a fee that is properly due and non-refundable under these Terms, you agree to reimburse us for the disputed amount and any associated costs (including bank or processor charges) we incur as a result;</li>
              <li>We may change our fees from time to time, but any change will not affect a Placement for which you have already paid the Placement Deposit.</li>
            </ul>
          </>
        ),
      },
      {
        number: "18",
        title: "Deposit & Refund Policy",
        content: (
          <>
            <p>
              The £250 Placement Deposit is required to commence the placement search process. The following
              conditions apply:
            </p>
            <ul>
              <li>The Placement Deposit is refundable only in the event that LumieraMed is wholly unable to identify or secure a suitable Placement on your behalf;</li>
              <li>Once a Placement has been identified and formally offered to you (Confirmation), the Placement Deposit becomes non-refundable, regardless of whether you choose to accept the Placement or proceed further, because at that point our facilitation service has been substantially performed;</li>
              <li>Dissatisfaction with a Placement that falls within the agreed scope of service does not constitute grounds for a refund;</li>
              <li>The Placement Deposit is non-refundable where a Placement cannot proceed, is withdrawn, curtailed or cancelled as a result of your own act or omission, including where you provide false or incomplete information, fail to provide required documents, fail to meet a Host Hospital&apos;s requirements, fail to obtain a visa, withdraw after Confirmation, or breach these Terms;</li>
              <li>Any refund request under the eligible condition must be made in writing to support@lumieramed.com within 14 days of our written confirmation that no Placement could be found. Eligible refunds will be made to the original payment method within 14 days of our agreeing the refund.</li>
            </ul>
            <p>
              <strong>Hospital Fee.</strong> The Hospital Fee is collected by us and paid onward to the Host Hospital
              on your behalf. Once the Hospital Fee has been paid to the Host Hospital, it is non-refundable under any
              circumstances, including if you cancel, withdraw, fail to attend, or your Placement is curtailed or
              cancelled as a result of your own act or omission. If you cancel before the Hospital Fee has been paid
              onward to the Host Hospital, we will refund the Hospital Fee to you less any irrecoverable costs or
              charges already incurred. You should therefore not pay the Hospital Fee until you are certain you wish
              to proceed.
            </p>
            <p>
              <strong>Add-on Services.</strong> Refunds of fees for Add-on Services depend on the terms of the
              relevant third-party provider. We will use reasonable efforts to recover amounts on your behalf but
              cannot guarantee a refund.
            </p>
            <p>Nothing in this Clause affects your statutory rights as a consumer (see Clause 19).</p>
          </>
        ),
      },
      {
        number: "19",
        title: "Your Right to Cancel (Consumers)",
        content: (
          <>
            <p>
              If you are a consumer in the UK, you ordinarily have the right to cancel a contract for services made at
              a distance within 14 days, under the Consumer Contracts (Information, Cancellation and Additional
              Charges) Regulations 2013, without giving a reason.
            </p>
            <p>
              Because our Services are usually time-sensitive, by paying the Placement Deposit and asking us to begin
              the placement process, you expressly request that we begin providing the Services during the 14-day
              cancellation period. You acknowledge that:
            </p>
            <ul>
              <li>if you cancel during the 14-day period but before the Services are fully performed, we may charge you a reasonable amount for the work we have already carried out; and</li>
              <li>once the Services have been fully performed (that is, once a suitable Placement has been confirmed and offered to you), you will lose your right to cancel, and the Placement Deposit will be non-refundable.</li>
            </ul>
            <p>
              To cancel within the 14-day period, please notify us in writing at{" "}
              <a href="mailto:support@lumieramed.com">support@lumieramed.com</a>. This Clause does not affect any of
              your statutory rights that cannot lawfully be excluded.
            </p>
          </>
        ),
      },
      {
        number: "20",
        title: "Changes & Cancellation by You",
        content: (
          <p>
            If, after Confirmation, you wish to change the dates, duration, specialty or Host Hospital of a Placement,
            we will use reasonable efforts to accommodate your request, but we cannot guarantee that changes will be
            possible. Any change is subject to Host Hospital agreement and may incur additional fees (including any
            difference in Hospital Fee or charges imposed by the Host Hospital for changing arrangements). If you
            cancel after Confirmation, the Placement Deposit is non-refundable, and the refundability of the Hospital
            Fee is governed by Clause 18.
          </p>
        ),
      },
      {
        number: "21",
        title: "Changes & Cancellation by Us or the Host Hospital",
        content: (
          <p>
            Placements depend on third parties. A Host Hospital may, for reasons outside our control, alter,
            postpone, decline, curtail or cancel a Placement at any time. We are not responsible for such decisions,
            but we will use reasonable efforts to notify you promptly and, where possible and at your request, to
            seek a suitable alternative. We may also decline, suspend or cancel our Services and any Placement where
            required by a Host Hospital, by law, by circumstances beyond our reasonable control (see Clause 28), or
            where you are in breach of these Terms. Where we cancel our Services for a reason that is not your fault
            and before Confirmation, we will refund the Placement Deposit. Where we cancel after the Hospital Fee has
            been paid to the Host Hospital for a reason that is not your fault, you acknowledge that the Hospital Fee
            is non-refundable once paid to the Host Hospital and we cannot guarantee its recovery; however, we will
            use reasonable efforts on your behalf to seek a refund or credit from the Host Hospital, and will pass on
            to you any amount we recover.
          </p>
        ),
      },
      {
        number: "22",
        title: "Termination",
        content: (
          <>
            <p>Either Party may terminate the engagement by written notice to the other. Upon termination:</p>
            <ul>
              <li>If you terminate before a Placement has been identified, the Placement Deposit is non-refundable;</li>
              <li>If we terminate due to your breach of these Terms, the Placement Deposit is non-refundable and you remain liable for any costs incurred;</li>
              <li>If we terminate for a reason not attributable to your conduct and before a Placement has been identified, the Placement Deposit will be refunded;</li>
              <li>The refundability of the Hospital Fee on termination is governed by Clause 18;</li>
              <li>Termination does not affect any rights or obligations that have already arisen, and any Clause intended to survive termination (see Clause 37) continues in force.</li>
            </ul>
          </>
        ),
      },
    ],
  },
  {
    label: "Risk, Liability & Third Parties",
    sections: [
      {
        number: "23",
        title: "Assumption of Risk",
        content: (
          <p>
            You acknowledge that international travel and participation in a clinical environment carry inherent
            risks, including risks to your health and safety. You voluntarily accept those risks and undertake any
            Placement, and any associated travel, at your own risk. You are responsible for your own safety, decisions
            and conduct at all times during travel and during a Placement. Nothing in this Clause excludes or limits
            any liability that cannot lawfully be excluded, including liability for death or personal injury caused by
            our negligence, or for fraud or fraudulent misrepresentation.
          </p>
        ),
      },
      {
        number: "24",
        title: "Host Hospitals & Third-Party Providers",
        content: (
          <p>
            Host Hospitals and any third-party providers (including accommodation, transport, insurance and
            visa-service providers) are independent third parties and are not controlled, employed or supervised by
            us. We select Host Hospital partners with care, but we are not responsible for their acts, omissions,
            decisions, standards, facilities, supervision, conduct, solvency, compliance or clinical practice, or for
            the quality, content, safety or outcome of any Placement or service they provide. Any agreement relating
            to a Placement or third-party service is between you and that third party, and is subject to their own
            terms. We do not accept liability for the alteration, postponement, curtailment, withdrawal or
            cancellation of a Placement or service by a Host Hospital or third party.
          </p>
        ),
      },
      {
        number: "25",
        title: "Limitation of Liability",
        content: (
          <>
            <p>
              Nothing in these Terms limits or excludes our liability for death or personal injury caused by our
              negligence, for fraud or fraudulent misrepresentation, for breach of the terms implied by the Consumer
              Rights Act 2015, or for any other liability that cannot lawfully be excluded or limited.
            </p>
            <p>Subject to the paragraph above, and to the fullest extent permitted by law:</p>
            <ul>
              <li>we are not liable for the conduct, decisions, acts or omissions of any Host Hospital, institution or other third party;</li>
              <li>we are not liable for any indirect, special or consequential loss, or for any loss of income, opportunity, profit, data, goodwill, savings or career progression, or for any loss arising from a failed, unsuccessful, altered or cancelled placement search or Placement;</li>
              <li>we are not liable for any loss or damage arising from any matter that is your responsibility under these Terms (including Clauses 9–15), or from any event outside our reasonable control;</li>
              <li>we are not liable for any loss, liability or expense that would have been covered by appropriate insurance that you were required to hold under Clause 13;</li>
              <li>our total aggregate liability to you arising out of or in connection with these Terms and our Services, whether in contract, tort (including negligence), breach of statutory duty or otherwise, shall not exceed the total amount of the Placement Deposit and Hospital Fee actually paid by you to us in respect of the relevant Placement.</li>
            </ul>
            <p>
              We provide the Services to you as a consumer. We are not liable for any business loss. Each provision of
              this Clause operates separately, and if any part of it is found to be unenforceable the remaining parts
              continue in force.
            </p>
          </>
        ),
      },
      {
        number: "26",
        title: "Indemnity",
        content: (
          <>
            <p>
              You agree to indemnify us, and keep us indemnified, against all claims, demands, losses, liabilities,
              damages, costs and expenses (including reasonable legal fees) that we incur arising out of or in
              connection with:
            </p>
            <ul>
              <li>your breach of these Terms;</li>
              <li>any false, inaccurate or incomplete information or documents you provide;</li>
              <li>your conduct during a Placement, or any breach of a Host Hospital&apos;s rules, policies or code of conduct;</li>
              <li>your breach of confidentiality, patient privacy or data protection obligations;</li>
              <li>any claim by a Host Hospital or third party arising from your acts or omissions; or</li>
              <li>your breach of any applicable law.</li>
            </ul>
          </>
        ),
      },
      {
        number: "27",
        title: "Disclaimer of Warranties",
        content: (
          <p>
            The Website, the Client Portal and their content are provided on an &quot;as is&quot; and &quot;as
            available&quot; basis. To the fullest extent permitted by law, we exclude all representations,
            warranties, conditions and terms (whether express or implied by statute, common law or otherwise) relating
            to the Website, the Client Portal and their content, including as to accuracy, completeness, reliability
            or fitness for a particular purpose. We do not warrant that the Website or Client Portal will be
            uninterrupted, timely, secure or error-free, or free of viruses or other harmful components. This Clause
            does not affect the statutory rights of a consumer.
          </p>
        ),
      },
      {
        number: "28",
        title: "Force Majeure",
        content: (
          <p>
            We shall not be liable for any failure or delay in performing our obligations where such failure or delay
            results from circumstances beyond our reasonable control, including (without limitation) acts of God,
            epidemics or pandemics, government action, changes in law or immigration policy, border closures, natural
            disasters, industrial action, war, terrorism, civil unrest, failure of utilities or telecommunications, or
            the failure, insolvency, alteration, withdrawal or cancellation of a Host Hospital or other third party.
            In such circumstances we will notify you as soon as reasonably practicable and resume performance as soon
            as we are reasonably able. If the event continues for more than 60 days, either Party may terminate the
            engagement by written notice, in which case the refund provisions of Clause 18 apply.
          </p>
        ),
      },
    ],
  },
  {
    label: "Website & Content",
    sections: [
      {
        number: "29",
        title: "Intellectual Property Rights",
        content: (
          <>
            <p>
              Unless otherwise stated, LumieraMed and/or its licensors own all intellectual property rights in all
              content, materials, branding, text, graphics, logos and functionality on this Website and the Client
              Portal. All rights are reserved. You may access and use the Website for your own personal,
              non-commercial use only. You must not:
            </p>
            <ul>
              <li>Republish, sell, rent or sub-license any part of the Website or its content;</li>
              <li>Reproduce, duplicate or copy any part of the Website or its content;</li>
              <li>Frame or redistribute any part of the Website without our prior written consent.</li>
            </ul>
            <p>The LumieraMed name and logo are our property and may not be used without permission.</p>
          </>
        ),
      },
      {
        number: "30",
        title: "User Content & Testimonials",
        content: (
          <>
            <p>
              Certain areas of the Website may allow you to submit content, including comments, reviews or feedback
              (&quot;User Content&quot;). By submitting User Content you confirm that you own or have the right to
              submit it, and that it is not unlawful, defamatory, misleading, offensive or in breach of any third
              party&apos;s rights.
            </p>
            <p>
              You grant LumieraMed a non-exclusive, royalty-free, worldwide, perpetual licence to use, store,
              reproduce, adapt, publish and distribute your User Content for the purpose of operating, promoting and
              improving our Services. Where you provide a testimonial, you consent to our using it (including your
              first name and country) in our marketing unless you tell us otherwise.
            </p>
            <p>
              Where you provide or consent to photographs or videos of you taken during a Placement or in connection
              with our Services, you grant us permission to use those images in our marketing, on the Website and on
              our social media channels, unless you notify us in writing that you wish to withdraw that consent. We
              may remove or decline to publish any User Content at our discretion.
            </p>
          </>
        ),
      },
      {
        number: "31",
        title: "Cookies",
        content: (
          <p>
            We use cookies and similar technologies to operate the Website, enhance user experience and analyse
            website performance. By using our Website, you consent to our use of cookies in accordance with our
            Privacy Policy and any cookie notice displayed on the Website.
          </p>
        ),
      },
      {
        number: "32",
        title: "Links & Third-Party Websites",
        content: (
          <>
            <p>
              Government agencies, search engines, news organisations and online directories may link to our Website
              without prior approval. Other organisations may request approval to link to us; approved links must not
              be misleading, must not imply endorsement, and must be contextually relevant. We may request the removal
              of any link to our Website at any time, and you agree to remove such links promptly upon request.
            </p>
            <p>
              The Website may also contain links to third-party websites, which are provided for convenience only; we
              do not control and are not responsible for their content, products, services or privacy practices. You
              agree to indemnify us against any claim arising from content on a website you operate that links to
              ours.
            </p>
          </>
        ),
      },
    ],
  },
  {
    label: "Data, Disputes & General",
    sections: [
      {
        number: "33",
        title: "Data Protection & Privacy",
        content: (
          <p>
            In providing our Services, LumieraMed collects and processes personal information including your name,
            contact details, professional qualifications, CV and the documents required for a Placement. Where
            necessary to arrange a Placement, this information may be shared with Host Hospitals and other third
            parties (which may include parties outside the UK) solely for the purpose of facilitating your Placement.
            By engaging our Services and providing your information, you acknowledge and agree to this sharing. We
            process your personal data in accordance with our Privacy Policy and applicable UK data protection law,
            including the UK GDPR and the Data Protection Act 2018. Full details of how we collect, store, use and
            share your data, and of your rights (including access, correction and deletion), are set out in our{" "}
            <a href="https://lumieramed.com/privacy-policy">Privacy Policy</a>, which forms part of these Terms.
          </p>
        ),
      },
      {
        number: "34",
        title: "Changes to These Terms",
        content: (
          <p>
            We may amend these Terms from time to time, for example to reflect changes in our Services, in the
            requirements of Host Hospitals, or in law. The version in force is the one published on the Website. Where
            changes are material, we will take reasonable steps to bring them to your attention. The Terms that apply
            to your Placement are those in force at the time you pay the Placement Deposit. Continued use of the
            Website or our Services after changes take effect constitutes acceptance of the updated Terms.
          </p>
        ),
      },
      {
        number: "35",
        title: "Complaints & Dispute Resolution",
        content: (
          <p>
            We aim to provide a high standard of service. If you are unhappy with any aspect of our Services, please
            contact us at <a href="mailto:support@lumieramed.com">support@lumieramed.com</a> with full details so that
            we can try to resolve the matter. We will acknowledge your complaint within 5 working days and aim to
            provide a substantive response within 14 working days. If we are unable to resolve a dispute between us,
            the courts will have jurisdiction as set out in Clause 38. Nothing in this Clause prevents either Party
            from seeking urgent relief from a court.
          </p>
        ),
      },
      {
        number: "36",
        title: "Notices",
        content: (
          <p>
            Any notice or communication under these Terms must be in writing and sent by email — to you at the email
            address you have provided to us, and to us at support@lumieramed.com. A notice is deemed received on the
            day it is sent (or, if sent outside business hours, on the next business day), unless the sender is
            notified that delivery failed.
          </p>
        ),
      },
      {
        number: "37",
        title: "General",
        content: (
          <ul>
            <li><strong>Entire agreement.</strong> These Terms, our Privacy Policy and any Placement Confirmation form the entire agreement between you and us, and supersede any prior representations, save that nothing limits liability for fraudulent misrepresentation.</li>
            <li><strong>Severability.</strong> If any provision (or part of a provision) is found to be invalid or unenforceable, it will be modified to the minimum extent necessary or deemed deleted, and the remaining provisions will continue in full force and effect.</li>
            <li><strong>Waiver.</strong> No failure or delay in exercising any right is a waiver of it, and no single or partial exercise prevents any further exercise.</li>
            <li><strong>Assignment.</strong> You may not assign or transfer your rights or obligations under these Terms without our prior written consent. We may assign or transfer ours to a successor or to an entity that acquires our business.</li>
            <li><strong>No partnership or agency.</strong> Nothing in these Terms creates a partnership, joint venture, agency or employment relationship between the Parties.</li>
            <li><strong>Third-party rights.</strong> No one other than you and us has any right under the Contracts (Rights of Third Parties) Act 1999 to enforce these Terms.</li>
            <li><strong>Survival.</strong> Clauses that by their nature are intended to survive termination — including those relating to confidentiality (Clause 15), fees due, liability (Clause 25), indemnity (Clause 26), intellectual property (Clause 29) and governing law (Clause 38) — will continue in force after these Terms end.</li>
            <li><strong>Variation.</strong> Save as set out in Clause 34, any variation of these Terms must be agreed in writing by both Parties.</li>
          </ul>
        ),
      },
      {
        number: "38",
        title: "Governing Law & Jurisdiction",
        content: (
          <p>
            These Terms, and any dispute or claim (including non-contractual disputes or claims) arising out of or in
            connection with them or their subject matter, are governed by and construed in accordance with the laws of
            England and Wales. You and we agree that the courts of England and Wales have exclusive jurisdiction,
            except that if you are a consumer resident in Scotland or Northern Ireland you may also bring proceedings
            in your home jurisdiction.
          </p>
        ),
      },
      {
        number: "39",
        title: "Contact Us",
        content: (
          <p>
            If you have any questions about these Terms, or wish to contact us for any reason, please email{" "}
            <a href="mailto:support@lumieramed.com">support@lumieramed.com</a>.
          </p>
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

export default function TermsPage() {
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
        .intro a {
          color: var(--teal);
          text-decoration: underline;
          text-underline-offset: 3px;
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

      <div className="terms-page">

        {/* HERO */}
        <section className="hero">
          <div className="hero-badge">Legal Document</div>
          <h1 className="hero-title">Terms &amp; Conditions</h1>
          <p className="hero-subtitle">
            Please read these terms carefully before using the LumieraMed website or any of our services. They
            contain important information about your rights and obligations, including limitations on our
            liability.
          </p>
          <div className="hero-meta">
            <div className="hero-chip">
              <span className="hero-chip-label">Last Updated</span>
              <span className="hero-chip-value">23 June 2026</span>
            </div>
            <div className="hero-chip">
              <span className="hero-chip-label">Website</span>
              <span className="hero-chip-value">https://lumieramed.com</span>
            </div>
            <div className="hero-chip">
              <span className="hero-chip-label">Sections</span>
              <span className="hero-chip-value">39 Clauses</span>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <div className="intro">
          <div className="intro-inner">
            <p>
              Welcome to <strong>LumieraMed</strong>. These Terms and Conditions (the &quot;Terms&quot;) govern
              your access to and use of the LumieraMed website at{" "}
              <a href="https://lumieramed.com">https://lumieramed.com</a> (the &quot;Website&quot;) and the
              placement and related services we provide. Please read them carefully and keep a copy for your
              records. By accessing the Website, submitting an enquiry, paying any fee, or otherwise engaging our
              Services, you confirm that you have read, understood and agree to be bound by these Terms. If you do
              not agree with any part of them, you must not use the Website or our Services.
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