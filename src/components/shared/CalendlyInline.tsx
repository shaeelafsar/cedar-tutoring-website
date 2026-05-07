"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CalendarClock, ExternalLink, PhoneCall } from "lucide-react";

interface CalendlyInlineProps {
  url: string;
  fallbackPhone?: string;
  primaryColor?: string;
  textColor?: string;
  className?: string;
}

const CALENDLY_SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const CALENDLY_CSS_HREF = "https://assets.calendly.com/assets/external/widget.css";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

let scriptPromise: Promise<void> | null = null;

function ensureStylesheet(href: string) {
  if (typeof document === "undefined") return;
  if (document.querySelector(`link[href="${href}"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

function loadCalendlyScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Calendly) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(
      `script[src="${CALENDLY_SCRIPT_SRC}"]`,
    ) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("calendly-script-error")),
        { once: true },
      );
      if (window.Calendly) resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = CALENDLY_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error("calendly-script-error"));
    };
    document.body.appendChild(script);
  });

  return scriptPromise;
}

function buildEmbedUrl(url: string, primaryColor?: string, textColor?: string) {
  try {
    const u = new URL(url);
    u.searchParams.set("hide_gdpr_banner", "1");
    u.searchParams.set("hide_landing_page_details", "1");
    if (primaryColor) u.searchParams.set("primary_color", primaryColor.replace(/^#/, ""));
    if (textColor) u.searchParams.set("text_color", textColor.replace(/^#/, ""));
    return u.toString();
  } catch {
    return url;
  }
}

export function CalendlyInline({
  url,
  fallbackPhone,
  primaryColor = "0a7ab8",
  textColor,
  className,
}: CalendlyInlineProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");
  const noticeId = useId();
  const embedUrl = buildEmbedUrl(url, primaryColor, textColor);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    setStatus("loading");
    ensureStylesheet(CALENDLY_CSS_HREF);

    // Watch for the iframe Calendly injects so we can clear the loading
    // overlay the moment the calendar is actually visible.
    const observer = new MutationObserver(() => {
      if (cancelled) return;
      if (container.querySelector("iframe")) {
        setStatus("ready");
      }
    });
    observer.observe(container, { childList: true, subtree: true });

    loadCalendlyScript()
      .then(() => {
        if (cancelled) return;
        if (!window.Calendly) {
          setStatus("failed");
          return;
        }
        // Idempotent init: skip if Calendly already injected an iframe (Strict
        // Mode double-effect, HMR, or repeat mount). Note: we deliberately do
        // NOT set the .calendly-inline-widget class or data-url on our
        // container — those trigger Calendly's auto-init on script load,
        // which races with this explicit init and aborts the iframe.
        if (!container.querySelector("iframe")) {
          window.Calendly.initInlineWidget({
            url: embedUrl,
            parentElement: container,
          });
        } else {
          setStatus("ready");
        }
        // Safety fallback in case the iframe loads but the MutationObserver
        // misses it for some reason.
        setTimeout(() => {
          if (!cancelled && container.querySelector("iframe")) {
            setStatus("ready");
          }
        }, 8000);
      })
      .catch(() => {
        if (!cancelled) setStatus("failed");
      });

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [embedUrl]);

  const phoneHref = fallbackPhone
    ? `tel:${fallbackPhone.replace(/\D/g, "")}`
    : undefined;

  return (
    <div className={className}>
      <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
        {/*
          Plain ref'd div — NOT marked with the .calendly-inline-widget class
          and NOT given a data-url attribute, both of which would trigger
          Calendly's automatic init on script load and race with our
          explicit initInlineWidget call. We also avoid React children &
          dangerouslySetInnerHTML so React's reconciler never wipes the
          iframe Calendly injects.
        */}
        <div
          ref={containerRef}
          className="block w-full min-h-[1150px] md:min-h-[720px]"
          style={{ minWidth: "320px" }}
          aria-describedby={status !== "ready" ? noticeId : undefined}
        />
        {status !== "ready" && (
          <div
            id={noticeId}
            aria-live="polite"
            className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white"
          >
            <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
              <CalendarClock
                className="h-6 w-6 animate-pulse text-primary"
                aria-hidden="true"
              />
              <span>
                {status === "failed"
                  ? "Couldn't load the booking calendar."
                  : "Loading the booking calendar…"}
              </span>
            </div>
          </div>
        )}
      </div>

      <noscript>
        <p className="mt-4 text-sm text-muted-foreground">
          Online booking requires JavaScript.{" "}
          <a className="text-primary underline" href={url}>
            Open the booking page in a new tab
          </a>
          .
        </p>
      </noscript>

      <div className="mt-4 flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-foreground shadow-sm transition hover:border-primary hover:text-primary"
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          Calendar not loading? Book on Calendly
        </a>
        {phoneHref && (
          <a
            href={phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            <PhoneCall className="h-4 w-4" aria-hidden="true" />
            Prefer to call? {fallbackPhone}
          </a>
        )}
      </div>
    </div>
  );
}
