"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function DemoSection() {
  return (
    <section id="demo" className="py-24 border-t border-border bg-canvas">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="font-display font-medium text-[32px] md:text-[40px] text-primary text-center mb-16"
        >
          What it looks like.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="w-full max-w-[1000px] h-[600px] rounded-[4px] overflow-hidden flex border border-border"
          style={{
            boxShadow: "0 32px 64px rgba(0,0,0,0.4)",
          }}
        >
          {/* Static UI Mockup - not interactive */}
          <div className="pointer-events-none w-full h-full flex">
            {/* Sidebar Mockup */}
            <div className="w-[280px] bg-canvas border-r border-border flex flex-col hidden md:flex shrink-0">
              <div className="p-5 font-display font-medium text-[16px] text-primary flex items-center justify-between">
                <span>PDFChat</span>
              </div>
              <div className="px-4 mb-4">
                <div className="w-full h-[36px] rounded-[4px] border border-border bg-surface text-primary text-[13px] font-medium flex items-center justify-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  New Chat
                </div>
              </div>
              <div className="px-4 pb-2 text-[11px] font-mono tracking-widest text-muted uppercase">
                Documents
              </div>
              <div className="flex-1 flex flex-col mt-2">
                <div className="w-full relative px-6 py-3 flex flex-col items-start gap-1 bg-surface-raised">
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent-highlight" />
                  <span className="truncate w-full text-left text-[14px] font-body text-primary">Q3_Financial_Report.pdf</span>
                  <div className="flex items-center gap-3 font-mono text-[11px] text-muted tracking-wide">
                    <span>24 pgs</span>
                    <span className="w-[3px] h-[3px] rounded-full bg-border" />
                    <span>10:24 AM</span>
                  </div>
                </div>
                <div className="w-full relative px-6 py-3 flex flex-col items-start gap-1 bg-transparent">
                  <span className="truncate w-full text-left text-[14px] font-body text-muted">Product_Requirements.pdf</span>
                  <div className="flex items-center gap-3 font-mono text-[11px] text-muted tracking-wide">
                    <span>12 pgs</span>
                    <span className="w-[3px] h-[3px] rounded-full bg-border" />
                    <span>Yesterday</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-border flex justify-between items-center text-[13px] text-muted bg-surface">
                <span className="font-mono text-[11px]">user@example.com</span>
                <span>Sign out</span>
              </div>
            </div>

            {/* Chat Panel Mockup */}
            <div className="flex-1 bg-canvas flex flex-col">
              <div className="h-[60px] shrink-0 border-b border-border flex items-center px-6 gap-2 bg-canvas">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <span className="text-[14px] text-primary font-medium truncate">Q3_Financial_Report.pdf</span>
              </div>
              
              <div className="flex-1 p-8 flex flex-col gap-6 overflow-hidden max-w-[800px] mx-auto w-full">
                <div className="self-end max-w-[80%] bg-surface-raised border border-border p-4 shadow-sm mb-2">
                  <p className="text-[15px] text-primary font-body">What was the total operating expense?</p>
                </div>
                
                <div className="self-start max-w-[100%] flex gap-4 w-full">
                  <div className="w-6 h-6 shrink-0 mt-1 bg-accent-highlight flex items-center justify-center text-canvas rounded-[2px]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <div className="text-[15px] text-primary font-body leading-[1.7] w-full">
                    The total operating expense for Q3 was $14.2 million, which is a 12% increase from the previous quarter. The report notes this was largely due to <span className="bg-accent-highlight-dim text-primary px-1">increased R&D headcount</span>.
                    <span className="inline-flex items-center justify-center ml-2 bg-accent-highlight text-canvas font-mono text-[11px] px-1.5 py-0.5 rounded-[2px]">
                      p.8 · §3
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-6 bg-gradient-to-t from-canvas via-canvas to-transparent pb-6 md:pb-8 shrink-0">
                <div className="relative w-full max-w-[760px] mx-auto bg-surface border border-border rounded-[4px] h-[48px] flex items-center px-2 pb-1 pt-1">
                  <span className="text-muted text-[15px] px-3 font-body">Ask anything about your PDF...</span>
                  <div className="absolute right-2 top-1.5 w-[36px] h-[36px] rounded-[4px] bg-surface-raised border border-border flex items-center justify-center">
                    <ArrowUp size={16} strokeWidth={2.5} className="text-muted" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
