"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [animationPlayed, setAnimationPlayed] = useState(false);

  useEffect(() => {
    // Ensuring the animation plays once and stays at end state
    const timer = setTimeout(() => {
      setAnimationPlayed(true);
    }, 2500); // 2.5s total animation duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-72px)] flex items-center pt-24 pb-16 overflow-hidden">
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Left Column (55% = ~7 cols) */}
        <div className="md:col-span-7 flex flex-col items-start text-left pr-0 md:pr-12">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="font-display font-medium text-primary tracking-[-0.02em] leading-[1.1] text-[40px] sm:text-[56px] lg:text-[72px] xl:text-[88px]"
          >
            Ask your PDF a question. Get the exact sentence back.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
            className="mt-6 text-[18px] leading-[1.6] text-muted font-body max-w-[540px]"
          >
            Every answer points back to the page it came from. Upload a document, and let the system trace the exact passage that holds your answer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/auth/signup"
              className="bg-accent-highlight text-canvas font-medium text-[16px] px-6 py-3 rounded-[4px] hover:brightness-90 transition-all duration-200"
            >
              Upload a PDF
            </Link>
            <a
              href="#demo"
              className="border border-border text-muted font-medium text-[16px] px-6 py-3 rounded-[4px] hover:border-accent-ink hover:text-primary transition-colors duration-200"
            >
              See how it works
            </a>
          </motion.div>
        </div>

        {/* Right Column (45% = ~5 cols) - The Highlight Trace Demo */}
        <div className="md:col-span-5 mt-16 md:mt-0 relative w-full h-[320px] sm:h-[400px] flex items-center justify-center">
          
          {/* Document Background */}
          <div className="absolute inset-0 bg-surface border border-border shadow-sm flex flex-col p-6 sm:p-8 font-body text-[14px] leading-[1.8] text-muted overflow-hidden">
            <div className="w-16 h-4 bg-border/50 mb-6 rounded-sm"></div>
            <p className="mb-4">
              The architecture of the system relies on vector embeddings to identify relevant semantic clusters within the parsed document body. By segmenting the text into logical paragraphs...
            </p>
            <p className="relative z-0">
              This retrieval process guarantees that {" "}
              <span className="relative inline-block text-primary">
                {/* The highlighter sweep */}
                <motion.span 
                  className="absolute inset-0 bg-accent-highlight-dim -z-10"
                  initial={{ scaleX: 0, transformOrigin: "left" }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
                />
                <span className="relative z-10">
                  every generated answer is strictly grounded in the source material
                </span>
              </span>
              , preventing hallucinations and ensuring verifiability through direct citations.
            </p>
            <div className="w-3/4 h-3 bg-border/30 mt-6 rounded-sm"></div>
            <div className="w-1/2 h-3 bg-border/30 mt-3 rounded-sm"></div>
          </div>

          {/* The Answer Bubble Lifting Out */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.6, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute -bottom-6 -left-6 sm:-left-12 right-6 bg-surface-raised border border-border p-4 shadow-xl z-20 flex flex-col gap-3"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded-[2px] bg-accent-highlight flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--canvas)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <span className="text-[13px] font-medium text-primary">PDFChat</span>
            </div>
            <p className="text-[15px] leading-[1.6] text-primary">
              The system prevents hallucinations because <span className="bg-accent-highlight-dim text-primary px-1">every generated answer is strictly grounded in the source material</span>.
              <span className="inline-flex items-center justify-center ml-2 bg-accent-highlight text-canvas font-mono text-[11px] px-1.5 py-0.5 rounded-[2px] cursor-pointer hover:brightness-110">
                p.4 · §2.1
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
