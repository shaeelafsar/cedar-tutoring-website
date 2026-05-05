import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header navItems={NAV_ITEMS} siteConfig={SITE_CONFIG} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
