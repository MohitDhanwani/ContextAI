"use client";

import { motion } from "framer-motion";
import { FileText, ArrowUp } from "lucide-react";

export function DemoSection() {
  return (
    <section id="demo" className="py-[72px] md:py-[120px] border-t border-border bg-base">
      <div className="max-w-[1120px] mx-auto px-6 flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="font-display text-[40px] text-primary text-center mb-16"
        >
          What it looks like.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="w-full max-w-[1000px] h-[600px] rounded-[12px] overflow-hidden flex"
          style={{
            boxShadow: "0 0 0 1px #262626, 0 32px 64px rgba(0,0,0,0.5)",
            transform: "scale(0.96)",
            transformOrigin: "center",
          }}
        >
          {/* Static UI Mockup - not interactive */}
          <div className="pointer-events-none w-full h-full flex">
            {/* Sidebar Mockup */}
            <div className="w-[260px] bg-surface border-r border-border flex flex-col hidden md:flex">
              <div className="p-5 font-display text-[16px] text-primary">PDFChat</div>
              <div className="px-4">
                <div className="w-full h-[34px] rounded-[6px] border border-border flex items-center justify-center text-[12px] text-secondary">
                  + New Chat
                </div>
              </div>
              <div className="flex-1 p-2 mt-4 flex flex-col gap-1">
                <div className="h-[40px] rounded-[6px] bg-elevated text-primary text-[13px] px-2.5 flex items-center gap-2">
                  <FileText size={14} className="text-muted" />
                  <span className="truncate">Q3_Financial_Report.pdf</span>
                </div>
                <div className="h-[40px] rounded-[6px] text-secondary text-[13px] px-2.5 flex items-center gap-2">
                  <FileText size={14} className="text-muted" />
                  <span className="truncate">Product_Requirements.pdf</span>
                </div>
              </div>
              <div className="p-4 border-t border-border flex justify-between items-center text-[12px] text-muted">
                <span>user@example.com</span>
                <span>Sign out</span>
              </div>
            </div>

            {/* Chat Panel Mockup */}
            <div className="flex-1 bg-base flex flex-col">
              <div className="h-[56px] border-b border-border flex items-center px-6 gap-2">
                <FileText size={14} className="text-muted" />
                <span className="text-[14px] text-primary font-medium">Q3_Financial_Report.pdf</span>
              </div>
              
              <div className="flex-1 p-8 flex flex-col gap-6 overflow-hidden">
                <div className="self-end max-w-[75%] bg-[#1a1a1a] border border-border rounded-[10px_10px_2px_10px] px-3.5 py-2.5">
                  <p className="text-[14px] text-primary">Can you summarize the main revenue drivers for this quarter?</p>
                </div>
                
                <div className="self-start max-w-[100%] flex gap-3 relative">
                  <div className="absolute -left-4 top-1 text-accent text-[12px]">◆</div>
                  <div className="text-[14px] text-primary font-light leading-[1.7]">
                    Based on the Q3 Financial Report, the main revenue drivers were:<br/><br/>
                    1. **Enterprise Subscriptions**: Grew by 42% YoY, primarily driven by the new multi-region expansion.<br/>
                    2. **API Usage Fees**: Increased by 18%, reflecting higher transaction volumes from existing customers.<br/>
                    3. **Professional Services**: Saw a moderate 5% increase due to onboarding large accounts.
                  </div>
                </div>

                <div className="self-end max-w-[75%] bg-[#1a1a1a] border border-border rounded-[10px_10px_2px_10px] px-3.5 py-2.5">
                  <p className="text-[14px] text-primary">What was the total operating expense?</p>
                </div>
                
                <div className="self-start max-w-[100%] flex gap-3 relative">
                  <div className="absolute -left-4 top-1 text-accent text-[12px]">◆</div>
                  <div className="text-[14px] text-primary font-light leading-[1.7]">
                    The total operating expense for Q3 was <strong>$14.2 million</strong>, which is a 12% increase from the previous quarter. The report notes this was largely due to increased R&D headcount.
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-6 border-t border-border">
                <div className="relative w-full max-w-[760px] mx-auto bg-surface border border-border rounded-[10px] h-[48px] flex items-center px-4">
                  <span className="text-muted text-[14px]">Ask anything about your PDF...</span>
                  <div className="absolute right-2 top-2 w-[32px] h-[32px] rounded-full bg-[#222222] flex items-center justify-center">
                    <ArrowUp size={16} className="text-muted" />
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
