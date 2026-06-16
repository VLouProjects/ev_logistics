import Link from "next/link";

const navItems = [
  { label: "首頁", href: "/" },
  { label: "車輛方案", href: "/vehicles" },
  { label: "行業應用", href: "/solutions" },
  { label: "冷鏈方案", href: "/refrigeration" },
  { label: "品牌組合", href: "/brand-portfolio" },
  { label: "車隊顧問", href: "/fleet-economics" },
  { label: "聯絡我們", href: "/contact" }
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight text-gray-900">
          EV Logistics Expert
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-gray-600 transition hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 md:inline-flex"
        >
          預約諮詢
        </Link>
      </div>
    </header>
  );
}