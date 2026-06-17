import Link from "next/link";

export function FooterSection() {
  return (
    <footer className="border-t border-border bg-base">
      <div className="max-w-[1120px] mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[13px] text-muted">
          <span className="font-display text-[15px]">PDFChat</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-6 text-[13px]">
          <a href="#" className="text-muted hover:text-secondary transition-colors">
            GitHub
          </a>
          <Link href="/auth/signin" className="text-muted hover:text-secondary transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    </footer>
  );
}
