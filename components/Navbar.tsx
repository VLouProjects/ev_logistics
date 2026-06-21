"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "首頁", href: "/" },
  { label: "車輛方案", href: "/vehicles" },
  { label: "行業應用", href: "/solutions" },
  { label: "冷鏈方案", href: "/refrigeration" },
  { label: "品牌組合", href: "/brand-portfolio" },
  { label: "車隊顧問", href: "/fleet-economics" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 md:h-20 md:px-6 lg:px-8">
        {/* Logo: swap the text wordmark below for <Image src="/images/logo.svg" .../> when supplied */}
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-gray-900 md:text-lg"
          onClick={() => setOpen(false)}
        >
          澳門新吉利
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
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
          className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 lg:inline-flex"
        >
          預約諮詢
        </Link>

        {/* Mobile hamburger button */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-gray-600 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          {open ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="border-t border-border bg-bg/95 px-4 pb-5 pt-2 backdrop-blur lg:hidden">
          <nav className="flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-sm text-gray-700 transition hover:bg-surface hover:text-primary"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-2 border-t border-border pt-3">
            <Link
              href="/contact"
              className="block rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
              onClick={() => setOpen(false)}
            >
              預約諮詢
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
