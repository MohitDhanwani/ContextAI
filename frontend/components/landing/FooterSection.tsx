import Link from "next/link";

export function FooterSection() {
  return (
    <footer className="border-t border-border bg-canvas">
      <div className="max-w-[1280px] mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[13px] text-muted">
          <span className="font-display font-medium text-[15px] text-primary">PDFChat</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-6 text-[13px]">
          <a href="#" className="text-muted hover:text-primary transition-colors">
            GitHub
          </a>
          <Link href="/auth/signin" className="text-muted hover:text-primary transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    </footer>
  );
}
