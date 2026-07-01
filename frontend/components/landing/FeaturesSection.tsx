"use client";

import { motion } from "framer-motion";

export function FeaturesSection() {
  const secondaryFeatures = [
    {
      label: "PERSISTENCE",
      title: "Saved conversations",
      desc: "Your chat history is tied to your account. Come back tomorrow and pick up exactly where you left off.",
    },
    {
      label: "ASYNC",
      title: "Background processing",
      desc: "Large PDFs are processed in a background worker queue. The UI never blocks — you're notified when it's ready.",
    },
    {
      label: "ISOLATION",
      title: "One document, one context",
      desc: "Each chat session is strictly tied to a single file. No context bleed, no confusing one contract for another.",
    },
  ];

  return (
    <section className="py-24 border-t border-border bg-canvas">
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="font-display font-medium text-[32px] md:text-[40px] text-primary mb-16"
        >
          Built for documents.
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Feature: RAG Grounding */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="lg:col-span-7 bg-surface border border-border flex flex-col"
          >
            <div className="p-8 md:p-12 border-b border-border flex-1">
              <span className="font-mono text-[12px] text-accent-ink tracking-widest uppercase mb-4 block">Core Mechanic</span>
              <h3 className="font-medium text-[24px] text-primary mb-4">
                Retrieval-Augmented Generation, made visible.
              </h3>
              <p className="font-body text-[16px] text-muted leading-relaxed max-w-[480px]">
                Answers don&apos;t come from the model&apos;s generalized training data. They are extracted directly from your uploaded document. We highlight the exact passage we used, so you can verify everything.
              </p>
            </div>
            {/* Micro-example */}
            <div className="p-8 md:p-12 bg-canvas flex flex-col gap-4">
              <div className="self-end bg-surface-raised border border-border px-4 py-2 text-[14px] text-primary max-w-[80%]">
                When does the NDA expire?
              </div>
              <div className="self-start bg-surface border border-border px-4 py-3 text-[14px] leading-relaxed text-primary max-w-[90%]">
                The non-disclosure agreement remains in effect for <span className="bg-accent-highlight-dim text-primary px-1">a period of three (3) years from the Effective Date</span>.
                <span className="inline-flex items-center justify-center ml-2 bg-accent-highlight text-canvas font-mono text-[11px] px-1.5 py-0.5 rounded-[2px]">
                  p.2 · §4
                </span>
              </div>
            </div>
          </motion.div>

          {/* Secondary Features List */}
          <div className="lg:col-span-5 flex flex-col">
            {secondaryFeatures.map((feature, i) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.1 }}
                className="py-8 first:pt-0 border-b border-border last:border-b-0"
              >
                <span className="font-mono text-[11px] text-muted tracking-widest mb-3 block">{feature.label}</span>
                <h3 className="font-medium text-[18px] text-primary mb-2 flex items-center gap-2">
                  {feature.title}
                </h3>
                <p className="font-body text-[15px] text-muted leading-relaxed max-w-[380px]">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
