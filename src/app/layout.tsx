import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  weight: ["600", "700", "800"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: {
    default: "Cedar Tutoring Academy | K-12 Tutoring in Plano, TX",
    template: "%s | Cedar Tutoring Academy",
  },
  description:
    "Personalized K-12 tutoring in Math, Reading, Writing, Science, and Test Prep. Small groups, real teachers, measurable results. Serving families in Plano, TX.",
  metadataBase: new URL("https://cedartutoring.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
