"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAuthToken } from "@/lib/api";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(!!getAuthToken());

    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md bg-base/80 border-b border-border" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1120px] mx-auto px-6 h-[72px] flex items-center justify-between">
        <Link href="/" className="font-display text-[18px] text-primary">
          PDFChat
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href={isAuth ? "/app" : "/auth/signin"}
            className="text-[14px] text-secondary hover:text-primary transition-colors duration-200"
          >
            {isAuth ? "Dashboard" : "Sign In"}
          </Link>
          <Link
            href={isAuth ? "/app" : "/auth/signup"}
            className="bg-accent text-[#0a0a0a] font-medium text-[14px] px-4 py-1.5 rounded-[4px] hover:bg-accent-hover transition-colors duration-200"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
