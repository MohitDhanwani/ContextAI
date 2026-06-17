"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-72px)] flex flex-col items-center justify-center pt-16 pb-24 overflow-hidden">
      {/* Grid background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)"
        }}
      />

      <div className="relative z-10 max-w-[1120px] mx-auto px-6 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="font-display italic text-primary tracking-[-0.02em] leading-tight text-[clamp(56px,7vw,88px)]"
        >
          Talk to your documents.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.08 }}
          className="mt-6 text-[18px] text-secondary font-light max-w-[480px]"
        >
          Upload a PDF. Ask anything. Get answers grounded in your content — not hallucinations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.16 }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <Link
            href="/auth/signup"
            className="bg-accent text-[#0a0a0a] font-medium text-[15px] px-6 py-2.5 rounded-[6px] hover:bg-accent-hover transition-colors hover:scale-[1.01] active:scale-[0.98]"
          >
            Start for free
          </Link>
          <a
            href="#demo"
            className="border border-border text-secondary font-medium text-[15px] px-6 py-2.5 rounded-[6px] hover:border-[#444444] hover:text-primary transition-colors hover:scale-[1.01] active:scale-[0.98]"
          >
            See how it works
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 w-[1px] h-[40px] bg-border overflow-hidden">
        <div className="w-full h-1/2 bg-accent/50 animate-[scroll-down_1.5s_infinite]" />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll-down {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
      `}} />
    </section>
  );
}
