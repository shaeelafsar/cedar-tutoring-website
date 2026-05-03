export const SITE_CONFIG = {
  name: "Cedar Tutoring Academy",
  tagline: "Where Learning Takes Root",
  url: "https://cedartutoring.com",
  phone: "(469) 757-2220",
  email: "info@cedartutoring.com",
  address: {
    street: "3100 Independence Pkwy #311",
    city: "Plano",
    state: "TX",
    zip: "75075",
    full: "3100 Independence Pkwy #311, Plano, TX 75075",
  },
} as const;

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Programs",
    href: "/programs",
    children: [
      { label: "Math", href: "/programs/math" },
      { label: "Reading", href: "/programs/reading" },
      { label: "Writing", href: "/programs/writing" },
      { label: "Science", href: "/programs/science" },
      { label: "Arabic", href: "/programs/arabic" },
      { label: "Homework Help", href: "/programs/homework-help" },
    ],
  },
  {
    label: "Test Prep",
    href: "/test-prep",
    children: [
      { label: "SAT", href: "/test-prep/sat" },
      { label: "ACT", href: "/test-prep/act" },
      { label: "PSAT", href: "/test-prep/psat" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Locations", href: "/locations" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Reviews", href: "/reviews" },
];

export const FOOTER_NAV = {
  programs: [
    { label: "Math", href: "/programs/math" },
    { label: "Reading", href: "/programs/reading" },
    { label: "Writing", href: "/programs/writing" },
    { label: "Science", href: "/programs/science" },
    { label: "Arabic", href: "/programs/arabic" },
    { label: "Homework Help", href: "/programs/homework-help" },
  ],
  testPrep: [
    { label: "SAT Prep", href: "/test-prep/sat" },
    { label: "ACT Prep", href: "/test-prep/act" },
    { label: "PSAT Prep", href: "/test-prep/psat" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Locations", href: "/locations" },
    { label: "Reviews", href: "/reviews" },
    { label: "FAQ", href: "/faq" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/book-assessment" },
  ],
} as const;
