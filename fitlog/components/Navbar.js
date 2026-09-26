"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = usePlan();

  const navLinks = [
    { href: "/", label: "Workouts" },
    { href: "/my-plan", label: "My Plan" },
  ];

  return (
    <header className="sticky top-0 z-40 h-[81px] border-b border-base-border bg-base-bg/95 backdrop-blur">
      <div className="mx-auto flex h-full max-w-container items-center justify-between px-12">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="FitLog logo" className="h-5 w-5" />
          <span className="font-display text-lg font-semibold tracking-wide">
            FITLOG
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden items-center gap-8 sm:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent text-black"
                    : "text-base-muted hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Badges */}
        <div className="flex items-center gap-4 text-sm">
          <Link href="/my-plan" className="flex items-center gap-2">
            <span className="text-base-muted">Plan</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-semibold text-black">
              {planCount}
            </span>
          </Link>
          <Link href="/my-plan" className="flex items-center gap-2">
            <span className="text-base-muted">Saved</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-base-border text-xs font-semibold text-white">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
