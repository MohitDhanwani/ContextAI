import { motion } from "framer-motion";

export function ProcessingStatus({ status, onRetry }: { status: "processing" | "failed", onRetry: () => void }) {
  if (status === "failed") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 h-full bg-canvas text-center">
        <div className="text-error font-display text-[18px] mb-2">
          Processing failed
        </div>
        <div className="text-muted font-body text-[14px] mb-6">
          There was an error reading this document.
        </div>
        <button
          onClick={onRetry}
          className="h-[36px] rounded-[4px] border border-border bg-transparent text-primary text-[13px] font-medium font-body px-6 hover:border-accent-ink transition-colors duration-150"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 h-full bg-canvas text-center">
      {/* Progressive highlight animation */}
      <div className="w-[200px] flex flex-col gap-3 mb-8 bg-surface p-4 border border-border shadow-sm">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-[6px] bg-border/40 relative rounded-sm overflow-hidden">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-accent-highlight"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ 
                duration: 1.5, 
                ease: "linear", 
                repeat: Infinity, 
                repeatDelay: 0.5,
                delay: i * 0.5 
              }}
            />
          </div>
        ))}
      </div>
      
      <div className="text-primary font-display font-medium text-[18px] mb-2">
        Reading document...
      </div>
      <div className="text-muted font-body text-[14px]">
        Parsing text and generating semantic chunks
      </div>
    </div>
  );
}
