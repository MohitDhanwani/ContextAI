"use client";

import { motion } from "framer-motion";

export function FeaturesSection() {
  const features = [
    {
      title: "RAG, not magic",
      desc: "Answers come from your document, not from the model's training data. Every response is grounded in what you uploaded.",
    },
    {
      title: "Persistent conversations",
      desc: "Your chat history is saved. Come back tomorrow and pick up exactly where you left off.",
    },
    {
      title: "Async processing",
      desc: "Large PDFs are processed in a background queue. The app doesn't block — you're notified when it's ready.",
    },
    {
      title: "One PDF, one context",
      desc: "Each chat session is tied to a single document. No context bleed between files.",
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
          className="font-display text-[40px] text-primary mb-12"
        >
          Built differently.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.1 }}
              className="bg-surface border border-border p-8 rounded-[8px] hover:border-[#3a3a3a] hover:-translate-y-[2px] transition-all duration-200"
            >
              <h3 className="font-medium text-[16px] text-primary mb-3 flex items-center gap-2">
                <span className="text-muted">—</span> {feature.title}
              </h3>
              <p className="font-light text-[14px] text-secondary leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
