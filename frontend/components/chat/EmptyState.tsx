export function EmptyState({ onUpload }: { onUpload: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 h-full bg-canvas">
      
      {/* Static Highlight Trace Motif */}
      <div className="mb-8 p-4 bg-surface border border-border flex flex-col gap-3 w-[240px] shadow-sm">
        <div className="w-3/4 h-2 bg-border/50 rounded-sm"></div>
        <div className="w-full h-2 bg-border/50 rounded-sm"></div>
        <div className="w-full h-2 relative rounded-sm overflow-hidden">
          <div className="absolute inset-0 bg-accent-highlight-dim"></div>
          <div className="absolute left-0 top-0 bottom-0 bg-accent-highlight w-[40%]"></div>
        </div>
        <div className="w-1/2 h-2 bg-border/50 rounded-sm"></div>
      </div>

      <div className="font-display font-medium text-[24px] text-primary mb-3">
        Every answer points back to the page.
      </div>
      <div className="font-body text-[15px] text-muted mb-8 max-w-[320px] text-center">
        Upload a document to start extracting insights with precise citations.
      </div>
      <button
        onClick={onUpload}
        className="h-[40px] rounded-[4px] bg-accent-highlight text-canvas font-medium text-[14px] font-body px-8 hover:brightness-90 transition-all duration-200"
      >
        Upload PDF
      </button>
    </div>
  );
}
