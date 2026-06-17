"use client";

import { motion } from "framer-motion";

export function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "Upload your PDF",
      desc: "Drop any PDF — research paper, contract, report. Up to 20MB.",
    },
    {
      num: "02",
      title: "Wait ~15 seconds",
      desc: "We parse, chunk, and embed your document into a vector database.",
    },
    {
      num: "03",
      title: "Ask anything",
      desc: "Ask questions in plain language. Get answers with context pulled directly from your file.",
    },
  ];

  return (
    <section className="py-[72px] md:py-[120px] border-t border-border bg-base">
      <div className="max-w-[1120px] mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="font-display text-[40px] text-primary text-center mb-16"
        >
          Three steps. That&apos;s it.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.1 }}
              className="flex flex-col items-start"
            >
              <div className="font-light text-[72px] text-[#222222] leading-none mb-4 select-none">
                {step.num}
              </div>
              <h3 className="font-medium text-[16px] text-primary mb-2">
                {step.title}
              </h3>
              <p className="font-light text-[14px] text-secondary max-w-[200px] leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
