"use client";

import { motion } from "framer-motion";
import React from "react";

export function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "Upload a PDF",
      desc: "Drop any document — research paper, contract, report. Up to 20MB.",
      visual: (
        <div className="w-12 h-12 bg-canvas border border-border flex flex-col items-center justify-center p-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="12" y1="18" x2="12" y2="12"></line>
            <line x1="9" y1="15" x2="12" y2="18"></line>
            <line x1="15" y1="15" x2="12" y2="18"></line>
          </svg>
        </div>
      )
    },
    {
      num: "02",
      title: "Wait ~15 seconds",
      desc: "We parse, chunk, and embed your document into a vector database.",
      visual: (
        <div className="w-12 h-12 bg-canvas border border-border p-2 flex flex-col justify-center gap-1.5 overflow-hidden">
          <div className="w-full h-1 bg-border/50"></div>
          <div className="w-full h-1 bg-border/50 relative">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-accent-highlight"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
            />
          </div>
          <div className="w-2/3 h-1 bg-border/50"></div>
        </div>
      )
    },
    {
      num: "03",
      title: "Ask anything",
      desc: "Ask questions in plain language. Get answers with context pulled directly from your file.",
      visual: (
        <div className="w-12 h-12 bg-canvas border border-border flex items-center justify-center">
          <span className="bg-accent-highlight text-canvas font-mono text-[10px] px-1 py-0.5">p.12</span>
        </div>
      )
    },
  ];

  return (
    <section className="py-24 border-t border-border bg-surface">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5 md:pr-12">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="font-display font-medium text-[32px] md:text-[40px] text-primary"
          >
            Three steps. That&apos;s it.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
            className="mt-4 text-[16px] text-muted max-w-[320px] leading-relaxed"
          >
            No complex setup, no prompt engineering required. Just upload and start reading.
          </motion.p>
        </div>

        <div className="md:col-span-7">
          <div className="flex flex-col relative">
            {/* The vertical hairline connecting steps */}
            <div className="absolute top-[24px] bottom-[24px] left-[15px] w-[1px] bg-border" />
            
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.1 }}
                className="flex items-start mb-12 last:mb-0 relative z-10"
              >
                {/* Step Number Badge */}
                <div className="w-[32px] shrink-0 bg-surface py-1">
                  <span className="font-mono text-[13px] text-accent-ink tracking-widest">{step.num}</span>
                </div>
                
                {/* Step Content */}
                <div className="ml-8 flex flex-col sm:flex-row gap-6 items-start">
                  {step.visual}
                  <div className="flex flex-col">
                    <h3 className="font-medium text-[18px] text-primary mb-2">
                      {step.title}
                    </h3>
                    <p className="font-body text-[15px] text-muted max-w-[280px] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
