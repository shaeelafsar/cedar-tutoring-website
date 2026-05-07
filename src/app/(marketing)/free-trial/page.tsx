/**
 * /free-trial → /book-assessment redirect page.
 *
 * This page implements a client-side redirect as a temporary measure while
 * Cedar Tutoring is hosted on GitHub Pages (static export). True HTTP 301
 * redirects are not supported with Next.js static export.
 *
 * TODO(Wave 3 / Azure SWA): Replace this entire file with a true HTTP 301
 * configured in `staticwebapp.config.json`:
 *   {
 *     "routes": [
 *       { "route": "/free-trial", "redirect": "/book-assessment", "statusCode": 301 },
 *       { "route": "/free-trial/", "redirect": "/book-assessment/", "statusCode": 301 }
 *     ]
 *   }
 * Once the Azure migration is complete, this page.tsx and the free-trial
 * directory can be deleted entirely.
 *
 * See: https://learn.microsoft.com/en-us/azure/static-web-apps/configuration#routes
 */

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FreeTrialRedirectPage() {
  const router = useRouter();

  // Next.js useRouter.replace() automatically prepends basePath, so this
  // works correctly on both GitHub Pages (/cedar-tutoring-website/book-assessment)
  // and Azure SWA (/book-assessment).
  useEffect(() => {
    router.replace("/book-assessment");
  }, [router]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4 py-20">
      <div className="text-center">
        <p className="text-muted-foreground text-base">
          Redirecting to{" "}
          <a
            href="/book-assessment"
            className="text-primary font-semibold underline underline-offset-4"
          >
            Book a Free Assessment
          </a>
          …
        </p>
        {/* No-JS fallback: render a direct link for users without JavaScript */}
        <noscript>
          <p className="mt-4 text-sm text-muted-foreground">
            <a href="/book-assessment" className="text-primary underline">
              Click here
            </a>{" "}
            if you are not redirected automatically.
          </p>
        </noscript>
      </div>
    </div>
  );
}
