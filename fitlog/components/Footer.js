import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-base-border bg-base-bg">
      <div className="mx-auto flex min-h-[165px] max-w-container flex-col items-center justify-center gap-3 px-12 text-sm sm:flex-row sm:justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="FitLog logo" className="h-4 w-4" />
          <span className="font-display font-semibold tracking-wide">
            FITLOG
          </span>
        </Link>
        <p className="text-base-muted">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
