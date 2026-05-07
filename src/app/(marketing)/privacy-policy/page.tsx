import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";

import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { SITE_CONFIG } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy | Cedar Tutoring Academy",
  description:
    "Cedar Tutoring Academy's privacy policy explaining how we collect, use, and protect your personal information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        heading="Privacy Policy"
        subtitle="How Cedar Tutoring Academy collects, uses, and protects your information."
        breadcrumbs={[{ label: "Privacy Policy" }]}
      />

      <section className="px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            {/* Pending-legal-review banner */}
            <div className="border-amber-200 bg-amber-50 text-amber-900 mb-10 flex items-start gap-3 rounded-2xl border p-4 text-sm leading-6">
              <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-500" />
              <p>
                <strong>Note:</strong> This is a generic privacy policy. Cedar Tutoring
                Academy is in the process of having this reviewed by legal counsel. For
                questions in the meantime, contact{" "}
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="font-semibold underline underline-offset-4"
                >
                  {SITE_CONFIG.email}
                </a>
                .
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="prose prose-slate max-w-none text-base leading-8">
              <h2>1. Introduction</h2>
              <p>
                Cedar Tutoring Academy (&quot;Cedar,&quot; &quot;we,&quot; &quot;our,&quot; or
                &quot;us&quot;) is committed to protecting the privacy of the families who use our
                services. This Privacy Policy explains how we collect, use, disclose, and
                safeguard your personal information when you visit our website at{" "}
                <a href={SITE_CONFIG.url}>{SITE_CONFIG.url}</a> or interact with our
                tutoring programs.
              </p>
              <p>
                By using our website or services, you agree to the terms of this Privacy
                Policy. If you do not agree, please do not use our website or submit any
                personal information.
              </p>

              <h2>2. Information We Collect</h2>
              <p>We may collect the following types of information:</p>
              <ul>
                <li>
                  <strong>Contact information:</strong> Name, email address, phone number,
                  and mailing address of parents or guardians.
                </li>
                <li>
                  <strong>Student information:</strong> First name, grade level, school,
                  and academic interests or goals provided during assessment requests or
                  enrollment.
                </li>
                <li>
                  <strong>Communication records:</strong> Messages, inquiries, and
                  correspondence submitted through our website forms or via email.
                </li>
                <li>
                  <strong>Usage data:</strong> IP address, browser type, pages visited,
                  and time spent on pages, collected automatically through standard web
                  server logs and analytics tools.
                </li>
              </ul>
              <p>
                We do <strong>not</strong> collect payment card information through this
                website. Payment processing is handled separately through secure
                third-party providers.
              </p>

              <h2>3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Respond to assessment requests and enrollment inquiries.</li>
                <li>Schedule and conduct tutoring sessions.</li>
                <li>
                  Send administrative communications such as appointment confirmations
                  and program updates.
                </li>
                <li>Improve our website, content, and services.</li>
                <li>Comply with applicable laws and regulations.</li>
              </ul>
              <p>
                We do <strong>not</strong> sell, rent, or trade your personal information
                to third parties for marketing purposes.
              </p>

              <h2>4. Sharing of Information</h2>
              <p>
                We may share your information only in the following limited circumstances:
              </p>
              <ul>
                <li>
                  <strong>Service providers:</strong> Trusted vendors who assist us in
                  operating our website or services (e.g., email delivery, form
                  processing), subject to confidentiality obligations.
                </li>
                <li>
                  <strong>Legal requirements:</strong> When required by law, court order,
                  or governmental authority.
                </li>
                <li>
                  <strong>Business transfers:</strong> In connection with a merger,
                  acquisition, or sale of assets, with appropriate confidentiality
                  protections.
                </li>
              </ul>

              <h2>5. Cookies &amp; Tracking</h2>
              <p>
                Our website may use cookies and similar tracking technologies to improve
                your browsing experience and understand how visitors use the site. You can
                control cookie settings through your browser preferences. Disabling cookies
                may affect certain site functionality.
              </p>
              <p>
                We may use third-party analytics tools (such as Google Analytics) to
                collect anonymized usage data. These providers have their own privacy
                policies governing their use of information.
              </p>

              <h2>6. Children&apos;s Privacy</h2>
              <p>
                Cedar Tutoring Academy serves students from kindergarten through high
                school, and we take the privacy of minors especially seriously.
              </p>
              <ul>
                <li>
                  We do <strong>not</strong> knowingly collect personal information
                  directly from children under the age of 13 through our website.
                </li>
                <li>
                  All assessment and enrollment information for students is collected
                  from and consented to by a parent or legal guardian.
                </li>
                <li>
                  Student information is used solely for the purpose of providing
                  tutoring services and is never shared with third parties for marketing.
                </li>
              </ul>
              <p>
                If you believe we have inadvertently collected personal information from a
                child under 13 without parental consent, please contact us immediately at{" "}
                <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a> and we
                will promptly delete it.
              </p>

              <h2>7. Data Security</h2>
              <p>
                We implement reasonable administrative, technical, and physical safeguards
                to protect your personal information from unauthorized access, disclosure,
                or misuse. However, no method of transmission over the internet or
                electronic storage is completely secure. We cannot guarantee absolute
                security of your data.
              </p>

              <h2>8. Your Rights</h2>
              <p>
                Depending on your location, you may have rights regarding your personal
                information, including:
              </p>
              <ul>
                <li>The right to access the personal information we hold about you.</li>
                <li>The right to request correction of inaccurate information.</li>
                <li>
                  The right to request deletion of your personal information, subject to
                  legal and operational retention requirements.
                </li>
                <li>
                  The right to opt out of non-essential communications at any time.
                </li>
              </ul>
              <p>
                To exercise any of these rights, please contact us at the information
                below.
              </p>

              <h2>9. Contact Us</h2>
              <p>
                If you have questions, concerns, or requests regarding this Privacy Policy
                or your personal data, please contact us:
              </p>
              <address className="not-italic">
                <strong>{SITE_CONFIG.name}</strong>
                <br />
                {SITE_CONFIG.address.full}
                <br />
                Phone:{" "}
                <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}>
                  {SITE_CONFIG.phone}
                </a>
                <br />
                Email:{" "}
                <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>
              </address>

              <h2>10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. When we do, we will
                revise the &quot;Last updated&quot; date at the bottom of this page. We encourage
                you to review this policy periodically to stay informed about how we
                protect your information.
              </p>
              <p>
                Continued use of our website after any changes constitutes your acceptance
                of the updated policy.
              </p>

              <hr className="my-8" />
              <p className="text-muted-foreground text-sm">Last updated: May 7, 2026</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
